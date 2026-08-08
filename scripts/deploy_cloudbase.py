#!/usr/bin/env python3
"""
部署推送：把本地 youka-nav 的运行必需文件同步到腾讯云 CloudBase 静态网站托管。
走 tcb CLI（API Key 鉴权）+ `tcb hosting deploy`。

排除规则与 scripts/deploy_user_site.py 保持一致（线上只放运行必需文件）。
注意：CloudBase 静态托管没有 .github 工作流概念，故不保留 .github；
      另排除 CNAME（GitHub Pages 专用，CloudBase 不读它）。

用法：
  # 仅预览将要上传的范围（无需密钥）：
  DRYRUN=1 python3 scripts/deploy_cloudbase.py
  # 真实部署（需先设置环境变量）：
  TCB_SECRET_ID=xxx TCB_SECRET_KEY=yyy python3 scripts/deploy_cloudbase.py
  # 也可显式指定环境：
  TCB_ENV_ID=youkappt-d7gvo1egm55df3bfd ...

环境变量：
  TCB_SECRET_ID   腾讯云 API 密钥 ID（部署时必填）
  TCB_SECRET_KEY  腾讯云 API 密钥 Key（部署时必填）
  TCB_ENV_ID      CloudBase 环境 ID（默认 youkappt-d7gvo1egm55df3bfd）
  TCB_BIN         tcb 可执行文件路径（默认自动查找）
  DRYRUN=1        仅预览范围，不登录/不部署
"""
import os, sys, shutil, tempfile, subprocess, time

LOCAL = "/Users/youka/WorkBuddy/youka-nav"
DEFAULT_ENV = "youkappt-d7gvo1egm55df3bfd"

# 仅保留站点运行必需文件；GitHub Pages 专用文件(.github/.gitignore/.nojekyll/CNAME)、
# 部署脚本(scripts)、开发/文档目录一律排除。
EXCLUDE_DIRS = {".git", ".workbuddy", "node_modules", "__pycache__",
                "assets/ip", "tests", "docs", "generated-images",
                ".github", "scripts"}
EXCLUDE_FILES = {"fetch_logos.py", "README.md", ".DS_Store", "CNAME",
                ".gitignore", ".nojekyll"}


def get_tcb_bin():
    if os.environ.get("TCB_BIN"):
        return os.environ["TCB_BIN"]
    found = shutil.which("tcb")
    if found:
        return found
    cand = "/Users/youka/.workbuddy/binaries/node/workspace/node_modules/.bin/tcb"
    if os.path.exists(cand):
        return cand
    return None


TCB = get_tcb_bin()


def plan_staging():
    print("== 部署范围预览（顶层条目）==")
    up, ex = [], []
    for name in sorted(os.listdir(LOCAL)):
        if os.path.isdir(os.path.join(LOCAL, name)):
            (up if name not in EXCLUDE_DIRS else ex).append(name + "/")
        else:
            (up if name not in EXCLUDE_FILES else ex).append(name)
    print("将上传：")
    for x in up:
        print("  + " + x)
    print("将排除：")
    for x in ex:
        print("  - " + x)
    print(f"（共上传 {len(up)} 个顶层条目，递归文件数见部署时统计）")
    return up


def tcb(*args):
    if not TCB:
        print("[ERR] 找不到 tcb 可执行文件；请 npm i -g @cloudbase/cli 或设置 TCB_BIN")
        raise SystemExit(1)
    cmd = [TCB] + list(args)
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=600)
    if r.returncode != 0:
        print(f"[ERR] tcb {' '.join(args)}:\n{r.stderr[:800]}")
        raise SystemExit(1)
    return r.stdout


def _ignore_rule(src, names):
    # 递归排除：匹配嵌套目录(如 assets/ip)与散落文件(如 .DS_Store)
    rel = os.path.relpath(src, LOCAL)
    out = []
    for n in names:
        child = n if rel == "." else os.path.normpath(os.path.join(rel, n))
        p = os.path.join(src, n)
        if os.path.isdir(p):
            if child in EXCLUDE_DIRS:
                out.append(n)
        else:
            if n in EXCLUDE_FILES:
                out.append(n)
    return out


def build_staging(base):
    n = 0
    for name in sorted(os.listdir(LOCAL)):
        src = os.path.join(LOCAL, name)
        if os.path.isdir(src):
            if name in EXCLUDE_DIRS:
                continue
            shutil.copytree(src, os.path.join(base, name), ignore=_ignore_rule)
        else:
            if name in EXCLUDE_FILES:
                continue
            shutil.copy2(src, os.path.join(base, name))
        n += 1
    return n


def main():
    t0 = time.time()
    env_id = os.environ.get("TCB_ENV_ID", DEFAULT_ENV)
    secret_id = os.environ.get("TCB_SECRET_ID")
    secret_key = os.environ.get("TCB_SECRET_KEY")
    dry = os.environ.get("DRYRUN", "0") == "1" or "--plan" in sys.argv

    if dry:
        plan_staging()
        return

    if secret_id and secret_key:
        print("=> tcb login (apiKey)")
        tcb("login", "--apiKeyId", secret_id, "--apiKey", secret_key)
    else:
        print("=> 未提供 TCB_SECRET_ID/KEY，尝试使用已缓存的 tcb 登录态")

    tmp = tempfile.mkdtemp(prefix="cb-deploy-")
    print(f"=> staging -> {tmp}")
    n = build_staging(tmp)
    print(f"   staged {n} 个顶层条目")
    print(f"=> tcb hosting deploy -> env {env_id}")
    tcb("hosting", "deploy", tmp, "/", "-e", env_id)
    shutil.rmtree(tmp)
    print(f"✅ 部署完成（{int(time.time() - t0)}s）")


if __name__ == "__main__":
    main()
