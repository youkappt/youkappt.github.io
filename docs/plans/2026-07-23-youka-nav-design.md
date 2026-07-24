# 优卡导航 · 设计稿（AI × DESIGN 导航站）

> 日期：2026-07-23 · 主题：AI+设计 工具导航 · 视觉规范：AuthKit「午夜磨砂玻璃」

## 1. 视觉语言
- 底色 `#05060f` 午夜画布 + 全局 1px 蓝图网格（透明度 0.06，80px 格，边缘淡出）+ 顶部 conic 聚光晕。
- 标题：Space Grotesk（中文回退 PingFang SC / Microsoft YaHei）配 Skywash 垂直渐变 `#d8ecf8→#98c0ef`。
- 正文：Inter；eyebrow：JetBrains Mono 全大写 0.10em 字距、两侧淡出细线。
- 玻璃卡：`rgba(186,214,247,0.03)`、16px 圆角、内嵌 frost 高光 + 外发光，发丝边 `rgba(186,215,247,0.12)`。
- 唯一彩色：紫罗兰 `#663af3` 仅用于搜索按钮/主 CTA。
- 节奏：section 间距 120px、卡片内边距 24px、页面最大宽 1200px。

## 2. Hero 区
- eyebrow：`AI × DESIGN · 导航`
- 居中渐变大字「优卡导航」
- 标语：「发现最好用的 AI 设计工具，一站直达」
- 磨砂玻璃搜索框（pill，占位「搜索工具 / 分类 / 关键词…」+ 紫色搜索按钮），实时过滤网格
- 下方 3 张悬停玻璃卡扇形排布（左倾/中放大/右倾），代表热门分类，点击平滑滚动到对应区

## 3. 导航网格（6 类，每类 4–5 真实工具）
1. AI 绘画/图像 — Midjourney、DALL·E 3、即梦、Recraft、Ideogram
2. 视频生成 — 可灵、Runway、Pika、Luma Dream Machine、Sora
3. UI/界面设计 — Galileo AI、Uizard、Figma AI、Magician、即时 AI
4. 字体/排版 — Fontjoy、Calligrapher.ai、求字体网、Fontpair、TypeScale
5. 3D/模型 — Tripo、Meshy、Spline AI、Luma Genie、MasterpieceX
6. 灵感/素材 — Dribbble、Behance、站酷、Liblib、Civitai

## 4. 交互
- 搜索实时过滤（名称/简介/分类），空分类自动隐藏，显示结果计数
- 卡片 hover 上浮 + 内发光增强
- 响应式：移动端网格 1–2 列、Hero 标题缩放、悬停卡降旋转

## 5. 交付物
- `index.html`（内联 CSS/JS，零构建）
- 设计文档：`docs/plans/2026-07-23-youka-nav-design.md`
