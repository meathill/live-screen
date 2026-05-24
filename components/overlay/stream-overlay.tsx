import type { CameraShape, LiveState, SceneState, Variant } from '@/lib/live-state';
import { Camera } from './camera';
import type { ChatMessage } from './chat-data';
import { PawIcon } from './icons';
import { InfoStrip } from './info-strip';
import { BRBScreen, EndingScreen, SoonScreen } from './scenes';
import { Sidebar } from './sidebar';

interface StreamOverlayProps {
  variant?: Variant;
  state?: SceneState;
  cameraShape?: CameraShape;
  uptime?: string;
  countdown?: string;
  chat?: ChatMessage[];
  data?: Partial<LiveState>;
}

export function StreamOverlay({
  variant = 'classic',
  state = 'live',
  cameraShape = 'rounded',
  uptime = '01:42:18',
  countdown = '04:32',
  chat,
  data = {},
}: StreamOverlayProps) {
  return (
    <div className={`ov-root ov-v-${variant} ov-s-${state}`}>
      <div className="ov-stage">
        {/* 左上 capture 区（1600×900）—— 直播/纯代码时留空，给 OBS 真实录屏合成 */}
        <div className="ov-capture-region">
          {state === 'soon' && <SoonScreen data={data} countdown={countdown} />}
          {state === 'brb' && <BRBScreen data={data} />}
          {state === 'ending' && <EndingScreen data={data} />}
        </div>

        {/* 右侧/底部面板 —— 仅直播中显示 */}
        {state === 'live' && (
          <>
            <Sidebar variant={variant} chat={chat} data={data} />
            <InfoStrip uptime={uptime} variant={variant} data={data} />
          </>
        )}

        {/* 摄像头 —— 直播中 / 纯代码全屏 都显示 */}
        {(state === 'live' || state === 'fullcode') && (
          <Camera shape={cameraShape} variant={variant} />
        )}

        {/* 装饰爪子（仅 playful） */}
        {variant === 'playful' && state === 'live' && (
          <>
            <div className="ov-paw ov-paw-1" style={{ color: 'var(--color-corgi)' }}>
              <PawIcon />
            </div>
            <div className="ov-paw ov-paw-2 wiggle" style={{ color: 'var(--color-yellow)' }}>
              <PawIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
