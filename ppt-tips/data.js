/* ============================================================
   PPT 技巧页 — 内容数据源（唯一数据源）
   每条技巧:
     id, name, scenario(分类), level, summary,
     before { tag, desc, visual }, after { tag, desc, visual },
     steps [ { text, shortcut? } ], tips?, relatedTerms [ppthub id], demo
   visual 字段是内联 HTML（迷你 slide），卡片缩略与 Modal 大图共用。
   ============================================================ */

/* ---- 迷你 slide 视觉辅助 ---- */
function slide(inner) { return '<div class="ba-slide">' + inner + '</div>'; }
function r(x, y, w, h, color, op) {
  return '<div style="position:absolute;left:' + x + '%;top:' + y + '%;width:' + w + '%;height:' + h + '%;background:' + color + ';border-radius:4px;opacity:' + (op == null ? 1 : op) + '"></div>';
}
function txt(x, y, w, s, size, color, bold) {
  return '<div style="position:absolute;left:' + x + '%;top:' + y + '%;width:' + w + '%;font:' + (bold ? '600 ' : '') + size + 'px var(--font-body);color:' + color + ';line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + s + '</div>';
}
function circ(x, y, d, color) {
  return '<div style="position:absolute;left:' + x + '%;top:' + y + '%;width:' + d + 'px;height:' + d + 'px;border-radius:50%;background:' + color + '"></div>';
}
/* 线性 SVG 图标（AuthKit 风格，零远程请求），name: target / chart / rocket */
function icon(name, x, y, size, color) {
  const P = {
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
    chart: '<line x1="5" y1="20" x2="5" y2="13"/><line x1="12" y1="20" x2="12" y2="6"/><line x1="19" y1="20" x2="19" y2="15"/><line x1="3.5" y1="20" x2="20.5" y2="20"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>'
  };
  return '<div style="position:absolute;left:' + x + '%;top:' + y + '%;width:' + size + 'px;height:' + size + 'px;color:' + color + '">'
    + '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + P[name] + '</svg>'
    + '</div>';
}

