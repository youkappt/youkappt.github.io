/* 战略模型画布 — 各模型版式渲染器
 * 每个渲染器：(svg, layer, txt, arrow, defaults) => void
 * txt(key, x, y, w, h, cls) 创建可编辑文本块（坐标基于 960×540 画布空间）
 * 设计原则：模型结构保持固定版式；文本框高度锁定，超出时内部滚动，避免矩阵/流程变形。
 */
(function () {
  var SVGNS = "http://www.w3.org/2000/svg";
  var INK = "#1a3300";
  var YELLOW = "#ffe95c";
  var MINT = "#d5f5c2";
  var TEAL = "#a8e5e5";
  var BLUSH = "#f6d0ff";
  var GRAY = "#b6b6b6";
  var WHITE = "#ffffff";

  function svgEl(tag, attrs) {
    var e = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function box(svg, x, y, w, h, fill, r) {
    var r2 = (r == null) ? 12 : r;
    return svgEl("rect", { x: x, y: y, width: w, height: h, rx: r2, ry: r2, fill: fill, stroke: INK, "stroke-width": 2 });
  }
  function line(svg, x1, y1, x2, y2, w, dash) {
    var a = { x1: x1, y1: y1, x2: x2, y2: y2, stroke: INK, "stroke-width": w || 2 };
    if (dash) a["stroke-dasharray"] = dash;
    return svgEl("line", a);
  }
  function dot(svg, cx, cy, r, fill) {
    return svgEl("circle", { cx: cx, cy: cy, r: r, fill: fill || WHITE, stroke: INK, "stroke-width": 2 });
  }
  function path(svg, d, w) {
    return svgEl("path", { d: d, fill: "none", stroke: INK, "stroke-width": w || 2 });
  }

  // 通用：建立 svg + 文本层，调用具体渲染器
  function render(type, viewport, defaults) {
    viewport.innerHTML = "";
    var svg = svgEl("svg", { class: "bg", viewBox: "0 0 960 540", width: 960, height: 540 });
    var defs = svgEl("defs");
    var marker = svgEl("marker", { id: "arr", markerWidth: 10, markerHeight: 10, refX: 8, refY: 3, orient: "auto", markerUnits: "strokeWidth" });
    marker.appendChild(svgEl("path", { d: "M0,0 L8,3 L0,6 Z", fill: INK }));
    defs.appendChild(marker);
    svg.appendChild(defs);

    var layer = document.createElement("div");
    layer.className = "cm-textlayer";

    var map = {};
    function txt(key, x, y, w, h, cls) {
      var d = document.createElement("div");
      d.className = "cm-text" + (cls ? " " + cls : "");
      d.style.left = x + "px";
      d.style.top = y + "px";
      d.style.width = w + "px";
      d.style.height = h + "px";
      d.style.maxHeight = h + "px";
      d.contentEditable = "true";
      d.spellcheck = false;
      d.textContent = (defaults && defaults[key] != null) ? defaults[key] : "";
      d.dataset.key = key;
      layer.appendChild(d);
      map[key] = d;
      return d;
    }
    function arrow(x1, y1, x2, y2) {
      svg.appendChild(svgEl("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: INK, "stroke-width": 2, "marker-end": "url(#arr)" }));
    }

    var fn = RENDERERS[type];
    if (fn) fn(svg, layer, txt, arrow, defaults);

    viewport.appendChild(svg);
    viewport.appendChild(layer);
    return map;
  }

  var RENDERERS = {};

  /* ---------- 波特五力 ---------- */
  RENDERERS["porters-five-forces"] = function (svg, layer, txt, arrow, d) {
    var cx = 380, cy = 230, cw = 200, ch = 80;
    svg.appendChild(box(svg, cx, cy, cw, ch, MINT));
    svg.appendChild(box(svg, 380, 40, 200, 70, WHITE));
    svg.appendChild(box(svg, 380, 430, 200, 70, WHITE));
    svg.appendChild(box(svg, 40, 235, 180, 70, WHITE));
    svg.appendChild(box(svg, 740, 235, 180, 70, WHITE));
    arrow(480, 110, 480, 228);
    arrow(480, 430, 480, 312);
    arrow(220, 270, 378, 270);
    arrow(740, 270, 582, 270);
    txt("center", cx, cy, cw, ch, "lg");
    txt("supplier", 380, 40, 200, 70);
    txt("buyer", 380, 430, 200, 70);
    txt("newcomer", 40, 235, 180, 70);
    txt("substitute", 740, 235, 180, 70);
  };

  /* ---------- 波特价值链 ---------- */
  RENDERERS["porters-value-chain"] = function (svg, layer, txt, arrow, d) {
    var px = [40, 220, 400, 580, 760], pw = 160, py = 380, ph = 80;
    for (var i = 0; i < 5; i++) box(svg, px[i], py, pw, ph, WHITE).setAttribute("class", "vc-p-box");
    var sx = [41, 267, 493, 719], sw = 200, sy = 140, sh = 64;
    for (var j = 0; j < 4; j++) box(svg, sx[j], sy, sw, sh, TEAL).setAttribute("class", "vc-s-box");
    svg.appendChild(line(svg, 41, 224, 919, 224, 2)).setAttribute("class", "vc-bracket vc-bracket-top");
    svg.appendChild(line(svg, 41, 216, 41, 224, 2)).setAttribute("class", "vc-bracket vc-bracket-left");
    svg.appendChild(line(svg, 919, 216, 919, 224, 2)).setAttribute("class", "vc-bracket vc-bracket-right");
    svg.appendChild(line(svg, 925, 380, 925, 460, 2)).setAttribute("class", "vc-profit");
    svg.appendChild(svgEl("path", { d: "M921,456 L925,464 L929,456 Z", fill: INK }));
    txt("s1", sx[0], sy, sw, sh); txt("s2", sx[1], sy, sw, sh); txt("s3", sx[2], sy, sw, sh); txt("s4", sx[3], sy, sw, sh);
    txt("p1", px[0], py, pw, ph); txt("p2", px[1], py, pw, ph); txt("p3", px[2], py, pw, ph); txt("p4", px[3], py, pw, ph); txt("p5", px[4], py, pw, ph);
    txt("margin", 880, 300, 90, 40, "sm");
  };

  /* ---------- 波特钻石 ---------- */
  RENDERERS["porters-diamond"] = function (svg, layer, txt, arrow, d) {
    svg.appendChild(box(svg, 380, 50, 200, 64, MINT));
    svg.appendChild(box(svg, 380, 426, 200, 64, WHITE));
    svg.appendChild(box(svg, 40, 238, 200, 64, WHITE));
    svg.appendChild(box(svg, 720, 238, 200, 64, WHITE));
    svg.appendChild(line(svg, 480, 114, 480, 238, 2, "4 4"));
    svg.appendChild(line(svg, 480, 426, 480, 302, 2, "4 4"));
    svg.appendChild(line(svg, 240, 270, 380, 270, 2, "4 4"));
    svg.appendChild(line(svg, 720, 270, 580, 270, 2, "4 4"));
    svg.appendChild(dot(svg, 860, 95, 48, YELLOW));
    svg.appendChild(dot(svg, 480, 508, 40, BLUSH));
    txt("factor", 380, 50, 200, 64);
    txt("strategy", 380, 426, 200, 64);
    txt("demand", 40, 238, 200, 64);
    txt("related", 720, 238, 200, 64);
    txt("chance", 812, 77, 96, 36, "sm");
    txt("government", 440, 492, 80, 32, "sm");
  };

  /* ---------- 波士顿矩阵 ---------- */
  RENDERERS["bcg-matrix"] = function (svg, layer, txt, arrow, d) {
    var x0 = 160, y0 = 70, w = 660, h = 400, mx = x0 + w / 2, my = y0 + h / 2;
    svg.appendChild(box(svg, x0, y0, w, h, WHITE, 0)).setAttribute("class", "bcg-bg");
    svg.appendChild(line(svg, mx, y0, mx, y0 + h, 2)).setAttribute("class", "bcg-vline");
    svg.appendChild(line(svg, x0, my, x0 + w, my, 2)).setAttribute("class", "bcg-hline");
    txt("q1", 175, 110, 300, 110, "lg");
    txt("q2", 515, 110, 300, 110, "lg");
    txt("q3", 175, 310, 300, 110, "lg");
    txt("q4", 515, 310, 300, 110, "lg");
    txt("axisY", 360, 30, 280, 30, "sm");
    txt("axisX", 360, 510, 280, 30, "sm");
    txt("note", 410, 255, 140, 30, "sm");
  };

  /* ---------- 波士顿经验曲线 ---------- */
  RENDERERS["bcg-experience-curve"] = function (svg, layer, txt, arrow, d) {
    svg.appendChild(line(svg, 120, 470, 900, 470, 2));
    svg.appendChild(line(svg, 120, 470, 120, 80, 2));
    svg.appendChild(path(svg, "M120,120 C 360,150 560,330 900,440", 3));
    svg.appendChild(line(svg, 360, 470, 360, 80, 1, "3 5"));
    svg.appendChild(line(svg, 600, 470, 600, 80, 1, "3 5"));
    svg.appendChild(line(svg, 120, 360, 900, 360, 1, "3 5"));
    svg.appendChild(line(svg, 120, 240, 900, 240, 1, "3 5"));
    txt("title", 360, 30, 360, 36, "lg");
    txt("xlabel", 520, 500, 260, 30, "sm");
    txt("ylabel", 30, 260, 120, 30, "sm");
    txt("note1", 250, 170, 140, 28, "sm");
    txt("note2", 660, 390, 140, 28, "sm");
  };

  /* ---------- 安索夫矩阵 ---------- */
  RENDERERS["ansoff-matrix"] = function (svg, layer, txt, arrow, d) {
    var x0 = 160, y0 = 120, w = 640, h = 340, mx = x0 + w / 2, my = y0 + h / 2;
    svg.appendChild(box(svg, x0, y0, w, h, WHITE, 0)).setAttribute("class", "ansoff-bg");
    svg.appendChild(line(svg, mx, y0, mx, y0 + h, 2)).setAttribute("class", "ansoff-vline");
    svg.appendChild(line(svg, x0, my, x0 + w, my, 2)).setAttribute("class", "ansoff-hline");
    txt("q1", 175, 135, 290, 150);
    txt("q2", 495, 135, 290, 150);
    txt("q3", 175, 305, 290, 150);
    txt("q4", 495, 305, 290, 150);
    txt("axisY", 35, 270, 90, 30, "sm");
    txt("axisX", 360, 490, 280, 30, "sm");
  };

  /* ---------- 杜邦分析法 ---------- */
  RENDERERS["dupont"] = function (svg, layer, txt, arrow, d) {
    var r = 200, rx = 380, ry = 40, rh = 64;
    box(svg, rx, ry, r, rh, YELLOW).setAttribute("class", "dup-top");
    var bx = [40, 390, 740], bw = 180, by = 200, bh = 70;
    for (var i = 0; i < 3; i++) box(svg, bx[i], by, bw, bh, MINT).setAttribute("class", "dup-mid");
    arrow(rx + r / 2, ry + rh, bx[0] + bw / 2, by);
    arrow(rx + r / 2, ry + rh, bx[1] + bw / 2, by);
    arrow(rx + r / 2, ry + rh, bx[2] + bw / 2, by);
    var x1 = svgEl("text", { x: 245, y: 245, "font-size": 22, fill: INK, "text-anchor": "middle", "font-family": "Inter, sans-serif" });
    x1.textContent = "×"; x1.setAttribute("class", "dup-x"); svg.appendChild(x1);
    var x2 = svgEl("text", { x: 695, y: 245, "font-size": 22, fill: INK, "text-anchor": "middle", "font-family": "Inter, sans-serif" });
    x2.textContent = "×"; x2.setAttribute("class", "dup-x"); svg.appendChild(x2);
    var sy = 330, sh = 60;
    for (var k = 0; k < 3; k++) box(svg, bx[k], sy, bw, sh, WHITE, 8).setAttribute("class", "dup-sub");
    txt("roe", rx, ry, r, rh, "lg");
    txt("n1", bx[0], by, bw, bh); txt("n2", bx[1], by, bw, bh); txt("n3", bx[2], by, bw, bh);
    txt("sub1", bx[0], sy, bw, sh, "sm"); txt("sub2", bx[1], sy, bw, sh, "sm"); txt("sub3", bx[2], sy, bw, sh, "sm");
  };

  /* ---------- 标杆分析法 ---------- */
  RENDERERS["benchmarking"] = function (svg, layer, txt, arrow, d) {
    var x = [45, 225, 405, 585, 765], w = 150, y = 230, h = 90;
    for (var i = 0; i < 5; i++) svg.appendChild(box(svg, x[i], y, w, h, TEAL));
    for (var j = 0; j < 4; j++) arrow(x[j] + w, y + h / 2, x[j + 1], y + h / 2);
    svg.appendChild(path(svg, "M840,330 C 840,420 120,420 120,330", 2));
    svg.appendChild(svgEl("path", { d: "M120,330 L116,322 L124,322 Z", fill: INK }));
    txt("s1", x[0], y, w, h); txt("s2", x[1], y, w, h); txt("s3", x[2], y, w, h); txt("s4", x[3], y, w, h); txt("s5", x[4], y, w, h);
    txt("note", 410, 430, 140, 30, "sm");
  };

  /* ---------- 德鲁克七种革新来源 ---------- */
  RENDERERS["drucker-7-sources"] = function (svg, layer, txt, arrow, d) {
    txt("title", 260, 24, 440, 40, "lg");
    var ys = [110, 168, 226, 284, 342, 400, 458];
    for (var i = 0; i < 7; i++) {
      box(svg, 170, ys[i], 660, 44, WHITE, 8).setAttribute("class", "drk-box");
      dot(svg, 130, ys[i] + 22, 20, YELLOW).setAttribute("class", "drk-dot");
      var num = svgEl("text", { x: 130, y: ys[i] + 29, "font-size": 18, fill: INK, "text-anchor": "middle", "font-family": "Inter, sans-serif", "font-weight": 700 });
      num.textContent = (i + 1); num.setAttribute("class", "drk-num"); svg.appendChild(num);
      txt("src" + (i + 1), 190, ys[i], 620, 44);
    }
  };

  window.CanvasRenderers = { render: render };
})();
