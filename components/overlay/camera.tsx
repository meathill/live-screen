import type { CameraShape, Variant } from '@/lib/live-state';
import { DotIcon, MicIcon } from './icons';

export function Camera({
  shape = 'rounded',
  variant = 'classic',
}: {
  shape?: CameraShape;
  variant?: Variant;
}) {
  return (
    <div className={`ov-cam ov-cam-${shape} ov-cam-v-${variant}`}>
      <div className="ov-cam-frame">
        <div className="ov-cam-feed">
          <img src="/assets/mui-photo.jpg" alt="" className="ov-cam-img" />
        </div>
        <div className="ov-cam-glow" />
        <div className="ov-cam-name">
          <span className="ov-cam-mic">
            <MicIcon />
          </span>
          <span>meathill</span>
        </div>
        <div className="ov-cam-rec">
          <DotIcon className="ov-blink" style={{ color: '#d8694e' }} /> REC
        </div>
      </div>
    </div>
  );
}
