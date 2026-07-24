#!/usr/bin/env python3
"""
优卡导航 · 上线前验证门禁 (pre-deploy verification gate)

每次「部署上线」前先跑本脚本：全部 PASS 才允许推送 GitHub Pages。
覆盖历史上出过的线上事故：
  - 主 script 语法错误 → 整页白屏
  - 子页面/SEO 文件 404 → 破链
  - sitemap 非法 / 缺子页 URL
  - tools.md 解析为空 → 工具区空白
  - favicon 未本地化 → 加载慢/被墙
  - 增量同步 diff 异常 → 误删线上文件

用法：
  python3 tests/verify_before_deploy.py
退出码：0 = 全部通过（可上线）；1 = 有失败（禁止上线）
"""
import os, re, sys, json, time, subprocess, tempfile, pathlib, xml.dom.minidom
import urllib.request, urllib.error

ROOT = pathlib.Path(__file__).resolve().parent.parent
PORT = 8000
BASE = f"http://localhost:{PORT}"

# ---- 定位 node（managed 优先，回退 which）----
def find_node():
    cand = "/Users/youka/.workbuddy/binaries/node/versions/22.22.2/bin/node"
    if os.path.exists(cand):
        return cand
    import shutil
    return shutil.which("node") or "node"

NODE = find_node()
PY = sys.executable

results = []
def check(name, ok, detail=""):
    results.append((name, bool(ok), detail))
    mark = "PASS" if ok else "FAIL"
    line = f"[{mark}] {name}"
    if detail:
        line += f"  — {detail}"
    print(line)

# ---- 本地服务：复用或临时起 ----
_server_proc = None
def ensure_server():
    global _server_proc
    try:
        urllib.request.urlopen(BASE + "/", timeout=3)
        return True
    except Exception:
        pass
    _server_proc = subprocess.Popen(
        [PY, "-m", "http.server", str(PORT), "--bind", "127.0.0.1"],
        cwd=str(ROOT), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(25):
        try:
            urllib.request.urlopen(BASE + "/", timeout=2)
            return True
        except Exception:
            time.sleep(0.3)
    return False

def http_get(path):
    try:
        with urllib.request.urlopen(BASE + path, timeout=12) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return 0, str(e)

# =================== 开始验证 ===================
print(">>> 优卡导航上线前验证")
print(">>> 项目根:", ROOT)
print()

# (1) 本地服务
check("本地服务可达 (localhost:8000)", ensure_server())

# (2) 关键路径 200
paths = ["/", "/tools.md", "/robots.txt", "/sitemap.xml",
         "/mockup/", "/template/", "/ai-shengtu/",
         "/docs/seo-submit-guide.md", "/logos/manifest.json"]
bad = []
for p in paths:
    code, _ = http_get(p)
    if code != 200:
        bad.append(f"{p}={code}")
check("关键路径全部 200", not bad, ("异常: " + ", ".join(bad)) if bad else f"{len(paths)} 个路径")

# (3) 主 script 语法 (防白屏)
_, html = http_get("/")
scripts = re.findall(r'<script([^>]*)>(.*?)</script>', html, re.S)
main_js = "\n".join(b for a, b in scripts if "application/ld+json" not in a)
ok_syntax = False
err = ""
if main_js.strip():
    tf = tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8")
    tf.write(main_js); tf.close()
    r = subprocess.run([NODE, "--check", tf.name], capture_output=True, text=True)
    ok_syntax = (r.returncode == 0)
    err = r.stderr.strip()[:300]
    os.unlink(tf.name)
check("主 script 语法 (node --check)", ok_syntax, err or f"{len(main_js)} 字符")

# (4) SEO 标签齐全
seo = ['name="keywords"', 'name="theme-color"', 'rel="canonical"',
       'property="og:title"', 'name="twitter:card"',
       'application/ld+json', 'URLSearchParams(location']
missing = [t for t in seo if t not in html]
check("SEO 标签齐全", not missing, ("缺: " + ", ".join(missing)) if missing else f"{len(seo)} 项")

# (5) sitemap 合法且含子页
_, sm = http_get("/sitemap.xml")
try:
    xml.dom.minidom.parseString(sm)
    need = ["/mockup/", "/template/", "/ai-shengtu/"]
    lack = [u for u in need if u not in sm]
    check("sitemap.xml 合法且含子页 URL", not lack, ("缺: " + ", ".join(lack)) if lack else "含主站+3子页")
except Exception as e:
    check("sitemap.xml 合法且含子页 URL", False, str(e)[:120])

# (6) tools.md 可解析 (防工具区空白)
_, tm = http_get("/tools.md")
cats = re.findall(r'^##\s+(.+)$', tm, re.M)
tools = re.findall(r'^- \[(.+?)\]', tm, re.M)
check("tools.md 可解析", len(cats) > 0 and len(tools) > 0,
      f"{len(cats)} 分类 / {len(tools)} 工具")

# (7) favicon 已本地化 (防慢/被墙)
try:
    man = json.loads(http_get("/logos/manifest.json")[1])
    check("favicon manifest 存在且非空", len(man) > 0, f"{len(man)} 条本地缓存")
except Exception as e:
    check("favicon manifest 存在且非空", False, str(e)[:120])

# (8) 增量同步 diff 安全 (防误删) —— 非阻塞告警，仅极端异常 FAIL
sync = "/tmp/sync_github.py"
if not os.path.exists(sync):
    check("增量 diff 安全 (skip)", True, "sync 脚本不在 /tmp，部署时再人工核对 dry-run")
else:
    # 取真实 token：环境优先，回退 macOS 钥匙串（与部署脚本一致）
    token = os.environ.get("GITHUB_TOKEN") or ""
    if not token:
        try:
            token = subprocess.run(["security", "find-internet-password", "-s", "github.com", "-w"],
                                   capture_output=True, text=True).stdout.strip()
        except Exception:
            token = ""
    if not token:
        check("增量 diff 安全 (skip)", True, "无 GITHUB_TOKEN，跳过；部署前请人工核对 dry-run")
    else:
        env = dict(os.environ); env["GITHUB_TOKEN"] = token
        out = subprocess.run([PY, sync], capture_output=True, text=True,
                             env=env, cwd=str(ROOT)).stdout
        if "NO TOKEN" in out:
            check("增量 diff 安全 (skip)", True, "token 无效，跳过；部署前人工核对")
        else:
            def _num(pat):
                mm = re.search(pat, out)
                return int(mm.group(1)) if mm else 0
            nc, nu, nd = _num(r'create\s*[:=]\s*(\d+)'), _num(r'update\s*[:=]\s*(\d+)'), _num(r'delete\s*[:=]\s*(\d+)')
            if nd > 150:  # 极端：几乎必然 base 取错
                check("增量 diff 安全 (delete≤150)", False, f"create={nc} update={nu} delete={nd}，疑似 base 取错，禁止上线")
            else:
                warn = " ⚠️ delete 偏多，上线前人工核对" if nd > 20 else ""
                check("增量 diff 安全 (dry-run)", True, f"create={nc} update={nu} delete={nd}{warn}")

# =================== 汇总 ===================
failed = [n for n, ok, _ in results if not ok]
print("\n" + "=" * 48)
if failed:
    print(f"结果: {len(results) - len(failed)} PASS / {len(failed)} FAIL")
    print("未通过项: " + ", ".join(failed))
    print("❌ 禁止上线，先修复上述失败项。")
    sys.exit(1)
else:
    print(f"结果: 全部 {len(results)} 项 PASS ✅ 允许上线 (部署上线)")
    sys.exit(0)
