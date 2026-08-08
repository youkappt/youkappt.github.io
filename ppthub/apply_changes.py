# -*- coding: utf-8 -*-
import io, sys, re

ROOT = '/Users/youka/WorkBuddy/youka-nav/ppthub'

# ---------------------------------------------------------------------------
# 1) DEMOS: rewrite 21 functions (single-pass, brace-counted replacement)
# ---------------------------------------------------------------------------

TEMPLATE = r'''__ABBR__(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="__ABBR__">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row">__BUTTONS__</div>'
    + '<div class="demo-label" style="text-align:center">__HINT__</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
__RENDER__
  }
  fill(); render('__DEFAULT__');
  c.querySelectorAll('[data-m]:not([data-m="__ABBR__"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="__ABBR__"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="__DEFAULT__"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="__ABBR__"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="__ABBR__"])'); render(act ? act.dataset.m : '__DEFAULT__'); };
},
'''

def indent(s):
    return '\n'.join('  ' + ln for ln in s.strip('\n').split('\n'))

def gen(abbr, default, buttons, render, hint):
    t = TEMPLATE
    t = t.replace('__ABBR__', abbr)
    t = t.replace('__BUTTONS__', buttons)
    t = t.replace('__HINT__', hint)
    t = t.replace('__DEFAULT__', default)
    t = t.replace('__RENDER__', indent(render))
    return t

# ---- render bodies (JS, flush-left; literals only, no BC — BC lives in beforeafter.js) ----

R_widescreen = r'''
const cs = CASES[ci];
const ratio = m === '43' ? '4 / 3' : '16 / 9';
const tag = m === '43' ? '4:3（传统投影，上下留黑边）' : '16:9（宽屏，铺满现代屏幕）';
stage.innerHTML =
  '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">'
    + '<div style="width:78%;aspect-ratio:' + ratio + ';background:#fff;border:1px solid rgba(26,51,0,.3);border-radius:6px;display:flex;flex-direction:column;justify-content:center;padding:10px;box-sizing:border-box">'
      + '<div style="font:700 15px var(--font-display);color:#1a3300">' + cs.title + '</div>'
      + '<div style="font:11px var(--font-body);color:#4a5a3a;margin-top:4px">' + cs.subtitle + '</div>'
    + '</div>'
  + '</div>'
  + '<div style="position:absolute;left:8px;top:6px;font:10px var(--font-mono);color:#2f6f3a">' + tag + '</div>';
'''

R_export_pdf = r'''
const cs = CASES[ci];
if (m === 'no') {
  const tofu = cs.title.split('').map(function(ch){ return '■'; }).join('');
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:14px;display:flex;flex-direction:column;gap:8px">'
    + '<div style="font:700 18px var(--font-display);color:#b04a3a">' + tofu + '</div>'
    + '<div style="font:11px var(--font-body);color:#b04a3a">对方电脑缺字体 → 标题乱码、版式错位</div>'
  + '</div>';
} else {
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:14px;display:flex;flex-direction:column;gap:8px">'
    + '<div style="font:700 16px var(--font-display);color:#1a3300">' + cs.title + '</div>'
    + '<div style="font:11px var(--font-body);color:#2f6f3a">字体一并打包进 PDF，任何电脑打开都一致</div>'
    + '<div style="font:11px var(--font-body);color:#4a5a3a">' + cs.subtitle + '</div>'
  + '</div>';
}
'''

R_presenter_view = r'''
const cs = CASES[ci];
if (m === 'pres') {
  stage.innerHTML = '<div style="position:absolute;inset:0;display:flex;background:#16203a">'
    + '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:12px;border-right:1px solid rgba(255,255,255,.15)">'
      + '<div style="font:700 12px var(--font-display);color:#eef3e6">' + cs.title + '</div>'
      + '<div style="margin-top:6px;font:14px var(--font-body);color:#bcd99b">' + cs.subtitle + '</div>'
    + '</div>'
    + '<div style="width:42%;padding:10px;display:flex;flex-direction:column;gap:6px">'
      + '<div style="font:10px var(--font-mono);color:#9fe3c5">⏱ 08:24 · 已讲 ' + cs.part + '</div>'
      + '<div style="font:10px var(--font-body);color:#c2cfe0;line-height:1.4">备注：' + cs.body + '</div>'
      + '<div style="margin-top:auto;font:10px var(--font-mono);color:#7e8aa0">下一页 ▶ ' + cs.partName + '</div>'
    + '</div>'
  + '</div>';
} else {
  stage.innerHTML = '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#16203a">'
    + '<div style="font:700 18px var(--font-display);color:#eef3e6">' + cs.title + '</div>'
  + '</div>';
}
'''

