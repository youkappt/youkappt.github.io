/* ============================================================
   PPThub — 词条补充字段（不污染 data.js）
   字段：pitfall 常见误区 / shortcut {win,mac,menu} 快捷键与菜单路径 / checklist 自检清单(数组)
        / mnemonic 记忆口诀 / combo 进阶组合技 / etymology 词源小注
   由 app.js 在运行时合并进 TERMS。
   ============================================================ */

const TERM_EXTRA = {
  /* ============ 软件功能 ============ */
  'master': {
    pitfall: '只在单页逐个改样式，几十页要对齐时全崩——改母版一次顶百次。',
    shortcut: {
      mac: '⌘+⇧+D',
      menu: '视图 → 幻灯片母版'
    },
    combo: '母版 + 版式：给不同章节建多套版式，切换比手动复制快得多。',
    mnemonic: '母版像「总模板」，共性放这，个性留单页。',
    mnemonicImg: 'images/mnemonic/master.jpg',
  },
  'layout': {
    pitfall: '在空白版式上手动拖框，不如选对版式继承统一风格。',
    shortcut: {
      menu: '开始 → 版式（或右键缩略图选「版式」）'
    },
    combo: '版式 + 占位符：换版式时内容自动归位，不乱。',
    mnemonic: '版式是页面的「骨架预设」。',
    mnemonicImg: 'images/mnemonic/layout.jpg',
  },
  'placeholder': {
    pitfall: '用普通文本框替代占位符，后续无法整体改标题样式。',
    mnemonic: '占位符是「带类型的框」，标题就是标题。',
    mnemonicImg: 'images/mnemonic/placeholder.jpg',
  },
  'animation-pane': {
    pitfall: '只在「添加动画」里点，不懂用动画窗格调速序，动画全堆一起。',
    shortcut: {
      win: 'Alt+A+P',
      menu: '选中对象 → 动画 → 动画窗格'
    },
    combo: '动画窗格 + 触发：把动画绑到别的对象点击上，做交互。',
    mnemonic: '动画窗格是动画的「时间轴中控台」。',
    mnemonicImg: 'images/mnemonic/animation-pane.jpg',
  },
  'guides': {
    pitfall: '凭肉眼对齐，差几像素肉眼看不出但一眼乱。',
    shortcut: {
      win: 'Alt+F9',
      menu: '视图 → 参考线 / 智能参考线（拖动对象时自动出现）'
    },
    mnemonic: '参考线是「临时吸附辅助线」，不打印。',
    mnemonicImg: 'images/mnemonic/guides.jpg',
  },
  'boolean': {
    pitfall: '用「组合」代替「合并形状」，结果不能单独改某个形状的颜色。',
    shortcut: {
      menu: '选中两个形状 → 形状格式 → 合并形状'
    },
    combo: '布尔 + 编辑顶点：拼出复杂形状后还能微调轮廓。',
    etymology: '布尔（Boolean）源自数学家布尔，指集合的并/交/差运算。',
    mnemonic: '布尔是「形状的集合运算」。',
    mnemonicImg: 'images/mnemonic/boolean.jpg',
  },
  'eyedropper': {
    pitfall: '截图去 PS 取色再填，其实 PPT 自带吸管直接吸页面任意颜色。',
    shortcut: {
      menu: '颜色下拉 → 取色器（吸管图标）'
    },
    mnemonic: '取色器就是「颜色吸管」。',
    mnemonicImg: 'images/mnemonic/eyedropper.jpg',
  },
  'smartart': {
    pitfall: '用一堆文本框拼流程图，改起来要逐个调。',
    shortcut: {
      menu: '插入 → SmartArt'
    },
    combo: 'SmartArt + 转形状：定型后转成可自由编辑的形状。',
    mnemonic: 'SmartArt 是「现成的图示库」。',
    mnemonicImg: 'images/mnemonic/smartart.jpg',
  },
  'section': {
    pitfall: '用空白标题页当分隔，导航里一堆无名页难以管理。',
    shortcut: {
      menu: '开始 → 节（或右键缩略图「新增节」）'
    },
    mnemonic: '节是「给幻灯片分组」。',
    mnemonicImg: 'images/mnemonic/section.jpg',
  },
  'zoom-loc': {
    pitfall: '用超链接跳到别页，回不来或路径乱。',
    shortcut: {
      menu: '插入 → 缩放定位 → 幻灯片缩放'
    },
    combo: '缩放定位 + 节：做非线性目录，点哪进哪。',
    mnemonic: '缩放定位是「可点击的缩略图入口」。',
    mnemonicImg: 'images/mnemonic/zoom-loc.jpg',
  },
  'theme': {
    pitfall: '每页手动改配色，全盘换风格时崩溃。',
    shortcut: {
      menu: '设计 → 主题（及右侧变体）'
    },
    mnemonic: '主题是「整套配色字体包」。',
    mnemonicImg: 'images/mnemonic/theme.jpg',
  },
  'selection-pane': {
    pitfall: '层层叠叠找不到对象，靠盲点乱选。',
    shortcut: {
      win: 'Alt+H+SL',
      menu: '开始 → 选择 → 选择窗格'
    },
    mnemonic: '选择窗格是「对象图层列表」。',
    mnemonicImg: 'images/mnemonic/selection-pane.jpg',
  },
  'z-order': {
    pitfall: '叠压顺序调反，重要对象被遮住。',
    shortcut: {
      win: [
        { key: 'Ctrl+Shift+]', name: '置于顶层', scope: 'Office' },
        { key: 'Ctrl+Shift+[', name: '置于底层', scope: 'Office' }
      ]
    },
    mnemonic: '叠压顺序＝「谁在谁上面」。',
    mnemonicImg: 'images/mnemonic/z-order.jpg',
  },
  'group': {
    pitfall: '组合后忘记取消组合，导致单个子对象改不了。',
    shortcut: {
      win: [
        { key: 'Ctrl+G', name: '组合', scope: 'Office' },
        { key: 'Ctrl+Shift+G', name: '取消组合', scope: 'Office' }
      ]
    },
    mnemonic: '组合＝「把多个对象当成一个」。',
    mnemonicImg: "images/mnemonic/group.jpg"
  },
  'designer': {
    pitfall: '无视右侧设计灵感，手动排半天还不好看。',
    shortcut: {
      menu: '设计 → 设计灵感（选中图片/文字后右侧出现）'
    },
    mnemonic: '设计器是「AI 排版助手」。',
    mnemonicImg: "images/mnemonic/designer.jpg"
  },
  'reuse-slides': {
    pitfall: '从别处全选复制，把原格式也带乱。',
    shortcut: {
      menu: '开始 → 新建幻灯片 → 重用幻灯片（可勾选保留源格式）'
    },
    mnemonic: '复用幻灯片是「借用别处页」。',
    mnemonicImg: "images/mnemonic/reuse-slides.jpg"
  },
  'screen-record': {
    pitfall: '用第三方录屏再导入，其实 PPT 内置就能直接录。',
    shortcut: {
      menu: '插入 → 屏幕录制（选区域后录制）'
    },
    mnemonic: '屏幕录制是「PPT 内置录屏」。',
    mnemonicImg: "images/mnemonic/screen-record.jpg"
  },
  'notes-master': {
    pitfall: '打印讲义前才调版式，手忙脚乱。',
    shortcut: {
      menu: '视图 → 备注母版 / 讲义母版'
    },
    combo: '讲义母版 + 导出 PDF：一键出带笔记区的讲义。',
    mnemonic: '讲义母版管「打印出来的样子」。',
    mnemonicImg: 'images/mnemonic/notes-master.jpg',
  },

  /* ============ 设计原则 ============ */
  'alignment': {
    pitfall: '只对齐左边，右边参差；或元素间没对齐参照，整体散。',
    mnemonic: '对齐就是「让边和边成一条线」。',
    mnemonicImg: 'images/mnemonic/notes-master.jpg',
    mnemonicImg: "images/mnemonic/alignment.jpg",
    combo: '对齐 + 参考线：开智能参考线，拖动自动吸附。'
  },
  'proximity': {
    pitfall: '相关内容散落各处，读者不知谁和谁是一组。',
    mnemonic: '亲密性＝「相关的靠在一起」。',
    mnemonicImg: 'images/mnemonic/proximity.jpg',
    etymology: 'Proximity 意为「邻近」，设计中指视觉上的靠近分组。'
  },
  'contrast': {
    pitfall: '对比做成五颜六色却无主次，反而糊。',
    mnemonic: '对比是「制造差异突出重点」。',
    mnemonicImg: 'images/mnemonic/contrast.jpg',
    combo: '对比 + 视觉层级：用大小/色差直接画出阅读顺序。'
  },
  'repetition': {
    pitfall: '重复变成「到处一样」的杂乱，而非统一的节奏。',
    mnemonic: '重复是「用统一元素形成节奏」。',
    mnemonicImg: 'images/mnemonic/repetition.jpg',
    combo: '重复 + 品牌VI：同色同字体贯穿，专业感就来了。'
  },
  'hierarchy': {
    pitfall: '所有信息同等重要地铺开，读者不知道先看哪。',
    mnemonic: '视觉层级＝「给信息排座次」。',
    combo: '层级 + 字号阶梯：用 type-scale 直接拉开档次。'
  },
  'whitespace': {
    pitfall: '留白留成空洞——元素缩一角，旁边大片空却无呼吸感。',
    mnemonic: '留白不是「没东西」，是「主动的呼吸空间」。',
    mnemonicImg: 'images/mnemonic/whitespace.jpg',
    etymology: 'Negative Space 直译「负空间」，即被主动留出的空白。'
  },
  'focus': {
    pitfall: '用一大圈红框硬标，反而破坏画面。',
    mnemonic: '焦点引导＝「把眼睛牵到该看的地方」。',
    mnemonicImg: 'images/mnemonic/focus.jpg',
    combo: '焦点 + 对比：用色彩/大小差异自然吸睛。'
  },
  'grid': {
    pitfall: '凭感觉排，结果栏宽不一、对不齐。',
    mnemonic: '栅格是「隐形的排版坐标」。',
    mnemonicImg: 'images/mnemonic/grid.jpg',
    combo: '栅格 + 栏宽：定好栏数，内容自动对齐。'
  },
  'less-is-more': {
    pitfall: '减成「啥都没了」，信息也没了。',
    mnemonic: '减法＝「去掉干扰，留下重点」。',
    mnemonicImg: 'images/mnemonic/less-is-more.jpg',
  },

  /* ============ 字体与配色 ============ */
  'serif-sans': {
    pitfall: '正文用衬线小字屏显发虚，或标题用无衬线显单薄。',
    mnemonic: '衬线有「脚」显传统，无衬线干净显现代。',
    mnemonicImg: 'images/mnemonic/serif-sans.jpg',
  },
  'type-scale': {
    pitfall: '字号只敢用 12/14/16，不敢拉开层级。',
    shortcut: {
      win: [
        { key: 'Ctrl+Shift+>', name: '增大字号', scope: 'Office' },
        { key: 'Ctrl+Shift+<', name: '减小字号', scope: 'Office' }
      ],
      mac: [
        { key: '⌘+Shift+>', name: '增大字号', scope: 'Office' },
        { key: '⌘+Shift+<', name: '减小字号', scope: 'Office' }
      ]
    },
    mnemonic: '字号＝「大中小三级跳」。',
    mnemonicImg: 'images/mnemonic/type-scale.jpg',
  },
  'font-weight': {
    pitfall: '整页一个字重，靠加粗堆重点，乱。',
    mnemonic: '字重是「字的粗细档」。',
    mnemonicImg: 'images/mnemonic/font-weight.jpg',
  },
  'tracking': {
    pitfall: '标题字距过紧显挤，或过松显散。',
    shortcut: {
      menu: '开始 → 字符间距（或字体对话框）'
    },
    mnemonic: '字间距＝「字与字的呼吸」。',
    mnemonicImg: 'images/mnemonic/tracking.jpg',
    etymology: 'Tracking（字距）/ Kerning（字偶距）是两个不同概念。'
  },
  'line-height': {
    pitfall: '行距过紧读着喘，过松段落散。',
    mnemonic: '行距是「行的上下呼吸」。',
    mnemonicImg: 'images/mnemonic/line-height.jpg',
  },
  'analogous': {
    pitfall: '邻近色用太多显单调没重点。',
    mnemonic: '邻近色＝「色环上挨着的友邻色」。',
    mnemonicImg: 'images/mnemonic/analogous.jpg',
  },
  'complementary': {
    pitfall: '红配绿高饱和直接撞，刺眼。',
    mnemonic: '对比色＝「色环对面的互补色」。',
    mnemonicImg: 'images/mnemonic/complementary.jpg',
    etymology: 'Complementary 源自「互补」，混合成灰。'
  },
  'tri-color': {
    pitfall: '主辅点三等大，没有主导色。',
    mnemonic: '主辅点＝「7:2.5:0.5 的配色比例」。',
    mnemonicImg: 'images/mnemonic/tri-color.jpg',
    combo: '三色 + 品牌VI：主色定调，辅色支撑，点缀提神。'
  },
  'gradient': {
    pitfall: '多色渐变脏兮兮，或角度乱显廉价。',
    mnemonic: '渐变是「颜色的平滑过渡」。',
    mnemonicImg: 'images/mnemonic/gradient.jpg',
  },
  'muted-color': {
    pitfall: '灰用太暗显脏，或太亮没「高级」感。',
    mnemonic: '高级灰＝「降饱和带灰调」。',
    mnemonicImg: 'images/mnemonic/muted-color.jpg',
    etymology: 'Morandi（莫兰迪）是意大利画家，以灰调静物闻名。'
  },
  'color-wheel': {
    pitfall: '只凭感觉配色，不懂色环关系易翻车。',
    mnemonic: '色轮是「把颜色排成环的地图」。',
    mnemonicImg: 'images/mnemonic/color-wheel.jpg',
    combo: '色轮 + 取色器：先定关系再吸色，效率翻倍。'
  },
  'monochrome': {
    pitfall: '单色但深浅没拉开，平。',
    mnemonic: '单色＝「一种色相的不同深浅」。',
    mnemonicImg: 'images/mnemonic/monochrome.jpg',
  },

  /* ============ 排版与布局 ============ */
  'golden-ratio': {
    pitfall: '硬套 1.618 把画面切得死板，或只用一次就完事。',
    mnemonic: '黄金比例＝「约 0.618 的分割，公认好看」。',
    mnemonicImg: 'images/mnemonic/golden-ratio.jpg',
    etymology: 'Golden Ratio 即黄金分割，数学上约 1.618。'
  },
  'rule-of-thirds': {
    pitfall: '主体死放交叉点，反而呆；或全放正中显平。',
    mnemonic: '三分法＝「九宫格，主体放线或交点」。',
    mnemonicImg: 'images/mnemonic/rule-of-thirds.jpg',
  },
  'f-pattern': {
    pitfall: '把重点放右下或底部，读者视线早走了。',
    mnemonic: 'F 型＝「视线先横扫顶部，再沿左竖向下」。',
    mnemonicImg: 'images/mnemonic/f-pattern.jpg',
    etymology: 'F-Pattern 来自网页眼动研究，PPT 同样适用。'
  },
  'center-sym': {
    pitfall: '啥都居中，全对称显呆板没重点。',
    mnemonic: '中心对称＝「沿中轴镜像，稳重」。',
    mnemonicImg: 'images/mnemonic/center-sym.jpg',
  },
  'margin': {
    pitfall: '内容顶到边，显挤显廉价。',
    mnemonic: '页边距＝「内容离画布边的距离」。',
    mnemonicImg: 'images/mnemonic/margin.jpg',
  },
  'column': {
    pitfall: '栏宽不等，文字对不齐读数乱。',
    mnemonic: '栏宽＝「分栏后每栏的宽度」。',
    mnemonicImg: 'images/mnemonic/column.jpg',
    combo: '栏宽 + 栅格：定栏数自动等宽。'
  },
  'bleed': {
    pitfall: '满版图留白边，显小气；或超出裁剪区被切。',
    mnemonic: '出血＝「图超出裁切线，印刷不被切白」。',
    mnemonicImg: 'images/mnemonic/bleed.jpg',
    etymology: 'Bleed 指印刷时图像溢出裁切边。'
  },
  'card-layout': {
    pitfall: '卡片间距不一、圆角乱，显乱。',
    mnemonic: '卡片＝「把信息装进小方块容器」。',
    mnemonicImg: 'images/mnemonic/card-layout.jpg'
  },
  'full-image': {
    pitfall: '字直接压图上显糊，没留安全区。',
    mnemonic: '全图型＝「整页一张图，字浮其上」。',
    mnemonicImg: 'images/mnemonic/full-image.jpg'
  },
  'visual-balance': {
    pitfall: '一边重一边空，画面要倒。',
    mnemonic: '视觉平衡＝「重量在画面上分布均匀」。',
    mnemonicImg: 'images/mnemonic/visual-balance.jpg',
  },

  /* ============ 动画与切换 ============ */
  'anim-type': {
    pitfall: '啥都用「飞入」，动画没意义。',
    mnemonic: '进入=出现，退出=消失，强调=中途突出。',
    mnemonicImg: 'images/mnemonic/anim-type.jpg',
  },
  'smooth-vs-abrupt': {
    pitfall: '突然切换显生硬，像跳帧。',
    mnemonic: '平滑＝「有过程的渐变」，突然＝「无过程直切」。',
    mnemonicImg: 'images/mnemonic/smooth-vs-abrupt.jpg',
  },
  'easing': {
    pitfall: '全用线性，动画机械像机器人。',
    mnemonic: '缓动＝「加减速的节奏曲线」。',
    mnemonicImg: 'images/mnemonic/easing.jpg',
    etymology: 'Easing 指动画速度随时间变化的函数。'
  },
  'trigger': {
    pitfall: '全设「单击开始」，复杂序列失控。',
    mnemonic: '触发＝「动画什么时候动」。',
    mnemonicImg: 'images/mnemonic/trigger.jpg',
  },
  'transition-fx': {
    pitfall: '每页不同花哨切换，喧宾夺主。',
    mnemonic: '切换＝「页与页之间的过场」。',
    mnemonicImg: 'images/mnemonic/transition-fx.jpg',
  },
  'timeline': {
    pitfall: '动画窗格里顺序乱，时间对不上。',
    shortcut: {
      menu: '动画 → 动画窗格（拖拽排顺序）'
    },
    mnemonic: '时间轴＝「动画播放的先后时钟」。',
    mnemonicImg: 'images/mnemonic/timeline.jpg',
  },
  'morph': {
    pitfall: '两页对象没对应，morph 变成乱飞。',
    mnemonic: '平滑切换＝「同元素跨页变形」（高手向）。',
    mnemonicImg: 'images/mnemonic/morph.jpg',
    etymology: 'Morph 意为「变形」，PPT 中专指对象跨页平滑过渡。'
  },
  'motion-path': {
    pitfall: '路径画太绕，元素飞出画面。',
    mnemonic: '路径动画＝「让对象沿一条线走」。',
    mnemonicImg: 'images/mnemonic/motion-path.jpg',
  },
  'anim-timing': {
    pitfall: '时长太长显拖沓，太短看不清。',
    mnemonic: '计时＝「动画走多久、延迟多久」。',
    mnemonicImg: 'images/mnemonic/anim-timing.jpg',
  },

  /* ============ 效率与技巧 ============ */
  'format-painter': {
    pitfall: '刷完不双击锁定，刷多个要反复点。',
    shortcut: {
      menu: '开始 → 格式刷（双击可连续刷多个）'
    },
    mnemonic: '格式刷＝「复制格式的工具」。',
    mnemonicImg: 'images/mnemonic/format-painter.jpg',
  },
  'shortcut': {
    pitfall: '只会 Ctrl+C/V，其他全靠鼠标点。',
    shortcut: {
      win: [
        { key: 'Ctrl+C / V / X', name: '复制 / 粘贴 / 剪切', scope: 'Win / Office' },
        { key: 'Ctrl+Z', name: '撤销', scope: 'Win / Office' },
        { key: 'Ctrl+Y', name: '重做', scope: 'Win / Office' },
        { key: 'Ctrl+S', name: '保存', scope: 'Win / Office' },
        { key: 'F5', name: '从头放映', scope: 'Office' },
        { key: 'Shift+F5', name: '从当前页放映', scope: 'Office' }
      ],
      mac: [
        { key: '⌘+C / V / X', name: '复制 / 粘贴 / 剪切', scope: 'Mac / Office' },
        { key: '⌘+Z', name: '撤销', scope: 'Mac / Office' },
        { key: '⌘+Y', name: '重做', scope: 'Mac / Office' },
        { key: '⌘+S', name: '保存', scope: 'Mac / Office' }
      ]
    },
    mnemonic: '快捷键＝「键盘一步到位」。',
    mnemonicImg: 'images/mnemonic/shortcut.jpg',
  },
  'distribute': {
    pitfall: '只对齐不分布，元素间距仍乱。',
    mnemonic: '分布＝「让多个元素间距相等」。',
    mnemonicImg: 'images/mnemonic/distribute.jpg',
  },
  'color-reuse': {
    pitfall: '每次重新选色，整篇色不一致。',
    combo: '取色复用 + 主题：定好色板反复吸，统一。',
    mnemonic: '取色复用＝「吸一次，处处用同色」。',
    mnemonicImg: 'images/mnemonic/color-reuse.jpg',
  },
  'vector-vs-raster': {
    pitfall: '放大位图变马赛克，还怪软件。',
    mnemonic: '矢量=放大不糊，位图=放大出格。',
    mnemonicImg: 'images/mnemonic/vector-vs-raster.jpg',
    etymology: 'Vector 用数学描述，Raster 用像素点阵。'
  },
  'compress': {
    pitfall: '不压缩，文件几十 MB 卡死。',
    shortcut: {
      menu: '图片格式 → 压缩图片'
    },
    mnemonic: '压缩＝「减小图体积保清晰」。',
    mnemonicImg: 'images/mnemonic/compress.jpg',
  },
  'anim-painter': {
    pitfall: '逐个加相同动画，重复劳动。',
    shortcut: {
      menu: '动画 → 动画刷（吸一个动画刷给别的）'
    },
    mnemonic: '动画刷＝「格式刷的动画版」。',
    mnemonicImg: 'images/mnemonic/anim-painter.jpg',
  },
  'plugins': {
    pitfall: '装一堆插件不维护，版本冲突。',
    combo: '插件 + 母版：用 iSlide 批量美化后回归母版控风格。',
    mnemonic: '增效插件＝「给 PPT 加外挂能力」。',
    mnemonicImg: 'images/mnemonic/plugins.jpg',
  },
  'smart-align': {
    pitfall: '手动挪，差几像素对不齐。',
    shortcut: {
      menu: '拖动时智能参考线自动吸附'
    },
    mnemonic: '智能对齐＝「靠近自动吸到参考线」。',
    mnemonicImg: 'images/mnemonic/smart-align.jpg',
  },

  /* ============ 图形与图示 ============ */
  'icon-style': {
    pitfall: '线框图标和实心图标混用，乱。',
    mnemonic: '图标统一＝「同描边同风格」。',
    mnemonicImg: 'images/mnemonic/icon-style.jpg',
  },
  'chart-beauty': {
    pitfall: '默认图表花花绿绿，网格线抢戏。',
    mnemonic: '图表美化＝「减干扰，突出数据」。',
    mnemonicImg: 'images/mnemonic/chart-beauty.jpg',
    combo: '图表美化 + 数据可视化：先选对图再美化。'
  },
  'smartart-to-shape': {
    pitfall: '转完忘了可拆，想改单个元素找不到。',
    shortcut: {
      menu: '右键 SmartArt → 转换为形状 → 取消组合'
    },
    mnemonic: '转形状＝「把图示拆成可编辑图形」（高手向）。',
    mnemonicImg: 'images/mnemonic/smartart-to-shape.jpg',
    etymology: 'Convert to Shapes 即转为原生形状。'
  },
  'image-mask': {
    pitfall: '直接拉伸图片变形，人物被压扁。',
    mnemonic: '蒙版＝「用形状框住图片」。',
    mnemonicImg: 'images/mnemonic/image-mask.jpg',
  },
  'flat-vs-skeu': {
    pitfall: '拟物过度，像贴纸；扁平过度，没质感。',
    mnemonic: '扁平=简洁，拟物=仿真带质感。',
    mnemonicImg: 'images/mnemonic/flat-vs-skeu.jpg',
  },
  'data-viz': {
    pitfall: '用错图：构成用柱状、趋势用饼图。',
    mnemonic: '选对图＝「比大小用柱、看占比用饼、看趋势用线」。',
    mnemonicImg: 'images/mnemonic/data-viz.jpg',
    combo: '数据可视化 + 图表美化：先对图再美化。'
  },
  'table-beauty': {
    pitfall: '默认表格线密密麻麻，读着累。',
    mnemonic: '表格美化＝「减线、留白、对齐」。',
    mnemonicImg: 'images/mnemonic/table-beauty.jpg',
  },
  'model-3d': {
    pitfall: '3D 转太花，喧宾夺主。',
    mnemonic: '3D 模型＝「可旋转的立体对象」。',
    mnemonicImg: 'images/mnemonic/model-3d.jpg',
  },

  /* ============ 输出与放映 ============ */
  'widescreen': {
    pitfall: '旧文件 4:3 在新屏两边黑边。',
    shortcut: {
      menu: '设计 → 幻灯片大小 → 16:9'
    },
    checklist: ['确认投影/屏幕比例是 16:9 还是 4:3', '改大小前先备份原版式', '改后检查元素是否溢出'],
    mnemonic: '16:9 是「宽屏标准比例」。',
    mnemonicImg: 'images/mnemonic/widescreen.jpg',
  },
  'export-pdf': {
    pitfall: '直接打印丢动画/字体。',
    shortcut: {
      menu: '文件 → 导出 → 创建 PDF/XPS'
    },
    checklist: ['字体已嵌入或转曲', '备注/讲义模式选对', '图片分辨率足够'],
    mnemonic: '导出 PDF＝「定稿的安全格式」。',
    mnemonicImg: 'images/mnemonic/export-pdf.jpg',
  },
  'presenter-view': {
    pitfall: '没开演讲者视图，观众看到你的备注。',
    shortcut: {
      win: 'Alt+F5',
      menu: '幻灯片放映 → 使用演讲者视图'
    },
    checklist: ['双屏扩展已设置', '备注已写好', '计时/下一页可见'],
    mnemonic: '演讲者视图＝「你见备注，观众见幻灯片」。',
    mnemonicImg: 'images/mnemonic/presenter-view.jpg',
  },
  'hyperlink': {
    pitfall: '链接到删掉的页，点了报错。',
    checklist: ['链接目标页仍存在', '放映模式下才生效', '用完测试一遍'],
    mnemonic: '超链接＝「页内或对外跳转」。',
    mnemonicImg: 'images/mnemonic/hyperlink.jpg',
  },
  'autoplay': {
    pitfall: '自动播放没排好计时，翻页乱。',
    checklist: ['已用排练计时记录时长', '换片方式设为「按计时」', '循环选项按需开'],
    mnemonic: '自动播放＝「无人值守自己翻」。',
    mnemonicImg: 'images/mnemonic/autoplay.jpg',
  },
  'embed-font': {
    pitfall: '没嵌字体，到别的电脑全变样。',
    shortcut: {
      menu: '文件 → 选项 → 保存 → 嵌入字体'
    },
    checklist: ['已嵌入字体（或转曲）', '对方无需装同款字体', '文件体积可接受'],
    mnemonic: '嵌入字体＝「把字体打包进文件」。',
    mnemonicImg: 'images/mnemonic/embed-font.jpg',
  },
  'export-media': {
    pitfall: '导出分辨率低，长图发虚。',
    shortcut: {
      menu: '文件 → 导出 → 更改文件类型 → PNG/JPG/GIF'
    },
    checklist: ['选对分辨率（长图要高清）', '透明背景需求选 PNG', 'GIF 适合小动图'],
    combo: '导出图片 + 导出DPI：调高 DPI 再导出才清晰。',
    mnemonic: '导出图片＝「页变图，方便发」。',
    mnemonicImg: 'images/mnemonic/export-media.jpg',
  },
  'speaker-notes': {
    pitfall: '备注写满念稿，像读课本。',
    shortcut: {
      menu: '下方备注栏直接输入（或演讲者视图写）'
    },
    checklist: ['只写关键词/提醒', '和幻灯片要点对应', '别把机密写进去'],
    mnemonic: '演讲备注＝「给自己看的提词」。',
    mnemonicImg: 'images/mnemonic/speaker-notes.jpg',
  },
  'rehearse': {
    pitfall: '不排练，现场超时或太快。',
    shortcut: {
      menu: '幻灯片放映 → 排练计时'
    },
    checklist: ['完整讲一遍记时长', '超时页已精简', '保留计时用于自动播放'],
    combo: '排练计时 + 自动播放：练完直接生成无人值守放映。',
    mnemonic: '排练计时＝「彩排时记下每页多久」。',
    mnemonicImg: 'images/mnemonic/rehearse.jpg',
  },
  'export-dpi': {
    pitfall: '默认 96 DPI，放大/印刷就糊。',
    shortcut: {
      menu: '注册表/导出设置调高（或先调高再导）'
    },
    checklist: ['目标用途定 DPI（屏 150 / 印 300）', '源文件元素够清晰', '文件别过大'],
    mnemonic: 'DPI＝「每英寸点数，越高越清晰」。',
    mnemonicImg: 'images/mnemonic/export-dpi.jpg',
  },

  /* ============ 本轮新增 15 条补字段（notes-master 已写入软件功能） ============ */
  'outline-view': {
    pitfall: '在普通视图逐页打字，忘了先搭结构。',
    shortcut: {
      menu: '视图 → 大纲视图'
    },
    mnemonic: '大纲视图＝「只写文字层级，先想清楚讲什么」。',
    mnemonicImg: 'images/mnemonic/outline-view.jpg',
    combo: '大纲 + 母版：先大纲填内容，再母版定风格。'
  },
  'font-pairing': {
    pitfall: '标题正文用同一字体，没层次。',
    mnemonic: '字体配对＝「标题正文搭一套协调字体」。',
    mnemonicImg: 'images/mnemonic/font-pairing.jpg',
    combo: '字体配对 + 字号阶梯：字体差+尺寸差双重层级。'
  },
  'symmetry': {
    pitfall: '啥都对称，显呆；全非对称又显乱。',
    mnemonic: '对称=稳重，非对称=灵动。',
    mnemonicImg: 'images/mnemonic/symmetry.jpg',
  },
  'diagonal-flow': {
    pitfall: '元素平铺，视线没方向。',
    mnemonic: '对角线＝「利用眼睛天然斜扫习惯」。',
    mnemonicImg: 'images/mnemonic/diagonal-flow.jpg',
  },
  'remove-bg': {
    pitfall: '直接贴带背景方图，和页面打架。',
    mnemonic: '去背＝「只留主体，丢背景」。',
    mnemonicImg: 'images/mnemonic/remove-bg.jpg',
    combo: '去背 + 蒙版：去背后用形状遮罩更精致。'
  },
  'infographic': {
    pitfall: '文字堆成长段落，没人看。',
    mnemonic: '信息图＝「用图代替长文字」。',
    mnemonicImg: 'images/mnemonic/infographic.jpg',
    combo: '信息图 + 数据可视化：数据类直接上图。'
  },
  'brand-vi': {
    pitfall: '即兴用色用字，像不同人拼的。',
    mnemonic: 'VI＝「企业视觉识别规范」。',
    mnemonicImg: 'images/mnemonic/brand-vi.jpg',
    combo: '品牌VI + 母版：把 VI 固化进母版，永不乱。'
  },
  'quick-access': {
    pitfall: '高频命令每次翻功能区。',
    shortcut: {
      menu: '右键命令 → 添加到快速访问工具栏'
    },
    mnemonic: 'QAT＝「窗口左上角的常用命令条」。',
    mnemonicImg: 'images/mnemonic/quick-access.jpg',
  },
  'find-replace': {
    pitfall: '逐页手动改词，漏改还累。',
    shortcut: {
      win: 'Ctrl+H',
      mac: '⌘+H',
      menu: '开始 → 编辑 → 查找/替换'
    },
    mnemonic: '查找替换＝「全文一键换词换色」。',
    mnemonicImg: 'images/mnemonic/find-replace.jpg',
    combo: '查找替换 + 主题：批量统一字体/颜色。'
  },
  'loop-anim': {
    pitfall: '循环动画太抢戏，晃眼。',
    mnemonic: '循环＝「一直重复播的动画」。',
    mnemonicImg: 'images/mnemonic/loop-anim.jpg',
  },
  'custom-show': {
    pitfall: '为不同观众复制多份文件。',
    shortcut: {
      menu: '幻灯片放映 → 自定义放映'
    },
    mnemonic: '自定义放映＝「同一份挑几页组成子放映」。',
    etymology: 'Custom Show 即自定义节目单。'
  },
  'screen-blank-pen': {
    pitfall: '放映时想临时涂写，却按 Esc 退出放映。',
    shortcut: {
      win: [
        { key: 'B', name: '黑屏', scope: 'Office 放映' },
        { key: 'W', name: '白屏', scope: 'Office 放映' },
        { key: 'Ctrl+P', name: '画笔/指针', scope: 'Office 放映' }
      ]
    },
    mnemonic: '放映＝「B黑W白，Ctrl+P当笔」。'
  },
  'font-license': {
    pitfall: '用未授权字体对外发布，吃侵权。',
    mnemonic: '字体版权＝「这字能不能商用」。',
    combo: '字体版权 + 嵌入字体：可商用且嵌入，双保险。'
  },
  /* ============ 本轮新增补充 ============ */
  'edit-points': {
    pitfall: '顶点拖太乱形状就歪扭，记得用参考线对齐。',
    shortcut: {
      menu: '选中形状 → 右键「编辑顶点」(或格式→编辑形状→编辑顶点)'
    },
    combo: '编辑顶点 + 布尔运算：先拼再微调轮廓，曲线随心。',
    mnemonic: '编辑顶点＝「把形状捏成任意形」。'
  },
  'theme-variant': {
    pitfall: '切变体只换配色字体，版式不动——别指望它改布局。',
    shortcut: {
      menu: '设计 → 变体（右侧下拉）→ 选配色/字体'
    },
    combo: '主题变体 + 母版：变体调色、母版调结构，各司其职。',
    mnemonic: '主题变体＝「同主题换皮肤」。'
  },
  'action-button': {
    pitfall: '动作设置错对象，点了没反应；放映外点击不触发。',
    shortcut: {
      menu: '插入 → 形状/动作按钮 → 右键「超链接/动作」'
    },
    mnemonic: '动作按钮＝「可点击的遥控器」。'
  },
  'comment': {
    pitfall: '批注写在正文里，合并时和正式内容混一起。',
    shortcut: {
      win: 'Ctrl+Alt+M',
      menu: '审阅 → 新建批注'
    },
    mnemonic: '批注＝「贴在旁边的便利贴」。'
  },
  'ruler': {
    pitfall: '只开标尺不画参考线，仍是肉眼对齐。',
    shortcut: {
      menu: '视图 → 标尺（勾选）'
    },
    mnemonic: '标尺＝「精确摆放的刻度尺」。'
  },
  'template': {
    pitfall: '被花哨模板绑架，内容迁就装饰反而难读。',
    shortcut: {
      menu: '文件 → 新建 → 搜索模板 / 本机模板'
    },
    mnemonic: '模板＝「带版式的空壳子」。'
  },
  'compare-merge': {
    pitfall: '直接覆盖别人的稿，他的改动全没了。',
    shortcut: {
      menu: '审阅 → 比较 / 合并'
    },
    mnemonic: '比较合并＝「两份稿的差异对账」。'
  },
  'wordart': {
    pitfall: '正文用艺术字，廉价又难读。',
    shortcut: {
      menu: '插入 → 艺术字'
    },
    mnemonic: '艺术字＝「会发光的标题」。'
  },
  'object-effect': {
    pitfall: '阴影发光全堆上，变「立体感大杂烩」。',
    shortcut: {
      menu: '格式 → 形状效果（阴影/发光/映像）'
    },
    mnemonic: '对象效果＝「给形状打光的化妆盒」。'
  },
  'textbox-placeholder': {
    pitfall: '量产文字用文本框，改风格要一页页改。',
    shortcut: {
      menu: '占位符来自母版；文本框用插入→文本框'
    },
    mnemonic: '占位符跟母版、文本框是散兵。'
  },
  'bullet': {
    pitfall: '长句套多级符号，又长又乱。',
    shortcut: {
      menu: '开始 → 项目符号 / 编号'
    },
    mnemonic: '项目符号＝「让要点排队」。'
  },
  'hide-slide': {
    pitfall: '真删了备用页，想用时要重做。',
    shortcut: {
      menu: '右键幻灯片 → 隐藏幻灯片'
    },
    mnemonic: '隐藏幻灯片＝「藏在口袋里的备用页」。'
  },
  'narration': {
    pitfall: '录音环境吵，旁白听着像菜市场。',
    shortcut: {
      menu: '幻灯片放映 → 录制旁白'
    },
    checklist: ['安静环境', '麦克风测试', '逐页讲清', '保存进文件'],
    mnemonic: '旁白＝「把讲解录进片子」。'
  },
  'transparency': {
    pitfall: '透明度拉太低，元素糊进背景看不清。',
    combo: '透明度 + 对象效果：半透叠压出层次与景深。',
    mnemonic: '透明度＝「让底层透上来」。'
  },

  /* ============ 补充：按优先级新增（2026-07-25） ============ */
  'slide-size': {
    pitfall: '先排版再改尺寸，大改小常被裁掉边角内容。',
    shortcut: {
      menu: '设计 → 幻灯片大小'
    },
    mnemonic: '幻灯片大小＝「先定画布再作画」。'
  },
  'replace-font': {
    pitfall: '只换字体忘了对方没装，打开又变宋体。',
    shortcut: {
      menu: '开始 → 编辑 → 替换字体'
    },
    mnemonic: '替换字体＝「全篇一键换衣」。'
  },
  'gridlines': {
    pitfall: '不开网格线硬对齐，间距总有 1–2px 误差。',
    shortcut: {
      win: 'Shift+F9',
      menu: '视图 → 显示 → 网格线（可勾选吸附）'
    },
    mnemonic: '网格线＝「看不见的尺子阵」。'
  },
  'recolor': {
    pitfall: '直接改原图颜色，想还原还得重找素材。',
    combo: '重新着色 + 透明度：单色点缀叠压出层次。',
    mnemonic: '重新着色＝「不碰原图换色调」。'
  },
  'coauthor': {
    pitfall: '不共享就各改各的，最后两份对不上。',
    shortcut: {
      menu: '存到 OneDrive/SharePoint → 共享 → 共同创作'
    },
    mnemonic: '共同创作＝「同一份，多人并行」。'
  },
  'text-margin': {
    pitfall: '用回车空格硬挤内边距，换框就乱。',
    shortcut: {
      menu: '右键文本框 → 设置形状格式 → 文本框 → 内部边距'
    },
    mnemonic: '内部边距＝「框里留白，不用敲空格」。'
  },
  'visual-flow': {
    pitfall: '重点和装饰一样大，视线不知道先看哪。',
    mnemonic: '视觉流＝「牵着眼睛走的路线」。'
  },
  'info-density': {
    pitfall: '一页塞满，观众读不动；太空又显单薄。',
    mnemonic: '信息密度＝「该密密、该疏疏」。'
  },
  'consistency': {
    pitfall: '每页自创风格，十页像十个模板拼的。',
    combo: '一致性 + 母版/主题：从源头锁死统一规则。',
    mnemonic: '一致性＝「一套规则管全部」。'
  },

  /* ============ 扩容补充（最该补 + 实用进阶） ============ */
  'slide-sorter': {
    pitfall: '只在普通视图逐页翻着调顺序，长文档重排累死还容易漏页。',
    shortcut: {
      menu: '视图 → 幻灯片浏览（或底部状态栏切换）'
    },
    mnemonic: '浏览视图＝「全篇缩略图总览台」。'
  },
  'notes-page': {
    pitfall: '把演讲稿直接写进文本框，观众投影上也看得见，穿帮。',
    shortcut: {
      menu: '视图 → 备注页（或直接在下方的备注区写）'
    },
    mnemonic: '备注页＝「台下稿，台上藏」。'
  },
  'reading-view': {
    pitfall: '自查用正式放映，一不小心点到黑屏/标注还不好退。',
    shortcut: {
      menu: '视图 → 阅读视图（Esc 退出）'
    },
    mnemonic: '阅读视图＝「轻量自看版放映」。'
  },
  'fill-rate': {
    pitfall: '一页塞到满，看起来像海报不像幻灯片；太空又显空。',
    combo: '版面率 + 留白：靠面积差制造呼吸感。',
    mnemonic: '版面率＝「图文占了多少地」。'
  },
  'cmyk-rgb': {
    pitfall: '屏幕艳蓝直接拿去印，出来发灰发暗才知色差。',
    combo: 'CMYK + 导出PDF：交付印刷前先校色。',
    mnemonic: 'RGB 发光、CMYK 吸光，色域本就不同。'
  },
  'text-outline': {
    pitfall: '只改字色压不住花底，字糊成一团。',
    combo: '描边 + 字重：细描边勾边、加粗提存在感。',
    mnemonic: '描边＝「给字勾一道边，立住」。'
  },
  'bg-format': {
    pitfall: '用铺满的形状当背景，结果老被误选、挡文字。',
    shortcut: {
      menu: '右键页面 → 设置背景格式（可「应用到全部」）'
    },
    mnemonic: '背景格式＝「铺底不挡内容」。'
  },
  'action-settings': {
    pitfall: '只知超链接，不会悬停触发和加音效，交互做不活。',
    shortcut: {
      menu: '选中对象 → 插入 → 动作（或右键「超链接」旁）'
    },
    mnemonic: '动作设置＝「点/划一下就响应」。'
  },
  'vertical-text': {
    pitfall: '竖排后没调行距和标点，字挤成一柱。',
    combo: '竖排 + 行距：古风标题靠间距透气。',
    mnemonic: '竖排＝「从上往下念的中文味」。'
  },
  'emphasis-fx': {
    pitfall: '想强调就加进入动画，结果对象进来又出去，反而乱。',
    combo: '强调 + 触发：讲到关键点一下让它原地跳。',
    mnemonic: '强调动画＝「原地动一下」。'
  },
  'icons': {
    pitfall: '图标风格混搭（线框配实底），页面显杂乱。',
    combo: '图标 + 图标风格统一：同线宽同色系才高级。',
    mnemonic: '图标＝「一眼懂的图形符号」。'
  },
  'autosave': {
    pitfall: '关了自动保存又不手动存，崩一次白干几小时。',
    shortcut: {
      menu: '文件 → 选项 → 保存 → 自动保存间隔时间'
    },
    mnemonic: '自动保存＝「定时写盘，崩了能捞」。'
  },
  'para-spacing': {
    pitfall: '在段落间狂敲回车留空，改字号或复制时全乱套。',
    combo: '段间距 + 行距：一个管段与段，一个管段内行，两层呼吸感都调。',
    mnemonic: '段前/段后＝「段与段之间的呼吸」。'
  },
  'chart-edit': {
    pitfall: '截图别人图表当图片，数据变了没法改还得重做。',
    combo: '图表 + 数据可视化：先选对图（原则），再插入编辑（功能）。',
    mnemonic: '图表＝「让数字自己说话」。'
  },
  'audio-insert': {
    pitfall: '用旁白录背景音乐，音质差还占空间；背景乐该插文件。',
    combo: '音频 + 切换/自动播放：开场乐接内容页自然过渡。',
    mnemonic: '音频插入＝「放现成的声音，控怎么播」。'
  },
  'video-insert': {
    pitfall: '把视频当图片嵌，播不了还糊；要用插入视频对象。',
    combo: '视频 + 自动播放/全屏：发布会现场效果拉满。',
    mnemonic: '视频插入＝「把片子放进页面里播」。'
  },
  'excel-table': {
    pitfall: '把数据截图当表格，源数据一改全得重做。',
    combo: '嵌入表 + 链接更新：源 Excel 改了，PPT 点更新就同步。',
    mnemonic: '嵌入 Excel 表＝「活的表，能改能更新」。'
  },
  'section-view': {
    pitfall: '长文档不分节，大纲里几十页挤一长条，找页靠滚。',
    combo: '节 + 折叠：分章后折叠，长文档变章节树。',
    mnemonic: '节视图＝「长文档的折叠章节树」。'
  },
  'gestalt': {
    pitfall: '相关元素东一个西一个，观众读不出谁和谁一组。',
    combo: '格式塔 + 亲密性/重复：底层原理撑起分组原则。',
    mnemonic: '格式塔＝「人脑自动把近的、像的看成一组」。'
  },
  'embed-link': {
    pitfall: '默认就是嵌入，但插大视频时有人手滑勾了「链接」，发给客户全图裂。',
    combo: '嵌入 + 压缩：大图先压缩再嵌入，体积质量两不误。',
    mnemonic: '嵌入＝「打包带走」，链接＝「只记地址」。'
  },
  'theme-palette': {
    pitfall: '手填死颜色，甲方一换品牌色全页重改；该用主题色。',
    shortcut: {
      menu: '设计 → 变体 ▾ → 颜色 → 自定义颜色'
    },
    combo: '主题色板 + 母版：色板一定，母版里全用主题色，全局秒换。',
    mnemonic: '主题色板＝「12 格活色，改一格全篇动」。'
  },
  'doc-inspector': {
    pitfall: '把带吐槽备注的稿直接发客户，社死。',
    shortcut: {
      menu: '文件 → 信息 → 检查问题 → 检查文档'
    },
    combo: '检查器 + 批注：清完隐私再交付，评论沟通过程不留痕。',
    mnemonic: '文档检查器＝「交付前的隐私大扫除」。'
  },
  'live-caption': {
    pitfall: '以为要提前录字幕，其实放映时实时生成，开开关就行。',
    shortcut: {
      menu: '放映 → 字幕（可设翻译语言）'
    },
    combo: '实时字幕 + 演讲者视图：观众看译文，你看备注不冲突。',
    mnemonic: '实时字幕＝「你开口，字就出，还能翻」。'
  },
  'version-history': {
    pitfall: '本地草稿没同步 365，根本没有版本历史，改崩找不回。',
    shortcut: {
      menu: '文件 → 信息 → 版本历史（需存在 OneDrive / 365）'
    },
    combo: '版本历史 + 自动保存：一个防丢、一个能回到过去。',
    mnemonic: '版本历史＝「文件的时光机」。'
  },
  'ink-draw': {
    pitfall: '用标注笔圈完退出就没了；要留痕得用墨迹书写存进文件。',
    shortcut: {
      menu: '绘图 → 荧光笔 / 钢笔（触屏或手写笔）'
    },
    combo: '墨迹 + 批注：圈画重点再转成批注，评审闭环。',
    mnemonic: '墨迹书写＝「写在幻灯片上的笔迹」。'
  },
  'color-psychology': {
    pitfall: '只看好不好看选色，没想观众该什么感觉。',
    combo: '色彩心理 + 主辅点：先定情绪，再按 60-30-10 铺。',
    mnemonic: '色彩心理＝「颜色在悄悄影响情绪」。'
  },
  'warm-cool': {
    pitfall: '暖冷混用没主次，画面平、重点跳不出来。',
    combo: '冷暖 + 视觉层级：暖色放重点往前，冷色退背景。',
    mnemonic: '冷暖色＝「暖的前进、冷的后退」。'
  },
  'stagger': {
    pitfall: '一堆对象同时啪一下全出现，没节奏也没重点。',
    shortcut: {
      menu: '动画窗格里给每个对象设递增「延迟」'
    },
    combo: '错落 + 进入动画：同款淡入，0.15s 间隔出波浪感。',
    mnemonic: '错落＝「同款动画，错开时间点」。'
  },
  'package': {
    pitfall: '直接拷 pptx 去客户电脑，字体图片全丢。',
    shortcut: {
      menu: '文件 → 导出 → 打包成 CD（或导出为视频）'
    },
    combo: '打包 + 嵌入字体：双保险，换电脑零翻车。',
    mnemonic: '打包＝「把字体图片视频全带走」。'
  },
  'rotate-flip': {
    pitfall: '旋转后文字也跟着斜，要正文字时得把文字单独放。',
    shortcut: {
      menu: '选中 → 拖顶部手柄自由转；右键旋转 → 水平/垂直翻转'
    },
    combo: '翻转 + 对称构图：左右镜像做平衡版面。',
    mnemonic: '翻转＝「把图形左右/上下镜像」。'
  },
  'print': {
    pitfall: '只看整页幻灯片，忘了讲义/备注页这些打印刚需场景。',
    shortcut: {
      win: 'Ctrl+P',
      mac: '⌘+P',
      menu: '文件 → 打印 → 选版式(讲义/备注页)/颜色(灰度)'
    },
    combo: '讲义母版 + 打印：提前定好每页张数和页眉。',
    mnemonic: '打印＝「把幻灯片印到纸上」。'
  },
  'autoshape': {
    pitfall: '用图片代替形状，放大就糊、不能改色。',
    combo: '形状 + 布尔运算：拼出专属图标/信息图。',
    mnemonic: '自选图形＝「搭一切图形的矢量积木」。'
  },
  'chart-elements': {
    pitfall: '图例网格坐标轴全开，信息过载看不懂。',
    shortcut: {
      menu: '图表旁 +号 → 勾选要显示的构件'
    },
    combo: '数据标签 + 删冗余图例：让关键数一眼可见。',
    mnemonic: '图表元素＝「图表里头显示什么」。'
  },
  'text-anim-level': {
    pitfall: '整批一起出，没节奏也没仪式感。',
    shortcut: {
      menu: '动画 → 效果选项 → 整批/按段落/按词/按字'
    },
    combo: '按字浮现 + 错落：标题有仪式、要点逐条点。',
    mnemonic: '分级＝「文本框内部怎么拆着出」。'
  },
  'image-crop': {
    pitfall: '只记得裁成形状，普通裁切和艺术效果也常用。',
    shortcut: {
      menu: '图片格式 → 裁剪 / 更正 / 颜色 / 艺术效果'
    },
    combo: '裁剪去边 + 艺术效果：救暗图、做质感封面。',
    mnemonic: '裁剪＝「切掉多余、不透明」。'
  },
  'header-footer': {
    pitfall: '每页手打页码，易错还改不动。',
    shortcut: {
      menu: '插入 → 页眉和页脚（或母版里设）'
    },
    combo: '母版 + 自动页码：设一次全篇统一。',
    mnemonic: '页脚＝「母版里设一次的自动编号」。'
  },
  'connector': {
    pitfall: '用普通直线连流程图，移框就脱节。',
    shortcut: {
      menu: '插入 → 形状 → 线条 → 连接符（肘形/曲线）'
    },
    combo: '连接符 + 流程图：拖动方框线自动重排。',
    mnemonic: '连接符＝「吸在图形上、会自己跟的线」。'
  },
  'macro-vba': {
    pitfall: '重复操作手动做，慢还漏，尤其几十页批量。',
    shortcut: {
      menu: '视图 → 宏 → 录制（复杂可写 VBA）'
    },
    combo: '宏 + 批量规整：录一次一键套全部。',
    mnemonic: '宏＝「把重复操作录成一键脚本」。'
  },
  'exit-anim': {
    pitfall: '只加进入动画，要点越积越多、画面变乱。',
    shortcut: {
      menu: '动画 → 退出（飞出/淡出/缩小）'
    },
    combo: '进入 + 退出：当前要点讲完淡出，始终只留重点。',
    mnemonic: '退出＝「对象怎么从舞台走掉」。'
  },
  'chart-anim': {
    pitfall: '整图淡入，没节奏也没故事感。',
    shortcut: {
      menu: '图表动画 → 效果选项 → 按系列/按类别'
    },
    combo: '按系列长出 + 边讲边出：数据有层次。',
    mnemonic: '图表动画＝「图表怎么动出来」。'
  },
  'smart-guides': {
    pitfall: '纯手拖对齐，歪歪扭扭还费时。',
    shortcut: {
      menu: '拖动对象时看紫色虚线（视图→参考线可开关）'
    },
    combo: '智能参考线 + 对齐工具：又快又准。',
    mnemonic: '智能参考线＝「对象出现时才亮的动态对齐线」。'
  },
  'watermark': {
    pitfall: '每页手贴水印，改一次累、还容易漏页。',
    shortcut: {
      menu: '幻灯片母版里放半透明 Logo/文字'
    },
    combo: '母版水印 + 页眉页脚：全篇标记统一。',
    mnemonic: '水印＝「母版里的半透明装饰层」。'
  },
  'screenshot': {
    pitfall: '截图还要存盘再插入，多绕两步。',
    shortcut: {
      menu: '插入 → 屏幕截图（窗口/屏幕剪辑）'
    },
    combo: '截图 + 裁剪/艺术效果：引用界面一步到位。',
    mnemonic: '屏幕截图＝「现截现贴」。'
  },
  'autofit': {
    pitfall: '字多溢出文本框，丢字还难看。',
    shortcut: {
      menu: '文本框右下角图标 → 自动调整（缩字/溢出警告）'
    },
    combo: '自动缩字 + 手动分框：塞得下又不挤。',
    mnemonic: '自动适配＝「文本框对内容的智能响应」。'
  },
  'pptx-format': {
    pitfall: '终稿发 pptx，客户能改能乱版。',
    shortcut: {
      menu: '另存为：pdf(防改) / ppsx(直接放映) / pptm(含宏)'
    },
    combo: 'pdf 终稿 + ppsx 放映：发给谁都不翻车。',
    mnemonic: '文件格式＝「按用途选扩展名」。'
  },
  'combo-chart': {
    pitfall: '量(销售额)和率(增长率)分两张图，对比时要来回翻，还难看出关联。',
    shortcut: {
      menu: '插入图表 → 组合图（或柱形图里把某系列改折线并设次坐标轴）'
    },
    combo: '组合图 + 数据标签：量率同框，关键数直接标出。',
    mnemonic: '组合图＝「柱量 + 折线率，双轴各管各」。'
  },
  'word-to-ppt': {
    pitfall: '把 Word 方案手动一页页抄进 PPT，费时还易漏。',
    shortcut: {
      menu: 'Word 用标题样式排好 → 发送到 PowerPoint / 导入大纲'
    },
    combo: 'Word 转 PPT + 母版：骨架生成后一键套品牌版式。',
    mnemonic: 'Word 转 PPT＝「标题样式即页结构」。'
  },
  'ink': {
    pitfall: '放映想标重点只能下张重画，现场没法随手圈。',
    shortcut: {
      menu: '放映 → 指针选项 → 笔/荧光笔；激光笔随时指'
    },
    combo: '墨迹 + 演示者视图：现场圈画，备注照看不慌。',
    mnemonic: '墨迹批注＝「现场圈重点，激光笔引视线」。'
  },
  'data-label': {
    pitfall: '图表做完不加标签，观众要歪头对坐标轴读数。',
    shortcut: {
      menu: '图表 → ＋ → 数据标签 → 选位置'
    },
    combo: '数据标签 + 图表美化：先美化再标数，标签颜色和图表统一。',
    mnemonic: '数据标签＝「数字直接标在图上」。'
  },
  'morph-force': {
    pitfall: '想跨页把方块变圆形，普通平滑切换根本认不出。',
    shortcut: {
      menu: '选择窗格 → 两页对象改名 !!名字 → 加平滑切换'
    },
    combo: '!!配对 + 平滑切换：形状/图标/产品图间的自由过渡。',
    mnemonic: '!!配对＝「两个对象强行认亲，做平滑过渡」。'
  },
  'artistic-effect': {
    pitfall: '照片做封面背景太写实，用艺术效果秒变插画风。',
    shortcut: {
      menu: '图片格式 → 艺术效果 → 选效果'
    },
    combo: '艺术效果 + 透明度：加铅笔素描/虚化后降透明度当背景底纹。',
    mnemonic: '艺术效果＝「给照片换画风」。'
  },
  'picture-correct': {
    pitfall: '照片太暗太灰就重拍，其实 PPT 内就能调。',
    shortcut: {
      menu: '图片格式 → 更正 → 亮度/对比度'
    },
    combo: '更正 + 柔化：提亮后加柔化做背景。',
    mnemonic: '图片更正＝「PPT 内置 PS 曝光调节」。'
  },
  'picture-style': {
    pitfall: '图片裸放没质感，手动加边框投影好麻烦。',
    shortcut: {
      menu: '图片格式 → 图片样式库 → 悬停预览点选'
    },
    combo: '图片样式 + 格式刷：设好一个样式，格式刷批量复制。',
    mnemonic: '图片样式＝「给照片穿衣服」。'
  },
  'change-picture': {
    pitfall: '素材更新→删旧图→插新图→重调所有格式→烦死人。',
    shortcut: {
      menu: '右键图片 → 更改图片 → 选新素材'
    },
    combo: '更改图片 + 模板占位：用占位图调好格式，批量更换真素材。',
    mnemonic: '更改图片＝「换素材不换格式」。'
  },
  'data-bars': {
    pitfall: '表格只有数字看不出大小关系，另画图表又占地方。',
    shortcut: {
      menu: '表格设计 → 条件格式 → 数据条'
    },
    combo: '数据条 + 表格美化：先做斑马纹再做数据条。',
    mnemonic: '数据条＝「表格里画迷你柱状图」。'
  },
  'video-trim': {
    pitfall: '视频太长，放映时要拖进度条或切出去播放器。',
    shortcut: {
      menu: '选中视频 → 播放 → 裁剪视频'
    },
    combo: '视频裁剪 + 书签：剪短后加书签做分知识点跳点。',
    mnemonic: '视频裁剪＝「只留精彩片段，放映不跳出」。'
  },
  'ink-math': {
    pitfall: '复杂公式打 LaTeX 慢、拼字符丑、截图放进去糊。',
    shortcut: {
      menu: '插入 → 公式 → 墨迹公式 → 手写'
    },
    combo: '墨迹公式 + 公式编号：手写转标准格式后加编号。',
    mnemonic: '墨迹公式＝「手写数学式，PPT 帮你认」。'
  }
};

if (typeof window !== 'undefined') window.TERM_EXTRA = TERM_EXTRA;
if (typeof module !== 'undefined') module.exports = TERM_EXTRA;
