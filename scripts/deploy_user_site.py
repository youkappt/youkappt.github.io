#!/usr/bin/env python3
# 部署推送：把本地 youka-nav 的运行必需文件同步到 GitHub Pages 仓库 youkappt.github.io
# 走 Git Data API（建 blob -> 嵌套 tree -> commit -> PATCH ref），原子单 commit。
# 用 curl 驱动网络（环境内 Python urllib 走不通，curl 通）。
# 策略（默认增量）：
#   - INCREMENTAL=1（默认）：本地文件 git blob 哈希若与线上 base tree 中记录的 SHA 一致，
#     则直接复用旧 blob SHA（不重新上传），仅上传新增/变更文件；tree 对象每次重建（很小很快）。
#   - INCREMENTAL=0：退回全量重建（每个文件都重新上传）。
#   - DRYRUN=1：仅统计将要上传/跳过的 blob 数量，不真正写任何数据（安全预检）。
#   保留 .github（工作流）来自线上 base tree，避免本地误改破坏 Pages 部署。
import os, sys, json, base64, subprocess, time, tempfile, hashlib

REPO = "youkappt/youkappt.github.io"
LOCAL = "/Users/youka/WorkBuddy/youka-nav"
API = f"https://api.github.com/repos/{REPO}"

EXCLUDE_DIRS = {".git", ".workbuddy", "node_modules", "__pycache__",
                "assets/ip", "tests", "docs", "generated-images"}
EXCLUDE_FILES = {"fetch_logos.py", "README.md", ".DS_Store"}

COMMIT_MSG = "deploy: 优卡导航 站点更新（增量上传）"

INCREMENTAL = os.environ.get("INCREMENTAL", "1") != "0"
DRYRUN = os.environ.get("DRYRUN", "0") == "1"

# 线上 base tree 的 path->sha 映射（仅 INCREMENTAL 时填充）
BASE_MAP = {}
_STAT = {"upload": 0, "skip": 0}

def get_token():
    return subprocess.check_output(["security", "find-internet-password", "-s", "github.com", "-w"],
                                   stderr=subprocess.DEVNULL).decode().strip()

TOKEN = get_token()

def api(method, path, data=None):
    url = API + path
    cmd = ["curl", "-sS", "-m", "120", "-X", method, url,
           "-H", f"Authorization: Bearer {TOKEN}",
           "-H", "Accept: application/vnd.github+json",
           "-H", "User-Agent: sync-user-site"]
    # 大文件(base64 webp 等)若用 -d 命令行参数会超 ARG_MAX 导致 curl 起不来，
    # 一律写临时文件用 --data-binary @file 传递，规避参数长度上限。
    tmp = None
    if data is not None:
        fd, tmp = tempfile.mkstemp(suffix=".json")
        with os.fdopen(fd, "w") as f:
            f.write(json.dumps(data))
        cmd += ["-H", "Content-Type: application/json", "--data-binary", f"@{tmp}"]
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    finally:
        if tmp and os.path.exists(tmp):
            os.unlink(tmp)
    if r.returncode != 0:
        print(f"[ERR] curl {method} {path}: {r.stderr[:500]}")
        raise SystemExit(1)
    out = r.stdout.strip()
    if not out:
        return {}
    try:
        return json.loads(out)
    except json.JSONDecodeError:
        print(f"[ERR] non-json {method} {path}: {out[:300]}")
        raise SystemExit(1)

def git_blob_sha(path):
    # 与 GitHub 一致的 git blob 哈希： "blob <size>\0<content>"
    with open(path, "rb") as f:
        content = f.read()
    h = hashlib.sha1()
    h.update(b"blob " + str(len(content)).encode() + b"\0")
    h.update(content)
    return h.hexdigest()

def load_base_map(base_tree_sha):
    # 递归取线上 base tree，建立 path->sha（仅 blob 节点）
    d = api("GET", f"/git/trees/{base_tree_sha}?recursive=1")
    m = {}
    for e in d.get("tree", []):
        if e["type"] == "blob":
            m[e["path"]] = e["sha"]
    if d.get("truncated"):
        print("[WARN] base tree 被截断，增量可能漏判（仅变慢，不影响正确性）")
    return m