R_hyperlink = r'''
const cs = CASES[ci];
const idx = m === 'p1' ? 0 : (m === 'p2' ? 1 : 2);
const toc = cs.points.slice(0,3).map(function(p, i){
  const on = i === idx;
  return '<div style="display:flex;align-items:center;gap:6px;padding:5px 8px;border-radius:6px;' + (on ? 'background:rgba(47,111,58,.15);border:1px solid #2f6f3a' : 'background:rgba(26,51,0,.05)') + '">'
    + '<span style="font:11px var(--font-mono);color:#2f6f3a">●</span>'
    + '<span style="font:11px var(--font-body);color:' + (on ? '#1a3300' : '#4a5a3a') + '">' + (i+1) + '. ' + p + '</span>'
    + (on ? '<span style="margin-left:auto;font:10px var(--font-mono);color:#2f6f3a">▶ 已跳转</span>' : '')
  + '</div>';
}).join('');
stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:6px">'
  + '<div style="font:700 13px var(--font-display);color:#1a3300">' + cs.title + ' · 目录</div>'
  + toc
+ '</div>';
'''

R_embed_font = r'''
const cs = CASES[ci];
if (m === 'no') {
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:14px;display:flex;flex-direction:column;gap:8px">'
    + '<div style="font:700 16px var(--font-serif);color:#7e8aa0">' + cs.title + '</div>'
    + '<div style="font:11px var(--font-body);color:#b04a3a">未嵌入 → 换电脑被替换成默认字体，版式垮掉</div>'
  + '</div>';
} else {
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:14px;display:flex;flex-direction:column;gap:8px">'
    + '<div style="font:700 16px var(--font-display);color:#1a3300">' + cs.title + '</div>'
    + '<div style="font:11px var(--font-body);color:#2f6f3a">已嵌入 → 无论哪台电脑，字形间距都原样保留</div>'
  + '</div>';
}
'''

R_export_media = r'''
const cs = CASES[ci];
const map = { video:['#2f6f3a','视频 MP4','▶'], img:['#3a8a8a','图片 PNG','▣'], gif:['#cb5521','动态 GIF','◍'] };
const it = map[m] || map.video;
const dark = m === 'video';
stage.innerHTML = '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:' + (dark ? '#16203a' : '#fbfcf7') + '">'
  + '<div style="width:64px;height:46px;border-radius:6px;background:' + it[0] + ';display:flex;align-items:center;justify-content:center;color:#fff;font:14px var(--font-mono)">' + it[2] + '</div>'
  + '<div style="font:700 13px var(--font-display);color:' + (dark ? '#eef3e6' : '#1a3300') + '">' + cs.title + ' → ' + it[1] + '</div>'
  + '<div style="font:11px var(--font-body);color:' + (dark ? '#bcd99b' : '#4a5a3a') + '">导出为 ' + it[1] + '，方便分享与印刷</div>'
+ '</div>';
'''

R_speaker_notes = r'''
const cs = CASES[ci];
if (m === 'show') {
  stage.innerHTML = '<div style="position:absolute;inset:0;display:flex;flex-direction:column">'
    + '<div style="flex:1;padding:12px;display:flex;flex-direction:column;gap:6px">'
      + '<div style="font:700 14px var(--font-display);color:#1a3300">' + cs.title + '</div>'
      + '<div style="font:11px var(--font-body);color:#4a5a3a">' + cs.points[0] + '</div>'
    + '</div>'
    + '<div style="height:38%;background:#fff8e1;border-top:2px solid #e0c060;padding:8px;font:11px var(--font-body);color:#6b5a2a;line-height:1.4">📝 演讲者备注（观众看不到）：' + cs.body + '</div>'
  + '</div>';
} else {
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:6px">'
    + '<div style="font:700 14px var(--font-display);color:#1a3300">' + cs.title + '</div>'
    + '<div style="font:11px var(--font-body);color:#4a5a3a">' + cs.points[0] + '</div>'
    + '<div style="font:10px var(--font-mono);color:#7e8aa0">（备注已隐藏）</div>'
  + '</div>';
}
'''

R_export_dpi = r'''
const cs = CASES[ci];
const dpi = parseInt(m, 10);
const blur = dpi >= 300 ? 0 : (dpi >= 150 ? 1 : 2.5);
stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px">'
  + '<div style="width:100%;height:60px;border-radius:6px;background:linear-gradient(135deg,#2f6f3a,#3a8a8a);filter:blur(' + blur + 'px)"></div>'
  + '<div style="font:700 13px var(--font-display);color:#1a3300">' + cs.title + '</div>'
  + '<div style="font:11px var(--font-body);color:' + (dpi >= 300 ? '#2f6f3a' : '#b04a3a') + '">导出 ' + dpi + ' dpi：' + (dpi >= 300 ? '印刷级清晰，放大不糊' : '屏幕够用，印刷发虚') + '</div>'
+ '</div>';
'''

R_custom_show = r'''
const cs = CASES[ci];
const pick = m === 'pick';
const items = cs.points.map(function(p, i){
  const on = pick ? (i % 2 === 0) : true;
  return '<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;border-radius:6px;' + (on ? 'background:rgba(47,111,58,.12)' : 'opacity:.4;background:rgba(26,51,0,.04)') + '">'
    + '<span style="width:12px;height:12px;border-radius:3px;background:' + (on ? '#2f6f3a' : '#bbbbbb') + '"></span>'
    + '<span style="font:11px var(--font-body);color:#1a3300">' + p + '</span>'
  + '</div>';
}).join('');
stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:6px">'
  + '<div style="font:700 13px var(--font-display);color:#1a3300">' + cs.title + ' · ' + (pick ? '自定义放映清单' : '完整放映') + '</div>'
  + items
+ '</div>';
'''

