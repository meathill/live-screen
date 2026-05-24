'use client';

import { AgendaEditor } from '@/components/control-room/agenda-editor';
import { LiveTimer } from '@/components/control-room/live-timer';
import { SCENES, SceneSwitcher } from '@/components/control-room/scene-switcher';
import { SoonControl } from '@/components/control-room/soon-control';
import { TagEditor } from '@/components/control-room/tag-editor';
import { Field, Section, Seg, Switch } from '@/components/control-room/ui';
import { reset } from '@/lib/live-store';
import { useLiveState } from '@/lib/use-live-state';
import { useEffect } from 'react';
import './control-room.css';

const eyebrowLabelStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--color-mute)',
} as const;

export default function ControlRoom() {
  const [s, set] = useLiveState();

  // 键盘 1..5 切场景
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const idx = ['1', '2', '3', '4', '5'].indexOf(e.key);
      if (idx >= 0) set({ state: SCENES[idx].value });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [set]);

  const stateLabel = SCENES.find((x) => x.value === s.state)?.key ?? s.state;

  return (
    <div className="cr-page">
      <div id="cr-root">
        {/* ── 顶栏 ───────────────────────── */}
        <div className="cr-topbar">
          <div className="cr-brand-mark">
            <img src="/assets/mui-mark.png" alt="" />
          </div>
          <div className="cr-brand">
            Mui · Control Room
            <span className="cr-brand-sub">v1</span>
          </div>
          <div className="cr-topbar-spacer" />
          <span className={`cr-state-pill ${s.state}`}>● {stateLabel}</span>
          <a
            href="/live"
            target="_blank"
            className="cr-btn ghost"
            style={{ textDecoration: 'none' }}
            rel="noreferrer"
          >
            ↗ 打开直播页
          </a>
          <button
            type="button"
            className="cr-reset"
            onClick={() => {
              if (confirm('重置所有字段为默认值?')) reset();
            }}
          >
            重置
          </button>
        </div>

        <div className="cr-body">
          {/* ── 主列 ──────────────────── */}
          <div className="cr-main">
            <SceneSwitcher state={s.state} onChange={(state) => set({ state })} />

            {/* 风格 + 画面 */}
            <Section title="风格 & 画面" meta="overlay variant · camera">
              <div className="cr-grid-2">
                <Field label="变体">
                  <Seg
                    value={s.variant}
                    onChange={(v) => set({ variant: v })}
                    options={[
                      { value: 'classic', label: '经典' },
                      { value: 'terminal', label: '终端' },
                      { value: 'playful', label: '装饰' },
                    ]}
                  />
                </Field>
                <Field label="摄像头形状">
                  <Seg
                    value={s.cameraShape}
                    onChange={(v) => set({ cameraShape: v })}
                    options={[
                      { value: 'rounded', label: '圆角' },
                      { value: 'square', label: '直角' },
                      { value: 'circle', label: '圆形' },
                    ]}
                  />
                </Field>
              </div>
              <div
                className="cr-toggle-row"
                style={{
                  marginTop: 14,
                  paddingTop: 12,
                  borderTop: '1px dashed var(--color-rule-strong)',
                }}
              >
                <div>
                  <label>聊天实时滚动</label>
                  <div className="hint">关掉之后聊天列表静止</div>
                </div>
                <Switch value={s.chatLive} onChange={(v) => set({ chatLive: v })} />
              </div>
            </Section>

            {/* 节目信息 */}
            <Section title="节目信息" meta="左下信息条 · 中央">
              <div
                className="cr-grid-2"
                style={{ gridTemplateColumns: '180px 1fr', alignItems: 'start' }}
              >
                <Field label="eyebrow">
                  <input
                    className="cr-input mono"
                    value={s.streamEyebrow}
                    onChange={(e) => set({ streamEyebrow: e.target.value })}
                  />
                  <div className="cr-presets" style={{ marginTop: 4 }}>
                    {['今晚直播', '本周教程', '直播实况', '加班实录'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        className="cr-preset"
                        onClick={() => set({ streamEyebrow: p })}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="标题">
                  <input
                    className="cr-input big"
                    value={s.streamTitle}
                    onChange={(e) => set({ streamTitle: e.target.value })}
                  />
                </Field>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: 16,
                  alignItems: 'center',
                  marginTop: 16,
                  paddingTop: 14,
                  borderTop: '1px dashed var(--color-rule-strong)',
                }}
              >
                <label style={eyebrowLabelStyle}>开播时间</label>
                <LiveTimer
                  startedAt={s.startedAt}
                  onStart={() => set({ startedAt: Date.now() })}
                  onStop={() => set({ startedAt: null })}
                />
              </div>
            </Section>

            {/* 本场议程 */}
            <Section title="本场议程" meta="右上侧边栏 · session meter + agenda">
              <div
                className="cr-grid-2"
                style={{ gridTemplateColumns: '120px 1fr', alignItems: 'end', marginBottom: 16 }}
              >
                <Field label="EP #">
                  <input
                    className="cr-input big"
                    type="number"
                    value={s.ep}
                    onChange={(e) => set({ ep: Number(e.target.value) || 0 })}
                  />
                </Field>
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--color-mute)',
                    lineHeight: 1.55,
                    paddingBottom: 12,
                  }}
                >
                  进度条会根据下面议程的「完成」数自动计算。
                  <br />
                  每项有 3 个状态:<strong>○</strong> 未开始 · <strong>●</strong> 进行中 ·{' '}
                  <strong>✓</strong> 完成
                </div>
              </div>
              <AgendaEditor agenda={s.agenda} onChange={(agenda) => set({ agenda })} />
            </Section>

            {/* 个人信息 */}
            <Section title="个人信息" meta="左下信息条 · 左侧">
              <div className="cr-grid-2">
                <Field label="昵称">
                  <input
                    className="cr-input big"
                    value={s.name}
                    onChange={(e) => set({ name: e.target.value })}
                  />
                </Field>
                <Field label="tagline (一句话简介)">
                  <input
                    className="cr-input"
                    value={s.tagline}
                    onChange={(e) => set({ tagline: e.target.value })}
                  />
                </Field>
              </div>
              <div className="cr-grid-3" style={{ marginTop: 14 }}>
                <Field label="GitHub">
                  <input
                    className="cr-input mono"
                    value={s.socials?.github || ''}
                    onChange={(e) => set({ socials: { ...s.socials, github: e.target.value } })}
                  />
                </Field>
                <Field label="X / Twitter">
                  <input
                    className="cr-input mono"
                    value={s.socials?.x || ''}
                    onChange={(e) => set({ socials: { ...s.socials, x: e.target.value } })}
                  />
                </Field>
                <Field label="Bilibili">
                  <input
                    className="cr-input mono"
                    value={s.socials?.bili || ''}
                    onChange={(e) => set({ socials: { ...s.socials, bili: e.target.value } })}
                  />
                </Field>
              </div>
            </Section>

            {/* 数据 + 音乐 */}
            <Section title="数据 & 音乐" meta="左下信息条 · 右侧">
              <div className="cr-grid-3">
                <Field label="观看数">
                  <input
                    className="cr-input mono"
                    type="number"
                    value={s.viewers}
                    onChange={(e) => set({ viewers: Number(e.target.value) || 0 })}
                  />
                </Field>
                <Field label="点赞数">
                  <input
                    className="cr-input mono"
                    type="number"
                    value={s.likes}
                    onChange={(e) => set({ likes: Number(e.target.value) || 0 })}
                  />
                </Field>
                <Field label="Now Playing (空 = 隐藏)">
                  <input
                    className="cr-input mono"
                    value={s.music || ''}
                    placeholder="艺人 — 曲名"
                    onChange={(e) => set({ music: e.target.value })}
                  />
                </Field>
              </div>
            </Section>

            {/* 马上开播倒计时 */}
            <Section title="马上开播 · 倒计时" meta="切到 SOON 场景时显示">
              <SoonControl
                soonAt={s.soonAt}
                onSet={(soonAt) => set({ soonAt })}
                onClear={() => set({ soonAt: null })}
              />
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 14,
                  borderTop: '1px dashed var(--color-rule-strong)',
                }}
              >
                <Field label="开播前文案">
                  <input
                    className="cr-input"
                    value={s.soonTagline}
                    onChange={(e) => set({ soonTagline: e.target.value })}
                  />
                </Field>
                <div style={{ marginTop: 12 }}>
                  <label style={{ ...eyebrowLabelStyle, display: 'block', marginBottom: 6 }}>
                    本期话题 tags
                  </label>
                  <TagEditor tags={s.soonTags || []} onChange={(soonTags) => set({ soonTags })} />
                </div>
              </div>
            </Section>

            <Section title="其他场景文案" meta="BRB · ENDING">
              <Field label="暂时离开 (BRB)">
                <input
                  className="cr-input"
                  value={s.brbTagline}
                  onChange={(e) => set({ brbTagline: e.target.value })}
                />
              </Field>
              <div style={{ marginTop: 12 }}>
                <Field label="下播 (ENDING)">
                  <input
                    className="cr-input"
                    value={s.endingTagline}
                    onChange={(e) => set({ endingTagline: e.target.value })}
                  />
                </Field>
              </div>
            </Section>
          </div>

          {/* ── 预览面板 ───────────────────── */}
          <div className="cr-aside">
            <div className="cr-preview">
              <div className="cr-preview-h">
                <h4>实时预览</h4>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--color-mute)',
                  }}
                >
                  1920 × 1080 · scaled
                </span>
              </div>
              <div className="cr-preview-frame">
                <iframe src="/live?embed" title="preview" />
              </div>
              <div className="cr-preview-footer">
                快捷键: <span className="kbd">1</span>
                <span className="kbd">2</span>
                <span className="kbd">3</span>
                <span className="kbd">4</span>
                <span className="kbd">5</span> 切场景
                <br />
                OBS 接入: 用 <strong>Window Capture</strong> 抓{' '}
                <a href="/live" target="_blank" rel="noreferrer">
                  直播页
                </a>{' '}
                的浏览器窗口
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
