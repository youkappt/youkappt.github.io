#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
优卡导航 · favicon 本地化脚本
================================
来源优先级（2026-07-23 修订）：官网高清（apple-touch-icon / 大尺寸 icon，≥48px）→ Google → DuckDuckGo → icon.horse（180px，单色但高清）→ favicone.com（兜底）→ 色块（留空）。
背景：Google/DDG 被墙时 favicone 只有 16×16 小图，在 40×40 显示区（Retina 实际 80px）会糊，故官网高清优先。

用法：
    python3 fetch_logos.py

说明：
- 解析同目录 tools.md，提取所有工具域名（去重）。
- 启动时对三个来源各做一次连通性探测，连不上的源整体跳过（避免每个域名干等超时）。
- 对每个域名按优先级依次尝试，首个成功即保存到 logos/{domain}.ico(.png/.svg)。
- BAD_FAV_DOMAINS：Google/DDG 对这些域名只返回通用占位图 → 跳过这两源，仅用 favicone（官网原图）尝试。
- 生成 logos/manifest.json：{ "域名": "文件名" }，供网页精确引用（避免 .png/.ico 扩展名猜测与 404）。
- 全程使用标准库，无需 pip 安装。

注意：Google（及部分网络下 DDG）在中国大陆被墙时会自动跳过，落到 favicone.com（实测大陆可访问）。
"""
import os
import re
import sys
import json
import urllib.request
import urllib.error

ROOT = os.path.dirname(os.path.abspath(__file__))
TOOLS_MD = os.path.join(ROOT, "tools.md")
OUT = os.path.join(ROOT, "logos")
MANIFEST = os.path.join(OUT, "manifest.json")
TIMEOUT = 25  # favicone 实测单请求 ~11s，超时必须给足

# 第三方只返回通用占位图（非品牌 logo）的域名 → 跳过，网页显示色块
BAD_FAV_DOMAINS = {
    "y2mate.com", "y2mate.is", "y2mate.org",
    "tikmate.app", "tikmate.online",
    "snaptik.app",
    "savefrom.net",
    "calligrapher.ai",
    "qiuziti.com",
    "ssyer.com",
    "magician.design",
    "unsplash.com",
    "stocksnap.io",
}

UA = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,image/avif,image/webp,image/*,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
}


def extract_domains(md_path):
    domains = []
    seen = set()
    pat = re.compile(r"\]\((https?://([^/)\s]+))")
    with open(md_path, encoding="utf-8") as f:
        for line in f:
            m = pat.search(line)
            if not m:
                continue
            dom = m.group(2).lower()
            if dom not in seen:
                seen.add(dom)
                domains.append(dom)
    return domains


def fetch_bytes(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        data = r.read()
        ctype = (r.headers.get("Content-Type") or "").lower()
        if r.status != 200 or not data:
            return None
        # 接受明确的图片类型，或按魔法字节兜底
        if "image" in ctype or data[:4] in (b"\x00\x00\x01\x00", b"\x89PNG", b"GIF8") \
           or data[:5] == b"<?xml" or data[:4] == b"<svg":
            return data
    return None


def ext_of(data):
    if data[:4] == b"\x89PNG":
        return "png"
    if data[:4] == b"\x00\x00\x01\x00":
        return "ico"
    if data[:5] == b"<?xml" or data[:4] == b"<svg":
        return "svg"
    if data[:4] == b"GIF8":
        return "gif"
    if data[:3] == b"\xff\xd8\xff":
        return "jpg"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "webp"
    return "ico"


def png_size(data):
    """返回 PNG 宽度，非 PNG 返回 None。"""
    if data[:4] == b"\x89PNG" and len(data) >= 24:
        import struct
        try:
            w, h = struct.unpack(">II", data[16:24])
            return max(w, h)
        except Exception:
            return None
    return None


def ico_max_size(data):
    """返回 ICO 内最大图像边长，非 ICO 返回 None。0 表示 256。"""
    if data[:4] != b"\x00\x00\x01\x00" or len(data) < 6:
        return None
    n = int.from_bytes(data[4:6], "little")
    best = 0
    for i in range(n):
        off = 6 + i * 16
        if off + 2 > len(data):
            break
        w = data[off] or 256
        h = data[off + 1] or 256
        best = max(best, w, h)
    return best or None


def img_size(data):
    """尽力判断图像边长；SVG 视为矢量返回 9999；未知返回 None。"""
    if data[:5] == b"<?xml" or data[:4] == b"<svg" or b"<svg" in data[:256]:
        return 9999
    s = png_size(data)
    if s:
        return s
    s = ico_max_size(data)
    if s:
        return s
    return None


HTML_ICON_RE = re.compile(
    r'<link[^>]+rel=["\']?([^"\'>]*(?:apple-touch-icon|icon)[^"\'>]*)["\']?[^>]*>',
    re.I,
)
HREF_RE = re.compile(r'href=["\']?([^"\'\s>]+)', re.I)
SIZES_RE = re.compile(r'sizes=["\']?(\d+)x\d+', re.I)


def fetch_html(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        return r.read(300 * 1024).decode("utf-8", "ignore"), r.geturl()


def try_official(dom):
    """从官网抓高清图标：apple-touch-icon / 带 sizes 的大图 / /apple-touch-icon.png。
    返回 (bytes, ext) 或 None（仅接受 ≥48px）。"""
    from urllib.parse import urljoin
    base = "https://" + dom + "/"
    candidates = []  # (score, url)
    try:
        html, final_url = fetch_html(base)
        for m in HTML_ICON_RE.finditer(html):
            tag = m.group(0)
            rel = m.group(1).lower()
            hm = HREF_RE.search(tag)
            if not hm:
                continue
            href = urljoin(final_url, hm.group(1))
            sm = SIZES_RE.search(tag)
            size = int(sm.group(1)) if sm else 0
            score = size
            if "apple-touch-icon" in rel:
                score = max(score, 180)
            elif size == 0:
                score = 24  # 无 sizes 的普通 icon，优先级低
            candidates.append((score, href))
    except Exception:
        final_url = base
    # 常见约定路径兜底
    candidates.append((180, base + "apple-touch-icon.png"))
    candidates.sort(key=lambda x: -x[0])
    for _, url in candidates[:6]:
        try:
            data = fetch_bytes(url)
            if not data or len(data) < 80:
                continue
            size = img_size(data)
            if size and size >= 48:
                return data, ext_of(data)
        except Exception:
            pass
    return None


SOURCES = [
    ("Google", "https://www.google.com/s2/favicons?domain={dom}&sz=128",
     "https://www.google.com/s2/favicons?domain=example.com&sz=128"),
    ("DuckDuckGo", "https://icons.duckduckgo.com/ip3/{dom}.ico",
     "https://icons.duckduckgo.com/ip3/example.com.ico"),
    ("iconhorse", "https://icon.horse/icon/{dom}",
     "https://icon.horse/icon/example.com"),
    ("favicone", "https://favicone.com/{dom}?larger=true",
     "https://favicone.com/example.com"),
]


def probe_sources():
    """逐源探测连通性，返回可用来源列表（保持优先级顺序）。favicone 响应慢（~11s），探测超时给足。"""
    alive = []
    for name, tpl, probe_url in SOURCES:
        ok = False
        for _ in range(2):  # 各来源最多试 2 次，避免瞬时抖动误判
            try:
                req = urllib.request.Request(probe_url, headers=UA)
                with urllib.request.urlopen(req, timeout=20) as r:
                    r.read(64)
                ok = True
                break
            except Exception:
                pass
        if ok:
            alive.append((name, tpl))
            print(f"  ✓ 来源可用：{name}")
        else:
            print(f"  ✗ 来源不可用（跳过）：{name}")
    return alive


PLACEHOLDER_MD5 = {
    "69fcc69320dff12cc75a118fb047782b",  # favicone 通用地球占位图（1150B ico）
}


def try_sources(dom, sources):
    """按优先级依次尝试，返回 (bytes, ext, 来源名) 或 None。已知占位图直接丢弃。
    以实际图像边长（≥48px）判定有效性，而非字节数——icon.horse 的 180px 图仅 ~165B。"""
    import hashlib
    for name, tpl in sources:
        try:
            data = fetch_bytes(tpl.format(dom=dom))
            if not data or len(data) < 80:
                continue
            if hashlib.md5(data).hexdigest() in PLACEHOLDER_MD5:
                continue
            size = img_size(data)
            if size and size >= 48:
                return data, ext_of(data), name
        except Exception:
            pass
    return None


def main():
    if not os.path.exists(TOOLS_MD):
        print(f"未找到 {TOOLS_MD}", file=sys.stderr)
        sys.exit(1)

    os.makedirs(OUT, exist_ok=True)
    domains = extract_domains(TOOLS_MD)
    print(f"从 tools.md 提取到 {len(domains)} 个去重域名")

    print("\n连通性探测（Google → DuckDuckGo → favicone）：")
    alive = probe_sources()
    if not alive:
        print(
            "\n⚠️  三个来源都连不上，无法下载。网页将按规范降级为色块。\n"
            "换个网络环境后重跑本脚本即可。\n"
        )
        if not os.path.exists(MANIFEST):
            with open(MANIFEST, "w", encoding="utf-8") as f:
                json.dump({}, f)
        return

    # 黑名单域名在兜底阶段跳过 Google/DDG（其返回通用占位图），其余来源照常。

    manifest = {}
    ok = 0
    print()

    def work(dom):
        # 第一优先：官网高清（apple-touch-icon 等，≥48px）
        res = try_official(dom)
        if res:
            data, ext = res
            return dom, (data, ext, "官网高清")
        # 兜底：聚合服务（黑名单域名跳过 Google/DDG，避免通用占位图；仍可用 icon.horse/favicone）
        if dom in BAD_FAV_DOMAINS:
            sources = [(n, t) for n, t in alive if n not in ("Google", "DuckDuckGo")]
        else:
            sources = alive
        if not sources:
            return dom, None
        return dom, try_sources(dom, sources)

    from concurrent.futures import ThreadPoolExecutor, as_completed
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(work, dom) for dom in domains]
        for fut in as_completed(futures):
            dom, res = fut.result()
            if res:
                data, ext, src = res
                fname = f"{dom}.{ext}"
                with open(os.path.join(OUT, fname), "wb") as f:
                    f.write(data)
                manifest[dom] = fname
                ok += 1
                print(f"  ✓ {dom} -> {fname} ({len(data)} bytes, 来源 {src})")
            else:
                print(f"  · {dom}：各来源均无图标 -> 网页显示色块")

    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f"\n完成：{ok}/{len(domains)} 个图标已保存到 {OUT}")
    print(f"manifest 已写入 {MANIFEST}")


if __name__ == "__main__":
    main()
