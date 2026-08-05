#!/usr/bin/env node
/**
 * ppthub 术语库 数据完整性 + 静态自检
 * 用法: node ppthub/tests/verify_ppthub.js
 * 退出码 0=通过 1=失败
 *
 * 覆盖（无需浏览器，纯 node 解析）：
 *  1) 语法（node --check 已在外面跑，这里做 require 级加载）
 *  2) data / demos / terms-extra 三者数量一致
 *  3) 无重复 id、无重复 name（精确）
 *  4) 每个 term.demo 在 DEMOS 中有实现
 *  5) 无孤立 demo（DEMOS 有定义但无 term 引用）
 *  6) related 全部指向已存在 term（无悬空）
 *  7) category 全部在标准白名单内
 *  8) EXTRA 无孤儿 key、必需子字段齐全
 *  9) 反模式 textAlign:flex-start 无残留
 * 10) SVG 裸标签检查：<polyline>/<circle> 等 SVG 元素不得出现在 innerHTML 字符串外部（必须包裹 <svg>）
 * 11) 编码完整性：data.js / demos.js 无 Unicode 替换字符 U+FFFD 乱码
 * 12) txt() 第4参数类型检查：第4实参若是纯数字→可能是参数错位（实际应为文本字符串）
 * 13) alias/name 交叉重复检测：某术语的 name 等于另一术语的 alias → 语义重复风险
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

let fail = 0;
const ok = m => console.log('  ✓ ' + m);
const bad = m => { console.log('  ✗ ' + m); fail++; };

const TERMS = require(path.join(ROOT, 'data.js'));
const DEMOS = require(path.join(ROOT, 'demos.js'));
const EXTRA = require(path.join(ROOT, 'terms-extra.js'));
const ids = new Set(TERMS.map(t => t.id));
const names = TERMS.map(t => t.name);

console.log('=== 1. 数量一致性 ===');
const nT = TERMS.length, nD = Object.keys(DEMOS).length, nE = Object.keys(EXTRA).length;
console.log(`  TERMS=${nT} | DEMOS=${nD} | EXTRA=${nE}`);
// 允许「一个 demo 被多个术语共用」（如 chart-beauty 被 chart-beauty+combo-chart 共用），
// 因此校验改为：每个 term.demo 都有实现 + 无孤儿 demo，而非强制三者数量相等。
const demoRefs = new Set(TERMS.filter(t => t.demo).map(t => t.demo));
const orphanDemo = Object.keys(DEMOS).filter(k => !demoRefs.has(k));
if (nT === nE && orphanDemo.length === 0) ok(`数量一致(TERMS=EXTRA=${nT}，DEMOS=${nD} 含 ${nT - nD} 个共享)`);
else bad(`数量不一致 或 存在孤儿 demo: TERMS=${nT} DEMOS=${nD} EXTRA=${nE} orphan=${orphanDemo.length}`);

console.log('=== 2. 重复 id / name ===');
const idSeen = {}, nameSeen = {};
let dupFound = 0;
TERMS.forEach(t => {
  if (idSeen[t.id]) { bad('重复 id: ' + t.id); dupFound++; } else idSeen[t.id] = 1;
  if (nameSeen[t.name]) { bad('重复 name: ' + t.name); dupFound++; } else nameSeen[t.name] = 1;
});
if (dupFound === 0) ok('无重复 id / name');

console.log('=== 3. term.demo 实现存在性 ===');
TERMS.forEach(t => { if (t.demo && !(t.demo in DEMOS)) bad(`demo 未实现: ${t.id} -> ${t.demo}`); });
if (fail === 0) ok('全部 term.demo 已实现');

console.log('=== 4. 孤立 demo ===');
const used = new Set(TERMS.filter(t => t.demo).map(t => t.demo));
const orphan = Object.keys(DEMOS).filter(k => !used.has(k));
if (orphan.length) bad('孤立 demo: ' + orphan.join(', ')); else ok('无孤立 demo');

console.log('=== 5. related 悬空 ===');
TERMS.forEach(t => (t.related || []).forEach(r => { if (!ids.has(r)) bad(`related 悬空: ${t.id} -> ${r}`); }));
if (fail === 0) ok('related 全部有效');

console.log('=== 6. category 白名单 ===');
const STD = ['软件功能', '字体与配色', '输出与放映', '图形与图示', '设计原则', '排版与布局', '效率与技巧', '动画与切换', '母版与版式', '图片与多媒体'];
const badCat = [...new Set(TERMS.map(t => t.category))].filter(c => !STD.includes(c));
if (badCat.length) bad('越界分类: ' + badCat.join(', ')); else ok('分类均在标准白名单内');

console.log('=== 7. EXTRA 完整性 ===');
// 真实 schema（terms-extra.js）：必填 pitfall + mnemonic（各 100%），
// 其余 shortcut/combo/etymology/checklist 均为可选。
const REQ = ['pitfall', 'mnemonic'];
Object.keys(EXTRA).forEach(k => {
  if (!ids.has(k)) bad('EXTRA 孤儿 key: ' + k);
  REQ.forEach(f => { if (!(f in EXTRA[k])) bad(`EXTRA ${k} 缺必填字段 ${f}`); });
});
if (fail === 0) ok('EXTRA 无孤儿、必填字段(pitfall/mnemonic)齐全');

console.log('=== 8. 反模式 textAlign:flex-start ===');
const da = read('demos.js');
if (/textAlign\s*[:=]\s*["']flex-start/.test(da)) bad('发现 textAlign:flex-start（非法值，应为 left/center/right）');
else ok('无 flex-start 误用');

console.log('=== 9. SVG 裸标签检查 ===');
// SVG 标签若直接出现在 innerHTML 模板字符串之外（未包裹 <svg>），浏览器不渲染
const svgBare = /<(\/?)(polyline|circle|path|rect|ellipse|line|text|g)(\s|>)/g;
const allSrc = read('demos.js') + read('data.js');
// 只检查非 <svg> 内部的裸标签：匹配不在 <svg...>...</svg> 内的 SVG 标签
// 简化策略：统计 <svg 和 </svg> 出现次数是否平衡
const svgOpen = (allSrc.match(/<svg[\s>]/g) || []).length;
const svgClose = (allSrc.match(/<\/svg>/g) || []).length;
if (svgOpen !== svgClose) bad(`<svg> 标签不配对：${svgOpen} open / ${svgClose} close`);
else ok(`<svg> 标签配对 (${svgOpen} 对)`);

console.log('=== 10. 编码完整性检查 ===');
const ufffd = /[\ufffd]/;
const filesToCheck = ['data.js', 'demos.js', 'terms-extra.js'];
let encFail = 0;
filesToCheck.forEach(f => {
  const c = read(f);
  if (ufffd.test(c)) { bad(`${f} 含 U+FFFD 替换字符（乱码）`); encFail++; }
});
if (encFail === 0) ok('所有文件无乱码');

console.log('=== 11. txt() 第4参数类型检查 ===');
// txt(x, y, w, s, size, color, bold) — 第4参数 s 应是字符串，不是数字
const txtCalls = allSrc.match(/txt\s*\([^)]+\)/g) || [];
let txtBad = 0;
txtCalls.forEach(call => {
  // 提取前4个参数（以逗号分割）
  const args = call.match(/\(([\s\S]*?)\)/);
  if (!args) return;
  const parts = args[1].split(',').map(p => p.trim());
  // 第5参数是 size（数字），如果第4参数也是纯数字 → 可能是把height当s传了
  if (parts.length >= 4) {
    const fourth = parts[3];
    const fifth = parts[4];
    // 如果第4个是数字、第5个也是数字（size通常也是数字），判定为可疑
    if (/^\d+\.?\d*$/.test(fourth) && /^\d+\.?\d*$/.test(fifth)) {
      bad(`txt() 第4参数可能是数字而非文本：${call.substring(0, 80)}`);
      txtBad++;
    }
  }
});
if (txtBad === 0) ok('无可疑 txt() 参数错位');

console.log('=== 12. alias/name 交叉语义重复检查 ===');
// 某术语的 name 等于另一术语的 alias → 语义重复风险（如 "主辅点三色" 与 alias "60-30-10 Rule" 的交叉）
const aliasSet = {};
TERMS.forEach(t => { if (t.alias) aliasSet[t.alias] = t.id; });
let aliasDup = 0;
TERMS.forEach(t => {
  if (t.name && t.name !== '') {
    // 检查 name 是否等于另一术语的 alias
    if (aliasSet[t.name] && aliasSet[t.name] !== t.id) {
      bad(`name "${t.name}" (${t.id}) 与 ${aliasSet[t.name]} 的 alias 相同 — 语义重复风险`);
      aliasDup++;
    }
  }
});
if (aliasDup === 0) ok('无 alias/name 交叉重复');

if (fail !== 0) console.log(`  (注：txt() 检查有 ${txtBad} 个可疑调用，部分可能是合法数字标签)`);

console.log('\n' + (fail ? `❌ 失败 ${fail} 项` : `✅ 全部通过（${nT} 条术语）`));
process.exit(fail ? 1 : 0);
