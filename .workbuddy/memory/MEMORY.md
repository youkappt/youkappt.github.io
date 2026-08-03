# 优卡导航 — 项目长期记忆（已精简 · 2026-07-30）

## 项目身份
优卡导航 (Youka Nav)：AI×DESIGN×PPT 工具导航站，创始人翁昕耀（优卡）。规模≈27 分类/11 子分类/173 工具（`tools.md` 解析为准，verify 会打印实际数）。

## 技术架构（固定约定）
- 单文件零构建：`index.html` 内联 CSS/JS；`tools.md` 唯一数据源，运行时 fetch 渲染，必须经 http（file:// 拦 md）。视觉：AuthKit 午夜深色+磨砂玻璃+紫罗兰 `#663af3`。
- tools.md：`## 分类(英)` / `### 子分类(英)` / `- [名](链) — 简介 ｜免费/每日免费额度/每月免费额度/付费`（四态同色：免费绿/每日·每月琥珀/付费红；排序 免费→每日·每月→付费）。加工具只改 md。
- 渲染 JS 用字符串拼接（+），**禁嵌套模板字符串**（曾白屏）。Favicon 本地化：`logos/manifest.json` 域名→文件，`logoHtml()` 查 LOGO_MAP，缺失色块兜底，零远程请求。
- ⚠️ scrollspy 高亮禁用 `scrollIntoView`（连滚 window 致移动端回拽 bug）→ 用 `nav.scrollBy` 滚容器自身。

## 本地预览
`python3 -m http.server 8000`（常被占，先释放）；ppthub 子页可独立起 node http 服务（用 Bash `run_in_background=true` 持久化，脱离式 `&` 会被沙箱回收）。

## 部署约定（重要）
- ⚠️ 显式授权：用户亲口说「部署上线/发布」才推线上，否则只改本地。
- ⚠️ 双门禁：部署前 `tests/verify_before_deploy.py` **17/17 PASS**(EXIT=0)；部署后必跑 `tests/verify_pages_rebuilt.py`（判最近 pages.yml run success 且 head_sha==main HEAD）。「applied OK=N」≠线上更新。
- 第 17 项=`node --check`（校验 ppthub/ppt-tips demos.js+各 app.js），挡语法崩溃。
- 托管 GitHub Pages 用户站，仓库 `youkappt/youkappt.github.io`，域名 `youkappt.com`（CNAME 焊死）。`.github/workflows/pages.yml` 完整三步：checkout→upload-pages-artifact@v3(path:.)→deploy-pages@v4。
- 推送走 GitHub API（git push 被沙箱挡）：`/tmp/sync_user_site.py`(EXECUTE=1) 路径级精确排除（保 `assets/contact/`、`mockup/assets/`；排 assets/ip、tests、docs、fetch_logos.py、README、generated-images 等）。**Git Data API 单 commit**（建 blob→tree→单 commit→PATCH ref，原子）。PAT：`security find-internet-password -s github.com -w`。
- 最小原则：线上只放运行必需文件。

## 子页面目录
Hero 四卡顺序：①PPT术语图鉴 `ppthub/` ②PPT技巧 `ppt-tips/` ③素材库 `template/` ④作品展示图生成器 `mockup/`。
- `ppthub/`：纯静态（index+styles+data/demos/terms-extra/beforeafter/app.js），支持 `?term=<id>`。
  - **「动手试试」三件套范式（2026-07-29）**：`CASES` 真实案例库（顶部 `const CASES`，现 42→43 条，`img` 只写文件名、引用拼 `./images/`）；`DEMOS[id](c)` 案例进页面本体、顶不露「案例：」控件（§6.2）；交互按钮 `data-m/f/p/s` 由 `demo_runtime_test.js` 逐个点。
  - **制作策略｜借方法论手写（2026-07-30 用户确认）**：允许借外部 skill（oma-slide / ai-slides-workflow）的 design-doctrine / 风格预设 / fixed-stage 方法论**手写**实现，不要求跑其 CLI（沙箱里 github 被 502 拦、无 npm 包、不在运行时 skill 列表）。落地必须守**统一 SVG 范式**：`<svg viewBox="0 0 960 540" width="100%" height="100%">` + `.mini-slide`（`aspect-ratio:16/9`），移动端靠 viewBox 自动缩放，**禁纯 HTML/CSS 写完整页**。参考 `~/.workbuddy/skills/oma-slide/resources/{design-doctrine,style-presets,fixed-stage}.md`。写法定式 `buildRepetitionSvg(cs,mode)`。透明红线：方法论借鉴≠CLI 生成，不得声称未落地。
  - **BA 范式**：`terms-extra.js` 的 `beforeafter` 文字必填；`beforeafter.js` 的 `BA_VISUALS[id]()` 画对比图，续写点 `/* __BA_APPEND__ */` 前追加，用 `BC` 常量+`box/line/bar/txt/...` 图元。
  - 184 术语 100% 覆盖（案例 demo + BA_VISUALS + terms-extra）；新增/改只需照 §6/§7 局部改，**勿整体重刷**（易触发批量正则叠加损坏）。
  - **文案风格（2026-08-03 用户要求）**：ppthub 面向读者的说明文案（beforeafter caption、BA 文字、常见场景/误区等）一律**口语化、好懂易懂**，避免书面生僻词。例：「左缘参差」→「左边沿高低错落、对不齐」；「左参考线」→「左边线」。后续补齐约 70 个术语的真实图 caption 都按此风格写。
