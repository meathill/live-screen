'use client';

import { CHAT_POOL, type ChatMessage } from '@/components/overlay/chat-data';
import { StreamOverlay } from '@/components/overlay/stream-overlay';
import { fmtHMS, fmtMS } from '@/lib/format';
import { useLiveState } from '@/lib/use-live-state';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import './overlay.css';

export default function LivePage() {
  const [state] = useLiveState();
  const scalerRef = useRef<HTMLDivElement>(null);
  const [embed, setEmbed] = useState(false);
  const [chat, setChat] = useState<ChatMessage[]>(() => CHAT_POOL.slice(0, 5));
  const [now, setNow] = useState(() => Date.now());

  // ?embed → 透明嵌入模式（被 Control Room iframe 引用时）
  useEffect(() => {
    setEmbed(new URLSearchParams(window.location.search).has('embed'));
  }, []);

  // 把 1920×1080 缩放进任意 viewport（保持比例，居中留黑边）
  useEffect(() => {
    function fit() {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      if (scalerRef.current) scalerRef.current.style.transform = `scale(${s})`;
    }
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  // 时钟
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // 聊天滚动 —— 每 ~3.5s 随机插一条
  useEffect(() => {
    if (!state.chatLive) return;
    const id = setInterval(() => {
      setChat((c) => {
        const next = CHAT_POOL[Math.floor(Math.random() * CHAT_POOL.length)];
        return [...c.slice(-5), { ...next, _k: Math.random() }];
      });
    }, 3500);
    return () => clearInterval(id);
  }, [state.chatLive]);

  const uptime = state.startedAt ? fmtHMS(now - state.startedAt) : '00:00:00';
  const countdown = state.soonAt ? fmtMS(state.soonAt - now) : '--:--';

  return (
    <div className={`ov-page${embed ? ' embed' : ''}`}>
      <Link href="/" className="ov-back-link">
        ← 控制台
      </Link>
      <div className="ov-stage-fit">
        <div className="ov-scaler" ref={scalerRef}>
          <StreamOverlay
            variant={state.variant}
            state={state.state}
            cameraShape={state.cameraShape}
            chat={chat}
            uptime={uptime}
            countdown={countdown}
            data={state}
          />
        </div>
      </div>
    </div>
  );
}
