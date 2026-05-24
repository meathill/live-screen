// 客户端状态存储：两层
//  1) localStorage —— 同一浏览器即时同步（storage/自定义事件）+ 离线兜底
//  2) D1 后端 (/api/state) —— 跨浏览器（含 OBS Browser Source）的权威来源，轮询拉取、防抖写入
import { DEFAULT, KEY, type LiveState } from './live-state';

const EVENT = 'live-state-change';
const isBrowser = typeof window !== 'undefined';

// ───────────────────────── localStorage 层 ─────────────────────────
export function readLocal(): LiveState {
  if (!isBrowser) return { ...DEFAULT };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT };
    return { ...DEFAULT, ...(JSON.parse(raw) as Partial<LiveState>) };
  } catch {
    return { ...DEFAULT };
  }
}

export function writeLocal(state: LiveState): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    // 'storage' 只在其它标签触发，同标签需自己派发。
    window.dispatchEvent(new CustomEvent(EVENT, { detail: state }));
  } catch (e) {
    console.error('writeLocal failed', e);
  }
}

export function subscribeLocal(cb: (state: LiveState) => void): () => void {
  if (!isBrowser) return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb(readLocal());
  };
  const onLocal = () => cb(readLocal());
  window.addEventListener('storage', onStorage);
  window.addEventListener(EVENT, onLocal);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(EVENT, onLocal);
  };
}

// ───────────────────────── D1 后端层 ─────────────────────────
export interface RemoteState {
  data: LiveState;
  updatedAt: number;
}

export async function fetchRemote(signal?: AbortSignal): Promise<RemoteState | null> {
  try {
    const res = await fetch('/api/state', { signal, cache: 'no-store' });
    if (!res.ok) return null;
    const json = (await res.json()) as Partial<RemoteState>;
    return { data: { ...DEFAULT, ...json.data }, updatedAt: json.updatedAt ?? 0 };
  } catch {
    return null; // 离线 / 无后端：交给 localStorage 兜底
  }
}

// 写入防抖：合并标题逐字输入等快速连续编辑，减少 D1 写入次数。
let pushTimer: ReturnType<typeof setTimeout> | null = null;
let pendingState: LiveState | null = null;
let pendingCb: ((updatedAt: number) => void) | undefined;

export function pushRemote(state: LiveState, cb?: (updatedAt: number) => void): void {
  pendingState = state;
  if (cb) pendingCb = cb;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(flushPush, 250);
}

async function flushPush(): Promise<void> {
  pushTimer = null;
  const data = pendingState;
  const cb = pendingCb;
  pendingState = null;
  pendingCb = undefined;
  if (!data) return;
  try {
    const res = await fetch('/api/state', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    if (!res.ok) return;
    const json = (await res.json()) as { updatedAt: number };
    cb?.(json.updatedAt);
  } catch {
    // 离线：localStorage 已写入，忽略
  }
}

// 重置：清本地 + 清后端
export async function reset(): Promise<void> {
  if (isBrowser) {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    window.dispatchEvent(new CustomEvent(EVENT));
  }
  try {
    await fetch('/api/state', { method: 'DELETE' });
  } catch {}
}