R_screen_blank_pen = r'''
const cs = CASES[ci];
let inner;
if (m === 'blank') {
  inner = '<div style="position:absolute;inset:0;background:#000"></div>'
    + '<div style="position:absolute;left:0;right:0;bottom:8px;text-align:center;font:10px var(--font-mono);color:#7e8aa0">听众看黑屏，你私下看备注</div>';
} else {
  inner = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:6px">'
    + '<div style="font:700 14px var(--font-display);color:#1a3300">' + cs.title + '</div>'
    + '<div style="font:11px var(--font-body);color:#4a5a3a">' + cs.points[0] + '</div>'
    + '</div>';
  if (m === 'pen') {
    inner = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:6px">'
      + '<div style="font:700 14px var(--font-display);color:#1a3300">' + cs.title + '</div>'
      + '<div style="font:11px var(--font-body);color:#4a5a3a">' + cs.points[0] + '</div>'
      + '<div style="position:absolute;right:14px;bottom:14px;width:60px;height:18px;background:rgba(255,235,59,.55);border-radius:3px;transform:rotate(-3deg)"></div>'
      + '</div>'
      + '<div style="position:absolute;left:12px;top:8px;font:10px var(--font-mono);color:#2f6f3a">✎ 荧光笔标注中</div>';
  }
}
stage.innerHTML = inner;
'''

R_hide_slide = r'''
const cs = CASES[ci];
const hide = m === 'hide';
const thumbs = cs.points.slice(0,4).map(function(p, i){
  const hidden = hide && i === 2;
  return '<div style="flex:1;min-width:0;height:40px;border-radius:5px;border:1px solid ' + (hidden ? '#bbbbbb' : '#2f6f3a') + ';background:' + (hidden ? 'rgba(0,0,0,.06)' : 'rgba(47,111,58,.08)') + ';display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:' + (hidden ? '0.45' : '1') + '">'
    + '<span style="font:10px var(--font-mono);color:' + (hidden ? '#999999' : '#2f6f3a') + '">P' + (i+1) + '</span>'
    + (hidden ? '<span style="font:9px var(--font-mono);color:#b04a3a">隐藏</span>' : '')
  + '</div>';
}).join('');
stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px">'
  + '<div style="font:700 12px var(--font-display);color:#1a3300">' + cs.title + ' · 幻灯片缩略图</div>'
  + '<div style="display:flex;gap:6px">' + thumbs + '</div>'
  + '<div style="font:10px var(--font-body);color:' + (hide ? '#b04a3a' : '#2f6f3a') + '">' + (hide ? '第 3 页已隐藏，放映时跳过' : '全部参与放映') + '</div>'
+ '</div>';
'''

R_narration = r'''
const cs = CASES[ci];
const rec = m === 'rec';
const waves = rec ? '<div style="display:flex;align-items:flex-end;gap:2px;height:18px">' + [3,7,12,5,9,4,11,6,8,5,10,4].map(function(h){ return '<span style="width:3px;height:' + h + 'px;background:#2f6f3a;border-radius:1px"></span>'; }).join('') + '</div>' : '';
stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px;background:' + (rec ? '#16203a' : '#fbfcf7') + '">'
  + '<div style="font:700 13px var(--font-display);color:' + (rec ? '#eef3e6' : '#1a3300') + '">' + cs.title + '</div>'
  + '<div style="font:11px var(--font-body);color:' + (rec ? '#bcd99b' : '#4a5a3a') + '">' + cs.subtitle + '</div>'
  + (rec
      ? '<div style="margin-top:auto;display:flex;align-items:center;gap:8px"><span style="font:10px var(--font-mono);color:#9fe3c5">● REC</span>' + waves + '<span style="margin-left:auto;font:10px var(--font-mono);color:#9fe3c5">00:42</span></div>'
      : '<div style="margin-top:auto;font:10px var(--font-mono);color:#7e8aa0">静音放映</div>')
+ '</div>';
'''

R_cmyk_rgb = r'''
const cs = CASES[ci];
const cmyk = m === 'cmyk';
const col = cmyk ? '#9aa6b0' : '#4f9bff';
stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px">'
  + '<div style="width:100%;height:54px;border-radius:6px;background:' + col + '"></div>'
  + '<div style="font:700 13px var(--font-display);color:#1a3300">' + cs.title + '</div>'
  + '<div style="font:11px var(--font-body);color:' + (cmyk ? '#b04a3a' : '#2f6f3a') + '">' + (cmyk ? '同一品牌色印刷后偏暗偏灰（CMYK 色域窄）' : '屏幕上看到的鲜亮色，印刷会丢饱和') + '</div>'
+ '</div>';
'''

