#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自托管 Google Fonts（仅拉丁字体，中文走系统字体 PingFang/微软雅黑）。

- 拉取 Bricolage Grotesque / Inter / Roboto Mono 的 woff2（latin + latin-ext 子集）
- 生成本地 fonts/fonts.css（@font-face 指向同目录 woff2）
- 中文 Noto Sans SC 不下载（体积大），改由 CSS 变量回退到系统中文黑体，效果更佳且零体积

运行：python3 fetch_fonts.py   （需联网；在 ppthub/ 目录或任意目录均可，输出到脚本同级的 fonts/）
"""
import os
import re
import sys
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = HERE

# (family, css2-name, weights) —— 与 styles.css 中实际使用的字重一致
FAMILIES = [
    ("Bricolage Grotesque", "Bricolage+Grotesque", "400;500;600;700;800"),
    ("Inter",               "Inter",               "400;500;600;700"),
    ("Roboto Mono",         "Roboto+Mono",         "400;500"),
]

CSS2 = "https://fonts.googleapis.com/css2?family={name}:wght@{weights}&display=swap"
# 用桌面 Chrome UA，Google 才会返回 woff2（否则给 ttf）
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")


def fetch_text(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8")


def fetch_bytes(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def main():
    blocks = []          # (family, weight, subset, woff2_url)
    for family, name, weights in FAMILIES:
        css = fetch_text(CSS2.format(name=name, weights=weights))
        # 按 @font-face 块切分，块前有注释标记子集，如  /* latin */
        parts = re.split(r"(/\*\s*[^*]+\*/)", css)
        # parts: [pre, comment, face, comment, face, ...]
        i = 1
        while i + 1 < len(parts):
            comment = parts[i]
            face = parts[i + 1]
            m_sub = re.search(r"/\*\s*([\w-]+)\s*\*/", comment)
            subset = m_sub.group(1) if m_sub else "latin"
            if subset not in ("latin", "latin-ext"):
                i += 2
                continue
            m_url = re.search(r"url\((https://[^)]+\.woff2)\)", face)
            m_w = re.search(r"font-weight:\s*(\d+)", face)
            if not m_url or not m_w:
                i += 2
                continue
            blocks.append((family, m_w.group(1), subset, m_url.group(1)))
            i += 2

    # 下载 woff2
    seen = set()
    css_rules = []
    for family, weight, subset, url in blocks:
        fname = f"{family.split()[0].lower()}-{weight}-{subset}.woff2"
        if (family, weight, subset) in seen:
            continue
        seen.add((family, weight, subset))
        path = os.path.join(OUT, fname)
        print(f"  ↓ {family} {weight} {subset} -> {fname}")
        data = fetch_bytes(url)
        with open(path, "wb") as f:
            f.write(data)
        css_rules.append(
            "  @font-face {\n"
            f"    font-family: '{family}';\n"
            f"    font-style: normal;\n"
            f"    font-weight: {weight};\n"
            "    font-display: swap;\n"
            f"    src: local('{family}'), url('./{fname}') format('woff2');\n"
            "  }"
        )

    css_text = "/* 自托管拉丁字体 —— 由 fetch_fonts.py 生成，勿手改 */\n" + "\n".join(css_rules) + "\n"
    with open(os.path.join(OUT, "fonts.css"), "w", encoding="utf-8") as f:
        f.write(css_text)
    print(f"\n✅ 生成 fonts/fonts.css，共 {len(css_rules)} 条 @font-face")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("❌ 下载失败:", e, file=sys.stderr)
        sys.exit(1)
