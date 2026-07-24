# 优卡导航 · 搜索引擎收录提交指南

> 维护者：优卡 / youka ｜ 最后更新：2026-07-24

## 一、线上已就绪的 SEO 基础（代码侧已完成）

- `robots.txt`：放行全部爬虫，并指向 `sitemap.xml`
- `sitemap.xml`：收录主站 + `mockup/` + `template/` + `ai-shengtu/` 落地页
- 结构化数据 JSON-LD（`WebSite` + `SearchAction`）、Open Graph、Twitter Card
- 首页底部分类文字导航（`<nav id="catNav">`）：内部链接 + 关键词密度
- 长尾落地页 `ai-shengtu/`：「AI 生图工具怎么选？2026 最全对比与推荐」
- 关键词随 `tools.md` 自动增长（`injectSEOMeta`），站内搜索支持同义词/分词

## 二、Google Search Console（强烈建议做）

1. 打开 https://search.google.com/search-console
2. 添加属性：输入 `https://youkappt.com/`，类型选「网址前缀」
3. 验证所有权（任选其一）：
   - **HTML 标记**：复制 GSC 提供的 `<meta name="google-site-verification" content="...">`，发给助理，由助理加进 `index.html` 的 `<head>`
   - **Google Analytics / GTM**：若已接入可直接关联验证
   - GitHub Pages 也可在仓库根放 GSC 要求的 `googleXXXX.html` 验证文件（需随部署上传）
4. 左侧「站点地图」→ 输入 `sitemap.xml` → 提交
5. 「URL 检查」可逐个提交首页、`ai-shengtu/` 等重要页面，加速收录

## 三、Bing Webmaster Tools（覆盖 Bing / DuckDuckGo / 部分 ChatGPT 入口）

1. 打开 https://www.bing.com/webmasters
2. 添加站点并验证（方式同上）
3. 「站点地图」提交 `sitemap.xml`
4. 可选：用 Bing URL Submission API（需 API key）批量推送新页面

## 四、免登录快速通知（ping）

以下链接直接用浏览器打开即可通知爬虫重新抓取（无需登录，但不能替代上面的账号验证）：

- Google: `https://www.google.com/ping?sitemap=https://youkappt.com/sitemap.xml`
- Bing: `https://www.bing.com/ping?sitemap=https://youkappt.com/sitemap.xml`

## 五、注意事项

- 每次「部署上线」后建议重新 ping 一次
- 新落地页 / 新分类要写进 `sitemap.xml` 才会被收录（目前由人工/脚本维护）
- 收录通常需要数天~数周，GSC 里可看到抓取与收录状态
- 想扩更多长尾落地页：复制 `ai-shengtu/` 目录修改文案即可，记得把新 URL 加进 `sitemap.xml`
- `og:image` 目前用 `logo.png` 兜底，联网正常时生成 1200×630 品牌图替换体验更佳
