#!/usr/bin/env node
/**
 * ppthub demo 运行时自检（jsdom 真实执行）
 * 依赖: jsdom（需在 node 模块路径可解析；本项目用 WorkBuddy 托管 node 工作区的 jsdom）
 * 用法（示例，含 NODE_PATH 指向托管 workspace）:
 *   NODE_PATH=/Users/youka/.workbuddy/binaries/node/workspace/node_modules \
 *     node ppthub/tests/demo_runtime_test.js
 *
 * 做什么:
 *   - 用 jsdom 起真实 DOM（window.eval 同 <script> 上下文，最贴近浏览器）
 *   - 逐个调用 DEMOS[key](container)，再模拟点击每个 data-m/data-g/data-a/data-op/data-c 按钮
 *   - 抓运行时报错 / 空渲染 / 未定义函数调用
 *
 * 关键实现细节（踩坑记录）:
 *   - 每个 demo 调用前必须清空 document.body，否则多个同名 id（#stage/#s/#efStage…）
 *     在 body 累积会触发 jsdom querySelector 怪癖（返回 null）→ 误报。真实站点
 *     每个 demo 渲染进独立 #demoBody 且打开新术语重建容器，重复 id 从不共存，故不影响。
 *   - 用 window.eval 而非 vm.runInContext：跨上下文时 innerHTML 解析/querySelector 行为异常。
 * 退出码 0=通过 1=失败
 */
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  pretendToBeVisual: true,
  runScripts: 'outside-only'
});
const { window } = dom;
const document = window.document;
window.requestAnimationFrame = cb => setTimeout(cb, 0);

try {
  window.eval(read('demos.js'));
} catch (e) {
  console.log('FATAL: 脚本加载报错 ->', e.message);
  process.exit(2);
}

const DEMOS = window.DEMOS;
if (!DEMOS) { console.log('FATAL: window.DEMOS 未定义'); process.exit(2); }

const ATTRS = ['data-m', 'data-g', 'data-a', 'data-op', 'data-c'];
let total = 0, errors = 0;
const report = [];

for (const key of Object.keys(DEMOS)) {
  total++;
  document.body.innerHTML = '';               // 隔离：避免重复 id 累积
  const container = document.createElement('div');
  document.body.appendChild(container);
  try {
    DEMOS[key](container);
  } catch (e) {
    errors++; report.push(`[THROW] ${key}: 主体 -> ${e.message}`); continue;
  }
  if (!container.innerHTML || container.innerHTML.trim().length < 3) {
    errors++; report.push(`[EMPTY] ${key}: 主体未渲染`); continue;
  }
  const btns = Array.from(container.querySelectorAll(ATTRS.map(a => `[${a}]`).join(',')));
  for (const btn of btns) {
    const attr = ATTRS.find(a => btn.hasAttribute(a));
    const mode = btn.getAttribute(attr);
    const handler = btn.onclick;
    if (typeof handler !== 'function') {
      try { btn.dispatchEvent(new window.Event('click')); }
      catch (e) { errors++; report.push(`[CLICK-ERR] ${key} (${attr}=${mode}): ${e.message}`); }
      continue;
    }
    try { handler.call(btn, { target: btn }); }
    catch (e) { errors++; report.push(`[CLICK-ERR] ${key} (${attr}=${mode}): ${e.message}`); continue; }
    if (!container.innerHTML || container.innerHTML.trim().length < 3) {
      errors++; report.push(`[BLANK] ${key} (${attr}=${mode}): 点击后内容变空`);
    }
  }
}

console.log(`=== Demo 运行时测试 (jsdom) ===`);
console.log(`demo 总数: ${total} | 出错: ${errors}`);
if (report.length) { console.log('\n--- 问题清单 ---'); report.forEach(r => console.log(r)); }
else console.log('\nALL DEMOS OK（主体渲染 + 所有交互按钮点击均无报错、非空）✅');
process.exit(errors ? 1 : 0);
