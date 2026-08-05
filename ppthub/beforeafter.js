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
    caption: '同一页内容：标题「增长策略」「三步走」+ 获客、留存、转化三个要点。改前所有文字都居中、字号一样大，看不出谁是重点；改后大标题在上、副标题做说明，三个要点用 01、02、03 编号带一句话解释，主次分明，一眼就能看懂。'
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
    caption: '同一页内容：标题「近 6 个月销售额」+ 1–6 月数据（120 / 145 / 138 / 170 / 162 / 195 万元）。改前是默认立体柱状图，蓝紫红渐变、边框厚重、网格线乱；改后去掉网格和立体效果，柱子改成圆角单色、每根柱顶加上清晰数据标签，整体清爽好读。'
  },
  'table-beauty': {
    before: 'images/beforeafter/table-beauty-before.webp',
    after: 'images/beforeafter/table-beauty-after.webp',
    caption: '同一页内容：标题「各部门 Q3 预算」+ 市场 80 万、研发 120 万、销售 95 万、行政 40 万。改前是默认表格，密密麻麻全是黑边框，行与行挤在一起；改后只保留上下细线、表头用深色、行与行之间拉开距离并加上斑马纹，预算数字还对齐，整体清爽专业。'
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
    caption: '同一页内容：标题「年度设计趋势」+ 极简主义、动态图形、品牌色系统三段正文。改前标题和正文都用同一种宋体，标题没特点、正文像看书，整体老气；改后标题用粗黑体，正文用常规无衬线体，中英文字体搭配，像杂志一样有设计感。'
  },
  monochrome: {
    before: 'images/beforeafter/monochrome-before.webp',
    after: 'images/beforeafter/monochrome-after.webp',
    caption: '同一页内容：标题「销售漏斗分析」+ 访问 10000 / 注册 3500 / 付费 800 / 复购 240。改前四个数据卡片用红、黄、蓝、绿四种不搭调的颜色，像幼儿园展板；改后全部用同一蓝色的不同深浅，色调统一，数字层级清楚，看起来高级专业。'
  },
  margin: {
    before: 'images/beforeafter/margin-before.webp',
    after: 'images/beforeafter/margin-after.webp',
    caption: '同一页内容：标题「市场洞察」+ 目标用户年轻化、移动端占比超 70%、内容种草成决策关键。改前文字紧紧贴到页面四周边缘，像要溢出去，版面拥挤；改后四周留出充足页边距，内容被约束在中间，呼吸感好、稳重专业。'
  },
  'rule-of-thirds': {
    before: 'images/beforeafter/rule-of-thirds-before.webp',
    after: 'images/beforeafter/rule-of-thirds-after.webp',
    caption: '同一页内容：标题「旅行企划」+ 风景照片 + 口号「出发，就现在」。改前标题、照片、口号全部挤在页面正中央，上下空着中间挤，呆板没张力；改后照片放到左侧约三分之二，标题和口号分别放在右侧上下三分位，构图平衡、有呼吸感。'
  },
  repetition: {
    before: 'images/beforeafter/repetition-before.webp',
    after: 'images/beforeafter/repetition-after.webp',
    caption: '同一主题：标题「用户增长五步法」+ 拉新、激活、留存、变现、推荐五个步骤。改前五个步骤的序号形状、颜色、标题色各不相同，像五个不同模板拼在一起；改后用一样的圆角卡片、一样的白色圆圈序号、一样的标题样式重复排列，视觉语言统一，节奏感和专业感都出来了。'
  },
  proximity: {
    before: 'images/beforeafter/proximity-before.webp',
    after: 'images/beforeafter/proximity-after.webp',
    caption: '同一页内容：标题「产品运营三件事」+ 用户画像、渠道投放、活动策划、数据分析、用户反馈、版本迭代六个模块。改前六个模块散在页面上，看不出谁跟谁一伙；改后把相关的三个三个靠在一起、用虚线框归成两组，信息分组清楚、一眼就能看懂。'
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
    caption: '同一页内容：标题「三步上手」+ 注册、配置、发布三个步骤。改前把三个圆圈用一条箭头横着串起来，眼睛只能顺着箭头一条线走，没有重点，分不清先看哪一步；改后把三个步骤做成三张便签纸错开摆，便签颜色不同、版面留白拉开，眼睛自然先抓到主标题，再一张一张读完，重点和顺序都出来了。'
  },
  'brand-vi': {
    before: 'images/beforeafter/brand-vi-before.webp',
    after: 'images/beforeafter/brand-vi-after.webp',
    caption: '同一页内容：标题「公司介绍」+ 一句品牌主张。改前塞了紫藤花、Disco 球、繁体花体字、五彩装饰球，企业色不知道是紫还是粉，字体还到处乱，看着像开业大酬宾海报；改后只保留品牌主色一种蓝、Logo 摆在固定位、字体统一商务体，全页克制、可信，专业感立刻出来。'
  },
  'less-is-more': {
    before: 'images/beforeafter/less-is-more-before.webp',
    after: 'images/beforeafter/less-is-more-after.webp',
    caption: '同一页内容：标题「产品介绍」+ 更快、更稳、更省、更安全四点。改前塞了奖杯、合作伙伴 logo、一堆数字徽章、爆炸贴纸、霓虹底色，每一点都被一堆装饰盖住；改后只留主标题和四个关键词、一句说明话，背景彻底干净，重点一眼就看到，信息反而清晰。'
  },
  'icon-style': {
    before: 'images/beforeafter/icon-style-before.webp',
    after: 'images/beforeafter/icon-style-after.webp',
    caption: '同一页内容：标题「核心功能」+ 日程、文件、协作、通知四项。改前四个图标一个线条、一个填色、一个拟物、一个 emoji，颜色还是蓝绿黄各一，看着像四个不同 App 拼的；改后统一用一组同系列 3D 立体图标，圆角一致、暖色调一致、光影一致，整页一体感立刻出来，专业度高了一档。'
  },
  'visual-flow': {
    before: 'images/beforeafter/visual-flow-before.webp',
    after: 'images/beforeafter/visual-flow-after.webp',
    caption: '同一页内容：标题「年度总结」+ 业绩增长、用户突破、问题反思三点。改前三个文字挤在页面上半部、下半部只放一张大照片，视线乱跳不知道先看哪；改后三点在上一排均匀铺开，下方加一条上升的折线图标，眼睛自然从上往下顺着走完，整个阅读节奏顺滑。'
  },
  'info-density': {
    before: 'images/beforeafter/info-density-before.webp',
    after: 'images/beforeafter/info-density-after.webp',
    caption: '同一页内容：标题「文学赏析」+ 意境之美、语言之妙、结构之巧三点。改前一张山水画占大半页，三点用大圆数字 1/2/3 浮在画上，字距撑得老开，整页像展览海报——字太少、信息密度低，重点也没出来；改后换成传统宣纸框，三点用一、二、三、编号紧凑排版、字密行紧，整页一屏说透，文学课件的味儿一下立住了。'
  },
  consistency: {
    before: 'images/beforeafter/consistency-before.webp',
    after: 'images/beforeafter/consistency-after.webp',
    caption: '同一页内容：标题「核心团队」+ 11 位成员的姓名和头衔。改前按产品、技术、运营分成三块，每块用一种颜色徽章和不同卡片样式，标题色也跟着变，整页三种视觉语言并存，像三个部门排版没统一过；改后去掉所有分组框、把头像框、字号、标题样式统一成一套，整页只剩一种视觉语言，11 个人像同一队人，不再像三组拼起来。'
  },
  'fill-rate': {
    before: 'images/beforeafter/fill-rate-before.webp',
    after: 'images/beforeafter/fill-rate-after.webp',
    caption: '同一页内容：标题「夏日新品」+ 「清爽防晒、水润加倍、自在一夏」一句话 + 一瓶防晒。改前产品占右半边大图、文字在左，整页满满当当、看着震撼，但版面率偏高、视觉负担重；改后产品缩到右下角小图、文字挪到左上，整页八成是空白、版面率过低，看着空旷没诚意。理想状态是文图各占一半——产品有存在感、文字有呼吸，比例才稳。'
  },
  gestalt: {
    before: 'images/beforeafter/gestalt-before.webp',
    after: 'images/beforeafter/gestalt-after.webp',
    caption: '同一页内容：标题「季度报告」+ 三项关键数据（销售额、订单量、客户增长）。改前左侧竖排三条列表、右侧一张折线图，元素之间没有围框也没有缩进，看着散落各处、眼睛不知道先看哪；改后把三个数据拢成上方一排卡片、下方柱状图、底部再加一条分析与总结的色块，每个内容块被框住成视觉组，符合格式塔的「接近+封闭」原理，眼睛自然把相近的元素归成一团，主次瞬间清晰。'
  },
  'serif-sans': {
    before: 'images/beforeafter/serif-sans-before.webp',
    after: 'images/beforeafter/serif-sans-after.webp',
    caption: '同一页内容：标题「市场数据」+ 20 项指标数据。改前全用同一种粗黑无衬线、所有数字都加色块、标题跟着加色，看着热闹但扫一眼一片眼花，长时间阅读眼睛累；改后把标题换成衬线体做「骨」、正文保留无衬线做「肉」，再去掉所有色块、只靠字重和大小区分主次，密集数据看着不闷、反而有书页那种专业沉稳感。'
  },
  'type-scale': {
    before: 'images/beforeafter/type-scale-before.webp',
    after: 'images/beforeafter/type-scale-after.webp',
    caption: '同一主题「用户协议摘要」。改前标题与正文字号差太小，看上去基本齐平、谁也不突出；改后把标题做成超粗超黑大字、跟正文拉开两三倍字号差，主次一眼就出来——不过正文段落之间完全没留行距，所有字挤在一起看着累。理想字号阶梯至少三档（主标题 48–60 / 副标题 24–32 / 正文 14–16）+ 段与段之间 1.5–1.75 倍行距留点呼吸，才能读得顺。'
  },
  analogous: {
    before: 'images/beforeafter/analogous-before.webp',
    after: 'images/beforeafter/analogous-after.webp',
    caption: '同一主题「云上未来，以云为基，智联未来」。改前是黄+红暖色硬切（跨度 30° 也在邻近色范围内），但没做色相过渡、字也灰得看不清；改后用深蓝平滑过渡到紫色——蓝与紫在色环上是邻居（跨度 30° 左右），整页色彩统一又有氛围，不像硬切那样花。邻近色搭配通常选色环上跨度不超过 60° 的两到三色，但一定要做平滑过渡（同色相不同明度、或色环上相邻两色渐变），否则就是色块硬切。'
  },
  complementary: {
    before: 'images/beforeafter/complementary-before.webp',
    after: 'images/beforeafter/complementary-after.webp',
    caption: '同一主题「限时特惠 立省 50%」。改前是淡蓝单色平铺做背景，「50%」这个最关键的数字也用同色系弱化掉，主次完全看不出来；改后深蓝渐变做底、最关键的「50%」用橙色点亮——蓝与橙在色环上几乎正好相对（跨度 180°），一眼吸睛、折扣力度直接打出来。对比色拿捏在色相跨度 150°–180° 的两个色，再用面积主辅拉开层次、重点字用对比色高亮，主次就立现。'
  },
  gradient: {
    before: 'images/beforeafter/gradient-before.webp',
    after: 'images/beforeafter/gradient-after.webp',
    caption: '同一主题「渐入佳境 起步 成长 收获」。改前是高纯度色块堆叠（红 / 绿 / 紫）+ 杂色爆炸风，三块之间没有色相过渡，就是把三种颜色硬拼在一起，没渐变那味儿；改后是淡蓝渐变背景配三个同色系圆（蓝→青→绿平滑过渡），柔和有序，才是真渐变。理想渐变要选同色相不同明度、或色环上相邻两色，带柔的过渡，没有明显接缝。'
  },
  'line-height': {
    before: 'images/beforeafter/line-height-before.webp',
    after: 'images/beforeafter/line-height-after.webp',
    caption: '同一主题「如何做好复盘 定义 / 步骤 / 误区」。改前纯文本密密麻麻一字排满、段间没行距、字与字之间也几乎贴在一起，整页内容糊成一团；改后是卡片式分组、段与段之间留了宽行距，眼睛跟着大块走很轻松。理想做法：正文 1.5–1.75 倍行距（光标找下一行起点不费力），段与段之间留一整行做呼吸，长内容才不看着累。'
  },
  bullet: {
    before: 'images/beforeafter/bullet-before.webp',
    after: 'images/beforeafter/bullet-after.webp',
    caption: '同一主题「执行清单」+ 需求确认 / 设计稿 / 开发 / 测试 / 上线 / 复盘 六项流程。改前把所有内容压成一坨纯文本长段落,六个步骤挤进几行连分隔都没有,要找下一步得逐字数;改后每个步骤用蓝色圆形数字编号 1–6 + 短标题单独成行,编号自带视觉分段,扫一眼就知道有几步、当前到哪儿。理想做法:每步单独一行 + 视觉化的编号(圆点 / 方块 / 序号 / 图标),长说明拆成「编号 + 短标题 + 一句说明」三段式,别堆在一行让人找不到重点。'
  },
  'font-license': {
    before: 'images/beforeafter/font-license-before.webp',
    after: 'images/beforeafter/font-license-after.webp',
    caption: '同一主题「品牌发布」。改前用干净的通用黑体(思源黑体 / 阿里巴巴普惠体一类的免费商用字体),克制专业、内部传播和对外商业用都安全;改后换成看似花哨的「街头涂鸦手写体」+ 重描边 + 烟花 / 星星 / 爱心 五彩装饰,这种来路不明的艺术字大多没完整商用授权,内部分享没事、商业发布就可能踩雷吃律师函。理想做法:标题用「思源黑体 / 阿里巴巴普惠体 / 微软雅黑」这类明确免费的字体,装饰字找官方授权或自制 SVG,看到「好看」别直接拖来用。'
  },
  wordart: {
    before: 'images/beforeafter/wordart-before.webp',
    after: 'images/beforeafter/wordart-after.webp',
    caption: '同一主题「狂欢盛典 惊喜不断·好礼相送·共庆美好时刻」。改前用 WordArt 泼彩手写风 + 亮黄 / 粉色条做底 + 五彩星点装饰,字体装饰过浓、撞色过强、附加图形乱放,反而像 PPT 模板初学者习作;改后换成宋体 / 无衬线端正标题,排面靠字重、字号、留白撑,商务感足。艺术字要克制:只用于标题位或节庆/双 11 这类强氛围页面、一套 PPT 只用一种艺术字风格、背景不要高饱和彩条堆色块,普通商务汇报、毕业答辩、招标提案就别用。'
  },
  'color-wheel': {
    before: 'images/beforeafter/color-wheel-before.webp',
    after: 'images/beforeafter/color-wheel-after.webp',
    caption: '同一主题「色彩搭配」+ 主色 / 辅助 / 强调 / 背景 四块。改前红 / 紫 / 橙 / 绿四色饱和度都顶满,色相撞了一塌糊涂、四个色看着都像主色反倒没了主次;改后按 60/30/10 原则定了四色(60% 蓝主 + 30% 青辅 + 10% 橙强调 + 中性灰背景),每色 H/S/B 都明确、Harmony 抓主色+配中性灰、强调色用对比色吸睛,一上手就专业。理想做法:先用色轮 / HSB 三参数定下每色承担的角色(主 60% / 辅 30% / 点 10% / 灰背景),再选色,色彩才不会乱。'
  },
  'muted-color': {
    before: 'images/beforeafter/muted-color-before.webp',
    after: 'images/beforeafter/muted-color-after.webp',
    caption: '同一主题「生活方式」+ 在平凡的日子 / 用心感受生活 / 平衡工作与生活。改前波普红 / 黄 / 绿 + 高饱和彩条 + 卡通装饰,视觉冲击力爆棚但太「闹」,原本想表达的安静、舒展、温情全被抢戏;改后莫兰迪色(灰粉 / 烟蓝 / 雾绿这种低饱和度带灰调的颜色),整页温柔、从容、有书页那种安静治愈感,是高级灰/莫兰迪色最典型的用法。理想:情感类、治愈类、人物专访、文艺风格页面选莫兰迪色;宣讲、打 call、促销、节日氛围才用波普色。'
  },
  'color-psychology': {
    before: 'images/beforeafter/color-psychology-before.webp',
    after: 'images/beforeafter/color-psychology-after.webp',
    caption: '同一标题「安全守护 / 让数据更安心」+ 锁形图标。改前用蓝绿色系 + 盾形光环 + 城市夜景,蓝偏冷调、绿偏自然,看一眼就觉得「专业、可靠、安全、可信」,这是金融 / 政企 / 安全类 PPT 最经典的色彩心理学打法;改后换成红黄爆裂 + 警示黄三角 + 闪电警告,红黄自带危险、急迫、警报信号,本来想表达「安全」结果变成了「危险」,色彩传递的信息和标题完全拧着来。理想:先把页面要传递的情绪落到颜色上(蓝/绿=专业可信任、红/橙=紧迫热烈、黑/金=高端神秘、粉/白=温柔治愈),再选图配色,情绪才不会跑题。'
  },
  'theme-palette': {
    before: 'images/beforeafter/theme-palette-before.webp',
    after: 'images/beforeafter/theme-palette-after.webp',
    caption: '同一看板「数据看板」+ 4 个 KPI 卡 + 一张趋势图。改前 4 张卡全部走蓝单色 + 中性灰,只有 1 个主色调,看着干净克制、12 色色板里只取一色系复用,符合「主辅点三色」原则;改后 4 张卡红 / 橙 / 黄 / 绿各一种,加上背景的彩虹渐变,12 色色板被一窝端全部上墙,眼睛不知道先看哪。理想:用 Office「主题色板 12 色」时,主色挑 1 个(占 60%)+ 辅色挑 1 个(占 30%)+ 强调色挑 1 个(占 10%),剩下 9 色别动,12 色板的「统一感」就立住了。'
  },
  'vertical-text': {
    before: 'images/beforeafter/vertical-text-before.webp',
    after: 'images/beforeafter/vertical-text-after.webp',
    caption: '同一主题「诗意江南」+ 江南水墨配图 + 4 个字标题。改前标题「诗意江南」从右到左竖排,右边再排一行小英文「Poetic Jiangnan, Where Time Dwells in Beauty」做点缀,整体是国画题款的传统排法,中文配竖排才像真印章;改后把标题拉成横排铺满中央,英文跟着横排、占两行,整页变成了水墨横幅海报,中文的「诗性」和「古意」被横排磨平了大半。理想:中文标题想有书卷气、博物馆感、文人风,优先竖排(尤其 2–6 字);现代商务、科技、互联网页面才用横排,排错了风格就破。'
  },
  'text-outline': {
    before: 'images/beforeafter/text-outline-before.webp',
    after: 'images/beforeafter/text-outline-after.webp',
    caption: '同一标题「探索未知」+ 山河云海大图。改前标题用纯白 + 粗黑描边(白字+黑边),在晚霞云海那种亮色背景上像浮雕一样跳出来,远看也看得清每个字——这就是「文字描边 / 轮廓」最经典的用途:文字和背景明度差太小时(亮景+亮字 或 暗景+暗字),给字加一层对比色描边,把字「抠」出来;改后只留纯黑字放在大夜景里,山云本身偏暗、文字也跟着沉到画面里,远看几乎认不出来在写什么。理想:文字覆盖在复杂图片上(风景、纹理、实拍)时,都加一圈 1–2pt 的对比色描边(白字+黑边 / 黑字+白边),无论背景怎么变,字永远站得住。'
  },
  'replace-font': {
    before: 'images/beforeafter/replace-font-before.webp',
    after: 'images/beforeafter/replace-font-after.webp',
    caption: '同一标题「季度回顾」+ 三段长文本。改前标题用粗黑无衬线 + 正文用细黑无衬线,现代、清晰、商务感强,是汇报类 PPT 的标配;改后一键把全篇替换成衬线宋体,标题、瞬间变得文气、典雅,有点人文感。三种常见场景(中文 PPT 在 3 个不同体之间替换):1)统一换字体——大公司把全公司模板字体从「思源黑体」统一换成「阿里巴巴普惠体」,一键搞定;2)防止字体丢失——交给客户的 PPT 用了客户电脑没装的「方正小标宋」,打开全变默认宋体,提前用「替换字体」换成「思源宋体」并嵌入字体;3)风格切换——把商务汇报用的黑体瞬间换成衬线宋体,变成年终文化回顾、内刊展示。'
  },
  'warm-cool': {
    before: 'images/beforeafter/warm-cool-before.webp',
    after: 'images/beforeafter/warm-cool-after.webp',
    caption: '同一主题「四季食光」+ 春之清新 / 秋之温暖 两段正文。改前整页全走橙黄暖色,两张食物图、一段文字、一个标题都被同一种暖色铺满,视觉温度单调、缺乏节奏,看不出四季的对比;改后左半边用蓝紫色碗+蓝莓做「春」,右半边用橙黄色茶杯+枫叶做「秋」,冷暖两色对称呼应,四季的故事一眼就讲清楚。理想:做「对比 / 季节 / 情绪反差 / 南北 / 昼夜」这类主题时,主动挑一对冷暖色(蓝/紫 vs 橙/黄)放左右或上下,色彩本身就是叙事;只做单一情绪(全是温暖、安静、科技感)就用同色系深浅,别硬塞对比。'
  },
  'center-sym': {
    before: 'images/beforeafter/center-symmetry-before.webp',
    after: 'images/beforeafter/center-symmetry-after.webp',
    caption: '同一主题「年会盛典」+ 奖杯图 + 总结两行正文。改前标题「年会盛典」缩在左上角、奖杯图挤到右下角,两边一轻一重,版面不平衡,看着像随手排的过渡页;改后标题居中放大、金色立体字,奖杯也放到页面正中央,左右两边各配一段金色花结和光线,整页沿中轴线左右对称排布,庄重、平衡、仪式感拉满,一看就是正式盛典封面。理想:封面 / 致谢 / 金句页 / 颁奖页 这种需要「仪式感」的页用中心对称——标题居中、主图居中、装饰元素左右镜像排;但信息页 / 目录页 / 数据页别用,信息量一大对称就会显呆板,改用左对齐更灵动。'
  },
  'f-pattern': {
    before: 'images/beforeafter/f-pattern-before.webp',
    after: 'images/beforeafter/f-pattern-after.webp',
    caption: '同一主题「行业报告」+ 一段行业概述 + 市场规模 / 增长率 / 用户规模 三行数据。改前标题居中、正文段落居中、三行数据也全部居中堆在页面正中央,眼睛不知道先看哪里、读完一段要走很远才能回到下一段,典型的「排版居中癌」;改后大标题「行业报告」贴左上 + 一条蓝色横线压住,三行数据(图标+百分比+小字说明)沿左边线整齐左对齐排成一列,城市风景图放到右侧,读者自然沿「左上标题 → 左中数据 → 右下图」走完整页,正好踩中 F 型阅读路径。理想:内容页 / 报告页 / 数据页 默认就用 F 型布局——左上一句话大标题、左中放关键数据/要点、右下放配图/装饰,扫一眼就抓完所有重点;只有封面 / 金句 / 颁奖这种「仪式感」页才用居中对称。'
  },
  'bleed': {
    before: 'images/beforeafter/bleed-before.webp',
    after: 'images/beforeafter/bleed-after.webp',
    caption: '同一主题「城市印象」+ 一句话副标题。改前白底,左上角小字「城市印象」+ 居中一个 200x200 的小方块放城市夜景 + 下面一行小字,四周一圈圈全是白边,城市塞在画面正中央像颗邮票,没有氛围、没有气势,标题和图各管各的没呼应;改后一张上海夜景大图直接铺满整页,左右上下都裁到画布边缘(甚至刻意裁掉楼顶塔尖),不留任何白边,标题压到左上,白色大字「城市印象」+ 副标题「让建筑与生活共生长」叠在深色天空上,城市就是这张 PPT 的全部气场。理想:封面 / 海报 / 主题页 / 产品发布页 想拉满「沉浸感」就用满版——选一张高质量大图直接铺,边角不要留白,标题压左上或居中即可;内容页 / 数据页 / 文字多的页 反而要留边距,别硬塞满版,会让阅读疲劳。'
  },
  'full-image': {
    before: 'images/beforeafter/full-image-before.webp',
    after: 'images/beforeafter/full-image-after.webp',
    caption: '同一主题「远方」+ 副标题「去你想去的地方」。改前白底,中间一个细线小方框里写着「远方 / 去你想去的地方」,下面 70% 全是空白,标题是有了,但叫「远方」却一张图都没有,说好的诗和远方只剩一个空壳方框,完全没有代入感;改后一张雪山公路大图直接铺满整页,云海、雪峰、公路全占满画面,白色大字「远方」+ 小字副标题叠在天空最亮处,看图就想去,主题和画面是同一件事。理想:全图型排版的核心是「图就是页」——选一张高分辨率、能撑住整页的大图(风景、城市、产品特写、抽象纹理),文字直接叠上去;如果图里有亮区(天空、留白),把字放在亮区读得清,暗区压字就要加暗色蒙层(给图盖一层黑/深蓝半透明)再放白字。'
  },
  'visual-balance': {
    before: 'images/beforeafter/visual-balance-before.webp',
    after: 'images/beforeafter/visual-balance-after.webp',
    caption: '同一主题「产品对比」+ 三个产品要点(更出色音质/更舒适佩戴/更持久续航)。改前黑色大耳机硬塞到左下角一小块,左边 60% 画面被黑色吞掉,右边三行小字像飘在白纸上,左重右轻、左黑右白,整体重心明显坠到左下角,眼睛想往右看但被拉回来,看着「别扭」但说不出哪里不对;改后两只耳机换成浅蓝白色、放在左侧一个圆角大卡片里(占左 45%),右侧大标题「产品对比」+ 蓝色横线 + 三个图标要点均衡排开,右上还加点状装饰提亮,左右视觉重量(深 vs 浅、大块 vs 散点)刚好配平,整页重心稳在中央。理想:视觉平衡不是「左右对称」,而是「视觉重量对等」——一块大黑块需要几行小字 + 几个小图标 + 一块浅色来配重;失衡的最常见信号是「画面看着偏、不舒服」,这时回头调:大块往中心挪、加元素填空角、换浅色压重量,基本都能救回来。'
  },
  'symmetry': {
    before: 'images/beforeafter/symmetry-before.webp',
    after: 'images/beforeafter/symmetry-after.webp',
    caption: '同一主题「创新论坛」+ 人物图 + 4–5 条发言要点。改前左侧一张人物大图占满左半边(右边缘圆弧剪裁),右侧一个大标题「创新论坛」+ 4 条要点(小字 + 小图标),虽然用了「左图右文」的左右结构,但左侧重量明显比右侧重,右侧文字偏小偏散,整体重心偏左,看上去像没设计过的普通模板页;改后同样的人物图放左侧,左下加人物身份说明「张明远 / 未来科技研究院 院长」,右侧标题放大、加金色高亮,5 条要点的字号也更大更密,还加了右上角的引号装饰 + 右下散点纹理,左侧重右侧也重起来,非对称但视觉重量对等——这才叫「平衡的非对称」。理想:内容页 / 提案页 / 人物介绍页 默认用非对称(左人物右文字、左大图右要点),显灵动有设计感;非对称不等于「随便偏」,要靠「大小对比 + 色彩深浅 + 装饰元素」主动配重,做到「看着偏但视觉舒服」。政府报告 / 颁奖页 / 仪式感页 才用对称(左右镜像、沿中轴排),稳但容易呆板。'
  },
  'diagonal-flow': {
    before: 'images/beforeafter/diagonal-flow-before.webp',
    after: 'images/beforeafter/diagonal-flow-after.webp',
    caption: '同一主题「成长之路」+ 4 个步骤(起点 / 突破 / 加速 / 登顶)。改前白底居中堆叠:大标题「成长之路」居中 + 4 个圆角小图标(蓝/绿/黄/紫)竖着排在中线 + 4 个步骤名字,整页元素全在画布中线左右小幅浮动,没有方向、没有动势,观众不知道先看哪里、看完一个步骤要跳到下一个;改后蓝色天空中放满版雪山实景 + 一条大箭头从左下「起点」斜斜射向右上山顶「登顶」,4 个圆角图标沿这条对角线等距排开(起点→突破→加速→登顶),标题左上、副标题贴近、4 个图标的微光泡泡引出动作——观众眼睛从左下角出发、沿箭头滑到右上角终点,正好踩中「对角线视线流」。理想:封面 / 步骤页 / 路线图 默认用对角线构图(标题左上 + 终点元素右上 + 关键元素沿隐含斜线分布),比居中平铺有方向感和动势;只有仪式页 / 颁奖页 / 中式对称页才用居中堆叠,稳但容易呆。'
  },
  'text-margin': {
    before: 'images/beforeafter/text-margin-before.webp',
    after: 'images/beforeafter/text-margin-after.webp',
    caption: '同一主题「温馨提示」+ 3 条提醒(保管物品 / 环境卫生 / 遵守规定)。改前黑粗「温馨提示」4 个大字直接顶到文本框黑边框、副标题小字也几乎贴边,字和边框之间几乎没有空气,加上字号又大,整块「黑压压」一片,信息没地方呼吸,看着压迫,还显得没设计感;改后米黄底 + 棕色细线圆角大框 + 标题「温馨提示」字号缩小、两边加了放射状小装饰、上下用细线和圆点把标题和正文分开,3 条提醒的字号缩小、缩进对齐,文字和边框之间留出明显空白(12-24pt),整页空气感立现。理想:任何带边框的文本框(标注 / 引用 / 卡片 / 重点框)都该把「内部边距」调大——右键文本框→设置形状格式→文本选项→「内部边距」,默认通常 0,改成 0.1–0.3 cm(约 7-21pt)立刻透气;别用回车/空格硬挤,改边距才整齐可控、复制时也不易错位。'
  },
  'para-spacing': {
    before: 'images/beforeafter/para-spacing-before.webp',
    after: 'images/beforeafter/para-spacing-after.webp',
    caption: '同一主题「会议纪要」+ 4 个板块(会议概况 / 主要讨论 / 决议事项 / 后续行动)各 1-2 段。改前 8 行文字从头到尾贴在一起,段和段之间没有空白,读者分不清哪里是上段结尾、哪里是下段开始,眼睛必须靠段落首字手动判断,信息塞得满满当当但抓不住重点;改后大标题居中 + 蓝色短横线压住 + 4 个圆点编号(01/02/03/04)+ 粗体小标题 + 各自两行短描述,每个板块之间留出明显空行(段后 12-18pt),整页节奏感(「重-轻-重-轻」)立现,读者一眼能扫到 4 个板块各自讲啥。理想:正文 / 会议纪要 / 制度说明 / 议程 里有 3 段以上,必须调「段前/段后间距」(开始→段落→段间距),一般段后 6-12pt、段前 0-6pt,全局统一、复制不乱、字号变大也不爆框——比狂敲回车稳得多(回车产生的空行会跟着字体缩放,字号从 14 改到 18 时空行会突然大很多)。它和「行距」是 2 个维度,行距调段内呼吸、段间距调段间呼吸,分开调。'
  },
  'autofit': {
    before: 'images/beforeafter/autofit-before.webp',
    after: 'images/beforeafter/autofit-after.webp',
    caption: '同一主题「项目简介」+ 一段 4 行长描述。改前 4 行长文字塞在同一个文本框里,字号大、行距紧,文字明显溢出文本框底边——最后「社会价值」三个字被裁掉只剩「社会价」,文本框右下还会出红色溢出警告小三角,排版上像没做完;改后把长段拆成 3 行精炼短句,文字完整显示在框内(「行业数字化转型,实现长期价值增长与社会效益的双重提升」),背景换成浅蓝波纹+留白,文本框带左侧蓝色细条点缀——既没溢出,又显设计。理想:文字超过 3 行就容易溢出——这时有两种解法:1)「自动调整」勾选「不自动调整」(避免缩到看不清)+ 手动改字号/删字;2) 拆成两段或两框,留出呼吸感。文本框「自动调整」三种模式要会用:「溢出时缩字」(默认,字多时缩字号塞进框,长文会小到看不清)、「不自动调整」(会出红三角警告,适合设计稿固定字号)、「只按形状换行」(只扩高度不缩字号,适合长引文)。区别于「手动拉文本框大小」,自动适配是智能响应内容。'
  },
  'smartart-to-shape': {
    before: 'images/beforeafter/smartart-to-shape-before.webp',
    after: 'images/beforeafter/smartart-to-shape-after.webp',
    caption: '同一主题「团队结构」+ 3 级层次(总监 / 2 组长 / 4 组员)。改前用 PPT 自带「组织结构图」SmartArt,默认蓝色渐变矩形 + 黑色硬直连接线,8 个框加 7 条线全是「Word/Excel 默认商务蓝」,看着像 2010 年的政府汇报模板,没品牌色、没图标、没呼吸感;改后选中整个 SmartArt → 「转换为形状」→ 拆成 8 个独立可编辑对象,每个框换成白色填充 + 蓝色细描边 + 圆角 8pt,左侧加浅蓝圆形头像图标(总监 / 组长 / 组员三档),连接线从黑色硬线换成浅灰细虚线(弱化不抢戏),整体立刻从「默认模板」升级到「品牌定制图示」。理想:公司组织架构 / 项目分工 / 汇报关系 / 业务层级 默认走 SmartArt(3 秒出图、文字自动对齐),但客户提案 / 品牌发布 / 重要汇报 一定「转形状」改造——具体操作:选中 SmartArt → 右键 → 转换为形状(或「设计」→「转换」)→ 全选散件 → 统一改填充/描边/圆角/字号 → 给关键节点加图标/头像 → 弱化连接线(细+灰+虚线)→ 错位排版做设计感。SmartArt 适合「快」、自定义形状适合「精」。'
  },
};
