import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// 纯客户端页面 + D1 API，无 ISR，不需要 incremental cache。
export default defineCloudflareConfig();
