/* ============================================================
   PPThub — Custom per-term demos
   DEMOS[id](container)   populates the demo-mount element.
   Each demo is bespoke to its term. Styles are inline to keep
   the design system file lean.
   ============================================================ */

const DEMOS = {

  /* ---------- 软件功能 ---------- */
  master(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">改「母版」的强调色 → 所有页面同步更新</div>
        <div class="demo-row">
          <button class="demo-btn active" data-c="#663af3">紫</button>
          <button class="demo-btn" data-c="#027dea">蓝</button>
          <button class="demo-btn" data-c="#269684">绿</button>
          <button class="demo-btn" data-c="#e46d4c">橙</button>
        </div>
        <div class="demo-row" id="mSlides" style="gap:12px"></div>
      </div>`;
    const slides = c.querySelector('#mSlides');
    function render(col) {
      slides.innerHTML = '';
      for (let i = 1; i <= 3; i++) {
        const s = document.createElement('div');
        s.className = 'mini-slide';
        s.style.borderTop = `6px solid ${col}`;
        s.innerHTML = `<div style="position:absolute;top:18%;left:8%;width:50%;height:12%;background:${col};border-radius:4px;opacity:.85"></div>
          <div style="position:absolute;top:42%;left:8%;width:70%;height:6%;background:rgba(255,255,255,.18);border-radius:3px"></div>
          <div style="position:absolute;top:54%;left:8%;width:55%;height:6%;background:rgba(255,255,255,.12);border-radius:3px"></div>
          <div style="position:absolute;bottom:8%;right:8%;font:11px var(--font-mono);color:rgba(255,255,255,.4)">第 ${i} 页</div>`;
        slides.appendChild(s);
      }
    }
    render('#663af3');
    c.querySelectorAll('[data-c]').forEach(b => b.onclick = () => render(b.dataset.c));
  },

  layout(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-l="title">标题幻灯片</button>
          <button class="demo-btn" data-l="content">标题+内容</button>
          <button class="demo-btn" data-l="blank">空白</button>
        </div>
        <div class="mini-slide" id="lySlide"></div>
      </div>`;
    const s = c.querySelector('#lySlide');
    function render(t) {
      if (t === 'title') s.innerHTML = `<div style="position:absolute;top:38%;left:10%;width:80%;height:14%;background:rgba(216,236,248,.85);border-radius:4px"></div><div style="position:absolute;top:56%;left:10%;width:50%;height:7%;background:rgba(199,211,234,.4);border-radius:3px"></div>`;
      else if (t === 'content') s.innerHTML = `<div style="position:absolute;top:10%;left:10%;width:60%;height:10%;background:rgba(216,236,248,.85);border-radius:4px"></div><div style="position:absolute;top:30%;left:10%;width:80%;height:6%;background:rgba(199,211,234,.3);border-radius:3px"></div><div style="position:absolute;top:42%;left:10%;width:80%;height:6%;background:rgba(199,211,234,.3);border-radius:3px"></div><div style="position:absolute;top:54%;left:10%;width:60%;height:6%;background:rgba(199,211,234,.3);border-radius:3px"></div>`;
      else s.innerHTML = `<div style="position:absolute;top:46%;left:46%;color:rgba(199,211,234,.3);font:12px var(--font-mono)">空白版式</div>`;
    }
    render('title');
    c.querySelectorAll('[data-l]').forEach(b => b.onclick = () => render(b.dataset.l));
  },

  placeholder(c) {
    c.innerHTML = `
      <div class="mini-slide" style="display:flex;align-items:center;justify-content:center">
        <div id="phBox" style="width:70%;height:22%;border:2px dashed rgba(186,214,247,.5);border-radius:6px;display:flex;align-items:center;justify-content:center;color:rgba(199,211,234,.6);font:14px var(--font-body);cursor:text">单击此处添加标题</div>
      </div>`;
    const box = c.querySelector('#phBox');
    box.onclick = () => {
      const inp = document.createElement('input');
      inp.value = '';
      inp.placeholder = '输入标题…';
      inp.style.cssText = 'width:90%;background:transparent;border:none;outline:none;color:#fff;font:16px var(--font-body);text-align:center';
      box.replaceWith(inp); inp.focus();
    };
  },

  'animation-pane'(c) {
    const items = ['标题', '副标题', '配图', '数据卡片'];
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" id="apPlay">▶ 播放</button><button class="demo-btn" id="apReset">重置</button></div>
        <div class="demo-row" id="apPane" style="flex-direction:column;gap:8px"></div>
        <div class="mini-slide" id="apStage" style="display:flex;gap:10px;align-items:center;justify-content:center"></div>
      </div>`;
    const pane = c.querySelector('#apPane'), stage = c.querySelector('#apStage');
    items.forEach((t, i) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:10px;font:13px var(--font-body);color:var(--color-moon-mist)';
      row.innerHTML = `<span style="width:20px;height:20px;border-radius:50%;background:rgba(102,58,243,.25);border:1px solid rgba(102,58,243,.5);display:flex;align-items:center;justify-content:center;font:11px var(--font-mono);color:#c9b6ff">${i + 1}</span><span>${t}</span>`;
      pane.appendChild(row);
      const obj = document.createElement('div');
      obj.style.cssText = 'padding:6px 12px;background:rgba(186,214,247,.1);border:1px solid var(--color-glass-edge);border-radius:8px;color:#fff;font:13px var(--font-body);opacity:0;transform:translateY(8px)';
      obj.textContent = t; stage.appendChild(obj);
    });
    const objs = [...stage.children];
    function reset() { objs.forEach(o => { o.style.transition = 'none'; o.style.opacity = 0; o.style.transform = 'translateY(8px)'; }); }
    function play() {
      reset();
      objs.forEach((o, i) => setTimeout(() => { o.style.transition = 'all .4s ease'; o.style.opacity = 1; o.style.transform = 'translateY(0)'; }, i * 450));
    }
    c.querySelector('#apPlay').onclick = play;
    c.querySelector('#apReset').onclick = reset;
  },

  guides(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">拖动滑块移动蓝色方块，靠近中线会自动吸附到参考线</div>
        <input type="range" min="0" max="100" value="20" class="demo-slider" id="gSlide">
        <div class="mini-slide" id="gStage" style="position:relative">
          <div id="gLine" style="position:absolute;top:0;bottom:0;left:50%;width:1px;background:rgba(102,58,243,.5)"></div>
          <div id="gBox" style="position:absolute;top:40%;width:14%;height:20%;background:rgba(102,58,243,.6);border-radius:6px;left:20%;transition:left .05s"></div>
        </div>
      </div>`;
    const slide = c.querySelector('#gSlide'), box = c.querySelector('#gBox');
    function up() {
      let v = +slide.value;
      if (Math.abs(v - 50) < 4) v = 50; // snap
      box.style.left = (v - 7) + '%';
    }
    slide.oninput = up; up();
  },

  eyedropper(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">点任意色块 → 吸取到「当前色」</div>
        <div class="demo-row" id="edSwatches" style="gap:8px"></div>
        <div class="demo-row" style="align-items:center;gap:12px">
          <div id="edCur" style="width:48px;height:48px;border-radius:10px;background:#663af3;border:1px solid var(--color-glass-edge)"></div>
          <div id="edHex" style="font:14px var(--font-mono);color:var(--color-frost-glow)">#663AF3</div>
        </div>
      </div>`;
    const cols = ['#663af3', '#027dea', '#269684', '#e46d4c', '#d8ecf8', '#9da7ba'];
    const sw = c.querySelector('#edSwatches'), cur = c.querySelector('#edCur'), hex = c.querySelector('#edHex');
    cols.forEach(col => {
      const b = document.createElement('div');
      b.style.cssText = `width:40px;height:40px;border-radius:8px;background:${col};cursor:pointer;border:1px solid var(--color-glass-edge)`;
      b.onclick = () => { cur.style.background = col; hex.textContent = col.toUpperCase(); };
      sw.appendChild(b);
    });
  },

  smartart(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-t="list">列表</button>
          <button class="demo-btn" data-t="process">流程</button>
          <button class="demo-btn" data-t="cycle">循环</button>
          <button class="demo-btn" data-t="hier">层次</button>
        </div>
        <div class="mini-slide" id="saBox" style="display:flex;align-items:center;justify-content:center"></div>
      </div>`;
    const box = c.querySelector('#saBox');
    function render(t) {
      if (t === 'list') box.innerHTML = `<div style="display:flex;flex-direction:column;gap:8px;width:60%">${['目标','策略','执行'].map(x=>`<div style="padding:8px 12px;background:rgba(102,58,243,.2);border:1px solid rgba(102,58,243,.5);border-radius:6px;color:#fff;font:13px var(--font-body)">${x}</div>`).join('')}</div>`;
      else if (t === 'process') box.innerHTML = `<div style="display:flex;gap:6px;align-items:center">${['开始','处理','结束'].map((x,i)=>`<div style="padding:8px 10px;background:rgba(2,125,234,.2);border:1px solid rgba(2,125,234,.5);border-radius:6px;color:#fff;font:12px var(--font-body)">${x}</div>${i<2?'<span style="color:rgba(199,211,234,.6)">→</span>':''}`).join('')}</div>`;
      else if (t === 'cycle') box.innerHTML = `<div style="width:90px;height:90px;border-radius:50%;border:3px dashed rgba(38,150,132,.7);display:flex;align-items:center;justify-content:center;color:#7fe3cf;font:12px var(--font-body)">循环</div>`;
      else box.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:8px"><div style="padding:8px 20px;background:rgba(102,58,243,.3);border-radius:6px;color:#fff;font:13px var(--font-body)">总经理</div><div style="display:flex;gap:14px">${['部门A','部门B','部门C'].map(x=>`<div style="padding:6px 10px;background:rgba(186,214,247,.12);border-radius:6px;color:#fff;font:12px var(--font-body)">${x}</div>`).join('')}</div></div>`;
    }
    render('list');
    c.querySelectorAll('[data-t]').forEach(b => b.onclick = () => render(b.dataset.t));
  },

  section(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" id="secToggle">收起「第二章」</button></div>
        <div id="secList" style="display:flex;flex-direction:column;gap:6px;font:13px var(--font-body)"></div>
      </div>`;
    const list = c.querySelector('#secList');
    const data = [
      { sec: '第一章 · 背景', items: ['封面', '问题陈述'] },
      { sec: '第二章 · 方案', items: ['总体思路', '技术架构', '落地计划'], open: true },
      { sec: '第三章 · 总结', items: ['成效', 'Q&A'] }
    ];
    let collapsed = false;
    function render() {
      list.innerHTML = '';
      data.forEach((d, i) => {
        const head = document.createElement('div');
        head.style.cssText = `padding:6px 10px;background:rgba(102,58,243,.18);border:1px solid rgba(102,58,243,.4);border-radius:6px;color:#c9b6ff;font-weight:500`;
        head.textContent = (i === 1 && collapsed ? '▸ ' : '▾ ') + d.sec;
        list.appendChild(head);
        if (!(i === 1 && collapsed)) d.items.forEach(it => {
          const it2 = document.createElement('div');
          it2.style.cssText = 'padding:4px 10px 4px 28px;color:var(--color-moon-mist)';
          it2.textContent = '· ' + it; list.appendChild(it2);
        });
      });
    }
    render();
    c.querySelector('#secToggle').onclick = (e) => { collapsed = !collapsed; e.target.textContent = collapsed ? '展开「第二章」' : '收起「第二章」'; render(); };
  },

  'zoom-loc'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">点目录缩略图 → 跳转并放大该节，可返回</div>
        <div class="demo-row" id="zlMenu" style="gap:10px"></div>
        <div class="mini-slide" id="zlStage" style="display:flex;align-items:center;justify-content:center;overflow:hidden"></div>
      </div>`;
    const menu = c.querySelector('#zlMenu'), stage = c.querySelector('#zlStage');
    const secs = [['背景', '#027dea'], ['方案', '#663af3'], ['总结', '#269684']];
    secs.forEach(([n, col], i) => {
      const t = document.createElement('div');
      t.style.cssText = `flex:1;aspect-ratio:16/9;background:${col}22;border:1px solid ${col}88;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font:13px var(--font-body);cursor:pointer`;
      t.textContent = n;
      t.onclick = () => { stage.style.background = col + '22'; stage.innerHTML = `<div style="text-align:center;color:#fff"><div style="font:24px var(--font-display)">${n}</div><button class="demo-btn" id="zlBack" style="margin-top:10px">← 返回目录</button></div>`;
        stage.querySelector('#zlBack').onclick = reset; };
      menu.appendChild(t);
    });
    function reset() { stage.style.background = 'transparent'; stage.innerHTML = '<div style="color:rgba(199,211,234,.5);font:13px var(--font-body)">← 点上方目录进入对应章节</div>'; }
    reset();
  },

  /* ---------- 设计原则 ---------- */
  alignment(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="off">未对齐</button><button class="demo-btn" data-m="on">左对齐</button></div>
        <div class="demo-row" style="gap:24px">
          <div style="flex:1">
            <div class="demo-label">随意摆放</div>
            <div id="alA" style="margin-top:8px;display:flex;flex-direction:column;gap:8px"></div>
          </div>
          <div style="flex:1">
            <div class="demo-label">共享左边缘</div>
            <div id="alB" style="margin-top:8px;display:flex;flex-direction:column;gap:8px"></div>
          </div>
        </div>
      </div>`;
    const a = c.querySelector('#alA'), b = c.querySelector('#alB');
    const bars = [80, 55, 70, 45];
    function render(m) {
      a.innerHTML = ''; b.innerHTML = '';
      bars.forEach((w, i) => {
        const off = m === 'off' ? (i * 12) : 0;
        const ba = document.createElement('div'); ba.style.cssText = `height:14px;width:${w}%;margin-left:${off}px;background:rgba(199,211,234,.3);border-radius:4px`;
        const bb = document.createElement('div'); bb.style.cssText = `height:14px;width:${w}%;background:rgba(102,58,243,.5);border-radius:4px`;
        a.appendChild(ba); b.appendChild(bb);
      });
    }
    render('off');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  proximity(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="loose">关系混乱</button><button class="demo-btn" data-m="tight">亲密分组</button></div>
        <div class="mini-slide" id="pxStage" style="display:flex;align-items:center;justify-content:center;gap:10px"></div>
      </div>`;
    const s = c.querySelector('#pxStage');
    function render(m) {
      const g1 = (m === 'tight') ? 'gap:6px' : 'gap:30px';
      const g2 = (m === 'tight') ? 'gap:6px' : 'gap:34px';
      const pad = (m === 'tight') ? 'padding:10px' : 'padding:10px';
      s.innerHTML = `<div style="${pad};background:rgba(102,58,243,.12);border:1px solid rgba(102,58,243,.4);border-radius:8px;display:flex;flex-direction:column;${g1}">
          <div style="width:30px;height:10px;background:#c9b6ff;border-radius:3px"></div><div style="width:24px;height:10px;background:#c9b6ff;border-radius:3px"></div></div>
        <div style="${pad};background:rgba(2,125,234,.12);border:1px solid rgba(2,125,234,.4);border-radius:8px;display:flex;flex-direction:column;${g2}">
          <div style="width:30px;height:10px;background:#9ec9ff;border-radius:3px"></div><div style="width:24px;height:10px;background:#9ec9ff;border-radius:3px"></div></div>`;
    }
    render('loose');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  contrast(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="weak">弱对比</button><button class="demo-btn" data-m="strong">强对比</button></div>
        <div class="mini-slide" style="display:flex;align-items:center;justify-content:center;padding:20px" id="ctStage"></div>
      </div>`;
    const s = c.querySelector('#ctStage');
    function render(m) {
      if (m === 'weak') s.innerHTML = `<div style="display:flex;flex-direction:column;gap:10px;align-items:center"><div style="font:18px var(--font-body);color:rgba(199,211,234,.55)">本月营收</div><div style="font:26px var(--font-body);color:rgba(199,211,234,.7)">¥1,280,000</div></div>`;
      else s.innerHTML = `<div style="display:flex;flex-direction:column;gap:10px;align-items:center"><div style="font:14px var(--font-mono);color:var(--color-fog-veil);letter-spacing:.1em">本月营收</div><div style="font:46px var(--font-display);background:var(--gradient-ice-highlight);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent">¥1,280,000</div></div>`;
    }
    render('weak');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  repetition(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-m="free">各页各搞各的</button><button class="demo-btn active" data-m="unified">统一重复元素</button></div>
        <div id="rpDeck" style="display:flex;gap:12px;justify-content:center;align-items:flex-start;flex-wrap:wrap;padding:16px"></div>
        <div class="demo-label" id="rpHint" style="text-align:center"></div>
      </div>`;
    const deck = c.querySelector('#rpDeck');
    const hint = c.querySelector('#rpHint');
    const pages = [
      { title: '市场概况', body: '规模与趋势' },
      { title: '核心策略', body: '三步走打法' },
      { title: '预期收益', body: '一年内翻倍' },
    ];
    const accents = ['#e46d4c', '#269684', '#027dea'];
    const aligns = ['left', 'center', 'right'];
    const bullets = ['●', '▲', '◆'];
    function render(m) {
      const unified = m === 'unified';
      deck.innerHTML = '';
      pages.forEach((p, i) => {
        const accent = unified ? '#663af3' : accents[i];
        const align = unified ? 'left' : aligns[i];
        const bullet = unified ? '■' : bullets[i];
        const barSelf = align === 'center' ? 'center' : (align === 'right' ? 'flex-end' : 'flex-start');
        const page = document.createElement('div');
        page.style.cssText = 'width:132px;height:98px;border-radius:8px;background:rgba(255,255,255,.04);border:1px solid var(--color-glass-edge);padding:10px;display:flex;flex-direction:column;gap:6px;overflow:hidden;transition:all .3s ease';
        page.innerHTML = `
          <div style="height:6px;width:${unified ? '100%' : (45 + i * 18) + '%'};background:${accent};border-radius:3px;align-self:${barSelf};transition:all .3s ease"></div>
          <div style="font:13px var(--font-display);color:var(--color-ice-highlight);text-align:${align}">${p.title}</div>
          <div style="font:10px var(--font-body);color:var(--color-moon-mist);text-align:${align}"><span style="color:${accent}">${bullet}</span> ${p.body}</div>
          <div style="margin-top:auto;font:9px var(--font-mono);color:var(--color-fog-veil);text-align:${unified ? 'right' : aligns[i]}">0${i + 1}</div>`;
        deck.appendChild(page);
      });
      hint.textContent = unified
        ? '同色标题条 + 同款项目符号 + 统一页码位置 → 三页像一家人'
        : '每页配色、排版、符号各不相同 → 像三个人各做各的';
    }
    render('unified');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  hierarchy(c) {
    c.innerHTML = `
      <div class="mini-slide" style="display:flex;flex-direction:column;justify-content:center;gap:14px;padding:24px">
        <div style="font:40px var(--font-display);color:var(--color-ice-highlight)">主标题：增长靠这三步</div>
        <div style="font:20px var(--font-body);color:var(--color-frost-glow)">副标题：一套可复制的方法论</div>
        <div style="font:14px var(--font-body);color:var(--color-moon-mist);max-width:80%">正文：先定位人群，再做内容分层，最后用数据回流优化。每一级字号、颜色都按主次递减，眼睛自然顺着读。</div>
      </div>`;
  },

  whitespace(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="dense">拥挤</button><button class="demo-btn" data-m="air">留白</button></div>
        <div id="wsStage" class="mini-slide" style="display:flex;flex-direction:column;justify-content:center;padding:8px"></div>
      </div>`;
    const s = c.querySelector('#wsStage');
    function render(m) {
      const p = m === 'air' ? '28px' : '8px';
      s.style.padding = p;
      s.innerHTML = `<div style="font:22px var(--font-display);color:var(--color-ice-highlight)">一句话讲清价值</div><div style="font:14px var(--font-body);color:var(--color-moon-mist)">四周的空白，是让这句话显得重要的空间。</div>`;
    }
    render('dense');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  focus(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="off">平铺</button><button class="demo-btn" data-m="on">聚光</button></div>
        <div class="mini-slide" id="fcStage" style="display:flex;align-items:center;justify-content:center;gap:14px;padding:16px"></div>
      </div>`;
    const s = c.querySelector('#fcStage');
    function render(m) {
      const cards = ['A', 'B', 'C'];
      s.innerHTML = '';
      cards.forEach((t, i) => {
        const dim = (m === 'on' && i !== 1);
        const d = document.createElement('div');
        d.style.cssText = `width:60px;height:60px;border-radius:12px;display:flex;align-items:center;justify-content:center;font:20px var(--font-display);transition:all .3s;${dim ? 'background:rgba(186,214,247,.05);color:rgba(199,211,234,.3);filter:blur(1px)' : 'background:rgba(102,58,243,.4);color:#fff;box-shadow:0 0 18px rgba(102,58,243,.5)'}`;
        d.textContent = t; s.appendChild(d);
      });
    }
    render('off');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  grid(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="off">无栅格</button><button class="demo-btn" data-m="on">显示栅格</button></div>
        <div class="mini-slide" id="grStage" style="position:relative">
          <div id="grLines" style="position:absolute;inset:0;background-image:linear-gradient(rgba(186,214,247,.18) 1px,transparent 1px),linear-gradient(90deg,rgba(186,214,247,.18) 1px,transparent 1px);background-size:25% 25%;display:none"></div>
          <div style="position:absolute;top:25%;left:25%;width:25%;height:25%;background:rgba(102,58,243,.5);border-radius:6px"></div>
          <div style="position:absolute;top:25%;left:50%;width:25%;height:25%;background:rgba(2,125,234,.5);border-radius:6px"></div>
          <div style="position:absolute;top:50%;left:25%;width:25%;height:25%;background:rgba(38,150,132,.5);border-radius:6px"></div>
        </div>
      </div>`;
    const lines = c.querySelector('#grLines');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { lines.style.display = btn.dataset.m === 'on' ? 'block' : 'none'; });
  },

  /* ---------- 字体与配色 ---------- */
  'serif-sans'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-f="serif">衬线</button><button class="demo-btn active" data-f="sans">无衬线</button></div>
        <div id="ssBox" style="font:34px var(--font-display);color:var(--color-ice-highlight);text-align:center;padding:20px 0">字体的气质</div>
      </div>`;
    const box = c.querySelector('#ssBox');
    c.querySelectorAll('[data-f]').forEach(b => b.onclick = () => {
      box.style.fontFamily = b.dataset.f === 'serif' ? 'var(--font-serif)' : 'var(--font-display)';
    });
  },

  'type-scale'(c) {
    c.innerHTML = `<div style="display:flex;flex-direction:column;gap:10px;padding:8px 4px">
      ${[['显示 48', 48, 500], ['标题 36', 36, 500], ['副标 24', 24, 400], ['正文 16', 16, 400], ['注释 12', 12, 400]].map(([t, s, w]) => `<div style="font:${w} ${s}px var(--font-body);color:var(--color-frost-glow)">${t}</div>`).join('')}
    </div>`;
  },

  'font-weight'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-w="400">常规 400</button><button class="demo-btn" data-w="700">粗体 700</button></div>
        <div id="fwBox" style="font:32px var(--font-body);color:var(--color-ice-highlight);text-align:center;padding:18px 0;font-weight:400">关键结论加粗更醒目</div>
      </div>`;
    const box = c.querySelector('#fwBox');
    c.querySelectorAll('[data-w]').forEach(b => b.onclick = () => box.style.fontWeight = b.dataset.w);
  },

  tracking(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">拖动调节字间距</div>
        <input type="range" min="-4" max="8" value="0" class="demo-slider" id="tkSlide">
        <div id="tkBox" style="font:30px var(--font-display);color:var(--color-ice-highlight);text-align:center;padding:14px 0;letter-spacing:0px">PPT HUB</div>
      </div>`;
    const slide = c.querySelector('#tkSlide'), box = c.querySelector('#tkBox');
    slide.oninput = () => box.style.letterSpacing = slide.value + 'px';
  },

  analogous(c) {
    c.innerHTML = `<div class="demo-stack">
      <div class="demo-label">色环相邻：蓝 → 蓝绿 → 绿，天生协调</div>
      <div style="display:flex;height:80px;border-radius:10px;overflow:hidden">
        <div style="flex:1;background:#2f6df0"></div><div style="flex:1;background:#2f9df0"></div><div style="flex:1;background:#2fc9e0"></div><div style="flex:1;background:#2fd98a"></div>
      </div></div>`;
  },

  complementary(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">正对面：蓝 vs 橙，互相提亮</div>
        <div style="display:flex;height:90px;border-radius:10px;overflow:hidden">
          <div style="flex:1;background:#027dea;display:flex;align-items:center;justify-content:center;color:#fff;font:14px var(--font-body)">背景</div>
          <div style="flex:0 0 90px;background:#e46d4c;display:flex;align-items:center;justify-content:center;color:#fff;font:13px var(--font-body);box-shadow:0 0 20px rgba(228,109,76,.6)">CTA</div>
        </div></div>`;
  },

  'tri-color'(c) {
    c.innerHTML = `<div class="demo-stack">
      <div class="demo-label">60-30-10：主色 60% · 辅色 30% · 点缀 10%</div>
      <div style="display:flex;flex-direction:column;border-radius:10px;overflow:hidden;border:1px solid var(--color-glass-edge)">
        <div style="height:120px;background:#0e1530;display:flex;align-items:center;justify-content:center;color:rgba(199,211,234,.7);font:13px var(--font-body)">主色 60%</div>
        <div style="display:flex;height:60px"><div style="flex:1;background:#2f343e;display:flex;align-items:center;justify-content:center;color:#c7d3ea;font:12px var(--font-body)">辅色 30%</div><div style="flex:0 0 30px;background:#e46d4c;display:flex;align-items:center;justify-content:center;color:#fff;font:11px var(--font-body)">10%</div></div>
      </div></div>`;
  },

  gradient(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <input type="color" value="#663af3" id="gA" style="width:36px;height:30px;background:none;border:1px solid var(--color-glass-edge);border-radius:6px">
          <input type="color" value="#027dea" id="gB" style="width:36px;height:30px;background:none;border:1px solid var(--color-glass-edge);border-radius:6px">
          <button class="demo-btn active" data-d="0">纵向</button><button class="demo-btn" data-d="90">横向</button>
        </div>
        <div id="gBox" style="height:110px;border-radius:10px;background:linear-gradient(0deg,#663af3,#027dea)"></div>
      </div>`;
    const a = c.querySelector('#gA'), b = c.querySelector('#gB'), box = c.querySelector('#gBox');
    let dir = 0;
    function up() { box.style.background = `linear-gradient(${dir}deg, ${a.value}, ${b.value})`; }
    a.oninput = up; b.oninput = up;
    c.querySelectorAll('[data-d]').forEach(btn => btn.onclick = () => { dir = +btn.dataset.d; up(); });
  },

  /* ---------- 动画与切换 ---------- */
  'anim-type'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn" data-t="enter">进入·淡入</button>
          <button class="demo-btn" data-t="exit">退出·淡出</button>
          <button class="demo-btn" data-t="emph">强调·脉冲</button>
        </div>
        <div class="mini-slide" style="display:flex;align-items:center;justify-content:center">
          <div id="atBox" style="padding:14px 22px;background:rgba(102,58,243,.5);border-radius:10px;color:#fff;font:15px var(--font-body)">我是一个对象</div>
        </div>
      </div>`;
    const box = c.querySelector('#atBox');
    c.querySelectorAll('[data-t]').forEach(btn => btn.onclick = () => {
      const t = btn.dataset.t;
      box.style.transition = 'none';
      if (t === 'enter') { box.style.opacity = 0; box.style.transform = 'translateY(12px)'; requestAnimationFrame(() => { box.style.transition = 'all .5s ease'; box.style.opacity = 1; box.style.transform = 'none'; }); }
      else if (t === 'exit') { box.style.transition = 'all .5s ease'; box.style.opacity = 0; box.style.transform = 'scale(.8)'; setTimeout(() => { box.style.opacity = 1; box.style.transform = 'none'; }, 700); }
      else { box.style.transition = 'transform .3s ease'; box.style.transform = 'scale(1.18)'; setTimeout(() => box.style.transform = 'scale(1)', 320); }
    });
  },

  'smooth-vs-abrupt'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-t="smooth">淡入（平滑）</button><button class="demo-btn" data-t="abrupt">出现（突然）</button></div>
        <div class="mini-slide" style="display:flex;gap:16px;align-items:center;justify-content:center">
          <div id="smBox" style="padding:14px 20px;background:rgba(2,125,234,.5);border-radius:10px;color:#fff;font:14px var(--font-body);opacity:1">我</div>
          <div id="abBox" style="padding:14px 20px;background:rgba(38,150,132,.5);border-radius:10px;color:#fff;font:14px var(--font-body);opacity:1">我</div>
        </div>
      </div>`;
    const sm = c.querySelector('#smBox'), ab = c.querySelector('#abBox');
    c.querySelectorAll('[data-t]').forEach(btn => btn.onclick = () => {
      if (btn.dataset.t === 'smooth') {
        // 先隐藏，再平滑淡入 —— 让用户看到「渐变出现」的过程
        sm.style.transition = 'none'; sm.style.opacity = 0;
        requestAnimationFrame(() => requestAnimationFrame(() => { sm.style.transition = 'opacity .8s ease'; sm.style.opacity = 1; }));
      } else {
        // 瞬间出现 —— 无过渡，直接可见
        ab.style.transition = 'none'; ab.style.opacity = 0;
        requestAnimationFrame(() => { ab.style.transition = 'none'; ab.style.opacity = 1; });
      }
    });
  },

  easing(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-e="linear">匀速</button><button class="demo-btn" data-e="ease">缓出</button></div>
        <div style="position:relative;height:40px;background:rgba(186,214,247,.05);border-radius:8px;margin-top:6px">
          <div id="ezA" style="position:absolute;top:10px;left:4px;width:20px;height:20px;border-radius:50%;background:#027dea"></div>
        </div>
        <div style="position:relative;height:40px;background:rgba(186,214,247,.05);border-radius:8px">
          <div id="ezB" style="position:absolute;top:10px;left:4px;width:20px;height:20px;border-radius:50%;background:#663af3"></div>
        </div>
      </div>`;
    const a = c.querySelector('#ezA'), b = c.querySelector('#ezB');
    c.querySelectorAll('[data-e]').forEach(btn => btn.onclick = () => {
      const e = btn.dataset.e === 'linear' ? 'linear' : 'cubic-bezier(.22,1,.36,1)';
      [a, b].forEach(d => { d.style.transition = 'none'; d.style.left = '4px'; });
      requestAnimationFrame(() => { a.style.transition = `left .9s linear`; a.style.left = 'calc(100% - 24px)'; b.style.transition = `left .9s ${e}`; b.style.left = 'calc(100% - 24px)'; });
    });
  },

  trigger(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-t="click">单击开始</button><button class="demo-btn" data-t="with">与上一同时</button><button class="demo-btn" data-t="after">上一之后</button></div>
        <div class="mini-slide" style="display:flex;gap:12px;align-items:center;justify-content:center">
          <div class="tg" style="padding:10px 16px;background:rgba(102,58,243,.4);border-radius:8px;color:#fff;font:13px var(--font-body);opacity:.25">A</div>
          <div class="tg" style="padding:10px 16px;background:rgba(2,125,234,.4);border-radius:8px;color:#fff;font:13px var(--font-body);opacity:.25">B</div>
          <div class="tg" style="padding:10px 16px;background:rgba(38,150,132,.4);border-radius:8px;color:#fff;font:13px var(--font-body);opacity:.25">C</div>
        </div>
      </div>`;
    const objs = [...c.querySelectorAll('.tg')];
    c.querySelectorAll('[data-t]').forEach(btn => btn.onclick = () => {
      const t = btn.dataset.t;
      objs.forEach(o => { o.style.transition = 'none'; o.style.opacity = .25; });
      if (t === 'click') objs.forEach((o, i) => setTimeout(() => { o.style.transition = 'opacity .3s'; o.style.opacity = 1; }, i * 400));
      else if (t === 'with') objs.forEach(o => { o.style.transition = 'opacity .3s'; o.style.opacity = 1; });
      else objs.forEach((o, i) => setTimeout(() => { o.style.transition = 'opacity .3s'; o.style.opacity = 1; }, i * 350));
    });
  },

  'transition-fx'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-f="fade">淡变</button><button class="demo-btn" data-f="push">推入</button><button class="demo-btn" data-f="wipe">擦除</button></div>
        <div class="mini-slide" id="tfStage" style="position:relative;overflow:hidden">
          <div class="tfPage" style="position:absolute;inset:0;background:#027dea;display:flex;align-items:center;justify-content:center;color:#fff;font:18px var(--font-body)">页面 1</div>
          <div class="tfPage" style="position:absolute;inset:0;background:#663af3;display:flex;align-items:center;justify-content:center;color:#fff;font:18px var(--font-body);opacity:0">页面 2</div>
        </div>
      </div>`;
    const pages = [...c.querySelectorAll('.tfPage')];
    let on = 0;
    c.querySelectorAll('[data-f]').forEach(btn => btn.onclick = () => {
      const f = btn.dataset.f;
      const nx = (on + 1) % 2;
      const cur = pages[on], nxt = pages[nx];
      nxt.style.transition = 'none'; nxt.style.opacity = 1; nxt.style.transform = f === 'push' ? 'translateX(100%)' : f === 'wipe' ? 'translateX(-100%)' : 'none';
      requestAnimationFrame(() => {
        const tf = f === 'push' ? 'transform .5s ease' : f === 'wipe' ? 'transform .5s ease' : 'opacity .5s ease';
        nxt.style.transition = tf; nxt.style.transform = 'none';
        cur.style.transition = tf;
        if (f === 'fade') cur.style.opacity = 0; else cur.style.transform = f === 'push' ? 'translateX(-100%)' : 'translateX(100%)';
      });
      on = nx;
    });
  },

  timeline(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">拖动时间轴，看对象按错峰顺序出现</div>
        <input type="range" min="0" max="100" value="0" class="demo-slider" id="tlSlide">
        <div class="mini-slide" style="display:flex;gap:10px;align-items:center;justify-content:center;position:relative">
          ${['标题','配图','数据'].map((t,i)=>`<div class="tlObj" data-at="${i*30}" style="padding:10px 14px;background:rgba(102,58,243,.4);border-radius:8px;color:#fff;font:13px var(--font-body);opacity:.2">${t}</div>`).join('')}
        </div>
      </div>`;
    const slide = c.querySelector('#tlSlide'), objs = [...c.querySelectorAll('.tlObj')];
    slide.oninput = () => {
      const t = +slide.value;
      objs.forEach(o => { o.style.opacity = (+o.dataset.at <= t) ? 1 : .2; });
    };
  },

  /* ---------- 排版与布局 ---------- */
  'golden-ratio'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">黄金分割 ≈ 1.618（图 : 文）</div>
        <div style="display:flex;height:120px;border-radius:10px;overflow:hidden;border:1px solid var(--color-glass-edge)">
          <div style="flex:1.618;background:linear-gradient(135deg,#1b2347,#27345f);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.85);font:13px var(--font-body)">图 61.8%</div>
          <div style="flex:1;background:rgba(186,214,247,.06);display:flex;align-items:center;justify-content:center;color:var(--color-moon-mist);font:13px var(--font-body)">文 38.2%</div>
        </div>
      </div>`;
  },

  'rule-of-thirds'(c) {
    c.innerHTML = `
      <div class="mini-slide" style="position:relative">
        <div style="position:absolute;inset:0;background:linear-gradient(135deg,#22304f,#33476f)"></div>
        <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.25) 1px,transparent 1px);background-size:33.33% 33.33%;background-position:center"></div>
        <div style="position:absolute;top:66%;left:66%;transform:translate(-50%,-50%);width:26%;height:30%;border-radius:8px;background:rgba(228,109,76,.85);display:flex;align-items:center;justify-content:center;color:#fff;font:12px var(--font-body)">主体放交点</div>
      </div>`;
  },

  'f-pattern'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <button class="demo-btn" id="fpPlay">▶ 模拟视线</button>
        <div id="fpBox" style="font:14px/1.8 var(--font-body);color:var(--color-moon-mist)">
          <div data-line>第一横：标题与顶部导航最被关注</div>
          <div data-line>第二横：副标题与关键句被略读</div>
          <div data-line>左侧竖：剩余内容沿左边垂直扫读</div>
          <div data-line>右下角信息往往被忽略，慎放重点</div>
        </div>
      </div>`;
    const lines = [...c.querySelectorAll('[data-line]')];
    c.querySelector('#fpPlay').onclick = () => {
      lines.forEach(l => l.style.background = 'transparent');
      lines.forEach((l, i) => setTimeout(() => { l.style.transition = 'background .4s'; l.style.background = 'rgba(102,58,243,.2)'; }, i * 500));
    };
  },

  'center-sym'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="center">居中对称</button><button class="demo-btn" data-m="left">左对齐</button></div>
        <div id="csStage" class="mini-slide" style="display:flex;flex-direction:column;justify-content:center;gap:10px;padding:20px"></div>
      </div>`;
    const s = c.querySelector('#csStage');
    function render(m) {
      const isCenter = m === 'center';
      s.style.alignItems = isCenter ? 'center' : 'flex-start';
      s.style.textAlign = isCenter ? 'center' : 'left';
      s.innerHTML = `<div style="font:24px var(--font-display);color:var(--color-ice-highlight);width:100%">对称之美</div><div style="font:14px var(--font-body);color:var(--color-moon-mist);width:100%">庄重 · 平衡 · 仪式感</div><div style="width:40px;height:3px;background:#663af3;border-radius:2px"></div>`;
    }
    render('center');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  margin(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">拖动调节页边距</div>
        <input type="range" min="2" max="20" value="4" class="demo-slider" id="mgSlide">
        <div class="mini-slide" id="mgStage" style="background:linear-gradient(135deg,#1b2347,#27345f)">
          <div id="mgInner" style="position:absolute;inset:4%;background:rgba(255,255,255,.08);border-radius:6px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.8);font:13px var(--font-body)">内容区</div>
        </div>
      </div>`;
    const slide = c.querySelector('#mgSlide'), inner = c.querySelector('#mgInner');
    slide.oninput = () => { const v = slide.value + '%'; inner.style.inset = v; };
  },

  column(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">拖动调节正文栏宽（每行字数）</div>
        <input type="range" min="40" max="100" value="100" class="demo-slider" id="clSlide">
        <div id="clBox" style="font:14px/1.7 var(--font-body);color:var(--color-moon-mist);max-width:100%">正文栏宽过宽，眼睛换行容易丢失行首；过窄则频繁换行显得破碎。中文正文建议每行 30–40 字，配合栅格定栏宽最稳妥，阅读体验明显更舒适。</div>
      </div>`;
    const slide = c.querySelector('#clSlide'), box = c.querySelector('#clBox');
    slide.oninput = () => box.style.maxWidth = slide.value + '%';
  },

  /* ---------- 效率与技巧 ---------- */
  'format-painter'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">先点「源样式」，再点目标框，样式被刷过去</div>
        <div class="demo-row" style="gap:12px;align-items:stretch">
          <div id="fpSrc" style="flex:1;padding:14px;background:rgba(102,58,243,.5);border:2px solid #8a6bff;border-radius:10px;color:#fff;font:13px var(--font-body);cursor:pointer">源样式（点我）</div>
          <div class="fpTgt" style="flex:1;padding:14px;background:rgba(186,214,247,.06);border:2px solid var(--color-glass-edge);border-radius:10px;color:var(--color-moon-mist);font:13px var(--font-body);cursor:pointer">目标 A</div>
          <div class="fpTgt" style="flex:1;padding:14px;background:rgba(186,214,247,.06);border:2px solid var(--color-glass-edge);border-radius:10px;color:var(--color-moon-mist);font:13px var(--font-body);cursor:pointer">目标 B</div>
        </div>
      </div>`;
    const src = c.querySelector('#fpSrc'); let armed = false;
    src.onclick = () => { armed = true; src.style.outline = '2px dashed #fff'; };
    c.querySelectorAll('.fpTgt').forEach(t => t.onclick = () => {
      if (!armed) return;
      t.style.background = 'rgba(102,58,243,.5)'; t.style.borderColor = '#8a6bff'; t.style.color = '#fff'; armed = false; src.style.outline = 'none';
    });
  },

  shortcut(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">模拟按键（也可在键盘按 D / G）</div>
        <div class="demo-row" style="gap:10px">
          <div class="scKey" data-k="d" style="padding:10px 14px;background:rgba(186,214,247,.06);border:1px solid var(--color-glass-edge);border-radius:8px;font:13px var(--font-mono);color:var(--color-frost-glow)">Ctrl + D 复制</div>
          <div class="scKey" data-k="g" style="padding:10px 14px;background:rgba(186,214,247,.06);border:1px solid var(--color-glass-edge);border-radius:8px;font:13px var(--font-mono);color:var(--color-frost-glow)">Ctrl + G 成组</div>
        </div>
        <div id="scStage" class="mini-slide" style="display:flex;gap:10px;align-items:center;justify-content:center"><div style="padding:10px 14px;background:rgba(102,58,243,.4);border-radius:8px;color:#fff;font:13px var(--font-body)">原对象</div></div>
      </div>`;
    const stage = c.querySelector('#scStage');
    function flash(k) {
      const key = c.querySelector(`[data-k="${k}"]`); if (!key) return;
      key.style.background = 'rgba(102,58,243,.4)'; key.style.borderColor = '#8a6bff';
      setTimeout(() => { key.style.background = 'rgba(186,214,247,.06)'; key.style.borderColor = 'var(--color-glass-edge)'; }, 250);
      const d = document.createElement('div'); d.style.cssText = 'padding:10px 14px;background:rgba(102,58,243,.4);border-radius:8px;color:#fff;font:13px var(--font-body)'; d.textContent = k === 'd' ? '副本' : '成组'; stage.appendChild(d);
    }
    c.querySelectorAll('.scKey').forEach(k => k.onclick = () => flash(k.dataset.k));
    const handler = (e) => { if (e.key === 'd') flash('d'); if (e.key === 'g') flash('g'); };
    document.addEventListener('keydown', handler);
    window.__scHandler = handler;
  },

  distribute(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="uneven">不均匀</button><button class="demo-btn" data-m="even">横向分布</button></div>
        <div class="mini-slide" id="dsStage" style="display:flex;align-items:center"></div>
      </div>`;
    const s = c.querySelector('#dsStage');
    function render(m) {
      s.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;width:92%;align-items:center;flex-wrap:nowrap';
      const boxes = [0, 1, 2, 3].map(() => {
        const d = document.createElement('div');
        d.style.cssText = 'width:34px;height:34px;border-radius:8px;background:linear-gradient(135deg,#663af3,#027dea);flex:0 0 auto';
        return d;
      });
      if (m === 'even') {
        wrap.style.justifyContent = 'space-between';
      } else {
        wrap.style.justifyContent = 'flex-start';
        const gaps = [16, 68, 26]; // 不均匀的水平间距（px）
        boxes.forEach((d, i) => { if (i > 0) d.style.marginLeft = gaps[i - 1] + 'px'; });
      }
      boxes.forEach(d => wrap.appendChild(d));
      s.appendChild(wrap);
    }
    render('uneven');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  'color-reuse'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">改「主题色」→ 所有引用处同步变</div>
        <div class="demo-row">
          <button class="demo-btn active" data-c="#663af3">紫主题</button>
          <button class="demo-btn" data-c="#027dea">蓝主题</button>
          <button class="demo-btn" data-c="#269684">绿主题</button>
        </div>
        <div class="mini-slide" id="crStage" style="display:flex;gap:12px;align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#crStage');
    function render(col) {
      s.innerHTML = `<div style="padding:12px 18px;background:${col};border-radius:8px;color:#fff;font:13px var(--font-body)">标题</div>
        <div style="width:40px;height:40px;border-radius:50%;background:${col}"></div>
        <div style="padding:8px 14px;background:${col}33;border:1px solid ${col};border-radius:999px;color:#fff;font:12px var(--font-body)">按钮</div>`;
    }
    render('#663af3');
    c.querySelectorAll('[data-c]').forEach(b => b.onclick = () => render(b.dataset.c));
  },

  'vector-vs-raster'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">拖动放大 —— 矢量清晰 / 位图糊</div>
        <input type="range" min="100" max="300" value="100" class="demo-slider" id="vrSlide">
        <div class="demo-row" style="gap:16px">
          <div style="flex:1;text-align:center"><div class="demo-label">矢量图标</div><svg id="vrVec" viewBox="0 0 50 50" style="width:100%;max-width:120px"><circle cx="25" cy="25" r="20" fill="none" stroke="#663af3" stroke-width="3"/><path d="M18 25 l5 5 l10 -12" fill="none" stroke="#663af3" stroke-width="3"/></svg></div>
          <div style="flex:1;text-align:center"><div class="demo-label">位图照片</div><div id="vrRas" style="width:100%;max-width:120px;aspect-ratio:1;margin:0 auto;background:repeating-conic-gradient(#445 0% 25%, #223 0% 50%);background-size:10px 10px;border-radius:6px"></div></div>
        </div>
      </div>`;
    const slide = c.querySelector('#vrSlide'), vec = c.querySelector('#vrVec'), ras = c.querySelector('#vrRas');
    slide.oninput = () => {
      const sc = slide.value / 100;
      vec.style.transform = `scale(${sc})`; vec.style.transformOrigin = 'center';
      ras.style.backgroundSize = (10 * sc) + 'px ' + (10 * sc) + 'px';
    };
  },

  compress(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">拖动「质量」→ 体积与画质此消彼长</div>
        <input type="range" min="10" max="100" value="100" class="demo-slider" id="cpSlide">
        <div class="demo-row" style="justify-content:space-between">
          <div id="cpSize" style="font:14px var(--font-mono);color:var(--color-frost-glow)">8.0 MB</div>
          <div id="cpBar" style="flex:1;height:10px;margin:0 12px;background:rgba(186,214,247,.1);border-radius:5px;overflow:hidden"><div id="cpFill" style="height:100%;width:100%;background:linear-gradient(90deg,#663af3,#027dea)"></div></div>
          <div id="cpQ" style="font:13px var(--font-body);color:var(--color-moon-mist)">原画质</div>
        </div>
      </div>`;
    const slide = c.querySelector('#cpSlide'), size = c.querySelector('#cpSize'), fill = c.querySelector('#cpFill'), q = c.querySelector('#cpQ');
    slide.oninput = () => {
      const v = +slide.value, mb = (8 * v / 100).toFixed(1);
      size.textContent = mb + ' MB'; fill.style.width = v + '%';
      q.textContent = v >= 90 ? '原画质' : v >= 50 ? '高' : v >= 25 ? '中' : '低（但够用）';
    };
  },

  /* ---------- 图形与图示 ---------- */
  'boolean'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-op="union">联合</button>
          <button class="demo-btn" data-op="combine">组合</button>
          <button class="demo-btn" data-op="split">拆分</button>
          <button class="demo-btn" data-op="intersect">相交</button>
          <button class="demo-btn" data-op="subtract">减除</button>
        </div>
        <svg viewBox="0 0 200 120" style="width:100%;height:160px">
          <defs>
            <clipPath id="smCA"><circle cx="85" cy="60" r="40"/></clipPath>
            <clipPath id="smCB"><rect x="95" y="30" width="60" height="60" rx="8"/></clipPath>
            <mask id="smMask"><rect x="0" y="0" width="200" height="120" fill="white"/><rect x="95" y="30" width="60" height="60" rx="8" fill="black"/></mask>
            <mask id="smMaskA"><rect x="0" y="0" width="200" height="120" fill="white"/><circle cx="85" cy="60" r="40" fill="black"/></mask>
          </defs>
          <g id="smRes" fill="#663af3" stroke="rgba(186,214,247,.45)" stroke-width="1.5"></g>
        </svg>
      </div>`;
    const g = c.querySelector('#smRes');
    const ops = {
      // 联合：圆 + 矩 合并为单一实心，无内部描边 → 合为一体
      union: '<g fill="#663af3" stroke="none"><circle cx="85" cy="60" r="40"/><rect x="95" y="30" width="60" height="60" rx="8"/></g>',
      // 组合：并集但重叠区挖空（evenodd 使重叠变透明洞）
      combine: '<g fill-rule="evenodd"><circle cx="85" cy="60" r="40"/><rect x="95" y="30" width="60" height="60" rx="8"/></g>',
      // 拆分：拆成 3 个独立碎片（圆独有 / 矩独有 / 重叠透镜），错开+三色区分
      split: '<g transform="translate(-15,0)"><circle cx="85" cy="60" r="40" mask="url(#smMask)" fill="#663af3"/></g>'
           + '<g transform="translate(15,0)"><rect x="95" y="30" width="60" height="60" rx="8" mask="url(#smMaskA)" fill="#027dea"/></g>'
           + '<g transform="translate(0,18)" clip-path="url(#smCB)"><rect x="0" y="0" width="200" height="120" clip-path="url(#smCA)" fill="#8a6bff"/></g>',
      // 相交：圆 ∩ 矩 = 重叠透镜区 → 嵌套 clip
      intersect: '<g clip-path="url(#smCB)"><rect x="0" y="0" width="200" height="120" clip-path="url(#smCA)"/></g>',
      // 减除：圆 减去 矩 → 用 mask 抠掉矩形区域
      subtract: '<circle cx="85" cy="60" r="40" mask="url(#smMask)"/>'
    };
    g.innerHTML = ops.union;
    c.querySelectorAll('[data-op]').forEach(b => b.onclick = () => g.innerHTML = ops[b.dataset.op]);
  },

  'icon-style'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="line">统一线框</button><button class="demo-btn" data-m="filled">统一实心</button><button class="demo-btn" data-m="mix">混搭</button></div>
        <div class="mini-slide" id="icStage" style="display:flex;gap:16px;align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#icStage');
    function render(m) {
      s.innerHTML = '';
      const make = (type) => {
        if (m === 'line' || (m === 'mix' && type === 'a')) return `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d1e4fa" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>`;
        return `<svg width="34" height="34" viewBox="0 0 24 24" fill="#663af3"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6" stroke="#fff" stroke-width="1.6" fill="none"/></svg>`;
      };
      for (let i = 0; i < 3; i++) { const d = document.createElement('div'); d.innerHTML = make(i === 1 ? 'b' : 'a'); s.appendChild(d); }
    }
    render('line');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  'chart-beauty'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="ugly">默认丑</button><button class="demo-btn" data-m="pretty">美化后</button></div>
        <div class="mini-slide" id="cbStage" style="display:flex;align-items:flex-end;justify-content:center;gap:14px;padding:20px"></div>
      </div>`;
    const s = c.querySelector('#cbStage');
    const vals = [40, 70, 55, 90];
    function render(m) {
      s.innerHTML = '';
      vals.forEach(v => {
        const d = document.createElement('div');
        if (m === 'ugly') d.style.cssText = `width:34px;height:${v}%;background:#c00000;border:1px solid #000`;
        else d.style.cssText = `width:34px;height:${v}%;background:linear-gradient(180deg,#8a6bff,#663af3);border-radius:4px 4px 0 0`;
        s.appendChild(d);
      });
    }
    render('ugly');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  'smartart-to-shape'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="before">SmartArt</button><button class="demo-btn" data-m="after">转形状（可改）</button></div>
        <div class="mini-slide" id="stStage" style="display:flex;flex-direction:column;gap:8px;align-items:center;justify-content:center;padding:16px"></div>
      </div>`;
    const s = c.querySelector('#stStage');
    function render(m) {
      s.innerHTML = '';
      const items = ['步骤一', '步骤二', '步骤三'];
      items.forEach((t, i) => {
        const d = document.createElement('div');
        if (m === 'before') d.style.cssText = 'padding:8px 16px;background:rgba(102,58,243,.2);border:1px solid rgba(102,58,243,.5);border-radius:6px;color:#fff;font:13px var(--font-body)';
        else { const sc = 1 + i * 0.12; d.style.cssText = `padding:8px 16px;background:rgba(2,125,234,.3);border:1px solid rgba(2,125,234,.6);border-radius:${10 + i * 6}px;color:#fff;font:${13 + i}px var(--font-body);transform:scale(${sc})`; }
        d.textContent = t; s.appendChild(d);
      });
    }
    render('before');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  /* ---------- 输出与放映 ---------- */
  widescreen(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="43">4:3 老比例</button><button class="demo-btn" data-m="169">16:9 宽屏</button></div>
        <div style="display:flex;justify-content:center"><div id="wsBox" style="background:linear-gradient(135deg,#1b2347,#27345f);border:1px solid var(--color-glass-edge);border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.85);font:13px var(--font-body)">内容</div></div>
      </div>`;
    const box = c.querySelector('#wsBox');
    function render(m) { if (m === '43') { box.style.width = '180px'; box.style.height = '135px'; box.textContent = '4:3（两侧黑边）'; } else { box.style.width = '240px'; box.style.height = '135px'; box.textContent = '16:9（满屏）'; } }
    render('43');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  'export-pdf'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">选择包含项后导出</div>
        <div class="demo-row" style="gap:16px">
          <label style="font:13px var(--font-body);color:var(--color-moon-mist);display:flex;gap:6px;align-items:center"><input type="checkbox" id="epNotes"> 演讲者备注</label>
          <label style="font:13px var(--font-body);color:var(--color-moon-mist);display:flex;gap:6px;align-items:center"><input type="checkbox" id="epComp" checked> 压缩图片</label>
        </div>
        <button class="demo-btn" id="epBtn" style="align-self:flex-start">导出 PDF</button>
        <div id="epStatus" style="font:13px var(--font-mono);color:var(--color-fog-veil)"></div>
      </div>`;
    c.querySelector('#epBtn').onclick = () => {
      const st = c.querySelector('#epStatus'); st.textContent = '正在生成…';
      setTimeout(() => st.textContent = '✓ PPThub.pdf 已导出（含备注：' + (c.querySelector('#epNotes').checked ? '是' : '否') + '）', 700);
    };
  },

  'presenter-view'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">同一时刻：观众屏（左） vs 演讲者屏（右）</div>
        <div class="demo-row" style="gap:12px;align-items:stretch">
          <div style="flex:1;background:linear-gradient(135deg,#1b2347,#27345f);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font:15px var(--font-display)">观众：正片</div>
          <div style="flex:1;display:flex;flex-direction:column;gap:6px">
            <div style="flex:2;background:linear-gradient(135deg,#202a4d,#2c3a66);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font:13px var(--font-body)">当前页</div>
            <div style="flex:1;background:rgba(186,214,247,.08);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--color-moon-mist);font:12px var(--font-body)">下一页预览</div>
            <div style="flex:1;background:rgba(102,58,243,.15);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#c9b6ff;font:11px var(--font-mono)">备注：强调第三点</div>
          </div>
        </div>
      </div>`;
  },

  hyperlink(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">点下方链接 → 跳到「第 3 页」</div>
        <div class="mini-slide" id="hlStage" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px">
          <div style="font:18px var(--font-display);color:var(--color-ice-highlight)">目录</div>
          <div class="hlLink" style="color:#8a6bff;font:14px var(--font-body);cursor:pointer;text-decoration:underline">→ 跳到第 3 页</div>
        </div>
      </div>`;
    const stage = c.querySelector('#hlStage');
    function showDir() {
      stage.innerHTML = `<div style="font:18px var(--font-display);color:var(--color-ice-highlight)">目录</div><div class="hlLink" style="color:#8a6bff;font:14px var(--font-body);cursor:pointer;text-decoration:underline">→ 跳到第 3 页</div>`;
      stage.querySelector('.hlLink').onclick = showPage;
    }
    function showPage() {
      stage.innerHTML = `<div style="font:18px var(--font-display);color:var(--color-ice-highlight)">第 3 页</div><div style="font:14px var(--font-body);color:var(--color-moon-mist)">已通过超链接跳转到此</div><div class="hlBack" style="color:#8a6bff;font:13px var(--font-body);cursor:pointer;text-decoration:underline;margin-top:6px">← 返回目录</div>`;
      stage.querySelector('.hlBack').onclick = showDir;
    }
    stage.querySelector('.hlLink').onclick = showPage;
  },

  autoplay(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" id="apPlay2">▶ 自动播放</button><button class="demo-btn" id="apPause2">⏸ 暂停</button></div>
        <div class="mini-slide" id="apStage2" style="display:flex;align-items:center;justify-content:center;color:#fff;font:18px var(--font-display)">第 1 页</div>
      </div>`;
    const stage = c.querySelector('#apStage2');
    let n = 1, timer = null;
    function tick() { n = (n % 3) + 1; stage.textContent = '第 ' + n + ' 页'; }
    c.querySelector('#apPlay2').onclick = () => { if (timer) return; timer = setInterval(tick, 1200); };
    c.querySelector('#apPause2').onclick = () => { clearInterval(timer); timer = null; };
  },

  /* ==================== 新增 17 条演示 ==================== */

  /* ---------- 软件功能 ---------- */
  theme(c) {
    const themes = {
      deep:  { name: '暗夜紫', bg: 'linear-gradient(135deg,#0e1020,#1a1636)', accent: '#8a6bff', font: "'Space Grotesk',sans-serif", label: '现代科技' },
      light: { name: '简约浅', bg: 'linear-gradient(135deg,#eef2fb,#dbe4f5)', accent: '#027dea', font: "'Inter',sans-serif", label: '清爽商务', dark: true },
      warm:  { name: '暖橙调', bg: 'linear-gradient(135deg,#2a1a12,#3d2417)', accent: '#e46d4c', font: "'Space Grotesk',sans-serif", label: '温暖亲和' },
    };
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">切主题 → 配色+字体一整套联动换</div>
        <div class="demo-row">
          <button class="demo-btn active" data-k="deep">暗夜紫</button>
          <button class="demo-btn" data-k="light">简约浅</button>
          <button class="demo-btn" data-k="warm">暖橙调</button>
        </div>
        <div class="mini-slide" id="thStage" style="padding:22px;display:flex;flex-direction:column;gap:12px;justify-content:center"></div>
      </div>`;
    const stage = c.querySelector('#thStage');
    function render(k) {
      const t = themes[k];
      const txt = t.dark ? '#1a2340' : '#fff';
      const sub = t.dark ? 'rgba(26,35,64,.6)' : 'rgba(255,255,255,.6)';
      stage.style.background = t.bg;
      stage.innerHTML = `
        <div style="font:600 22px ${t.font};color:${txt}">主题标题</div>
        <div style="height:6px;width:40%;background:${t.accent};border-radius:3px"></div>
        <div style="font:13px ${t.font};color:${sub}">正文说明文字随主题字体切换</div>
        <div style="align-self:flex-start;margin-top:4px;padding:6px 14px;background:${t.accent};border-radius:999px;color:#fff;font:12px ${t.font}">${t.label}</div>`;
    }
    render('deep');
    c.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-k]').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.k);
    });
  },

  'selection-pane'(c) {
    const layers = [
      { id: 'L1', name: '背景色块', color: 'rgba(102,58,243,.35)', pos: 'top:14%;left:8%;width:84%;height:70%' },
      { id: 'L2', name: '标题文字', color: 'rgba(216,236,248,.9)', pos: 'top:26%;left:16%;width:50%;height:14%' },
      { id: 'L3', name: '装饰圆', color: 'rgba(228,109,76,.7)', pos: 'top:50%;left:64%;width:22%;height:38%;border-radius:50%' },
    ];
    const vis = { L1: true, L2: true, L3: true };
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">点「眼睛」显示 / 隐藏对应图层</div>
        <div class="demo-row" style="gap:20px;align-items:flex-start">
          <div style="flex:0 0 150px;display:flex;flex-direction:column;gap:8px" id="spList"></div>
          <div class="mini-slide" id="spStage" style="flex:1;min-width:160px"></div>
        </div>
      </div>`;
    const list = c.querySelector('#spList'), stage = c.querySelector('#spStage');
    function renderStage() {
      stage.innerHTML = '';
      layers.forEach(l => { if (vis[l.id]) { const d = document.createElement('div'); d.style.cssText = `position:absolute;${l.pos};background:${l.color};border-radius:${l.pos.includes('50%') ? '50%' : '6px'}`; stage.appendChild(d); } });
    }
    function renderList() {
      list.innerHTML = '';
      layers.forEach(l => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:7px 10px;background:rgba(186,214,247,.05);border:1px solid var(--color-glass-edge);border-radius:8px';
        row.innerHTML = `<span style="cursor:pointer;font-size:15px;opacity:${vis[l.id] ? 1 : .3}">${vis[l.id] ? '👁' : '🚫'}</span><span style="font:13px var(--font-body);color:var(--color-frost-glow)">${l.name}</span>`;
        row.querySelector('span').onclick = () => { vis[l.id] = !vis[l.id]; renderList(); renderStage(); };
        list.appendChild(row);
      });
    }
    renderList(); renderStage();
  },

  'z-order'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">选中一个色块 → 置于顶层 / 底层</div>
        <div class="demo-row"><button class="demo-btn" data-a="front">▲ 置于顶层</button><button class="demo-btn" data-a="back">▼ 置于底层</button></div>
        <div class="mini-slide" id="zStage" style="position:relative"></div>
      </div>`;
    const stage = c.querySelector('#zStage');
    const blocks = [
      { id: 'A', color: '#663af3', x: '18%', y: '20%' },
      { id: 'B', color: '#027dea', x: '34%', y: '34%' },
      { id: 'C', color: '#e46d4c', x: '50%', y: '48%' },
    ];
    let order = ['A', 'B', 'C'], sel = 'A';
    function render() {
      stage.innerHTML = '';
      blocks.forEach(b => {
        const z = order.indexOf(b.id);
        const d = document.createElement('div');
        d.style.cssText = `position:absolute;left:${b.x};top:${b.y};width:38%;height:44%;background:${b.color};border-radius:10px;z-index:${z};display:flex;align-items:center;justify-content:center;color:#fff;font:18px var(--font-display);cursor:pointer;box-shadow:0 6px 16px rgba(0,0,0,.35);outline:${sel === b.id ? '2px solid #fff' : 'none'};outline-offset:2px`;
        d.textContent = b.id;
        d.onclick = () => { sel = b.id; render(); };
        stage.appendChild(d);
      });
    }
    render();
    c.querySelectorAll('[data-a]').forEach(btn => btn.onclick = () => {
      order = order.filter(x => x !== sel);
      if (btn.dataset.a === 'front') order.push(sel); else order.unshift(sel);
      render();
    });
  },

  group(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-g="on">已组合</button><button class="demo-btn" data-g="off">取消组合</button><button class="demo-btn" data-a="move">↔ 移动</button></div>
        <div class="mini-slide" id="grStage" style="position:relative"></div>
        <div class="demo-label" id="grHint">组合状态：两块一起移动，不散架</div>
      </div>`;
    const stage = c.querySelector('#grStage');
    let grouped = true, moved = false;
    function render() {
      const shift = moved ? 90 : 0;
      const groupShift = grouped ? shift : 0;
      stage.innerHTML = `
        <div style="position:absolute;top:30%;left:12%;transform:translateX(${grouped ? shift : shift}px);transition:transform .5s ease;width:32%;height:40%;background:rgba(102,58,243,.5);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font:14px var(--font-body)">块A</div>
        <div style="position:absolute;top:30%;left:50%;transform:translateX(${grouped ? shift : 0}px);transition:transform .5s ease;width:32%;height:40%;background:rgba(2,125,234,.5);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font:14px var(--font-body)">块B</div>`;
    }
    render();
    c.querySelectorAll('[data-g]').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-g]').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      grouped = b.dataset.g === 'on'; moved = false; render();
      c.querySelector('#grHint').textContent = grouped ? '组合状态：两块一起移动，不散架' : '取消组合：点移动只有块A动，块B不跟';
    });
    c.querySelector('[data-a]').onclick = () => { moved = !moved; render(); };
  },

  designer(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">朴素内容 → 点「生成设计建议」挑版式</div>
        <button class="demo-btn" id="dgGo" style="align-self:flex-start">✨ 生成设计建议</button>
        <div class="demo-row" id="dgOptions" style="display:none"></div>
        <div class="mini-slide" id="dgStage" style="padding:18px;display:flex;flex-direction:column;justify-content:center;gap:8px"></div>
      </div>`;
    const stage = c.querySelector('#dgStage'), opts = c.querySelector('#dgOptions');
    function plain() { stage.style.background = ''; stage.innerHTML = `<div style="font:14px var(--font-body);color:var(--color-moon-mist)">2025 年度增长</div><div style="font:13px var(--font-body);color:var(--color-fog-veil)">营收 +38%，用户破百万</div>`; }
    const designs = [
      () => { stage.style.background = 'linear-gradient(135deg,#1b2347,#2c3a66)'; stage.innerHTML = `<div style="font:600 26px var(--font-display);color:#fff">+38%</div><div style="font:13px var(--font-body);color:rgba(255,255,255,.7)">2025 营收增长 · 用户破百万</div>`; },
      () => { stage.style.background = 'linear-gradient(135deg,#1a1636,#2a1f52)'; stage.innerHTML = `<div style="display:flex;gap:12px;align-items:center"><div style="font:600 30px var(--font-display);color:#8a6bff">100万</div><div style="font:12px var(--font-body);color:rgba(255,255,255,.7)">用户里程碑<br>营收 +38%</div></div>`; },
      () => { stage.style.background = 'linear-gradient(135deg,#12241f,#1c3a30)'; stage.innerHTML = `<div style="font:600 18px var(--font-display);color:#4fd1b3">2025 年度增长</div><div style="height:5px;width:50%;background:#269684;border-radius:3px"></div><div style="font:13px var(--font-body);color:rgba(255,255,255,.7)">营收 +38% · 用户破百万</div>`; },
    ];
    plain();
    c.querySelector('#dgGo').onclick = () => {
      opts.style.display = 'flex';
      opts.innerHTML = '';
      designs.forEach((fn, i) => { const b = document.createElement('button'); b.className = 'demo-btn'; b.textContent = '方案' + (i + 1); b.onclick = () => { opts.querySelectorAll('.demo-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); fn(); }; opts.appendChild(b); });
      designs[0](); opts.querySelector('.demo-btn').classList.add('active');
    };
  },

  /* ---------- 字体与配色 ---------- */
  'line-height'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">行距</span><span class="demo-label" id="lhVal">1.6</span></div>
        <input type="range" class="demo-slider" id="lhRange" min="1" max="2.6" step="0.1" value="1.6">
        <div class="mini-slide" style="aspect-ratio:auto;padding:18px"><p id="lhText" style="font:14px var(--font-body);color:var(--color-frost-glow);line-height:1.6;margin:0">好的行距是长文可读性的隐形功臣。行与行之间留足呼吸的空隙，眼睛才能顺畅地一行行往下走，不串行、不疲劳，整段文字读起来自然轻松。</p></div>
      </div>`;
    const range = c.querySelector('#lhRange'), text = c.querySelector('#lhText'), val = c.querySelector('#lhVal');
    range.oninput = () => { text.style.lineHeight = range.value; val.textContent = Number(range.value).toFixed(1); };
  },

  'muted-color'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">饱和度（往左＝高级灰）</span><span class="demo-label" id="mcVal">40%</span></div>
        <input type="range" class="demo-slider" id="mcRange" min="10" max="100" step="5" value="40">
        <div class="demo-row" id="mcRow" style="gap:10px;justify-content:center"></div>
      </div>`;
    const hues = [0, 210, 150, 40];
    const row = c.querySelector('#mcRow'), range = c.querySelector('#mcRange'), val = c.querySelector('#mcVal');
    function render() {
      const s = range.value; val.textContent = s + '%';
      row.innerHTML = '';
      hues.forEach(h => { const d = document.createElement('div'); d.style.cssText = `width:56px;height:56px;border-radius:12px;background:hsl(${h} ${s}% 60%);transition:background .2s`; row.appendChild(d); });
    }
    render();
    range.oninput = render;
  },

  /* ---------- 动画与切换 ---------- */
  morph(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-m="morph">Morph 平滑切换</button><button class="demo-btn" data-m="cut">普通切换（直接跳）</button><button class="demo-btn" data-a="reset">⟲ 复位</button></div>
        <div class="mini-slide" id="mpStage" style="position:relative">
          <div id="mpBox" style="position:absolute;left:10%;top:60%;width:16%;height:22%;background:linear-gradient(135deg,#8a6bff,#663af3);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font:12px var(--font-body)">对象</div>
        </div>
      </div>`;
    const box = c.querySelector('#mpBox');
    function toStart() { box.style.transition = 'none'; box.style.left = '10%'; box.style.top = '60%'; box.style.width = '16%'; box.style.height = '22%'; box.style.fontSize = '12px'; }
    function go(mode) {
      toStart();
      requestAnimationFrame(() => requestAnimationFrame(() => {
        box.style.transition = mode === 'morph' ? 'all .9s cubic-bezier(.22,1,.36,1)' : 'none';
        box.style.left = '38%'; box.style.top = '28%'; box.style.width = '40%'; box.style.height = '44%'; box.style.fontSize = '20px';
      }));
    }
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => go(b.dataset.m));
    c.querySelector('[data-a]').onclick = toStart;
  },

  'motion-path'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-p="curve">▶ 曲线路径</button><button class="demo-btn" data-p="line">▶ 直线路径</button></div>
        <div class="mini-slide" id="mtStage" style="position:relative">
          <svg viewBox="0 0 300 160" style="position:absolute;inset:0;width:100%;height:100%">
            <path id="mtPath" d="M30,130 Q150,10 270,110" fill="none" stroke="rgba(186,214,247,.35)" stroke-width="2" stroke-dasharray="5 5"/>
          </svg>
          <div id="mtBall" style="position:absolute;width:20px;height:20px;border-radius:50%;background:#e46d4c;offset-path:path('M30,130 Q150,10 270,110');offset-distance:0%;box-shadow:0 0 12px rgba(228,109,76,.6)"></div>
        </div>
      </div>`;
    const ball = c.querySelector('#mtBall'), path = c.querySelector('#mtPath');
    function play(kind) {
      const d = kind === 'curve' ? "M30,130 Q150,10 270,110" : "M30,130 L270,130";
      path.setAttribute('d', d);
      ball.style.offsetPath = `path('${d}')`;
      ball.style.transition = 'none'; ball.style.offsetDistance = '0%';
      requestAnimationFrame(() => requestAnimationFrame(() => { ball.style.transition = 'offset-distance 1.4s ease-in-out'; ball.style.offsetDistance = '100%'; }));
    }
    c.querySelectorAll('[data-p]').forEach(b => b.onclick = () => play(b.dataset.p));
  },

  'anim-timing'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">持续时间</span><span class="demo-label" id="atDurV">0.6s</span></div>
        <input type="range" class="demo-slider" id="atDur" min="0.2" max="2" step="0.1" value="0.6">
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">延迟</span><span class="demo-label" id="atDelV">0.0s</span></div>
        <input type="range" class="demo-slider" id="atDel" min="0" max="1.5" step="0.1" value="0">
        <div class="demo-row"><button class="demo-btn" id="atPlay">▶ 播放</button></div>
        <div class="mini-slide" style="display:flex;align-items:center;justify-content:center"><div id="atBox" style="width:90px;height:90px;background:linear-gradient(135deg,#8a6bff,#663af3);border-radius:14px;opacity:1"></div></div>
      </div>`;
    const dur = c.querySelector('#atDur'), del = c.querySelector('#atDel'), box = c.querySelector('#atBox');
    dur.oninput = () => c.querySelector('#atDurV').textContent = Number(dur.value).toFixed(1) + 's';
    del.oninput = () => c.querySelector('#atDelV').textContent = Number(del.value).toFixed(1) + 's';
    c.querySelector('#atPlay').onclick = () => {
      box.style.transition = 'none'; box.style.opacity = 0; box.style.transform = 'translateY(20px) scale(.8)';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        box.style.transition = `all ${dur.value}s ease ${del.value}s`;
        box.style.opacity = 1; box.style.transform = 'translateY(0) scale(1)';
      }));
    };
  },

  /* ---------- 排版与布局 ---------- */
  bleed(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-m="margin">留边距</button><button class="demo-btn active" data-m="bleed">满版出血</button></div>
        <div class="mini-slide" id="blStage" style="position:relative;padding:0"></div>
      </div>`;
    const stage = c.querySelector('#blStage');
    function render(m) {
      const pad = m === 'margin' ? '14px' : '0';
      stage.innerHTML = `<div style="position:absolute;inset:${pad};background:linear-gradient(135deg,#27345f,#3a4d85);border-radius:${m === 'margin' ? '8px' : '0'};display:flex;align-items:flex-end;padding:16px;transition:all .4s ease"><span style="font:600 18px var(--font-display);color:#fff">${m === 'margin' ? '留边距 · 精致克制' : '满版出血 · 气势沉浸'}</span></div>`;
    }
    render('bleed');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.m); });
  },

  'card-layout'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-m="list">纯文字列表</button><button class="demo-btn active" data-m="card">卡片式</button></div>
        <div class="mini-slide" id="clStage" style="aspect-ratio:auto;min-height:150px;padding:16px"></div>
      </div>`;
    const stage = c.querySelector('#clStage');
    const items = [['⚡', '高效', '一键排版'], ['🎯', '精准', '数据驱动'], ['✨', '美观', '专属设计']];
    function render(m) {
      if (m === 'list') {
        stage.innerHTML = `<div style="display:flex;flex-direction:column;gap:10px">${items.map(i => `<div style="font:14px var(--font-body);color:var(--color-moon-mist)">· ${i[1]}：${i[2]}</div>`).join('')}</div>`;
      } else {
        stage.innerHTML = `<div style="display:flex;gap:10px">${items.map(i => `<div style="flex:1;background:rgba(186,214,247,.06);border:1px solid var(--color-glass-edge);border-radius:12px;padding:14px 10px;text-align:center"><div style="font-size:22px">${i[0]}</div><div style="font:600 14px var(--font-display);color:var(--color-ice-highlight);margin-top:6px">${i[1]}</div><div style="font:12px var(--font-body);color:var(--color-fog-veil);margin-top:2px">${i[2]}</div></div>`).join('')}</div>`;
      }
    }
    render('card');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.m); });
  },

  /* ---------- 图形与图示 ---------- */
  'image-mask'(c) {
    const shapes = {
      rect:   { name: '原图（矩形）', clip: 'none' },
      circle: { name: '圆形', clip: 'circle(48% at 50% 50%)' },
      round:  { name: '圆角', clip: 'inset(0 round 22px)' },
      star:   { name: '星形', clip: 'polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)' },
    };
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">点形状 → 把「图片」裁成该造型</div>
        <div class="demo-row">
          <button class="demo-btn active" data-s="rect">原图</button>
          <button class="demo-btn" data-s="circle">圆形</button>
          <button class="demo-btn" data-s="round">圆角</button>
          <button class="demo-btn" data-s="star">星形</button>
        </div>
        <div class="mini-slide" style="display:flex;align-items:center;justify-content:center">
          <div id="imBox" style="width:160px;height:160px;background:linear-gradient(135deg,#e46d4c,#663af3,#027dea);transition:clip-path .3s ease,border-radius .3s"></div>
        </div>
      </div>`;
    const box = c.querySelector('#imBox');
    c.querySelectorAll('[data-s]').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-s]').forEach(x => x.classList.remove('active')); b.classList.add('active');
      box.style.clipPath = shapes[b.dataset.s].clip;
    });
  },

  'data-viz'(c) {
    const vals = [30, 55, 45, 80];
    const tips = { bar: '柱状图：比大小最直观', pie: '饼图：看构成占比', line: '折线图：看趋势变化' };
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-t="bar">柱状</button><button class="demo-btn" data-t="pie">饼图</button><button class="demo-btn" data-t="line">折线</button></div>
        <div class="mini-slide" id="dvStage" style="padding:20px;display:flex;align-items:center;justify-content:center"></div>
        <div class="demo-label" id="dvTip">${tips.bar}</div>
      </div>`;
    const stage = c.querySelector('#dvStage'), tip = c.querySelector('#dvTip');
    const cols = ['#663af3', '#027dea', '#269684', '#e46d4c'];
    function render(t) {
      tip.textContent = tips[t];
      if (t === 'bar') {
        stage.innerHTML = `<div style="display:flex;align-items:flex-end;justify-content:center;gap:20px;height:180px">${vals.map((v, i) => `<div style="width:48px;height:${v}%;background:${cols[i]};border-radius:6px 6px 0 0"></div>`).join('')}</div>`;
      } else if (t === 'pie') {
        const tot = vals.reduce((a, b) => a + b, 0); let acc = 0; const segs = vals.map((v, i) => { const a0 = acc / tot * 360; acc += v; const a1 = acc / tot * 360; return `${cols[i]} ${a0}deg ${a1}deg`; }).join(',');
        stage.innerHTML = `<div style="display:flex;justify-content:center;align-items:center;height:180px"><div style="width:150px;height:150px;border-radius:50%;background:conic-gradient(${segs})"></div></div>`;
      } else {
        const pts = vals.map((v, i) => `${30 + i * 90},${160 - v}`).join(' ');
        stage.innerHTML = `<svg viewBox="0 0 340 180" style="width:100%;height:180px"><polyline points="${pts}" fill="none" stroke="#8a6bff" stroke-width="4"/>${vals.map((v, i) => `<circle cx="${30 + i * 90}" cy="${160 - v}" r="5" fill="#e46d4c"/>`).join('')}</svg>`;
      }
    }
    render('bar');
    c.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { c.querySelectorAll('[data-t]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.t); });
  },

  'flat-vs-skeu'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="flat">扁平化</button><button class="demo-btn" data-m="skeu">拟物</button></div>
        <div class="mini-slide" style="display:flex;align-items:center;justify-content:center;gap:24px" id="fsStage"></div>
      </div>`;
    const stage = c.querySelector('#fsStage');
    function render(m) {
      if (m === 'flat') {
        stage.innerHTML = `<div style="width:80px;height:80px;border-radius:16px;background:#027dea"></div><div style="padding:10px 22px;border-radius:8px;background:#663af3;color:#fff;font:14px var(--font-body)">按钮</div>`;
      } else {
        stage.innerHTML = `<div style="width:80px;height:80px;border-radius:16px;background:linear-gradient(145deg,#3aa0ff,#0159b3);box-shadow:inset 0 2px 4px rgba(255,255,255,.5),inset 0 -4px 8px rgba(0,0,0,.4),0 8px 16px rgba(0,0,0,.4)"></div><div style="padding:10px 22px;border-radius:8px;background:linear-gradient(180deg,#8a6bff,#4a24c0);color:#fff;font:14px var(--font-body);box-shadow:inset 0 1px 2px rgba(255,255,255,.5),0 6px 12px rgba(0,0,0,.4);text-shadow:0 1px 2px rgba(0,0,0,.4)">按钮</div>`;
      }
    }
    render('flat');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.m); });
  },

  /* ---------- 输出与放映 ---------- */
  'embed-font'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">同一份文件，到了「没装这个字体」的电脑上</div>
        <div class="demo-row"><button class="demo-btn active" data-m="on">✓ 已嵌入字体</button><button class="demo-btn" data-m="off">✕ 未嵌入</button></div>
        <div class="mini-slide" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px" id="efStage"></div>
      </div>`;
    const stage = c.querySelector('#efStage');
    function render(m) {
      if (m === 'on') {
        stage.innerHTML = `<div style="font:700 30px 'Space Grotesk',sans-serif;color:var(--color-ice-highlight)">Design</div><div style="font:12px var(--font-mono);color:#4fd1b3">字体正常，排版如你所愿</div>`;
      } else {
        stage.innerHTML = `<div style="font:700 30px var(--font-serif);color:var(--color-moon-mist)">Design</div><div style="font:12px var(--font-mono);color:#e46d4c">字体被替换成默认衬线，走样了</div>`;
      }
    }
    render('on');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.m); });
  },

  'export-media'(c) {
    const fmts = {
      png: { name: 'PNG 图片', desc: '单页存为高清图，做长图 / 封面 / 发公众号', icon: '🖼' },
      gif: { name: 'GIF 动图', desc: '把动画导成循环动图，发社媒 / 聊天最方便', icon: '🎞' },
      mp4: { name: 'MP4 视频', desc: '带动画+计时导成视频，无需装 PPT 也能播', icon: '🎬' },
    };
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-f="png">PNG</button><button class="demo-btn" data-f="gif">GIF</button><button class="demo-btn" data-f="mp4">MP4</button></div>
        <div class="mini-slide" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px" id="emStage"></div>
      </div>`;
    const stage = c.querySelector('#emStage');
    function render(f) {
      const t = fmts[f];
      stage.innerHTML = `<div style="font-size:40px">${t.icon}</div><div style="font:600 17px var(--font-display);color:var(--color-ice-highlight)">${t.name}</div><div style="font:13px var(--font-body);color:var(--color-fog-veil);text-align:center;max-width:260px">${t.desc}</div>`;
    }
    render('png');
    c.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { c.querySelectorAll('[data-f]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.f); });
  },

  /* ---------- 软件功能（补充） ---------- */
  'reuse-slides'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="theme">套用当前主题</button><button class="demo-btn" data-m="keep">保留源格式</button></div>
        <div class="demo-label">从「素材库文件」点一页 → 插进当前文稿</div>
        <div class="demo-row" id="rsLib" style="gap:8px;justify-content:center"></div>
        <div class="demo-label" style="margin-top:2px">↓ 当前文稿</div>
        <div class="mini-slide" id="rsTarget" style="display:flex;align-items:center;justify-content:center;color:var(--color-fog-veil);font:13px var(--font-body)">点上方任意页插入这里</div>
      </div>`;
    const lib = c.querySelector('#rsLib'), target = c.querySelector('#rsTarget');
    let mode = 'theme';
    const srcCols = ['#e46d4c', '#269684', '#d99a2b'];
    const themeCol = '#663af3';
    srcCols.forEach(col => {
      const d = document.createElement('div');
      d.style.cssText = `width:64px;height:40px;border-radius:6px;border-top:4px solid ${col};background:rgba(186,214,247,.06);cursor:pointer;position:relative`;
      d.innerHTML = `<div style="position:absolute;top:9px;left:6px;width:60%;height:5px;background:${col};border-radius:2px;opacity:.85"></div><div style="position:absolute;top:19px;left:6px;width:76%;height:4px;background:rgba(255,255,255,.2);border-radius:2px"></div>`;
      d.onclick = () => {
        const col2 = mode === 'theme' ? themeCol : col;
        target.style.color = '';
        target.innerHTML = `<div style="position:absolute;top:16%;left:8%;width:55%;height:14%;background:${col2};border-radius:4px"></div><div style="position:absolute;top:44%;left:8%;width:72%;height:6%;background:rgba(255,255,255,.18);border-radius:3px"></div><div style="position:absolute;top:56%;left:8%;width:58%;height:6%;background:rgba(255,255,255,.12);border-radius:3px"></div><div style="position:absolute;bottom:8%;right:8%;font:10px var(--font-mono);color:rgba(255,255,255,.45)">${mode === 'theme' ? '已套用主题紫' : '保留源色'}</div>`;
      };
      lib.appendChild(d);
    });
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { mode = b.dataset.m; });
  },

  'screen-record'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" id="srBtn">● 开始录制</button><span class="demo-label" id="srTime" style="font-family:var(--font-mono)">00:00</span></div>
        <div class="mini-slide" id="srStage" style="position:relative;overflow:hidden">
          <div id="srHint" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--color-fog-veil);font:13px var(--font-body);text-align:center;padding:0 20px">先框选屏幕上要录的区域，再点「开始录制」</div>
          <div id="srRegion" style="position:absolute;left:16%;top:20%;width:68%;height:60%;border:2px dashed rgba(186,214,247,.5);border-radius:6px;transition:border-color .2s"></div>
          <div id="srDot" style="position:absolute;left:20%;top:24%;width:10px;height:10px;border-radius:50%;background:#e4483c;display:none"></div>
        </div>
      </div>`;
    const btn = c.querySelector('#srBtn'), time = c.querySelector('#srTime'), dot = c.querySelector('#srDot'), region = c.querySelector('#srRegion'), hint = c.querySelector('#srHint');
    let timer = null, blink = null, sec = 0, on = false;
    const timers = (window.__demoTimers ||= []);
    const fmt = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    btn.onclick = () => {
      on = !on;
      if (on) {
        sec = 0; time.textContent = '00:00'; dot.style.display = 'block'; dot.style.opacity = '1';
        region.style.borderColor = '#e4483c'; btn.textContent = '■ 停止录制'; btn.classList.add('active');
        hint.textContent = '录制中…'; region.innerHTML = '';
        blink = setInterval(() => dot.style.opacity = dot.style.opacity === '0' ? '1' : '0', 500); timers.push(blink);
        timer = setInterval(() => { sec++; time.textContent = fmt(sec); }, 1000); timers.push(timer);
      } else {
        clearInterval(timer); clearInterval(blink); dot.style.display = 'none';
        btn.textContent = '● 开始录制'; btn.classList.remove('active'); hint.textContent = '';
        region.style.borderColor = 'rgba(102,58,243,.5)'; region.style.borderStyle = 'solid'; region.style.background = 'rgba(102,58,243,.14)';
        region.innerHTML = `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:28px;color:var(--color-ice-highlight)">▶</div><div style="position:absolute;bottom:5px;right:7px;font:10px var(--font-mono);color:var(--color-fog-veil)">${fmt(sec)} 已插入</div>`;
      }
    };
  },

  /* ---------- 设计原则（补充） ---------- */
  'less-is-more'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-m="much">堆满</button><button class="demo-btn active" data-m="less">做减法</button></div>
        <div class="mini-slide" id="lmStage" style="padding:0;position:relative;overflow:hidden"></div>
        <div class="demo-label" id="lmTip">一页只讲一件事，重点自己会跳出来</div>
      </div>`;
    const stage = c.querySelector('#lmStage'), tip = c.querySelector('#lmTip');
    function render(m) {
      if (m === 'much') {
        tip.textContent = '什么都想说 = 什么都没说清';
        let blocks = '';
        for (let i = 0; i < 9; i++) blocks += `<div style="background:rgba(186,214,247,.08);border:1px solid var(--color-glass-edge);border-radius:5px;padding:6px;font:10px var(--font-body);color:var(--color-moon-mist)">要点 ${i + 1} · 一堆说明文字塞进来</div>`;
        stage.innerHTML = `<div style="position:absolute;inset:0;padding:12px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;align-content:start">${blocks}</div>`;
      } else {
        tip.textContent = '一页只讲一件事，重点自己会跳出来';
        stage.innerHTML = `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px"><div style="font:700 34px var(--font-display);background:linear-gradient(120deg,#d8ecf8,#98c0ef);-webkit-background-clip:text;background-clip:text;color:transparent">3×</div><div style="font:14px var(--font-body);color:var(--color-moon-mist)">效率提升</div></div>`;
      }
    }
    render('less');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  /* ---------- 字体与配色（补充） ---------- */
  'color-wheel'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">色相 H</span><span class="demo-label" id="cwHV" style="font-family:var(--font-mono)">265°</span></div>
        <input type="range" class="demo-slider" id="cwH" min="0" max="360" step="1" value="265">
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">饱和度 S</span><span class="demo-label" id="cwSV" style="font-family:var(--font-mono)">75%</span></div>
        <input type="range" class="demo-slider" id="cwS" min="0" max="100" step="1" value="75">
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">明度 B</span><span class="demo-label" id="cwBV" style="font-family:var(--font-mono)">95%</span></div>
        <input type="range" class="demo-slider" id="cwB" min="0" max="100" step="1" value="95">
        <div class="mini-slide" style="display:flex;align-items:center;justify-content:center;gap:16px">
          <div id="cwSwatch" style="width:130px;height:130px;border-radius:20px;box-shadow:0 8px 24px rgba(0,0,0,.35)"></div>
          <div style="font:15px var(--font-mono);color:var(--color-fog-veil)" id="cwHex">#8a6bff</div>
        </div>
      </div>`;
    const H = c.querySelector('#cwH'), S = c.querySelector('#cwS'), B = c.querySelector('#cwB');
    const sw = c.querySelector('#cwSwatch'), hex = c.querySelector('#cwHex');
    function hsb2rgb(h, s, b) {
      s /= 100; b /= 100; const k = n => (n + h / 60) % 6;
      const f = n => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
      const to = v => Math.round(v * 255).toString(16).padStart(2, '0');
      return '#' + to(f(5)) + to(f(3)) + to(f(1));
    }
    function upd() {
      c.querySelector('#cwHV').textContent = H.value + '°';
      c.querySelector('#cwSV').textContent = S.value + '%';
      c.querySelector('#cwBV').textContent = B.value + '%';
      const col = hsb2rgb(+H.value, +S.value, +B.value);
      sw.style.background = col; hex.textContent = col;
    }
    [H, S, B].forEach(x => x.oninput = upd); upd();
  },

  monochrome(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="mono">单色（同色相）</button><button class="demo-btn" data-m="multi">花（多色相）</button></div>
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">选一个色相</span><span class="demo-label" id="moHV" style="font-family:var(--font-mono)">210°</span></div>
        <input type="range" class="demo-slider" id="moH" min="0" max="360" step="1" value="210">
        <div class="mini-slide" id="moStage" style="display:flex;align-items:center;justify-content:center;gap:10px"></div>
        <div class="demo-label" id="moTip">同一色相靠深浅明暗分层，天生和谐</div>
      </div>`;
    const H = c.querySelector('#moH'), stage = c.querySelector('#moStage'), tip = c.querySelector('#moTip');
    let mode = 'mono';
    function hsl(h, s, l) { return `hsl(${h},${s}%,${l}%)`; }
    function render() {
      c.querySelector('#moHV').textContent = H.value + '°';
      const h = +H.value; let cols;
      if (mode === 'mono') { cols = [82, 66, 52, 38, 26].map(l => hsl(h, 60, l)); tip.textContent = '同一色相靠深浅明暗分层，天生和谐'; }
      else { cols = [0, 70, 140, 210, 300].map(off => hsl((h + off) % 360, 68, 55)); tip.textContent = '五个不同色相并排 → 花、乱、抢镜'; }
      stage.innerHTML = cols.map(col => `<div style="width:46px;height:70px;border-radius:8px;background:${col}"></div>`).join('');
    }
    H.oninput = render;
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { mode = b.dataset.m; render(); });
    render();
  },

  /* ---------- 排版与布局（补充） ---------- */
  'full-image'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">蒙层深度</span><span class="demo-label" id="fiV" style="font-family:var(--font-mono)">55%</span></div>
        <input type="range" class="demo-slider" id="fiMask" min="0" max="80" step="5" value="55">
        <div class="mini-slide" id="fiStage" style="position:relative;padding:0;overflow:hidden">
          <div style="position:absolute;inset:0;background:linear-gradient(135deg,#3a4d85 0%,#8a6bff 45%,#e46d4c 100%)"></div>
          <div id="fiMaskLayer" style="position:absolute;inset:0;background:rgba(5,6,15,.55)"></div>
          <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px"><div style="font:700 26px var(--font-display);color:#fff">全图型封面</div><div style="font:13px var(--font-body);color:rgba(255,255,255,.85)">大图铺满 · 文字压上</div></div>
        </div>
        <div class="demo-label" id="fiTip">加暗蒙层 → 白字才在花图上看得清</div>
      </div>`;
    const sl = c.querySelector('#fiMask'), layer = c.querySelector('#fiMaskLayer'), tip = c.querySelector('#fiTip');
    sl.oninput = () => {
      c.querySelector('#fiV').textContent = sl.value + '%';
      layer.style.background = `rgba(5,6,15,${sl.value / 100})`;
      tip.textContent = +sl.value < 25 ? '蒙层太浅 → 白字被花图吃掉，看不清' : '加暗蒙层 → 白字才在花图上看得清';
    };
  },

  'visual-balance'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-m="off">失衡</button><button class="demo-btn active" data-m="on">配平</button></div>
        <div class="mini-slide" id="vbStage" style="position:relative;padding:0;overflow:hidden"></div>
        <div class="demo-label" id="vbTip">右侧加标题+文字+色块，把左边大图的分量配平</div>
      </div>`;
    const stage = c.querySelector('#vbStage'), tip = c.querySelector('#vbTip');
    function render(m) {
      const big = `<div style="position:absolute;left:6%;top:14%;width:40%;height:72%;background:linear-gradient(135deg,#27345f,#8a6bff);border-radius:10px"></div>`;
      if (m === 'off') {
        tip.textContent = '左边一坨重、右边全空 → 画面向左坠，别扭';
        stage.innerHTML = big;
      } else {
        tip.textContent = '右侧加标题+文字+色块，把左边大图的分量配平';
        stage.innerHTML = big + `<div style="position:absolute;right:7%;top:22%;width:38%;height:9%;background:rgba(255,255,255,.85);border-radius:4px"></div><div style="position:absolute;right:7%;top:37%;width:44%;height:5%;background:rgba(186,214,247,.35);border-radius:3px"></div><div style="position:absolute;right:7%;top:46%;width:36%;height:5%;background:rgba(186,214,247,.25);border-radius:3px"></div><div style="position:absolute;right:7%;top:62%;width:22%;height:16%;background:#e46d4c;border-radius:8px"></div>`;
      }
    }
    render('on');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  /* ---------- 效率与技巧（补充） ---------- */
  'anim-painter'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" id="apBrush">🖌 用动画刷刷其余卡片</button><button class="demo-btn" data-a="reset" id="apReset">⟲ 复位</button></div>
        <div class="demo-label">卡片 1 已有「淡入上浮」动画，刷给卡片 2、3</div>
        <div class="demo-row" id="apRow" style="gap:12px;justify-content:center"></div>
      </div>`;
    const row = c.querySelector('#apRow');
    function build() {
      row.innerHTML = '';
      for (let i = 1; i <= 3; i++) {
        const d = document.createElement('div');
        d.className = 'apCard';
        d.style.cssText = `width:72px;height:88px;border-radius:10px;background:${i === 1 ? 'linear-gradient(135deg,#8a6bff,#663af3)' : 'rgba(186,214,247,.08)'};border:1px solid var(--color-glass-edge);display:flex;align-items:center;justify-content:center;font:12px var(--font-body);color:#fff`;
        d.textContent = '卡片 ' + i;
        d.dataset.done = i === 1 ? '1' : '0';
        row.appendChild(d);
      }
    }
    function playCard(d, delay) {
      d.style.transition = 'none'; d.style.opacity = '0'; d.style.transform = 'translateY(18px)';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        d.style.transition = `all .6s cubic-bezier(.22,1,.36,1) ${delay}s`;
        d.style.opacity = '1'; d.style.transform = 'translateY(0)';
      }));
    }
    build();
    playCard(row.children[0], 0);
    c.querySelector('#apBrush').onclick = () => {
      [...row.children].forEach((d, i) => {
        if (i === 0) return;
        d.style.background = 'linear-gradient(135deg,#8a6bff,#663af3)'; d.dataset.done = '1';
        playCard(d, i * 0.2);
      });
    };
    c.querySelector('#apReset').onclick = () => { build(); playCard(row.children[0], 0); };
  },

  plugins(c) {
    const data = {
      islide: { name: 'iSlide · 一键优化', before: '字体行距乱、色不统一', after: '全篇字体/行距/配色一键规整' },
      onekey: { name: 'OneKey · 批量处理', before: '十张图逐个调大小对齐', after: '批量统一尺寸+等距排列' },
      pocket: { name: '口袋动画 · 一键动效', before: '复杂动画手 K 到崩溃', after: '套用现成动画模板秒出' },
    };
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-p="islide">iSlide</button><button class="demo-btn" data-p="onekey">OneKey</button><button class="demo-btn" data-p="pocket">口袋动画</button></div>
        <div class="mini-slide" id="plStage" style="display:flex;align-items:center;justify-content:center;gap:14px;padding:16px"></div>
      </div>`;
    const stage = c.querySelector('#plStage');
    function render(p) {
      const d = data[p];
      stage.innerHTML = `<div style="flex:1;text-align:center"><div style="font:11px var(--font-mono);color:var(--color-fog-veil);margin-bottom:6px">手动</div><div style="background:rgba(228,109,76,.12);border:1px solid rgba(228,109,76,.35);border-radius:8px;padding:12px 8px;font:12px var(--font-body);color:#f0a48c;min-height:56px;display:flex;align-items:center;justify-content:center">${d.before}</div></div>
        <div style="font-size:22px;color:var(--color-ice-highlight)">→</div>
        <div style="flex:1;text-align:center"><div style="font:11px var(--font-mono);color:#8a6bff;margin-bottom:6px">${d.name}</div><div style="background:rgba(102,58,243,.14);border:1px solid rgba(102,58,243,.4);border-radius:8px;padding:12px 8px;font:12px var(--font-body);color:#c9bcff;min-height:56px;display:flex;align-items:center;justify-content:center">${d.after}</div></div>`;
    }
    render('islide');
    c.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { c.querySelectorAll('[data-p]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.p); });
  },

  'smart-align'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">拖滑块移动蓝块 → 接近对齐位时自动「吸附」并显示参考线</div>
        <div class="mini-slide" id="saStage" style="position:relative;padding:0;overflow:hidden;min-height:160px">
          <div style="position:absolute;left:16%;top:30%;width:60px;height:60px;background:rgba(186,214,247,.14);border:1px solid var(--color-glass-edge);border-radius:10px"></div>
          <div style="position:absolute;left:16%;top:56%;width:60px;height:60px;background:rgba(186,214,247,.14);border:1px solid var(--color-glass-edge);border-radius:10px"></div>
          <div id="saGuide" style="position:absolute;left:calc(16% + 30px);top:0;bottom:0;width:1px;background:#e4483c;opacity:0;transition:opacity .12s"></div>
          <div id="saBox" style="position:absolute;top:43%;width:60px;height:60px;background:linear-gradient(135deg,#8a6bff,#663af3);border-radius:10px;box-shadow:0 4px 12px rgba(102,58,243,.4)"></div>
        </div>
        <input type="range" class="demo-slider" id="saPos" min="6" max="80" step="0.5" value="55">
        <div class="demo-label" id="saTip">　</div>
      </div>`;
    const box = c.querySelector('#saBox'), guide = c.querySelector('#saGuide'), sl = c.querySelector('#saPos'), tip = c.querySelector('#saTip'), stage = c.querySelector('#saStage');
    const TARGET = 16; // 与上方两个块左对齐的百分比
    function place() {
      let x = +sl.value;
      const w = stage.clientWidth || 300;
      const targetPx = w * TARGET / 100;
      const curPx = w * x / 100;
      if (Math.abs(curPx - targetPx) < 12) { // 吸附区
        x = TARGET; guide.style.opacity = '1'; tip.textContent = '✓ 已吸附：与上方两块左对齐';
        box.style.boxShadow = '0 0 0 2px #e4483c, 0 4px 12px rgba(102,58,243,.4)';
      } else {
        guide.style.opacity = '0'; tip.textContent = '　'; box.style.boxShadow = '0 4px 12px rgba(102,58,243,.4)';
      }
      box.style.left = x + '%';
    }
    sl.oninput = place; place();
  },

  /* ---------- 图形与图示（补充） ---------- */
  'table-beauty'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-m="raw">默认表格</button><button class="demo-btn active" data-m="nice">美化后</button></div>
        <div class="mini-slide" id="tbStage" style="padding:14px;display:flex;align-items:center;justify-content:center"></div>
      </div>`;
    const stage = c.querySelector('#tbStage');
    const rows = [['产品', '销量', '增长'], ['A 方案', '1,280', '+12%'], ['B 方案', '2,050', '+31%'], ['C 方案', '960', '-4%']];
    function render(m) {
      if (m === 'raw') {
        stage.innerHTML = `<table style="border-collapse:collapse;font:12px var(--font-body);color:var(--color-moon-mist)">${rows.map(r => `<tr>${r.map(cell => `<td style="border:1px solid #7f8aa3;padding:5px 12px">${cell}</td>`).join('')}</tr>`).join('')}</table>`;
      } else {
        stage.innerHTML = `<table style="border-collapse:collapse;font:12px var(--font-body);color:var(--color-frost-glow);width:100%">${rows.map((r, ri) => `<tr style="background:${ri === 0 ? 'rgba(102,58,243,.28)' : ri % 2 ? 'rgba(186,214,247,.04)' : 'transparent'}">${r.map((cell, ci) => {
          const isGrow = ci === 2 && ri > 0;
          const col = isGrow ? (cell[0] === '-' ? '#4fd1b3' : '#ff6b6b') : (ri === 0 ? '#fff' : 'inherit');
          const fw = ri === 0 ? '600' : (isGrow ? '600' : '400');
          return `<td style="border:none;border-bottom:1px solid var(--color-glass-edge);padding:8px 14px;color:${col};font-weight:${fw}">${cell}</td>`;
        }).join('')}</tr>`).join('')}</table>`;
      }
    }
    render('nice');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'model-3d'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" id="m3Spin">▶ 自动旋转</button><button class="demo-btn" data-a="stop" id="m3Stop">⏸ 停</button></div>
        <div class="demo-label">拖滑块手动转，或点自动旋转（模拟 3D 模型可 360° 看）</div>
        <div class="mini-slide" style="display:flex;align-items:center;justify-content:center;perspective:600px;min-height:170px">
          <div id="m3Cube" style="position:relative;width:120px;height:120px;transform-style:preserve-3d;transform:rotateX(-18deg) rotateY(30deg);transition:transform .1s linear"></div>
        </div>
        <input type="range" class="demo-slider" id="m3Rot" min="0" max="360" step="1" value="30">
      </div>`;
    const cube = c.querySelector('#m3Cube'), sl = c.querySelector('#m3Rot');
    const faces = [
      ['translateZ(60px)', 'linear-gradient(135deg,#8a6bff,#663af3)'],
      ['rotateY(180deg) translateZ(60px)', 'linear-gradient(135deg,#663af3,#4a24c0)'],
      ['rotateY(90deg) translateZ(60px)', 'linear-gradient(135deg,#027dea,#0159b3)'],
      ['rotateY(-90deg) translateZ(60px)', 'linear-gradient(135deg,#3aa0ff,#027dea)'],
      ['rotateX(90deg) translateZ(60px)', 'linear-gradient(135deg,#269684,#1b6b5e)'],
      ['rotateX(-90deg) translateZ(60px)', 'linear-gradient(135deg,#e46d4c,#c04a2b)'],
    ];
    cube.innerHTML = faces.map(f => `<div style="position:absolute;width:120px;height:120px;border:1px solid rgba(255,255,255,.25);${'transform:' + f[0]};background:${f[1]};opacity:.92"></div>`).join('');
    let ry = 30, rx = -18, spin = null;
    const timers = (window.__demoTimers ||= []);
    function apply() { cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; }
    sl.oninput = () => { ry = +sl.value; apply(); };
    c.querySelector('#m3Spin').onclick = () => {
      if (spin) return;
      spin = setInterval(() => { ry = (ry + 3) % 360; sl.value = ry; apply(); }, 40); timers.push(spin);
    };
    c.querySelector('#m3Stop').onclick = () => { clearInterval(spin); spin = null; };
  },

  /* ---------- 输出与放映（补充） ---------- */
  'speaker-notes'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" data-m="audience">观众屏</button><button class="demo-btn active" data-m="presenter">演讲者屏</button></div>
        <div class="mini-slide" id="snStage" style="padding:12px"></div>
        <div class="demo-label" id="snTip">演讲者屏能看到备注；观众屏只有干净正片</div>
      </div>`;
    const stage = c.querySelector('#snStage'), tip = c.querySelector('#snTip');
    const slideHTML = `<div style="background:linear-gradient(135deg,#27345f,#3a4d85);border-radius:8px;height:96px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px"><div style="font:700 20px var(--font-display);color:#fff">Q3 营收增长 31%</div><div style="font:12px var(--font-body);color:rgba(255,255,255,.8)">三大业务线全面上扬</div></div>`;
    function render(m) {
      if (m === 'audience') {
        tip.textContent = '观众屏：只有正片，看不到你的小抄';
        stage.innerHTML = slideHTML;
      } else {
        tip.textContent = '演讲者屏：正片 + 备注 + 计时，只有你看得到';
        stage.innerHTML = `<div style="display:flex;gap:10px">${slideHTML.replace('height:96px', 'height:96px;flex:1')}<div style="width:34%;background:rgba(186,214,247,.05);border:1px dashed var(--color-glass-edge);border-radius:8px;padding:8px;font:11px var(--font-body);color:var(--color-moon-mist)"><div style="font:10px var(--font-mono);color:var(--color-fog-veil);margin-bottom:4px">📝 备注</div>先抛数字，再讲三条主因，别念 PPT</div></div>`;
      }
    }
    render('presenter');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  rehearse(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn" id="rhStart">▶ 开始彩排</button><button class="demo-btn" id="rhNext" disabled style="opacity:.5">⏭ 下一页</button><button class="demo-btn" data-a="stop" id="rhStop">■ 结束</button></div>
        <div class="mini-slide" id="rhStage" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px">
          <div style="font:12px var(--font-body);color:var(--color-fog-veil)">总时长</div>
          <div id="rhTotal" style="font:700 32px var(--font-mono);color:var(--color-ice-highlight)">00:00</div>
          <div id="rhPages" style="font:11px var(--font-mono);color:var(--color-fog-veil)"></div>
        </div>
      </div>`;
    const start = c.querySelector('#rhStart'), next = c.querySelector('#rhNext'), stop = c.querySelector('#rhStop');
    const total = c.querySelector('#rhTotal'), pagesEl = c.querySelector('#rhPages');
    const timers = (window.__demoTimers ||= []);
    let t = 0, page = 1, pageT = 0, times = [], run = null;
    const fmt = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    function tick() { t++; pageT++; total.textContent = fmt(t); pagesEl.textContent = `第 ${page} 页：${fmt(pageT)}`; }
    start.onclick = () => {
      if (run) return;
      t = 0; page = 1; pageT = 0; times = []; total.textContent = '00:00';
      next.disabled = false; next.style.opacity = '1'; start.classList.add('active');
      run = setInterval(tick, 1000); timers.push(run);
    };
    next.onclick = () => { if (!run) return; times.push(pageT); page++; pageT = 0; };
    stop.onclick = () => {
      if (!run) return; clearInterval(run); run = null; times.push(pageT);
      start.classList.remove('active'); next.disabled = true; next.style.opacity = '.5';
      pagesEl.textContent = `彩排完成 · 共 ${times.length} 页 · 各页：` + times.map(fmt).join(' / ');
    };
  },

  'export-dpi'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">导出 DPI</span><span class="demo-label" id="edV" style="font-family:var(--font-mono)">96 DPI</span></div>
        <input type="range" class="demo-slider" id="edDpi" min="72" max="300" step="1" value="96">
        <div class="mini-slide" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;overflow:hidden">
          <div id="edText" style="font:700 36px var(--font-display);color:var(--color-ice-highlight)">高清导出</div>
          <div id="edImg" style="width:160px;height:80px;border-radius:10px;background:linear-gradient(135deg,#8a6bff,#027dea)"></div>
          <div class="demo-label" id="edTip">96 DPI：屏幕看还行，放大 / 印刷就糊</div>
        </div>
      </div>`;
    const sl = c.querySelector('#edDpi'), text = c.querySelector('#edText'), img = c.querySelector('#edImg'), tip = c.querySelector('#edTip');
    function upd() {
      const d = +sl.value;
      c.querySelector('#edV').textContent = d + ' DPI';
      const blur = Math.max(0, (300 - d) / 300 * 4).toFixed(2); // 越低越糊
      text.style.filter = `blur(${blur}px)`; img.style.filter = `blur(${blur}px)`;
      tip.textContent = d >= 300 ? '300 DPI：印刷级清晰，放大也锐利' : d >= 150 ? '150 DPI：屏幕清晰，印刷略糊' : '96 DPI：屏幕看还行，放大 / 印刷就糊';
    }
    sl.oninput = upd; upd();
  },

  /* ===== 本轮新增 15 个专属演示（A+B 全补） ===== */
  'outline-view'(c) {
    const data = [
      { t: '封面：2026 产品战略', b: ['副标题：让增长可复制'] },
      { t: '现状：三个核心问题', b: ['获客成本高', '留存下滑', '转化断层'] },
      { t: '方案：三步走', b: ['提效', '稳留', '促转'] }
    ];
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" role="group">
          <button class="demo-btn active" data-v="outline">大纲模式</button>
          <button class="demo-btn" data-v="slide">幻灯片模式</button>
        </div>
        <div id="ovBox" class="mini-slide" style="text-align:left"></div>
      </div>`;
    const box = c.querySelector('#ovBox');
    function render(mode) {
      if (mode === 'outline') {
        box.innerHTML = data.map((s, i) => `
          <div style="margin-bottom:10px">
            <div style="font:600 15px var(--font-display);color:var(--color-ice-highlight)">${i+1}. ${s.t}</div>
            ${s.b.map(x => `<div style="margin:3px 0 3px 22px;font:13px var(--font-body);color:var(--color-fog-veil)">• ${x}</div>`).join('')}
          </div>`).join('');
      } else {
        box.innerHTML = data.map((s, i) => `
          <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px;padding:8px 10px;background:rgba(186,214,247,0.04);border:1px solid rgba(186,214,247,0.12);border-radius:8px">
            <div style="flex:0 0 26px;height:26px;border-radius:6px;background:linear-gradient(135deg,#8a6bff,#027dea);display:flex;align-items:center;justify-content:center;font:600 12px var(--font-mono);color:#fff">${i+1}</div>
            <div><div style="font:600 13px var(--font-display);color:var(--color-ice-highlight)">${s.t}</div><div style="font:12px var(--font-body);color:var(--color-fog-veil)">${s.b.join(' · ')}</div></div>
          </div>`).join('');
      }
    }
    render('outline');
    c.querySelectorAll('[data-v]').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-v]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); render(btn.dataset.v);
    });
  },
  'font-pairing'(c) {
    const presets = {
      sc:   { title: "'PingFang SC','Microsoft YaHei',sans-serif", body: "var(--font-serif)", note: '无衬线标题压场 + 衬线正文易读，经典对比' },
      same: { title: "'PingFang SC',sans-serif", body: "'PingFang SC',sans-serif", note: '同族字体，标题 800 / 正文 400，统一不抢戏' },
      mix:  { title: "'PingFang SC',sans-serif", body: "var(--font-serif)", note: '衬线正文显雅致，与无衬线标题形成对比' }
    };
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-p="sc">无衬线+衬线</button>
          <button class="demo-btn" data-p="same">同族字重</button>
          <button class="demo-btn" data-p="mix">中英混排</button>
        </div>
        <div class="mini-slide" style="text-align:left">
          <div id="fpTitle" style="font-weight:800;font-size:22px;color:var(--color-ice-highlight);line-height:1.3">让增长可复制</div>
          <div id="fpBody" style="margin-top:10px;font-size:14px;color:var(--color-fog-veil);line-height:1.7">好的字体配对让标题压得住、正文读得顺。同一份内容，换个字体组合，档次立刻不同。</div>
          <div id="fpNote" class="demo-label" style="margin-top:12px"></div>
        </div>
      </div>`;
    const title = c.querySelector('#fpTitle'), body = c.querySelector('#fpBody'), note = c.querySelector('#fpNote');
    function apply(p) { title.style.fontFamily = presets[p].title; body.style.fontFamily = presets[p].body; note.textContent = presets[p].note; }
    apply('sc');
    c.querySelectorAll('[data-p]').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-p]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); apply(btn.dataset.p);
    });
  },
  'symmetry'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-s="sym">对称构图</button>
          <button class="demo-btn" data-s="asym">非对称构图</button>
        </div>
        <div id="syBox" class="mini-slide" style="position:relative;min-height:150px"></div>
      </div>`;
    const box = c.querySelector('#syBox');
    function render(mode) {
      if (mode === 'sym') {
        box.innerHTML = `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:30px">
          <div style="text-align:right"><div style="font:700 18px var(--font-display);color:var(--color-ice-highlight)">左栏标题</div><div class="demo-label">对称 · 稳重</div></div>
          <div style="width:90px;height:90px;border-radius:12px;background:linear-gradient(135deg,#8a6bff,#027dea)"></div>
          <div style="text-align:left"><div style="font:700 18px var(--font-display);color:var(--color-ice-highlight)">右栏标题</div><div class="demo-label">镜像平衡</div></div></div>`;
      } else {
        box.innerHTML = `<div style="position:absolute;left:18px;top:18px"><div style="font:700 18px var(--font-display);color:var(--color-ice-highlight)">偏左上标题</div><div class="demo-label">非对称 · 灵动</div></div>
          <div style="position:absolute;right:24px;bottom:18px;width:110px;height:80px;border-radius:12px;background:linear-gradient(135deg,#8a6bff,#027dea)"></div>`;
      }
    }
    render('sym');
    c.querySelectorAll('[data-s]').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-s]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); render(btn.dataset.s);
    });
  },
  'diagonal-flow'(c) {
    const timers = (window.__demoTimers ||= []);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between">
          <button class="demo-btn" data-a="play">▶ 播放视线流</button>
          <span class="demo-label">眼睛从左上扫到右下</span>
        </div>
        <div class="mini-slide" style="position:relative;height:180px;overflow:hidden;background:rgba(186,214,247,0.03)">
          <svg width="100%" height="100%" style="position:absolute;inset:0"><line x1="14%" y1="18%" x2="80%" y2="78%" stroke="rgba(139,107,255,0.5)" stroke-width="2" stroke-dasharray="5 5"/></svg>
          <div style="position:absolute;left:14%;top:18%;transform:translate(-50%,-50%);font:600 15px var(--font-display);color:var(--color-ice-highlight)">标题</div>
          <div style="position:absolute;left:46%;top:48%;transform:translate(-50%,-50%);width:80px;height:80px;border-radius:14px;background:linear-gradient(135deg,#8a6bff,#027dea)"></div>
          <div style="position:absolute;left:80%;top:78%;transform:translate(-50%,-50%);font:600 15px var(--font-display);color:var(--color-ice-highlight)">结论</div>
          <div id="dfDot" style="position:absolute;left:14%;top:22%;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 0 0 4px rgba(255,255,255,0.25);transform:translate(-50%,-50%)"></div>
        </div>
      </div>`;
    const dot = c.querySelector('#dfDot');
    let prog = 0, timer = null;
    function step() { prog = (prog + 0.02) % 1; dot.style.left = (14 + prog * 66) + '%'; dot.style.top = (22 + prog * 56) + '%'; }
    c.querySelector('[data-a="play"]').onclick = () => {
      if (timer) return;
      prog = 0; timer = setInterval(step, 30); timers.push(timer);
    };
  },
  'remove-bg'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-r="raw">原图（带背景）</button>
          <button class="demo-btn" data-r="cut">去背后</button>
        </div>
        <div id="rbBox" class="mini-slide" style="position:relative;height:150px;overflow:hidden"></div>
      </div>`;
    const box = c.querySelector('#rbBox');
    function render(mode) {
      if (mode === 'raw') {
        box.style.background = 'repeating-linear-gradient(45deg,#1b2233,#1b2233 8px,#222b40 8px,#222b40 16px)';
        box.innerHTML = `<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#ffb86b,#ff7eb6)"></div>`;
      } else {
        box.style.background = 'linear-gradient(135deg,#0a0e1a,#141b2e)';
        box.innerHTML = `<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#ffb86b,#ff7eb6);box-shadow:0 12px 30px rgba(0,0,0,0.5)"></div>`;
      }
    }
    render('raw');
    c.querySelectorAll('[data-r]').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-r]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); render(btn.dataset.r);
    });
  },
  'infographic'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-i="timeline">时间轴</button>
          <button class="demo-btn" data-i="flow">流程图</button>
          <button class="demo-btn" data-i="compare">对比图</button>
          <button class="demo-btn" data-i="stat">数据卡</button>
        </div>
        <div id="igBox" class="mini-slide" style="text-align:left;min-height:140px"></div>
      </div>`;
    const box = c.querySelector('#igBox');
    function render(k) {
      if (k === 'timeline') {
        box.innerHTML = `<div style="position:relative;padding-left:18px"><div style="position:absolute;left:5px;top:4px;bottom:4px;width:2px;background:linear-gradient(#8a6bff,#027dea)"></div>
          ${[['2023','起步'],['2024','增长'],['2025','规模化']].map(([y,t]) => `<div style="position:relative;margin:0 0 14px 0"><div style="position:absolute;left:-16px;top:4px;width:10px;height:10px;border-radius:50%;background:#8a6bff"></div><b style="color:var(--color-ice-highlight);font:600 14px var(--font-display)">${y}</b> <span class="demo-label">${t}</span></div>`).join('')}</div>`;
      } else if (k === 'flow') {
        box.innerHTML = [['开始','#8a6bff'],['处理','#027dea'],['完成','#19c37d']].map(([t,col],i) => `<span style="display:inline-flex;align-items:center;gap:8px"><span style="padding:6px 12px;border-radius:8px;background:${col};color:#fff;font:600 13px var(--font-display)">${t}</span>${i<2?'<span style="color:var(--color-fog-veil)">→</span>':''}</span>`).join('');
      } else if (k === 'compare') {
        box.innerHTML = `<div style="display:flex;gap:12px"><div style="flex:1;padding:10px;border-radius:8px;background:rgba(25,195,125,0.12);border:1px solid rgba(25,195,125,0.4)"><div style="font:600 13px var(--font-display);color:#19c37d">方案 A</div><div class="demo-label">快 · 省</div></div><div style="flex:1;padding:10px;border-radius:8px;background:rgba(255,126,182,0.12);border:1px solid rgba(255,126,182,0.4)"><div style="font:600 13px var(--font-display);color:#ff7eb6">方案 B</div><div class="demo-label">稳 · 全</div></div></div>`;
      } else {
        box.innerHTML = `<div style="display:flex;gap:10px">${[['+38%','转化率'],['2.1x','留存'],['¥0','边际成本']].map(([n,l]) => `<div style="flex:1;padding:12px;border-radius:8px;background:rgba(186,214,247,0.05);border:1px solid rgba(186,214,247,0.12)"><div style="font:700 20px var(--font-display);color:var(--color-ice-highlight)">${n}</div><div class="demo-label">${l}</div></div>`).join('')}</div>`;
      }
    }
    render('timeline');
    c.querySelectorAll('[data-i]').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-i]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); render(btn.dataset.i);
    });
  },
  'brand-vi'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-b="ok">遵循 VI</button>
          <button class="demo-btn" data-b="bad">乱用</button>
        </div>
        <div id="viBox" class="mini-slide" style="display:flex;gap:8px;justify-content:center"></div>
      </div>`;
    const box = c.querySelector('#viBox');
    const mk = (bg, accent, side) => `<div style="width:70px;height:48px;border-radius:6px;background:${bg};position:relative;border:1px solid rgba(186,214,247,0.15)"><div style="position:absolute;top:6px;${side==='left'?'left:6px':'right:6px'};width:14px;height:14px;border-radius:3px;background:${accent}"></div></div>`;
    function render(mode) {
      if (mode === 'ok') {
        const bg = 'linear-gradient(135deg,#0d1430,#16203f)', a = '#027dea';
        box.innerHTML = [mk(bg,a,'left'),mk(bg,a,'left'),mk(bg,a,'left')].join('');
      } else {
        box.innerHTML = [mk('#1a1030','#ff7eb6','right'),mk('#102a1a','#19c37d','left'),mk('#2a1a10','#ffb86b','right')].join('');
      }
    }
    render('ok');
    c.querySelectorAll('[data-b]').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-b]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); render(btn.dataset.b);
    });
  },
  'notes-master'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <span class="demo-label">每页张数</span>
          <button class="demo-btn" data-n="1">1</button>
          <button class="demo-btn" data-n="2">2</button>
          <button class="demo-btn active" data-n="3">3</button>
          <button class="demo-btn" data-n="4">4</button>
          <button class="demo-btn" data-n="6">6</button>
          <button class="demo-btn" data-n="9">9</button>
        </div>
        <div class="mini-slide" style="background:#fff;border-radius:6px;padding:10px">
          <div id="nmGrid" style="display:grid;gap:6px"></div>
          <div id="nmNote" class="demo-label" style="color:#475569;margin-top:8px"></div>
        </div>
      </div>`;
    const grid = c.querySelector('#nmGrid'), note = c.querySelector('#nmNote');
    function render(n) {
      const cols = n <= 1 ? 1 : n <= 4 ? 2 : 3;
      grid.style.gridTemplateColumns = `repeat(${cols},1fr)`;
      grid.innerHTML = Array.from({length:n}, (_,i) => `<div style="aspect-ratio:4/3;border-radius:4px;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font:600 12px #94a3b8">${i+1}</div>`).join('');
      note.textContent = `讲义母版：每页 ${n} 张，可加边栏笔记区`;
    }
    render(3);
    c.querySelectorAll('[data-n]').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-n]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); render(+btn.dataset.n);
    });
  },
  'quick-access'(c) {
    const all = ['插入形状','格式刷','对齐','组合','置于顶层'];
    const pinned = ['保存','撤销'];
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">快速访问工具栏（点命令钉上 / 取消）</div>
        <div id="qaBar" style="display:flex;gap:6px;padding:8px 10px;background:rgba(186,214,247,0.05);border:1px solid rgba(186,214,247,0.15);border-radius:8px;flex-wrap:wrap"></div>
        <div class="demo-row" id="qaCmds" style="flex-wrap:wrap">
          ${all.map(x => `<button class="demo-btn" data-qa="${x}">＋ ${x}</button>`).join('')}
        </div>
      </div>`;
    const bar = c.querySelector('#qaBar');
    function renderBar() { bar.innerHTML = pinned.map(x => `<span style="padding:4px 10px;border-radius:6px;background:linear-gradient(135deg,#8a6bff,#027dea);color:#fff;font:600 12px var(--font-display)">${x}</span>`).join(''); }
    renderBar();
    c.querySelectorAll('[data-qa]').forEach(btn => btn.onclick = () => {
      const x = btn.dataset.qa, i = pinned.indexOf(x);
      if (i >= 0) { pinned.splice(i,1); btn.classList.remove('active'); }
      else { pinned.push(x); btn.classList.add('active'); }
      renderBar();
    });
  },
  'find-replace'(c) {
    const lines = ['第 1 页：欢迎使用 旧名 产品','第 5 页：旧名 的核心优势','第 9 页：旧名 客户案例'];
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="gap:8px;flex-wrap:wrap;align-items:center">
          <input id="frFind" value="旧名" style="width:70px;padding:5px 8px;border-radius:6px;border:1px solid rgba(186,214,247,0.25);background:rgba(186,214,247,0.06);color:var(--color-ice-highlight);font:13px var(--font-body)">
          <span class="demo-label">→</span>
          <input id="frRep" value="新名" style="width:70px;padding:5px 8px;border-radius:6px;border:1px solid rgba(186,214,247,0.25);background:rgba(186,214,247,0.06);color:var(--color-ice-highlight);font:13px var(--font-body)">
          <button class="demo-btn" data-a="go">替换全部</button>
        </div>
        <div id="frBox" class="mini-slide" style="text-align:left"></div>
      </div>`;
    const box = c.querySelector('#frBox'), fEl = c.querySelector('#frFind'), rEl = c.querySelector('#frRep');
    function hl(s, f) { return s.split(f).join(`<mark style="background:rgba(255,200,80,0.35);color:#fff;border-radius:3px;padding:0 2px">${f}</mark>`); }
    function render() { const f = fEl.value || '旧名'; box.innerHTML = lines.map(l => `<div style="margin:6px 0;font:13px var(--font-body);color:var(--color-fog-veil)">${hl(l, f)}</div>`).join(''); }
    render();
    c.querySelector('[data-a="go"]').onclick = () => {
      const f = fEl.value, r = rEl.value;
      for (let i = 0; i < lines.length; i++) lines[i] = lines[i].split(f).join(r);
      render();
    };
  },
  'loop-anim'(c) {
    const timers = (window.__demoTimers ||= []);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between">
          <button class="demo-btn active" data-a="toggle">⏸ 暂停</button>
          <span class="demo-label">循环：持续旋转</span>
        </div>
        <div class="mini-slide" style="display:flex;align-items:center;justify-content:center">
          <div id="laShape" style="width:100px;height:100px;border-radius:20px;background:linear-gradient(135deg,#8a6bff,#027dea)"></div>
        </div>
      </div>`;
    const shape = c.querySelector('#laShape'), btn = c.querySelector('[data-a="toggle"]');
    let deg = 0, timer = null;
    function tick() { deg = (deg + 4) % 360; shape.style.transform = `rotate(${deg}deg)`; }
    timer = setInterval(tick, 40); timers.push(timer);
    btn.onclick = () => {
      if (timer) { clearInterval(timer); timers.splice(timers.indexOf(timer),1); timer = null; btn.textContent = '▶ 播放'; btn.classList.remove('active'); }
      else { timer = setInterval(tick, 40); timers.push(timer); btn.textContent = '⏸ 暂停'; btn.classList.add('active'); }
    };
  },
  'custom-show'(c) {
    const sets = { all: [1,2,3,4,5,6], boss: [1,3,5], client: [2,4,6] };
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-cs="all">完整放映</button>
          <button class="demo-btn" data-cs="boss">管理层版</button>
          <button class="demo-btn" data-cs="client">客户版</button>
        </div>
        <div id="csBox" class="mini-slide" style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;justify-content:center"></div>
        <div id="csNote" class="demo-label"></div>
      </div>`;
    const box = c.querySelector('#csBox'), note = c.querySelector('#csNote');
    function render(k) {
      const inc = sets[k];
      box.innerHTML = Array.from({length:6}, (_,i) => {
        const on = inc.includes(i+1);
        return `<div style="width:46px;height:34px;border-radius:6px;display:flex;align-items:center;justify-content:center;font:600 13px var(--font-display);${on?'background:linear-gradient(135deg,#8a6bff,#027dea);color:#fff':'background:rgba(186,214,247,0.06);color:var(--color-fog-veil);opacity:0.4'}">${i+1}</div>`;
      }).join('');
      note.textContent = `本场放映 ${inc.length} 页：${inc.join(' → ')}`;
    }
    render('all');
    c.querySelectorAll('[data-cs]').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-cs]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); render(btn.dataset.cs);
    });
  },
  'screen-blank-pen'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-sb="normal">正常</button>
          <button class="demo-btn" data-sb="black">黑屏 (B)</button>
          <button class="demo-btn" data-sb="white">白屏 (W)</button>
          <button class="demo-btn" data-sb="pen">标注笔 (P)</button>
        </div>
        <div id="sbBox" class="mini-slide" style="position:relative;height:150px;overflow:hidden;background:#0a0e1a;display:flex;align-items:center;justify-content:center">
          <div id="sbText" style="font:600 16px var(--font-display);color:var(--color-ice-highlight)">当前幻灯片内容</div>
          <svg id="sbSvg" width="100%" height="100%" style="position:absolute;inset:0;display:none">
            <circle cx="40%" cy="40%" r="26" fill="none" stroke="#ff4d4f" stroke-width="3"/>
            <circle cx="68%" cy="62%" r="20" fill="none" stroke="#ff4d4f" stroke-width="3"/>
            <path d="M40% 40% Q54% 52% 68% 62%" fill="none" stroke="#ffd34d" stroke-width="2" stroke-dasharray="4 3"/>
          </svg>
        </div>
      </div>`;
    const box = c.querySelector('#sbBox'), text = c.querySelector('#sbText'), svg = c.querySelector('#sbSvg');
    function render(m) {
      svg.style.display = 'none';
      if (m === 'normal') { box.style.background = '#0a0e1a'; text.style.display = 'block'; text.style.color = 'var(--color-ice-highlight)'; }
      else if (m === 'black') { box.style.background = '#000'; text.style.display = 'none'; }
      else if (m === 'white') { box.style.background = '#fff'; text.style.display = 'block'; text.style.color = '#0a0e1a'; }
      else if (m === 'pen') { box.style.background = '#0a0e1a'; text.style.display = 'block'; svg.style.display = 'block'; }
    }
    render('normal');
    c.querySelectorAll('[data-sb]').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-sb]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); render(btn.dataset.sb);
    });
  },
  'present-online'(c) {
    const timers = (window.__demoTimers ||= []);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between">
          <div><button class="demo-btn active" data-po="off">离线</button><button class="demo-btn" data-po="on" style="margin-left:6px">开始联机</button></div>
          <span class="demo-label">把放映同步给远程观众</span>
        </div>
        <div id="poBox" class="mini-slide" style="text-align:left"></div>
      </div>`;
    const box = c.querySelector('#poBox');
    let pulse = null;
    function render(m) {
      if (m === 'off') {
        if (pulse) { clearInterval(pulse); timers.splice(timers.indexOf(pulse),1); pulse = null; }
        box.innerHTML = `<div class="demo-label">未连接，观众看不到你的放映</div>`;
      } else {
        box.innerHTML = `
          <div style="display:flex;align-items:center;gap:8px"><span id="poDot" style="width:10px;height:10px;border-radius:50%;background:#19c37d"></span><b style="color:var(--color-ice-highlight);font:600 14px var(--font-display)">正在放映 · 已同步</b></div>
          <div class="demo-label" style="margin-top:6px">3 位远程观众已连接，跟着你翻页</div>
          <div style="display:flex;gap:6px;margin-top:8px">${['A','B','C'].map(n=>`<span style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#8a6bff,#027dea);color:#fff;display:flex;align-items:center;justify-content:center;font:600 12px var(--font-display)">${n}</span>`).join('')}</div>`;
        const dot = box.querySelector('#poDot');
        pulse = setInterval(() => { dot.style.opacity = dot.style.opacity === '0.3' ? '1' : '0.3'; }, 600);
        timers.push(pulse);
      }
    }
    render('off');
    c.querySelectorAll('[data-po]').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-po]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); render(btn.dataset.po);
    });
  },
  'font-license'(c) {
    const fonts = [
      { n: '思源黑体', t: '免费商用', f: true },
      { n: '站酷快乐体', t: '免费商用', f: true },
      { n: '苹方 PingFang', t: '系统自带·限制', f: false },
      { n: '微软雅黑', t: '需授权', f: false },
      { n: '方正兰亭', t: '需授权', f: false }
    ];
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-f="all">全部</button>
          <button class="demo-btn" data-f="free">免费商用</button>
          <button class="demo-btn" data-f="paid">需授权</button>
        </div>
        <div id="flBox" class="mini-slide" style="text-align:left"></div>
      </div>`;
    const box = c.querySelector('#flBox');
    function render(filter) {
      box.innerHTML = fonts.filter(x => filter === 'all' || (filter === 'free' ? x.f : !x.f))
        .map(x => `<div style="display:flex;align-items:center;justify-content:space-between;margin:6px 0;padding:6px 10px;border-radius:6px;background:rgba(186,214,247,0.05);border:1px solid rgba(186,214,247,0.12)">
          <span style="font:600 13px var(--font-display);color:var(--color-ice-highlight)">${x.n}</span>
          <span style="font:600 12px var(--font-mono);color:${x.f?'#19c37d':'#ff7eb6'}">${x.t}</span></div>`).join('');
    }
    render('all');
    c.querySelectorAll('[data-f]').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-f]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); render(btn.dataset.f);
    });
  },

  'edit-points'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="normal">圆角矩形</button>
          <button class="demo-btn" data-m="points">编辑顶点</button>
          <button class="demo-btn" data-m="drop">拉成水滴</button>
        </div>
        <div class="mini-slide" id="epStage" style="display:flex;align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#epStage');
    function render(m) {
      if (m === 'normal') s.innerHTML = `<svg viewBox="0 0 200 120" style="width:160px;height:96px"><rect x="40" y="30" width="120" height="60" rx="18" fill="#663af3"/></svg>`;
      else if (m === 'points') s.innerHTML = `<svg viewBox="0 0 200 120" style="width:160px;height:96px"><rect x="40" y="30" width="120" height="60" rx="18" fill="rgba(102,58,243,.5)" stroke="#8a6bff"/><g fill="#19c37d" stroke="#fff" stroke-width="1"><rect x="36" y="26" width="8" height="8"/><rect x="156" y="26" width="8" height="8"/><rect x="36" y="86" width="8" height="8"/><rect x="156" y="86" width="8" height="8"/></g></svg>`;
      else s.innerHTML = `<svg viewBox="0 0 200 120" style="width:160px;height:96px"><path d="M70,90 Q40,60 70,30 Q110,30 110,60 Q110,90 70,90 Z" fill="#663af3"/><circle cx="100" cy="42" r="5" fill="#19c37d" stroke="#fff"/></svg>`;
    }
    render('normal');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'theme-variant'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="blue">蓝版</button>
          <button class="demo-btn" data-m="orange">橙版</button>
          <button class="demo-btn" data-m="green">绿版</button>
          <button class="demo-btn" data-m="purple">紫版</button>
        </div>
        <div class="mini-slide" id="tvStage" style="display:flex;flex-direction:column;gap:10px;align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#tvStage');
    const pal = { blue: ['#3aa0ff', '#027dea'], orange: ['#ff9d4d', '#e8692a'], green: ['#36c98e', '#1b8f63'], purple: ['#8a6bff', '#663af3'] };
    function render(m) {
      const [a, b] = pal[m];
      s.innerHTML = `<div style="font:700 20px var(--font-display);color:${b}">项目提案</div><div style="display:flex;gap:8px"><div style="width:46px;height:10px;border-radius:5px;background:${a}"></div><div style="width:70px;height:10px;border-radius:5px;background:${b}"></div></div><div style="width:90px;height:34px;border-radius:6px;background:linear-gradient(135deg,${a},${b})"></div>`;
    }
    render('blue');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  'action-button'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="jump">跳转页</button>
          <button class="demo-btn" data-m="sound">播放声音</button>
          <button class="demo-btn" data-m="link">打开链接</button>
        </div>
        <div class="mini-slide" id="abStage" style="display:flex;flex-direction:column;gap:12px;align-items:center;justify-content:center">
          <div id="abBtn" style="padding:10px 18px;border-radius:24px;background:linear-gradient(135deg,#8a6bff,#663af3);color:#fff;font:600 14px var(--font-display);cursor:pointer">点击我</div>
          <div id="abMsg" style="font:13px var(--font-mono);color:var(--color-fog-veil)">点按钮看动作效果</div>
        </div>
      </div>`;
    const msg = c.querySelector('#abMsg');
    const map = { jump: '→ 跳转到指定幻灯片', sound: '♪ 播放提示音', link: '↗ 打开网页 / 文件' };
    function act(m) { msg.textContent = map[m]; }
    c.querySelector('#abBtn').onclick = () => act(c.querySelector('[data-m].active').dataset.m);
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => act(b.dataset.m));
  },

  'comment'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="show">批注中</button>
          <button class="demo-btn" data-m="resolved">已解决</button>
        </div>
        <div class="mini-slide" id="cmStage" style="position:relative;padding:16px"></div>
      </div>`;
    const s = c.querySelector('#cmStage');
    function render(m) {
      if (m === 'show') s.innerHTML = `<div style="font:600 15px var(--font-display);color:var(--color-ice-highlight)">季度复盘</div><div style="margin-top:8px;font:13px var(--font-mono);color:var(--color-fog-veil)">这段结论太笼统</div><div style="position:absolute;right:14px;top:14px;width:26px;height:26px;border-radius:50%;background:#ff7eb6;color:#fff;display:flex;align-items:center;justify-content:center;font:600 13px var(--font-display)">1</div><div style="position:absolute;right:8px;top:42px;max-width:120px;padding:8px 10px;border-radius:8px;background:rgba(255,126,182,.15);border:1px solid rgba(255,126,182,.4);font:12px var(--font-mono);color:#ffd4e8">同事：这里再加个数据支撑？</div>`;
      else s.innerHTML = `<div style="font:600 15px var(--font-display);color:var(--color-ice-highlight)">季度复盘</div><div style="margin-top:8px;font:13px var(--font-mono);color:var(--color-fog-veil)">这段结论太笼统</div><div style="margin-top:10px;font:12px var(--font-mono);color:#19c37d">✓ 批注已解决，从版面移除</div>`;
    }
    render('show');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'ruler'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="on">标尺开</button>
          <button class="demo-btn" data-m="off">标尺关</button>
        </div>
        <div class="mini-slide" id="ruStage" style="padding:0;overflow:hidden"></div>
      </div>`;
    const s = c.querySelector('#ruStage');
    function render(m) {
      if (m === 'off') { s.innerHTML = `<div style="position:absolute;left:20%;top:40%;width:60%;height:24%;background:rgba(102,58,243,.5);border-radius:4px"></div>`; return; }
      s.innerHTML = `<div style="position:absolute;top:0;left:0;right:0;height:14px;background:repeating-linear-gradient(90deg,rgba(186,214,247,.25) 0 1px,transparent 1px 20px)"></div><div style="position:absolute;top:0;bottom:0;left:14px;width:14px;background:repeating-linear-gradient(0deg,rgba(186,214,247,.25) 0 1px,transparent 1px 20px)"></div><div style="position:absolute;left:20%;top:38%;width:60%;height:26%;background:rgba(102,58,243,.5);border-radius:4px"></div>`;
    }
    render('on');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'template'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="blank">空白</button>
          <button class="demo-btn" data-m="tpl">公司模板</button>
        </div>
        <div class="mini-slide" id="tpStage" style="position:relative;display:flex;flex-direction:column;gap:8px;align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#tpStage');
    function render(m) {
      if (m === 'blank') s.innerHTML = `<div style="font:600 15px var(--font-display);color:var(--color-fog-veil)">空白页…自己排版</div>`;
      else s.innerHTML = `<div style="position:absolute;top:0;left:0;right:0;height:8px;background:linear-gradient(90deg,#663af3,#027dea)"></div><div style="position:absolute;top:10px;right:12px;width:18px;height:18px;border-radius:4px;background:#027dea;color:#fff;font:700 10px var(--font-display);display:flex;align-items:center;justify-content:center">Y</div><div style="font:700 18px var(--font-display);color:var(--color-ice-highlight)">封面标题</div><div style="width:80px;height:8px;border-radius:4px;background:rgba(102,58,243,.6)"></div>`;
    }
    render('blank');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'compare-merge'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="mine">我的</button>
          <button class="demo-btn" data-m="his">他的</button>
          <button class="demo-btn" data-m="merge">合并</button>
        </div>
        <div class="mini-slide" id="cmpStage" style="display:flex;gap:10px;align-items:center;justify-content:center;padding:12px"></div>
      </div>`;
    const s = c.querySelector('#cmpStage');
    function page(label, lines, diff) {
      return `<div style="width:44%;height:84%;border:1px solid ${diff ? '#ff7eb6' : 'var(--color-glass-edge)'};border-radius:6px;padding:8px;background:rgba(186,214,247,.04);display:flex;flex-direction:column;gap:5px"><div style="font:600 11px var(--font-display);color:var(--color-ice-highlight)">${label}</div>${lines.map(l => `<div style="height:6px;border-radius:3px;background:${l}"></div>`).join('')}${diff ? '<div style="font:10px var(--font-mono);color:#ff7eb6">● 此页有改动</div>' : ''}</div>`;
    }
    function render(m) {
      if (m === 'mine') s.innerHTML = page('我的版', ['#663af3', 'rgba(186,214,247,.3)', '#027dea'], false) + page('他的版', ['#663af3', 'rgba(186,214,247,.3)', '#ff7eb6'], true);
      else if (m === 'his') s.innerHTML = page('我的版', ['#663af3', 'rgba(186,214,247,.3)', '#027dea'], true) + page('他的版', ['#663af3', 'rgba(186,214,247,.3)', '#ff7eb6'], false);
      else s.innerHTML = page('合并后', ['#663af3', 'rgba(186,214,247,.3)', '#ff7eb6'], false) + page('合并后', ['#663af3', 'rgba(186,214,247,.3)', '#ff7eb6'], false);
    }
    render('mine');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'wordart'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="plain">普通</button>
          <button class="demo-btn" data-m="wa">艺术字</button>
          <button class="demo-btn" data-m="wave">变形</button>
        </div>
        <div class="mini-slide" id="waStage" style="display:flex;align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#waStage');
    function render(m) {
      if (m === 'plain') s.innerHTML = `<div style="font:800 30px var(--font-display);color:var(--color-ice-highlight)">标题</div>`;
      else if (m === 'wa') s.innerHTML = `<div style="font:800 30px var(--font-display);background:linear-gradient(180deg,#ffd76b,#e8692a);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 2px 6px rgba(232,105,42,.4)">标题</div>`;
      else s.innerHTML = `<div style="font:800 30px var(--font-display);background:linear-gradient(90deg,#8a6bff,#027dea,#19c37d,#ff7eb6);-webkit-background-clip:text;background-clip:text;color:transparent;transform:skewX(-8deg)">标题</div>`;
    }
    render('plain');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'object-effect'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="none">无</button>
          <button class="demo-btn" data-m="shadow">阴影</button>
          <button class="demo-btn" data-m="glow">发光</button>
          <button class="demo-btn" data-m="reflection">映像</button>
        </div>
        <div class="mini-slide" id="oeStage" style="display:flex;align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#oeStage');
    function render(m) {
      const st = { none: 'none', shadow: '0 10px 18px rgba(0,0,0,.5)', glow: '0 0 18px 4px rgba(138,107,255,.7)', reflection: 'none' }[m];
      const extra = m === 'reflection' ? `<div style="margin-top:6px;width:80px;height:22px;border-radius:10px;background:linear-gradient(180deg,rgba(102,58,243,.5),transparent);transform:scaleY(-1);opacity:.5"></div>` : '';
      s.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center"><div style="width:80px;height:44px;border-radius:12px;background:linear-gradient(135deg,#8a6bff,#027dea);box-shadow:${st}"></div>${extra}</div>`;
    }
    render('none');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'textbox-placeholder'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="ph">占位符</button>
          <button class="demo-btn" data-m="tb">文本框</button>
        </div>
        <div class="mini-slide" id="tpStage2" style="display:flex;flex-direction:column;gap:8px;justify-content:center;padding:12px"></div>
      </div>`;
    const s = c.querySelector('#tpStage2');
    function render(m) {
      if (m === 'ph') s.innerHTML = `<div style="font:600 12px var(--font-mono);color:#19c37d">改母版标题色 → 所有页同步</div><div style="padding:8px 10px;border:1px dashed rgba(25,195,125,.5);border-radius:6px;color:var(--color-ice-highlight);font:600 14px var(--font-display)">标题占位符</div><div style="padding:8px 10px;border:1px dashed rgba(25,195,125,.5);border-radius:6px;color:var(--color-ice-highlight);font:600 14px var(--font-display)">标题占位符</div>`;
      else s.innerHTML = `<div style="font:600 12px var(--font-mono);color:#ff7eb6">文本框独立 → 改一处只改这一页</div><div style="padding:8px 10px;border:1px solid var(--color-glass-edge);border-radius:6px;color:var(--color-ice-highlight);font:600 14px var(--font-display)">文本框 A</div><div style="padding:8px 10px;border:1px solid var(--color-glass-edge);border-radius:6px;color:var(--color-fog-veil);font:600 14px var(--font-display)">文本框 B（样式不同）</div>`;
    }
    render('ph');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'bullet'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="none">无</button>
          <button class="demo-btn" data-m="dot">项目符号</button>
          <button class="demo-btn" data-m="num">编号</button>
          <button class="demo-btn" data-m="nested">多级</button>
        </div>
        <div class="mini-slide" id="buStage" style="display:flex;flex-direction:column;gap:6px;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#buStage');
    const items = ['核心观点一', '核心观点二', '核心观点三'];
    function render(m) {
      if (m === 'none') s.innerHTML = items.map(t => `<div style="font:13px var(--font-mono);color:var(--color-frost-glow)">${t}</div>`).join('');
      else if (m === 'dot') s.innerHTML = items.map(t => `<div style="font:13px var(--font-mono);color:var(--color-frost-glow)"><span style="color:#8a6bff">●</span> ${t}</div>`).join('');
      else if (m === 'num') s.innerHTML = items.map((t, i) => `<div style="font:13px var(--font-mono);color:var(--color-frost-glow)"><span style="color:#027dea;font-weight:700">${i + 1}.</span> ${t}</div>`).join('');
      else s.innerHTML = `<div style="font:13px var(--font-mono);color:var(--color-frost-glow)"><span style="color:#8a6bff">●</span> 一级标题</div><div style="font:13px var(--font-mono);color:var(--color-fog-veil);margin-left:18px"><span style="color:#027dea">–</span> 二级要点</div><div style="font:13px var(--font-mono);color:var(--color-frost-glow)"><span style="color:#8a6bff">●</span> 一级标题</div>`;
    }
    render('none');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'hide-slide'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="skip">正常放映</button>
          <button class="demo-btn" data-m="show">Alt 临时显示</button>
        </div>
        <div class="mini-slide" id="hsStage" style="display:flex;gap:6px;align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#hsStage');
    function thumb(n, hidden, shown) {
      const op = hidden && !shown ? .25 : 1;
      const tag = hidden ? (shown ? '显' : '隐') : '';
      return `<div style="position:relative;width:30px;height:22px;border-radius:4px;background:${n === 2 ? '#663af3' : 'rgba(186,214,247,.18)'};opacity:${op};display:flex;align-items:center;justify-content:center;font:600 9px var(--font-display);color:#fff">${n}${tag ? '<span style="position:absolute;top:-3px;right:-3px;background:#ff7eb6;color:#fff;border-radius:6px;font:600 7px var(--font-mono);padding:0 2px">' + tag + '</span>' : ''}</div>`;
    }
    function render(m) {
      const shown = m === 'show';
      s.innerHTML = [1, 2, 3, 4].map(n => thumb(n, n === 2, shown)).join('') + `<div style="margin-left:6px;font:11px var(--font-mono);color:${shown ? '#19c37d' : 'var(--color-fog-veil)'}">${shown ? '第2页临时放出' : '第2页被跳过'}</div>`;
    }
    render('skip');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'narration'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn" data-a="rec" id="naRec">● 录制旁白</button>
          <button class="demo-btn" data-a="play" id="naPlay">▶ 播放</button>
        </div>
        <div class="mini-slide" id="naStage" style="display:flex;flex-direction:column;gap:10px;align-items:center;justify-content:center">
          <div id="naWave" style="display:flex;gap:3px;align-items:flex-end;height:40px"></div>
          <div id="naTime" style="font:13px var(--font-mono);color:var(--color-fog-veil)">未录制</div>
        </div>
      </div>`;
    const wave = c.querySelector('#naWave');
    const time = c.querySelector('#naTime');
    const rec = c.querySelector('#naRec');
    const play = c.querySelector('#naPlay');
    const timers = (window.__demoTimers ||= []);
    const bars = Array.from({ length: 14 }, () => { const b = document.createElement('div'); b.style.cssText = 'width:4px;height:8px;background:rgba(186,214,247,.4);border-radius:2px'; wave.appendChild(b); return b; });
    let t = 0, recTimer = null;
    rec.onclick = () => {
      if (recTimer) { clearInterval(recTimer); recTimer = null; time.textContent = '录制完成 ' + t + 's'; rec.textContent = '● 录制旁白'; return; }
      t = 0; time.textContent = '录制中 0s'; rec.textContent = '■ 停止';
      recTimer = setInterval(() => { t++; time.textContent = '录制中 ' + t + 's'; const h = 8 + Math.random() * 28; bars.forEach(b => b.style.height = h + 'px'); }, 500);
      timers.push(recTimer);
    };
    play.onclick = () => {
      if (recTimer) return;
      let p = 0; time.textContent = '播放中 0s';
      const pt = setInterval(() => { p++; time.textContent = '播放中 ' + p + 's'; if (p >= 3) { clearInterval(pt); time.textContent = '播放结束'; } }, 500);
      timers.push(pt);
    };
  },

  'transparency'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="op100">不透明</button>
          <button class="demo-btn" data-m="op50">半透明</button>
          <button class="demo-btn" data-m="op20">很透</button>
        </div>
        <div class="mini-slide" id="trStage" style="display:flex;align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#trStage');
    function render(m) {
      const op = m === 'op100' ? 1 : m === 'op50' ? 0.5 : 0.2;
      s.innerHTML = `<div style="position:relative;width:120px;height:80px;border-radius:10px;background:linear-gradient(135deg,#027dea,#1b8f63)"><div style="position:absolute;inset:0;border-radius:10px;background:rgba(255,255,255,.9);opacity:${op};display:flex;align-items:center;justify-content:center;font:600 13px var(--font-mono);color:#333">白块 ${op * 100}%</div></div>`;
    }
    render('op100');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  /* ============ 补充：按优先级新增（2026-07-25） ============ */
  'slide-size'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="43">4:3 传统</button>
          <button class="demo-btn" data-m="169">16:9 宽屏</button>
          <button class="demo-btn" data-m="a4">A4 打印</button>
        </div>
        <div class="demo-row" style="justify-content:center">
          <div id="ssBox" style="background:linear-gradient(135deg,#663af3,#027dea);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font:600 14px var(--font-mono);box-shadow:0 10px 30px rgba(0,0,0,.4)"></div>
        </div>
        <div class="demo-label" id="ssTip"></div>
      </div>`;
    const box = c.querySelector('#ssBox'), tip = c.querySelector('#ssTip');
    const map = { '43': [176, 132, '4:3 · 偏方，信息容量大'], '169': [200, 112, '16:9 · 宽屏，贴合投影/屏幕'], 'a4': [150, 212, 'A4 · 竖向，适合打印讲义'] };
    function render(m) {
      const [w, h, t] = map[m];
      box.style.width = w + 'px'; box.style.height = h + 'px';
      box.textContent = m === '43' ? '4:3' : m === '169' ? '16:9' : 'A4';
      tip.textContent = t;
    }
    render('43');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'replace-font'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="yahei">微软雅黑</button>
          <button class="demo-btn" data-m="song">宋体</button>
          <button class="demo-btn" data-m="kai">楷体</button>
          <button class="demo-btn" data-m="mono">等宽</button>
        </div>
        <div class="mini-slide" style="display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px">
          <div id="rfText" style="font-size:24px;color:#fff"></div>
          <div style="font:12px var(--font-mono);color:rgba(199,211,234,.5)">同一段字，换字体气质全变</div>
        </div>
      </div>`;
    const t = c.querySelector('#rfText');
    const fam = { yahei: '"Microsoft YaHei","PingFang SC","Noto Sans SC",sans-serif', song: 'var(--font-serif)', kai: 'KaiTi,"楷体","STKaiti","Noto Serif SC","Noto Serif CJK SC",serif', mono: 'monospace' };
    function render(m) { t.style.fontFamily = fam[m]; t.textContent = '优卡导航'; }
    render('yahei');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'gridlines'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="on">显示网格线</button>
          <button class="demo-btn" data-m="off">隐藏</button>
        </div>
        <div class="mini-slide" id="glStage" style="position:relative;overflow:hidden"></div>
      </div>`;
    const s = c.querySelector('#glStage');
    function render(m) {
      const on = m === 'on';
      s.style.background = on
        ? 'linear-gradient(rgba(186,214,247,.20) 1px,transparent 1px),linear-gradient(90deg,rgba(186,214,247,.20) 1px,transparent 1px),var(--surface-frosted-glass)'
        : 'var(--surface-frosted-glass)';
      s.style.backgroundSize = on ? '14px 14px' : 'auto';
      s.innerHTML = on ? '<div style="position:absolute;left:20%;top:28%;width:42%;height:26%;background:rgba(102,58,243,.5);border-radius:6px"></div>' : '';
    }
    render('on');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'recolor'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="orig">原图</button>
          <button class="demo-btn" data-m="violet">紫色调</button>
          <button class="demo-btn" data-m="gray">灰度</button>
          <button class="demo-btn" data-m="wash">冲蚀</button>
        </div>
        <div class="mini-slide" style="display:flex;align-items:center;justify-content:center">
          <div id="rcBox" style="width:120px;height:120px;border-radius:10px;background:conic-gradient(from 0deg,#ff6b6b,#ffd93d,#6bcb77,#4d96ff,#b06bff,#ff6b6b)"></div>
        </div>
      </div>`;
    const box = c.querySelector('#rcBox');
    const fx = { orig: { f: 'none', o: 1 }, violet: { f: 'hue-rotate(220deg) saturate(1.2)', o: 1 }, gray: { f: 'grayscale(1)', o: 1 }, wash: { f: 'grayscale(1) brightness(1.3) contrast(.8)', o: .55 } };
    function render(m) { box.style.filter = fx[m].f; box.style.opacity = fx[m].o; }
    render('orig');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'coauthor'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="multi">2 人协作中</button>
          <button class="demo-btn" data-m="solo">单人编辑</button>
        </div>
        <div class="mini-slide" id="caStage" style="position:relative;overflow:hidden"></div>
      </div>`;
    const s = c.querySelector('#caStage');
    const ppl = [{ x: 22, y: 26, c: '#663af3', n: '优卡' }, { x: 56, y: 52, c: '#269684', n: '小林' }];
    function render(m) {
      if (m === 'solo') { s.innerHTML = '<div style="position:absolute;left:22%;top:28%;width:46%;height:28%;background:rgba(102,58,243,.4);border-radius:6px"></div>'; return; }
      s.innerHTML = ppl.map(p => `<div style="position:absolute;left:${p.x}%;top:${p.y}%;display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:50%;background:${p.c};display:inline-block"></span><span style="font:11px var(--font-body);color:#fff;background:${p.c};padding:1px 6px;border-radius:4px">${p.n}</span></div>`).join('') + '<div style="position:absolute;left:22%;top:28%;width:46%;height:28%;background:rgba(102,58,243,.22);border:1px dashed rgba(102,58,243,.6);border-radius:6px"></div>';
    }
    render('multi');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'text-margin'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="tight">贴边</button>
          <button class="demo-btn" data-m="loose">内边距 16px</button>
        </div>
        <div class="mini-slide" style="display:flex;align-items:center;justify-content:center">
          <div id="tmBox" style="width:62%;background:rgba(102,58,243,.18);border:1px solid rgba(102,58,243,.5);border-radius:8px;color:#fff;font:13px var(--font-body)">金句框：留白让文字更透气</div>
        </div>
      </div>`;
    const b = c.querySelector('#tmBox');
    function render(m) { b.style.padding = m === 'tight' ? '2px 4px' : '14px 16px'; }
    render('tight');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },

  'visual-flow'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="good">引导有序</button>
          <button class="demo-btn" data-m="bad">视线乱跳</button>
        </div>
        <div class="mini-slide" id="vfStage" style="position:relative"></div>
      </div>`;
    const s = c.querySelector('#vfStage');
    function render(m) {
      if (m === 'good') {
        s.innerHTML = '<div style="position:absolute;left:14%;top:16%;width:34%;height:20%;background:rgba(102,58,243,.5);border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font:12px var(--font-body)">① 大标题</div><div style="position:absolute;left:14%;top:50%;width:34%;height:18%;background:rgba(186,214,247,.2);border-radius:6px"></div><div style="position:absolute;left:56%;top:32%;width:30%;height:34%;background:rgba(38,150,132,.4);border-radius:6px"></div><div style="position:absolute;left:42%;top:28%;color:#fff;font:18px var(--font-mono)">↓→</div>';
      } else {
        s.innerHTML = '<div style="position:absolute;left:60%;top:14%;width:28%;height:16%;background:rgba(228,109,76,.5);border-radius:6px"></div><div style="position:absolute;left:12%;top:60%;width:30%;height:20%;background:rgba(102,58,243,.4);border-radius:6px"></div><div style="position:absolute;left:58%;top:62%;width:28%;height:18%;background:rgba(186,214,247,.2);border-radius:6px"></div><div style="position:absolute;left:30%;top:20%;color:#ffb4a8;font:11px var(--font-mono)">眼睛到处乱飞</div>';
      }
    }
    render('good');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'info-density'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="low">低密度（封面）</button>
          <button class="demo-btn" data-m="high">高密度（数据页）</button>
        </div>
        <div class="mini-slide" id="idStage" style="position:relative"></div>
      </div>`;
    const s = c.querySelector('#idStage');
    function render(m) {
      if (m === 'low') {
        s.innerHTML = '<div style="position:absolute;left:0;right:0;top:44%;text-align:center;color:#fff;font:600 18px var(--font-body)">一句话金句</div>';
      } else {
        let bars = '';
        for (let i = 0; i < 5; i++) bars += `<div style="position:absolute;left:${10 + i * 18}%;top:${18 + (i % 2) * 22}%;width:14%;height:30%;background:rgba(102,58,243,${0.25 + i * 0.12});border-radius:4px"></div>`;
        s.innerHTML = bars + '<div style="position:absolute;left:10%;top:8%;color:#fff;font:11px var(--font-mono)">图表 + 要点密集排布</div>';
      }
    }
    render('low');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  'consistency'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="unified">风格统一</button>
          <button class="demo-btn" data-m="messy">风格杂乱</button>
        </div>
        <div class="mini-slide" id="csStage" style="position:relative"></div>
      </div>`;
    const s = c.querySelector('#csStage');
    function chip(x, y, col, txt) { return `<div style="position:absolute;left:${x}%;top:${y}%;width:30%;height:18%;background:${col};border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font:11px var(--font-body)">${txt}</div>`; }
    function render(m) {
      if (m === 'unified') {
        s.innerHTML = chip(12, 30, 'rgba(102,58,243,.5)', '同色同圆角') + chip(50, 30, 'rgba(102,58,243,.5)', '同色同圆角') + chip(12, 56, 'rgba(102,58,243,.5)', '同色同圆角') + chip(50, 56, 'rgba(102,58,243,.5)', '同色同圆角');
      } else {
        s.innerHTML = chip(12, 30, 'rgba(102,58,243,.5)', '紫·圆角') + chip(50, 30, 'rgba(228,109,76,.6)', '橙·方角') + chip(12, 56, 'rgba(38,150,132,.5)', '绿·虚线') + chip(50, 56, 'rgba(186,214,247,.3)', '灰·异形');
      }
    }
    render('unified');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  /* ============ 扩容补充 demos ============ */
  'slide-sorter'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="single">普通视图</button><button class="demo-btn" data-m="sorter">浏览视图</button></div>
        <div id="ssStage" class="mini-slide" style="display:flex;justify-content:center;padding:16px"></div>
      </div>`;
    const s = c.querySelector('#ssStage');
    function render(m) {
      if (m === 'single') {
        s.style.flexDirection = 'column'; s.style.flexWrap = 'nowrap'; s.style.alignItems = 'center'; s.style.gap = '10px';
        s.innerHTML = `<div style="width:80%;aspect-ratio:16/9;background:rgba(186,214,247,.08);border:1px solid var(--color-glass-edge);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--color-fog-veil);font:13px var(--font-body)">当前页（一次只看一页）</div>`;
      } else {
        s.style.flexDirection = 'row'; s.style.flexWrap = 'wrap'; s.style.alignItems = 'flex-start'; s.style.gap = '10px';
        let h = '';
        for (let i = 1; i <= 8; i++) h += `<div style="width:30%;aspect-ratio:16/9;background:rgba(102,58,243,.12);border:1px solid rgba(102,58,243,.4);border-radius:6px;display:flex;align-items:center;justify-content:center;color:#c9b6ff;font:12px var(--font-mono)">${i}</div>`;
        s.innerHTML = h;
      }
    }
    render('single');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },
  'notes-page'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="slide">只有幻灯片</button><button class="demo-btn" data-m="notes">+备注区</button></div>
        <div id="npStage" class="mini-slide" style="display:flex;flex-direction:column;gap:8px;padding:16px"></div>
      </div>`;
    const s = c.querySelector('#npStage');
    function render(m) {
      const slide = `<div style="width:100%;aspect-ratio:16/9;background:rgba(186,214,247,.08);border:1px solid var(--color-glass-edge);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--color-fog-veil);font:13px var(--font-body)">幻灯片（观众看到）</div>`;
      s.innerHTML = m === 'notes'
        ? slide + `<div style="width:100%;min-height:44px;background:rgba(102,58,243,.1);border:1px dashed rgba(102,58,243,.5);border-radius:8px;padding:8px 10px;color:#c9b6ff;font:12px var(--font-body)">备注区：逐字稿 / 数据口径（只有你看到）</div>`
        : slide;
    }
    render('slide');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },
  'reading-view'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="normal">普通视图</button><button class="demo-btn" data-m="reading">阅读视图</button></div>
        <div id="rvStage" class="mini-slide" style="display:flex;align-items:center;justify-content:center;padding:16px"></div>
      </div>`;
    const s = c.querySelector('#rvStage');
    function render(m) {
      if (m === 'normal') {
        s.style.background = 'transparent';
        s.innerHTML = `<div style="width:62%;aspect-ratio:16/9;background:rgba(186,214,247,.08);border:1px solid var(--color-glass-edge);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--color-fog-veil);font:13px var(--font-body)">编辑态（有标尺 / 缩略图）</div>`;
      } else {
        s.style.background = 'rgba(0,0,0,.55)';
        s.innerHTML = `<div style="width:82%;aspect-ratio:16/9;background:#0e1530;border:1px solid var(--color-glass-edge);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--color-ice-highlight);font:20px var(--font-display)">全屏沉浸自查（Esc 退出）</div>`;
      }
    }
    render('normal');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },
  'fill-rate'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="high">高版面率</button><button class="demo-btn" data-m="low">低版面率</button></div>
        <div id="frStage" class="mini-slide" style="display:flex;flex-direction:column;justify-content:center;gap:8px;padding:18px"></div>
      </div>`;
    const s = c.querySelector('#frStage');
    function render(m) {
      if (m === 'high') {
        s.innerHTML = `<div style="font:16px var(--font-display);color:var(--color-ice-highlight)">季度复盘</div>` + Array(5).fill(0).map((_, i) => `<div style="height:10px;background:rgba(199,211,234,.25);border-radius:3px;width:${90 - i * 8}%"></div>`).join('');
      } else {
        s.innerHTML = `<div style="font:13px var(--font-mono);letter-spacing:.1em;color:var(--color-fog-veil)">QUARTERLY</div><div style="font:40px var(--font-display);background:var(--gradient-ice-highlight);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent">复盘</div>`;
      }
    }
    render('high');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },
  'cmyk-rgb'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="rgb">屏幕 RGB</button><button class="demo-btn" data-m="cmyk">印刷 CMYK</button></div>
        <div id="crStage" class="mini-slide" style="display:flex;align-items:center;justify-content:center;gap:22px;padding:18px"></div>
      </div>`;
    const s = c.querySelector('#crStage');
    function render(m) {
      const rgb = 'linear-gradient(135deg,#2f7bff,#00c2ff)';
      const cmyk = 'linear-gradient(135deg,#3a6fcf,#3f9bbf)';
      s.innerHTML = `<div style="width:88px;height:88px;border-radius:14px;background:${m === 'rgb' ? rgb : cmyk};box-shadow:0 0 18px ${m === 'rgb' ? 'rgba(47,123,255,.5)' : 'rgba(58,111,207,.3)'}"></div><div style="font:13px var(--font-body);color:var(--color-moon-mist);max-width:120px">${m === 'rgb' ? '屏幕发光、色域广、更艳' : '印刷吸光、色域窄，蓝绿常发灰发暗'}</div>`;
    }
    render('rgb');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },
  'text-outline'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="off">无描边</button><button class="demo-btn" data-m="on">加描边</button></div>
        <div id="toStage" class="mini-slide" style="display:flex;align-items:center;justify-content:center;padding:18px;background:linear-gradient(135deg,#0b1c3a,#27345f)"></div>
      </div>`;
    const s = c.querySelector('#toStage');
    function render(m) {
      const fs = '40px var(--font-display)';
      s.innerHTML = m === 'off'
        ? `<div style="font:${fs};color:#dfe7f5">标题压花底</div>`
        : `<div style="font:${fs};color:#fff;-webkit-text-stroke:2px rgba(10,15,30,.85);text-shadow:0 2px 8px rgba(0,0,0,.4)">标题压花底</div>`;
    }
    render('off');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },
  'bg-format'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="solid">纯色</button><button class="demo-btn" data-m="grad">渐变</button><button class="demo-btn" data-m="img">图片</button></div>
        <div id="bgStage" class="mini-slide" style="display:flex;align-items:center;justify-content:center;padding:18px;width:100%;aspect-ratio:16/9"></div>
      </div>`;
    const s = c.querySelector('#bgStage');
    function render(m) {
      s.style.background = m === 'solid' ? 'rgba(186,214,247,.1)' : m === 'grad' ? 'radial-gradient(circle at 30% 30%,#27345f,#0b1c3a)' : 'linear-gradient(135deg,rgba(11,28,58,.85),rgba(39,52,95,.85)),repeating-linear-gradient(45deg,#1b2347,#1b2347 10px,#222c52 10px,#222c52 20px)';
      s.innerHTML = `<div style="font:22px var(--font-display);color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.5)">背景不挡内容</div>`;
    }
    render('solid');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },
  'action-settings'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">点下方按钮试试（模拟「单击 → 跳转 / 响应」）</div>
        <div id="asStage" class="mini-slide" style="display:flex;align-items:center;justify-content:center;padding:18px">
          <button class="demo-btn" id="asBtn">目录 · 章节1</button>
        </div>
      </div>`;
    const btn = c.querySelector('#asBtn');
    let n = 1;
    btn.onclick = () => { n = (n % 3) + 1; btn.textContent = '目录 · 章节' + n; btn.style.boxShadow = '0 0 16px rgba(102,58,243,.6)'; };
  },
  'emphasis-fx'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="pulse">脉冲</button><button class="demo-btn" data-m="spin">陀螺旋</button><button class="demo-btn" data-m="grow">放大</button></div>
        <div id="efStage" class="mini-slide" style="display:flex;align-items:center;justify-content:center;padding:18px"></div>
      </div>`;
    const s = c.querySelector('#efStage');
    function render(m) {
      const anim = m === 'pulse' ? 'efPulse 1s ease-in-out infinite' : m === 'spin' ? 'efSpin 2s linear infinite' : 'efGrow 1.2s ease-in-out infinite alternate';
      s.innerHTML = `<div style="width:90px;height:90px;border-radius:18px;background:rgba(102,58,243,.5);border:1px solid #8a6bff;display:flex;align-items:center;justify-content:center;color:#fff;font:14px var(--font-body);animation:${anim};box-shadow:0 0 18px rgba(102,58,243,.5)">核心</div>`;
    }
    render('pulse');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },
  'icons'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="mix">风格混搭</button><button class="demo-btn" data-m="uni">统一线性</button></div>
        <div id="icStage" class="mini-slide" style="display:flex;align-items:center;justify-content:center;gap:14px;padding:18px"></div>
      </div>`;
    const s = c.querySelector('#icStage');
    function draw(style) {
      const mk = (b, col, bd) => `<div style="width:46px;height:46px;border-radius:12px;background:${b};border:${bd};display:flex;align-items:center;justify-content:center;color:${col};font:20px var(--font-display)">◧</div>`;
      if (style === 'mix') return mk('rgba(2,125,234,.2)', '#5fb0ff', '2px solid #027dea') + mk('rgba(228,109,76,.25)', '#e46d4c', '2px dashed #e46d4c') + mk('rgba(38,150,132,.2)', '#4fd0b8', '2px solid #269684');
      return mk('rgba(102,58,243,.18)', '#b79bff', '2px solid #663af3') + mk('rgba(102,58,243,.18)', '#b79bff', '2px solid #663af3') + mk('rgba(102,58,243,.18)', '#b79bff', '2px solid #663af3');
    }
    function render(m) { s.innerHTML = draw(m); }
    render('mix');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },
  'autosave'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">自动保存中 → 意外关闭也能从「文档恢复」捞回</div>
        <div id="asvStage" class="mini-slide" style="display:flex;flex-direction:column;gap:10px;justify-content:center;padding:18px"></div>
      </div>`;
    const s = c.querySelector('#asvStage');
    s.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px"><div style="width:14px;height:14px;border-radius:50%;background:#269684;box-shadow:0 0 10px rgba(38,150,132,.6)"></div><span style="font:13px var(--font-body);color:var(--color-moon-mist)">自动保存：每 5 分钟写盘</span></div>
      <div style="font:13px var(--font-body);color:var(--color-fog-veil)">软件崩溃 / 误关 → 重开弹出「恢复未保存的文件」</div>
      <div style="font:11px var(--font-mono);color:#c9b6ff">提示：关键节点仍建议手动另存一次</div>`;
  },
  'vertical-text'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="h">横排</button><button class="demo-btn" data-m="v">竖排</button></div>
        <div id="vtStage" class="mini-slide" style="display:flex;align-items:center;justify-content:center;padding:18px"></div>
      </div>`;
    const s = c.querySelector('#vtStage');
    function render(m) {
      s.innerHTML = m === 'h'
        ? `<div style="font:34px var(--font-display);color:var(--color-ice-highlight);letter-spacing:.05em">国风金句</div>`
        : `<div style="writing-mode:vertical-rl;font:34px var(--font-display);color:var(--color-ice-highlight);letter-spacing:.1em">国风金句</div>`;
    }
    render('h');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => render(b.dataset.m));
  },

  /* ===== 第三批扩容 demos（10 条）===== */
  'para-spacing'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="tight">紧凑贴死</button><button class="demo-btn" data-m="loose">段后留白</button></div>
        <div class="mini-slide" id="psStage" style="align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#psStage');
    function render(m) {
      const gap = m === 'loose' ? '14px' : '2px';
      s.innerHTML = `<div style="text-align:left;color:var(--color-moon-mist);font:13px/1.6 var(--font-body);max-width:340px">
        <p style="margin:0 0 ${gap} 0">第一段：做 PPT 最怕段落贴在一起，读起来喘不过气。</p>
        <p style="margin:0">第二段：拉开段后间距，整页立刻有了呼吸感和节奏。</p>
      </div>`;
    }
    render('tight');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'chart-edit'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="num">原始数字</button><button class="demo-btn" data-m="chart">插入图表</button></div>
        <div class="mini-slide" id="ceStage" style="align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#ceStage');
    const data = [120, 180, 90, 210]; const max = 210;
    function render(m) {
      if (m === 'num') {
        s.innerHTML = `<div style="font:13px var(--font-body);color:var(--color-moon-mist)">Q1 120　Q2 180　Q3 90　Q4 210</div>`;
      } else {
        s.innerHTML = `<div style="display:flex;align-items:flex-end;gap:16px;height:120px">` +
          data.map(v => `<div style="width:36px;height:${v / max * 100}%;background:linear-gradient(180deg,#663af3,#9a7bff);border-radius:6px 6px 0 0;display:flex;align-items:flex-start;justify-content:center;color:#fff;font:11px var(--font-mono);padding-top:4px">${v}</div>`).join('') +
          `</div>`;
      }
    }
    render('num');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'audio-insert'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="off">无音频</button><button class="demo-btn" data-m="on">插入音频</button></div>
        <div class="mini-slide" id="auStage" style="align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#auStage');
    function render(m) {
      const on = m === 'on';
      s.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:10px">
        <div style="width:88px;height:88px;border-radius:50%;background:${on ? 'rgba(102,58,243,.25)' : 'rgba(199,211,234,.1)'};border:1px solid ${on ? '#663af3' : 'var(--color-glass-edge)'};display:flex;align-items:center;justify-content:center;font-size:32px">${on ? '🔊' : '🔇'}</div>
        <div style="font:13px var(--font-body);color:var(--color-moon-mist)">${on ? '背景乐 · 跨页播放 · 淡出' : '无音频'}</div>
      </div>`;
    }
    render('off');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'video-insert'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="off">视频截图</button><button class="demo-btn" data-m="on">可播视频</button></div>
        <div class="mini-slide" id="viStage" style="align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#viStage');
    function render(m) {
      const on = m === 'on';
      s.innerHTML = `<div style="position:relative;width:200px;height:112px;border-radius:10px;background:${on ? 'linear-gradient(135deg,#027dea,#1b8f63)' : 'rgba(199,211,234,.12)'};display:flex;align-items:center;justify-content:center;border:1px solid var(--color-glass-edge)">
        ${on ? '<div style="width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,.92);display:flex;align-items:center;justify-content:center;color:#663af3;font-size:18px">▶</div><div style="position:absolute;bottom:6px;right:8px;font:11px var(--font-mono);color:#fff">全屏 · 自动播</div>' : '<div style="font:12px var(--font-body);color:var(--color-fog-veil)">视频截图</div>'}
      </div>`;
    }
    render('off');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'a11y'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="bad">问题多</button><button class="demo-btn" data-m="ok">检查通过</button></div>
        <div class="mini-slide" id="axStage" style="align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#axStage');
    function render(m) {
      const ok = m === 'ok';
      s.innerHTML = `<div style="display:flex;align-items:center;gap:14px">
        <div style="position:relative;width:96px;height:64px;border-radius:8px;background:linear-gradient(135deg,#663af3,#027dea)">
          <div style="position:absolute;bottom:4px;left:4px;font:10px var(--font-mono);color:${ok ? '#9affb0' : '#ff9a9a'};background:rgba(0,0,0,.45);padding:1px 4px;border-radius:3px">alt ${ok ? '✓' : '✗'}</div>
        </div>
        <div style="font:13px var(--font-body);color:${ok ? '#9affb0' : '#ff9a9a'};text-align:left">${ok ? 'alt 齐全 · 对比度达标<br>阅读顺序正确' : '缺 alt · 对比度不足<br>顺序错乱'}</div>
      </div>`;
    }
    render('bad');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'excel-table'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="static">静态截图</button><button class="demo-btn" data-m="live">嵌入活表</button></div>
        <div class="mini-slide" id="etStage" style="align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#etStage');
    const rows = [['月份', '营收'], ['1月', '120'], ['2月', '180'], ['3月', '150']];
    const tbl = '<table style="border-collapse:collapse;font:12px var(--font-body);color:var(--color-moon-mist)">' +
      rows.map(r => '<tr>' + r.map(x => `<td style="border:1px solid var(--color-glass-edge);padding:4px 12px">${x}</td>`).join('') + '</tr>').join('') + '</table>';
    function render(m) {
      const live = m === 'live';
      s.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:8px">${tbl}<div style="font:12px var(--font-body);color:${live ? '#9a7bff' : 'var(--color-fog-veil)'}">${live ? '嵌入活表 · 双击改数 · 更新链接同步' : '截图表格 · 改了得重做'}</div></div>`;
    }
    render('static');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'text-link'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="single">单框溢出</button><button class="demo-btn" data-m="linked">链接两框</button></div>
        <div class="mini-slide" id="tlStage" style="align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#tlStage');
    function render(m) {
      const linked = m === 'linked';
      if (!linked) {
        s.innerHTML = `<div style="width:160px;height:96px;border:1px dashed var(--color-glass-edge);border-radius:8px;padding:8px;font:12px var(--font-body);color:var(--color-moon-mist);overflow:hidden;text-align:left">这是一段较长的文字，单框装不下就会溢出或被截断，读起来不完整……（溢出部分丢失）</div>`;
      } else {
        s.innerHTML = `<div style="display:flex;gap:10px">
          <div style="width:92px;height:96px;border:1px solid #663af3;border-radius:8px;padding:6px;font:11px var(--font-body);color:var(--color-moon-mist);overflow:hidden;text-align:left">这是一段较长的文字，第一个框装不下的</div>
          <div style="width:92px;height:96px;border:1px solid #663af3;border-radius:8px;padding:6px;font:11px var(--font-body);color:var(--color-moon-mist);overflow:hidden;text-align:left">部分，自动流进第二个框，文字不断意。</div>
        </div>`;
      }
    }
    render('single');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'section-view'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="flat">长条展开</button><button class="demo-btn" data-m="fold">按节折叠</button></div>
        <div class="mini-slide" id="svStage" style="align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#svStage');
    function render(m) {
      const folded = m === 'fold';
      if (!folded) {
        s.innerHTML = `<div style="display:flex;flex-direction:column;gap:4px;width:240px">` +
          Array.from({ length: 8 }, () => `<div style="height:16px;border-radius:4px;background:rgba(199,211,234,.12)"></div>`).join('') +
          `<div style="font:11px var(--font-body);color:var(--color-fog-veil);margin-top:4px">80 页一整条，找页靠滚</div></div>`;
      } else {
        s.innerHTML = `<div style="display:flex;flex-direction:column;gap:8px;width:240px;text-align:left">
          <div style="font:12px var(--font-body);color:#fff">▾ 执行摘要（3 页）</div>
          <div style="font:12px var(--font-body);color:#fff;opacity:.5">▸ 市场分析（20 页）</div>
          <div style="font:12px var(--font-body);color:#fff;opacity:.5">▸ 方案详情（40 页）</div>
          <div style="font:11px var(--font-body);color:var(--color-fog-veil)">按节折叠，只展开要讲的</div>
        </div>`;
      }
    }
    render('flat');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'ai-gen'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="blank">空白发呆</button><button class="demo-btn" data-m="gen">AI 出初稿</button></div>
        <div class="mini-slide" id="agStage" style="align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#agStage');
    function render(m) {
      const gen = m === 'gen';
      if (!gen) {
        s.innerHTML = `<div style="width:180px;height:110px;border:1px dashed var(--color-glass-edge);border-radius:8px;display:flex;align-items:center;justify-content:center;font:12px var(--font-body);color:var(--color-fog-veil)">空白页…从哪下手？</div>`;
      } else {
        s.innerHTML = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:200px">
          ${Array.from({ length: 6 }, () => `<div style="height:30px;border-radius:4px;background:rgba(102,58,243,.3);border:1px solid rgba(102,58,243,.5)"></div>`).join('')}
          <div style="grid-column:1/4;font:11px var(--font-body);color:#9a7bff">AI 出 10 页初稿 · 你改重点</div>
        </div>`;
      }
    }
    render('blank');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'gestalt'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="scatter">散落</button><button class="demo-btn" data-m="group">分组</button></div>
        <div class="mini-slide" id="gtStage" style="align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#gtStage');
    function render(m) {
      const grouped = m === 'group';
      if (!grouped) {
        s.innerHTML = `<div style="position:relative;width:240px;height:110px">
          <div style="position:absolute;left:20px;top:20px;width:26px;height:26px;border-radius:50%;background:rgba(199,211,234,.4)"></div>
          <div style="position:absolute;left:182px;top:14px;width:26px;height:26px;border-radius:50%;background:rgba(199,211,234,.4)"></div>
          <div style="position:absolute;left:96px;top:72px;width:26px;height:26px;border-radius:50%;background:rgba(199,211,234,.4)"></div>
          <div style="position:absolute;left:20px;top:82px;height:0">元素散落，读不出谁和谁一组</div>
        </div>`;
      } else {
        s.innerHTML = `<div style="position:relative;width:240px;height:110px">
          <div style="position:absolute;left:32px;top:26px;width:26px;height:26px;border-radius:50%;background:#663af3"></div>
          <div style="position:absolute;left:66px;top:26px;width:26px;height:26px;border-radius:50%;background:#663af3"></div>
          <div style="position:absolute;left:100px;top:26px;width:26px;height:26px;border-radius:50%;background:#663af3"></div>
          <div style="position:absolute;left:150px;top:70px;font:11px var(--font-body);color:#fff">相近 → 被看成一组</div>
        </div>`;
      }
    }
    render('scatter');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'embed-link'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="embed">嵌入</button><button class="demo-btn" data-m="link">链接</button></div>
        <div class="mini-slide" id="elStage" style="align-items:center;justify-content:center"></div>
        <div style="font:11px var(--font-mono);color:rgba(255,255,255,.45);text-align:center" id="elNote"></div>
      </div>`;
    const s = c.querySelector('#elStage');
    const note = c.querySelector('#elNote');
    function render(m) {
      const isEmbed = m === 'embed';
      if (isEmbed) {
        s.innerHTML = `<div style="width:150px;height:100px;border-radius:8px;background:linear-gradient(135deg,#663af3,#8b5cf6);display:flex;align-items:center;justify-content:center;font:12px var(--font-body);color:#fff">✓ 图片正常显示</div>`;
        note.textContent = '体积大，但换电脑 / 发出去都能放';
      } else {
        s.innerHTML = `<div style="width:150px;height:100px;border-radius:8px;border:1px dashed #e46d4c;display:flex;align-items:center;justify-content:center;font:12px var(--font-body);color:#e46d4c;text-align:center;padding:8px;line-height:1.4">⚠ 找不到文件<br>图片变空白</div>`;
        note.textContent = '体积小，但换电脑就丢图';
      }
    }
    render('embed');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'theme-palette'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="violet">主题色：紫</button><button class="demo-btn" data-m="teal">主题色：青</button><button class="demo-btn" data-m="amber">主题色：橙</button></div>
        <div class="demo-row" id="tpSwatches" style="gap:4px;flex-wrap:wrap;justify-content:center"></div>
        <div class="demo-row" id="tpSlides" style="gap:10px"></div>
      </div>`;
    const sw = c.querySelector('#tpSwatches');
    const sl = c.querySelector('#tpSlides');
    const cols = { violet:'#663af3', teal:'#269684', amber:'#e6952b' };
    sw.innerHTML = Array.from({ length:12 }, (_, i) => `<div style="width:18px;height:18px;border-radius:4px;background:${i < 6 ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.5)'}"></div>`).join('');
    function render(m) {
      const col = cols[m];
      sl.innerHTML = '';
      for (let i = 1; i <= 3; i++) {
        const d = document.createElement('div');
        d.className = 'mini-slide';
        d.style.borderTop = `5px solid ${col}`;
        d.innerHTML = `<div style="position:absolute;top:20%;left:10%;width:55%;height:10%;background:${col};border-radius:3px;opacity:.85"></div><div style="position:absolute;top:45%;left:10%;width:70%;height:6%;background:rgba(255,255,255,.15);border-radius:3px"></div>`;
        sl.appendChild(d);
      }
    }
    render('violet');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'doc-inspector'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="before">检查前</button><button class="demo-btn" data-m="after">检查后</button></div>
        <div class="mini-slide" id="diStage" style="position:relative;align-items:flex-start;justify-content:flex-start;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#diStage');
    function render(m) {
      if (m === 'before') {
        s.innerHTML = `
          <div style="width:80%;height:10px;background:rgba(255,255,255,.3);border-radius:3px;margin-bottom:10px"></div>
          <div style="width:60%;height:8px;background:rgba(255,255,255,.18);border-radius:3px;margin-bottom:14px"></div>
          <div style="position:absolute;top:38px;right:16px;background:#e6c84c;color:#1a1505;font:10px var(--font-body);padding:3px 7px;border-radius:10px">批注：这段先别写死</div>
          <div style="position:absolute;bottom:14px;left:14px;font:10px var(--font-mono);color:#e46d4c">备注：内部草稿… 作者：翁昕耀</div>`;
      } else {
        s.innerHTML = `
          <div style="width:80%;height:10px;background:rgba(255,255,255,.3);border-radius:3px;margin-bottom:10px"></div>
          <div style="width:60%;height:8px;background:rgba(255,255,255,.18);border-radius:3px;margin-bottom:14px"></div>
          <div style="font:11px var(--font-body);color:#7ee0a8;margin-top:18px">✓ 已清除：批注 ×1 · 备注 ×1 · 元数据</div>`;
      }
    }
    render('before');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'live-caption'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="off">关闭</button><button class="demo-btn" data-m="on">开启（译英）</button></div>
        <div class="mini-slide" id="lcStage" style="position:relative;align-items:center;justify-content:center">
          <div style="width:70%;text-align:center;font:12px var(--font-body);color:rgba(255,255,255,.8)">第三季度成果汇报</div>
          <div id="lcCap" style="position:absolute;bottom:10px;left:8%;right:8%;display:none;background:rgba(0,0,0,.6);color:#fff;font:11px var(--font-body);padding:5px 8px;border-radius:6px;text-align:center"></div>
        </div>
      </div>`;
    const cap = c.querySelector('#lcCap');
    function render(m) {
      if (m === 'on') {
        cap.style.display = 'block';
        cap.textContent = 'Today we present Q3 results.';
      } else {
        cap.style.display = 'none';
      }
    }
    render('off');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'version-history'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" id="vhList" style="gap:8px;flex-wrap:wrap;justify-content:center"></div>
        <div class="mini-slide" id="vhStage" style="align-items:center;justify-content:center;font:11px var(--font-body);color:rgba(255,255,255,.8);text-align:center;line-height:1.6"></div>
      </div>`;
    const list = c.querySelector('#vhList');
    const s = c.querySelector('#vhStage');
    const vers = [
      { t: 'v3 · 现在（改崩）', d: '结构乱、配色崩', col: '#e46d4c' },
      { t: 'v2 · 30 分钟前', d: '微调中', col: 'rgba(255,255,255,.4)' },
      { t: 'v1 · 2 小时前', d: '结构清晰 ✓', col: '#663af3' }
    ];
    list.innerHTML = vers.map((v, i) => `<button class="demo-btn ${i === 0 ? 'active' : ''}" data-i="${i}" style="flex-direction:column;gap:2px;align-items:flex-start"><span style="font-size:11px">${v.t}</span><span style="font-size:9px;opacity:.6">${v.d}</span></button>`).join('');
    function render(i) {
      const v = vers[i];
      s.innerHTML = `还原到「${v.t}」<br><span style="color:${v.col}">${v.d}</span>`;
    }
    render(0);
    list.querySelectorAll('[data-i]').forEach(b => b.onclick = () => {
      list.querySelectorAll('.demo-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      render(+b.dataset.i);
    });
  },
  'ink-draw'(c) {
    c.innerHTML = `
      <div class="top-row" style="margin-bottom:10px"></div>
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="before">批注前</button><button class="demo-btn" data-m="after">批注后</button></div>
        <div class="mini-slide" id="idStage" style="position:relative;align-items:flex-start;justify-content:flex-start;padding:14px">
          <div style="width:75%;height:9px;background:rgba(255,255,255,.3);border-radius:3px;margin-bottom:9px"></div>
          <div style="width:55%;height:7px;background:rgba(255,255,255,.18);border-radius:3px"></div>
        </div>
      </div>`;
    const s = c.querySelector('#idStage');
    function render(m) {
      const base = `<div style="width:75%;height:9px;background:rgba(255,255,255,.3);border-radius:3px;margin-bottom:9px"></div><div style="width:55%;height:7px;background:rgba(255,255,255,.18);border-radius:3px"></div>`;
      if (m === 'after') {
        s.innerHTML = base + `
          <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 200 120" preserveAspectRatio="none">
            <ellipse cx="72" cy="42" rx="60" ry="28" fill="none" stroke="#e6c84c" stroke-width="3" opacity=".9"/>
            <path d="M152 96 L170 70" stroke="#e46d4c" stroke-width="3" fill="none"/>
            <text x="150" y="66" font-size="11" fill="#e46d4c" font-family="sans-serif">改这里</text>
          </svg>`;
      } else {
        s.innerHTML = base;
      }
    }
    render('before');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'color-psychology'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="red">红</button><button class="demo-btn" data-m="blue">蓝</button><button class="demo-btn" data-m="green">绿</button><button class="demo-btn" data-m="yellow">黄</button></div>
        <div class="mini-slide" id="cpStage" style="align-items:center;justify-content:center;flex-direction:column;gap:10px">
          <div id="cpName" style="width:54px;height:54px;border-radius:50%"></div>
          <div id="cpWords" style="font:11px var(--font-body);color:#fff;text-align:center;line-height:1.5"></div>
        </div>
      </div>`;
    const name = c.querySelector('#cpName');
    const words = c.querySelector('#cpWords');
    const map = {
      red:    { c: '#e6483d', w: '紧迫 · 热情 · 警示' },
      blue:   { c: '#2f6fdb', w: '信任 · 专业 · 冷静' },
      green:  { c: '#2f9e6b', w: '生长 · 自然 · 安全' },
      yellow: { c: '#e6b800', w: '活力 · 提醒 · 乐观' }
    };
    function render(m) {
      name.style.background = map[m].c;
      words.textContent = map[m].w;
    }
    render('red');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'warm-cool'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="warm">暖色主导</button><button class="demo-btn" data-m="cool">冷色主导</button></div>
        <div class="mini-slide" id="wcStage" style="align-items:center;justify-content:center;gap:14px"></div>
      </div>`;
    const s = c.querySelector('#wcStage');
    function render(m) {
      const warm = '#e6833d', cool = '#3d7fe6';
      const main = m === 'warm' ? warm : cool;
      const sub = m === 'warm' ? cool : warm;
      s.innerHTML = `
        <div style="width:64px;height:64px;border-radius:12px;background:${main};box-shadow:0 0 18px ${main}66;display:flex;align-items:center;justify-content:center;font:12px var(--font-body);color:#fff">重点</div>
        <div style="width:48px;height:48px;border-radius:10px;background:${sub};opacity:.55"></div>`;
    }
    render('warm');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'stagger'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="together">同时出现</button><button class="demo-btn" data-m="stagger">错落出现</button></div>
        <div class="mini-slide" id="sgStage" style="align-items:center;justify-content:center;gap:10px"></div>
      </div>`;
    const s = c.querySelector('#sgStage');
    function render(m) {
      const stagger = m === 'stagger';
      s.innerHTML = '';
      for (let i = 1; i <= 4; i++) {
        const d = document.createElement('div');
        d.style.cssText = 'width:34px;height:34px;border-radius:8px;background:rgba(102,58,243,.55);border:1px solid rgba(102,58,243,.7);opacity:0;transition:opacity .4s';
        d.style.transitionDelay = stagger ? (i * 0.15) + 's' : '0s';
        s.appendChild(d);
        requestAnimationFrame(() => { d.style.opacity = '1'; });
      }
    }
    render('together');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'package'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row"><button class="demo-btn active" data-m="copy">直接拷贝</button><button class="demo-btn" data-m="pack">打包成 CD</button></div>
        <div class="mini-slide" id="pkStage" style="position:relative;align-items:flex-start;justify-content:flex-start;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#pkStage');
    function render(m) {
      if (m === 'copy') {
        s.innerHTML = `
          <div style="width:70%;height:9px;background:rgba(255,255,255,.3);border-radius:3px;margin-bottom:10px"></div>
          <div style="position:absolute;top:42px;left:14px;color:#e46d4c;font:10px var(--font-body);line-height:1.6">⚠ 字体丢失 → 宋体替代<br>⚠ 图片裂开<br>⚠ 视频播不了</div>`;
      } else {
        s.innerHTML = `
          <div style="width:70%;height:9px;background:rgba(255,255,255,.3);border-radius:3px;margin-bottom:10px"></div>
          <div style="position:absolute;top:42px;left:14px;color:#7ee0a8;font:10px var(--font-body);line-height:1.6">✓ 含字体 / 图片 / 视频 一体<br>换任何电脑原样放</div>`;
      }
    }
    render('copy');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'rotate-flip'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="normal">原图</button>
          <button class="demo-btn" data-m="rot">旋转 45°</button>
          <button class="demo-btn" data-m="flip">水平翻转</button>
        </div>
        <div class="mini-slide" id="rfStage" style="align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#rfStage');
    function render(m) {
      const tf = m === 'rot' ? 'rotate(-18deg)' : m === 'flip' ? 'scaleX(-1)' : 'none';
      const note = m === 'normal' ? '原图' : m === 'rot' ? '自由旋转：拖手柄任意角' : '水平翻转：左右镜像';
      s.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
          <div style="width:90px;height:64px;border-radius:14px;background:linear-gradient(135deg,#663af3,#027dea);transform:${tf};box-shadow:0 8px 24px rgba(102,58,243,.35)"></div>
          <div style="font:11px var(--font-body);color:var(--color-moon-mist)">${note}</div>
        </div>`;
    }
    render('normal');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'print'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="slide">整页幻灯片</button>
          <button class="demo-btn" data-m="notes">备注页</button>
          <button class="demo-btn" data-m="handout">讲义 6张</button>
          <button class="demo-btn" data-m="bw">灰度打印</button>
        </div>
        <div class="mini-slide" id="prStage" style="align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#prStage');
    function render(m) {
      const map = {
        slide: ['整页幻灯片', '一页一张大图，适合张贴/胶片', '#7ee0a8'],
        notes: ['备注页', '幻灯片 + 下方演讲备注，备课留底', '#7ee0a8'],
        handout: ['讲义(每页6张)', '多张缩略图带横线，发学员', '#7ee0a8'],
        bw: ['灰度打印', '去彩色保清晰，现场没彩打就它', '#e8c46a']
      };
      const [t, d, col] = map[m];
      s.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;width:100%">
          <div style="width:78%;height:46px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:8px"></div>
          <div style="font:12px var(--font-body);color:${col};font-weight:700">${t}</div>
          <div style="font:10px var(--font-body);color:var(--color-moon-mist);text-align:center;line-height:1.5">${d}</div>
        </div>`;
    }
    render('slide');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'color-603010'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="rule">60-30-10</button>
          <button class="demo-btn" data-m="flat">均等乱配</button>
        </div>
        <div class="mini-slide" id="c6Stage" style="padding:14px"></div>
      </div>`;
    const s = c.querySelector('#c6Stage');
    function render(m) {
      if (m === 'rule') {
        s.innerHTML = `
          <div style="display:flex;flex-direction:column;gap:0">
            <div style="height:54px;background:#1e2a5e;border-radius:8px 8px 0 0;display:flex;align-items:center;padding:0 12px;color:#cdd6ff;font:11px var(--font-body)">主色 60%（背景/大色块）</div>
            <div style="height:30px;background:#3b6bd6;display:flex;align-items:center;padding:0 12px;color:#eaf0ff;font:11px var(--font-body)">辅色 30%（卡片/图表）</div>
            <div style="height:16px;background:#ff8a3d;border-radius:0 0 8px 8px;display:flex;align-items:center;padding:0 12px;color:#3a1a00;font:11px var(--font-body);font-weight:700">点缀 10%（关键数字）</div>
          </div>`;
      } else {
        s.innerHTML = `
          <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;padding-top:14px">
            ${['#e0466b', '#27a567', '#f0a93b', '#3b6bd6', '#9b59ff', '#1abc9c'].map(x => `<div style="width:42px;height:42px;background:${x};border-radius:8px"></div>`).join('')}
            <div style="width:100%;text-align:center;font:10px var(--font-body);color:var(--color-moon-mist);margin-top:6px">五颜六色均等 → 花、乱、没重点</div>
          </div>`;
      }
    }
    render('rule');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'autoshape'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="card">圆角矩形(卡片)</button>
          <button class="demo-btn" data-m="arrow">箭头(关系)</button>
          <button class="demo-btn" data-m="circle">圆(底)</button>
        </div>
        <div class="mini-slide" id="asStage" style="align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#asStage');
    function render(m) {
      const map = {
        card: ['width:120px;height:54px;border-radius:12px;background:rgba(102,58,243,.25);border:1px solid #663af3', '圆角矩形 → 信息卡片'],
        arrow: ['width:0;height:0;border-top:14px solid transparent;border-bottom:14px solid transparent;border-left:60px solid #027dea', '箭头 → 指关系 / 流向'],
        circle: ['width:70px;height:70px;border-radius:50%;background:radial-gradient(circle, #8a6bff, #663af3)', '圆 → 头像底 / 节点']
      };
      const [style, note] = map[m];
      s.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
          <div style="${style}"></div>
          <div style="font:11px var(--font-body);color:var(--color-moon-mist)">${note}</div>
        </div>`;
    }
    render('card');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'chart-elements'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="clean">精简(推荐)</button>
          <button class="demo-btn" data-m="mess">全开(乱)</button>
        </div>
        <div class="mini-slide" id="ceStage" style="align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#ceStage');
    function render(m) {
      if (m === 'clean') {
        s.innerHTML = `
          <div style="width:82%;background:rgba(255,255,255,.06);border-radius:8px;padding:12px 10px">
            <div style="display:flex;align-items:flex-end;gap:10px;height:54px">
              <div style="flex:1;background:#663af3;border-radius:4px 4px 0 0;height:60%"></div>
              <div style="flex:1;background:#027dea;border-radius:4px 4px 0 0;height:90%"></div>
              <div style="flex:1;background:#663af3;border-radius:4px 4px 0 0;height:45%"></div>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:6px;font:9px var(--font-body);color:var(--color-moon-mist)"><span>Q1 120</span><span>Q2 180</span><span>Q3 92</span></div>
            <div style="font:9px var(--font-body);color:#7ee0a8;margin-top:4px">✓ 数据标签 + 删冗余图例</div>
          </div>`;
      } else {
        s.innerHTML = `
          <div style="width:82%;background:rgba(255,255,255,.06);border-radius:8px;padding:12px 10px">
            <div style="display:flex;align-items:flex-end;gap:6px;height:54px;border:1px dashed rgba(255,255,255,.25)">
              <div style="flex:1;background:#e0466b;border-radius:4px 4px 0 0;height:60%"></div>
              <div style="flex:1;background:#27a567;border-radius:4px 0 0;height:90%"></div>
              <div style="flex:1;background:#f0a93b;border-radius:4px 4px 0 0;height:45%"></div>
            </div>
            <div style="font:9px var(--font-body);color:var(--color-moon-mist);margin-top:6px">图例+网格+坐标轴全开、标签密</div>
            <div style="font:9px var(--font-body);color:#e46d4c;margin-top:2px">✗ 看不懂、重点被淹</div>
          </div>`;
      }
    }
    render('clean');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'text-anim-level'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="word">按字浮现</button>
          <button class="demo-btn" data-m="para">按段落</button>
          <button class="demo-btn" data-m="all">整批</button>
        </div>
        <div class="mini-slide" id="taStage" style="align-items:flex-start;justify-content:flex-start;padding:16px"></div>
      </div>`;
    const s = c.querySelector('#taStage');
    function render(m) {
      const lvl = { word: '按字：一字字出，仪式感', para: '按段落：一段段出，逐条点', all: '整批：整段一起出' }[m];
      const parts = m === 'word' ? ['大', '标', '题', '·', '按', '字', '出'] : (m === 'para' ? ['· 第一点', '· 第二点', '· 第三点'] : ['整段一起出现']);
      const inner = parts.map((p, i) => `<span style="display:inline-block;opacity:.2;animation:efPulse 1.6s ${i * 0.18}s infinite;margin-right:4px;font:13px var(--font-body);color:var(--color-ice)">${p}</span>`).join('');
      s.innerHTML = `<div><div style="margin-bottom:10px">${inner}</div><div style="font:10px var(--font-body);color:var(--color-moon-mist)">${lvl}</div></div>`;
    }
    render('word');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'image-crop'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="raw">原图(毛刺)</button>
          <button class="demo-btn" data-m="crop">裁剪去边</button>
          <button class="demo-btn" data-m="art">艺术效果</button>
        </div>
        <div class="mini-slide" id="icStage" style="align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#icStage');
    function render(m) {
      let inner;
      if (m === 'raw') inner = `<div style="width:96px;height:64px;background:linear-gradient(135deg,#888,#bbb);position:relative"><div style="position:absolute;right:-6px;bottom:-6px;width:24px;height:20px;background:#ccc"></div><div style="font:9px var(--font-body);color:#444;position:absolute;left:6px;top:6px">多余边</div></div><div style="font:10px var(--font-body);color:var(--color-moon-mist);margin-top:8px">原图带杂边、偏暗</div>`;
      else if (m === 'crop') inner = `<div style="width:80px;height:64px;background:linear-gradient(135deg,#9aa,#ccc);overflow:hidden;border-radius:6px"></div><div style="font:10px var(--font-body);color:#7ee0a8;margin-top:8px">✓ 裁掉杂边，干净聚焦</div>`;
      else inner = `<div style="width:80px;height:64px;background:linear-gradient(135deg,#663af3,#027dea);filter:blur(1px) saturate(1.4);border-radius:6px"></div><div style="font:10px var(--font-body);color:#7ee0a8;margin-top:8px">✓ 虚化艺术效果，高级感</div>`;
      s.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center">${inner}</div>`;
    }
    render('raw');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'header-footer'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="on">母版设页码</button>
          <button class="demo-btn" data-m="off">手动手打</button>
        </div>
        <div class="mini-slide" id="hfStage" style="padding:14px"></div>
      </div>`;
    const s = c.querySelector('#hfStage');
    function render(m) {
      if (m === 'on') {
        s.innerHTML = `
          <div style="display:flex;flex-direction:column;gap:6px">
            ${[1, 2, 3, 4].map(n => `<div style="height:26px;background:rgba(255,255,255,.08);border-radius:6px;position:relative"><span style="position:absolute;right:8px;bottom:3px;font:9px var(--font-body);color:var(--color-moon-mist)">${n} / 4　2026-07-26</span></div>`).join('')}
            <div style="font:10px var(--font-body);color:#7ee0a8;margin-top:4px">✓ 母版设一次，全篇自动+改日期一键全改</div>
          </div>`;
      } else {
        s.innerHTML = `
          <div style="display:flex;flex-direction:column;gap:6px">
            ${[1, 2, 3, 4].map(n => `<div style="height:26px;background:rgba(255,255,255,.08);border-radius:6px;position:relative"><span style="position:absolute;right:8px;bottom:3px;font:9px var(--font-body);color:var(--color-moon-mist)">第 ${n} 页</span></div>`).join('')}
            <div style="font:10px var(--font-body);color:#e46d4c;margin-top:4px">✗ 手打易错、改日期要页页动</div>
          </div>`;
      }
    }
    render('on');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'connector'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="smart">连接符(智能)</button>
          <button class="demo-btn" data-m="line">普通线</button>
        </div>
        <div class="mini-slide" id="cnStage" style="align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#cnStage');
    function render(m) {
      if (m === 'smart') {
        s.innerHTML = `
          <div style="position:relative;width:84%;height:70px">
            <div style="position:absolute;left:0;top:18px;width:40px;height:34px;background:#663af3;border-radius:6px"></div>
            <div style="position:absolute;right:0;top:18px;width:40px;height:34px;background:#027dea;border-radius:6px"></div>
            <svg viewBox="0 0 200 70" style="position:absolute;inset:0;width:100%;height:100%"><path d="M40 35 H160" stroke="#7ee0a8" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#cnArr)"/><defs><marker id="cnArr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#7ee0a8"/></marker></defs></svg>
            <div style="position:absolute;left:0;right:0;bottom:-2px;text-align:center;font:9px var(--font-body);color:#7ee0a8">拖动方框 → 线自动跟随</div>
          </div>`;
      } else {
        s.innerHTML = `
          <div style="position:relative;width:84%;height:70px">
            <div style="position:absolute;left:0;top:18px;width:40px;height:34px;background:#663af3;border-radius:6px"></div>
            <div style="position:absolute;right:0;top:0;width:40px;height:34px;background:#027dea;border-radius:6px"></div>
            <svg viewBox="0 0 200 70" style="position:absolute;inset:0;width:100%;height:100%"><path d="M40 35 H160" stroke="#e46d4c" stroke-width="2" marker-end="url(#cnArr2)"/><defs><marker id="cnArr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#e46d4c"/></marker></defs></svg>
            <div style="position:absolute;left:0;right:0;bottom:-2px;text-align:center;font:9px var(--font-body);color:#e46d4c">线没吸上 → 移框就脱节</div>
          </div>`;
      }
    }
    render('smart');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'macro-vba'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="manual">手改 80 页</button>
          <button class="demo-btn" data-m="macro">录宏 3 秒</button>
        </div>
        <div class="mini-slide" id="mvStage" style="padding:14px"></div>
      </div>`;
    const s = c.querySelector('#mvStage');
    function render(m) {
      if (m === 'manual') {
        s.innerHTML = `
          <div style="font:10px var(--font-body);color:var(--color-moon-mist);line-height:1.7">
            第 1 页 改字号…<br>第 2 页 改字号…<br>第 3 页 改字号…<br>
            <span style="color:#e46d4c">…重复 80 次，半小时起步，还容易漏</span>
          </div>`;
      } else {
        s.innerHTML = `
          <div style="font:10px var(--font-body);color:var(--color-moon-mist);line-height:1.7">
            <span style="color:#7ee0a8">● 录制：把改标题字号的操作录一遍</span><br>
            <span style="color:#7ee0a8">● 重放：一键套用全部 80 页</span><br>
            <span style="color:#7ee0a8">✓ 3 秒搞定，零遗漏</span>
          </div>`;
      }
    }
    render('manual');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'exit-anim'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="in">只进不出</button>
          <button class="demo-btn" data-m="inout">进完退出</button>
        </div>
        <div class="mini-slide" id="esiStage" style="align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#esiStage');
    function render(m) {
      if (m === 'in') {
        s.innerHTML = '<div style="font:13px var(--font-body);color:#e46d4c">要点A　要点B　要点C　要点D</div><div style="font:9px var(--font-body);color:var(--color-moon-mist);margin-top:6px">全堆着，越讲越乱</div>';
      } else {
        s.innerHTML = '<div style="font:13px var(--font-body);color:#7ee0a8">要点A ✓　（B、C、D 讲完已淡出）</div><div style="font:9px var(--font-body);color:var(--color-moon-mist);margin-top:6px">始终只留当前重点</div>';
      }
    }
    render('in');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'chart-anim'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="whole">整图淡入</button>
          <button class="demo-btn" data-m="bySeries">按系列长出</button>
        </div>
        <div class="mini-slide" id="caStage" style="align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#caStage');
    function render(m) {
      if (m === 'whole') {
        s.innerHTML = '<div style="display:flex;align-items:flex-end;gap:10px;height:56px"><div style="width:18px;height:40px;background:#663af3"></div><div style="width:18px;height:30px;background:#027dea"></div><div style="width:18px;height:48px;background:#7ee0a8"></div><div style="width:18px;height:24px;background:#e46d4c"></div></div><div style="font:9px var(--font-body);color:#e46d4c;margin-top:8px">整图啪一下淡入，没节奏</div>';
      } else {
        s.innerHTML = '<div style="display:flex;align-items:flex-end;gap:10px;height:56px"><div style="width:18px;height:40px;background:#663af3"></div><div style="width:18px;height:30px;background:#027dea"></div><div style="width:18px;height:48px;background:#7ee0a8"></div><div style="width:18px;height:24px;background:#e46d4c"></div></div><div style="font:9px var(--font-body);color:#7ee0a8;margin-top:8px">一根根长出，边讲边出有层次</div>';
      }
    }
    render('whole');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'smart-guides'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="off">手动拖</button>
          <button class="demo-btn" data-m="on">智能参考线</button>
        </div>
        <div class="mini-slide" id="sgStage" style="align-items:center;justify-content:center;padding:14px;position:relative"></div>
      </div>`;
    const s = c.querySelector('#sgStage');
    function render(m) {
      if (m === 'off') {
        s.innerHTML = '<div style="position:relative;width:80%;height:54px"><div style="position:absolute;left:6px;top:8px;width:38px;height:30px;background:#e46d4c;border-radius:5px"></div><div style="position:absolute;right:4px;top:14px;width:38px;height:30px;background:#e46d4c;border-radius:5px"></div><div style="position:absolute;left:0;right:0;bottom:0;text-align:center;font:9px var(--font-body);color:#e46d4c">凭手感，对不齐</div></div>';
      } else {
        s.innerHTML = '<div style="position:relative;width:80%;height:54px"><div style="position:absolute;left:0;right:0;top:50%;height:0;border-top:1px dashed #7ee0a8"></div><div style="position:absolute;left:18px;top:8px;width:38px;height:30px;background:#663af3;border-radius:5px"></div><div style="position:absolute;right:18px;top:8px;width:38px;height:30px;background:#663af3;border-radius:5px"></div><div style="position:absolute;left:0;right:0;bottom:0;text-align:center;font:9px var(--font-body);color:#7ee0a8">虚线一亮，自动居中</div></div>';
      }
    }
    render('off');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  '3d-model'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="flat">平面图</button>
          <button class="demo-btn" data-m="d3">3D 可旋转</button>
        </div>
        <div class="mini-slide" id="m3Stage" style="align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#m3Stage');
    function render(m) {
      if (m === 'flat') {
        s.innerHTML = '<div style="width:46px;height:46px;background:#e46d4c;border-radius:8px"></div><div style="font:9px var(--font-body);color:#e46d4c;margin-top:8px">死的平面，没立体感</div>';
      } else {
        s.innerHTML = '<div style="width:46px;height:46px;background:linear-gradient(135deg,#663af3,#027dea);border-radius:10px;transform:rotate(-12deg);box-shadow:6px 6px 14px rgba(0,0,0,.4)"></div><div style="font:9px var(--font-body);color:#7ee0a8;margin-top:8px">可拖动旋转，有质感</div>';
      }
    }
    render('flat');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'zoom'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="linear">线性放映</button>
          <button class="demo-btn" data-m="zoom">缩放菜单</button>
        </div>
        <div class="mini-slide" id="zmStage" style="align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#zmStage');
    function render(m) {
      if (m === 'linear') {
        s.innerHTML = '<div style="font:10px var(--font-body);color:#e46d4c;line-height:1.9">封面 → 1 → 2 → 3<br>顺序固定，不能跳</div>';
      } else {
        s.innerHTML = '<div style="font:10px var(--font-body);color:#7ee0a8;line-height:1.9">封面：<span style="color:#663af3">[节1][节2][节3]</span><br>点哪节跳哪节，自由穿梭</div>';
      }
    }
    render('linear');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'watermark'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="off">无</button>
          <button class="demo-btn" data-m="on">母版加水印</button>
        </div>
        <div class="mini-slide" id="wmStage" style="align-items:center;justify-content:center;padding:14px;position:relative"></div>
      </div>`;
    const s = c.querySelector('#wmStage');
    function render(m) {
      if (m === 'off') {
        s.innerHTML = '<div style="width:74%;height:46px;background:#1a1f2e;border-radius:6px"></div><div style="font:9px var(--font-body);color:#e46d4c;margin-top:8px">每页手贴，改一次累死</div>';
      } else {
        s.innerHTML = '<div style="position:relative;width:74%;height:46px;background:#1a1f2e;border-radius:6px"><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.18);font:700 13px var(--font-body);transform:rotate(-18deg)">机密</div></div><div style="font:9px var(--font-body);color:#7ee0a8;margin-top:8px">母版设一次，全篇统一</div>';
      }
    }
    render('off');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'screenshot'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="old">存盘再插</button>
          <button class="demo-btn" data-m="now">直接截屏</button>
        </div>
        <div class="mini-slide" id="scStage" style="padding:14px"></div>
      </div>`;
    const s = c.querySelector('#scStage');
    function render(m) {
      if (m === 'old') {
        s.innerHTML = '<div style="font:10px var(--font-body);color:#e46d4c;line-height:1.9">截图 → 存盘 → 插入 → 找文件<br>三步，麻烦</div>';
      } else {
        s.innerHTML = '<div style="font:10px var(--font-body);color:#7ee0a8;line-height:1.9">插入 → 屏幕截图 → 框选<br><span>一步进幻灯片 ✓</span></div>';
      }
    }
    render('old');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'autofit'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="overflow">溢出框外</button>
          <button class="demo-btn" data-m="shrink">自动缩字</button>
        </div>
        <div class="mini-slide" id="afStage" style="padding:14px"></div>
      </div>`;
    const s = c.querySelector('#afStage');
    function render(m) {
      if (m === 'overflow') {
        s.innerHTML = '<div style="font:11px var(--font-body);color:#e46d4c;line-height:1.5;border:1px dashed #e46d4c;padding:6px;height:42px;overflow:hidden">要点一要点二要点三要点四要点五要点六要点七…<br><span style="font-size:9px">⚠ 溢出框外丢字</span></div>';
      } else {
        s.innerHTML = '<div style="font:8px var(--font-body);color:#7ee0a8;line-height:1.5;border:1px dashed #7ee0a8;padding:6px;height:42px;overflow:hidden">要点一要点二要点三要点四要点五要点六要点七…<br><span style="font-size:9px">✓ 自动缩字塞进框</span></div>';
      }
    }
    render('overflow');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'bullets'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="para">纯段落</button>
          <button class="demo-btn" data-m="list">项目符号</button>
        </div>
        <div class="mini-slide" id="blStage" style="padding:14px"></div>
      </div>`;
    const s = c.querySelector('#blStage');
    function render(m) {
      if (m === 'para') {
        s.innerHTML = '<div style="font:10px var(--font-body);color:#e46d4c;line-height:1.6">建议一建议二建议三，全挤一段，扫读费劲。</div>';
      } else {
        s.innerHTML = '<div style="font:10px var(--font-body);color:#7ee0a8;line-height:1.7">• 建议一<br>• 建议二<br>• 建议三</div>';
      }
    }
    render('para');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  },
  'pptx-format'(c) {
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row">
          <button class="demo-btn active" data-m="wrong">发给客户用 pptx</button>
          <button class="demo-btn" data-m="right">发给客户用 pdf</button>
        </div>
        <div class="mini-slide" id="pfStage" style="padding:14px"></div>
      </div>`;
    const s = c.querySelector('#pfStage');
    function render(m) {
      if (m === 'wrong') {
        s.innerHTML = '<div style="font:10px var(--font-body);color:#e46d4c;line-height:1.7">发 .pptx → 客户能改能乱版<br><span>⚠ 终稿被改花</span></div>';
      } else {
        s.innerHTML = '<div style="font:10px var(--font-body);color:#7ee0a8;line-height:1.7">发 .pdf → 防改防乱版<br><span>✓ 终稿稳了；要播用 .ppsx</span></div>';
      }
    }
    render('wrong');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => render(btn.dataset.m));
  }
};

if (typeof window !== "undefined") window.DEMOS = DEMOS;
if (typeof module !== "undefined") module.exports = DEMOS;
