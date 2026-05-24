// 场景卡：马上开播 / 暂时离开 / 下播 —— 铺满 capture 区域。
import type { Socials } from '@/lib/live-state';
import { BiliIcon, GithubIcon, MusicIcon, XIcon } from './icons';

interface SceneData {
  soonTagline?: string;
  soonTags?: string[];
  brbTagline?: string;
  endingTagline?: string;
  socials?: Socials;
  music?: string;
}

export function SoonScreen({
  countdown = '04:32',
  data = {},
}: { countdown?: string; data?: SceneData }) {
  const tagline = data.soonTagline ?? '先去倒杯咖啡,回来一起把博客迁完。';
  const tags = data.soonTags ?? ['Next.js 16', 'WordPress → Headless', 'Cloudflare'];
  return (
    <div className="ov-scene ov-scene-soon">
      <div className="ov-scene-grid bg-grid" />
      <div className="ov-scene-card press-ink">
        <div className="ov-scene-eyebrow">STARTING SOON</div>
        <div className="ov-scene-title">
          <span className="display">马上开播</span>
          <img src="/assets/mui-mascot.png" alt="" className="ov-scene-mascot wiggle" />
        </div>
        <div className="ov-scene-sub">{tagline}</div>
        <div className="ov-scene-count">{countdown}</div>
        <div className="ov-scene-tags">
          {tags.map((t, i) => (
            <span key={i} className="ov-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BRBScreen({ data = {} }: { data?: SceneData }) {
  const tagline = data.brbTagline ?? '遛一下狗就回来,期间放点 lofi。';
  const music = data.music ?? 'lofi.coffee — corgi naps';
  return (
    <div className="ov-scene ov-scene-brb">
      <div className="ov-scene-card press-ink">
        <div className="ov-scene-eyebrow">{'// BRB · 马上回来'}</div>
        <div className="ov-scene-title">
          <span className="display">Mui 在思考</span>
          <img src="/assets/mui-mascot.png" alt="" className="ov-scene-mascot wiggle" />
        </div>
        <div className="ov-scene-sub">{tagline}</div>
        {music && (
          <div className="ov-scene-music">
            <MusicIcon />
            <span>{music}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function EndingScreen({ data = {} }: { data?: SceneData }) {
  const tagline = data.endingTagline ?? '把今天写的代码推到 main,下次接着干。';
  const socials = data.socials ?? { github: 'meathill', x: '@meathill', bili: 'meathill' };
  return (
    <div className="ov-scene ov-scene-end">
      <div className="ov-scene-card press-ink">
        <div className="ov-scene-eyebrow">THANKS FOR WATCHING</div>
        <div className="ov-scene-title">
          <span className="display">下次见</span>
        </div>
        <div className="ov-scene-sub">{tagline}</div>
        <div className="ov-end-socials">
          {socials.github && (
            <div>
              <GithubIcon /> {socials.github}
            </div>
          )}
          {socials.x && (
            <div>
              <XIcon /> {socials.x}
            </div>
          )}
          {socials.bili && (
            <div>
              <BiliIcon /> {socials.bili}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
