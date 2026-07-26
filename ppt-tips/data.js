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

const TECHNIQUES = [
  /* ===================== 职场汇报 ===================== */
  {
    id: "theme-unify", name: "用主题+母版一键统一风格",
    scenario: "职场汇报", level: "入门",
    summary: "改一处，全篇几十页的颜色字体一起变，告别逐页手动调。",
    before: {
      tag: "改前", desc: "每页手动改色改字，风格越改越乱、对不齐。",
      visual: slide(
        r(8, 16, 50, 9, "#e4483c", .85) + r(8, 32, 70, 5, "rgba(255,255,255,.18)") +
        r(8, 52, 84, 4, "rgba(255,255,255,.12)") +
        '<div style="position:absolute;bottom:8%;right:8%;font:11px var(--font-mono);color:rgba(255,255,255,.4)">第 1 页 · 红</div>' +
        '<div style="position:absolute;top:40%;right:6%;width:30%;height:30%;background:#22c55e;border-radius:6px;opacity:.8"></div>'
      )
    },
    after: {
      tag: "改后", desc: "改主题/母版一次，全篇同步换装。",
      visual: slide(
        r(8, 16, 50, 9, "#663af3", .9) + r(8, 32, 70, 5, "rgba(255,255,255,.2)") +
        r(8, 52, 84, 4, "rgba(255,255,255,.13)") +
        '<div style="position:absolute;bottom:8%;right:8%;font:11px var(--font-mono);color:rgba(255,255,255,.4)">第 1 页 · 紫</div>' +
        '<div style="position:absolute;top:40%;right:6%;width:30%;height:30%;background:#663af3;border-radius:6px;opacity:.85"></div>'
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
    scenario: "职场汇报", level: "入门",
    summary: "多个元素一键对齐到同一条线，别再用肉眼慢慢拖。",
    before: {
      tag: "改前", desc: "三个按钮高低不齐，靠肉眼拖永远差一点点。",
      visual: slide(
        '<div style="position:absolute;left:10%;top:30%;width:22%;height:14%;background:#e4483c;border-radius:6px;opacity:.8"></div>' +
        '<div style="position:absolute;left:40%;top:46%;width:22%;height:14%;background:#e4483c;border-radius:6px;opacity:.8"></div>' +
        '<div style="position:absolute;left:70%;top:24%;width:22%;height:14%;background:#e4483c;border-radius:6px;opacity:.8"></div>'
      )
    },
    after: {
      tag: "改后", desc: "一键顶端对齐 + 横向分布，整齐如一。",
      visual: slide(
        '<div style="position:absolute;left:10%;top:40%;width:22%;height:14%;background:#663af3;border-radius:6px;opacity:.85"></div>' +
        '<div style="position:absolute;left:40%;top:40%;width:22%;height:14%;background:#663af3;border-radius:6px;opacity:.85"></div>' +
        '<div style="position:absolute;left:70%;top:40%;width:22%;height:14%;background:#663af3;border-radius:6px;opacity:.85"></div>' +
        '<div style="position:absolute;left:8%;top:34%;width:84%;height:1px;background:rgba(216,236,248,.5)"></div>'
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
    scenario: "职场汇报", level: "入门",
    summary: "填文字自动排出组织架构/流程，不用手动对齐一堆框。",
    before: {
      tag: "改前", desc: "手画几个框加连线，歪歪扭扭还对不齐。",
      visual: slide(
        '<div style="position:absolute;left:12%;top:18%;width:24%;height:16%;background:#e4483c;border-radius:6px;opacity:.7"></div>' +
        '<div style="position:absolute;left:58%;top:18%;width:24%;height:16%;background:#e4483c;border-radius:6px;opacity:.7"></div>' +
        '<div style="position:absolute;left:35%;top:58%;width:24%;height:16%;background:#e4483c;border-radius:6px;opacity:.7"></div>' +
        '<div style="position:absolute;left:20%;top:34%;width:2px;height:18%;background:rgba(255,255,255,.3);transform:rotate(30deg)"></div>'
      )
    },
    after: {
      tag: "改后", desc: "SmartArt 自动排版，统一又整齐。",
      visual: slide(
        '<div style="position:absolute;left:10%;top:20%;width:22%;height:15%;background:#663af3;border-radius:6px;opacity:.85"></div>' +
        '<div style="position:absolute;left:60%;top:20%;width:22%;height:15%;background:#663af3;border-radius:6px;opacity:.85"></div>' +
        '<div style="position:absolute;left:35%;top:58%;width:22%;height:15%;background:#663af3;border-radius:6px;opacity:.85"></div>' +
        '<div style="position:absolute;left:32%;top:28%;width:24%;height:2px;background:rgba(216,236,248,.6)"></div>' +
        '<div style="position:absolute;left:32%;top:27%;width:2px;height:30%;background:rgba(216,236,248,.6)"></div>'
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
    scenario: "答辩演讲", level: "进阶",
    summary: "做一个能点的目录页，按观众兴趣跳章节，不用死翻。",
    before: {
      tag: "改前", desc: "普通文字目录，不能点，只能顺序翻。",
      visual: slide(
        txt(10, 24, 70, "目录", 22, "rgba(216,236,248,.85)", true) +
        txt(12, 44, 70, "1. 背景", 14, "rgba(255,255,255,.5)") +
        txt(12, 56, 70, "2. 方案", 14, "rgba(255,255,255,.5)") +
        txt(12, 68, 70, "3. 总结", 14, "rgba(255,255,255,.5)")
      )
    },
    after: {
      tag: "改后", desc: "目录页带缩略图，点哪跳哪。",
      visual: slide(
        txt(10, 14, 70, "目录", 18, "rgba(216,236,248,.85)", true) +
        '<div style="position:absolute;left:12%;top:40%;width:22%;height:26%;background:#663af3;border-radius:6px;opacity:.8"></div>' +
        '<div style="position:absolute;left:39%;top:40%;width:22%;height:26%;background:#027dea;border-radius:6px;opacity:.8"></div>' +
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
    scenario: "答辩演讲", level: "入门",
    summary: "一页多个要点依次出现，避免一次性糊观众脸上。",
    before: {
      tag: "改前", desc: "所有要点同时出现，一打开就糊成一团。",
      visual: slide(
        txt(10, 22, 80, "· 要点一 · 要点二", 15, "rgba(255,255,255,.7)") +
        txt(10, 40, 80, "· 要点三 · 要点四", 15, "rgba(255,255,255,.7)") +
        txt(10, 58, 80, "· 要点五 · 要点六", 15, "rgba(255,255,255,.7)")
      )
    },
    after: {
      tag: "改后", desc: "要点按顺序 / 点击逐条出现。",
      visual: slide(
        txt(10, 22, 80, "· 要点一", 15, "#9fe3c5") +
        txt(10, 40, 80, "· 要点二", 15, "#9fe3c5") +
        '<div style="position:absolute;left:10%;top:56%;width:6%;height:5%;background:#663af3;border-radius:3px;opacity:.8"></div>' +
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
    scenario: "答辩演讲", level: "进阶",
    summary: "长答辩按章节分组，整节跳过或跳转不迷路。",
    before: {
      tag: "改前", desc: "60 页扁平列表，找不到章在哪。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:18%;width:84%;height:4%;background:rgba(255,255,255,.12);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:28%;width:84%;height:4%;background:rgba(255,255,255,.12);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:38%;width:84%;height:4%;background:rgba(255,255,255,.12);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:48%;width:84%;height:4%;background:rgba(255,255,255,.12);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:58%;width:84%;height:4%;background:rgba(255,255,255,.12);border-radius:2px"></div>'
      )
    },
    after: {
      tag: "改后", desc: "缩略图按节折叠分组，整节快进。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:18%;width:84%;height:7%;background:#663af3;border-radius:5px;opacity:.85"></div>' +
        '<div style="position:absolute;left:12%;top:30%;width:80%;height:4%;background:rgba(255,255,255,.12);border-radius:2px"></div>' +
        '<div style="position:absolute;left:12%;top:38%;width:80%;height:4%;background:rgba(255,255,255,.12);border-radius:2px"></div>' +
        '<div style="position:absolute;left:8%;top:50%;width:84%;height:7%;background:#027dea;border-radius:5px;opacity:.85"></div>' +
        '<div style="position:absolute;left:12%;top:62%;width:80%;height:4%;background:rgba(255,255,255,.12);border-radius:2px"></div>'
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
    scenario: "教学课件", level: "进阶",
    summary: "两个形状联合/相减/相交，拼出软件没有的图。",
    before: {
      tag: "改前", desc: "现成图标库没有想要的图形，方片凑很难看。",
      visual: slide(
        '<div style="position:absolute;left:34%;top:34%;width:32%;height:32%;border:2px solid #e4483c;border-radius:50%;opacity:.85"></div>' +
        '<div style="position:absolute;left:34%;top:34%;width:32%;height:32%;background:#e4483c;border-radius:6px;opacity:.4"></div>'
      )
    },
    after: {
      tag: "改后", desc: "两圆相减，得到干净圆环箭头。",
      visual: slide(
        '<div style="position:absolute;left:34%;top:34%;width:32%;height:32%;border:14px solid #663af3;border-radius:50%;box-sizing:border-box;opacity:.9"></div>' +
        '<div style="position:absolute;left:62%;top:34%;width:14%;height:14%;background:#663af3;clip-path:polygon(0 30%,70% 30%,70% 0,100% 50%,70% 100%,70% 70%,0 70%);"></div>'
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
    scenario: "教学课件", level: "入门",
    summary: "从 Logo 吸出品牌色填文字，绝不跑色。",
    before: {
      tag: "改前", desc: "文字用了近似色，和 Logo 有色偏。",
      visual: slide(
        '<div style="position:absolute;left:10%;top:24%;width:18%;height:18%;background:#f59e0b;border-radius:8px;opacity:.9"></div>' +
        txt(34, 26, 55, "优卡说PPT", 18, "#e6b35a", true) +
        txt(10, 56, 80, "标题用了近似黄，和 Logo 差一口气", 13, "rgba(255,255,255,.5)")
      )
    },
    after: {
      tag: "改后", desc: "吸管从 Logo 取色，文字同色系。",
      visual: slide(
        '<div style="position:absolute;left:10%;top:24%;width:18%;height:18%;background:#f59e0b;border-radius:8px;opacity:.95"></div>' +
        txt(34, 26, 55, "优卡说PPT", 18, "#f59e0b", true) +
        txt(10, 56, 80, "标题 = Logo 品牌色，完全一致", 13, "rgba(255,255,255,.6)")
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
    scenario: "教学课件", level: "进阶",
    summary: "几十页一次加好 Logo 和页码，不用逐页贴。",
    before: {
      tag: "改前", desc: "每页手动贴 Logo/页码，位置还不一。",
      visual: slide(
        '<div style="position:absolute;left:6%;top:6%;width:10%;height:8%;background:#e4483c;border-radius:4px;opacity:.7"></div>' +
        '<div style="position:absolute;right:6%;bottom:6%;font:11px var(--font-mono);color:rgba(255,255,255,.4)">1</div>' +
        '<div style="position:absolute;left:40%;top:46%;width:30%;height:5%;background:rgba(255,255,255,.14);border-radius:3px"></div>'
      )
    },
    after: {
      tag: "改后", desc: "母版一次加，所有页统一带。",
      visual: slide(
        '<div style="position:absolute;left:6%;top:6%;width:10%;height:8%;background:#663af3;border-radius:4px;opacity:.85"></div>' +
        '<div style="position:absolute;right:6%;bottom:6%;font:11px var(--font-mono);color:rgba(216,236,248,.6)">1</div>' +
        '<div style="position:absolute;left:6%;bottom:6%;width:20%;height:3%;background:rgba(216,236,248,.3);border-radius:2px"></div>' +
        '<div style="position:absolute;left:40%;top:46%;width:30%;height:5%;background:rgba(255,255,255,.18);border-radius:3px"></div>'
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
    scenario: "产品发布", level: "入门",
    summary: "留白 + 大字标题 + 严格对齐，三步入门产品感。",
    before: {
      tag: "改前", desc: "封面堆满元素、字小、杂乱无重点。",
      visual: slide(
        txt(8, 14, 80, "新品发布会", 13, "rgba(255,255,255,.6)") +
        txt(8, 30, 80, "2026 春季", 12, "rgba(255,255,255,.4)") +
        '<div style="position:absolute;left:8%;top:50%;width:30%;height:18%;background:#e4483c;border-radius:6px;opacity:.6"></div>' +
        '<div style="position:absolute;left:42%;top:62%;width:20%;height:12%;background:#22c55e;border-radius:6px;opacity:.6"></div>' +
        txt(8, 82, 80, "时间：3月 地点：杭州", 11, "rgba(255,255,255,.4)")
      )
    },
    after: {
      tag: "改后", desc: "大留白 + 超大标题 + 同线对齐。",
      visual: slide(
        txt(10, 30, 84, "全新发布", 40, "rgba(216,236,248,.92)", true) +
        txt(10, 50, 84, "为创作而生", 16, "rgba(199,211,234,.6)") +
        '<div style="position:absolute;left:10%;top:64%;width:18%;height:10%;background:#663af3;border-radius:6px;opacity:.9"></div>' +
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
    scenario: "产品发布", level: "进阶",
    summary: "用合并形状把图片裁成圆/异形，告别方形硬边。",
    before: {
      tag: "改前", desc: "方形硬边图，和圆角版面不搭。",
      visual: slide(
        '<div style="position:absolute;left:30%;top:26%;width:40%;height:40%;background:linear-gradient(135deg,#e4483c,#f59e0b);border-radius:2px;opacity:.8"></div>' +
        '<div style="position:absolute;left:30%;top:26%;width:40%;height:40%;border:1px solid rgba(255,255,255,.3)"></div>'
      )
    },
    after: {
      tag: "改后", desc: "裁成圆形，融入版面更精致。",
      visual: slide(
        '<div style="position:absolute;left:33%;top:29%;width:34%;height:34%;border-radius:50%;background:linear-gradient(135deg,#663af3,#027dea);opacity:.92"></div>' +
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
    scenario: "产品发布", level: "入门",
    summary: "一句短句 + 一个图标，比一整段字一眼就懂。",
    before: {
      tag: "改前", desc: "一页塞满段落文字，没人看。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:18%;width:84%;height:14%;background:rgba(255,255,255,.12);border-radius:4px"></div>' +
        '<div style="position:absolute;left:8%;top:38%;width:84%;height:14%;background:rgba(255,255,255,.12);border-radius:4px"></div>' +
        '<div style="position:absolute;left:8%;top:58%;width:84%;height:14%;background:rgba(255,255,255,.12);border-radius:4px"></div>'
      )
    },
    after: {
      tag: "改后", desc: "3 个「图标+短句」卡片，扫一眼就懂。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:20%;width:26%;height:30%;background:rgba(102,58,243,.18);border:1px solid rgba(102,58,243,.4);border-radius:8px"></div>' +
        '<div style="position:absolute;left:37%;top:20%;width:26%;height:30%;background:rgba(2,125,234,.18);border:1px solid rgba(2,125,234,.4);border-radius:8px"></div>' +
        '<div style="position:absolute;left:66%;top:20%;width:26%;height:30%;background:rgba(38,150,132,.18);border:1px solid rgba(38,150,132,.4);border-radius:8px"></div>' +
        circ(16, 28, 14, "#663af3") + circ(45, 28, 14, "#027dea") + circ(74, 28, 14, "#269684")
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

  /* ===================== 效率与交付（新增场景） ===================== */
  {
    id: "embed-font", name: "嵌入字体防变样",
    scenario: "效率与交付", level: "入门",
    summary: "文件发给别人字体变了？勾选嵌入，换电脑也原样。",
    before: {
      tag: "改前", desc: "用了非系统字体却没嵌入，对方电脑一打开变宋体。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:16%;width:28%;height:7%;background:#e4483c;border-radius:4px;opacity:.85"></div>' +
        txt(8, 38, 80, "优卡说PPT", 22, "#e6b35a", true) +
        '<div style="position:absolute;left:8%;top:66%;font:12px var(--font-mono);color:#f0a59a">⚠ 对方无此字体 → 全变宋体</div>'
      )
    },
    after: {
      tag: "改后", desc: "勾选嵌入字体，任何电脑都原样显示。",
      visual: slide(
        '<div style="position:absolute;left:8%;top:16%;width:28%;height:7%;background:#663af3;border-radius:4px;opacity:.9"></div>' +
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
        '<div style="position:absolute;left:10%;top:30%;width:20%;height:14%;background:#e4483c;border-radius:6px;opacity:.7"></div>' +
        '<div style="position:absolute;left:44%;top:50%;width:20%;height:14%;background:#e4483c;border-radius:6px;opacity:.7"></div>' +
        '<div style="position:absolute;left:70%;top:26%;width:20%;height:14%;background:#e4483c;border-radius:6px;opacity:.7"></div>' +
        '<div style="position:absolute;left:8%;top:72%;font:12px var(--font-mono);color:#f0a59a">重复操作 ×N，慢</div>'
      )
    },
    after: {
      tag: "改后", desc: "快捷键流：连刷、复制、对齐一气呵成。",
      visual: slide(
        '<div style="position:absolute;left:10%;top:34%;width:20%;height:14%;background:#663af3;border-radius:6px;opacity:.85"></div>' +
        '<div style="position:absolute;left:40%;top:34%;width:20%;height:14%;background:#663af3;border-radius:6px;opacity:.85"></div>' +
        '<div style="position:absolute;left:70%;top:34%;width:20%;height:14%;background:#663af3;border-radius:6px;opacity:.85"></div>' +
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
        '<div style="position:absolute;left:30%;top:22%;width:40%;height:40%;background:linear-gradient(135deg,#e4483c,#f59e0b);border-radius:4px;opacity:.5;filter:blur(2px)"></div>' +
        '<div style="position:absolute;left:8%;top:72%;font:12px var(--font-mono);color:#f0a59a">图糊 · 文件 86MB</div>'
      )
    },
    after: {
      tag: "改后", desc: "超大型导出保高清，压缩后体积骤降。",
      visual: slide(
        '<div style="position:absolute;left:33%;top:25%;width:34%;height:34%;background:linear-gradient(135deg,#663af3,#027dea);border-radius:4px;opacity:.95"></div>' +
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
    scenario: "答辩演讲", level: "进阶",
    summary: "两页同元素加「平滑」，自动位移/变形，高级感拉满。",
    before: {
      tag: "改前", desc: "翻页硬切，元素凭空跳变，没过渡。",
      visual: slide(
        txt(10, 30, 70, "2026 目标", 18, "#f0a59a", true) +
        '<div style="position:absolute;left:60%;top:56%;width:24%;height:16%;background:#e4483c;border-radius:6px;opacity:.5"></div>' +
        '<div style="position:absolute;left:8%;top:74%;font:12px var(--font-mono);color:#f0a59a">跳转硬切，无过渡</div>'
      )
    },
    after: {
      tag: "改后", desc: "平滑切换：元素自动从旧位置过渡到新位置。",
      visual: slide(
        txt(10, 22, 70, "2026 目标", 16, "#9fe3c5", true) +
        '<div style="position:absolute;left:36%;top:48%;width:28%;height:18%;background:#663af3;border-radius:6px;opacity:.9"></div>' +
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
    scenario: "职场汇报", level: "进阶",
    summary: "去网格线、改品牌色、加数据标签，默认丑图表变高级。",
    before: {
      tag: "改前", desc: "默认灰图表：网格线乱、无数据标签。",
      visual: slide(
        '<div style="position:absolute;left:12%;top:30%;width:8%;height:50%;background:rgba(255,255,255,.3)"></div>' +
        '<div style="position:absolute;left:28%;top:46%;width:8%;height:34%;background:rgba(255,255,255,.3)"></div>' +
        '<div style="position:absolute;left:44%;top:22%;width:8%;height:58%;background:rgba(255,255,255,.3)"></div>' +
        '<div style="position:absolute;left:60%;top:38%;width:8%;height:42%;background:rgba(255,255,255,.3)"></div>' +
        '<div style="position:absolute;left:12%;top:18%;width:56%;height:1px;background:rgba(255,255,255,.18)"></div>' +
        '<div style="position:absolute;left:8%;top:84%;font:11px var(--font-mono);color:#f0a59a">默认灰图表 · 无标签</div>'
      )
    },
    after: {
      tag: "改后", desc: "去网格、品牌色、数据标签，清爽高级。",
      visual: slide(
        '<div style="position:absolute;left:12%;top:30%;width:8%;height:50%;background:#663af3;border-radius:3px 3px 0 0"></div>' +
        '<div style="position:absolute;left:28%;top:46%;width:8%;height:34%;background:#663af3;border-radius:3px 3px 0 0"></div>' +
        '<div style="position:absolute;left:44%;top:22%;width:8%;height:58%;background:#9fe3c5;border-radius:3px 3px 0 0"></div>' +
        '<div style="position:absolute;left:60%;top:38%;width:8%;height:42%;background:#663af3;border-radius:3px 3px 0 0"></div>' +
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
    scenario: "教学课件", level: "进阶",
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
        '<div style="position:absolute;left:10%;top:48%;width:30%;height:12%;background:#663af3;border-radius:6px;opacity:.85;display:grid;place-items:center;color:#fff;font:12px var(--font-body)">显示答案</div>' +
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
  }
];

if (typeof window !== 'undefined') window.TECHNIQUES = TECHNIQUES;
