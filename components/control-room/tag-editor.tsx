import { useState } from 'react';

export function TagEditor({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [draft, setDraft] = useState('');
  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...tags, v]);
    setDraft('');
  };
  return (
    <div className="cr-tags">
      {tags.map((t, i) => (
        <span key={i} className="cr-tag">
          {t}
          <button
            className="cr-tag-x"
            type="button"
            onClick={() => onChange(tags.filter((_, idx) => idx !== i))}
          >
            ×
          </button>
        </span>
      ))}
      <input
        className="cr-input mono"
        style={{ width: 140 }}
        placeholder="加 tag…"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') add();
        }}
      />
    </div>
  );
}
