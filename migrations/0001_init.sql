-- 直播状态：单行 key-value，data 存整个 LiveState 的 JSON。
CREATE TABLE IF NOT EXISTS live_state (
  id         TEXT PRIMARY KEY,
  data       TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
