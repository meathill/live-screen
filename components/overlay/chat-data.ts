export interface ChatMessage {
  u: string;
  m: string;
  c: string;
  badge?: string;
  _k?: number;
}

export const CHAT_POOL: ChatMessage[] = [
  { u: 'corgilover', m: '柯基色搭得真好看', c: '#b3851c' },
  { u: 'rustacean', m: '左下那个位置可以放 BGM 吗?', c: '#3b6f9a' },
  { u: 'TS_fan', m: 'press 阴影上头', c: '#c44a32' },
  { u: 'mui', m: 'sub +1', c: '#4f8a3a', badge: 'SUB' },
  { u: 'nextjs_dog', m: '能丢个 repo 链接吗', c: '#b3851c' },
  { u: 'wp_user', m: '迁博客的视频终于来了', c: '#3b6f9a' },
  { u: 'cf_fan', m: 'workers 还是 pages 路由', c: '#b3851c' },
  { u: 'dog_lover', m: '柯基不出镜吗', c: '#d8694e' },
  { u: 'lurker', m: '👋', c: '#8a7660' },
  { u: 'first_time', m: '第一次来,好暖的配色', c: '#4f8a3a', badge: 'NEW' },
  { u: 'mod', m: '别忘了喝水', c: '#b3851c', badge: 'MOD' },
  { u: 'devops', m: 'cache 策略要细讲', c: '#3b6f9a' },
  { u: 'fan_jp', m: 'おはようございます', c: '#b3851c' },
];

export const DEFAULT_CHAT: ChatMessage[] = CHAT_POOL.slice(0, 5);
