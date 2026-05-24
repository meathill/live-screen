import { type AgendaItem, DEFAULT, type Variant } from '@/lib/live-state';
import { type ChatMessage, DEFAULT_CHAT } from './chat-data';
import { CheckIcon, CircleIcon, DotIcon, HashIcon } from './icons';

interface SidebarData {
  name?: string;
  ep?: number;
  agenda?: AgendaItem[];
}

export function Sidebar({
  variant = 'classic',
  chat,
  data = {},
}: {
  variant?: Variant;
  chat?: ChatMessage[];
  data?: SidebarData;
}) {
  return (
    <aside className={`ov-sidebar ov-side-${variant}`}>
      <BrandHeader data={data} />
      <SessionMeter ep={data.ep} agenda={data.agenda} />
      <AgendaCard agenda={data.agenda} />
      <ChatCard chat={chat} />
    </aside>
  );
}

function BrandHeader({ data = {} }: { data?: SidebarData }) {
  return (
    <div className="ov-brand">
      <div className="ov-brand-avatar">
        <img src="/assets/mui-mark.png" alt="Mui" />
      </div>
      <div className="ov-brand-text">
        <div className="ov-brand-name">{data.name ? `${data.name} Studio` : 'Meathill Studio'}</div>
        <div className="ov-brand-sub">由柯基 Mui 监修</div>
      </div>
      <div className="ov-live-pill">
        <DotIcon className="ov-live-dot" /> LIVE
      </div>
    </div>
  );
}

// 紧凑 session meter — 只有期号 + 进度，不重复标题。
function SessionMeter({
  ep = 12,
  agenda = DEFAULT.agenda,
}: { ep?: number; agenda?: AgendaItem[] }) {
  const total = agenda.length;
  const done = agenda.filter((a) => a.s === 'done').length;
  const doingBoost = agenda.some((a) => a.s === 'doing') ? 0.5 : 0;
  const pct = total === 0 ? 0 : Math.round(((done + doingBoost) / total) * 100);
  return (
    <div className="ov-card ov-meter">
      <div className="ov-meter-row">
        <div className="ov-meter-ep">
          <span className="ov-eyebrow">EP</span>
          <span className="ov-meter-num">{ep}</span>
        </div>
        <div className="ov-meter-progress">
          <div className="ov-progress-meta">
            <span>
              议程 {done} / {total}
            </span>
            <span>{pct}%</span>
          </div>
          <div className="ov-progress-track">
            <div className="ov-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AgendaCard({ agenda = DEFAULT.agenda }: { agenda?: AgendaItem[] }) {
  const done = agenda.filter((a) => a.s === 'done').length;
  return (
    <div className="ov-card ov-agenda">
      <div className="ov-card-h">
        <span className="ov-eyebrow">本场议程</span>
        <span className="ov-card-meta">
          {done}/{agenda.length}
        </span>
      </div>
      <ul className="ov-agenda-list">
        {agenda.map((a, i) => (
          <li key={i} className={`ov-ag ov-ag-${a.s}`}>
            <span className="ov-ag-check">
              {a.s === 'done' ? <CheckIcon /> : a.s === 'doing' ? <DotIcon /> : <CircleIcon />}
            </span>
            <span className="ov-ag-text">{a.d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChatCard({ chat = DEFAULT_CHAT }: { chat?: ChatMessage[] }) {
  return (
    <div className="ov-card ov-chat">
      <div className="ov-card-h">
        <span className="ov-eyebrow">
          <HashIcon style={{ verticalAlign: '-2px' }} /> chat
        </span>
        <span className="ov-card-meta">{chat.length} 条</span>
      </div>
      <ul className="ov-chat-list">
        {chat.slice(-6).map((m, i) => (
          <li key={m._k ?? i} className="ov-chat-row">
            <span className="ov-chat-user" style={{ color: m.c }}>
              {m.badge && <span className="ov-chat-badge">{m.badge}</span>}
              {m.u}
            </span>
            <span className="ov-chat-sep">·</span>
            <span className="ov-chat-msg">{m.m}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
