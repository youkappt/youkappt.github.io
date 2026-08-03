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
    caption: '同一页内容：主张句「好设计，七分留白」+ 英文副标题 + 一行小字。改前把字放得老大、贴边塞满、还加了底纹，看着又挤又乱；改后字收小、居中，四周留出大片空白，整页干净通透，重点一眼就看到。'
  },
  'tri-color': {
    before: 'images/beforeafter/tri-color-before.jpg',
    after: 'images/beforeafter/tri-color-after.jpg',
    caption: '同一页内容：标题「Q3 财报速览」+ 营收、利润、增长三块数据。改前每个标题一种颜色、下面红黄蓝三个大色块乱撞，特别花；改后用统一的商务深蓝当主色，关键数字用橙色点缀，整体干净、专业，重点也突出了。'
  },
  'chart-beauty': {
    before: 'images/beforeafter/chart-beauty-before.jpg',
    after: 'images/beforeafter/chart-beauty-after.jpg',
    caption: '同一页内容：标题「近 6 个月销售额」+ 1–6 月数据（120 / 145 / 138 / 170 / 162 / 195 万元）。改前是默认 Excel 风格，3D 立体、蓝红渐变、边框厚重、网格线乱；改后去掉网格和立体效果，柱子改成圆角单色、每根柱顶加上清晰数据标签，整体清爽好读。'
  }
};
