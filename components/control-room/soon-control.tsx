import { fmtMS } from '@/lib/format';
import { useEffect, useState } from 'react';

export function SoonControl({
  soonAt,
  onSet,
  onClear,
}: {
  soonAt: number | null;
  onSet: (soonAt: number) => void;
  onClear: () => void;
}) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, []);
  const remaining = soonAt ? Math.max(0, soonAt - now) : 0;
  const display = soonAt ? fmtMS(remaining) : '--:--';
  const muted = !soonAt;
  return (
    <>
      <div className="cr-timer-row" style={{ marginBottom: 12 }}>
        <div className={`cr-timer-display ${muted ? 'muted' : ''}`}>{display}</div>
        <div style={{ flex: 1 }} />
        {soonAt && (
          <button className="cr-btn ghost" type="button" onClick={onClear}>
            清空
          </button>
        )}
      </div>
      <div className="cr-presets">
        {[2, 5, 10, 15, 30].map((min) => (
          <button
            key={min}
            className="cr-preset"
            type="button"
            onClick={() => onSet(Date.now() + min * 60_000)}
          >
            +{min} 分钟
          </button>
        ))}
      </div>
      <p style={{ fontSize: 12, color: 'var(--color-mute)', marginTop: 10, lineHeight: 1.5 }}>
        点 <strong>+N 分钟</strong> 设定从现在起的倒计时。
        <br />
        归零后会停在 <code>00:00</code>;切回「直播中」即可。
      </p>
    </>
  );
}