R_live_caption = r'''
const cs = CASES[ci];
const on = m === 'on';
stage.innerHTML = '<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;background:#16203a">'
  + '<div style="padding:12px">'
    + '<div style="font:700 13px var(--font-display);color:#eef3e6">' + cs.title + '</div>'
    + (on
        ? '<div style="margin-top:8px;display:inline-block;padding:6px 10px;background:rgba(0,0,0,.7);border-radius:6px;font:12px var(--font-body);color:#fff">' + cs.body + '</div>'
        : '<div style="margin-top:8px;font:10px var(--font-mono);color:#7e8aa0">（无字幕）</div>')
  + '</div>'
+ '</div>';
'''

R_package = r'''
const cs = CASES[ci];
const full = m === 'full';
const files = full
  ? ['📄 ' + cs.kicker + '.pptx', '🔤 字体/', '🎞 媒体/', '▶ 播放器.exe', '📋 链接.txt']
  : ['📄 ' + cs.kicker + '.pptx'];
stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:7px;background:#fbfcf7">'
  + '<div style="font:700 12px var(--font-display);color:#1a3300">打包文件夹 · ' + cs.title + '</div>'
  + '<div style="display:flex;flex-direction:column;gap:4px">' + files.map(function(f){ return '<div style="font:11px var(--font-body);color:#4a5a3a">' + f + '</div>'; }).join('') + '</div>'
  + '<div style="margin-top:auto;font:10px var(--font-body);color:' + (full ? '#2f6f3a' : '#b04a3a') + '">' + (full ? '字体/视频一并打包，换电脑也能播' : '缺字体和视频，换电脑可能打不开') + '</div>'
+ '</div>';
'''

R_print = r'''
const cs = CASES[ci];
const n = parseInt(m, 10);
let cells = '';
for (var i = 0; i < n; i++) {
  cells += '<div style="flex:1;min-width:0;aspect-ratio:4/3;border:1px solid #2f6f3a;border-radius:4px;background:rgba(47,111,58,.06);display:flex;align-items:center;justify-content:center;font:10px var(--font-mono);color:#2f6f3a">P' + (i+1) + '</div>';
}
stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px">'
  + '<div style="font:700 13px var(--font-display);color:#1a3300">' + cs.title + ' · 讲义（每页 ' + n + ' 张）</div>'
  + '<div style="display:grid;grid-template-columns:repeat(' + (n === 1 ? 1 : (n === 2 ? 2 : 3)) + ',1fr);gap:6px">' + cells + '</div>'
+ '</div>';
'''

R_video_trim = r'''
const cs = CASES[ci];
const trim = m === 'trim';
const inP = 5 / 30 * 100;
const outP = 20 / 30 * 100;
stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px">'
  + '<div style="font:700 13px var(--font-display);color:#1a3300">' + cs.title + ' · 视频剪辑</div>'
  + '<div style="position:relative;height:14px;background:#eeeeee;border-radius:7px;overflow:hidden">'
    + (trim ? '<div style="position:absolute;left:' + inP + '%;right:' + (100 - outP) + '%;top:0;bottom:0;background:#2f6f3a;opacity:.6"></div>' : '')
  + '</div>'
  + '<div style="display:flex;justify-content:space-between;font:10px var(--font-mono);color:#4a5a3a">'
    + '<span>' + (trim ? '入点 00:05' : '00:00') + '</span>'
    + '<span>' + (trim ? '出点 00:20 · 截取 15s' : '完整 00:30') + '</span>'
  + '</div>'
  + '<div style="font:11px var(--font-body);color:' + (trim ? '#2f6f3a' : '#4a5a3a') + '">' + (trim ? '只导出精华片段，体积更小' : '导出整段视频') + '</div>'
+ '</div>';
'''

