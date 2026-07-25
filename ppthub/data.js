/* ============================================================
   PPThub — Term data
   每条词: { id, name, alias, category, level, summary, detail, scenario, related[], demo }
   demo 字段对应 demos.js 中的同名函数
   ============================================================ */

const TERMS = [
  /* ============ 软件功能 ============ */
  {
    id: "master", name: "母版", alias: "Slide Master",
    category: "软件功能", level: "进阶",
    summary: "改一处，全套幻灯片一起变——它是所有页面的「总模板」。",
    detail: "母版（Slide Master）是演示文稿底层的统一模板。在母版里放的 Logo、页脚、配色、字体，会出现在每一页；改母版，所有套用它的页面同步更新。它管的是「共性」，单页管的是「个性」。",
    scenario: "做公司汇报、课程讲义等几十页的文档时，先定母版再填内容，后期整体换风格只要动一次。",
    related: ["layout", "placeholder", "section"], demo: "master"
  },
  {
    id: "layout", name: "版式", alias: "Slide Layout",
    category: "软件功能", level: "入门",
    summary: "页面上预置的「标题放哪、正文放哪」的框框组合。",
    detail: "版式是母版下预设的内容骨架，比如「标题幻灯片」「标题+内容」「空白」。套用不同版式，占位符的位置和数量就变了，但都继承母版的统一风格。",
    scenario: "新建一页时，先选对版式（封面用标题版式、列表页用内容版式），比手动拖框快得多。",
    related: ["master", "placeholder"], demo: "layout"
  },
  {
    id: "placeholder", name: "占位符", alias: "Placeholder",
    category: "软件功能", level: "入门",
    summary: "页面上虚线框起的「这里该填标题/这里该放图」的预留位。",
    detail: "占位符是版式里预先画好的虚线区域，标着「单击此处添加标题」。它规定了内容的类型和位置，你往里填字、插图就会自动套用对应样式。",
    scenario: "套用标题版式后，直接在占位符里打字，标题字号、位置都自动统一，不用手动调。",
    related: ["layout", "master"], demo: "placeholder"
  },
  {
    id: "animation-pane", name: "动画窗格", alias: "Animation Pane",
    category: "软件功能", level: "入门",
    summary: "右侧那列「谁先动、谁后动、动多久」的时间清单。",
    detail: "动画窗格把一页里所有加了动画的对象按播放顺序列出来，你能拖动调顺序、设「单击开始/上一动画之后/与上一动画同时」，还能改时长和延迟。它是控制动画节奏的中控台。",
    scenario: "一页有多个元素要依次出现时，用动画窗格排好顺序，避免全堆在一起乱跳。",
    related: ["anim-type", "timeline", "trigger"], demo: "animation-pane"
  },
  {
    id: "guides", name: "参考线", alias: "Smart Guides",
    category: "软件功能", level: "入门",
    summary: "拖动元素时自动冒出来的虚线，帮你和别的东西「对齐到同一条线」。",
    detail: "参考线是画布上的辅助线（常是中央十字）。移动元素靠近时，软件会显示临时智能参考线，提示你与另一元素左对齐、居中对齐或间距相等。它不打印、不占位，纯为对齐服务。",
    scenario: "把两个按钮摆到同一水平线、或让标题居中时，靠参考线一键吸附，比肉眼估准。",
    related: ["alignment", "distribute"], demo: "guides"
  },
  {
    id: "boolean", name: "布尔运算", alias: "Boolean Operations",
    category: "软件功能", level: "进阶",
    summary: "把两个形状「联合/相减/相交」，拼出软件原本没有的奇怪图形。",
    detail: "布尔运算（合并形状）对两个及以上重叠图形做集合运算：联合（合并）、组合（去重叠）、拆分、相交（只留重叠）、减除（用上层的挖下层）。它是用基础图形造复杂图标的核心手段。",
    scenario: "想画一个「圆环缺口箭头」「汉字笔画形状」这类现成没有的图，就用布尔运算拼。",
    related: ["icon-style"], demo: "boolean"
  },
  {
    id: "eyedropper", name: "取色器", alias: "Eyedropper",
    category: "软件功能", level: "入门",
    summary: "吸管工具——点一下画面上的任意颜色，就把它「复制」过来用。",
    detail: "取色器（吸管）能从图片、形状、甚至网页任意位置吸取颜色，赋给当前选中的对象。它保证你用的色和素材里的一模一样，避免「差一点点」的色偏。",
    scenario: "Logo 是品牌橙，正文想用同色系，用吸管从 Logo 吸出来填文字，绝不跑色。",
    related: ["color-reuse", "tri-color"], demo: "eyedropper"
  },
  {
    id: "smartart", name: "SmartArt", alias: "SmartArt Graphic",
    category: "软件功能", level: "入门",
    summary: "内置的「流程图/层级图/循环图」智能图示，填文字就自动排好。",
    detail: "SmartArt 是一套预设的逻辑图示库：列表、流程、循环、层次结构、关系等。你只管填文字，它自动排版并保持统一风格。需要精细改造时还能「转换为形状」拆解编辑。",
    scenario: "要画「公司组织架构」「项目流程」又不想手动对齐一堆框，SmartArt 三秒出图。",
    related: ["smartart-to-shape", "chart-beauty"], demo: "smartart"
  },
  {
    id: "section", name: "节", alias: "Section",
    category: "软件功能", level: "进阶",
    summary: "给幻灯片分「第1部分/第2部分」的文件夹式分组，方便管理和跳转。",
    detail: "节（Section）在缩略图列表里把若干页归为一组，可整体折叠、重命名、移动。长文档靠它划分章节，导航和放映都更清晰。",
    scenario: "一场 60 页的分享会分「背景/方案/总结」三节，放映时能整节跳过或跳转。",
    related: ["master", "hyperlink"], demo: "section"
  },
  {
    id: "zoom-loc", name: "幻灯片缩放定位", alias: "Summary Zoom",
    category: "软件功能", level: "进阶",
    summary: "做一个「目录页」，点哪个缩略图就跳到哪一节，还能杀回目录。",
    detail: "缩放定位（Zoom）在页面里嵌入其他幻灯片的实时缩略图，点击即跳转过去播放，结束后可返回原处。常用于做可交互的目录、非线性导航的演示。",
    scenario: "路演时按观众兴趣点目录挑章节讲，而不是死板地从头翻到尾。",
    related: ["hyperlink", "section"], demo: "zoom-loc"
  },
  {
    id: "theme", name: "主题", alias: "Theme",
    category: "软件功能", level: "进阶",
    summary: "一套「配色 + 字体 + 效果」的整体皮肤，换主题=全篇一键换装。",
    detail: "主题（Theme）是比母版更上层的整体风格包：主题颜色（一组配色）、主题字体（标题+正文字体对）、主题效果（阴影/线条质感）打包在一起。切换主题，全篇的颜色和字体同步改头换面。它和母版分工——主题管「用什么色什么字」，母版管「元素摆在哪」。",
    scenario: "同一份内容想试深色/浅色两种风格，切两套主题秒切，不用逐页改色。",
    related: ["master", "color-reuse", "tri-color"], demo: "theme"
  },
  {
    id: "selection-pane", name: "选择窗格", alias: "Selection Pane",
    category: "软件功能", level: "进阶",
    summary: "把一页里所有对象列成清单，点眼睛就能显示/隐藏、还能改叠放顺序。",
    detail: "选择窗格（Selection Pane）列出当前页每个对象，可逐个重命名、用「眼睛」图标切换显示隐藏、上下拖动改层级。对象一多、互相压住选不中时，它是救命工具。",
    scenario: "一页叠了十几个图层想单独选中被压在底下的那个，开选择窗格点一下就中。",
    related: ["z-order", "group", "animation-pane"], demo: "selection-pane"
  },
  {
    id: "z-order", name: "层级 / 置于顶层底层", alias: "Z-Order / Arrange",
    category: "软件功能", level: "入门",
    summary: "多个对象重叠时，谁盖住谁——用「置于顶层/底层」调前后顺序。",
    detail: "层级（Z 轴顺序）决定重叠对象的前后遮挡关系。「置于顶层/底层」「上移一层/下移一层」控制谁在前谁在后。它和「选择窗格」「组合」并称对象管理三件套。",
    scenario: "文字被图片盖住看不见？把文字「置于顶层」或把图片「置于底层」即可。",
    related: ["selection-pane", "group"], demo: "z-order"
  },
  {
    id: "group", name: "组合 / 取消组合", alias: "Group / Ungroup",
    category: "软件功能", level: "入门",
    summary: "把多个对象「焊」成一个整体，一起移动缩放不散架。",
    detail: "组合（Group，Ctrl+G）把选中的多个对象绑成一个整体，移动、缩放、复制时保持相对位置不变；取消组合（Ctrl+Shift+G）拆回单件。做好的图标、卡片组合起来搬运最省心。",
    scenario: "拼好的一组「图标+文字+底框」组合后整体拖动，不会错位散开。",
    related: ["z-order", "selection-pane"], demo: "group"
  },
  {
    id: "designer", name: "设计器", alias: "Design Ideas",
    category: "软件功能", level: "入门",
    summary: "填完内容点一下，软件自动给你几套排好版的设计方案挑。",
    detail: "设计器（Designer）是 PowerPoint 的智能排版助手：你放上文字或图片，它自动生成多套专业版式建议（配图、图示化、留白重构），点选即用。适合快速出稿、给没设计经验的人兜底。",
    scenario: "堆了一段文字懒得排版，开设计器选一套现成好看的版式，一秒变精致。",
    related: ["smartart", "layout", "theme"], demo: "designer"
  },
  {
    id: "reuse-slides", name: "复用幻灯片", alias: "Reuse Slides",
    category: "软件功能", level: "进阶",
    summary: "从别的文件里「捞」现成的页面进来，还能自动套用当前主题。",
    detail: "复用幻灯片（Reuse Slides）能把另一份 .pptx 里的页面直接插进当前文稿，可勾选「保留源格式」或让它套用当前主题。相比复制粘贴，它更规整，是搭建模板库、跨文件拼稿的效率工具。",
    scenario: "把历次做过的经典页存成一个「素材库文件」，做新稿时随时复用调取。",
    related: ["master", "theme", "section"], demo: "reuse-slides"
  },
  {
    id: "screen-record", name: "屏幕录制", alias: "Screen Recording",
    category: "软件功能", level: "入门",
    summary: "PPT 内置录屏——框选区域录下操作，自动嵌成一段视频。",
    detail: "屏幕录制（Screen Recording）是 PowerPoint 自带的功能：框选屏幕任意区域，录制操作过程（可含声音、鼠标），停止后视频自动插入当前页。不用额外装录屏软件，做软件演示、操作教程很方便。",
    scenario: "讲一个软件操作步骤，直接录一段屏嵌进 PPT，比截图逐步说清楚。",
    related: ["export-media", "hyperlink"], demo: "screen-record"
  },

  /* ============ 设计原则 ============ */
  {
    id: "alignment", name: "对齐", alias: "Alignment",
    category: "设计原则", level: "入门",
    summary: "让元素边缘或中心落在同一条线上——「不齐」是新手最大的破绽。",
    detail: "对齐是把多个元素沿某条看不见的线排齐（左对齐、居中、右对齐）。对齐创造秩序感，观众眼睛不用重新定位。哪怕元素大小不同，只要共享一条边就显整齐。",
    scenario: "一页里标题、正文、按钮如果各对齐到左边缘，整页立刻「贵」起来。",
    related: ["guides", "proximity", "grid"], demo: "alignment"
  },
  {
    id: "proximity", name: "亲密性", alias: "Proximity",
    category: "设计原则", level: "入门",
    summary: "相关的东西挨近点，不相关的离远点——距离本身就是分组信号。",
    detail: "亲密性（相近原则）说：彼此关联的内容要靠得近、形成视觉单元；无关内容拉开距离。观众靠「间距」而非「框线」就能读懂谁和谁是一组。",
    scenario: "标题和它的说明文字挨着，和下一个板块留出大空白，分组一目了然。",
    related: ["alignment", "whitespace"], demo: "proximity"
  },
  {
    id: "contrast", name: "对比", alias: "Contrast",
    category: "设计原则", level: "入门",
    summary: "想要一样东西被看见，就让它和周围「明显不一样」。",
    detail: "对比是用大小、颜色、粗细、空间的反差突出重点。对比越强，注意力越集中。忌「差不多」——半粗不细的标题和正文对比微弱，等于没强调。",
    scenario: "全场小字里，只有一个数字用超大号+亮色，观众的眼立刻被它抓走。",
    related: ["hierarchy", "focus"], demo: "contrast"
  },
  {
    id: "repetition", name: "重复", alias: "Repetition",
    category: "设计原则", level: "入门",
    summary: "同一个颜色/形状/字体反复出现，整套就「像一家人」。",
    detail: "重复是让某些视觉要素（强调色、圆角、图标风格、页眉格式）在多处一致出现，建立统一识别。它不是单调，而是用规律性制造专业感和连贯。",
    scenario: "每个章节封面都套同一种配色和排版模板，观众一看就知道「新的一章开始了」，整份演示节奏统一。",
    related: ["icon-style", "tri-color"], demo: "repetition"
  },
  {
    id: "hierarchy", name: "视觉层级", alias: "Visual Hierarchy",
    category: "设计原则", level: "进阶",
    summary: "用大小/颜色/位置告诉观众：先看这个，再看那个。",
    detail: "视觉层级是信息的主次排序。越重要的越突出（更大、更亮、更靠上/居中），次要的退后。好的层级让观众不读字也能「扫」出重点顺序。",
    scenario: "一页先放结论大标题，再放支撑小字，观众 3 秒抓住你想说的。",
    related: ["contrast", "focus", "type-scale"], demo: "hierarchy"
  },
  {
    id: "whitespace", name: "留白", alias: "Negative Space",
    category: "设计原则", level: "进阶",
    summary: "别把页面塞满——空着的地方，正是让重点「呼吸」的空间。",
    detail: "留白不是浪费，是主动控制的空白区域。它减少认知负担、提升高级感，并引导视线。内容越密越显廉价，适当留白反而显贵。",
    scenario: "一页只放一句话 + 一张图，四周大量空白，质感立刻拉满。",
    related: ["proximity", "margin"], demo: "whitespace"
  },
  {
    id: "focus", name: "焦点引导", alias: "Visual Weight",
    category: "设计原则", level: "进阶",
    summary: "用高亮、放大、聚光，把观众视线「强行」带到你想让他看的地方。",
    detail: "焦点引导是人为制造视觉重心：把次要内容压暗、模糊或缩小，只让核心元素亮起来（类似聚光灯）。观众注意力有限，你不平分，就得指定。",
    scenario: "讲数据亮点时，把其他图表调灰，只留目标数字高亮发光。",
    related: ["contrast", "hierarchy"], demo: "focus"
  },
  {
    id: "grid", name: "栅格系统", alias: "Grid System",
    category: "设计原则", level: "进阶",
    summary: "看不见的格子，所有元素都「贴」在格线上，整齐就不靠运气。",
    detail: "栅格是把页面划分成等宽列和间距的隐形骨架。内容按列排放，天然对齐、节奏统一。它是专业排版从「看着还好」到「严丝合缝」的底层纪律。",
    scenario: "多卡片并排时，统一用 3 列栅格，间距和宽度全站一致不歪。",
    related: ["alignment", "margin", "column"], demo: "grid"
  },
  {
    id: "less-is-more", name: "减法设计", alias: "Less is More",
    category: "设计原则", level: "进阶",
    summary: "能删就删——一页只讲一件事，去掉的比留下的更显功力。",
    detail: "减法设计（Less is More）是主动做减法的思维：删掉可有可无的装饰、多余文字、冗余图表，让每一页聚焦一个核心信息。它和留白是一体两面——留白是结果，减法是动作。信息越克制，重点越突出。",
    scenario: "一页塞了 5 个要点，拆成 5 页各讲一点，观众反而记得住。",
    related: ["whitespace", "focus", "hierarchy"], demo: "less-is-more"
  },

  /* ============ 字体与配色 ============ */
  {
    id: "serif-sans", name: "衬线 / 无衬线", alias: "Serif & Sans-serif",
    category: "字体与配色", level: "入门",
    summary: "笔画带「小脚」的是衬线（正式/古典），干净无脚的是无衬线（现代/屏幕）。",
    detail: "衬线体（如宋体、Times）笔画末端有装饰衬线，显古典、正式，适合长文标题；无衬线体（如黑体、Inter）笔画干净，屏幕可读性强、显现代。混搭时常用「衬线标题+无衬线正文」。",
    scenario: "文化类、品牌故事用衬线显气质；数据报告用无衬线显利落。",
    related: ["font-weight", "type-scale"], demo: "serif-sans"
  },
  {
    id: "type-scale", name: "字号阶梯", alias: "Type Scale",
    category: "字体与配色", level: "进阶",
    summary: "标题、副标、正文、注释各有多大，得有一套「等差」的规矩。",
    detail: "字号阶梯是预先定义的一组字号（如 12/16/24/36/48），按固定比例（如 1.25 或 1.5 倍）递进。用阶梯而非随手设字号，全篇比例才和谐、层级才清晰。",
    scenario: "定好阶梯后，所有页的「小标题永远 24、正文永远 16」，绝不乱。",
    related: ["hierarchy", "font-weight"], demo: "type-scale"
  },
  {
    id: "font-weight", name: "字重", alias: "Font Weight",
    category: "字体与配色", level: "入门",
    summary: "同一款字，细的轻、粗的重——粗细本身就能分层级。",
    detail: "字重（400 常规、500 中、700 粗）在不换字号、不换色的情况下区分主次。粗体用于强调关键词，常规体用于大段阅读，避免全页一个粗细的平。",
    scenario: "一句里只把核心动词加粗，其余常规，重点立刻跳出来。",
    related: ["type-scale", "contrast"], demo: "font-weight"
  },
  {
    id: "tracking", name: "字间距", alias: "Letter Spacing",
    category: "字体与配色", level: "进阶",
    summary: "字母之间松一点还是紧一点，气质全变——大标题尤其要调。",
    detail: "字间距（tracking）控制字符间的空隙。大号标题常略微收紧显紧凑高级；全大写小标签则放宽显从容。它也影响一行能塞多少字和整体呼吸感。",
    scenario: "英文大标题把字间距调到 -2%，中文标题 +1%，精致度立现。",
    related: ["type-scale"], demo: "tracking"
  },
  {
    id: "analogous", name: "邻近色", alias: "Analogous Colors",
    category: "字体与配色", level: "进阶",
    summary: "色环上挨着的几个颜色搭一起，和谐、不打架，但容易「没重点」。",
    detail: "邻近色是色环上相邻的 2–4 个颜色（如蓝—蓝绿—绿）。搭配天生协调、舒服，适合做柔和背景。缺点是对比弱，需要靠亮度或一个小对比色点醒。",
    scenario: "科技感页面用蓝紫邻近色渐变，安静统一不刺眼。",
    related: ["tri-color", "complementary"], demo: "analogous"
  },
  {
    id: "complementary", name: "对比色", alias: "Complementary Colors",
    category: "字体与配色", level: "进阶",
    summary: "色环正对面的俩颜色凑一起，互相「炸」——最适合做强调。",
    detail: "对比色是色环上 180° 相对的颜色（如蓝—橙、紫—黄）。并置时彼此提亮、极具张力，是突出重点、做 CTA 按钮的利器，但大面积用会刺眼，宜小面积点缀。",
    scenario: "深蓝背景上一颗橙色「立即购买」按钮，想不看见都难。",
    related: ["tri-color", "analogous", "contrast"], demo: "complementary"
  },
  {
    id: "tri-color", name: "主辅点三色", alias: "60-30-10 Rule",
    category: "字体与配色", level: "进阶",
    summary: "一套配色别超过三种角色：主色 60%、辅色 30%、点缀 10%。",
    detail: "60-30-10 是经典配色比例：主色占大面积定调（背景/主块），辅色 30% 支撑（次级块），点缀色 10% 提神（关键数据/按钮）。比例稳，页面就不花。",
    scenario: "白底 60%、深蓝块 30%、一抹亮橙 10%，干净又有记忆点。",
    related: ["analogous", "complementary", "color-reuse"], demo: "tri-color"
  },
  {
    id: "gradient", name: "渐变", alias: "Gradient",
    category: "字体与配色", level: "入门",
    summary: "颜色从 A 慢慢过渡到 B，比纯色更有层次、更「活」。",
    detail: "渐变是两种及以上颜色按方向平滑过渡（线性、径向）。它能制造光感、体积感和现代感。暗色风常用冷色蓝紫渐变；忌用过多高饱和色，易显廉价。",
    scenario: "大标题填蓝紫线性渐变，比死白文字更有「发光」的高级感。",
    related: ["tri-color"], demo: "gradient"
  },
  {
    id: "line-height", name: "行距 / 行间距", alias: "Line Height",
    category: "字体与配色", level: "入门",
    summary: "两行字之间的上下空隙——太挤读着喘不过气，松一点立刻有呼吸感。",
    detail: "行距（行高）是相邻两行文字基线之间的距离。中文正文常设 1.5–1.8 倍字号最舒服；太小（1.0）文字挤成一团，太大（2.5+）又松散断气。它是长文可读性和「透气感」的关键，常被新手忽略。",
    scenario: "一段挤成砖块的正文，把行距从 1.0 调到 1.6，瞬间清爽好读。",
    related: ["type-scale", "column", "whitespace"], demo: "line-height"
  },
  {
    id: "muted-color", name: "高级灰 / 莫兰迪色", alias: "Morandi Colors",
    category: "字体与配色", level: "进阶",
    summary: "把颜色的「艳」压下去、掺点灰，就从廉价大红大绿变成高级质感。",
    detail: "高级灰/莫兰迪色是低饱和度的柔和色系——在纯色里掺入灰度，降低鲜艳度。它显得克制、高级、不刺眼，是高端汇报、品牌视觉的常用调性。诀窍是降饱和、控明度，同一页色调统一。",
    scenario: "把刺眼的正红改成带灰的绛红、亮蓝改成雾霾蓝，整页气质立刻上档次。",
    related: ["tri-color", "analogous", "gradient"], demo: "muted-color"
  },
  {
    id: "color-wheel", name: "色轮 / HSB", alias: "Color Wheel",
    category: "字体与配色", level: "进阶",
    summary: "所有配色的底层地图——色相定「是什么色」、饱和度定「艳不艳」、明度定「亮不亮」。",
    detail: "色轮把颜色按色相（Hue）环形排列，是理解配色关系（邻近、对比、三角）的地图。HSB 模型用三个维度描述任意颜色：色相（H，红黄蓝…）、饱和度（S，鲜艳↔灰）、明度（B，亮↔暗）。掌握 HSB 就能精准微调而不是靠瞎试——比如「保持同色相只降饱和」就得到高级灰。",
    scenario: "想要一组协调色，在色轮上取同色相、只变明度饱和度，比乱选靠谱。",
    related: ["analogous", "complementary", "muted-color"], demo: "color-wheel"
  },
  {
    id: "monochrome", name: "单色 / 同类色配色", alias: "Monochromatic",
    category: "字体与配色", level: "入门",
    summary: "只用一个色相，靠深浅明暗拉开层次——最不容易翻车的配色法。",
    detail: "单色（同类色）配色只取一种色相，通过调整明度和饱和度衍生出深、中、浅多个变体来区分层级。它天生和谐、极难出错，特别适合新手和追求高级统一感的场景。缺点是略平，可加一个小面积点缀色提神。",
    scenario: "整页只用深蓝、中蓝、浅蓝三档，干净统一又有层次，绝不花。",
    related: ["analogous", "tri-color", "muted-color"], demo: "monochrome"
  },

  /* ============ 动画与切换 ============ */
  {
    id: "anim-type", name: "进入 / 退出 / 强调", alias: "Entrance & Exit",
    category: "动画与切换", level: "入门",
    summary: "出现用「进入」、消失用「退出」、原地动一下用「强调」，三类别别混。",
    detail: "PPT 动画分三类：进入（对象从无到有）、退出（从有到无）、强调（在场但动一下如放大/变色/脉冲）。还有路径动画。选对类别，表达才准确。",
    scenario: "点一下才显示答案用「进入·淡入」；答错让它「退出·淡出」最自然。",
    related: ["animation-pane", "trigger"], demo: "anim-type"
  },
  {
    id: "smooth-vs-abrupt", name: "平滑 vs 突然", alias: "Smooth vs Abrupt",
    category: "动画与切换", level: "入门",
    summary: "「淡入」是平滑，「出现」是突然——要柔和还是干脆，看场合。",
    detail: "平滑类动画（淡入、擦除、浮入）有过渡过程，显优雅；突然类（出现/消失）瞬间完成，显干脆。正式汇报多用平滑，强调「啪一下」可用突然。",
    scenario: "封面标题用「浮入」显高级；游戏化答题用「出现」显利落。",
    related: ["easing", "anim-type"], demo: "smooth-vs-abrupt"
  },
  {
    id: "easing", name: "缓动曲线", alias: "Easing",
    category: "动画与切换", level: "进阶",
    summary: "动画别匀速——「先快后慢」像真东西，死板匀速像机器。",
    detail: "缓动（easing）描述动画速度随时间的变化。线性（匀速）显机械；ease-out（先快后慢）更自然，像物体落地减速。好缓动让动画「有生命」。",
    scenario: "弹窗用 ease-out 轻轻落下，比匀速滑入舒服太多。",
    related: ["smooth-vs-abrupt", "timeline"], demo: "easing"
  },
  {
    id: "trigger", name: "触发方式", alias: "Trigger",
    category: "动画与切换", level: "入门",
    summary: "动画「什么时候动」：点一下才动、和上个同时、还是自动接着来。",
    detail: "触发方式决定动画何时播放：单击时（手动控制节奏）、与上一动画同时（并行）、上一动画之后（顺序自动）。配动画窗格一起用，掌控全场节奏。",
    scenario: "教学页设「单击开始」，讲到一个点再点一下揭晓下一个，互动感强。",
    related: ["animation-pane", "anim-type"], demo: "trigger"
  },
  {
    id: "transition-fx", name: "切换效果", alias: "Slide Transition",
    category: "动画与切换", level: "入门",
    summary: "翻到下一页时整页怎么「变」——淡变、推入、擦除……",
    detail: "切换效果是两页之间的过渡（淡出、推入、擦除、翻转、 Morph 变形）。它作用于整页而非单个对象。统一一种切换更专业，混太多反而乱。",
    scenario: "全程用「淡入」切换显克制；章节之间用一次「推入」做区隔。",
    related: ["smooth-vs-abrupt", "zoom-loc"], demo: "transition-fx"
  },
  {
    id: "timeline", name: "时间轴", alias: "Timeline",
    category: "动画与切换", level: "进阶",
    summary: "把多个动画按「第几秒谁动」排成一条时间线，做复杂序列。",
    detail: "时间轴是把动画按时间先后与并行关系铺开的控制面（动画窗格里体现为开始方式与延迟）。用延迟和「同时」能编排多元素协同的精致入场。",
    scenario: "标题先落、副标 0.2s 后、三张图依次 0.1s 错峰，高级感来自错峰。",
    related: ["animation-pane", "easing"], demo: "timeline"
  },
  {
    id: "morph", name: "平滑切换", alias: "Morph Transition",
    category: "动画与切换", level: "进阶",
    summary: "现代 PPT 最强特性——两页间同名对象自动补间，做丝滑位移/缩放动画。",
    detail: "平滑切换（Morph）是页与页之间的智能过渡：把某对象复制到下一页并改变它的位置/大小/颜色，Morph 会自动生成两者之间的平滑运动动画。不用手 K 帧就能做出电影级的缩放、位移、变形效果，是「零代码动效」的杀手锏。",
    scenario: "第一页一个小圆，第二页把它放大移到中央，Morph 一键生成丝滑放大动画。",
    related: ["transition-fx", "easing", "smooth-vs-abrupt"], demo: "morph"
  },
  {
    id: "motion-path", name: "路径动画", alias: "Motion Path",
    category: "动画与切换", level: "进阶",
    summary: "让对象沿你画的一条线（直线/曲线/自定义）移动，不只是原地淡入。",
    detail: "路径动画是让对象按预设或手绘的轨迹移动的动画类型。除了直线、弧线、循环等预设，还能自定义任意曲线路径。它让元素「走位」，做流程流动、地图路线、飞入轨迹都靠它。",
    scenario: "画一条从 A 城到 B 城的曲线，让小飞机图标沿线飞过去，路线感十足。",
    related: ["anim-type", "easing"], demo: "motion-path"
  },
  {
    id: "anim-timing", name: "动画计时", alias: "Animation Timing",
    category: "动画与切换", level: "进阶",
    summary: "同一个动画，改「持续时长」和「延迟」，节奏感天差地别。",
    detail: "动画计时包含持续时间（Duration，动画播多久）和延迟（Delay，等多久才开始）。时长短显干脆、长显舒缓；用不同延迟让多个对象错峰入场，是做「高级错落感」的核心参数。",
    scenario: "三张卡片各延迟 0.15s 依次淡入，比同时冒出来高级得多。",
    related: ["timeline", "easing", "animation-pane"], demo: "anim-timing"
  },

  /* ============ 排版与布局 ============ */
  {
    id: "golden-ratio", name: "黄金比例", alias: "Golden Ratio",
    category: "排版与布局", level: "进阶",
    summary: "把画面按 1:1.618 切分，人眼觉得「最舒服」的天然美感比例。",
    detail: "黄金比例 ≈ 1.618，被公认为最具美感的分割。用于图片与文字块的宽高比、主体与留白的分界，能让构图自然和谐，不靠感觉也稳。",
    scenario: "左图右文时，图占 0.618、文占 0.382，比五五开耐看。",
    related: ["rule-of-thirds", "whitespace"], demo: "golden-ratio"
  },
  {
    id: "rule-of-thirds", name: "三分法", alias: "Rule of Thirds",
    category: "排版与布局", level: "进阶",
    summary: "把画面打九宫格，主体放四条线或四个交点上，立刻不呆板。",
    detail: "三分法用两条横两条竖把画面分九格，关键元素放在交点或线上，比居中更生动。它是摄影、PPT 构图的万能起手式。",
    scenario: "人物或主图别居中，偏到右侧交点，左侧留文字，构图就活了。",
    related: ["golden-ratio", "center-sym"], demo: "rule-of-thirds"
  },
  {
    id: "f-pattern", name: "F 型阅读", alias: "F-Pattern Reading",
    category: "排版与布局", level: "进阶",
    summary: "人看网页/幻灯片，眼睛先横扫顶部、再横扫稍下、然后竖着溜左边。",
    detail: "F 型是眼动研究结论：读者先读顶部一行（F 上横），再读稍下短一行（F 下横），剩余内容沿左侧竖直略读（F 竖）。重要信息放左上和顶部横带。",
    scenario: "标题置顶、关键结论靠左上方，顺着 F 自然被读到。",
    related: ["hierarchy", "center-sym"], demo: "f-pattern"
  },
  {
    id: "center-sym", name: "中心对称", alias: "Center Symmetry",
    category: "排版与布局", level: "入门",
    summary: "所有东西往中轴一摆，最稳、最正式，适合封面和结论页。",
    detail: "中心对称是元素沿中轴线左右对称排布，给人庄重、平衡、仪式感。常用于封面、致谢、金句页。缺点是略显静态，信息页可改用左对齐更灵动。",
    scenario: "封面的标题+Logo+副标全部居中，仪式感拉满。",
    related: ["rule-of-thirds", "alignment"], demo: "center-sym"
  },
  {
    id: "margin", name: "页边距", alias: "Margin",
    category: "排版与布局", level: "入门",
    summary: "内容离页面边缘留多远——留够了才「透气」，贴边了显拥挤。",
    detail: "页边距是内容区与画布边缘的空白带。留足边距让内容不顶天立地、有框感；太窄显逼仄。一般左右边距不小于页面宽度的 5–8%。",
    scenario: "把内容从贴边往里收一截，整页立刻「有教养」。",
    related: ["whitespace", "grid"], demo: "margin"
  },
  {
    id: "column", name: "栏宽", alias: "Column Width",
    category: "排版与布局", level: "进阶",
    summary: "一行文字多宽最舒服？太宽眼累、太窄断气——正文约 30–40 字。",
    detail: "栏宽控制文本块每行字数。过宽眼睛换行易丢行，过窄频繁换行显碎。中文正文建议每行 30–40 字，配合栅格定栏宽最稳妥。",
    scenario: "长文别铺满整页，限制栏宽到约 1/2 页宽，阅读舒服很多。",
    related: ["grid", "margin", "type-scale"], demo: "column"
  },
  {
    id: "bleed", name: "出血 / 满版", alias: "Bleed / Full Bleed",
    category: "排版与布局", level: "进阶",
    summary: "让图片/色块一直铺到页面最边缘、不留白边，视觉冲击力最强。",
    detail: "出血（满版）指图像或背景延伸到画布边缘之外、不留任何边距，形成「铺满整屏」的沉浸感。它和「留边距」是两种取向——满版张力足、有气势，适合封面和大图页；留边距克制、显精致。二者按场景选。",
    scenario: "封面用一张满版大图铺满整屏，标题压在上面，气场瞬间拉满。",
    related: ["margin", "whitespace"], demo: "bleed"
  },
  {
    id: "card-layout", name: "卡片式布局", alias: "Card Layout",
    category: "排版与布局", level: "进阶",
    summary: "把信息装进一个个带底色圆角的「卡片」里，天然分组、整齐、现代。",
    detail: "卡片式布局把相关内容打包进独立的矩形容器（底色/圆角/阴影），多张卡片按栅格并排。它利用亲密性和重复原则，让信息模块化、层次清晰，是现代 UI 和 PPT 最流行的排版范式之一。",
    scenario: "三个并列的产品特性，各做成一张卡片横排，比纯文字列表清爽专业。",
    related: ["grid", "proximity", "repetition"], demo: "card-layout"
  },
  {
    id: "full-image", name: "全图型", alias: "Full-Image Layout",
    category: "排版与布局", level: "进阶",
    summary: "一整张大图铺满全页、文字压在图上——冲击力最强的高质感版式。",
    detail: "全图型排版用一张高质量大图占满整页作背景，标题文字叠加在图上（常配蒙层保证可读）。它气势足、代入感强，是发布会、封面、金句页的主流做法。关键是图要够清晰、加暗色/渐变蒙层压住图让白字看得清。",
    scenario: "产品发布封面用一张满版大图，压一层暗蒙层，白色大标题居中，气场拉满。",
    related: ["bleed", "contrast", "whitespace"], demo: "full-image"
  },
  {
    id: "visual-balance", name: "视觉平衡 / 重心", alias: "Visual Balance",
    category: "排版与布局", level: "进阶",
    summary: "画面别「头重脚轻」——左右上下的视觉分量要配平，看着才稳。",
    detail: "视觉平衡指元素的视觉重量（由大小、颜色深浅、疏密决定）在画面里分布均衡，不偏坠一角。分对称平衡（庄重）和非对称平衡（灵动，如一个大图配几个小元素配平）。失衡的页面会让人本能地觉得「别扭」。",
    scenario: "左边一张大图很重，右边就用标题+几行字+一个色块配重，画面就不歪了。",
    related: ["center-sym", "rule-of-thirds", "whitespace"], demo: "visual-balance"
  },

  /* ============ 效率与技巧 ============ */
  {
    id: "format-painter", name: "格式刷", alias: "Format Painter",
    category: "效率与技巧", level: "入门",
    summary: "把这个框的样式「刷」给那个框，不用再调一遍颜色字号。",
    detail: "格式刷复制一个对象的全部外观（颜色、字体、阴影、效果）并应用到另一个。双击可连续刷多个。它是统一风格的偷懒神器。",
    scenario: "调好一个标题样式，用格式刷把其余标题一秒刷成同款。",
    related: ["repetition", "master"], demo: "format-painter"
  },
  {
    id: "shortcut", name: "快捷键", alias: "Keyboard Shortcuts",
    category: "效率与技巧", level: "入门",
    summary: "别老用鼠标点——几个组合键，复制对齐快十倍。",
    detail: "快捷键用键盘组合替代菜单操作：如 Ctrl+C/V 复制粘贴、Ctrl+D  duplicate、Ctrl+G 成组、方向键+Ctrl 微移。熟了之后手不离键盘，效率飞起。",
    scenario: "复制元素用 Ctrl+D 而非右键，对齐用 Alt 唤出参考线，行云流水。",
    related: ["distribute", "guides"], demo: "shortcut"
  },
  {
    id: "distribute", name: "对齐分布", alias: "Align & Distribute",
    category: "效率与技巧", level: "入门",
    summary: "「对齐」让边齐，「分布」让间距匀——一排按钮等距就靠它。",
    detail: "对齐（Align）让多个对象贴某边/居中；分布（Distribute）让它们之间的间距完全相等。两者配合，一排图标、一列卡片瞬间整齐如尺量。",
    scenario: "底部三个按钮先「底端对齐」再「横向分布」，间距完美一致。",
    related: ["alignment", "guides"], demo: "distribute"
  },
  {
    id: "color-reuse", name: "取色复用", alias: "Color Reuse",
    category: "效率与技巧", level: "进阶",
    summary: "把品牌色「存」成主题色，全篇一键换，绝不手滑用错色。",
    detail: "取色复用是把常用色（尤其品牌色）存入「主题颜色/色板」，全篇引用而非硬编码。改主题色时所有引用处同步变，既统一又好维护。",
    scenario: "客户换 Logo 主色，只改主题色一处，全 50 页自动跟上。",
    related: ["tri-color", "eyedropper"], demo: "color-reuse"
  },
  {
    id: "vector-vs-raster", name: "矢量 vs 位图", alias: "Vector vs Raster",
    category: "效率与技巧", level: "进阶",
    summary: "矢量放大不糊（图标/形状），位图放大马赛克（照片）——别用错。",
    detail: "矢量图用数学路径描述，任意放大都清晰，适合图标、Logo、形状；位图（jpg/png）由像素组成，放大就糊，适合照片。PPT 里图标优先用矢量/SVG。",
    scenario: "Logo 用矢量，投到大屏也锐利；照片用高清位图，别硬拉大。",
    related: ["icon-style", "compress"], demo: "vector-vs-raster"
  },
  {
    id: "compress", name: "图片压缩", alias: "Image Compression",
    category: "效率与技巧", level: "入门",
    summary: "文件动辄几十 MB？压缩图片，体积骤降、画质肉眼无差。",
    detail: "图片压缩在不明显损画质的前提下减小文件体积（降低分辨率、转 WebP/优化 png）。PPT 里用「压缩图片」功能，能大幅瘦身，放映不卡、发送不崩。",
    scenario: "塞了 20 张高清图后文件 80MB，压缩后 8MB，邮件轻松发。",
    related: ["vector-vs-raster"], demo: "compress"
  },
  {
    id: "anim-painter", name: "动画刷", alias: "Animation Painter",
    category: "效率与技巧", level: "进阶",
    summary: "格式刷的动画版——把一个对象的整套动画「刷」给另一个，不用重设。",
    detail: "动画刷（Animation Painter）复制一个对象身上的全部动画设置（类型、时长、延迟、缓动），一键应用到另一个对象。双击可连续刷多个。调好一个精致动画后，用它批量复制，省下逐个重设的功夫。",
    scenario: "第一张卡片调好「淡入+0.2s 延迟」，用动画刷一秒把其余卡片刷成同款节奏。",
    related: ["format-painter", "anim-timing", "animation-pane"], demo: "anim-painter"
  },
  {
    id: "plugins", name: "增效插件", alias: "Add-ins",
    category: "效率与技巧", level: "进阶",
    summary: "iSlide、口袋动画、OneKeyTools 这类外挂——一键补齐 PPT 的效率短板。",
    detail: "增效插件是给 PowerPoint 装的第三方工具：iSlide（海量模板/图标/一键统一字体色）、口袋动画（复杂动画简化）、OneKeyTools（批量处理、色彩渐变、图形运算增强）。它们把很多手动繁活变成一键，是中文 PPT 圈的效率半壁江山。",
    scenario: "用 iSlide 的「一键优化」统一全篇字体行距，用 OneKey 批量处理图形，效率翻倍。",
    related: ["format-painter", "color-reuse"], demo: "plugins"
  },
  {
    id: "smart-align", name: "智能对齐 / 自动吸附", alias: "Smart Snap",
    category: "效率与技巧", level: "入门",
    summary: "拖动时自动「吸」到对齐位、显示等距提示——不用手动点对齐也能齐。",
    detail: "智能对齐（智能参考线 + 自动吸附）在你拖动对象时实时冒出红色虚线，提示与其他对象的边缘对齐、居中对齐或间距相等，并轻轻「吸」住。它是参考线和对齐分布的实时自动版，边拖边对，肉眼即可摆齐。",
    scenario: "拖第三个方块时，软件自动提示「和前两个间距相等」并吸附，秒排等距。",
    related: ["guides", "distribute", "alignment"], demo: "smart-align"
  },

  /* ============ 图形与图示 ============ */
  {
    id: "icon-style", name: "图标风格统一", alias: "Icon Consistency",
    category: "图形与图示", level: "进阶",
    summary: "一页里的图标要么全线框、要么全实心，混搭显业余。",
    detail: "图标风格统一指线性/面性、圆角/直角、线宽、配色在全篇保持一致。混用不同来源图标（有的描边、有的填充）会显杂乱，统一后才显专业。",
    scenario: "一套线性图标贯穿全篇，比东拼西凑的图标库高级十倍。",
    related: ["repetition", "vector-vs-raster"], demo: "icon-style"
  },
  {
    id: "chart-beauty", name: "图表美化", alias: "Chart Beautification",
    category: "图形与图示", level: "进阶",
    summary: "默认图表又土又满——砍网格线、换配色、去边框，立刻高级。",
    detail: "图表美化是去掉默认图表的冗余（多余网格线、灰边框、3D 斜面），用品牌色、清晰标签、留白重构，让数据一眼可读且不廉价。",
    scenario: "把默认蓝柱图改成单色+重点高亮一根，结论自己会说话。",
    related: ["smartart", "tri-color"], demo: "chart-beauty"
  },
  {
    id: "smartart-to-shape", name: "SmartArt 转形状", alias: "SmartArt to Shape",
    category: "图形与图示", level: "进阶",
    summary: "SmartArt 不够细？一键「转形状」拆成可任意改的散件。",
    detail: "把 SmartArt 转换为普通形状后，每个节点变成独立可编辑对象，能改圆角、加阴影、换图标、错位排布，突破模板限制做完全定制图示。",
    scenario: "流程图画完想让某一步特别突出，转形状后单独放大加光。",
    related: ["smartart", "boolean"], demo: "smartart-to-shape"
  },
  {
    id: "image-mask", name: "蒙版 / 图片裁剪为形状", alias: "Crop to Shape",
    category: "图形与图示", level: "进阶",
    summary: "把方方正正的照片裁成圆形、星形甚至文字形——图片秒变造型。",
    detail: "蒙版（图片裁剪为形状）用一个形状当「窗口」，只露出图片落在窗口内的部分。PPT 里可把图片裁成圆、圆角矩形、任意形状，甚至用布尔运算把图片填进文字里。它是做头像、异形拼图、文字填图的核心技法。",
    scenario: "把团队合照里每个人裁成圆形头像并排，比原始方图精致统一。",
    related: ["boolean"], demo: "image-mask"
  },
  {
    id: "data-viz", name: "数据可视化 / 选对图表", alias: "Data Visualization",
    category: "图形与图示", level: "进阶",
    summary: "比大小用柱图、看占比用饼图、看趋势用折线——选错图，数据白讲。",
    detail: "数据可视化的第一步是「选对图表类型」：比较数值用柱状图，构成占比用饼图/环形图，随时间变化用折线图，相关关系用散点图。选对了图，结论一眼可读；选错了，再美也误导。",
    scenario: "想说「三年增长」，用折线一目了然；硬塞饼图反而看不出趋势。",
    related: ["chart-beauty", "hierarchy"], demo: "data-viz"
  },
  {
    id: "flat-vs-skeu", name: "扁平化 vs 拟物", alias: "Flat vs Skeuo",
    category: "图形与图示", level: "进阶",
    summary: "扁平=纯色无阴影、干净现代；拟物=仿真质感、有光影立体。",
    detail: "扁平化（Flat）去掉阴影、渐变、高光，用纯色和简洁形状，显现代、清爽、加载快；拟物（Skeuomorphism）模仿真实物体的材质、光影、立体感，显真实、有温度。近年还流行介于两者的「新拟态/玻璃拟态」。风格要全篇统一。",
    scenario: "科技汇报用扁平图标显利落；儿童/生活主题用拟物质感更亲切。",
    related: ["icon-style", "gradient"], demo: "flat-vs-skeu"
  },
  {
    id: "table-beauty", name: "表格美化", alias: "Table Beautification",
    category: "图形与图示", level: "进阶",
    summary: "默认表格粗线又土——去掉多余边框、隔行淡底、留白撑开，秒变清爽。",
    detail: "表格美化是把 PPT 默认那种粗黑边框、全网格的「Excel 味」表格重构：删掉竖线只留必要横线（或全去线）、表头用色块、隔行加极淡底色（斑马纹）、单元格加内边距让文字透气、关键数据高亮。让数据表也能融进设计。",
    scenario: "一张对比表，去掉所有竖线、表头加深色条、留白撑开，立刻从「报表」变「设计」。",
    related: ["chart-beauty", "data-viz", "whitespace"], demo: "table-beauty"
  },
  {
    id: "model-3d", name: "三维 / 3D 模型", alias: "3D Models",
    category: "图形与图示", level: "进阶",
    summary: "往 PPT 里插可 360° 旋转的 3D 模型，还能配「三维动画」转起来。",
    detail: "PowerPoint 支持插入 3D 模型（.glb/.obj 等），插入后能用鼠标任意旋转视角、缩放，配合「三维」类动画（转盘、摇摆）让模型在放映时自动转动。它比静态图更有科技感和展示力，产品展示、教学演示越来越常用。",
    scenario: "讲一款新硬件，插入它的 3D 模型让观众看到各个角度，比几张照片直观得多。",
    related: ["flat-vs-skeu", "motion-path"], demo: "model-3d"
  },

  /* ============ 输出与放映 ============ */
  {
    id: "widescreen", name: "16:9 宽屏", alias: "Widescreen 16:9",
    category: "输出与放映", level: "入门",
    summary: "现在屏幕都是宽的，页面比例设 16:9 才铺满不黑边。",
    detail: "16:9 是现代投影仪、笔记本、大屏的标准比例（老式 4:3 已淘汰）。新建文稿就设 16:9，避免放映时上下黑边或内容被裁。",
    scenario: "投屏发现左右黑边？八成是用了 4:3，改 16:9 即满屏。",
    related: ["margin", "export-pdf"], demo: "widescreen"
  },
  {
    id: "export-pdf", name: "导出 PDF", alias: "Export to PDF",
    category: "输出与放映", level: "入门",
    summary: "发给别人最稳的格式——不动版式、不失真、谁都能开。",
    detail: "导出 PDF 把幻灯片固化为跨平台一致的文档，保留版式与字体（可嵌入），适合投递、归档、打印。可选是否含备注、是否压缩图片。",
    scenario: "把作品集导成 PDF 发 HR，对方打开就是你要的样子。",
    related: ["widescreen", "presenter-view"], demo: "export-pdf"
  },
  {
    id: "presenter-view", name: "演讲者视图", alias: "Presenter View",
    category: "输出与放映", level: "进阶",
    summary: "你屏上看「当前页+下一页+备注」，观众屏上只看到干净正片。",
    detail: "演讲者视图在双屏放映时，给讲者显示当前 slide、下一张预览、演讲者备注和计时，观众屏只放正片。它让你脱稿也能侃侃而谈。",
    scenario: "路演接上投影，开演讲者视图，照着备注讲、还能偷看下一页。",
    related: ["export-pdf", "hyperlink"], demo: "presenter-view"
  },
  {
    id: "hyperlink", name: "超链接跳转", alias: "Hyperlink / Action",
    category: "输出与放映", level: "进阶",
    summary: "点一下文字或图形，跳到指定页/网址/文件——做可交互目录。",
    detail: "超链接（或动作按钮）让对象在放映时点击后跳转：到某页、打开网页、运行程序。它是做非线性演示、目录导航、问卷跳转的关键。",
    scenario: "目录页每个章节名都链到对应页，点哪讲哪，灵活控场。",
    related: ["zoom-loc", "section"], demo: "hyperlink"
  },
  {
    id: "autoplay", name: "自动播放", alias: "Auto Play",
    category: "输出与放映", level: "入门",
    summary: "设好每页停留几秒，开场循环展示不用你守着点。",
    detail: "自动播放（排练计时/自动换片）让幻灯片按设定时长自己翻页，常用于展会大屏、签到循环。配合切换动画，无人值守也流畅。",
    scenario: "展台大屏循环播公司介绍，设每页 5 秒自动翻，全天候跑。",
    related: ["transition-fx", "presenter-view"], demo: "autoplay"
  },
  {
    id: "embed-font", name: "嵌入字体", alias: "Embed Fonts",
    category: "输出与放映", level: "进阶",
    summary: "把用到的字体打包进文件，换台电脑打开也不会变样、不掉字。",
    detail: "嵌入字体（Embed Fonts）把文稿里用到的特殊字体一并存进 .pptx，这样在没装该字体的电脑上打开，标题也不会被替换成默认宋体导致排版错乱。代价是文件变大。发给别人或去现场用别人电脑放映前，务必勾选。",
    scenario: "精心选的标题字，到了会场电脑全变宋体？提前嵌入字体就稳了。",
    related: ["export-pdf", "serif-sans"], demo: "embed-font"
  },
  {
    id: "export-media", name: "导出图片 / GIF / 视频", alias: "Export Media",
    category: "输出与放映", level: "入门",
    summary: "PPT 不只能放映——可导成长图、动图、MP4，发朋友圈/视频号都行。",
    detail: "除了 PDF，PPT 还能导出：单页存 PNG/JPG 图片（做长图、封面）、把动画导成 GIF（社媒动图）、把整套带动画和计时导成 MP4 视频（无需装 PPT 也能播）。一份内容，多种分发形态。",
    scenario: "把做好的动画页导成 MP4 发视频号，或导成长图发公众号，一稿多用。",
    related: ["export-pdf", "autoplay"], demo: "export-media"
  },
  {
    id: "speaker-notes", name: "演讲备注", alias: "Speaker Notes",
    category: "输出与放映", level: "入门",
    summary: "每页下方那块「只有你看得到」的备注区，写讲稿、提词、数据全靠它。",
    detail: "演讲备注（Speaker Notes）是每张幻灯片下方的文字区，放映时观众看不到，只在演讲者视图里给你看。用来写讲稿要点、易忘的数据、过渡话术。它和演讲者视图是搭档——备注是「写在哪」，演讲者视图是「怎么看」。",
    scenario: "怕临场忘词，把每页要说的关键句写进备注，放映时照着演讲者视图念。",
    related: ["presenter-view", "rehearse"], demo: "speaker-notes"
  },
  {
    id: "rehearse", name: "排练计时", alias: "Rehearse Timings",
    category: "输出与放映", level: "进阶",
    summary: "先彩排一遍，软件帮你记下每页讲了多久，好卡总时长、也能存成自动播放。",
    detail: "排练计时（Rehearse Timings）进入一个特殊放映模式，你正常讲一遍，它记录每页停留的时间和总时长。练完可选择「保留计时」，这些时间就成了自动播放的换片节奏。既能帮你控场（超时提醒），又能一键生成无人值守的自动演示。",
    scenario: "限时 10 分钟的路演，用排练计时练两遍，看哪页拖太久，精准砍到 10 分钟内。",
    related: ["autoplay", "presenter-view", "speaker-notes"], demo: "rehearse"
  },
  {
    id: "export-dpi", name: "导出分辨率 / DPI", alias: "Export DPI",
    category: "输出与放映", level: "进阶",
    summary: "导出图片糊了？多半是 DPI 太低——调高分辨率，长图/印刷才清晰。",
    detail: "DPI（每英寸点数）决定导出图片的清晰度。PPT 默认导出常只有 96–150 DPI，屏幕看够用，但放大或印刷就糊。可通过修改导出设置把它提到 300 DPI 得到高清图。分辨率越高越清晰，文件也越大。",
    scenario: "把 PPT 页导成公众号长图发现字发虚，把导出 DPI 提到 300，立刻锐利。",
    related: ["export-media", "compress", "vector-vs-raster"], demo: "export-dpi"
  },

  /* ============ 本轮新增（A+B 全补 15 条） ============ */
  {
    id: "outline-view", name: "大纲视图", alias: "Outline View",
    category: "软件功能", level: "入门",
    summary: "左边一列只显示每页的标题和正文——像写 Word 大纲一样写 PPT。",
    detail: "大纲视图把幻灯片收成纯文字层级：一级是页标题、二级是要点。你在这里打字、拖动调整顺序，右侧幻灯片同步生成。它让你先想清楚「讲什么、什么顺序」，不被排版干扰，是批量写稿最快的方式。",
    scenario: "要做 30 页产品介绍，先在大纲视图把每页标题和要点敲完，再切回普通视图填图做美化。",
    related: ["layout", "master", "section"], demo: "outline-view"
  },
  {
    id: "font-pairing", name: "字体配对", alias: "Font Pairing",
    category: "字体与配色", level: "进阶",
    summary: "标题和正文用「一对」搭得舒服的字体，比全篇一个字体温润有层次。",
    detail: "字体配对（Font Pairing）是为标题和正文选两套协调的字体：常见做法是「无衬线标题 + 衬线正文」制造对比，或「同族不同字重」保持统一。中英混排时还中文用黑体、英文用对应西文，避免中英风格打架。",
    scenario: "封面大标题用思源黑体 Heavy、内文用思源宋体，标题压得住、正文读得顺，档次立刻出来。",
    related: ["serif-sans", "type-scale", "tracking"], demo: "font-pairing"
  },
  {
    id: "symmetry", name: "对称 vs 非对称", alias: "Symmetry",
    category: "排版与布局", level: "进阶",
    summary: "左右一模一样叫对称（稳重），故意偏一边叫非对称（灵动有张力）。",
    detail: "对称构图元素沿中轴镜像分布，给人稳定、庄重、可信赖感，适合正式报告。非对称构图把重点偏置（常落在黄金分割点），靠大小、色彩对比平衡，更活泼有设计感。两者没有好坏，看场合选。",
    scenario: "政府/金融汇报用左右对称显稳重；创意提案用非对称偏置，让画面「会呼吸」。",
    related: ["center-sym", "visual-balance", "golden-ratio"], demo: "symmetry"
  },
  {
    id: "diagonal-flow", name: "对角线 / 视线流", alias: "Diagonal Flow",
    category: "排版与布局", level: "进阶",
    summary: "把关键元素沿一条斜线摆，观众的眼睛会顺着它从一角滑到另一角。",
    detail: "对角线构图利用人眼天然沿斜线扫视的习惯，把标题、主角图、结论沿一条隐含对角线排布，形成清晰的「阅读动线」。相比居中平铺，它更有方向感和动势，适合引导观众按顺序接收信息。",
    scenario: "封面让标题在左上、产品图在右下，沿对角线铺开，视线自然从左读到右、被主角接住。",
    related: ["f-pattern", "focus", "rule-of-thirds"], demo: "diagonal-flow"
  },
  {
    id: "remove-bg", name: "抠图 / 去背", alias: "Remove BG",
    category: "图形与图示", level: "进阶",
    summary: "把照片里的人或产品「抠」出来，丢掉杂乱背景，干净地放进幻灯片。",
    detail: "去背（Remove Background）是移除图片多余背景、只留主体的处理。主体孤立后能自由缩放、加投影、叠在任意底色上，不会和页面背景「打架」。PPT 自带删除背景工具，也能用在线抠图。",
    scenario: "把实拍的产品图去背后放在渐变底色上，比直接贴一张带杂乱背景的方图高级太多。",
    related: ["image-mask", "vector-vs-raster", "flat-vs-skeu"], demo: "remove-bg"
  },
  {
    id: "infographic", name: "信息图", alias: "Infographic",
    category: "图形与图示", level: "进阶",
    summary: "把干巴巴的数据和流程，画成时间轴、对比图、流程图这类「一看就懂」的图。",
    detail: "信息图（Infographic）是用图形语言替代长段文字的可视化表达：时间轴讲历程、流程图讲步骤、对比图讲优劣、数据卡讲关键数字。它降低阅读门槛，让复杂信息一眼抓住重点。",
    scenario: "讲「三年增长」，与其写三段话，不如画一条带节点的时间轴，每个节点一个数字和一句话。",
    related: ["data-viz", "chart-beauty", "smartart"], demo: "infographic"
  },
  {
    id: "brand-vi", name: "品牌规范 / VI", alias: "Brand / VI",
    category: "设计原则", level: "进阶",
    summary: "同一套企业色、字体、Logo 位置贯穿全场——这就是「看着像一家公司」。",
    detail: "VI（视觉识别）规范规定了品牌的主色、辅助色、专用字体、Logo 大小和摆放位置。汇报里严格遵循，所有页面风格统一、专业可信；一旦乱用颜色字体，就像不同人拼的，显得业余。它本质是「重复原则」在企业层面的落地。",
    scenario: "给甲方做方案，每页 Logo 固定在右上、主色只用品牌蓝，客户一眼觉得「这团队专业」。",
    related: ["repetition", "theme", "tri-color"], demo: "brand-vi"
  },
  {
    id: "notes-master", name: "讲义 / 备注母版", alias: "Notes Master",
    category: "软件功能", level: "进阶",
    summary: "管「打印出来的讲义」和「演讲者备注页」长什么样的隐藏母版。",
    detail: "除了幻灯片母版，PPT 还有备注母版和讲义母版：备注母版决定演讲者视图里备注页的排版（ logo、页眉页脚、缩略图位置）；讲义母版决定打印讲义时「每页排几张幻灯片」及边栏。改一次，所有备注页/讲义统一变。",
    scenario: "要发纸质讲义给学员，在讲义母版设「每页 3 张 + 右侧笔记区」，打印出来刚好能边上记。",
    related: ["master", "speaker-notes", "export-pdf"], demo: "notes-master"
  },
  {
    id: "quick-access", name: "快速访问工具栏", alias: "Quick Access",
    category: "效率与技巧", level: "入门",
    summary: "窗口左上角那条小工具栏——把最常用的命令钉上去，点一下就执行。",
    detail: "快速访问工具栏（QAT）是标题栏左侧的固定小条，默认有保存、撤销。右键任意命令选「添加到快速访问工具栏」，就能把「插入形状」「格式刷」「对齐」等高频操作钉在那，不用每次翻功能区，手不离鼠标。",
    scenario: "天天用「组合」和「置于顶层」，把它俩钉到 QAT，比每次去开始/格式选项卡快一倍。",
    related: ["shortcut", "format-painter", "anim-painter"], demo: "quick-access"
  },
  {
    id: "find-replace", name: "批量查找替换", alias: "Find & Replace",
    category: "效率与技巧", level: "进阶",
    summary: "全篇把「旧产品名」一键换成「新产品名」，或把所有红色统一改成品牌色。",
    detail: "查找替换（Ctrl/Cmd+H）不只能换文字，还能按格式替换：把所有「微软雅黑」批量换成「思源黑体」、把所有红色字体换成品牌蓝。改一遍全篇生效，省去逐页手动改的灾难。",
    scenario: "公司更名，用替换把 50 页里的旧名全换成新名，30 秒搞定，零遗漏。",
    related: ["shortcut", "theme", "color-reuse"], demo: "find-replace"
  },
  {
    id: "loop-anim", name: "循环动画", alias: "Loop Animation",
    category: "动画与切换", level: "进阶",
    summary: "让一个元素「不停地转 / 一直呼吸」——用于 loading、装饰或强调。",
    detail: "循环动画是设成「重复：直到下一次单击/永久」的强调动画，比如持续旋转的风扇、上下浮动的箭头、脉冲发光的点。常用于片头 loading、循环强调某个图标，或做背景装饰动效，让页面「活」起来。",
    scenario: "页面角落放一个缓缓旋转的小齿轮，暗示「系统运行中」，比静止图标更有生命力。",
    related: ["anim-type", "anim-timing", "easing"], demo: "loop-anim"
  },
  {
    id: "custom-show", name: "自定义放映", alias: "Custom Show",
    category: "输出与放映", level: "进阶",
    summary: "同一份 PPT，给老板看 5 页、给客户看另 5 页——不复制文件也能办到。",
    detail: "自定义放映（Custom Show）从同一份演示里挑出若干页、按指定顺序组成一个「子放映」。你可为不同 audience 建多个版本（如「管理层精简版」「客户完整版），放映时选对应子集，源文件始终只有一份。",
    scenario: "对内汇报 20 页、对投资人只讲 8 页关键数据，建两个自定义放映，现场一键切换。",
    related: ["section", "autoplay", "hyperlink"], demo: "custom-show"
  },
  {
    id: "screen-blank-pen", name: "黑屏 / 标注笔", alias: "Blank / Pen",
    category: "输出与放映", level: "入门",
    summary: "放映时按一下全黑让观众看你了，或拿起「笔」在画面上圈重点。",
    detail: "放映中有两个隐藏神技：按 B（黑屏）/ W（白屏）瞬间清空屏幕、把注意力拉回你身上；按 Ctrl/Cmd+P 切换「笔」或「荧光笔」，可直接在画面上圈画标注，讲完按 E 擦除。它们让你像在白板上一样控场。",
    scenario: "讲完一页要互动，按 B 黑屏说「来看我」；讲到关键数据，拿笔圈一下，观众视线立刻锁住。",
    related: ["presenter-view", "shortcut", "rehearse"], demo: "screen-blank-pen"
  },
  {
    id: "present-online", name: "联机 / 远程放映", alias: "Present Online",
    category: "输出与放映", level: "进阶",
    summary: "把正在放的幻灯片「直播」出去，异地同事点链接就能同步看、还能看你讲。",
    detail: "联机放映（Present Online）生成一个链接，远程观众打开就能看到你正在放映的页面，和你翻页同步。适合异地会议、线上路演，省去先导出视频再传的麻烦。它和演讲者视图配合，观众只看到幻灯片、看不到你的备注。",
    scenario: "居家给外地客户提案，发个链接，对方实时跟着你翻页，讲到哪看到哪，像同处一室。",
    related: ["presenter-view", "autoplay", "speaker-notes"], demo: "present-online"
  },
  {
    id: "font-license", name: "字体版权", alias: "Font License",
    category: "字体与配色", level: "进阶",
    summary: "好看的字体不一定能商用——用错可能吃官司，先搞清楚授权再嵌。",
    detail: "字体版权指一款字体的使用授权范围：分「免费商用」「个人免费/商用需授权」「禁止商用」。企业汇报、对外发布若用了未授权字体，有侵权风险。常用做法是选明确免费商用的开源/公益字体，或购买企业授权，再配合「嵌入字体」打包。",
    scenario: "做对外发布的宣传 PPT，先确认用的字体可商用，否则换成免费商用字体，避免法律风险。",
    related: ["embed-font", "serif-sans", "font-weight"], demo: "font-license"
  },
  /* ============ 本轮新增（补充） ============ */
  {
    id: "edit-points", name: "编辑顶点", alias: "Edit Points",
    category: "图形与图示", level: "进阶",
    summary: "把形状轮廓的「控制点」拖成任意曲线，造出现成没有的形状。",
    detail: "每个形状其实是由一圈「顶点」连成的。编辑顶点模式让你增删顶点、拖动手柄，把方角拉成圆角、把圆拉成水滴——是自制图标和异形装饰的终极手段，常与布尔运算配合。",
    scenario: "把圆拉出「对话气泡」尖角，或把矩形拉成「标签」形。",
    related: ["boolean", "icon-style"], demo: "edit-points"
  },
  {
    id: "theme-variant", name: "主题变体", alias: "Theme Variants",
    category: "软件功能", level: "入门",
    summary: "同一主题下切换配色/字体变体，一键换肤不丢排版。",
    detail: "主题决定整套配色与字体；变体是主题下的「口味选项」——同一主题常有多种配色与字体组合。切变体能让演示瞬间换风格，却保持版式结构不变。",
    scenario: "给同一份提案做「蓝版」「橙版」两套配色给不同客户看。",
    related: ["theme"], demo: "theme-variant"
  },
  {
    id: "action-button", name: "动作按钮", alias: "Action Button",
    category: "软件功能", level: "进阶",
    summary: "在幻灯片放可点击的按钮，跳转/播放/打开链接。",
    detail: "插入里的「动作」或形状右键「超链接/动作」可让元素点击后：跳到指定页、播放声音、运行程序、打开文件。常用于目录页、答题互动、自助播放。",
    scenario: "目录页点「章节二」直接跳过去；结束页点按钮退出放映。",
    related: ["hyperlink", "custom-show"], demo: "action-button"
  },
  {
    id: "comment", name: "批注评论", alias: "Comments",
    category: "软件功能", level: "入门",
    summary: "在页面上钉评论，多人审片不破坏版面。",
    detail: "审阅→新建批注可在任意元素旁钉一条讨论，支持回复、解决、@人。批注只存在评论窗格，不影响幻灯片本身，适合团队改稿来回。",
    scenario: "把稿子发同事，他在某页留「这段太啰嗦」而不用直接改你版式。",
    related: ["section"], demo: "comment"
  },
  {
    id: "ruler", name: "标尺", alias: "Ruler",
    category: "软件功能", level: "入门",
    summary: "视图里打开的刻度尺，精确测量与对齐的参考。",
    detail: "勾选「标尺」会在画布上方和左侧显示刻度。配合参考线、网格，能按具体数值（如左右各留 1cm 边距）精准摆放，比肉眼对齐可靠。",
    scenario: "按品牌规范让所有页标题都从距左边 1.2cm 起。",
    related: ["guides", "grid"], demo: "ruler"
  },
  {
    id: "template", name: "模板", alias: "Template",
    category: "软件功能", level: "入门",
    summary: "区别于主题的整页版式骨架，开新文件就套好。",
    detail: "主题只管配色字体，模板还带了封面、目录、内页等现成版式与占位符。套模板能秒出统一风格；但别被花哨模板绑架，内容>装饰。",
    scenario: "用公司模板新建，封面/页眉/页脚自动带好 logo 和色条。",
    related: ["theme", "master"], demo: "template"
  },
  {
    id: "compare-merge", name: "比较并合并", alias: "Compare & Merge",
    category: "软件功能", level: "进阶",
    summary: "把两份演示合并，逐个看差异再决定留谁。",
    detail: "审阅→比较可把另一份文件与你当前文件逐页比对，标出增删改；合并能把别人改的页合回你的版本。适合多人各改一稿再汇总的场景。",
    scenario: "你和同事各改一版，合并时挑「这页用他的、那页用我的」。",
    related: ["comment", "section"], demo: "compare-merge"
  },
  {
    id: "wordart", name: "艺术字", alias: "WordArt",
    category: "字体与配色", level: "入门",
    summary: "花式文字：渐变填充、轮廓、变形、阴影一整套。",
    detail: "艺术字是带预设效果的文字对象，能做出波浪、填充渐变、描边发光等抢眼标题。适合封面大标题、重点词；正文千万别用，会显廉价。",
    scenario: "封面主标题用艺术字做出金属质感，一下就「高级」。",
    related: ["font-pairing", "gradient"], demo: "wordart"
  },
  {
    id: "object-effect", name: "对象效果", alias: "Shadow/Glow",
    category: "图形与图示", level: "入门",
    summary: "给形状/图片加阴影、发光、映像、柔化边缘。",
    detail: "格式里的「效果」组包含阴影、反射/映像、发光、柔化边缘、三维旋转。少量使用能做出层次与质感；滥用会变「立体感大杂烩」。",
    scenario: "给产品图加淡淡投影，立刻「浮」在背景上。",
    related: ["transparency"], demo: "object-effect"
  },
  {
    id: "textbox-placeholder", name: "文本框 vs 占位符", alias: "Box vs Holder",
    category: "软件功能", level: "入门",
    summary: "占位符跟母版走、能批量改；文本框是自由散兵。",
    detail: "占位符是版式/母版里预设的框，改母版一处、所有页同步；文本框是你在页面随手画的，独立于母版。量产型文字用占位符，临时标注用文本框。",
    scenario: "标题要全站统一样式→用占位符；一句旁注→用文本框。",
    related: ["placeholder", "master"], demo: "textbox-placeholder"
  },
  {
    id: "bullet", name: "项目符号与编号", alias: "Bullets",
    category: "字体与配色", level: "入门",
    summary: "用符号/编号表达列表的层级与顺序。",
    detail: "项目符号把并列要点视觉对齐，编号则强调步骤先后。可改符号样式、缩进层级（一级/二级）。滥用长句+多层嵌套会显啰嗦。",
    scenario: "三点核心结论用圆点符号并列；操作流程用 1/2/3 编号。",
    related: ["font-pairing", "alignment"], demo: "bullet"
  },
  {
    id: "hide-slide", name: "隐藏幻灯片", alias: "Hide Slide",
    category: "输出与放映", level: "入门",
    summary: "放映时跳过这页但不删除，按需临时显示。",
    detail: "右键幻灯片→隐藏后，正常放映会跳过它；按住 Alt 点缩略图可临时放出。适合「备用页」「答疑页」随场景取舍。",
    scenario: "带一页「超纲细节」隐藏，被问到时 Alt 点出。",
    related: ["custom-show", "rehearse"], demo: "hide-slide"
  },
  {
    id: "narration", name: "旁白录音", alias: "Narration",
    category: "输出与放映", level: "进阶",
    summary: "给每页录语音讲解，放映时自动播放。",
    detail: "幻灯片放映→录制旁白可对着每页说话，声音嵌进文件，后续自动放映即带解说。适合做课件、自学材料、无人值守展播。",
    scenario: "录一套产品讲解，客户自己点开就能听完整推介。",
    related: ["rehearse", "present-online"], demo: "narration"
  },
  {
    id: "transparency", name: "透明度", alias: "Transparency",
    category: "图形与图示", level: "入门",
    summary: "调低不透明度，让形状/图片叠压出层次。",
    detail: "透明度（不透明度百分比）让元素半透，叠在图片或色块上能透出底层，做出景深与融合感。常与对象效果搭配。",
    scenario: "半透明白块压在图片上，既遮杂乱又透出底图。",
    related: ["object-effect", "image-mask"], demo: "transparency"
  },

  /* ============ 补充：按优先级新增（2026-07-25） ============ */
  {
    id: "slide-size", name: "幻灯片大小 / 自定义尺寸", alias: "Slide Size",
    category: "软件功能", level: "入门",
    summary: "改画布比例（4:3 ↔ 16:9）和尺寸，决定每页能装多少、是否满屏。",
    detail: "幻灯片大小（设计→幻灯片大小）设定画布宽高比与像素。传统 4:3 偏方、信息容量大；现代 16:9 宽屏更贴合投影与屏幕。改尺寸会整体缩放内容，大改小常被裁，先定尺寸再排版最稳。",
    scenario: "给客户投屏用 16:9；做旧式打印讲义或扫码看的稿子可能需 4:3，提前定好别返工。",
    related: ["widescreen", "margin", "bleed"], demo: "slide-size"
  },
  {
    id: "replace-font", name: "替换字体", alias: "Replace Fonts",
    category: "字体与配色", level: "进阶",
    summary: "一键把全篇某字体换成另一种，救回「字体装不来就乱码」的稿子。",
    detail: "替换字体（开始→编辑→替换字体）能把所有「微软雅黑」批量换成「思源黑体」等，省去逐页改。常用于换电脑没装原字体、或统一风格时。注意它只换字体，不改字号与颜色。",
    scenario: "发给没装字体的同事前，先把特殊字体替换成通用字体，避免打开变宋体。",
    related: ["find-replace", "font-weight", "type-scale"], demo: "replace-font"
  },
  {
    id: "gridlines", name: "网格线", alias: "Gridlines",
    category: "软件功能", level: "入门",
    summary: "画布上更密的辅助格点，帮你对齐到「看不见的网格」。",
    detail: "网格线（视图→显示→网格线）在画布铺一层等距小点阵，元素可吸附到格点，比参考线更密、适合精细排版。它与标尺、参考线互补：标尺看尺寸、参考线对齐单条、网格线对齐整片。",
    scenario: "做图标矩阵、九宫格内容时开网格线，保证每个小图间距完全一致。",
    related: ["ruler", "guides", "alignment"], demo: "gridlines"
  },
  {
    id: "recolor", name: "图片重新着色 / 校正", alias: "Recolor & Correct",
    category: "图形与图示", level: "进阶",
    summary: "给图片/形状一键换色系（灰度、强调色、冲蚀），不动原图也能统一色调。",
    detail: "重新着色（图片格式→颜色→重新着色）用主题色板把整张图映射到新色系，还能调饱和度、做冲蚀半调。它是「不修改原图就统一视觉」的利器，特别适合把彩色截图压成单色点缀。",
    scenario: "把一堆彩色软件截图统一成「紫调单色」，瞬间和 PPT 主题融合。",
    related: ["transparency", "image-mask", "object-effect"], demo: "recolor"
  },
  {
    id: "coauthor", name: "共同创作 / 实时协作", alias: "Co-authoring",
    category: "软件功能", level: "进阶",
    summary: "多人同时在线编辑同一份 PPT，各自光标实时可见、改动即时合并。",
    detail: "共同创作（存在 OneDrive/SharePoint 后「共享」）让团队成员同时打开编辑，能看到别人的选区光标与输入，改动自动合并、可看版本历史。告别「最终版_v3_真final.pptx」的邮件拉锯。",
    scenario: "你和同事分头做不同章节，同一份文件并行推进，结束直接是成品。",
    related: ["present-online", "comment", "compare-merge"], demo: "coauthor"
  },
  {
    id: "text-margin", name: "文本框内部边距", alias: "Internal Margin",
    category: "排版与布局", level: "入门",
    summary: "文本框内部留白，决定文字离边框多远——调它比加空格更专业。",
    detail: "文本框内部边距（右键文本框→设置形状格式→文本框→内部边距）控制文字与框线的距离。把它调大，文字更透气；做标注、引号框时常靠它。别用回车/空格硬挤，改边距才整齐可控。",
    scenario: "做引用金句框时，把上下左右内边距调到 12–16px，文字立刻不顶边。",
    related: ["margin", "column", "alignment"], demo: "text-margin"
  },
  {
    id: "visual-flow", name: "视觉流", alias: "Visual Flow",
    category: "设计原则", level: "进阶",
    summary: "观众视线在页面上的移动路线，好的设计要「牵着眼睛走」。",
    detail: "视觉流是读者视线自然扫过的路径，受大小、颜色、位置引导。强元素（大图、亮色、箭头）先被看到，弱元素后看。排版就是安排这条路径，让重点先入眼、逻辑顺下去。",
    scenario: "一页想让人先看结论再看论据，就把结论放大置顶、论据缩小置下，路径自然成形。",
    related: ["f-pattern", "focus", "hierarchy"], demo: "visual-flow"
  },
  {
    id: "info-density", name: "信息密度", alias: "Information Density",
    category: "设计原则", level: "进阶",
    summary: "单位面积里塞了多少信息——太密喘不过气，太疏显空。",
    detail: "信息密度指一页承载内容的多少。高密度适合数据密集的报表，低密度适合金句、封面。关键是「该密处密、该疏处疏」，用留白和分组控制节奏，而不是一味堆或一味空。",
    scenario: "封面放一句话（低密度），数据页放图表+要点（高密度），靠密度差拉开节奏。",
    related: ["whitespace", "less-is-more", "card-layout"], demo: "info-density"
  },
  {
    id: "consistency", name: "视觉一致性 / 统一", alias: "Visual Consistency",
    category: "设计原则", level: "进阶",
    summary: "全篇字体、配色、间距、图标风格统一，专业感就来自这里。",
    detail: "视觉一致性指整套幻灯片在相同元素上用相同规则：标题字号一致、主色不超三个、图标同风格、间距成节奏。一致减少认知负担，让人感觉「这是一套东西」。靠母版和主题最能保住它。",
    scenario: "十页用三种图标风格、五个主色，看起来像拼凑；统一后立刻像专业出品。",
    related: ["brand-vi", "theme", "icon-style"], demo: "consistency"
  },

  /* ============ 扩容补充（最该补 + 实用进阶） ============ */
  {
    id: "slide-sorter", name: "幻灯片浏览视图", alias: "Slide Sorter View",
    category: "软件功能", level: "入门",
    summary: "所有页面缩成缩略图排成一屏，拖一下就能重排、批量选中。",
    detail: "幻灯片浏览视图把每一页缩成小图横竖排开，让你一眼看到全篇结构和顺序。在这里可以拖动缩略图重排页面、框选多页批量删除/移动、快速给某页加切换。长文档整理顺序时，它比在一页页普通视图里翻快得多。",
    scenario: "做完 30 页汇报，要在中间插一章并重排，切到浏览视图拖拽即可，不用逐页找。",
    related: ["outline-view", "section", "transition-fx"], demo: "slide-sorter"
  },
  {
    id: "notes-page", name: "备注页视图", alias: "Notes Page View",
    category: "软件功能", level: "入门",
    summary: "每页下方一块「演讲稿」区域，专写你要讲的话，台上不穿帮。",
    detail: "备注页视图在每页幻灯片下方留出备注区，你在那写逐字稿、数据口径、过渡话术，观众在投影上只看到幻灯片本身。配合演讲者视图，你能在自己屏幕上看到备注，观众看不到。区别于「备注母版」（统一备注区格式）和「演讲备注」（备注内容本身）。",
    scenario: "路演、讲课把关键数据和接话写进备注，上台不慌、不念错。",
    related: ["speaker-notes", "presenter-view", "notes-master"], demo: "notes-page"
  },
  {
    id: "reading-view", name: "阅读视图", alias: "Reading View",
    category: "软件功能", level: "入门",
    summary: "像放幻灯片一样全屏自看，但不进正式放映，对稿自查最方便。",
    detail: "阅读视图用接近放映的全屏方式播放当前文稿，但不会触发正式放映的那些控制（如黑屏、标注）。适合自己过一遍流程、检查动画顺序和文字有没有错别字，又不想被打断。按 Esc 随时退出。",
    scenario: "上台前最后一遍默片自查，用阅读视图比正式放映轻、比普通视图沉浸。",
    related: ["presenter-view", "autoplay", "screen-blank-pen"], demo: "reading-view"
  },
  {
    id: "fill-rate", name: "版面率 / 图版率", alias: "Text-to-Image Ratio",
    category: "设计原则", level: "进阶",
    summary: "一页里图文占了多少面积——满则挤，空则飘，靠它控节奏。",
    detail: "版面率（图版率）指页面被文字和图片覆盖的面积比例。高版面率信息量大、显得充实，但过满会喘不过气；低版面率留白多、显高级透气，但太空会单薄。封面、金句页常用低版面率，数据页用高版面率，靠差值制造节奏。",
    scenario: "封面只放一句话（低版面率显高级），内页图表+要点（高版面率显充实）。",
    related: ["whitespace", "less-is-more", "info-density"], demo: "fill-rate"
  },
  {
    id: "cmyk-rgb", name: "印刷色 CMYK vs 屏幕色 RGB", alias: "CMYK vs RGB",
    category: "输出与放映", level: "进阶",
    summary: "屏幕用 RGB 发光，印刷用 CMYK 吸光——同一蓝打印常变灰变暗。",
    detail: "屏幕靠 RGB 三色光叠加发光，色域广；印刷靠 CMYK 四色油墨吸光，色域窄。很多在屏幕上很艳的蓝、绿，落到印刷上会发灰发暗，这就是「色差」。交付印刷物前，最好在支持 CMYK 的软件里校色，或把主色选在两者重叠的安全区。",
    scenario: "做要打印的画册/手册，先确认主色在 CMYK 下不塌，别等印出来才傻眼。",
    related: ["export-pdf", "export-dpi", "muted-color"], demo: "cmyk-rgb"
  },
  {
    id: "text-outline", name: "文字描边 / 轮廓", alias: "Text Outline",
    category: "字体与配色", level: "进阶",
    summary: "给字加一圈边，复杂背景上也能「立」住，不再糊成一团。",
    detail: "文字描边（轮廓）是在文字边缘加一道同色或对比色的线条。当文字压在图片、渐变或花底上、单纯改颜色看不清时，描边能把字「勾」出来。常见用法：白字加细黑边、或深字加白边。描边太粗会显笨重，细一点更高级。",
    scenario: "标题压在大图或渐变上，加一道半透明描边，字立刻清晰有质感。",
    related: ["font-weight", "contrast", "wordart"], demo: "text-outline"
  },
  {
    id: "bg-format", name: "幻灯片背景格式", alias: "Slide Background",
    category: "软件功能", level: "入门",
    summary: "纯色、渐变、图片一键铺满整页背景，统一氛围从这里开始。",
    detail: "背景格式让你给单页或全部页面设背景：纯色最干净、渐变最现代、图片最沉浸（常配蒙版压暗保证文字可读）。设背景和加一个铺满的形状不同——背景不会被选中、不会挡内容，且能「应用到全部」一键统一。",
    scenario: "做暗色科技风，用深蓝径向渐变做全局背景，比逐页拖矩形省事且不会被误选。",
    related: ["theme", "gradient", "image-mask"], demo: "bg-format"
  },
  {
    id: "action-settings", name: "动作设置", alias: "Action Settings",
    category: "软件功能", level: "进阶",
    summary: "点一下或划过，就触发跳转/运行/播声音——比超链接更「活」。",
    detail: "动作设置给对象（图形、图片、按钮）绑定交互：单击或鼠标悬停时，可以跳到指定页、打开链接、运行程序、播放声音。它和「超链接」相似但更灵活（支持悬停触发、可加音效）；「动作按钮」其实就是预置好动作设置的图形。适合做目录页、问答互动。",
    scenario: "目录页点章节名跳对应页，或鼠标悬停图标播放提示音，做交互课件很顺手。",
    related: ["action-button", "hyperlink", "zoom-loc"], demo: "action-settings"
  },
  {
    id: "vertical-text", name: "文字竖排", alias: "Vertical Text",
    category: "字体与配色", level: "进阶",
    summary: "中文从上往下排，做竖版海报、古风金句、侧边标题很对味。",
    detail: "文字竖排让文本沿垂直方向从上往下阅读，是中文传统的排法。用在竖版海报、国风金句、页面侧边的小标题上，比横排更有韵味和仪式感。注意竖排时标点会变成直式标点，字号和行距要重新调，避免挤。",
    scenario: "做国风封面或春联式金句页，标题竖排立刻有那味儿。",
    related: ["serif-sans", "line-height", "tracking"], demo: "vertical-text"
  },
  {
    id: "emphasis-fx", name: "动画强调效果", alias: "Emphasis Effects",
    category: "动画与切换", level: "进阶",
    summary: "对象不进不出、原地「动一下」吸引注意：放大、脉冲、陀螺旋…",
    detail: "强调动画让已经在页面上的对象「原地动一下」来抓眼球：放大/缩小、脉冲（忽大忽小）、陀螺旋（旋转）、闪烁、填充颜色等。它和进入/退出不同——对象始终在画面里。适合讲到关键数据时点一下让它「跳」出来。",
    scenario: "讲到一个核心数字，给它加个脉冲强调，观众视线立刻被钉住。",
    related: ["anim-type", "anim-timing", "trigger"], demo: "emphasis-fx"
  },
  {
    id: "icons", name: "图标（插入与获取）", alias: "Icons",
    category: "图形与图示", level: "入门",
    summary: "用图形符号代替大段文字，一眼就懂；Office 内置可搜可改色。",
    detail: "图标是表意的极简图形符号，比文字更快被理解，也更能撑起版面。PPT 里可直接插入内置图标库（可搜索、可改填充色、可转形状二次编辑），也能用第三方图标网站。插入后记得统一风格、统一线宽，别混搭。",
    scenario: "流程页用一组线性图标代替「步骤一/二/三」文字，清爽又好读。",
    related: ["icon-style", "boolean", "smartart"], demo: "icons"
  },
  {
    id: "autosave", name: "自动保存与恢复", alias: "AutoSave & Recover",
    category: "效率与技巧", level: "入门",
    summary: "开着自动保存，崩了也不慌；意外关了还能从恢复里捞回来。",
    detail: "自动保存会定时把进度写盘，配合 OneDrive/本地缓存，软件崩溃或误关后能「文档恢复」找回未保存的版本。养成开着自动保存、关键节点手动存一次的习惯，比靠运气稳。注意：自动保存不等于版本历史，重要改动仍建议另存。",
    scenario: "讲到一半软件崩了，重开弹出「恢复未保存的文件」，十几页白干的钱省回来了。",
    related: ["shortcut", "template", "find-replace"], demo: "autosave"
  },
  {
    id: "para-spacing", name: "段前 / 段后间距", alias: "Space Before & After",
    category: "排版与布局", level: "入门",
    summary: "段与段之间的呼吸感，靠段前/段后间距调，不是狂敲回车。",
    detail: "段前/段后间距控制段落之间的垂直空白，单位通常是磅(pt)。它比在段落间狂敲回车专业：回车产生的空行会跟着字体缩放、复制时易错位，而段间距是「规则」，全局一致、改字号也不会乱。它和行距（段内行与行的距离）是两个维度，要分开调。",
    scenario: "正文段落贴在一起喘不过气，加 6pt 段后间距，立刻清爽有节奏。",
    related: ["margin", "alignment", "tracking"], demo: "para-spacing"
  },
  {
    id: "chart-edit", name: "图表（插入与编辑）", alias: "Insert & Edit Chart",
    category: "图形与图示", level: "入门",
    summary: "把数据变成图表，双击进 Excel 改数，套用图表样式一键美。",
    detail: "插入图表会生成一个联动的数据表，双击图表即可编辑底层数据，改数字图形实时变。还能套用「图表样式」、切换柱/饼/折线、设置数据标签与坐标轴。区别于「数据可视化 / 选对图表」（那是设计原则，讲该用什么图），这条讲怎么插入和编辑图表这个对象本身。",
    scenario: "季度汇报把 Excel 数字粘成柱状图，老板改个数图表跟着变，不用重画。",
    related: ["infographic", "table-beauty", "fill-rate"], demo: "chart-edit"
  },
  {
    id: "audio-insert", name: "音频（插入与播放控制）", alias: "Insert Audio",
    category: "软件功能", level: "入门",
    summary: "插背景音乐或音效，设跨页播放、淡入淡出、点击触发。",
    detail: "插入音频可把音乐/音效放进幻灯片，在「播放」选项卡设置：跨幻灯片播放、循环、淡入淡出、开始方式（单击/自动）。区别于「旁白录音」（那是现场录人声），这条是插入现成的音频文件并控制它的播放行为。",
    scenario: "开场放段音乐烘托气氛，设「跨页播放+淡出」，切到内容页声音自然收住。",
    related: ["narration", "export-media", "autoplay"], demo: "audio-insert"
  },
  {
    id: "video-insert", name: "视频（插入与播放设置）", alias: "Insert Video",
    category: "软件功能", level: "入门",
    summary: "把视频当对象插进来，裁剪长度、全屏播放、点击才播。",
    detail: "插入视频会作为一个可编辑对象，能裁剪入点/出点、设海报帧、选播放方式（单击/自动/全屏）。区别于「导出图片 / GIF / 视频」（那是把幻灯片输出成 mp4），这条是把外部视频放进页面里播放。",
    scenario: "产品发布会插一段 15 秒宣传片，设全屏自动播放，现场效果拉满。",
    related: ["export-media", "narration", "autoplay"], demo: "video-insert"
  },
  {
    id: "a11y", name: "辅助功能检查器", alias: "Accessibility Checker",
    category: "软件功能", level: "进阶",
    summary: "一键扫出无障碍问题：缺 alt 文本、阅读顺序乱、对比度不够。",
    detail: "辅助功能检查器会扫描幻灯片，标出图片没有替代文本、标题阅读顺序错乱、文字与背景对比度不足等问题。做对外 / 政府 / 大屏内容时尤其重要——既照顾视障用户，也避免大屏上看不清。检查器在「审阅」选项卡。",
    scenario: "交政府汇报材料前跑一遍检查器，补上所有图片的 alt 文本，合规又专业。",
    related: ["color-wheel", "type-scale", "hierarchy"], demo: "a11y"
  },
  {
    id: "excel-table", name: "数据表（嵌入 Excel）", alias: "Embedded Excel Table",
    category: "图形与图示", level: "进阶",
    summary: "嵌一张活的 Excel 表，数据随源文件改，区别于静态美化表。",
    detail: "嵌入 Excel 表格会把一个可编辑的电子表格放进幻灯片，双击进入 Excel 编辑，数据与源文件可联动更新；改源数据幻灯片里跟着变。区别于「表格美化」（那是把已有的静态表格做得好看），这条强调「活数据、可编辑、可更新」。",
    scenario: "月度数据用嵌入表，财务改了 Excel，PPT 里点「更新链接」就同步，不用重抄。",
    related: ["table-beauty", "infographic", "chart-edit"], demo: "excel-table"
  },
  {
    id: "text-link", name: "文本框链接 / 文字溢出", alias: "Linked Text Boxes",
    category: "排版与布局", level: "进阶",
    summary: "一个框装不下，让文字自动流向下一个框，断页不断意。",
    detail: "文本框链接让多个框共享同一段文字流：前一个框满了，剩余文字自动流到下一个框。适合杂志式多栏、长文跨页。区别于「文本框内部边距」（框内留白），这条讲框与框之间的文字流动。",
    scenario: "一页放不下的长稿件，用两个链接框做左右分栏，文字自动续接不手抄。",
    related: ["textbox-placeholder", "text-margin", "margin"], demo: "text-link"
  },
  {
    id: "section-view", name: "节视图 / 折叠展开", alias: "Section View",
    category: "软件功能", level: "入门",
    summary: "用「节」把长文档分块，在大纲/浏览视图里折叠收起，清爽管理。",
    detail: "节不仅能给幻灯片分组、加标题，还可以在大纲视图或幻灯片浏览视图里折叠/展开整节，长文档（几十上百页）瞬间从「一长条」变成「可折叠的章节树」。区别于「节」那条只讲分组概念，这条强调「视图里的折叠展开」这种管理方式。",
    scenario: "80 页方案按章节折叠，汇报前只展开「执行摘要」一节，聚焦又不乱。",
    related: ["section", "slide-sorter", "outline-view"], demo: "section-view"
  },
  {
    id: "ai-gen", name: "AI 辅助生成", alias: "AI-Assisted Generation",
    category: "软件功能", level: "进阶",
    summary: "Copilot 类一键从主题/文档生成草稿、重排版面，人把关不代劳。",
    detail: "现代 PPT 内置 AI（如 Copilot）：给个主题或丢进一份 Word，它能生成大纲、起草多页、重排版面、润色文案。但它产出的是「草稿」——结构、配色、事实仍需人来把关。和「设计器」（单页配色建议）不同，AI 辅助是端到端的从 0 到 1。",
    scenario: "把年度总结文档丢给 AI，三分钟出 10 页初稿，你只改重点和配图。",
    related: ["designer", "template", "reuse-slides"], demo: "ai-gen"
  },
  {
    id: "gestalt", name: "格式塔原理", alias: "Gestalt Principles",
    category: "设计原则", level: "进阶",
    summary: "人脑会自动把相近/相似/闭合的元素看成一组，排版要顺着它。",
    detail: "格式塔是感知心理学：相近律（挨得越近越被当成一组）、相似律（长得像的被当成一组）、闭合律（残缺轮廓脑补成完整）、连续律等。PPT 里「亲密性」「重复」这些原则底层就是格式塔——把相关的放近、用一致样式，观众自然读懂结构。",
    scenario: "标题和配图挨在一起、和正文拉开距离，观众一眼就分清「这是一组」。",
    related: ["proximity", "alignment", "repetition"], demo: "gestalt"
  }
];

if (typeof window !== "undefined") window.TERMS = TERMS;
if (typeof module !== "undefined") module.exports = TERMS;
