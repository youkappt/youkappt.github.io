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
          <button class="demo-btn" data-c="#2f6f3a">紫罗兰</button>
          <button class="demo-btn" data-c="#2f6f3a">信号蓝</button>
          <button class="demo-btn" data-c="#2f6f3a">深青</button>
          <button class="demo-btn" data-c="#cb5521">暖橙</button>
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
            + `<div style="position:absolute;top:40%;left:8%;width:70%;height:6%;background:rgba(213,245,194,0.55);border-radius:3px"></div>`
            + `<div style="position:absolute;top:54%;left:8%;width:55%;height:6%;background:rgba(213,245,194,0.48);border-radius:3px"></div>`
            + `<div style="position:absolute;bottom:8%;right:8%;font:11px var(--font-mono);color:rgba(255,255,255,.4">第 ${i} 页</div>`;
          wrap.appendChild(s);
        }
      }
      render('#2f6f3a');
      c.querySelectorAll('[data-c]').forEach(b => b.onclick = () => render(b.dataset.c));
    },

    /* 2. 参考线对齐：吸附到同一条线 */
    alignSnap(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「对齐」让三个按钮顶端吸附到参考线</div>
        <div class="demo-row">
          <button class="demo-btn" data-a="align" id="asAlign">对齐</button>
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
        guide.style.cssText = `position:absolute;left:6%;top:${GUIDE_T}%;width:88%;height:0;border-top:1px dashed ${aligned ? 'rgba(47,111,58,.95' : 'rgba(26,51,0,.45'}`;
        slide.appendChild(guide);
        if (aligned) {
          const glow = document.createElement('div');
          glow.style.cssText = `position:absolute;left:6%;top:${GUIDE_T - 1}%;width:88%;height:2px;background:rgba(47,111,58,.35;filter:blur(1px)`;
          slide.appendChild(glow);
        }
        for (let i = 0; i < 3; i++) {
          const t = aligned ? GUIDE_T : messyT[i];
          const b = document.createElement('div');
          b.style.cssText = `position:absolute;left:${LEFT[i]}%;top:${t}%;width:22%;height:14%;background:#2f6f3a;border-radius:6px;opacity:.9;box-shadow:${aligned ? '0 0 0 2px rgba(47,111,58,.5' : 'none'};transition:all .35s ease`;
          slide.appendChild(b);
        }
      }
      render(true);
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
          <button class="demo-btn" data-a="add" id="saAdd">添加节点</button>
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
          box.style.cssText = `position:absolute;left:${cols[i]}%;top:34%;width:22%;height:16%;background:#2f6f3a;border-radius:6px;opacity:.9;display:grid;place-items:center;color:#ffffff;font:13px var(--font-body);transition:all .3s ease`;
          box.textContent = labels[i];
          slide.appendChild(box);
          if (i > 0) {
            const start = cols[i - 1] + 22;
            const gap = cols[i] - start;
            const line = document.createElement('div');
            line.style.cssText = `position:absolute;left:${start}%;top:41%;width:${gap}%;height:2px;background:rgba(26,51,0,.6`;
            slide.appendChild(line);
            const arrow = document.createElement('div');
            arrow.style.cssText = `position:absolute;left:${cols[i] - 2.4}%;top:40%;color:rgba(26,51,0,.75;font:10px/1 sans-serif`;
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
      const cats = [['背景', '#2f6f3a'], ['方案', '#2f6f3a'], ['总结', '#2f6f3a']];
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点目录缩略图，跳转到对应章节</div>
        <div class="demo-row" id="znCats" style="gap:10px"></div>
        <div class="mini-slide" id="znPage"><div style="color:rgba(26,51,0,.4;font:13px var(--font-body)">← 点上面的章节缩略图跳转</div></div>
      </div>`;
      const row = c.querySelector('#znCats');
      const page = c.querySelector('#znPage');
      cats.forEach(([name, col]) => {
        const t = document.createElement('div');
        t.style.cssText = `width:30%;aspect-ratio:16/9;background:${col};border-radius:6px;opacity:.85;cursor:pointer;display:grid;place-items:center;color:#ffffff;font:12px var(--font-body);transition:transform .2s`;
        t.textContent = name;
        t.onclick = () => {
          page.innerHTML = `<div style="position:absolute;top:20%;left:8%;width:60%;height:12%;background:${col};border-radius:4px"></div>`
            + `<div style="position:absolute;top:44%;left:8%;width:80%;height:5%;background:rgba(213,245,194,0.55);border-radius:3px"></div>`
            + `<div style="position:absolute;top:56%;left:8%;width:60%;height:5%;background:rgba(213,245,194,0.48);border-radius:3px"></div>`
            + `<div style="position:absolute;bottom:8%;right:8%;font:11px var(--font-mono);color:rgba(255,255,255,.5">${name} 章</div>`;
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
          <button class="demo-btn" data-a="play" id="rsPlay">▶ 播放</button>
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
          p.style.cssText = `position:absolute;left:10%;top:${20 + i * 16}%;width:80%;height:12%;background:rgba(213,245,194,.16;border:1px solid rgba(47,111,58,.5;border-radius:6px;display:flex;align-items:center;padding-left:12px;color:#1a3300;font:13px var(--font-body)`;
          p.textContent = '· ' + items[i];
          slide.appendChild(p);
        }
      }
      render(0);
      c.querySelector('#rsPlay').onclick = () => { c.querySelector('#rsPlay').classList.add('active'); c.querySelector('#rsReset').classList.remove('active'); let n = 0; render(0); timer = reg(setInterval(() => { n++; render(n); if (n >= items.length) clearInterval(timer); }, 500)); };
      c.querySelector('#rsReset').onclick = () => { if (timer) clearInterval(timer); c.querySelector('#rsReset').classList.add('active'); c.querySelector('#rsPlay').classList.remove('active'); render(0); };
    },

    /* 6. 节：折叠 / 展开 */
    sectionNav(c) {
      const secs = [['背景', '#2f6f3a', 3], ['方案', '#2f6f3a', 2], ['总结', '#2f6f3a', 1]];
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
        for (let i = 0; i < cnt; i++) { const p = document.createElement('div'); p.style.cssText = 'width:40px;height:26px;background:rgba(213,245,194,0.45);border-radius:4px'; body.appendChild(p); }
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
          <button class="demo-btn" data-op="sub" id="bbSub">减去</button>
          <button class="demo-btn" data-op="inter" id="bbInter">相交</button>
          <button class="demo-btn" data-op="union" id="bbUnion">联合</button>
        </div>
        <div class="mini-slide" id="bbSlide"></div>
      </div>`;
      const slide = c.querySelector('#bbSlide');
      function render(op) {
        if (op === 'sub') slide.innerHTML = `<div style="position:absolute;left:34%;top:34%;width:32%;height:32%;border:14px solid #2f6f3a;border-radius:50%;box-sizing:border-box;opacity:.9"></div>`;
        else if (op === 'inter') slide.innerHTML = `<div style="position:absolute;left:40%;top:40%;width:20%;height:20%;background:#2f6f3a;border-radius:6px;opacity:.9"></div>`;
        else slide.innerHTML = `<div style="position:absolute;left:32%;top:32%;width:36%;height:36%;background:#2f6f3a;border-radius:8px;opacity:.85"></div>`;
      }
      render('sub');
      c.querySelectorAll('[data-op]').forEach(b => b.onclick = () => render(b.dataset.op));
    },

    /* 8. 取色器：从 Logo 吸色 */
    eyedrop(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「吸色」从 Logo 取色填文字</div>
        <div class="demo-row">
          <div style="width:34px;height:34px;border-radius:8px;background:#cb5521;display:grid;place-items:center;color:#ffffff;font:600 12px var(--font-body)">Logo</div>
          <button class="demo-btn" data-a="pick" id="edPick">吸色器取色</button>
        </div>
        <div class="mini-slide" id="edSlide"><div id="edText" style="color:#1a3300;font:600 18px var(--font-body)">优卡说PPT</div></div>
      </div>`;
      const text = c.querySelector('#edText');
      c.querySelector('#edPick').onclick = () => { text.style.transition = 'color .4s'; text.style.color = '#cb5521'; };
    },

    /* 9. 母版批量：开关母版元素 */
    masterBatch(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">开关母版元素，所有页同步显示 / 隐藏</div>
        <div class="demo-row">
          <button class="demo-btn" data-a="on" id="mbOn">母版开启</button>
          <button class="demo-btn" data-a="off" id="mbOff">母版关闭</button>
        </div>
        <div class="demo-row" id="mbSlides" style="gap:10px"></div>
      </div>`;
      const wrap = c.querySelector('#mbSlides');
      function render(on) {
        wrap.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
          const s = document.createElement('div'); s.className = 'mini-slide';
          s.innerHTML = `<div style="position:absolute;left:6%;top:7%;width:12%;height:9%;background:${on ? '#2f6f3a' : 'rgba(255,255,255,.12'};border-radius:4px;opacity:${on ? '.9' : '.5'}"></div>`
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
        () => `<div style="position:absolute;left:10%;top:30%;width:60%;height:2px;background:rgba(26,51,0,.25"></div>`,
        () => `<div style="position:absolute;left:10%;top:30%;width:60%;height:2px;background:rgba(26,51,0,.4"></div><div style="position:absolute;left:10%;top:14%;width:70%;height:14%;background:rgba(26,51,0,.92;border-radius:4px"></div>`,
        () => `<div style="position:absolute;left:10%;top:14%;width:70%;height:14%;background:rgba(26,51,0,.92;border-radius:4px"></div><div style="position:absolute;left:10%;top:34%;width:50%;height:6%;background:rgba(26,51,0,.6;border-radius:3px"></div><div style="position:absolute;left:10%;top:48%;width:18%;height:12%;background:#2f6f3a;border-radius:6px;opacity:.9"></div><div style="position:absolute;left:10%;top:30%;width:60%;height:2px;background:rgba(26,51,0,.4"></div>`
      ];
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「播放」看封面三步成型</div>
        <div class="demo-row">
          <button class="demo-btn" data-a="play" id="cbPlay">▶ 播放</button>
          <button class="demo-btn" data-a="reset" id="cbReset">⟲ 复位</button>
        </div>
        <div class="mini-slide" id="cbSlide"></div>
      </div>`;
      const slide = c.querySelector('#cbSlide');
      let timer = null, n = 0;
      function render(k) { slide.innerHTML = k === 0 ? '' : steps[k - 1](); }
      render(0);
      c.querySelector('#cbPlay').onclick = () => { c.querySelector('#cbPlay').classList.add('active'); c.querySelector('#cbReset').classList.remove('active'); n = 0; render(0); timer = reg(setInterval(() => { n++; render(n); if (n >= 3) clearInterval(timer); }, 600)); };
      c.querySelector('#cbReset').onclick = () => { if (timer) clearInterval(timer); n = 0; c.querySelector('#cbReset').classList.add('active'); c.querySelector('#cbPlay').classList.remove('active'); render(0); };
    },

    /* 11. 合并形状去背：方形 → 圆形 滑杆 */
    removeBg(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">拖动滑杆：方形硬边 → 圆形裁切</div>
        <div class="ba-slider" id="rbSlider">
          <div class="ba-img before">${slide('<div style="position:absolute;left:30%;top:26%;width:40%;height:40%;background:linear-gradient(135deg,#cb5521,#cb5521);opacity:.85"></div><div style="position:absolute;left:30%;top:26%;width:40%;height:40%;border:1px solid rgba(47,111,58,.3)"></div>')}</div>
          <div class="ba-img after">${slide('<div style="position:absolute;left:33%;top:29%;width:34%;height:34%;border-radius:50%;background:linear-gradient(135deg,#2f6f3a,#2f6f3a);opacity:.92"></div>')}</div>
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
          <button class="demo-btn" data-a="icon" id="icIcon">图标化</button>
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
        slide.innerHTML = '<div style="position:absolute;left:8%;top:14%;width:52%;height:5%;background:rgba(213,245,194,0.55);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:22%;width:84%;height:3%;background:rgba(213,245,194,0.47);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:27%;width:84%;height:3%;background:rgba(213,245,194,0.47);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:32%;width:62%;height:3%;background:rgba(213,245,194,0.47);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:44%;width:52%;height:5%;background:rgba(213,245,194,0.55);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:52%;width:84%;height:3%;background:rgba(213,245,194,0.47);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:57%;width:84%;height:3%;background:rgba(213,245,194,0.47);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:62%;width:62%;height:3%;background:rgba(213,245,194,0.47);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:74%;width:52%;height:5%;background:rgba(213,245,194,0.55);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:82%;width:84%;height:3%;background:rgba(213,245,194,0.47);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:87%;width:84%;height:3%;background:rgba(213,245,194,0.47);border-radius:3px"></div>'
          + '<div style="position:absolute;left:8%;top:92%;width:62%;height:3%;background:rgba(213,245,194,0.47);border-radius:3px"></div>';
      }
      function icon() {
        const cards = [
          { c: '#2f6f3a', n: 'target', t: '目标市场', d: '锁定核心用户' },
          { c: '#2f6f3a', n: 'chart', t: '数据增长', d: '月度 +38%' },
          { c: '#2f6f3a', n: 'rocket', t: '正式发布', d: 'Q3 上线' }
        ];
        let h = '';
        cards.forEach((k, i) => {
          const left = 8 + i * 30;
          h += '<div style="position:absolute;left:' + left + '%;top:16%;width:24%;height:52%;background:' + k.c + '22;border:1px solid ' + k.c + ';border-radius:8px"></div>';
          h += '<div style="position:absolute;left:' + (left + 7) + '%;top:22%;width:46px;height:46px">' + svgIcon(k.n, k.c) + '</div>';
          h += '<div style="position:absolute;left:' + left + '%;top:47%;width:24%;text-align:center;font:600 12px var(--font-body);color:#ffffff">' + k.t + '</div>';
          h += '<div style="position:absolute;left:' + left + '%;top:60%;width:24%;text-align:center;font:10px var(--font-body);color:rgba(26,51,0,.6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + k.d + '</div>';
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
          <button class="demo-btn" data-a="on" id="efOn">嵌入开启</button>
          <button class="demo-btn" data-a="off" id="efOff">嵌入关闭</button>
        </div>
        <div class="mini-slide" id="efSlide"></div>
      </div>`;
      const slide = c.querySelector('#efSlide');
      function render(on) {
        slide.innerHTML = on
          ? '<div style="position:absolute;top:18%;left:8%;width:30%;height:9%;background:#2f6f3a;border-radius:4px;opacity:.9"></div>'
            + '<div style="position:absolute;top:42%;left:8%;font:600 20px var(--font-body);color:#1a3300">优卡说PPT</div>'
            + '<div style="position:absolute;bottom:10%;left:8%;font:12px var(--font-mono);color:#1a3300">✓ 原样显示</div>'
          : '<div style="position:absolute;top:18%;left:8%;width:30%;height:9%;background:#cb5521;border-radius:4px;opacity:.85"></div>'
            + '<div style="position:absolute;top:42%;left:8%;font:600 20px var(--font-serif);color:#1a3300">优卡说PPT</div>'
            + '<div style="position:absolute;bottom:10%;left:8%;font:12px var(--font-mono);color:#1a3300">⚠ 变宋体</div>';
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
        if (state.snap) h += '<div style="position:absolute;left:8%;top:50%;width:84%;height:1px;background:rgba(26,51,0,.5"></div>';
        const cols = state.dup ? [10, 32, 54, 76] : [10, 40, 70];
        const top = state.snap ? 44 : 34;
        for (let i = 0; i < cols.length; i++) {
          const col = state.fmt ? '#2f6f3a' : 'rgba(255,255,255,.3';
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
          <button class="demo-btn" data-a="hi" id="ecHi">超大型+压缩</button>
          <button class="demo-btn" data-a="lo" id="ecLo">默认 1280</button>
        </div>
        <div class="mini-slide" id="ecSlide"></div>
      </div>`;
      const slide = c.querySelector('#ecSlide');
      function render(hi) {
        slide.innerHTML = hi
          ? '<div style="position:absolute;left:33%;top:25%;width:34%;height:34%;background:linear-gradient(135deg,#2f6f3a,#2f6f3a);border-radius:4px;opacity:.95"></div>'
            + '<div style="position:absolute;left:8%;top:70%;font:12px var(--font-mono);color:#1a3300">超大型 · 压缩后 12MB</div>'
          : '<div style="position:absolute;left:30%;top:22%;width:40%;height:40%;background:linear-gradient(135deg,#cb5521,#cb5521);border-radius:4px;opacity:.5;filter:blur(2px)"></div>'
            + '<div style="position:absolute;left:8%;top:70%;font:12px var(--font-mono);color:#1a3300">1280 宽 · 86MB</div>';
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
          <button class="demo-btn" data-a="play" id="moPlay">▶ 播放</button>
          <button class="demo-btn" data-a="reset" id="moReset">⟲ 复位</button>
        </div>
        <div class="mini-slide" id="moSlide"><div id="moBox" style="position:absolute;left:10%;top:40%;width:26%;height:20%;background:#2f6f3a;border-radius:8px;opacity:.9;transition:all .8s ease;display:grid;place-items:center;color:#ffffff;font:13px var(--font-body)">标题</div></div>
      </div>`;
      const box = c.querySelector('#moBox');
      c.querySelector('#moPlay').onclick = () => { c.querySelector('#moPlay').classList.add('active'); c.querySelector('#moReset').classList.remove('active'); box.style.left = '55%'; box.style.top = '30%'; box.style.width = '34%'; box.style.height = '26%'; };
      c.querySelector('#moReset').onclick = () => { c.querySelector('#moReset').classList.add('active'); c.querySelector('#moPlay').classList.remove('active'); box.style.left = '10%'; box.style.top = '40%'; box.style.width = '26%'; box.style.height = '20%'; };
    },

    /* 17. 图表美化：默认灰图表 ↔ 高级 */
    chartBeautify(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「美化」把默认灰图表变高级</div>
        <div class="demo-row">
          <button class="demo-btn" data-a="pretty" id="cbPretty">美化</button>
          <button class="demo-btn" data-a="plain" id="cbPlain">默认</button>
        </div>
        <div class="mini-slide" id="cbSlide"></div>
      </div>`;
      const slide = c.querySelector('#cbSlide');
      function render(pretty) {
        const cols = [12, 28, 44, 60];
        const hs = [50, 34, 58, 42];
        let h = pretty ? '' : '<div style="position:absolute;left:12%;top:18%;width:56%;height:1px;background:rgba(213,245,194,0.53)"></div>';
        for (let i = 0; i < 4; i++) {
          const col = pretty ? (i === 2 ? '#2f6f3a' : '#2f6f3a') : 'rgba(255,255,255,.3';
          h += `<div style="position:absolute;left:${cols[i]}%;top:${78 - hs[i]}%;width:8%;height:${hs[i]}%;background:${col};border-radius:3px 3px 0 0;transition:all .35s ease"></div>`;
          if (pretty) h += `<div style="position:absolute;left:${cols[i]}%;top:${74 - hs[i]}%;width:8%;text-align:center;font:10px var(--font-mono);color:rgba(26,51,0,.8">${hs[i]}</div>`;
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
          <div style="position:absolute;top:20%;left:8%;font:600 15px var(--font-body);color:rgba(26,51,0,.85">Q：PPT 全称？</div>
          <div id="trAns" style="position:absolute;top:46%;left:8%;width:84%;height:14%;background:rgba(213,245,194,.16;border:1px solid rgba(47,111,58,.5;border-radius:6px;display:flex;align-items:center;padding-left:12px;color:#1a3300;font:13px var(--font-body);opacity:0;transition:opacity .4s">A：PowerPoint</div>
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
          <button class="demo-btn" id="rfSwap">替换为通用字体</button>
          <button class="demo-btn" id="rfReset">还原</button>
        </div>
        <div class="mini-slide" id="rfSlide"></div>
      </div>`;
      const slide = c.querySelector('#rfSlide');
      function render(swapped) {
        slide.innerHTML = `<div style="position:absolute;top:22%;left:10%;font:600 20px ${swapped ? 'var(--font-body)' : 'var(--font-serif)'};color:${swapped ? '#2f6f3a' : '#1a3300'}">优卡说PPT</div>`
          + `<div style="position:absolute;top:48%;left:10%;width:80%;height:3%;background:rgba(213,245,194,0.53);border-radius:3px"></div>`
          + `<div style="position:absolute;bottom:10%;left:10%;font:12px var(--font-mono);color:${swapped ? '#2f6f3a' : '#1a3300'}">${swapped ? '18 处已替换 · 全篇统一' : '特殊字体 · 对方易变样'}</div>`;
      }
      render(false);
      c.querySelector('#rfSwap').onclick = () => { render(true); c.querySelector('#rfSwap').classList.add('active'); c.querySelector('#rfReset').classList.remove('active'); };
      c.querySelector('#rfReset').onclick = () => { render(false); c.querySelector('#rfReset').classList.add('active'); c.querySelector('#rfSwap').classList.remove('active'); };
    },

    /* 20. 选择窗格：点名选中、眼睛显隐 */
    selectionPane(c) {
      const objs = [['标题文字', true], ['蓝色块', true], ['绿色块', true], ['红底', false]];
      const cols = { '标题文字': 'rgba(255,255,255,.85', '蓝色块': '#2f6f3a', '绿色块': '#2f6f3a', '红底': '#cb5521' };
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
          d.style.cssText = 'position:absolute;' + pos[name] + ';background:' + (isText ? 'rgba(255,255,255,.85' : cols[name]) + ';border-radius:6px;opacity:.9' + (isText ? ';display:flex;align-items:center;padding-left:8px;color:#1a3300;font:600 12px var(--font-body);z-index:2' : ';z-index:' + (name === '红底' ? '0' : '1'));
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
          <button class="demo-btn" id="gdGroup">组合 Ctrl+G</button>
          <button class="demo-btn" id="gdUngroup">取消组合</button>
        </div>
        <div class="mini-slide" id="gdSlide"></div>
      </div>`;
      const slide = c.querySelector('#gdSlide');
      const items = [['#2f6f3a', 10, 30, 18, 14], ['#2f6f3a', 40, 44, 14, 10], ['#2f6f3a', 66, 28, 11, 11]];
      function render(grouped) {
        slide.innerHTML = '';
        if (grouped) {
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          items.forEach(([col, x, y, w, h]) => {
            minX = Math.min(minX, x); maxX = Math.max(maxX, x + w);
            minY = Math.min(minY, y); maxY = Math.max(maxY, y + h);
          });
          const pad = 2;
          slide.innerHTML = '<div style="position:absolute;left:' + (minX - pad) + '%;top:' + (minY - pad) + '%;width:' + (maxX - minX + pad * 2) + '%;height:' + (maxY - minY + pad * 2) + '%;border:2px dashed #2f6f3a;border-radius:10px;opacity:.9"></div>';
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
          <button class="demo-btn" id="rb2On">已去背</button>
          <button class="demo-btn" id="rb2Off">带背景</button>
        </div>
        <div class="mini-slide" id="rb2Slide"></div>
      </div>`;
      const slide = c.querySelector('#rb2Slide');
      function render(bg) {
        slide.innerHTML = (bg ? '<div style="position:absolute;left:24%;top:20%;width:52%;height:52%;background:#b6b6b6;border-radius:6px;opacity:.85"></div>' : '')
          + '<div style="position:absolute;left:38%;top:30%;width:24%;height:34%;background:linear-gradient(135deg,#2f6f3a,#2f6f3a);border-radius:50%;opacity:.95"></div>'
          + '<div style="position:absolute;left:38%;top:30%;width:24%;height:34%;border-radius:50%;border:2px solid rgba(26,51,0,.4"></div>';
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
          <button class="demo-btn" id="pvPre">演讲者视图</button>
          <button class="demo-btn" id="pvAud">观众视图</button>
        </div>
        <div class="mini-slide" id="pvSlide"></div>
      </div>`;
      const slide = c.querySelector('#pvSlide');
      function render(pre) {
        if (pre) {
          slide.innerHTML = '<div style="position:absolute;left:6%;top:8%;width:56%;height:52%;background:#f8f6f0;border:1px solid rgba(26,51,0,.15);border-radius:8px;overflow:hidden">'
            + '<div style="position:absolute;left:0;top:0;right:0;height:18%;background:#2f6f3a;display:flex;align-items:center;padding-left:10px;color:#ffffff;font:600 11px var(--font-body)">📊 季度汇报</div>'
            + '<div style="position:absolute;left:8%;top:24%;width:44%;height:4%;background:rgba(26,51,0,.7);border-radius:2px"></div>'
            + '<div style="position:absolute;left:8%;top:32%;width:38%;height:3%;background:rgba(26,51,0,.35);border-radius:2px"></div>'
            + '<div style="position:absolute;left:8%;top:38%;width:42%;height:3%;background:rgba(26,51,0,.35);border-radius:2px"></div>'
            + '<div style="position:absolute;left:8%;top:44%;width:34%;height:3%;background:rgba(26,51,0,.35);border-radius:2px"></div>'
            + '<div style="position:absolute;right:8%;top:28%;width:16%;height:16%;background:rgba(47,111,58,.2);border:1px solid rgba(47,111,58,.4);border-radius:4px"></div>'
            + '</div>'
            + '<div style="position:absolute;left:6%;top:64%;width:56%;height:24%;background:rgba(47,111,58,.16;border:1px solid rgba(47,111,58,.5;border-radius:6px;padding:6px 8px;color:#1a3300;font:11px var(--font-body)">备注：本页讲核心结论…</div>'
            + '<div style="position:absolute;left:64%;top:8%;width:30%;height:38%;background:rgba(47,111,58,.16;border:1px solid rgba(47,111,58,.5;border-radius:6px"></div>'
            + '<div style="position:absolute;left:64%;top:50%;width:30%;height:14%;background:rgba(213,245,194,0.45);border-radius:4px"></div>'
            + '<div style="position:absolute;left:64%;top:68%;font:10px var(--font-mono);color:rgba(26,51,0,.6">下一页预览</div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:18%;top:24%;width:64%;height:8%;background:rgba(26,51,0,.9;border-radius:4px"></div>'
            + '<div style="position:absolute;left:18%;top:40%;width:64%;height:3%;background:rgba(213,245,194,0.55);border-radius:3px"></div>'
            + '<div style="position:absolute;left:18%;top:48%;width:64%;height:3%;background:rgba(213,245,194,0.48);border-radius:3px"></div>'
            + '<div style="position:absolute;left:18%;top:70%;font:10px var(--font-mono);color:rgba(26,51,0,.4">观众只看到这一页</div>';
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
          <button class="demo-btn" id="ddGen">生成设计方案</button>
          <button class="demo-btn" id="ddClear">清空</button>
        </div>
        <div class="mini-slide" id="ddSlide"></div>
      </div>`;
      const slide = c.querySelector('#ddSlide');
      function render(on) {
        if (!on) {
          slide.innerHTML = '<div style="position:absolute;left:8%;top:18%;width:50%;height:6%;background:rgba(213,245,194,0.55);border-radius:3px"></div>'
            + '<div style="position:absolute;left:8%;top:28%;width:84%;height:3%;background:rgba(213,245,194,0.49);border-radius:3px"></div>'
            + '<div style="position:absolute;left:8%;top:34%;width:84%;height:3%;background:rgba(213,245,194,0.49);border-radius:3px"></div>'
            + '<div style="position:absolute;left:8%;top:74%;font:11px var(--font-mono);color:rgba(26,51,0,.4">← 选中文字后右侧出现灵感</div>';
          return;
        }
        slide.innerHTML = '<div style="position:absolute;left:6%;top:12%;width:28%;height:30%;background:linear-gradient(135deg,#2f6f3a,#2f6f3a);border-radius:6px;opacity:.9"></div>'
          + '<div style="position:absolute;left:38%;top:12%;width:28%;height:30%;background:rgba(47,111,58,.3;border:1px solid rgba(47,111,58,.6;border-radius:6px"></div>'
          + '<div style="position:absolute;left:70%;top:12%;width:24%;height:30%;background:rgba(203,85,33,.3;border:1px solid rgba(203,85,33,.6;border-radius:6px"></div>'
          + '<div style="position:absolute;left:6%;top:48%;width:88%;height:3%;background:rgba(213,245,194,0.49);border-radius:3px"></div>'
          + '<div style="position:absolute;left:6%;top:56%;width:88%;height:3%;background:rgba(213,245,194,0.49);border-radius:3px"></div>'
          + '<div style="position:absolute;left:6%;top:74%;font:11px var(--font-mono);color:#1a3300">3 个 AI 版式 · 点一下套用</div>';
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
          <button class="demo-btn" id="ccAdd">加折线(率)</button>
          <button class="demo-btn" id="ccDel">只看柱</button>
        </div>
        <div class="mini-slide" id="ccSlide"></div>
      </div>`;
      const slide = c.querySelector('#ccSlide');
      function render(withLine) {
        let h = '';
        bars.forEach(([x, h2]) => { h += '<div style="position:absolute;left:' + x + '%;top:' + (78 - h2) + '%;width:8%;height:' + h2 + '%;background:#2f6f3a;border-radius:3px 3px 0 0;transition:all .3s ease"></div>'; });
        if (withLine) {
          const pts = bars.map(([x, h2]) => (x + 4) + ',' + (78 - h2 - 2)).join(' ');
          h += '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><polyline points="' + pts + '" fill="none" stroke="#2f6f3a" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>';
        }
        h += '<div style="position:absolute;bottom:6%;left:8%;font:11px var(--font-mono);color:' + (withLine ? '#2f6f3a' : 'rgba(26,51,0,.5') + '">' + (withLine ? '柱=量 · 线=率' : '仅柱：量') + '</div>';
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
          d.style.cssText = 'position:absolute;left:' + x + '%;top:40%;width:18%;height:14%;background:' + (on ? '#2f6f3a' : 'rgba(255,255,255,.3') + ';border-radius:6px;opacity:.9;' + (on ? 'box-shadow:0 0 0 2px rgba(213,245,194,.6' : '');
          slide.appendChild(d);
        });
        const note = document.createElement('div');
        note.style.cssText = 'position:absolute;bottom:8%;left:8%;font:11px var(--font-mono);color:' + ((painted[0] && painted[1] && painted[2]) ? '#2f6f3a' : 'rgba(26,51,0,.5');
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
          <button class="demo-btn" id="epReset">复位</button>
        </div>
        <div class="mini-slide" id="epSlide"></div>
      </div>`;
      const slide = c.querySelector('#epSlide');
      function render(edited) {
        slide.innerHTML = edited
          ? '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;left:28%;top:24%;width:44%;height:52%"><path d="M20 12 Q 50 0 80 12 Q 96 50 80 88 Q 50 100 20 88 Q 4 50 20 12 Z" fill="rgba(47,111,58,.5" stroke="#2f6f3a" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg>'
          : '<div style="position:absolute;left:32%;top:28%;width:36%;height:44%;background:rgba(213,245,194,0.55);border:1px dashed rgba(47,111,58,.4)"></div>';
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
          <button class="demo-btn" id="rcReset">复位</button>
        </div>
        <div class="mini-slide" id="rcSlide"></div>
      </div>`;
      const slide = c.querySelector('#rcSlide');
      function render(state) {
        if (state === 'trans') slide.innerHTML = '<div style="position:absolute;left:38%;top:30%;width:24%;height:34%;background:#2f6f3a;border-radius:50%"></div>';
        else if (state === 'recolor') slide.innerHTML = '<div style="position:absolute;left:30%;top:28%;width:40%;height:40%;background:#2f6f3a;border-radius:8px"></div><div style="position:absolute;left:38%;top:36%;width:24%;height:24%;background:#ffffff;border-radius:50%"></div>';
        else slide.innerHTML = '<div style="position:absolute;left:30%;top:28%;width:40%;height:40%;background:#ffffff;border-radius:8px"></div><div style="position:absolute;left:38%;top:36%;width:24%;height:24%;background:#cb5521;border-radius:50%"></div>';
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
          <button class="demo-btn" id="fpSrc">源(已调好)</button>
          <button class="demo-btn" id="fpBrush">格式刷</button>
        </div>
        <div class="mini-slide" id="fpSlide"></div>
      </div>`;
      const slide = c.querySelector('#fpSlide');
      function render(painted) {
        slide.innerHTML = '';
        [24, 46, 68].forEach((x, i) => {
          const d = document.createElement('div');
          d.style.cssText = 'position:absolute;left:' + x + '%;top:38%;width:18%;height:16%;background:' + (painted || i === 0 ? '#2f6f3a' : 'rgba(47,111,58,.25') + ';border-radius:4px;opacity:.9';
          slide.appendChild(d);
        });
        const note = document.createElement('div');
        note.style.cssText = 'position:absolute;bottom:8%;left:8%;font:12px var(--font-mono);color:' + (painted ? '#2f6f3a' : '#1a3300');
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
          <button class="demo-btn" id="lyManual">逐页摆</button>
        </div>
        <div class="demo-row" id="lySlides" style="gap:10px"></div>
      </div>`;
      const wrap = c.querySelector('#lySlides');
      function render(used) {
        wrap.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
          const s = document.createElement('div'); s.className = 'mini-slide';
          s.innerHTML = '<div style="position:absolute;top:14%;left:10%;width:' + (used ? '42%' : '30%') + '%;height:9%;background:' + (used ? '#2f6f3a' : 'rgba(255,255,255,.3') + ';border-radius:4px;opacity:' + (used ? '.85' : '1') + '"></div>' +
            '<div style="position:absolute;top:32%;left:10%;width:70%;height:5%;background:rgba(213,245,194,0.53);border-radius:3px"></div>' +
            '<div style="position:absolute;bottom:8%;right:8%;font:11px var(--font-mono);color:rgba(255,255,255,.4">第' + i + '页</div>';
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
          d.style.cssText = 'position:absolute;left:' + x + '%;top:26%;width:22%;height:48%;background:' + (on ? '#2f6f3a' : 'rgba(255,255,255,.18') + ';border-radius:6px;opacity:' + (on ? '.8' : '1');
          slide.appendChild(d);
        });
        const note = document.createElement('div');
        note.style.cssText = 'position:absolute;bottom:8%;left:8%;font:11px var(--font-mono);color:' + (who ? '#2f6f3a' : 'rgba(26,51,0,.5');
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
          <button class="demo-btn" id="nrStop">停止</button>
        </div>
        <div class="mini-slide" id="nrSlide"></div>
      </div>`;
      const slide = c.querySelector('#nrSlide');
      slide.innerHTML = '<div style="position:absolute;left:30%;top:40%;width:40%;height:6%;background:rgba(213,245,194,0.53);border-radius:3px"><div id="nrBar" style="width:0%;height:100%;background:rgba(47,111,58,.25);border-radius:3px"></div></div><div id="nrTxt" style="position:absolute;bottom:30%;left:0;width:100%;text-align:center;font:11px var(--font-mono);color:rgba(26,51,0,.6">未录制</div>';
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
          <button class="demo-btn" id="tbReset">复位</button>
        </div>
        <div class="mini-slide" id="tbSlide"></div>
      </div>`;
      const slide = c.querySelector('#tbSlide');
      function render(beauty) {
        if (beauty) {
          slide.innerHTML = '<div style="position:absolute;left:14%;top:22%;width:72%;height:54%;background:rgba(213,245,194,0.40);border-radius:6px;overflow:hidden"><div style="position:absolute;left:0;top:0;width:100%;height:25%;background:#2f6f3a;opacity:.85"></div><div style="position:absolute;left:0;top:50%;width:100%;height:25%;background:rgba(213,245,194,.18"></div></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:14%;top:22%;width:72%;height:54%;background:rgba(213,245,194,0.45);border:1px solid rgba(47,111,58,.25)"><div style="position:absolute;left:0;top:25%;width:100%;height:1px;background:rgba(213,245,194,0.55)"></div><div style="position:absolute;left:0;top:50%;width:100%;height:1px;background:rgba(213,245,194,0.55)"></div><div style="position:absolute;left:0;top:75%;width:100%;height:1px;background:rgba(213,245,194,0.55)"></div></div>';
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
          <button class="demo-btn" id="cpReset">复位</button>
        </div>
        <div class="mini-slide" id="cpSlide"></div>
      </div>`;
      const slide = c.querySelector('#cpSlide');
      function render(done) {
        slide.innerHTML = done
          ? '<div style="position:absolute;left:16%;top:26%;width:26%;height:32%;background:#2f6f3a;border-radius:6px;opacity:.8"></div><div style="position:absolute;left:48%;top:26%;width:26%;height:32%;background:#2f6f3a;border-radius:6px;opacity:.8"></div><div style="position:absolute;left:8%;top:80%;font:11px var(--font-mono);color:#1a3300">12MB · 轻快</div>'
          : '<div style="position:absolute;left:16%;top:26%;width:26%;height:32%;background:rgba(213,245,194,0.55);border-radius:6px"></div><div style="position:absolute;left:48%;top:26%;width:26%;height:32%;background:rgba(213,245,194,0.55);border-radius:6px"></div><div style="position:absolute;left:8%;top:80%;font:11px var(--font-mono);color:rgba(26,51,0,.5">50MB · 卡</div>';
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
          <button class="demo-btn" id="ovReset">画布散写</button>
        </div>
        <div class="mini-slide" id="ovSlide"></div>
      </div>`;
      const slide = c.querySelector('#ovSlide');
      function render(outline) {
        if (outline) {
          slide.innerHTML = '<div style="position:absolute;left:6%;top:10%;width:34%;height:80%;background:rgba(213,245,194,0.42)"></div><div style="position:absolute;left:9%;top:16%;width:28%;height:6%;background:rgba(47,111,58,.25);border-radius:3px;opacity:.8"></div><div style="position:absolute;left:11%;top:28%;width:24%;height:4%;background:rgba(213,245,194,0.55);border-radius:3px"></div><div style="position:absolute;left:11%;top:38%;width:24%;height:4%;background:rgba(213,245,194,0.55);border-radius:3px"></div><div style="position:absolute;left:9%;top:54%;width:28%;height:6%;background:rgba(47,111,58,.25);border-radius:3px;opacity:.8"></div><div style="position:absolute;left:52%;top:18%;width:40%;height:46%;background:rgba(213,245,194,0.49);border-radius:6px"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:10%;top:18%;width:80%;height:8%;background:rgba(213,245,194,0.51);border-radius:4px"></div><div style="position:absolute;left:10%;top:32%;width:80%;height:5%;background:rgba(213,245,194,0.45);border-radius:4px"></div><div style="position:absolute;left:10%;top:42%;width:80%;height:5%;background:rgba(213,245,194,0.45);border-radius:4px"></div><div style="position:absolute;left:10%;top:52%;width:62%;height:5%;background:rgba(213,245,194,0.45);border-radius:4px"></div>';
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
          <button class="demo-btn" id="wpReset">原 Word</button>
        </div>
        <div class="mini-slide" id="wpSlide"></div>
      </div>`;
      const slide = c.querySelector('#wpSlide');
      function render(gen) {
        if (gen) {
          slide.innerHTML = '<div style="position:absolute;left:12%;top:16%;width:34%;height:30%;background:rgba(213,245,194,0.49);border-radius:6px"></div><div style="position:absolute;left:15%;top:19%;width:28%;height:5%;background:rgba(47,111,58,.25);border-radius:3px;opacity:.8"></div><div style="position:absolute;left:54%;top:16%;width:34%;height:30%;background:rgba(213,245,194,0.49);border-radius:6px"></div><div style="position:absolute;left:57%;top:19%;width:28%;height:5%;background:rgba(47,111,58,.25);border-radius:3px;opacity:.8"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:10%;top:16%;width:80%;height:9%;background:rgba(213,245,194,0.51);border-radius:4px"></div><div style="position:absolute;left:10%;top:30%;width:80%;height:5%;background:rgba(213,245,194,0.45);border-radius:4px"></div><div style="position:absolute;left:10%;top:40%;width:80%;height:5%;background:rgba(213,245,194,0.45);border-radius:4px"></div><div style="position:absolute;left:10%;top:50%;width:80%;height:5%;background:rgba(213,245,194,0.45);border-radius:4px"></div>';
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
          <button class="demo-btn" id="lcOff">关字幕</button>
        </div>
        <div class="mini-slide" id="lcSlide"></div>
      </div>`;
      const slide = c.querySelector('#lcSlide');
      function render(on) {
        if (on) {
          slide.innerHTML = '<div style="position:absolute;left:12%;top:14%;width:76%;height:42%;background:rgba(213,245,194,0.49);border-radius:6px"></div><div style="position:absolute;left:12%;top:62%;width:76%;height:13%;background:rgba(26,51,0,.55;border-radius:4px"></div><div style="position:absolute;left:16%;top:65%;width:68%;height:7%;background:rgba(213,245,194,0.55);border-radius:3px"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:12%;top:14%;width:76%;height:42%;background:rgba(213,245,194,0.49);border-radius:6px"></div>';
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
          <button class="demo-btn" id="csReset">原方图</button>
        </div>
        <div class="mini-slide" id="csSlide"></div>
      </div>`;
      const slide = c.querySelector('#csSlide');
      function render(shaped) {
        if (shaped) {
          slide.innerHTML = '<div style="position:absolute;left:30%;top:26%;width:40%;height:40%;border-radius:50%;background:rgba(47,111,58,.25);opacity:.85"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:30%;top:26%;width:40%;height:40%;background:rgba(213,245,194,0.51);border-radius:6px"></div>';
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
          <button class="demo-btn" id="hlReset">纯文本</button>
        </div>
        <div class="mini-slide" id="hlSlide"></div>
      </div>`;
      const slide = c.querySelector('#hlSlide');
      function render(linked) {
        if (linked) {
          slide.innerHTML = '<div style="position:absolute;left:14%;top:18%;width:72%;height:9%;background:rgba(213,245,194,0.49);border-radius:4px"></div><div style="position:absolute;left:18%;top:20%;width:40%;height:5%;background:rgba(47,111,58,.25);border-radius:3px;opacity:.85"></div><div style="position:absolute;left:14%;top:34%;width:72%;height:9%;background:rgba(213,245,194,0.45);border-radius:4px"></div><div style="position:absolute;left:14%;top:50%;width:72%;height:9%;background:rgba(213,245,194,0.45);border-radius:4px"></div><div style="position:absolute;left:18%;top:72%;width:60%;height:5%;background:#2f6f3a;border-radius:3px;opacity:.7"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:14%;top:18%;width:72%;height:9%;background:rgba(213,245,194,0.49);border-radius:4px"></div><div style="position:absolute;left:18%;top:20%;width:40%;height:5%;background:rgba(213,245,194,0.55);border-radius:3px"></div><div style="position:absolute;left:14%;top:34%;width:72%;height:9%;background:rgba(213,245,194,0.45);border-radius:4px"></div><div style="position:absolute;left:14%;top:50%;width:72%;height:9%;background:rgba(213,245,194,0.45);border-radius:4px"></div>';
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
          <button class="demo-btn" id="inkOff">纯净放映</button>
        </div>
        <div class="mini-slide" id="inkSlide"></div>
      </div>`;
      const slide = c.querySelector('#inkSlide');
      function render(on) {
        if (on) {
          slide.innerHTML = '<div style="position:absolute;left:20%;top:22%;width:44%;height:30%;background:rgba(213,245,194,0.49);border-radius:6px"></div><svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><ellipse cx="42" cy="52" rx="22" ry="14" fill="none" stroke="#cb5521" stroke-width="2.5"/></svg><div style="position:absolute;left:72%;top:28%;width:8px;height:8px;border-radius:50%;background:#cb5521"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:20%;top:22%;width:44%;height:30%;background:rgba(213,245,194,0.49);border-radius:6px"></div>';
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
          <button class="demo-btn" id="mpReset">直跳</button>
        </div>
        <div class="mini-slide" id="mpSlide"></div>
      </div>`;
      const slide = c.querySelector('#mpSlide');
      function render(path) {
        if (path) {
          slide.innerHTML = '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><path d="M12,78 C40,30 60,70 88,22" fill="none" stroke="#2f6f3a" stroke-width="2" stroke-dasharray="4 3"/></svg><div style="position:absolute;left:10%;top:72%;width:9%;height:9%;background:rgba(47,111,58,.25);border-radius:4px;opacity:.95"></div><div style="position:absolute;left:84%;top:16%;width:9%;height:9%;background:#2f6f3a;border-radius:4px;opacity:.95"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:12%;top:72%;width:9%;height:9%;background:rgba(47,111,58,.25);border-radius:4px;opacity:.95"></div><div style="position:absolute;left:84%;top:16%;width:9%;height:9%;background:#2f6f3a;border-radius:4px;opacity:.95"></div>';
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
          <button class="demo-btn" id="qatReset">翻功能区</button>
        </div>
        <div class="mini-slide" id="qatSlide"></div>
      </div>`;
      const slide = c.querySelector('#qatSlide');
      function render(pinned) {
        if (pinned) {
          slide.innerHTML = '<div style="position:absolute;left:8%;top:22%;width:84%;height:11%;background:rgba(213,245,194,0.45);border-radius:4px"></div><div style="position:absolute;left:10%;top:25%;width:9%;height:6%;background:#2f6f3a;border-radius:3px;opacity:.9"></div><div style="position:absolute;left:22%;top:25%;width:9%;height:6%;background:#2f6f3a;border-radius:3px;opacity:.9"></div><div style="position:absolute;left:34%;top:25%;width:9%;height:6%;background:#2f6f3a;border-radius:3px;opacity:.9"></div>';
        } else {
          slide.innerHTML = '<div style="position:absolute;left:8%;top:22%;width:84%;height:11%;background:rgba(213,245,194,0.45);border-radius:4px"></div>';
        }
      }
      render(false);
      c.querySelector('#qatPin').onclick = () => { render(true); c.querySelector('#qatPin').classList.add('active'); c.querySelector('#qatReset').classList.remove('active'); };
      c.querySelector('#qatReset').onclick = () => { render(false); c.querySelector('#qatReset').classList.add('active'); c.querySelector('#qatPin').classList.remove('active'); };
    },
    dataLabel(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">图表数据标签：开启前后</div><div class="demo-row"><button class="demo-btn" id="dlOff">无标签</button><button class="demo-btn" id="dlOn">显示标签</button></div><div class="mini-slide" id="dlSlide"></div></div>';
      function render(on) {
        let h = '<div style="position:absolute;left:10%;top:24%;width:22%;height:48%;background:#2f6f3a;opacity:.7;border-radius:4px 4px 0 0"></div><div style="position:absolute;left:38%;top:36%;width:22%;height:36%;background:#2f6f3a;opacity:.7;border-radius:4px 4px 0 0"></div><div style="position:absolute;left:66%;top:20%;width:22%;height:52%;background:#2f6f3a;opacity:.7;border-radius:4px 4px 0 0"></div><div style="position:absolute;left:6%;top:72%;width:88%;height:1%;background:rgba(213,245,194,0.55)"></div>';
        if (on) h += '<div style="position:absolute;left:11%;top:16%;width:20%;text-align:center;color:#1a3300;font:bold 12px var(--font-mono)">120</div><div style="position:absolute;left:39%;top:28%;width:20%;text-align:center;color:#1a3300;font:bold 12px var(--font-mono)">85</div><div style="position:absolute;left:67%;top:12%;width:20%;text-align:center;color:#1a3300;font:bold 12px var(--font-mono)">198</div>';
        document.getElementById('dlSlide').innerHTML = h;
      }
      render(false);
      c.querySelector('#dlOff').onclick = () => { render(false); c.querySelector('#dlOff').classList.add('active'); c.querySelector('#dlOn').classList.remove('active'); };
      c.querySelector('#dlOn').onclick = () => { render(true); c.querySelector('#dlOn').classList.add('active'); c.querySelector('#dlOff').classList.remove('active'); };
    },
    timeline(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">动画时间轴：按延迟依次出现</div><div class="demo-row"><button class="demo-btn" id="tlAll">一股脑</button><button class="demo-btn" id="tlSeq">分步延迟</button></div><div class="mini-slide" id="tlSlide"></div></div>';
      let tlTimer;
      function play(delays) {
        clearInterval(tlTimer);
        document.getElementById('tlSlide').innerHTML = '<div style="position:absolute;left:10%;top:30%;width:24%;height:22%;background:#2f6f3a;opacity:.15;border-radius:6px;transition:opacity .3s" id="tl1"></div><div style="position:absolute;left:38%;top:30%;width:24%;height:22%;background:#2f6f3a;opacity:.15;border-radius:6px;transition:opacity .3s" id="tl2"></div><div style="position:absolute;left:66%;top:30%;width:24%;height:22%;background:#2f6f3a;opacity:.15;border-radius:6px;transition:opacity .3s" id="tl3"></div>';
        let i = 0;
        tlTimer = setInterval(() => {
          if (i >= delays.length) { clearInterval(tlTimer); return; }
          document.getElementById('tl' + (i + 1)).style.opacity = '.9';
          i++;
        }, delays[i] || 0);
        if (window.__demoTimers) window.__demoTimers.push(tlTimer);
      }
      play([0,0,0]);
      c.querySelector('#tlAll').onclick = () => { play([0,0,0]); c.querySelector('#tlAll').classList.add('active'); c.querySelector('#tlSeq').classList.remove('active'); };
      c.querySelector('#tlSeq').onclick = () => { play([0,400,400]); c.querySelector('#tlSeq').classList.add('active'); c.querySelector('#tlAll').classList.remove('active'); };
    },
    morphForce(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">!!前缀强制配对 → 方块平滑变圆形</div><div class="demo-row"><button class="demo-btn" id="mfReset">方块</button><button class="demo-btn" id="mfMorph">平滑变</button></div><div class="mini-slide" id="mfSlide"></div></div>';
      function render(morphed) {
        if (morphed) document.getElementById('mfSlide').innerHTML = '<div style="position:absolute;left:30%;top:26%;width:40%;height:48%;background:#2f6f3a;border-radius:50%;transition:all .6s cubic-bezier(.4,0,.2,1);opacity:.9"></div><div style="position:absolute;left:8%;top:82%;width:84%;text-align:center;color:#1a3300;font:11px var(--font-mono)">!!shape 配对 → 平滑变</div>';
        else document.getElementById('mfSlide').innerHTML = '<div style="position:absolute;left:20%;top:30%;width:35%;height:40%;background:#2f6f3a;border-radius:8px;opacity:.9"></div><div style="position:absolute;left:8%;top:82%;width:84%;text-align:center;color:#1a3300;font:11px var(--font-mono)">不同形状 → 无过渡</div>';
      }
      render(false);
      c.querySelector('#mfReset').onclick = () => { render(false); c.querySelector('#mfReset').classList.add('active'); c.querySelector('#mfMorph').classList.remove('active'); };
      c.querySelector('#mfMorph').onclick = () => { render(true); c.querySelector('#mfMorph').classList.add('active'); c.querySelector('#mfReset').classList.remove('active'); };
    },
    guides(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">参考线 + 网格吸附</div><div class="demo-row"><button class="demo-btn" id="gdFree">自由摆放</button><button class="demo-btn" id="gdSnap">吸附对齐</button></div><div class="mini-slide" id="gdSlide"></div></div>';
      function render(snap) {
        if (snap) {
          document.getElementById('gdSlide').innerHTML = '<div style="position:absolute;left:6%;top:18%;width:88%;height:1%;background:rgba(47,111,58,.25);opacity:.25"></div><div style="position:absolute;left:6%;top:48%;width:88%;height:1%;background:rgba(47,111,58,.25);opacity:.25"></div><div style="position:absolute;left:22%;top:6%;width:1%;height:62%;background:#2f6f3a;opacity:.25"></div><div style="position:absolute;left:55%;top:6%;width:1%;height:62%;background:#2f6f3a;opacity:.25"></div><div style="position:absolute;left:24%;top:20%;width:29%;height:14%;background:rgba(213,245,194,0.50);border-radius:6px"></div><div style="position:absolute;left:24%;top:50%;width:29%;height:14%;background:rgba(213,245,194,0.50);border-radius:6px"></div><div style="position:absolute;left:57%;top:20%;width:29%;height:14%;background:rgba(213,245,194,0.50);border-radius:6px"></div><div style="position:absolute;left:57%;top:50%;width:29%;height:14%;background:rgba(213,245,194,0.50);border-radius:6px"></div>';
        } else {
          document.getElementById('gdSlide').innerHTML = '<div style="position:absolute;left:8%;top:22%;width:18%;height:16%;background:rgba(213,245,194,0.47);border-radius:6px"></div><div style="position:absolute;left:34%;top:18%;width:18%;height:18%;background:rgba(213,245,194,0.47);border-radius:6px"></div><div style="position:absolute;left:60%;top:26%;width:18%;height:14%;background:rgba(213,245,194,0.47);border-radius:6px"></div><div style="position:absolute;left:76%;top:38%;width:18%;height:12%;background:rgba(213,245,194,0.47);border-radius:6px"></div>';
        }
      }
      render(false);
      c.querySelector('#gdFree').onclick = () => { render(false); c.querySelector('#gdFree').classList.add('active'); c.querySelector('#gdSnap').classList.remove('active'); };
      c.querySelector('#gdSnap').onclick = () => { render(true); c.querySelector('#gdSnap').classList.add('active'); c.querySelector('#gdFree').classList.remove('active'); };
    },
    summaryZoom(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">摘要缩放：点缩略图跳转</div><div class="mini-slide" id="szSlide"></div></div>';
      const pages = ['产品概述','市场分析','功能对比','定价方案','Q&A'];
      function render(active) {
        let h = '';
        pages.forEach((p,i) => {
          const x = 4 + (i % 3) * 32; const y = i < 3 ? 10 : 50;
          h += '<div style="position:absolute;left:' + x + '%;top:' + y + '%;width:28%;height:28%;background:' + (i === active ? 'rgba(47,111,58,.4' : 'rgba(255,255,255,.08') + ';border-radius:8px;cursor:pointer;transition:all .3s;display:flex;align-items:center;justify-content:center" data-sz="' + i + '"><span style="color:' + (i === active ? '#ffffff' : 'rgba(26,51,0,.5') + ';font:12px var(--font-body)">' + p + '</span></div>';
        });
        h += '<div style="position:absolute;left:4%;top:82%;width:92%;text-align:center;color:#1a3300;font:11px var(--font-mono)">点击卡片跳转到对应节</div>';
        document.getElementById('szSlide').innerHTML = h;
        document.querySelectorAll('#szSlide [data-sz]').forEach(el => {
          el.onclick = () => render(parseInt(el.dataset.sz));
        });
      }
      render(-1);
    },
    ['3dModel'](c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">3D 立方体旋转</div><div class="demo-row"><button class="demo-btn" id="d3Reset">正面</button><button class="demo-btn" id="d3Rotate">旋转</button></div><div class="mini-slide" id="d3Slide"></div></div>';
      const faces = [
        { points: '50,16 82,36 82,68 50,88 18,68 18,36', fill: 'rgba(47,111,58,.35', stroke: '#2f6f3a' },
        { points: '50,16 82,36 50,42 18,36', fill: 'rgba(47,111,58,.55', stroke: '#2f6f3a' }
      ];
      function render(rotated) {
        let h = '<svg viewBox="0 0 100 100" style="position:absolute;inset:0;width:100%;height:100%">';
        if (rotated) {
          h += '<polygon points="50,10 88,34 88,66 50,90 12,66 12,34" fill="rgba(47,111,58,.25" stroke="#2f6f3a" stroke-width="1"/>';
          h += '<polygon points="50,10 88,34 50,44 12,34" fill="rgba(47,111,58,.5" stroke="#2f6f3a" stroke-width="1"/>';
          h += '<line x1="50" y1="44" x2="50" y2="90" stroke="#2f6f3a" stroke-width="1"/>';
          h += '<text x="82" y="28" fill="#2f6f3a" font-size="10">↻</text>';
        } else {
          h += '<polygon points="50,18 80,36 80,68 50,86 20,68 20,36" fill="rgba(47,111,58,.4" stroke="#2f6f3a" stroke-width="1"/>';
          h += '<polygon points="50,18 80,36 50,44 20,36" fill="rgba(47,111,58,.6" stroke="#2f6f3a" stroke-width="1"/>';
        }
        h += '</svg>';
        document.getElementById('d3Slide').innerHTML = h;
      }
      render(false);
      c.querySelector('#d3Reset').onclick = () => { render(false); c.querySelector('#d3Reset').classList.add('active'); c.querySelector('#d3Rotate').classList.remove('active'); };
      c.querySelector('#d3Rotate').onclick = () => { render(true); c.querySelector('#d3Rotate').classList.add('active'); c.querySelector('#d3Reset').classList.remove('active'); };
    },
    variants(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">主题变体：切换配色方案</div><div class="demo-row"><button class="demo-btn" id="vrPurple">蓝紫</button><button class="demo-btn" id="vrGreen">绿色</button><button class="demo-btn" id="vrOrange">暖橙</button></div><div class="mini-slide" id="vrSlide"></div></div>';
      const schemes = {
        purple: { bg: '#663af3', accent: '#a78bfa', accent2: 'rgba(167,139,250,.3' },
        green: { bg: '#2f6f3a', accent: '#5cb85c', accent2: 'rgba(92,184,92,.3' },
        orange: { bg: '#cb5521', accent: '#f59e42', accent2: 'rgba(245,158,66,.3' }
      };
      function render(scheme) {
        const s = schemes[scheme];
        document.getElementById('vrSlide').innerHTML = '<div style="position:absolute;inset:0;background:' + s.bg + ';border-radius:8px"></div><div style="position:absolute;left:12%;top:18%;width:76%;height:8%;background:' + s.accent2 + ';border-radius:4px"></div><div style="position:absolute;left:12%;top:36%;width:36%;height:20%;background:' + s.accent + ';opacity:.8;border-radius:6px"></div><div style="position:absolute;left:52%;top:36%;width:36%;height:20%;background:' + s.accent + ';opacity:.8;border-radius:6px"></div><div style="position:absolute;left:12%;top:64%;width:36%;height:12%;background:' + s.accent2 + ';border-radius:4px"></div><div style="position:absolute;left:52%;top:64%;width:36%;height:12%;background:' + s.accent2 + ';border-radius:4px"></div>';
      }
      render('purple');
      c.querySelector('#vrPurple').onclick = () => { render('purple'); c.querySelector('#vrPurple').classList.add('active'); c.querySelector('#vrGreen').classList.remove('active'); c.querySelector('#vrOrange').classList.remove('active'); };
      c.querySelector('#vrGreen').onclick = () => { render('green'); c.querySelector('#vrGreen').classList.add('active'); c.querySelector('#vrPurple').classList.remove('active'); c.querySelector('#vrOrange').classList.remove('active'); };
      c.querySelector('#vrOrange').onclick = () => { render('orange'); c.querySelector('#vrOrange').classList.add('active'); c.querySelector('#vrPurple').classList.remove('active'); c.querySelector('#vrGreen').classList.remove('active'); };
    },
    artisticEffect(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">艺术效果：图片风格化</div><div class="demo-row"><button class="demo-btn" id="aeOrig">原图</button><button class="demo-btn" id="aeSketch">素描</button><button class="demo-btn" id="aeBlur">虚化</button></div><div class="mini-slide" id="aeSlide"></div></div>';
      const styles = {
        orig: 'background:linear-gradient(135deg,rgba(47,111,58,.25,rgba(47,111,58,.15);border-radius:8px',
        sketch: 'background:linear-gradient(135deg,rgba(47,111,58,.1,rgba(47,111,58,.08);border-radius:8px;filter:grayscale(.6) contrast(1.4)',
        blur: 'background:linear-gradient(135deg,rgba(47,111,58,.15,rgba(47,111,58,.1);border-radius:8px;filter:blur(3px)'
      };
      function render(style) {
        document.getElementById('aeSlide').innerHTML = '<div style="position:absolute;left:20%;top:16%;width:60%;height:60%;' + styles[style] + '"></div>' + (style !== 'orig' ? '<div style="position:absolute;left:8%;top:82%;width:84%;text-align:center;color:#1a3300;font:11px var(--font-mono)">' + (style === 'sketch' ? '铅笔素描' : '虚化效果') + '</div>' : '');
      }
      render('orig');
      c.querySelector('#aeOrig').onclick = () => { render('orig'); c.querySelector('#aeOrig').classList.add('active'); c.querySelector('#aeSketch').classList.remove('active'); c.querySelector('#aeBlur').classList.remove('active'); };
      c.querySelector('#aeSketch').onclick = () => { render('sketch'); c.querySelector('#aeSketch').classList.add('active'); c.querySelector('#aeOrig').classList.remove('active'); c.querySelector('#aeBlur').classList.remove('active'); };
      c.querySelector('#aeBlur').onclick = () => { render('blur'); c.querySelector('#aeBlur').classList.add('active'); c.querySelector('#aeOrig').classList.remove('active'); c.querySelector('#aeSketch').classList.remove('active'); };
    },
    pictureCorrect(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">图片更正：亮度+对比度</div><div class="demo-row"><button class="demo-btn" id="pcDark">偏暗</button><button class="demo-btn" id="pcBright">提亮</button></div><div class="mini-slide" id="pcSlide"></div></div>';
      function render(bright) {
        document.getElementById('pcSlide').innerHTML = '<div style="position:absolute;left:20%;top:16%;width:60%;height:56%;border-radius:8px;background:linear-gradient(135deg,rgba(102,58,243,' + (bright ? '.40' : '.22') + '),rgba(38,150,132,' + (bright ? '.28' : '.14') + '))"></div>' + (bright ? '<div style="position:absolute;left:8%;top:80%;width:84%;text-align:center;color:#1a3300;font:11px var(--font-mono)">亮度+30% 对比度+20%</div>' : '');
      }
      render(false);
      c.querySelector('#pcDark').onclick = () => { render(false); c.querySelector('#pcDark').classList.add('active'); c.querySelector('#pcBright').classList.remove('active'); };
      c.querySelector('#pcBright').onclick = () => { render(true); c.querySelector('#pcBright').classList.add('active'); c.querySelector('#pcDark').classList.remove('active'); };
    },
    pictureStyle(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">图片样式：一键套框</div><div class="demo-row"><button class="demo-btn" id="psPlain">朴素</button><button class="demo-btn" id="psStyled">套样式</button></div><div class="mini-slide" id="psSlide"></div></div>';
      function render(styled) {
        if (styled) {
          document.getElementById('psSlide').innerHTML = '<div style="position:absolute;left:24%;top:12%;width:52%;height:48%;border-radius:10px;background:linear-gradient(135deg,rgba(47,111,58,.15,rgba(47,111,58,.1);box-shadow:0 4px 18px rgba(26,51,0,.4,0 0 0 3px rgba(47,111,58,.25"></div><div style="position:absolute;left:22%;top:10%;width:52%;height:48%;border-radius:10px;background:linear-gradient(135deg,rgba(47,111,58,.1,rgba(47,111,58,.05);opacity:.4;transform:scaleY(-1);filter:blur(2px)"></div>';
        } else {
          document.getElementById('psSlide').innerHTML = '<div style="position:absolute;left:28%;top:18%;width:44%;height:44%;border-radius:4px;background:rgba(213,245,194,0.43)"></div>';
        }
      }
      render(false);
      c.querySelector('#psPlain').onclick = () => { render(false); c.querySelector('#psPlain').classList.add('active'); c.querySelector('#psStyled').classList.remove('active'); };
      c.querySelector('#psStyled').onclick = () => { render(true); c.querySelector('#psStyled').classList.add('active'); c.querySelector('#psPlain').classList.remove('active'); };
    },
    changePicture(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">更改图片：格式原封不动继承</div><div class="demo-row"><button class="demo-btn" id="cpOrig">原图A</button><button class="demo-btn" id="cpChange">换图B</button></div><div class="mini-slide" id="cpSlide"></div></div>';
      function render(changed) {
        const shape = 'border-radius:50%;width:40%;height:44%;position:absolute;left:30%;top:16%';
        if (changed) {
          document.getElementById('cpSlide').innerHTML = '<div style="' + shape + ';background:linear-gradient(135deg,#2f6f3a,rgba(47,111,58,.4);box-shadow:0 0 0 3px rgba(47,111,58,.3,0 4px 18px rgba(26,51,0,.4;border-radius:50%"></div><div style="position:absolute;left:8%;top:72%;width:84%;text-align:center;color:#1a3300;font:11px var(--font-mono)">边框+投影保留→换图</div>';
        } else {
          document.getElementById('cpSlide').innerHTML = '<div style="' + shape + ';background:linear-gradient(135deg,#2f6f3a,rgba(47,111,58,.4);box-shadow:0 0 0 3px rgba(47,111,58,.3,0 4px 18px rgba(26,51,0,.4;border-radius:50%"></div>';
        }
      }
      render(false);
      c.querySelector('#cpOrig').onclick = () => { render(false); c.querySelector('#cpOrig').classList.add('active'); c.querySelector('#cpChange').classList.remove('active'); };
      c.querySelector('#cpChange').onclick = () => { render(true); c.querySelector('#cpChange').classList.add('active'); c.querySelector('#cpOrig').classList.remove('active'); };
    },
    excelLink(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">Excel→PPT 链接刷新</div><div class="demo-row"><button class="demo-btn" id="elStatic">静态</button><button class="demo-btn" id="elLinked">链接</button></div><div class="mini-slide" id="elSlide"></div></div>';
      function render(linked) {
        let h = '<div style="position:absolute;left:8%;top:20%;width:36%;height:40%;background:rgba(213,245,194,0.39);border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(26,51,0,.4;font:11px var(--font-body)">Excel</div><div style="position:absolute;left:56%;top:20%;width:36%;height:40%;background:rgba(47,111,58,.08;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#ffffff;font:12px var(--font-body)">📊</div>';
        h += '<div style="position:absolute;left:48%;top:28%;color:' + (linked ? '#2f6f3a' : '#1a3300') + ';font:bold 18px var(--font-mono)">' + (linked ? '⇄' : '→') + '</div>';
        if (linked) h += '<div style="position:absolute;left:8%;top:72%;width:84%;text-align:center;color:#1a3300;font:11px var(--font-mono)">源数据更新 → 右键刷新</div>';
        document.getElementById('elSlide').innerHTML = h;
      }
      render(false);
      c.querySelector('#elStatic').onclick = () => { render(false); c.querySelector('#elStatic').classList.add('active'); c.querySelector('#elLinked').classList.remove('active'); };
      c.querySelector('#elLinked').onclick = () => { render(true); c.querySelector('#elLinked').classList.add('active'); c.querySelector('#elStatic').classList.remove('active'); };
    },
    dataBars(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">条件格式：表格内嵌数据条</div><div class="demo-row"><button class="demo-btn" id="dbPlain">纯数字</button><button class="demo-btn" id="dbBars">数据条</button></div><div class="mini-slide" id="dbSlide"></div></div>';
      const data = [{ n:'Q1', v:120 },{ n:'Q2', v:85 },{ n:'Q3', v:198 }];
      function render(bars) {
        let h = '';
        data.forEach((d,i) => {
          const y = 16 + i * 24, w = bars ? Math.round(d.v / 200 * 60) : 0;
          h += '<div style="position:absolute;left:8%;top:' + y + '%;width:84%;height:14%;background:rgba(213,245,194,' + (i % 2 ? '.28' : '.42') + ');border-radius:4px"></div>';
          h += '<div style="position:absolute;left:10%;top:' + (y + 3) + '%;color:rgba(26,51,0,.5;font:10px var(--font-body)">' + d.n + '</div>';
          if (bars) h += '<div style="position:absolute;left:24%;top:' + (y + 3) + '%;width:' + w + '%;height:8%;background:#2f6f3a;opacity:.5;border-radius:3px"></div>';
          h += '<div style="position:absolute;right:8%;top:' + (y + 3) + '%;color:#ffffff;font:bold 11px var(--font-mono);text-align:right">' + d.v + '</div>';
        });
        document.getElementById('dbSlide').innerHTML = h;
      }
      render(false);
      c.querySelector('#dbPlain').onclick = () => { render(false); c.querySelector('#dbPlain').classList.add('active'); c.querySelector('#dbBars').classList.remove('active'); };
      c.querySelector('#dbBars').onclick = () => { render(true); c.querySelector('#dbBars').classList.add('active'); c.querySelector('#dbPlain').classList.remove('active'); };
    },
    videoTrim(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">视频裁剪+书签</div><div class="demo-row"><button class="demo-btn" id="vtFull">全长</button><button class="demo-btn" id="vtTrim">裁剪</button></div><div class="mini-slide" id="vtSlide"></div></div>';
      function render(trimmed) {
        let h = '<div style="position:absolute;left:6%;top:30%;width:88%;height:12%;background:rgba(213,245,194,0.41);border-radius:6px;overflow:hidden">';
        if (trimmed) {
          h += '<div style="position:absolute;left:30%;top:0;width:28%;height:100%;background:#2f6f3a;opacity:.35;border-radius:3px"></div>';
          h += '<div style="position:absolute;left:28%;top:50%;width:2px;height:100%;background:rgba(47,111,58,.25);transform:translateY(-50%)"></div>';
          h += '<div style="position:absolute;left:56%;top:50%;width:2px;height:100%;background:rgba(47,111,58,.25);transform:translateY(-50%)"></div>';
        } else {
          h += '<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:#2f6f3a;opacity:.2;border-radius:3px"></div>';
        }
        h += '</div>';
        if (trimmed) h += '<div style="position:absolute;left:6%;top:50%;width:88%;text-align:center;color:#1a3300;font:10px var(--font-mono)">裁剪 30%-58% + 书签</div>';
        document.getElementById('vtSlide').innerHTML = h;
      }
      render(false);
      c.querySelector('#vtFull').onclick = () => { render(false); c.querySelector('#vtFull').classList.add('active'); c.querySelector('#vtTrim').classList.remove('active'); };
      c.querySelector('#vtTrim').onclick = () => { render(true); c.querySelector('#vtTrim').classList.add('active'); c.querySelector('#vtFull').classList.remove('active'); };
    },
    a11yCheck(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">辅助功能检查器</div><div class="demo-row"><button class="demo-btn" id="acWarn">有问题</button><button class="demo-btn" id="acPass">全通过</button></div><div class="mini-slide" id="acSlide"></div></div>';
      function render(ok) {
        const items = ['图片 Alt 文本','阅读顺序','颜色对比度'];
        let h = '';
        items.forEach((item,i) => {
          h += '<div style="position:absolute;left:8%;top:' + (16 + i * 24) + '%;width:84%;height:16%;background:rgba(213,245,194,0.39);border-radius:6px;display:flex;align-items:center;padding:0 12px">';
          h += '<span style="color:' + (ok ? '#2f6f3a' : '#1a3300') + ';font:11px var(--font-body)">' + (ok ? '✓' : '⚠') + ' ' + item + '</span>';
          h += '</div>';
        });
        if (ok) h += '<div style="position:absolute;left:8%;top:68%;width:84%;text-align:center;color:#1a3300;font:11px var(--font-mono)">检查通过 ✓</div>';
        else h += '<div style="position:absolute;left:8%;top:68%;width:84%;text-align:center;color:#1a3300;font:11px var(--font-mono)">3 个问题需修复</div>';
        document.getElementById('acSlide').innerHTML = h;
      }
      render(false);
      c.querySelector('#acWarn').onclick = () => { render(false); c.querySelector('#acWarn').classList.add('active'); c.querySelector('#acPass').classList.remove('active'); };
      c.querySelector('#acPass').onclick = () => { render(true); c.querySelector('#acPass').classList.add('active'); c.querySelector('#acWarn').classList.remove('active'); };
    },
    reuseSlides(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">幻灯片重用：从库拉页</div><div class="demo-row"><button class="demo-btn" id="rsNone">空页</button><button class="demo-btn" id="rsImport">导入</button></div><div class="mini-slide" id="rsSlide"></div></div>';
      function render(hasSlide) {
        if (hasSlide) {
          document.getElementById('rsSlide').innerHTML = '<div style="position:absolute;left:8%;top:12%;width:84%;height:60%;background:rgba(213,245,194,0.41);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px"><div style="width:60%;height:8%;background:rgba(47,111,58,.3;border-radius:3px"></div><div style="width:40%;height:6%;background:rgba(213,245,194,0.43);border-radius:3px"></div><div style="width:50%;height:6%;background:rgba(213,245,194,0.41);border-radius:3px"></div></div><div style="position:absolute;left:8%;top:80%;width:84%;text-align:center;color:#1a3300;font:11px var(--font-mono)">格式原样保留 ✓</div>';
        } else {
          document.getElementById('rsSlide').innerHTML = '<div style="position:absolute;left:8%;top:12%;width:84%;height:60%;border:1px dashed rgba(47,111,58,.08);border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(26,51,0,.2;font:12px var(--font-body)">空白页</div>';
        }
      }
      render(false);
      c.querySelector('#rsNone').onclick = () => { render(false); c.querySelector('#rsNone').classList.add('active'); c.querySelector('#rsImport').classList.remove('active'); };
      c.querySelector('#rsImport').onclick = () => { render(true); c.querySelector('#rsImport').classList.add('active'); c.querySelector('#rsNone').classList.remove('active'); };
    },
    inkMath(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">墨迹公式：手写→标准公式</div><div class="demo-row"><button class="demo-btn" id="imType">打字</button><button class="demo-btn" id="imInk">墨迹</button></div><div class="mini-slide" id="imSlide"></div></div>';
      function render(ink) {
        if (ink) {
          document.getElementById('imSlide').innerHTML = '<div style="position:absolute;left:10%;top:16%;width:80%;height:52%;background:rgba(251,243,207,.05;border-radius:8px"></div><div style="position:absolute;left:16%;top:28%;color:#1a3300;font:italic 24px serif">x² + bx + c = 0</div><div style="position:absolute;left:8%;top:78%;width:84%;text-align:center;color:#1a3300;font:10px var(--font-mono)">✎ 手写公式 → 标准排版</div>';
        } else {
          document.getElementById('imSlide').innerHTML = '<div style="position:absolute;left:14%;top:28%;color:rgba(26,51,0,.4;font:14px var(--font-body)">x = (-b ± √(b²-4ac)) / 2a</div>';
        }
      }
      render(false);
      c.querySelector('#imType').onclick = () => { render(false); c.querySelector('#imType').classList.add('active'); c.querySelector('#imInk').classList.remove('active'); };
      c.querySelector('#imInk').onclick = () => { render(true); c.querySelector('#imInk').classList.add('active'); c.querySelector('#imType').classList.remove('active'); };
    },
    mapChart(c) {
      c.innerHTML = '<div class="demo-stack"><div class="demo-label">地图图表：区域着色</div><div class="demo-row"><button class="demo-btn" id="mcTable">表格</button><button class="demo-btn" id="mcMap">地图</button></div><div class="mini-slide" id="mcSlide"></div></div>';
      function render(map) {
        if (map) {
          document.getElementById('mcSlide').innerHTML = '<div style="position:absolute;left:8%;top:8%;width:84%;height:72%;background:rgba(47,111,58,.04;border-radius:8px"><div style="position:absolute;left:10%;top:14%;width:20%;height:20%;background:#2f6f3a;opacity:.7;border-radius:4px"></div><div style="position:absolute;left:34%;top:18%;width:18%;height:18%;background:#2f6f3a;opacity:.5;border-radius:4px"></div><div style="position:absolute;left:56%;top:10%;width:22%;height:22%;background:#2f6f3a;opacity:.6;border-radius:4px"></div><div style="position:absolute;left:14%;top:40%;width:16%;height:18%;background:#2f6f3a;opacity:.3;border-radius:4px"></div><div style="position:absolute;left:38%;top:44%;width:20%;height:16%;background:#2f6f3a;opacity:.4;border-radius:4px"></div><div style="position:absolute;left:62%;top:38%;width:18%;height:20%;background:#2f6f3a;opacity:.7;border-radius:4px"></div></div><div style="position:absolute;left:6%;top:86%;display:flex;gap:8px;align-items:center"><div style="width:16px;height:6px;background:#2f6f3a;opacity:.7;border-radius:2px"></div><div style="width:16px;height:6px;background:#2f6f3a;opacity:.3;border-radius:2px"></div><span style="color:rgba(26,51,0,.4;font:9px var(--font-mono)">深 ← 数值 → 浅</span></div>';
        } else {
          document.getElementById('mcSlide').innerHTML = '<div style="position:absolute;left:8%;top:18%;width:84%;height:52%;background:rgba(213,245,194,0.39);border-radius:8px"><div style="position:absolute;left:10%;top:14%;color:rgba(26,51,0,.4;font:11px var(--font-body)">地区  |  销量</div><div style="position:absolute;left:10%;top:34%;color:rgba(26,51,0,.3;font:10px var(--font-body)">A区  |  340</div><div style="position:absolute;left:10%;top:52%;color:rgba(26,51,0,.3;font:10px var(--font-body)">B区  |  210</div><div style="position:absolute;left:10%;top:70%;color:rgba(26,51,0,.3;font:10px var(--font-body)">C区  |  580</div></div>';
        }
      }
      render(false);
      c.querySelector('#mcTable').onclick = () => { render(false); c.querySelector('#mcTable').classList.add('active'); c.querySelector('#mcMap').classList.remove('active'); };
      c.querySelector('#mcMap').onclick = () => { render(true); c.querySelector('#mcMap').classList.add('active'); c.querySelector('#mcTable').classList.remove('active'); };
    },

    /* 2026-07-27 新增 · 8 个交互演示 */

    /* 图片半透明蒙版：拖动滑杆调蒙版深浅 */
    imageMask(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">拖动滑杆调蒙版深浅，看白字何时变清晰</div>
        <div class="demo-row"><input type="range" min="0" max="80" value="0" class="demo-slider" id="imMask"></div>
        <div class="mini-slide" id="imSlide"></div>
      </div>`;
      const slide = c.querySelector('#imSlide');
      const range = c.querySelector('#imMask');
      function render(op) {
        const dark = op / 100;
        const clear = op > 20;
        slide.innerHTML =
          '<img src="img/tech1.png" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover">' +
          '<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(5,6,15,' + dark + ')"></div>' +
          '<div style="position:absolute;left:8%;top:38%;width:84%;font:600 ' + (clear ? 22 : 20) + 'px var(--font-body);color:' + (clear ? '#ffffff' : 'rgba(255,255,255,.5') + ';text-shadow:' + (clear ? '0 2px 8px rgba(26,51,0,.5' : 'none') + '">AI 驱动未来</div>' +
          '<div style="position:absolute;left:8%;top:56%;width:72%;font:13px var(--font-body);color:' + (clear ? 'rgba(255,255,255,.85' : 'rgba(255,255,255,.42') + '">让数据自己说话</div>';
      }
      render(0);
      range.oninput = () => render(+range.value);
    },

    /* 隐藏幻灯片：切换备用页的隐藏状态 */
    hideSlide(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「隐藏备用页」让放映跳过它</div>
        <div class="demo-row"><button class="demo-btn" id="hsToggle">隐藏备用页</button></div>
        <div class="mini-slide" id="hsSlide" style="aspect-ratio:auto;height:120px"></div>
      </div>`;
      const slide = c.querySelector('#hsSlide');
      const btn = c.querySelector('#hsToggle');
      let hidden = false;
      function render() {
        slide.innerHTML = '';
        const cells = [1, 2, 'backup', 3];
        cells.forEach((v, i) => {
          const cell = document.createElement('div');
          const isBackup = v === 'backup';
          cell.style.cssText = 'position:absolute;left:' + (4 + i * 23) + '%;top:25%;width:19%;height:50%;border-radius:6px;' +
            (isBackup && hidden ? 'background:rgba(213,245,194,0.39);' : 'background:' + (isBackup ? '#cb5521' : 'rgba(255,255,255,.10') + ';');
          if (isBackup && hidden) {
            const slash = document.createElement('div');
            slash.style.cssText = 'position:absolute;left:50%;top:-12%;width:2px;height:124%;background:rgba(203,85,33,.85;transform:rotate(35deg)';
            cell.appendChild(slash);
            cell.innerHTML += '<div style="position:absolute;left:0;right:0;bottom:4px;text-align:center;color:rgba(213,245,194,.95;font:9px var(--font-body)">隐藏</div>';
          } else if (isBackup) {
            cell.innerHTML = '<div style="position:absolute;left:0;right:0;bottom:4px;text-align:center;color:#ffffff;font:9px var(--font-body)">备用</div>';
          } else {
            cell.innerHTML = '<div style="position:absolute;left:0;right:0;bottom:4px;text-align:center;color:rgba(26,51,0,.6;font:10px var(--font-body)">' + v + '</div>';
          }
          slide.appendChild(cell);
        });
      }
      render();
      btn.onclick = () => { hidden = !hidden; btn.classList.toggle('active', hidden); btn.textContent = hidden ? '显示备用页' : '隐藏备用页'; render(); };
    },

    /* 文字转形状/轮廓化 */
    textOutline(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「转轮廓」把文字变矢量形状</div>
        <div class="demo-row"><button class="demo-btn" id="toToggle">转轮廓</button><button class="demo-btn" id="toRecolor" disabled style="opacity:.5">换渐变色</button></div>
        <div class="mini-slide" id="toSlide"></div>
      </div>`;
      const slide = c.querySelector('#toSlide');
      const btn = c.querySelector('#toToggle');
      const rc = c.querySelector('#toRecolor');
      let outlined = false, grad = false;
      function render() {
        if (!outlined) {
          slide.innerHTML = '<div style="position:absolute;left:18%;top:34%;width:64%;height:32%;border:1px dashed rgba(26,51,0,.5;border-radius:6px;display:grid;place-items:center"><span style="color:rgba(26,51,0,.85;font:600 22px var(--font-body)">标题文字</span></div>';
        } else {
          const col = grad ? 'linear-gradient(90deg,#2f6f3a,#2f6f3a)' : '#2f6f3a';
          slide.innerHTML = '<div style="position:absolute;left:18%;top:34%;width:64%;height:32%;border-radius:6px;display:grid;place-items:center;background:rgba(47,111,58,.08"><span style="font:600 24px var(--font-body);background:' + col + ';-webkit-background-clip:text;background-clip:text;color:transparent">标题文字</span></div>';
        }
      }
      render();
      btn.onclick = () => { outlined = !outlined; btn.classList.toggle('active', outlined); btn.textContent = outlined ? '还原文本' : '转轮廓'; rc.disabled = !outlined; rc.style.opacity = outlined ? '1' : '.5'; render(); };
      rc.onclick = () => { grad = !grad; rc.classList.toggle('active', grad); render(); };
    },

    /* SmartArt 转形状后自由编辑 */
    smartartUngroup(c) {
      function box(x, y, w, h, col, op) {
        return '<div style="position:absolute;left:' + x + '%;top:' + y + '%;width:' + w + '%;height:' + h + '%;background:' + col + ';border-radius:6px;opacity:' + op + '"></div>';
      }
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「转换为形状」释放每个元素</div>
        <div class="demo-row"><button class="demo-btn" id="saToggle">转换为形状</button></div>
        <div class="mini-slide" id="saSlide"></div>
      </div>`;
      const slide = c.querySelector('#saSlide');
      const btn = c.querySelector('#saToggle');
      let ungrouped = false;
      function render() {
        if (!ungrouped) {
          slide.innerHTML = box(10, 32, 22, 16, '#2f6f3a', .85) + box(39, 32, 22, 16, '#2f6f3a', .85) + box(68, 32, 22, 16, '#2f6f3a', .85) +
            box(30, 40, 9, 2, 'rgba(26,51,0,.5', 1) + box(59, 40, 9, 2, 'rgba(26,51,0,.5', 1);
        } else {
          slide.innerHTML = box(8, 28, 20, 15, '#2f6f3a', .9) + box(42, 42, 20, 15, '#2f6f3a', .9) + box(72, 30, 18, 14, '#2f6f3a', .9) +
            '<div style="position:absolute;left:60%;top:54%;width:16%;height:2px;background:rgba(26,51,0,.4;transform:rotate(-32deg)"></div>';
        }
      }
      render();
      btn.onclick = () => { ungrouped = !ungrouped; btn.classList.toggle('active', ungrouped); btn.textContent = ungrouped ? '还原 SmartArt' : '转换为形状'; render(); };
    },

    /* 渐变填充做高级背景/文字（真实图片 + 渐变蒙版） */
    gradientFill(c) {
      const presets = [
        { name: '紫罗兰', c: 'linear-gradient(135deg,#2f6f3a,#2f6f3a)' },
        { name: '蓝紫', c: 'linear-gradient(135deg,#2f6f3a,#2f6f3a)' },
        { name: '青绿', c: 'linear-gradient(135deg,#2f6f3a,#2f6f3a)' }
      ];
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点预设切换背景渐变（真实图片 + 渐变蒙版）</div>
        <div class="demo-row" id="gfBtns"></div>
        <div class="mini-slide" id="gfSlide"></div>
      </div>`;
      const slide = c.querySelector('#gfSlide');
      const row = c.querySelector('#gfBtns');
      let cur = 1;
      function render() {
        const p = presets[cur];
        slide.innerHTML = '<img src="img/tech2.png" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover">' +
          '<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:' + p.c + ';opacity:.6"></div>' +
          '<div style="position:absolute;left:8%;top:40%;width:84%;font:600 22px var(--font-body);color:#ffffff">渐变更高级</div>';
      }
      presets.forEach((p, i) => {
        const b = document.createElement('button');
        b.className = 'demo-btn' + (i === cur ? ' active' : '');
        b.textContent = p.name;
        b.onclick = () => { cur = i; row.querySelectorAll('.demo-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(); };
        row.appendChild(b);
      });
      render();
    },

    /* 段落行距/段距一键优化 */
    paraBreath(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「优化行距」给文字呼吸感</div>
        <div class="demo-row"><button class="demo-btn" id="pbToggle">优化行距</button></div>
        <div class="mini-slide" id="pbSlide"></div>
      </div>`;
      const slide = c.querySelector('#pbSlide');
      const btn = c.querySelector('#pbToggle');
      let airy = false;
      function cramped() {
        return '<div style="position:absolute;left:8%;top:18%;width:84%;height:3%;background:rgba(26,51,0,.5;border-radius:2px"></div>' +
          '<div style="position:absolute;left:8%;top:25%;width:84%;height:3%;background:rgba(26,51,0,.5;border-radius:2px"></div>' +
          '<div style="position:absolute;left:8%;top:32%;width:70%;height:3%;background:rgba(26,51,0,.5;border-radius:2px"></div>' +
          '<div style="position:absolute;left:8%;top:39%;width:84%;height:3%;background:rgba(26,51,0,.5;border-radius:2px"></div>' +
          '<div style="position:absolute;left:8%;top:46%;width:60%;height:3%;background:rgba(26,51,0,.5;border-radius:2px"></div>' +
          '<div style="position:absolute;left:8%;top:53%;width:84%;height:3%;background:rgba(26,51,0,.5;border-radius:2px"></div>';
      }
      function airyLines() {
        return '<div style="position:absolute;left:8%;top:14%;width:84%;height:3.4%;background:rgba(213,245,194,.7;border-radius:2px"></div>' +
          '<div style="position:absolute;left:8%;top:22%;width:84%;height:3.4%;background:rgba(213,245,194,.7;border-radius:2px"></div>' +
          '<div style="position:absolute;left:8%;top:30%;width:70%;height:3.4%;background:rgba(213,245,194,.7;border-radius:2px"></div>' +
          '<div style="position:absolute;left:8%;top:42%;width:84%;height:3.4%;background:rgba(213,245,194,.7;border-radius:2px"></div>' +
          '<div style="position:absolute;left:8%;top:50%;width:60%;height:3.4%;background:rgba(213,245,194,.7;border-radius:2px"></div>' +
          '<div style="position:absolute;left:8%;top:62%;width:84%;height:3.4%;background:rgba(213,245,194,.7;border-radius:2px"></div>';
      }
      slide.innerHTML = cramped();
      btn.onclick = () => { airy = !airy; btn.classList.toggle('active', airy); btn.textContent = airy ? '还原紧凑' : '优化行距'; slide.innerHTML = airy ? airyLines() : cramped(); };
    },

    /* 导出为视频（MP4 自动播放） */
    exportVideo(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「导出为视频」生成可自动播放的 MP4</div>
        <div class="demo-row"><button class="demo-btn" id="evBtn">导出为视频</button></div>
        <div class="mini-slide" id="evSlide"></div>
      </div>`;
      const slide = c.querySelector('#evSlide');
      const btn = c.querySelector('#evBtn');
      function idle() {
        slide.innerHTML = '<div style="position:absolute;left:38%;top:22%;width:24%;height:34%;border-radius:6px;background:rgba(203,85,33,.18;border:1px solid rgba(203,85,33,.5;display:grid;place-items:center;color:#1a3300;font:600 12px var(--font-body)">.pptx</div>';
      }
      function playing() {
        slide.innerHTML = '<div style="position:absolute;left:34%;top:20%;width:32%;height:38%;border-radius:8px;background:linear-gradient(135deg,#2f6f3a,#2f6f3a);border:1px solid rgba(47,111,58,.5;overflow:hidden"><div style="position:absolute;inset:0;display:grid;place-items:center;color:#ffffff;font:600 13px var(--font-body)">▶ 自动播放中</div></div>';
      }
      idle();
      btn.onclick = () => {
        btn.disabled = true; btn.textContent = '渲染中…';
        slide.innerHTML = '<div style="position:absolute;left:20%;top:46%;width:60%;height:8px;border-radius:6px;background:rgba(213,245,194,0.45)"><div id="evBar" style="height:100%;width:0;background:#2f6f3a;border-radius:6px;transition:width 1.6s ease"></div></div>';
        requestAnimationFrame(() => { const bar = slide.querySelector('#evBar'); if (bar) bar.style.width = '100%'; });
        setTimeout(() => { btn.disabled = false; btn.textContent = '重新导出'; playing(); }, 1700);
      };
    },

    /* 黑屏/白屏快捷键 B/W */
    bwBlank(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">放映时点 B / W 制造留白，任意键继续</div>
        <div class="demo-row"><button class="demo-btn" id="bwB">按 B 黑屏</button><button class="demo-btn" id="bwW">按 W 白屏</button><button class="demo-btn" id="bwR">继续放映</button></div>
        <div class="mini-slide" id="bwSlide"></div>
      </div>`;
      const slide = c.querySelector('#bwSlide');
      function show(mode) {
        if (mode === 'black') {
          slide.innerHTML = '<div style="position:absolute;inset:0;background:#1a3300"></div><div style="position:absolute;left:8%;top:44%;width:84%;text-align:center;color:rgba(26,51,0,.7;font:14px var(--font-body)">屏幕已黑 · 任意键继续</div>';
        } else if (mode === 'white') {
          slide.innerHTML = '<div style="position:absolute;inset:0;background:#f1f1f1"></div><div style="position:absolute;left:8%;top:44%;width:84%;text-align:center;color:rgba(47,111,58,.7;font:14px var(--font-body)">屏幕已白 · 任意键继续</div>';
        } else {
          slide.innerHTML = '<img src="img/tech1.png" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;opacity:.6"><div style="position:absolute;left:8%;top:42%;width:84%;color:#ffffff;font:600 14px var(--font-body)">放映中 · 画面正常</div>';
        }
      }
      show('normal');
      c.querySelector('#bwB').onclick = () => show('black');
      c.querySelector('#bwW').onclick = () => show('white');
      c.querySelector('#bwR').onclick = () => show('normal');
    },

    /* PPT 一键导出 Word / 讲义 */
    pptToWord(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「导出为 Word」把幻灯片+备注变成可编辑文档</div>
        <div class="demo-row"><button class="demo-btn" id="pwBtn">导出为 Word</button></div>
        <div class="mini-slide" id="pwSlide"></div>
      </div>`;
      const slide = c.querySelector('#pwSlide');
      const btn = c.querySelector('#pwBtn');
      let done = false;
      function render() {
        slide.innerHTML = done
          ? '<div style="position:absolute;left:30%;top:20%;width:18%;height:26%;background:rgba(47,111,58,.18;border:1px solid rgba(47,111,58,.55;border-radius:6px;display:grid;place-items:center;color:#1a3300;font:11px var(--font-body)">.docx</div>'
            + '<div style="position:absolute;left:52%;top:26%;width:30%;height:30%;background:rgba(213,245,194,.1;border:1px dashed rgba(213,245,194,.5;border-radius:4px"></div>'
            + '<div style="position:absolute;left:52%;top:64%;width:30%;height:3%;background:rgba(213,245,194,.4;border-radius:2px"></div>'
          : '<div style="position:absolute;left:38%;top:22%;width:24%;height:30%;background:rgba(203,85,33,.15;border:1px solid rgba(203,85,33,.5;border-radius:6px;display:grid;place-items:center;color:#1a3300;font:11px var(--font-body)">.pptx</div>'
            + '<div style="position:absolute;left:14%;top:64%;width:72%;height:3%;background:rgba(26,51,0,.3;border-radius:2px"></div>';
      }
      render();
      btn.onclick = () => { done = !done; btn.classList.toggle('active', done); btn.textContent = done ? '还原 PPT' : '导出为 Word'; render(); };
    },

    /* 自动保存 & 恢复未保存 */
    autoRecover(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「模拟崩溃」看如何从自动保存里找回</div>
        <div class="demo-row"><button class="demo-btn" id="arBtn">模拟崩溃</button></div>
        <div class="mini-slide" id="arSlide"></div>
      </div>`;
      const slide = c.querySelector('#arSlide');
      const btn = c.querySelector('#arBtn');
      let crashed = false;
      function render() {
        slide.innerHTML = crashed
          ? '<div style="position:absolute;left:14%;top:18%;width:72%;height:30%;background:rgba(47,111,58,.1;border:1px solid rgba(47,111,58,.5;border-radius:6px;padding:6px 8px;box-sizing:border-box"><div style="color:#1a3300;font:11px var(--font-body)">↻ 自动恢复版本</div><div style="color:rgba(26,51,0,.6;font:10px var(--font-body);margin-top:4px">演示文稿1（10分钟前）</div></div>'
            + '<div style="position:absolute;left:14%;top:54%;width:72%;height:3%;background:rgba(213,245,194,.4;border-radius:2px"></div>'
          : '<div style="position:absolute;left:36%;top:26%;width:28%;height:24%;border-radius:50%;border:3px solid rgba(203,85,33,.6;display:grid;place-items:center;color:#1a3300;font:600 18px var(--font-body)">✕</div>'
            + '<div style="position:absolute;left:24%;top:58%;width:52%;height:3%;background:rgba(26,51,0,.25;border-radius:2px"></div>';
      }
      render();
      btn.onclick = () => { crashed = !crashed; btn.classList.toggle('active', crashed); btn.textContent = crashed ? '恢复正常' : '模拟崩溃'; render(); };
    },

    /* 幻灯片尺寸/比例切换 */
    slideSize(c) {
      const ratio = [
        { n: '4:3', w: 64, h: 78, col: 'rgba(203,85,33,.5' },
        { n: '16:9', w: 84, h: 64, col: 'rgba(47,111,58,.6' }
      ];
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「切换比例」看内容如何自适应铺满</div>
        <div class="demo-row"><button class="demo-btn" id="ssBtn">切换为 16:9</button></div>
        <div class="mini-slide" id="ssSlide"></div>
      </div>`;
      const slide = c.querySelector('#ssSlide');
      const btn = c.querySelector('#ssBtn');
      let wide = false;
      function render() {
        const r = ratio[wide ? 1 : 0];
        slide.innerHTML = '<div style="position:absolute;left:' + (50 - r.w / 2) + '%;top:' + (50 - r.h / 2) + '%;width:' + r.w + '%;height:' + r.h + '%;background:' + r.col + ';border-radius:4px;opacity:.85"></div>'
          + '<div style="position:absolute;left:' + (50 - r.w / 2 + 6) + '%;top:' + (50 - r.h / 2 + 6) + '%;width:' + (r.w - 12) + '%;height:6%;background:rgba(213,245,194,0.55);border-radius:3px"></div>'
          + '<div style="position:absolute;left:6%;top:80%;width:88%;text-align:center;color:rgba(26,51,0,.7;font:11px var(--font-body)">' + r.n + ' · ' + (wide ? '最大化铺满' : '投宽屏被裁') + '</div>';
      }
      render();
      btn.onclick = () => { wide = !wide; btn.classList.toggle('active', wide); btn.textContent = wide ? '切回 4:3' : '切换为 16:9'; render(); };
    },

    /* 屏幕录制 */
    screenRecord(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「开始录制」框选区域录进幻灯片</div>
        <div class="demo-row"><button class="demo-btn" id="srBtn">开始录制</button></div>
        <div class="mini-slide" id="srSlide"></div>
      </div>`;
      const slide = c.querySelector('#srSlide');
      const btn = c.querySelector('#srBtn');
      let rec = false;
      function render() {
        slide.innerHTML = rec
          ? '<div style="position:absolute;left:24%;top:22%;width:52%;height:34%;border-radius:8px;background:linear-gradient(135deg,rgba(47,111,58,.2,rgba(47,111,58,.2);border:1px solid rgba(47,111,58,.5;display:grid;place-items:center;color:#1a3300;font:11px var(--font-body)">● REC 录制中</div>'
          : '<div style="position:absolute;left:24%;top:26%;width:52%;height:30%;border-radius:8px;background:rgba(213,245,194,0.40);border:1px dashed rgba(26,51,0,.35;display:grid;place-items:center;color:rgba(26,51,0,.6;font:11px var(--font-body)">插入 → 屏幕录制</div>';
      }
      render();
      btn.onclick = () => { rec = !rec; btn.classList.toggle('active', rec); btn.textContent = rec ? '停止并落入页面' : '开始录制'; render(); };
    },

    /* 排练计时 */
    rehearse(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「开始排练」模拟逐页计时</div>
        <div class="demo-row"><button class="demo-btn" id="rhBtn">开始排练</button><span id="rhTime" style="color:rgba(26,51,0,.7;font:12px var(--font-body)">0:00</span></div>
        <div class="mini-slide" id="rhSlide"></div>
      </div>`;
      const slide = c.querySelector('#rhSlide');
      const btn = c.querySelector('#rhBtn');
      const tlabel = c.querySelector('#rhTime');
      let t = 0, timer = null;
      function render() {
        tlabel.textContent = '0:' + (t < 10 ? '0' + t : t);
        slide.innerHTML = '<div style="position:absolute;left:30%;top:30%;width:40%;height:36%;border-radius:50%;background:rgba(47,111,58,.12;border:3px solid rgba(47,111,58,.5;display:grid;place-items:center;color:#1a3300;font:600 16px var(--font-body)">' + (timer ? '录制中' : '0:' + (t < 10 ? '0' + t : t)) + '</div>'
          + '<div style="position:absolute;left:14%;top:74%;width:72%;height:4%;background:rgba(213,245,194,.3;border-radius:2px"></div>';
      }
      render();
      btn.onclick = () => {
        if (!timer) {
          btn.classList.add('active'); btn.textContent = '停止';
          timer = reg(setInterval(() => { t++; render(); }, 1000));
        } else {
          clearInterval(timer); const i = __timers.indexOf(timer); if (i >= 0) __timers.splice(i, 1); timer = null;
          btn.classList.remove('active'); btn.textContent = '开始排练'; render();
        }
      };
    },

    /* 打印/导出PDF讲义 */
    printHandout(c) {
      const per = [1, 3, 6];
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">选每页张数，看讲义排版</div>
        <div class="demo-row" id="phBtns"></div>
        <div class="mini-slide" id="phSlide"></div>
      </div>`;
      const slide = c.querySelector('#phSlide');
      const row = c.querySelector('#phBtns');
      let cur = 2;
      function render() {
        const n = per[cur];
        const cols = n <= 1 ? 1 : (n <= 3 ? 1 : 3);
        const rows = Math.ceil(n / cols);
        let html = '';
        for (let i = 0; i < n; i++) {
          const cx = 14 + (i % cols) * (76 / cols);
          const cy = 16 + Math.floor(i / cols) * (68 / rows);
          html += '<div style="position:absolute;left:' + cx + '%;top:' + cy + '%;width:' + (76 / cols - 3) + '%;height:' + (68 / rows - 3) + '%;border:1px solid rgba(213,245,194,.5;border-radius:3px"></div>';
        }
        slide.innerHTML = html + '<div style="position:absolute;left:8%;top:88%;width:84%;text-align:center;color:rgba(213,245,194,.85;font:11px var(--font-body)">一页 ' + n + ' 张 · 带框线</div>';
      }
      per.forEach((p, i) => {
        const b = document.createElement('button');
        b.className = 'demo-btn' + (i === cur ? ' active' : '');
        b.textContent = p + ' 张/页';
        b.onclick = () => { cur = i; row.querySelectorAll('.demo-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(); };
        row.appendChild(b);
      });
      render();
    },

    /* 形状效果：阴影/发光/映像 */
    shapeEffect(c) {
      const fx = [
        { n: '无', s: 'background:#2f6f3a' },
        { n: '阴影', s: 'background:linear-gradient(135deg,#2f6f3a,#2f6f3a);box-shadow:0 14px 30px rgba(47,111,58,.45' },
        { n: '发光', s: 'background:linear-gradient(135deg,#2f6f3a,#2f6f3a);box-shadow:0 0 22px rgba(47,111,58,.75' },
        { n: '映像', s: 'background:linear-gradient(135deg,#2f6f3a,#2f6f3a)' }
      ];
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点效果按钮，看色块质感变化</div>
        <div class="demo-row" id="seBtns"></div>
        <div class="mini-slide" id="seSlide"></div>
      </div>`;
      const slide = c.querySelector('#seSlide');
      const row = c.querySelector('#seBtns');
      let cur = 0;
      function render() {
        const f = fx[cur];
        slide.innerHTML = '<div style="position:absolute;left:34%;top:24%;width:32%;height:34%;border-radius:8px;' + f.s + '"></div>'
          + (f.n === '映像' ? '<div style="position:absolute;left:34%;top:60%;width:32%;height:8%;background:linear-gradient(180deg,rgba(47,111,58,.4,transparent);border-radius:0 0 8px 8px;filter:blur(2px)"></div>' : '')
          + '<div style="position:absolute;left:8%;top:86%;width:84%;text-align:center;color:rgba(26,51,0,.7;font:11px var(--font-body)">效果：' + f.n + '</div>';
      }
      fx.forEach((f, i) => {
        const b = document.createElement('button');
        b.className = 'demo-btn' + (i === cur ? ' active' : '');
        b.textContent = f.n;
        b.onclick = () => { cur = i; row.querySelectorAll('.demo-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(); };
        row.appendChild(b);
      });
      render();
    },

    /* 竖排文字 */
    verticalText(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点「竖排」切换标题文字方向</div>
        <div class="demo-row"><button class="demo-btn" id="vtBtn">竖排</button></div>
        <div class="mini-slide" id="vtSlide"></div>
      </div>`;
      const slide = c.querySelector('#vtSlide');
      const btn = c.querySelector('#vtBtn');
      let vert = false;
      function render() {
        slide.innerHTML = vert
          ? '<div style="position:absolute;left:42%;top:16%;width:16%;height:64%;writing-mode:vertical-rl;text-orientation:upright;display:grid;place-items:center;color:#1a3300;font:600 22px var(--font-body);letter-spacing:4px">年度盛典</div><div style="position:absolute;left:40%;top:16%;width:2px;height:64%;background:rgba(26,51,0,.6"></div>'
          : '<div style="position:absolute;left:20%;top:34%;width:60%;text-align:center;color:rgba(26,51,0,.8;font:600 20px var(--font-body)">年度盛典</div><div style="position:absolute;left:20%;top:54%;width:60%;height:3%;background:rgba(26,51,0,.3;border-radius:2px"></div>';
      }
      render();
      btn.onclick = () => { vert = !vert; btn.classList.toggle('active', vert); btn.textContent = vert ? '横排' : '竖排'; render(); };
    },

    /* 自定义项目符号 */
    customBullet(c) {
      const syms = [
        { n: '默认圆点', s: '●', col: 'rgba(26,51,0,.5' },
        { n: '品牌方块', s: '■', col: 'rgba(47,111,58,.9' },
        { n: '勾选', s: '✓', col: 'rgba(47,111,58,.9' },
        { n: '箭头', s: '➜', col: 'rgba(47,111,58,.9' }
      ];
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">点符号按钮，换列表项目符号</div>
        <div class="demo-row" id="cbBtns"></div>
        <div class="mini-slide" id="cbSlide"></div>
      </div>`;
      const slide = c.querySelector('#cbSlide');
      const row = c.querySelector('#cbBtns');
      let cur = 0;
      function render() {
        const f = syms[cur];
        let html = '';
        const ys = [22, 40, 58];
        ys.forEach(y => {
          html += '<div style="position:absolute;left:18%;top:' + y + '%;width:6%;text-align:center;color:' + f.col + ';font:14px var(--font-body)">' + f.s + '</div>'
            + '<div style="position:absolute;left:28%;top:' + (y + 1) + '%;width:50%;height:3%;background:rgba(26,51,0,.3;border-radius:2px"></div>';
        });
        slide.innerHTML = html;
      }
      syms.forEach((f, i) => {
        const b = document.createElement('button');
        b.className = 'demo-btn' + (i === cur ? ' active' : '');
        b.textContent = f.n;
        b.onclick = () => { cur = i; row.querySelectorAll('.demo-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(); };
        row.appendChild(b);
      });
      render();
    },

    /* 设为默认形状 */
    defaultShape(c) {
      c.innerHTML = `<div class="demo-stack">
        <div class="demo-label">先「设为默认」再插入，看是否自动套用</div>
        <div class="demo-row"><button class="demo-btn" id="dsSet">设为默认形状</button><button class="demo-btn" id="dsAdd">插入新形状</button></div>
        <div class="mini-slide" id="dsSlide"></div>
      </div>`;
      const slide = c.querySelector('#dsSlide');
      const setBtn = c.querySelector('#dsSet');
      const addBtn = c.querySelector('#dsAdd');
      let set = false, count = 0;
      function render() {
        let html = '';
        for (let i = 0; i < count; i++) {
          const x = 16 + i * 22;
          html += '<div style="position:absolute;left:' + x + '%;top:30%;width:18%;height:30%;border-radius:6px;' + (set ? 'background:linear-gradient(135deg,#2f6f3a,#2f6f3a);box-shadow:0 8px 18px rgba(47,111,58,.4' : 'border:1px solid rgba(26,51,0,.4') + '"></div>';
        }
        slide.innerHTML = html + '<div style="position:absolute;left:10%;top:74%;width:80%;text-align:center;color:rgba(26,51,0,.7;font:11px var(--font-body)">' + (set ? '已设为默认 · 新形状自动套用' : '未设默认 · 插入是空心框') + '</div>';
      }
      render();
      setBtn.onclick = () => { set = !set; setBtn.classList.toggle('active', set); setBtn.textContent = set ? '取消默认' : '设为默认形状'; render(); };
      addBtn.onclick = () => { if (count < 3) { count++; render(); } };
    }
  };

  window.DEMOS = DEMOS;
})();
