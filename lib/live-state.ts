// 直播状态的「形状」：类型 + 默认值。服务端（D1 API）与客户端（store/hook）共用。
// 不含任何 window / localStorage / fetch 逻辑，保证服务端可安全导入。

export type Variant = 'classic' | 'terminal' | 'playful';
export type SceneState = 'live' | 'fullcode' | 'soon' | 'brb' | 'ending';
export type CameraShape = 'rounded' | 'square' | 'circle';
export type AgendaStatus = 'todo' | 'doing' | 'done';

export interface AgendaItem {
  d: string;
  s: AgendaStatus;
}

export interface Socials {
  github: string;
  x: string;
  bili: string;
}

export interface LiveState {
  variant: Variant;
  state: SceneState;
  cameraShape: CameraShape;
  chatLive: boolean;

  ep: number;
  agenda: AgendaItem[];

  name: string;
  tagline: string;
  socials: Socials;

  streamEyebrow: string;
  streamTitle: string;

  viewers: number;
  likes: number;
  music: string;

  startedAt: number | null;
  soonAt: number | null;

  soonTagline: string;
  soonTags: string[];
  brbTagline: string;
  endingTagline: string;
}

export const KEY = 'live-state-v1';

export const DEFAULT: LiveState = {
  variant: 'classic',
  state: 'live',
  cameraShape: 'rounded',
  chatLive: true,

  ep: 12,
  agenda: [
    { d: '布局拆四块', s: 'done' },
    { d: '边框 + press 阴影', s: 'done' },
    { d: '右下摄像头', s: 'doing' },
    { d: '聊天滚动 + 入场', s: 'todo' },
    { d: '场景: BRB / Soon', s: 'todo' },
  ],

  name: 'meathill',
  tagline: '写代码 · 教学 · 喝咖啡',
  socials: { github: 'meathill', x: '@meathill', bili: 'meathill' },

  streamEyebrow: '今晚直播',
  streamTitle: '把博客后台从 WordPress 迁到 Next.js 16',

  viewers: 1284,
  likes: 3902,
  music: 'lofi.coffee — corgi naps',

  startedAt: null,
  soonAt: null,

  soonTagline: '先去倒杯咖啡,回来一起把博客迁完。',
  soonTags: ['Next.js 16', 'WordPress → Headless', 'Cloudflare'],
  brbTagline: '遛一下狗就回来,期间放点 lofi。',
  endingTagline: '把今天写的代码推到 main,下次接着干。',
};