def create_blob(path, relpath):
    if DRYRUN:
        # 不真正上传，仅统计
        if INCREMENTAL and relpath in BASE_MAP and BASE_MAP[relpath] == git_blob_sha(path):
            _STAT["skip"] += 1
        else:
            _STAT["upload"] += 1
        return "dryrun"
    with open(path, "rb") as f:
        content = f.read()
    # 增量：内容未变则复用线上 blob SHA，跳过上传
    if INCREMENTAL and relpath in BASE_MAP and BASE_MAP[relpath] == git_blob_sha(path):
        _STAT["skip"] += 1
        if _STAT["skip"] % 50 == 0:
            print(f"  ...复用未变更 blob {_STAT['skip']}")
        return BASE_MAP[relpath]
    try:
        text = content.decode("utf-8")
        payload = {"content": text, "encoding": "utf-8"}
    except UnicodeDecodeError:
        payload = {"content": base64.b64encode(content).decode(), "encoding": "base64"}
    r = api("POST", "/git/blobs", payload)
    _STAT["upload"] += 1
    if _STAT["upload"] % 25 == 0:
        print(f"  ...已上传 blob {_STAT['upload']}")
    return r["sha"]

def build_tree(rel):
    full = LOCAL if rel == "." else os.path.join(LOCAL, rel)
    entries = []
    for name in sorted(os.listdir(full)):
        p = os.path.join(full, name)
        child = name if rel == "." else os.path.normpath(os.path.join(rel, name))
        if os.path.isdir(p):
            if child in EXCLUDE_DIRS:
                continue
            sub_sha = build_tree(child)
            entries.append({"path": name, "mode": "040000", "type": "tree", "sha": sub_sha})
        else:
            if name in EXCLUDE_FILES:
                continue
            sha = create_blob(p, child)
            entries.append({"path": name, "mode": "100644", "type": "blob", "sha": sha})
    if DRYRUN:
        return "dryrun"
    tree = api("POST", "/git/trees", {"tree": entries})
    print(f"[tree] {rel or '.'} -> {tree['sha'][:8]} ({len(entries)} entries)")
    return tree["sha"]

def main():
    t0 = time.time()
    ref = api("GET", "/git/refs/heads/main")
    base_commit = ref["object"]["sha"]
    base = api("GET", f"/git/commits/{base_commit}")
    base_tree = base["tree"]["sha"]
    print(f"base commit: {base_commit[:8]}  base tree: {base_tree[:8]}")
    if INCREMENTAL:
        global BASE_MAP
        BASE_MAP = load_base_map(base_tree)
        print(f"[增量] 线上 base tree 含 {len(BASE_MAP)} 个 blob")

    # 取线上 .github 的 tree sha（保留工作流）
    github_sha = None
    bt = api("GET", f"/git/trees/{base_tree}")
    for e in bt.get("tree", []):
        if e["path"] == ".github" and e["type"] == "tree":
            github_sha = e["sha"]
    if not github_sha:
        print("[WARN] 线上未找到 .github，将不保留工作流！")
    root_entries = []
    if github_sha:
        root_entries.append({"path": ".github", "mode": "040000", "type": "tree", "sha": github_sha})

    for name in sorted(os.listdir(LOCAL)):
        if name == ".github":
            continue
        p = os.path.join(LOCAL, name)
        if os.path.isdir(p):
            if name in EXCLUDE_DIRS:
                continue
            sub_sha = build_tree(name)
            root_entries.append({"path": name, "mode": "040000", "type": "tree", "sha": sub_sha})
        else:
            if name in EXCLUDE_FILES:
                continue
            sha = create_blob(p, name)
            root_entries.append({"path": name, "mode": "100644", "type": "blob", "sha": sha})

    if DRYRUN:
        total = _STAT["upload"] + _STAT["skip"]
        print(f"\n[DRYRUN] 将上传 blob {_STAT['upload']} 个，将跳过(复用) {_STAT['skip']} 个，"
              f"涉及文件共 {total} 个。未真正写入。")
        return

    root_tree = api("POST", "/git/trees", {"tree": root_entries})
    print(f"new root tree: {root_tree['sha'][:8]}  entries={len(root_entries)}")

    commit = api("POST", "/git/commits",
                 {"message": COMMIT_MSG, "tree": root_tree["sha"], "parents": [base_commit]})
    new_sha = commit["sha"]
    print(f"new commit: {new_sha[:8]}  ({int(time.time()-t0)}s)")

    api("PATCH", "/git/refs/heads/main", {"sha": new_sha, "force": False})
    print(f"✅ ref main -> {new_sha[:8]}  (总耗时 {int(time.time()-t0)}s, "
          f"上传 {_STAT['upload']} / 跳过 {_STAT['skip']})")

if __name__ == "__main__":
    main()