# buttons + default + hint for the 18 gen demos
GEN = {
  'widescreen': ('43', '<button class="demo-btn" data-m="43">4:3 传统</button><button class="demo-btn" data-m="169">16:9 宽屏</button>', '169', R_widescreen, '动手切换比例，看同一案例如何落位'),
  'export-pdf': ('no', '<button class="demo-btn" data-m="no">不嵌入字体</button><button class="demo-btn" data-m="yes">嵌入字体</button>', 'yes', R_export_pdf, '切换字体嵌入，看同一案例跨设备是否一致'),
  'presenter-view': ('aud', '<button class="demo-btn" data-m="aud">观众视图</button><button class="demo-btn" data-m="pres">演示者视图</button>', 'pres', R_presenter_view, '双屏对比：观众看幻灯片 / 自己看备注+计时'),
  'hyperlink': ('p1', '<button class="demo-btn" data-m="p1">跳转到①</button><button class="demo-btn" data-m="p2">跳转到②</button><button class="demo-btn" data-m="p3">跳转到③</button>', 'p1', R_hyperlink, '点目录项，体验超链接跳转'),
  'embed-font': ('no', '<button class="demo-btn" data-m="no">不嵌入</button><button class="demo-btn" data-m="yes">嵌入字体</button>', 'yes', R_embed_font, '切换字体嵌入，看换机后字形是否保留'),
  'export-media': ('video', '<button class="demo-btn" data-m="video">视频 MP4</button><button class="demo-btn" data-m="img">图片 PNG</button><button class="demo-btn" data-m="gif">动态 GIF</button>', 'video', R_export_media, '选择导出格式，看同一案例如何分享'),
  'speaker-notes': ('hide', '<button class="demo-btn" data-m="hide">隐藏备注</button><button class="demo-btn" data-m="show">显示备注</button>', 'show', R_speaker_notes, '切换备注显隐，看演讲者专属信息'),
  'export-dpi': ('72', '<button class="demo-btn" data-m="72">72 dpi</button><button class="demo-btn" data-m="150">150 dpi</button><button class="demo-btn" data-m="300">300 dpi</button>', '300', R_export_dpi, '切换分辨率，看印刷清晰度差异'),
  'custom-show': ('all', '<button class="demo-btn" data-m="all">全部放映</button><button class="demo-btn" data-m="pick">自定义(1·3·5)</button>', 'all', R_custom_show, '勾选子集，自定义只放筛选的页'),
  'screen-blank-pen': ('normal', '<button class="demo-btn" data-m="normal">正常</button><button class="demo-btn" data-m="blank">黑屏</button><button class="demo-btn" data-m="pen">荧光笔</button>', 'normal', R_screen_blank_pen, '黑屏/荧光笔，演示中的临场控制'),
  'hide-slide': ('show', '<button class="demo-btn" data-m="show">全部显示</button><button class="demo-btn" data-m="hide">隐藏第 3 页</button>', 'show', R_hide_slide, '隐藏某页，放映时自动跳过'),
  'narration': ('off', '<button class="demo-btn" data-m="off">无旁白</button><button class="demo-btn" data-m="rec">录制旁白</button>', 'rec', R_narration, '录制旁白，给幻灯片配上人声'),
  'cmyk-rgb': ('rgb', '<button class="demo-btn" data-m="rgb">屏幕 RGB</button><button class="demo-btn" data-m="cmyk">印刷 CMYK</button>', 'cmyk', R_cmyk_rgb, '对比同一品牌色在屏幕与印刷上的差异'),
  'live-caption': ('off', '<button class="demo-btn" data-m="off">关闭字幕</button><button class="demo-btn" data-m="on">开启字幕</button>', 'on', R_live_caption, '开启实时字幕，辅助观众理解'),
  'package': ('pptx', '<button class="demo-btn" data-m="pptx">仅 PPTX</button><button class="demo-btn" data-m="full">完整打包</button>', 'full', R_package, '完整打包，字体媒体一并带走'),
  'print': ('1', '<button class="demo-btn" data-m="1">1 页</button><button class="demo-btn" data-m="2">2 页</button><button class="demo-btn" data-m="6">6 页</button>', '6', R_print, '讲义版式：一页排多张，省纸'),
  'video-trim': ('full', '<button class="demo-btn" data-m="full">完整</button><button class="demo-btn" data-m="trim">裁剪 00:05–00:20</button>', 'trim', R_video_trim, '设置入/出点，只导出精华片段'),
}

# special: autoplay (timer)
AUTOPLAY = r'''autoplay(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  let apTimer = null;
  let apPage = 0;
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="ap">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row">'
      + '<button class="demo-btn" data-m="manual">手动</button>'
      + '<button class="demo-btn" data-m="auto">自动播放</button>'
    + '</div>'
    + '<div class="demo-label" style="text-align:center">自动模式下每 1.2 秒翻页</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
    if (apTimer) { clearInterval(apTimer); apTimer = null; }
    const cs = CASES[ci];
    const auto = m === 'auto';
    function paint(){
      stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px;background:' + (auto ? '#16203a' : '#fbfcf7') + '">'
        + '<div style="font:700 13px var(--font-display);color:' + (auto ? '#eef3e6' : '#1a3300') + '">' + cs.title + '</div>'
        + '<div style="font:12px var(--font-body);color:' + (auto ? '#bcd99b' : '#4a5a3a') + '">' + (cs.points[apPage] || cs.subtitle) + '</div>'
        + '<div style="margin-top:auto;height:4px;width:100%;background:rgba(26,51,0,.12);border-radius:2px;overflow:hidden"><div style="height:100%;width:' + (((apPage + 1) / cs.points.length) * 100) + '%;background:#2f6f3a"></div></div>'
        + '<div style="font:10px var(--font-mono);color:' + (auto ? '#9fe3c5' : '#2f6f3a') + '">' + (auto ? '▶ 自动播放 · 第 ' + (apPage + 1) + '/' + cs.points.length + ' 页' : '⏸ 手动模式') + '</div>'
      + '</div>';
    }
    paint();
    if (auto) { apTimer = setInterval(function(){ apPage = (apPage + 1) % cs.points.length; paint(); }, 1200); }
  }
  fill(); render('auto');
  c.querySelectorAll('[data-m]:not([data-m="ap"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="ap"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="auto"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="ap"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="ap"])'); render(act ? act.dataset.m : 'auto'); };
},
'''

