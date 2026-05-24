import type { ReactNode } from 'react';

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="cr-field">
      <label>{label}</label>
      {children}
    </div>
  );
}

interface SegOption<T extends string> {
  value: T;
  label: string;
}

export function Seg<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly SegOption<T>[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="cr-seg">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={value === o.value ? 'active' : ''}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Switch({
  value,
  onChange,
}: { value: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      className={`cr-switch ${value ? 'on' : ''}`}
      onClick={() => onChange(!value)}
      aria-pressed={value}
    />
  );
}

export function Section({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <div className="cr-section">
      <div className="cr-section-h">
        <h3>{title}</h3>
        {meta && <span className="cr-section-meta">{meta}</span>}
      </div>
      {children}
    </div>
  );
}
