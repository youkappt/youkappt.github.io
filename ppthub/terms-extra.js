/* ============================================================
   PPThub — 词条补充字段（不污染 data.js）
   字段：pitfall 常见误区 / shortcut 快捷键调出 / checklist 自检清单(数组)
        / beforeafter 改前改后 / mnemonic 记忆口诀 / combo 进阶组合技 / etymology 词源小注
   由 app.js 在运行时合并进 TERMS。
   ============================================================ */

const TERM_EXTRA = {
  /* ============ 软件功能 ============ */
  'master': {
    pitfall: '只在单页逐个改样式，几十页要对齐时全崩——改母版一次顶百次。',
    shortcut: '视图 → 幻灯片母版（Mac 可用 ⌘+⇧+D 快速进入）',
    combo: '母版 + 版式：给不同章节建多套版式，切换比手动复制快得多。',
    mnemonic: '母版像「总模板」，共性放这，个性留单页。'
  },
  'layout': {
    pitfall: '在空白版式上手动拖框，不如选对版式继承统一风格。',
    shortcut: '开始 → 版式（或右键缩略图选「版式」）',
    combo: '版式 + 占位符：换版式时内容自动归位，不乱。',
    mnemonic: '版式是页面的「骨架预设」。'
  },
  'placeholder': {
    pitfall: '用普通文本框替代占位符，后续无法整体改标题样式。',
    mnemonic: '占位符是「带类型的框」，标题就是标题。'
  },
  'animation-pane': {
    pitfall: '只在「添加动画」里点，不懂用动画窗格调速序，动画全堆一起。',
    shortcut: '选中对象 → 动画 → 动画窗格（Win: Alt+A+P）',
    combo: '动画窗格 + 触发：把动画绑到别的对象点击上，做交互。',
    mnemonic: '动画窗格是动画的「时间轴中控台」。'
  },
  'guides': {
    pitfall: '凭肉眼对齐，差几像素肉眼看不出但一眼乱。',
    shortcut: '视图 → 参考线 / 智能参考线（拖动对象时自动出现）',
    mnemonic: '参考线是「临时吸附辅助线」，不打印。'
  },
  'boolean': {
    pitfall: '用「组合」代替「合并形状」，结果不能单独改某个形状的颜色。',
    shortcut: '选中两个形状 → 形状格式 → 合并形状',
    combo: '布尔 + 编辑顶点：拼出复杂形状后还能微调轮廓。',
    etymology: '布尔（Boolean）源自数学家布尔，指集合的并/交/差运算。',
    mnemonic: '布尔是「形状的集合运算」。'
  },
  'eyedropper': {
    pitfall: '截图去 PS 取色再填，其实 PPT 自带吸管直接吸页面任意颜色。',
    shortcut: '颜色下拉 → 取色器（吸管图标）',
    mnemonic: '取色器就是「颜色吸管」。'
  },
  'smartart': {
    pitfall: '用一堆文本框拼流程图，改起来要逐个调。',
    shortcut: '插入 → SmartArt',
    combo: 'SmartArt + 转形状：定型后转成可自由编辑的形状。',
    mnemonic: 'SmartArt 是「现成的图示库」。'
  },
  'section': {
    pitfall: '用空白标题页当分隔，导航里一堆无名页难以管理。',
    shortcut: '开始 → 节（或右键缩略图「新增节」）',
    mnemonic: '节是「给幻灯片分组」。'
  },
  'zoom-loc': {
    pitfall: '用超链接跳到别页，回不来或路径乱。',
    shortcut: '插入 → 缩放定位 → 幻灯片缩放',
    combo: '缩放定位 + 节：做非线性目录，点哪进哪。',
    mnemonic: '缩放定位是「可点击的缩略图入口」。'
  },
  'theme': {
    pitfall: '每页手动改配色，全盘换风格时崩溃。',
    shortcut: '设计 → 主题（及右侧变体）',
    mnemonic: '主题是「整套配色字体包」。'
  },
  'selection-pane': {
    pitfall: '层层叠叠找不到对象，靠盲点乱选。',
    shortcut: '开始 → 选择 → 选择窗格（Win: Alt+H+SL）',
    mnemonic: '选择窗格是「对象图层列表」。'
  },
  'z-order': {
    pitfall: '用复制覆盖来「挡住」，层级乱套难维护。',
    shortcut: '右键 → 置于顶层/底层（Win: Ctrl+Shift+[ / ]）',
    mnemonic: '层级就是「谁压谁」。'
  },
  'group': {
    pitfall: '组合后忘了还能「取消组合」做局部修改。',
    shortcut: 'Ctrl+G 组合 / Ctrl+Shift+G 取消',
    mnemonic: '组合是「临时打包」，随时可拆。'
  },
  'designer': {
    pitfall: '无视右侧设计灵感，手动排半天还不好看。',
    shortcut: '设计 → 设计灵感（选中图片/文字后右侧出现）',
    mnemonic: '设计器是「AI 排版助手」。'
  },
  'reuse-slides': {
    pitfall: '从别处全选复制，把原格式也带乱。',
    shortcut: '开始 → 新建幻灯片 → 重用幻灯片（可勾选保留源格式）',
    mnemonic: '复用幻灯片是「借用别处页」。'
  },
  'screen-record': {
    pitfall: '用第三方录屏再导入，其实 PPT 内置就能直接录。',
    shortcut: '插入 → 屏幕录制（选区域后录制）',
    mnemonic: '屏幕录制是「PPT 内置录屏」。'
  },
  'notes-master': {
    pitfall: '打印讲义前才调版式，手忙脚乱。',
    shortcut: '视图 → 备注母版 / 讲义母版',
    combo: '讲义母版 + 导出 PDF：一键出带笔记区的讲义。',
    mnemonic: '讲义母版管「打印出来的样子」。'
  },

  /* ============ 设计原则 ============ */
  'alignment': {
    pitfall: '只对齐左边，右边参差；或元素间没对齐参照，整体散。',
    beforeafter: '改前：标题、正文、图片各对齐各的，边沿参差 → 改后：统一以参考线对齐，边沿成线，立刻整齐。',
    mnemonic: '对齐就是「让边和边成一条线」。',
    combo: '对齐 + 参考线：开智能参考线，拖动自动吸附。'
  },
  'proximity': {
    pitfall: '相关内容散落各处，读者不知谁和谁是一组。',
    beforeafter: '改前：标题、说明、图三处分离 → 改后：归为一组、拉开组间距，关系一眼清。',
    mnemonic: '亲密性＝「相关的靠在一起」。',
    etymology: 'Proximity 意为「邻近」，设计中指视觉上的靠近分组。'
  },
  'contrast': {
    pitfall: '对比做成五颜六色却无主次，反而糊。',
    beforeafter: '改前：所有字同色同大小 → 改后：关键信息加大加色，主次分明。',
    mnemonic: '对比是「制造差异突出重点」。',
    combo: '对比 + 视觉层级：用大小/色差直接画出阅读顺序。'
  },
  'repetition': {
    pitfall: '重复变成「到处一样」的杂乱，而非统一的节奏。',
    mnemonic: '重复是「用统一元素形成节奏」。',
    combo: '重复 + 品牌VI：同色同字体贯穿，专业感就来了。'
  },
  'hierarchy': {
    pitfall: '所有信息同等重要地铺开，读者不知道先看哪。',
    beforeafter: '改前：标题正文一样大 → 改后：标题大、要点中、注释小，视线有落点。',
    mnemonic: '视觉层级＝「给信息排座次」。',
    combo: '层级 + 字号阶梯：用 type-scale 直接拉开档次。'
  },
  'whitespace': {
    pitfall: '留白留成空洞——元素缩一角，旁边大片空却无呼吸感。',
    beforeafter: '改前：元素塞满、边距小 → 改后：内容聚中、四周留白，显高级。',
    mnemonic: '留白不是「没东西」，是「主动的呼吸空间」。',
    etymology: 'Negative Space 直译「负空间」，即被主动留出的空白。'
  },
  'focus': {
    pitfall: '用一大圈红框硬标，反而破坏画面。',
    beforeafter: '改前：满页重点 → 改后：只一处高亮，其余弱化，焦点清晰。',
    mnemonic: '焦点引导＝「把眼睛牵到该看的地方」。',
    combo: '焦点 + 对比：用色彩/大小差异自然吸睛。'
  },
  'grid': {
    pitfall: '凭感觉排，结果栏宽不一、对不齐。',
    beforeafter: '改前：自由散排 → 改后：套栅格，元素落在线交点，整齐有依据。',
    mnemonic: '栅格是「隐形的排版坐标」。',
    combo: '栅格 + 栏宽：定好栏数，内容自动对齐。'
  },
  'less-is-more': {
    pitfall: '减成「啥都没了」，信息也没了。',
    beforeafter: '改前：堆满装饰 → 改后：砍掉多余，只留核心，反而更清楚。',
    mnemonic: '减法＝「去掉干扰，留下重点」。'
  },

  /* ============ 字体与配色 ============ */
  'serif-sans': {
    pitfall: '正文用衬线小字屏显发虚，或标题用无衬线显单薄。',
    beforeafter: '改前：正文衬线小字，屏幕发虚 → 改后：正文无衬线，标题衬线，各司其职。',
    mnemonic: '衬线有「脚」显传统，无衬线干净显现代。'
  },
  'type-scale': {
    pitfall: '字号乱跳没规律，层级靠感觉。',
    shortcut: '开始 → 字号（或用样式统一）',
    beforeafter: '改前：标题24、小标题23、正文22，没差 → 改后：32/24/16 拉开，层级清楚。',
    mnemonic: '字号阶梯＝「给文字排尺寸档位」。',
    combo: '字号阶梯 + 视觉层级：尺寸差直接表达主次。'
  },
  'font-weight': {
    pitfall: '整页一个字重，靠加粗堆重点，乱。',
    beforeafter: '改前：全 Regular，重点也靠加粗 → 改后：标题 Bold、正文 Regular，节奏稳。',
    mnemonic: '字重是「字的粗细档」。'
  },
  'tracking': {
    pitfall: '标题字距过紧显挤，或过松显散。',
    shortcut: '开始 → 字符间距（或字体对话框）',
    beforeafter: '改前：标题字距默认挤 → 改后：大字距，显大气。',
    mnemonic: '字间距＝「字与字的呼吸」。',
    etymology: 'Tracking（字距）/ Kerning（字偶距）是两个不同概念。'
  },
  'line-height': {
    pitfall: '行距过紧读着喘，过松段落散。',
    beforeafter: '改前：行距 1.0 挤 → 改后：1.5 左右，舒服。',
    mnemonic: '行距是「行的上下呼吸」。'
  },
  'analogous': {
    pitfall: '邻近色用太多显单调没重点。',
    beforeafter: '改前：邻近色堆满无焦点 → 改后：邻近色打底 + 一点对比色点睛。',
    mnemonic: '邻近色＝「色环上挨着的友邻色」。'
  },
  'complementary': {
    pitfall: '红配绿高饱和直接撞，刺眼。',
    beforeafter: '改前：纯红纯绿对半 → 改后：降饱和、面积不等，撞色也和谐。',
    mnemonic: '对比色＝「色环对面的互补色」。',
    etymology: 'Complementary 源自「互补」，混合成灰。'
  },
  'tri-color': {
    pitfall: '主辅点三等大，没有主导色。',
    beforeafter: '改前：三色均分 → 改后：主色 70%、辅色 25%、点缀 5%，有主有次。',
    mnemonic: '主辅点＝「7:2.5:0.5 的配色比例」。',
    combo: '三色 + 品牌VI：主色定调，辅色支撑，点缀提神。'
  },
  'gradient': {
    pitfall: '多色渐变脏兮兮，或角度乱显廉价。',
    beforeafter: '改前：红绿蓝三色渐变 → 改后：同色系深浅渐变，高级。',
    mnemonic: '渐变是「颜色的平滑过渡」。'
  },
  'muted-color': {
    pitfall: '灰用太暗显脏，或太亮没「高级」感。',
    beforeafter: '改前：高饱和原色 → 改后：降饱和加灰，莫兰迪感。',
    mnemonic: '高级灰＝「降饱和带灰调」。',
    etymology: 'Morandi（莫兰迪）是意大利画家，以灰调静物闻名。'
  },
  'color-wheel': {
    pitfall: '只凭感觉配色，不懂色环关系易翻车。',
    beforeafter: '改前：随机选色 → 改后：按色轮选邻近/对比，协调。',
    mnemonic: '色轮是「把颜色排成环的地图」。',
    combo: '色轮 + 取色器：先定关系再吸色，效率翻倍。'
  },
  'monochrome': {
    pitfall: '单色但深浅没拉开，平。',
    beforeafter: '改前：同一明度单色 → 改后：同色深浅拉层次，干净有变。',
    mnemonic: '单色＝「一种色相的不同深浅」。'
  },

  /* ============ 排版与布局 ============ */
  'golden-ratio': {
    pitfall: '硬套 1.618 把画面切得死板，或只用一次就完事。',
    beforeafter: '改前：内容均分两栏 → 改后：按 0.618 分，主区大次区小，自然。',
    mnemonic: '黄金比例＝「约 0.618 的分割，公认好看」。',
    etymology: 'Golden Ratio 即黄金分割，数学上约 1.618。'
  },
  'rule-of-thirds': {
    pitfall: '主体死放交叉点，反而呆；或全放正中显平。',
    beforeafter: '改前：主体居中 → 改后：落三分线交点，画面有张力。',
    mnemonic: '三分法＝「九宫格，主体放线或交点」。'
  },
  'f-pattern': {
    pitfall: '把重点放右下或底部，读者视线早走了。',
    beforeafter: '改前：关键信息在右下 → 改后：沿 F 顶部+左侧放重点。',
    mnemonic: 'F 型＝「视线先横扫顶部，再沿左竖向下」。',
    etymology: 'F-Pattern 来自网页眼动研究，PPT 同样适用。'
  },
  'center-sym': {
    pitfall: '啥都居中，全对称显呆板没重点。',
    beforeafter: '改前：所有元素居中堆叠 → 改后：中心对称保稳重，留一个非对称点睛。',
    mnemonic: '中心对称＝「沿中轴镜像，稳重」。'
  },
  'margin': {
    pitfall: '内容顶到边，显挤显廉价。',
    beforeafter: '改前：元素贴边 → 改后：留足页边距，呼吸感来。',
    mnemonic: '页边距＝「内容离画布边的距离」。'
  },
  'column': {
    pitfall: '栏宽不等，文字对不齐读数乱。',
    beforeafter: '改前：双栏宽不一 → 改后：等宽栏，整齐。',
    mnemonic: '栏宽＝「分栏后每栏的宽度」。',
    combo: '栏宽 + 栅格：定栏数自动等宽。'
  },
  'bleed': {
    pitfall: '满版图留白边，显小气；或超出裁剪区被切。',
    beforeafter: '改前：图留白边显小 → 改后：图出血到边，大气。',
    mnemonic: '出血＝「图超出裁切线，印刷不被切白」。',
    etymology: 'Bleed 指印刷时图像溢出裁切边。'
  },
  'card-layout': {
    pitfall: '卡片间距不一、圆角乱，显乱。',
    beforeafter: '改前：信息平铺 → 改后：分卡片，信息成块好读。',
    mnemonic: '卡片＝「把信息装进小方块容器」。'
  },
  'full-image': {
    pitfall: '字直接压图上显糊，没留安全区。',
    beforeafter: '改前：字压复杂图 → 改后：图+半透明压暗+字，清楚。',
    mnemonic: '全图型＝「整页一张图，字浮其上」。'
  },
  'visual-balance': {
    pitfall: '一边重一边空，画面要倒。',
    beforeafter: '改前：大图全在左，右空 → 改后：右放文字/小元素配重，稳。',
    mnemonic: '视觉平衡＝「重量在画面上分布均匀」。'
  },

  /* ============ 动画与切换 ============ */
  'anim-type': {
    pitfall: '啥都用「飞入」，动画没意义。',
    beforeafter: '改前：全飞入 → 改后：进入用淡入、强调用放大，各司其职。',
    mnemonic: '进入=出现，退出=消失，强调=中途突出。'
  },
  'smooth-vs-abrupt': {
    pitfall: '突然切换显生硬，像跳帧。',
    beforeafter: '改前：突然出现 → 改后：平滑过渡，舒服。',
    mnemonic: '平滑＝「有过程的渐变」，突然＝「无过程直切」。'
  },
  'easing': {
    pitfall: '全用线性，动画机械像机器人。',
    beforeafter: '改前：匀速直线 → 改后：缓入缓出，自然。',
    mnemonic: '缓动＝「加减速的节奏曲线」。',
    etymology: 'Easing 指动画速度随时间变化的函数。'
  },
  'trigger': {
    pitfall: '全设「单击开始」，复杂序列失控。',
    beforeafter: '改前：全单击 → 改后：用「与上一动画同时/之后」排序列。',
    mnemonic: '触发＝「动画什么时候动」。'
  },
  'transition-fx': {
    pitfall: '每页不同花哨切换，喧宾夺主。',
    beforeafter: '改前：每页换切换 → 改后：统一 1-2 种，克制。',
    mnemonic: '切换＝「页与页之间的过场」。'
  },
  'timeline': {
    pitfall: '动画窗格里顺序乱，时间对不上。',
    shortcut: '动画 → 动画窗格（拖拽排顺序）',
    beforeafter: '改前：凭添加顺序 → 改后：时间轴拖出先后，节奏可控。',
    mnemonic: '时间轴＝「动画播放的先后时钟」。'
  },
  'morph': {
    pitfall: '两页对象没对应，morph 变成乱飞。',
    beforeafter: '改前：两页元素名不同 → 改后：同名元素，morph 平滑变形。',
    mnemonic: '平滑切换＝「同元素跨页变形」（高手向）。',
    etymology: 'Morph 意为「变形」，PPT 中专指对象跨页平滑过渡。'
  },
  'motion-path': {
    pitfall: '路径画太绕，元素飞出画面。',
    beforeafter: '改前：默认直线 → 改后：自定义曲线，沿设定路径走。',
    mnemonic: '路径动画＝「让对象沿一条线走」。'
  },
  'anim-timing': {
    pitfall: '时长太长显拖沓，太短看不清。',
    beforeafter: '改前：默认 0.5s 全一样 → 改后：按内容调 0.3-1s。',
    mnemonic: '计时＝「动画走多久、延迟多久」。'
  },

  /* ============ 效率与技巧 ============ */
  'format-painter': {
    pitfall: '刷完不双击锁定，刷多个要反复点。',
    shortcut: '开始 → 格式刷（双击可连续刷多个）',
    mnemonic: '格式刷＝「复制格式的工具」。'
  },
  'shortcut': {
    pitfall: '只会 Ctrl+C/V，其他全靠鼠标点。',
    shortcut: 'Ctrl+C/V/X、Ctrl+Z、Ctrl+S、F5 放映',
    mnemonic: '快捷键＝「键盘一步到位」。'
  },
  'distribute': {
    pitfall: '只对齐不分布，元素间距仍乱。',
    beforeafter: '改前：对齐但间距不等 → 改后：分布使间距相等。',
    mnemonic: '分布＝「让多个元素间距相等」。'
  },
  'color-reuse': {
    pitfall: '每次重新选色，整篇色不一致。',
    combo: '取色复用 + 主题：定好色板反复吸，统一。',
    mnemonic: '取色复用＝「吸一次，处处用同色」。'
  },
  'vector-vs-raster': {
    pitfall: '放大位图变马赛克，还怪软件。',
    beforeafter: '改前：用位图放大糊 → 改后：用矢量/图标，放大清晰。',
    mnemonic: '矢量=放大不糊，位图=放大出格。',
    etymology: 'Vector 用数学描述，Raster 用像素点阵。'
  },
  'compress': {
    pitfall: '不压缩，文件几十 MB 卡死。',
    shortcut: '图片格式 → 压缩图片',
    mnemonic: '压缩＝「减小图体积保清晰」。'
  },
  'anim-painter': {
    pitfall: '逐个加相同动画，重复劳动。',
    shortcut: '动画 → 动画刷（吸一个动画刷给别的）',
    mnemonic: '动画刷＝「格式刷的动画版」。'
  },
  'plugins': {
    pitfall: '装一堆插件不维护，版本冲突。',
    combo: '插件 + 母版：用 iSlide 批量美化后回归母版控风格。',
    mnemonic: '增效插件＝「给 PPT 加外挂能力」。'
  },
  'smart-align': {
    pitfall: '手动挪，差几像素对不齐。',
    shortcut: '拖动时智能参考线自动吸附',
    mnemonic: '智能对齐＝「靠近自动吸到参考线」。'
  },

  /* ============ 图形与图示 ============ */
  'icon-style': {
    pitfall: '线框图标和实心图标混用，乱。',
    beforeafter: '改前：线+面混用 → 改后：统一一种风格，干净。',
    mnemonic: '图标统一＝「同描边同风格」。'
  },
  'chart-beauty': {
    pitfall: '默认图表花花绿绿，网格线抢戏。',
    beforeafter: '改前：默认彩柱+网格 → 改后：去网格、单色系、突出数据。',
    mnemonic: '图表美化＝「减干扰，突出数据」。',
    combo: '图表美化 + 数据可视化：先选对图再美化。'
  },
  'smartart-to-shape': {
    pitfall: '转完忘了可拆，想改单个元素找不到。',
    shortcut: '右键 SmartArt → 转换为形状 → 取消组合',
    mnemonic: '转形状＝「把图示拆成可编辑图形」（高手向）。',
    etymology: 'Convert to Shapes 即转为原生形状。'
  },
  'image-mask': {
    pitfall: '直接拉伸图片变形，人物被压扁。',
    beforeafter: '改前：拉伸变形 → 改后：裁剪为形状/遮罩，不变形。',
    mnemonic: '蒙版＝「用形状框住图片」。'
  },
  'flat-vs-skeu': {
    pitfall: '拟物过度，像贴纸；扁平过度，没质感。',
    beforeafter: '改前：全拟物重阴影 → 改后：扁平为主，局部微质感。',
    mnemonic: '扁平=简洁，拟物=仿真带质感。'
  },
  'data-viz': {
    pitfall: '用错图：构成用柱状、趋势用饼图。',
    beforeafter: '改前：饼图看趋势 → 改后：趋势用折线、构成用饼。',
    mnemonic: '选对图＝「比大小用柱、看占比用饼、看趋势用线」。',
    combo: '数据可视化 + 图表美化：先对图再美化。'
  },
  'table-beauty': {
    pitfall: '默认表格线密密麻麻，读着累。',
    beforeafter: '改前：全框线 → 改后：去竖线、隔行底色，清爽。',
    mnemonic: '表格美化＝「减线、留白、对齐」。'
  },
  'model-3d': {
    pitfall: '3D 转太花，喧宾夺主。',
    beforeafter: '改前：复杂 3D 占满 → 改后：简洁模型点睛。',
    mnemonic: '3D 模型＝「可旋转的立体对象」。'
  },

  /* ============ 输出与放映 ============ */
  'widescreen': {
    pitfall: '旧文件 4:3 在新屏两边黑边。',
    shortcut: '设计 → 幻灯片大小 → 16:9',
    checklist: ['确认投影/屏幕比例是 16:9 还是 4:3', '改大小前先备份原版式', '改后检查元素是否溢出'],
    mnemonic: '16:9 是「宽屏标准比例」。'
  },
  'export-pdf': {
    pitfall: '直接打印丢动画/字体。',
    shortcut: '文件 → 导出 → 创建 PDF/XPS',
    checklist: ['字体已嵌入或转曲', '备注/讲义模式选对', '图片分辨率足够'],
    mnemonic: '导出 PDF＝「定稿的安全格式」。'
  },
  'presenter-view': {
    pitfall: '没开演讲者视图，观众看到你的备注。',
    shortcut: '幻灯片放映 → 使用演讲者视图（Alt+F5）',
    checklist: ['双屏扩展已设置', '备注已写好', '计时/下一页可见'],
    mnemonic: '演讲者视图＝「你见备注，观众见幻灯片」。'
  },
  'hyperlink': {
    pitfall: '链接到删掉的页，点了报错。',
    checklist: ['链接目标页仍存在', '放映模式下才生效', '用完测试一遍'],
    beforeafter: '改前：目录不能跳 → 改后：点目录直达对应页。',
    mnemonic: '超链接＝「页内或对外跳转」。'
  },
  'autoplay': {
    pitfall: '自动播放没排好计时，翻页乱。',
    checklist: ['已用排练计时记录时长', '换片方式设为「按计时」', '循环选项按需开'],
    mnemonic: '自动播放＝「无人值守自己翻」。'
  },
  'embed-font': {
    pitfall: '没嵌字体，到别的电脑全变样。',
    shortcut: '文件 → 选项 → 保存 → 嵌入字体',
    checklist: ['已嵌入字体（或转曲）', '对方无需装同款字体', '文件体积可接受'],
    mnemonic: '嵌入字体＝「把字体打包进文件」。'
  },
  'export-media': {
    pitfall: '导出分辨率低，长图发虚。',
    shortcut: '文件 → 导出 → 更改文件类型 → PNG/JPG/GIF',
    checklist: ['选对分辨率（长图要高清）', '透明背景需求选 PNG', 'GIF 适合小动图'],
    combo: '导出图片 + 导出DPI：调高 DPI 再导出才清晰。',
    mnemonic: '导出图片＝「页变图，方便发」。'
  },
  'speaker-notes': {
    pitfall: '备注写满念稿，像读课本。',
    shortcut: '下方备注栏直接输入（或演讲者视图写）',
    checklist: ['只写关键词/提醒', '和幻灯片要点对应', '别把机密写进去'],
    mnemonic: '演讲备注＝「给自己看的提词」。'
  },
  'rehearse': {
    pitfall: '不排练，现场超时或太快。',
    shortcut: '幻灯片放映 → 排练计时',
    checklist: ['完整讲一遍记时长', '超时页已精简', '保留计时用于自动播放'],
    combo: '排练计时 + 自动播放：练完直接生成无人值守放映。',
    mnemonic: '排练计时＝「彩排时记下每页多久」。'
  },
  'export-dpi': {
    pitfall: '默认 96 DPI，放大/印刷就糊。',
    shortcut: '注册表/导出设置调高（或先调高再导）',
    checklist: ['目标用途定 DPI（屏 150 / 印 300）', '源文件元素够清晰', '文件别过大'],
    mnemonic: 'DPI＝「每英寸点数，越高越清晰」。'
  },

  /* ============ 本轮新增 15 条补字段（notes-master 已写入软件功能） ============ */
  'outline-view': {
    pitfall: '在普通视图逐页打字，忘了先搭结构。',
    shortcut: '视图 → 大纲视图',
    mnemonic: '大纲视图＝「只写文字层级，先想清楚讲什么」。',
    combo: '大纲 + 母版：先大纲填内容，再母版定风格。'
  },
  'font-pairing': {
    pitfall: '标题正文用同一字体，没层次。',
    beforeafter: '改前：全一种字体 → 改后：标题无衬线+正文衬线，有对比。',
    mnemonic: '字体配对＝「标题正文搭一套协调字体」。',
    combo: '字体配对 + 字号阶梯：字体差+尺寸差双重层级。'
  },
  'symmetry': {
    pitfall: '啥都对称，显呆；全非对称又显乱。',
    beforeafter: '改前：全居中对称 → 改后：对称保稳、局部非对称点睛。',
    mnemonic: '对称=稳重，非对称=灵动。'
  },
  'diagonal-flow': {
    pitfall: '元素平铺，视线没方向。',
    beforeafter: '改前：元素居中散排 → 改后：沿对角线摆，视线被牵着走。',
    mnemonic: '对角线＝「利用眼睛天然斜扫习惯」。'
  },
  'remove-bg': {
    pitfall: '直接贴带背景方图，和页面打架。',
    beforeafter: '改前：实拍图带杂背景 → 改后：去背悬浮，干净。',
    mnemonic: '去背＝「只留主体，丢背景」。',
    combo: '去背 + 蒙版：去背后用形状遮罩更精致。'
  },
  'infographic': {
    pitfall: '文字堆成长段落，没人看。',
    beforeafter: '改前：三段话 → 改后：时间轴/流程图，一眼懂。',
    mnemonic: '信息图＝「用图代替长文字」。',
    combo: '信息图 + 数据可视化：数据类直接上图。'
  },
  'brand-vi': {
    pitfall: '即兴用色用字，像不同人拼的。',
    beforeafter: '改前：每页不同色字 → 改后：统一 VI，专业。',
    mnemonic: 'VI＝「企业视觉识别规范」。',
    combo: '品牌VI + 母版：把 VI 固化进母版，永不乱。'
  },
  'quick-access': {
    pitfall: '高频命令每次翻功能区。',
    shortcut: '右键命令 → 添加到快速访问工具栏',
    mnemonic: 'QAT＝「窗口左上角的常用命令条」。'
  },
  'find-replace': {
    pitfall: '逐页手动改词，漏改还累。',
    shortcut: 'Ctrl+H（Win）/ ⌘+H（Mac）',
    mnemonic: '查找替换＝「全文一键换词换色」。',
    combo: '查找替换 + 主题：批量统一字体/颜色。'
  },
  'loop-anim': {
    pitfall: '循环动画太抢戏，晃眼。',
    beforeafter: '改前：静态显死 → 改后：轻微循环（如呼吸）点睛。',
    mnemonic: '循环＝「一直重复播的动画」。'
  },
  'custom-show': {
    pitfall: '为不同观众复制多份文件。',
    shortcut: '幻灯片放映 → 自定义放映',
    mnemonic: '自定义放映＝「同一份挑几页组成子放映」。',
    etymology: 'Custom Show 即自定义节目单。'
  },
  'screen-blank-pen': {
    pitfall: '放映中想互动却不知能黑屏/圈画。',
    shortcut: '放映中 B 黑屏 / W 白屏 / Ctrl+P 笔',
    mnemonic: 'B/W 控场，笔圈重点。',
    checklist: ['需要安静时按 B 黑屏', '讲重点用笔圈（E 擦除）', '别在关键页误黑屏']
  },
  'present-online': {
    pitfall: '先导出视频再传，麻烦还慢。',
    shortcut: '幻灯片放映 → 联机演示',
    mnemonic: '联机放映＝「把正在放的同步给远程」。',
    checklist: ['网络稳定', '观众拿到链接', '用演讲者视图保护备注']
  },
  'font-license': {
    pitfall: '用未授权字体对外发布，吃侵权。',
    beforeafter: '改前：随手用商业字体 → 改后：换免费商用或购授权。',
    mnemonic: '字体版权＝「这字能不能商用」。',
    combo: '字体版权 + 嵌入字体：可商用且嵌入，双保险。'
  },
  /* ============ 本轮新增补充 ============ */
  'edit-points': {
    pitfall: '顶点拖太乱形状就歪扭，记得用参考线对齐。',
    shortcut: '选中形状 → 右键「编辑顶点」(或格式→编辑形状→编辑顶点)',
    combo: '编辑顶点 + 布尔运算：先拼再微调轮廓，曲线随心。',
    mnemonic: '编辑顶点＝「把形状捏成任意形」。'
  },
  'theme-variant': {
    pitfall: '切变体只换配色字体，版式不动——别指望它改布局。',
    shortcut: '设计 → 变体（右侧下拉）→ 选配色/字体',
    combo: '主题变体 + 母版：变体调色、母版调结构，各司其职。',
    mnemonic: '主题变体＝「同主题换皮肤」。'
  },
  'action-button': {
    pitfall: '动作设置错对象，点了没反应；放映外点击不触发。',
    shortcut: '插入 → 形状/动作按钮 → 右键「超链接/动作」',
    mnemonic: '动作按钮＝「可点击的遥控器」。'
  },
  'comment': {
    pitfall: '批注写在正文里，合并时和正式内容混一起。',
    shortcut: '审阅 → 新建批注',
    mnemonic: '批注＝「贴在旁边的便利贴」。'
  },
  'ruler': {
    pitfall: '只开标尺不画参考线，仍是肉眼对齐。',
    shortcut: '视图 → 标尺（勾选）',
    mnemonic: '标尺＝「精确摆放的刻度尺」。'
  },
  'template': {
    pitfall: '被花哨模板绑架，内容迁就装饰反而难读。',
    shortcut: '文件 → 新建 → 搜索模板 / 本机模板',
    mnemonic: '模板＝「带版式的空壳子」。'
  },
  'compare-merge': {
    pitfall: '直接覆盖别人的稿，他的改动全没了。',
    shortcut: '审阅 → 比较 / 合并',
    mnemonic: '比较合并＝「两份稿的差异对账」。'
  },
  'wordart': {
    pitfall: '正文用艺术字，廉价又难读。',
    shortcut: '插入 → 艺术字',
    beforeafter: '改前：普通黑字标题 → 改后：渐变描边艺术字，质感拉满。',
    mnemonic: '艺术字＝「会发光的标题」。'
  },
  'object-effect': {
    pitfall: '阴影发光全堆上，变「立体感大杂烩」。',
    shortcut: '格式 → 形状效果（阴影/发光/映像）',
    beforeafter: '改前：平涂色块 → 改后：淡淡投影「浮」起来。',
    mnemonic: '对象效果＝「给形状打光的化妆盒」。'
  },
  'textbox-placeholder': {
    pitfall: '量产文字用文本框，改风格要一页页改。',
    shortcut: '占位符来自母版；文本框用插入→文本框',
    mnemonic: '占位符跟母版、文本框是散兵。'
  },
  'bullet': {
    pitfall: '长句套多级符号，又长又乱。',
    shortcut: '开始 → 项目符号 / 编号',
    beforeafter: '改前：一段糊在一起 → 改后：圆点并列、编号分步骤。',
    mnemonic: '项目符号＝「让要点排队」。'
  },
  'hide-slide': {
    pitfall: '真删了备用页，想用时要重做。',
    shortcut: '右键幻灯片 → 隐藏幻灯片',
    mnemonic: '隐藏幻灯片＝「藏在口袋里的备用页」。'
  },
  'narration': {
    pitfall: '录音环境吵，旁白听着像菜市场。',
    shortcut: '幻灯片放映 → 录制旁白',
    checklist: ['安静环境', '麦克风测试', '逐页讲清', '保存进文件'],
    mnemonic: '旁白＝「把讲解录进片子」。'
  },
  'transparency': {
    pitfall: '透明度拉太低，元素糊进背景看不清。',
    combo: '透明度 + 对象效果：半透叠压出层次与景深。',
    beforeafter: '改前：白块完全盖住底图 → 改后：半透白块透出底图。',
    mnemonic: '透明度＝「让底层透上来」。'
  }
};

if (typeof window !== 'undefined') window.TERM_EXTRA = TERM_EXTRA;
if (typeof module !== 'undefined') module.exports = TERM_EXTRA;
