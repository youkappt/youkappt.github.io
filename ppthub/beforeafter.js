/* ============================================================
   PPThub — 改前 vs 改后 真实生图对照
   每个术语若已有真实生成的 PPT 单页对比图，登记在此。
   before / after 必须文案一致、效果不同。
   路径相对于 ppthub/ 根目录（与 index.html 同目录）。
   ============================================================ */

const BEFORE_AFTER = {
  alignment: {
    before: 'images/beforeafter/alignment-before.webp',
    after: 'images/beforeafter/alignment-after.webp',
    caption: '同一页内容：标题「2024 年度运营复盘」+ 三段要点。改前每个元素各对齐各的，左边沿高低错落、对不齐；改后全部贴到同一条左边线上，整页整齐有秩序。'
  },
  hierarchy: {
    before: 'images/beforeafter/hierarchy-before.webp',
    after: 'images/beforeafter/hierarchy-after.webp',
    caption: '同一页「增长策略」「三步走」+ 获客/留存/转化三要点。改前所有字居中、字号一样大，看不出重点；改后大标题在上、副标题做说明，三要点用 01/02/03 编号带一句解释，主次分明一眼懂。'
  },
  whitespace: {
    before: 'images/beforeafter/whitespace-before.webp',
    after: 'images/beforeafter/whitespace-after.webp',
    caption: '同一页内容：主张句「好设计，七分留白」+ 英文副标题 + 一行小字。改前把字放得老大、贴边塞满、背景还加了细碎纹理，看着又挤又乱；改后字收小、居中，四周留出大片空白，整页干净通透，重点一眼就看到。'
  },
  'tri-color': {
    before: 'images/beforeafter/tri-color-before.webp',
    after: 'images/beforeafter/tri-color-after.webp',
    caption: '同一页内容：标题「Q3 财报速览」+ 营收、利润、增长三块数据。改前每个标题一种颜色、下面红黄蓝三个大色块乱撞，特别花；改后用统一的商务深蓝当主色，关键数字用橙色点缀，整体干净、专业，重点也突出了。'
  },
  'chart-beauty': {
    before: 'images/beforeafter/chart-beauty-before.webp',
    after: 'images/beforeafter/chart-beauty-after.webp',
    caption: '同一页「近 6 个月销售额」+ 1-6 月数据。改前默认立体柱状图，蓝紫红渐变、边框厚重、网格线乱；改后去网格和立体、柱子改圆角单色、柱顶加清晰数据标签，整体清爽好读。'
  },
  'table-beauty': {
    before: 'images/beforeafter/table-beauty-before.webp',
    after: 'images/beforeafter/table-beauty-after.webp',
    caption: '同一页「各部门 Q3 预算」+ 市场 80 万/研发 120 万/销售 95 万/行政 40 万。改前默认表格黑边框密、行挤；改后只留上下细线、表头深色、行距拉开加斑马纹、数字对齐，清爽专业。'
  },
  contrast: {
    before: 'images/beforeafter/contrast-before.webp',
    after: 'images/beforeafter/contrast-after.webp',
    caption: '同一页内容：小标题「核心结论」+ 大字「转化率提升 23%」+ 说明「本季度重点优化落地页」。改前所有字都一样大、一样灰，看不出重点；改后把「23%」放大、改成醒目的橙色，核心结论一眼就能抓住。'
  },
  'card-layout': {
    before: 'images/beforeafter/card-layout-before.webp',
    after: 'images/beforeafter/card-layout-after.webp',
    caption: '同一页内容：标题「服务优势」+ 响应快、定制强、数据稳、支持全四项。改前四项纯文字段落堆在一起，没有卡片分隔，看着累；改后每项装进圆角卡片，配上图标和一句说明，四列整整齐齐，扫一眼就能抓到重点。'
  },
  'font-pairing': {
    before: 'images/beforeafter/font-pairing-before.webp',
    after: 'images/beforeafter/font-pairing-after.webp',
    caption: '同一页「年度设计趋势」+ 三段正文。改前标题正文同宋体，标题没特点、正文像看书老气；改后标题粗黑体、正文常规无衬线，中英文字体搭配，像杂志有设计感。'
  },
  monochrome: {
    before: 'images/beforeafter/monochrome-before.webp',
    after: 'images/beforeafter/monochrome-after.webp',
    caption: '同一页「销售漏斗分析」+ 访问 10000/注册 3500/付费 800/复购 240。改前四卡红黄蓝绿不搭调，像幼儿园展板；改后全用同一蓝的不同深浅，色调统一、数字层级清，高级专业。'
  },
  margin: {
    before: 'images/beforeafter/margin-before.webp',
    after: 'images/beforeafter/margin-after.webp',
    caption: '同一页「市场洞察」+ 三点。改前文字紧贴页面四周边缘、像要溢出，版面拥挤；改后四周留充足页边距，内容约束在中间，呼吸感好、稳重专业。'
  },
  'rule-of-thirds': {
    before: 'images/beforeafter/rule-of-thirds-before.webp',
    after: 'images/beforeafter/rule-of-thirds-after.webp',
    caption: '同一主题「旅行企划」+ 风景照片+ 口号「出发，就现在」。改前标题/照片/口号全挤正中、上下空中间挤，呆板没张力；改后照片放左约三分之二、标题和口号分置右侧上下三分位，构图平衡有呼吸。'
  },
  repetition: {
    before: 'images/beforeafter/repetition-before.webp',
    after: 'images/beforeafter/repetition-after.webp',
    caption: '同一主题「用户增长五步法」+ 拉新/激活/留存/变现/推荐五步。改前五步的序号形状/颜色/标题色各不相同，像五个模板拼；改后用一样圆角卡片+一样白圈序号+一样标题样式重复排列，视觉语言统一、节奏专业。'
  },
  proximity: {
    before: 'images/beforeafter/proximity-before.webp',
    after: 'images/beforeafter/proximity-after.webp',
    caption: '同一页「产品运营三件事」+ 六模块。改前六模块散在页面上，看不出谁跟谁一伙；改后相关三个三个靠一起、用虚线框归成两组，信息分组清楚、一眼看懂。'
  },
  grid: {
    before: 'images/beforeafter/grid-before.webp',
    after: 'images/beforeafter/grid-after.webp',
    caption: '同一页内容：标题「团队架构」+ 产品组、设计组、研发组、运营组四个模块。改前四个模块位置高低错落、大小不统一，像随手摆的；改后按 2×2 栅格整齐排列，横竖都对齐，版面稳定有秩序。'
  },
  'font-weight': {
    before: 'images/beforeafter/font-weight-before.webp',
    after: 'images/beforeafter/font-weight-after.webp',
    caption: '同一主题：标题「项目里程碑」+ 立项、设计、开发、上线四个阶段。改前所有文字都是细字重，标题和说明糊成一团、看不出层级；改后阶段标题加粗、日期和说明用常规字重，信息主次分明。'
  },
  tracking: {
    before: 'images/beforeafter/tracking-before.webp',
    after: 'images/beforeafter/tracking-after.webp',
    caption: '同一页内容：标题「品牌发布会」+ 副标题「2024 秋季新品」。改前标题字间距拉得特别开，五个字散得老远，副标题又挤在一起，看着别扭；改后字间距正常、标题与副标题比例协调，整体舒服耐看。'
  },
  focus: {
    before: 'images/beforeafter/focus-before.webp',
    after: 'images/beforeafter/focus-after.webp',
    caption: '同一页「三步上手」+ 注册/配置/发布三步。改前三圆用箭头横串、眼睛只顺一条线走无重点；改后三步做便签错开摆、颜色不同+留白拉开，眼睛先抓主标题再一张张读完，重点和顺序都出来。'
  },
  'brand-vi': {
    before: 'images/beforeafter/brand-vi-before.webp',
    after: 'images/beforeafter/brand-vi-after.webp',
    caption: '同一页「公司介绍」+ 品牌主张。改前塞紫藤花/Disco 球/繁体花体字/五彩球，企业色不知紫粉、字体乱，像开业大酬宾；改后只留品牌主色一蓝、Logo 固定位、字体统一商务，全页克制可信专业感立现。'
  },
  'less-is-more': {
    before: 'images/beforeafter/less-is-more-before.webp',
    after: 'images/beforeafter/less-is-more-after.webp',
    caption: '同一页「产品介绍」+ 更快/更稳/更省/更安全四点。改前塞奖杯/logo/徽章/爆炸贴/霓虹底，每点被装饰盖住；改后只留主标题+四关键词+一句说明，背景彻底干净，重点一眼到、信息反而清晰。'
  },
  'icon-style': {
    before: 'images/beforeafter/icon-style-before.webp',
    after: 'images/beforeafter/icon-style-after.webp',
    caption: '同一页「核心功能」四项。改前四图标线条/填色/拟物/emoji 各异、颜色蓝绿黄各一，像四个不同 App 拼的；改后统一同系列 3D 立体图标，圆角/暖色调/光影一致，一体感专业。'
  },
  'visual-flow': {
    before: 'images/beforeafter/visual-flow-before.webp',
    after: 'images/beforeafter/visual-flow-after.webp',
    caption: '同一页「年度总结」+ 业绩增长/用户突破/问题反思三点。改前三点挤上半部、下半只放大照片，视线乱跳不知先看哪；改后三点上一排均匀铺开、下方加上升折线图标，眼睛从上往下顺滑走完。'
  },
  'info-density': {
    before: 'images/beforeafter/info-density-before.webp',
    after: 'images/beforeafter/info-density-after.webp',
    caption: '同一页「文学赏析」+ 三点。改前山水画占大半+大圆 1/2/3 浮画上、字距撑开，像展览海报——字少密度低重点没出；改后宣纸框+一/二/三紧凑排版字密行紧，一屏说透、文学课件味立住。'
  },
  consistency: {
    before: 'images/beforeafter/consistency-before.webp',
    after: 'images/beforeafter/consistency-after.webp',
    caption: '同一页「核心团队」+ 11 位成员。改前按产品/技术/运营分三块，每块不同色徽章+卡片+标题色，三种视觉语言像没统一过；改后去分组框、头像框/字号/标题统一一套，11 人像同一队人，不再像三组拼起。'
  },
  'fill-rate': {
    before: 'images/beforeafter/fill-rate-before.webp',
    after: 'images/beforeafter/fill-rate-after.webp',
    caption: '同一页「夏日新品」+ 一句话+ 一瓶防晒。改前产品占右半大图+左文，满满当当版面率高、视觉负担重；改后产品缩右下小图+左文，八成空白版面率过低显空旷。理想：文图各占一半，比例才稳。'
  },
  gestalt: {
    before: 'images/beforeafter/gestalt-before.webp',
    after: 'images/beforeafter/gestalt-after.webp',
    caption: '同一页「季度报告」+ 三项关键数据。改前左竖列表+右折线图，元素无框无缩进散落、不知先看哪；改后三数据拢成上排卡片、下柱状图、底分析色块，每块被框住成视觉组，符合格式塔「接近+封闭」原理，主次清晰。'
  },
  'serif-sans': {
    before: 'images/beforeafter/serif-sans-after.webp',
    after: 'images/beforeafter/serif-sans-before.webp',
    caption: '同一份「市场数据」+ 20 项指标。改前黑字堆成纯文字表、仅靠字号差勉强分主次，扫一眼全是字、关键数字得逐行找；改后核心数字分进彩色卡片、标题加色块条装饰，靠颜色一眼分出主次、扫一眼抓到关键。'
  },
  'type-scale': {
    before: 'images/beforeafter/type-scale-before.webp',
    after: 'images/beforeafter/type-scale-after.webp',
    caption: '同一主题「用户协议摘要」。改前标题正文字号差太小、谁也不突出；改后超粗黑大字拉两三倍差，主次立现。理想：字号阶梯至少三档（主/副/正文）+段间 1.5-1.75 倍行距留呼吸。'
  },
  analogous: {
    before: 'images/beforeafter/analogous-before.webp',
    after: 'images/beforeafter/analogous-after.webp',
    caption: '同一主题「云上未来」。改前黄+红暖色硬切、字也灰得不清；改后深蓝平滑过渡到紫（色环邻居，跨度约 30°），统一有氛围不像硬切。理想：邻近色选色环跨度≤60° 的两三色，须做平滑过渡，否则就是色块硬切。'
  },
  complementary: {
    before: 'images/beforeafter/complementary-before.webp',
    after: 'images/beforeafter/complementary-after.webp',
    caption: '同一主题「限时特惠 立省 50%」。改前淡蓝单色平铺，最关键的 50% 也弱化、主次不清；改后深蓝渐变底+橙点亮 50%——蓝橙在色环几乎相对（约 180°），一眼吸睛。'
  },
  gradient: {
    before: 'images/beforeafter/gradient-before.webp',
    after: 'images/beforeafter/gradient-after.webp',
    caption: '同一主题「渐入佳境 起步 成长 收获」。改前高纯度色块堆叠（红/绿/紫）+杂色爆炸，三块硬拼没渐变味；改后淡蓝渐变背景+三个同色系圆（蓝→青→绿平滑过渡），柔和有序。'
  },
  'line-height': {
    before: 'images/beforeafter/line-height-before.webp',
    after: 'images/beforeafter/line-height-after.webp',
    caption: '同一主题「如何做好复盘」。改前纯文本密排、段间无行距、字贴字糊一团；改后卡片分组、段间留宽行距，眼睛跟着大块走很轻松。理想：正文 1.5-1.75 倍行距、段间留一整行呼吸。'
  },
  bullet: {
    before: 'images/beforeafter/bullet-before.webp',
    after: 'images/beforeafter/bullet-after.webp',
    caption: '同一主题「执行清单」+ 6 项流程。改前压成纯文本长段，6 步挤几行无分隔，要逐字数；改后蓝圆数字 1-6+短标题成行，编号自带分段，扫一眼知几步到哪。'
  },
  'font-license': {
    before: 'images/beforeafter/font-license-before.webp',
    after: 'images/beforeafter/font-license-after.webp',
    caption: '同一主题「品牌发布」。改前干净通用黑体（思源/阿里普惠类）免费安全；改后换街头涂鸦手写体+重描边+五彩装饰，来路不明艺术字商用易踩雷吃律师函。'
  },
  wordart: {
    before: 'images/beforeafter/wordart-before.webp',
    after: 'images/beforeafter/wordart-after.webp',
    caption: '同一主题「狂欢盛典」。改前 WordArt 泼彩手写+亮黄粉条+五彩星点，装饰过浓像初学者习作；改后宋体/无衬线端正标题，靠字重字号留白撑商务感。'
  },
  'color-wheel': {
    before: 'images/beforeafter/color-wheel-before.webp',
    after: 'images/beforeafter/color-wheel-after.webp',
    caption: '同一主题「色彩搭配」+ 主/辅/强调/背景四块。改前四色饱和顶满撞色、都像主色反无主次；改后按 60/30/10（蓝主+青辅+橙点+灰背景），角色清晰专业。理想：先用色轮定每色角色再选色。'
  },
  'muted-color': {
    before: 'images/beforeafter/muted-color-before.webp',
    after: 'images/beforeafter/muted-color-after.webp',
    caption: '同一主题「生活方式」+ 3 句正文。改前波普红黄绿高饱和彩条太闹，安静温情全被抢；改后莫兰迪（灰粉/烟蓝/雾绿低饱和带灰）温柔从容有治愈感。理想：情感/治愈/文艺用莫兰迪；宣讲/促销/节日用波普。'
  },
  'color-psychology': {
    before: 'images/beforeafter/color-psychology-before.webp',
    after: 'images/beforeafter/color-psychology-after.webp',
    caption: '同一标题「安全守护」+ 锁形图标。改前蓝绿+盾+夜景，显专业可信（金融/政企经典）；改后红黄爆裂+警示三角，本要安全却变危险，色彩与标题拧着。理想：先把情绪落到颜色（蓝绿可信/红橙紧迫）再选图配色。'
  },
  'theme-palette': {
    before: 'images/beforeafter/theme-palette-before.webp',
    after: 'images/beforeafter/theme-palette-after.webp',
    caption: '同一看板「数据看板」+ 4 KPI+ 趋势图。改前 4 卡全蓝单色克制、只取一色系；改后 4 卡红橙黄绿+彩虹渐变，12 色全上墙不知先看哪。理想：主题色板主 1+辅 1+点 1，余 9 色别动。'
  },
  'vertical-text': {
    before: 'images/beforeafter/vertical-text-before.webp',
    after: 'images/beforeafter/vertical-text-after.webp',
    caption: '同一主题「诗意江南」+ 水墨配图+ 4 字标题。改前「诗意江南」竖排右到左+小英文点缀，像国画题款有古意；改后拉横排铺满中央变水墨横幅，诗性被磨平。'
  },
  'text-outline': {
    before: 'images/beforeafter/text-outline-before.webp',
    after: 'images/beforeafter/text-outline-after.webp',
    caption: '同一标题「探索未知」+ 山河云海。改前白字+黑边在亮景像浮雕跳出来；改后纯黑字放夜景里沉下去认不出。理想：盖在复杂图上时加 1-2pt 对比色描边（白字黑边/黑字白边），背景变字也站得住。'
  },
  'replace-font': {
    before: 'images/beforeafter/replace-font-before.webp',
    after: 'images/beforeafter/replace-font-after.webp',
    caption: '同一标题「季度回顾」+ 三段长文本。改前粗黑无衬线标题+细黑无衬线正文，现代商务；改后一键换衬线宋体，文气典雅有人文感。三种用法：统一换字体、防客户缺字变默认、商务黑体秒切文化风衬线。'
  },
  'warm-cool': {
    before: 'images/beforeafter/warm-cool-before.webp',
    after: 'images/beforeafter/warm-cool-after.webp',
    caption: '同一主题「四季食光」+ 春/秋两段正文。改前全橙黄暖色单调缺节奏；改后左蓝紫碗+蓝莓做春、右橙黄茶杯+枫叶做秋，冷暖对称四季讲清。理想：对比/季节/情绪反差挑一对冷暖放左右；单一情绪用同色系深浅。'
  },
  'center-sym': {
    before: 'images/beforeafter/center-symmetry-before.webp',
    after: 'images/beforeafter/center-symmetry-after.webp',
    caption: '同一主题「年会盛典」+ 奖杯+ 总结。改前标题缩左上、奖杯挤右下，一轻一重不平衡；改后标题居中放大金立体字、奖杯居中、左右金色花结对称，仪式感拉满。理想：封面/致谢/颁奖页用中心对称，信息页用左对齐。'
  },
  'f-pattern': {
    before: 'images/beforeafter/f-pattern-before.webp',
    after: 'images/beforeafter/f-pattern-after.webp',
    caption: '同一主题「行业报告」+ 概述+ 3 数据。改前全居中堆中央、阅读跳来跳去；改后左上大标题+蓝横、3 数据左对齐成列、右下放图，顺「左上→左中→右下」踩中 F 型。'
  },
  'bleed': {
    before: 'images/beforeafter/bleed-before.webp',
    after: 'images/beforeafter/bleed-after.webp',
    caption: '同一主题「城市印象」+ 副标题。改前白底小方块+一圈白边，城市像邮票没气势；改后夜景大图铺满整页裁到边缘、标题压左上叠深空。理想：封面/海报/发布页用满版拉沉浸感；内容/数据页要留边距。'
  },
  'full-image': {
    before: 'images/beforeafter/full-image-before.webp',
    after: 'images/beforeafter/full-image-after.webp',
    caption: '同一主题「远方」+ 副标题。改前白底空壳方框、叫「远方」却无图没代入感；改后雪山公路满版、白字叠天空亮区，看图就去。理想：全图排版「图就是页」——字放亮区读得清，暗区压字加半透明蒙层。'
  },
  'visual-balance': {
    before: 'images/beforeafter/visual-balance-before.webp',
    after: 'images/beforeafter/visual-balance-after.webp',
    caption: '同一主题「产品对比」+ 3 要点。改前黑耳机硬塞左下、左重右轻；改后浅蓝白耳机放左圆角卡片、右大标题+蓝横+图标要点均衡排开、右上点状提亮，重量配平。理想：平衡靠大小+深浅+装饰配重，非左右对称。'
  },
  'symmetry': {
    before: 'images/beforeafter/symmetry-before.webp',
    after: 'images/beforeafter/symmetry-after.webp',
    caption: '同一主题「创新论坛」+ 人物图+要点。改前左大图右小字，重心偏左像没设计；改后左图加身份说明、右标题放大金高亮、要点加大加密+引号装饰，非对称但重量对等。理想：内容/提案页用非对称，仪式页用对称。'
  },
  'diagonal-flow': {
    before: 'images/beforeafter/diagonal-flow-before.webp',
    after: 'images/beforeafter/diagonal-flow-after.webp',
    caption: '同一主题「成长之路」+ 4 步骤。改前白底居中堆叠、无方向无动势；改后雪山实景+大箭头左下「起点」斜射右上「登顶」、4 图标沿对角线排，眼睛顺箭头走完。理想：封面/步骤/路线图用对角线更有动势。'
  },
  'text-margin': {
    before: 'images/beforeafter/text-margin-before.webp',
    after: 'images/beforeafter/text-margin-after.webp',
    caption: '同一主题「温馨提示」+ 3 条提醒。改前字号大、贴边框，黑压压；改后缩字号、与边框留白，透气。理想:带边框文本框右键→设置形状格式→文本选项→「内部边距」改 0.1-0.3 cm 即透气;别回车硬挤。'
  },
  'para-spacing': {
    before: 'images/beforeafter/para-spacing-before.webp',
    after: 'images/beforeafter/para-spacing-after.webp',
    caption: '同一主题「会议纪要」+ 4 板块。改前 8 行贴一起段间无空白，分不清起止；改后大标题+蓝短横+圆点编号+粗体小标题+明显空行，节奏立现。理想：段后 6-12pt，用段间距别狂敲回车。'
  },
  'autofit': {
    before: 'images/beforeafter/autofit-before.webp',
    after: 'images/beforeafter/autofit-after.webp',
    caption: '同一主题「项目简介」+ 4 行长描述。改前塞同框字号大行距紧，末 3 字被裁+红三角警告；改后拆 3 行精炼短句+浅蓝波纹+左蓝细条，完整显设计。理想：超 3 行易溢出——改字号/删字或拆两框。'
  },
  'smartart-to-shape': {
    before: 'images/beforeafter/smartart-to-shape-before.webp',
    after: 'images/beforeafter/smartart-to-shape-after.webp',
    caption: '同一主题「团队结构」+ 3 级层次。改前 SmartArt 默认蓝渐变矩形+黑硬线，像 2010 政府模板；改后「转为形状」拆独立对象，白底蓝描边圆角+头像图标+灰虚线，升级品牌图示。'
  },
  'data-viz': {
    before: 'images/beforeafter/data-viz-before.webp',
    after: 'images/beforeafter/data-viz-after.webp',
    caption: '同一份「各渠道销售额」(搜索/社交/邮件/广告/直访)。改前单色柱状图能比数值、看不出占比；改后多彩饼图标数值+百分比，「搜索占 28.6%」一眼看懂。'
  },
  'flat-vs-skeu': {
    before: 'images/beforeafter/flat-vs-skeu-before.webp',
    after: 'images/beforeafter/flat-vs-skeu-after.webp',
    caption: '同一组「功能图标」(设置/分享/收藏/搜索)。改前拟物金属齿轮+青铜光影+破旧纹理，看着累；改后扁平线条+纯白底+无阴影，干净现代。'
  },
  'model-3d': {
    before: 'images/beforeafter/model-3d-before.webp',
    after: 'images/beforeafter/model-3d-after.webp',
    caption: '同一款「产品展示」投影仪。改前平面线条图+文字描述，角度固定、立体感弱；改后插入可旋转 3D 模型，配光影金属底座，专业感拉满。'
  },
  'infographic': {
    before: 'images/beforeafter/infographic-before.webp',
    after: 'images/beforeafter/infographic-after.webp',
    caption: '同一份「健康报告」5 项指标。改前纯文字一行「睡眠7h、运动3次/周…」，数字串行抓不到重点；改后 5 张彩色卡片+环形进度+对比条，关键指标一眼锁定。'
  },
  'edit-points': {
    before: 'images/beforeafter/edit-points-before.webp',
    after: 'images/beforeafter/edit-points-after.webp',
    caption: '同一组「品牌标记」占位需求。改前一个灰色实心矩形充当 Logo 位，太硬；改后用编辑顶点把圆拉成水滴+尾巴，自然又有品牌记忆点。'
  },
  'object-effect': {
    before: 'images/beforeafter/object-effect-before.webp',
    after: 'images/beforeafter/object-effect-after.webp',
    caption: '同一句「用户价值驱动是产品长期增长的核心引擎」。改前深蓝底+蓝矩形填字、平涂无层次；改后加橙色光晕+白卡阴影+渐变流光，重点自然聚焦，质感专业。'
  },
  'icons': {
    before: 'images/beforeafter/icons-before.webp',
    after: 'images/beforeafter/icons-after.webp',
    caption: '同一页「咨询/报价/签约/交付」四步流程。改前只靠 01-04 数字+纯文字，抽象到记不住；改后每步配线性图标（聊天气泡/价格牌/握手/包裹），一看就知道该步骤做什么。'
  },
  'chart-edit': {
    before: 'images/beforeafter/chart-edit-before.webp',
    after: 'images/beforeafter/chart-edit-after.webp',
    caption: '同一份「用户构成」占比数据。改前直接插入默认饼图、无图例无标签，只看到 4 块色、不知道哪块是多少；改后加数据标签「40%/35%/15%/10%」、右侧图例+标题下划装饰，结论一眼可读。'
  },
  'excel-table': {
    before: 'images/beforeafter/excel-table-before.webp',
    after: 'images/beforeafter/excel-table-after.webp',
    caption: '同一份「销售明细」8 行数据。改前手绘 Excel 表格截图，单元格歪斜、有合并；改后嵌入 Excel 实时表，改个数字表格联动更新、列宽自适应，还能一键排序筛选。'
  },
  'rotate-flip': {
    before: 'images/beforeafter/rotate-flip-before.webp',
    after: 'images/beforeafter/rotate-flip-after.webp',
    caption: '同一页「方向指引」3 个箭头元素。改前三个箭头方向混乱（左/斜上/右），强调「目标混乱、方向不统一」；改后用旋转+翻转让三箭头统一朝向右上，读起来是一个节奏、一句话。'
  },
  'autoshape': {
    before: 'images/beforeafter/autoshape-before.webp',
    after: 'images/beforeafter/autoshape-after.webp',
    caption: '同一组「要点提炼」四要点。改前只用矩形占位卡+「要点一/二/三/四+此处输入」模板；改后改成圆角矩形+对话框气泡+图标+序号彩色徽章，矢量放大清晰、可自由改色。'
  },
  'chart-elements': {
    before: 'images/beforeafter/chart-elements-before.webp',
    after: 'images/beforeafter/chart-elements-after.webp',
    caption: '同一组「月度营收」1-6 月数据。改前纯蓝色柱+网格线，没数字标签、没趋势；改后加数据标签「50/62/58/75/80/92」+渐变柱色+上升趋势箭头，业绩走向一眼到位。'
  },
  'connector': {
    before: 'images/beforeafter/connector-before.webp',
    after: 'images/beforeafter/connector-after.webp',
    caption: '同一组「审批流程」四节点。改前手绘折线箭头歪歪扭扭，节点不对齐；改后节点+圆角矩形+平滑连接线，拖动节点连线自动跟随，流程图专业利落。'
  },
  'smart-guides': {
    before: 'images/beforeafter/smart-guides-before.webp',
    after: 'images/beforeafter/smart-guides-after.webp',
    caption: '同一页「图文混排」。改前图片与两段文字间距忽大忽小、左缘对不齐；改后靠智能参考线自动吸附，图与文字等距对齐，版面稳当。'
  },
  'combo-chart': {
    before: 'images/beforeafter/combo-chart-before.webp',
    after: 'images/beforeafter/combo-chart-after.webp',
    caption: '同一组「营收与利润」1-6 月数据。改前拆成左右两个独立图表，量纲不同还得左右对比；改后柱+折线组合图+次坐标轴，一图看两组数据关系。'
  },
  'data-label': {
    before: 'images/beforeafter/data-label-before.webp',
    after: 'images/beforeafter/data-label-after.webp',
    caption: '同一组「季度对比」Q1-Q4 数据。改前纯蓝柱没有数值，得靠眼睛估；改后每柱顶加数据标签「30/45/40/60」，具体数值一目了然。'
  },
  'data-bars': {
    before: 'images/beforeafter/data-bars-before.webp',
    after: 'images/beforeafter/data-bars-after.webp',
    caption: '同一组「达成率排行」5 人数据。改前纯百分比数字，大小得一行行比；改后在单元格里加蓝色数据条，长短一眼看出高低。'
  },
};
