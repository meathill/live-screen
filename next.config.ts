import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

export default nextConfig;

// 让 `next dev` 也能访问本地 Cloudflare 绑定（D1 等）。
initOpenNextCloudflareForDev();
