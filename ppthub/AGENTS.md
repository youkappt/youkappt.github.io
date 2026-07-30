# PPThub · AGENTS.md

> 项目级规则入口。下次 Agent 不读就会犯错的边界、命令、约定都在这里。
> 详细规范见 `docs/自查规范.md`；共享案例库与 demo 在 `demos.js` / `data.js` / `terms-extra.js`。

## 一句话定位
PPT 术语图鉴（ppthub）：纯静态单页工具站，182 个 PPT 术语，每个详情含「动手试试」真实案例 demo。是 youka-nav 的子页，挂在 `youkappt.com/ppthub/`。

## 怎么跑
- 本地预览（在仓库根 `youka-nav` 起服务）：`python3 -m http.server 8042`，访问 `http://localhost:8042/ppthub/`。深链：`/ppthub/?term=<id>`。
- 改完必跑三道门禁（见 `docs/自查规范.md` §1）：
  1. `node --check data.js demos.js terms-extra.js app.js`
  2. `node tests/verify_ppthub.js`（12 项）
  3. `NODE_PATH=/Users/youka/.workbuddy/binaries/node/workspace/node_modules node tests/demo_runtime_test.js`
- 部署：**显式授权才推**（默认只改本地）。GitHub Pages 用户站，推送走 GitHub API（见主站 MEMORY.md 推送约定）。

## 技术栈
纯静态（无构建）。运行时把 `data.js` 等作为全局变量加载。暗色玻璃拟态设计系统（`styles.css` + `app.js` 内联）。

## 目录与约定
- `data.js` — `TERMS` 数组，182 条，字段 `id/name/alias/category/level/summary/detail/scenario/related/demo`。
- `demos.js` — 顶部 `const CASES`（真实中文 PPT 案例库）；`DEMOS[id](c)` 动手试试渲染函数应使用真实内容，完整页 demo 优先按术语稳定分配案例；不要在 UI 顶部露出「案例：」标签或「↻ 换一个真实案例」按钮。范式见自查规范 §6。
- `terms-extra.js` — `TERM_EXTRA[id]` 补字段：`pitfall`/`mnemonic` 必填，`shortcut`/`combo`/`checklist`/`etymology` 可选。
- 闭合约定：各对象末条无逗号 + `};`；插入新块时先给上一末条补逗号。

## 当前状态与下一步
- 真实案例化「动手试试」：已 182 个全部完成。
- 下一步：按用户反馈持续打磨 demo 案例质量。

## 铁律
1. 改完必须跑门禁全绿才算完（禁止只靠肉眼）。
2. 新增术语三处（data / demos / terms-extra）齐备；related 只引用已存在 id。
3. 真实案例 demo 一律抽 `CASES` 库，禁止硬编码假占位；不要在 UI 顶部露出「案例：」标签或「↻ 换一个真实案例」按钮。
