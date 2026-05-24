import type { Socials, Variant } from '@/lib/live-state';
import { BiliIcon, DotIcon, EyeIcon, GithubIcon, HeartIcon, MusicIcon, XIcon } from './icons';

interface InfoStripData {
  name?: string;
  tagline?: string;
  socials?: Socials;
  streamEyebrow?: string;
  streamTitle?: string;
  viewers?: number;
  likes?: number;
  music?: string;
}

function fmt(n: number): string {
  return n.toLocaleString('en-US');
}

export function InfoStrip({
  uptime,
  variant = 'classic',
  data = {},
}: {
  uptime: string;
  variant?: Variant;
  data?: InfoStripData;
}) {
  const name = data.name ?? 'meathill';
  const tagline = data.tagline ?? '写代码 · 教学 · 喝咖啡';
  const socials = data.socials ?? { github: 'meathill', x: '@meathill', bili: 'meathill' };
  const eyebrow = data.streamEyebrow ?? '今晚直播';
  const title = data.streamTitle ?? '把博客后台从 WordPress 迁到 Next.js 16';
  const viewers = data.viewers ?? 1284;
  const likes = data.likes ?? 3902;
  const music = data.music ?? 'lofi.coffee — corgi naps';

  return (
    <div className={`ov-strip ov-strip-${variant}`}>
      <div className="ov-strip-l">
        <div className="ov-strip-mascot">
          <img src="/assets/mui-mascot.png" alt="" />
        </div>
        <div className="ov-strip-id">
          <div className="ov-strip-name">{name}</div>
          <div className="ov-strip-tagline">{tagline}</div>
          <div className="ov-strip-socials">
            {socials.github && (
              <span>
                <GithubIcon /> {socials.github}
              </span>
            )}
            {socials.x && (
              <span>
                <XIcon /> {socials.x}
              </span>
            )}
            {socials.bili && (
              <span>
                <BiliIcon /> {socials.bili}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="ov-strip-m">
        <div className="ov-strip-title-eyebrow">{eyebrow}</div>
        <div className="ov-strip-title">{title}</div>
      </div>

      <div className="ov-strip-r">
        <div className="ov-strip-meter">
          <EyeIcon /> <strong>{fmt(viewers)}</strong> <span className="ov-mute">观看</span>
        </div>
        <div className="ov-strip-meter">
          <HeartIcon style={{ color: '#d8694e' }} /> <strong>{fmt(likes)}</strong>
        </div>
        <div className="ov-strip-meter ov-strip-uptime">
          <DotIcon style={{ color: '#d8694e' }} className="ov-blink" /> <strong>{uptime}</strong>
        </div>
        {music && (
          <div className="ov-strip-music">
            <MusicIcon />
            <span className="ov-mute">Now</span>
            <span>{music}</span>
          </div>
        )}
      </div>
    </div>
  );
}
