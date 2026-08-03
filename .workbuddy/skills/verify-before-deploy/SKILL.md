---
name: verify-before-deploy
description: 优卡导航(youka-nav)上线前验证门禁。当用户说「部署上线 / 更新部署 / 发布」之前，必须先运行 tests/verify_before_deploy.py 做 8 项本地校验，全部 PASS(EXIT=0)才允许推送 GitHub Pages；任一 FAIL 禁止上线。覆盖历史上出过的白屏/破图/误删/SEO 缺失等线上事故。
---

# 上线前验证门禁 (youka-nav)

> 触发：用户明确要求把 youka-nav 部署上线之前。**这是硬性门禁，不可跳过。**

## 流程

1. 运行验证脚本（项目根目录）：
   ```bash
   cd /Users/youka/WorkBuddy/youka-nav
   python3 tests/verify_before_deploy.py
   echo "EXIT=$?"
   ```
2. 判读退出码：
   - `EXIT=0`（全部 PASS）→ 允许继续部署（按用户授权的部署方式推送）。
   - `EXIT=1`（有 FAIL）→ **停止，先修复失败项**，重新验证直到全 PASS。严禁带红部署。

## 8 项检查（脚本已固化，无需手记）
1. 本地服务可达（localhost:8000，脚本会自动起/复用）
2. 关键路径全部 200（/、/tools.md、/robots.txt、/sitemap.xml、/mockup/、/template/、/ai-shengtu/、/docs/seo-submit-guide.md、/logos/manifest.json）
3. 主 script 语法（`node --check`，防整页白屏）
4. SEO 标签齐全（keywords / theme-color / canonical / og:title / twitter:card / ld+json / ?q=）
5. sitemap.xml 合法且含子页 URL
6. tools.md 可解析（分类数/工具数 > 0，防工具区空白）
7. favicon 本地化（logos/manifest.json 存在非空，防慢/被墙）
8. 增量 diff 安全（调 /tmp/sync_github.py dry-run 报 create/update/delete；delete>150 视为 base 取错 FAIL）

## 实现要点
- 校验脚本：`tests/verify_before_deploy.py`（stdlib + node，零第三方依赖）。
- 增量 diff 检查需要 GitHub token：脚本优先取环境变量 `GITHUB_TOKEN`，回退 macOS 钥匙串 `security find-internet-password -s github.com -w`（与部署脚本一致）；取不到则 skip 并告警（此时部署前需人工核对 dry-run）。
- 注意：GitHub `?recursive=1` tree API 对大仓库会 `truncated`，部署脚本(v1/v2)已处理；若 diff 显示的 delete 异常偏多，先人工核对远程真实 tree，再决定是否上线。
