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
    },

    /* 19. 替换字体：A 字体 → B 字体 全篇切换 */
    replaceFont(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「替换为通用字体」，全篇一键换衣</div>
        <div class="demo-row">
          <button class="demo-btn active" id="rfSwap">替换为通用字体</button>
          <button class="demo-btn" id="rfReset">还原</button>
        </div>
        <div class="mini-slide" id="rfSlide"></div>
      </div>`;
      const slide = c.querySelector('#rfSlide');
      function render(swapped) {
        slide.innerHTML = `<div style="position:absolute;top:22%;left:10%;font:600 20px ${swapped ? 'var(--font-body)' : 'var(--font-serif)'};color:${swapped ? '#9fe3c5' : '#e6b35a'}">优卡说PPT</div>`
          + `<div style="position:absolute;top:48%;left:10%;width:80%;height:3%;background:rgba(255,255,255,.18);border-radius:3px"></div>`
          + `<div style="position:absolute;bottom:10%;left:10%;font:12px var(--font-mono);color:${swapped ? '#9fe3c5' : '#f0a59a'}">${swapped ? '18 处已替换 · 全篇统一' : '特殊字体 · 对方易变样'}</div>`;
      }
      render(false);
      c.querySelector('#rfSwap').onclick = () => { render(true); c.querySelector('#rfSwap').classList.add('active'); c.querySelector('#rfReset').classList.remove('active'); };
      c.querySelector('#rfReset').onclick = () => { render(false); c.querySelector('#rfReset').classList.add('active'); c.querySelector('#rfSwap').classList.remove('active'); };
    },

    /* 20. 选择窗格：点名选中、眼睛显隐 */
    selectionPane(c) {
      const objs = [['标题文字', true], ['蓝色块', true], ['绿色块', true], ['红底', false]];
      const cols = { '标题文字': 'rgba(255,255,255,.85)', '蓝色块': '#027dea', '绿色块': '#269684', '红底': '#e4483c' };
      const pos = { '标题文字': 'top:18%;left:10%;width:70%;height:8%', '蓝色块': 'top:40%;left:12%;width:34%;height:20%', '绿色块': 'top:44%;left:52%;width:30%;height:16%', '红底': 'top:30%;left:30%;width:40%;height:36%' };
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点对象名显隐；列表里点名就选中</div>
        <div class="demo-row" id="spList" style="gap:6px;flex-wrap:wrap"></div>
        <div class="mini-slide" id="spSlide"></div>
      </div>`;
      const list = c.querySelector('#spList');
      const slide = c.querySelector('#spSlide');
      function render() {
        slide.innerHTML = '';
        objs.forEach(([name, on]) => {
          if (!on) return;
          const d = document.createElement('div');
          const isText = name === '标题文字';
          d.style.cssText = 'position:absolute;' + pos[name] + ';background:' + (isText ? 'rgba(255,255,255,.85)' : cols[name]) + ';border-radius:6px;opacity:.9' + (isText ? ';display:flex;align-items:center;padding-left:8px;color:#0b0d18;font:600 12px var(--font-body);z-index:2' : ';z-index:' + (name === '红底' ? '0' : '1'));
          if (isText) d.textContent = name;
          slide.appendChild(d);
        });
      }
      objs.forEach(([name, on]) => {
        const b = document.createElement('button');
        b.className = 'demo-btn' + (on ? ' active' : '');
        b.textContent = (on ? '● ' : '○ ') + name;
        b.onclick = () => { const o = objs.find(x => x[0] === name); o[1] = !o[1]; b.classList.toggle('active'); b.textContent = (o[1] ? '● ' : '○ ') + name; render(); };
        list.appendChild(b);
      });
      render();
    },

    /* 21. 组合：打包整体搬运 */
    groupDemo(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「组合」打包，再整体移动不散</div>
        <div class="demo-row">
          <button class="demo-btn active" id="gdGroup">组合 Ctrl+G</button>
          <button class="demo-btn" id="gdUngroup">取消组合</button>
        </div>
        <div class="mini-slide" id="gdSlide"></div>
      </div>`;
      const slide = c.querySelector('#gdSlide');
      const items = [['#663af3', 10, 30, 18, 14], ['#9fe3c5', 40, 44, 14, 10], ['#027dea', 66, 28, 11, 11]];
      function render(grouped) {
        slide.innerHTML = '';
        if (grouped) {
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          items.forEach(([col, x, y, w, h]) => {
            minX = Math.min(minX, x); maxX = Math.max(maxX, x + w);
            minY = Math.min(minY, y); maxY = Math.max(maxY, y + h);
          });
          const pad = 2;
          slide.innerHTML = '<div style="position:absolute;left:' + (minX - pad) + '%;top:' + (minY - pad) + '%;width:' + (maxX - minX + pad * 2) + '%;height:' + (maxY - minY + pad * 2) + '%;border:2px dashed #663af3;border-radius:10px;opacity:.9"></div>';
        }
        items.forEach(([col, x, y, w, h]) => {
          const d = document.createElement('div');
          d.style.cssText = 'position:absolute;left:' + x + '%;top:' + y + '%;width:' + w + '%;height:' + h + '%;background:' + col + ';border-radius:6px;opacity:.9;transition:all .3s ease';
          slide.appendChild(d);
        });
      }
      render(false);
      c.querySelector('#gdGroup').onclick = () => { render(true); c.querySelector('#gdGroup').classList.add('active'); c.querySelector('#gdUngroup').classList.remove('active'); };
      c.querySelector('#gdUngroup').onclick = () => { render(false); c.querySelector('#gdUngroup').classList.add('active'); c.querySelector('#gdGroup').classList.remove('active'); };
    },

    /* 22. 删除背景：一键去背 */
    removeBgTool(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「删除背景」，只留主体</div>
        <div class="demo-row">
          <button class="demo-btn active" id="rb2On">已去背</button>
          <button class="demo-btn" id="rb2Off">带背景</button>
        </div>
        <div class="mini-slide" id="rb2Slide"></div>
      </div>`;
      const slide = c.querySelector('#rb2Slide');
      function render(bg) {
        slide.innerHTML = (bg ? '<div style="position:absolute;left:24%;top:20%;width:52%;height:52%;background:#c9ccd6;border-radius:6px;opacity:.85"></div>' : '')
          + '<div style="position:absolute;left:38%;top:30%;width:24%;height:34%;background:linear-gradient(135deg,#663af3,#027dea);border-radius:50%;opacity:.95"></div>'
          + '<div style="position:absolute;left:38%;top:30%;width:24%;height:34%;border-radius:50%;border:2px solid rgba(216,236,248,.4)"></div>';
      }
      render(false);
      c.querySelector('#rb2On').onclick = () => { render(false); c.querySelector('#rb2On').classList.add('active'); c.querySelector('#rb2Off').classList.remove('active'); };
      c.querySelector('#rb2Off').onclick = () => { render(true); c.querySelector('#rb2Off').classList.add('active'); c.querySelector('#rb2On').classList.remove('active'); };
    },

    /* 23. 演示者视图：双屏 */
    presenterView(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「放映」切换 演讲者视图 / 观众视图</div>
        <div class="demo-row">
          <button class="demo-btn active" id="pvPre">演讲者视图</button>
          <button class="demo-btn" id="pvAud">观众视图</button>
        </div>
        <div class="mini-slide" id="pvSlide"></div>
      </div>`;
      const slide = c.querySelector('#pvSlide');
      function render(pre) {
        if (pre) {
          slide.innerHTML = '<div style="position:absolute;left:6%;top:8%;width:56%;height:52%;background:rgba(255,255,255,.06);border:1px solid rgba(216,236,248,.2);border-radius:8px"></div>'
            + '<div style="position:absolute;left:6%;top:64%;width:56%;height:24%;background:rgba(102,58,243,.16);border:1px solid rgba(102,58,243,.5);border-radius:6px;padding:6px 8px;color:#9fe3c5;font:11px var(--font-body)">备注：本页讲核心结论…</div>'
            + '<div style="position:absolute;left:64%;top:8%;width:30%;height:38%;background:rgba(2,125,234,.16);border:1px solid rgba(2,125,234,.5);border-radius:6px"></div>'
            + '<div style="position:absolute;left:64%;top:50%;width:30%;height:14%;background:rgba(255,255,255,.1);border-radius:4px"></div>'
            + '<div style="position:absolute;left:64%;top:68%;font:10px var(--font-mono);color:rgba(216,236,248,.6)">下一页预览</div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:18%;top:24%;width:64%;height:8%;background:rgba(216,236,248,.9);border-radius:4px"></div>'
            + '<div style="position:absolute;left:18%;top:40%;width:64%;height:3%;background:rgba(255,255,255,.2);border-radius:3px"></div>'
            + '<div style="position:absolute;left:18%;top:48%;width:64%;height:3%;background:rgba(255,255,255,.13);border-radius:3px"></div>'
            + '<div style="position:absolute;left:18%;top:70%;font:10px var(--font-mono);color:rgba(216,236,248,.4)">观众只看到这一页</div>';
        }
      }
      render(true);
      c.querySelector('#pvPre').onclick = () => { render(true); c.querySelector('#pvPre').classList.add('active'); c.querySelector('#pvAud').classList.remove('active'); };
      c.querySelector('#pvAud').onclick = () => { render(false); c.querySelector('#pvAud').classList.add('active'); c.querySelector('#pvPre').classList.remove('active'); };
    },

    /* 24. 设计灵感：AI 版式 */
    designerDemo(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">选中文字 → 右侧 AI 给版式方案</div>
        <div class="demo-row">
          <button class="demo-btn active" id="ddGen">生成设计方案</button>
          <button class="demo-btn" id="ddClear">清空</button>
        </div>
        <div class="mini-slide" id="ddSlide"></div>
      </div>`;
      const slide = c.querySelector('#ddSlide');
      function render(on) {
        if (!on) {
          slide.innerHTML = '<div style="position:absolute;left:8%;top:18%;width:50%;height:6%;background:rgba(255,255,255,.3);border-radius:3px"></div>'
            + '<div style="position:absolute;left:8%;top:28%;width:84%;height:3%;background:rgba(255,255,255,.14);border-radius:3px"></div>'
            + '<div style="position:absolute;left:8%;top:34%;width:84%;height:3%;background:rgba(255,255,255,.14);border-radius:3px"></div>'
            + '<div style="position:absolute;left:8%;top:74%;font:11px var(--font-mono);color:rgba(216,236,248,.4)">← 选中文字后右侧出现灵感</div>';
          return;
        }
        slide.innerHTML = '<div style="position:absolute;left:6%;top:12%;width:28%;height:30%;background:linear-gradient(135deg,#663af3,#027dea);border-radius:6px;opacity:.9"></div>'
          + '<div style="position:absolute;left:38%;top:12%;width:28%;height:30%;background:rgba(38,150,132,.3);border:1px solid rgba(38,150,132,.6);border-radius:6px"></div>'
          + '<div style="position:absolute;left:70%;top:12%;width:24%;height:30%;background:rgba(245,158,11,.3);border:1px solid rgba(245,158,11,.6);border-radius:6px"></div>'
          + '<div style="position:absolute;left:6%;top:48%;width:88%;height:3%;background:rgba(255,255,255,.14);border-radius:3px"></div>'
          + '<div style="position:absolute;left:6%;top:56%;width:88%;height:3%;background:rgba(255,255,255,.14);border-radius:3px"></div>'
          + '<div style="position:absolute;left:6%;top:74%;font:11px var(--font-mono);color:#9fe3c5">3 个 AI 版式 · 点一下套用</div>';
      }
      render(false);
      c.querySelector('#ddGen').onclick = () => { render(true); c.querySelector('#ddGen').classList.add('active'); c.querySelector('#ddClear').classList.remove('active'); };
      c.querySelector('#ddClear').onclick = () => { render(false); c.querySelector('#ddClear').classList.add('active'); c.querySelector('#ddGen').classList.remove('active'); };
    },

    /* 25. 组合图：柱 + 线 双轴 */
    comboChart(c) {
      const bars = [[12, 50], [28, 34], [44, 58], [60, 42]];
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「加折线」，柱表量 + 线表率</div>
        <div class="demo-row">
          <button class="demo-btn active" id="ccAdd">加折线(率)</button>
          <button class="demo-btn" id="ccDel">只看柱</button>
        </div>
        <div class="mini-slide" id="ccSlide"></div>
      </div>`;
      const slide = c.querySelector('#ccSlide');
      function render(withLine) {
        let h = '';
        bars.forEach(([x, h2]) => { h += '<div style="position:absolute;left:' + x + '%;top:' + (78 - h2) + '%;width:8%;height:' + h2 + '%;background:#663af3;border-radius:3px 3px 0 0;transition:all .3s ease"></div>'; });
        if (withLine) {
          const pts = bars.map(([x, h2]) => (x + 4) + ',' + (78 - h2 - 2)).join(' ');
          h += '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><polyline points="' + pts + '" fill="none" stroke="#9fe3c5" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>';
        }
        h += '<div style="position:absolute;bottom:6%;left:8%;font:11px var(--font-mono);color:' + (withLine ? '#9fe3c5' : 'rgba(216,236,248,.5)') + '">' + (withLine ? '柱=量 · 线=率' : '仅柱：量') + '</div>';
        slide.innerHTML = h;
      }
      render(true);
      c.querySelector('#ccAdd').onclick = () => { render(true); c.querySelector('#ccAdd').classList.add('active'); c.querySelector('#ccDel').classList.remove('active'); };
      c.querySelector('#ccDel').onclick = () => { render(false); c.querySelector('#ccDel').classList.add('active'); c.querySelector('#ccAdd').classList.remove('active'); };
    },

    /* 26. 动画刷：复制动画 */
    animPainter(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「动画刷」把动画复给其余对象</div>
        <div class="demo-row">
          <button class="demo-btn" id="apBrush">动画刷</button>
          <button class="demo-btn" id="apReset">复位</button>
        </div>
        <div class="mini-slide" id="apSlide"></div>
      </div>`;
      const slide = c.querySelector('#apSlide');
      function render(painted) {
        slide.innerHTML = '';
        [10, 42, 70].forEach((x, i) => {
          const on = painted[i];
          const d = document.createElement('div');
          d.style.cssText = 'position:absolute;left:' + x + '%;top:40%;width:18%;height:14%;background:' + (on ? '#663af3' : 'rgba(255,255,255,.3)') + ';border-radius:6px;opacity:.9;' + (on ? 'box-shadow:0 0 0 2px rgba(159,227,197,.6)' : '');
          slide.appendChild(d);
        });
        const note = document.createElement('div');
        note.style.cssText = 'position:absolute;bottom:8%;left:8%;font:11px var(--font-mono);color:' + ((painted[0] && painted[1] && painted[2]) ? '#9fe3c5' : 'rgba(216,236,248,.5)');
        note.textContent = (painted[0] && painted[1] && painted[2]) ? '三对象同款动画 · 统一节奏' : '源对象已设动画，待刷';
        slide.appendChild(note);
      }
      render([true, false, false]);
      c.querySelector('#apBrush').onclick = () => { render([true, true, true]); c.querySelector('#apBrush').classList.add('active'); c.querySelector('#apReset').classList.remove('active'); };
      c.querySelector('#apReset').onclick = () => { render([true, false, false]); c.querySelector('#apReset').classList.add('active'); c.querySelector('#apBrush').classList.remove('active'); };
    },

    /* 第 2 波：编辑顶点 / 重新着色 / 格式刷 / 版式 / 自定义放映 / 录制旁白 / 表格美化 / 图片压缩 */
    editPoints(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「编辑顶点」把方块拖成曲线</div>
        <div class="demo-row">
          <button class="demo-btn" id="epEdit">编辑顶点</button>
          <button class="demo-btn active" id="epReset">复位</button>
        </div>
        <div class="mini-slide" id="epSlide"></div>
      </div>`;
      const slide = c.querySelector('#epSlide');
      function render(edited) {
        slide.innerHTML = edited
          ? '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;left:28%;top:24%;width:44%;height:52%"><path d="M20 12 Q 50 0 80 12 Q 96 50 80 88 Q 50 100 20 88 Q 4 50 20 12 Z" fill="rgba(102,58,243,.5)" stroke="#9fe3c5" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg>'
          : '<div style="position:absolute;left:32%;top:28%;width:36%;height:44%;background:rgba(255,255,255,.2);border:1px dashed rgba(255,255,255,.4)"></div>';
      }
      render(false);
      c.querySelector('#epEdit').onclick = () => { render(true); c.querySelector('#epEdit').classList.add('active'); c.querySelector('#epReset').classList.remove('active'); };
      c.querySelector('#epReset').onclick = () => { render(false); c.querySelector('#epReset').classList.add('active'); c.querySelector('#epEdit').classList.remove('active'); };
    },

    recolorTool(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">「设置透明色」去白底，「重新着色」换主题</div>
        <div class="demo-row">
          <button class="demo-btn" id="rcTrans">透明色</button>
          <button class="demo-btn" id="rcRecolor">重新着色</button>
          <button class="demo-btn active" id="rcReset">复位</button>
        </div>
        <div class="mini-slide" id="rcSlide"></div>
      </div>`;
      const slide = c.querySelector('#rcSlide');
      function render(state) {
        if (state === 'trans') slide.innerHTML = '<div style="position:absolute;left:38%;top:30%;width:24%;height:34%;background:#663af3;border-radius:50%"></div>';
        else if (state === 'recolor') slide.innerHTML = '<div style="position:absolute;left:30%;top:28%;width:40%;height:40%;background:#663af3;border-radius:8px"></div><div style="position:absolute;left:38%;top:36%;width:24%;height:24%;background:#fff;border-radius:50%"></div>';
        else slide.innerHTML = '<div style="position:absolute;left:30%;top:28%;width:40%;height:40%;background:#fff;border-radius:8px"></div><div style="position:absolute;left:38%;top:36%;width:24%;height:24%;background:#e46d4c;border-radius:50%"></div>';
      }
      render('reset');
      function rcActive(id) { ['rcTrans','rcRecolor','rcReset'].forEach(i => c.querySelector('#'+i).classList.toggle('active', i === id)); }
      c.querySelector('#rcTrans').onclick = () => { render('trans'); rcActive('rcTrans'); };
      c.querySelector('#rcRecolor').onclick = () => { render('recolor'); rcActive('rcRecolor'); };
      c.querySelector('#rcReset').onclick = () => { render('reset'); rcActive('rcReset'); };
    },

    formatPainter(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「格式刷」把同款格式刷给其余对象</div>
        <div class="demo-row">
          <button class="demo-btn active" id="fpSrc">源(已调好)</button>
          <button class="demo-btn" id="fpBrush">格式刷</button>
        </div>
        <div class="mini-slide" id="fpSlide"></div>
      </div>`;
      const slide = c.querySelector('#fpSlide');
      function render(painted) {
        slide.innerHTML = '';
        [24, 46, 68].forEach((x, i) => {
          const d = document.createElement('div');
          d.style.cssText = 'position:absolute;left:' + x + '%;top:38%;width:18%;height:16%;background:' + (painted || i === 0 ? '#663af3' : 'rgba(255,255,255,.25)') + ';border-radius:4px;opacity:.9';
          slide.appendChild(d);
        });
        const note = document.createElement('div');
        note.style.cssText = 'position:absolute;bottom:8%;left:8%;font:11px var(--font-mono);color:' + (painted ? '#9fe3c5' : 'rgba(216,236,248,.5)');
        note.textContent = painted ? '全同款 · 一键统一' : '源已调好，待刷';
        slide.appendChild(note);
      }
      render(false);
      c.querySelector('#fpBrush').onclick = () => { render(true); c.querySelector('#fpBrush').classList.add('active'); };
    },

    layoutDemo(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「用版式」让全篇标题一次归位</div>
        <div class="demo-row">
          <button class="demo-btn" id="lyUse">用版式</button>
          <button class="demo-btn active" id="lyManual">逐页摆</button>
        </div>
        <div class="demo-row" id="lySlides" style="gap:10px"></div>
      </div>`;
      const wrap = c.querySelector('#lySlides');
      function render(used) {
        wrap.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
          const s = document.createElement('div'); s.className = 'mini-slide';
          s.innerHTML = '<div style="position:absolute;top:14%;left:10%;width:' + (used ? '42%' : '30%') + '%;height:9%;background:' + (used ? '#663af3' : 'rgba(255,255,255,.3)') + ';border-radius:4px;opacity:' + (used ? '.85' : '1') + '"></div>' +
            '<div style="position:absolute;top:32%;left:10%;width:70%;height:5%;background:rgba(255,255,255,.18);border-radius:3px"></div>' +
            '<div style="position:absolute;bottom:8%;right:8%;font:11px var(--font-mono);color:rgba(255,255,255,.4)">第' + i + '页</div>';
          wrap.appendChild(s);
        }
      }
      render(false);
      c.querySelector('#lyUse').onclick = () => { render(true); c.querySelector('#lyUse').classList.add('active'); c.querySelector('#lyManual').classList.remove('active'); };
      c.querySelector('#lyManual').onclick = () => { render(false); c.querySelector('#lyManual').classList.add('active'); c.querySelector('#lyUse').classList.remove('active'); };
    },

    customShow(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">选受众，勾出要讲的子集</div>
        <div class="demo-row">
          <button class="demo-btn" id="csBoss">给老板</button>
          <button class="demo-btn" id="csTech">给技术</button>
        </div>
        <div class="mini-slide" id="csSlide"></div>
      </div>`;
      const slide = c.querySelector('#csSlide');
      function render(who) {
        const pick = who === 'boss' ? [0, 2] : [0, 1, 2];
        slide.innerHTML = '';
        [12, 40, 68].forEach((x, i) => {
          const on = pick.indexOf(i) >= 0;
          const d = document.createElement('div');
          d.style.cssText = 'position:absolute;left:' + x + '%;top:26%;width:22%;height:48%;background:' + (on ? '#663af3' : 'rgba(255,255,255,.18)') + ';border-radius:6px;opacity:' + (on ? '.8' : '1');
          slide.appendChild(d);
        });
        const note = document.createElement('div');
        note.style.cssText = 'position:absolute;bottom:8%;left:8%;font:11px var(--font-mono);color:' + (who ? '#9fe3c5' : 'rgba(216,236,248,.5)');
        note.textContent = who === 'boss' ? '精简：挑 2 页' : who === 'tech' ? '完整：挑 3 页' : '待选受众';
        slide.appendChild(note);
      }
      render(null);
      c.querySelector('#csBoss').onclick = () => { render('boss'); c.querySelector('#csBoss').classList.add('active'); c.querySelector('#csTech').classList.remove('active'); };
      c.querySelector('#csTech').onclick = () => { render('tech'); c.querySelector('#csTech').classList.add('active'); c.querySelector('#csBoss').classList.remove('active'); };
    },

    narrateDemo(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「录制旁白」看进度条走动并自动存时长</div>
        <div class="demo-row">
          <button class="demo-btn" id="nrRec">录制旁白</button>
          <button class="demo-btn active" id="nrStop">停止</button>
        </div>
        <div class="mini-slide" id="nrSlide"></div>
      </div>`;
      const slide = c.querySelector('#nrSlide');
      slide.innerHTML = '<div style="position:absolute;left:30%;top:40%;width:40%;height:6%;background:rgba(255,255,255,.18);border-radius:3px"><div id="nrBar" style="width:0%;height:100%;background:#9fe3c5;border-radius:3px"></div></div><div id="nrTxt" style="position:absolute;bottom:30%;left:0;width:100%;text-align:center;font:11px var(--font-mono);color:rgba(216,236,248,.6)">未录制</div>';
      const bar = slide.querySelector('#nrBar');
      const txt = slide.querySelector('#nrTxt');
      let t = null, p = 0;
      function stop() { if (t) { clearInterval(t); t = null; } }
      c.querySelector('#nrRec').onclick = () => {
        stop(); p = 0; bar.style.width = '0%';
        c.querySelector('#nrRec').classList.add('active'); c.querySelector('#nrStop').classList.remove('active');
        t = reg(setInterval(() => { p += 4; if (p >= 100) p = 100; bar.style.width = p + '%'; txt.textContent = '录制中 ' + Math.round(p / 100 * 30) + 's / 30s'; if (p >= 100) { txt.textContent = '已存旁白 · 自播放就绪'; stop(); } }, 120));
      };
      c.querySelector('#nrStop').onclick = () => { stop(); txt.textContent = '已停止'; c.querySelector('#nrStop').classList.add('active'); c.querySelector('#nrRec').classList.remove('active'); };
    },

    tableBeauty(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「美化」去掉灰底、加斑马纹和强调行</div>
        <div class="demo-row">
          <button class="demo-btn" id="tbBeauty">美化</button>
          <button class="demo-btn active" id="tbReset">复位</button>
        </div>
        <div class="mini-slide" id="tbSlide"></div>
      </div>`;
      const slide = c.querySelector('#tbSlide');
      function render(beauty) {
        if (beauty) {
          slide.innerHTML = '<div style="position:absolute;left:14%;top:22%;width:72%;height:54%;background:rgba(255,255,255,.05);border-radius:6px;overflow:hidden"><div style="position:absolute;left:0;top:0;width:100%;height:25%;background:#663af3;opacity:.85"></div><div style="position:absolute;left:0;top:50%;width:100%;height:25%;background:rgba(159,227,197,.18)"></div></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:14%;top:22%;width:72%;height:54%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.25)"><div style="position:absolute;left:0;top:25%;width:100%;height:1px;background:rgba(255,255,255,.25)"></div><div style="position:absolute;left:0;top:50%;width:100%;height:1px;background:rgba(255,255,255,.25)"></div><div style="position:absolute;left:0;top:75%;width:100%;height:1px;background:rgba(255,255,255,.25)"></div></div>';
        }
      }
      render(false);
      c.querySelector('#tbBeauty').onclick = () => { render(true); c.querySelector('#tbBeauty').classList.add('active'); c.querySelector('#tbReset').classList.remove('active'); };
      c.querySelector('#tbReset').onclick = () => { render(false); c.querySelector('#tbReset').classList.add('active'); c.querySelector('#tbBeauty').classList.remove('active'); };
    },

    compressPic(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「压缩图片」删裁剪区，文件骤减</div>
        <div class="demo-row">
          <button class="demo-btn" id="cpCompress">压缩图片</button>
          <button class="demo-btn active" id="cpReset">复位</button>
        </div>
        <div class="mini-slide" id="cpSlide"></div>
      </div>`;
      const slide = c.querySelector('#cpSlide');
      function render(done) {
        slide.innerHTML = done
          ? '<div style="position:absolute;left:16%;top:26%;width:26%;height:32%;background:#663af3;border-radius:6px;opacity:.8"></div><div style="position:absolute;left:48%;top:26%;width:26%;height:32%;background:#663af3;border-radius:6px;opacity:.8"></div><div style="position:absolute;left:8%;top:80%;font:11px var(--font-mono);color:#9fe3c5">12MB · 轻快</div>'
          : '<div style="position:absolute;left:16%;top:26%;width:26%;height:32%;background:rgba(255,255,255,.2);border-radius:6px"></div><div style="position:absolute;left:48%;top:26%;width:26%;height:32%;background:rgba(255,255,255,.2);border-radius:6px"></div><div style="position:absolute;left:8%;top:80%;font:11px var(--font-mono);color:rgba(216,236,248,.5)">50MB · 卡</div>';
      }
      render(false);
      c.querySelector('#cpCompress').onclick = () => { render(true); c.querySelector('#cpCompress').classList.add('active'); c.querySelector('#cpReset').classList.remove('active'); };
      c.querySelector('#cpReset').onclick = () => { render(false); c.querySelector('#cpReset').classList.add('active'); c.querySelector('#cpCompress').classList.remove('active'); };
    },
    outlineView(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">切到大纲视图，层级清晰、拖拽即排序</div>
        <div class="demo-row">
          <button class="demo-btn" id="ovOutline">大纲视图</button>
          <button class="demo-btn active" id="ovReset">画布散写</button>
        </div>
        <div class="mini-slide" id="ovSlide"></div>
      </div>`;
      const slide = c.querySelector('#ovSlide');
      function render(outline) {
        if (outline) {
          slide.innerHTML = '<div style="position:absolute;left:6%;top:10%;width:34%;height:80%;background:rgba(255,255,255,.07)"></div><div style="position:absolute;left:9%;top:16%;width:28%;height:6%;background:#9fe3c5;border-radius:3px;opacity:.8"></div><div style="position:absolute;left:11%;top:28%;width:24%;height:4%;background:rgba(255,255,255,.25);border-radius:3px"></div><div style="position:absolute;left:11%;top:38%;width:24%;height:4%;background:rgba(255,255,255,.25);border-radius:3px"></div><div style="position:absolute;left:9%;top:54%;width:28%;height:6%;background:#9fe3c5;border-radius:3px;opacity:.8"></div><div style="position:absolute;left:52%;top:18%;width:40%;height:46%;background:rgba(255,255,255,.14);border-radius:6px"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:10%;top:18%;width:80%;height:8%;background:rgba(255,255,255,.16);border-radius:4px"></div><div style="position:absolute;left:10%;top:32%;width:80%;height:5%;background:rgba(255,255,255,.1);border-radius:4px"></div><div style="position:absolute;left:10%;top:42%;width:80%;height:5%;background:rgba(255,255,255,.1);border-radius:4px"></div><div style="position:absolute;left:10%;top:52%;width:62%;height:5%;background:rgba(255,255,255,.1);border-radius:4px"></div>';
        }
      }
      render(false);
      c.querySelector('#ovOutline').onclick = () => { render(true); c.querySelector('#ovOutline').classList.add('active'); c.querySelector('#ovReset').classList.remove('active'); };
      c.querySelector('#ovReset').onclick = () => { render(false); c.querySelector('#ovReset').classList.add('active'); c.querySelector('#ovOutline').classList.remove('active'); };
    },
    wordToPpt(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">Word 标题样式 → 一键生成骨架页</div>
        <div class="demo-row">
          <button class="demo-btn" id="wpGen">生成骨架</button>
          <button class="demo-btn active" id="wpReset">原 Word</button>
        </div>
        <div class="mini-slide" id="wpSlide"></div>
      </div>`;
      const slide = c.querySelector('#wpSlide');
      function render(gen) {
        if (gen) {
          slide.innerHTML = '<div style="position:absolute;left:12%;top:16%;width:34%;height:30%;background:rgba(255,255,255,.14);border-radius:6px"></div><div style="position:absolute;left:15%;top:19%;width:28%;height:5%;background:#9fe3c5;border-radius:3px;opacity:.8"></div><div style="position:absolute;left:54%;top:16%;width:34%;height:30%;background:rgba(255,255,255,.14);border-radius:6px"></div><div style="position:absolute;left:57%;top:19%;width:28%;height:5%;background:#9fe3c5;border-radius:3px;opacity:.8"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:10%;top:16%;width:80%;height:9%;background:rgba(255,255,255,.16);border-radius:4px"></div><div style="position:absolute;left:10%;top:30%;width:80%;height:5%;background:rgba(255,255,255,.1);border-radius:4px"></div><div style="position:absolute;left:10%;top:40%;width:80%;height:5%;background:rgba(255,255,255,.1);border-radius:4px"></div><div style="position:absolute;left:10%;top:50%;width:80%;height:5%;background:rgba(255,255,255,.1);border-radius:4px"></div>';
        }
      }
      render(false);
      c.querySelector('#wpGen').onclick = () => { render(true); c.querySelector('#wpGen').classList.add('active'); c.querySelector('#wpReset').classList.remove('active'); };
      c.querySelector('#wpReset').onclick = () => { render(false); c.querySelector('#wpReset').classList.add('active'); c.querySelector('#wpGen').classList.remove('active'); };
    },
    liveCaption(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">开字幕，口播即时浮现（可翻英文）</div>
        <div class="demo-row">
          <button class="demo-btn" id="lcOn">开字幕</button>
          <button class="demo-btn active" id="lcOff">关字幕</button>
        </div>
        <div class="mini-slide" id="lcSlide"></div>
      </div>`;
      const slide = c.querySelector('#lcSlide');
      function render(on) {
        if (on) {
          slide.innerHTML = '<div style="position:absolute;left:12%;top:14%;width:76%;height:42%;background:rgba(255,255,255,.14);border-radius:6px"></div><div style="position:absolute;left:12%;top:62%;width:76%;height:13%;background:rgba(0,0,0,.55);border-radius:4px"></div><div style="position:absolute;left:16%;top:65%;width:68%;height:7%;background:rgba(255,255,255,.85);border-radius:3px"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:12%;top:14%;width:76%;height:42%;background:rgba(255,255,255,.14);border-radius:6px"></div>';
        }
      }
      render(false);
      c.querySelector('#lcOn').onclick = () => { render(true); c.querySelector('#lcOn').classList.add('active'); c.querySelector('#lcOff').classList.remove('active'); };
      c.querySelector('#lcOff').onclick = () => { render(false); c.querySelector('#lcOff').classList.add('active'); c.querySelector('#lcOn').classList.remove('active'); };
    },
    cropShape(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">裁剪为形状：方图 → 圆形头像</div>
        <div class="demo-row">
          <button class="demo-btn" id="csShape">裁成圆形</button>
          <button class="demo-btn active" id="csReset">原方图</button>
        </div>
        <div class="mini-slide" id="csSlide"></div>
      </div>`;
      const slide = c.querySelector('#csSlide');
      function render(shaped) {
        if (shaped) {
          slide.innerHTML = '<div style="position:absolute;left:30%;top:26%;width:40%;height:40%;border-radius:50%;background:#9fe3c5;opacity:.85"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:30%;top:26%;width:40%;height:40%;background:rgba(255,255,255,.16);border-radius:6px"></div>';
        }
      }
      render(false);
      c.querySelector('#csShape').onclick = () => { render(true); c.querySelector('#csShape').classList.add('active'); c.querySelector('#csReset').classList.remove('active'); };
      c.querySelector('#csReset').onclick = () => { render(false); c.querySelector('#csReset').classList.add('active'); c.querySelector('#csShape').classList.remove('active'); };
    },
    hyperlinkNav(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">目录变可点击，点条目即跳页</div>
        <div class="demo-row">
          <button class="demo-btn" id="hlLink">加超链接</button>
          <button class="demo-btn active" id="hlReset">纯文本</button>
        </div>
        <div class="mini-slide" id="hlSlide"></div>
      </div>`;
      const slide = c.querySelector('#hlSlide');
      function render(linked) {
        if (linked) {
          slide.innerHTML = '<div style="position:absolute;left:14%;top:18%;width:72%;height:9%;background:rgba(255,255,255,.14);border-radius:4px"></div><div style="position:absolute;left:18%;top:20%;width:40%;height:5%;background:#9fe3c5;border-radius:3px;opacity:.85"></div><div style="position:absolute;left:14%;top:34%;width:72%;height:9%;background:rgba(255,255,255,.1);border-radius:4px"></div><div style="position:absolute;left:14%;top:50%;width:72%;height:9%;background:rgba(255,255,255,.1);border-radius:4px"></div><div style="position:absolute;left:18%;top:72%;width:60%;height:5%;background:#027dea;border-radius:3px;opacity:.7"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:14%;top:18%;width:72%;height:9%;background:rgba(255,255,255,.14);border-radius:4px"></div><div style="position:absolute;left:18%;top:20%;width:40%;height:5%;background:rgba(255,255,255,.3);border-radius:3px"></div><div style="position:absolute;left:14%;top:34%;width:72%;height:9%;background:rgba(255,255,255,.1);border-radius:4px"></div><div style="position:absolute;left:14%;top:50%;width:72%;height:9%;background:rgba(255,255,255,.1);border-radius:4px"></div>';
        }
      }
      render(false);
      c.querySelector('#hlLink').onclick = () => { render(true); c.querySelector('#hlLink').classList.add('active'); c.querySelector('#hlReset').classList.remove('active'); };
      c.querySelector('#hlReset').onclick = () => { render(false); c.querySelector('#hlReset').classList.add('active'); c.querySelector('#hlLink').classList.remove('active'); };
    },
    inkAnnotate(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">放映中随手圈画 + 激光笔引视线</div>
        <div class="demo-row">
          <button class="demo-btn" id="inkOn">圈画+激光笔</button>
          <button class="demo-btn active" id="inkOff">纯净放映</button>
        </div>
        <div class="mini-slide" id="inkSlide"></div>
      </div>`;
      const slide = c.querySelector('#inkSlide');
      function render(on) {
        if (on) {
          slide.innerHTML = '<div style="position:absolute;left:20%;top:22%;width:44%;height:30%;background:rgba(255,255,255,.14);border-radius:6px"></div><svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><ellipse cx="42" cy="52" rx="22" ry="14" fill="none" stroke="#e4483c" stroke-width="2.5"/></svg><div style="position:absolute;left:72%;top:28%;width:8px;height:8px;border-radius:50%;background:#e4483c"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:20%;top:22%;width:44%;height:30%;background:rgba(255,255,255,.14);border-radius:6px"></div>';
        }
      }
      render(false);
      c.querySelector('#inkOn').onclick = () => { render(true); c.querySelector('#inkOn').classList.add('active'); c.querySelector('#inkOff').classList.remove('active'); };
      c.querySelector('#inkOff').onclick = () => { render(false); c.querySelector('#inkOff').classList.add('active'); c.querySelector('#inkOn').classList.remove('active'); };
    },
    motionPath(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">沿自定义曲线轨迹移动</div>
        <div class="demo-row">
          <button class="demo-btn" id="mpPath">路径动画</button>
          <button class="demo-btn active" id="mpReset">直跳</button>
        </div>
        <div class="mini-slide" id="mpSlide"></div>
      </div>`;
      const slide = c.querySelector('#mpSlide');
      function render(path) {
        if (path) {
          slide.innerHTML = '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><path d="M12,78 C40,30 60,70 88,22" fill="none" stroke="#663af3" stroke-width="2" stroke-dasharray="4 3"/></svg><div style="position:absolute;left:10%;top:72%;width:9%;height:9%;background:#9fe3c5;border-radius:4px;opacity:.95"></div><div style="position:absolute;left:84%;top:16%;width:9%;height:9%;background:#027dea;border-radius:4px;opacity:.95"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:12%;top:72%;width:9%;height:9%;background:#9fe3c5;border-radius:4px;opacity:.95"></div><div style="position:absolute;left:84%;top:16%;width:9%;height:9%;background:#027dea;border-radius:4px;opacity:.95"></div>';
        }
      }
      render(false);
      c.querySelector('#mpPath').onclick = () => { render(true); c.querySelector('#mpPath').classList.add('active'); c.querySelector('#mpReset').classList.remove('active'); };
      c.querySelector('#mpReset').onclick = () => { render(false); c.querySelector('#mpReset').classList.add('active'); c.querySelector('#mpPath').classList.remove('active'); };
    },
    qatBar(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">把常用命令钉到顶栏，一键点</div>
        <div class="demo-row">
          <button class="demo-btn" id="qatPin">钉到顶栏</button>
          <button class="demo-btn active" id="qatReset">翻功能区</button>
        </div>
        <div class="mini-slide" id="qatSlide"></div>
      </div>`;
      const slide = c.querySelector('#qatSlide');
      function render(pinned) {
        if (pinned) {
          slide.innerHTML = '<div style="position:absolute;left:8%;top:22%;width:84%;height:11%;background:rgba(255,255,255,.1);border-radius:4px"></div><div style="position:absolute;left:10%;top:25%;width:9%;height:6%;background:#663af3;border-radius:3px;opacity:.9"></div><div style="position:absolute;left:22%;top:25%;width:9%;height:6%;background:#663af3;border-radius:3px;opacity:.9"></div><div style="position:absolute;left:34%;top:25%;width:9%;height:6%;background:#663af3;border-radius:3px;opacity:.9"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:8%;top:22%;width:84%;height:11%;background:rgba(255,255,255,.1);border-radius:4px"></div>';
        }
      }
      render(false);
      c.querySelector('#qatPin').onclick = () => { render(true); c.querySelector('#qatPin').classList.add('active'); c.querySelector('#qatReset').classList.remove('active'); };
      c.querySelector('#qatReset').onclick = () => { render(false); c.querySelector('#qatReset').classList.add('active'); c.querySelector('#qatPin').classList.remove('active'); };
    }
  };

  window.DEMOS = DEMOS;
})();
