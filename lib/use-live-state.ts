'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT, type LiveState } from './live-state';
import { fetchRemote, pushRemote, readLocal, subscribeLocal, writeLocal } from './live-store';

const POLL_MS = 1500;

// 组合本地（即时）+ D1（跨浏览器，轮询）的状态 hook。
// 首屏用 DEFAULT 渲染（SSR/CSR 一致），挂载后从 localStorage 水合并开始轮询后端。
export function useLiveState(): [LiveState, (patch: Partial<LiveState>) => void] {
  const [state, setState] = useState<LiveState>(DEFAULT);
  const stateRef = useRef<LiveState>(state);
  stateRef.current = state;
  // 已应用的后端版本时间戳，避免轮询回灌覆盖本地新编辑。
  const serverAt = useRef(0);

  useEffect(() => {
    setState(readLocal());
    const unsub = subscribeLocal(setState);

    let alive = true;
    const controller = new AbortController();
    async function poll() {
      const remote = await fetchRemote(controller.signal);
      if (!alive || !remote) return;
      if (remote.updatedAt > serverAt.current) {
        serverAt.current = remote.updatedAt;
        setState(remote.data);
        writeLocal(remote.data); // 落本地缓存，并顺带同步同浏览器其它标签
      }
    }
    poll();
    const id = setInterval(poll, POLL_MS);
    return () => {
      alive = false;
      controller.abort();
      clearInterval(id);
      unsub();
    };
  }, []);

  const update = useCallback((patch: Partial<LiveState>) => {
    const next = { ...stateRef.current, ...patch };
    setState(next);
    writeLocal(next); // 即时：同浏览器其它标签
    pushRemote(next, (updatedAt) => {
      serverAt.current = updatedAt; // 记下后端版本，防止下次轮询回灌
    });
  }, []);

  return [state, update];
}
