import type { SceneState } from '@/lib/live-state';

export const SCENES: { value: SceneState; name: string; key: string }[] = [
  { value: 'live', name: '直播中', key: 'LIVE' },
  { value: 'fullcode', name: '纯代码', key: 'FULL' },
  { value: 'soon', name: '马上开播', key: 'SOON' },
  { value: 'brb', name: '暂时离开', key: 'BRB' },
  { value: 'ending', name: '下播', key: 'END' },
];

export function SceneSwitcher({
  state,
  onChange,
}: {
  state: SceneState;
  onChange: (state: SceneState) => void;
}) {
  return (
    <div className="cr-scene-row">
      {SCENES.map((s) => (
        <button
          key={s.value}
          type="button"
          className={`cr-scene-btn ${state === s.value ? `active ${s.value}` : ''}`}
          onClick={() => onChange(s.value)}
        >
          <div className="cr-scene-key">{s.key}</div>
          <div className="cr-scene-name">{s.name}</div>
        </button>
      ))}
    </div>
  );
}