# special: rehearse (timer)
REHEARSE = r'''rehearse(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  let rhTimer = null;
  let rhSec = 0;
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="rh">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row">'
      + '<button class="demo-btn" data-m="start">开始排练</button>'
      + '<button class="demo-btn" data-m="reset">重置</button>'
    + '</div>'
    + '<div class="demo-label" style="text-align:center">点"开始排练"计时，精确把控时长</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
    if (rhTimer) { clearInterval(rhTimer); rhTimer = null; }
    const cs = CASES[ci];
    const run = m === 'start';
    function paint(){
      const mm = String(Math.floor(rhSec / 60)).padStart(2, '0');
      const ss = String(rhSec % 60).padStart(2, '0');
      stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px;background:#16203a">'
        + '<div style="font:700 12px var(--font-display);color:#9fe3c5">排练计时 · ' + cs.title + '</div>'
        + '<div style="font:700 30px var(--font-mono);color:#eef3e6">' + mm + ':' + ss + '</div>'
        + '<div style="font:11px var(--font-body);color:#c2cfe0">' + cs.points[Math.min(rhSec % cs.points.length, cs.points.length - 1)] + '</div>'
        + '<div style="margin-top:auto;font:10px var(--font-mono);color:' + (run ? '#9fe3c5' : '#7e8aa0') + '">' + (run ? '● 计时中…' : '已停止') + '</div>'
      + '</div>';
    }
    paint();
    if (run) { rhTimer = setInterval(function(){ rhSec++; paint(); }, 1000); }
  }
  fill(); render('start');
  c.querySelectorAll('[data-m]:not([data-m="rh"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="rh"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="start"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="rh"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="rh"])'); render(act ? act.dataset.m : 'start'); };
},
'''

# special: ink (canvas; throws under jsdom without canvas pkg — expected)
INK = r'''ink(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="ikName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="ik">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="ikStage"><canvas id="ikCanvas" style="width:100%;height:100%;border-radius:10px"></canvas></div>'
    + '<div class="demo-label" style="text-align:center">用鼠标在「' + '案例' + '」幻灯片上书写墨迹批注</div>'
    + '</div>';
  const nameEl = c.querySelector('#ikName');
  const canvas = c.querySelector('#ikCanvas');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  fill();
  c.querySelector('[data-m="ik"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); if (window.__inkCtx) { window.__inkCtx.clearRect(0, 0, canvas.width, canvas.height); } };
  const ctx = canvas.getContext('2d');
  window.__inkCtx = ctx;
  let drawing = false;
  function pos(e){ const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
  canvas.addEventListener('mousedown', function(e){ drawing = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p[0], p[1]); });
  canvas.addEventListener('mousemove', function(e){ if (!drawing) return; const p = pos(e); ctx.lineTo(p[0], p[1]); ctx.strokeStyle = '#2f6f3a'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.stroke(); });
  window.addEventListener('mouseup', function(){ drawing = false; });
  ctx.fillStyle = '#2f6f3a';
},
'''

# build replacements map id -> new function source
REPL = {}
for k,(ab,bt,df,rb,hi) in GEN.items():
    REPL[k] = gen(ab, df, bt, rb, hi)
REPL['autoplay'] = AUTOPLAY
REPL['rehearse'] = REHEARSE
REPL['ink'] = INK

# read demos.js
with io.open(ROOT + '/demos.js', 'r', encoding='utf-8') as f:
    text = f.read()

def find_func(text, key):
    for sig in ["'" + key + "'(c) {", key + "(c) {", "},  '" + key + "'(c) {"]:
        i = text.find(sig)
        if i < 0:
            continue
        start = i + sig.find(key)
        # find the opening brace of the function
        bpos = text.find('{', i)
        depth = 0
        j = bpos
        n = len(text)
        while j < n:
            ch = text[j]
            if ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    break
            j += 1
        end = j + 1
        if end < n and text[end] == ',':
            end += 1
        return start, end
    return None

before_count = text.count('(c) {')
for key, newfn in REPL.items():
    pos = find_func(text, key)
    if pos is None:
        raise SystemExit('FATAL: function not found: ' + key)
    start, end = pos
    text = text[:start] + newfn + text[end:]

