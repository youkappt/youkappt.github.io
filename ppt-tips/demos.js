/* ============================================================
   PPT 技巧页 — 可交互演示控件
   DEMOS[key](container, tech)  填充「动手试试」区域。
   每个控件内联样式，沿用 --color-* token。
   定时器统一登记到 window.__demoTimers，弹窗关闭时由 app.js 清理。
   ============================================================ */
(function () {
  const __timers = (window.__demoTimers = window.__demoTimers || []);
  function reg(id) { __timers.push(id); return id; }

  function slide(inner) { return '<div class="ba-slide">' + inner + '</div>'; }

  // 通用：可拖拽对比滑杆（改前 / 改后）
  function bindSlider(slider) {
    const handle = slider.querySelector('.ba-handle');
    const after = slider.querySelector('.ba-img.after');
    function set(pct) {
      pct = Math.max(0, Math.min(100, pct));
      handle.style.left = pct + '%';
      if (after) after.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
    }
    function fromEvent(e) {
      const rect = slider.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      set(x / rect.width * 100);
    }
    slider.addEventListener('pointerdown', e => { slider.setPointerCapture(e.pointerId); fromEvent(e); });
    slider.addEventListener('pointermove', e => { if (e.buttons) fromEvent(e); });
    set(50);
  }

  const DEMOS = {

    /* 1. 主题+母版：选主题色 → 三页同步换装 */
    themeSync(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">选主题色 → 三页同步换装</div>
        <div class="demo-row">
          <button class="demo-btn active" data-c="#663af3">紫罗兰</button>
          <button class="demo-btn" data-c="#027dea">信号蓝</button>
          <button class="demo-btn" data-c="#269684">深青</button>
          <button class="demo-btn" data-c="#e46d4c">暖橙</button>
        </div>
        <div class="demo-row" id="tsSlides" style="gap:12px"></div>
      </div>`;
      const wrap = c.querySelector('#tsSlides');
      function render(col) {
        wrap.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
          const s = document.createElement('div'); s.className = 'mini-slide';
          s.style.borderTop = '6px solid ' + col;
          s.innerHTML = `<div style="position:absolute;top:16%;left:8%;width:50%;height:12%;background:${col};border-radius:4px;opacity:.85"></div>`
            + `<div style="position:absolute;top:40%;left:8%;width:70%;height:6%;background:rgba(255,255,255,.2);border-radius:3px"></div>`
            + `<div style="position:absolute;top:54%;left:8%;width:55%;height:6%;background:rgba(255,255,255,.13);border-radius:3px"></div>`
            + `<div style="position:absolute;bottom:8%;right:8%;font:11px var(--font-mono);color:rgba(255,255,255,.4)">第 ${i} 页</div>`;
          wrap.appendChild(s);
        }
      }
      render('#663af3');
      c.querySelectorAll('[data-c]').forEach(b => b.onclick = () => render(b.dataset.c));
    },

    /* 2. 参考线对齐：吸附到同一条线 */
    alignSnap(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「对齐」让三个按钮顶端吸附到参考线</div>
        <div class="demo-row">
          <button class="demo-btn active" data-a="align" id="asAlign">对齐</button>
          <button class="demo-btn" data-a="shuffle" id="asShuffle">打乱</button>
        </div>
        <div class="mini-slide" id="asSlide"></div>
      </div>`;
      const slide = c.querySelector('#asSlide');
      const GUIDE_T = 42;                 // 参考线纵向位置 (%)
      const LEFT = [10, 40, 70];          // 三框横向位置 (%)
      const messyT = [22, 46, 30];        // 打乱：顶边高低不齐，明显偏离参考线
      function render(aligned) {
        slide.innerHTML = '';
        // 参考线：始终显示；对齐时高亮成紫色虚线 + 微光
        const guide = document.createElement('div');
        guide.style.cssText = `position:absolute;left:6%;top:${GUIDE_T}%;width:88%;height:0;border-top:1px dashed ${aligned ? 'rgba(160,120,255,.95)' : 'rgba(216,236,248,.45)'}`;
        slide.appendChild(guide);
        if (aligned) {
          const glow = document.createElement('div');
          glow.style.cssText = `position:absolute;left:6%;top:${GUIDE_T - 1}%;width:88%;height:2px;background:rgba(160,120,255,.35);filter:blur(1px)`;
          slide.appendChild(glow);
        }
        for (let i = 0; i < 3; i++) {
          const t = aligned ? GUIDE_T : messyT[i];
          const b = document.createElement('div');
          b.style.cssText = `position:absolute;left:${LEFT[i]}%;top:${t}%;width:22%;height:14%;background:#663af3;border-radius:6px;opacity:.9;box-shadow:${aligned ? '0 0 0 2px rgba(160,120,255,.5)' : 'none'};transition:all .35s ease`;
          slide.appendChild(b);
        }
      }
      render(false);
      c.querySelector('#asAlign').onclick = () => { c.querySelector('#asAlign').classList.add('active'); c.querySelector('#asShuffle').classList.remove('active'); render(true); };
      c.querySelector('#asShuffle').onclick = () => { c.querySelector('#asShuffle').classList.add('active'); c.querySelector('#asAlign').classList.remove('active'); render(false); };
    },

    /* 3. SmartArt：逐步生成流程图 */
    smartartBuild(c) {
      const labels = ['开始', '处理', '完成'];
      const cols = [6, 39, 72];
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「添加节点」逐步生成流程图</div>
        <div class="demo-row">
          <button class="demo-btn active" data-a="add" id="saAdd">添加节点</button>
          <button class="demo-btn" data-a="reset" id="saReset">重置</button>
        </div>
        <div class="mini-slide" id="saSlide"></div>
      </div>`;
      const slide = c.querySelector('#saSlide');
      let n = 0;
      function render() {
        slide.innerHTML = '';
        for (let i = 0; i < n; i++) {
          const box = document.createElement('div');
          box.style.cssText = `position:absolute;left:${cols[i]}%;top:34%;width:22%;height:16%;background:#663af3;border-radius:6px;opacity:.9;display:grid;place-items:center;color:#fff;font:13px var(--font-body);transition:all .3s ease`;
          box.textContent = labels[i];
          slide.appendChild(box);
          if (i > 0) {
            const start = cols[i - 1] + 22;
            const gap = cols[i] - start;
            const line = document.createElement('div');
            line.style.cssText = `position:absolute;left:${start}%;top:41%;width:${gap}%;height:2px;background:rgba(216,236,248,.6)`;
            slide.appendChild(line);
            const arrow = document.createElement('div');
            arrow.style.cssText = `position:absolute;left:${cols[i] - 2.4}%;top:40%;color:rgba(216,236,248,.75);font:10px/1 sans-serif`;
            arrow.textContent = '▶';
            slide.appendChild(arrow);
          }
        }
      }
      render();
      c.querySelector('#saAdd').onclick = () => { if (n < 3) { n++; render(); } };
      c.querySelector('#saReset').onclick = () => { n = 0; render(); };
    },

    /* 4. 缩放定位：点目录跳转 */
    zoomNav(c) {
      const cats = [['背景', '#663af3'], ['方案', '#027dea'], ['总结', '#269684']];
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点目录缩略图，跳转到对应章节</div>
        <div class="demo-row" id="znCats" style="gap:10px"></div>
        <div class="mini-slide" id="znPage"><div style="color:rgba(199,211,234,.4);font:13px var(--font-body)">← 点上面的章节缩略图跳转</div></div>
      </div>`;
      const row = c.querySelector('#znCats');
      const page = c.querySelector('#znPage');
      cats.forEach(([name, col]) => {
        const t = document.createElement('div');
        t.style.cssText = `width:30%;aspect-ratio:16/9;background:${col};border-radius:6px;opacity:.85;cursor:pointer;display:grid;place-items:center;color:#fff;font:12px var(--font-body);transition:transform .2s`;
        t.textContent = name;
        t.onclick = () => {
          page.innerHTML = `<div style="position:absolute;top:20%;left:8%;width:60%;height:12%;background:${col};border-radius:4px"></div>`
            + `<div style="position:absolute;top:44%;left:8%;width:80%;height:5%;background:rgba(255,255,255,.2);border-radius:3px"></div>`
            + `<div style="position:absolute;top:56%;left:8%;width:60%;height:5%;background:rgba(255,255,255,.13);border-radius:3px"></div>`
            + `<div style="position:absolute;bottom:8%;right:8%;font:11px var(--font-mono);color:rgba(255,255,255,.5)">${name} 章</div>`;
        };
        row.appendChild(t);
      });
    },

    /* 5. 动画窗格：要点依次出现 */
    revealSteps(c) {
      const items = ['要点一', '要点二', '要点三', '要点四'];
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「播放」让要点依次出现</div>
        <div class="demo-row">
          <button class="demo-btn active" data-a="play" id="rsPlay">▶ 播放</button>
          <button class="demo-btn" data-a="reset" id="rsReset">⟲ 复位</button>
        </div>
        <div class="mini-slide" id="rsSlide"></div>
      </div>`;
      const slide = c.querySelector('#rsSlide');
      let timer = null;
      function render(n) {
        slide.innerHTML = '';
        for (let i = 0; i < n; i++) {
          const p = document.createElement('div');
          p.style.cssText = `position:absolute;left:10%;top:${20 + i * 16}%;width:80%;height:12%;background:rgba(159,227,197,.16);border:1px solid rgba(38,150,132,.5);border-radius:6px;display:flex;align-items:center;padding-left:12px;color:#9fe3c5;font:13px var(--font-body)`;
          p.textContent = '· ' + items[i];
          slide.appendChild(p);
        }
      }
      render(0);
      c.querySelector('#rsPlay').onclick = () => { let n = 0; render(0); timer = reg(setInterval(() => { n++; render(n); if (n >= items.length) clearInterval(timer); }, 500)); };
      c.querySelector('#rsReset').onclick = () => { if (timer) clearInterval(timer); render(0); };
    },

    /* 6. 节：折叠 / 展开 */
    sectionNav(c) {
      const secs = [['背景', '#663af3', 3], ['方案', '#027dea', 2], ['总结', '#269684', 1]];
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点章节标题，折叠 / 展开该章</div>
        <div class="demo-stack" id="snList" style="gap:8px"></div>
      </div>`;
      const list = c.querySelector('#snList');
      secs.forEach(([name, col, cnt]) => {
        const grp = document.createElement('div');
        const head = document.createElement('div');
        head.style.cssText = `display:flex;align-items:center;gap:8px;cursor:pointer;color:${col};font:600 14px var(--font-body)`;
        head.innerHTML = `<span class="sn-caret">▾</span> ${name} <span style="color:var(--color-fog-veil);font:12px var(--font-mono)">${cnt} 页</span>`;
        const body = document.createElement('div');
        body.style.cssText = 'display:flex;gap:6px;margin-top:6px;flex-wrap:wrap';
        for (let i = 0; i < cnt; i++) { const p = document.createElement('div'); p.style.cssText = 'width:40px;height:26px;background:rgba(255,255,255,.1);border-radius:4px'; body.appendChild(p); }
        let open = true;
        head.onclick = () => { open = !open; body.style.display = open ? 'flex' : 'none'; head.querySelector('.sn-caret').textContent = open ? '▾' : '▸'; };
        grp.appendChild(head); grp.appendChild(body); list.appendChild(grp);
      });
    },

    /* 7. 布尔运算：拼出新图形 */
    booleanBuild(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">两个形状做布尔运算，拼出新图形</div>
        <div class="demo-row">
          <button class="demo-btn active" data-op="sub" id="bbSub">减去</button>
          <button class="demo-btn" data-op="inter" id="bbInter">相交</button>
          <button class="demo-btn" data-op="union" id="bbUnion">联合</button>
        </div>
        <div class="mini-slide" id="bbSlide"></div>
      </div>`;
      const slide = c.querySelector('#bbSlide');
      function render(op) {
        if (op === 'sub') slide.innerHTML = `<div style="position:absolute;left:34%;top:34%;width:32%;height:32%;border:14px solid #663af3;border-radius:50%;box-sizing:border-box;opacity:.9"></div>`;
        else if (op === 'inter') slide.innerHTML = `<div style="position:absolute;left:40%;top:40%;width:20%;height:20%;background:#663af3;border-radius:6px;opacity:.9"></div>`;
        else slide.innerHTML = `<div style="position:absolute;left:32%;top:32%;width:36%;height:36%;background:#663af3;border-radius:8px;opacity:.85"></div>`;
      }
      render('sub');
      c.querySelectorAll('[data-op]').forEach(b => b.onclick = () => render(b.dataset.op));
    },

    /* 8. 取色器：从 Logo 吸色 */
    eyedrop(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「吸色」从 Logo 取色填文字</div>
        <div class="demo-row">
          <div style="width:34px;height:34px;border-radius:8px;background:#f59e0b;display:grid;place-items:center;color:#fff;font:600 12px var(--font-body)">Logo</div>
          <button class="demo-btn" data-a="pick" id="edPick">吸色器取色</button>
        </div>
        <div class="mini-slide" id="edSlide"><div id="edText" style="color:#e6b35a;font:600 18px var(--font-body)">优卡说PPT</div></div>
      </div>`;
      const text = c.querySelector('#edText');
      c.querySelector('#edPick').onclick = () => { text.style.transition = 'color .4s'; text.style.color = '#f59e0b'; };
    },

    /* 9. 母版批量：开关母版元素 */
    masterBatch(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">开关母版元素，所有页同步显示 / 隐藏</div>
        <div class="demo-row">
          <button class="demo-btn active" data-a="on" id="mbOn">母版开启</button>
          <button class="demo-btn" data-a="off" id="mbOff">母版关闭</button>
        </div>
        <div class="demo-row" id="mbSlides" style="gap:10px"></div>
      </div>`;
      const wrap = c.querySelector('#mbSlides');
      function render(on) {
        wrap.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
          const s = document.createElement('div'); s.className = 'mini-slide';
          s.innerHTML = `<div style="position:absolute;left:6%;top:7%;width:12%;height:9%;background:${on ? '#663af3' : 'rgba(255,255,255,.12)'};border-radius:4px;opacity:${on ? '.9' : '.5'}"></div>`
            + `<div style="position:absolute;right:6%;bottom:7%;font:11px var(--font-mono);color:rgba(216,236,248,${on ? '.6' : '.3'})">${i}</div>`;
          wrap.appendChild(s);
        }
      }
      render(true);
      c.querySelector('#mbOn').onclick = () => { c.querySelector('#mbOn').classList.add('active'); c.querySelector('#mbOff').classList.remove('active'); render(true); };
      c.querySelector('#mbOff').onclick = () => { c.querySelector('#mbOff').classList.add('active'); c.querySelector('#mbOn').classList.remove('active'); render(false); };
    },

    /* 10. 高级感封面：三步成型 */
    coverBuild(c) {
      const steps = [
        () => `<div style="position:absolute;left:10%;top:30%;width:60%;height:2px;background:rgba(216,236,248,.25)"></div>`,
        () => `<div style="position:absolute;left:10%;top:30%;width:60%;height:2px;background:rgba(216,236,248,.4)"></div><div style="position:absolute;left:10%;top:14%;width:70%;height:14%;background:rgba(216,236,248,.92);border-radius:4px"></div>`,
        () => `<div style="position:absolute;left:10%;top:14%;width:70%;height:14%;background:rgba(216,236,248,.92);border-radius:4px"></div><div style="position:absolute;left:10%;top:34%;width:50%;height:6%;background:rgba(199,211,234,.6);border-radius:3px"></div><div style="position:absolute;left:10%;top:48%;width:18%;height:12%;background:#663af3;border-radius:6px;opacity:.9"></div><div style="position:absolute;left:10%;top:30%;width:60%;height:2px;background:rgba(216,236,248,.4)"></div>`
      ];
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「播放」看封面三步成型</div>
        <div class="demo-row">
          <button class="demo-btn active" data-a="play" id="cbPlay">▶ 播放</button>
          <button class="demo-btn" data-a="reset" id="cbReset">⟲ 复位</button>
        </div>
        <div class="mini-slide" id="cbSlide"></div>
      </div>`;
      const slide = c.querySelector('#cbSlide');
      let timer = null, n = 0;
      function render(k) { slide.innerHTML = k === 0 ? '' : steps[k - 1](); }
      render(0);
      c.querySelector('#cbPlay').onclick = () => { n = 0; render(0); timer = reg(setInterval(() => { n++; render(n); if (n >= 3) clearInterval(timer); }, 600)); };
      c.querySelector('#cbReset').onclick = () => { if (timer) clearInterval(timer); n = 0; render(0); };
    },

    /* 11. 合并形状去背：方形 → 圆形 滑杆 */
    removeBg(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">拖动滑杆：方形硬边 → 圆形裁切</div>
        <div class="ba-slider" id="rbSlider">
          <div class="ba-img before">${slide('<div style="position:absolute;left:30%;top:26%;width:40%;height:40%;background:linear-gradient(135deg,#e4483c,#f59e0b);opacity:.85"></div><div style="position:absolute;left:30%;top:26%;width:40%;height:40%;border:1px solid rgba(255,255,255,.3)"></div>')}</div>
          <div class="ba-img after">${slide('<div style="position:absolute;left:33%;top:29%;width:34%;height:34%;border-radius:50%;background:linear-gradient(135deg,#663af3,#027dea);opacity:.92"></div>')}</div>
          <div class="ba-label before">方形</div><div class="ba-label after">圆形</div>
          <div class="ba-handle"></div>
        </div>
      </div>`;
      bindSlider(c.querySelector('#rbSlider'));
    },

    /* 12. 图标化信息图：段落 ↔ 图标卡 */
    iconify(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「图标化」把段落变信息图</div>
        <div class="demo-row">
          <button class="demo-btn active" data-a="icon" id="icIcon">图标化</button>
          <button class="demo-btn" data-a="text" id="icText">原文</button>
        </div>
        <div class="mini-slide" id="icSlide"></div>
      </div>`;
      const slide = c.querySelector('#icSlide');
      function svgIcon(name, color) {
        const P = {
          target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
          chart: '<line x1="5" y1="20" x2="5" y2="13"/><line x1="12" y1="20" x2="12" y2="6"/><line x1="19" y1="20" x2="19" y2="15"/><line x1="3.5" y1="20" x2="20.5" y2="20"/>',
          rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>'
        };
        return '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + P[name] + '</svg>';
      }
      function text() {
        slide.innerHTML = '<div style="position:absolute;left:8%;top:14%;width:52%;height:5%;background:rgba(255,255,255,.28);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:22%;width:84%;height:3%;background:rgba(255,255,255,.12);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:27%;width:84%;height:3%;background:rgba(255,255,255,.12);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:32%;width:62%;height:3%;background:rgba(255,255,255,.12);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:44%;width:52%;height:5%;background:rgba(255,255,255,.28);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:52%;width:84%;height:3%;background:rgba(255,255,255,.12);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:57%;width:84%;height:3%;background:rgba(255,255,255,.12);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:62%;width:62%;height:3%;background:rgba(255,255,255,.12);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:74%;width:52%;height:5%;background:rgba(255,255,255,.28);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:82%;width:84%;height:3%;background:rgba(255,255,255,.12);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:87%;width:84%;height:3%;background:rgba(255,255,255,.12);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:92%;width:62%;height:3%;background:rgba(255,255,255,.12);border-radius:3px"></div>';
      }
      function icon() {
        const cards = [
          { c: '#663af3', n: 'target', t: '目标市场', d: '锁定核心用户' },
          { c: '#027dea', n: 'chart', t: '数据增长', d: '月度 +38%' },
          { c: '#269684', n: 'rocket', t: '正式发布', d: 'Q3 上线' }
        ];
        let h = '';
        cards.forEach((k, i) => {
          const left = 8 + i * 30;
          h += '<div style="position:absolute;left:' + left + '%;top:16%;width:24%;height:52%;background:' + k.c + '22;border:1px solid ' + k.c + ';border-radius:8px"></div>';
          h += '<div style="position:absolute;left:' + (left + 7) + '%;top:22%;width:46px;height:46px">' + svgIcon(k.n, k.c) + '</div>';
          h += '<div style="position:absolute;left:' + left + '%;top:47%;width:24%;text-align:center;font:600 12px var(--font-body);color:#fff">' + k.t + '</div>';
          h += '<div style="position:absolute;left:' + left + '%;top:60%;width:24%;text-align:center;font:10px var(--font-body);color:rgba(216,236,248,.6);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + k.d + '</div>';
        });
        slide.innerHTML = h;
      }
      icon();
      c.querySelector('#icIcon').onclick = () => { c.querySelector('#icIcon').classList.add('active'); c.querySelector('#icText').classList.remove('active'); icon(); };
      c.querySelector('#icText').onclick = () => { c.querySelector('#icText').classList.add('active'); c.querySelector('#icIcon').classList.remove('active'); text(); };
    },

    /* 13. 嵌入字体：开关嵌入，看对方电脑是否变样 */
    embedFont(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">开关嵌入字体，看对方电脑是否变样</div>
        <div class="demo-row">
          <button class="demo-btn active" data-a="on" id="efOn">嵌入开启</button>
          <button class="demo-btn" data-a="off" id="efOff">嵌入关闭</button>
        </div>
        <div class="mini-slide" id="efSlide"></div>
      </div>`;
      const slide = c.querySelector('#efSlide');
      function render(on) {
        slide.innerHTML = on
          ? '<div style="position:absolute;top:18%;left:8%;width:30%;height:9%;background:#663af3;border-radius:4px;opacity:.9"></div>'
            + '<div style="position:absolute;top:42%;left:8%;font:600 20px var(--font-body);color:#9fe3c5">优卡说PPT</div>'
            + '<div style="position:absolute;bottom:10%;left:8%;font:12px var(--font-mono);color:#9fe3c5">✓ 原样显示</div>'
          : '<div style="position:absolute;top:18%;left:8%;width:30%;height:9%;background:#e4483c;border-radius:4px;opacity:.85"></div>'
            + '<div style="position:absolute;top:42%;left:8%;font:600 20px var(--font-serif);color:#e6b35a">优卡说PPT</div>'
            + '<div style="position:absolute;bottom:10%;left:8%;font:12px var(--font-mono);color:#f0a59a">⚠ 变宋体</div>';
      }
      render(true);
      c.querySelector('#efOn').onclick = () => { c.querySelector('#efOn').classList.add('active'); c.querySelector('#efOff').classList.remove('active'); render(true); };
      c.querySelector('#efOff').onclick = () => { c.querySelector('#efOff').classList.add('active'); c.querySelector('#efOn').classList.remove('active'); render(false); };
    },

    /* 14. 快捷键三件套：逐个开关键，看效果叠加 */
    shortcutKeys(c) {
      const state = { fmt: false, dup: false, snap: false };
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">逐个开关键，看效果叠加</div>
        <div class="demo-row" style="gap:8px">
          <button class="demo-btn" data-a="fmt" id="skFmt">格式刷</button>
          <button class="demo-btn" data-a="dup" id="skDup">Ctrl+复制</button>
          <button class="demo-btn" data-a="snap" id="skSnap">Alt 吸附</button>
        </div>
        <div class="mini-slide" id="skSlide"></div>
      </div>`;
      const slide = c.querySelector('#skSlide');
      function render() {
        let h = '';
        if (state.snap) h += '<div style="position:absolute;left:8%;top:50%;width:84%;height:1px;background:rgba(216,236,248,.5)"></div>';
        const cols = state.dup ? [10, 32, 54, 76] : [10, 40, 70];
        const top = state.snap ? 44 : 34;
        for (let i = 0; i < cols.length; i++) {
          const col = state.fmt ? '#663af3' : 'rgba(255,255,255,.3)';
          h += `<div style="position:absolute;left:${cols[i]}%;top:${top}%;width:18%;height:12%;background:${col};border-radius:6px;opacity:${state.fmt ? .85 : .6};transition:all .3s ease"></div>`;
        }
        slide.innerHTML = h;
      }
      render();
      const map = { skFmt: 'fmt', skDup: 'dup', skSnap: 'snap' };
      Object.keys(map).forEach(id => {
        c.querySelector('#' + id).onclick = () => { state[map[id]] = !state[map[id]]; c.querySelector('#' + id).classList.toggle('active'); render(); };
      });
    },

    /* 15. 导出压缩：切换导出设置看清晰度与体积 */
    exportCompress(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">切换导出设置，看清晰度与体积</div>
        <div class="demo-row">
          <button class="demo-btn active" data-a="hi" id="ecHi">超大型+压缩</button>
          <button class="demo-btn" data-a="lo" id="ecLo">默认 1280</button>
        </div>
        <div class="mini-slide" id="ecSlide"></div>
      </div>`;
      const slide = c.querySelector('#ecSlide');
      function render(hi) {
        slide.innerHTML = hi
          ? '<div style="position:absolute;left:33%;top:25%;width:34%;height:34%;background:linear-gradient(135deg,#663af3,#027dea);border-radius:4px;opacity:.95"></div>'
            + '<div style="position:absolute;left:8%;top:70%;font:12px var(--font-mono);color:#9fe3c5">超大型 · 压缩后 12MB</div>'
          : '<div style="position:absolute;left:30%;top:22%;width:40%;height:40%;background:linear-gradient(135deg,#e4483c,#f59e0b);border-radius:4px;opacity:.5;filter:blur(2px)"></div>'
            + '<div style="position:absolute;left:8%;top:70%;font:12px var(--font-mono);color:#f0a59a">1280 宽 · 86MB</div>';
      }
      render(true);
      c.querySelector('#ecHi').onclick = () => { c.querySelector('#ecHi').classList.add('active'); c.querySelector('#ecLo').classList.remove('active'); render(true); };
      c.querySelector('#ecLo').onclick = () => { c.querySelector('#ecLo').classList.add('active'); c.querySelector('#ecHi').classList.remove('active'); render(false); };
    },

    /* 16. 平滑切换：点播放看元素过渡 */
    morphDemo(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「播放」看元素平滑过渡</div>
        <div class="demo-row">
          <button class="demo-btn active" data-a="play" id="moPlay">▶ 播放</button>
          <button class="demo-btn" data-a="reset" id="moReset">⟲ 复位</button>
        </div>
        <div class="mini-slide" id="moSlide"><div id="moBox" style="position:absolute;left:10%;top:40%;width:26%;height:20%;background:#663af3;border-radius:8px;opacity:.9;transition:all .8s ease;display:grid;place-items:center;color:#fff;font:13px var(--font-body)">标题</div></div>
      </div>`;
      const box = c.querySelector('#moBox');
      c.querySelector('#moPlay').onclick = () => { box.style.left = '55%'; box.style.top = '30%'; box.style.width = '34%'; box.style.height = '26%'; };
      c.querySelector('#moReset').onclick = () => { box.style.left = '10%'; box.style.top = '40%'; box.style.width = '26%'; box.style.height = '20%'; };
    },

    /* 17. 图表美化：默认灰图表 ↔ 高级 */
    chartBeautify(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「美化」把默认灰图表变高级</div>
        <div class="demo-row">
          <button class="demo-btn active" data-a="pretty" id="cbPretty">美化</button>
          <button class="demo-btn" data-a="plain" id="cbPlain">默认</button>
        </div>
        <div class="mini-slide" id="cbSlide"></div>
      </div>`;
      const slide = c.querySelector('#cbSlide');
      function render(pretty) {
        const cols = [12, 28, 44, 60];
        const hs = [50, 34, 58, 42];
        let h = pretty ? '' : '<div style="position:absolute;left:12%;top:18%;width:56%;height:1px;background:rgba(255,255,255,.18)"></div>';
        for (let i = 0; i < 4; i++) {
          const col = pretty ? (i === 2 ? '#9fe3c5' : '#663af3') : 'rgba(255,255,255,.3)';
          h += `<div style="position:absolute;left:${cols[i]}%;top:${78 - hs[i]}%;width:8%;height:${hs[i]}%;background:${col};border-radius:3px 3px 0 0;transition:all .35s ease"></div>`;
          if (pretty) h += `<div style="position:absolute;left:${cols[i]}%;top:${74 - hs[i]}%;width:8%;text-align:center;font:10px var(--font-mono);color:rgba(216,236,248,.8)">${hs[i]}</div>`;
        }
        slide.innerHTML = h;
      }
      render(true);
      c.querySelector('#cbPretty').onclick = () => { c.querySelector('#cbPretty').classList.add('active'); c.querySelector('#cbPlain').classList.remove('active'); render(true); };
      c.querySelector('#cbPlain').onclick = () => { c.querySelector('#cbPlain').classList.add('active'); c.querySelector('#cbPretty').classList.remove('active'); render(false); };
    },

    /* 18. 触发器：点显示答案才出现 */
    triggerDemo(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「显示答案」，答案才出现</div>
        <div class="demo-row">
          <button class="demo-btn" data-a="show" id="trShow">显示答案</button>
          <button class="demo-btn" data-a="hide" id="trHide">收起</button>
        </div>
        <div class="mini-slide" id="trSlide">
          <div style="position:absolute;top:20%;left:8%;font:600 15px var(--font-body);color:rgba(216,236,248,.85)">Q：PPT 全称？</div>
          <div id="trAns" style="position:absolute;top:46%;left:8%;width:84%;height:14%;background:rgba(159,227,197,.16);border:1px solid rgba(38,150,132,.5);border-radius:6px;display:flex;align-items:center;padding-left:12px;color:#9fe3c5;font:13px var(--font-body);opacity:0;transition:opacity .4s">A：PowerPoint</div>
        </div>
      </div>`;
      const ans = c.querySelector('#trAns');
      c.querySelector('#trShow').onclick = () => ans.style.opacity = '1';
      c.querySelector('#trHide').onclick = () => ans.style.opacity = '0';
    }
  };

  window.DEMOS = DEMOS;
})();
