# live-screen · Mui Studio 直播 overlay 框架

给「写代码 / 教学」类直播用的一套 OBS overlay 框架，柯基 Mui 暖黄配色。
用 Next.js（App Router）+ TypeScript 实现，设计稿来自 Claude Design 导出的 handoff bundle。

## 两个页面

| 路由     | 作用                                                                 |
| -------- | -------------------------------------------------------------------- |
| `/`      | **Control Room** 控制台：实时编辑所有字段，含 1920×1080 缩放预览。   |
| `/live`  | **直播 overlay**：1920×1080 画布，自动缩放进 viewport，给 OBS 抓取。 |

`/live?embed` 为透明嵌入模式（控制台预览 iframe 用）。

## overlay 布局（1920×1080）

```
┌─────────────────────────────┬─────────┐
│  capture 1600×900           │ sidebar │  右上：品牌 / session meter / 议程 / 聊天
│  （留空，给真实录屏）        │ 320×900 │
├─────────────────────────────┼─────────┤
│  info strip 1600×180        │ cam     │  左下：头像 / 昵称 / 社交 / 标题 / 数据 / 音乐
│                             │ 320×180 │  右下：摄像头
└─────────────────────────────┴─────────┘
```

左上 capture 区在直播时**留空**（透明），由 OBS 在该区域下层合成真实录屏；overlay 只负责四周的 frame。
SOON / BRB / ENDING 场景会铺满整个画布。

- **5 个场景**：直播中 / 纯代码 / 马上开播 / 暂时离开 / 下播（控制台键盘 `1`–`5` 切换）
- **3 种风格**：经典 / 终端 / 装饰

## 状态同步（双层 · 本地/线上双模式）

控制台和 overlay 共享一份状态，两层叠加：

1. **localStorage**（`storage`/自定义事件）—— 同一浏览器内**即时**同步，离线兜底。
2. **Cloudflare D1**（`/api/state`，App Router Route Handler）—— **跨浏览器**的权威来源。
   控制台写入时防抖 PUT 到 D1，overlay 每 ~1.5s 轮询 GET 拉取。

这样既能在**本地纯前端**（无后端时退回 localStorage）跑，也能在**线上**让不同浏览器
（尤其是 OBS 的 Browser Source —— 它的 CEF 不与本机浏览器共享 localStorage）通过 D1 同步。
相关代码：`lib/live-state.ts`（状态形状）、`lib/live-store.ts`（本地+D1）、`lib/use-live-state.ts`（hook）、`app/api/state/route.ts`（D1 读写）。

## 本地开发

```bash
pnpm install
pnpm db:migrate:local   # 初始化本地 D1（.wrangler/state，仅首次）
pnpm dev                # http://localhost:3000 →（next dev 经 OpenNext 注入本地 D1 绑定）
pnpm format             # biome 格式化 + 自动修复
pnpm typecheck          # tsc --noEmit
```

## 部署到 Cloudflare（OpenNext）

```bash
# 1) 创建 D1，把输出的 database_id 填进 wrangler.jsonc 的 d1_databases[0].database_id
wrangler d1 create live-screen-db

# 2) 给线上 D1 跑迁移
pnpm db:migrate:remote

# 3) 构建并部署 Worker（首次会让你 wrangler login）
pnpm deploy

# 本地用 workerd 跑一遍生产 Worker（更接近线上）：
pnpm preview
# 改了 wrangler.jsonc 后重新生成类型：
pnpm cf-typegen
```

## 接入 OBS

- **方式 A · Window Capture**：自己的浏览器开两个标签（`/` 控制台 + `/live`），OBS 抓 `/live` 窗口。
  同浏览器走 localStorage 即时同步。
- **方式 B · Browser Source（部署到线上后）**：OBS 里把线上的 `/live` 作为 Browser Source，
  控制台在任意浏览器打开。改字段经 D1 同步到 OBS（~1.5s 内）。Browser Source 不共享 localStorage
  也没关系——走的是 D1。

## 目录

```
app/        layout、globals.css（设计 token）、page.tsx（控制台）、live/（直播页）、api/state/（D1 读写）
components/ overlay/（overlay 各区块）、control-room/（控制台各编辑器）
lib/        live-state.ts（状态形状）、live-store.ts（本地+D1）、use-live-state.ts、format.ts
migrations/ D1 建表 SQL
public/assets/  柯基头像 / 吉祥物 / 照片等
wrangler.jsonc · open-next.config.ts   Cloudflare / OpenNext 配置
```
