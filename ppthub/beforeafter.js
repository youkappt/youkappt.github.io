/* PPThub · 改前 vs 改后 · 静态视觉对比图
 * 每个词条一个专属渲染函数：BA_VISUALS[id]() 返回两栏 HTML 字符串。
 * 风格与暗色玻璃拟态设计系统一致；纯静态、无交互、无定时器。
 */
(function () {
  const BC = {
    ice: '#eaf2fb', mist: '#c2cfe0', fog: '#7e8aa0',
    accent: '#8a6bff', accent2: '#663af3', blue: '#027dea', orange: '#e46d4c', red: '#e4483c', green: '#269684',
    ok: '#9fe3c5', bad: '#f0a59a',
    muted: 'rgba(186,214,247,0.16)', muted2: 'rgba(186,214,247,0.09)',
    line: 'rgba(186,214,247,0.28)', barok: '#8a6bff', barbad: '#56657f'
  };

  // ---- 基础图元 ----
  const box = (w, h, bg, opt = '') => `<div style="width:${w}px;height:${h}px;background:${bg};border-radius:6px;${opt}"></div>`;
  const rbox = (w, h, bg, opt = '') => `<div style="width:${w}px;height:${h}px;background:${bg};border-radius:50%;${opt}"></div>`;
  const line = (w, color, h = 8, opt = '') => `<div style="width:${w}px;height:${h}px;border-radius:3px;background:${color};${opt}"></div>`;
  const bar = (w, h, c, opt = '') => `<div style="width:${w}px;height:${h}px;border-radius:3px 3px 0 0;background:${c};${opt}"></div>`;
  const txt = (s, color, size = 12, opt = '') => `<div style="font:${size}px 'Space Grotesk',var(--font-display);color:${color};line-height:1.2;${opt}">${s}</div>`;
  const row = (ch, gap = 8, opt = '') => `<div style="display:flex;align-items:center;gap:${gap}px;${opt}">${ch}</div>`;
  const col = (ch, gap = 8, opt = '') => `<div style="display:flex;flex-direction:column;gap:${gap}px;${opt}">${ch}</div>`;
  const slide = (inner, opt = '') => `<div class="ba-slide" style="${opt}">${inner}</div>`;
  const baGrid = (b, a) => `<div class="ba-grid"><div class="ba-panel"><span class="ba-tag before">✕ 改前</span>${b}</div><div class="ba-panel"><span class="ba-tag after">✓ 改后</span>${a}</div></div>`;

  const BA_VISUALS = {
    // ===== 排版与布局 =====
    'alignment': () => baGrid(
      slide(col([
        txt('标题', BC.mist, 14),
        line(120, BC.barbad, 8, 'margin-left:12px'),
        line(100, BC.barbad, 8, 'margin-left:26px'),
        box(80, 30, BC.muted2, 'margin-left:18px')
      ])),
      slide(col([
        `<div style="position:absolute;left:30px;top:10px;bottom:10px;width:1px;background:${BC.red};opacity:.6"></div>`,
        txt('标题', BC.ice, 14, 'margin-left:18px'),
        line(120, BC.barok, 8, 'margin-left:18px'),
        line(100, BC.barok, 8, 'margin-left:18px'),
        box(80, 30, BC.muted, 'margin-left:18px')
      ]))
    ),
    'proximity': () => baGrid(
      slide(col([txt('标题', BC.mist, 14), line(110, BC.barbad, 8, 'margin-top:34px'), line(90, BC.barbad, 8, 'margin-top:34px'), box(70, 28, BC.muted2, 'margin-top:28px')])),
      slide(`<div style="border:1.5px dashed ${BC.accent};border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:8px">${txt('标题', BC.ice, 14)}${line(110, BC.barok)}${line(90, BC.barok)}${box(70, 28, BC.muted)}</div>`)
    ),
    'contrast': () => baGrid(
      slide(col([txt('普通信息', BC.mist, 12), txt('普通信息', BC.mist, 12), txt('普通信息', BC.mist, 12)])),
      slide(col([txt('关键信息', BC.orange, 17, 'font-weight:700'), txt('普通信息', BC.mist, 12), txt('普通信息', BC.mist, 12)]))
    ),
    'hierarchy': () => baGrid(
      slide(col([txt('标题', BC.mist, 13), txt('要点', BC.mist, 13), txt('注释', BC.mist, 13)])),
      slide(col([txt('标题', BC.ice, 18, 'font-weight:700'), txt('要点', BC.mist, 14), txt('注释', BC.fog, 11)]))
    ),
    'whitespace': () => baGrid(
      slide(col([box(158, 22, BC.muted2), box(158, 22, BC.muted2), box(158, 22, BC.muted2), box(158, 22, BC.muted2)], 6)),
      slide(col([box(110, 24, BC.muted), box(90, 18, BC.muted)], 14, 'align-items:center;margin-top:10px'))
    ),
    'focus': () => baGrid(
      slide(row([box(40, 40, BC.accent), box(40, 40, BC.accent), box(40, 40, BC.accent)], 12)),
      slide(row([box(40, 40, BC.accent), box(40, 40, BC.muted2), box(40, 40, BC.muted2)], 12))
    ),
    'grid': () => baGrid(
      slide(col([
        row([box(46, 46, BC.muted2), box(46, 46, BC.muted2, 'margin-top:14px')], 18),
        row([box(46, 46, BC.muted2, 'margin-top:10px'), box(46, 46, BC.muted2)], 18)
      ], 10)),
      slide(col([
        `<div style="position:absolute;inset:14px;background-image:linear-gradient(${BC.line} 1px,transparent 1px),linear-gradient(90deg,${BC.line} 1px,transparent 1px);background-size:50% 50%"></div>`,
        row([box(46, 46, BC.muted), box(46, 46, BC.muted)], 18, 'position:relative'),
        row([box(46, 46, BC.muted), box(46, 46, BC.muted)], 18, 'position:relative')
      ], 10))
    ),
    'less-is-more': () => baGrid(
      slide(col([row([box(24, 24, BC.muted2), box(24, 24, BC.muted2), box(24, 24, BC.muted2)], 8), box(120, 30, BC.accent), row([box(18, 18, BC.muted2), box(18, 18, BC.muted2), box(18, 18, BC.muted2), box(18, 18, BC.muted2)], 6)], 8)),
      slide(col([box(120, 34, BC.accent)], 8, 'align-items:flex-start;margin-top:22px'))
    ),
    'margin': () => baGrid(
      slide(`<div style="position:absolute;inset:2px;border:1px solid ${BC.barbad};border-radius:6px"></div><div style="display:flex;flex-direction:column;gap:8px;margin:4px">${box(150, 24, BC.muted2)}${box(150, 24, BC.muted2)}</div>`),
      slide(`<div style="position:absolute;inset:14px;border:1px solid ${BC.barok};border-radius:6px"></div><div style="display:flex;flex-direction:column;gap:8px;margin:18px">${box(120, 24, BC.muted)}${box(120, 24, BC.muted)}</div>`)
    ),
    'column': () => baGrid(
      slide(col([row([box(96, 50, BC.muted2), box(54, 50, BC.muted2)], 10), row([box(54, 40, BC.muted2), box(96, 40, BC.muted2)], 10)], 12)),
      slide(col([row([box(78, 50, BC.muted), box(78, 50, BC.muted)], 10), row([box(78, 40, BC.muted), box(78, 40, BC.muted)], 10)], 12))
    ),
    'bleed': () => baGrid(
      slide(`<div style="position:absolute;inset:14px;border:1px solid ${BC.barbad};border-radius:4px"></div><div style="position:absolute;left:24px;top:30px;width:90px;height:60px;border-radius:6px;background:${BC.muted2}"></div>`),
      slide(box(0, 0, 'transparent')).replace('<div class="ba-slide" style=""></div>', `<div class="ba-slide" style="padding:0"><div style="position:absolute;inset:0;border-radius:10px;background:linear-gradient(135deg,${BC.accent2},${BC.blue})"></div></div>`)
    ),
    'card-layout': () => baGrid(
      slide(col([line(150, BC.barbad, 8), line(120, BC.barbad, 8), line(140, BC.barbad, 8), line(100, BC.barbad, 8)], 8)),
      slide(`<div style="display:flex;gap:10px">${box(78, 70, BC.muted, 'border:1px solid rgba(186,214,247,.25)')}${box(78, 70, BC.muted, 'border:1px solid rgba(186,214,247,.25)')}</div>`)
    ),
    'full-image': () => baGrid(
      slide(`<div style="position:absolute;inset:0;background:repeating-linear-gradient(45deg,#2a3550,#2a3550 6px,#33405e 6px,#33405e 12px)"></div><div style="position:absolute;left:16px;top:70px;font:13px 'Space Grotesk';color:#cdd6e6;text-shadow:0 1px 3px #000">文字压在复杂图上，读不清</div>`),
      slide(`<div style="position:absolute;inset:0;background:repeating-linear-gradient(45deg,#16203a,#16203a 6px,#1d2945 6px,#1d2945 12px);box-shadow:inset 0 0 60px 30px rgba(3,5,12,.85)"></div><div style="position:absolute;left:16px;bottom:18px;font:14px 'Space Grotesk';color:#eaf2fb;font-weight:600;text-shadow:0 2px 6px #000">压暗+文字，清楚</div>`)
    ),
    'visual-balance': () => baGrid(
      slide(`<div style="position:absolute;left:18px;top:24px;width:84px;height:84px;border-radius:12px;background:linear-gradient(135deg,${BC.accent},${BC.blue})"></div><div style="position:absolute;right:18px;top:90px;font:11px 'Space Grotesk';color:${BC.fog}">右空</div>`),
      slide(`<div style="position:absolute;left:18px;top:24px;width:84px;height:84px;border-radius:12px;background:linear-gradient(135deg,${BC.accent},${BC.blue})"></div><div style="position:absolute;right:26px;top:50px;width:44px;height:44px;border-radius:8px;background:${BC.muted}"></div><div style="position:absolute;right:34px;top:104px;width:30px;height:6px;border-radius:3px;background:${BC.mist}"></div>`)
    ),

    // ===== 字体与配色 =====
    'serif-sans': () => baGrid(
      slide(`<div style="font:13px Georgia,serif;color:${BC.mist};line-height:1.5">正文衬线小字在屏幕上发虚，阅读吃力，容易串行，整体显旧。</div>`),
      slide(col([`<div style="font:16px Georgia,serif;color:${BC.ice};font-weight:700">标题衬线</div>`, `<div style="font:13px Inter,sans-serif;color:${BC.mist};line-height:1.5">正文用无衬线，屏幕清晰，阅读轻松不串行。</div>`]))
    ),
    'type-scale': () => baGrid(
      slide(col([txt('标题 24', BC.mist, 15), txt('小标题 23', BC.mist, 14), txt('正文 22', BC.mist, 13)])),
      slide(col([txt('标题 32', BC.ice, 22, 'font-weight:700'), txt('小标题 24', BC.mist, 16), txt('正文 16', BC.fog, 12)]))
    ),
    'font-weight': () => baGrid(
      slide(col([txt('标题', BC.mist, 16), txt('正文', BC.mist, 13), txt('注释', BC.mist, 12)])),
      slide(col([`<div style="font:700 16px 'Space Grotesk';color:${BC.ice}">标题 Bold</div>`, txt('正文 Regular', BC.mist, 13), txt('注释', BC.fog, 12)]))
    ),
    'tracking': () => baGrid(
      slide(col([`<div style="font:700 18px 'Space Grotesk';color:${BC.mist};letter-spacing:0">标 题</div>`, line(120, BC.barbad, 8)])),
      slide(col([`<div style="font:700 18px 'Space Grotesk';color:${BC.ice};letter-spacing:4px">标 题</div>`, line(120, BC.barok, 8)]))
    ),
    'line-height': () => baGrid(
      slide(`<div style="font:12px Inter,sans-serif;color:${BC.mist};line-height:1.0">行距太紧，字行挤在一起，阅读时容易串行，眼睛很累，版面也显局促。</div>`),
      slide(`<div style="font:12px Inter,sans-serif;color:${BC.mist};line-height:1.5">行距放宽到 1.5，字行透气，阅读顺畅，版面也显从容。</div>`)
    ),
    'analogous': () => baGrid(
      slide(row([box(44, 60, '#3a6ea5'), box(44, 60, '#2e8b8b'), box(44, 60, '#3aa0a0')], 8)),
      slide(row([box(44, 60, '#3a6ea5'), box(44, 60, '#2e8b8b'), box(44, 60, '#3aa0a0'), rbox(16, 16, '#e46d4c', 'margin-left:6px')], 8, 'align-items:center'))
    ),
    'complementary': () => baGrid(
      slide(row([box(70, 56, '#e23b3b'), box(70, 56, '#2faa3f')], 0)),
      slide(`<div style="width:140px;height:56px;border-radius:6px;background:#c95a5a;display:flex;align-items:center;justify-content:center"><div style="width:34px;height:34px;border-radius:6px;background:#2faa3f;opacity:.9"></div></div>`)
    ),
    'tri-color': () => baGrid(
      slide(row([box(44, 56, BC.accent2), box(44, 56, BC.blue), box(44, 56, BC.orange)], 8)),
      slide(row([box(96, 56, BC.accent2), box(34, 56, BC.blue), rbox(16, 16, BC.orange, 'margin-left:4px')], 8, 'align-items:center'))
    ),
    'gradient': () => baGrid(
      slide(box(150, 56, 'linear-gradient(90deg,#e23b3b,#2faa3f,#3a6ea5)', 'border-radius:8px')),
      slide(box(150, 56, 'linear-gradient(90deg,#663af3,#8a6bff,#b9a6ff)', 'border-radius:8px'))
    ),
    'muted-color': () => baGrid(
      slide(row([box(40, 40, '#e23b3b'), box(40, 40, '#2faa3f'), box(40, 40, '#3a6ea5')], 8)),
      slide(row([box(40, 40, '#c98b8b'), box(40, 40, '#9bb39b'), box(40, 40, '#8fa3b8')], 8))
    ),
    'color-wheel': () => baGrid(
      slide(row([rbox(26, 26, '#e23b3b', 'margin-top:20px'), rbox(26, 26, '#2faa3f', 'margin-top:-6px'), rbox(26, 26, '#3a6ea5', 'margin-top:18px'), rbox(26, 26, '#e0a93b')], 10, 'align-items:flex-start')),
      slide(row([rbox(26, 26, '#6a8fd8'), rbox(26, 26, '#5fa0c8'), rbox(26, 26, '#4fb0b8'), rbox(26, 26, '#3aa0a0')], 10))
    ),
    'monochrome': () => baGrid(
      slide(row([box(40, 52, '#5a6b85'), box(40, 52, '#5a6b85'), box(40, 52, '#5a6b85')], 8)),
      slide(row([box(40, 52, '#3a2f66'), box(40, 52, '#663af3'), box(40, 52, '#b9a6ff')], 8))
    ),
    'golden-ratio': () => baGrid(
      slide(`<div style="display:flex;gap:0">${box(70, 80, BC.muted2)}${box(70, 80, BC.muted2)}</div>`),
      slide(`<div style="display:flex;gap:0">${box(98, 80, BC.muted)}${box(42, 80, BC.accent, 'opacity:.5')}</div>`)
    ),
    'rule-of-thirds': () => baGrid(
      slide(`<div style="position:relative;width:150px;height:96px;border-radius:6px;background:linear-gradient(135deg,#22304e,#16203a);display:flex;align-items:center;justify-content:center">${box(46, 46, BC.accent2, 'opacity:.6')}</div>`),
      slide(`<div style="position:relative;width:150px;height:96px;border-radius:6px;background:linear-gradient(135deg,#22304e,#16203a)"><div style="position:absolute;left:33%;top:0;bottom:0;width:1px;background:${BC.line}"></div><div style="position:absolute;left:0;right:0;top:66%;height:1px;background:${BC.line}"></div>${box(40, 40, BC.accent, 'position:absolute;left:14%;top:30%')}</div>`)
    ),
    'f-pattern': () => baGrid(
      slide(`<div style="position:relative;width:160px;height:100px">${line(100, BC.barbad, 10, 'position:absolute;right:6px;bottom:8px')}${line(60, BC.barbad, 10, 'position:absolute;right:30px;bottom:34px')}</div>`),
      slide(`<div style="position:relative;width:160px;height:100px">${line(120, BC.barok, 12, 'position:absolute;left:6px;top:8px')}${line(90, BC.barok, 10, 'position:absolute;left:6px;top:36px')}${box(40, 24, BC.accent, 'position:absolute;left:6px;top:64px')}</div>`)
    ),
    'center-sym': () => baGrid(
      slide(`<div style="display:flex;flex-direction:column;align-items:center;gap:14px">${box(60, 30, BC.muted2)}${box(80, 30, BC.muted2)}${rbox(30, 30, BC.muted2)}</div>`),
      slide(`<div style="display:flex;flex-direction:column;align-items:center;gap:14px">${box(60, 30, BC.muted)}${box(80, 30, BC.muted)}${rbox(30, 30, BC.accent)}</div><div style="position:absolute;right:18px;top:18px;width:14px;height:14px;border-radius:50%;background:${BC.orange}"></div>`)
    ),
    'symmetry': () => baGrid(
      slide(`<div style="display:flex;flex-direction:column;align-items:center;gap:14px">${box(60, 30, BC.muted2)}${box(80, 30, BC.muted2)}${rbox(30, 30, BC.muted2)}</div>`),
      slide(`<div style="display:flex;flex-direction:column;align-items:center;gap:14px">${box(60, 30, BC.muted)}${box(80, 30, BC.muted)}${rbox(30, 30, BC.accent)}</div><div style="position:absolute;right:18px;top:18px;width:14px;height:14px;border-radius:50%;background:${BC.orange}"></div>`)
    ),
    'diagonal-flow': () => baGrid(
      slide(`<div style="display:flex;flex-direction:column;align-items:center;gap:16px">${txt('标题', BC.mist, 14)}${box(46, 46, BC.muted2)}${txt('结论', BC.mist, 14)}</div>`),
      slide(`<div style="position:relative;height:100%"><svg width="100%" height="100%" viewBox="0 0 200 130" preserveAspectRatio="none" style="position:absolute;inset:0"><line x1="20" y1="20" x2="170" y2="110" stroke="${BC.accent}" stroke-width="2" stroke-dasharray="5 5"/></svg><div style="position:absolute;left:14px;top:10px;font:600 13px 'Space Grotesk';color:${BC.ice}">标题</div>${box(50, 50, 'linear-gradient(135deg,' + BC.accent + ',' + BC.blue + ')', 'position:absolute;left:78px;top:40px;border-radius:12px')}<div style="position:absolute;right:14px;bottom:8px;font:600 13px 'Space Grotesk';color:${BC.ice}">结论</div></div>`)
    ),

    // ===== 动画与切换 =====
    'anim-type': () => baGrid(
      slide(col([txt('标题', BC.mist, 14, 'transform:translateX(-30px);opacity:.6'), box(50, 30, BC.muted2, 'transform:translateX(40px)')], 8, 'align-items:center')),
      slide(col([`<div style="font:14px 'Space Grotesk';color:${BC.ice};opacity:1">标题 淡入</div>`, box(50, 30, BC.accent, 'box-shadow:0 0 14px rgba(138,107,255,.5)')], 8, 'align-items:center'))
    ),
    'smooth-vs-abrupt': () => baGrid(
      slide(`<div style="display:flex;align-items:center;gap:10px">${box(40, 40, BC.muted2)}${box(40, 40, BC.muted2, 'margin-left:30px')}<span style="font:11px 'Space Grotesk';color:${BC.fog}">突现</span></div>`),
      slide(`<div style="display:flex;align-items:center;gap:10px">${box(40, 40, BC.muted)}${box(40, 40, BC.accent, 'margin-left:30px;box-shadow:0 0 12px rgba(138,107,255,.5)')}<span style="font:11px 'Space Grotesk';color:${BC.ice}">平滑过渡</span></div>`)
    ),
    'easing': () => baGrid(
      slide(`<div style="position:relative;width:150px;height:60px;margin-top:30px"><div style="position:absolute;left:6px;top:0;width:20px;height:20px;border-radius:50%;background:${BC.muted2}"></div><div style="position:absolute;right:6px;top:0;width:20px;height:20px;border-radius:50%;background:${BC.muted2}"></div><div style="position:absolute;left:6px;bottom:0;width:138px;height:2px;background:${BC.barbad}"></div></div>`),
      slide(`<div style="position:relative;width:150px;height:60px;margin-top:30px"><div style="position:absolute;left:6px;top:0;width:20px;height:20px;border-radius:50%;background:${BC.accent}"></div><div style="position:absolute;right:6px;top:0;width:20px;height:20px;border-radius:50%;background:${BC.accent}"></div><div style="position:absolute;left:6px;bottom:0;width:138px;height:2px;background:${BC.barok}"></div><div style="position:absolute;left:6px;bottom:0;width:60px;height:24px;background:${BC.barok};opacity:.25;border-radius:0 0 60px 0"></div></div>`)
    ),
    'trigger': () => baGrid(
      slide(`<div style="display:flex;flex-direction:column;gap:8px">${box(40, 24, BC.muted2, 'cursor:pointer')}${box(40, 24, BC.muted2, 'cursor:pointer')}${box(40, 24, BC.muted2, 'cursor:pointer')}</div><div style="font:11px 'Space Grotesk';color:${BC.fog};margin-top:8px">每个都靠单击</div>`),
      slide(`<div style="display:flex;flex-direction:column;gap:6px">${box(40, 22, BC.accent)}${box(40, 22, BC.muted, 'margin-left:18px')}${box(40, 22, BC.muted, 'margin-left:36px')}</div><div style="font:11px 'Space Grotesk';color:${BC.ice};margin-top:8px">同时 / 之后 排序列</div>`)
    ),
    'transition-fx': () => baGrid(
      slide(`<div style="display:flex;gap:6px">${box(26, 26, BC.muted2, 'transform:rotate(20deg)')}${box(26, 26, BC.muted2, 'border-radius:50%')}${box(26, 26, BC.muted2, 'transform:skewX(15deg)')}${box(26, 26, BC.muted2)}</div><div style="font:11px 'Space Grotesk';color:${BC.fog};margin-top:10px">每页换切换</div>`),
      slide(`<div style="display:flex;gap:8px">${box(30, 30, BC.muted)}${box(30, 30, BC.muted)}${box(30, 30, BC.muted)}${box(30, 30, BC.muted, 'background:' + BC.accent)}</div><div style="font:11px 'Space Grotesk';color:${BC.ice};margin-top:10px">统一 1-2 种</div>`)
    ),
    'timeline': () => baGrid(
      slide(`<div style="display:flex;flex-direction:column;gap:10px">${box(120, 16, BC.muted2)}${box(100, 16, BC.muted2)}${box(140, 16, BC.muted2)}</div><div style="font:11px 'Space Grotesk';color:${BC.fog};margin-top:8px">凭添加顺序乱</div>`),
      slide(`<div style="position:relative;padding-left:8px">${line(2, BC.accent, 80, 'position:absolute;left:0;top:0')}<div style="display:flex;flex-direction:column;gap:16px;margin-left:10px">${box(110, 14, BC.muted)}${box(110, 14, BC.muted)}${box(110, 14, BC.muted)}</div></div><div style="font:11px 'Space Grotesk';color:${BC.ice};margin-top:6px">时间轴拖先后</div>`)
    ),
    'morph': () => baGrid(
      slide(`<div style="display:flex;align-items:center;gap:8px">${box(40, 40, BC.muted2, 'border-radius:6px')}<span style="color:${BC.fog};font-size:18px">→</span>${rbox(40, 40, BC.muted2)}</div><div style="font:11px 'Space Grotesk';color:${BC.fog};margin-top:8px">两页元素名不同，生硬</div>`),
      slide(`<div style="display:flex;align-items:center;gap:8px">${box(40, 40, BC.accent, 'border-radius:6px;box-shadow:0 0 12px rgba(138,107,255,.4)')}<span style="color:${BC.ice};font-size:18px">→</span>${box(40, 40, BC.accent, 'border-radius:50%;box-shadow:0 0 12px rgba(138,107,255,.4)')}</div><div style="font:11px 'Space Grotesk';color:${BC.ice};margin-top:8px">同名元素 morph 变形</div>`)
    ),
    'motion-path': () => baGrid(
      slide(`<div style="position:relative;height:100%">${box(34, 34, BC.muted2, 'position:absolute;left:6px;top:6px;border-radius:50%')}${box(34, 34, BC.muted2, 'position:absolute;right:6px;bottom:6px;border-radius:50%')}<span style="position:absolute;left:46%;top:48%;color:${BC.fog};font-size:12px">直线</span></div>`),
      slide(`<div style="position:relative;height:100%"><svg width="100%" height="100%" viewBox="0 0 200 130" preserveAspectRatio="none" style="position:absolute;inset:0"><path d="M20,20 C60,110 140,20 180,110" fill="none" stroke="${BC.accent}" stroke-width="2" stroke-dasharray="5 5"/></svg>${box(30, 30, 'linear-gradient(135deg,' + BC.accent + ',' + BC.blue + ')', 'position:absolute;left:78px;top:54px;border-radius:50%;box-shadow:0 0 12px rgba(138,107,255,.5)')}</div>`)
    ),
    'anim-timing': () => baGrid(
      slide(`<div style="display:flex;align-items:flex-end;gap:10px;height:80px;margin-top:20px">${bar(18, 30, BC.barbad)}${bar(18, 30, BC.barbad)}${bar(18, 30, BC.barbad)}</div><div style="font:11px 'Space Grotesk';color:${BC.fog};margin-top:6px">全默认 0.5s</div>`),
      slide(`<div style="display:flex;align-items:flex-end;gap:10px;height:80px;margin-top:20px">${bar(18, 30, BC.barok)}${bar(18, 54, BC.barok)}${bar(18, 42, BC.barok)}</div><div style="font:11px 'Space Grotesk';color:${BC.ice};margin-top:6px">按内容 0.3-1s</div>`)
    ),

    // ===== 效率 / 图形 / 输出 =====
    'distribute': () => baGrid(
      slide(`<div style="position:relative;height:90px;margin-top:14px">${box(34, 34, BC.muted2, 'position:absolute;left:6px;top:6px')}${box(34, 34, BC.muted2, 'position:absolute;left:60px;top:6px')}${box(34, 34, BC.muted2, 'position:absolute;left:72px;top:6px')}</div><div style="font:11px 'Space Grotesk';color:${BC.fog}">对齐但间距不等</div>`),
      slide(`<div style="position:relative;height:90px;margin-top:14px">${box(34, 34, BC.muted, 'position:absolute;left:6px;top:6px;box-shadow:0 0 10px rgba(138,107,255,.4)')}${box(34, 34, BC.muted, 'position:absolute;left:58px;top:6px;box-shadow:0 0 10px rgba(138,107,255,.4)')}${box(34, 34, BC.muted, 'position:absolute;left:110px;top:6px;box-shadow:0 0 10px rgba(138,107,255,.4)')}</div><div style="font:11px 'Space Grotesk';color:${BC.ice}">分布使间距相等</div>`)
    ),
    'vector-vs-raster': () => baGrid(
      slide(`<div style="display:flex;flex-direction:column;align-items:center;gap:6px">${box(70, 70, 'repeating-conic-gradient(#56657f 0% 25%, #3a465c 0% 50%)', 'border-radius:8px')}<span style="font:11px 'Space Grotesk';color:${BC.fog}">位图放大糊</span></div>`),
      slide(`<div style="display:flex;flex-direction:column;align-items:center;gap:6px">${box(70, 70, BC.muted, 'border-radius:8px;border:1px solid rgba(186,214,247,.3)')}<span style="font:11px 'Space Grotesk';color:${BC.ice}">矢量放大清晰</span></div>`)
    ),
    'icon-style': () => baGrid(
      slide(`<div style="display:flex;gap:12px;align-items:center">${box(30, 30, BC.muted2, 'border-radius:6px')}${rbox(30, 30, BC.muted2)}${box(30, 30, BC.muted2, 'border-radius:50%')}</div><div style="font:11px 'Space Grotesk';color:${BC.fog};margin-top:10px">线+面混用</div>`),
      slide(`<div style="display:flex;gap:12px;align-items:center">${box(30, 30, BC.muted, 'border-radius:6px')}${box(30, 30, BC.muted, 'border-radius:6px')}${box(30, 30, BC.muted, 'border-radius:6px')}</div><div style="font:11px 'Space Grotesk';color:${BC.ice};margin-top:10px">统一一种风格</div>`)
    ),
    'chart-beauty': () => baGrid(
      slide(`<div style="display:flex;align-items:flex-end;gap:10px;height:80px;margin-top:16px">${bar(22, 40, '#e23b3b')}${bar(22, 64, '#2faa3f')}${bar(22, 30, '#3a6ea5')}${bar(22, 52, '#e0a93b')}</div><div style="font:11px 'Space Grotesk';color:${BC.fog};margin-top:6px">默认彩柱+网格</div>`),
      slide(`<div style="display:flex;align-items:flex-end;gap:10px;height:80px;margin-top:16px">${bar(22, 40, BC.barok)}${bar(22, 64, BC.barok)}${bar(22, 30, BC.barok)}${bar(22, 52, BC.barok)}</div><div style="font:11px 'Space Grotesk';color:${BC.ice};margin-top:6px">去网格·单色系</div>`)
    ),
    'image-mask': () => baGrid(
      slide(`<div style="position:relative;width:150px;height:96px;overflow:hidden;border-radius:6px;background:linear-gradient(135deg,#22304e,#16203a)"><div style="position:absolute;left:-10px;top:24px;width:170px;height:60px;background:repeating-linear-gradient(45deg,#56657f,#56657f 6px,#3a465c 6px,#3a465c 12px);transform:rotate(8deg)"></div></div><div style="font:11px 'Space Grotesk';color:${BC.fog}">拉伸变形</div>`),
      slide(`<div style="position:relative;width:150px;height:96px;overflow:hidden;border-radius:50% 12px 50% 12px;background:linear-gradient(135deg,${BC.accent2},${BC.blue})"></div><div style="font:11px 'Space Grotesk';color:${BC.ice}">裁剪为形状不变形</div>`)
    ),
    'flat-vs-skeu': () => baGrid(
      slide(`<div style="display:flex;gap:10px;align-items:center">${box(40, 40, '#6b5530', 'border-radius:8px;box-shadow:inset 0 2px 4px rgba(255,255,255,.3),0 6px 12px rgba(0,0,0,.5)')}${box(40, 40, '#4a3a6b', 'border-radius:8px;box-shadow:inset 0 2px 4px rgba(255,255,255,.3),0 6px 12px rgba(0,0,0,.5)')}</div><div style="font:11px 'Space Grotesk';color:${BC.fog}">全拟物重阴影</div>`),
      slide(`<div style="display:flex;gap:10px;align-items:center">${box(40, 40, BC.muted, 'border-radius:8px')}${box(40, 40, BC.accent, 'border-radius:8px;box-shadow:0 2px 8px rgba(138,107,255,.35)')}</div><div style="font:11px 'Space Grotesk';color:${BC.ice}">扁平为主·微质感</div>`)
    ),
    'data-viz': () => baGrid(
      slide(`<div style="display:flex;justify-content:center"><div style="width:90px;height:90px;border-radius:50%;background:conic-gradient(${BC.muted2} 0 70%, ${BC.muted} 70% 100%)"></div></div><div style="font:11px 'Space Grotesk';color:${BC.fog};text-align:center">饼图看趋势 ✗</div>`),
      slide(`<div style="display:flex;align-items:flex-end;justify-content:center;gap:8px;height:80px">${bar(16, 30, BC.barok)}${bar(16, 50, BC.barok)}${bar(16, 40, BC.barok)}${bar(16, 66, BC.barok)}</div><div style="font:11px 'Space Grotesk';color:${BC.ice};text-align:center">趋势用折线 ✓</div>`)
    ),
    'table-beauty': () => baGrid(
      slide(`<div style="border:1px solid ${BC.barbad};border-radius:4px;padding:6px">${line(120, BC.barbad, 6)}${line(120, BC.barbad, 6)}${line(120, BC.barbad, 6)}</div><div style="font:11px 'Space Grotesk';color:${BC.fog}">全框线</div>`),
      slide(`<div style="border-radius:4px;padding:6px;background:rgba(138,107,255,.06)">${line(120, BC.barok, 6)}${line(120, BC.muted, 6)}${line(120, BC.muted, 6)}</div><div style="font:11px 'Space Grotesk';color:${BC.ice}">去竖线·隔行底色</div>`)
    ),
    'model-3d': () => baGrid(
      slide(`<div style="display:flex;gap:6px;flex-wrap:wrap">${box(28, 28, BC.muted2)}${box(28, 28, BC.muted2)}${box(28, 28, BC.muted2)}${box(28, 28, BC.muted2)}${box(28, 28, BC.muted2)}${box(28, 28, BC.muted2)}</div><div style="font:11px 'Space Grotesk';color:${BC.fog}">复杂 3D 占满</div>`),
      slide(`<div style="display:flex;align-items:center;justify-content:center;height:90px">${box(56, 56, 'linear-gradient(135deg,' + BC.accent + ',' + BC.blue + ')', 'border-radius:14px;transform:rotate(12deg);box-shadow:0 8px 18px rgba(102,58,243,.4)')}</div><div style="font:11px 'Space Grotesk';color:${BC.ice}">简洁模型点睛</div>`)
    ),
    'hyperlink': () => baGrid(
      slide(`<div style="display:flex;flex-direction:column;gap:8px">${line(110, BC.barbad, 10)}${line(90, BC.barbad, 10)}${line(120, BC.barbad, 10)}</div><div style="font:11px 'Space Grotesk';color:${BC.fog}">目录不能跳</div>`),
      slide(`<div style="display:flex;flex-direction:column;gap:6px">${line(110, BC.barok, 10, 'cursor:pointer')}${line(90, BC.barok, 10, 'cursor:pointer')}${line(120, BC.accent, 10, 'cursor:pointer')}</div><div style="font:11px 'Space Grotesk';color:${BC.ice}">点目录直达对应页</div>`)
    ),
    'font-pairing': () => baGrid(
      slide(`<div style="font:13px Inter,sans-serif;color:${BC.mist};line-height:1.6">全用一种字体，标题正文没区分，版面平淡没性格。</div>`),
      slide(col([`<div style="font:16px Georgia,serif;color:${BC.ice};font-weight:700">标题衬线</div>`, `<div style="font:13px Inter,sans-serif;color:${BC.mist};line-height:1.6">正文无衬线，与标题形成对比，有层次。</div>`]))
    ),
    'remove-bg': () => baGrid(
      slide(`<div style="position:relative;width:150px;height:100px;border-radius:6px;background:repeating-linear-gradient(45deg,#3a465c,#3a465c 6px,#2a3550 6px,#2a3550 12px)"><div style="position:absolute;left:42px;top:24px;width:66px;height:52px;border-radius:8px;background:linear-gradient(135deg,${BC.muted2},#8fa3b8)"></div></div><div style="font:11px 'Space Grotesk';color:${BC.fog}">实拍图带杂背景</div>`),
      slide(`<div style="position:relative;width:150px;height:100px;border-radius:6px;background:rgba(186,214,247,.04)"><div style="position:absolute;left:42px;top:24px;width:66px;height:52px;border-radius:8px;background:linear-gradient(135deg,${BC.accent},${BC.blue});box-shadow:0 8px 18px rgba(102,58,243,.45)"></div></div><div style="font:11px 'Space Grotesk';color:${BC.ice}">去背悬浮干净</div>`)
    ),
    'infographic': () => baGrid(
      slide(`<div style="font:12px Inter,sans-serif;color:${BC.mist};line-height:1.5">第一段文字说明。第二段补充说明。第三段继续展开讲。</div>`),
      slide(`<div style="display:flex;flex-direction:column;gap:6px">${row([rbox(14, 14, BC.accent), line(90, BC.barok, 8)])}${row([rbox(14, 14, BC.accent, 'margin-left:20px'), line(80, BC.barok, 8)])}${row([rbox(14, 14, BC.accent, 'margin-left:40px'), line(70, BC.barok, 8)])}</div><div style="font:11px 'Space Grotesk';color:${BC.ice}">时间轴/流程一眼懂</div>`)
    ),
    'brand-vi': () => baGrid(
      slide(`<div style="display:flex;flex-direction:column;gap:8px">${line(110, '#e23b3b', 12)}${line(90, '#2faa3f', 12)}${txt('每页不同色字', '#e0a93b', 12)}</div><div style="font:11px 'Space Grotesk';color:${BC.fog}">每页不同色字</div>`),
      slide(`<div style="display:flex;flex-direction:column;gap:8px">${line(110, BC.accent, 12)}${line(90, BC.accent, 12)}${txt('统一 VI 专业', BC.accent, 12)}</div><div style="font:11px 'Space Grotesk';color:${BC.ice}">统一 VI 专业</div>`)
    ),
    'loop-anim': () => baGrid(
      slide(`<div style="display:flex;align-items:center;justify-content:center;height:90px">${box(50, 50, BC.muted2, 'border-radius:50%')}</div><div style="font:11px 'Space Grotesk';color:${BC.fog}">静态显死</div>`),
      slide(`<div style="display:flex;align-items:center;justify-content:center;height:90px">${box(50, 50, BC.accent, 'border-radius:50%;box-shadow:0 0 16px rgba(138,107,255,.5);animation:baPulse 1.6s ease-in-out infinite')}</div><div style="font:11px 'Space Grotesk';color:${BC.ice}">轻微循环点睛</div>`)
    ),
    'font-license': () => baGrid(
      slide(`<div style="display:flex;align-items:center;gap:8px">${txt('商业字体', '#e23b3b', 14, 'font-weight:700')}<span style="font:11px 'Space Grotesk';color:${BC.fog}">随手用 ⚠</span></div>`),
      slide(`<div style="display:flex;align-items:center;gap:8px">${txt('免费商用字体', BC.green, 14, 'font-weight:700')}<span style="font:11px 'Space Grotesk';color:${BC.ice}">已授权 ✓</span></div>`)
    ),

    /* __BA_APPEND__ */
  };

  window.BA_VISUALS = BA_VISUALS;
})();
