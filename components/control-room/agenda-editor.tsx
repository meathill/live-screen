import type { AgendaItem, AgendaStatus } from '@/lib/live-state';

export function AgendaEditor({
  agenda,
  onChange,
}: {
  agenda: AgendaItem[];
  onChange: (agenda: AgendaItem[]) => void;
}) {
  const setItem = (i: number, patch: Partial<AgendaItem>) => {
    onChange(agenda.map((a, idx) => (idx === i ? { ...a, ...patch } : a)));
  };
  const removeItem = (i: number) => onChange(agenda.filter((_, idx) => idx !== i));
  const addItem = () => onChange([...agenda, { d: '新议程项', s: 'todo' }]);

  const statuses: { s: AgendaStatus; mark: string; title: string }[] = [
    { s: 'todo', mark: '○', title: '未开始' },
    { s: 'doing', mark: '●', title: '进行中' },
    { s: 'done', mark: '✓', title: '完成' },
  ];

  return (
    <>
      <div className="cr-agenda-list">
        {agenda.map((a, i) => (
          <div key={i} className={`cr-agenda-row ${a.s}`}>
            <div className="cr-agenda-status">
              {statuses.map(({ s, mark, title }) => (
                <button
                  key={s}
                  type="button"
                  className={a.s === s ? 'active' : ''}
                  onClick={() => setItem(i, { s })}
                  title={title}
                >
                  {mark}
                </button>
              ))}
            </div>
            <input
              className="cr-input"
              value={a.d}
              onChange={(e) => setItem(i, { d: e.target.value })}
            />
            <button className="cr-x" type="button" onClick={() => removeItem(i)} title="删除">
              ×
            </button>
          </div>
        ))}
      </div>
      <button className="cr-btn ghost" type="button" onClick={addItem}>
        + 加一项
      </button>
    </>
  );
}