- `ppt-tips/`：78 条（scenario 分组、level 标入门/进阶），每条 demo 注册 `DEMOS[key]`。缩略图 `thumbs/<id>_before|_after.png`（78×2）由 dev-only `gen_thumbs.js`(Playwright) 渲染；改 visual 必重跑；OUT 用 `path.join(__dirname,'thumbs')`。relatedTerms 跳 `../ppthub/?term=`。
- `template/`：素材库瀑布流+底部 cta-bar。`mockup/`：React SPA（`mockup/assets/` 必须上线）。⚠️ `ai-shengtu/` 残骸页但 verify 第2/5项+sitemap 依赖，暂保留。

## 联系方式区（所有子页必带）
四件套 `assets/contact/`（contact.css/js + 两二维码 jpg），**每个子页目录也复制一份**（相对路径）。位置：`<footer>` 内紧跟说明文字；mockup 用 fixed 底栏 z-index 9000。模板 `assets/contact/contact-chunk.html`。

## SEO（2026-07-26 完成并已上线）
og-cover 1200×630、ItemList JSON-LD、WebSite+SearchAction、Organization(sameAs 小红书+二维码 contactPoint)、llms.txt、robots/sitemap(含子页)、4 子页 BreadcrumbList、各子页 canonical/OG/Twitter 齐全。

## 经验教训（Bug 根因与核验规则）
- **SVG**：裸 `<polyline>/<circle>/<path>` 不包 `<svg>` 容器不渲染；`<svg>` 必须 `viewBox`+`preserveAspectRatio`；坐标须对齐参考元素。
- **z-index**：多层叠加用 z-index+命名字段，勿只靠 DOM 顺序。
- **尺寸写死**：包围盒/虚线框坐标变化时须从 item 数组动态算；`left/top/w/h` 须与元素边缘严格对应（Playwright 验证）。
- **函数签名**：`txt(x,y,w,s,size,color,bold)` 第4参是**文本 s** 非高度；复用/新增函数逐参核对签名。
- **数据新增**：加术语前 grep 确认词库已有；分类须 10 白名单之一；新增后必跑 `verify_ppthub.js`(13项)+`demo_runtime_test.js`(jsdom, 需 NODE_PATH) 全绿。
- **大文件编辑**：data.js(1500+)/demos.js(3000+) 改后扫乱码 `[\ufffd]`；优先 Edit 精准定位，批量用脚本。
- **scrollIntoView 禁用**（已修）：容器滚用 `nav.scrollBy`。
- **backdrop-filter 包含块陷阱**：`backdrop-filter/filter/transform/perspective` 让元素成 fixed 子元素包含块→fixed 子元素钉祖先盒。修法：移到 `::before`(`position:fixed;inset:0;z-index:-1`)。
- **CSS 颜色非法**：`#RRGGBB/#RGB` 外均非法（`#1a3300fff` 等被静默忽略→深色底不可见）；浅色文字在白底模式须改深色 `#1a3300`。改色后 `grep -Pn 'color:#[0-9a-fA-F]{7,}|color:#([d-eD-E]..){2,}'` 扫描。
- **批量正则禁多遍叠加（重大）**：同文件跑第二遍修复正则会在已修处叠加损坏（`.5))47,111,58,.5)`），整文件崩→`DEMOS` 未定义→全挂。正确：优先 Edit；必须批量写一次性脚本不重复跑同正则；改完 `node --check`；崩了从线上基线覆盖单次修。门禁第17项 `node --check` 已加固。
- **tools.md 付费周期判定**：以官网 pricing 真实重置周期为准（daily/monthly/one-time），禁常识拍脑门；无免费档→付费，一次性额度→免费，每日/每月重置→对应档。