const TECHNIQUES = [
  /* ===================== 职场汇报 ===================== */
  {
    id: "theme-unify", name: "用主题+母版一键统一风格",
    scenario: "统一风格与母版", level: "入门",
    summary: "改一处，全篇几十页的颜色字体一起变，告别逐页手动调。",
    before: {
      tag: "改前", desc: "每页手动改色改字，风格越改越乱、对不齐。",
      visual: slide(
        r(8, 16, 50, 9, "#cb5521", .85) + r(8, 32, 70, 5, "#777777") +
        r(8, 52, 84, 4, "#777777") +
        '<div style="position:absolute;bottom:8%;right:8%;font:11px var(--font-mono);color:#777777">第 1 页 · 红</div>' +
        '<div style="position:absolute;top:40%;right:6%;width:30%;height:30%;background:#22c55e;border-radius:6px;opacity:.8"></div>'
      )
    },
    after: {
      tag: "改后", desc: "改主题/母版一次，全篇同步换装。",
      visual: slide(
        r(8, 16, 50, 9, "#2f6f3a", .9) + r(8, 32, 70, 5, "#777777") +
        r(8, 52, 84, 4, "#777777") +
        '<div style="position:absolute;bottom:8%;right:8%;font:11px var(--font-mono);color:#777777">第 1 页 · 紫</div>' +
        '<div style="position:absolute;top:40%;right:6%;width:30%;height:30%;background:#2f6f3a;border-radius:6px;opacity:.85"></div>'
      )
    },
    steps: [
      { text: "视图 → 幻灯片母版，进入母版视图" },
      { text: "在母版里改主题颜色与字体：设计 → 变体 → 颜色 / 字体" },
      { text: "在母版左上角放 Logo、页脚，所有页自动带上" },
      { text: "关闭母版视图，正文继承统一风格" }
    ],
    tips: "先定母版再填内容，后期整体换肤只动一次。",
    relatedTerms: ["master", "theme"], demo: "themeSync"
  },
  {
    id: "align-quick", name: "参考线+对齐工具快速对齐",
    scenario: "排版与图示", level: "入门",
    summary: "多个元素一键对齐到同一条线，别再用肉眼慢慢拖。",
    before: {
      tag: "改前", desc: "三个按钮高低不齐，靠肉眼拖永远差一点点。",
      visual: slide(
        '<div style="position:absolute;left:6%;top:42%;width:88%;height:0;border-top:1px dashed rgba(216,236,248,.45)"></div>' +
        '<div style="position:absolute;left:10%;top:22%;width:22%;height:14%;background:#cb5521;border-radius:6px;opacity:.8"></div>' +
        '<div style="position:absolute;left:40%;top:46%;width:22%;height:14%;background:#cb5521;border-radius:6px;opacity:.8"></div>' +
        '<div style="position:absolute;left:70%;top:30%;width:22%;height:14%;background:#cb5521;border-radius:6px;opacity:.8"></div>'
      )
    },
    after: {
      tag: "改后", desc: "一键顶端对齐，三个按钮齐刷刷吸附到参考线。",
      visual: slide(
        '<div style="position:absolute;left:6%;top:42%;width:88%;height:0;border-top:1px dashed rgba(160,120,255,.95)"></div>' +
        '<div style="position:absolute;left:6%;top:41%;width:88%;height:2px;background:rgba(160,120,255,.35);filter:blur(1px)"></div>' +
        '<div style="position:absolute;left:10%;top:42%;width:22%;height:14%;background:#2f6f3a;border-radius:6px;opacity:.9;box-shadow:0 0 0 2px rgba(160,120,255,.5)"></div>' +
        '<div style="position:absolute;left:40%;top:42%;width:22%;height:14%;background:#2f6f3a;border-radius:6px;opacity:.9;box-shadow:0 0 0 2px rgba(160,120,255,.5)"></div>' +
        '<div style="position:absolute;left:70%;top:42%;width:22%;height:14%;background:#2f6f3a;border-radius:6px;opacity:.9;box-shadow:0 0 0 2px rgba(160,120,255,.5)"></div>'
      )
    },
    steps: [
      { text: "框选多个要对齐的对象（Shift 多选）" },
      { text: "开始 → 排列 → 对齐 → 选「顶端对齐 / 左对齐」", shortcut: "Alt+A" },
      { text: "再选「横向分布」，让间距完全相等" },
      { text: "拖动时靠自动出现的智能参考线吸附对齐" }
    ],
    tips: "对齐前先想清楚按「左 / 中 / 顶」哪条线对齐，再动手。",
    relatedTerms: ["guides"], demo: "alignSnap"
  },
  {
    id: "smartart-flow", name: "SmartArt 秒出流程图",
    scenario: "排版与图示", level: "入门",
    summary: "填文字自动排出组织架构/流程，不用手动对齐一堆框。",
    before: {
      tag: "改前", desc: "手画几个框加连线，歪歪扭扭还对不齐。",
      visual: slide(
        '<div style="position:absolute;left:7%;top:22%;width:20%;height:14%;background:#cb5521;border-radius:5px;opacity:.7;transform:rotate(-4deg)"></div>' +
        '<div style="position:absolute;left:47%;top:54%;width:21%;height:13%;background:#cb5521;border-radius:5px;opacity:.7;transform:rotate(3deg)"></div>' +
        '<div style="position:absolute;left:81%;top:18%;width:18%;height:15%;background:#cb5521;border-radius:5px;opacity:.7;transform:rotate(-2deg)"></div>' +
        '<div style="position:absolute;left:25%;top:30%;width:2px;height:24%;background:rgba(228,120,110,.55);transform:rotate(36deg)"></div>' +
        '<div style="position:absolute;left:66%;top:50%;width:2px;height:22%;background:rgba(228,120,110,.55);transform:rotate(-42deg)"></div>'
      )
    },
    after: {
      tag: "改后", desc: "SmartArt 自动排版，统一又整齐。",
      visual: slide(
        '<div style="position:absolute;left:6%;top:34%;width:22%;height:16%;background:#2f6f3a;border-radius:6px;opacity:.9;display:grid;place-items:center;color:#ffffff;font:600 13px var(--font-body)">开始</div>' +
        '<div style="position:absolute;left:39%;top:34%;width:22%;height:16%;background:#2f6f3a;border-radius:6px;opacity:.9;display:grid;place-items:center;color:#ffffff;font:600 13px var(--font-body)">处理</div>' +
        '<div style="position:absolute;left:72%;top:34%;width:22%;height:16%;background:#2f6f3a;border-radius:6px;opacity:.9;display:grid;place-items:center;color:#ffffff;font:600 13px var(--font-body)">完成</div>' +
        '<div style="position:absolute;left:28%;top:41%;width:11%;height:2px;background:rgba(26,51,0,.5)"></div>' +
        '<div style="position:absolute;left:36.6%;top:40%;color:rgba(26,51,0,.7);font:10px/1 sans-serif">▶</div>' +
        '<div style="position:absolute;left:61%;top:41%;width:11%;height:2px;background:rgba(26,51,0,.5)"></div>' +
        '<div style="position:absolute;left:69.6%;top:40%;color:rgba(26,51,0,.7);font:10px/1 sans-serif">▶</div>'
      )
    },
    steps: [
      { text: "插入 → SmartArt → 选「流程 / 层次结构」" },
      { text: "在左侧文本窗格填节点文字（Enter 加同级，Tab 降级）" },
      { text: "整体换配色 / 样式，一键美化" },
      { text: "需要精细改时「转换为形状」拆解编辑" }
    ],
    tips: "超过 4 个框的图示，优先 SmartArt，别手画。",
    relatedTerms: ["smartart"], demo: "smartartBuild"
  },

  /* ===================== 答辩演讲 ===================== */
  {
    id: "zoom-catalog", name: "缩放定位做可交互目录",
    scenario: "放映与演讲", level: "进阶",
    summary: "做一个能点的目录页，按观众兴趣跳章节，不用死翻。",
    before: {
      tag: "改前", desc: "普通文字目录，不能点，只能顺序翻。",
      visual: slide(
        txt(10, 24, 70, "目录", 22, "rgba(216,236,248,.85)", true) +
        txt(12, 44, 70, "1. 背景", 14, "#777777") +
        txt(12, 56, 70, "2. 方案", 14, "#777777") +
        txt(12, 68, 70, "3. 总结", 14, "#777777")
      )
    },
    after: {
      tag: "改后", desc: "目录页带缩略图，点哪跳哪。",
      visual: slide(
        txt(10, 14, 70, "目录", 18, "rgba(216,236,248,.85)", true) +
        '<div style="position:absolute;left:12%;top:40%;width:22%;height:26%;background:#2f6f3a;border-radius:6px;opacity:.8"></div>' +
        '<div style="position:absolute;left:39%;top:40%;width:22%;height:26%;background:#cb5521;border-radius:6px;opacity:.8"></div>' +
        '<div style="position:absolute;left:66%;top:40%;width:22%;height:26%;background:#269684;border-radius:6px;opacity:.8"></div>'
      )
    },
    steps: [
      { text: "先给各部分插入「节」(Section) 分章" },
      { text: "在目录页 插入 → 缩放定位 → 摘要缩放" },
      { text: "勾选要跳转的节，自动生成缩略图" },
      { text: "放映时点缩略图即跳到该节，结束返回目录" }
    ],
    tips: "路演按观众兴趣挑章节讲，比从头翻到尾更抓人。",
    relatedTerms: ["zoom-loc", "section"], demo: "zoomNav"
  },
  {
    id: "anim-steps", name: "动画窗格让重点逐条出现",
    scenario: "动画与交互", level: "入门",
    summary: "一页多个要点依次出现，避免一次性糊观众脸上。",
    before: {
      tag: "改前", desc: "所有要点同时出现，一打开就糊成一团。",
      visual: slide(
        txt(10, 22, 80, "· 要点一 · 要点二", 15, "#777777") +
        txt(10, 40, 80, "· 要点三 · 要点四", 15, "#777777") +
        txt(10, 58, 80, "· 要点五 · 要点六", 15, "#777777")
      )
    },
    after: {
      tag: "改后", desc: "要点按顺序 / 点击逐条出现。",
      visual: slide(
        txt(10, 22, 80, "· 要点一", 15, "#9fe3c5") +
        txt(10, 40, 80, "· 要点二", 15, "#9fe3c5") +
        '<div style="position:absolute;left:10%;top:56%;width:6%;height:5%;background:#2f6f3a;border-radius:3px;opacity:.8"></div>' +
        txt(18, 57, 70, "要点三（即将出现）", 13, "rgba(216,236,248,.45)")
      )
    },
    steps: [
      { text: "选中要出现的元素 → 动画 → 选「出现 / 淡出」" },
      { text: "打开动画窗格（动画 → 动画窗格）" },
      { text: "拖动调顺序，设「上一动画之后」自动连播" },
      { text: "调时长 / 延迟控制节奏，别太快" }
    ],
    tips: "一页动画别超过 5 个，节奏慢一点更显稳。",
    relatedTerms: ["animation-pane"], demo: "revealSteps"
  },
  {
    id: "section-jump", name: "节(Section)分章节+整节跳转",
    scenario: "放映与演讲", level: "进阶",
    summary: "长答辩按章节分组，整节跳过或跳转不迷路。",
    before: {
      tag: "改前", desc: "60 页扁平列表，找不到章在哪。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:18%;width:84%;height:4%;background:#777777;border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:28%;width:84%;height:4%;background:#777777;border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:38%;width:84%;height:4%;background:#777777;border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:48%;width:84%;height:4%;background:#777777;border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:58%;width:84%;height:4%;background:#777777;border-radius:2px"></div>'
      )
    },
    after: {
      tag: "改后", desc: "缩略图按节折叠分组，整节快进。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:18%;width:84%;height:7%;background:#2f6f3a;border-radius:5px;opacity:.85"></div>' +
        '<div style="position:absolute;left:12%;top:30%;width:80%;height:4%;background:#777777;border-radius:2px"></div>' +
        '<div style="position:absolute;left:12%;top:38%;width:80%;height:4%;background:#777777;border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:50%;width:84%;height:7%;background:#cb5521;border-radius:5px;opacity:.85"></div>' +
        '<div style="position:absolute;left:12%;top:62%;width:80%;height:4%;background:#777777;border-radius:2px"></div>'
      )
    },
    steps: [
      { text: "在章节首页前 开始 → 节 → 新增节" },
      { text: "右键节 → 重命名（背景 / 方案 / 总结）" },
      { text: "缩略图栏可整体折叠 / 展开" },
      { text: "放映时右键 → 跳到节，整节快进" }
    ],
    tips: "长文档先分节再填充，导航和放映都清爽。",
    relatedTerms: ["section"], demo: "sectionNav"
  },

  /* ===================== 教学课件 ===================== */
  {
    id: "boolean-icon", name: "布尔运算拼复杂图标",
    scenario: "图形与图像", level: "进阶",
    summary: "两个形状联合/相减/相交，拼出软件没有的图。",
    before: {
      tag: "改前", desc: "现成图标库没有想要的图形，方片凑很难看。",
      visual: slide(
        '<div style="position:absolute;left:34%;top:34%;width:32%;height:32%;border:2px solid #cb5521;border-radius:50%;opacity:.85"></div>' +
        '<div style="position:absolute;left:34%;top:34%;width:32%;height:32%;background:#cb5521;border-radius:6px;opacity:.4"></div>'
      )
    },
    after: {
      tag: "改后", desc: "两圆相减，得到干净圆环箭头。",
      visual: slide(
        '<div style="position:absolute;left:34%;top:34%;width:32%;height:32%;border:14px solid #2f6f3a;border-radius:50%;box-sizing:border-box;opacity:.9"></div>' +
        '<div style="position:absolute;left:62%;top:34%;width:14%;height:14%;background:#2f6f3a;clip-path:polygon(0 30%,70% 30%,70% 0,100% 50%,70% 100%,70% 70%,0 70%);"></div>'
      )
    },
    steps: [
      { text: "插入两个重叠形状（如两个圆）" },
      { text: "选中两者 → 形状格式 → 合并形状" },
      { text: "选「相交 / 减去 / 联合」得到新图形" },
      { text: "上色、加文字，组合后搬运" }
    ],
    tips: "布尔前先想清楚「谁在上层挖下层」，顺序决定结果。",
    relatedTerms: ["boolean"], demo: "booleanBuild"
  },
  {
    id: "eyedrop-color", name: "取色器从 Logo 吸色统一色系",
    scenario: "统一风格与母版", level: "入门",
    summary: "从 Logo 吸出品牌色填文字，绝不跑色。",
    before: {
      tag: "改前", desc: "文字用了近似色，和 Logo 有色偏。",
      visual: slide(
        '<div style="position:absolute;left:10%;top:24%;width:18%;height:18%;background:#f59e0b;border-radius:8px;opacity:.9"></div>' +
        txt(34, 26, 55, "优卡说PPT", 18, "#e6b35a", true) +
        txt(10, 56, 80, "标题用了近似黄，和 Logo 差一口气", 13, "#777777")
      )
    },
    after: {
      tag: "改后", desc: "吸管从 Logo 取色，文字同色系。",
      visual: slide(
        '<div style="position:absolute;left:10%;top:24%;width:18%;height:18%;background:#f59e0b;border-radius:8px;opacity:.95"></div>' +
        txt(34, 26, 55, "优卡说PPT", 18, "#f59e0b", true) +
        txt(10, 56, 80, "标题 = Logo 品牌色，完全一致", 13, "#777777")
      )
    },
    steps: [
      { text: "选中要改色的对象" },
      { text: "颜色面板 → 取色器（吸管）" },
      { text: "点一下 Logo 上的品牌色" },
      { text: "全文用同色系，统一观感" }
    ],
    tips: "配色不超过 3 个主色，其中一个一定来自品牌色。",
    relatedTerms: ["eyedropper"], demo: "eyedrop"
  },
  {
    id: "master-batch", name: "母版批量加 Logo/页脚/页码",
    scenario: "统一风格与母版", level: "进阶",
    summary: "几十页一次加好 Logo 和页码，不用逐页贴。",
    before: {
      tag: "改前", desc: "每页手动贴 Logo/页码，位置还不一。",
      visual: slide(
        '<div style="position:absolute;left:6%;top:6%;width:10%;height:8%;background:#cb5521;border-radius:4px;opacity:.7"></div>' +
        '<div style="position:absolute;right:6%;bottom:6%;font:11px var(--font-mono);color:#777777">1</div>' +
        '<div style="position:absolute;left:40%;top:46%;width:30%;height:5%;background:#777777;border-radius:3px"></div>'
      )
    },
    after: {
      tag: "改后", desc: "母版一次加，所有页统一带。",
      visual: slide(
        '<div style="position:absolute;left:6%;top:6%;width:10%;height:8%;background:#2f6f3a;border-radius:4px;opacity:.85"></div>' +
        '<div style="position:absolute;right:6%;bottom:6%;font:11px var(--font-mono);color:rgba(216,236,248,.6)">1</div>' +
        '<div style="position:absolute;left:6%;bottom:6%;width:20%;height:3%;background:rgba(216,236,248,.3);border-radius:2px"></div>' +
        '<div style="position:absolute;left:40%;top:46%;width:30%;height:5%;background:#777777;border-radius:3px"></div>'
      )
    },
    steps: [
      { text: "视图 → 幻灯片母版" },
      { text: "在母版页眉 / 页脚区放 Logo、插入页码占位符" },
      { text: "关闭母版，所有页自动带上" },
      { text: "单页想隐藏：取消勾选「页眉和页脚」" }
    ],
    tips: "页脚信息（来源/页码）放进母版，改一次全局生效。",
    relatedTerms: ["master", "placeholder"], demo: "masterBatch"
  },

  /* ===================== 产品发布 ===================== */
  {
    id: "cover-3step", name: "三步做出高级感封面",
    scenario: "排版与图示", level: "入门",
    summary: "留白 + 大字标题 + 严格对齐，三步入门产品感。",
    before: {
      tag: "改前", desc: "封面堆满元素、字小、杂乱无重点。",
      visual: slide(
        txt(8, 14, 80, "新品发布会", 13, "#777777") +
        txt(8, 30, 80, "2026 春季", 12, "#777777") +
        '<div style="position:absolute;left:8%;top:50%;width:30%;height:18%;background:#cb5521;border-radius:6px;opacity:.6"></div>' +
        '<div style="position:absolute;left:42%;top:62%;width:20%;height:12%;background:#22c55e;border-radius:6px;opacity:.6"></div>' +
        txt(8, 82, 80, "时间：3月 地点：杭州", 11, "#777777")
      )
    },
    after: {
      tag: "改后", desc: "大留白 + 超大标题 + 同线对齐。",
      visual: slide(
        txt(10, 30, 84, "全新发布", 40, "rgba(216,236,248,.92)", true) +
        txt(10, 50, 84, "为创作而生", 16, "rgba(199,211,234,.6)") +
        '<div style="position:absolute;left:10%;top:64%;width:18%;height:10%;background:#2f6f3a;border-radius:6px;opacity:.9"></div>' +
        '<div style="position:absolute;left:10%;top:30%;width:60%;height:2px;background:rgba(216,236,248,.4)"></div>'
      )
    },
    steps: [
      { text: "大留白：内容只占画面 1/3，留足气口" },
      { text: "放一个超大标题（≥40pt），副标题克制" },
      { text: "所有文字左对齐或居中对齐到同一条线" },
      { text: "点缀一个主色块 / 产品图，不超过一处" }
    ],
    tips: "高级感 = 少元素 + 大留白 + 严格对齐，不是堆特效。",
    relatedTerms: ["alignment", "layout"], demo: "coverBuild"
  },
  {
    id: "img-remove-bg", name: "合并形状给图片去背思路",
    scenario: "图形与图像", level: "进阶",
    summary: "用合并形状把图片裁成圆/异形，告别方形硬边。",
    before: {
      tag: "改前", desc: "方形硬边图，和圆角版面不搭。",
      visual: slide(
        '<div style="position:absolute;left:30%;top:26%;width:40%;height:40%;background:linear-gradient(135deg,#cb5521,#f59e0b);border-radius:2px;opacity:.8"></div>' +
        '<div style="position:absolute;left:30%;top:26%;width:40%;height:40%;border:1px solid #777777"></div>'
      )
    },
    after: {
      tag: "改后", desc: "裁成圆形，融入版面更精致。",
      visual: slide(
        '<div style="position:absolute;left:33%;top:29%;width:34%;height:34%;border-radius:50%;background:linear-gradient(135deg,#2f6f3a,#cb5521;opacity:.92"></div>' +
        '<div style="position:absolute;left:33%;top:29%;width:34%;height:34%;border-radius:50%;border:2px solid rgba(216,236,248,.4)"></div>'
      )
    },
    steps: [
      { text: "插入图片，再盖一个形状（圆 / 圆角矩形）" },
      { text: "先选图片、再选形状（顺序很重要）" },
      { text: "格式 → 合并形状 → 相交，图片被裁成该形状" },
      { text: "可加描边 / 阴影提升质感" }
    ],
    tips: "先选图片后选形状，相交结果才会是图片本身。",
    relatedTerms: ["boolean"], demo: "removeBg"
  },
  {
    id: "icon-info", name: "图标化信息图替代大段文字",
    scenario: "排版与图示", level: "入门",
    summary: "一句短句 + 一个图标，比一整段字一眼就懂。",
    before: {
      tag: "改前", desc: "一页塞满段落文字，没人看。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:14%;width:52%;height:5%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:22%;width:84%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:27%;width:84%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:32%;width:62%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:44%;width:52%;height:5%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:52%;width:84%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:57%;width:84%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:62%;width:62%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:74%;width:52%;height:5%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:82%;width:84%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:87%;width:84%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:92%;width:62%;height:3%;background:#777777;border-radius:3px"></div>'
      )
    },
    after: {
      tag: "改后", desc: "3 个「图标+短句」卡片，扫一眼就懂。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:16%;width:26%;height:52%;background:rgba(102,58,243,.16);border:1px solid rgba(102,58,243,.42);border-radius:8px"></div>' +
        '<div style="position:absolute;left:37%;top:16%;width:26%;height:52%;background:rgba(2,125,234,.16);border:1px solid rgba(2,125,234,.42);border-radius:8px"></div>' +
        '<div style="position:absolute;left:66%;top:16%;width:26%;height:52%;background:rgba(38,150,132,.16);border:1px solid rgba(38,150,132,.42);border-radius:8px"></div>' +
        icon('target', 17, 22, 38, '#2f6f3a') +
        icon('chart', 46, 22, 38, '#cb5521') +
        icon('rocket', 75, 22, 38, '#5fe0bf') +
        '<div style="position:absolute;left:8%;top:47%;width:26%;text-align:center;font:600 13px var(--font-body);color:#1a3300">目标市场</div>' +
        '<div style="position:absolute;left:37%;top:47%;width:26%;text-align:center;font:600 13px var(--font-body);color:#1a3300">数据增长</div>' +
        '<div style="position:absolute;left:66%;top:47%;width:26%;text-align:center;font:600 13px var(--font-body);color:#1a3300">正式发布</div>' +
        '<div style="position:absolute;left:8%;top:60%;width:26%;text-align:center;font:11px var(--font-body);color:rgba(216,236,248,.6);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">锁定核心用户群</div>' +
        '<div style="position:absolute;left:37%;top:60%;width:26%;text-align:center;font:11px var(--font-body);color:rgba(216,236,248,.6);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">月度增长 +38%</div>' +
        '<div style="position:absolute;left:66%;top:60%;width:26%;text-align:center;font:11px var(--font-body);color:rgba(216,236,248,.6);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Q3 正式上线</div>'
      )
    },
    steps: [
      { text: "把一段文字拆成 3 个独立要点" },
      { text: "每个要点配一个图标（插入 → 图标）" },
      { text: "图标 + 短标题 + 一行说明，做成卡片" },
      { text: "三卡对齐、同色系，保持节奏一致" }
    ],
    tips: "一屏不超过 3 个信息块，多了等于没重点。",
    relatedTerms: ["icon-style"], demo: "iconify"
  },

  /* ===================== 效率与交付（新增分类） ===================== */
  {
    id: "embed-font", name: "嵌入字体防变样",
    scenario: "效率与交付", level: "入门",
    summary: "文件发给别人字体变了？勾选嵌入，换电脑也原样。",
    before: {
      tag: "改前", desc: "用了非系统字体却没嵌入，对方电脑一打开变宋体。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:16%;width:28%;height:7%;background:#cb5521;border-radius:4px;opacity:.85"></div>' +
        txt(8, 38, 80, "优卡说PPT", 22, "#e6b35a", true) +
        '<div style="position:absolute;left:8%;top:66%;font:12px var(--font-mono);color:#f0a59a">⚠ 对方无此字体 → 全变宋体</div>'
      )
    },
    after: {
      tag: "改后", desc: "勾选嵌入字体，任何电脑都原样显示。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:16%;width:28%;height:7%;background:#2f6f3a;border-radius:4px;opacity:.9"></div>' +
        txt(8, 38, 80, "优卡说PPT", 22, "#9fe3c5", true) +
        '<div style="position:absolute;left:8%;top:66%;font:12px var(--font-mono);color:#9fe3c5">✓ 已嵌入，换电脑也原样</div>'
      )
    },
    steps: [
      { text: "文件 → 选项 → 保存（或 文件 → 信息 → 相关设置）" },
      { text: "勾选「将字体嵌入文件」" },
      { text: "选「仅嵌入演示文稿中使用的字符」，文件更小" },
      { text: "保存后再发，对方无此字体也原样显示" }
    ],
    tips: "对外交付 / 评审前必勾一次，尤其用了非系统字体（如优卡体）。",
    relatedTerms: ["embed-font"], demo: "embedFont"
  },
  {
    id: "shortcuts", name: "三招快捷键提速一倍",
    scenario: "效率与交付", level: "入门",
    summary: "格式刷双击锁定、Ctrl 拖拽复制、Alt 吸附对齐，重复活一键搞定。",
    before: {
      tag: "改前", desc: "重复改格式、拖拽还错位，纯手动慢。",
      visual: slide(
        '<div style="position:absolute;left:10%;top:30%;width:20%;height:14%;background:#cb5521;border-radius:6px;opacity:.7"></div>' +
        '<div style="position:absolute;left:44%;top:50%;width:20%;height:14%;background:#cb5521;border-radius:6px;opacity:.7"></div>' +
        '<div style="position:absolute;left:70%;top:26%;width:20%;height:14%;background:#cb5521;border-radius:6px;opacity:.7"></div>' +
        '<div style="position:absolute;left:8%;top:72%;font:12px var(--font-mono);color:#f0a59a">重复操作 ×N，慢</div>'
      )
    },
    after: {
      tag: "改后", desc: "快捷键流：连刷、复制、对齐一气呵成。",
      visual: slide(
        '<div style="position:absolute;left:10%;top:34%;width:20%;height:14%;background:#2f6f3a;border-radius:6px;opacity:.85"></div>' +
        '<div style="position:absolute;left:40%;top:34%;width:20%;height:14%;background:#2f6f3a;border-radius:6px;opacity:.85"></div>' +
        '<div style="position:absolute;left:70%;top:34%;width:20%;height:14%;background:#2f6f3a;border-radius:6px;opacity:.85"></div>' +
        '<div style="position:absolute;left:8%;top:58%;font:11px var(--font-mono);color:rgba(216,236,248,.55)">双击格式刷</div>' +
        '<div style="position:absolute;left:36%;top:58%;font:11px var(--font-mono);color:rgba(216,236,248,.55)">Ctrl+拖拽</div>' +
        '<div style="position:absolute;left:64%;top:58%;font:11px var(--font-mono);color:rgba(216,236,248,.55)">Alt 吸附</div>'
      )
    },
    steps: [
      { text: "格式刷：单击刷一次；双击锁定可连刷多个", shortcut: "双击" },
      { text: "Ctrl+拖动对象：快速复制一份", shortcut: "Ctrl+拖拽" },
      { text: "按住 Alt：临时显示智能参考线，吸附对齐", shortcut: "Alt" },
      { text: "Shift+拖动：等比缩放 / 水平垂直约束", shortcut: "Shift" }
    ],
    tips: "格式刷双击锁定后按 Esc 退出；Ctrl+D 也能复制，比 Ctrl+C/V 快。",
    relatedTerms: ["shortcut", "format-painter"], demo: "shortcutKeys"
  },
  {
    id: "export-compress", name: "导出高清不糊、文件不爆",
    scenario: "效率与交付", level: "入门",
    summary: "PDF/图片/视频参数一次记牢：选超大型保高清，先压缩再发。",
    before: {
      tag: "改前", desc: "导出图糊、文件巨大，微信都发不出去。",
      visual: slide(
        '<div style="position:absolute;left:30%;top:22%;width:40%;height:40%;background:linear-gradient(135deg,#cb5521,#f59e0b);border-radius:4px;opacity:.5;filter:blur(2px)"></div>' +
        '<div style="position:absolute;left:8%;top:72%;font:12px var(--font-mono);color:#f0a59a">图糊 · 文件 86MB</div>'
      )
    },
    after: {
      tag: "改后", desc: "超大型导出保高清，压缩后体积骤降。",
      visual: slide(
        '<div style="position:absolute;left:33%;top:25%;width:34%;height:34%;background:linear-gradient(135deg,#2f6f3a,#cb5521;border-radius:4px;opacity:.95"></div>' +
        '<div style="position:absolute;left:8%;top:72%;font:12px var(--font-mono);color:#9fe3c5">超大型导出 · 压缩后 12MB</div>'
      )
    },
    steps: [
      { text: "导出 PDF：文件 → 导出 → 创建 PDF/XPS" },
      { text: "导出图片：文件 → 导出 → 更改文件类型 → PNG，选「超大型」", shortcut: "保高清" },
      { text: "压缩图片：文件 → 信息 → 压缩图片，选 150/220 ppi", shortcut: "compress" },
      { text: "导出视频：文件 → 导出 → 创建视频，设每页秒数" }
    ],
    tips: "默认导出图片仅 1280 宽，做横幅要选超大型；图片多务必先压缩再发。",
    relatedTerms: ["compress", "export-dpi"], demo: "exportCompress"
  },

  /* ===================== 答辩演讲（追加） ===================== */
  {
    id: "morph", name: "平滑切换做高级过渡",
    scenario: "动画与交互", level: "进阶",
    summary: "两页同元素加「平滑」，自动位移/变形，高级感拉满。",
    before: {
      tag: "改前", desc: "翻页硬切，元素凭空跳变，没过渡。",
      visual: slide(
        txt(10, 30, 70, "2026 目标", 18, "#f0a59a", true) +
        '<div style="position:absolute;left:60%;top:56%;width:24%;height:16%;background:#cb5521;border-radius:6px;opacity:.5"></div>' +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#f0a59a">跳转硬切，无过渡</div>'
      )
    },
    after: {
      tag: "改后", desc: "平滑切换：元素自动从旧位置过渡到新位置。",
      visual: slide(
        txt(10, 22, 70, "2026 目标", 16, "#9fe3c5", true) +
        '<div style="position:absolute;left:36%;top:48%;width:28%;height:18%;background:#2f6f3a;border-radius:6px;opacity:.9"></div>' +
        '<div style="position:absolute;left:10%;top:74%;font:12px var(--font-mono);color:#9fe3c5">平滑：自动位移 / 变形</div>'
      )
    },
    steps: [
      { text: "复制当前页，在新页改元素的位置 / 大小 / 文字" },
      { text: "给第二页加「切换 → 平滑」", shortcut: "切换" },
      { text: "放映时元素自动从旧位置过渡到新位置" },
      { text: "改文字内容可做「数字滚动 / 标题变形」效果" }
    ],
    tips: "平滑只认形状 / 文字的对应关系，一页一变最稳；改动太多会失效。",
    relatedTerms: ["morph", "transition-fx"], demo: "morphDemo"
  },

  /* ===================== 职场汇报（追加） ===================== */
  {
    id: "chart-beautify", name: "三步美化默认图表",
    scenario: "数据与图表", level: "进阶",
    summary: "去网格线、改品牌色、加数据标签，默认丑图表变高级。",
    before: {
      tag: "改前", desc: "默认灰图表：网格线乱、无数据标签。",
      visual: slide(
        '<div style="position:absolute;left:12%;top:30%;width:8%;height:50%;background:#777777"></div>' +
        '<div style="position:absolute;left:28%;top:46%;width:8%;height:34%;background:#777777"></div>' +
        '<div style="position:absolute;left:44%;top:22%;width:8%;height:58%;background:#777777"></div>' +
        '<div style="position:absolute;left:60%;top:38%;width:8%;height:42%;background:#777777"></div>' +
        '<div style="position:absolute;left:12%;top:18%;width:56%;height:1px;background:#777777"></div>' +
        '<div style="position:absolute;left:8%;top:84%;font:11px var(--font-mono);color:#f0a59a">默认灰图表 · 无标签</div>'
      )
    },
    after: {
      tag: "改后", desc: "去网格、品牌色、数据标签，清爽高级。",
      visual: slide(
        '<div style="position:absolute;left:12%;top:30%;width:8%;height:50%;background:#2f6f3a;border-radius:3px 3px 0 0"></div>' +
        '<div style="position:absolute;left:28%;top:46%;width:8%;height:34%;background:#2f6f3a;border-radius:3px 3px 0 0"></div>' +
        '<div style="position:absolute;left:44%;top:22%;width:8%;height:58%;background:#9fe3c5;border-radius:3px 3px 0 0"></div>' +
        '<div style="position:absolute;left:60%;top:38%;width:8%;height:42%;background:#2f6f3a;border-radius:3px 3px 0 0"></div>' +
        '<div style="position:absolute;left:8%;top:84%;font:11px var(--font-mono);color:#9fe3c5">去网格 · 品牌色 · 数据标签</div>'
      )
    },
    steps: [
      { text: "选中图表 → 图表设计 → 选配色 / 样式，或手动改" },
      { text: "删除纵向网格线（右键网格线 → 删除）" },
      { text: "加数据标签：图表元素 → 勾选「数据标签」" },
      { text: "改系列颜色为品牌色、设圆角 / 无边框" }
    ],
    tips: "图表配色别超 1–2 个主色，重点数据用强调色（如绿）突出。",
    relatedTerms: ["chart-beauty", "color-reuse"], demo: "chartBeautify"
  },

  /* ===================== 教学课件（追加） ===================== */
  {
    id: "trigger", name: "触发器做点击互动",
    scenario: "动画与交互", level: "进阶",
    summary: "点一下才出现答案 / 展开，课堂互动就靠触发器。",
    before: {
      tag: "改前", desc: "答案直接显示，没有悬念，学生不看题。",
      visual: slide(
        txt(10, 24, 80, "Q：PPT 全称？", 15, "rgba(216,236,248,.85)", true) +
        '<div style="position:absolute;left:10%;top:48%;width:80%;height:10%;background:rgba(228,77,60,.18);border:1px solid rgba(228,77,60,.4);border-radius:6px"></div>' +
        txt(14, 51, 70, "A：PowerPoint", 13, "#f0a59a") +
        '<div style="position:absolute;left:8%;top:66%;font:11px var(--font-mono);color:#f0a59a">答案直接显示，没悬念</div>'
      )
    },
    after: {
      tag: "改后", desc: "点「显示答案」才出现，互动提问。",
      visual: slide(
        txt(10, 24, 80, "Q：PPT 全称？", 15, "rgba(216,236,248,.85)", true) +
        '<div style="position:absolute;left:10%;top:48%;width:30%;height:12%;background:#2f6f3a;border-radius:6px;opacity:.85;display:grid;place-items:center;color:#ffffff;font:600 12px var(--font-body)">显示答案</div>' +
        '<div style="position:absolute;left:46%;top:48%;width:44%;height:12%;background:rgba(159,227,197,.16);border:1px dashed rgba(38,150,132,.5);border-radius:6px"></div>' +
        '<div style="position:absolute;left:8%;top:66%;font:11px var(--font-mono);color:#9fe3c5">点「显示答案」才出现</div>'
      )
    },
    steps: [
      { text: "做好「答案」对象，加一个进入动画（如出现）" },
      { text: "动画窗格 → 该动画「计时」→ 触发器 → 选触发对象" },
      { text: "放映时点触发对象，答案才出现" },
      { text: "多个触发器可串成课堂问答小游戏" }
    ],
    tips: "触发器只能触发「进入 / 退出 / 强调」动画，务必先加动画再设触发器。",
    relatedTerms: ["trigger", "anim-type"], demo: "triggerDemo"
  },

  /* ===================== 效率与交付（追加） ===================== */
  {
    id: "replace-fonts", name: "替换字体一键焕新",
    scenario: "统一风格与母版", level: "入门",
    summary: "全篇 A 字体一键换成 B，定稿换字体不用逐页改。",
    before: {
      tag: "改前", desc: "特殊字体想换成通用字体，几十页逐页改到崩溃。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:16%;width:30%;height:7%;background:#cb5521;border-radius:4px;opacity:.85"></div>' +
        txt(8, 38, 80, "优卡说PPT", 22, "#e6b35a", true) +
        txt(8, 56, 80, "用「优卡体」写了 30 页", 13, "#777777") +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#f0a59a">逐页改 ×30，慢</div>'
      )
    },
    after: {
      tag: "改后", desc: "替换字体一次，全篇同步换衣。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:16%;width:30%;height:7%;background:#2f6f3a;border-radius:4px;opacity:.9"></div>' +
        txt(8, 38, 80, "优卡说PPT", 22, "#9fe3c5", true) +
        txt(8, 56, 80, "全篇已是通用字体", 13, "#777777") +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#9fe3c5">替换字体 → 30 处已换</div>'
      )
    },
    steps: [
      { text: "开始 → 编辑 → 替换字体（Win: Alt+H+EB）" },
      { text: "「替换」选旧字体，「替换为」选新字体" },
      { text: "点「替换」批量换，或「全部替换」一次换完" },
      { text: "确认全篇字体统一，再定稿交付" }
    ],
    tips: "换字体前先嵌入或转曲，避免对方电脑又变样（见嵌入字体）。",
    relatedTerms: ["replace-font"], demo: "replaceFont"
  },
  {
    id: "selection-pane", name: "选择窗格管理图层",
    scenario: "效率与交付", level: "进阶",
    summary: "对象列表里显隐 / 重命名 / 调序，复杂版面不再盲点乱选。",
    before: {
      tag: "改前", desc: "元素层层叠叠，点不到下面那个，也分不清谁是谁。",
      visual: slide(
        '<div style="position:absolute;left:30%;top:24%;width:40%;height:34%;background:#cb5521;border-radius:8px;opacity:.55"></div>' +
        '<div style="position:absolute;left:36%;top:36%;width:30%;height:22%;background:#22c55e;border-radius:8px;opacity:.55"></div>' +
        '<div style="position:absolute;left:44%;top:50%;width:24%;height:14%;background:#cb5521;border-radius:8px;opacity:.6"></div>' +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#f0a59a">点不到 · 分不清</div>'
      )
    },
    after: {
      tag: "改后", desc: "右侧图层列表：点名选中、眼睛显隐、拖动调序。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:18%;width:40%;height:64%;background:#777777;border:1px solid rgba(216,236,248,.25);border-radius:8px;padding:8px 10px">' +
        '<div style="font:11px var(--font-mono);color:#9fe3c5;line-height:1.9">● 标题文字<br>● 蓝色块<br>● 绿色块<br>○ 红底(隐藏)</div></div>' +
        '<div style="position:absolute;right:10%;top:34%;width:34%;height:22%;background:#2f6f3a;border-radius:8px;opacity:.85"></div>' +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#9fe3c5">列表里点名就选中</div>'
      )
    },
    steps: [
      { text: "开始 → 选择 → 选择窗格（Win: Alt+H+SL）" },
      { text: "点对象名直接选中，不用在画布上盲点" },
      { text: "点小眼睛显隐对象，临时隐藏干扰层" },
      { text: "拖动排序调整图层上下关系" }
    ],
    tips: "给关键对象起名（如「封面主图」），后期在窗格里一眼认得。",
    relatedTerms: ["selection-pane"], demo: "selectionPane"
  },
  {
    id: "group", name: "组合打包整体搬运",
    scenario: "效率与交付", level: "入门",
    summary: "多个元素 Ctrl+G 打包，整体移动不散；还能另存为图片固化。",
    before: {
      tag: "改前", desc: "几个元素各管各，一移动就错位散架。",
      visual: slide(
        '<div style="position:absolute;left:18%;top:30%;width:20%;height:14%;background:#cb5521;border-radius:6px;opacity:.7;transform:rotate(-6deg)"></div>' +
        '<div style="position:absolute;left:46%;top:40%;width:18%;height:12%;background:#22c55e;border-radius:6px;opacity:.7;transform:rotate(4deg)"></div>' +
        '<div style="position:absolute;left:66%;top:28%;width:16%;height:16%;background:#cb5521;border-radius:50%;opacity:.7"></div>' +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#f0a59a">一动就散</div>'
      )
    },
    after: {
      tag: "改后", desc: "组合后当一块搬，位置纹丝不动。",
        visual: slide(
        '<div style="position:absolute;left:30%;top:32%;width:47%;height:24%;border:2px dashed #2f6f3a;border-radius:10px;opacity:.9"></div>' +
        '<div style="position:absolute;left:32%;top:38%;width:16%;height:12%;background:#2f6f3a;border-radius:6px;opacity:.9"></div>' +
        '<div style="position:absolute;left:52%;top:44%;width:14%;height:10%;background:#9fe3c5;border-radius:6px;opacity:.9"></div>' +
        '<div style="position:absolute;left:64%;top:34%;width:11%;height:11%;background:#cb5521;border-radius:50%;opacity:.9"></div>' +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#9fe3c5">Ctrl+G 打包 → 整体移动</div>'
      )
    },
    steps: [
      { text: "框选多个元素（Shift 多选）" },
      { text: "Ctrl+G 组合；Ctrl+Shift+G 取消组合", shortcut: "Ctrl+G" },
      { text: "组合后可整体移动 / 缩放 / 旋转" },
      { text: "右键组合 → 另存为图片，跨软件搬运不变形" }
    ],
    tips: "图标组、页眉页脚组常用组合；转存为图片还能减小文件体积。",
    relatedTerms: ["group"], demo: "groupDemo"
  },

  /* ===================== 产品发布（追加） ===================== */
  {
    id: "remove-bg", name: "删除背景一键抠图",
    scenario: "图形与图像", level: "入门",
    summary: "实拍图一键去背，主体悬浮更精致（区别于裁成规则形状）。",
    before: {
      tag: "改前", desc: "人物 / 产品带杂背景，和版面打架。",
      visual: slide(
        '<div style="position:absolute;left:24%;top:20%;width:52%;height:52%;background:#c9ccd6;border-radius:6px;opacity:.85"></div>' +
        '<div style="position:absolute;left:38%;top:34%;width:24%;height:30%;background:linear-gradient(135deg,#cb5521,#f59e0b);border-radius:50%;opacity:.9"></div>' +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#f0a59a">杂背景 · 显廉价</div>'
      )
    },
    after: {
      tag: "改后", desc: "去背后主体悬浮，干净融入版面。",
      visual: slide(
        '<div style="position:absolute;left:38%;top:30%;width:24%;height:34%;background:linear-gradient(135deg,#2f6f3a,#cb5521;border-radius:50%;opacity:.95"></div>' +
        '<div style="position:absolute;left:38%;top:30%;width:24%;height:34%;border-radius:50%;border:2px solid rgba(216,236,248,.4)"></div>' +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#9fe3c5">只留主体 · 干净</div>'
      )
    },
    steps: [
      { text: "选中图片 → 图片格式 → 删除背景" },
      { text: "紫色区域为保留，拖动控制点框住主体" },
      { text: "标记要保留 / 删除的区域，细化边缘" },
      { text: "点「保留更改」，背景消失可叠任意底色" }
    ],
    tips: "和「合并形状裁成圆」不同：删除背景是真去背，不规则主体也能处理。",
    relatedTerms: ["remove-bg"], demo: "removeBgTool"
  },
  {
    id: "designer", name: "Designer 智能排版",
    scenario: "排版与图示", level: "入门",
    summary: "选中文字 / 图片，右侧 AI 给版式方案，点一下套用。",
    before: {
      tag: "改前", desc: "一段文字干摆，手动排半天还不好看。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:18%;width:50%;height:6%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:28%;width:84%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:34%;width:84%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:40%;width:60%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#f0a59a">手动排 · 不好看</div>'
      )
    },
    after: {
      tag: "改后", desc: "右侧 AI 给多个版式，挑一个套用。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:20%;width:46%;height:7%;background:#2f6f3a;border-radius:4px;opacity:.9"></div>' +
        '<div style="position:absolute;left:8%;top:34%;width:46%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:42%;width:46%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:60%;top:20%;width:30%;height:50%;background:linear-gradient(135deg,#2f6f3a,#cb5521;border-radius:6px;opacity:.9"></div>' +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#9fe3c5">AI 版式一键套用</div>'
      )
    },
    steps: [
      { text: "选中一段文字或一张图片" },
      { text: "右侧出现「设计灵感」（Win: 设计 → 设计灵感）" },
      { text: "AI 给出多个版式方案缩略图" },
      { text: "点喜欢的方案，一键应用到本页" }
    ],
    tips: "设计灵感是 PPT 自带 AI，适合快速出初稿；精细调再手动。",
    relatedTerms: ["designer"], demo: "designerDemo"
  },

  /* ===================== 答辩演讲（追加） ===================== */
  {
    id: "presenter-view", name: "演示者视图讲不慌",
    scenario: "放映与演讲", level: "入门",
    summary: "双屏看备注 + 计时 + 下一页预览，观众只看到幻灯片。",
    before: {
      tag: "改前", desc: "直接放映，备注看不见，讲到哪了自己都迷。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:16%;width:84%;height:50%;background:#777777;border:1px solid rgba(216,236,248,.25);border-radius:8px"></div>' +
        '<div style="position:absolute;left:16%;top:30%;width:40%;height:6%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:16%;top:42%;width:60%;height:3%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#f0a59a">备注看不到 · 易翻车</div>'
      )
    },
    after: {
      tag: "改后", desc: "演讲者视图：你见备注，观众见干净页。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:16%;width:50%;height:50%;background:#777777;border:1px solid rgba(216,236,248,.2);border-radius:8px"></div>' +
        '<div style="position:absolute;left:62%;top:16%;width:30%;height:24%;background:rgba(102,58,243,.18);border:1px solid rgba(102,58,243,.5);border-radius:6px"></div>' +
        '<div style="position:absolute;left:62%;top:44%;width:30%;height:22%;background:rgba(2,125,234,.16);border:1px solid rgba(2,125,234,.5);border-radius:6px"></div>' +
        '<div style="position:absolute;left:8%;top:70%;font:11px var(--font-mono);color:#9fe3c5">备注区 · 下一页预览</div>'
      )
    },
    steps: [
      { text: "先把演讲词写进每页「备注」栏" },
      { text: "连接投影，设双屏扩展（非复制）" },
      { text: "幻灯片放映 → 使用演讲者视图（Alt+F5）", shortcut: "Alt+F5" },
      { text: "左侧看备注、右侧看下一页，底部有计时" }
    ],
    tips: "排练计时 + 演讲者视图是答辩/路演的黄金组合，现场不慌。",
    relatedTerms: ["presenter-view"], demo: "presenterView"
  },
  {
    id: "anim-painter", name: "动画刷复制动画",
    scenario: "动画与交互", level: "进阶",
    summary: "动画刷把某对象的动画一键复给别的对象，多对象统一节奏。",
    before: {
      tag: "改前", desc: "多个对象要同款动画，一个个重加很烦。",
      visual: slide(
        '<div style="position:absolute;left:14%;top:30%;width:18%;height:14%;background:#2f6f3a;border-radius:6px;opacity:.9;box-shadow:0 0 0 2px rgba(159,227,197,.5)"></div>' +
        '<div style="position:absolute;left:42%;top:30%;width:18%;height:14%;background:#777777;border-radius:6px;opacity:.6"></div>' +
        '<div style="position:absolute;left:70%;top:30%;width:18%;height:14%;background:#777777;border-radius:6px;opacity:.6"></div>' +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#f0a59a">逐个加 · 重复劳动</div>'
      )
    },
    after: {
      tag: "改后", desc: "动画刷一吸一刷，三个对象同节奏。",
      visual: slide(
        '<div style="position:absolute;left:14%;top:30%;width:18%;height:14%;background:#2f6f3a;border-radius:6px;opacity:.9;box-shadow:0 0 0 2px rgba(159,227,197,.5)"></div>' +
        '<div style="position:absolute;left:42%;top:30%;width:18%;height:14%;background:#2f6f3a;border-radius:6px;opacity:.9;box-shadow:0 0 0 2px rgba(159,227,197,.5)"></div>' +
        '<div style="position:absolute;left:70%;top:30%;width:18%;height:14%;background:#2f6f3a;border-radius:6px;opacity:.9;box-shadow:0 0 0 2px rgba(159,227,197,.5)"></div>' +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#9fe3c5">同款动画 · 统一节奏</div>'
      )
    },
    steps: [
      { text: "给源对象加好动画（如淡出、脉冲）" },
      { text: "动画 → 动画刷（吸一下源对象）", shortcut: "动画刷" },
      { text: "点别的对象，动画就被复制过去" },
      { text: "双击动画刷可连刷多个；Esc 退出" }
    ],
    tips: "动画刷是格式刷的动画版；先定好一个再批量刷，节奏最统一。",
    relatedTerms: ["anim-painter"], demo: "animPainter"
  },

  /* ===================== 职场汇报（追加） ===================== */
  {
    id: "combo-chart", name: "组合图柱线双轴",
    scenario: "数据与图表", level: "进阶",
    summary: "柱表示量、线表示率，一张图同时讲两件事。",
    before: {
      tag: "改前", desc: "量（销售额）和率（增长率）分两张图，不好对比。",
      visual: slide(
        '<div style="position:absolute;left:12%;top:30%;width:8%;height:50%;background:#777777"></div>' +
        '<div style="position:absolute;left:28%;top:46%;width:8%;height:34%;background:#777777"></div>' +
        '<div style="position:absolute;left:44%;top:22%;width:8%;height:58%;background:#777777"></div>' +
        '<div style="position:absolute;left:60%;top:38%;width:8%;height:42%;background:#777777"></div>' +
        '<div style="position:absolute;left:8%;top:84%;font:11px var(--font-mono);color:#f0a59a">只有柱 · 率另算</div>'
      )
    },
    after: {
      tag: "改后", desc: "柱是量、线是率，双轴同框一眼看清。",
      visual: slide(
        '<div style="position:absolute;left:12%;top:30%;width:8%;height:50%;background:#2f6f3a;border-radius:3px 3px 0 0"></div>' +
        '<div style="position:absolute;left:28%;top:46%;width:8%;height:34%;background:#2f6f3a;border-radius:3px 3px 0 0"></div>' +
        '<div style="position:absolute;left:44%;top:22%;width:8%;height:58%;background:#2f6f3a;border-radius:3px 3px 0 0"></div>' +
        '<div style="position:absolute;left:60%;top:38%;width:8%;height:42%;background:#2f6f3a;border-radius:3px 3px 0 0"></div>' +
        '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><polyline points="16,26 32,42 48,18 64,34" fill="none" stroke="#9fe3c5" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>' +
        '<div style="position:absolute;left:8%;top:84%;font:11px var(--font-mono);color:#9fe3c5">柱=量 · 线=率</div>'
      )
    },
    steps: [
      { text: "插入图表 → 组合图（或先建柱形图）" },
      { text: "把「率」系列改为折线图，并勾选「次坐标轴」" },
      { text: "左右两个纵轴分别标量与率刻度" },
      { text: "统一配色、加数据标签，讲清双含义" }
    ],
    tips: "柱线组合最适合「量+率」对比；次坐标轴让两者量纲各安其位。",
    relatedTerms: ["combo-chart"], demo: "comboChart"
  },
  /* ===================== 第 2 波（图形/统一/放映/数据/效率） ===================== */
  {
    id: "edit-points", name: "编辑顶点把形状变曲线",
    scenario: "图形与图像", level: "进阶",
    summary: "把矩形/任意形状拖成曲线轮廓、自定义箭头，做布尔运算做不出的独特图形。",
    before: {
      tag: "改前", desc: "想做水滴/箭头/不规则遮罩，只能找现成图标，套不上就放弃。",
      visual: slide(
        '<div style="position:absolute;left:34%;top:30%;width:32%;height:40%;background:#777777;border:1px dashed #777777"></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:rgba(216,236,248,.5)">方方正正 · 改不了</div>'
      )
    },
    after: {
      tag: "改后", desc: "右键「编辑顶点」，拖控制柄把直线拉成曲线、尖角变圆润。",
      visual: slide(
        '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;left:30%;top:26%;width:40%;height:48%"><path d="M20 12 Q 50 0 80 12 Q 96 50 80 88 Q 50 100 20 88 Q 4 50 20 12 Z" fill="rgba(102,58,243,.5)" stroke="#9fe3c5" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:#9fe3c5">拖顶点 → 任意曲线</div>'
      )
    },
    steps: [
      { text: "选中形状 → 右键「编辑顶点」" },
      { text: "拖动顶点或控制柄，把直线拉成曲线" },
      { text: "右键顶点可「平滑 / 直线 / 角部」切换" },
      { text: "配合布尔运算拼好大体，再拖顶点精修轮廓" }
    ],
    tips: "编辑顶点是布尔运算的好搭档：先拼大体、再拖顶点精修轮廓。",
    relatedTerms: ["boolean", "edit-points"], demo: "editPoints"
  },
  {
    id: "recolor", name: "重新着色 + 设置透明色",
    scenario: "图形与图像", level: "入门",
    summary: "纯色背景一键变透明、整张图一键换主色调，比智能去背更轻量。",
    before: {
      tag: "改前", desc: "Logo 带白底、图标颜色不搭，强行放上去很丑。",
      visual: slide(
        '<div style="position:absolute;left:30%;top:28%;width:40%;height:44%;background:#3a8a8a;border-radius:8px"></div>' +
        '<div style="position:absolute;left:38%;top:36%;width:24%;height:28%;background:#cb5521;border-radius:50%"></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:rgba(216,236,248,.5)">白底 + 色不对</div>'
      )
    },
    after: {
      tag: "改后", desc: "「设置透明色」点白底即透；「重新着色」一键换成主题紫。",
      visual: slide(
        '<div style="position:absolute;left:38%;top:32%;width:24%;height:30%;background:#2f6f3a;border-radius:50%"></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:#9fe3c5">透明底 + 主题色</div>'
      )
    },
    steps: [
      { text: "选中图片 →「图片格式」→「颜色」" },
      { text: "「设置透明色」点一下纯色背景即透明" },
      { text: "「重新着色」选主题色，整图一键换调" },
      { text: "复杂照片仍用「删除背景」，纯色底用这招更快" }
    ],
    tips: "纯色/近色背景用「设置透明色」秒透；多色照片才上「删除背景」。",
    relatedTerms: ["recolor", "remove-bg"], demo: "recolorTool"
  },
  {
    id: "format-painter", name: "格式刷连刷统一格式",
    scenario: "统一风格与母版", level: "入门",
    summary: "把一个对象的颜色/字体/效果一键刷给其它对象，双击还能连刷多个。",
    before: {
      tag: "改前", desc: "十几个文本框颜色字体各不同，逐个改调到崩溃。",
      visual: slide(
        '<div style="position:absolute;left:14%;top:24%;width:30%;height:10%;background:#777777;border-radius:4px"></div>' +
        '<div style="position:absolute;left:14%;top:42%;width:30%;height:10%;background:#777777;border-radius:4px"></div>' +
        '<div style="position:absolute;left:14%;top:60%;width:30%;height:10%;background:#777777;border-radius:4px"></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:rgba(216,236,248,.5)">各改各的 · 乱</div>'
      )
    },
    after: {
      tag: "改后", desc: "刷一次，所有对象同款填充+字体，统一只需一秒。",
      visual: slide(
        '<div style="position:absolute;left:14%;top:24%;width:30%;height:10%;background:#2f6f3a;border-radius:4px"></div>' +
        '<div style="position:absolute;left:14%;top:42%;width:30%;height:10%;background:#2f6f3a;border-radius:4px"></div>' +
        '<div style="position:absolute;left:14%;top:60%;width:30%;height:10%;background:#2f6f3a;border-radius:4px"></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:#9fe3c5">一键同款</div>'
      )
    },
    steps: [
      { text: "选中已调好的「源对象」" },
      { text: "「开始」→「格式刷」（或双击锁定连续刷）" },
      { text: "点/拖选目标对象，格式即复制过去" },
      { text: "双击锁定的格式刷可连续刷多个，Esc 退出" }
    ],
    tips: "格式刷只复制「格式」不复制文字；双击锁定＝连刷多份，效率翻倍。",
    relatedTerms: ["format-painter", "theme"], demo: "formatPainter"
  },
  {
    id: "layout", name: "母版版式一处改全局",
    scenario: "统一风格与母版", level: "进阶",
    summary: "用标题/内容/图片占位符搭版式，改一处全篇标题、页脚同步变。",
    before: {
      tag: "改前", desc: "每页手动摆标题位置，改个样式要翻几十页。",
      visual: slide(
        '<div style="position:absolute;left:10%;top:12%;width:40%;height:9%;background:#777777;border-radius:4px"></div>' +
        '<div style="position:absolute;left:10%;top:30%;width:70%;height:6%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:10%;top:42%;width:60%;height:6%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:rgba(216,236,248,.5)">逐页摆 · 累</div>'
      )
    },
    after: {
      tag: "改后", desc: "在母版定好占位符版式，全篇自动套用，换版式内容不乱。",
      visual: slide(
        '<div style="position:absolute;left:10%;top:12%;width:42%;height:9%;background:#2f6f3a;border-radius:4px;opacity:.85"></div>' +
        '<div style="position:absolute;left:10%;top:30%;width:70%;height:6%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:10%;top:42%;width:60%;height:6%;background:#777777;border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:#9fe3c5">占位符 · 一处改</div>'
      )
    },
    steps: [
      { text: "视图 → 幻灯片母版，建/选版式" },
      { text: "插入「标题/内容/图片」占位符并摆好" },
      { text: "关闭母版，正文页选对应版式即可" },
      { text: "改占位符样式 → 全篇同版式页同步更新" }
    ],
    tips: "占位符版式＝「模板骨架」：位置/字体定一次，全篇不乱、换肤快。",
    relatedTerms: ["layout", "master", "placeholder"], demo: "layoutDemo"
  },
  {
    id: "custom-show", name: "自定义放映按听众拼装",
    scenario: "放映与演讲", level: "进阶",
    summary: "同一套 PPT 按听众挑不同页子集，一套内容多种讲法。",
    before: {
      tag: "改前", desc: "给老板讲精简版、给同事讲细节，得存两份 PPT。",
      visual: slide(
        '<div style="position:absolute;left:12%;top:22%;width:24%;height:50%;background:#777777;border-radius:6px"></div>' +
        '<div style="position:absolute;left:40%;top:22%;width:24%;height:50%;background:#777777;border-radius:6px"></div>' +
        '<div style="position:absolute;left:68%;top:22%;width:22%;height:50%;background:#777777;border-radius:6px"></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:rgba(216,236,248,.5)">两份 PPT · 易乱</div>'
      )
    },
    after: {
      tag: "改后", desc: "「自定义放映」勾选子集，一套文件现场切不同版本。",
      visual: slide(
        '<div style="position:absolute;left:12%;top:22%;width:24%;height:50%;background:#2f6f3a;border-radius:6px;opacity:.8"></div>' +
        '<div style="position:absolute;left:40%;top:22%;width:24%;height:50%;background:#777777;border-radius:6px"></div>' +
        '<div style="position:absolute;left:68%;top:22%;width:22%;height:50%;background:#2f6f3a;border-radius:6px;opacity:.8"></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:#9fe3c5">勾选子集 · 一套多讲</div>'
      )
    },
    steps: [
      { text: "幻灯片放映 →「自定义幻灯片放映」→ 新建" },
      { text: "从全部幻灯片里勾选本次要讲的部分" },
      { text: "命名（如「给老板」「给技术」）保存" },
      { text: "放映时直接选对应自定义放映即可" }
    ],
    tips: "自定义放映＝「一套源文件、多种子集」。比复制文件安全，不会漏改。",
    relatedTerms: ["custom-show", "section"], demo: "customShow"
  },
  {
    id: "narrate", name: "录制旁白 + 排练计时",
    scenario: "放映与演讲", level: "进阶",
    summary: "放映前录好讲解旁白、练准每页时长，生成可自动播放的宣讲片。",
    before: {
      tag: "改前", desc: "想发个带讲解的片子，只能另开录屏软件，对嘴型累。",
      visual: slide(
        '<div style="position:absolute;left:34%;top:26%;width:32%;height:30%;background:#777777;border-radius:8px"></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:rgba(216,236,248,.5)">另开录屏 · 对嘴型</div>'
      )
    },
    after: {
      tag: "改后", desc: "「录制幻灯片放映」直接录旁白+计时，存进 PPT 自播放。",
      visual: slide(
        '<div style="position:absolute;left:34%;top:26%;width:32%;height:30%;background:#2f6f3a;border-radius:8px;opacity:.8"></div>' +
        '<div style="position:absolute;left:36%;top:70%;width:28%;height:5%;background:rgba(159,227,197,.6);border-radius:3px"></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:#9fe3c5">内录旁白 · 自播放</div>'
      )
    },
    steps: [
      { text: "幻灯片放映 →「录制幻灯片放映」" },
      { text: "对着麦讲，PPT 同时记录旁白与时长" },
      { text: "「排练计时」练准每页停留，自动存时间" },
      { text: "设「循环/自动」放映，发同事即看即懂" }
    ],
    tips: "内录旁白比外录屏干净（不录桌面杂音）；排练计时让自动播放节奏稳。",
    relatedTerms: ["narrate", "presenter-view"], demo: "narrateDemo"
  },
  {
    id: "table-beauty", name: "表格美化去默认丑样",
    scenario: "数据与图表", level: "入门",
    summary: "去掉灰底网格线、做斑马纹和强调行，表格秒变高级信息图。",
    before: {
      tag: "改前", desc: "默认表格灰底网格线，数据密密麻麻看不下去。",
      visual: slide(
        '<div style="position:absolute;left:14%;top:22%;width:72%;height:54%;background:#777777;border:1px solid #777777">' +
        '<div style="position:absolute;left:0;top:25%;width:100%;height:1px;background:#777777"></div>' +
        '<div style="position:absolute;left:0;top:50%;width:100%;height:1px;background:#777777"></div>' +
        '<div style="position:absolute;left:0;top:75%;width:100%;height:1px;background:#777777"></div></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:rgba(216,236,248,.5)">灰网格 · 闷</div>'
      )
    },
    after: {
      tag: "改后", desc: "透明底+斑马纹+首行强调，重点行高亮，一眼找到关键。",
      visual: slide(
        '<div style="position:absolute;left:14%;top:22%;width:72%;height:54%;background:#777777;border-radius:6px;overflow:hidden">' +
        '<div style="position:absolute;left:0;top:0;width:100%;height:25%;background:#2f6f3a;opacity:.85"></div>' +
        '<div style="position:absolute;left:0;top:50%;width:100%;height:25%;background:rgba(159,227,197,.18)"></div></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:#9fe3c5">斑马纹 + 强调行</div>'
      )
    },
    steps: [
      { text: "选中表格 →「表格设计」→ 选清爽样式" },
      { text: "去默认灰底，改透明/白底 + 细分隔线" },
      { text: "开「镶边行」做斑马纹，首行用主题色强调" },
      { text: "关键行单独高亮，数字加粗，一眼定位" }
    ],
    tips: "表格美化三板斧：去灰底、开斑马纹、强调关键行。比图表更适合同类对比。",
    relatedTerms: ["table-beauty", "chart-beauty"], demo: "tableBeauty"
  },
  {
    id: "compress-pic", name: "图片压缩删裁剪区",
    scenario: "效率与交付", level: "入门",
    summary: "压缩图片+删除裁剪区域，PPT 体积骤减，卡顿和发不出都解决。",
    before: {
      tag: "改前", desc: "塞了几张大图，文件 50MB 卡成 PPT，发给同事半天传不完。",
      visual: slide(
        '<div style="position:absolute;left:16%;top:24%;width:26%;height:34%;background:#777777;border-radius:6px"></div>' +
        '<div style="position:absolute;left:48%;top:24%;width:26%;height:34%;background:#777777;border-radius:6px"></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:rgba(216,236,248,.5)">50MB · 卡+传不动</div>'
      )
    },
    after: {
      tag: "改后", desc: "「压缩图片」选 150ppi + 勾「删除裁剪区域」，体积砍半。",
      visual: slide(
        '<div style="position:absolute;left:16%;top:24%;width:26%;height:34%;background:#2f6f3a;border-radius:6px;opacity:.8"></div>' +
        '<div style="position:absolute;left:48%;top:24%;width:26%;height:34%;background:#2f6f3a;border-radius:6px;opacity:.8"></div>' +
        '<div style="position:absolute;left:8%;top:82%;font:11px var(--font-mono);color:#9fe3c5">12MB · 轻快</div>'
      )
    },
    steps: [
      { text: "选中图片 →「图片格式」→「压缩图片」" },
      { text: "选「屏幕(150ppi)」足够投影/分享" },
      { text: "勾选「删除图片的裁剪区域」彻底瘦身" },
      { text: "「应用于所有图片」一次搞定整份文档" }
    ],
    tips: "删裁剪区域＝把图片没显示的部分真删掉，体积立减；配合嵌入字体双保险。",
    relatedTerms: ["compress", "export-dpi"], demo: "compressPic"
  },
  /* ===================== 第3波：大纲/转制/放映AI/图形裁切/导航/墨迹/路径/QAT ===================== */
  {
    id: "outline", name: "大纲视图快速写稿",
    scenario: "排版与图示", level: "入门",
    summary: "左侧大纲里直接写文字、拖层级，比在画布上敲快十倍。",
    before: {
      tag: "改前", desc: "在画布上逐个文本框敲，结构乱、改标题累、调顺序更烦。",
      visual: slide(
        r(10,18,80,8,'#777777') + r(10,32,80,5,'#777777') +
        r(10,42,80,5,'#777777') + r(10,52,62,5,'#777777') +
        txt(10,70,80,'零散文本框，结构看不清','11','rgba(216,236,248,.5)',1)
      )
    },
    after: {
      tag: "改后", desc: "切到大纲视图，标题/要点层级一目了然，拖拽即排序。",
      visual: slide(
        r(8,14,30,72,'#777777') +
        txt(11,18,26,'● 标题一','11','#9fe3c5',1) + txt(13,30,24,'○ 要点 A','10','rgba(216,236,248,.7)') + txt(13,40,24,'○ 要点 B','10','rgba(216,236,248,.7)') +
        txt(11,54,26,'● 标题二','11','#9fe3c5',1) + txt(13,66,24,'○ 要点 C','10','rgba(216,236,248,.7)') +
        r(44,20,48,46,'#777777') + txt(46,24,44,'画布只放内容','10','rgba(216,236,248,.6)')
      )
    },
    steps: [
      { text: "左侧缩略图旁切到「大纲」标签" },
      { text: "一级回车写标题、Tab 降级为正文要点" },
      { text: "拖动整条即可调整页顺序" },
      { text: "结构定好再回「幻灯片」标签美化" }
    ],
    tips: "长汇报先在大纲列完所有标题与要点，能专注内容不被排版带偏。",
    relatedTerms: ["outline", "smartart"], demo: "outlineView"
  },
  {
    id: "word-to-ppt", name: "Word 一键转 PPT 骨架",
    scenario: "效率与交付", level: "入门",
    summary: "Word 用标题样式排好大纲，一键生成 PPT 骨架页。",
    before: {
      tag: "改前", desc: "把 Word 方案手动一页页抄进 PPT，费时还易漏。",
      visual: slide(
        r(10,16,80,9,'#777777') + r(10,30,80,5,'#777777') +
        r(10,40,80,5,'#777777') + r(10,50,80,5,'#777777') +
        txt(10,70,80,'大段 Word，手抄进 PPT 累','11','rgba(216,236,248,.5)',1)
      )
    },
    after: {
      tag: "改后", desc: "标题样式一键变骨架页，再填设计与图。",
      visual: slide(
        r(10,18,38,30,'#777777') + txt(13,20,32,'标题一','11','#9fe3c5',1) + txt(13,34,32,'· 要点','10','rgba(216,236,248,.7)') +
        r(52,18,38,30,'#777777') + txt(55,20,32,'标题二','11','#9fe3c5',1) + txt(55,34,32,'· 要点','10','rgba(216,236,248,.7)')
      )
    },
    steps: [
      { text: "Word 里用「标题 1/2/3」样式排出层级" },
      { text: "文件 → 导出 → 发送到 Microsoft PowerPoint" },
      { text: "或用 PPT「新建幻灯片 → 幻灯片(从大纲)」导入" },
      { text: "生成骨架后套用主题/母版统一外观" }
    ],
    tips: "标题样式即页结构——一级变页标题、二级变要点，零手抄。",
    relatedTerms: ["word-to-ppt", "outline"], demo: "wordToPpt"
  },
  {
    id: "live-caption", name: "实时字幕/翻译",
    scenario: "放映与演讲", level: "入门",
    summary: "放映时开字幕，讲中文自动出中英双语，现场与录播都加分。",
    before: {
      tag: "改前", desc: "干讲无字幕，外语听众和外放环境都吃力。",
      visual: slide(
        r(10,18,80,40,'#777777') +
        txt(14,40,72,'讲者：…（无声的现场）','11','rgba(216,236,248,.6)',0)
      )
    },
    after: {
      tag: "改后", desc: "开启字幕，讲什么即时浮现文字，还能翻英文。",
      visual: slide(
        r(10,18,80,40,'#777777') +
        r(10,62,80,13,'rgba(0,0,0,.55)') + txt(14,65,72,'实时字幕：大家好，欢迎来到本场分享','11','#3a8a8a',0)
      )
    },
    steps: [
      { text: "幻灯片放映 → 字幕设置 → 开启「字幕」" },
      { text: "选「听讲语言(中文)」与「显示语言(中英)」" },
      { text: "放映时底部自动浮现你的口播文字" },
      { text: "需要翻译时切显示语言为英文即可" }
    ],
    tips: "契合 AI 辅助演讲——外部分享、录播、外语听众都能直接受益。",
    relatedTerms: ["live-caption", "presenter-view"], demo: "liveCaption"
  },
  {
    id: "crop-shape", name: "裁剪为形状",
    scenario: "图形与图像", level: "入门",
    summary: "把图片直接裁成圆/心形/六边形，比布尔去背更轻量。",
    before: {
      tag: "改前", desc: "方图硬放，边是方的总差点意思。",
      visual: slide(
        r(30,28,40,40,'#2f6f3a',.25) +
        r(30,28,40,40,'#777777') +
        txt(28,74,44,'方图硬放','11','rgba(216,236,248,.5)',1)
      )
    },
    after: {
      tag: "改后", desc: "裁成圆形头像/六边形卡片，异形窗一步到位。",
      visual: slide(
        r(28,26,44,44,'#2f6f3a',.18) +
        '<div style="position:absolute;left:33%;top:30%;width:34%;height:34%;border-radius:50%;background:#9fe3c5;opacity:.85"></div>' +
        txt(30,76,40,'裁成圆形','11','#9fe3c5',1)
      )
    },
    steps: [
      { text: "选中图片 →「图片格式」→「裁剪」" },
      { text: "选「裁剪为形状」→ 圆/圆角矩形/心形/六边形…" },
      { text: "拖动黄控点微调显示范围" },
      { text: "空白处单击完成，边缘自动平滑" }
    ],
    tips: "异形窗套图最轻量；要复杂轮廓再去用「删除背景」。",
    relatedTerms: ["crop-shape", "remove-bg"], demo: "cropShape"
  },
  {
    id: "hyperlink", name: "超链接/动作按钮导航",
    scenario: "放映与演讲", level: "入门",
    summary: "做可点击目录、跳外部链接，区别于缩放定位与触发器。",
    before: {
      tag: "改前", desc: "目录只能看不能点，翻页靠手动找。",
      visual: slide(
        r(12,18,76,10,'#777777') + txt(16,20,70,'1 公司概况','11','rgba(216,236,248,.7)',1) +
        r(12,34,76,10,'#777777') + txt(16,36,70,'2 产品方案','11','rgba(216,236,248,.7)',1) +
        r(12,50,76,10,'#777777') + txt(16,52,70,'3 路线图','11','rgba(216,236,248,.7)',1)
      )
    },
    after: {
      tag: "改后", desc: "点条目即跳对应页，还能跳网页/文件。",
      visual: slide(
        r(12,18,76,10,'#777777') + txt(16,20,70,'1 公司概况','11','#9fe3c5',1) +
        r(12,34,76,10,'#777777') + txt(16,36,70,'2 产品方案','11','rgba(216,236,248,.7)',1) +
        r(12,50,76,10,'#777777') + txt(16,52,70,'3 路线图','11','rgba(216,236,248,.7)',1) +
        txt(16,70,70,'点条目即跳转对应页 ↗','10','#cb5521',0)
      )
    },
    steps: [
      { text: "选中文字/形状 → 右键「超链接」或「链接」" },
      { text: "选「本文档中的位置」指向某页做目录" },
      { text: "选「网页/文件」可跳外部资源" },
      { text: "或插入「动作按钮」自带悬停/点击交互" }
    ],
    tips: "可点击目录/跳链是独立跳转能力，和缩放定位、触发器互补。",
    relatedTerms: ["hyperlink", "zoom-loc"], demo: "hyperlinkNav"
  },
  {
    id: "ink", name: "墨迹批注与激光笔",
    scenario: "放映与演讲", level: "入门",
    summary: "放映时随手圈画、激光笔指引，重点当场标出来。",
    before: {
      tag: "改前", desc: "想标重点只能下张重画，现场没法随手圈。",
      visual: slide(
        r(20,22,44,30,'#777777') +
        txt(24,60,40,'干讲指空气','11','rgba(216,236,248,.5)',0)
      )
    },
    after: {
      tag: "改后", desc: "随手圈画重点，激光笔引视线不落痕。",
      visual: slide(
        r(20,22,44,30,'#777777') +
        '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><ellipse cx="42" cy="52" rx="22" ry="14" fill="none" stroke="#cb5521" stroke-width="2.5"/></svg>' +
        circ(72,30,8,'#cb5521')
      )
    },
    steps: [
      { text: "放映中 → 指针选项 → 笔/荧光笔" },
      { text: "按住拖动画线、圈重点，可改颜色" },
      { text: "指针选项 → 激光笔，红色光点引视线" },
      { text: "放映结束可选「保留/丢弃墨迹」" }
    ],
    tips: "墨迹是现场即兴标注，区别于预先设计的触发器/动画。",
    relatedTerms: ["ink", "presenter-view"], demo: "inkAnnotate"
  },
  {
    id: "motion-path", name: "自定义路径动画",
    scenario: "动画与交互", level: "进阶",
    summary: "让对象沿手绘轨迹走，地图路线、流程走线都能做。",
    before: {
      tag: "改前", desc: "对象只会直跳或淡入，缺「沿轨迹移动」。",
      visual: slide(
        r(12,72,9,9,'#9fe3c5',.95) + r(84,16,9,9,'#cb5521',.95) +
        txt(12,60,76,'直跳，没有路线感','11','rgba(216,236,248,.5)',0)
      )
    },
    after: {
      tag: "改后", desc: "沿自定义曲线轨迹平滑移动，路线一目了然。",
      visual: slide(
        '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><path d="M12,78 C40,30 60,70 88,22" fill="none" stroke="#2f6f3a" stroke-width="2" stroke-dasharray="4 3"/></svg>' +
        r(10,72,9,9,'#9fe3c5',.95) + r(84,16,9,9,'#cb5521',.95)
      )
    },
    steps: [
      { text: "选中对象 →「添加动画」→「动作路径」" },
      { text: "选预设(直线/弧形)或「自定义路径」手绘" },
      { text: "拖动绿色起点/红色终点调轨迹" },
      { text: "配合「平滑」选项让拐角变圆润" }
    ],
    tips: "路径动画是独特玩法，区别于「平滑切换」(页面级) 与逐条出现。",
    relatedTerms: ["motion-path", "transition-fx"], demo: "motionPath"
  },
  {
    id: "qat", name: "快速访问工具栏自定义",
    scenario: "效率与交付", level: "入门",
    summary: "把常用命令钉到顶栏，一键点，不记快捷键也快。",
    before: {
      tag: "改前", desc: "高频命令藏在功能区深处，每次翻菜单找。",
      visual: slide(
        r(8,22,84,10,'#777777') +
        txt(10,44,80,'每次翻功能区找「对齐/格式刷」','11','rgba(216,236,248,.5)',1)
      )
    },
    after: {
      tag: "改后", desc: "常用命令钉到顶栏，一键点直达。",
      visual: slide(
        r(8,22,84,10,'#777777') +
        r(10,24,9,6,'#2f6f3a',.9) + r(22,24,9,6,'#2f6f3a',.9) + r(34,24,9,6,'#2f6f3a',.9) +
        txt(10,40,80,'常用命令钉到顶栏，一键点','11','#9fe3c5',1)
      )
    },
    steps: [
      { text: "右键任意功能区命令 →「添加到快速访问工具栏」" },
      { text: "或点顶栏右侧下拉箭头勾选常用项" },
      { text: "拖动可调整按钮顺序" },
      { text: "右键工具栏还能「在功能区下方显示」" }
    ],
    tips: "QAT 是鼠标流效率，和键盘快捷键互补——钉出来最省事。",
    relatedTerms: ["qat", "compress"], demo: "qatBar"
  },
  {
    id: "data-label", name: "数据标签直观标数字",
    scenario: "数据与图表", level: "入门",
    summary: "柱子上直接标数值/百分比/类别名，观众不用对坐标轴猜。",
    before: {
      tag: "改前", desc: "柱状图无标签，观众要歪头对坐标轴读数。",
      visual: slide(
        r(10,24,24,48,'#2f6f3a',.7) + r(38,36,24,36,'#2f6f3a',.7) + r(66,20,24,52,'#2f6f3a',.7) +
        r(6,72,88,1,'#777777') + r(6,72,1,-8,'#777777')
      )
    },
    after: {
      tag: "改后", desc: "柱顶标注数值，一眼看懂。",
      visual: slide(
        r(10,24,24,48,'#2f6f3a',.7) + r(38,36,24,36,'#2f6f3a',.7) + r(66,20,24,52,'#2f6f3a',.7) +
        r(6,72,88,1,'#777777') + r(6,72,1,-8,'#777777') +
        txt(12,18,20,'120','12','#9fe3c5',1) + txt(40,30,20,'85','12','#9fe3c5',1) + txt(68,14,20,'198','12','#9fe3c5',1)
      )
    },
    steps: [
      { text: "点击图表 → 右上角「＋」图表元素" },
      { text: "勾选「数据标签」" },
      { text: "点标签右侧箭头可切位置（外/内/居中）" },
      { text: "双击标签可单独改字体/颜色" }
    ],
    tips: "数据标签和图表美化同时做——标签字体和图表配色协调才专业。",
    relatedTerms: ["chart-beauty", "combo-chart"], demo: "dataLabel"
  },
  {
    id: "timeline", name: "动画窗格精调时间轴",
    scenario: "动画与交互", level: "进阶",
    summary: "在动画窗格拖延迟/调时长/设开始条件，多对象协同出场精准卡节奏。",
    before: {
      tag: "改前", desc: "动画一股脑弹出，层次全无。",
      visual: slide(
        r(10,36,24,18,'#2f6f3a',.5) + r(38,36,24,18,'#2f6f3a',.5) + r(66,36,24,18,'#2f6f3a',.5) +
        txt(12,18,76,'三块同时飞出→乱','11','#f0a59a',1)
      )
    },
    after: {
      tag: "改后", desc: "时间轴控制：先第1块→延迟 0.3s 后第2块→再第3块。",
      visual: slide(
        r(10,36,24,18,'#2f6f3a',.9) + r(38,36,24,18,'#2f6f3a',.5) + r(66,36,24,18,'#2f6f3a',.2) +
        r(8,64,84,10,'#777777') + r(12,65,22,8,'#2f6f3a') + r(36,65,22,8,'#2f6f3a',.6) + r(60,65,22,8,'#2f6f3a',.25) +
        txt(14,66,18,'块1 0s','8','#9fe3c5',1) + txt(38,66,18,'块2 0.3s','8','rgba(216,236,248,.5)',1) + txt(62,66,18,'块3 0.6s','8','rgba(216,236,248,.4)',1)
      )
    },
    steps: [
      { text: "动画 → 动画窗格，看所有对象的时间线", shortcut: "Alt → A → C" },
      { text: "拖动画条调整先后顺序" },
      { text: "双击动画条 → 调时长/延迟/开始条件" },
      { text: "「开始」改「上一动画之后」实现自动连播" }
    ],
    tips: "多对象精细动画必须进窗格调，片头/流程图走线全靠它。",
    relatedTerms: ["anim-type", "anim-painter"], demo: "timeline"
  },
  {
    id: "morph-force", name: "平滑切换强制配对",
    scenario: "动画与交互", level: "进阶",
    summary: "给跨页两个不同对象同名（前面加 !!），PPT 会把它们「认成同一个」做平滑变。",
    before: {
      tag: "改前", desc: "两页不同形状，切页时直接闪现，无过渡。",
      visual: slide(
        r(18,34,28,18,'#2f6f3a',.7) + r(60,34,14,20,'#9fe3c5',.7) + txt(18,58,28,'第1页：方块','9','rgba(216,236,248,.4)',1) +
        r(4,4,92,1,'#777777') + txt(40,8,20,'无过渡','10','#f0a59a',1)
      )
    },
    after: {
      tag: "改后", desc: "选择窗格命名 !!shape → 两页对象平滑变。",
      visual: slide(
        r(18,34,28,18,'#2f6f3a',.7) + r(60,34,14,20,'#9fe3c5',.7) + txt(18,58,28,'第1页：!!shape','9','rgba(216,236,248,.4)',1) +
        r(4,4,92,1,'#777777') + txt(40,8,20,'平滑缩放 →','10','#9fe3c5',1)
      )
    },
    steps: [
      { text: "第1页选中对象 → 开始 → 选择 → 选择窗格" },
      { text: "在窗格里把对象名改成「!!形状名」" },
      { text: "第2页目标对象也改成相同「!!形状名」" },
      { text: "给第2页设「平滑」切换 → 播放看效果" }
    ],
    tips: "!! 前缀是 PowerPoint 内部配对标记，两对象位置/大小/旋转的差值都会被插值动画化。",
    relatedTerms: ["morph"], demo: "morphForce"
  },
  {
    id: "guides", name: "网格线与参考线",
    scenario: "排版与图示", level: "入门",
    summary: "画布上拖出橙/蓝参考线 + 吸附网格，元素放下去自动对齐。",
    before: {
      tag: "改前", desc: "元素靠眼对齐，间距不一致。",
      visual: slide(
        r(8,22,18,16,'#777777') + r(34,18,18,18,'#777777') + r(60,26,18,14,'#777777') +
        r(76,38,18,12,'#777777')
      )
    },
    after: {
      tag: "改后", desc: "参考线 + 网格辅助下，元素整齐对齐。",
      visual: slide(
        r(6,18,82,1,'#9fe3c5',.25) + r(6,44,82,1,'#9fe3c5',.25) +
        r(20,4,1,70,'#2f6f3a',.25) + r(52,4,1,70,'#2f6f3a',.25) +
        r(22,20,28,14,'#777777') + r(22,46,28,14,'#777777') +
        r(54,20,28,14,'#777777') + r(54,46,28,14,'#777777')
      )
    },
    steps: [
      { text: "视图 → 勾选「参考线」+「网格线」" },
      { text: "拖动参考线到需要的位置（Ctrl+拖动可复制新参考线）" },
      { text: "拖动元素靠近参考线时自动吸附" },
      { text: "右键参考线可设颜色、或删除" }
    ],
    tips: "水平参考线对齐标题底线，垂直参考线对齐左侧边距——一套线反复用。",
    relatedTerms: ["smart-align", "alignment"], demo: "guides"
  },
  {
    id: "summary-zoom", name: "幻灯片缩放非线性讲",
    scenario: "放映与演讲", level: "进阶",
    summary: "放映中缩放到任意页再回来，现场答疑不翻几十页。",
    before: {
      tag: "改前", desc: "观众问到第8页内容，你狂翻页找。",
      visual: slide(
        r(10,40,24,16,'#777777') + r(38,40,24,16,'#777777') + r(66,40,24,16,'#777777') +
        txt(18,44,8,'1','10','rgba(216,236,248,.3)',1) + txt(46,44,8,'→8','10','#f0a59a',1) + txt(74,44,8,'?','10','#f0a59a',1)
      )
    },
    after: {
      tag: "改后", desc: "缩放定位面板出现，点任意页直接跳。",
      visual: slide(
        r(4,10,30,22,'#777777') + r(36,10,30,22,'#777777') + r(68,10,30,22,'#777777') +
        r(4,36,30,22,'#777777') + r(36,36,30,22,'#777777') + r(68,36,30,22,'#777777') +
        r(52,12,28,18,'#2f6f3a',.4) + txt(54,18,24,'数据明细','9','#3a8a8a',1)
      )
    },
    steps: [
      { text: "插入 → 缩放定位 → 摘要缩放定位" },
      { text: "在对话框勾选要放入的幻灯片节" },
      { text: "生成摘要页，每个节是一张缩略卡片" },
      { text: "放映时点缩略卡片跳转到该节，再按 Esc 回来" }
    ],
    tips: "摘要缩放最适合同一套片子给不同受众讲——讲完概要后按兴趣跳点。",
    relatedTerms: ["zoom-loc"], demo: "summaryZoom"
  },
  {
    id: "3d-model", name: "3D模型立体展示",
    scenario: "图形与图像", level: "入门",
    summary: "PPT 原生支持插入 3D 模型并拖旋转，配合平滑切换做 3D 过渡。",
    before: {
      tag: "改前", desc: "平面截图六面图，旋转感全靠脑补。",
      visual: slide(
        r(30,26,40,36,'#777777') + txt(34,42,32,'产品六面图×6','12','rgba(216,236,248,.4)',1)
      )
    },
    after: {
      tag: "改后", desc: "3D 模型拖旋转任意角度，展示立体结构。",
      visual: slide(
        '<svg viewBox="0 0 100 100" style="position:absolute;left:25%;top:12%;width:50%;height:64%"><polygon points="50,10 90,34 90,66 50,90 10,66 10,34" fill="rgba(102,58,243,.25)" stroke="#2f6f3a" stroke-width="1"/><polygon points="50,10 90,34 50,42 10,34" fill="rgba(102,58,243,.4)"/><line x1="50" y1="42" x2="50" y2="90" stroke="#2f6f3a" stroke-width="1"/><line x1="10" y1="34" x2="10" y2="66" stroke="#2f6f3a" stroke-width=".5"/><line x1="90" y1="34" x2="90" y2="66" stroke="#2f6f3a" stroke-width=".5"/></svg>' +
        circ(68,68,8,'#9fe3c5',.3) + txt(66,66,12,'↻','11','#9fe3c5',1)
      )
    },
    steps: [
      { text: "插入 → 3D 模型 → 从文件或库存 3D 选" },
      { text: "选中模型，中键拖旋转观察角度" },
      { text: "复制到另一页调不同角度 → 加平滑切换 → 3D 过渡" },
      { text: "动画里还能设「转盘」「摇摆」等 3D 动画" }
    ],
    tips: "库存 3D 里有大量免费模型；两页不同角度+平滑切换=3D 旋转秀。",
    relatedTerms: ["morph"], demo: "3dModel"
  },
  {
    id: "variants", name: "主题变体一键换色",
    scenario: "统一风格与母版", level: "入门",
    summary: "同一主题下切换配色方案，点一下就换全套颜色+字体组合。",
    before: {
      tag: "改前", desc: "一套蓝紫配色从头用到尾，换风格要逐页改。",
      visual: slide(
        r(4,16,42,60,'#1a1a4e') + r(50,16,46,60,'#1a1a4e') +
        r(10,24,30,18,'#2f6f3a',.8) + r(56,24,34,18,'#2f6f3a',.8) +
        r(10,48,30,10,'rgba(102,58,243,.3)') + r(56,48,34,10,'rgba(102,58,243,.3)')
      )
    },
    after: {
      tag: "改后", desc: "变体面板选绿色方案→全篇图表/形状/文字自动换色。",
      visual: slide(
        r(4,16,42,60,'#1a2e1a') + r(50,16,46,60,'#1a2e1a') +
        r(10,24,30,18,'#269684',.8) + r(56,24,34,18,'#269684',.8) +
        r(10,48,30,10,'rgba(38,150,132,.3)') + r(56,48,34,10,'rgba(38,150,132,.3)') +
        r(78,68,14,8,'#777777') + txt(79,69,12,'绿色变体','8','#9fe3c5',1)
      )
    },
    steps: [
      { text: "设计 → 变体区点下拉箭头" },
      { text: "「颜色」→ 选一套配色方案，整页自动换" },
      { text: "「字体」→ 一键换标题+正文字体组合" },
      { text: "还可「自定义颜色」生成专属方案" }
    ],
    tips: "变体只在同一主题下切换；要做品牌专属配色建议自定义方案并保存。",
    relatedTerms: ["theme", "theme-variant"], demo: "variants"
  },
  {
    id: "artistic-effect", name: "艺术效果一键风格化",
    scenario: "图形与图像", level: "入门",
    summary: "图片→艺术效果：铅笔素描/水彩/虚化/胶片颗粒……点一下整图变风格。",
    before: {
      tag: "改前", desc: "普通照片做封面背景，太写实没设计感。",
      visual: slide(
        r(10,16,36,52,'#777777') + r(54,16,36,52,'#777777') +
        circ(28,32,18,'#2f6f3a',.15) + circ(28,32,18,'#2f6f3a',.3)
      )
    },
    after: {
      tag: "改后", desc: "艺术效果→铅笔素描/水彩/虚化，秒变插画风。",
      visual: slide(
        r(10,16,36,52,'#777777') + r(54,16,36,52,'#777777') +
        circ(28,32,18,'#2f6f3a',.15) + circ(28,32,18,'#2f6f3a',.3) +
        '<svg viewBox="0 0 100 100" style="position:absolute;left:54%;top:16%;width:36%;height:52%"><line x1="20" y1="30" x2="36" y2="28" stroke="#9fe3c5" stroke-width=".5" opacity=".5"/><line x1="22" y1="34" x2="40" y2="32" stroke="#9fe3c5" stroke-width=".5" opacity=".5"/><line x1="18" y1="38" x2="42" y2="36" stroke="#9fe3c5" stroke-width=".5" opacity=".5"/><line x1="50" y1="42" x2="68" y2="40" stroke="#f0a59a" stroke-width=".5" opacity=".5"/><line x1="48" y1="46" x2="70" y2="44" stroke="#f0a59a" stroke-width=".5" opacity=".5"/></svg>' +
        txt(60,70,28,'铅笔素描','9','#9fe3c5',1)
      )
    },
    steps: [
      { text: "选中图片 → 图片格式 → 艺术效果" },
      { text: "下拉选效果：铅笔素描/水彩/虚化/胶片颗粒等" },
      { text: "点「艺术效果选项」可调强度" },
      { text: "配合透明度降低做背景底纹" }
    ],
    tips: "做封面时把照片加虚化+降透明度当背景——既不失品牌感，又不抢标题。",
    relatedTerms: ["remove-bg", "recolor"], demo: "artisticEffect"
  },
  {
    id: "picture-correct", name: "图片更正亮度对比度",
    scenario: "图形与图像", level: "入门",
    summary: "图片→更正：调亮度/对比度/锐化/柔化，照片太暗太灰不用开 PS。",
    before: {
      tag: "改前", desc: "照片偏暗看不清细节。",
      visual: slide(
        r(20,20,60,48,'#1a1a2e') + circ(50,44,20,'#777777') +
        txt(36,70,28,'太暗看不清','10','#f0a59a',1)
      )
    },
    after: {
      tag: "改后", desc: "提高亮度+对比度，画面清晰。",
      visual: slide(
        r(20,20,60,48,'#2a2a4e') + circ(50,44,20,'#777777') +
        r(52,18,6,3,'#777777') + txt(53,19,4,'亮度+30','6','#9fe3c5',1)
      )
    },
    steps: [
      { text: "选中图片 → 图片格式 → 更正" },
      { text: "亮度/对比度选预设方案或点「图片更正选项」" },
      { text: "在右侧面板拖滑块微调" },
      { text: "锐化滑块让边缘更清晰" }
    ],
    tips: "照片做全图型 PPT 背景时，先降亮度到 60% 再叠半透明暗色块——文字可读、氛围在线。",
    relatedTerms: ["remove-bg", "recolor"], demo: "pictureCorrect"
  },
  {
    id: "picture-style", name: "图片样式一键套框",
    scenario: "图形与图像", level: "入门",
    summary: "图片→图片样式库：一键套预置边框+阴影+倒影+圆角组合。",
    before: {
      tag: "改前", desc: "图片直愣愣放上去，没层次感。",
      visual: slide(
        r(30,24,40,40,'#777777')
      )
    },
    after: {
      tag: "改后", desc: "套图片样式→柔化边缘+投影，立体有质感。",
      visual: slide(
        r(30,24,40,40,'#777777') +
        r(28,22,40,40,'rgba(102,58,243,.12)') + r(30,24,40,40,'#777777') +
        txt(36,70,28,'柔化边缘+投影','9','#9fe3c5',1)
      )
    },
    steps: [
      { text: "选中图片 → 图片格式 → 图片样式库" },
      { text: "悬停预览，点一下套用" },
      { text: "「图片边框」调边框颜色/粗细" },
      { text: "「图片效果」加投影/发光/柔化边缘/倒影" }
    ],
    tips: "全篇图片用同一种样式保持视觉统一——设好一个后用格式刷（双击锁定）刷别的。",
    relatedTerms: ["crop-shape", "remove-bg"], demo: "pictureStyle"
  },
  {
    id: "change-picture", name: "更换图片保留格式",
    scenario: "图形与图像", level: "入门",
    summary: "右键→更改图片，新图继承原图的裁剪/大小/效果/边框，不用重调。",
    before: {
      tag: "改前", desc: "换素材→删图→插新图→重设裁剪/边框/位置，超麻烦。",
      visual: slide(
        r(24,20,24,40,'#777777') + circ(36,38,18,'#777777') +
        txt(12,70,52,'删→插→重调格式','9','#f0a59a',1)
      )
    },
    after: {
      tag: "改后", desc: "右键「更改图片」→新图自动继承所有格式。",
      visual: slide(
        r(24,20,24,40,'#777777') + circ(36,38,18,'#9fe3c5',.2) +
        txt(42,20,46,'格式原封不动继承','9','#9fe3c5',1)
      )
    },
    steps: [
      { text: "右键图片 →「更改图片」→ 选来源" },
      { text: "选新图片文件（或在线图片/剪贴板）" },
      { text: "新图自动继承裁剪比例/位置/大小/边框/效果" },
      { text: "微调裁剪框位置即可（如果新图构图不同）" }
    ],
    tips: "做模板/版式时用占位图占好格式，定稿时批量「更改图片」换真素材——效率翻倍。",
    relatedTerms: ["compress", "remove-bg"], demo: "changePicture"
  },
  {
    id: "excel-link", name: "Excel数据链入实时更新",
    scenario: "数据与图表", level: "进阶",
    summary: "Excel 数据粘贴为「链接」，源数据变了 PPT 图自动刷新。",
    before: {
      tag: "改前", desc: "Excel 数据改了，PPT 图要重新复制粘帖。",
      visual: slide(
        r(8,30,36,28,'#777777') + r(52,30,40,28,'#777777') +
        txt(12,38,28,'Excel 数据','10','rgba(216,236,248,.4)',1) + txt(56,38,28,'PPT 图表','10','rgba(216,236,248,.4)',1) +
        r(26,60,1,12,'#777777') + txt(30,64,8,'手动','7','#f0a59a',1)
      )
    },
    after: {
      tag: "改后", desc: "粘贴为链接→源数据更新→PPT 点刷新自动同步。",
      visual: slide(
        r(8,30,36,28,'#777777') + r(52,30,40,28,'#777777') +
        txt(12,38,28,'Excel 数据','10','rgba(216,236,248,.4)',1) + txt(56,38,28,'PPT 图表','10','rgba(216,236,248,.4)',1) +
        r(26,56,1,20,'#9fe3c5',.4) + txt(30,64,8,'⇄','12','#9fe3c5',1) +
        txt(58,60,32,'右键刷新','9','#9fe3c5',1)
      )
    },
    steps: [
      { text: "Excel 里复制数据/图表 → PPT 粘贴" },
      { text: "粘贴选项选「使用目标主题和链接数据」" },
      { text: "Excel 数据更新后 → PPT 右键图表「更新链接」" },
      { text: "文件→信息→编辑指向文件的链接可管理全部链接" }
    ],
    tips: "月度/周度数据汇报的图表一定要链到 Excel——改一次源文件全月 PPT 自动刷新。",
    relatedTerms: ["chart-beauty", "combo-chart"], demo: "excelLink"
  },
  {
    id: "data-bars", name: "条件格式数据条",
    scenario: "数据与图表", level: "入门",
    summary: "PPT 表格单元格里直接画数据条/色阶，不用做图表也能可视化对比。",
    before: {
      tag: "改前", desc: "表格里只有数字，对比不直观。",
      visual: slide(
        r(12,24,76,8,'#777777') + r(12,36,76,8,'#777777') + r(12,48,76,8,'#777777') +
        txt(16,25,15,'Q1','10','rgba(216,236,248,.5)',1) + txt(52,25,15,'120','12','rgba(216,236,248,.7)',1) +
        txt(16,37,15,'Q2','10','rgba(216,236,248,.5)',1) + txt(52,37,15,'85','12','rgba(216,236,248,.7)',1) +
        txt(16,49,15,'Q3','10','rgba(216,236,248,.5)',1) + txt(52,49,15,'198','12','rgba(216,236,248,.7)',1)
      )
    },
    after: {
      tag: "改后", desc: "表格内嵌数据条，数字大小一眼可见。",
      visual: slide(
        r(12,24,76,8,'#777777') + r(12,36,76,8,'#777777') + r(12,48,76,8,'#777777') +
        r(34,25,36,6,'#2f6f3a',.5) + txt(16,25,15,'Q1','10','rgba(216,236,248,.5)',1) + txt(72,25,15,'120','12','#3a8a8a',1) +
        r(34,37,26,6,'#2f6f3a',.35) + txt(16,37,15,'Q2','10','rgba(216,236,248,.5)',1) + txt(72,37,15,'85','12','rgba(216,236,248,.7)',1) +
        r(34,49,46,6,'#2f6f3a',.6) + txt(16,49,15,'Q3','10','rgba(216,236,248,.5)',1) + txt(72,49,15,'198','12','#3a8a8a',1)
      )
    },
    steps: [
      { text: "选中表格→表格设计→条件格式" },
      { text: "选「数据条」→自动按数值比例画彩色条" },
      { text: "可切换「色阶」或「图标集」" },
      { text: "右键「管理规则」可自定义条色和数值范围" }
    ],
    tips: "数据条+数字放同一格最好——条做背景、数字字重加粗，信息密度高且不散。",
    relatedTerms: ["table-beauty", "chart-beauty"], demo: "dataBars"
  },
  {
    id: "video-trim", name: "视频裁剪内联播放",
    scenario: "放映与演讲", level: "入门",
    summary: "视频插进 PPT 后裁剪头尾、设书签跳点、调自动播放，不跳出 PPT。",
    before: {
      tag: "改前", desc: "放着放着要切出去开播放器拖进度条。",
      visual: slide(
        r(6,28,88,8,'#777777') + r(6,28,40,8,'#2f6f3a',.15) +
        r(76,20,8,4,'#777777') + txt(78,21,4,'1:30','6','rgba(216,236,248,.4)')
      )
    },
    after: {
      tag: "改后", desc: "内嵌播放器→裁剪头尾+书签跳点→自动播。",
      visual: slide(
        r(6,28,88,8,'#777777') + r(36,28,28,8,'#2f6f3a',.3) +
        circ(36,32,3,'#9fe3c5') + circ(64,32,3,'#9fe3c5') +
        txt(54,18,24,'书签跳点','8','#9fe3c5',1) + txt(38,44,28,'自动播放','8','#9fe3c5',1)
      )
    },
    steps: [
      { text: "插入→视频→从文件（支持 MP4/WMV）" },
      { text: "选中视频→播放→裁剪视频，拖滑块设起止点" },
      { text: "播放→添加书签，放映时直接跳到书签位置" },
      { text: "播放→开始：选「自动」让视频随页自动播" }
    ],
    tips: "嵌入视频而非链接视频——嵌入后 PPT 文件自带视频，发给别人也能播。",
    relatedTerms: ["narrate", "presenter-view"], demo: "videoTrim"
  },
  {
    id: "a11y-check", name: "辅助功能检查器",
    scenario: "效率与交付", level: "入门",
    summary: "审阅→辅助功能，PPT 自动扫缺 Alt 文本/阅读顺序乱/对比度不够等问题。",
    before: {
      tag: "改前", desc: "图片缺 Alt 文本、阅读顺序乱，发给视障者用不了。",
      visual: slide(
        r(16,20,20,30,'#f0a59a',.15) + txt(18,34,16,'⚠ 缺 Alt','8','#f0a59a',1) +
        r(44,20,20,30,'#f0a59a',.15) + txt(46,34,16,'⚠ 顺序乱','8','#f0a59a',1) +
        r(72,20,20,30,'#f0a59a',.15) + txt(74,34,16,'⚠ 对比度','8','#f0a59a',1)
      )
    },
    after: {
      tag: "改后", desc: "检查器扫一遍→全部✓通过。",
      visual: slide(
        r(16,20,20,30,'#9fe3c5',.08) + txt(18,34,16,'✓ 有 Alt','8','#9fe3c5',1) +
        r(44,20,20,30,'#9fe3c5',.08) + txt(46,34,16,'✓ 顺序对','8','#9fe3c5',1) +
        r(72,20,20,30,'#9fe3c5',.08) + txt(74,34,16,'✓ 对比度','8','#9fe3c5',1)
      )
    },
    steps: [
      { text: "审阅 → 检查辅助功能" },
      { text: "右侧面板列出所有问题（错误/警告/提示）" },
      { text: "点问题直接跳转到对应元素" },
      { text: "给图片补 Alt 文本、调阅读顺序、改对比度" }
    ],
    tips: "养成习惯：定稿前跑一遍辅助功能检查——不仅为残障友好，也能发现隐藏的格式问题。",
    relatedTerms: ["designer"], demo: "a11yCheck"
  },
  {
    id: "reuse-slides", name: "幻灯片重用跨文件搬页",
    scenario: "效率与交付", level: "入门",
    summary: "插入→重用幻灯片，从别的 PPT 或幻灯片库拉页过来，不破坏格式。",
    before: {
      tag: "改前", desc: "从别的 PPT 复制粘贴→格式崩、母版不对。",
      visual: slide(
        r(10,30,36,28,'#777777') + r(54,30,36,28,'#777777') +
        r(32,36,1,16,'#f0a59a',.4) + txt(36,42,16,'格式崩','8','#f0a59a',1)
      )
    },
    after: {
      tag: "改后", desc: "重用幻灯片→浏览→点即插入，格式原样保留。",
      visual: slide(
        r(10,30,36,28,'#777777') + r(54,30,36,28,'#777777') +
        r(32,36,24,16,'rgba(102,58,243,.15)') + txt(34,46,20,'✓ 格式保留','8','#9fe3c5',1)
      )
    },
    steps: [
      { text: "插入 → 新建幻灯片下拉 → 重用幻灯片" },
      { text: "在右侧面板点「浏览」选源文件" },
      { text: "源文件所有页预览出来，点即插入" },
      { text: "勾选「保留源格式」不套用当前母版" }
    ],
    tips: "团队共享一个幻灯片库 PPT，每人做项目时从库中拉通用页（封面/目录/结尾）——省时且风格统一。",
    relatedTerms: ["custom-show", "section"], demo: "reuseSlides"
  },
  {
    id: "ink-math", name: "墨迹公式手写转数学",
    scenario: "排版与图示", level: "进阶",
    summary: "插入→公式→墨迹公式，手写公式自动转成标准数学符号。",
    before: {
      tag: "改前", desc: "复杂公式靠键盘打 LaTeX 或拼字符，又慢又丑。",
      visual: slide(
        txt(14,36,72,'x = (-b ± √Δ) / 2a','16','rgba(216,236,248,.5)',1)
      )
    },
    after: {
      tag: "改后", desc: "墨迹公式→手写 x²+bx+c→自动转标准排版。",
      visual: slide(
        txt(14,28,72,'x² + bx + c = 0','18','#9fe3c5',1) +
        circ(74,68,8,'#777777') + txt(72,66,12,'✎ 手写','8','#9fe3c5',1)
      )
    },
    steps: [
      { text: "插入 → 公式下拉 → 墨迹公式" },
      { text: "在黄色手写区写下公式" },
      { text: "上方的预览区实时显示识别结果" },
      { text: "点「插入」→公式转为标准格式" }
    ],
    tips: "墨迹公式支持鼠标/触控笔/触摸——写完后可以擦除重写，直到识别正确为止。",
    relatedTerms: ["smartart"], demo: "inkMath"
  },
  {
    id: "map-chart", name: "地图图表按区域着色",
    scenario: "数据与图表", level: "进阶",
    summary: "插入→图表→地图，按省/国自动填色，地理数据最强可视化。",
    before: {
      tag: "改前", desc: "各地区数据列在表格里，看不出地理分布。",
      visual: slide(
        r(10,28,40,36,'#777777') + r(60,28,30,20,'#777777') +
        txt(14,32,32,'地区 / 销量','10','rgba(216,236,248,.4)',1) +
        txt(14,42,32,'A区 340','9','rgba(216,236,248,.3)',1) +
        txt(14,48,32,'B区 210','9','rgba(216,236,248,.3)',1) +
        txt(14,54,32,'C区 580','9','rgba(216,236,248,.3)',1)
      )
    },
    after: {
      tag: "改后", desc: "地图图表→各省按数值深浅着色。",
      visual: slide(
        r(8,14,42,64,'rgba(102,58,243,.05)') +
        r(14,20,12,10,'#2f6f3a',.7) + r(30,20,12,10,'#2f6f3a',.4) + r(14,34,12,12,'#2f6f3a',.3) +
        r(30,34,12,12,'#2f6f3a',.5) + r(14,50,12,10,'#2f6f3a',.2) + r(30,50,12,10,'#2f6f3a',.6) +
        r(56,20,34,12,'#777777') + txt(58,22,30,'数值越深','9','#9fe3c5',1) +
        r(56,36,34,4,'#2f6f3a',.7) + r(56,42,34,4,'#2f6f3a',.4) + r(56,48,34,4,'#2f6f3a',.2) +
        txt(92,50,6,'深 → 浅','7','rgba(216,236,248,.4)',1)
      )
    },
    steps: [
      { text: "插入 → 图表 → 地图" },
      { text: "Excel 弹出→填好区域名（省/市/国）和数值" },
      { text: "关闭 Excel→地图自动按数值着色" },
      { text: "图表设计里调颜色方案和数据标签" }
    ],
    tips: "地图图表需要联网（基于 Bing 数据），区域名必须用标准行政区划名，否则填不上色。",
    relatedTerms: ["chart-beauty", "combo-chart"], demo: "mapChart"
  },

  /* ===================== 2026-07-27 新增（真实图片演示） ===================== */
  {
    id: "image-mask", name: "图片半透明蒙版（图上压字可读）",
    scenario: "图形与图像", level: "入门",
    summary: "全图背景上压文字，先盖一层半透明深色蒙版，白字立刻清晰可读、还显高级。",
    before: {
      tag: "改前", desc: "亮色科技图上直接放字，对比太低，字看不清。",
      visual: slide(
        '<img src="img/tech1.png" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover" />' +
        txt(10, 40, 82, 'AI 驱动未来', 26, '#777777', 0) +
        txt(10, 57, 70, '让数据自己说话', 13, '#777777', 0)
      )
    },
    after: {
      tag: "改后", desc: "盖半透明深色蒙版 + 白色标题，文字清晰、有质感。",
      visual: slide(
        '<img src="img/tech1.png" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover" />' +
        '<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(180deg,rgba(5,6,15,.12),rgba(5,6,15,.72))"></div>' +
        txt(10, 40, 82, 'AI 驱动未来', 26, '#3a8a8a', 1) +
        txt(10, 57, 70, '让数据自己说话', 13, '#777777', 0)
      )
    },
    steps: [
      { text: "插入图片铺满整页（设计 → 幻灯片大小 → 全屏）" },
      { text: "插入矩形覆盖整页，填充深色、透明度约 50%" },
      { text: "把矩形「置于底层」，或直接给图片加「图片颜色」压暗" },
      { text: "在蒙版上放白色标题与正文，对比立刻拉满" }
    ],
    tips: "蒙版别太黑也别太浅，50% 左右最稳；想更高级可用上深下浅的渐变蒙版。",
    relatedTerms: ["full-image", "contrast"], demo: "imageMask"
  },
  {
    id: "hide-slide", name: "隐藏幻灯片（演讲备用页）",
    scenario: "放映与演讲", level: "入门",
    summary: "不删页也能让某页不放映——备用的「救场页」藏起来，临时要讲再显示。",
    before: {
      tag: "改前", desc: "备用页混在正文里，放映时会突然冒出来，打断节奏。",
      visual: slide(
        r(4, 30, 20, 40, '#777777') + txt(6, 70, 18, '1', 10, 'rgba(216,236,248,.6)', 0) +
        r(28, 30, 20, 40, '#777777') + txt(30, 70, 18, '2', 10, 'rgba(216,236,248,.6)', 0) +
        r(52, 30, 20, 40, '#cb5521') + txt(53, 70, 18, '备用', 9, '#3a8a8a', 1) +
        r(76, 30, 20, 40, '#777777') + txt(78, 70, 18, '3', 10, 'rgba(216,236,248,.6)', 0) +
        txt(4, 14, 92, '放映时会冒出「备用页」', 12, 'rgba(240,165,154,.92)', 1)
      )
    },
    after: {
      tag: "改后", desc: "把备用页设为隐藏，放映自动跳过；需要时再显示。",
      visual: slide(
        r(4, 30, 20, 40, '#777777') + txt(6, 70, 18, '1', 10, 'rgba(216,236,248,.6)', 0) +
        r(28, 30, 20, 40, '#777777') + txt(30, 70, 18, '2', 10, 'rgba(216,236,248,.6)', 0) +
        r(52, 30, 20, 40, '#777777') +
        '<div style="position:absolute;left:52%;top:30%;width:20%;height:40%;overflow:hidden"><div style="position:absolute;left:50%;top:-10%;width:2px;height:120%;background:rgba(228,77,60,.85);transform:rotate(35deg)"></div></div>' +
        txt(53, 70, 18, '已隐藏', 9, 'rgba(159,227,197,.95)', 1) +
        r(76, 30, 20, 40, '#777777') + txt(78, 70, 18, '3', 10, 'rgba(216,236,248,.6)', 0) +
        txt(4, 14, 92, '放映自动跳过 · 需要时再显示', 12, 'rgba(159,227,197,.92)', 1)
      )
    },
    steps: [
      { text: "在缩略图 / 大纲里右键那一页 → 隐藏幻灯片" },
      { text: "被隐藏的页编号带斜杠删除线，放映时自动跳过" },
      { text: "需要时再右键 → 取消隐藏；演示者视图里也能切" }
    ],
    tips: "隐藏不等于删除，内容还在只是不进放映。适合 Q&A 备选、敏感数据页、超长附录。",
    relatedTerms: ["custom-show", "section"], demo: "hideSlide"
  },
  {
    id: "text-to-shape", name: "文字转形状/轮廓化（创意字+防丢字体）",
    scenario: "图形与图像", level: "进阶",
    summary: "把标题文字转成矢量轮廓，随意加渐变、改顶点，且发给别人也不会因缺字体而变样。",
    before: {
      tag: "改前", desc: "普通文本框，对方电脑没装字体就变成宋体，创意全毁。",
      visual: slide(
        '<div style="position:absolute;left:18%;top:34%;width:64%;height:32%;border:1px dashed rgba(216,236,248,.5);border-radius:6px;display:grid;place-items:center">' +
        '<span style="color:rgba(216,236,248,.85);font:600 22px var(--font-body)">标题文字</span></div>' +
        txt(18, 18, 64, '普通文本框 · 换机变宋体', 12, 'rgba(240,165,154,.92)', 0)
      )
    },
    after: {
      tag: "改后", desc: "转轮廓成矢量，可填渐变、改节点，且不再依赖字体。",
      visual: slide(
        '<div style="position:absolute;left:18%;top:34%;width:64%;height:32%;border-radius:6px;display:grid;place-items:center;background:rgba(102,58,243,.08)">' +
        '<span style="font:600 24px var(--font-body);background:linear-gradient(90deg,#2f6f3a,#2f6f3a;-webkit-background-clip:text;background-clip:text;color:transparent">标题文字</span></div>' +
        txt(18, 18, 64, '转轮廓 · 矢量可改色 · 不依赖字体', 12, 'rgba(159,227,197,.92)', 0)
      )
    },
    steps: [
      { text: "选中文本框，Ctrl+C 复制" },
      { text: "开始 → 粘贴 → 选择性粘贴 → 图片（增强元文件 EMF）" },
      { text: "右键这张图 → 组合 → 取消组合（要取消两次）" },
      { text: "文字变成矢量轮廓，可单独填渐变、改顶点；且不再依赖原字体" }
    ],
    tips: "转轮廓后就不能再改字了，先定稿再转；这也是防止对方电脑缺字体变样的终极办法。",
    relatedTerms: ["boolean", "format-painter"], demo: "textOutline"
  },
  {
    id: "smartart-to-shape", name: "SmartArt 转形状后自由编辑",
    scenario: "排版与图示", level: "进阶",
    summary: "SmartArt 整体太死板？一键转成普通形状，每个框都能单独拖动、删改、换色。",
    before: {
      tag: "改前", desc: "SmartArt 是个整体，想单独挪一个框、改一个色都不行。",
      visual: slide(
        r(10, 32, 22, 16, '#2f6f3a', .85) + r(39, 32, 22, 16, '#2f6f3a', .85) + r(68, 32, 22, 16, '#2f6f3a', .85) +
        r(30, 40, 9, 2, 'rgba(216,236,248,.5)') + r(59, 40, 9, 2, 'rgba(216,236,248,.5)') +
        txt(10, 64, 80, 'SmartArt 整体锁定 · 单框不能改', 11, 'rgba(240,165,154,.92)', 0)
      )
    },
    after: {
      tag: "改后", desc: "转成形状后，每个元素独立，随便改。",
      visual: slide(
        r(8, 28, 20, 15, '#2f6f3a', .9) + r(42, 42, 20, 15, '#cb5521', .9) + r(72, 30, 18, 14, '#269684', .9) +
        '<div style="position:absolute;left:60%;top:54%;width:16%;height:2px;background:rgba(216,236,248,.4);transform:rotate(-32deg)"></div>' +
        txt(8, 64, 84, '转形状后 · 可单独拖 / 改色 / 删', 11, 'rgba(159,227,197,.92)', 0)
      )
    },
    steps: [
      { text: "选中 SmartArt → 右键「转换为形状」" },
      { text: "整体变成一组独立形状，Ctrl+点击可选中单个" },
      { text: "自由拖动、改色、删多余、加自己的图标" }
    ],
    tips: "转换后失去 SmartArt 的文字窗格快捷编辑，先填好文字再转更省事。",
    relatedTerms: ["smartart", "group"], demo: "smartartUngroup"
  },
  {
    id: "gradient-fill", name: "渐变填充做高级背景/文字",
    scenario: "图形与图像", level: "入门",
    summary: "纯色太单调？用渐变填充做背景和文字，再叠一层真实图片，立刻有质感有层次。",
    before: {
      tag: "改前", desc: "大红大蓝纯色块，平、土、没设计感。",
      visual: slide(
        '<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:#2f6f3a"></div>' +
        txt(10, 40, 80, '纯色太单调', 22, '#777777', 1)
      )
    },
    after: {
      tag: "改后", desc: "真实图片 + 渐变蒙版背景 + 渐变文字，瞬间高级。",
      visual: slide(
        '<img src="img/tech2.png" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover" />' +
        '<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(135deg,rgba(102,58,243,.78),rgba(2,125,234,.42))"></div>' +
        txt(10, 40, 80, '渐变更高级', 22, '#3a8a8a', 1)
      )
    },
    steps: [
      { text: "选中形状 / 文本框 → 形状格式 → 填充 → 渐变填充" },
      { text: "调渐变光圈（颜色、位置、透明度），常用 2–3 个光圈" },
      { text: "想更高级：背景用图片 + 渐变蒙版；文字用渐变填充 + 背景剪裁" }
    ],
    tips: "相邻光圈颜色别差太大，同色系深浅过渡最安全；背景渐变建议走对角方向。",
    relatedTerms: ["gradient", "full-image"], demo: "gradientFill"
  },
  {
    id: "para-spacing", name: "段落行距/段距一键优化（文字呼吸感）",
    scenario: "排版与图示", level: "入门",
    summary: "字挤成一块？调行距和段间距，正文立刻有呼吸感、好读十倍。",
    before: {
      tag: "改前", desc: "行距 1.0、段距 0，文字挤成一团，读着喘不过气。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:18%;width:84%;height:3%;background:rgba(216,236,248,.5);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:25%;width:84%;height:3%;background:rgba(216,236,248,.5);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:32%;width:70%;height:3%;background:rgba(216,236,248,.5);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:39%;width:84%;height:3%;background:rgba(216,236,248,.5);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:46%;width:60%;height:3%;background:rgba(216,236,248,.5);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:53%;width:84%;height:3%;background:rgba(216,236,248,.5);border-radius:2px"></div>' +
        txt(8, 12, 80, '行距 1.0 · 段距 0', 12, 'rgba(240,165,154,.92)', 0)
      )
    },
    after: {
      tag: "改后", desc: "行距 1.3–1.5、段后距拉开，清爽透气。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:14%;width:84%;height:3.4%;background:rgba(159,227,197,.7);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:22%;width:84%;height:3.4%;background:rgba(159,227,197,.7);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:30%;width:70%;height:3.4%;background:rgba(159,227,197,.7);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:42%;width:84%;height:3.4%;background:rgba(159,227,197,.7);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:50%;width:60%;height:3.4%;background:rgba(159,227,197,.7);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:62%;width:84%;height:3.4%;background:rgba(159,227,197,.7);border-radius:2px"></div>' +
        txt(8, 12, 80, '行距 1.4 · 段后 10pt', 12, 'rgba(159,227,197,.92)', 0)
      )
    },
    steps: [
      { text: "选中文本框 → 开始 → 行距（或右键段落）" },
      { text: "正文行距设 1.3–1.5，标题可更大" },
      { text: "段落 → 段后间距设 6–12pt，让段落之间透气" }
    ],
    tips: "行距不是越大越好，正文 1.3 左右最舒服；段间距比行距略大就能区分段落。",
    relatedTerms: ["line-height", "alignment"], demo: "paraBreath"
  },
  {
    id: "export-video", name: "导出为视频（MP4 自动播放）",
    scenario: "效率与交付", level: "进阶",
    summary: "把整份 PPT 导出成 MP4，动画切换都保留，发给谁都能自动播放，不用怕没装软件。",
    before: {
      tag: "改前", desc: "发 .pptx 给对方，没装 PowerPoint 打不开，动画还丢。",
      visual: slide(
        '<div style="position:absolute;left:38%;top:22%;width:24%;height:34%;border-radius:6px;background:rgba(228,77,60,.18);border:1px solid rgba(228,77,60,.5);display:grid;place-items:center;color:#f0a59a;font:600 12px var(--font-body)">.pptx</div>' +
        txt(20, 62, 60, '对方没装 PPT 打不开', 12, 'rgba(240,165,154,.92)', 0)
      )
    },
    after: {
      tag: "改后", desc: "导出 MP4，双击就播，动画切换全在。",
      visual: slide(
        '<div style="position:absolute;left:34%;top:20%;width:32%;height:38%;border-radius:8px;background:linear-gradient(135deg,#1a3300,#1a3300);border:1px solid rgba(102,58,243,.5);display:grid;place-items:center">' +
        '<div style="width:34px;height:34px;border-radius:50%;background:#2f6f3a;display:grid;place-items:center;color:#ffffff;font:14px sans-serif">▶</div></div>' +
        txt(20, 62, 60, '导出 MP4 · 双击就播', 12, 'rgba(159,227,197,.92)', 0)
      )
    },
    steps: [
      { text: "文件 → 导出 → 创建视频（或 另存为 → MPEG-4）" },
      { text: "选分辨率（通常 1080p）和每张幻灯片停留秒数" },
      { text: "用了排练计时 / 旁白就勾「使用录制的计时」，否则用默认秒数" },
      { text: "点创建视频，等渲染完拿到 .mp4" }
    ],
    tips: "视频里的切换 / 动画会按设置播放，但超链接、触发器交互会失效——纯展示没问题。",
    relatedTerms: ["screen-record"], demo: "exportVideo"
  },
  {
    id: "bw-blank", name: "黑屏/白屏快捷键（B/W 键）",
    scenario: "放映与演讲", level: "入门",
    summary: "放映中按 B 黑屏、W 白屏，把注意力全交给观众/投影；按任意键继续。",
    before: {
      tag: "改前", desc: "讲着讲着要留白思考，只能尴尬站着，画面还亮着。",
      visual: slide(
        '<img src="img/tech1.png" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;opacity:.55" />' +
        txt(10, 42, 80, '放映中 · 画面还亮着', 14, '#3a8a8a', 1)
      )
    },
    after: {
      tag: "改后", desc: "按 B 整屏变黑（或 W 变白），讲完按任意键秒回。",
      visual: slide(
        '<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:#1a3300"></div>' +
        txt(10, 44, 84, '按 B 黑屏 / W 白屏 · 任意键继续', 14, 'rgba(216,236,248,.7)', 1)
      )
    },
    steps: [
      { text: "放映时按 B → 整屏黑；按 W → 整屏白" },
      { text: "用来制造留白、聚焦你本人、或遮掉敏感页" },
      { text: "按任意键（或再按一次 B/W）立即回到幻灯片" }
    ],
    tips: "B/W 只黑 / 白当前屏幕，不影响演讲节奏；比关投影仪优雅多了。",
    relatedTerms: ["presenter-view", "section"], demo: "bwBlank"
  },
  {
    id: "ppt-to-word", name: "PPT 一键导出 Word / 讲义（备注页·大纲）",
    scenario: "效率与交付", level: "入门",
    summary: "把 PPT 发给领导或打印成文档？导出为 Word / 讲义，备注和大纲一起带走，格式不散。",
    before: {
      tag: "改前", desc: "领导要可编辑 Word，你只能一张张截图贴，又慢又乱。",
      visual: slide(
        r(10, 14, 80, 54, "#777777", 1) +
        '<div style="position:absolute;left:14%;top:18%;width:18%;height:24%;background:rgba(228,77,60,.18);border:1px solid rgba(228,77,60,.5);border-radius:6px;display:grid;place-items:center;color:#f0a59a;font:11px var(--font-body)">.pptx</div>' +
        '<div style="position:absolute;left:40%;top:30%;width:46%;height:3%;background:rgba(216,236,248,.4);border-radius:2px"></div>' +
        '<div style="position:absolute;left:40%;top:38%;width:40%;height:3%;background:rgba(216,236,248,.28);border-radius:2px"></div>' +
        txt(14, 64, 72, '“发我一份可编辑的 Word”', 12, 'rgba(240,165,154,.9)', 0)
      )
    },
    after: {
      tag: "改后", desc: "文件 → 导出 → 创建讲义（含备注）→ 用 Word 打开，版式工整。",
      visual: slide(
        r(10, 14, 80, 54, "#777777", 1) +
        '<div style="position:absolute;left:14%;top:18%;width:18%;height:24%;background:rgba(102,58,243,.18);border:1px solid rgba(102,58,243,.55);border-radius:6px;display:grid;place-items:center;color:#b9a6ff;font:11px var(--font-body)">.docx</div>' +
        '<div style="position:absolute;left:40%;top:22%;width:46%;height:30%;background:rgba(159,227,197,.12);border:1px dashed rgba(159,227,197,.5);border-radius:4px"></div>' +
        txt(40, 24, 46, '幻灯片 + 备注', 11, 'rgba(159,227,197,.92)', 0) +
        txt(14, 64, 72, 'Word 可编辑 · 备注页都在', 12, 'rgba(159,227,197,.9)', 0)
      )
    },
    steps: [
      { text: "文件 → 导出 → 创建讲义（或用「发送到 Microsoft Word」）" },
      { text: "选版式：备注在幻灯片下方 / 仅大纲 / 空行" },
      { text: "自动用 Word 打开，按需再排版后保存" }
    ],
    tips: "只想留文字骨架用「仅大纲」；要带备注给领导评审用「备注在下方」。",
    relatedTerms: ["notes-page", "outline-view", "word-to-ppt"], demo: "pptToWord"
  },
  {
    id: "auto-recover", name: "自动保存 & 恢复未保存的演示文稿",
    scenario: "效率与交付", level: "入门",
    summary: "崩了 / 没存就关掉？PPT 默认每 10 分钟自动保存，从「管理演示文稿」找回未保存版本。",
    before: {
      tag: "改前", desc: "断电前 40 分钟没存盘，重新打开一片空白，欲哭无泪。",
      visual: slide(
        '<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(228,77,60,.06)"></div>' +
        '<div style="position:absolute;left:38%;top:30%;width:24%;height:24%;border-radius:50%;border:3px solid rgba(228,77,60,.6);display:grid;place-items:center;color:#f0a59a;font:600 20px var(--font-body)">✕</div>' +
        txt(20, 58, 60, '未保存 · 内容丢失', 12, 'rgba(240,165,154,.92)', 0)
      )
    },
    after: {
      tag: "改后", desc: "文件 → 信息 → 管理演示文稿 → 恢复未保存的演示文稿。",
      visual: slide(
        '<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(38,150,132,.07)"></div>' +
        '<div style="position:absolute;left:38%;top:26%;width:24%;height:24%;border-radius:50%;border:3px solid rgba(38,150,132,.6);display:grid;place-items:center;color:#9be3c3;font:600 20px var(--font-body)">✓</div>' +
        txt(16, 56, 68, '恢复未保存的版本', 12, 'rgba(159,227,197,.92)', 0) +
        '<div style="position:absolute;left:24%;top:66%;width:52%;height:3%;background:rgba(159,227,197,.4);border-radius:2px"></div>'
      )
    },
    steps: [
      { text: "重新打开 PPT → 左侧「文档恢复」窗格会列出自动保存的版本" },
      { text: "或 文件 → 信息 → 管理演示文稿 → 恢复未保存的演示文稿" },
      { text: "另存为正式文件，避免下次又被覆盖" }
    ],
    tips: "想更保险：文件 → 选项 → 保存，把「自动保存间隔」调到 3–5 分钟，并勾选「始终创建备份副本」。",
    relatedTerms: ["autosave", "version-history"], demo: "autoRecover"
  },
  {
    id: "slide-size", name: "幻灯片尺寸/比例一键切换（16:9↔4:3）并修复错位",
    scenario: "效率与交付", level: "入门",
    summary: "拿到 4:3 旧稿要改 16:9？改页面设置后一键「最大化」修复错位，别手动拖。",
    before: {
      tag: "改前", desc: "4:3 旧稿直接投 16:9 屏，上下留黑边、内容被裁。",
      visual: slide(
        '<div style="position:absolute;left:14%;top:8%;width:72%;height:84%;background:#777777;border:1px solid rgba(216,236,248,.25);border-radius:4px"></div>' +
        '<div style="position:absolute;left:20%;top:18%;width:60%;height:8%;background:rgba(228,77,60,.5);border-radius:3px"></div>' +
        '<div style="position:absolute;left:20%;top:34%;width:60%;height:5%;background:rgba(216,236,248,.3);border-radius:2px"></div>' +
        '<div style="position:absolute;left:20%;top:44%;width:46%;height:5%;background:rgba(216,236,248,.2);border-radius:2px"></div>' +
        txt(20, 72, 60, '4:3 · 投 16:9 被裁', 11, 'rgba(240,165,154,.9)', 0)
      )
    },
    after: {
      tag: "改后", desc: "设计 → 幻灯片大小 → 16:9，选「最大化」自适应铺满。",
      visual: slide(
        '<div style="position:absolute;left:6%;top:10%;width:88%;height:80%;background:rgba(102,58,243,.07);border:1px solid rgba(102,58,243,.4);border-radius:4px"></div>' +
        '<div style="position:absolute;left:12%;top:18%;width:76%;height:8%;background:rgba(102,58,243,.6);border-radius:3px"></div>' +
        '<div style="position:absolute;left:12%;top:34%;width:76%;height:5%;background:rgba(216,236,248,.4);border-radius:2px"></div>' +
        '<div style="position:absolute;left:12%;top:44%;width:58%;height:5%;background:rgba(216,236,248,.3);border-radius:2px"></div>' +
        txt(12, 72, 76, '16:9 · 铺满不变形', 11, 'rgba(185,166,255,.95)', 0)
      )
    },
    steps: [
      { text: "设计 → 幻灯片大小 → 自定义大小（或 16:9 / 4:3 预设）" },
      { text: "弹出提示选「最大化」（缩放内容铺满，推荐）或「确保适合」（整体缩小）" },
      { text: "切换后检查母版和图片是否溢出，必要时微调" }
    ],
    tips: "「最大化」会拉伸内容铺满，「确保适合」整体缩小留白——投屏优先选最大化。",
    relatedTerms: ["slide-size", "widescreen", "margin"], demo: "slideSize"
  },
  {
    id: "screen-record", name: "屏幕录制（插入 → 屏幕录制）",
    scenario: "效率与交付", level: "入门",
    summary: "不用开录屏软件，PPT 自带「插入 → 屏幕录制」，录操作 / GIF 演示直接进幻灯片。",
    before: {
      tag: "改前", desc: "想录一段操作演示，还得另外装录屏软件、导出再插入。",
      visual: slide(
        '<div style="position:absolute;left:26%;top:24%;width:48%;height:34%;border-radius:8px;background:#777777;border:1px dashed rgba(216,236,248,.35);display:grid;place-items:center;color:rgba(216,236,248,.6);font:11px var(--font-body)">外部录屏软件</div>' +
        txt(26, 64, 48, '还要装软件？', 12, 'rgba(240,165,154,.9)', 0)
      )
    },
    after: {
      tag: "改后", desc: "插入 → 屏幕录制，框选区域，录完直接落到当前页。",
      visual: slide(
        '<div style="position:absolute;left:26%;top:22%;width:48%;height:30%;border-radius:8px;background:linear-gradient(135deg,rgba(102,58,243,.18),rgba(2,125,234,.18));border:1px solid rgba(102,58,243,.5);display:grid;place-items:center;color:#b9a6ff;font:11px var(--font-body)">● REC 录制中</div>' +
        '<div style="position:absolute;left:30%;top:56%;width:40%;height:4%;background:rgba(159,227,197,.4);border-radius:2px"></div>' +
        txt(26, 64, 48, '内置 · 一键入页', 11, 'rgba(159,227,197,.92)', 0)
      )
    },
    steps: [
      { text: "插入 → 屏幕录制（或 视图 → 屏幕录制）" },
      { text: "框选要录的区域，点红色按钮开始，ESC 停止" },
      { text: "录制直接作为视频落在幻灯片，可裁剪 / 设自动播放" }
    ],
    tips: "录制前可勾选「音频 / 指针」；想配旁白就顺便开麦克风，免后期配音。",
    relatedTerms: ["screen-record", "video-insert"], demo: "screenRecord"
  },
  {
    id: "rehearse", name: "排练计时（控制演讲时长）",
    scenario: "放映与演讲", level: "入门",
    summary: "演讲前掐表：幻灯片放映 → 排练计时，自动记录每页用时，正式放映跟着节奏走。",
    before: {
      tag: "改前", desc: "上台才发现讲超时，后半段被砍。",
      visual: slide(
        circ(40, 34, 44, "rgba(228,77,60,.14)") +
        '<div style="position:absolute;left:40%;top:44%;width:20%;text-align:center;color:#f0a59a;font:600 12px var(--font-body)">超时</div>' +
        txt(28, 64, 44, '没掐表 · 讲飞了', 11, 'rgba(240,165,154,.9)', 0)
      )
    },
    after: {
      tag: "改后", desc: "排练计时后每页都有时长，总时长心里有数。",
      visual: slide(
        circ(40, 34, 44, "rgba(38,150,132,.16)") +
        '<div style="position:absolute;left:38%;top:42%;width:24%;text-align:center;color:#9be3c3;font:600 13px var(--font-body)">8:30</div>' +
        '<div style="position:absolute;left:22%;top:62%;width:14%;height:4%;background:rgba(159,227,197,.5);border-radius:2px"></div>' +
        '<div style="position:absolute;left:40%;top:62%;width:18%;height:4%;background:rgba(159,227,197,.4);border-radius:2px"></div>' +
        '<div style="position:absolute;left:62%;top:62%;width:14%;height:4%;background:rgba(159,227,197,.3);border-radius:2px"></div>' +
        txt(28, 70, 44, '每页计时 ✓', 10, 'rgba(159,227,197,.9)', 0)
      )
    },
    steps: [
      { text: "幻灯片放映 → 排练计时（从头放映并模拟演讲）" },
      { text: "每页讲完点「下一项」，PPT 自动记录该页用时" },
      { text: "结束可选「保留计时」，正式放映即按此节奏自动翻页" }
    ],
    tips: "结束排练会问是否保留计时——保留后放映可「使用计时」自动播放，彩排神器。",
    relatedTerms: ["rehearse", "presenter-view"], demo: "rehearse"
  },
  {
    id: "print-handout", name: "打印 / 导出 PDF 讲义（一页多张 + 框线）",
    scenario: "效率与交付", level: "入门",
    summary: "线下会议发材料：文件 → 打印 / 导出 PDF，选「讲义 一页 N 张 + 框线」，省钱又整齐。",
    before: {
      tag: "改前", desc: "一页一张打印，100 页装订成砖头，还费纸。",
      visual: slide(
        '<div style="position:absolute;left:20%;top:16%;width:60%;height:46%;border:1px dashed rgba(228,77,60,.4);border-radius:4px;background:#777777"></div>' +
        txt(26, 66, 48, '1 页 1 张 · 费纸', 11, 'rgba(240,165,154,.9)', 0)
      )
    },
    after: {
      tag: "改后", desc: "讲义一页 6 张 + 框线，A4 正反打，轻便好翻。",
      visual: slide(
        '<div style="position:absolute;left:18%;top:14%;width:64%;height:50%;background:#777777;border-radius:4px"></div>' +
        '<div style="position:absolute;left:20%;top:18%;width:18%;height:18%;border:1px solid rgba(159,227,197,.5);border-radius:3px"></div>' +
        '<div style="position:absolute;left:40%;top:18%;width:18%;height:18%;border:1px solid rgba(159,227,197,.5);border-radius:3px"></div>' +
        '<div style="position:absolute;left:60%;top:18%;width:18%;height:18%;border:1px solid rgba(159,227,197,.5);border-radius:3px"></div>' +
        '<div style="position:absolute;left:20%;top:40%;width:18%;height:18%;border:1px solid rgba(159,227,197,.5);border-radius:3px"></div>' +
        '<div style="position:absolute;left:40%;top:40%;width:18%;height:18%;border:1px solid rgba(159,227,197,.5);border-radius:3px"></div>' +
        '<div style="position:absolute;left:60%;top:40%;width:18%;height:18%;border:1px solid rgba(159,227,197,.5);border-radius:3px"></div>' +
        txt(24, 66, 52, '1 页 6 张 · 带框', 11, 'rgba(159,227,197,.92)', 0)
      )
    },
    steps: [
      { text: "文件 → 打印（或 导出 → 创建 PDF/XPS）" },
      { text: "在「讲义」里选每页张数（常用 3 / 6 张）" },
      { text: "勾选「框架幻灯片」加框线，调好方向后打印 / 导出" }
    ],
    tips: "发给听众复习用 6 张/页 + 框线最省；自己看备注用 3 张/页留白多。",
    relatedTerms: ["print", "notes-page"], demo: "printHandout"
  },
  {
    id: "shape-effect", name: "形状效果：阴影 / 映像 / 发光一键高级感",
    scenario: "图形与图像", level: "入门",
    summary: "纯色块太平面？加阴影 / 映像 / 发光，瞬间有立体感和高级感。",
    before: {
      tag: "改前", desc: "扁平色块贴上去，像没设计过。",
      visual: slide(
        '<div style="position:absolute;left:30%;top:30%;width:40%;height:34%;background:#2f6f3a;border-radius:8px"></div>' +
        txt(30, 70, 40, '纯色 · 平', 12, 'rgba(216,236,248,.6)', 0)
      )
    },
    after: {
      tag: "改后", desc: "加外阴影 + 柔光，立刻浮起来有质感。",
      visual: slide(
        '<div style="position:absolute;left:30%;top:26%;width:40%;height:34%;background:linear-gradient(135deg,#2f6f3a,#2f6f3a;border-radius:8px;box-shadow:0 14px 30px rgba(102,58,243,.45)"></div>' +
        '<div style="position:absolute;left:30%;top:60%;width:40%;height:8%;background:linear-gradient(180deg,rgba(124,92,255,.35),transparent);border-radius:0 0 8px 8px;filter:blur(2px)"></div>' +
        txt(30, 74, 40, '阴影+发光', 11, 'rgba(185,166,255,.95)', 0)
      )
    },
    steps: [
      { text: "选中形状 → 形状格式 → 效果（或右键 → 设置形状格式 → 效果）" },
      { text: "阴影：选预设并调透明度 / 模糊 / 距离；发光：调颜色与大小" },
      { text: "映像：加一层倒影做玻璃/水面质感，别开太重" }
    ],
    tips: "同一页统一一种效果语言（都外阴影 或 都发光），别混搭；发光透明度别超 75% 才不脏。",
    relatedTerms: ["object-effect", "emphasis-fx"], demo: "shapeEffect"
  },
  {
    id: "vertical-text", name: "竖排文字 / 文字方向（中文标题更对味）",
    scenario: "排版与图示", level: "进阶",
    summary: "中文标题、古风页、侧边栏用竖排更对味：文本 → 文字方向 → 竖排。",
    before: {
      tag: "改前", desc: "标题只能横排，古风 / 中国风页怎么摆都别扭。",
      visual: slide(
        txt(20, 30, 60, '年度盛典', 22, 'rgba(216,236,248,.8)', 1) +
        '<div style="position:absolute;left:20%;top:46%;width:50%;height:3%;background:rgba(216,236,248,.3);border-radius:2px"></div>' +
        txt(20, 54, 50, '横排 · 不够味', 11, 'rgba(240,165,154,.85)', 0)
      )
    },
    after: {
      tag: "改后", desc: "文字方向改竖排（从右到左），标题立刻有气势。",
      visual: slide(
        '<div style="position:absolute;left:42%;top:18%;width:16%;height:60%;writing-mode:vertical-rl;text-orientation:upright;display:grid;place-items:center;color:#b9a6ff;font:600 22px var(--font-body);letter-spacing:4px">年度盛典</div>' +
        '<div style="position:absolute;left:40%;top:18%;width:2px;height:60%;background:rgba(185,166,255,.6)"></div>' +
        txt(18, 78, 60, '竖排 · 有气势', 10, 'rgba(159,227,197,.9)', 0)
      )
    },
    steps: [
      { text: "选中文本框 → 开始 / 形状格式 → 文字方向" },
      { text: "选「竖排」（中文常用 竖排-从右到左）" },
      { text: "右侧栏可微调文字方向角度，或转成路径文字" }
    ],
    tips: "竖排配古风/中国风页最佳；西文单词竖排会旋转，建议仅用于中文短标题。",
    relatedTerms: ["vertical-text", "type-scale"], demo: "verticalText"
  },
  {
    id: "custom-bullet", name: "自定义项目符号（图片 / 符号库）",
    scenario: "排版与图示", level: "入门",
    summary: "默认圆点太普通？换成图片 / 符号 / 自定义颜色，列表立刻有品牌感。",
    before: {
      tag: "改前", desc: "清一色默认圆点，列表毫无记忆点。",
      visual: slide(
        '<div style="position:absolute;left:16%;top:24%;width:4%;height:4%;border-radius:50%;background:rgba(216,236,248,.5)"></div>' +
        '<div style="position:absolute;left:24%;top:24%;width:50%;height:4%;background:rgba(216,236,248,.3);border-radius:2px"></div>' +
        '<div style="position:absolute;left:16%;top:40%;width:4%;height:4%;border-radius:50%;background:rgba(216,236,248,.5)"></div>' +
        '<div style="position:absolute;left:24%;top:40%;width:50%;height:4%;background:rgba(216,236,248,.3);border-radius:2px"></div>' +
        '<div style="position:absolute;left:16%;top:56%;width:4%;height:4%;border-radius:50%;background:rgba(216,236,248,.5)"></div>' +
        '<div style="position:absolute;left:24%;top:56%;width:50%;height:4%;background:rgba(216,236,248,.3);border-radius:2px"></div>'
      )
    },
    after: {
      tag: "改后", desc: "换成品牌色符号 / 小图标，列表变精致。",
      visual: slide(
        txt(16, 23, 6, '◆', 14, 'rgba(159,227,197,.95)', 0) +
        '<div style="position:absolute;left:26%;top:24%;width:50%;height:4%;background:rgba(159,227,197,.4);border-radius:2px"></div>' +
        txt(16, 39, 6, '✓', 14, 'rgba(159,227,197,.95)', 0) +
        '<div style="position:absolute;left:26%;top:40%;width:50%;height:4%;background:rgba(159,227,197,.4);border-radius:2px"></div>' +
        txt(16, 55, 6, '➜', 14, 'rgba(159,227,197,.95)', 0) +
        '<div style="position:absolute;left:26%;top:56%;width:50%;height:4%;background:rgba(159,227,197,.4);border-radius:2px"></div>'
      )
    },
    steps: [
      { text: "选中文本 → 开始 → 项目符号 → 项目符号和编号" },
      { text: "字符：挑符号字体里的图标；图片：导入小图标当符号" },
      { text: "改颜色 / 大小，统一全篇列表风格" }
    ],
    tips: "全篇列表建议统一一种符号语言；用品牌主色做符号色，比花花绿绿更专业。",
    relatedTerms: ["bullet", "font-pairing"], demo: "customBullet"
  },
  {
    id: "default-shape", name: "设为默认形状 / 默认颜色（一次设定终身套用）",
    scenario: "效率与交付", level: "进阶",
    summary: "每次插入都手动改格式？右键形状 → 设置为默认形状，以后插入自动套用。",
    before: {
      tag: "改前", desc: "每次插矩形都要重改填充/描边，重复十几次。",
      visual: slide(
        '<div style="position:absolute;left:18%;top:22%;width:26%;height:22%;border:1px solid rgba(216,236,248,.4);border-radius:6px"></div>' +
        '<div style="position:absolute;left:20%;top:26%;width:22%;height:3%;background:rgba(240,165,154,.7);border-radius:2px"></div>' +
        '<div style="position:absolute;left:52%;top:22%;width:26%;height:22%;border:1px solid rgba(216,236,248,.4);border-radius:6px"></div>' +
        '<div style="position:absolute;left:54%;top:26%;width:22%;height:3%;background:rgba(240,165,154,.7);border-radius:2px"></div>' +
        txt(18, 52, 60, '插入 1 个改 1 次', 11, 'rgba(240,165,154,.9)', 0)
      )
    },
    after: {
      tag: "改后", desc: "右键→设为默认形状，后续插入自动带样式。",
      visual: slide(
        '<div style="position:absolute;left:18%;top:22%;width:24%;height:22%;background:linear-gradient(135deg,#2f6f3a,#2f6f3a;border-radius:6px;box-shadow:0 8px 18px rgba(102,58,243,.4)"></div>' +
        '<div style="position:absolute;left:46%;top:22%;width:24%;height:22%;background:linear-gradient(135deg,#2f6f3a,#2f6f3a;border-radius:6px;box-shadow:0 8px 18px rgba(102,58,243,.4)"></div>' +
        '<div style="position:absolute;left:74%;top:22%;width:10%;height:22%;background:linear-gradient(135deg,#2f6f3a,#2f6f3a;border-radius:6px;box-shadow:0 8px 18px rgba(102,58,243,.4)"></div>' +
        txt(18, 52, 66, '插入即套用 ✓', 11, 'rgba(159,227,197,.92)', 0)
      )
    },
    steps: [
      { text: "把形状调成想要的填充 / 描边 / 效果" },
      { text: "右键该形状 → 设置为默认形状" },
      { text: "之后插入同类型形状自动套用，改主题色也跟着变" }
    ],
    tips: "只对「当前形状类型」生效（矩形默认 ≠ 圆形默认）；想整页统一更推荐用母版/主题色。",
    relatedTerms: ["autoshape", "format-painter"], demo: "defaultShape"
  }
];

if (typeof window !== 'undefined') window.TECHNIQUES = TECHNIQUES;
