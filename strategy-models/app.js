/* 战略模型画布 — 交互与导出 */
(function () {
  var SCHOOL_ORDER = [
    { key: "porter", label: "波特系列" },
    { key: "bcg", label: "BCG 系列" },
    { key: "ge-mckinsey", label: "通用电气·麦肯锡" },
    { key: "innovation", label: "创新与变革" }
  ];

  var state = {
    activeSchool: "all",
    activeUse: null,
    query: "",
    model: null,
    map: null,
    scale: 1,
    tx: 0,
    ty: 0,
    canvasType: null
  };
  var pasteCursor = { x: 24, y: 24 };
  var lastMouse = { x: null, y: null }; // viewport 坐标系，用于粘贴定位

  var $ = function (id) { return document.getElementById(id); };

  /* ---------- 侧边栏：流派 + 用途 ---------- */
  function buildSidebar() {
    var nav = $("catNav");
    nav.innerHTML = "";
    var allCount = MODELS.length;
    nav.appendChild(catPill("all", "全部模型", allCount, state.activeSchool === "all"));
    SCHOOL_ORDER.forEach(function (s) {
      var c = MODELS.filter(function (m) { return m.school === s.key; }).length;
      if (c === 0) return;
      nav.appendChild(catPill(s.key, s.label, c, state.activeSchool === s.key));
    });

    // 用途筛选
    var uses = {};
    MODELS.forEach(function (m) { (m.uses || []).forEach(function (u) { uses[u] = (uses[u] || 0) + 1; }); });
    var uf = $("useFilter");
    uf.innerHTML = "";
    Object.keys(uses).sort().forEach(function (u) {
      var chip = document.createElement("button");
      chip.className = "use-chip" + (state.activeUse === u ? " active" : "");
      chip.type = "button";
      chip.textContent = u;
      chip.addEventListener("click", function () {
        state.activeUse = (state.activeUse === u) ? null : u;
        buildSidebar();
        renderGrid();
      });
      uf.appendChild(chip);
    });
  }
  function catPill(key, label, count, active) {
    var b = document.createElement("button");
    b.className = "cat-pill" + (active ? " active" : "");
    b.type = "button";
    b.innerHTML = '<span>' + label + '</span><span class="cat-count">' + count + '</span>';
    b.addEventListener("click", function () {
      state.activeSchool = key;
      buildSidebar();
      renderGrid();
    });
    return b;
  }

  /* ---------- 模型网格 ---------- */
  function filtered() {
    return MODELS.filter(function (m) {
      if (state.activeSchool !== "all" && m.school !== state.activeSchool) return false;
      if (state.activeUse && (m.uses || []).indexOf(state.activeUse) === -1) return false;
      if (state.query) {
        var q = state.query.toLowerCase();
        var hay = (m.name + " " + (m.intro || "") + " " + (m.uses || []).join(" ")).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }
  function renderGrid() {
    var grid = $("modelGrid");
    var list = filtered();
    grid.innerHTML = "";
    $("resultCount").textContent = "共 " + list.length + " 个模型";
    $("emptyState").hidden = list.length !== 0;
    list.forEach(function (m) {
      var card = document.createElement("div");
      card.className = "model-card";
      card.innerHTML =
        '<span class="model-school">' + m.schoolLabel + '</span>' +
        '<div class="model-name">' + m.name + '</div>' +
        '<div class="model-summary">' + (m.intro || "") + '</div>' +
        '<div class="model-uses">' + (m.uses || []).map(function (u) { return '<span class="use-tag">' + u + '</span>'; }).join("") + '</div>' +
        '<div class="model-go">进入画布 <span class="arrow">→</span></div>';
      card.addEventListener("click", function () { openCanvas(m); });
      grid.appendChild(card);
    });
  }

  /* ---------- 画布弹窗 ---------- */
  function openCanvas(m) {
    state.model = m;
    state.canvasType = m.canvas.type;
    pasteCursor.x = 24; pasteCursor.y = 24;
    $("cmSchool").textContent = m.schoolLabel;
    $("cmName").textContent = m.name;
    var uses = $("cmUses");
    uses.innerHTML = (m.uses || []).map(function (u) { return '<span class="use-tag">' + u + '</span>'; }).join("");
    $("cmIntro").textContent = m.intro || "";
    $("cmScenario").textContent = m.scenario || "";
    var cases = $("cmCases");
    cases.innerHTML = (m.cases || []).map(function (c) { return "<li>" + c + "</li>"; }).join("");

    var vp = $("cmViewport");
    state.map = window.CanvasRenderers.render(m.canvas.type, vp, m.canvas.defaults || {});
    fitBoard(true);

    // 粘贴游标默认放到模型结构内部（第一个文本框附近），而不是画布左上角空白处
    var texts = vp.querySelectorAll(".cm-text");
    if (texts.length) {
      pasteCursor.x = texts[0].offsetLeft;
      pasteCursor.y = texts[0].offsetTop;
    } else {
      pasteCursor.x = 24; pasteCursor.y = 24;
    }

    $("canvasModal").classList.add("open");
    $("canvasModal").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeCanvas() {
    $("canvasModal").classList.remove("open");
    $("canvasModal").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ---------- 缩放 / 平移 ---------- */
  function applyTransform() {
    var vp = $("cmViewport");
    vp.style.transform = "translate(" + state.tx + "px," + state.ty + "px) scale(" + state.scale + ")";
    $("cmZoomLabel").textContent = Math.round(state.scale * 100) + "%";
  }
  function resetView() {
    var stage = $("cmStage");
    var vp = $("cmViewport");
    var sw = stage.clientWidth, sh = stage.clientHeight;
    var vw = vp.offsetWidth, vh = vp.offsetHeight;
    state.scale = Math.min(1, (sw - 40) / vw, (sh - 40) / vh);
    state.scale = Math.max(0.3, state.scale);
    state.tx = (sw - vw * state.scale) / 2;
    state.ty = (sh - vh * state.scale) / 2;
    applyTransform();
  }
  function zoomBy(factor) {
    var stage = $("cmStage");
    var cx = stage.clientWidth / 2, cy = stage.clientHeight / 2;
    var newScale = Math.min(2.5, Math.max(0.3, state.scale * factor));
    var vx = (cx - state.tx) / state.scale;
    var vy = (cy - state.ty) / state.scale;
    state.tx = cx - vx * newScale;
    state.ty = cy - vy * newScale;
    state.scale = newScale;
    applyTransform();
  }

  /* 画板仅因自由元素/粘贴内容超出 960×540 时扩展；模板文本框固定高度，不破坏模型结构 */
  var fitTimer = null;
  function fitBoard(andReset) {
    var vp = $("cmViewport");
    var maxX = 960, maxY = 540;
    vp.querySelectorAll(".cm-free").forEach(function (el) {
      var x = el.offsetLeft + el.offsetWidth;
      var y = el.offsetTop + el.offsetHeight;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    });
    var newW = Math.max(960, maxX + 24);
    var newH = Math.max(540, maxY + 24);
    vp.style.width = newW + "px";
    vp.style.height = newH + "px";
    var bg = vp.querySelector("svg.bg");
    if (bg) {
      bg.setAttribute("width", newW);
      bg.setAttribute("height", newH);
      bg.setAttribute("viewBox", "0 0 " + newW + " " + newH);
    }
    if (andReset) resetView();
  }
  function debounceFitBoard(andReset) {
    clearTimeout(fitTimer);
    fitTimer = setTimeout(function () { fitBoard(andReset); }, andReset ? 120 : 30);
  }

  function bindPan() {
    var stage = $("cmStage");
    var dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
    stage.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".cm-text")) return; // 编辑模板文字时不平移
      if (e.target.closest(".cm-free")) return; // 自由元素自己处理拖拽
      dragging = true; sx = e.clientX; sy = e.clientY; ox = state.tx; oy = state.ty;
      stage.setPointerCapture(e.pointerId);
      stage.style.cursor = "grabbing";
    });
    stage.addEventListener("pointermove", function (e) {
      // 记录鼠标在 viewport 内的坐标，供粘贴定位使用
      lastMouse.x = (e.clientX - state.tx) / state.scale;
      lastMouse.y = (e.clientY - state.ty) / state.scale;
      if (!dragging) return;
      state.tx = ox + (e.clientX - sx);
      state.ty = oy + (e.clientY - sy);
      applyTransform();
    });
    function end(e) { dragging = false; stage.style.cursor = ""; if (e.pointerId != null && stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId); }
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);
    stage.addEventListener("wheel", function (e) {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.1 : 1 / 1.1);
    }, { passive: false });
  }

  /* ---------- 用户自由元素：添加 / 拖拽 / 缩放 / 删除 ---------- */
  function attachFree(el, isImg) {
    var del = document.createElement("div");
    del.className = "cm-free-del"; del.textContent = "×";
    del.addEventListener("pointerdown", function (ev) { ev.stopPropagation(); ev.preventDefault(); el.remove(); });
    el.appendChild(del);

    var rz = document.createElement("div");
    rz.className = "cm-free-resize";
    el.appendChild(rz);

    // 拖拽移动
    el.addEventListener("pointerdown", function (ev) {
      if (ev.target === rz || ev.target === del) return;
      if (!isImg && document.activeElement === el) return; // 正在编辑文本时不拖动
      ev.stopPropagation();
      var dragging = true, _sx = ev.clientX, _sy = ev.clientY;
      var _ox = parseFloat(el.style.left) || 0, _oy = parseFloat(el.style.top) || 0;
      el.setPointerCapture(ev.pointerId);
      function mv(e2) {
        if (!dragging) return;
        var dx = (e2.clientX - _sx) / state.scale;
        var dy = (e2.clientY - _sy) / state.scale;
        el.style.left = (_ox + dx) + "px";
        el.style.top = (_oy + dy) + "px";
      }
      function up(e2) {
        dragging = false;
        el.removeEventListener("pointermove", mv);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
        if (e2.pointerId != null && el.hasPointerCapture(e2.pointerId)) el.releasePointerCapture(e2.pointerId);
        fitBoard(true);
      }
      el.addEventListener("pointermove", mv);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
    });

    // 缩放
    rz.addEventListener("pointerdown", function (ev) {
      ev.stopPropagation(); ev.preventDefault();
      var sw = parseFloat(el.style.width) || el.offsetWidth;
      var sh = parseFloat(el.style.height) || el.offsetHeight;
      var _sx = ev.clientX, _sy = ev.clientY;
      rz.setPointerCapture(ev.pointerId);
      function mv(e2) {
        var dw = (e2.clientX - _sx) / state.scale;
        var dh = (e2.clientY - _sy) / state.scale;
        el.style.width = Math.max(40, sw + dw) + "px";
        el.style.height = Math.max(30, sh + dh) + "px";
      }
      function up(e2) {
        rz.removeEventListener("pointermove", mv);
        rz.removeEventListener("pointerup", up);
        if (e2.pointerId != null && rz.hasPointerCapture(e2.pointerId)) rz.releasePointerCapture(e2.pointerId);
        fitBoard(true);
      }
      rz.addEventListener("pointermove", mv);
      rz.addEventListener("pointerup", up);
    });
  }

  function rectsOverlap(x, y, w, h, o) {
    return !(x + w <= o.x || x >= o.x + o.w || y + h <= o.y || y >= o.y + o.h);
  }
  function occupiedRects() {
    var vp = $("cmViewport");
    var arr = [];
    vp.querySelectorAll(".cm-text, .cm-free").forEach(function (el) {
      arr.push({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
    });
    return arr;
  }
  /* 找一个不重叠的位置：优先跟随鼠标，其次在鼠标附近螺旋搜索，最后回退到平铺 */
  function findPastePos(w, h) {
    var occ = occupiedRects();
    var mx = lastMouse.x, my = lastMouse.y;
    if (mx != null && my != null) {
      var x = mx - w / 2, y = my - h / 2;
      x = Math.max(0, x); y = Math.max(0, y);
      if (!occ.some(function (o) { return rectsOverlap(x, y, w, h, o); })) {
        return { x: x, y: y };
      }
      // 鼠标处被占，螺旋搜索附近空位
      var step = 16, radius = 0, maxRadius = 240;
      while (radius <= maxRadius) {
        radius += step;
        for (var angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
          var sx = mx - w / 2 + Math.cos(angle) * radius;
          var sy = my - h / 2 + Math.sin(angle) * radius;
          sx = Math.max(0, Math.floor(sx)); sy = Math.max(0, Math.floor(sy));
          if (!occ.some(function (o) { return rectsOverlap(sx, sy, w, h, o); })) {
            return { x: sx, y: sy };
          }
        }
      }
    }
    // 无鼠标位置或附近全满：回退到平铺游标
    var vp = $("cmViewport");
    var vw = vp.offsetWidth, vh = vp.offsetHeight;
    var x = pasteCursor.x, y = pasteCursor.y;
    var step = 20, guard = 0;
    while (rectsOverlap(x, y, w, h, occ) && guard < 4000) {
      x += step;
      if (x + w > vw - 24) { x = 24; y += step; }
      guard++;
    }
    pasteCursor.x = 24;
    pasteCursor.y = y + h + 24;
    return { x: x, y: y };
  }

  function makeFreeText(left, top, text, isPlaceholder) {
    var vp = $("cmViewport");
    var el = document.createElement("div");
    el.className = "cm-free cm-free-text";
    el.contentEditable = "true";
    el.spellcheck = false;
    el.style.left = left + "px";
    el.style.top = top + "px";
    el.style.width = "180px";
    el.style.height = "auto";
    el.textContent = text;
    attachFree(el, false);
    vp.appendChild(el);
    fitBoard(true);
    if (isPlaceholder) {
      el.focus();
      var sel = window.getSelection(), range = document.createRange();
      range.selectNodeContents(el); sel.removeAllRanges(); sel.addRange(range);
    }
    return el;
  }
  function makeFreeImage(file, left, top) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      var vp = $("cmViewport");
      var wrap = document.createElement("div");
      wrap.className = "cm-free cm-free-img";
      wrap.style.left = left + "px";
      wrap.style.top = top + "px";
      wrap.style.width = "160px";
      wrap.style.height = "120px";
      var img = document.createElement("img");
      img.src = e.target.result; img.alt = file.name || "图片";
      wrap.appendChild(img);
      attachFree(wrap, true);
      vp.appendChild(wrap);
      fitBoard(true);
    };
    reader.readAsDataURL(file);
  }

  function addFreeText() {
    var pos = findPastePos(180, 40);
    makeFreeText(pos.x, pos.y, "双击编辑文本", true);
  }
  function addFreeImage(file) {
    if (!file) return;
    var pos = findPastePos(160, 120);
    makeFreeImage(file, pos.x, pos.y);
  }

  /* ---------- 粘贴：图片 / 文字平铺到空余位置 ---------- */
  function handlePaste(e) {
    var modal = $("canvasModal");
    if (!modal.classList.contains("open")) return;
    var ae = document.activeElement;
    var editingText = ae && ae.isContentEditable && ae.classList.contains("cm-text");
    var editingFreeText = ae && ae.isContentEditable && ae.classList.contains("cm-free-text");
    var cd = e.clipboardData || window.clipboardData;
    if (!cd) return;

    var imgFile = null;
    if (cd.items && cd.items.length) {
      for (var i = 0; i < cd.items.length; i++) {
        if (cd.items[i].type && cd.items[i].type.indexOf("image/") === 0) { imgFile = cd.items[i].getAsFile(); break; }
      }
    }
    if (!imgFile && cd.files && cd.files.length) {
      for (var f = 0; f < cd.files.length; f++) {
        if (cd.files[f].type.indexOf("image/") === 0) { imgFile = cd.files[f]; break; }
      }
    }

    // 正在编辑普通模板文字时：只有纯文字才放行默认粘贴到文本框；图片统一在画布鼠标位置生成自由元素
    if (editingText && !imgFile) return;
    // 正在编辑自由文本时：只有纯文字放行默认粘贴
    if (editingFreeText && !imgFile) return;

    if (imgFile) { addFreeImage(imgFile); return; }
    var text = cd.getData("text/plain");
    if (text && text.trim()) {
      var pos = findPastePos(180, 40);
      makeFreeText(pos.x, pos.y, text.trim(), false);
    }
  }

  /* ---------- 重置内容 ---------- */
  function resetContent() {
    if (!state.model || !state.map) return;
    var def = state.model.canvas.defaults || {};
    Object.keys(state.map).forEach(function (k) {
      state.map[k].textContent = (def[k] != null) ? def[k] : "";
    });
    fitBoard(true);
  }

  /* ---------- 导出 ---------- */
  function downloadBlob(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 200);
  }
  function safeName() { return (state.model ? state.model.id : "model"); }

  function exportPNG() {
    if (typeof html2canvas === "undefined") { alert("导出库未加载"); return; }
    var vp = $("cmViewport");
    var prev = vp.style.transform;
    vp.classList.add("exporting");
    vp.style.transform = "translate(0px,0px) scale(1)";
    var vw = vp.offsetWidth, vh = vp.offsetHeight;
    html2canvas(vp, { width: vw, height: vh, scale: 2, backgroundColor: "#ffffff", logging: false, useCORS: true }).then(function (canvas) {
      vp.style.transform = prev;
      vp.classList.remove("exporting");
      canvas.toBlob(function (blob) { downloadBlob(blob, safeName() + ".png"); }, "image/png");
    }).catch(function (err) {
      vp.style.transform = prev; vp.classList.remove("exporting");
      console.error(err); alert("导出失败：" + err.message);
    });
  }
  function exportSVG() {
    var vp = $("cmViewport");
    var prev = vp.style.transform;
    vp.classList.add("exporting");
    vp.style.transform = "none";
    var clone = vp.cloneNode(true);
    clone.style.transform = "none";
    vp.style.transform = prev; vp.classList.remove("exporting");
    var xml = new XMLSerializer().serializeToString(clone);
    var vw = vp.offsetWidth, vh = vp.offsetHeight;
    var out = '<svg xmlns="http://www.w3.org/2000/svg" width="' + vw + '" height="' + vh + '" viewBox="0 0 ' + vw + ' ' + vh + '">' +
      '<foreignObject width="' + vw + '" height="' + vh + '"><div xmlns="http://www.w3.org/1999/xhtml">' + xml + '</div></foreignObject></svg>';
    var blob = new Blob([out], { type: "image/svg+xml" });
    downloadBlob(blob, safeName() + ".svg");
  }

  /* ---------- 初始化 ---------- */
  function init() {
    buildSidebar();
    renderGrid();
    bindPan();
    document.addEventListener("paste", handlePaste);

    $("cmViewport").addEventListener("input", function () { debounceFitBoard(false); });
    $("cmViewport").addEventListener("blur", function (e) {
      if (e.target.closest(".cm-text, .cm-free-text")) debounceFitBoard(true);
    }, true);

    $("searchForm").addEventListener("submit", function (e) { e.preventDefault(); });
    $("searchInput").addEventListener("input", function (e) {
      state.query = e.target.value.trim();
      renderGrid();
    });

    $("cmClose").addEventListener("click", closeCanvas);
    $("canvasModal").addEventListener("click", function (e) { if (e.target === $("canvasModal")) closeCanvas(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCanvas(); });

    document.querySelectorAll(".cm-zoom button").forEach(function (b) {
      b.addEventListener("click", function () {
        var z = b.getAttribute("data-zoom");
        if (z === "in") zoomBy(1.2);
        else if (z === "out") zoomBy(1 / 1.2);
        else if (z === "reset") resetView();
      });
    });
    $("cmReset").addEventListener("click", resetContent);
    $("cmExportPng").addEventListener("click", exportPNG);
    $("cmExportSvg").addEventListener("click", exportSVG);

    $("addText").addEventListener("click", addFreeText);
    $("addImage").addEventListener("click", function () { $("imageInput").click(); });
    $("imageInput").addEventListener("change", function (e) {
      var f = e.target.files && e.target.files[0];
      addFreeImage(f);
      e.target.value = "";
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
