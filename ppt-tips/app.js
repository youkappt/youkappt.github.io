/* ============================================================
   PPT 技巧页 — App：渲染、搜索、分类筛选、Modal、分步播放、相关术语
   ============================================================ */
(function () {
  const techs = window.TECHNIQUES || [];
  const DEMOS = window.DEMOS || {};

  // 分类逻辑顺序：设计 → 内容 → 数据 → 动效 → 放映 → 交付
  const CATEGORY_ORDER = [
    '统一风格与母版',
    '排版与图示',
    '图形与图像',
    '数据与图表',
    '动画与交互',
    '放映与演讲',
    '效率与交付'
  ];
  techs.sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a.scenario);
    const ib = CATEGORY_ORDER.indexOf(b.scenario);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });

  // 相关术语 id → 中文名（用于跳转芯片文案）
  const TERM_NAMES = {
    master: '母版', theme: '主题', guides: '参考线', smartart: 'SmartArt',
    'zoom-loc': '幻灯片缩放定位', section: '节', 'animation-pane': '动画窗格',
    boolean: '布尔运算', eyedropper: '取色器', placeholder: '占位符',
    alignment: '对齐', layout: '版式', 'icon-style': '图标风格', 'color-reuse': '配色复用',
    'embed-font': '嵌入字体', shortcut: '快捷键', 'format-painter': '格式刷',
    compress: '图片压缩', 'export-dpi': '导出分辨率', morph: '平滑切换',
    'transition-fx': '切换效果', 'chart-beauty': '图表美化', trigger: '触发器', 'anim-type': '进入/退出/强调',
    'replace-font': '替换字体', 'selection-pane': '选择窗格', 'group': '组合', 'remove-bg': '删除背景',
    'presenter-view': '演示者视图', 'designer': '设计灵感', 'combo-chart': '组合图表', 'anim-painter': '动画刷',
    'edit-points': '编辑顶点', 'recolor': '重新着色', 'custom-show': '自定义放映', 'narrate': '录制旁白', 'table-beauty': '表格美化',
    'outline': '大纲视图', 'word-to-ppt': 'Word转PPT', 'live-caption': '实时字幕', 'crop-shape': '裁剪为形状', 'hyperlink': '超链接', 'ink': '墨迹批注', 'motion-path': '路径动画', 'qat': '快速访问栏'
  };

  const els = {
    grid: document.getElementById('techGrid'),
    nav: document.getElementById('catNav'),
    search: document.getElementById('searchInput'),
    count: document.getElementById('resultCount'),
    overlay: document.getElementById('modalOverlay'),
    modal: document.getElementById('modalCard'),
  };

  let activeScenario = '全部';
  let query = '';
  let currentId = null;

  // 分类顺序（按 CATEGORY_ORDER 逻辑顺序，由已排序的 techs 推导）
  const presentScenes = Array.from(new Set(techs.map(t => t.scenario)));
  const scenarios = ['全部', ...presentScenes];

  /* ---- 分类导航 ---- */
  function buildNav() {
    els.nav.innerHTML = '';
    scenarios.forEach(sc => {
      const b = document.createElement('button');
      b.className = 'cat-pill' + (sc === activeScenario ? ' active' : '');
      b.textContent = sc;
      b.onclick = () => { activeScenario = sc; buildNav(); render(); };
      els.nav.appendChild(b);
    });
  }

  /* ---- 过滤 ---- */
  function filtered() {
    const q = query.trim().toLowerCase();
    return techs.filter(t => {
      const scOk = activeScenario === '全部' || t.scenario === activeScenario;
      if (!scOk) return false;
      if (!q) return true;
      const hay = [t.name, t.summary, t.scenario, (t.steps || []).map(s => s.text).join(' ')].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }

  /* ---- 卡片 ---- */
  function card(t) {
    const c = document.createElement('div');
    c.className = 'term-card';
    c.innerHTML = `
      <div class="term-card-head"><span class="term-name">${esc(t.name)}</span></div>
      <div class="tech-thumbs">
        <div class="tech-thumb"><span class="tech-thumb-tag before">${esc(t.before.tag)}</span><img class="tech-shot" src="thumbs/${t.id}_before.png" alt="${esc(t.before.tag)}" loading="lazy" decoding="async"></div>
        <span class="tech-vs">VS</span>
        <div class="tech-thumb"><span class="tech-thumb-tag after">${esc(t.after.tag)}</span><img class="tech-shot" src="thumbs/${t.id}_after.png" alt="${esc(t.after.tag)}" loading="lazy" decoding="async"></div>
      </div>
      <div class="tech-summary">${esc(t.summary)}</div>
      <div class="term-meta">
        <span class="badge badge-level">${esc(t.level)}</span>
        <span class="badge">${esc(t.scenario)}</span>
      </div>`;
    c.onclick = () => openModal(t.id);
    return c;
  }

  /* ---- 列表按 level 分组（与 PPT 术语图鉴一致：入门基础 / 进阶提升）---- */
  const LEVEL_GROUPS = [
    { key: '入门', label: '🌱 入门基础' },
    { key: '进阶', label: '🚀 进阶提升' },
  ];

  function sectionHeader(label, count) {
    const h = document.createElement('div');
    h.className = 'level-section-header';
    h.innerHTML = `<span class="level-section-title">${label}</span><span class="level-section-count">${count} 条</span>`;
    return h;
  }

  function render() {
    const list = filtered();
    els.grid.innerHTML = '';
    const navCount = document.getElementById('searchCount');
    if (navCount) navCount.textContent = (query.trim() && list.length) ? `${list.length} 个结果` : '';
    if (!list.length) {
      const e = document.createElement('div');
      e.className = 'empty-state';
      e.textContent = '没有匹配的技巧，换个关键词或分类试试。';
      els.grid.appendChild(e);
      els.count.textContent = '共 0 个技巧';
      return;
    }

    // 拆成 入门 / 进阶 两组，分组头与 ppthub 一致
    const beginner = list.filter(t => t.level === '入门');
    const advanced = list.filter(t => t.level !== '入门');
    if (beginner.length) {
      els.grid.appendChild(sectionHeader(LEVEL_GROUPS[0].label, beginner.length));
      beginner.forEach(t => els.grid.appendChild(card(t)));
    }
    if (advanced.length) {
      els.grid.appendChild(sectionHeader(LEVEL_GROUPS[1].label, advanced.length));
      advanced.forEach(t => els.grid.appendChild(card(t)));
    }
    els.count.textContent = `共 ${list.length} 个技巧`;
  }

  /* ---- 顺序（用于弹窗左右切换） ---- */
  function currentOrder() {
    const list = filtered();
    const beginner = list.filter(t => t.level === '入门');
    const advanced = list.filter(t => t.level !== '入门');
    return [...beginner, ...advanced].map(t => t.id);
  }
  function getOrder() {
    const ord = currentOrder();
    return ord.includes(currentId) ? ord : techs.map(t => t.id);
  }

  function updateNavState() {
    const prev = document.getElementById('modalPrev');
    const next = document.getElementById('modalNext');
    if (!prev || !next) return;
    const ord = getOrder();
    const idx = ord.indexOf(currentId);
    const prevT = ord[idx - 1] ? techs.find(x => x.id === ord[idx - 1]) : null;
    const nextT = ord[idx + 1] ? techs.find(x => x.id === ord[idx + 1]) : null;
    prev.disabled = !prevT; next.disabled = !nextT;
    prev.innerHTML = prevT ? `<span class="nav-arrow">‹</span><span class="nav-name">${esc(prevT.name)}</span>` : `<span class="nav-arrow">‹</span>`;
    next.innerHTML = nextT ? `<span class="nav-name">${esc(nextT.name)}</span><span class="nav-arrow">›</span>` : `<span class="nav-arrow">›</span>`;
  }

  function goAdjacent(dir) {
    const ord = getOrder();
    const idx = ord.indexOf(currentId);
    const target = ord[idx + dir];
    if (target) openModal(target);
  }

  /* ---- 弹窗 ---- */
  function openModal(id) {
    const t = techs.find(x => x.id === id);
    if (!t) return;
    currentId = id;
    cleanupDemo();

    const related = (t.relatedTerms || [])
      .map(rid => ({ id: rid, name: TERM_NAMES[rid] || rid }))
      .filter(Boolean);

    els.modal.innerHTML = `
      <button class="modal-close" id="modalClose" aria-label="关闭">✕</button>
      <div class="modal-head">
        <div class="modal-title">${esc(t.name)}</div>
        <div class="modal-alias">${esc(t.scenario)} 分类</div>
        <div class="modal-meta">
          <span class="badge badge-level">${esc(t.level)}</span>
          <span class="badge">${esc(t.scenario)}</span>
        </div>
      </div>
      ${t.summary ? `<div class="modal-lead">${esc(t.summary)}</div>` : ''}
      <div class="modal-section">
        <h4>改前 vs 改后</h4>
        <div class="ba-grid">
          <div class="ba-panel">
            <span class="ba-tag before">${esc(t.before.tag)}</span>
            <img class="ba-shot" src="thumbs/${t.id}_before.png" alt="${esc(t.before.tag)}">
            <div class="modal-ba" style="margin-top:8px">${esc(t.before.desc)}</div>
          </div>
          <div class="ba-panel">
            <span class="ba-tag after">${esc(t.after.tag)}</span>
            <img class="ba-shot" src="thumbs/${t.id}_after.png" alt="${esc(t.after.tag)}">
            <div class="modal-ba" style="margin-top:8px">${esc(t.after.desc)}</div>
          </div>
        </div>
      </div>
      <div class="modal-section">
        <h4>分步操作</h4>
        <div class="step-play-row">
          <button class="demo-btn" data-a="play" id="stepPlay">▶ 播放演示</button>
        </div>
        <ul class="step-list" id="stepList">
          ${t.steps.map((s, i) => `<li class="step-item" data-i="${i}"><span class="step-num">${i + 1}</span><span class="step-body">${esc(s.text)}${s.shortcut ? `<span class="kbd">${esc(s.shortcut)}</span>` : ''}</span></li>`).join('')}
        </ul>
      </div>
      ${t.demo && DEMOS[t.demo] ? `<div class="modal-section"><h4>动手试试</h4><div class="demo-mount"><div class="demo-hint">◆ 交互演示</div><div id="demoBody"></div></div></div>` : ''}
      ${t.tips ? `<div class="modal-section"><h4>优卡私房 tip</h4><div class="tip-box">${esc(t.tips)}</div></div>` : ''}
      ${related.length ? `<div class="modal-section"><h4>相关术语（去术语图鉴看「是什么」）</h4><div class="related-list">${related.map(r => `<a class="related-chip" href="../ppthub/?term=${encodeURIComponent(r.id)}" target="_blank" rel="noopener">${esc(r.name)}</a>`).join('')}</div></div>` : ''}
    `;

    document.getElementById('modalClose').onclick = closeModal;
    const playBtn = document.getElementById('stepPlay');
    if (playBtn) playBtn.onclick = playSteps;

    if (t.demo && DEMOS[t.demo]) {
      const body = document.getElementById('demoBody');
      try { DEMOS[t.demo](body, t); } catch (e) { body.innerHTML = '<div style="color:var(--color-fog-veil);font:13px var(--font-body)">演示加载失败</div>'; }
      initDemoActiveStates(body);
    }

    els.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateNavState();
  }

  function playSteps() {
    const items = Array.from(els.modal.querySelectorAll('.step-item'));
    if (!items.length) return;
    let i = 0;
    items.forEach(it => it.classList.remove('active'));
    const timer = setInterval(() => {
      if (i > 0) items[i - 1].classList.remove('active');
      if (i < items.length) { items[i].classList.add('active'); i++; }
      else clearInterval(timer);
    }, 700);
    regDemoTimer(timer);
  }

  function closeModal() {
    els.overlay.classList.remove('open');
    document.body.style.overflow = '';
    cleanupDemo();
    currentId = null;
  }

  /* ---- demo 按钮选中态托管（data-a 为动作按钮，不参与单选） ---- */
  const ACTION_ATTRS = ['a'];
  function modeKeyOf(btn) {
    for (const attr of btn.attributes) {
      if (!attr.name.startsWith('data-')) continue;
      const key = attr.name.slice(5);
      if (!ACTION_ATTRS.includes(key)) return attr.name;
    }
    return null;
  }
  function initDemoActiveStates(body) {
    body.addEventListener('click', (e) => {
      const btn = e.target.closest('.demo-btn');
      if (!btn || !body.contains(btn)) return;
      const key = modeKeyOf(btn);
      if (!key) return;
      const group = btn.closest('.demo-row') || body;
      group.querySelectorAll('.demo-btn[' + key + ']').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
    }, true);
  }

  function regDemoTimer(id) { (window.__demoTimers = window.__demoTimers || []).push(id); }
  function cleanupDemo() {
    if (window.__demoTimers && window.__demoTimers.length) {
      window.__demoTimers.forEach(id => { clearInterval(id); clearTimeout(id); });
      window.__demoTimers = [];
    }
  }

  els.overlay.addEventListener('click', (e) => { if (e.target === els.overlay) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (!els.overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowLeft') goAdjacent(-1);
    else if (e.key === 'ArrowRight') goAdjacent(1);
  });

  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  if (modalPrev) modalPrev.onclick = () => goAdjacent(-1);
  if (modalNext) modalNext.onclick = () => goAdjacent(1);

  /* ---- 搜索 ---- */
  els.search.addEventListener('input', (e) => { query = e.target.value; render(); });
  const searchForm = document.getElementById('searchForm');
  if (searchForm) searchForm.addEventListener('submit', (e) => { e.preventDefault(); query = els.search.value; render(); });

  /* ---- util ---- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---- init ---- */
  buildNav();
  render();
})();
