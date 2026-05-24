// 图标统一出口：通用图标走 lucide，品牌图标走 react-icons/si。
// 默认 size="1em" 让图标随文字行内排版（对齐原 inline SVG 的 width/height=1em）。
import {
  CheckIcon as LuCheck,
  CircleIcon as LuCircle,
  EyeIcon as LuEye,
  GithubIcon as LuGithub,
  HashIcon as LuHash,
  HeartIcon as LuHeart,
  MicIcon as LuMic,
  MusicIcon as LuMusic,
  PawPrintIcon as LuPaw,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import { SiBilibili, SiX } from 'react-icons/si';

export interface IconProps {
  className?: string;
  style?: CSSProperties;
  size?: number | string;
}

export function MicIcon(props: IconProps) {
  return <LuMic size="1em" {...props} />;
}
export function GithubIcon(props: IconProps) {
  return <LuGithub size="1em" {...props} />;
}
export function HashIcon(props: IconProps) {
  return <LuHash size="1em" {...props} />;
}
export function MusicIcon(props: IconProps) {
  return <LuMusic size="1em" {...props} />;
}
export function HeartIcon(props: IconProps) {
  return <LuHeart size="1em" fill="currentColor" stroke="none" {...props} />;
}
export function EyeIcon(props: IconProps) {
  return <LuEye size="1em" {...props} />;
}
export function CheckIcon(props: IconProps) {
  return <LuCheck size="1em" strokeWidth={3} {...props} />;
}
export function CircleIcon(props: IconProps) {
  return <LuCircle size="1em" {...props} />;
}
export function PawIcon(props: IconProps) {
  return <LuPaw size="1em" fill="currentColor" {...props} />;
}
// 实心小圆点：直播/REC/在线指示灯
export function DotIcon({ size = '0.8em', ...rest }: IconProps) {
  return <LuCircle size={size} fill="currentColor" strokeWidth={0} {...rest} />;
}

export function BiliIcon(props: IconProps) {
  return <SiBilibili size="1em" {...props} />;
}
export function XIcon(props: IconProps) {
  return <SiX size="1em" {...props} />;
}
