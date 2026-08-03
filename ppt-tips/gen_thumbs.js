// 开发用：用 Playwright 把每个技巧的 before/after 视觉渲染成 PNG 截图
// 产物 = ppt-tips/thumbs/<id>_before.png / <id>_after.png（2x 高清，960x540）
// 卡片缩略与详情大图统一引用这些截图，彻底解决「HTML 缩放错位 / 只显示一角」问题。
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'thumbs');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.resolve(__dirname, 'capture.html'));
  await page.waitForSelector('.ba-slide');
  // 等所有图片（真实科技照片）加载完再截图，避免蒙版/渐变项背景空白
  await page.evaluate(() => Promise.all(
    Array.from(document.images).map(img =>
      img.complete ? Promise.resolve() :
      new Promise(res => {
        img.addEventListener('load', res, { once: true });
        img.addEventListener('error', res, { once: true });
      })
    )
  )).catch(() => {});
  await page.waitForTimeout(300);
  const ids = await page.evaluate(() => TECHNIQUES.map(t => t.id));
  let n = 0;
  for (const id of ids) {
    for (const kind of ['before', 'after']) {
      const el = await page.$('#cap_' + id + '_' + kind);
      if (!el) { console.error('MISSING', id, kind); continue; }
      await el.screenshot({ path: path.join(OUT, id + '_' + kind + '.png') });
      n++;
    }
  }
  await browser.close();
  console.log('OK 生成 ' + n + ' 张截图（' + ids.length + ' 个技巧 × 2）');
})().catch(e => { console.error(e); process.exit(1); });
