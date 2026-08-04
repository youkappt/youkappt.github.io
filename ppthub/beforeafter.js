/* ============================================================
   PPThub — 改前 vs 改后 真实生图对照
   每个术语若已有真实生成的 PPT 单页对比图，登记在此。
   before / after 必须文案一致、效果不同。
   路径相对于 ppthub/ 根目录（与 index.html 同目录）。
   ============================================================ */

const BEFORE_AFTER = {
  alignment: {
    before: 'images/beforeafter/alignment-before.png',
    after: 'images/beforeafter/alignment-after.png',
    caption: '同一页内容：标题「2024 年度运营复盘」+ 三段要点。改前每个元素各对齐各的，左边沿高低错落、对不齐；改后全部贴到同一条左边线上，整页整齐有秩序。'
  },
  hierarchy: {
    before: 'images/beforeafter/hierarchy-before.png',
    after: 'images/beforeafter/hierarchy-after.jpg',
    caption: '同一页内容：标题「增长策略」「三步走」+ 获客、留存、转化三个要点。改前所有文字都居中、字号一样大，看不出谁是重点；改后大标题在上、副标题做说明，三个要点用 01、02、03 编号带一句话解释，主次分明，一眼就能看懂。'
  },
  whitespace: {
    before: 'images/beforeafter/whitespace-before.jpg',
    after: 'images/beforeafter/whitespace-after.png',
    caption: '同一页内容：主张句「好设计，七分留白」+ 英文副标题 + 一行小字。改前把字放得老大、贴边塞满、背景还加了细碎纹理，看着又挤又乱；改后字收小、居中，四周留出大片空白，整页干净通透，重点一眼就看到。'
  },
  'tri-color': {
    before: 'images/beforeafter/tri-color-before.jpg',
    after: 'images/beforeafter/tri-color-after.jpg',
    caption: '同一页内容：标题「Q3 财报速览」+ 营收、利润、增长三块数据。改前每个标题一种颜色、下面红黄蓝三个大色块乱撞，特别花；改后用统一的商务深蓝当主色，关键数字用橙色点缀，整体干净、专业，重点也突出了。'
  },
  'chart-beauty': {
    before: 'images/beforeafter/chart-beauty-before.png',
    after: 'images/beforeafter/chart-beauty-after.png',
    caption: '同一页内容：标题「近 6 个月销售额」+ 1–6 月数据（120 / 145 / 138 / 170 / 162 / 195 万元）。改前是默认立体柱状图，蓝紫红渐变、边框厚重、网格线乱；改后去掉网格和立体效果，柱子改成圆角单色、每根柱顶加上清晰数据标签，整体清爽好读。'
  },
  'table-beauty': {
    before: 'images/beforeafter/table-beauty-before.png',
    after: 'images/beforeafter/table-beauty-after.jpg',
    caption: '同一页内容：标题「各部门 Q3 预算」+ 市场 80 万、研发 120 万、销售 95 万、行政 40 万。改前是默认表格，密密麻麻全是黑边框，行与行挤在一起；改后只保留上下细线、表头用深色、行与行之间拉开距离并加上斑马纹，预算数字还对齐，整体清爽专业。'
  },
  contrast: {
    before: 'images/beforeafter/contrast-before.png',
    after: 'images/beforeafter/contrast-after.png',
    caption: '同一页内容：小标题「核心结论」+ 大字「转化率提升 23%」+ 说明「本季度重点优化落地页」。改前所有字都一样大、一样灰，看不出重点；改后把「23%」放大、改成醒目的橙色，核心结论一眼就能抓住。'
  },
  'card-layout': {
    before: 'images/beforeafter/card-layout-before.jpg',
    after: 'images/beforeafter/card-layout-after.png',
    caption: '同一页内容：标题「服务优势」+ 响应快、定制强、数据稳、支持全四项。改前四项纯文字段落堆在一起，没有卡片分隔，看着累；改后每项装进圆角卡片，配上图标和一句说明，四列整整齐齐，扫一眼就能抓到重点。'
  },
  'font-pairing': {
    before: 'images/beforeafter/font-pairing-before.png',
    after: 'images/beforeafter/font-pairing-after.jpg',
    caption: '同一页内容：标题「年度设计趋势」+ 极简主义、动态图形、品牌色系统三段正文。改前标题和正文都用同一种宋体，标题没特点、正文像看书，整体老气；改后标题用粗黑体，正文用常规无衬线体，中英文字体搭配，像杂志一样有设计感。'
  },
  monochrome: {
    before: 'images/beforeafter/monochrome-before.jpg',
    after: 'images/beforeafter/monochrome-after.png',
    caption: '同一页内容：标题「销售漏斗分析」+ 访问 10000 / 注册 3500 / 付费 800 / 复购 240。改前四个数据卡片用红、黄、蓝、绿四种不搭调的颜色，像幼儿园展板；改后全部用同一蓝色的不同深浅，色调统一，数字层级清楚，看起来高级专业。'
  },
  margin: {
    before: 'images/beforeafter/margin-before.jpg',
    after: 'images/beforeafter/margin-after.png',
    caption: '同一页内容：标题「市场洞察」+ 目标用户年轻化、移动端占比超 70%、内容种草成决策关键。改前文字紧紧贴到页面四周边缘，像要溢出去，版面拥挤；改后四周留出充足页边距，内容被约束在中间，呼吸感好、稳重专业。'
  },
  'rule-of-thirds': {
    before: 'images/beforeafter/rule-of-thirds-before.png',
    after: 'images/beforeafter/rule-of-thirds-after.jpg',
    caption: '同一页内容：标题「旅行企划」+ 风景照片 + 口号「出发，就现在」。改前标题、照片、口号全部挤在页面正中央，上下空着中间挤，呆板没张力；改后照片放到左侧约三分之二，标题和口号分别放在右侧上下三分位，构图平衡、有呼吸感。'
  },
  repetition: {
    before: 'images/beforeafter/repetition-before.jpg',
    after: 'images/beforeafter/repetition-after.jpg',
    caption: '同一主题：标题「用户增长五步法」+ 拉新、激活、留存、变现、推荐五个步骤。改前五个步骤的序号形状、颜色、标题色各不相同，像五个不同模板拼在一起；改后用一样的圆角卡片、一样的白色圆圈序号、一样的标题样式重复排列，视觉语言统一，节奏感和专业感都出来了。'
  },
  proximity: {
    before: 'images/beforeafter/proximity-before.png',
    after: 'images/beforeafter/proximity-after.png',
    caption: '同一页内容：标题「产品运营三件事」+ 用户画像、渠道投放、活动策划、数据分析、用户反馈、版本迭代六个模块。改前六个模块散在页面上，看不出谁跟谁一伙；改后把相关的三个三个靠在一起、用虚线框归成两组，信息分组清楚、一眼就能看懂。'
  },
  grid: {
    before: 'images/beforeafter/grid-before.jpg',
    after: 'images/beforeafter/grid-after.png',
    caption: '同一页内容：标题「团队架构」+ 产品组、设计组、研发组、运营组四个模块。改前四个模块位置高低错落、大小不统一，像随手摆的；改后按 2×2 栅格整齐排列，横竖都对齐，版面稳定有秩序。'
  },
  'font-weight': {
    before: 'images/beforeafter/font-weight-before.png',
    after: 'images/beforeafter/font-weight-after.png',
    caption: '同一主题：标题「项目里程碑」+ 立项、设计、开发、上线四个阶段。改前所有文字都是细字重，标题和说明糊成一团、看不出层级；改后阶段标题加粗、日期和说明用常规字重，信息主次分明。'
  },
  tracking: {
    before: 'images/beforeafter/tracking-before.png',
    after: 'images/beforeafter/tracking-after.jpg',
    caption: '同一页内容：标题「品牌发布会」+ 副标题「2024 秋季新品」。改前标题字间距拉得特别开，五个字散得老远，副标题又挤在一起，看着别扭；改后字间距正常、标题与副标题比例协调，整体舒服耐看。'
  }
};
