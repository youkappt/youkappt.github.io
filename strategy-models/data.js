/* 战略模型画布 — 模型数据
 * 你只需替换文字内容；canvas.type 与坐标由 canvas-renderers.js 控制。
 * uses = 用途标签；school = porter | bcg | ge-mckinsey | innovation
 */
const MODELS = [
  {
    id: "porters-five-forces",
    name: "波特五力分析模型",
    school: "porter",
    schoolLabel: "波特系列",
    uses: ["竞争分析", "行业进入评估", "战略定位"],
    intro: "用五种竞争力量刻画行业利润空间与竞争格局，判断「这门生意好不好赚」。",
    scenario: "准备进入新行业、评估赛道吸引力，或复盘自身竞争地位时使用。",
    cases: [
      "某新茶饮品牌用五力判断下沉市场壁垒中等、替代品威胁高，决定差异化定价。",
      "SaaS 公司用五力识别「客户议价能力」过强，转向锁定大客户年框。"
    ],
    canvas: {
      type: "porters-five-forces",
      defaults: {
        center: "现有竞争者（同业厮杀强度）",
        supplier: "供应商议价能力",
        buyer: "购买方议价能力",
        newcomer: "新进入者威胁",
        substitute: "替代品威胁"
      }
    }
  },
  {
    id: "porters-value-chain",
    name: "波特价值链分析模型",
    school: "porter",
    schoolLabel: "波特系列",
    uses: ["成本优化", "竞争优势", "流程诊断"],
    intro: "把企业活动拆成基本活动与支持活动，找出真正创造价值的环节。",
    scenario: "做成本结构优化、寻找差异化发力点、诊断流程短板时使用。",
    cases: [
      "制造企业用价值链发现「进货后勤」成本占比畸高，重构供应商网络降本 12%。",
      "互联网公司把「技术开发」列为支持活动核心，集中建设中台。"
    ],
    canvas: {
      type: "porters-value-chain",
      defaults: {
        p1: "进料后勤", p2: "生产运营", p3: "发货后勤", p4: "市场营销", p5: "服务",
        s1: "企业基础设施", s2: "人力资源", s3: "技术开发", s4: "采购",
        margin: "利润空间"
      }
    }
  },
  {
    id: "porters-diamond",
    name: "波特钻石理论模型",
    school: "porter",
    schoolLabel: "波特系列",
    uses: ["国家竞争优势", "产业集群", "区位选择"],
    intro: "用四个核心要素加机会与政府，解释一国某产业为何具备国际竞争力。",
    scenario: "分析产业集群成因、评估出海区位、制定产业政策时使用。",
    cases: [
      "分析意大利奢侈品集群：相关产业+需求条件+企业战略形成正向循环。",
      "某新能源企业用钻石模型评估东南亚建厂的可行性。"
    ],
    canvas: {
      type: "porters-diamond",
      defaults: {
        factor: "生产要素",
        demand: "需求条件",
        related: "相关及支持性产业",
        strategy: "企业战略 / 结构 / 竞争",
        chance: "机会",
        government: "政府"
      }
    }
  },
  {
    id: "bcg-matrix",
    name: "波士顿矩阵",
    school: "bcg",
    schoolLabel: "BCG 系列",
    uses: ["业务组合", "资源分配", "投资组合"],
    intro: "用市场增长率与相对份额把业务分成明星、金牛、问题、瘦狗四类。",
    scenario: "做多业务组合管理、决定资源倾斜与取舍时使用。",
    cases: [
      "集团用 BCG 矩阵把现金流从「金牛」抽向「明星」，维持增长。",
      "某产品线落入「瘦狗」象限，决策逐步退出。"
    ],
    canvas: {
      type: "bcg-matrix",
      defaults: {
        q1: "明星（高增长·高份额）",
        q2: "问题（高增长·低份额）",
        q3: "金牛（低增长·高份额）",
        q4: "瘦狗（低增长·低份额）",
        axisX: "相对市场份额 →（左高右低）",
        axisY: "市场增长率 ↑（上高下低）",
        note: "圆圈大小 = 业务规模"
      }
    }
  },
  {
    id: "bcg-experience-curve",
    name: "波士顿经验曲线",
    school: "bcg",
    schoolLabel: "BCG 系列",
    uses: ["成本预测", "规模效应", "定价策略"],
    intro: "累计产量每翻一倍，单位成本按固定比例下降——规模即成本优势。",
    scenario: "做成本预测、制定低价抢占份额策略、评估学习效应时使用。",
    cases: [
      "半导体厂用经验曲线判断再扩产一代，单位成本可降约 20%。",
      "新进入者用曲线说明「先亏后盈」的规模逻辑。"
    ],
    canvas: {
      type: "bcg-experience-curve",
      defaults: {
        title: "波士顿经验曲线",
        xlabel: "累计产量（对数）",
        ylabel: "单位成本",
        note1: "学习效应",
        note2: "规模效应"
      }
    }
  },
  {
    id: "ansoff-matrix",
    name: "安索夫矩阵",
    school: "ge-mckinsey",
    schoolLabel: "通用电气·麦肯锡",
    uses: ["增长战略", "市场扩张", "产品规划"],
    intro: "用「产品 × 市场」四象限，给出市场渗透、开发、产品开发与多元化的增长路径。",
    scenario: "制定增长战略、选择扩张方向、评估新业务风险时使用。",
    cases: [
      "成熟品牌用「市场开发」把产品卖向海外，开辟第二曲线。",
      "公司用「多元化」进入相邻赛道，但被提示风险最高。"
    ],
    canvas: {
      type: "ansoff-matrix",
      defaults: {
        q1: "市场渗透\n（现有产品·现有市场）",
        q2: "产品开发\n（新产品·现有市场）",
        q3: "市场开发\n（现有产品·新市场）",
        q4: "多元化\n（新产品·新市场）",
        axisX: "产品：现有 → 新",
        axisY: "市场：现有 → 新"
      }
    }
  },
  {
    id: "dupont",
    name: "杜邦分析法",
    school: "ge-mckinsey",
    schoolLabel: "通用电气·麦肯锡",
    uses: ["财务分析", "ROE 拆解", "盈利诊断"],
    intro: "把 ROE 拆成净利率、资产周转率、权益乘数，定位赚钱能力来源。",
    scenario: "做 ROE 归因分析、对比同行盈利质量、诊断财务杠杆时使用。",
    cases: [
      "零售企业 ROE 高靠周转率，制造业靠净利率，金融靠权益乘数。",
      "分析师用杜邦拆解发现某公司 ROE 靠加杠杆，盈利质量存疑。"
    ],
    canvas: {
      type: "dupont",
      defaults: {
        roe: "ROE 净资产收益率",
        n1: "净利率", n2: "资产周转率", n3: "权益乘数",
        sub1: "净利润 ÷ 营收", sub2: "营收 ÷ 总资产", sub3: "总资产 ÷ 净资产"
      }
    }
  },
  {
    id: "benchmarking",
    name: "标杆分析法",
    school: "ge-mckinsey",
    schoolLabel: "通用电气·麦肯锡",
    uses: ["对标管理", "差距分析", "持续改进"],
    intro: "向行业最佳对标，找差距、定方案、持续迭代，把「别人为什么好」变成自己的流程。",
    scenario: "做流程优化、设定绩效目标、推动持续改进时使用。",
    cases: [
      "客服团队对标头部企业，把首次解决率从 70% 提到 88%。",
      "工厂用标杆分析重排产线，单位工时下降 15%。"
    ],
    canvas: {
      type: "benchmarking",
      defaults: {
        s1: "确定标杆对象", s2: "收集数据", s3: "分析差距", s4: "制定方案", s5: "实施改进",
        note: "持续迭代 ↻"
      }
    }
  },
  {
    id: "drucker-7-sources",
    name: "德鲁克七种革新来源",
    school: "innovation",
    schoolLabel: "创新与变革",
    uses: ["创新机会", "机会识别", "产品构思"],
    intro: "德鲁克归纳的七个系统性创新机会来源，帮你在不确定中找「该创新什么」。",
    scenario: "做创新选题、机会扫描、产品构思工作坊时使用。",
    cases: [
      "团队用七来源清单扫描，发现「人口变化」带来银发产品机会。",
      "创业者从「不协调」出发，重构了传统服务的交付方式。"
    ],
    canvas: {
      type: "drucker-7-sources",
      defaults: {
        title: "德鲁克：七种革新来源",
        src1: "意外之事", src2: "不协调", src3: "流程需要", src4: "产业与市场结构",
        src5: "人口变化", src6: "认知变化", src7: "新知识"
      }
    }
  }
];

if (typeof window !== "undefined") window.MODELS = MODELS;
if (typeof module !== "undefined") { module.exports = { MODELS }; }
