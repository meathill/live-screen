import { DEFAULT, type LiveState } from '@/lib/live-state';
import { getCloudflareContext } from '@opennextjs/cloudflare';

// 读写都依赖请求期的 D1 绑定，强制动态。
export const dynamic = 'force-dynamic';

const ROW_ID = 'current';

interface StateRow {
  data: string;
  updated_at: number;
}

// GET /api/state → { data, updatedAt }；无记录则回默认值 + updatedAt=0
export async function GET() {
  const { env } = getCloudflareContext();
  const row = await env.DB.prepare('SELECT data, updated_at FROM live_state WHERE id = ?')
    .bind(ROW_ID)
    .first<StateRow>();
  if (!row) return Response.json({ data: DEFAULT, updatedAt: 0 });
  let data: LiveState;
  try {
    data = { ...DEFAULT, ...(JSON.parse(row.data) as Partial<LiveState>) };
  } catch {
    data = DEFAULT;
  }
  return Response.json({ data, updatedAt: row.updated_at });
}

// PUT /api/state  body: { data: LiveState } → { ok, updatedAt }
export async function PUT(request: Request) {
  const { env } = getCloudflareContext();
  const body = (await request.json()) as { data?: Partial<LiveState> };
  const data: LiveState = { ...DEFAULT, ...(body.data ?? {}) };
  const updatedAt = Date.now();
  await env.DB.prepare(
    `INSERT INTO live_state (id, data, updated_at) VALUES (?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
  )
    .bind(ROW_ID, JSON.stringify(data), updatedAt)
    .run();
  return Response.json({ ok: true, updatedAt });
}

// DELETE /api/state → 清空，下次 GET 回默认值
export async function DELETE() {
  const { env } = getCloudflareContext();
  await env.DB.prepare('DELETE FROM live_state WHERE id = ?').bind(ROW_ID).run();
  return Response.json({ ok: true });
}
