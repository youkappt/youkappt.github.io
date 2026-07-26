/* ============================================================
   PPThub — App logic: render, search, filter, modal, demos
   ============================================================ */
(function () {
  const terms = window.TERMS || [];
  const DEMOS = window.DEMOS || {};
  // 合并补充字段（误区/快捷键/清单/对比/口诀…，来自 terms-extra.js，不污染 data.js）
  if (window.TERM_EXTRA) {
    const ex = window.TERM_EXTRA;
    terms.forEach(t => { const e = ex[t.id]; if (e) Object.assign(t, e); });
  }

  const els = {
    grid: document.getElementById('termGrid'),
    nav: document.getElementById('catNav'),
    search: document.getElementById('searchInput'),
    count: document.getElementById('resultCount'),
    overlay: document.getElementById('modalOverlay'),
    modal: document.getElementById('modalCard'),
  };

  let activeCat = '全部';
  let query = '';

  /* ---- derive categories (curated logical order) ---- */
  // 按「学习/制作流程」排定，比首次出现顺序更顺手；
  // 未来若 data.js 新增分类，不在下表里的会按出现顺序自动追加到末尾，不会丢。
  const CATEGORY_ORDER = [
    '字体与配色', '排版与布局', '图形与图示', '图片与多媒体',
    '母版与版式', '动画与切换', '设计原则', '效率与技巧',
    '软件功能', '输出与放映'
  ];
  const presentCats = Array.from(new Set(terms.map(t => t.category)));
  const orderedCats = CATEGORY_ORDER.filter(c => presentCats.includes(c));
  const extraCats = presentCats.filter(c => !CATEGORY_ORDER.includes(c));
  const categories = ['全部', ...orderedCats, ...extraCats];

  /* ---- build category nav ---- */
  function buildNav() {
    els.nav.innerHTML = '';
    categories.forEach(cat => {
      const b = document.createElement('button');
      b.className = 'cat-pill' + (cat === activeCat ? ' active' : '');
      b.textContent = cat;
      b.onclick = () => { activeCat = cat; buildNav(); render(); };
      els.nav.appendChild(b);
    });
  }

  /* ---- filter ---- */
  function filtered() {
    const q = query.trim().toLowerCase();
    return terms.filter(t => {
      const catOk = activeCat === '全部' || t.category === activeCat;
      if (!catOk) return false;
      if (!q) return true;
      const hay = [t.name, t.alias, t.summary, t.detail, t.scenario, (t.related || []).join(' ')].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }

  /* ---- render cards (grouped by level) ---- */
  const LEVEL_GROUPS = [
    { key: '入门', label: '🌱 入门基础' },
    { key: '进阶', label: '🚀 进阶提升' },
  ];

  function render() {
    const list = filtered();
    els.grid.innerHTML = '';
    const navCount = document.getElementById('searchCount');
    if (navCount) navCount.textContent = (query.trim() && list.length) ? `${list.length} 个结果` : '';
    if (!list.length) {
      const e = document.createElement('div');
      e.className = 'empty-state';
      e.textContent = '没有匹配的术语，换个关键词或分类试试。';
      els.grid.appendChild(e);
      els.count.textContent = '共 0 个术语';
      return;
    }

    // split into level groups: 入门 | 进阶
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
    els.count.textContent = `共 ${list.length} 个术语`;
  }

  function sectionHeader(label, count) {
    const h = document.createElement('div');
    h.className = 'level-section-header';
    h.innerHTML = `<span class="level-section-title">${label}</span><span class="level-section-count">${count} 条</span>`;
    return h;
  }

  function card(t) {
    const c = document.createElement('div');
    c.className = 'term-card';
    c.innerHTML = `
      <div class="term-card-head">
        <span class="term-name">${esc(t.name)}</span>
        <span class="term-alias">${esc(t.alias)}</span>
      </div>
      <div class="term-summary">${esc(t.summary)}</div>
      <div class="term-meta">
        <span class="badge badge-level">${esc(t.level)}</span>
        <span class="badge">${esc(t.category)}</span>
      </div>`;
    c.onclick = () => openModal(t.id);
    return c;
  }

  /* ---- modal ---- */
  let currentId = null;

  // 当前筛选/分类下的展示顺序（与 render 的 入门→进阶 分组一致）
  function currentOrder() {
    const list = filtered();
    const beginner = list.filter(t => t.level === '入门');
    const advanced = list.filter(t => t.level !== '入门');
    return [...beginner, ...advanced].map(t => t.id);
  }
  // 若当前术语不在当前筛选结果中（如经关联概念跳转），回退到全量顺序
  function getOrder() {
    const ord = currentOrder();
    return ord.includes(currentId) ? ord : terms.map(t => t.id);
  }
  function updateNavState() {
    const prev = document.getElementById('modalPrev');
    const next = document.getElementById('modalNext');
    if (!prev || !next) return;
    const ord = getOrder();
    const idx = ord.indexOf(currentId);
    const prevT = ord[idx - 1] ? terms.find(x => x.id === ord[idx - 1]) : null;
    const nextT = ord[idx + 1] ? terms.find(x => x.id === ord[idx + 1]) : null;
    prev.disabled = !prevT;
    next.disabled = !nextT;
    prev.innerHTML = prevT
      ? `<span class="nav-arrow">‹</span><span class="nav-name">${esc(prevT.name)}</span>`
      : `<span class="nav-arrow">‹</span>`;
    next.innerHTML = nextT
      ? `<span class="nav-name">${esc(nextT.name)}</span><span class="nav-arrow">›</span>`
      : `<span class="nav-arrow">›</span>`;
  }
  function goAdjacent(dir) {
    const ord = getOrder();
    const idx = ord.indexOf(currentId);
    const target = ord[idx + dir];
    if (target) openModal(target);
  }

  function openModal(id) {
    const t = terms.find(x => x.id === id);
    if (!t) return;
    currentId = id;
    cleanupDemo();

    const related = (t.related || [])
      .map(rid => terms.find(x => x.id === rid))
      .filter(Boolean);

    els.modal.innerHTML = `
      <button class="modal-close" id="modalClose" aria-label="关闭">✕</button>
      <div class="modal-head">
        <div class="modal-title">${esc(t.name)}</div>
        <div class="modal-alias">${esc(t.alias)} · ${esc(t.category)}</div>
        <div class="modal-meta">
          <span class="badge badge-level">${esc(t.level)}</span>
        </div>
      </div>
      ${t.summary ? `<div class="modal-lead">${esc(t.summary)}</div>` : ''}
      <div class="modal-section">
        <h4>是什么</h4>
        <div class="modal-detail">${esc(t.detail)}</div>
      </div>
      <div class="modal-section">
        <h4>常见场景</h4>
        <div class="modal-scenario">${esc(t.scenario)}</div>
      </div>
      ${t.demo && DEMOS[t.demo] ? `<div class="modal-section"><h4>动手试试</h4><div class="demo-mount"><div class="demo-hint">◆ 专属图示 / 交互演示</div><div id="demoBody"></div></div></div>` : ''}
      ${t.pitfall ? `<div class="modal-section modal-pitfall"><h4>常见误区</h4><div class="modal-pit">⚠ ${esc(t.pitfall)}</div></div>` : ''}
      ${t.shortcut ? `<div class="modal-section"><h4>快捷键 / 调出</h4><div class="modal-kbd">${esc(t.shortcut)}</div></div>` : ''}
      ${t.checklist ? `<div class="modal-section"><h4>自检清单</h4><ul class="modal-check">${t.checklist.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
      ${t.beforeafter ? `<div class="modal-section"><h4>改前 vs 改后</h4>${(window.BA_VISUALS && window.BA_VISUALS[t.id]) ? window.BA_VISUALS[t.id]() : `<div class="modal-ba">${esc(t.beforeafter)}</div>`}</div>` : ''}
      ${t.mnemonic ? `<div class="modal-section"><h4>记忆口诀</h4><div class="modal-extra">${esc(t.mnemonic)}</div></div>` : ''}
      ${t.combo ? `<div class="modal-section"><h4>进阶组合技</h4><div class="modal-extra">${esc(t.combo)}</div></div>` : ''}
      ${t.etymology ? `<div class="modal-section"><h4>词源小注</h4><div class="modal-extra">${esc(t.etymology)}</div></div>` : ''}
      ${related.length ? `<div class="modal-section"><h4>关联概念</h4><div class="related-list">${related.map(r => `<span class="related-chip" data-id="${r.id}">${esc(r.name)}</span>`).join('')}</div></div>` : ''}
    `;

    els.modal.querySelectorAll('.related-chip').forEach(chip => {
      chip.onclick = () => openModal(chip.dataset.id);
    });
    document.getElementById('modalClose').onclick = closeModal;

    // mount demo
    if (t.demo && DEMOS[t.demo]) {
      const body = document.getElementById('demoBody');
      try { DEMOS[t.demo](body); } catch (e) { body.innerHTML = '<div style="color:var(--color-fog-veil);font:13px var(--font-body)">演示加载失败</div>'; }
      initDemoActiveStates(body);
    }

    els.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateNavState();
  }

  function closeModal() {
    els.overlay.classList.remove('open');
    document.body.style.overflow = '';
    cleanupDemo();
    currentId = null;
  }

  /* ---- demo button active-state manager ----
     统一托管演示里「模式切换」按钮的选中态：
     - 同一 .demo-row 内、带相同 data-* 模式属性（data-m/data-c/data-op…）的
       .demo-btn 视为一组单选，点击后组内互斥高亮。
     - data-a（一次性动作，如 ▶播放/⟲复位）以及无 data-* 的按钮不参与。
     - 用捕获阶段监听，不干扰演示函数自身的 onclick 逻辑；
       若演示自己已管理 active（如新增 17 条），行为一致、无副作用。 */
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
      if (!key) return; // 动作按钮 / 无模式属性，不管理选中态
      const group = btn.closest('.demo-row') || body;
      group.querySelectorAll(`.demo-btn[${key}]`).forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
    }, true);
  }

  function cleanupDemo() {
    if (window.__scHandler) {
      document.removeEventListener('keydown', window.__scHandler);
      window.__scHandler = null;
    }
    // 清理演示注册的定时器（录屏/彩排/自动播放等），避免弹窗关闭后仍在后台跑
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

  /* ---- modal prev/next term navigation ---- */
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  if (modalPrev) modalPrev.onclick = () => goAdjacent(-1);
  if (modalNext) modalNext.onclick = () => goAdjacent(1);

  /* ---- search ---- */
  els.search.addEventListener('input', (e) => { query = e.target.value; render(); });
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      query = els.search.value;
      render();
    });
  }

  /* ---- top-nav scroll effect ---- */
  const topNav = document.getElementById('topNav');
  if (topNav) {
    window.addEventListener('scroll', () => {
      topNav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---- util ---- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---- init ---- */
  buildNav();
  render();

  /* ---- 深链：?term=<id> 打开对应术语 Modal（供 PPT 制作技巧页互链跳转） ---- */
  window.openTermById = openModal;
  try {
    const deepId = new URLSearchParams(location.search).get('term');
    if (deepId && terms.some(t => t.id === deepId)) {
      setTimeout(() => openModal(deepId), 80);
    }
  } catch (e) {}
})();
