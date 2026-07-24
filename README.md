# 优卡导航 (Youka Nav)

> AI × DESIGN × PPT 导航站 —— 发现最好用的 AI 设计工具，一站直达。

## 项目简介

「优卡导航」是一个面向 AI + 设计从业者的工具导航网站，由翁昕耀（网名：优卡 / youka）创建。
网站采用单文件零构建架构，所有工具数据外置于 `tools.md`，实现「改 md 即更新」。

## 技术栈

- **纯静态单页**：单个 `index.html`（内联 CSS/JS），零构建、零依赖、双击即开（经 http 访问）。
- **视觉语言**：沿用 AuthKit 设计规范（午夜深色 + 磨砂玻璃 + 单一紫罗兰强调色）。
- **数据驱动**：运行时 `fetch('./tools.md')` 解析渲染，分类/工具全部由 md 控制。

## 文件结构

```
优卡导航/
├── index.html              # 主页面（Hero + 导航网格 + 子页跳转），内联全部样式与渲染逻辑
├── tools.md                # ★ 唯一数据源：分类与工具清单（改这个文件即更新网站）
├── logo.png                # 站点 Logo（同时用于标签页 favicon 和左上角 header）
├── fetch_logos.py          # 高清网站图标抓取脚本（Python 标准库，需能联外网）
├── logos/                  # 已下载的高清图标 + manifest.json（域名→文件名映射）
├── assets/                 # 站点静态资源（优卡 IP 头像等）
├── mockup/                 # 二级页：PPT作品展示图生成器（React SPA 预构建产物）
├── template/               # 二级页：优卡的素材库（瀑布流多图展示页）
├── docs/plans/             # 设计文档：视觉规范与 Hero 设计意图
│   └── 2026-07-23-youka-nav-design.md
├── .github/workflows/      # GitHub Pages 部署（Actions 自动构建）
├── .nojekyll               # 关闭 Jekyll 构建
├── .gitignore
└── .workbuddy/             # 项目记忆（会话上下文、约定）
```

## 本地运行

```bash
# 在项目根目录启动静态服务器（必须用 http，不能 file:// 直接打开）
python3 -m http.server 8000
# 浏览器访问
open http://localhost:8000
```

> ⚠️ 浏览器在 `file://` 协议下会拦截读取本地 `.md` 文件，纯双击 `index.html` 会读不到数据。
> 必须走 http 访问（本地服务器或静态托管）。

## 如何更新网站内容

**只需编辑 `tools.md`，无需碰 `index.html`。**

### 格式规范

```markdown
## 分类名称 (英文标识)
- [工具名](https://链接地址) — 一句话简介 ｜付费/免费
```

- `##` 二级标题 = 一个分类，`(英文)` 可选，用于分类右侧灰色小字
- `- [名称](链接) — 简介` = 一个工具
- 结尾 `｜付费` 或 `｜免费` 控制徽章与排序（同分类内**免费在前、付费在后**）
- 想加工具：在对应分类下加一行即可；想加分类：加一个 `##` 标题块

### 图标说明

卡片图标拉取顺序（最终确定）：**Google Favicon 优先 → DuckDuckGo 兜底 → 色块首字**。
即优先用 Google 的真实品牌 logo，Google 取不到再试 DuckDuckGo，两者都没有才显示色块首字。

## 部署

本站点托管于 **GitHub Pages 用户站点**（仓库 `youkappt/youkappt.github.io`，主域名 https://youkappt.com/，GitHub 地址 https://youkappt.github.io/），自定义域名通过仓库根 `CNAME` 文件绑定。

如需自行托管，将整个文件夹上传到任意静态托管即可（GitHub Pages / Vercel / 腾讯云 COS 等）：
- `index.html` + `tools.md` + `logo.png` 必须同目录
- 托管后 `tools.md` 在线更新也会自动生效

## 更新日志

见 `.workbuddy/memory/` 下的日期工作日志。
