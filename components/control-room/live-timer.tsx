import { fmtHMS } from '@/lib/format';
import { useEffect, useState } from 'react';

export function LiveTimer({
  startedAt,
  onStart,
  onStop,
}: {
  startedAt: number | null;
  onStart: () => void;
  onStop: () => void;
}) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, []);
  const display = startedAt ? fmtHMS(now - startedAt) : '00:00:00';
  return (
    <div className="cr-timer-row">
      <div className={`cr-timer-display ${!startedAt ? 'muted' : ''}`}>{display}</div>
      <div style={{ flex: 1 }} />
      {startedAt ? (
        <button className="cr-btn ghost" type="button" onClick={onStop}>
          停止
        </button>
      ) : (
        <button className="cr-btn" type="button" onClick={onStart}>
          开始计时
        </button>
      )}
    </div>
  );
}
