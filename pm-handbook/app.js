/* 产品经理手册 · 渲染与交互（动作驱动二级结构） */
(function () {
  "use strict";
  var phases = (window.PM_HANDBOOK && window.PM_HANDBOOK.phases) || [];
  var axis = document.getElementById("flowAxis");
  var main = document.getElementById("phases");

  // 转义 HTML，避免模板里的 < > & 被当成标签
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  if (!axis || !main) return;

  // ---- 单个动作的【方法】渲染 ----
  function renderMethod(m) {
    var steps = (m.steps || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
    var artifacts = (m.artifacts || []).map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("");
    var tpls = (m.templates || []).length
      ? m.templates.map(function (t) {
          return (
            '<div class="tpl"><div class="tpl-title">' + esc(t.title) + "</div>" +
            '<pre>' + esc(t.content) + "</pre>" +
            '<button class="copy-btn" type="button" data-content="' + encodeURIComponent(t.content) + '">复制模板</button></div>'
          );
        }).join("")
      : '<p class="no-stuff">（该动作暂无结构化模板，按步骤实操即可）</p>';
    var cases = (m.cases || []).length
      ? m.cases.map(function (c) {
          return (
            '<div class="case"><div class="c-head">' + esc(c.company) + " · " + esc(c.title) + "</div>" +
            '<div class="c-body">' + esc(c.body) + "</div>" +
            '<span class="c-src">来源：' + esc(c.source) + "</span></div>"
          );
        }).join("")
      : '<p class="no-stuff">（该动作以通用最佳实践为主，暂无专属大厂案例）</p>';

    return (
      '<div class="method">' +
        '<div class="m-block"><h4><span class="tag">操作步骤</span></h4><ol class="steps">' + steps + "</ol></div>" +
        '<div class="m-block"><h4><span class="tag">产出物</span></h4><ul>' + artifacts + "</ul></div>" +
        '<div class="m-block tpl-block"><h4><span class="tag">标准模版</span></h4>' + tpls + "</div>" +
        '<div class="m-block case-block"><h4><span class="tag">大厂案例</span></h4>' + cases + "</div>" +
      "</div>"
    );
  }

  // ---- 单个动作（必做/可选）卡片 ----
  function renderAction(a, kind) {
    var badge = kind === "req" ? "必做" : "可选";
    return (
      '<div class="action" data-id="' + esc(a.id) + '">' +
        '<button class="action-head" type="button" aria-expanded="false">' +
          '<span class="a-badge ' + kind + '">' + badge + "</span>" +
          '<span class="a-name">' + esc(a.name) + "</span>" +
          '<span class="a-why">' + esc(a.why) + "</span>" +
          '<span class="a-chev" aria-hidden="true">▾</span>' +
        "</button>" +
        '<div class="action-body">' + renderMethod(a.method) + "</div>" +
      "</div>"
    );
  }

  // ---- 动作组（必做 / 可选） ----
  function renderGroup(label, kind, items) {
    if (!items || !items.length) return "";
    return (
      '<div class="actions-group">' +
        '<div class="group-label ' + kind + '">' + esc(label) + '<span class="group-count">' + items.length + " 个动作</span></div>" +
        items.map(function (a) { return renderAction(a, kind); }).join("") +
      "</div>"
    );
  }

  // ---- 渲染流程轴 + 阶段详情 ----
  phases.forEach(function (p) {
    var node = document.createElement("button");
    node.className = "flow-node";
    node.type = "button";
    node.dataset.target = p.id;
    node.innerHTML = '<span class="fn-num">' + esc(p.num) + "</span>" + esc(p.name);
    axis.appendChild(node);

    var sec = document.createElement("section");
    sec.className = "phase";
    sec.id = p.id;
    sec.innerHTML =
      '<div class="phase-head"><span class="fn-num">' + esc(p.num) + "</span>" +
      "<h2>" + esc(p.name) + '</h2><span class="verb">· ' + esc(p.verb) + "</span></div>" +
      '<p class="goal">' + esc(p.goal) + "</p>" +
      renderGroup("必做动作", "req", p.required) +
      renderGroup("可选动作", "opt", p.optional);
    main.appendChild(sec);
  });

  // ---- 流程轴点击：滚动到对应阶段（禁用 scrollIntoView，手动算偏移） ----
  axis.addEventListener("click", function (e) {
    var btn = e.target.closest(".flow-node");
    if (!btn) return;
    var target = document.getElementById(btn.dataset.target);
    if (!target) return;
    var y = target.getBoundingClientRect().top + window.scrollY - 150;
    window.scrollTo({ top: y, behavior: "smooth" });
  });

  // ---- 动作钻取 + 模板复制（同一委托，先判复制再判展开） ----
  main.addEventListener("click", function (e) {
    var copyBtn = e.target.closest(".copy-btn");
    if (copyBtn) {
      var text = decodeURIComponent(copyBtn.dataset.content);
      function done() {
        copyBtn.textContent = "已复制 ✓";
        copyBtn.classList.add("done");
        setTimeout(function () {
          copyBtn.textContent = "复制模板";
          copyBtn.classList.remove("done");
        }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
      } else {
        fallbackCopy(text);
        done();
      }
      return;
    }
    var head = e.target.closest(".action-head");
    if (!head) return;
    var act = head.closest(".action");
    var open = act.classList.toggle("open");
    head.setAttribute("aria-expanded", open ? "true" : "false");
  });

  function fallbackCopy(text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    } catch (err) { /* 忽略 */ }
  }

  // ---- scrollspy：高亮当前阶段 ----
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          axis.querySelectorAll(".flow-node").forEach(function (n) {
            n.classList.toggle("active", n.dataset.target === en.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    phases.forEach(function (p) {
      var el = document.getElementById(p.id);
      if (el) io.observe(el);
    });
  }

  // ---- 注入页脚联系方式区（本地自包含路径） ----
  if (typeof fetch === "function") {
    fetch("assets/contact/contact-chunk.html")
      .then(function (r) { return r.text(); })
      .then(function (h) {
        var c = document.getElementById("contact");
        if (!c) return;
        c.innerHTML = h;
        var s = document.createElement("script");
        s.src = "assets/contact/contact.js";
        s.dataset.base = "";
        document.body.appendChild(s);
      })
      .catch(function () { /* 离线或非 http 环境静默 */ });
  }
})();