after_count = text.count('(c) {')
with io.open(ROOT + '/demos.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('DEMOS functions before=%d after=%d (must be equal)' % (before_count, after_count))
if before_count != after_count:
    raise SystemExit('FATAL: function count changed!')

# ---------------------------------------------------------------------------
# 2) BEFOREAFTER.JS : append 21 visual entries before /* __BA_APPEND__ */
# ---------------------------------------------------------------------------
with io.open(ROOT + '/beforeafter.js', 'r', encoding='utf-8') as f:
    ba = f.read()

def col(ch, gap='8', opt=''):
    return "col([" + ch + "], " + gap + (", '" + opt + "'" if opt else "") + ")"
def row(ch, gap='8', opt=''):
    return "row([" + ch + "], " + gap + (", '" + opt + "'" if opt else "") + ")"
def box(w,h,bg,opt=''):
    return "box(" + str(w) + ", " + str(h) + ", " + bg + (", '" + opt + "'" if opt else "") + ")"
def line(w,color,h='8',opt=''):
    return "line(" + str(w) + ", " + color + ", " + str(h) + (", '" + opt + "'" if opt else "") + ")"
def txt(s,color,size='12',opt=''):
    return "txt('" + s + "', " + color + ", " + str(size) + (", '" + opt + "'" if opt else "") + ")"

BC = {  # mirror beforeafter.js BC usage (only names, not values)
}

def BC_prefix(name):
    return 'BC.' + name

BA = {
  'widescreen': (col(box(64,92,'BC.muted2') + ", " + txt('4:3 上下黑边','BC.fog','11','margin-top:6px')),
                 col(box(110,62,'BC.muted') + ", " + txt('16:9 铺满宽屏','BC.ice','11','margin-top:6px'))),
  'export-pdf': (col(txt('标题','BC.bad','14') + ", " + txt('对方打开：乱码错位','BC.bad','11','margin-top:6px')),
                 col(txt('标题','BC.green','14') + ", " + txt('字体嵌入：一致','BC.green','11','margin-top:6px'))),
  'presenter-view': (col(txt('只放幻灯片','BC.fog','12') + ", " + txt('看不到备注','BC.fog','11','margin-top:6px')),
                      col(txt('双屏','BC.green','12') + ", " + txt('备注+计时','BC.green','11','margin-top:6px'))),
  'hyperlink': (col(txt('目录点不动','BC.bad','12') + ", " + txt('翻页找内容','BC.bad','11','margin-top:6px')),
                col(txt('点目录直达','BC.green','12') + ", " + txt('一键跳转','BC.green','11','margin-top:6px'))),
  'autoplay': (col(txt('手动翻页','BC.fog','12') + ", " + txt('易忘计时','BC.fog','11','margin-top:6px')),
               col(txt('按计时自动','BC.green','12') + ", " + txt('无人值守','BC.green','11','margin-top:6px'))),
  'embed-font': (col(txt('换机变样','BC.bad','12') + ", " + txt('字形丢失','BC.bad','11','margin-top:6px')),
                 col(txt('嵌入字体','BC.green','12') + ", " + txt('原样保留','BC.green','11','margin-top:6px'))),
  'export-media': (col(txt('仅 PPTX','BC.fog','12') + ", " + txt('不便分享','BC.fog','11','margin-top:6px')),
                   col(box(70,40,'BC.barok',"border-radius:6px") + ", " + txt('导出视频/图','BC.green','11','margin-top:6px'))),
  'speaker-notes': (col(txt('备注混排','BC.bad','12') + ", " + txt('观众看到','BC.bad','11','margin-top:6px')),
                    col(txt('备注独立','BC.green','12') + ", " + txt('仅自己可见','BC.green','11','margin-top:6px'))),
  'rehearse': (col(txt('凭感觉讲','BC.fog','12') + ", " + txt('常超时','BC.fog','11','margin-top:6px')),
               col(txt('排练计时','BC.green','12') + ", " + txt('精确把控','BC.green','11','margin-top:6px'))),
  'export-dpi': (col(box(90,50,'BC.muted2',"filter:blur(2px)") + ", " + txt('72dpi 发虚','BC.bad','11','margin-top:6px')),
                 col(box(90,50,'BC.muted') + ", " + txt('300dpi 清晰','BC.green','11','margin-top:6px'))),
  'custom-show': (col(line(100,'BC.barbad',8) + ", " + line(100,'BC.barbad',8,"margin-top:6px") + ", " + line(100,'BC.barbad',8,"margin-top:6px")),
                  col(line(100,'BC.barok',8) + ", " + line(100,'BC.barok',8,"margin-top:6px;opacity:.4") + ", " + line(100,'BC.barok',8,"margin-top:6px;opacity:.4"))),
  'screen-blank-pen': (col(txt('讲机密仍在放','BC.bad','11') + ", " + txt('无标注','BC.bad','11','margin-top:6px')),
                       col(txt('一键黑屏','BC.green','11') + ", " + txt('荧光笔标注','BC.green','11','margin-top:6px'))),
  'hide-slide': (col(line(110,'BC.barbad',8) + ", " + line(110,'BC.barbad',8,"margin-top:6px") + ", " + line(110,'BC.barbad',8,"margin-top:6px")),
                 col(line(110,'BC.barok',8) + ", " + txt('（第3页已隐藏）','BC.green','10','margin-top:6px') + ", " + line(110,'BC.barok',8,"margin-top:6px"))),
  'narration': (col(txt('干讲','BC.fog','12') + ", " + txt('无配音','BC.fog','11','margin-top:6px')),
                col(txt('录旁白','BC.green','12') + ", " + txt('自动配音','BC.green','11','margin-top:6px'))),
  'cmyk-rgb': (col(box(80,40,'BC.mist',"border-radius:6px") + ", " + txt('屏幕鲜亮','BC.fog','11','margin-top:6px')),
               col(box(80,40,'BC.muted',"border-radius:6px") + ", " + txt('印刷偏暗','BC.bad','11','margin-top:6px'))),
  'live-caption': (col(txt('无声放映','BC.fog','12') + ", " + txt('难理解','BC.fog','11','margin-top:6px')),
                   col(txt('实时字幕','BC.green','12') + ", " + txt('辅助理解','BC.green','11','margin-top:6px'))),
  'package': (col(txt('仅 .pptx','BC.bad','12') + ", " + txt('换机打不开','BC.bad','11','margin-top:6px')),
              col(txt('完整打包','BC.green','12') + ", " + txt('字体+媒体齐全','BC.green','11','margin-top:6px'))),
  'print': (col(box(120,30,'BC.muted2',"border-radius:4px") + ", " + txt('一页一张','BC.fog','11','margin-top:6px')),
            col(row(box(38,30,'BC.muted',"border-radius:4px") + ", " + box(38,30,'BC.muted',"border-radius:4px;margin-left:6px")) + ", " + txt('讲义多页省纸','BC.green','11','margin-top:6px'))),
  'ink': (col(txt('无法批注','BC.fog','12') + ", " + txt('修改靠重画','BC.fog','11','margin-top:6px')),
          col(txt('墨迹书写','BC.green','12') + ", " + txt('圈画即批注','BC.green','11','margin-top:6px'))),
  'video-trim': (col(line(110,'BC.barbad',8) + ", " + txt('整段 30s','BC.fog','10','margin-top:6px')),
                 col(txt('<div style="position:relative;height:10px;width:110px;background:' + BC_prefix('muted2') + ';border-radius:5px"><div style="position:absolute;left:17%;right:33%;top:0;bottom:0;background:' + BC_prefix('barok') + ';opacity:.6"></div></div>', 'BC.green', '10', 'margin-top:6px'))),
}

# (video-trim entry already correct; BC_prefix defined above)

ORDER = ['widescreen','export-pdf','presenter-view','hyperlink','autoplay','embed-font','export-media',
         'speaker-notes','rehearse','export-dpi','custom-show','screen-blank-pen','hide-slide',
         'narration','cmyk-rgb','live-caption','package','print','ink','video-trim']

ba_entries = ''
for id in ORDER:
    B, A = BA[id]
    ba_entries += "    '" + id + "': () => baGrid(slide(" + B + "), slide(" + A + ")),\n"

marker = '    /* __BA_APPEND__ */'
if marker not in ba:
    raise SystemExit('FATAL: BA append marker not found')
ba = ba.replace(marker, ba_entries + marker)
with io.open(ROOT + '/beforeafter.js', 'w', encoding='utf-8') as f:
    f.write(ba)
print('BA_VISUALS entries appended: %d' % len(ORDER))

# ---------------------------------------------------------------------------
# 3) TERMS-EXTRA.JS : add beforeafter text to the 15 lacking entries
# ---------------------------------------------------------------------------
with io.open(ROOT + '/terms-extra.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

BA_TEXT = {
  'widescreen': '改前：4:3 在新屏两边黑边 → 改后：16:9 铺满宽屏。',
  'export-pdf': '改前：不嵌入字体→对方打开乱码 → 改后：嵌入字体，跨设备一致。',
  'presenter-view': '改前：只放幻灯片，看不到备注 → 改后：双屏，自己看备注+计时。',
  'autoplay': '改前：手动翻页 → 改后：按计时自动翻页。',
  'embed-font': '改前：不嵌字体→换机变样 → 改后：嵌入字体原样保留。',
  'export-media': '改前：只能存 PPTX → 改后：一键导出视频/图片。',
  'speaker-notes': '改前：备注和正文混排 → 改后：备注独立，观众看不到。',
  'rehearse': '改前：凭感觉讲→超时 → 改后：排练计时，精确把控。',
  'export-dpi': '改前：72dpi 印刷发虚 → 改后：300dpi 印刷清晰。',
  'custom-show': '改前：全放一遍 → 改后：只放筛选的子集。',
  'screen-blank-pen': '改前：讲机密时还在放映 → 改后：一键黑屏/荧光笔标注。',
  'hide-slide': '改前：不相关的也放 → 改后：隐藏页放映时跳过。',
  'narration': '改前：干讲 → 改后：录旁白，自动配音。',
  'cmyk-rgb': '改前：屏幕鲜亮→印刷偏暗 → 改后：提前转 CMYK 校对。',
}
LACK = list(BA_TEXT.keys())

def obj_has_beforeafter(lines, start):
    depth = 0
    i = start
    n = len(lines)
    # find matching closing
    while i < n:
        for ch in lines[i]:
            if ch == '{': depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    return 'beforeafter' in ''.join(lines[start:i+1])
        i += 1
    return False

changed = 0
i = 0
n = len(lines)
while i < n:
    stripped = lines[i].strip()
    for id in LACK:
        if stripped.startswith("'" + id + "':") or stripped.startswith('"' + id + '":'):
            if not obj_has_beforeafter(lines, i):
                # find mnemonic line
                j = i
                while j < n and 'mnemonic:' not in lines[j]:
                    # stop if we leave the object
                    if lines[j].strip() == '},' and j > i:
                        break
                    j += 1
                if j < n and 'mnemonic:' in lines[j]:
                    ln = lines[j].rstrip('\n')
                    if ln.rstrip().endswith(','):
                        ln = ln.rstrip().rstrip(',')
                    ln = ln + ", beforeafter: '" + BA_TEXT[id] + "'\n"
                    lines[j] = ln
                    changed += 1
            break
    i += 1

with io.open(ROOT + '/terms-extra.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)
print('terms-extra beforeafter texts added: %d' % changed)
print('DONE')
