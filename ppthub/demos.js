/* ============================================================
   PPThub — Custom per-term demos
   DEMOS[id](container)   populates the demo-mount element.
   Each demo is bespoke to its term. Styles are inline to keep
   the design system file lean.
   ============================================================ */

/* 真实中文 PPT 案例库 —— 各「动手试试」demo 从这里取真实内容，完整页 demo 按术语稳定分配，避免反复撞文案。
   字段：title 主标题 / subtitle 副标题 / part 章节号 / partName 章节名 / points 要点 / tw 两栏对比 / body 正文 / footer 页脚 / kicker Logo 字 / img 呼应文案的真实图片（CC 免费可商用） */
const CASES = [
  { title:'2025 年度复盘', subtitle:'增长 · 反思 · 重启', part:'01', partName:'回顾这一年',
    points:['营收 +38%，连续三年增长','AI 助手上线，人效提升 2×','交付周期仍偏长，需优化','明年试点出海，打开新市场'],
    tw:{ a:'今年', b:'去年', aPts:['营收 ▲38%','新客 +12k','复购 46%'], bPts:['营收 ▲21%','新客 +7k','复购 39%'] },
    body:'一年里我们做对了三件事：押注 AI、守住复购、把交付做厚；也留下一个遗憾——周期还是偏长。',
    footer:'优卡说PPT · 内部复盘', kicker:'YOUKA', img:'case1-review.jpg' },
  { title:'星河 Pro 发布会', subtitle:'重新定义便携生产力', part:'02', partName:'产品登场',
    points:['13.3″ 全感屏，仅 1.1kg','本地大模型，离线可用','32h 续航，咖啡时间充一半','¥6,999 起，9 月开售'],
    tw:{ a:'星河 Pro', b:'上一代', aPts:['1.1kg 轻盈','32h 续航','本地 AI'], bPts:['1.4kg','18h 续航','云端 AI'] },
    body:'一台 1.1kg 的笔记本，装下了本地大模型、32 小时续航和一块全感屏。它想回答一个问题：生产力一定要笨重吗？',
    footer:'优卡说PPT · 新品发布', kicker:'YOUKA', img:'case2-launch.jpg' },
  { title:'《被讨厌的勇气》', subtitle:'课题分离，获得自由', part:'03', partName:'今天读什么',
    points:['一切烦恼来自人际关系','课题分离：谁承担后果谁负责','共同体感觉是幸福的起点','勇气，是被讨厌的自由'],
    tw:{ a:'我的触动', b:'从前', aPts:['不再讨好所有人','专注自己能改的'], bPts:['怕得罪同事','替别人扛责任'] },
    body:'阿德勒说，一切烦恼都来自人际关系。而自由，是需要勇气的——尤其是被讨厌的勇气。',
    footer:'优卡说PPT · 读书分享', kicker:'YOUKA', img:'case3-book.jpg' },
  { title:'智慧园区一期启动', subtitle:'目标 · 节奏 · 分工', part:'04', partName:'正式开工',
    points:['目标：6 月底交付门禁+能耗','三阶段：设计→开发→试运行','团队：产品/研发/实施 9 人','风险：旧系统数据迁移'],
    tw:{ a:'本阶段', b:'下一阶段', aPts:['门禁接入','能耗看板'], bPts:['安防联动','移动端'] },
    body:'门禁和能耗看板要在六月底交付。九个人、三个阶段，最不确定的，是旧系统那批数据能不能顺利迁过来。',
    footer:'优卡说PPT · 项目启动', kicker:'YOUKA', img:'case4-park.jpg' },
  { title:'Q3 团建方案', subtitle:'山海之间，重新充电', part:'05', partName:'准备出发',
    points:['莫干山民宿 · 2 天 1 晚','徒步 + 篝火 + 复盘','人均 ¥680，公司承担','本周五前报名接龙'],
    tw:{ a:'Day 1', b:'Day 2', aPts:['下午抵达','溪边徒步','篝火夜话'], bPts:['晨间瑜伽','复盘工作坊','返程'] },
    body:'两天一夜，莫干山。不聊 KPI，只聊山风和篝火。人均 680，公司买单，周五前接龙。',
    footer:'优卡说PPT · 团队建设', kicker:'YOUKA', img:'case5-team.jpg' },
  { title:'配色训练营招募', subtitle:'21 天，告别脏配色', part:'06', partName:'招募中',
    points:['7 大配色体系拆解','12 个真实改稿案例','社群打卡 + 1v1 点评','限时 ¥199，老学员 ¥99'],
    tw:{ a:'训练营', b:'自学', aPts:['系统体系','有人点评'], bPts:['东拼西凑','无人反馈'] },
    body:'21 天，把"凭感觉配色"换成"有体系配色"。七套配色逻辑加十二个真实改稿，社群打卡，我亲自点评。',
    footer:'优卡说PPT · 课程招募', kicker:'YOUKA', img:'case6-color.jpg' },
  { title:'春季新品渠道会', subtitle:'用三款新品打开华东样板市场', part:'07', partName:'渠道策略',
    points:['首批铺货 180 家门店','核心陈列位覆盖率 72%','导购话术统一到 3 句话','月底复盘试销数据'],
    tw:{ a:'首发门店', b:'普通门店', aPts:['主推套装陈列','导购激励 +15%','周报追踪'], bPts:['常规陈列','无专项激励','月末汇总'] },
    body:'这不是一次单纯上新，而是一次渠道验证。先用 180 家门店跑通陈列、话术和激励，再把成功样板复制到华东全区。',
    footer:'优卡说PPT · 渠道会议', kicker:'YOUKA', img:'case2-launch.jpg' },
  { title:'城市夜跑报名页', subtitle:'把夜色、路线和安全感讲清楚', part:'08', partName:'活动招募',
    points:['5km 轻量路线，沿河闭环','配速员 12 名，全程陪跑','补给点 3 处，含医疗志愿者','报名截止：8 月 18 日'],
    tw:{ a:'参赛者收益', b:'组织保障', aPts:['夜景路线','完赛奖牌','运动社交'], bPts:['路线报备','医疗点位','志愿者引导'] },
    body:'夜跑页面最重要的不是热闹，而是让人敢报名。路线、补给、医疗、集合点全部讲明白，转化率才会上来。',
    footer:'优卡说PPT · 活动招募', kicker:'RUN', img:'case5-team.jpg' },
  { title:'海盐咖啡新品简报', subtitle:'夏季限定，从第一口记住品牌', part:'09', partName:'新品主张',
    points:['主推海盐拿铁与柚香美式','试饮转化目标 28%','门店物料 6 月 5 日到店','短视频统一拍摄脚本'],
    tw:{ a:'海盐拿铁', b:'柚香美式', aPts:['奶香厚','微咸尾调','适合下午茶'], bPts:['清爽低糖','果香明显','适合午后'] },
    body:'新品要被记住，需要一个清晰口味钩子。海盐负责记忆点，柚香负责清爽感，两条线分别打不同消费场景。',
    footer:'优卡说PPT · 新品简报', kicker:'CAFE', img:'case6-color.jpg' },
  { title:'儿童编程暑期营', subtitle:'从游戏兴趣到计算思维', part:'10', partName:'课程设计',
    points:['5 天完成一个互动小游戏','每天 30 分钟成果展示','家长可收到学习观察表','早鸟价 1299，限 24 人'],
    tw:{ a:'课堂里', b:'带回家', aPts:['图形化编程','任务闯关','老师点评'], bPts:['作品链接','学习报告','延伸练习'] },
    body:'暑期营不是把孩子关进电脑教室，而是让他们用游戏理解逻辑。每天都有可展示的小作品，家长也看得见成长。',
    footer:'优卡说PPT · 课程方案', kicker:'CODE', img:'case3-book.jpg' },
  { title:'社区旧改沟通会', subtitle:'三栋楼、四类问题、一次说清', part:'11', partName:'居民沟通',
    points:['电梯加装方案二选一','外立面维修预计 45 天','临时停车位调整到西门','意见收集截止本周日'],
    tw:{ a:'居民关切', b:'项目回应', aPts:['噪音时间','停车影响','费用分摊'], bPts:['限定施工时段','临停指引','公开预算'] },
    body:'旧改沟通会要少讲口号，多讲影响。把时间表、费用、临停和噪音边界讲清楚，居民才愿意继续讨论。',
    footer:'优卡说PPT · 社区沟通', kicker:'CITY', img:'case4-park.jpg' },
  { title:'门诊质效周报', subtitle:'把等待时间压到可感知范围内', part:'12', partName:'本周观察',
    points:['平均候诊 27 分钟，下降 18%','复诊预约率提升到 61%','高峰窗口增派 2 名导诊','检验报告推送仍需优化'],
    tw:{ a:'本周', b:'上周', aPts:['候诊 27min','预约率 61%','投诉 4 起'], bPts:['候诊 33min','预约率 54%','投诉 7 起'] },
    body:'门诊体验改善能不能被感知，关键看等待时间。导诊增派后高峰拥堵缓解，但检验报告推送还需要继续提速。',
    footer:'优卡说PPT · 医疗质效', kicker:'CARE', img:'case1-review.jpg' },
  { title:'供应链降本专项', subtitle:'从采购、仓储到运输逐项拆解', part:'13', partName:'成本拆分',
    points:['年度目标降本 8.5%','集中采购覆盖 12 个品类','仓储周转天数压到 19 天','干线运输改为阶梯报价'],
    tw:{ a:'降本抓手', b:'风险控制', aPts:['合并采购','库存周转','路线重排'], bPts:['质量抽检','安全库存','异常预警'] },
    body:'降本不能只压价格。采购合并、库存周转和运输报价三件事一起做，才不会把成本问题转成质量问题。',
    footer:'优卡说PPT · 运营专项', kicker:'OPS', img:'case4-park.jpg' },
  { title:'会员增长复盘', subtitle:'一次社群活动带来的复购变化', part:'14', partName:'增长结果',
    points:['新增会员 8,420 人','7 日复购率 18.6%','社群优惠券核销 43%','下次需优化首单引导'],
    tw:{ a:'活动期', b:'日常期', aPts:['新增 8420','复购 18.6%','核销 43%'], bPts:['新增 2900','复购 11.2%','核销 24%'] },
    body:'这次增长不是靠一次性折扣堆出来的，社群答疑和首购套餐贡献最大。下一轮重点优化首单后的复购路径。',
    footer:'优卡说PPT · 增长复盘', kicker:'CRM', img:'case1-review.jpg' },
  { title:'ESG 行动报告', subtitle:'把承诺落到能源、材料与社区', part:'15', partName:'年度行动',
    points:['工厂绿电占比提升到 36%','包装减塑 18.4 吨','员工志愿服务 1260 小时','供应商审计覆盖 82%'],
    tw:{ a:'环境', b:'社会', aPts:['绿电提升','包装减塑','污水监测'], bPts:['志愿服务','安全培训','供应商审计'] },
    body:'ESG 页面不需要堆概念，重点是让行动可核验。能源、包装、志愿服务和供应商审计，都要给出具体数字。',
    footer:'优卡说PPT · ESG 报告', kicker:'ESG', img:'case4-park.jpg' },
  { title:'高校社团纳新', subtitle:'让新生第一眼知道能得到什么', part:'16', partName:'招新介绍',
    points:['三大方向：运营 / 设计 / 摄影','每月一次真实项目实战','学长学姐一对一带队','报名面试本周六开始'],
    tw:{ a:'加入后', b:'旁听者', aPts:['参与项目','作品集积累','伙伴网络'], bPts:['只看活动','缺少反馈','难沉淀'] },
    body:'纳新页要回答新生最关心的问题：我加入后能学到什么、做出什么、认识谁。福利要具体，门槛要清楚。',
    footer:'优卡说PPT · 社团纳新', kicker:'CLUB', img:'case5-team.jpg' },
  { title:'民宿淡季运营方案', subtitle:'用主题套餐拉回周末入住率', part:'17', partName:'淡季破局',
    points:['周末入住率目标 78%','推出围炉茶与徒步套餐','小红书种草 20 篇笔记','老客二晚连住立减 120'],
    tw:{ a:'淡季套餐', b:'常规售卖', aPts:['主题明确','二晚优惠','内容传播'], bPts:['只降房价','缺少话题','复购弱'] },
    body:'淡季不是单纯降价，而是补上来店理由。围炉茶、徒步路线和老客连住优惠，组合成可传播的周末方案。',
    footer:'优卡说PPT · 文旅运营', kicker:'STAY', img:'case5-team.jpg' },
  { title:'AI 客服上线汇报', subtitle:'先接住高频问题，再进入业务闭环', part:'18', partName:'上线范围',
    points:['覆盖售后 63 个高频问法','首轮命中率 81.7%','人工转接平均缩短 46 秒','灰度门店扩到 30 家'],
    tw:{ a:'AI 接待', b:'人工接待', aPts:['秒级响应','统一口径','可追踪'], bPts:['排队等待','经验差异','记录分散'] },
    body:'AI 客服第一阶段不追求全能，而是先把高频售后问题接稳。命中率和转人工体验，是本期最重要的两个指标。',
    footer:'优卡说PPT · AI 项目', kicker:'AI', img:'case2-launch.jpg' },
  { title:'人才梯队建设计划', subtitle:'把关键岗位从“有人顶”变成“有人接”', part:'19', partName:'组织计划',
    points:['识别 23 个关键岗位','建立 2 级后备人才池','季度轮岗覆盖 18 人','导师制从 8 月试运行'],
    tw:{ a:'现在', b:'目标', aPts:['岗位依赖强','培养靠临时','轮岗少'], bPts:['梯队清晰','导师制','季度复盘'] },
    body:'人才梯队不是名单管理，而是把关键岗位的接班路径设计出来。识别岗位、匹配导师、安排轮岗，三件事缺一不可。',
    footer:'优卡说PPT · 组织发展', kicker:'HR', img:'case1-review.jpg' },
  { title:'直播电商月报', subtitle:'从单场爆发转向稳定复购', part:'20', partName:'月度表现',
    points:['GMV 326 万，环比 +22%','爆品贡献 41% 销售额','老客复购率 17.8%','退货率下降到 9.4%'],
    tw:{ a:'本月', b:'上月', aPts:['GMV 326万','复购 17.8%','退货 9.4%'], bPts:['GMV 267万','复购 12.1%','退货 13.2%'] },
    body:'这个月的好消息不是 GMV 冲高，而是复购和退货同时变好。下一步要把爆品话术沉淀成可复制脚本。',
    footer:'优卡说PPT · 电商月报', kicker:'LIVE', img:'case1-review.jpg' },
  { title:'品牌视觉升级提案', subtitle:'让年轻化不只停留在口号里', part:'21', partName:'视觉方向',
    points:['保留品牌绿，提高明度','辅助色加入湖蓝与珊瑚橙','图标统一线性圆角风格','门店物料分三批替换'],
    tw:{ a:'新版视觉', b:'旧版视觉', aPts:['明亮轻盈','图标统一','传播模板化'], bPts:['偏厚重','元素混杂','物料不统一'] },
    body:'年轻化不是把颜色调亮一点，而是让品牌色、字体、图标和物料形成一套稳定系统。提案重点放在可落地替换。',
    footer:'优卡说PPT · 品牌提案', kicker:'VI', img:'case6-color.jpg' },
  { title:'工厂安全培训', subtitle:'把事故预防讲到每个岗位动作里', part:'22', partName:'安全要点',
    points:['叉车通道新增 14 处标识','高温设备复检周期缩短到 7 天','新员工必须完成 3 项演练','异常上报 10 分钟内响应'],
    tw:{ a:'规范动作', b:'高风险动作', aPts:['走人行线','先断电','双人复核'], bPts:['跨越通道','带电清洁','单人吊装'] },
    body:'安全培训不能只念制度，要把风险翻译成岗位动作。哪些动作能做、哪些动作禁止，必须在一页里讲清楚。',
    footer:'优卡说PPT · 安全培训', kicker:'SAFE', img:'case4-park.jpg' },
  { title:'社区公益市集招商', subtitle:'让摊主看到人流、主题和回报', part:'23', partName:'招商说明',
    points:['预计日均人流 3200+','摊位费 199 元 / 天','亲子手作与轻食优先','提供统一收银二维码'],
    tw:{ a:'摊主获得', b:'主办支持', aPts:['稳定人流','主题曝光','低成本试卖'], bPts:['统一宣传','摊位物料','收银支持'] },
    body:'招商页要替摊主算账：有没有人、卖什么、成本多少、主办方给什么支持。信息越具体，报名越快。',
    footer:'优卡说PPT · 公益市集', kicker:'FAIR', img:'case5-team.jpg' },
  { title:'读书会年度计划', subtitle:'12 本书，围绕成长与表达', part:'24', partName:'年度书单',
    points:['每月共读一本核心书','季度举办一次开放分享','成员轮流做 15 分钟导读','沉淀 48 篇阅读卡片'],
    tw:{ a:'共读机制', b:'个人阅读', aPts:['固定节奏','观点碰撞','输出倒逼'], bPts:['容易中断','反馈少','难沉淀'] },
    body:'读书会的价值不只是读完，而是稳定输出。每月一本书、每季一次开放分享，让阅读变成持续交流。',
    footer:'优卡说PPT · 读书会', kicker:'BOOK', img:'case3-book.jpg' },
  { title:'客户成功案例汇报', subtitle:'从上线交付到业务指标改善', part:'25', partName:'案例复盘',
    points:['客户上线周期缩短 35%','关键报表使用率 89%','续约意向评分 9.2 / 10','沉淀行业模板 6 套'],
    tw:{ a:'上线后', b:'上线前', aPts:['报表自动化','决策更快','续约意向高'], bPts:['手工汇总','跨部门等待','指标分散'] },
    body:'好案例要讲业务变化，而不只是功能上线。周期缩短、使用率提升、续约意向明确，才是客户成功的证据。',
    footer:'优卡说PPT · 客户成功', kicker:'CS', img:'case2-launch.jpg' },
  { title:'城市文旅周末路线', subtitle:'两天一夜，把老街和山海串起来', part:'26', partName:'路线设计',
    points:['Day 1 老街漫游 + 夜市','Day 2 海边骑行 + 博物馆','人均预算 580 元','适合亲子与情侣客群'],
    tw:{ a:'文化体验', b:'自然体验', aPts:['老街导览','非遗手作','夜市小吃'], bPts:['海边骑行','山路轻徒步','日落观景'] },
    body:'路线页要让人脑中出现一天的节奏。先用老街和夜市建立氛围，再用海边骑行和博物馆完成第二天记忆点。',
    footer:'优卡说PPT · 文旅方案', kicker:'TRIP', img:'case5-team.jpg' },
  { title:'零售门店陈列改造', subtitle:'把动线从“逛一圈”变成“带一件”', part:'27', partName:'陈列调整',
    points:['入口 3 米设置新品岛台','爆品与搭配品相邻陈列','试用区增加镜前灯光','收银台放置小件加购'],
    tw:{ a:'改造后', b:'改造前', aPts:['动线清晰','连带销售','试用停留'], bPts:['货架分散','搭配缺失','试用偏暗'] },
    body:'陈列改造不是移动货架，而是重新安排顾客的视线和动作。入口吸引、路径连带、收银加购，形成完整转化链。',
    footer:'优卡说PPT · 门店改造', kicker:'STORE', img:'case6-color.jpg' },
  { title:'新员工入职指南', subtitle:'第一周该见谁、学什么、交付什么', part:'28', partName:'入职流程',
    points:['Day 1 完成系统权限开通','Day 3 跟岗一次客户会议','Day 5 提交角色理解卡','导师每天下班前反馈'],
    tw:{ a:'有指南', b:'无指南', aPts:['节奏清楚','少问重复问题','反馈及时'], bPts:['靠口头转述','信息遗漏','融入慢'] },
    body:'入职指南不是欢迎词，而是让新人知道第一周如何开始工作。权限、跟岗、交付物和导师反馈都要写清楚。',
    footer:'优卡说PPT · 入职培训', kicker:'ONBOARD', img:'case3-book.jpg' },
  { title:'跨境独立站增长', subtitle:'从投放拉新到邮件复购闭环', part:'29', partName:'增长路径',
    points:['广告 ROAS 稳定在 2.4','弃购邮件挽回率 11.6%','首页加载速度降到 1.9s','复购邮件分 3 类人群'],
    tw:{ a:'增长动作', b:'优化目标', aPts:['落地页提速','弃购召回','人群分层'], bPts:['ROAS 提升','订单回收','复购增长'] },
    body:'独立站增长不能只看广告账户。页面速度、弃购召回和邮件分层共同决定利润，投放只是入口。',
    footer:'优卡说PPT · 跨境增长', kicker:'DTC', img:'case2-launch.jpg' },
  { title:'SaaS 产品路线图', subtitle:'三个版本，把协作体验补齐', part:'30', partName:'Roadmap',
    points:['V2.4 上线评论与审批流','V2.5 支持跨项目模板','V2.6 增加权限审计日志','核心目标：降低协作成本'],
    tw:{ a:'近期版本', b:'远期版本', aPts:['评论审批','模板复用','移动提醒'], bPts:['权限审计','开放 API','自动化规则'] },
    body:'路线图页要避免堆功能名，应该解释每个版本解决什么协作问题。评论、模板、权限，分别对应沟通、复用和治理。',
    footer:'优卡说PPT · 产品规划', kicker:'SaaS', img:'case2-launch.jpg' },
  { title:'家庭教育公开课', subtitle:'让沟通从“讲道理”变成“听得见”', part:'31', partName:'课程预告',
    points:['90 分钟线上直播','拆解 4 类亲子冲突场景','提供家庭对话练习表','报名后可回看 7 天'],
    tw:{ a:'课堂收获', b:'常见困扰', aPts:['看见情绪','提问方法','练习模板'], bPts:['说教无效','容易争吵','难坚持'] },
    body:'公开课页面不需要制造焦虑，而是给家长一个可执行入口。用四类真实场景，讲清楚怎么听、怎么问、怎么回应。',
    footer:'优卡说PPT · 公开课', kicker:'FAMILY', img:'case3-book.jpg' },
  { title:'科研项目中期检查', subtitle:'进展、问题与下一阶段计划', part:'32', partName:'中期汇报',
    points:['完成样本采集 68%','初步模型准确率 84.3%','论文框架已形成 4 章','设备排期影响实验进度'],
    tw:{ a:'已完成', b:'待推进', aPts:['样本采集','模型初测','文献整理'], bPts:['补充实验','算法对照','论文写作'] },
    body:'中期检查页要把进度和风险讲成同一张地图。已经完成什么、卡在哪里、下一步如何补救，评审最关心这些。',
    footer:'优卡说PPT · 科研汇报', kicker:'LAB', img:'case1-review.jpg' },
  { title:'活动赞助回报方案', subtitle:'让品牌看到曝光、互动与线索', part:'33', partName:'权益设计',
    points:['主视觉露出覆盖 12 个触点','现场互动预计 800 人次','品牌专区可收集销售线索','赞助档位 3 万起'],
    tw:{ a:'品牌权益', b:'活动资源', aPts:['视觉露出','展位互动','线索回收'], bPts:['社媒传播','现场人流','主持口播'] },
    body:'赞助方案要把权益讲成可衡量结果。曝光触点、互动人数和线索收集方式越清楚，品牌越容易做决定。',
    footer:'优卡说PPT · 商务合作', kicker:'SPONSOR', img:'case5-team.jpg' },
  { title:'财务预算说明会', subtitle:'把钱花在增长、效率和风险缓冲上', part:'34', partName:'预算分配',
    points:['全年预算 1260 万','增长项目占比 42%','IT 自动化投入增加 18%','预留风险缓冲 90 万'],
    tw:{ a:'新增投入', b:'压缩支出', aPts:['增长项目','自动化工具','客户成功'], bPts:['线下差旅','低效广告','重复采购'] },
    body:'预算说明页不能只列数字，要解释取舍。哪些投入服务增长，哪些支出被压缩，风险缓冲为什么需要保留。',
    footer:'优卡说PPT · 财务会议', kicker:'FIN', img:'case1-review.jpg' },
  { title:'瑜伽馆私教转化方案', subtitle:'从体验课到 12 节课包', part:'35', partName:'转化路径',
    points:['体验课后 24 小时内回访','体态评估报告自动生成','私教包设置 3 个阶梯价','老会员转介绍奖励 200 元'],
    tw:{ a:'私教路径', b:'普通办卡', aPts:['体态评估','目标计划','周期复盘'], bPts:['自由约课','反馈零散','坚持难'] },
    body:'私教转化不是强推课包，而是让会员看到具体改善路径。评估报告、目标计划和周期复盘，是成交的关键。',
    footer:'优卡说PPT · 门店增长', kicker:'YOGA', img:'case5-team.jpg' },
  { title:'内容栏目改版提案', subtitle:'从日更压力转向系列化资产', part:'36', partName:'栏目结构',
    points:['保留 3 个高转化栏目','新增「案例拆解」系列','每周固定 2 篇深度内容','月底复盘收藏与转发率'],
    tw:{ a:'新版栏目', b:'旧版栏目', aPts:['系列化','可复用','指标清楚'], bPts:['临时选题','风格漂移','复盘少'] },
    body:'内容改版的重点不是换封面，而是建立可持续栏目。系列化选题能降低生产成本，也更容易沉淀为资产。',
    footer:'优卡说PPT · 内容运营', kicker:'MEDIA', img:'case6-color.jpg' },
  { title:'物流时效优化', subtitle:'把次日达从承诺变成可稳定交付', part:'37', partName:'履约优化',
    points:['华东仓截单延后到 18:30','干线班车增加夜间一班','异常包裹 2 小时内预警','次日达达成率提升到 93%'],
    tw:{ a:'优化后', b:'优化前', aPts:['截单更晚','夜班补位','异常预警'], bPts:['波峰拥堵','补位不足','反馈滞后'] },
    body:'时效优化要找准履约链路里的断点。截单、干线和异常预警同步调整，才可能让次日达稳定下来。',
    footer:'优卡说PPT · 物流运营', kicker:'SHIP', img:'case4-park.jpg' },
  { title:'校园招聘宣讲', subtitle:'把岗位、成长和真实工作讲清楚', part:'38', partName:'校招信息',
    points:['开放 6 类岗位，共 48 个 HC','提供 18 个月轮岗计划','现场安排校友员工分享','网申截止 9 月 28 日'],
    tw:{ a:'加入后', b:'你会看到', aPts:['导师带教','轮岗计划','项目实战'], bPts:['岗位要求','成长路径','团队氛围'] },
    body:'校招宣讲最忌只讲公司多大。学生想知道自己会做什么、跟谁学、怎么成长，页面应该围绕这些问题展开。',
    footer:'优卡说PPT · 校园招聘', kicker:'HIRE', img:'case3-book.jpg' },
  { title:'餐饮品牌开店计划', subtitle:'首店验证后复制到社区商圈', part:'39', partName:'开店模型',
    points:['首店面积控制在 90 平米','早餐与晚餐双高峰模型','单店回本周期目标 14 个月','二店选址锁定社区入口'],
    tw:{ a:'首店目标', b:'复制条件', aPts:['验证菜单','跑通排班','测算坪效'], bPts:['供应稳定','模型盈利','选址清晰'] },
    body:'开店计划不是愿景页，而是一组经营假设。面积、菜单、排班、坪效和回本周期都要能被验证。',
    footer:'优卡说PPT · 开店计划', kicker:'FOOD', img:'case6-color.jpg' },
  { title:'App 留存实验报告', subtitle:'用三组实验验证新手引导', part:'40', partName:'实验结果',
    points:['D1 留存提升 6.8 个百分点','任务式引导完成率 74%','跳过按钮降低流失 12%','下一轮测试个性化推荐'],
    tw:{ a:'实验组', b:'对照组', aPts:['任务引导','可跳过','即时奖励'], bPts:['长教程','不可跳过','奖励滞后'] },
    body:'留存实验页要讲清变量，而不只是展示结果。新手引导、跳过机制和即时奖励分别贡献了不同改善。',
    footer:'优卡说PPT · 产品实验', kicker:'APP', img:'case2-launch.jpg' },
  { title:'博物馆特展策划', subtitle:'让观众沿一条故事线走完展厅', part:'41', partName:'策展结构',
    points:['展线分 4 个时间章节','核心展品 32 件','互动装置设置在第二展厅','亲子导览册同步上线'],
    tw:{ a:'观众路径', b:'内容资源', aPts:['序厅引入','章节递进','互动停留'], bPts:['核心展品','影像资料','导览文本'] },
    body:'特展页面要先建立故事线，再讲展品数量。观众不是看清单，而是沿着时间和空间完成一次体验。',
    footer:'优卡说PPT · 展览策划', kicker:'EXPO', img:'case3-book.jpg' },
  { title:'物业服务升级', subtitle:'把报修、巡检和反馈做成闭环', part:'42', partName:'服务改进',
    points:['线上报修覆盖 86% 住户','平均响应时间缩短到 19 分钟','公共区巡检每日 3 次','业主满意度目标 92%'],
    tw:{ a:'升级后', b:'升级前', aPts:['线上报修','进度可查','闭环评价'], bPts:['电话登记','反馈慢','记录分散'] },
    body:'物业服务升级要让业主感觉到变化。报修入口、处理进度和满意度回访，都需要在同一套流程里闭环。',
    footer:'优卡说PPT · 服务升级', kicker:'HOME', img:'case4-park.jpg' },
  { id:'brand-vi', title:'品牌 VI 升级提案', subtitle:'三章封面共用一套版式，节奏瞬间统一', part:'43', partName:'章节封面',
    points:['01 品牌诊断：现状与问题','02 视觉规范：色板与字体','03 应用落地：物料与场景'],
    tw:{ a:'统一模板', b:'各自为政', aPts:['同色同版式','节奏统一','专业连贯'], bPts:['三套风格','无节奏','像三份 deck'] },
    body:'重复不是单调，而是让章节封面套用同一套配色与排版模板，观众一眼就知道「新的一章开始了」，整份演示节奏统一。',
    footer:'优卡说PPT · 重复原则', kicker:'BRAND', img:'case4-park.jpg' },
  { id:'brand-annual', title:'城市绿洲品牌年报', subtitle:'一套字型系统，撑起气质与数据', part:'44', partName:'字体系统',
    points:['品牌金句用衬线，显文化气质','数据与标签用无衬线，显利落','标题/正文统一配对，不随机混搭'],
    tw:{ a:'统一配对', b:'随机混搭', aPts:['标题衬线','数据无衬线','全篇统一'], bPts:['标题无衬线','数据衬线','每处随机'] },
    body:'同一页里，金句与标题用衬线体撑气质，数据与标签用无衬线体保利落，并贯穿全篇，观众一眼读出版调统一。',
    footer:'优卡说PPT · 字体系统', kicker:'TYPE', img:'case3-book.jpg',
    mods:[['12 座','新建公园'],['38万','年客流'],['96%','满意度']] },
  { id:'align-launch', title:'年度战略发布会主视觉', subtitle:'所有元素左对齐到同一条参考线', part:'45', partName:'对齐原则',
    points:['主标题：2026 增长战略','副标题：以产品力驱动第二曲线','三个支撑论点左对齐','行动按钮：立即预约席位'],
    body:'一页里标题、副标题、正文与按钮都落到同一条左参考线，整页立刻「贵」起来、有秩序感。',
    footer:'优卡说PPT · 对齐原则', kicker:'ALIGN', img:'case2-launch.jpg' },
  { id:'prox-white', title:'产品白皮书内页', subtitle:'相关信息靠拢成组，板块间留出大空白', part:'46', partName:'亲密性',
    points:['模块一：核心问题','模块二：解决方案','模块三：落地路径','每组内部紧凑、组间留白'],
    body:'把相关信息靠拢成一组、组与组之间拉开距离，读者一眼就知道谁和谁是一伙的。',
    footer:'优卡说PPT · 亲密性', kicker:'GROUP', img:'case3-book.jpg' },
  { id:'cont-fund', title:'融资数据汇报页', subtitle:'全场小字里，只让一个关键数字跳出来', part:'47', partName:'对比原则',
    points:['本轮估值 ¥8.6 亿','环比 +120%','12 家机构跟投','资金主要用于研发'],
    body:'对比让重点浮现：全场小字里只把一个关键数字放大加亮，其余内容自动退到第二层。',
    footer:'优卡说PPT · 对比原则', kicker:'FUND', img:'case6-color.jpg',
    mods:[['¥8.6亿','本轮估值'],['+120%','环比增长'],['12 家','跟投机构']] },
  { id:'hier-retro', title:'项目复盘首页', subtitle:'先抛结论大标题，再放支撑小字', part:'48', partName:'信息层级',
    points:['结论：项目超额达成目标','背景：三个月攻坚','动作：三步走策略','结果：ROI 提升 2.3 倍'],
    body:'层级让阅读有先后：先给结论大标题抓住注意力，再用小字支撑，3 秒读懂你想说的。',
    footer:'优卡说PPT · 信息层级', kicker:'REVIEW', img:'case1-review.jpg' },
  { id:'ws-poster', title:'品牌主张海报页', subtitle:'一页一句话＋一张图，四周大量留白', part:'49', partName:'留白',
    points:['主张：让城市会呼吸','一句金句撑起整页','大面积负空间','底部小字版信息'],
    body:'留白是高级感的来源：一页只放一句话和一张图，四周大量空白，质感立刻拉满。',
    footer:'优卡说PPT · 留白', kicker:'POSTER', img:'case4-park.jpg' },
  { id:'focus-kpi', title:'季度业绩看板', subtitle:'把目标数字高亮，其余图表调灰', part:'50', partName:'视觉焦点',
    points:['核心指标：新增 38 万','辅助：留存 / 转化 / 活跃','其余图表降饱和','视线只锁一个目标'],
    body:'焦点让视线有归属：讲数据亮点时把其他图表调灰，只留目标数字高亮发光。',
    footer:'优卡说PPT · 视觉焦点', kicker:'KPI', img:'case5-team.jpg',
    mods:[['38万','新增用户'],['6.8%','转化率'],['92%','留存率']] },
  { id:'grid-matrix', title:'功能矩阵页', subtitle:'多卡片统一 3 列栅格，间距宽度一致', part:'51', partName:'栅格系统',
    points:['6 项能力均匀分布','列宽一致','间距相等','对齐到栅格线'],
    body:'栅格让多卡片不歪：并排卡片统一 3 列、等宽等距，全站一致，专业且不乱。',
    footer:'优卡说PPT · 栅格系统', kicker:'GRID', img:'case2-launch.jpg' },
  { id:'gold-cover', title:'封面主视觉', subtitle:'主图占 0.618，文字占 0.382', part:'52', partName:'黄金分割',
    points:['主视觉占 61.8%','标题区占 38.2%','非五五开','构图更耐看'],
    body:'黄金分割让版面舒服：左图右文按 0.618 / 0.382 划分，比五五开更耐看。',
    footer:'优卡说PPT · 黄金分割', kicker:'GOLD', img:'case6-color.jpg' },
  { id:'rot-portrait', title:'人物专访封面', subtitle:'人物偏到右侧交点，左侧留文字', part:'53', partName:'三分法',
    points:['人物落右三分线','视线留白在左','非死板居中','构图更活'],
    body:'三分法让主体不呆：人物偏到右侧交点、左侧留文字，构图立刻活起来。',
    footer:'优卡说PPT · 三分法', kicker:'THIRD', img:'case5-team.jpg' },
  { id:'fp-news', title:'新闻简报头版', subtitle:'标题置顶、关键结论靠左上，顺 F 阅读', part:'54', partName:'F 型阅读',
    points:['通栏标题置顶','导语靠左上','要点逐条左对齐','右侧配图收尾'],
    body:'F 型阅读让信息顺眼：标题置顶、关键结论靠左上，视线自然沿 F 路径被读到。',
    footer:'优卡说PPT · F 型阅读', kicker:'NEWS', img:'case1-review.jpg' },
  { id:'less-slide', title:'产品核心卖点页', subtitle:'一页只讲一件事，反而让人记住', part:'55', partName:'减法设计',
    points:['核心卖点：静音降噪 38dB','一页只放一个数字','去掉装饰与次要说明','观众 3 秒记住一件事'],
    body:'减法设计不是少放内容，而是删掉可有可无的装饰，让每一页聚焦一个核心信息。',
    footer:'优卡说PPT · 减法设计', kicker:'LESS', img:'case1-review.jpg' },
  { id:'brand-guidebook', title:'企业品牌手册页', subtitle:'标题、Logo、页脚统一规范', part:'56', partName:'品牌规范',
    points:['Logo 固定左上角','标题统一左对齐 1.2cm','页脚统一企业色','跨页像同一家公司出品'],
    body:'品牌规范让全篇标题、Logo、页脚统一，观众一眼认出这是同一家公司的专业出品。',
    footer:'优卡说PPT · 品牌规范', kicker:'VI', img:'case2-launch.jpg' },
  { id:'flow-report', title:'市场调研洞察页', subtitle:'结论置顶，论据沿视线流排布', part:'57', partName:'视觉流',
    points:['大结论置顶','论据按编号路径下沉','箭头引导阅读顺序','视线自然从核心到细节'],
    body:'视觉流安排视线路径：先给结论，再用编号与箭头引导论据，观众顺着读不迷路。',
    footer:'优卡说PPT · 视觉流', kicker:'FLOW', img:'case3-book.jpg' },
  { id:'density-brief', title:'城市数据简报页', subtitle:'高密度信息也要分组留白', part:'58', partName:'信息密度',
    points:['6 组城市指标','每组独立卡片','组间留白呼吸','重点数字高亮'],
    body:'信息密度不是塞满，而是该密处密、该疏处疏，用分组和留白控制阅读节奏。',
    footer:'优卡说PPT · 信息密度', kicker:'DATA', img:'case4-park.jpg' },
  { id:'consistent-deck', title:'产品功能介绍页', subtitle:'图标、色彩、圆角全篇统一', part:'59', partName:'视觉一致性',
    points:['4 项核心能力','统一线性图标','统一品牌绿色','统一圆角与间距'],
    body:'视觉一致性让同类元素用同一套视觉语法，页面立刻从拼凑变专业。',
    footer:'优卡说PPT · 视觉一致性', kicker:'SAME', img:'case5-team.jpg' },
  { id:'fill-cover', title:'品牌发布会封面', subtitle:'一句话 + 大面积留白，显高级', part:'60', partName:'版面率',
    points:['核心主张一句金句','大面积负空间','底部小字副标','低版面率显高级'],
    body:'版面率低时，页面只放一句话和大量留白，质感立刻拉满；过满则喘不过气。',
    footer:'优卡说PPT · 版面率', kicker:'COVER', img:'case6-color.jpg' },
  { id:'gestalt-list', title:'产品能力矩阵', subtitle:'6 项能力按用户端/管理端自然成组', part:'61', partName:'格式塔原理',
    points:['用户端：推荐/发现/互动','管理端：分析/权限/协同','组内紧凑、组间大留白','组标题强化分组感知'],
    body:'格式塔相近律：相关元素靠得近、共享区域或颜色，观众自然归类；打散平均排列则无法识别结构。',
    footer:'优卡说PPT · 格式塔原理', kicker:'GROUP', img:'case1-review.jpg' },
  { id:'font-license', title:'餐饮品牌开店计划', subtitle:'正文用免费商用字体，零版权风险', part:'62', partName:'字体授权',
    points:['标题可用思源宋体（免费商用）','正文用思源黑体（免费商用）','装饰字用站酷快乐体（免费商用）','避免微软雅黑/方正等需授权字体'],
    body:'商用 PPT 必须确认字体授权：思源系列、站酷系列可免费商用；系统自带的微软雅黑、方正字体在公开传播中往往需要单独授权。',
    footer:'优卡说PPT · 字体授权', kicker:'FONT', img:'case6-color.jpg' },
  { id:'replace-font', title:'城市绿洲品牌年报', subtitle:'同一段内容，换字体气质全变', part:'63', partName:'字体选择',
    points:['标题：城市绿洲品牌年报','数据：12 座 / 38 万 / 96%','说明：年度回顾与展望'],
    body:'字体是气质的放大器：黑体现代利落、宋体典雅正式、楷体人文手写、等宽字体技术冷静。同一页内容，换字体会改变整页情绪。',
    footer:'优卡说PPT · 字体选择', kicker:'TYPE', img:'case3-book.jpg' },
  { id:'vertical-text', title:'供应链降本专项', subtitle:'竖排标题让国风/专项页更有仪式感', part:'64', partName:'竖排文字',
    points:['标题竖排从右至左','左侧配年份与落款','用于国风封面或专项启动页','横排适合现代商务场景'],
    body:'竖排文字保留传统阅读路径：从右至左、从上至下。在国风封面、专项启动页中使用，立刻拉开仪式感和文化气质。',
    footer:'优卡说PPT · 竖排文字', kicker:'VERT', img:'case5-team.jpg' },
  { id:'theme-palette', title:'产品白皮书内页', subtitle:'只改主题色，全篇 30 页自动换色', part:'65', partName:'主题色',
    points:['标题区统一主题色','数据标签随主题色变化','按钮与强调线同步','紫/青/橙三套一键切换'],
    body:'主题色板是 PPT 的调色中枢：改一格颜色，标题、图表、按钮和强调线会批量联动，比逐页改色快百倍，也避免串色。',
    footer:'优卡说PPT · 主题色', kicker:'THEME', img:'case4-park.jpg' },
  { id:'color-psychology', title:'产品白皮书内页', subtitle:'不同颜色传递不同情绪与行业感', part:'66', partName:'色彩心理学',
    points:['红色：促销/紧迫/热情','蓝色：金融/信任/专业','绿色：环保/自然/安全','黄色：提醒/活力/乐观'],
    body:'色彩不只是好看，更是在暗示情绪：金融汇报用深蓝建立信任，促销用红橙制造紧迫，环保主题用绿，提醒标签用黄。',
    footer:'优卡说PPT · 色彩心理学', kicker:'COLOR', img:'case4-park.jpg' },
];

const CASE_PAGE_DEMOS = {
  alignment: { term:'对齐', good:'参考线对齐', bad:'未对齐', kind:'alignment', hint:'边缘、标题、卡片同时落到同一组参考线。' },
  'smart-align': { term:'智能对齐 / 自动吸附', good:'自动吸附', bad:'自由摆放', kind:'alignment', hint:'标题、配图、重点卡片和页脚吸附到同一套参考线。' },
  proximity: { term:'亲密性', good:'分组靠拢', bad:'散开', kind:'proximity', hint:'相关信息靠近后，读者一眼知道它们属于同一组。' },
  contrast: { term:'对比', good:'关键信息高亮', bad:'无对比', kind:'contrast', hint:'只让最重要的信息跳出来，其他内容退到第二层。' },
  repetition: { term:'重复', good:'统一重复', bad:'各不相同', kind:'repetition', hint:'重复同一套卡片样式，让页面看起来像一个系统。' },
  hierarchy: { term:'视觉层级', good:'拉开层级', bad:'同级', kind:'hierarchy', hint:'标题、解释、要点的字号和粗细要有明确先后。' },
  whitespace: { term:'留白', good:'留白', bad:'塞满', kind:'whitespace', hint:'保留呼吸感，信息反而更容易被看见。' },
  focus: { term:'焦点引导', good:'只一处高亮', bad:'全强调', kind:'focus', hint:'一页只给一个主焦点，别让所有元素一起喊。' },
  grid: { term:'栅格系统', good:'栅格对齐', bad:'自由排', kind:'grid', hint:'用栅格控制标题、图片和卡片的位置。' },
  'less-is-more': { term:'减法设计', good:'做减法', bad:'堆装饰', kind:'less', hint:'删掉装饰和重复信息，只留下最能帮助表达的内容。' },
  'brand-vi': { term:'品牌规范 / VI', good:'统一 VI', bad:'随意混搭', kind:'brand', hint:'品牌色、Logo、圆角和页脚统一后，页面才像同一家公司做的。' },
  'visual-flow': { term:'视觉流', good:'顺着读', bad:'乱跳', kind:'flow', hint:'用方向、编号和线索安排视线的阅读路径。' },
  'info-density': { term:'信息密度', good:'压缩成摘要', bad:'信息过密', kind:'density', hint:'把密集文字拆成摘要卡片，保留重点而不是堆满。' },
  consistency: { term:'视觉一致性', good:'统一风格', bad:'风格混乱', kind:'consistency', hint:'同类元素保持同一套视觉语法，页面就稳。' },
  'fill-rate': { term:'版面率 / 图版率', good:'版面均衡', bad:'版面过满', kind:'fill', hint:'图、文字、留白按比例分配，避免满到喘不过气。' },
  gestalt: { term:'格式塔原理', good:'自动成组', bad:'各自为战', kind:'gestalt', hint:'相近、相似、连续的元素会被大脑自动看成一组。' },
  'golden-ratio': { term:'黄金比例', good:'黄金分割', bad:'五五开', kind:'golden', hint:'图文占比接近 1.618 时，画面更有自然重心。' },
  'rule-of-thirds': { term:'三分法', good:'三分交点', bad:'正中摆放', kind:'thirds', hint:'把主体放到三分线交点，画面更灵动。' },
  'f-pattern': { term:'F 型阅读', good:'F 型扫读', bad:'平均铺开', kind:'fpattern', hint:'标题横扫、左侧纵读，关键信息要放在这条路径上。' },
  'center-sym': { term:'中心对称', good:'居中对称', bad:'左右失衡', kind:'center', hint:'封面和章节页适合用中心轴制造稳定感。' },
  margin: { term:'页边距', good:'安全边距', bad:'贴边拥挤', kind:'margin', hint:'内容离边界留出安全距离，页面会更专业。' },
  column: { term:'栏宽', good:'双栏可读', bad:'长行难读', kind:'column', hint:'把长正文拆成适合阅读的栏宽。' },
  bleed: { term:'出血 / 满版', good:'满版出血', bad:'留白边框', kind:'bleed', hint:'需要气势时让图片铺满画布，再用蒙层承载文字。' },
  'card-layout': { term:'卡片式布局', good:'卡片式', bad:'纯文字列表', kind:'cards', hint:'把并列要点装进卡片，比较和扫读都更轻松。' },
  'full-image': { term:'全图型', good:'全图蒙层', bad:'文字裸压图', kind:'fullimage', hint:'全图型页面要有蒙层，否则标题容易被图片吃掉。' },
  'visual-balance': { term:'视觉平衡', good:'配平', bad:'失衡', kind:'balance', hint:'用文字块、图片块和色块互相配重。' },
  symmetry: { term:'对称 vs 非对称', good:'对称稳定', bad:'非对称活泼', kind:'symmetry', hint:'根据场景切换稳定或活泼的构图。' },
  'diagonal-flow': { term:'对角线 / 视线流', good:'对角线引导', bad:'水平堆放', kind:'diagonal', hint:'对角线能让发布会、招募页更有动势。' },
  'text-margin': { term:'文本框内部边距', good:'内边距舒适', bad:'贴边文字', kind:'textmargin', hint:'文字不要贴着框边，留内边距才像设计。' },
  'para-spacing': { term:'段前 / 段后间距', good:'段落分明', bad:'段落粘连', kind:'paragraph', hint:'段落之间留出节奏，读者才不会迷路。' },
  autofit: { term:'文本自动适配', good:'自动适配', bad:'文字溢出', kind:'autofit', hint:'自动缩放或换行，让最长文案也留在框内。' },
};

function demoHash(s) {
  s = String(s || '');
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickCaseForDemo(key) {
  const keys = Object.keys(CASE_PAGE_DEMOS);
  const idx = keys.indexOf(key);
  if (idx >= 0 && idx < CASES.length) return CASES[idx];
  const seed = key || (typeof window !== 'undefined' && window.__currentTermId) || 'case';
  return CASES[demoHash(seed) % CASES.length];
}

function demoEsc(s) {
  return String(s || '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

function demoClip(s, n) {
  s = String(s || '');
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

function demoWrap(s, n, lines) {
  s = demoClip(s, n * lines);
  const out = [];
  for (let i = 0; i < s.length; i += n) out.push(s.slice(i, i + n));
  return out;
}

function demoSvgLines(x, y, lines, size, color, weight, lh, anchor) {
  return lines.map((line, i) =>
    `<text x="${x}" y="${y + i * lh}" ${anchor ? `text-anchor="${anchor}"` : ''} font-size="${size}" fill="${color}" font-weight="${weight || 400}" font-family="Inter, PingFang SC, Microsoft YaHei, sans-serif">${demoEsc(line)}</text>`
  ).join('');
}

function demoPointCard(point, i, pos, good, cfg) {
  const fill = good ? '#ffffff' : ['#ffffff', '#f3eadf', '#ecf1f8'][i % 3];
  const stroke = good ? 'rgba(26,51,0,.14)' : ['#2f6f3a', '#cb5521', '#3a7bd5'][i % 3];
  const rx = good ? 13 : [4, 18, 8][i % 3];
  const w = pos.w || 210;
  const h = pos.h || 90;
  const titleColor = cfg.kind === 'contrast' && good && i === 0 ? '#ffffff' : '#1a3300';
  const cardFill = cfg.kind === 'contrast' && good && i === 0 ? '#cb5521' : fill;
  const no = cfg.kind === 'focus' && good && i > 0 ? 'opacity=".42"' : '';
  return `
    <g ${no}>
      <rect x="${pos.x}" y="${pos.y}" width="${w}" height="${h}" rx="${rx}" fill="${cardFill}" stroke="${stroke}" stroke-opacity="${good ? .45 : .8}" filter="url(#pageShadow)"/>
      <text x="${pos.x + 18}" y="${pos.y + 30}" font-size="17" fill="${cardFill === '#cb5521' ? '#fff' : '#2f6f3a'}" font-weight="700" font-family="JetBrains Mono, monospace">0${i + 1}</text>
      ${demoSvgLines(pos.x + 18, pos.y + 58, demoWrap(point, 9, 2), 17, titleColor, 700, 21)}
    </g>`;
}

function buildCasePageSvg(cs, cfg, mode) {
  const good = mode === 'good';
  const green = '#2f6f3a';
  const ink = '#1a3300';
  const orange = '#cb5521';
  const blue = '#3a7bd5';
  let bg = '#fbfcf7';
  let title = demoClip(cs.title, 16);
  let subtitle = demoClip(cs.subtitle, 23);
  let header = true;
  let image = { x: 585, y: 122, w: 295, h: 184 };
  let lead = { x: 78, y: 170, w: 440, h: 126 };
  let cards = [{ x: 78, y: 365 }, { x: 332, y: 365 }, { x: 586, y: 365 }];
  let guides = '';
  let extras = '';
  let leadText = demoWrap(cs.body, 23, 3);
  let points = cs.points.slice(0, 3);
  let showCards = true;
  let showImage = true;
  let leadFill = '#ffffff';
  let leadOpacity = .88;
  let titleSize = 34;
  let titleX = 78;
  let titleY = 72;
  let titleAnchor = '';
  let subtitleX = 78;
  let subtitleY = 104;
  let footerText = good ? `${cfg.term} · ${cfg.good}` : `${cfg.term} · ${cfg.bad}`;

  if (!good) {
    cards = [{ x: 66, y: 346 }, { x: 365, y: 395 }, { x: 560, y: 330 }];
    image = { x: 618, y: 96, w: 300, h: 182 };
    lead = { x: 105, y: 148, w: 420, h: 130 };
  }

  switch (cfg.kind) {
    case 'alignment':
      if (good) guides = '<line x1="78" y1="48" x2="78" y2="488" stroke="#cb5521" stroke-width="1.4" stroke-dasharray="7 7"/><line x1="78" y1="365" x2="882" y2="365" stroke="#cb5521" stroke-width="1.4" stroke-dasharray="7 7"/>';
      break;
    case 'proximity':
      if (good) extras += '<rect x="54" y="340" width="778" height="142" rx="24" fill="none" stroke="#2f6f3a" stroke-dasharray="8 8" opacity=".45"/>';
      break;
    case 'repetition':
    case 'consistency':
      if (!good) extras += '<circle cx="842" cy="92" r="20" fill="#3a7bd5" opacity=".32"/><rect x="790" y="430" width="58" height="34" rx="4" fill="#cb5521" opacity=".25"/>';
      break;
    case 'hierarchy':
      titleSize = good ? 40 : 24;
      if (!good) leadText = demoWrap(cs.body, 28, 3);
      break;
    case 'whitespace':
      if (good) { lead = { x: 110, y: 185, w: 370, h: 112 }; image = { x: 610, y: 150, w: 240, h: 150 }; cards = [{ x: 150, y: 374, w: 180 }, { x: 390, y: 374, w: 180 }, { x: 630, y: 374, w: 180 }]; }
      else { lead = { x: 45, y: 122, w: 510, h: 160 }; image = { x: 574, y: 92, w: 330, h: 210 }; cards = [{ x: 42, y: 320, w: 250 }, { x: 326, y: 330, w: 250 }, { x: 612, y: 318, w: 250 }]; }
      break;
    case 'grid':
      if (good) guides += '<g opacity=".22">' + [204,330,456,582,708,834].map(x=>`<line x1="${x}" y1="44" x2="${x}" y2="490" stroke="#2f6f3a"/>`).join('') + [120,242,365,488].map(y=>`<line x1="78" y1="${y}" x2="882" y2="${y}" stroke="#2f6f3a"/>`).join('') + '</g>';
      break;
    case 'less':
      if (good) { showCards = false; lead = { x: 112, y: 190, w: 430, h: 110 }; image = { x: 625, y: 145, w: 230, h: 155 }; points = [cs.points[0]]; }
      else extras += '<circle cx="120" cy="150" r="46" fill="#cb5521" opacity=".18"/><circle cx="860" cy="140" r="38" fill="#3a7bd5" opacity=".22"/><rect x="54" y="408" width="120" height="36" rx="18" fill="#f4d35e" opacity=".5"/>';
      break;
    case 'brand':
      if (!good) extras += '<text x="830" y="78" font-size="16" fill="#3a7bd5" font-weight="700">LOGO?</text><rect x="586" y="356" width="210" height="90" rx="2" fill="none" stroke="#3a7bd5" stroke-width="3"/>';
      break;
    case 'flow':
    case 'diagonal':
      extras += good
        ? '<path d="M90 120 C250 165 300 345 500 365 S720 330 845 180" fill="none" stroke="#cb5521" stroke-width="4" stroke-linecap="round" stroke-dasharray="10 8" opacity=".72"/><polygon points="852,174 835,177 846,190" fill="#cb5521" opacity=".72"/>'
        : '<path d="M780 130 L160 420 M190 130 L820 420" stroke="#9ca3af" stroke-width="2" stroke-dasharray="7 9" opacity=".45"/>';
      break;
    case 'density':
      if (!good) extras += Array.from({ length: 15 }, (_, i) => `<text x="${55 + (i % 3) * 285}" y="${145 + Math.floor(i / 3) * 46}" font-size="11" fill="#4a5a3a">${demoEsc(demoClip(cs.points[i % cs.points.length], 14))}</text>`).join('');
      break;
    case 'fill':
      if (!good) { image = { x: 30, y: 92, w: 410, h: 275 }; lead = { x: 455, y: 92, w: 455, h: 175 }; cards = [{ x: 42, y: 390, w: 265 }, { x: 328, y: 390, w: 265 }, { x: 614, y: 390, w: 265 }]; }
      break;
    case 'gestalt':
      if (good) extras += '<rect x="55" y="344" width="775" height="136" rx="28" fill="none" stroke="#2f6f3a" stroke-width="3" opacity=".28"/><path d="M310 410 H332 M542 410 H586" stroke="#2f6f3a" stroke-width="3" opacity=".4"/>';
      break;
    case 'golden':
      image = good ? { x: 584, y: 118, w: 300, h: 275 } : { x: 480, y: 136, w: 400, h: 220 };
      lead = good ? { x: 78, y: 174, w: 430, h: 124 } : { x: 78, y: 174, w: 360, h: 124 };
      extras += good ? '<text x="520" y="330" font-size="14" fill="#cb5521" font-weight="700">1 : 1.618</text>' : '';
      break;
    case 'thirds':
      guides += '<g opacity=".38"><line x1="320" y1="46" x2="320" y2="488" stroke="#cb5521" stroke-dasharray="7 7"/><line x1="640" y1="46" x2="640" y2="488" stroke="#cb5521" stroke-dasharray="7 7"/><line x1="78" y1="180" x2="882" y2="180" stroke="#cb5521" stroke-dasharray="7 7"/><line x1="78" y1="360" x2="882" y2="360" stroke="#cb5521" stroke-dasharray="7 7"/></g>';
      if (good) { image = { x: 600, y: 180, w: 250, h: 170 }; lead = { x: 96, y: 164, w: 370, h: 130 }; }
      break;
    case 'fpattern':
      extras += good ? '<path d="M82 88 H650 M82 150 H455 M82 150 V420" fill="none" stroke="#cb5521" stroke-width="8" stroke-linecap="round" opacity=".18"/>' : '';
      break;
    case 'center':
    case 'symmetry':
      if (good) { titleX = 480; subtitleX = 480; titleAnchor = 'middle'; lead = { x: 260, y: 165, w: 440, h: 118 }; image = { x: 382, y: 300, w: 196, h: 124 }; showCards = false; }
      break;
    case 'margin':
      guides += good ? '<rect x="78" y="78" width="804" height="410" rx="6" fill="none" stroke="#cb5521" stroke-dasharray="8 8" opacity=".7"/>' : '<rect x="24" y="24" width="912" height="492" rx="6" fill="none" stroke="#cb5521" stroke-dasharray="8 8" opacity=".7"/>';
      if (!good) { titleX = 34; subtitleX = 34; lead = { x: 28, y: 145, w: 500, h: 138 }; image = { x: 610, y: 90, w: 310, h: 200 }; }
      break;
    case 'column':
      showImage = false; showCards = false; lead = { x: 78, y: 145, w: good ? 380 : 790, h: 270 };
      extras += good
        ? `<rect x="510" y="145" width="360" height="270" rx="16" fill="#ffffff" fill-opacity=".82" stroke="rgba(26,51,0,.14)" filter="url(#pageShadow)"/>${demoSvgLines(535, 182, demoWrap(cs.body, 15, 7), 17, ink, 500, 26)}<path d="M462 278 H506" stroke="${orange}" stroke-width="3" stroke-dasharray="7 6"/><text x="470" y="268" font-size="12" fill="${orange}">续排</text>`
        : `<text x="95" y="418" font-size="14" fill="${orange}" font-weight="700">长行过宽，读到右侧容易丢行</text>`;
      break;
    case 'bleed':
    case 'fullimage':
      header = false; showImage = false; showCards = false;
      bg = '#1a3300';
      extras += `<image href="./images/${demoEsc(cs.img)}" x="${good ? 0 : 62}" y="${good ? 0 : 72}" width="${good ? 960 : 836}" height="${good ? 540 : 396}" preserveAspectRatio="xMidYMid slice"/><rect x="0" y="0" width="960" height="540" fill="rgba(26,51,0,${good ? .5 : .12})"/><text x="96" y="340" font-size="42" fill="#fff" font-weight="700" font-family="Inter, PingFang SC, Microsoft YaHei, sans-serif">${demoEsc(title)}</text><text x="98" y="382" font-size="20" fill="rgba(255,255,255,.86)" font-family="Inter, PingFang SC, Microsoft YaHei, sans-serif">${demoEsc(subtitle)}</text>`;
      break;
    case 'cards':
      if (!good) { showCards = false; extras += demoSvgLines(98, 350, points.map(p => '· ' + p), 18, ink, 500, 34); }
      break;
    case 'balance':
      extras += good ? '<circle cx="502" cy="278" r="6" fill="#cb5521"/><line x1="320" y1="278" x2="680" y2="278" stroke="#cb5521" stroke-dasharray="8 8" opacity=".55"/>' : '<text x="710" y="420" font-size="15" fill="#cb5521" font-weight="700">右侧太空</text>';
      if (!good) { image = { x: 70, y: 128, w: 430, h: 285 }; showCards = false; }
      break;
    case 'textmargin':
      leadFill = good ? '#ffffff' : '#fff8ed';
      leadOpacity = 1;
      extras += !good ? '<text x="116" y="274" font-size="13" fill="#cb5521">文字贴边，像没留呼吸</text>' : '<text x="116" y="274" font-size="13" fill="#2f6f3a">内边距舒适</text>';
      break;
    case 'paragraph':
      showImage = false; showCards = false; lead = { x: 110, y: 145, w: 740, h: 265 };
      leadText = demoWrap(cs.body + cs.body, good ? 25 : 42, good ? 5 : 4);
      break;
    case 'autofit':
      if (!good) extras += `<rect x="104" y="260" width="390" height="44" fill="none" stroke="${orange}" stroke-width="3"/><text x="118" y="333" font-size="13" fill="${orange}">文字溢出框外</text>`;
      else extras += `<text x="118" y="333" font-size="13" fill="${green}">自动缩小并换行，完整保留</text>`;
      break;
  }

  const cardHtml = showCards ? points.map((p, i) => demoPointCard(p, i, cards[i] || cards[0], good, cfg)).join('') : '';
  const leadHtml = (cfg.kind === 'bleed' || cfg.kind === 'fullimage') ? '' : `
    <rect x="${lead.x}" y="${lead.y}" width="${lead.w}" height="${lead.h}" rx="16" fill="${leadFill}" fill-opacity="${leadOpacity}" stroke="rgba(26,51,0,.14)" filter="url(#pageShadow)"/>
    <text x="${lead.x + 22}" y="${lead.y + 34}" font-size="17" fill="${orange}" font-weight="700" letter-spacing="1.4" font-family="JetBrains Mono, monospace">CASE · ${demoEsc(cfg.term)}</text>
    ${demoSvgLines(lead.x + 22, lead.y + 70, leadText, cfg.kind === 'paragraph' ? 18 : 17, ink, 500, cfg.kind === 'paragraph' && good ? 34 : 25)}
  `;
  const imageHtml = showImage ? `
    <clipPath id="pageImageClip"><rect x="${image.x}" y="${image.y}" width="${image.w}" height="${image.h}" rx="18"/></clipPath>
    <image href="./images/${demoEsc(cs.img)}" x="${image.x}" y="${image.y}" width="${image.w}" height="${image.h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#pageImageClip)"/>
    <rect x="${image.x}" y="${image.y}" width="${image.w}" height="${image.h}" rx="18" fill="rgba(26,51,0,.16)"/>
    <rect x="${image.x}" y="${image.y}" width="${image.w}" height="${image.h}" rx="18" fill="none" stroke="rgba(26,51,0,.16)"/>
    <text x="${image.x + 22}" y="${image.y + image.h - 24}" font-size="18" fill="#ffffff" font-weight="700" font-family="Inter, PingFang SC, Microsoft YaHei, sans-serif">${demoEsc(demoClip(cs.partName, 10))}</text>
  ` : '';
  const headerHtml = header ? `
    <text x="${titleX}" y="${titleY}" ${titleAnchor ? `text-anchor="${titleAnchor}"` : ''} font-size="${titleSize}" fill="${ink}" font-weight="700" font-family="Inter, PingFang SC, Microsoft YaHei, sans-serif">${demoEsc(title)}</text>
    <text x="${subtitleX}" y="${subtitleY}" ${titleAnchor ? `text-anchor="${titleAnchor}"` : ''} font-size="18" fill="#4a5a3a" font-family="Inter, PingFang SC, Microsoft YaHei, sans-serif">${demoEsc(subtitle)}</text>
    <text x="870" y="72" text-anchor="end" font-size="14" fill="${green}" font-weight="700" letter-spacing="2" font-family="JetBrains Mono, monospace">${demoEsc(cs.kicker)}</text>
  ` : '';

  return `
    <svg viewBox="0 0 960 540" width="100%" height="100%" role="img" aria-label="${demoEsc(cs.title)} ${demoEsc(cfg.term)} PPT 页面案例" style="display:block;background:${bg}">
      <defs>
        <linearGradient id="pageBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#eef3e6"/>
          <stop offset=".58" stop-color="#fbfcf7"/>
          <stop offset="1" stop-color="#f7efe5"/>
        </linearGradient>
        <filter id="pageShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#1a3300" flood-opacity=".12"/>
        </filter>
      </defs>
      <rect width="960" height="540" fill="${bg === '#fbfcf7' ? 'url(#pageBg)' : bg}"/>
      <circle cx="92" cy="82" r="138" fill="${green}" opacity=".05"/>
      <circle cx="865" cy="430" r="150" fill="${orange}" opacity=".055"/>
      ${headerHtml}
      ${guides}
      ${leadHtml}
      ${imageHtml}
      ${cardHtml}
      ${extras}
      <line x1="78" y1="488" x2="882" y2="488" stroke="rgba(26,51,0,.16)"/>
      <text x="78" y="514" font-size="13" fill="rgba(26,51,0,.54)" font-family="JetBrains Mono, monospace">${demoEsc(cs.footer)}</text>
      <text x="882" y="514" text-anchor="end" font-size="13" fill="rgba(26,51,0,.54)" font-family="JetBrains Mono, monospace">${demoEsc(footerText)}</text>
    </svg>`;
}

function buildRepetitionSvg(cs, mode) {
  // 专属「重复」可视化：960×540 SVG 完整 PPT 章节封面案例（统一范式，移动端靠 viewBox 自动缩放）。
  // 遵循 oma-slide design doctrine：committed palette（ink-press 风：新闻纸底 #f5f0e8 + 朱红强调 #d4380d）、
  // distinctive 衬线数字、8px 栅格、z 层序（bg→content→accent）。oma-slide 的 PPTX 导出目标即 960×540，天然对齐。
  // good=统一重复：三章封面共用同一套模板（同色同版式）→ 节奏统一；bad=各不相同：三章各一套版式 → 像三份 deck。
  const good = mode === 'good';
  const CANVAS = '#14181f', ACCENT = '#d4380d', FB = "var(--font-body), system-ui, sans-serif";
  const chapters = [
    { n:'01', t:'品牌诊断', s:'现状与问题' },
    { n:'02', t:'视觉规范', s:'色板与字体' },
    { n:'03', t:'应用落地', s:'物料与场景' }
  ];
  const w = 264, gap = 24, x0 = 60, y = 150, h = 330;
  const xs = [x0, x0 + w + gap, x0 + 2 * (w + gap)];
  function cover(i) {
    const x = xs[i], ch = chapters[i];
    if (good) {
      return `<g>` +
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#f5f0e8"/>` +
        `<rect x="${x}" y="${y}" width="8" height="${h}" fill="${ACCENT}"/>` +
        `<text x="${x + 30}" y="${y + 80}" font-family="Georgia, 'Times New Roman', serif" font-size="54" font-weight="700" fill="#1a1a1a">${ch.n}</text>` +
        `<line x1="${x + 30}" y1="${y + 98}" x2="${x + w - 30}" y2="${y + 98}" stroke="${ACCENT}" stroke-width="2"/>` +
        `<text x="${x + 30}" y="${y + 152}" font-family="${FB}" font-size="23" font-weight="700" fill="#1a1a1a">${ch.t}</text>` +
        `<text x="${x + 30}" y="${y + 184}" font-family="${FB}" font-size="15" fill="#565656">${ch.s}</text>` +
        `<text x="${x + 30}" y="${y + h - 24}" font-family="${FB}" font-size="12" fill="#565656">${demoEsc(cs.kicker)} · 品牌 VI 升级提案</text>` +
        `</g>`;
    }
    if (i === 0) { // 橙 · 居中 · 无左条
      return `<g>` +
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="0" fill="#fff3e6"/>` +
        `<text x="${x + w/2}" y="${y + 72}" text-anchor="middle" font-family="Georgia, serif" font-size="50" font-weight="700" fill="#c2410c">${ch.n}</text>` +
        `<text x="${x + w/2}" y="${y + 140}" text-anchor="middle" font-family="${FB}" font-size="20" font-weight="700" fill="#b45309">${ch.t}</text>` +
        `<text x="${x + w/2}" y="${y + 170}" text-anchor="middle" font-family="${FB}" font-size="14" fill="#b45309">${ch.s}</text>` +
        `<text x="${x + w/2}" y="${y + h - 24}" text-anchor="middle" font-family="${FB}" font-size="12" fill="#9a6a4a">各自为政</text>` +
        `</g>`;
    }
    if (i === 1) { // 蓝 · 数字右上 · 标题左
      return `<g>` +
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#eef3fb"/>` +
        `<text x="${x + w - 28}" y="${y + 68}" text-anchor="end" font-family="Georgia, serif" font-size="46" font-weight="700" fill="#2563eb">${ch.n}</text>` +
        `<text x="${x + 28}" y="${y + 152}" font-family="${FB}" font-size="22" font-weight="700" fill="#1e3a8a">${ch.t}</text>` +
        `<text x="${x + 28}" y="${y + 184}" font-family="${FB}" font-size="15" fill="#274690">${ch.s}</text>` +
        `<text x="${x + 28}" y="${y + h - 24}" font-family="${FB}" font-size="12" fill="#274690">又一套风格</text>` +
        `</g>`;
    }
    // i === 2 绿 · 数字底部 · 标题中上
    return `<g>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#eef6ec"/>` +
      `<text x="${x + 28}" y="${y + 152}" font-family="${FB}" font-size="22" font-weight="700" fill="#1f5c3a">${ch.t}</text>` +
      `<text x="${x + 28}" y="${y + 184}" font-family="${FB}" font-size="15" fill="#2f7d4f">${ch.s}</text>` +
      `<text x="${x + w - 28}" y="${y + h - 30}" text-anchor="end" font-family="Georgia, serif" font-size="44" font-weight="700" fill="#2f7d4f">${ch.n}</text>` +
      `<text x="${x + 28}" y="${y + h - 24}" font-family="${FB}" font-size="12" fill="#2f7d4f">再来一套</text>` +
      `</g>`;
  }
  let covers = '';
  for (let i = 0; i < 3; i++) covers += cover(i);
  return `<svg viewBox="0 0 960 540" width="100%" height="100%" role="img" aria-label="${demoEsc(cs.title)} 重复原则 PPT 章节封面案例" style="display:block;background:${CANVAS};font-family:${FB}">` +
    `<text x="60" y="48" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="${ACCENT}" letter-spacing="1.5">REPETITION · 重复</text>` +
    `<text x="60" y="84" font-family="${FB}" font-size="27" font-weight="700" fill="#f2ede4">章节封面 · ${demoEsc(cs.title)}</text>` +
    `<text x="60" y="110" font-family="${FB}" font-size="14" fill="#9ba8b5">${demoEsc(cs.subtitle)}</text>` +
    `<text x="900" y="48" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="12" fill="#9ba8b5">P1</text>` +
    covers +
    `<text x="60" y="516" font-family="JetBrains Mono, monospace" font-size="12" fill="#8a93a0">${demoEsc(cs.footer)}</text>` +
    `<text x="900" y="516" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="12" fill="#8a93a0">${good ? '统一重复 · 三章同模板' : '各不相同 · 三章各一套'}</text>` +
    `</svg>`;
}

function buildSerifSansSvg(cs, mode) {
  // 专属「衬线 / 无衬线」可视化：960×540 SVG 完整 PPT 品牌页（统一范式，移动端靠 viewBox 自动缩放）。
  // 遵循 oma-slide design doctrine：committed palette（暖纸底 + 陶土强调，避紫蓝渐变 cliché）、
  // distinctive 衬线、8px 栅格、z 层序（bg→accent→content）。与术语 scenario 一致：
  // 「文化/品牌故事用衬线显气质，数据报告用无衬线显利落」。
  // good=统一配对（标题衬线 + 数据/正文无衬线，一套规则）；bad=随机混搭（每处各来一套，无系统）。
  const good = mode === 'good';
  const PAPER = '#f7f3ea', INK = '#23201a', ACCENT = '#b5532a', MUTED = '#6b6258';
  const SERIF = "Georgia, 'Songti SC', 'STSong', 'SimSun', serif";
  const SANS = "'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', Arial, sans-serif";
  const fHead = good ? SERIF : SANS;   // 标题
  const fSub = good ? SANS : SERIF;    // 副标
  const fBody = good ? SANS : SERIF;   // 正文
  const fQuote = good ? SERIF : SANS;  // 金句
  const fNum = good ? SANS : SERIF;    // 数据数字
  const mods = cs.mods || [['12 座','新建公园'],['38万','年客流'],['96%','满意度']];
  const gap = 24, x0 = 60, areaW = 840, cols = 3;
  const cw = (areaW - gap * (cols - 1)) / cols;
  const xs = [x0, x0 + cw + gap, x0 + 2 * (cw + gap)];
  let metrics = '';
  mods.slice(0, 3).forEach((m, i) => {
    const x = xs[i];
    metrics += `<text x="${x}" y="414" font-family="${fNum}" font-size="34" font-weight="700" fill="${ACCENT}">${demoEsc(m[0])}</text>` +
               `<text x="${x}" y="440" font-family="${SANS}" font-size="13" fill="${MUTED}">${demoEsc(m[1])}</text>`;
  });
  return `<svg viewBox="0 0 960 540" width="100%" height="100%" role="img" aria-label="${demoEsc(cs.title)} 衬线无衬线字体系统 PPT 页面案例" style="display:block;background:${PAPER};font-family:${SANS}">` +
    `<rect x="0" y="0" width="8" height="540" fill="${ACCENT}"/>` +
    `<text x="60" y="48" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="${ACCENT}" letter-spacing="1.5">TYPE · 字体系统</text>` +
    `<text x="900" y="48" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="12" fill="${MUTED}">P1</text>` +
    `<text x="60" y="138" font-family="${fHead}" font-size="46" font-weight="700" fill="${INK}">${demoEsc(cs.title)}</text>` +
    `<line x1="60" y1="156" x2="220" y2="156" stroke="${ACCENT}" stroke-width="3"/>` +
    `<text x="60" y="196" font-family="${fSub}" font-size="19" font-weight="500" fill="${INK}">${demoEsc(cs.subtitle)}</text>` +
    `<text x="60" y="236" font-family="${fBody}" font-size="14" fill="${MUTED}">${demoEsc(cs.body)}</text>` +
    `<text x="60" y="300" font-family="${fQuote}" font-size="20" font-style="italic" fill="${ACCENT}">“绿色，是城市最好的叙事。”</text>` +
    metrics +
    `<text x="60" y="516" font-family="'JetBrains Mono', monospace" font-size="12" fill="${MUTED}">${demoEsc(cs.footer)}</text>` +
    `<text x="900" y="516" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="12" fill="${MUTED}">${good ? '统一配对 · 衬线标题+无衬线正文' : '随机混搭 · 每处各来一套'}</text>` +
    `</svg>`;
}

function buildHierarchySvg(cs, mode) {
  // 专属「层级」可视化：紧凑头部 + 放大正文层级对比区。
  // 解决通用 demoPage 模板头重脚轻问题：标题区只留一行 kicker 与页面名，
  // 内容区从 y=110 放到 y=470，让「结论置顶 vs 平铺无层级」成为视觉重点。
  const good = mode === 'good';
  const A = '#2c3e6b', BG = '#fbfcf7', MUTED = '#5a6b4a';
  const conclusion = cs.points[0] || '结论：项目超额达成目标';
  const supports = [cs.points[1] || '背景：三个月攻坚', cs.points[2] || '动作：三步走策略', cs.points[3] || '结果：ROI 提升 2.3 倍'];
  const content = good
    ? `<rect x="96" y="140" width="6" height="310" rx="3" fill="${A}"/>` +
      `<text x="126" y="226" font-family="${SVG_SANS}" font-size="46" font-weight="700" fill="${A}">${demoEsc(conclusion)}</text>` +
      `<line x1="126" y1="248" x2="560" y2="248" stroke="rgba(44,62,107,.3)" stroke-width="1.5"/>` +
      supports.map((s, i) => `<text x="126" y="${302 + i * 52}" font-family="${SVG_SANS}" font-size="18" fill="${MUTED}">${demoEsc(s)}</text>`).join('')
    : supports.concat([conclusion]).map((s, i) =>
        `<text x="126" y="${190 + i * 68}" font-family="${SVG_SANS}" font-size="18" fill="${SVG_INK}">${demoEsc(s)}</text>`
      ).join('');
  return `<svg viewBox="0 0 960 540" width="100%" height="100%" role="img" aria-label="${demoEsc(cs.title)} 信息层级 PPT 页面案例" style="display:block;background:${BG};font-family:${SVG_SANS}">` +
    `<rect x="0" y="0" width="960" height="6" fill="${A}"/>` +
    svgTxt(48, 40, cs.kicker + ' · ' + cs.partName, 13, A, 700, 'start', SVG_MONO) +
    svgTxt(48, 74, cs.title, 22, SVG_INK, 700) +
    svgTxt(912, 40, 'P1', 12, 'rgba(26,51,0,.5)', 400, 'end', SVG_MONO) +
    content +
    svgTxt(48, 520, cs.footer, 13, 'rgba(26,51,0,.54)', 400, 'start', SVG_MONO) +
    svgTxt(912, 520, cs.kicker + ' · ' + (good ? '结论置顶' : '平铺无层级'), 13, 'rgba(26,51,0,.54)', 400, 'end', SVG_MONO) +
    `</svg>`;
}

/* ---------- 共享「动手试试」SVG 框架（960×540，移动端靠 viewBox 缩放） ----------
   供 alignment/proximity/contrast 等专属 demo 复用：统一页眉页脚 + 内容区，
   各术语只提供 good/bad 两个场景函数（在内容区 x48..912 / y162..498 内绘制）。 */
const SVG_SANS = '"PingFang SC","Microsoft YaHei",system-ui,-apple-system,sans-serif';
const SVG_SERIF = 'Georgia,"Songti SC","SimSun",serif';
const SVG_MONO = '"JetBrains Mono",ui-monospace,"SFMono-Regular",monospace';
const SVG_INK = '#1a3300', SVG_MUTED = '#5a6b4a';
function svgTxt(x, y, s, size, color, weight, anchor, font) {
  return `<text x="${x}" y="${y}" text-anchor="${anchor || 'start'}" font-family="${font || SVG_SANS}" font-size="${size}" font-weight="${weight || 400}" fill="${color}">${demoEsc(s)}</text>`;
}
function svgRect(x, y, w, h, fill, rx, stroke, sw) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx || 0}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw || 1}"` : ''}/>`;
}
function demoPage(o) {
  const cs = o.cs, m = o.mode === 'good';
  const A = o.accent || '#2f6f3a', BG = o.bg || '#fbfcf7';
  const scene = (m ? o.good : o.bad)();
  return `<svg viewBox="0 0 960 540" width="100%" height="100%" role="img" aria-label="${demoEsc(cs.title)} 页面案例" style="display:block;background:${BG}">`
    + `<rect x="0" y="0" width="960" height="6" fill="${A}"/>`
    + svgTxt(48, 46, cs.kicker, 13, A, 700, 'start', SVG_MONO)
    + svgTxt(48, 68, cs.partName, 14, SVG_MUTED)
    + svgTxt(48, 104, cs.title, 30, SVG_INK, 700)
    + svgTxt(48, 132, cs.subtitle, 14, SVG_MUTED)
    + svgTxt(912, 46, 'P1', 12, 'rgba(26,51,0,.5)', 400, 'end', SVG_MONO)
    + `<line x1="48" y1="150" x2="912" y2="150" stroke="rgba(26,51,0,.1)" stroke-width="1"/>`
    + scene
    + svgTxt(48, 520, cs.footer, 13, 'rgba(26,51,0,.54)', 400, 'start', SVG_MONO)
    + svgTxt(912, 520, cs.kicker + ' · ' + (m ? (o.tagGood || '统一') : (o.tagBad || '杂乱')), 13, 'rgba(26,51,0,.54)', 400, 'end', SVG_MONO)
    + `</svg>`;
}

/* 压缩页眉版「动手试试」框架：解决通用 demoPage 头重脚轻——
   页眉只留两行（kicker·partName @y40，标题 @y74）+ 分隔线 @y92，
   内容区从 y110 放到 y498（比旧版多约 110px 高度），让案例重点放大可见。
   各术语提供 good/bad 两个场景函数，在 x48..912 / y110..498 内绘制。 */
function demoPageCompact(o) {
  const cs = o.cs, m = o.mode === 'good';
  const A = o.accent || '#2f6f3a', BG = o.bg || '#fbfcf7';
  const scene = (m ? o.good : o.bad)();
  const tag = o.tag != null ? o.tag : (m ? (o.tagGood || '统一') : (o.tagBad || '杂乱'));
  return `<svg viewBox="0 0 960 540" width="100%" height="100%" role="img" aria-label="${demoEsc(cs.title)} 页面案例" style="display:block;background:${BG}">`
    + `<rect x="0" y="0" width="960" height="6" fill="${A}"/>`
    + svgTxt(48, 40, cs.kicker + ' · ' + cs.partName, 13, A, 700, 'start', SVG_MONO)
    + svgTxt(48, 74, cs.title, 28, SVG_INK, 700)
    + svgTxt(912, 40, 'P1', 12, 'rgba(26,51,0,.5)', 400, 'end', SVG_MONO)
    + `<line x1="48" y1="92" x2="912" y2="92" stroke="rgba(26,51,0,.1)" stroke-width="1"/>`
    + scene
    + svgTxt(48, 520, cs.footer, 13, 'rgba(26,51,0,.54)', 400, 'start', SVG_MONO)
    + svgTxt(912, 520, cs.kicker + ' · ' + tag, 13, 'rgba(26,51,0,.54)', 400, 'end', SVG_MONO)
    + `</svg>`;
}

function runCasePageDemo(c, key) {
  const cfg = CASE_PAGE_DEMOS[key] || CASE_PAGE_DEMOS.alignment;
  const cs = pickCaseForDemo(key);
  let mode = 'good';
  c.innerHTML = `
    <div class="demo-stack">
      <div class="mini-slide" data-case-stage></div>
      <div class="demo-row">
        <button class="demo-btn" data-m="bad">${cfg.bad}</button>
        <button class="demo-btn active" data-m="good">${cfg.good}</button>
      </div>
      <div class="demo-label" data-case-hint style="text-align:center"></div>
    </div>`;
  const stage = c.querySelector('[data-case-stage]');
  const hint = c.querySelector('[data-case-hint]');
  function render() {
    stage.innerHTML = buildCasePageSvg(cs, cfg, mode);
    hint.textContent = cfg.hint;
  }
  render();
  c.querySelectorAll('[data-m]').forEach(btn => {
    btn.onclick = () => {
      c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.dataset.m;
      render();
    };
  });
}

const DEMOS = {

  /* ---------- 软件功能 ---------- */
  master(c) {
    // 真实案例：改母版一处（强调色 / 页脚 / Logo）→ 所有页面同步更新
    const ACCENTS = { green:'#2f6f3a', blue:'#3a7bd5', orange:'#cb5521' };
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">改「母版」的强调色 / 页脚 / Logo → 所有页面同步更新</div>
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="mName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="shuffle">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-accent="green">优卡绿</button>
          <button class="demo-btn" data-accent="blue">商务蓝</button>
          <button class="demo-btn" data-accent="orange">暖橙</button>
          <button class="demo-btn active" data-toggle="footer">页脚/页码</button>
          <button class="demo-btn active" data-toggle="logo">Logo</button>
        </div>
        <div class="demo-row" id="mSlides" style="gap:12px;flex-wrap:nowrap"></div>
      </div>`;
    const slides = c.querySelector('#mSlides');
    const nameEl = c.querySelector('#mName');
    let ci = Math.floor(Math.random() * CASES.length);
    let accent = '#2f6f3a', showFooter = true, showLogo = true;
    function slideHTML(kind) {
      const cs = CASES[ci];
      const accentBar = `<div style="position:absolute;top:0;left:0;right:0;height:5px;background:${accent}"></div>`;
      const logo = showLogo ? `<div style="position:absolute;top:8px;left:9px;font:700 9px var(--font-mono);color:${accent};letter-spacing:.08em">${cs.kicker}</div>` : '';
      let body = '';
      if (kind === 'cover') body = `<div style="position:absolute;top:40%;left:8%;right:8%;text-align:center;color:#1a3300"><div style="font:700 15px var(--font-body);line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cs.title}</div><div style="margin-top:5px;font:11px var(--font-body);color:#4a5a3a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cs.subtitle}</div></div>`;
      else if (kind === 'content') body = `<div style="position:absolute;top:20%;left:9%;right:9%;color:#1a3300"><div style="font:700 12px var(--font-body);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cs.title}</div><div style="height:2px;width:20px;background:${accent};margin:4px 0 6px;border-radius:2px"></div><div style="display:flex;flex-direction:column;gap:3px">${cs.points.slice(0,2).map(p => `<div style="font:10px/1.35 var(--font-body);color:#1a3300;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">• ${p}</div>`).join('')}</div></div>`;
      else body = `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:${accent}"><div style="font:700 26px var(--font-mono)">PART ${cs.part}</div><div style="margin-top:4px;font:11px var(--font-body);color:#1a3300;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cs.partName}</div></div>`;
      const footer = showFooter ? `<div style="position:absolute;bottom:5px;left:9px;right:9px;display:flex;justify-content:space-between;font:8px var(--font-mono);color:rgba(26,51,0,.5)"><span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:70%">${cs.footer}</span><span>P${kind === 'cover' ? 1 : (kind === 'content' ? 2 : 3)}</span></div>` : '';
      return `<div class="mini-slide" style="flex:1;min-width:0">${accentBar}${logo}${body}${footer}</div>`;
    }
    function render() {
      const cs = CASES[ci];
      nameEl.textContent = '案例：' + cs.title;
      slides.innerHTML = [slideHTML('cover'), slideHTML('content'), slideHTML('section')].join('');
    }
    render();
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { ci = Math.floor(Math.random() * CASES.length); render(); });
    c.querySelectorAll('[data-accent]').forEach(b => b.onclick = () => { accent = ACCENTS[b.dataset.accent]; c.querySelectorAll('[data-accent]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(); });
    c.querySelectorAll('[data-toggle]').forEach(b => b.onclick = () => { const k = b.dataset.toggle; if (k === 'footer') showFooter = !showFooter; else showLogo = !showLogo; b.classList.toggle('active', k === 'footer' ? showFooter : showLogo); render(); });
  },

  layout(c) {
    // 共用顶部 const CASES（真实中文 PPT 案例库），系统随机抽一个，让学习者动手把同一份内容套进不同版式
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="lyName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="shuffle">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-l="title">标题幻灯片</button>
          <button class="demo-btn" data-l="content">标题+内容</button>
          <button class="demo-btn" data-l="twocol">两栏对比</button>
          <button class="demo-btn" data-l="section">章节分隔</button>
          <button class="demo-btn" data-l="blank">空白</button>
        </div>
        <div class="mini-slide" id="lySlide" style="align-items:stretch;justify-content:stretch"></div>
        <div class="demo-label" style="text-align:center">↑ 动手切换版式，看同一份真实内容如何"落位"</div>
      </div>`;
    const slide = c.querySelector('#lySlide');
    const nameEl = c.querySelector('#lyName');
    const LI = s => `<div class="ly-li">${s}</div>`;
    function render() {
      const cs = CASES[ci];
      nameEl.textContent = '案例：' + cs.title;
      if (lt === 'title') {
        slide.style.background = 'rgba(26,51,0,.93)';
        slide.innerHTML = `<div class="ly-inner" style="align-items:center;justify-content:center;text-align:center;color:#eef3e6">
          <div style="font:700 26px var(--font-body);letter-spacing:.01em">${cs.title}</div>
          <div style="width:42px;height:3px;background:#bcd99b;margin:12px 0;border-radius:2px"></div>
          <div style="font:14px var(--font-body);color:#bcd99b">${cs.subtitle}</div>
          <div style="position:absolute;bottom:8%;left:0;right:0;font:10px var(--font-mono);color:rgba(238,243,230,.55)">演讲人：____　|　日期：____</div>
        </div>`;
      } else if (lt === 'content') {
        slide.style.background = '#fbfcf7';
        slide.innerHTML = `<div class="ly-inner" style="align-items:flex-start;color:#1a3300">
          <div style="font:700 18px var(--font-body)">${cs.title}</div>
          <div style="width:30px;height:3px;background:#2f6f3a;margin:7px 0 10px;border-radius:2px"></div>
          <div style="display:flex;flex-direction:column;gap:7px;width:100%">${cs.points.map(LI).join('')}</div>
        </div>`;
      } else if (lt === 'twocol') {
        slide.style.background = '#fbfcf7';
        const col = (t, arr) => `<div style="flex:1;min-width:0">
          <div style="font:700 12px var(--font-body);color:#fff;background:#2f6f3a;display:inline-block;padding:3px 10px;border-radius:5px;margin-bottom:8px">${t}</div>
          <div style="display:flex;flex-direction:column;gap:6px">${arr.map(LI).join('')}</div></div>`;
        slide.innerHTML = `<div class="ly-inner" style="align-items:stretch;color:#1a3300;gap:14px">
          <div style="font:600 12px var(--font-body);color:#6b7280">${cs.title} · 左右对比</div>
          ${cs.tw && cs.tw.aPts ? `<div style="display:flex;gap:16px;flex:1">${col(cs.tw.a, cs.tw.aPts)}${col(cs.tw.b, cs.tw.bPts)}</div>` : `<div style="display:flex;gap:16px;flex:1">${col('要点 A', cs.points.slice(0, Math.ceil(cs.points.length/2)))}${col('要点 B', cs.points.slice(Math.ceil(cs.points.length/2)))}</div>`}
        </div>`;
      } else if (lt === 'section') {
        slide.style.background = 'rgba(26,51,0,.93)';
        slide.innerHTML = `<div class="ly-inner" style="align-items:center;justify-content:center;text-align:center;color:#eef3e6">
          <div style="font:700 44px var(--font-mono);color:#bcd99b;line-height:1">PART ${cs.part}</div>
          <div style="font:16px var(--font-body);color:#eef3e6;margin-top:10px">${cs.partName}</div>
          <div style="font:11px var(--font-mono);color:rgba(238,243,230,.5);margin-top:14px">${cs.title}</div>
        </div>`;
      } else { // blank
        slide.style.background = '#fbfcf7';
        slide.innerHTML = `<div style="position:absolute;inset:9%;border:2px dashed rgba(26,51,0,.35);border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(26,51,0,.45);font:13px var(--font-body);text-align:center;padding:10px">空白版式 · 自由发挥<br>把内容拖进来就好</div>`;
      }
    }
    let ci = Math.floor(Math.random() * CASES.length);  // 系统随机抽中的真实案例
    let lt = 'title';
    render();
    c.querySelectorAll('[data-l]').forEach(b => b.onclick = () => {
      lt = b.dataset.l;
      c.querySelectorAll('[data-l]').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      render();
    });
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
      ci = Math.floor(Math.random() * CASES.length);
      render();
    });
  },

  placeholder(c) {
    // 真实案例：点占位符填入真实内容，再点清空。占位符是版式预先留好的"内容槽"
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="pName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="shuffle">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">点占位符 → 填入真实内容；再点 → 清空。它是版式预先留好的"内容槽"</div>
        <div class="mini-slide" id="pSlide" style="align-items:stretch;justify-content:stretch"></div>
      </div>`;
    const slide = c.querySelector('#pSlide');
    const nameEl = c.querySelector('#pName');
    let ci = Math.floor(Math.random() * CASES.length);
    let st = { title:false, subtitle:false, body:false, image:false };
    function box(kind, label, filled, html) {
      if (kind === 'title') return `<div data-ph="title" style="position:absolute;top:9%;left:9%;right:9%;height:14%;border:2px dashed rgba(26,51,0,.4);border-radius:6px;display:flex;align-items:center;padding:0 10px;cursor:pointer;color:${filled ? '#1a3300' : 'rgba(26,51,0,.55)'};font:${filled ? '700 16px' : '13px'} var(--font-body);background:${filled ? 'rgba(47,111,58,.08)' : 'transparent'}">${filled ? html : label}</div>`;
      if (kind === 'subtitle') return `<div data-ph="subtitle" style="position:absolute;top:26%;left:9%;right:30%;height:7%;border:2px dashed rgba(26,51,0,.4);border-radius:6px;display:flex;align-items:center;padding:0 10px;cursor:pointer;color:${filled ? '#4a5a3a' : 'rgba(26,51,0,.5)'};font:${filled ? '13px' : '12px'} var(--font-body);background:${filled ? 'rgba(47,111,58,.06)' : 'transparent'}">${filled ? html : label}</div>`;
      if (kind === 'body') return `<div data-ph="body" style="position:absolute;top:37%;left:9%;right:9%;bottom:11%;border:2px dashed rgba(26,51,0,.4);border-radius:6px;display:flex;align-items:flex-start;padding:10px;cursor:pointer;color:${filled ? '#1a3300' : 'rgba(26,51,0,.5)'};font:${filled ? '12.5px' : '12px'} var(--font-body);background:${filled ? 'rgba(47,111,58,.05)' : 'transparent'}">${filled ? html : label}</div>`;
      return `<div data-ph="image" style="position:absolute;top:26%;right:9%;width:22%;height:30%;border:2px dashed rgba(26,51,0,.4);border-radius:6px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(26,51,0,.5);font:12px var(--font-body);text-align:center;background:${filled ? 'linear-gradient(135deg,#dfe9cf,#bcd99b)' : 'transparent'}">${filled ? '<span style="font:700 12px var(--font-mono);color:#2f6f3a">🖼 配图</span>' : label}</div>`;
    }
    function render() {
      const cs = CASES[ci];
      nameEl.textContent = '案例：' + cs.title;
      slide.innerHTML =
        box('title', '单击此处添加标题', st.title, cs.title) +
        box('subtitle', '单击此处添加副标题', st.subtitle, cs.subtitle) +
        box('body', '单击此处添加正文', st.body, cs.body) +
        box('image', '单击此处添加配图', st.image, '');
      slide.querySelectorAll('[data-ph]').forEach(d => d.onclick = () => { const k = d.dataset.ph; st[k] = !st[k]; render(); });
    }
    render();
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { ci = Math.floor(Math.random() * CASES.length); st = { title:false, subtitle:false, body:false, image:false }; render(); });
  },

  'animation-pane'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="apName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="ap">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn" id="apPlay">▶ 播放</button><button class="demo-btn" id="apReset">重置</button></div>
        <div class="demo-row" id="apPane" style="flex-direction:column;gap:8px"></div>
        <div class="mini-slide" id="apStage" style="display:flex;flex-direction:column;gap:8px;align-items:center;justify-content:center"></div>
      </div>`;
    const nameEl = c.querySelector('#apName'), pane = c.querySelector('#apPane'), stage = c.querySelector('#apStage');
    function build() {
      const cs = CASES[ci];
      nameEl.textContent = '案例：' + cs.title;
      const items = [cs.title, cs.subtitle].concat(cs.points.slice(0, 2));
      pane.innerHTML = ''; stage.innerHTML = '';
      items.forEach((t, i) => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:10px;font:13px var(--font-body);color:var(--color-moon-mist)';
        row.innerHTML = `<span style="width:20px;height:20px;border-radius:50%;background:rgba(47,111,58,.25);border:1px solid rgba(47,111,58,.5);display:flex;align-items:center;justify-content:center;font:11px var(--font-mono);color:#1a3300">${i + 1}</span><span>${t}</span>`;
        pane.appendChild(row);
        const obj = document.createElement('div');
        obj.style.cssText = 'padding:6px 12px;background:rgba(26,51,0,.1);border:1px solid var(--color-glass-edge);border-radius:8px;color:#1a3300;font:13px var(--font-body);opacity:0;transform:translateY(8px)';
        obj.textContent = t; stage.appendChild(obj);
      });
    }
    build();
    function reset() { [...stage.children].forEach(o => { o.style.transition = 'none'; o.style.opacity = 0; o.style.transform = 'translateY(8px)'; }); }
    function play() { reset(); [...stage.children].forEach((o, i) => setTimeout(() => { o.style.transition = 'all .4s ease'; o.style.opacity = 1; o.style.transform = 'translateY(0)'; }, i * 450)); }
    c.querySelector('#apPlay').onclick = play;
    c.querySelector('#apReset').onclick = reset;
    c.querySelector('[data-m="ap"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); build(); reset(); };
  },

  guides(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="gName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="g">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">拖动滑块移动「配图」，靠近中线会自动吸附到参考线</div>
        <input type="range" min="0" max="100" value="20" class="demo-slider" id="gSlide">
        <div class="mini-slide" id="gStage" style="position:relative">
          <div id="gContent" style="position:absolute;top:14%;left:12%;right:12%;color:#1a3300">
            <div style="font:700 18px var(--font-body)" id="gTitle"></div>
            <div style="font:13px var(--font-body);color:#4a5a3a;margin-top:4px" id="gSub"></div>
          </div>
          <div id="gLine" style="position:absolute;top:0;bottom:0;left:50%;width:1px;background:rgba(47,111,58,.5)"></div>
          <div id="gBox" style="position:absolute;top:58%;width:18%;height:14%;background:rgba(47,111,58,.55);border-radius:6px;left:20%;transition:left .05s;display:flex;align-items:center;justify-content:center;color:#fff;font:11px var(--font-body)">配图</div>
        </div>
      </div>`;
    const slide = c.querySelector('#gSlide'), box = c.querySelector('#gBox'), nameEl = c.querySelector('#gName');
    function fill() { const cs = CASES[ci]; nameEl.textContent = '案例：' + cs.title; c.querySelector('#gTitle').textContent = cs.title; c.querySelector('#gSub').textContent = cs.subtitle; }
    fill();
    function up() { let v = +slide.value; if (Math.abs(v - 50) < 4) v = 50; box.style.left = (v - 9) + '%'; }
    slide.oninput = up; up();
    c.querySelector('[data-m="g"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },

  eyedropper(c) {
    const PAL = [['品牌绿', '#2f6f3a'], ['活力橙', '#cb5521'], ['商务蓝', '#3a7bd5'], ['丁香紫', '#8b5cf6'], ['暖沙', '#d4a574'], ['墨黑', '#1a3300']];
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="edName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="ed">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">点色块 → 吸取到「当前色」，给这份 PPT 上色</div>
        <div class="demo-row" id="edSwatches" style="gap:8px"></div>
        <div class="demo-row" style="align-items:center;gap:12px">
          <div id="edCur" style="width:60px;height:60px;border-radius:12px;background:#2f6f3a;border:1px solid var(--color-glass-edge)"></div>
          <div id="edHex" style="font:14px var(--font-mono);color:var(--color-frost-glow)">#2F6F3A</div>
        </div>
      </div>`;
    const sw = c.querySelector('#edSwatches'), cur = c.querySelector('#edCur'), hex = c.querySelector('#edHex'), nameEl = c.querySelector('#edName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill();
    PAL.forEach(([n, col]) => {
      const b = document.createElement('div');
      b.title = n;
      b.style.cssText = `width:52px;height:52px;border-radius:10px;background:${col};cursor:pointer;border:1px solid var(--color-glass-edge)`;
      b.onclick = () => { cur.style.background = col; hex.textContent = col.toUpperCase(); };
      sw.appendChild(b);
    });
    c.querySelector('[data-m="ed"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },

  smartart(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="saName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="sa">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-t="list">列表</button>
          <button class="demo-btn" data-t="process">流程</button>
          <button class="demo-btn" data-t="cycle">循环</button>
          <button class="demo-btn" data-t="hier">层次</button>
        </div>
        <div class="mini-slide" id="saBox" style="display:flex;align-items:center;justify-content:center;padding:14px"></div>
      </div>`;
    const box = c.querySelector('#saBox'), nameEl = c.querySelector('#saName');
    function render(t) {
      const cs = CASES[ci];
      const pts = cs.points.slice(0, 3);
      if (t === 'list') box.innerHTML = `<div style="display:flex;flex-direction:column;gap:8px;width:72%">${pts.map(x=>`<div style="padding:8px 12px;background:rgba(47,111,58,.2);border:1px solid rgba(47,111,58,.5);border-radius:6px;color:#1a3300;font:13px var(--font-body)">${x}</div>`).join('')}</div>`;
      else if (t === 'process') box.innerHTML = `<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center">${pts.map((x,i)=>`<div style="padding:8px 10px;background:rgba(47,111,58,.2);border:1px solid rgba(47,111,58,.5);border-radius:6px;color:#1a3300;font:12px var(--font-body)">${x}</div>${i<pts.length-1?'<span style="color:rgba(26,51,0,.6)">→</span>':''}`).join('')}</div>`;
      else if (t === 'cycle') box.innerHTML = `<svg viewBox="0 0 280 280" width="220" height="220" style="overflow:visible"><defs><marker id="saArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="rgba(47,111,58,.8)"/></marker></defs><circle cx="140" cy="80" r="34" fill="rgba(47,111,58,.3)" stroke="rgba(47,111,58,.7)" stroke-width="2"/><text x="140" y="86" text-anchor="middle" fill="#1a3300" font-size="12" font-weight="600" font-family="var(--font-body)">${pts[0]||'计划'}</text><circle cx="205" cy="185" r="34" fill="rgba(203,85,33,.3)" stroke="rgba(203,85,33,.7)" stroke-width="2"/><text x="205" y="191" text-anchor="middle" fill="#1a3300" font-size="12" font-weight="600" font-family="var(--font-body)">${pts[1]||'执行'}</text><circle cx="75" cy="185" r="34" fill="rgba(58,123,213,.3)" stroke="rgba(58,123,213,.7)" stroke-width="2"/><text x="75" y="191" text-anchor="middle" fill="#1a3300" font-size="12" font-weight="600" font-family="var(--font-body)">${pts[2]||'复盘'}</text><path d="M165,105 Q195,135 183,155" fill="none" stroke="rgba(47,111,58,.7)" stroke-width="2.5" marker-end="url(#saArrow)"/><path d="M182,203 Q140,228 98,203" fill="none" stroke="rgba(203,85,33,.7)" stroke-width="2.5" marker-end="url(#saArrow)"/><path d="M93,158 Q78,130 108,108" fill="none" stroke="rgba(58,123,213,.7)" stroke-width="2.5" marker-end="url(#saArrow)"/></svg>`;
      else box.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:8px"><div style="padding:8px 20px;background:rgba(47,111,58,.3);border-radius:6px;color:#1a3300;font:13px var(--font-body)">${cs.title}</div><div style="display:flex;gap:14px">${pts.map(x=>`<div style="padding:6px 10px;background:rgba(26,51,0,.12);border-radius:6px;color:#1a3300;font:12px var(--font-body)">${x}</div>`).join('')}</div></div>`;
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; render('list'); }
    fill();
    c.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { c.querySelectorAll('[data-t]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.t); });
    c.querySelector('[data-m="sa"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },

  section(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    const SEC = [
      { sec: '第一章 · 背景', items: ['封面', '问题陈述'] },
      { sec: '第二章 · 方案', items: ['总体思路', '技术架构', '落地计划'], open: true },
      { sec: '第三章 · 总结', items: ['成效', 'Q&A'] }
    ];
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="secName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="sec">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn" id="secToggle">收起「第二章」</button></div>
        <div id="secList" style="display:flex;flex-direction:column;gap:6px;font:13px var(--font-body)"></div>
      </div>`;
    const list = c.querySelector('#secList'), nameEl = c.querySelector('#secName');
    let collapsed = false;
    function render() {
      list.innerHTML = '';
      SEC.forEach((d, i) => {
        const head = document.createElement('div');
        head.style.cssText = `padding:6px 10px;background:rgba(47,111,58,.18);border:1px solid rgba(47,111,58,.4);border-radius:6px;color:#1a3300;font-weight:500`;
        head.textContent = (i === 1 && collapsed ? '▸ ' : '▾ ') + d.sec;
        list.appendChild(head);
        if (!(i === 1 && collapsed)) d.items.forEach(it => {
          const it2 = document.createElement('div');
          it2.style.cssText = 'padding:4px 10px 4px 28px;color:var(--color-moon-mist)';
          it2.textContent = '· ' + it; list.appendChild(it2);
        });
      });
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render();
    c.querySelector('#secToggle').onclick = (e) => { collapsed = !collapsed; e.target.textContent = collapsed ? '展开「第二章」' : '收起「第二章」'; render(); };
    c.querySelector('[data-m="sec"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },

  'zoom-loc'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    const SECS = [['背景', '#2f6f3a'], ['方案', '#2f6f3a'], ['总结', '#2f6f3a']];
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="zlName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="zl">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">点目录缩略图 → 跳转并放大该节，可返回</div>
        <div class="demo-row" id="zlMenu" style="gap:10px"></div>
        <div class="mini-slide" id="zlStage" style="display:flex;align-items:center;justify-content:center;overflow:hidden"></div>
      </div>`;
    const menu = c.querySelector('#zlMenu'), stage = c.querySelector('#zlStage'), nameEl = c.querySelector('#zlName');
    function reset() { stage.style.background = 'transparent'; stage.innerHTML = '<div style="color:rgba(26,51,0,.5);font:13px var(--font-body)">← 点上方目录进入对应章节</div>'; }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    SECS.forEach(([n, col]) => {
      const t = document.createElement('div');
      t.style.cssText = `flex:1;aspect-ratio:16/9;background:${col}22;border:1px solid ${col}88;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#1a3300;font:13px var(--font-body);cursor:pointer`;
      t.textContent = n;
      t.onclick = () => { stage.style.background = col + '22'; stage.innerHTML = `<div style="text-align:center;color:#1a3300"><div style="font:24px var(--font-display)">${n}</div><button class="demo-btn" id="zlBack" style="margin-top:10px">← 返回目录</button></div>`;
        stage.querySelector('#zlBack').onclick = reset; };
      menu.appendChild(t);
    });
    fill(); reset();
    c.querySelector('[data-m="zl"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },

  /* ---------- 设计原则（真实 PPT 幻灯片风格） ---------- */
  'alignment'(c) {
    const cs = CASES.find(x => x.id === 'align-launch') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">对齐＝标题、正文、按钮都落到同一条左参考线 → 整页有秩序</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">各对齐各的</button>
          <button class="demo-btn active" data-m="good">统一左对齐</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#1f3a2e', bg:'#fbfcf7', tagGood:'统一左对齐', tagBad:'各对齐各的',
        good: () => `<line x1="130" y1="120" x2="130" y2="490" stroke="#1f3a2e" stroke-width="1.2" stroke-dasharray="6 6" opacity=".4"/>`
          + svgTxt(130,200,cs.title,38,SVG_INK,700) + svgTxt(130,244,cs.subtitle,17,SVG_MUTED)
          + svgTxt(130,308,cs.points[2],21,SVG_INK) + svgTxt(130,352,cs.points[3],21,SVG_INK)
          + svgRect(130,408,220,60,'#1f3a2e',12) + svgTxt(240,446,'立即预约席位',19,'#fff',700,'middle'),
        bad: () => svgTxt(110,200,cs.title,38,SVG_INK,700) + svgTxt(210,244,cs.subtitle,17,SVG_MUTED)
          + svgTxt(150,308,cs.points[2],21,SVG_INK) + svgTxt(260,352,cs.points[3],21,SVG_INK)
          + svgRect(310,408,220,60,'#1f3a2e',12) + svgTxt(420,446,'立即预约席位',19,'#fff',700,'middle') });
      hint.textContent = mode === 'good' ? '统一左对齐：标题、副标题、正文、按钮都落到同一条左参考线，整页有秩序、显贵气。' : '各对齐各的：每个元素各起一条边，左缘参差像没排过，整页松垮。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },
  'proximity'(c) {
    const cs = CASES.find(x => x.id === 'prox-white') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">亲密性＝相关信息靠拢成组，组间留大空白 → 一眼看懂谁和谁一伙</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">散开平铺</button>
          <button class="demo-btn active" data-m="good">分组靠拢</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#b5532a', bg:'#f7f3ea', tagGood:'分组靠拢', tagBad:'散开平铺',
        good: () => svgRect(70,150,360,320,'#fff',16,'rgba(26,51,0,.14)')
          + svgTxt(96,206,'核心问题',24,'#b5532a',700)
          + svgTxt(96,266,'用户增长遇瓶颈',19,SVG_INK)
          + svgTxt(96,312,'留存持续下滑',19,SVG_INK)
          + svgRect(530,150,360,320,'#fff',16,'rgba(26,51,0,.14)')
          + svgTxt(556,206,'解决方案',24,'#b5532a',700)
          + svgTxt(556,266,'重构增长引擎',19,SVG_INK)
          + svgTxt(556,312,'分层精细化运营',19,SVG_INK)
          + `<line x1="490" y1="160" x2="490" y2="460" stroke="rgba(181,83,42,.3)" stroke-width="1.4" stroke-dasharray="5 6"/>`,
        bad: () => svgTxt(110,210,'核心问题',24,'#b5532a',700)
          + svgTxt(110,258,'用户增长遇瓶颈',19,SVG_INK)
          + svgTxt(110,348,'解决方案',24,'#b5532a',700)
          + svgTxt(110,396,'重构增长引擎',19,SVG_INK) });
      hint.textContent = mode === 'good' ? '分组靠拢：相关问题挨在一起、组间留大空白，读者一眼知道谁和谁是一组。' : '散开平铺：所有信息均匀排开、不分组的，读者要在字里行间自己猜谁和谁有关。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },
  'contrast'(c) {
    const cs = CASES.find(x => x.id === 'cont-fund') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">对比＝全场小字里，只让一个关键数字跳出来</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">全部一样大</button>
          <button class="demo-btn active" data-m="good">重点高亮</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#c0392b', bg:'#fbfcf7', tagGood:'重点高亮', tagBad:'全部一样大',
        good: () => svgTxt(110,344,cs.mods[0][0],96,'#c0392b',700)
          + svgTxt(116,392,cs.mods[0][1],20,SVG_MUTED)
          + svgTxt(600,306,cs.mods[1][0],34,SVG_MUTED) + svgTxt(600,340,cs.mods[1][1],15,SVG_MUTED)
          + svgTxt(600,408,cs.mods[2][0],34,SVG_MUTED) + svgTxt(600,442,cs.mods[2][1],15,SVG_MUTED),
        bad: () => svgTxt(110,330,cs.mods[0][0],46,'#c0392b',700) + svgTxt(110,366,cs.mods[0][1],15,SVG_MUTED)
          + svgTxt(430,330,cs.mods[1][0],46,'#c0392b',700) + svgTxt(430,366,cs.mods[1][1],15,SVG_MUTED)
          + svgTxt(720,330,cs.mods[2][0],46,'#c0392b',700) + svgTxt(720,366,cs.mods[2][1],15,SVG_MUTED) });
      hint.textContent = mode === 'good' ? '重点高亮：只把「本轮估值」放大加亮，其余指标退为小字，视线立刻被它抓住。' : '全部一样大：三个数字同样大同样红，谁都跳不出来，页面没有主次。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },
  'repetition'(c) {
    // 专属「动手试试」：用 oma-slide 的 design doctrine（committed palette + 章节封面模板）生成 960×540 SVG 完整 PPT 页面。
    // 内容对齐「常见场景」：每个章节封面套同一种模板 → 整份演示节奏统一。good=统一重复；bad=各不相同。
    const cs = CASES.find(x => x.id === 'brand-vi') || CASES[42];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">重复＝章节封面套用同一套模板 → 整份演示节奏统一（见「常见场景」）</div>
        <div class="mini-slide" data-rep-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">各不相同</button>
          <button class="demo-btn active" data-m="good">统一重复</button>
        </div>
        <div class="demo-label" data-rep-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-rep-stage]');
    const hint = c.querySelector('[data-rep-hint]');
    function render() {
      stage.innerHTML = buildRepetitionSvg(cs, mode);
      hint.textContent = mode === 'good'
        ? '统一重复：三章封面用同一套配色与排版模板，观众一看就知道「新的一章开始」，节奏统一、专业连贯。'
        : '各不相同：三章各用一套版式（橙居中 / 蓝右上 / 绿底部），像三份不同的 deck，节奏全无、杂乱。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => {
      btn.onclick = () => {
        c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active'));
        btn.classList.add('active');
        mode = btn.dataset.m;
        render();
      };
    });
  },
  'hierarchy'(c) {
    const cs = CASES.find(x => x.id === 'hier-retro') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">层级＝先抛结论大标题，再用小字支撑 → 3 秒读懂你想说的</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">平铺无层级</button>
          <button class="demo-btn active" data-m="good">结论置顶</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = buildHierarchySvg(cs, mode);
      hint.textContent = mode === 'good' ? '结论置顶：大标题先给结论，小字再支撑，读者 3 秒抓住重点。' : '平铺无层级：四句话同样大小同样颜色，没有轻重，读者得自己找重点。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },
  'whitespace'(c) {
    const cs = CASES.find(x => x.id === 'ws-poster') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">留白＝一页一句话＋一张图，四周大量留白 → 质感拉满</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">塞满</button>
          <button class="demo-btn active" data-m="good">大量留白</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#7a6a4f', bg:'#f6f4ef', tagGood:'大量留白', tagBad:'塞满',
        good: () => svgTxt(480,300,'让城市会呼吸。',56,SVG_INK,700,'middle')
          + svgTxt(480,358,cs.subtitle,18,SVG_MUTED,400,'middle'),
        bad: () => svgRect(80,150,800,320,'#ece7df',12)
          + svgTxt(112,214,'让城市会呼吸。',32,SVG_INK,700)
          + svgTxt(112,256,cs.subtitle,16,SVG_MUTED)
          + svgTxt(112,296,cs.points[3],16,SVG_INK)
          + svgTxt(112,334,cs.footer,14,SVG_MUTED) });
      hint.textContent = mode === 'good' ? '大量留白：一句主张 + 四周空旷，负空间撑起高级感，视线聚焦。' : '塞满：文字铺满整框、几乎不留白，信息拥挤，质感掉档。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },
  'focus'(c) {
    const cs = CASES.find(x => x.id === 'focus-kpi') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">焦点＝把目标数字高亮，其余图表调灰 → 视线只锁一个目标</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">视线无主</button>
          <button class="demo-btn active" data-m="good">目标高亮</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      const cards = (hi) => {
        let s = '';
        const defs = [['#1d7a5f','#dff3ec',hi],['#ededed','#9a9a9a',!hi],['#ededed','#9a9a9a',!hi]];
        const xs = [90,370,650];
        for (let i = 0; i < 3; i++) {
          const [fill,tc,lit] = defs[i];
          s += svgRect(xs[i],150,230,250,fill,14) + svgTxt(xs[i]+115,300,cs.mods[i][0],lit?64:42,tc,700,'middle')
            + svgTxt(xs[i]+115,348,cs.mods[i][1],lit?17:14,tc,lit?700:400,'middle');
        }
        return s;
      };
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#1d7a5f', bg:'#fbfcf7', tagGood:'目标高亮', tagBad:'视线无主',
        good: () => cards(true), bad: () => cards(false) });
      hint.textContent = mode === 'good' ? '目标高亮：核心指标「新增 38 万」亮色大卡，其余降为灰卡，视线只锁它。' : '视线无主：三张卡大小、颜色、位置权重相同，都在抢注意力，读者不知道先看哪个指标。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },
  'grid'(c) {
    const cs = CASES.find(x => x.id === 'grid-matrix') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">栅格＝多卡片统一 3 列、等宽等距 → 全站一致不歪</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">宽窄不一</button>
          <button class="demo-btn active" data-m="good">对齐栅格</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      const A = '#5b4b8a';
      const good = () => { let s=''; const xs=[60,344,628], ys=[150,326], cw=260, ch=150;
        for (let i=0;i<6;i++){ const x=xs[i%3], y=ys[i<3?0:1];
          s += svgRect(x,y,cw,ch,'#fff',12,A,'1.6') + svgTxt(x+22,y+62,'0'+(i+1),30,A,700) + svgTxt(x+22,y+104,cs.points[i]||('能力'+(i+1)),16,SVG_INK); }
        return s; };
      const bad = () => { let s=''; const cards=[[70,150,240,150],[330,165,290,135],[640,140,220,160],[80,330,270,140],[360,350,250,120],[650,320,230,150]];
        cards.forEach((d,i)=>{ const [x,y,w,h]=d; s += svgRect(x,y,w,h,'#fff',12,A,'1.6') + svgTxt(x+20,y+60,'0'+(i+1),26,A,700) + svgTxt(x+20,y+100,cs.points[i]||('能力'+(i+1)),15,SVG_INK); });
        return s; };
      stage.innerHTML = demoPageCompact({ cs, mode, accent:A, bg:'#fbfcf7', tagGood:'对齐栅格', tagBad:'宽窄不一', good, bad });
      hint.textContent = mode === 'good' ? '对齐栅格：6 张卡片统一 3 列、等宽等距，对齐到同一套栅格线，整齐专业。' : '宽窄不一：卡片宽窄、间距、位置各不一样，像没对齐，整页发歪。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },
  'serif-sans'(c) {
    // 专属「动手试试」：用真实品牌年报案例，渲染 960×540 SVG 完整页面（统一范式，移动端按比例缩放）。
    // 衬线/无衬线原则＝为内容选对字型并贯穿全篇。good=统一配对(标题衬线+数据/正文无衬线)；bad=随机混搭(每处各来一套)。
    const cs = CASES.find(x => x.id === 'brand-annual') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">衬线 / 无衬线：为内容选对字型，并贯穿全篇 → 一套系统</div>
        <div class="mini-slide" data-ss-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">随机混搭</button>
          <button class="demo-btn active" data-m="good">统一配对</button>
        </div>
        <div class="demo-label" data-ss-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-ss-stage]');
    const hint = c.querySelector('[data-ss-hint]');
    function render() {
      stage.innerHTML = buildSerifSansSvg(cs, mode);
      hint.textContent = mode === 'good'
        ? '统一配对：标题/金句用衬线（显气质），数据/正文用无衬线（显利落），全篇一套规则，专业连贯。'
        : '随机混搭：标题无衬线、正文却衬线、数字又衬线……每处各来一套，没有系统，品牌调性丢失。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => {
      btn.onclick = () => {
        c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active'));
        btn.classList.add('active');
        mode = btn.dataset.m;
        render();
      };
    });
  },
  'type-scale'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    const cs = () => CASES[ci];
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="tsName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="ts">↻ 换一个真实案例</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;padding:8px 4px" id="tsBox"></div>
      </div>`;
    const nameEl = c.querySelector('#tsName'), box = c.querySelector('#tsBox');
    function render() {
      const x = cs();
      const rows = [['显示', x.title, 48, 600], ['标题', x.subtitle, 30, 500], ['副标', x.points[0], 22, 400], ['正文', x.footer, 16, 400]];
      box.innerHTML = rows.map(([t, s, sz, w]) => `<div style="font:${w} ${sz}px var(--font-body);color:var(--color-frost-glow);line-height:1.2">${s}</div>`).join('');
    }
    function fill() { nameEl.textContent = '案例：' + cs().title; }
    fill(); render();
    c.querySelector('[data-m="ts"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(); };
  },
  'font-weight'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="fwName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="fw">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn active" data-w="400">常规 400</button><button class="demo-btn" data-w="700">粗体 700</button></div>
        <div id="fwBox" style="font:32px var(--font-body);color:var(--color-ice-highlight);text-align:center;padding:18px 0;font-weight:400"></div>
      </div>`;
    const box = c.querySelector('#fwBox'), nameEl = c.querySelector('#fwName');
    function setText() { box.textContent = CASES[ci].title; }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); setText();
    c.querySelectorAll('[data-w]').forEach(b => b.onclick = () => { c.querySelectorAll('[data-w]').forEach(x => x.classList.remove('active')); b.classList.add('active'); box.style.fontWeight = b.dataset.w; });
    c.querySelector('[data-m="fw"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); setText(); };
  },
  tracking(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="tkName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="tk">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">拖动调节字间距</div>
        <input type="range" min="-4" max="8" value="0" class="demo-slider" id="tkSlide">
        <div id="tkBox" style="font:30px var(--font-display);color:var(--color-ice-highlight);text-align:center;padding:14px 0;letter-spacing:0px"></div>
      </div>`;
    const slide = c.querySelector('#tkSlide'), box = c.querySelector('#tkBox'), nameEl = c.querySelector('#tkName');
    function setText() { box.textContent = CASES[ci].title; }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); setText();
    slide.oninput = () => box.style.letterSpacing = slide.value + 'px';
    c.querySelector('[data-m="tk"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); setText(); };
  },
  analogous(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `<div class="demo-stack">
      <div class="demo-row" style="justify-content:space-between;gap:8px">
        <span class="demo-label" id="anName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
        <button class="demo-btn" data-m="an">↻ 换一个真实案例</button>
      </div>
      <div class="demo-label">色环相邻：蓝 → 蓝绿 → 绿，自然过渡不生硬</div>
      <div class="mini-slide" id="anStage" style="background:#fbfcf7;display:flex;flex-direction:column;padding:24px 28px;box-sizing:border-box">
        <div id="anTitle" style="font:700 18px var(--font-body);color:#1a3300;margin-bottom:4px"></div>
        <div style="width:36px;height:3px;background:#2f6f3a;border-radius:2px;margin-bottom:16px"></div>
        <div style="display:flex;gap:12px;flex:1">
          <div style="flex:1;border-radius:10px;background:#3a7bd5;display:flex;flex-direction:column;justify-content:flex-end;padding:14px;color:#fff">
            <div style="font:700 14px var(--font-body)">战略目标</div>
            <div id="anP1" style="font:12px var(--font-body);opacity:.9;margin-top:4px"></div>
          </div>
          <div style="flex:1;border-radius:10px;background:#2a9d8f;display:flex;flex-direction:column;justify-content:flex-end;padding:14px;color:#fff">
            <div style="font:700 14px var(--font-body)">关键动作</div>
            <div id="anP2" style="font:12px var(--font-body);opacity:.9;margin-top:4px"></div>
          </div>
          <div style="flex:1;border-radius:10px;background:#2f6f3a;display:flex;flex-direction:column;justify-content:flex-end;padding:14px;color:#fff">
            <div style="font:700 14px var(--font-body)">预期结果</div>
            <div id="anP3" style="font:12px var(--font-body);opacity:.9;margin-top:4px"></div>
          </div>
        </div>
      </div>
      <div class="demo-label" id="anCap"></div>
    </div>`;
    const nameEl = c.querySelector('#anName'), cap = c.querySelector('#anCap'), title = c.querySelector('#anTitle');
    function fill() {
      const cs = CASES[ci];
      nameEl.textContent = '案例：' + cs.title;
      title.textContent = cs.title;
      c.querySelector('#anP1').textContent = cs.points[0] || '明确方向';
      c.querySelector('#anP2').textContent = cs.points[1] || '落地执行';
      c.querySelector('#anP3').textContent = cs.points[2] || '验证成果';
      cap.textContent = '《' + cs.title + '》用蓝→蓝绿→绿邻近色，板块既有区分又和谐统一';
    }
    fill();
    c.querySelector('[data-m="an"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },
  complementary(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="cpName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="cp">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">正对面：蓝 vs 橙，互相提亮</div>
        <div style="display:flex;height:90px;border-radius:10px;overflow:hidden">
          <div style="flex:1;background:#2f6f3a;display:flex;align-items:center;justify-content:center;color:#ffffff;font:14px var(--font-body)" id="cpBg"></div>
          <div style="flex:0 0 90px;background:#cb5521;display:flex;align-items:center;justify-content:center;color:#ffffff;font:13px var(--font-body);box-shadow:0 0 20px rgba(203,85,33,.6)">CTA</div>
        </div>
        <div class="demo-label" id="cpCap"></div>
      </div>`;
    const nameEl = c.querySelector('#cpName'), bg = c.querySelector('#cpBg'), cap = c.querySelector('#cpCap');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; bg.textContent = CASES[ci].title; cap.textContent = '《' + CASES[ci].title + '》主文绿 + CTA 橙，最跳'; }
    fill();
    c.querySelector('[data-m="cp"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },
  'tri-color'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `<div class="demo-stack">
      <div class="demo-row" style="justify-content:space-between;gap:8px">
        <span class="demo-label" id="tcName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
        <button class="demo-btn" data-m="tc">↻ 换一个真实案例</button>
      </div>
      <div class="demo-label">60-30-10：主色 60% · 辅色 30% · 点缀 10%</div>
      <div style="display:flex;flex-direction:column;border-radius:10px;overflow:hidden;border:1px solid var(--color-glass-edge)">
        <div style="height:120px;background:#ffffff;display:flex;align-items:center;justify-content:center;color:rgba(26,51,0,.7);font:13px var(--font-body)" id="tcMain"></div>
        <div style="display:flex;height:60px"><div style="flex:1;background:#2f6f3a;display:flex;align-items:center;justify-content:center;color:#1a3300;font:12px var(--font-body)">辅色 30%</div><div style="flex:0 0 30px;background:#cb5521;display:flex;align-items:center;justify-content:center;color:#ffffff;font:11px var(--font-body)">10%</div></div>
      </div>
      <div class="demo-label" id="tcCap"></div>
    </div>`;
    const nameEl = c.querySelector('#tcName'), main = c.querySelector('#tcMain'), cap = c.querySelector('#tcCap');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; main.textContent = CASES[ci].title; cap.textContent = '《' + CASES[ci].title + '》按 60-30-10 分配三色'; }
    fill();
    c.querySelector('[data-m="tc"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },
  gradient(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="gName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="g">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <input type="color" value="#2f6f3a" id="gA" style="width:36px;height:30px;background:none;border:1px solid var(--color-glass-edge);border-radius:6px">
          <input type="color" value="#3a7bd5" id="gB" style="width:36px;height:30px;background:none;border:1px solid var(--color-glass-edge);border-radius:6px">
          <button class="demo-btn active" data-d="135">对角</button><button class="demo-btn" data-d="0">纵向</button><button class="demo-btn" data-d="90">横向</button>
        </div>
        <div class="mini-slide" id="gBox" style="border-radius:10px;background:linear-gradient(135deg,#2f6f3a,#3a7bd5);display:flex;align-items:center;justify-content:center"></div>
      </div>`;
    const a = c.querySelector('#gA'), b = c.querySelector('#gB'), box = c.querySelector('#gBox'), nameEl = c.querySelector('#gName');
    let dir = 135;
    function up() { box.style.background = `linear-gradient(${dir}deg, ${a.value}, ${b.value})`; }
    a.oninput = up; b.oninput = up;
    c.querySelectorAll('[data-d]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-d]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); dir = +btn.dataset.d; up(); });
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill();
    c.querySelector('[data-m="g"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },
  'anim-type'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="atName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="at">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="atStage" style="display:flex;align-items:center;justify-content:center;overflow:hidden">' +
          '<div id="atObj" style="padding:16px 24px;background:rgba(47,111,58,.6);border-radius:12px;color:#fff;font:17px var(--font-body);text-align:center;max-width:78%"></div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="enter">进入·淡入</button>' +
          '<button class="demo-btn" data-m="exit">退出·淡出</button>' +
          '<button class="demo-btn" data-m="emph">强调·脉冲</button>' +
        '</div>' +
      '</div>';
    const stage = c.querySelector('#atStage');
    const obj = c.querySelector('#atObj');
    const nameEl = c.querySelector('#atName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){ obj.textContent = CASES[ci].title; }
    function play(m){
      obj.style.transition = 'none';
      if (m === 'enter'){ obj.style.opacity = '0'; obj.style.transform = 'translateY(16px)'; requestAnimationFrame(function(){ obj.style.transition = 'all .55s cubic-bezier(.22,1,.36,1)'; obj.style.opacity = '1'; obj.style.transform = 'none'; }); }
      else if (m === 'exit'){ obj.style.transition = 'all .5s ease'; obj.style.opacity = '0'; obj.style.transform = 'scale(.8)'; setTimeout(function(){ obj.style.transition = 'none'; obj.style.opacity = '1'; obj.style.transform = 'none'; }, 650); }
      else { obj.style.transition = 'transform .3s ease'; obj.style.transform = 'scale(1.16)'; setTimeout(function(){ obj.style.transform = 'scale(1)'; }, 320); }
    }
    fill(); scene(); play('enter');
    c.querySelectorAll('[data-m]:not([data-m="at"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="at"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); play(b.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="enter"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="at"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); const act = c.querySelector('[data-m].active:not([data-m="at"])'); play(act ? act.dataset.m : 'enter'); };
  },  'smooth-vs-abrupt'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="svName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="sv">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="svStage" style="position:relative;overflow:hidden">' +
          '<div id="svA" style="position:absolute;top:26%;left:6%;right:6%;padding:12px 16px;background:rgba(47,111,58,.6);border-radius:10px;color:#fff;font:15px var(--font-body);text-align:center"></div>' +
          '<div id="svB" style="position:absolute;top:62%;left:6%;right:6%;padding:12px 16px;background:rgba(58,123,213,.6);border-radius:10px;color:#fff;font:15px var(--font-body);text-align:center"></div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="smooth">平滑过渡</button>' +
          '<button class="demo-btn" data-m="abrupt">生硬跳变</button>' +
        '</div>' +
      '</div>';
    const a = c.querySelector('#svA');
    const b = c.querySelector('#svB');
    const nameEl = c.querySelector('#svName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){ a.textContent = CASES[ci].title; b.textContent = CASES[ci].title; }
    function reset(){ a.style.transition = 'none'; b.style.transition = 'none'; a.style.opacity = '0'; b.style.opacity = '0'; a.style.transform = 'translateX(-30px)'; b.style.transform = 'translateX(-30px)'; }
    function play(m){
      reset();
      requestAnimationFrame(function(){
        if (m === 'smooth'){ a.style.transition = 'all .7s cubic-bezier(.22,1,.36,1)'; b.style.transition = 'all .7s cubic-bezier(.22,1,.36,1)'; }
        else { a.style.transition = 'none'; b.style.transition = 'none'; }
        a.style.opacity = '1'; a.style.transform = 'none'; b.style.opacity = '1'; b.style.transform = 'none';
      });
    }
    fill(); scene(); play('smooth');
    c.querySelectorAll('[data-m]:not([data-m="sv"])').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="sv"])').forEach(x => x.classList.remove('active'));
      btn.classList.add('active'); play(btn.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="smooth"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="sv"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); const act = c.querySelector('[data-m].active:not([data-m="sv"])'); play(act ? act.dataset.m : 'smooth'); };
  },  'easing'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="ezName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="ez">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="ezStage" style="overflow:hidden">' +
          '<div style="position:relative;height:46%;border-bottom:1px dashed rgba(26,51,0,.15)">' +
            '<div id="ezLin" style="position:absolute;top:50%;left:4%;transform:translateY(-50%);padding:8px 12px;background:rgba(126,138,160,.7);border-radius:8px;color:#fff;font:13px var(--font-body);white-space:nowrap"></div>' +
          '</div>' +
          '<div style="position:relative;height:46%">' +
            '<div id="ezEase" style="position:absolute;top:50%;left:4%;transform:translateY(-50%);padding:8px 12px;background:rgba(47,111,58,.75);border-radius:8px;color:#fff;font:13px var(--font-body);white-space:nowrap"></div>' +
          '</div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="run">▶ 播放</button>' +
          '<button class="demo-btn" data-m="slow">慢速对比</button>' +
        '</div>' +
      '</div>';
    const lin = c.querySelector('#ezLin');
    const ease = c.querySelector('#ezEase');
    const nameEl = c.querySelector('#ezName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){ lin.textContent = CASES[ci].title; ease.textContent = CASES[ci].title; }
    function run(slow){
      const d = slow ? '2.2s' : '1.1s';
      [lin, ease].forEach(function(el){ el.style.transition = 'none'; el.style.left = '4%'; });
      requestAnimationFrame(function(){
        lin.style.transition = 'left ' + d + ' linear';
        ease.style.transition = 'left ' + d + ' cubic-bezier(.22,1,.36,1)';
        lin.style.left = 'calc(100% - 40px)';
        ease.style.left = 'calc(100% - 40px)';
      });
    }
    fill(); scene(); run(false);
    c.querySelectorAll('[data-m]:not([data-m="ez"])').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="ez"])').forEach(x => x.classList.remove('active'));
      btn.classList.add('active'); run(btn.dataset.m === 'slow');
    });
    const initBtn = c.querySelector('[data-m="run"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="ez"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); const act = c.querySelector('[data-m].active:not([data-m="ez"])'); run(act && act.dataset.m === 'slow'); };
  },  'trigger'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="tgName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="tg">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="tgStage" style="display:flex;flex-direction:column;justify-content:center;gap:10px;padding:14px">' +
          '<div class="tgItem" style="padding:10px 14px;background:rgba(47,111,58,.45);border-radius:8px;color:#fff;font:14px var(--font-body);opacity:.18"></div>' +
          '<div class="tgItem" style="padding:10px 14px;background:rgba(58,123,213,.45);border-radius:8px;color:#fff;font:13px var(--font-body);opacity:.18"></div>' +
          '<div class="tgItem" style="padding:10px 14px;background:rgba(203,85,33,.45);border-radius:8px;color:#fff;font:13px var(--font-body);opacity:.18"></div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="click">单击·逐步</button>' +
          '<button class="demo-btn" data-m="with">与上一同时</button>' +
          '<button class="demo-btn" data-m="after">上一之后·序列</button>' +
        '</div>' +
      '</div>';
    const items = [].slice.call(c.querySelectorAll('.tgItem'));
    const nameEl = c.querySelector('#tgName');
    let idx = 0;
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){
      const cs = CASES[ci];
      items[0].textContent = cs.title;
      items[1].textContent = cs.points[0];
      items[2].textContent = cs.points[1];
      items.forEach(function(el){ el.style.transition = 'none'; el.style.opacity = '.18'; });
      idx = 0;
    }
    function show(el, d){ el.style.transition = 'opacity .4s ease ' + d + 's'; el.style.opacity = '1'; }
    function play(m){
      items.forEach(function(el){ el.style.transition = 'none'; el.style.opacity = '.18'; });
      if (m === 'with'){ items.forEach(function(el){ show(el, 0); }); }
      else if (m === 'after'){ items.forEach(function(el, i){ show(el, i * 0.45); }); }
      else { if (idx < items.length){ show(items[idx], 0); idx += 1; } }
    }
    fill(); scene(); play('after');
    c.querySelectorAll('[data-m]:not([data-m="tg"])').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="tg"])').forEach(x => x.classList.remove('active'));
      btn.classList.add('active'); play(btn.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="after"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="tg"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); const act = c.querySelector('[data-m].active:not([data-m="tg"])'); play(act ? act.dataset.m : 'after'); };
  },  'transition-fx'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="tfName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="tf">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="tfStage" style="position:relative;overflow:hidden">' +
          '<div id="tfA" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(26,51,0,.92);color:#eef3e6"></div>' +
          '<div id="tfB" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:8px;padding:16px;background:#fbfcf7;color:#1a3300;opacity:0;transform:translateX(100%)"></div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="fade">淡变</button>' +
          '<button class="demo-btn" data-m="push">推入</button>' +
          '<button class="demo-btn" data-m="wipe">擦除</button>' +
        '</div>' +
      '</div>';
    const a = c.querySelector('#tfA');
    const b = c.querySelector('#tfB');
    const nameEl = c.querySelector('#tfName');
    let toB = false;
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){
      const cs = CASES[ci];
      a.innerHTML = '<div style="font:700 20px var(--font-body)">' + cs.title + '</div><div style="margin-top:8px;font:13px var(--font-body);color:#bcd99b">' + cs.subtitle + '</div>';
      b.innerHTML = '<div style="font:700 16px var(--font-body)">' + cs.title + '</div>' + cs.points.map(function(p){ return '<div style="font:12px var(--font-body);margin-top:5px">• ' + p + '</div>'; }).join('');
    }
    function go(m){
      toB = !toB;
      const showB = toB;
      a.style.transition = 'none'; b.style.transition = 'none';
      if (m === 'fade'){ b.style.transform = 'none'; b.style.opacity = showB ? '1' : '0'; a.style.opacity = showB ? '0' : '1'; a.style.transform = 'none'; }
      else if (m === 'push'){ b.style.opacity = '1'; a.style.opacity = '1'; b.style.transform = showB ? 'none' : 'translateX(100%)'; a.style.transform = showB ? 'translateX(-30%)' : 'none'; }
      else { b.style.opacity = '1'; b.style.transform = showB ? 'none' : 'translateX(100%)'; a.style.transform = showB ? 'translateX(-100%)' : 'none'; a.style.opacity = '1'; }
    }
    fill(); scene();
    c.querySelectorAll('[data-m]:not([data-m="tf"])').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="tf"])').forEach(x => x.classList.remove('active'));
      btn.classList.add('active'); go(btn.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="fade"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="tf"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); toB = false; a.style.opacity = '1'; a.style.transform = 'none'; b.style.opacity = '0'; b.style.transform = 'translateX(100%)'; };
  },  'timeline'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="tlName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="tl">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="demo-label" style="font-size:12px">拖动时间轴 / 点「播放」看对象按错峰顺序登场</div>' +
        '<input type="range" min="0" max="100" value="0" class="demo-slider" id="tlSlide">' +
        '<div class="mini-slide" id="tlStage" style="display:flex;gap:10px;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:10px">' +
          '<div class="tlObj" data-at="0" style="padding:10px 14px;background:rgba(47,111,58,.5);border-radius:8px;color:#fff;font:13px var(--font-body);opacity:.2">标题</div>' +
          '<div class="tlObj" data-at="33" style="padding:10px 14px;background:rgba(58,123,213,.5);border-radius:8px;color:#fff;font:12px var(--font-body);opacity:.2">配图</div>' +
          '<div class="tlObj" data-at="66" style="padding:10px 14px;background:rgba(203,85,33,.5);border-radius:8px;color:#fff;font:12px var(--font-body);opacity:.2">数据</div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="play">▶ 播放序列</button>' +
        '</div>' +
      '</div>';
    const slide = c.querySelector('#tlSlide');
    const objs = [].slice.call(c.querySelectorAll('.tlObj'));
    const nameEl = c.querySelector('#tlName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){
      const cs = CASES[ci];
      objs[0].textContent = cs.title.length > 8 ? cs.title.slice(0,8) : cs.title;
      objs[1].textContent = cs.points[0].slice(0,8);
      objs[2].textContent = cs.points[1].slice(0,8);
    }
    function apply(t){ objs.forEach(function(o){ o.style.opacity = (+o.dataset.at <= t) ? '1' : '.2'; }); }
    slide.oninput = function(){ apply(+slide.value); };
    function play(){
      objs.forEach(function(o){ o.style.transition = 'none'; o.style.opacity = '.2'; });
      slide.value = 0;
      let i = 0;
      function step(){
        if (i >= objs.length){ slide.value = 100; return; }
        objs[i].style.transition = 'opacity .4s ease'; objs[i].style.opacity = '1';
        slide.value = objs[i].dataset.at;
        i += 1; setTimeout(step, 350);
      }
      step();
    }
    fill(); scene(); apply(0);
    c.querySelectorAll('[data-m]:not([data-m="tl"])').forEach(btn => btn.onclick = () => { btn.classList.add('active'); play(); });
    c.querySelector('[data-m="tl"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); apply(0); slide.value = 0; };
  },

  'golden-ratio'(c) {
    const cs = CASES.find(x => x.id === 'gold-cover') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">黄金分割＝主图占 0.618、文字占 0.382 → 比五五开更耐看</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">五五开</button>
          <button class="demo-btn active" data-m="good">0.618 : 0.382</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPage({ cs, mode, accent:'#a8702d', bg:'#f7f3ea', tagGood:'0.618 : 0.382', tagBad:'五五开',
        good: () => svgRect(60,180,522,300,'#a8702d',12) + svgTxt(321,340,'主视觉 61.8%',18,'#fff',700,'middle')
          + svgTxt(600,250,cs.points[0],20,SVG_INK,700) + svgTxt(600,290,cs.points[1],15,SVG_INK) + svgTxt(600,322,cs.points[2],15,SVG_MUTED),
        bad: () => svgRect(60,180,420,300,'#a8702d',12) + svgTxt(270,340,'主视觉 50%',18,'#fff',700,'middle')
          + svgTxt(520,250,cs.points[0],20,SVG_INK,700) + svgTxt(520,290,cs.points[1],15,SVG_INK) + svgTxt(520,322,cs.points[2],15,SVG_MUTED) });
      hint.textContent = mode === 'good' ? '0.618 : 0.382：主图占六成、文字占四成，左重右轻，构图更舒服耐看。' : '五五开：主图与文字各占一半，重心对称、略显呆板。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },

  'rule-of-thirds'(c) {
    const cs = CASES.find(x => x.id === 'rot-portrait') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">三分法＝人物偏到右侧交点、左侧留文字 → 构图更活</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">死板居中</button>
          <button class="demo-btn active" data-m="good">偏右三分线</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#3a6ea5', bg:'#fbfcf7', tagGood:'偏右三分线', tagBad:'死板居中',
        good: () => `<g opacity=".35"><line x1="344" y1="110" x2="344" y2="498" stroke="#3a6ea5" stroke-width="1" stroke-dasharray="5 5"/><line x1="640" y1="110" x2="640" y2="498" stroke="#3a6ea5" stroke-width="1" stroke-dasharray="5 5"/><line x1="48" y1="240" x2="912" y2="240" stroke="#3a6ea5" stroke-width="1" stroke-dasharray="5 5"/><line x1="48" y1="390" x2="912" y2="390" stroke="#3a6ea5" stroke-width="1" stroke-dasharray="5 5"/></g>`
          + svgRect(620,180,260,280,'#3a6ea5',16)
          + svgTxt(750,330,'人物',18,'#fff',700,'middle')
          + svgTxt(80,250,cs.points[0] || '人物落右三分线',20,SVG_INK,700)
          + svgTxt(80,290,cs.points[1] || '左侧留文字',15,SVG_INK)
          + svgTxt(80,322,cs.points[2] || '构图更活',15,SVG_MUTED),
        bad: () => svgRect(350,180,260,260,'#3a6ea5',16)
          + svgTxt(480,320,'人物',18,'#fff',700,'middle')
          + svgTxt(480,470,cs.points[0] + ' · ' + cs.points[1],14,SVG_INK,'','middle')
      });
      hint.textContent = mode === 'good' ? '偏右三分线：主体落在右侧交点，左侧留文字，视线有流动，构图更活。' : '死板居中：人物卡在正中央、文字挤在下方，对称但呆板。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },

  'f-pattern'(c) {
    const cs = CASES.find(x => x.id === 'fp-news') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">F 型阅读＝标题置顶、关键结论靠左上 → 视线顺 F 被读到</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">居中堆叠</button>
          <button class="demo-btn active" data-m="good">F 型路径</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#8a5a2b', bg:'#f7f3ea', tagGood:'F 型路径', tagBad:'居中堆叠',
        good: () => svgRect(60,120,840,54,'#8a5a2b',8)
          + svgTxt(82,154,cs.kicker + ' · ' + cs.partName,18,'#fff',700)
          + svgTxt(82,220,cs.points[0] || '导语靠左上',18,SVG_INK,700)
          + svgTxt(82,258,cs.points[1] || '要点逐条左对齐',15,SVG_INK)
          + svgTxt(82,292,cs.points[2] || '右侧配图收尾',15,SVG_INK)
          + svgTxt(82,326,cs.points[3] || '视线自然向下',15,SVG_INK)
          + svgRect(620,210,260,170,'#e8e2d6',10)
          + svgTxt(750,300,'配图',14,'#8a5a2b',700,'middle')
          + `<path d="M70 200 H640 M70 240 H520 M70 240 V340" fill="none" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round" opacity=".15"/>`,
        bad: () => svgTxt(480,180,cs.title,22,SVG_INK,700,'middle')
          + svgTxt(480,250,cs.points[0],14,SVG_INK,'','middle')
          + svgTxt(480,290,cs.points[1],14,SVG_INK,'','middle')
          + svgTxt(480,330,cs.points[2],14,SVG_INK,'','middle')
          + svgTxt(480,370,cs.points[3],14,SVG_INK,'','middle')
      });
      hint.textContent = mode === 'good' ? 'F 型路径：通栏标题横扫、左侧纵读，关键信息放在这条视线路径上。' : '居中堆叠：标题与要点全堆在正中，没有横—竖的阅读引导，视线无处着力。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },

  'center-sym'(c) {
    const cs = CASES.find(x => x.title === '直播电商月报') || CASES[19];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">中心对称＝封面/章节页以中轴制造稳定感</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">左右失衡</button>
          <button class="demo-btn active" data-m="good">居中对称</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'居中对称', tagBad:'左右失衡',
        good: () => `<line x1="480" y1="120" x2="480" y2="470" stroke="#2f6f3a" stroke-width="1" stroke-dasharray="6 6" opacity=".35"/>`
          + svgTxt(480,170,cs.title,28,SVG_INK,700,'middle')
          + svgTxt(480,204,cs.subtitle,14,SVG_MUTED,'','middle')
          + svgRect(360,250,240,160,'#3a6ea5',14) + svgTxt(480,340,'月度表现',16,'#fff',700,'middle')
          + svgTxt(480,445,cs.points[0],14,SVG_INK,'','middle'),
        bad: () => svgTxt(680,170,cs.title,22,SVG_INK,700,'middle')
          + svgTxt(680,200,cs.subtitle,13,SVG_MUTED,'','middle')
          + svgRect(580,240,220,150,'#3a6ea5',14) + svgTxt(690,325,'月度表现',15,'#fff',700,'middle')
          + svgTxt(120,340,cs.points[0],14,SVG_INK)
          + `<text x="120" y="380" font-size="13" fill="#cb5521" font-weight="700">标题与主图都偏右，左侧空洞</text>`
      });
      hint.textContent = mode === 'good' ? '居中对称：标题、主图、要点都沿中轴分布，封面/章节页仪式感与稳定感强。' : '左右失衡：视觉重心偏向一侧，封面缺少仪式感和稳定感。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },

  'margin'(c) {
    const cs = CASES.find(x => x.title === '品牌视觉升级提案') || CASES[20];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">页边距＝内容离边界留出安全距离，页面更专业</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">贴边拥挤</button>
          <button class="demo-btn active" data-m="good">安全边距</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'安全边距', tagBad:'贴边拥挤',
        good: () => `<rect x="60" y="110" width="840" height="388" fill="none" stroke="#cb5521" stroke-width="1" stroke-dasharray="8 8" opacity=".6"/>`
          + svgRect(90,140,780,328,'#ffffff',16,'rgba(26,51,0,.12)')
          + svgTxt(112,176,'CASE · 页边距',14,'#2f6f3a',700)
          + demoSvgLines(112,210,demoWrap(cs.body,22,4),15,SVG_INK,500,24)
          + svgRect(580,180,260,150,'#3a6ea5',14) + svgTxt(710,265,'视觉方向',15,'#fff',700,'middle')
          + svgTxt(90,470,'四周安全边距 32px',12,SVG_MUTED,'',SVG_MONO),
        bad: () => svgRect(48,110,864,388,'#ffffff',16,'rgba(26,51,0,.12)')
          + svgTxt(54,134,'CASE · 贴边拥挤',14,'#cb5521',700)
          + demoSvgLines(54,164,demoWrap(cs.body,28,5),15,SVG_INK,500,24)
          + svgRect(660,120,240,140,'#3a6ea5',14) + svgTxt(780,200,'视觉方向',15,'#fff',700,'middle')
          + svgTxt(54,470,'内容顶到边界，显得拥挤',12,'#cb5521',700,'',SVG_MONO)
      });
      hint.textContent = mode === 'good' ? '安全边距：内容四周留出固定空白，页面有呼吸感，也更显专业。' : '贴边拥挤：元素顶到页面边缘，像打印没留边，视觉压抑。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },

  'column'(c) {
    const cs = CASES.find(x => x.title === '工厂安全培训') || CASES[21];
    const body = '安全培训不能只念制度，要把风险翻译成岗位动作。哪些动作能做、哪些动作禁止，必须在一页里讲清楚。';
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">栏宽＝把长正文拆成适合阅读的栏宽，长行不再丢行</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">长行难读</button>
          <button class="demo-btn active" data-m="good">双栏可读</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'双栏可读', tagBad:'长行难读',
        good: () => svgRect(60,120,400,340,'#ffffff',16,'rgba(26,51,0,.12)')
          + demoSvgLines(82,160,demoWrap(body,14,8),15,SVG_INK,500,25)
          + svgRect(500,120,380,340,'#ffffff',16,'rgba(26,51,0,.12)')
          + demoSvgLines(522,160,demoWrap('叉车通道新增14处标识。高温设备复检周期缩短到7天。新员工必须完成3项演练。异常上报10分钟内响应。',14,8),15,SVG_INK,500,25)
          + `<line x1="480" y1="120" x2="480" y2="460" stroke="#cb5521" stroke-width="1" stroke-dasharray="6 6" opacity=".5"/>`
          + svgTxt(480,470,'≈ 1/2 页宽',12,SVG_MUTED,'','middle'),
        bad: () => svgRect(60,120,820,200,'#ffffff',16,'rgba(26,51,0,.12)')
          + demoSvgLines(82,160,demoWrap(body + body,40,5),15,SVG_INK,500,28)
          + `<text x="82" y="360" font-size="13" fill="#cb5521" font-weight="700">单行跨度过宽，眼睛换行容易丢位置</text>`
      });
      hint.textContent = mode === 'good' ? '双栏可读：每栏约 1/2 页宽，行长短、换行准，长文也能一口气读完。' : '长行难读：单行铺满整页，视线从左到右移动过长，换行时容易跳行。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },

  /* ---------- 效率与技巧 ---------- */
  'format-painter'(c) {
    let ci = Math.floor(Math.random()*CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="fpName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="fp">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="fpStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="paint">刷标题样式到正文</button><button class="demo-btn" data-m="clear">清除格式</button></div>' +
    '</div>';
    const stage = c.querySelector('#fpStage');
    const nameEl = c.querySelector('#fpName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m){
      const cs = CASES[ci];
      const p = (m === 'paint');
      const bStyle = p ? 'font:700 16px var(--font-display);color:#2f6f3a;line-height:1.45' : 'font:13px var(--font-body);color:#4a5a3a;line-height:1.5';
      stage.innerHTML = '<div style="height:100%;padding:16px;display:flex;flex-direction:column;gap:14px;justify-content:center">' +
        '<div style="font:700 20px var(--font-display);color:#2f6f3a">'+cs.title+'</div>' +
        '<div style="font:12px var(--font-body);color:#6b7280">正文（'+(p?'已刷上标题样式':'默认正文样式')+'）</div>' +
        '<div style="'+bStyle+'">'+cs.body+'</div>' +
      '</div>';
    }
    fill(); render('paint');
    c.querySelectorAll('[data-m]:not([data-m="fp"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="fp"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="paint"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="fp"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="fp"])'); render(act ? act.dataset.m : 'paint'); };
  },
  shortcut(c) {
    let ci = Math.floor(Math.random()*CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="scName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="sc">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="scStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="basic">基础</button><button class="demo-btn" data-m="adv">进阶</button></div>' +
    '</div>';
    const stage = c.querySelector('#scStage');
    const nameEl = c.querySelector('#scName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m){
      const cs = CASES[ci];
      const adv = (m === 'adv');
      const basic = [['Ctrl+C','复制选中对象'],['Ctrl+V','粘贴'],['Ctrl+Z','撤销上一步'],['Ctrl+D','快速再制']];
      const advL = [['F4','重复上一步操作'],['Ctrl+Shift+C','格式刷取格式'],['Alt+F10','打开选择窗格'],['Ctrl+G','组合对象']];
      const list = adv ? advL : basic;
      let rows = '';
      for (let i=0;i<list.length;i++){
        rows += '<div style="display:flex;justify-content:space-between;padding:6px 8px;border-bottom:1px solid rgba(26,51,0,.08);font:12px var(--font-body);color:#1a3300"><span>'+list[i][0]+'</span><span style="color:#6b7280">'+list[i][1]+'</span></div>';
      }
      stage.innerHTML = '<div style="height:100%;padding:14px;display:flex;flex-direction:column;gap:8px">' +
        '<div style="font:700 14px var(--font-display);color:#2f6f3a">'+cs.title+' · 快捷键速查</div>' +
        '<div style="background:#fff;border-radius:8px;overflow:hidden">'+rows+'</div>' +
      '</div>';
    }
    fill(); render('basic');
    c.querySelectorAll('[data-m]:not([data-m="sc"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="sc"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="basic"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="sc"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="sc"])'); render(act ? act.dataset.m : 'basic'); };
  },
  distribute(c) {
    let ci = Math.floor(Math.random()*CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="dbName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="db">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="dbStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="even">等距分布</button><button class="demo-btn" data-m="uneven">参差排布</button></div>' +
    '</div>';
    const stage = c.querySelector('#dbStage');
    const nameEl = c.querySelector('#dbName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function buildBlocks(){
      const cs = CASES[ci];
      const labels = cs.points.slice(0,3);
      let h = '';
      for (let i=0;i<3;i++){
        h += '<div class="db-blk" style="transition:all .45s ease;flex:1;height:54px;border-radius:8px;background:rgba(47,111,58,'+(0.25+0.25*i)+');display:flex;align-items:center;justify-content:center;font:11px var(--font-body);color:#fff;text-align:center;padding:4px">'+labels[i]+'</div>';
      }
      stage.innerHTML = '<div style="height:100%;padding:16px;display:flex;flex-direction:column;gap:10px;justify-content:center">' +
        '<div style="font:700 14px var(--font-display);color:#2f6f3a">'+cs.title+' · 横向分布</div>' +
        '<div id="dbRow" style="display:flex;gap:10px;align-items:flex-start"></div></div>';
      c.querySelector('#dbRow').innerHTML = h;
    }
    function render(m){
      buildBlocks();
      const blks = stage.querySelectorAll('.db-blk');
      for (let i=0;i<blks.length;i++){
        if (m === 'even') blks[i].style.marginTop = '0px';
        else blks[i].style.marginTop = (i*22)+'px';
      }
    }
    fill(); render('even');
    c.querySelectorAll('[data-m]:not([data-m="db"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="db"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="even"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="db"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="db"])'); render(act ? act.dataset.m : 'even'); };
  },
  'color-reuse'(c) {
    let ci = Math.floor(Math.random()*CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="crName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="cr">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="crStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="pick">取色并填充</button><button class="demo-btn" data-m="reset">还原</button></div>' +
    '</div>';
    const stage = c.querySelector('#crStage');
    const nameEl = c.querySelector('#crName');
    const ACOLOR = '#2f6f3a';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m){
      const cs = CASES[ci];
      const picked = (m === 'pick');
      const bColor = picked ? ACOLOR : '#cfd6c4';
      stage.innerHTML = '<div style="height:100%;padding:16px;display:flex;flex-direction:column;gap:12px;justify-content:center;align-items:center">' +
        '<div style="font:700 13px var(--font-display);color:#2f6f3a;align-self:flex-start">'+cs.title+' · 取色复用</div>' +
        '<div style="display:flex;gap:18px;align-items:center">' +
          '<div style="width:70px;height:70px;border-radius:12px;background:'+ACOLOR+';display:flex;align-items:center;justify-content:center;font:11px var(--font-body);color:#fff;transition:all .3s">源色</div>' +
          '<div style="font:20px var(--font-mono);color:#9bb08a">→</div>' +
          '<div style="width:70px;height:70px;border-radius:12px;background:'+bColor+';display:flex;align-items:center;justify-content:center;font:11px var(--font-body);color:#1a3300;transition:all .4s">'+(picked?'已吸色':'目标')+'</div>' +
        '</div>' +
        '<div style="font:11px var(--font-body);color:#6b7280">点击「取色」把 A 的颜色复制到 B</div>' +
      '</div>';
    }
    fill(); render('pick');
    c.querySelectorAll('[data-m]:not([data-m="cr"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="cr"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="pick"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="cr"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="cr"])'); render(act ? act.dataset.m : 'pick'); };
  },
  'vector-vs-raster'(c) {
    let ci = Math.floor(Math.random()*CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="vrName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="vr">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="vrStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="big">放大</button><button class="demo-btn" data-m="small">还原</button></div>' +
    '</div>';
    const stage = c.querySelector('#vrStage');
    const nameEl = c.querySelector('#vrName');
    const STAR = 'M50 8 L61 38 L93 38 L67 58 L78 90 L50 70 L22 90 L33 58 L7 38 L39 38 Z';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m){
      const cs = CASES[ci];
      const big = (m === 'big');
      const sz = big ? 150 : 80;
      const blur = big ? 'filter:blur(3px)' : 'filter:blur(1.5px)';
      const vec = '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style="width:'+sz+'px;height:'+sz+'px"><path d="'+STAR+'" fill="#2f6f3a"/></svg>';
      const ras = '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style="width:'+sz+'px;height:'+sz+'px;'+blur+'"><path d="'+STAR+'" fill="#2f6f3a"/></svg>';
      stage.innerHTML = '<div style="height:100%;padding:14px;display:flex;flex-direction:column;gap:8px;justify-content:center">' +
        '<div style="font:700 13px var(--font-display);color:#2f6f3a;text-align:center">'+cs.title+' · 放大看区别</div>' +
        '<div style="display:flex;gap:14px;justify-content:center;align-items:flex-end">' +
          '<div style="text-align:center"><div style="width:'+sz+'px;height:'+sz+'px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(26,51,0,.15);border-radius:8px">'+vec+'</div><div style="font:11px var(--font-body);color:#2f6f3a;margin-top:4px">矢量（清晰）</div></div>' +
          '<div style="text-align:center"><div style="width:'+sz+'px;height:'+sz+'px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(26,51,0,.15);border-radius:8px">'+ras+'</div><div style="font:11px var(--font-body);color:#cb5521;margin-top:4px">位图（发虚）</div></div>' +
        '</div>' +
      '</div>';
    }
    fill(); render('big');
    c.querySelectorAll('[data-m]:not([data-m="vr"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="vr"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="big"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="vr"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="vr"])'); render(act ? act.dataset.m : 'big'); };
  },
  compress(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="cpName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="cp">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="hi">高质量</button>
          <button class="demo-btn" data-m="med">中质量</button>
          <button class="demo-btn" data-m="lo">低质量</button>
        </div>
        <div class="demo-row" id="cpStage" style="justify-content:center;align-items:center;min-height:140px;background:rgba(10,14,24,.32);border-radius:10px;gap:18px"></div>
        <div class="demo-label" id="cpHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#cpName');
    const stage = c.querySelector('#cpStage');
    const hint = c.querySelector('#cpHint');
    let cur = 'hi';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function photo(blur){
      return '<div style="width:130px;height:88px;border-radius:10px;background:linear-gradient(135deg,#6a8cff,#b06ab3);filter:blur(' + blur + 'px);box-shadow:0 6px 18px rgba(0,0,0,.3)"></div>';
    }
    function render(){
      const cs = CASES[ci];
      const opt = { hi:['0px','4.2 MB'], med:['2px','1.1 MB'], lo:['5px','320 KB'] };
      const o = opt[cur];
      stage.innerHTML = '<div style="text-align:center"><div style="font:11px sans-serif;color:#c2cfe0;margin-bottom:6px">原图</div>' + photo('0') + '</div>'
        + '<div style="font:22px sans-serif;color:#c2cfe0">→</div>'
        + '<div style="text-align:center"><div style="font:11px sans-serif;color:#c2cfe0;margin-bottom:6px">压缩后 · ' + o[1] + '</div>' + photo(o[0]) + '</div>';
      hint.textContent = '案例「' + cs.title + '」配图：压到 ' + o[1] + ' 仍清晰可用。';
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="cp"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="cp"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="cp"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },

  /* ---------- 图形与图示 ---------- */
  'boolean'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="bgName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="bg">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="union">合并(并集)</button>
          <button class="demo-btn" data-m="intersect">相交</button>
          <button class="demo-btn" data-m="subtract">减除</button>
          <button class="demo-btn" data-m="exclude">异或</button>
        </div>
        <div class="demo-row" id="bgStage" style="justify-content:center;align-items:center;min-height:150px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="bgHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#bgName');
    const stage = c.querySelector('#bgStage');
    const hint = c.querySelector('#bgHint');
    let cur = 'union';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function srcShapes(){
      return '<div style="position:relative;width:100px;height:84px">'
        + '<div style="position:absolute;left:2px;top:12px;width:56px;height:56px;border-radius:50%;background:#e2574c;opacity:.85"></div>'
        + '<div style="position:absolute;left:42px;top:12px;width:56px;height:56px;background:#3a7bd5;opacity:.85"></div></div>';
    }
    function resShapes(m){
      if (m === 'union') return '<div style="position:relative;width:100px;height:84px">'
        + '<div style="position:absolute;left:2px;top:12px;width:56px;height:56px;border-radius:50%;background:#e2574c"></div>'
        + '<div style="position:absolute;left:42px;top:12px;width:56px;height:56px;background:#3a7bd5;mix-blend-mode:screen"></div></div>';
      if (m === 'intersect') return '<div style="width:56px;height:56px;background:#9b59b6;border-radius:14px"></div>';
      if (m === 'subtract') return '<div style="position:relative;width:100px;height:84px">'
        + '<div style="position:absolute;left:2px;top:12px;width:56px;height:56px;border-radius:50%;background:#e2574c"></div>'
        + '<div style="position:absolute;left:42px;top:12px;width:56px;height:56px;background:rgba(10,14,24,.92);border-radius:8px"></div></div>';
      return '<div style="position:relative;width:100px;height:84px">'
        + '<div style="position:absolute;left:2px;top:12px;width:56px;height:56px;border-radius:50%;background:#e2574c"></div>'
        + '<div style="position:absolute;left:42px;top:12px;width:56px;height:56px;background:#3a7bd5"></div>'
        + '<div style="position:absolute;left:42px;top:12px;width:56px;height:56px;background:rgba(10,14,24,.92);border-radius:8px"></div></div>';
    }
    function render(){
      const cs = CASES[ci];
      const labels = { union:'合并(并集)：两形相加成一个', intersect:'相交：只留重叠部分', subtract:'减除：A 减去 B', exclude:'异或：只留不重叠部分' };
      stage.innerHTML = '<div style="display:flex;align-items:center;gap:16px">'
        + '<div style="text-align:center"><div style="font:11px sans-serif;color:#c2cfe0;margin-bottom:6px">原形状 A / B</div>' + srcShapes() + '</div>'
        + '<div style="font:22px sans-serif;color:#c2cfe0">→</div>'
        + '<div style="text-align:center"><div style="font:11px sans-serif;color:#c2cfe0;margin-bottom:6px">结果</div>' + resShapes(cur) + '</div></div>';
      hint.textContent = '案例「' + cs.title + '」的图标可以这样拼：' + labels[cur];
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="bg"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="bg"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="bg"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },

  'icon-style'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="icsName">案例加载中…</span>
          <button class="demo-btn" data-m="ics">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="icsStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="ln">线性</button><button class="demo-btn" data-m="fl">填充</button><button class="demo-btn" data-m="du">双色</button><button class="demo-btn" data-m="ft">扁平</button></div>
      </div>`;
    const stage = c.querySelector('#icsStage');
    const nameEl = c.querySelector('#icsName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    function iconSVG(style){
      let fillC, strokeC;
      if(style==='ln'){ strokeC='#3a8a8a'; fillC='none'; }
      else if(style==='fl'){ strokeC='none'; fillC='#3a8a8a'; }
      else if(style==='du'){ strokeC='#3a8a8a'; fillC='rgba(58,138,138,.35)'; }
      else { strokeC='none'; fillC='#e46d4c'; }
      return '<svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid meet" style="width:54px;height:54px"><circle cx="30" cy="30" r="22" fill="'+fillC+'" stroke="'+strokeC+'" stroke-width="3"/><circle cx="30" cy="30" r="9" fill="'+strokeC+'"/></svg>';
    }
    const nm={ln:'线性描边',fl:'实心填充',du:'双色',ft:'扁平色块'};
    stage.innerHTML='<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;color:#c2cfe0">'+iconSVG(m)+'<div style="font:700 14px var(--font-display);color:#3a8a8a;text-align:center">'+cs.title+'</div><div style="font:11px Inter,sans-serif;color:#7e8aa0">'+nm[m]+'</div></div>';

    }
    fill(); render('ln');
    c.querySelectorAll('[data-m]:not([data-m="ics"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="ics"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="ln"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="ics"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="ics"])'); render(act ? act.dataset.m : 'ln'); };
  },
  'chart-beauty'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="cbName">案例加载中…</span>
          <button class="demo-btn" data-m="cb">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="cbStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="before">美化前</button><button class="demo-btn" data-m="after">美化后</button></div>
      </div>`;
    const stage = c.querySelector('#cbStage');
    const nameEl = c.querySelector('#cbName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    function chartHtml(items,color,grid){
      let s='<svg viewBox="0 0 220 100" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">';
      if(grid){ s+='<line x1="15" y1="15" x2="15" y2="85" stroke="#56657f"/><line x1="15" y1="85" x2="210" y2="85" stroke="#56657f"/>'; for(let g=1;g<4;g++){ s+='<line x1="15" y1="'+(85-g*17)+'" x2="210" y2="'+(85-g*17)+'" stroke="#3a4252" stroke-dasharray="2 3"/>'; } }
      const n=items.length, slot=190/n;
      items.forEach(function(it,i){ const h=12+it.v*68; const x=20+i*slot+4; s+='<rect x="'+x+'" y="'+(85-h)+'" width="'+(slot-10)+'" height="'+h+'" rx="2" fill="'+color+'"/>'; });
      s+='</svg>'; return s;
    }
    const items=cs.points.slice(0,4).map(function(p,i){return {l:p,v:[0.7,0.45,0.9,0.6][i%4]};});
    const color = m==='after' ? '#3a8a8a' : '#8a93a5';
    const grid = m!=='after';
    const chart = chartHtml(items,color,grid);
    stage.innerHTML = '<div style="height:100%;display:flex;flex-direction:column;gap:8px;padding:12px"><div style="font:700 13px var(--font-display);color:#3a8a8a">'+(m==='after'?'美化后':'美化前')+'</div><div style="flex:1;background:'+(grid?'rgba(0,0,0,.12)':'transparent')+';border-radius:8px;padding:6px">'+chart+'</div><div style="font:11px Inter,sans-serif;color:#7e8aa0;text-align:center">'+cs.title+'</div></div>';

    }
    fill(); render('after');
    c.querySelectorAll('[data-m]:not([data-m="cb"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="cb"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="after"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="cb"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="cb"])'); render(act ? act.dataset.m : 'after'); };
  },
  'smartart-to-shape'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="saName">案例加载中…</span>
          <button class="demo-btn" data-m="sa">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="saStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="smart">智能图形</button><button class="demo-btn" data-m="shape">可编辑形状</button></div>
      </div>`;
    const stage = c.querySelector('#saStage');
    const nameEl = c.querySelector('#saName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    if(m==='smart'){
      let inner='<div style="font:700 13px var(--font-display);color:#3a8a8a;margin-bottom:8px">'+cs.title+'</div>';
      inner+=cs.points.slice(0,3).map(function(p){return '<div style="font:12px Inter,sans-serif;color:#c2cfe0;padding:6px 0;border-top:1px solid rgba(186,214,247,.2)">'+p+'</div>';}).join('');
      stage.innerHTML='<div style="height:100%;padding:16px;display:flex;align-items:center"><div style="width:100%;background:rgba(186,214,247,.08);border:1px solid rgba(186,214,247,.25);border-radius:10px;padding:14px">'+inner+'</div></div>';
    } else {
      let boxes='<div style="font:700 13px var(--font-display);color:#3a8a8a;background:rgba(58,138,138,.15);border:1px solid #3a8a8a;border-radius:8px;padding:8px;text-align:center">'+cs.title+'</div>';
      cs.points.slice(0,3).forEach(function(p){ boxes+='<div style="height:14px;width:2px;background:#7e8aa0;margin:0 auto"></div><div style="font:12px Inter,sans-serif;color:#c2cfe0;background:rgba(47,111,58,.15);border:1px solid #2f6f3a;border-radius:8px;padding:8px;text-align:center">'+p+'</div>'; });
      stage.innerHTML='<div style="height:100%;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0">'+boxes+'</div>';
    }

    }
    fill(); render('shape');
    c.querySelectorAll('[data-m]:not([data-m="sa"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="sa"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="shape"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="sa"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="sa"])'); render(act ? act.dataset.m : 'shape'); };
  },
  'export-pdf'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xep">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="no">不嵌入字体</button><button class="demo-btn" data-m="yes">嵌入字体</button></div>'
    + '<div class="demo-label" style="text-align:center">切换字体嵌入，看同一案例跨设备是否一致</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  if (m === 'no') {
    const tofu = cs.title.split('').map(function(ch){ return '■'; }).join('');
    stage.innerHTML = '<div style="position:absolute;inset:0;padding:14px;display:flex;flex-direction:column;gap:8px">'
      + '<div style="font:700 18px var(--font-display);color:#b04a3a">' + tofu + '</div>'
      + '<div style="font:11px var(--font-body);color:#b04a3a">对方电脑缺字体 → 标题乱码、版式错位</div>'
    + '</div>';
  } else {
    stage.innerHTML = '<div style="position:absolute;inset:0;padding:14px;display:flex;flex-direction:column;gap:8px">'
      + '<div style="font:700 16px var(--font-display);color:#1a3300">' + cs.title + '</div>'
      + '<div style="font:11px var(--font-body);color:#2f6f3a">字体一并打包进 PDF，任何电脑打开都一致</div>'
      + '<div style="font:11px var(--font-body);color:#4a5a3a">' + cs.subtitle + '</div>'
    + '</div>';
  }
  }
  fill(); render('yes');
  c.querySelectorAll('[data-m]:not([data-m="xep"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xep"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="yes"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xep"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xep"])'); render(act ? act.dataset.m : 'yes'); };
},


  'presenter-view'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xpv">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="aud">观众视图</button><button class="demo-btn" data-m="pres">演示者视图</button></div>'
    + '<div class="demo-label" style="text-align:center">双屏对比：观众看幻灯片 / 自己看备注+计时</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  if (m === 'pres') {
    stage.innerHTML = '<div style="position:absolute;inset:0;display:flex;background:#16203a">'
      + '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:12px;border-right:1px solid rgba(255,255,255,.15)">'
        + '<div style="font:700 12px var(--font-display);color:#eef3e6">' + cs.title + '</div>'
        + '<div style="margin-top:6px;font:14px var(--font-body);color:#bcd99b">' + cs.subtitle + '</div>'
      + '</div>'
      + '<div style="width:42%;padding:10px;display:flex;flex-direction:column;gap:6px">'
        + '<div style="font:10px var(--font-mono);color:#9fe3c5">⏱ 08:24 · 已讲 ' + cs.part + '</div>'
        + '<div style="font:10px var(--font-body);color:#c2cfe0;line-height:1.4">备注：' + cs.body + '</div>'
        + '<div style="margin-top:auto;font:10px var(--font-mono);color:#7e8aa0">下一页 ▶ ' + cs.partName + '</div>'
      + '</div>'
    + '</div>';
  } else {
    stage.innerHTML = '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#16203a">'
      + '<div style="font:700 18px var(--font-display);color:#eef3e6">' + cs.title + '</div>'
    + '</div>';
  }
  }
  fill(); render('pres');
  c.querySelectorAll('[data-m]:not([data-m="xpv"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xpv"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="pres"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xpv"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xpv"])'); render(act ? act.dataset.m : 'pres'); };
},


  'hyperlink'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xhl">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="p1">跳转到①</button><button class="demo-btn" data-m="p2">跳转到②</button><button class="demo-btn" data-m="p3">跳转到③</button></div>'
    + '<div class="demo-label" style="text-align:center">点目录项，体验超链接跳转</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  const idx = m === 'p1' ? 0 : (m === 'p2' ? 1 : 2);
  const toc = cs.points.slice(0,3).map(function(p, i){
    const on = i === idx;
    return '<div style="display:flex;align-items:center;gap:6px;padding:5px 8px;border-radius:6px;' + (on ? 'background:rgba(47,111,58,.15);border:1px solid #2f6f3a' : 'background:rgba(26,51,0,.05)') + '">'
      + '<span style="font:11px var(--font-mono);color:#2f6f3a">●</span>'
      + '<span style="font:11px var(--font-body);color:' + (on ? '#1a3300' : '#4a5a3a') + '">' + (i+1) + '. ' + p + '</span>'
      + (on ? '<span style="margin-left:auto;font:10px var(--font-mono);color:#2f6f3a">▶ 已跳转</span>' : '')
    + '</div>';
  }).join('');
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:6px">'
    + '<div style="font:700 13px var(--font-display);color:#1a3300">' + cs.title + ' · 目录</div>'
    + toc
  + '</div>';
  }
  fill(); render('p1');
  c.querySelectorAll('[data-m]:not([data-m="xhl"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xhl"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="p1"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xhl"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xhl"])'); render(act ? act.dataset.m : 'p1'); };
},


  autoplay(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  let apTimer = null;
  let apPage = 0;
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="ap">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row">'
      + '<button class="demo-btn" data-m="manual">手动</button>'
      + '<button class="demo-btn" data-m="auto">自动播放</button>'
    + '</div>'
    + '<div class="demo-label" style="text-align:center">自动模式下每 1.2 秒翻页</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
    if (apTimer) { clearInterval(apTimer); apTimer = null; }
    const cs = CASES[ci];
    const auto = m === 'auto';
    function paint(){
      stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px;background:' + (auto ? '#16203a' : '#fbfcf7') + '">'
        + '<div style="font:700 13px var(--font-display);color:' + (auto ? '#eef3e6' : '#1a3300') + '">' + cs.title + '</div>'
        + '<div style="font:12px var(--font-body);color:' + (auto ? '#bcd99b' : '#4a5a3a') + '">' + (cs.points[apPage] || cs.subtitle) + '</div>'
        + '<div style="margin-top:auto;height:4px;width:100%;background:rgba(26,51,0,.12);border-radius:2px;overflow:hidden"><div style="height:100%;width:' + (((apPage + 1) / cs.points.length) * 100) + '%;background:#2f6f3a"></div></div>'
        + '<div style="font:10px var(--font-mono);color:' + (auto ? '#9fe3c5' : '#2f6f3a') + '">' + (auto ? '▶ 自动播放 · 第 ' + (apPage + 1) + '/' + cs.points.length + ' 页' : '⏸ 手动模式') + '</div>'
      + '</div>';
    }
    paint();
    if (auto) { apTimer = setInterval(function(){ apPage = (apPage + 1) % cs.points.length; paint(); }, 1200); }
  }
  fill(); render('auto');
  c.querySelectorAll('[data-m]:not([data-m="ap"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="ap"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="auto"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="ap"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="ap"])'); render(act ? act.dataset.m : 'auto'); };
},


  /* ==================== 新增 17 条演示 ==================== */

  /* ---------- 软件功能 ---------- */
  theme(c) {
    // 真实案例：切主题 → 配色一整套联动换（同一份内容，不同气质）
    const TH = {
      youka: { name:'优卡绿', bg:'#fbfcf7', accent:'#2f6f3a', text:'#1a3300', sub:'#4a5a3a' },
      biz:   { name:'商务蓝', bg:'#f4f8fd', accent:'#3a7bd5', text:'#14233b', sub:'#3a4a63' },
      warm:  { name:'活力橙', bg:'#fdf6f1', accent:'#cb5521', text:'#3a2417', sub:'#7a4a32' },
      ink:   { name:'墨黑',   bg:'#1a1d22', accent:'#bcd99b', text:'#e8ecf0', sub:'#9aa6b2' },
    };
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="thName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="shuffle">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">切主题 → 配色一整套联动换（同一份内容，不同气质）</div>
        <div class="demo-row">
          <button class="demo-btn active" data-k="youka">优卡绿</button>
          <button class="demo-btn" data-k="biz">商务蓝</button>
          <button class="demo-btn" data-k="warm">活力橙</button>
          <button class="demo-btn" data-k="ink">墨黑</button>
        </div>
        <div class="demo-row" id="thSlides" style="gap:12px;flex-wrap:nowrap"></div>
      </div>`;
    const slides = c.querySelector('#thSlides');
    const nameEl = c.querySelector('#thName');
    let ci = Math.floor(Math.random() * CASES.length);
    let k = 'youka';
    function render() {
      const cs = CASES[ci]; const t = TH[k];
      nameEl.textContent = '案例：' + cs.title + ' · 主题「' + t.name + '」';
      slides.innerHTML = `
        <div class="mini-slide" style="flex:1;min-width:0;background:${t.bg}">
          <div style="position:absolute;top:40%;left:10%;right:10%;text-align:center">
            <div style="font:700 20px var(--font-body);color:${t.text}">${cs.title}</div>
            <div style="height:3px;width:40px;background:${t.accent};margin:10px auto;border-radius:2px"></div>
            <div style="font:13px var(--font-body);color:${t.sub}">${cs.subtitle}</div>
          </div>
        </div>
        <div class="mini-slide" style="flex:1;min-width:0;background:${t.bg}">
          <div style="position:absolute;top:12%;left:9%;right:9%;color:${t.text}">
            <div style="font:700 15px var(--font-body)">${cs.title}</div>
            <div style="height:3px;width:28px;background:${t.accent};margin:6px 0 9px;border-radius:2px"></div>
            <div style="display:flex;flex-direction:column;gap:5px">${cs.points.slice(0,3).map(p => `<div class="ly-li" style="color:${t.text};--ly-bullet:${t.accent}">${p}</div>`).join('')}</div>
          </div>
          <div style="position:absolute;bottom:9%;right:9%;padding:4px 12px;background:${t.accent};border-radius:999px;color:#fff;font:11px var(--font-body)">${t.name}</div>
        </div>`;
    }
    render();
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { ci = Math.floor(Math.random() * CASES.length); render(); });
    c.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { k = b.dataset.k; c.querySelectorAll('[data-k]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(); });
  },

  'selection-pane'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    const layers = [
      { id: 'L1', name: '背景色块', color: 'rgba(47,111,58,.35)', pos: 'top:14%;left:8%;width:84%;height:70%' },
      { id: 'L2', name: '标题文字', color: 'rgba(26,51,0,.9)', pos: 'top:26%;left:16%;width:50%;height:14%' },
      { id: 'L3', name: '配图', color: 'rgba(203,85,33,.7)', pos: 'top:50%;left:64%;width:22%;height:38%;border-radius:50%' },
    ];
    const vis = { L1: true, L2: true, L3: true };
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="spName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="sp">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">点「眼睛」显示 / 隐藏对应图层</div>
        <div class="demo-row" style="gap:20px;align-items:flex-start">
          <div style="flex:0 0 150px;display:flex;flex-direction:column;gap:8px" id="spList"></div>
          <div class="mini-slide" id="spStage" style="flex:1;min-width:160px"></div>
        </div>
      </div>`;
    const list = c.querySelector('#spList'), stage = c.querySelector('#spStage'), nameEl = c.querySelector('#spName');
    function renderStage() {
      stage.innerHTML = '';
      layers.forEach(l => { if (vis[l.id]) { const d = document.createElement('div'); d.style.cssText = `position:absolute;${l.pos};background:${l.color};border-radius:${l.pos.includes('50%') ? '50%' : '6px'}`; stage.appendChild(d); } });
    }
    function renderList() {
      list.innerHTML = '';
      layers.forEach(l => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:7px 10px;background:rgba(26,51,0,.05);border:1px solid var(--color-glass-edge);border-radius:8px';
        row.innerHTML = `<span style="cursor:pointer;font-size:15px;opacity:${vis[l.id] ? 1 : .3}">${vis[l.id] ? '👁' : '🚫'}</span><span style="font:13px var(--font-body);color:var(--color-frost-glow)">${l.name}</span>`;
        row.querySelector('span').onclick = () => { vis[l.id] = !vis[l.id]; renderList(); renderStage(); };
        list.appendChild(row);
      });
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); renderList(); renderStage();
    c.querySelector('[data-m="sp"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },

  'z-order'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="zName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="z">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">选中一个元素 → 置于顶层 / 底层</div>
        <div class="demo-row"><button class="demo-btn" data-a="front">▲ 置于顶层</button><button class="demo-btn" data-a="back">▼ 置于底层</button></div>
        <div class="mini-slide" id="zStage" style="position:relative"></div>
      </div>`;
    const stage = c.querySelector('#zStage'), nameEl = c.querySelector('#zName');
    const blocks = [
      { id: 'A', label: '标题', color: '#2f6f3a', x: '16%', y: '18%' },
      { id: 'B', label: '配图', color: '#3a7bd5', x: '34%', y: '34%' },
      { id: 'C', label: '装饰', color: '#cb5521', x: '52%', y: '50%' },
    ];
    let order = ['A', 'B', 'C'], sel = 'A';
    function render() {
      stage.innerHTML = '';
      const cs = CASES[ci];
      blocks.forEach(b => {
        const z = order.indexOf(b.id);
        const text = b.id === 'A' ? cs.title : (b.id === 'B' ? '配图' : '装饰');
        const d = document.createElement('div');
        d.style.cssText = `position:absolute;left:${b.x};top:${b.y};width:40%;height:46%;background:${b.color};border-radius:10px;z-index:${z};display:flex;align-items:center;justify-content:center;color:#ffffff;font:15px var(--font-display);cursor:pointer;box-shadow:0 6px 16px rgba(26,51,0,.35);outline:${sel === b.id ? '2px solid #ffffff' : 'none'};outline-offset:2px;text-align:center;padding:6px`;
        d.textContent = text;
        d.onclick = () => { sel = b.id; render(); };
        stage.appendChild(d);
      });
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render();
    c.querySelectorAll('[data-a]').forEach(btn => btn.onclick = () => {
      order = order.filter(x => x !== sel);
      if (btn.dataset.a === 'front') order.push(sel); else order.unshift(sel);
      render();
    });
    c.querySelector('[data-m="z"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(); };
  },

  group(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="grName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="gr">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn active" data-g="on">已组合</button><button class="demo-btn" data-g="off">取消组合</button><button class="demo-btn" data-a="move">↔ 移动</button></div>
        <div class="mini-slide" id="grStage" style="position:relative"></div>
        <div class="demo-label" id="grHint">组合状态：标题与副标题一起移动，不散架</div>
      </div>`;
    const stage = c.querySelector('#grStage'), nameEl = c.querySelector('#grName');
    let grouped = true, moved = false;
    function render() {
      const shift = moved ? 90 : 0;
      const cs = CASES[ci];
      stage.innerHTML = `
        <div style="position:absolute;top:24%;left:12%;transform:translateX(${grouped ? shift : shift}px);transition:transform .5s ease;width:36%;height:22%;background:rgba(47,111,58,.5);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font:14px var(--font-body);padding:6px;text-align:center">${cs.title}</div>
        <div style="position:absolute;top:54%;left:50%;transform:translateX(${grouped ? shift : 0}px);transition:transform .5s ease;width:36%;height:18%;background:rgba(203,85,33,.5);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font:13px var(--font-body);padding:6px;text-align:center">${cs.subtitle}</div>`;
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render();
    c.querySelectorAll('[data-g]').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-g]').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      grouped = b.dataset.g === 'on'; moved = false; render();
      c.querySelector('#grHint').textContent = grouped ? '组合状态：标题与副标题一起移动，不散架' : '取消组合：点移动只有标题动，副标题不跟';
    });
    c.querySelector('[data-a]').onclick = () => { moved = !moved; render(); };
    c.querySelector('[data-m="gr"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); moved = false; render(); };
  },

  designer(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="dgName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="dg">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">朴素内容 → 点「生成设计建议」挑版式</div>
        <button class="demo-btn" id="dgGo" style="align-self:flex-start">✨ 生成设计建议</button>
        <div class="demo-row" id="dgOptions" style="display:none"></div>
        <div class="mini-slide" id="dgStage" style="padding:18px;display:flex;flex-direction:column;justify-content:center;gap:8px"></div>
      </div>`;
    const stage = c.querySelector('#dgStage'), opts = c.querySelector('#dgOptions'), nameEl = c.querySelector('#dgName');
    function plain() { const cs = CASES[ci]; stage.style.background = ''; stage.innerHTML = `<div style="font:14px var(--font-body);color:var(--color-moon-mist)">${cs.title}</div><div style="font:13px var(--font-body);color:var(--color-fog-veil)">${cs.subtitle}</div>`; }
    const designs = [
      () => { const cs = CASES[ci]; stage.style.background = '#2f6f3a'; stage.innerHTML = `<div style="font:600 26px var(--font-display);color:#ffffff">${cs.points[0] || ''}</div><div style="font:13px var(--font-body);color:rgba(255,255,255,.85)">${cs.title} · ${cs.subtitle}</div>`; },
      () => { const cs = CASES[ci]; stage.style.background = 'linear-gradient(135deg,#fbfcf7,#e3ecd9)'; stage.innerHTML = `<div style="display:flex;gap:12px;align-items:center"><div style="font:600 30px var(--font-display);color:#2f6f3a">${cs.points[0] || ''}</div><div style="font:12px var(--font-body);color:rgba(26,51,0,.7)">${cs.title}<br>${cs.subtitle}</div></div>`; },
      () => { const cs = CASES[ci]; stage.style.background = 'linear-gradient(135deg,#fbfcf7,#d4e3c0)'; stage.innerHTML = `<div style="font:600 18px var(--font-display);color:#2f6f3a">${cs.title}</div><div style="height:5px;width:50%;background:#2f6f3a;border-radius:3px"></div><div style="font:13px var(--font-body);color:rgba(26,51,0,.7)">${cs.subtitle} · ${cs.points[0] || ''}</div>`; },
    ];
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); plain();
    c.querySelector('#dgGo').onclick = () => {
      opts.style.display = 'flex';
      opts.innerHTML = '';
      designs.forEach((fn, i) => { const b = document.createElement('button'); b.className = 'demo-btn'; b.textContent = '方案' + (i + 1); b.onclick = () => { opts.querySelectorAll('.demo-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); fn(); }; opts.appendChild(b); });
      designs[0](); opts.querySelector('.demo-btn').classList.add('active');
    };
    c.querySelector('[data-m="dg"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); plain(); opts.style.display = 'none'; };
  },

  /* ---------- 字体与配色 ---------- */
  'line-height'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="lhName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="lh">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">正文行距</span><span class="demo-label" id="lhVal">1.6</span></div>
        <input type="range" class="demo-slider" id="lhRange" min="1" max="2.6" step="0.1" value="1.6">
        <div class="mini-slide" id="lhSlide" style="position:relative;overflow:hidden;background:#fbfcf7">
          <div style="position:absolute;top:0;left:0;right:0;height:5px;background:#2f6f3a"></div>
          <div style="position:absolute;top:18px;left:20px;right:20px;bottom:16px;overflow-y:auto">
            <div id="lhTitle" style="font:700 17px var(--font-body);color:#1a3300;margin-bottom:4px"></div>
            <div style="width:34px;height:3px;background:#2f6f3a;border-radius:2px;margin-bottom:12px"></div>
            <p id="lhText" style="font:13.5px/1.6 var(--font-body);color:#3a4a2a;margin:0"></p>
          </div>
        </div>
      </div>`;
    const range = c.querySelector('#lhRange'), text = c.querySelector('#lhText'), title = c.querySelector('#lhTitle'), val = c.querySelector('#lhVal'), nameEl = c.querySelector('#lhName');
    function setText() {
      var cs = CASES[ci];
      title.textContent = cs.title;
      text.innerHTML = cs.body + ' 具体做法包括：' + cs.points.map(function(p) { return '<br><br>\u2022 ' + p; }).join('') + '<br><br>这样调整之后，整页 PPT 的可读性会明显提升，观众不需要费力辨认每一行文字。';
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); setText();
    range.oninput = () => { text.style.lineHeight = range.value; val.textContent = Number(range.value).toFixed(1); };
    c.querySelector('[data-m="lh"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); setText(); };
  },
  'muted-color'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="mcName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="mc">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="muted">莫兰迪灰</button>
          <button class="demo-btn" data-m="vivid">高饱和</button>
        </div>
        <div class="mini-slide" id="mcStage" style="background:#fbfcf7;position:relative;overflow:hidden">
          <div id="mcBox" style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:24px">
            <div id="mcTitle" style="font:700 26px var(--font-display);margin-bottom:8px"></div>
            <div id="mcSub" style="font:14px var(--font-body);margin-bottom:18px"></div>
            <div style="display:flex;gap:8px;justify-content:center">
              <div class="mc-chip" style="padding:6px 14px;border-radius:999px;font:12px var(--font-body)"></div>
              <div class="mc-chip" style="padding:6px 14px;border-radius:999px;font:12px var(--font-body)"></div>
              <div class="mc-chip" style="padding:6px 14px;border-radius:999px;font:12px var(--font-body)"></div>
            </div>
          </div>
        </div>
        <div class="demo-label" id="mcCap" style="text-align:center"></div>
      </div>`;
    const nameEl = c.querySelector('#mcName'), cap = c.querySelector('#mcCap'), box = c.querySelector('#mcBox');
    let mode = 'muted';
    const palettes = {
      muted: { title: '#5c6b5e', sub: '#7a897d', chipBg: ['#8aa199','#a8b5a8','#c4cec4'], chipText: '#ffffff', label: '莫兰迪灰：降低饱和度，视觉柔和显高级' },
      vivid:   { title: '#cb5521', sub: '#2f6f3a', chipBg: ['#e63946','#2a9d8f','#3a7bd5'], chipText: '#ffffff', label: '高饱和：颜色抢眼但刺眼，像促销海报' }
    };
    function render() {
      const p = palettes[mode];
      c.querySelector('#mcTitle').style.color = p.title;
      c.querySelector('#mcSub').style.color = p.sub;
      c.querySelectorAll('.mc-chip').forEach((d, i) => { d.style.background = p.chipBg[i]; d.style.color = p.chipText; });
      cap.textContent = '《' + CASES[ci].title + '》' + p.label;
    }
    function fill() {
      const cs = CASES[ci];
      nameEl.textContent = '案例：' + cs.title;
      c.querySelector('#mcTitle').textContent = cs.title;
      c.querySelector('#mcSub').textContent = cs.subtitle;
      const pts = cs.points.slice(0, 3);
      c.querySelectorAll('.mc-chip').forEach((d, i) => { d.textContent = pts[i] || '要点 ' + (i + 1); });
      render();
    }
    fill();
    c.querySelectorAll('[data-m]:not([data-m="mc"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="mc"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); mode = b.dataset.m; render();
    });
    c.querySelector('[data-m="mc"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },
  'morph'(c) {
    var ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = '<div class="demo-stack"><div class="demo-row demo-top"><span class="demo-label" id="moName">案例加载中…</span><button class="demo-btn" data-m="mo">\u21bb 换一个真实案例</button></div><div class="mini-slide" id="moStage" style="position:relative;overflow:hidden;background:#fbfcf7"><div style="position:absolute;top:0;left:0;right:0;height:5px;background:#2f6f3a"></div><div id="moSlideA" style="position:absolute;inset:0;padding:10% 12%;display:flex;flex-direction:column;gap:8px"><div id="moTitleA" style="font:700 18px var(--font-body);color:#1a3300"></div><div style="width:36px;height:3px;background:#2f6f3a;border-radius:2px"></div><div id="moBodyA" style="display:flex;flex-direction:column;gap:5px;font:13px var(--font-body);color:#1a3300"></div></div><div id="moSlideB" style="position:absolute;inset:0;padding:10% 14%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:rgba(26,51,0,.93)"><div id="moPartB" style="font:700 38px var(--font-mono);color:#bcd99b;line-height:1"></div><div id="moNameB" style="margin-top:8px;font:15px var(--font-body);color:#eef3e6"></div><div id="moSubB" style="margin-top:6px;font:11px var(--font-mono);color:rgba(238,243,230,.45)"></div></div><div style="position:absolute;bottom:5px;left:12px;right:12px;display:flex;justify-content:space-between;font:9px var(--font-mono);color:rgba(26,51,0,.4)"><span id="moFoot"></span><span id="moPg">1</span></div></div><div class="demo-row"><button class="demo-btn active" id="moBtnMorph">\u25b6 平滑 Morph 切换</button><button class="demo-btn" id="moBtnCut">\u25b6 生硬直接跳</button><button class="demo-btn" id="moReplay">\u21bb 重播</button></div><div class="demo-label" id="moHint" style="text-align:center">点上方按钮播放切换效果对比</div></div>';
    var stage = c.querySelector('#moStage');
    var nameEl = c.querySelector('#moName');
    var hintEl = c.querySelector('#moHint');
    var btnMorph = c.querySelector('#moBtnMorph');
    var btnCut = c.querySelector('#moBtnCut');
    var btnReplay = c.querySelector('#moReplay');
    var slideB = c.querySelector('#moSlideB');
    var mode = 'morph';
    function fill() { var cs = CASES[ci]; nameEl.textContent = '\u6848\u4f8b\uff1a' + cs.title; c.querySelector('#moTitleA').textContent = cs.title; c.querySelector('#moBodyA').innerHTML = cs.points.slice(0,3).map(function(p){return '<div>\u2022 '+p+'</div>';}).join(''); c.querySelector('#moPartB').textContent = 'PART ' + cs.part; c.querySelector('#moNameB').textContent = cs.partName; c.querySelector('#moSubB').textContent = cs.title; c.querySelector('#moFoot').textContent = cs.footer; }
    function reset() { slideB.style.transition = 'none'; slideB.style.opacity = '0'; slideB.style.transform = 'scale(1.05) translateY(8px)'; c.querySelector('#moPg').textContent = '1'; }
    function play(m) { reset(); hintEl.textContent = m === 'morph' ? '\u2728 Morph\uff1a\u5143\u7d20\u5e73\u6ed1\u53d8\u5f62 + \u6de1\u5165\u6de1\u51fa' : '\u2606 \u76f4\u63a5\u5207\uff1a\u65e0\u52a8\u753b\uff0c\u77ac\u95f4\u8df3\u8f6c'; requestAnimationFrame(function() { if (m === 'morph') { slideB.style.transition = 'opacity .65s ease, transform .65s cubic-bezier(.22,1,.36,1)'; } else { slideB.style.transition = 'none'; } slideB.style.opacity = '1'; slideB.style.transform = 'scale(1) translateY(0)'; c.querySelector('#moPg').textContent = '2'; }); }
    fill(); reset();
    btnMorph.onclick = function() { mode = 'morph'; btnMorph.classList.add('active'); btnCut.classList.remove('active'); play('morph'); };
    btnCut.onclick = function() { mode = 'cut'; btnCut.classList.add('active'); btnMorph.classList.remove('active'); play('cut'); };
    btnReplay.onclick = function() { play(mode); };
    c.querySelector('[data-m="mo"]').onclick = function() { ci = Math.floor(Math.random() * CASES.length); fill(); reset(); };
  },  'motion-path'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="mpName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="mp">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="mpStage" style="position:relative;overflow:hidden">' +
          '<svg viewBox="0 0 300 160" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><path d="M10 140 C 80 140, 90 40, 160 50 S 270 70, 290 20" fill="none" stroke="rgba(47,111,58,.35)" stroke-width="2" stroke-dasharray="4 4"/></svg>' +
          '<div id="mpObj" style="position:absolute;top:0;left:0;padding:8px 12px;background:rgba(47,111,58,.85);border-radius:8px;color:#fff;font:12px var(--font-body);white-space:nowrap;offset-path:path(' + "'M10 140 C 80 140, 90 40, 160 50 S 270 70, 290 20'" + ');offset-rotate:0deg;offset-distance:0%"></div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="run">▶ 沿路径运动</button>' +
          '<button class="demo-btn" data-m="reset">⟲ 复位</button>' +
        '</div>' +
      '</div>';
    const obj = c.querySelector('#mpObj');
    const nameEl = c.querySelector('#mpName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){ obj.textContent = CASES[ci].title; }
    function run(){ obj.style.transition = 'none'; obj.style.offsetDistance = '0%'; requestAnimationFrame(function(){ obj.style.transition = 'offset-distance 1.6s cubic-bezier(.22,1,.36,1)'; obj.style.offsetDistance = '100%'; }); }
    function reset(){ obj.style.transition = 'none'; obj.style.offsetDistance = '0%'; }
    fill(); scene(); run();
    c.querySelectorAll('[data-m]:not([data-m="mp"])').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="mp"])').forEach(x => x.classList.remove('active'));
      btn.classList.add('active'); if (btn.dataset.m === 'run') run(); else reset();
    });
    const initBtn = c.querySelector('[data-m="run"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="mp"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); run(); };
  },  'anim-timing'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="aiName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="ai">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="aiStage" style="display:flex;align-items:center;justify-content:center;overflow:hidden">' +
          '<div id="aiObj" style="padding:14px 22px;background:rgba(47,111,58,.6);border-radius:12px;color:#fff;font:16px var(--font-body);text-align:center;max-width:78%;opacity:0;transform:translateY(18px)"></div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="fast">快 0.3s</button>' +
          '<button class="demo-btn" data-m="slow">慢 1.4s</button>' +
          '<button class="demo-btn" data-m="delay">延迟 0.6s</button>' +
        '</div>' +
      '</div>';
    const obj = c.querySelector('#aiObj');
    const nameEl = c.querySelector('#aiName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){ obj.textContent = CASES[ci].title; }
    function play(m){
      const d = m === 'fast' ? '0.3s' : (m === 'slow' ? '1.4s' : '0.6s');
      const delay = m === 'delay' ? '0.6s' : '0s';
      obj.style.transition = 'none'; obj.style.opacity = '0'; obj.style.transform = 'translateY(18px)';
      requestAnimationFrame(function(){ obj.style.transition = 'opacity ' + d + ' ease ' + delay + ', transform ' + d + ' cubic-bezier(.22,1,.36,1) ' + delay; obj.style.opacity = '1'; obj.style.transform = 'none'; });
    }
    fill(); scene(); play('fast');
    c.querySelectorAll('[data-m]:not([data-m="ai"])').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="ai"])').forEach(x => x.classList.remove('active'));
      btn.classList.add('active'); play(btn.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="fast"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="ai"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); const act = c.querySelector('[data-m].active:not([data-m="ai"])'); play(act ? act.dataset.m : 'fast'); };
  },

  'bleed'(c) { runCasePageDemo(c, 'bleed'); },

  'card-layout'(c) {
    const cs = CASES.find(x => x.title === '读书会年度计划') || CASES[23];
    const pts = cs.points.slice(0,3);
    function card(x,y,i,title,body) {
      return svgRect(x,y,260,160,'#ffffff',14,'rgba(26,51,0,.12)')
        + svgTxt(x+22,y+36,'0'+(i+1),20,'#2f6f3a',700,'',SVG_MONO)
        + svgTxt(x+22,y+70,title,16,SVG_INK,700)
        + demoSvgLines(x+22,y+100,demoWrap(body,12,2),13,SVG_MUTED,400,20);
    }
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">卡片式布局＝把并列要点装进卡片，扫读更轻松</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">纯文字列表</button>
          <button class="demo-btn active" data-m="good">卡片式</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'卡片式', tagBad:'纯文字列表',
        good: () => card(60,130,0,'每月共读',pts[0]) + card(350,130,1,'季度分享',pts[1]) + card(640,130,2,'轮流导读',pts[2])
          + svgTxt(480,340,'三张卡片横向对齐，信息分组清晰',14,SVG_MUTED,'','middle'),
        bad: () => svgRect(60,130,820,240,'#ffffff',14,'rgba(26,51,0,.12)')
          + svgTxt(82,166,'CASE · 纯文字列表',14,'#9ca3af',700)
          + demoSvgLines(82,210,pts.map(p => '· ' + p),16,SVG_INK,400,34)
          + svgTxt(480,410,'要点平铺成列表，缺少视觉分组',14,SVG_MUTED,'','middle')
      });
      hint.textContent = mode === 'good' ? '卡片式：并列要点各自成卡，边界清晰，比较和扫读都更轻松。' : '纯文字列表：要点挤在一起，没有分组，阅读费力。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },

  /* ---------- 图形与图示 ---------- */
  'image-mask'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="imName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="im">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="circle">圆形</button>
          <button class="demo-btn" data-m="round">圆角</button>
          <button class="demo-btn" data-m="star">星形</button>
        </div>
        <div class="demo-row" id="imStage" style="justify-content:center;align-items:center;min-height:150px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="imHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#imName');
    const stage = c.querySelector('#imStage');
    const hint = c.querySelector('#imHint');
    let cur = 'circle';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function photo(clip){
      return '<div style="width:120px;height:120px;background:linear-gradient(135deg,#ff9a6c,#ff6a88);' + clip + ';box-shadow:0 6px 18px rgba(0,0,0,.3)"></div>';
    }
    function clipFor(m){
      if (m === 'circle') return 'border-radius:50%';
      if (m === 'round') return 'border-radius:24px';
      return 'clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)';
    }
    function render(){
      const cs = CASES[ci];
      const labels = { circle:'圆形头像/Logo', round:'圆角卡片图', star:'星形点缀' };
      stage.innerHTML = photo(clipFor(cur));
      hint.textContent = '案例「' + cs.title + '」配图裁成' + labels[cur] + '，不变形。';
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="im"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="im"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="im"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },

  'data-viz'(c) {
    const twIdx = CASES.map((x,i)=>i).filter(i => CASES[i].tw && CASES[i].tw.aPts && CASES[i].tw.bPts);
    let ci = twIdx[Math.floor(Math.random() * twIdx.length)];
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="dvName">案例加载中…</span>
          <button class="demo-btn" data-m="dv">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="dvStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="num">原始数字</button><button class="demo-btn" data-m="viz">可视化</button></div>
      </div>`;
    const stage = c.querySelector('#dvStage');
    const nameEl = c.querySelector('#dvName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    if(m==='num'){
      let s='<div style="height:100%;padding:14px;display:flex;flex-direction:column;gap:10px;color:#c2cfe0">';
      s+='<div style="font:700 13px var(--font-display);color:#7e8aa0">'+cs.tw.a+' / '+cs.tw.b+'（原始数字）</div>';
      s+='<div style="display:flex;gap:16px">';
      s+='<div style="flex:1"><div style="font:11px Inter,sans-serif;color:#3a8a8a;margin-bottom:4px">'+cs.tw.a+'</div>'+cs.tw.aPts.map(function(p){return '<div style="font:12px Inter,sans-serif;color:#c2cfe0">• '+p+'</div>';}).join('')+'</div>';
      s+='<div style="flex:1"><div style="font:11px Inter,sans-serif;color:#e46d4c;margin-bottom:4px">'+cs.tw.b+'</div>'+cs.tw.bPts.map(function(p){return '<div style="font:12px Inter,sans-serif;color:#c2cfe0">• '+p+'</div>';}).join('')+'</div>';
      s+='</div></div>';
      stage.innerHTML=s;
    } else {
      function chartHtml(items,color){ let s='<svg viewBox="0 0 220 100" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%"><line x1="15" y1="85" x2="210" y2="85" stroke="#56657f"/>'; const n=items.length, slot=190/n; items.forEach(function(it,i){ const h=12+it.v*68; const x=20+i*slot+4; s+='<rect x="'+x+'" y="'+(85-h)+'" width="'+(slot-10)+'" height="'+h+'" rx="2" fill="'+color+'"/>'; }); s+='</svg>'; return s; }
      const a=cs.tw.aPts.map(function(p,i){return {v:[0.8,0.5,0.7][i%3]};});
      const b=cs.tw.bPts.map(function(p,i){return {v:[0.5,0.8,0.55][i%3]};});
      stage.innerHTML='<div style="height:100%;padding:12px;display:flex;flex-direction:column;gap:8px"><div style="font:700 13px var(--font-display);color:#3a8a8a">可视化对比</div><div style="flex:1;background:rgba(186,214,247,.06);border-radius:8px;padding:6px">'+chartHtml(a,'#3a8a8a')+'</div><div style="flex:1;background:rgba(186,214,247,.06);border-radius:8px;padding:6px">'+chartHtml(b,'#e46d4c')+'</div><div style="font:11px Inter,sans-serif;color:#7e8aa0;text-align:center">'+cs.title+'</div></div>';
    }

    }
    fill(); render('viz');
    c.querySelectorAll('[data-m]:not([data-m="dv"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="dv"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="viz"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="dv"]').onclick = function() { ci = twIdx[Math.floor(Math.random()*twIdx.length)]; fill(); const act = c.querySelector('[data-m].active:not([data-m="dv"])'); render(act ? act.dataset.m : 'viz'); };
  },
  'flat-vs-skeu'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="fsName">案例加载中…</span>
          <button class="demo-btn" data-m="fs">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="fsStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="flat">扁平</button><button class="demo-btn" data-m="skeu">拟物</button></div>
      </div>`;
    const stage = c.querySelector('#fsStage');
    const nameEl = c.querySelector('#fsName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    const flat='background:rgba(186,214,247,.1);border:1px solid rgba(186,214,247,.2);border-radius:8px';
    const skeu='background:linear-gradient(135deg,#5a6b85,#3a4252);border:1px solid rgba(255,255,255,.15);border-radius:8px;box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 6px 14px rgba(0,0,0,.4)';
    stage.innerHTML='<div style="height:100%;display:flex;align-items:center;justify-content:center;padding:14px"><div style="width:60%;padding:18px;'+(m==='skeu'?skeu:flat)+'"><div style="font:700 15px var(--font-display);color:#eef3e6">'+cs.title+'</div><div style="margin-top:6px;font:11px Inter,sans-serif;color:#c2cfe0">'+cs.subtitle+'</div><div style="margin-top:10px;font:10px Inter,sans-serif;'+(m==='skeu'?'color:#1a3300':'color:#7e8aa0')+'">'+(m==='skeu'?'拟物：质感、高光、投影':'扁平：纯色块、无装饰')+'</div></div></div>';

    }
    fill(); render('flat');
    c.querySelectorAll('[data-m]:not([data-m="fs"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="fs"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="flat"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="fs"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="fs"])'); render(act ? act.dataset.m : 'flat'); };
  },
  'embed-font'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xef">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="no">不嵌入</button><button class="demo-btn" data-m="yes">嵌入字体</button></div>'
    + '<div class="demo-label" style="text-align:center">切换字体嵌入，看换机后字形是否保留</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  if (m === 'no') {
    stage.innerHTML = '<div style="position:absolute;inset:0;padding:14px;display:flex;flex-direction:column;gap:8px">'
      + '<div style="font:700 16px var(--font-serif);color:#7e8aa0">' + cs.title + '</div>'
      + '<div style="font:11px var(--font-body);color:#b04a3a">未嵌入 → 换电脑被替换成默认字体，版式垮掉</div>'
    + '</div>';
  } else {
    stage.innerHTML = '<div style="position:absolute;inset:0;padding:14px;display:flex;flex-direction:column;gap:8px">'
      + '<div style="font:700 16px var(--font-display);color:#1a3300">' + cs.title + '</div>'
      + '<div style="font:11px var(--font-body);color:#2f6f3a">已嵌入 → 无论哪台电脑，字形间距都原样保留</div>'
    + '</div>';
  }
  }
  fill(); render('yes');
  c.querySelectorAll('[data-m]:not([data-m="xef"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xef"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="yes"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xef"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xef"])'); render(act ? act.dataset.m : 'yes'); };
},


  'export-media'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xem">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="video">视频 MP4</button><button class="demo-btn" data-m="img">图片 PNG</button><button class="demo-btn" data-m="gif">动态 GIF</button></div>'
    + '<div class="demo-label" style="text-align:center">选择导出格式，看同一案例如何分享</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  const map = { video:['#2f6f3a','视频 MP4','▶'], img:['#3a8a8a','图片 PNG','▣'], gif:['#cb5521','动态 GIF','◍'] };
  const it = map[m] || map.video;
  const dark = m === 'video';
  stage.innerHTML = '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:' + (dark ? '#16203a' : '#fbfcf7') + '">'
    + '<div style="width:64px;height:46px;border-radius:6px;background:' + it[0] + ';display:flex;align-items:center;justify-content:center;color:#fff;font:14px var(--font-mono)">' + it[2] + '</div>'
    + '<div style="font:700 13px var(--font-display);color:' + (dark ? '#eef3e6' : '#1a3300') + '">' + cs.title + ' → ' + it[1] + '</div>'
    + '<div style="font:11px var(--font-body);color:' + (dark ? '#bcd99b' : '#4a5a3a') + '">导出为 ' + it[1] + '，方便分享与印刷</div>'
  + '</div>';
  }
  fill(); render('video');
  c.querySelectorAll('[data-m]:not([data-m="xem"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xem"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="video"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xem"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xem"])'); render(act ? act.dataset.m : 'video'); };
},


  /* ---------- 软件功能（补充） ---------- */
  'reuse-slides'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="rsName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="rs">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn active" data-m="theme">套用当前主题</button><button class="demo-btn" data-m="keep">保留源格式</button></div>
        <div class="demo-label">从「素材库文件」点一页 → 插进当前文稿</div>
        <div class="demo-row" id="rsLib" style="gap:8px;justify-content:center"></div>
        <div class="demo-label" style="margin-top:2px">↓ 当前文稿：<span id="rsTitle"></span></div>
        <div class="mini-slide" id="rsTarget" style="display:flex;align-items:center;justify-content:center;color:var(--color-fog-veil);font:13px var(--font-body)">点上方任意页插入这里</div>
      </div>`;
    const lib = c.querySelector('#rsLib'), target = c.querySelector('#rsTarget'), nameEl = c.querySelector('#rsName'), titleEl = c.querySelector('#rsTitle');
    let mode = 'theme';
    const srcCols = ['#cb5521', '#2f6f3a', '#cb5521'];
    const themeCol = '#2f6f3a';
    srcCols.forEach(col => {
      const d = document.createElement('div');
      d.style.cssText = `width:64px;height:40px;border-radius:6px;border-top:4px solid ${col};background:rgba(26,51,0,.06);cursor:pointer;position:relative`;
      d.innerHTML = `<div style="position:absolute;top:9px;left:6px;width:60%;height:5px;background:${col};border-radius:2px;opacity:.85"></div><div style="position:absolute;top:19px;left:6px;width:76%;height:4px;background:rgba(26,51,0,.2);border-radius:2px"></div>`;
      d.onclick = () => {
        const col2 = mode === 'theme' ? themeCol : col;
        target.style.color = '';
        target.innerHTML = `<div style="position:absolute;top:16%;left:8%;width:55%;height:14%;background:${col2};border-radius:4px"></div><div style="position:absolute;top:44%;left:8%;width:72%;height:6%;background:rgba(26,51,0,.18);border-radius:3px"></div><div style="position:absolute;top:56%;left:8%;width:58%;height:6%;background:rgba(26,51,0,.12);border-radius:3px"></div><div style="position:absolute;bottom:8%;right:8%;font:10px var(--font-mono);color:rgba(26,51,0,.45)">${mode === 'theme' ? '已套用主题紫' : '保留源色'}</div>`;
      };
      lib.appendChild(d);
    });
    function render() { titleEl.textContent = CASES[ci].title; }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; render(); }
    fill();
    c.querySelectorAll('[data-m]:not([data-m="rs"])').forEach(b => b.onclick = () => { mode = b.dataset.m; });
    c.querySelector('[data-m="rs"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },
  'screen-record'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="srName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="sr">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="rec">开始录制</button>
          <button class="demo-btn" data-m="stop">停止</button>
        </div>
        <div class="demo-row" id="srStage" style="justify-content:center;align-items:center;min-height:120px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="srHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#srName');
    const stage = c.querySelector('#srStage');
    const hint = c.querySelector('#srHint');
    let cur = 'rec';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(){
      const cs = CASES[ci];
      if (cur === 'rec') {
        stage.innerHTML = '<div style="position:relative;width:180px;height:104px;border-radius:8px;background:linear-gradient(135deg,#22304a,#3a4a6a);overflow:hidden">'
          + '<div style="position:absolute;left:10px;top:10px;width:10px;height:10px;border-radius:50%;background:#e2574c"></div>'
          + '<div style="position:absolute;left:26px;top:8px;font:11px sans-serif;color:#fff">● REC 00:12</div>'
          + '<div style="position:absolute;left:10px;bottom:10px;right:10px;font:12px sans-serif;color:#c2cfe0">正在录制：' + cs.title + '</div></div>';
        hint.textContent = 'PPT 内置屏幕录制，选区域直接录，可嵌可播。';
      } else {
        stage.innerHTML = '<div style="position:relative;width:180px;height:104px;border-radius:8px;background:linear-gradient(135deg,#2a3550,#3a4a6a);overflow:hidden">'
          + '<div style="position:absolute;left:10px;top:8px;font:11px sans-serif;color:#8a97ad">■ 已停止</div>'
          + '<div style="position:absolute;left:10px;bottom:10px;right:10px;font:12px sans-serif;color:#c2cfe0">已停止 · 可导出/嵌入：' + cs.title + '</div></div>';
        hint.textContent = '点「开始录制」再录一段试试。';
      }
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="sr"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="sr"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="sr"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },

  /* ---------- 设计原则（补充） ---------- */
  'less-is-more'(c) {
    const cs = CASES.find(x => x.id === 'less-slide') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="mini-slide" data-less-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">信息过载</button>
          <button class="demo-btn active" data-m="good">一页一事</button>
        </div>
        <div class="demo-label" data-less-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-less-stage]'), hint = c.querySelector('[data-less-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'一页一事', tagBad:'信息过载',
        good: () => `<circle cx="160" cy="220" r="72" fill="#2f6f3a" opacity="0.10"/>`
          + svgTxt(160,238,'38',72,SVG_MONO,700,'middle')
          + svgTxt(160,280,'dB',20,SVG_MUTED,400,'middle')
          + svgTxt(80,362,'静音降噪',34,SVG_INK,700)
          + svgTxt(80,406,'图书馆级安静，一页只说这一点。',18,SVG_MUTED),
        bad: () => svgRect(70,150,820,320,'#fff',12,'rgba(26,51,0,.12)')
          + svgTxt(96,200,'产品五大卖点',22,'#2f6f3a',700)
          + svgTxt(96,240,'① 静音 38dB  ② 续航 72h  ③ 快充 30min',15,SVG_INK)
          + svgTxt(96,274,'④ 防水 IPX7  ⑤ 蓝牙 5.3',15,SVG_INK)
          + svgTxt(96,312,'• 第 7 代降噪芯片，三麦阵列精准拾音',14,SVG_MUTED)
          + svgTxt(96,344,'• 低功耗方案，单次播放 72 小时',14,SVG_MUTED)
          + svgTxt(96,376,'• 支持快充 / IPX7 防水 / 蓝牙 5.3',14,SVG_MUTED) });
      hint.textContent = mode === 'good'
        ? '减法设计：删掉次要信息，一页只讲一个核心卖点，观众 3 秒记住。'
        : '信息过载：5 个卖点挤在同一页，没有重点，观众什么也记不住。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => {
      btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); };
    });
  },
  'color-wheel'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="cwName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="cw">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">色相 H</span><span class="demo-label" id="cwHV" style="font-family:var(--font-mono)">265°</span></div>
        <input type="range" class="demo-slider" id="cwH" min="0" max="360" step="1" value="265">
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">饱和度 S</span><span class="demo-label" id="cwSV" style="font-family:var(--font-mono)">75%</span></div>
        <input type="range" class="demo-slider" id="cwS" min="0" max="100" step="1" value="75">
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">明度 B</span><span class="demo-label" id="cwBV" style="font-family:var(--font-mono)">95%</span></div>
        <input type="range" class="demo-slider" id="cwB" min="0" max="100" step="1" value="95">
        <div class="mini-slide" style="display:flex;align-items:center;justify-content:center;gap:16px">
          <div id="cwSwatch" style="width:130px;height:130px;border-radius:20px;box-shadow:0 8px 24px rgba(26,51,0,.35)"></div>
          <div style="font:15px var(--font-mono);color:var(--color-fog-veil)" id="cwHex">#2f6f3a</div>
        </div>
        <div class="demo-label" id="cwCap"></div>
      </div>`;
    const H = c.querySelector('#cwH'), S = c.querySelector('#cwS'), B = c.querySelector('#cwB');
    const sw = c.querySelector('#cwSwatch'), hex = c.querySelector('#cwHex'), nameEl = c.querySelector('#cwName'), cap = c.querySelector('#cwCap');
    function hsb2rgb(h, s, b) {
      s /= 100; b /= 100; const k = n => (n + h / 60) % 6;
      const f = n => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
      const to = v => Math.round(v * 255).toString(16).padStart(2, '0');
      return '#' + to(f(5)) + to(f(3)) + to(f(1));
    }
    function upd() {
      c.querySelector('#cwHV').textContent = H.value + '°';
      c.querySelector('#cwSV').textContent = S.value + '%';
      c.querySelector('#cwBV').textContent = B.value + '%';
      const col = hsb2rgb(+H.value, +S.value, +B.value);
      sw.style.background = col; hex.textContent = col;
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; cap.textContent = '《' + CASES[ci].title + '》主色 H=' + H.value + '°'; }
    [H, S, B].forEach(x => x.oninput = upd); upd();
    fill();
    c.querySelector('[data-m="cw"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },
  monochrome(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="moName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="mo">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn active" data-m="mono">单色（同色相）</button><button class="demo-btn" data-m="multi">花（多色相）</button></div>
        <div class="demo-row" style="justify-content:space-between"><span class="demo-label">选一个色相</span><span class="demo-label" id="moHV" style="font-family:var(--font-mono)">210°</span></div>
        <input type="range" class="demo-slider" id="moH" min="0" max="360" step="1" value="210">
        <div class="mini-slide" id="moStage" style="display:flex;align-items:center;justify-content:center;gap:10px"></div>
        <div class="demo-label" id="moTip">同一色相靠深浅明暗分层，天生和谐</div>
      </div>`;
    const H = c.querySelector('#moH'), stage = c.querySelector('#moStage'), tip = c.querySelector('#moTip'), nameEl = c.querySelector('#moName');
    let mode = 'mono';
    function hsl(h, s, l) { return `hsl(${h},${s}%,${l}%)`; }
    function render() {
      c.querySelector('#moHV').textContent = H.value + '°';
      const h = +H.value; let cols;
      if (mode === 'mono') { cols = [82, 66, 52, 38, 26].map(l => hsl(h, 60, l)); tip.textContent = '同一色相靠深浅明暗分层，天生和谐'; }
      else { cols = [0, 70, 140, 210, 300].map(off => hsl((h + off) % 360, 68, 55)); tip.textContent = '五个不同色相并排 → 花、乱、抢镜'; }
      stage.innerHTML = cols.map(col => `<div style="width:60px;height:90px;border-radius:10px;background:${col}"></div>`).join('');
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; tip.textContent = (mode === 'mono' ? '《' + CASES[ci].title + '》同色相分层，和谐' : '《' + CASES[ci].title + '》多色相撞，花'); }
    H.oninput = render;
    c.querySelectorAll('[data-m]:not([data-m="mo"])').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="mo"])').forEach(x => x.classList.remove('active')); b.classList.add('active'); mode = b.dataset.m; render(); fill(); });
    c.querySelector('[data-m="mo"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
    render(); fill();
  },
  'full-image'(c) { runCasePageDemo(c, 'full-image'); },

  'visual-balance'(c) {
    const cs = CASES.find(x => x.title === '城市文旅周末路线') || CASES[25];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">视觉平衡＝左文右图互相配重，画面不歪</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">失衡</button>
          <button class="demo-btn active" data-m="good">配平</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'配平', tagBad:'失衡',
        good: () => svgRect(520,120,380,340,'#3a6ea5',18)
          + svgTxt(710,300,'路线大图',18,'#fff',700,'middle')
          + svgRect(80,140,380,150,'#ffffff',16,'rgba(26,51,0,.12)')
          + svgTxt(102,176,'CASE · 视觉平衡',14,'#cb5521',700)
          + demoSvgLines(102,210,demoWrap(cs.body,17,3),15,SVG_INK,500,23)
          + `<line x1="480" y1="120" x2="480" y2="460" stroke="#cb5521" stroke-width="1" stroke-dasharray="6 6" opacity=".5"/>`
          + `<circle cx="480" cy="290" r="6" fill="#cb5521"/>`
          + svgRect(80,320,180,70,'#2f6f3a',10) + svgTxt(110,348,'Day 1 老街',13,'#fff',700)
          + svgRect(280,320,180,70,'#2f6f3a',10) + svgTxt(310,348,'Day 2 山海',13,'#fff',700),
        bad: () => svgRect(520,120,380,220,'#3a6ea5',18)
          + svgTxt(710,240,'路线大图',18,'#fff',700,'middle')
          + svgRect(80,140,380,150,'#ffffff',16,'rgba(26,51,0,.12)')
          + svgTxt(102,176,'CASE · 失衡',14,'#9ca3af',700)
          + demoSvgLines(102,210,demoWrap(cs.body,17,3),15,SVG_INK,500,23)
          + `<text x="520" y="380" font-size="13" fill="#cb5521" font-weight="700">右侧大图下方太空，左侧却堆满信息</text>`
      });
      hint.textContent = mode === 'good' ? '配平：大图在右，左侧用文字块+色块+小卡补足重量，视觉支点居中。' : '失衡：右侧大图头重脚轻，左侧信息密集，画面向一边倾斜。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },

  /* ---------- 效率与技巧（补充） ---------- */
  'anim-painter'(c) {
    let ci = Math.floor(Math.random()*CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="apName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="ap">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="apStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="paint">动画刷</button><button class="demo-btn" data-m="clear">清除动画</button></div>' +
    '</div>';
    const stage = c.querySelector('#apStage');
    const nameEl = c.querySelector('#apName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m){
      const cs = CASES[ci];
      const on = (m === 'paint');
      const animStyle = on ? 'animation:apPulse 1.2s ease infinite' : '';
      stage.innerHTML = '<style>@keyframes apPulse{0%{transform:scale(1)}50%{transform:scale(1.07);box-shadow:0 0 0 5px rgba(47,111,58,.22)}100%{transform:scale(1)}}</style>' +
        '<div style="height:100%;padding:16px;display:flex;flex-direction:column;gap:14px;justify-content:center;align-items:center">' +
        '<div style="font:700 13px var(--font-display);color:#2f6f3a;align-self:flex-start">'+cs.title+' · 动画刷</div>' +
        '<div style="display:flex;gap:16px;align-items:center">' +
          '<div style="width:64px;height:64px;border-radius:12px;background:#2f6f3a;display:flex;align-items:center;justify-content:center;font:11px var(--font-body);color:#fff">源动画</div>' +
          '<div style="font:20px var(--font-mono);color:#9bb08a">→</div>' +
          '<div style="width:64px;height:64px;border-radius:12px;background:#cb5521;display:flex;align-items:center;justify-content:center;font:11px var(--font-body);color:#fff;'+animStyle+'">'+(on?'已复制':'目标')+'</div>' +
        '</div>' +
        '<div style="font:11px var(--font-body);color:#6b7280">点击「动画刷」把强调动画复制给目标元素</div>' +
        '</div>';
    }
    fill(); render('paint');
    c.querySelectorAll('[data-m]:not([data-m="ap"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="ap"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="paint"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="ap"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="ap"])'); render(act ? act.dataset.m : 'paint'); };
  },
  plugins(c) {
    let ci = Math.floor(Math.random()*CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="pgName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="pg">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="pgStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="p1">iSlide</button><button class="demo-btn" data-m="p2">口袋动画</button><button class="demo-btn" data-m="p3">ThinkCell</button></div>' +
    '</div>';
    const stage = c.querySelector('#pgStage');
    const nameEl = c.querySelector('#pgName');
    const PLUGINS = [['iSlide','一键排版 / 图示库 / 图标补全，批量统一风格'],['口袋动画 PA','批量动画、智能对齐与时间轴，省去手 key 帧'],['ThinkCell','咨询级图表（瀑布 / 组合图），PPT 里画复杂图更快']];
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m){
      const cs = CASES[ci];
      let idx = 0; if (m==='p2') idx=1; else if (m==='p3') idx=2;
      const p = PLUGINS[idx];
      stage.innerHTML = '<div style="height:100%;padding:16px;display:flex;flex-direction:column;gap:12px;justify-content:center">' +
        '<div style="font:700 14px var(--font-display);color:#2f6f3a">'+cs.title+' · 好用插件</div>' +
        '<div style="background:#fff;border:1px solid rgba(26,51,0,.12);border-radius:10px;padding:14px">' +
          '<div style="font:700 16px var(--font-body);color:#2f6f3a">'+p[0]+'</div>' +
          '<div style="margin-top:6px;font:12px/1.5 var(--font-body);color:#1a3300">'+p[1]+'</div>' +
        '</div>' +
        '<div style="font:11px var(--font-body);color:#6b7280">切换查看不同插件能帮你做什么</div>' +
      '</div>';
    }
    fill(); render('p1');
    c.querySelectorAll('[data-m]:not([data-m="pg"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="pg"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="p1"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="pg"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="pg"])'); render(act ? act.dataset.m : 'p1'); };
  },
  'smart-align'(c) { runCasePageDemo(c, 'smart-align'); },
  'table-beauty'(c) {
    const twCases = CASES.filter(x => x.tw && x.tw.aPts && x.tw.bPts);
    let ci = Math.floor(Math.random() * twCases.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="tbName">案例加载中…</span>
          <button class="demo-btn" data-m="tb">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="tbStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="raw">原始表格</button><button class="demo-btn" data-m="nice">美化表格</button></div>
      </div>`;
    const stage = c.querySelector('#tbStage');
    const nameEl = c.querySelector('#tbName');
    function fill() { nameEl.textContent = '案例：' + twCases[ci].title; }
    function render(m) {
    const cs=twCases[ci];
    let rows='';
    const n=Math.max(cs.tw.aPts.length,cs.tw.bPts.length);
    for(let i=0;i<n;i++){ rows+='<tr><td style="padding:4px 8px;border:1px solid '+(m==='nice'?'rgba(186,214,247,.25)':'#444')+';color:#c2cfe0;font:11px Inter,sans-serif">'+cs.tw.aPts[i]+'</td><td style="padding:4px 8px;border:1px solid '+(m==='nice'?'rgba(186,214,247,.25)':'#444')+';color:#c2cfe0;font:11px Inter,sans-serif">'+cs.tw.bPts[i]+'</td></tr>'; }
    const tbl='<table style="border-collapse:collapse;width:100%"><thead><tr><th style="padding:5px 8px;background:'+(m==='nice'?'#2f6f3a':'#666')+';color:#fff;font:11px Inter,sans-serif;text-align:left">'+cs.tw.a+'</th><th style="padding:5px 8px;background:'+(m==='nice'?'#2f6f3a':'#666')+';color:#fff;font:11px Inter,sans-serif;text-align:left">'+cs.tw.b+'</th></tr></thead><tbody>'+rows+'</tbody></table>';
    stage.innerHTML='<div style="height:100%;padding:14px;overflow:auto">'+tbl+'<div style="margin-top:8px;font:11px Inter,sans-serif;color:#7e8aa0;text-align:center">'+(m==='nice'?'美化：表头强调色+斑马纹':'原始：默认灰网格')+' · '+cs.title+'</div></div>';

    }
    fill(); render('nice');
    c.querySelectorAll('[data-m]:not([data-m="tb"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="tb"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="nice"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="tb"]').onclick = function() { ci = Math.floor(Math.random()*twCases.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="tb"])'); render(act ? act.dataset.m : 'nice'); };
  },
  'model-3d'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="m3Name">案例加载中…</span>
          <button class="demo-btn" data-m="m3">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="m3Stage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="flat2d">平面</button><button class="demo-btn" data-m="d3">立体</button></div>
      </div>`;
    const stage = c.querySelector('#m3Stage');
    const nameEl = c.querySelector('#m3Name');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    const d3=m==='d3';
    stage.innerHTML='<div style="height:100%;display:flex;align-items:center;justify-content:center;perspective:600px"><div style="width:62%;height:54%;padding:16px;background:linear-gradient(135deg,#3a8a8a,#2f6f3a);border-radius:10px;color:#fff;transform:'+(d3?'rotateY(34deg)':'none')+';box-shadow:'+(d3?'0 18px 30px rgba(0,0,0,.45)':'0 4px 10px rgba(0,0,0,.2)')+';transition:transform .3s"><div style="font:700 14px var(--font-display)">'+cs.title+'</div><div style="margin-top:6px;font:11px Inter,sans-serif;opacity:.9">'+cs.subtitle+'</div></div></div>';

    }
    fill(); render('d3');
    c.querySelectorAll('[data-m]:not([data-m="m3"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="m3"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="d3"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="m3"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="m3"])'); render(act ? act.dataset.m : 'd3'); };
  },
  'speaker-notes'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xsn">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="hide">隐藏备注</button><button class="demo-btn" data-m="show">显示备注</button></div>'
    + '<div class="demo-label" style="text-align:center">切换备注显隐，看演讲者专属信息</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  if (m === 'show') {
    stage.innerHTML = '<div style="position:absolute;inset:0;display:flex;flex-direction:column">'
      + '<div style="flex:1;padding:12px;display:flex;flex-direction:column;gap:6px">'
        + '<div style="font:700 14px var(--font-display);color:#1a3300">' + cs.title + '</div>'
        + '<div style="font:11px var(--font-body);color:#4a5a3a">' + cs.points[0] + '</div>'
      + '</div>'
      + '<div style="height:38%;background:#fff8e1;border-top:2px solid #e0c060;padding:8px;font:11px var(--font-body);color:#6b5a2a;line-height:1.4">📝 演讲者备注（观众看不到）：' + cs.body + '</div>'
    + '</div>';
  } else {
    stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:6px">'
      + '<div style="font:700 14px var(--font-display);color:#1a3300">' + cs.title + '</div>'
      + '<div style="font:11px var(--font-body);color:#4a5a3a">' + cs.points[0] + '</div>'
      + '<div style="font:10px var(--font-mono);color:#7e8aa0">（备注已隐藏）</div>'
    + '</div>';
  }
  }
  fill(); render('show');
  c.querySelectorAll('[data-m]:not([data-m="xsn"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xsn"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="show"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xsn"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xsn"])'); render(act ? act.dataset.m : 'show'); };
},


  rehearse(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  let rhTimer = null;
  let rhSec = 0;
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="rh">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row">'
      + '<button class="demo-btn" data-m="start">开始排练</button>'
      + '<button class="demo-btn" data-m="reset">重置</button>'
    + '</div>'
    + '<div class="demo-label" style="text-align:center">点"开始排练"计时，精确把控时长</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
    if (rhTimer) { clearInterval(rhTimer); rhTimer = null; }
    const cs = CASES[ci];
    const run = m === 'start';
    function paint(){
      const mm = String(Math.floor(rhSec / 60)).padStart(2, '0');
      const ss = String(rhSec % 60).padStart(2, '0');
      stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px;background:#16203a">'
        + '<div style="font:700 12px var(--font-display);color:#9fe3c5">排练计时 · ' + cs.title + '</div>'
        + '<div style="font:700 30px var(--font-mono);color:#eef3e6">' + mm + ':' + ss + '</div>'
        + '<div style="font:11px var(--font-body);color:#c2cfe0">' + cs.points[Math.min(rhSec % cs.points.length, cs.points.length - 1)] + '</div>'
        + '<div style="margin-top:auto;font:10px var(--font-mono);color:' + (run ? '#9fe3c5' : '#7e8aa0') + '">' + (run ? '● 计时中…' : '已停止') + '</div>'
      + '</div>';
    }
    paint();
    if (run) { rhTimer = setInterval(function(){ rhSec++; paint(); }, 1000); }
  }
  fill(); render('start');
  c.querySelectorAll('[data-m]:not([data-m="rh"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="rh"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="start"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="rh"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="rh"])'); render(act ? act.dataset.m : 'start'); };
},


  'export-dpi'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xed">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="72">72 dpi</button><button class="demo-btn" data-m="150">150 dpi</button><button class="demo-btn" data-m="300">300 dpi</button></div>'
    + '<div class="demo-label" style="text-align:center">切换分辨率，看印刷清晰度差异</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  const dpi = parseInt(m, 10);
  const blur = dpi >= 300 ? 0 : (dpi >= 150 ? 1 : 2.5);
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px">'
    + '<div style="width:100%;height:60px;border-radius:6px;background:linear-gradient(135deg,#2f6f3a,#3a8a8a);filter:blur(' + blur + 'px)"></div>'
    + '<div style="font:700 13px var(--font-display);color:#1a3300">' + cs.title + '</div>'
    + '<div style="font:11px var(--font-body);color:' + (dpi >= 300 ? '#2f6f3a' : '#b04a3a') + '">导出 ' + dpi + ' dpi：' + (dpi >= 300 ? '印刷级清晰，放大不糊' : '屏幕够用，印刷发虚') + '</div>'
  + '</div>';
  }
  fill(); render('300');
  c.querySelectorAll('[data-m]:not([data-m="xed"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xed"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="300"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xed"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xed"])'); render(act ? act.dataset.m : '300'); };
},


  /* ===== 本轮新增 15 个专属演示（A+B 全补） ===== */
  'outline-view'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="ovName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="ov">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row" role="group">
          <button class="demo-btn active" data-m="outline">大纲模式</button>
          <button class="demo-btn" data-m="slide">幻灯片模式</button>
        </div>
        <div id="ovBox" class="mini-slide" style="text-align:left"></div>
      </div>`;
    const box = c.querySelector('#ovBox'), nameEl = c.querySelector('#ovName');
    function render(mode) {
      const cs = CASES[ci];
      if (mode === 'outline') {
        const items = [cs.title, cs.subtitle].concat(cs.points);
        box.innerHTML = items.map((s, i) => `
          <div style="margin-bottom:8px">
            <div style="font:600 15px var(--font-display);color:var(--color-ice-highlight)">${i + 1}. ${s}</div>
          </div>`).join('');
      } else {
        box.innerHTML = `
          <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px;padding:8px 10px;background:rgba(26,51,0,0.04);border:1px solid rgba(26,51,0,0.12);border-radius:8px">
            <div style="flex:0 0 26px;height:26px;border-radius:6px;background:linear-gradient(135deg,#2f6f3a,#2f6f3a);display:flex;align-items:center;justify-content:center;font:600 12px var(--font-mono);color:#ffffff">1</div>
            <div><div style="font:600 13px var(--font-display);color:var(--color-ice-highlight)">${cs.title}</div><div style="font:12px var(--font-body);color:var(--color-fog-veil)">${cs.subtitle}</div></div>
          </div>`;
      }
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('outline');
    c.querySelectorAll('[data-m]:not([data-m="ov"])').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="ov"])').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); render(btn.dataset.m);
    });
    c.querySelector('[data-m="ov"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="ov"])').dataset.m); };
  },
  'font-pairing'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="fpName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="fpS">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="sc">无衬线+衬线</button>
          <button class="demo-btn" data-m="same">同族字重</button>
          <button class="demo-btn" data-m="mix">中英混排</button>
        </div>
        <div class="mini-slide" id="fpStage" style="background:#fbfcf7"></div>
        <div class="demo-label" id="fpNote" style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('#fpStage'), note = c.querySelector('#fpNote'), nameEl = c.querySelector('#fpName');
    function fpLines(lines, x, y, size, color, weight, lh, font, anchor) {
      return lines.map((line, i) => svgTxt(x, y + i * lh, line, size, color, weight, anchor, font)).join('');
    }
    function apply(m) {
      const cs = CASES[ci];
      const body = cs.body, pts = cs.points.slice(0, 3);
      let scene;
      if (m === 'sc') {
        const bodyLines = demoWrap(body, 32, 2);
        scene = svgTxt(480, 170, cs.title, 44, SVG_INK, 800, 'middle', SVG_SANS)
          + svgTxt(480, 224, cs.subtitle, 17, SVG_MUTED, 400, 'middle', SVG_SANS)
          + '<line x1="360" y1="252" x2="600" y2="252" stroke="#2f6f3a" stroke-width="2"/>'
          + fpLines(bodyLines, 480, 302, 16, SVG_INK, 400, 28, SVG_SERIF, 'middle')
          + pts.map((p, i) => svgTxt(220 + i * 260, 396, '• ' + p, 14, SVG_MUTED, 400, 'start', SVG_SANS)).join('')
          + '<rect x="80" y="450" width="800" height="1" fill="rgba(26,51,0,.08)"/>'
          + svgTxt(480, 482, '无衬线标题压场 · 衬线正文易读', 13, SVG_MUTED, 400, 'middle', SVG_MONO);
        note.textContent = '无衬线标题压场 + 衬线正文易读，经典对比';
      } else if (m === 'same') {
        const bodyLines = demoWrap(body, 50, 2);
        scene = svgTxt(80, 156, cs.title, 38, SVG_INK, 800, 'start', SVG_SANS)
          + svgTxt(80, 196, cs.subtitle, 16, SVG_MUTED, 400, 'start', SVG_SANS)
          + '<line x1="80" y1="220" x2="240" y2="220" stroke="#2f6f3a" stroke-width="3"/>'
          + svgTxt(80, 296, '12.4k', 54, '#2f6f3a', 800, 'start', SVG_SANS)
          + svgTxt(80, 340, '新增粉丝', 14, SVG_MUTED, 400, 'start', SVG_SANS)
          + svgTxt(360, 296, '6.8%', 54, '#2f6f3a', 800, 'start', SVG_SANS)
          + svgTxt(360, 340, '互动率', 14, SVG_MUTED, 400, 'start', SVG_SANS)
          + svgTxt(640, 296, '38.6w', 54, '#2f6f3a', 800, 'start', SVG_SANS)
          + svgTxt(640, 340, '阅读量', 14, SVG_MUTED, 400, 'start', SVG_SANS)
          + fpLines(bodyLines, 80, 420, 15, SVG_INK, 400, 26, SVG_SANS, 'start')
          + svgTxt(80, 482, '同族字体，标题/数据用粗体，说明用常规体', 13, SVG_MUTED, 400, 'start', SVG_MONO);
        note.textContent = '同族字体，标题 800 / 正文 400，统一不抢戏';
      } else {
        const bodyLines = demoWrap(body, 26, 3);
        scene = svgTxt(80, 174, cs.title, 44, SVG_INK, 700, 'start', SVG_SANS)
          + svgTxt(80, 226, cs.subtitle, 18, SVG_MUTED, 400, 'start', SVG_SANS)
          + '<line x1="80" y1="260" x2="190" y2="260" stroke="#2f6f3a" stroke-width="3"/>'
          + svgTxt(80, 308, 'STRATEGY & EXECUTION', 16, '#2f6f3a', 600, 'start', SVG_SERIF)
          + '<rect x="480" y="140" width="1" height="320" fill="rgba(26,51,0,.1)"/>'
          + fpLines(bodyLines, 520, 174, 17, SVG_INK, 400, 30, SVG_SERIF, 'start')
          + pts.map((p, i) => svgTxt(520, 340 + i * 36, '0' + (i+1) + '  ' + p, 15, SVG_INK, 600, 'start', SVG_SANS)).join('')
          + svgTxt(80, 482, '中文标题 + 英文副标，衬线与无衬线混排', 13, SVG_MUTED, 400, 'start', SVG_MONO);
        note.textContent = '中文标题 + 英文副标，衬线与无衬线混排，国际化显贵';
      }
      stage.innerHTML = demoPageCompact({ cs, mode: 'good', accent: '#2f6f3a', tag: m === 'sc' ? '无衬线+衬线' : (m === 'same' ? '同族字重' : '中英混排'), good: () => scene, bad: () => scene });
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); apply('sc');
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => {
      if (btn.dataset.m === 'fpS') { ci = Math.floor(Math.random() * CASES.length); fill(); apply(c.querySelector('[data-m].active:not([data-m="fpS"])').dataset.m); return; }
      c.querySelectorAll('[data-m]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active'); apply(btn.dataset.m);
    });
  },
  'symmetry'(c) {
    const cs = CASES.find(x => x.title === '零售门店陈列改造') || CASES[26];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">对称＝左右重量相等 → 稳重；非对称失衡 → 画面倾斜</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">非对称失衡</button>
          <button class="demo-btn active" data-m="good">对称稳定</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'对称稳定', tagBad:'非对称失衡',
        good: () => svgTxt(480,150,cs.title,26,SVG_INK,700,'middle')
          + svgTxt(480,182,cs.subtitle,14,SVG_MUTED,'','middle')
          + `<line x1="480" y1="210" x2="480" y2="470" stroke="#2f6f3a" stroke-width="1" stroke-dasharray="6 6" opacity=".4"/>`
          + svgRect(160,240,280,180,'#3a6ea5',14) + svgTxt(300,340,'入口吸引',15,'#fff',700,'middle')
          + svgRect(520,240,280,180,'#cb5521',14) + svgTxt(660,340,'收银加购',15,'#fff',700,'middle')
          + svgTxt(480,460,'左右重量相等 · 视觉稳定',13,SVG_MUTED,'','middle'),
        bad: () => svgTxt(680,150,cs.title,22,SVG_INK,700,'middle')
          + svgTxt(680,178,cs.subtitle,13,SVG_MUTED,'','middle')
          + svgRect(520,220,340,220,'#3a6ea5',14) + svgTxt(690,340,'入口吸引',15,'#fff',700,'middle')
          + svgRect(120,380,180,80,'#eef3e6',10) + svgTxt(210,422,'收银加购',12,SVG_INK,700,'middle')
          + `<text x="120" y="350" font-size="13" fill="#cb5521" font-weight="700">右侧过重，左侧空洞</text>`
      });
      hint.textContent = mode === 'good' ? '对称稳定：以中轴为界左右配重相等，政府/金融汇报显稳重。' : '非对称失衡：元素全挤一侧，另一侧空洞，画面失去平衡感。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },
  'diagonal-flow'(c) {
    const cs = CASES.find(x => x.title === '新员工入职指南') || CASES[27];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">对角线构图＝标题在左上、视觉重心在右下 → 视线沿对角线流动</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">水平堆放</button>
          <button class="demo-btn active" data-m="good">对角线引导</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#cb5521', bg:'#fbfcf7', tagGood:'对角线引导', tagBad:'水平堆放',
        good: () => svgRect(60,120,280,150,'#ffffff',16,'rgba(26,51,0,.12)')
          + svgTxt(82,156,'CASE · 对角线 / 视线流',14,'#cb5521',700)
          + demoSvgLines(82,190,demoWrap(cs.body,17,3),15,SVG_INK,500,23)
          + svgRect(600,280,280,190,'#3a6ea5',18)
          + svgTxt(740,380,'入职流程',18,'#fff',700,'middle')
          + `<path d="M120 290 C300 340 480 300 600 360" fill="none" stroke="#cb5521" stroke-width="4" stroke-linecap="round" stroke-dasharray="10 8" opacity=".8"/><polygon points="610,364 592,352 592,370" fill="#cb5521"/>`
          + svgRect(120,420,170,60,'#2f6f3a',10) + svgTxt(155,448,'Day 1 权限开通',13,'#fff',700)
          + svgRect(330,380,170,60,'#2f6f3a',10) + svgTxt(365,408,'Day 3 跟岗会议',13,'#fff',700),
        bad: () => svgRect(60,120,820,120,'#ffffff',16,'rgba(26,51,0,.12)')
          + svgTxt(82,156,'CASE · 水平堆放',14,'#9ca3af',700)
          + demoSvgLines(82,190,demoWrap(cs.body,24,3),15,SVG_INK,500,23)
          + svgRect(60,280,260,150,'#3a6ea5',12) + svgTxt(190,365,'入职流程',15,'#fff',700,'middle')
          + svgRect(340,280,260,150,'#eef3e6',12) + svgTxt(470,365,'Day 1 权限',14,SVG_INK,700,'middle')
          + svgRect(620,280,260,150,'#eef3e6',12) + svgTxt(750,365,'Day 3 跟岗',14,SVG_INK,700,'middle')
      });
      hint.textContent = mode === 'good' ? '对角线引导：标题左上、配图右下，视线沿斜线自然移动，招募页/封面更有动势。' : '水平堆放：元素横排一线，没有斜向张力，画面呆板、缺乏视觉流动性。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },
  'remove-bg'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="rbName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="rb">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="on">原图(有背景)</button>
          <button class="demo-btn" data-m="off">去背景</button>
        </div>
        <div class="demo-row" id="rbStage" style="justify-content:center;align-items:center;min-height:150px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="rbHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#rbName');
    const stage = c.querySelector('#rbStage');
    const hint = c.querySelector('#rbHint');
    let cur = 'on';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(){
      const cs = CASES[ci];
      if (cur === 'on') {
        stage.innerHTML = '<div style="position:relative;width:120px;height:120px;border-radius:12px;background:linear-gradient(135deg,#7fd1c4,#4a90d9)">'
          + '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:56px">🧍</div></div>';
        hint.textContent = '原图带杂背景，换底很麻烦。';
      } else {
        stage.innerHTML = '<div style="position:relative;width:120px;height:120px;border-radius:12px;background:repeating-conic-gradient(#dcdcdc 0 25%,#9a9a9a 0 50%) 50%/22px 22px">'
          + '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:56px;filter:drop-shadow(0 4px 6px rgba(0,0,0,.4))">🧍</div></div>';
        hint.textContent = '案例「' + cs.title + '」去背后透明，随意换底/叠文字。';
      }
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="rb"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="rb"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="rb"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },
  'infographic'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="igName">案例加载中…</span>
          <button class="demo-btn" data-m="ig">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="igStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="list">文字列表</button><button class="demo-btn" data-m="info">信息图</button></div>
      </div>`;
    const stage = c.querySelector('#igStage');
    const nameEl = c.querySelector('#igName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    if(m==='list'){
      stage.innerHTML='<div style="height:100%;padding:14px;display:flex;flex-direction:column;gap:8px;color:#c2cfe0"><div style="font:700 13px var(--font-display);color:#7e8aa0">文字列表</div>'+cs.points.map(function(p){return '<div style="font:12px Inter,sans-serif;color:#c2cfe0">• '+p+'</div>';}).join('')+'</div>';
    } else {
      let s='<div style="height:100%;padding:14px;display:flex;flex-direction:column;gap:10px"><div style="font:700 13px var(--font-display);color:#3a8a8a">信息图式排版</div>';
      cs.points.slice(0,4).forEach(function(p,i){ s+='<div style="display:flex;align-items:center;gap:10px"><div style="width:26px;height:26px;border-radius:50%;background:#3a8a8a;color:#fff;font:700 12px Inter,sans-serif;display:flex;align-items:center;justify-content:center;flex:0 0 auto">'+(i+1)+'</div><div style="font:12px Inter,sans-serif;color:#c2cfe0">'+p+'</div></div>'; });
      s+='<div style="font:11px Inter,sans-serif;color:#7e8aa0;text-align:center">'+cs.title+'</div></div>';
      stage.innerHTML=s;
    }

    }
    fill(); render('info');
    c.querySelectorAll('[data-m]:not([data-m="ig"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="ig"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="info"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="ig"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="ig"])'); render(act ? act.dataset.m : 'info'); };
  },
  'brand-vi'(c) {
    const cs = CASES.find(x => x.id === 'brand-guidebook') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="mini-slide" data-vi-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">风格拼凑</button>
          <button class="demo-btn active" data-m="good">统一 VI</button>
        </div>
        <div class="demo-label" data-vi-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-vi-stage]'), hint = c.querySelector('[data-vi-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'统一 VI', tagBad:'风格拼凑',
        good: () => { let s=''; const xs=[80,370,660], titles=['品牌诊断','视觉规范','应用落地'];
          for (let i=0;i<3;i++){ const x=xs[i];
            s += svgRect(x,160,220,250,'#fff',10,'rgba(26,51,0,.12)')
              + svgRect(x+14,176,26,9,'#2f6f3a',2)
              + svgTxt(x+14,226,titles[i],18,SVG_INK,700)
              + svgTxt(x+14,254,'统一标题左对齐',13,SVG_MUTED)
              + svgRect(x+14,372,192,5,'#2f6f3a'); }
          return s; },
        bad: () => { const x=[80,370,660], r=[0,18,6], c=['#cb5521','#3a7bd5','#8a8a8a'], t=['品牌诊断','视觉规范','应用落地'], ts=[18,22,15], ft=['页脚居中','页脚右对齐','无页脚'];
          return [0,1,2].map(i=> svgRect(x[i],160,220,250,'#fff',r[i],c[i],2)
            + svgTxt(x[i]+14,[230,222,238][i],t[i],ts[i],c[i],700)
            + svgTxt(x[i]+14,372,ft[i],12,c[i])).join(''); } });
      hint.textContent = mode === 'good'
        ? '品牌规范：Logo、标题、页脚统一，跨页像同一家公司出品。'
        : '风格拼凑：三页各用不同版式，看起来像几个人拼的 deck。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => {
      btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); };
    });
  },
  'quick-access'(c) {
    let ci = Math.floor(Math.random()*CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="qaName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="qa">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="qaStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="addUndo">+ 撤销</button><button class="demo-btn" data-m="addBrush">+ 格式刷</button><button class="demo-btn" data-m="addEye">+ 选择窗格</button><button class="demo-btn" data-m="reset">清空</button></div>' +
    '</div>';
    const stage = c.querySelector('#qaStage');
    const nameEl = c.querySelector('#qaName');
    const ICONS = { save:'保存', undo:'↶ 撤销', brush:'🖌 格式刷', eye:'👁 选择窗格' };
    let tools = ['保存'];
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m){
      if (m === 'addUndo' && tools.indexOf('undo')<0) tools.push('undo');
      else if (m === 'addBrush' && tools.indexOf('brush')<0) tools.push('brush');
      else if (m === 'addEye' && tools.indexOf('eye')<0) tools.push('eye');
      else if (m === 'reset') tools = ['保存'];
      const cs = CASES[ci];
      let h = '';
      for (let i=0;i<tools.length;i++){ h += '<div style="min-width:30px;height:30px;padding:0 8px;border-radius:6px;background:#e7ecdf;display:flex;align-items:center;justify-content:center;font:13px var(--font-body);color:#1a3300">'+ICONS[tools[i]]+'</div>'; }
      stage.innerHTML = '<div style="height:100%;padding:16px;display:flex;flex-direction:column;gap:12px;justify-content:center">' +
        '<div style="font:700 13px var(--font-display);color:#2f6f3a">'+cs.title+' · 快速访问工具栏</div>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;padding:8px;background:#fff;border:1px solid rgba(26,51,0,.12);border-radius:8px;min-height:46px">'+h+'</div>' +
        '<div style="font:11px var(--font-body);color:#6b7280">点下方按钮把常用命令钉到工具栏</div>' +
      '</div>';
    }
    fill(); render('none');
    c.querySelectorAll('[data-m]:not([data-m="qa"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="qa"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    c.querySelector('[data-m="qa"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="qa"])'); render(act ? act.dataset.m : 'none'); };
  },
  'find-replace'(c) {
    let ci = Math.floor(Math.random()*CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="frName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="fr">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="frStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="go">替换</button><button class="demo-btn" data-m="reset">重置</button></div>' +
    '</div>';
    const stage = c.querySelector('#frStage');
    const nameEl = c.querySelector('#frName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m){
      const cs = CASES[ci];
      const seed = cs.body.slice(0,2);
      let txt = cs.body;
      if (m === 'go'){
        const o = c.querySelector('#frOld').value;
        const n = c.querySelector('#frNew').value;
        if (o) txt = txt.split(o).join(n);
      }
      stage.innerHTML = '<div style="height:100%;padding:14px;display:flex;flex-direction:column;gap:10px">' +
        '<div style="font:700 13px var(--font-display);color:#2f6f3a">'+cs.title+' · 查找替换</div>' +
        '<div style="display:flex;gap:8px">' +
          '<input id="frOld" placeholder="旧词" value="'+seed+'" style="flex:1;padding:6px 8px;border:1px solid rgba(26,51,0,.2);border-radius:6px;font:12px var(--font-body)">' +
          '<input id="frNew" placeholder="新词" value="【'+seed+'】" style="flex:1;padding:6px 8px;border:1px solid rgba(26,51,0,.2);border-radius:6px;font:12px var(--font-body)">' +
        '</div>' +
        '<div style="background:#fff;border:1px solid rgba(26,51,0,.12);border-radius:8px;padding:10px;font:12px/1.6 var(--font-body);color:#1a3300;min-height:60px">'+txt+'</div>' +
      '</div>';
    }
    fill(); render('init');
    c.querySelectorAll('[data-m]:not([data-m="fr"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="fr"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    c.querySelector('[data-m="fr"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="fr"])'); render(act ? act.dataset.m : 'init'); };
  },
  'loop-anim'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="lpName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="lp">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="lpStage" style="display:flex;align-items:center;justify-content:center;overflow:hidden">' +
          '<style>@keyframes lpPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.14);opacity:.82}}</style>' +
          '<div id="lpObj" style="padding:14px 22px;background:rgba(47,111,58,.6);border-radius:12px;color:#fff;font:16px var(--font-body);text-align:center;max-width:78%"></div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="on">循环开</button>' +
          '<button class="demo-btn" data-m="off">循环关</button>' +
        '</div>' +
      '</div>';
    const obj = c.querySelector('#lpObj');
    const nameEl = c.querySelector('#lpName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){ obj.textContent = CASES[ci].title; }
    function play(m){
      if (m === 'on'){ obj.style.animation = 'lpPulse 1.1s ease-in-out infinite'; }
      else { obj.style.animation = 'none'; obj.style.transform = 'none'; obj.style.opacity = '1'; }
    }
    fill(); scene(); play('on');
    c.querySelectorAll('[data-m]:not([data-m="lp"])').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="lp"])').forEach(x => x.classList.remove('active'));
      btn.classList.add('active'); play(btn.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="on"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="lp"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); const act = c.querySelector('[data-m].active:not([data-m="lp"])'); play(act ? act.dataset.m : 'on'); };
  },  'custom-show'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xcs">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="all">全部放映</button><button class="demo-btn" data-m="pick">自定义(1·3·5)</button></div>'
    + '<div class="demo-label" style="text-align:center">勾选子集，自定义只放筛选的页</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  const pick = m === 'pick';
  const items = cs.points.map(function(p, i){
    const on = pick ? (i % 2 === 0) : true;
    return '<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;border-radius:6px;' + (on ? 'background:rgba(47,111,58,.12)' : 'opacity:.4;background:rgba(26,51,0,.04)') + '">'
      + '<span style="width:12px;height:12px;border-radius:3px;background:' + (on ? '#2f6f3a' : '#bbbbbb') + '"></span>'
      + '<span style="font:11px var(--font-body);color:#1a3300">' + p + '</span>'
    + '</div>';
  }).join('');
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:6px">'
    + '<div style="font:700 13px var(--font-display);color:#1a3300">' + cs.title + ' · ' + (pick ? '自定义放映清单' : '完整放映') + '</div>'
    + items
  + '</div>';
  }
  fill(); render('all');
  c.querySelectorAll('[data-m]:not([data-m="xcs"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xcs"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="all"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xcs"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xcs"])'); render(act ? act.dataset.m : 'all'); };
},

  'screen-blank-pen'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xsb">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="normal">正常</button><button class="demo-btn" data-m="blank">黑屏</button><button class="demo-btn" data-m="pen">荧光笔</button></div>'
    + '<div class="demo-label" style="text-align:center">黑屏/荧光笔，演示中的临场控制</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  let inner;
  if (m === 'blank') {
    inner = '<div style="position:absolute;inset:0;background:#000"></div>'
      + '<div style="position:absolute;left:0;right:0;bottom:8px;text-align:center;font:10px var(--font-mono);color:#7e8aa0">听众看黑屏，你私下看备注</div>';
  } else {
    inner = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:6px">'
      + '<div style="font:700 14px var(--font-display);color:#1a3300">' + cs.title + '</div>'
      + '<div style="font:11px var(--font-body);color:#4a5a3a">' + cs.points[0] + '</div>'
      + '</div>';
    if (m === 'pen') {
      inner = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:6px">'
        + '<div style="font:700 14px var(--font-display);color:#1a3300">' + cs.title + '</div>'
        + '<div style="font:11px var(--font-body);color:#4a5a3a">' + cs.points[0] + '</div>'
        + '<div style="position:absolute;right:14px;bottom:14px;width:60px;height:18px;background:rgba(255,235,59,.55);border-radius:3px;transform:rotate(-3deg)"></div>'
        + '</div>'
        + '<div style="position:absolute;left:12px;top:8px;font:10px var(--font-mono);color:#2f6f3a">✎ 荧光笔标注中</div>';
    }
  }
  stage.innerHTML = inner;
  }
  fill(); render('normal');
  c.querySelectorAll('[data-m]:not([data-m="xsb"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xsb"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="normal"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xsb"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xsb"])'); render(act ? act.dataset.m : 'normal'); };
},

  'present-online'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xpo">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="local">本地放映</button><button class="demo-btn" data-m="online">联机放映</button></div>'
    + '<div class="demo-label" style="text-align:center">联机放映：扫码即看，无需拷文件</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  if (m === 'online') {
    stage.innerHTML = '<div style="position:absolute;inset:0;display:flex;gap:10px;padding:12px;background:#16203a">'
      + '<div style="width:54px;height:54px;border-radius:8px;background:#0c1322;border:1px solid #2f6f3a;display:flex;align-items:center;justify-content:center;font:8px var(--font-mono);color:#9fe3c5;text-align:center">扫码<br>加入</div>'
      + '<div style="flex:1;display:flex;flex-direction:column;gap:5px">'
        + '<div style="font:700 12px var(--font-display);color:#eef3e6">' + cs.title + ' · 直播中</div>'
        + '<div style="font:10px var(--font-body);color:#bcd99b">🔗 ' + cs.footer + '/live</div>'
        + '<div style="font:10px var(--font-body);color:#7e8aa0">观众 12 人已连接</div>'
      + '</div>'
    + '</div>';
  } else {
    stage.innerHTML = '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#16203a"><div style="font:700 14px var(--font-display);color:#eef3e6">' + cs.title + '</div></div>';
  }
  }
  fill(); render('online');
  c.querySelectorAll('[data-m]:not([data-m="xpo"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xpo"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="online"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xpo"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xpo"])'); render(act ? act.dataset.m : 'online'); };
},

  'font-license'(c) {
    const cs = CASES.find(x => x.id === 'font-license') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="mini-slide" data-fl-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">混入需授权字体</button>
          <button class="demo-btn active" data-m="good">全部免费商用</button>
        </div>
        <div class="demo-label" data-fl-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-fl-stage]'), hint = c.querySelector('[data-fl-hint]');
    function fontRow(x, y, it) {
      const col = it.ok ? '#2f6f3a' : '#cb5521';
      return svgRect(x, y, 420, 76, '#fff', 12, 'rgba(26,51,0,.12)')
        + '<circle cx="' + (x+30) + '" cy="' + (y+38) + '" r="12" fill="' + col + '" opacity=".12"/>'
        + '<text x="' + (x+30) + '" y="' + (y+43) + '" text-anchor="middle" font-size="16" fill="' + col + '" font-family="' + SVG_MONO + '">' + (it.ok ? '✓' : '!') + '</text>'
        + svgTxt(x + 62, y + 32, it.n, 19, SVG_INK, 700)
        + svgTxt(x + 62, y + 56, it.t, 13, col, 400);
    }
    function render() {
      const m = mode === 'good';
      const items = m ? [
        { n: '思源宋体（标题）', t: '免费商用', ok: true },
        { n: '思源黑体（正文）', t: '免费商用', ok: true },
        { n: '站酷快乐体（装饰）', t: '免费商用', ok: true }
      ] : [
        { n: '思源宋体（标题）', t: '免费商用', ok: true },
        { n: '微软雅黑（正文）', t: '需单独授权', ok: false },
        { n: '方正兰亭黑（数据）', t: '需单独授权', ok: false }
      ];
      const x = 270;
      const scene = svgTxt(480, 146, cs.title, 34, SVG_INK, 700, 'middle')
        + svgTxt(480, 188, cs.subtitle, 16, SVG_MUTED, 400, 'middle')
        + items.map((it, i) => fontRow(x, 222 + i * 92, it)).join('');
      stage.innerHTML = demoPageCompact({ cs, mode, accent: m ? '#2f6f3a' : '#cb5521', tag: m ? '免费商用' : '授权风险', good: () => scene, bad: () => scene });
      hint.textContent = m
        ? '全部免费商用：思源系列、站酷系列等免费商用字体，公开传播零版权风险。'
        : '混入需授权字体：微软雅黑、方正字体等常被误认为系统自带即可商用，实际公开传播往往需单独授权。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => {
      btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); };
    });
  },
  'edit-points'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="epName">案例加载中…</span>
          <button class="demo-btn" data-m="ep">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="epStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="plain">未编辑</button><button class="demo-btn" data-m="edit">编辑顶点</button></div>
      </div>`;
    const stage = c.querySelector('#epStage');
    const nameEl = c.querySelector('#epName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    const pts=[[20,80],[60,42],[112,30],[170,46],[192,86],[120,96]];
    function poly(edit){
      let s='<svg viewBox="0 0 220 120" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">';
      const d='M'+pts.map(function(p){return p[0]+' '+p[1];}).join(' L')+' Z';
      s+='<path d="'+d+'" fill="rgba(58,138,138,.16)" stroke="#3a8a8a" stroke-width="2" stroke-dasharray="'+(edit?'5 4':'0')+'"/>';
      if(edit){ pts.forEach(function(p){ s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4" fill="#e46d4c" stroke="#fff" stroke-width="1"/>'; }); }
      s+='</svg>';
      return s;
    }
    stage.innerHTML='<div style="height:100%;display:flex;flex-direction:column;gap:6px;padding:10px"><div style="flex:1">'+poly(m==='edit')+'</div><div style="font:11px Inter,sans-serif;color:#7e8aa0;text-align:center">'+(m==='edit'?'编辑顶点：拖动点改变轮廓':'未编辑：整体形状')+' · '+cs.title+'</div></div>';

    }
    fill(); render('edit');
    c.querySelectorAll('[data-m]:not([data-m="ep"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="ep"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="edit"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="ep"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="ep"])'); render(act ? act.dataset.m : 'edit'); };
  },
  'action-button'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="abName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="ab">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="jump">跳转页</button>
          <button class="demo-btn" data-m="sound">播放声音</button>
          <button class="demo-btn" data-m="link">打开链接</button>
        </div>
        <div class="mini-slide" id="abStage" style="display:flex;flex-direction:column;gap:12px;align-items:center;justify-content:center">
          <div id="abBtn" style="padding:10px 18px;border-radius:24px;background:linear-gradient(135deg,#2f6f3a,#1a3300);color:#ffffff;font:600 14px var(--font-display);cursor:pointer"></div>
          <div id="abMsg" style="font:13px var(--font-mono);color:var(--color-fog-veil)">点按钮看动作效果</div>
        </div>
      </div>`;
    const msg = c.querySelector('#abMsg'), btn = c.querySelector('#abBtn'), nameEl = c.querySelector('#abName');
    const map = { jump: '→ 跳转到指定幻灯片', sound: '♪ 播放提示音', link: '↗ 打开网页 / 文件' };
    function fill() { const cs = CASES[ci]; nameEl.textContent = '案例：' + cs.title; btn.textContent = cs.title; }
    function act(m) { msg.textContent = map[m]; }
    fill();
    btn.onclick = () => act(c.querySelector('[data-m].active').dataset.m);
    c.querySelectorAll('[data-m]:not([data-m="ab"])').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="ab"])').forEach(x => x.classList.remove('active')); b.classList.add('active'); act(b.dataset.m); });
    c.querySelector('[data-m="ab"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },

  'comment'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="cmName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="cm">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="show">批注中</button>
          <button class="demo-btn" data-m="resolved">已解决</button>
        </div>
        <div class="mini-slide" id="cmStage" style="position:relative;padding:16px"></div>
      </div>`;
    const s = c.querySelector('#cmStage'), nameEl = c.querySelector('#cmName');
    function render(m) {
      const cs = CASES[ci];
      if (m === 'show') s.innerHTML = `<div style="font:600 15px var(--font-display);color:var(--color-ice-highlight)">${cs.title}</div><div style="margin-top:8px;font:13px var(--font-mono);color:var(--color-fog-veil)">${cs.subtitle}</div><div style="position:absolute;right:14px;top:14px;width:26px;height:26px;border-radius:50%;background:#cb5521;color:#ffffff;display:flex;align-items:center;justify-content:center;font:600 13px var(--font-display)">1</div><div style="position:absolute;right:8px;top:42px;max-width:120px;padding:8px 10px;border-radius:8px;background:rgba(203,85,33,.15);border:1px solid rgba(203,85,33,.4);font:12px var(--font-mono);color:#1a3300">同事：这里再加个数据支撑？</div>`;
      else s.innerHTML = `<div style="font:600 15px var(--font-display);color:var(--color-ice-highlight)">${cs.title}</div><div style="margin-top:8px;font:13px var(--font-mono);color:var(--color-fog-veil)">${cs.subtitle}</div><div style="margin-top:10px;font:12px var(--font-mono);color:#2f6f3a">✓ 批注已解决，从版面移除</div>`;
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('show');
    c.querySelectorAll('[data-m]:not([data-m="cm"])').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="cm"])').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.m); });
    c.querySelector('[data-m="cm"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },

  'ruler'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="ruName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="ru">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="on">标尺开</button>
          <button class="demo-btn" data-m="off">标尺关</button>
        </div>
        <div class="mini-slide" id="ruStage" style="padding:0;overflow:hidden"></div>
      </div>`;
    const s = c.querySelector('#ruStage'), nameEl = c.querySelector('#ruName');
    function render(m) {
      const cs = CASES[ci];
      const content = `<div style="position:absolute;top:34%;left:20%;right:20%;text-align:center;color:#1a3300"><div style="font:700 18px var(--font-body)">${cs.title}</div><div style="font:13px var(--font-body);color:#4a5a3a;margin-top:4px">${cs.subtitle}</div></div>`;
      if (m === 'off') { s.innerHTML = content; return; }
      s.innerHTML = `<div style="position:absolute;top:0;left:0;right:0;height:14px;background:repeating-linear-gradient(90deg,rgba(26,51,0,.25) 0 1px,transparent 1px 20px)"></div><div style="position:absolute;top:0;bottom:0;left:14px;width:14px;background:repeating-linear-gradient(0deg,rgba(26,51,0,.25) 0 1px,transparent 1px 20px)"></div>${content}`;
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('on');
    c.querySelectorAll('[data-m]:not([data-m="ru"])').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="ru"])').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.m); });
    c.querySelector('[data-m="ru"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },

  'compare-merge'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="cmpName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="cmp">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="mine">我的</button>
          <button class="demo-btn" data-m="his">他的</button>
          <button class="demo-btn" data-m="merge">合并</button>
        </div>
        <div class="mini-slide" id="cmpStage" style="display:flex;gap:10px;align-items:center;justify-content:center;padding:12px"></div>
      </div>`;
    const s = c.querySelector('#cmpStage'), nameEl = c.querySelector('#cmpName');
    function page(label, lines, diff) {
      return `<div style="width:44%;height:84%;border:1px solid ${diff ? '#cb5521' : 'var(--color-glass-edge)'};border-radius:6px;padding:8px;background:rgba(26,51,0,.04);display:flex;flex-direction:column;gap:5px"><div style="font:600 11px var(--font-display);color:var(--color-ice-highlight)">${label}</div>${lines.map(l => `<div style="height:6px;border-radius:3px;background:${l}"></div>`).join('')}${diff ? '<div style="font:10px var(--font-mono);color:#cb5521">● 此页有改动</div>' : ''}</div>`;
    }
    function render(m) {
      const cs = CASES[ci];
      const mineLines = cs.points.slice(0, 3).map(() => '#2f6f3a').concat('rgba(26,51,0,.3)');
      const hisLines = cs.points.slice(0, 2).map(() => '#2f6f3a').concat(['#cb5521', 'rgba(26,51,0,.3)']);
      if (m === 'mine') s.innerHTML = page('我的版', mineLines, false) + page('他的版', hisLines, true);
      else if (m === 'his') s.innerHTML = page('我的版', mineLines, true) + page('他的版', hisLines, false);
      else s.innerHTML = page('合并后', hisLines, false) + page('合并后', hisLines, false);
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('mine');
    c.querySelectorAll('[data-m]:not([data-m="cmp"])').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="cmp"])').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.m); });
    c.querySelector('[data-m="cmp"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },

  'wordart'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="waName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="waS">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="plain">普通标题</button>
          <button class="demo-btn" data-m="wa">质感艺术字</button>
          <button class="demo-btn" data-m="wave">节奏变形</button>
        </div>
        <div class="mini-slide" id="waStage" style="display:flex;align-items:center;justify-content:center;background:#fbfcf7"></div>
      </div>`;
    const s = c.querySelector('#waStage'), nameEl = c.querySelector('#waName');
    function render(m) {
      const t = CASES[ci].title;
      if (m === 'plain') {
        s.innerHTML = `<div style="text-align:center"><div style="font:700 32px var(--font-display);color:#1a3300;letter-spacing:-.5px">${t}</div><div style="margin-top:8px;font:14px var(--font-body);color:#5a6b4a">${CASES[ci].subtitle}</div></div>`;
      } else if (m === 'wa') {
        s.innerHTML = `<div style="text-align:center"><div style="font:800 34px var(--font-display);background:linear-gradient(135deg,#1a3300 0%,#2f6f3a 55%,#3a7bd5 100%);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:-.5px">${t}</div><div style="margin-top:8px;font:14px var(--font-body);color:#5a6b4a">${CASES[ci].subtitle}</div></div>`;
      } else {
        const chars = t.split('').map((ch, i) => `<span style="display:inline-block;transform:translateY(${i % 2 === 0 ? -4 : 4}px);font:800 32px var(--font-display);color:#2f6f3a">${ch}</span>`).join('');
        s.innerHTML = `<div style="text-align:center"><div style="letter-spacing:6px">${chars}</div><div style="margin-top:8px;font:14px var(--font-body);color:#5a6b4a">${CASES[ci].subtitle}</div></div>`;
      }
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('plain');
    c.querySelectorAll('[data-m]:not([data-m="waS"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="waS"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    c.querySelector('[data-m="waS"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="waS"])').dataset.m); };
  },
  'object-effect'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="oeName">案例加载中…</span>
          <button class="demo-btn" data-m="oe">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="oeStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="off">无效果</button><button class="demo-btn" data-m="on">阴影+映像</button></div>
      </div>`;
    const stage = c.querySelector('#oeStage');
    const nameEl = c.querySelector('#oeName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    const on=m==='on';
    stage.innerHTML='<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:14px"><div style="width:60%;padding:16px;background:linear-gradient(135deg,#3a8a8a,#2f6f3a);border-radius:10px;color:#fff;box-shadow:'+(on?'0 12px 24px rgba(0,0,0,.45)':'none')+'"><div style="font:700 14px var(--font-display)">'+cs.title+'</div><div style="margin-top:6px;font:11px Inter,sans-serif;opacity:.9">'+cs.subtitle+'</div></div>'+(on?'<div style="width:50%;height:18px;background:linear-gradient(135deg,#3a8a8a,#2f6f3a);border-radius:0 0 10px 10px;opacity:.18;transform:scaleY(-1);filter:blur(1px)"></div>':'')+'<div style="font:11px Inter,sans-serif;color:#7e8aa0">'+(on?'阴影 + 映像':'无效果')+'</div></div>';

    }
    fill(); render('on');
    c.querySelectorAll('[data-m]:not([data-m="oe"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="oe"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="on"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="oe"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="oe"])'); render(act ? act.dataset.m : 'on'); };
  },
  'bullet'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="buName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="buS">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="none">无</button>
          <button class="demo-btn" data-m="dot">项目符号</button>
          <button class="demo-btn" data-m="num">编号</button>
          <button class="demo-btn" data-m="nested">多级</button>
        </div>
        <div class="mini-slide" id="buStage" style="display:flex;flex-direction:column;gap:6px;justify-content:center;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#buStage'), nameEl = c.querySelector('#buName');
    function render(m) {
      const items = CASES[ci].points;
      if (m === 'none') s.innerHTML = items.map(t => `<div style="font:13px var(--font-mono);color:var(--color-frost-glow)">${t}</div>`).join('');
      else if (m === 'dot') s.innerHTML = items.map(t => `<div style="font:13px var(--font-mono);color:var(--color-frost-glow)"><span style="color:#2f6f3a">●</span> ${t}</div>`).join('');
      else if (m === 'num') s.innerHTML = items.map((t, i) => `<div style="font:13px var(--font-mono);color:var(--color-frost-glow)"><span style="color:#2f6f3a;font-weight:700">${i + 1}.</span> ${t}</div>`).join('');
      else s.innerHTML = `<div style="font:13px var(--font-mono);color:var(--color-frost-glow)"><span style="color:#2f6f3a">●</span> ${items[0]}</div><div style="font:13px var(--font-mono);color:var(--color-fog-veil);margin-left:18px"><span style="color:#2f6f3a">–</span> ${items[1] || ''}</div><div style="font:13px var(--font-mono);color:var(--color-frost-glow)"><span style="color:#2f6f3a">●</span> ${items[2] || ''}</div>`;
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('none');
    c.querySelectorAll('[data-m]:not([data-m="buS"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="buS"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    c.querySelector('[data-m="buS"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="buS"])').dataset.m); };
  },
  'hide-slide'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xhs">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="show">全部显示</button><button class="demo-btn" data-m="hide">隐藏第 3 页</button></div>'
    + '<div class="demo-label" style="text-align:center">隐藏某页，放映时自动跳过</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  const hide = m === 'hide';
  const thumbs = cs.points.slice(0,4).map(function(p, i){
    const hidden = hide && i === 2;
    return '<div style="flex:1;min-width:0;height:40px;border-radius:5px;border:1px solid ' + (hidden ? '#bbbbbb' : '#2f6f3a') + ';background:' + (hidden ? 'rgba(0,0,0,.06)' : 'rgba(47,111,58,.08)') + ';display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:' + (hidden ? '0.45' : '1') + '">'
      + '<span style="font:10px var(--font-mono);color:' + (hidden ? '#999999' : '#2f6f3a') + '">P' + (i+1) + '</span>'
      + (hidden ? '<span style="font:9px var(--font-mono);color:#b04a3a">隐藏</span>' : '')
    + '</div>';
  }).join('');
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px">'
    + '<div style="font:700 12px var(--font-display);color:#1a3300">' + cs.title + ' · 幻灯片缩略图</div>'
    + '<div style="display:flex;gap:6px">' + thumbs + '</div>'
    + '<div style="font:10px var(--font-body);color:' + (hide ? '#b04a3a' : '#2f6f3a') + '">' + (hide ? '第 3 页已隐藏，放映时跳过' : '全部参与放映') + '</div>'
  + '</div>';
  }
  fill(); render('show');
  c.querySelectorAll('[data-m]:not([data-m="xhs"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xhs"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="show"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xhs"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xhs"])'); render(act ? act.dataset.m : 'show'); };
},


  'narration'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xna">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="off">无旁白</button><button class="demo-btn" data-m="rec">录制旁白</button></div>'
    + '<div class="demo-label" style="text-align:center">录制旁白，给幻灯片配上人声</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  const rec = m === 'rec';
  const waves = rec ? '<div style="display:flex;align-items:flex-end;gap:2px;height:18px">' + [3,7,12,5,9,4,11,6,8,5,10,4].map(function(h){ return '<span style="width:3px;height:' + h + 'px;background:#2f6f3a;border-radius:1px"></span>'; }).join('') + '</div>' : '';
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px;background:' + (rec ? '#16203a' : '#fbfcf7') + '">'
    + '<div style="font:700 13px var(--font-display);color:' + (rec ? '#eef3e6' : '#1a3300') + '">' + cs.title + '</div>'
    + '<div style="font:11px var(--font-body);color:' + (rec ? '#bcd99b' : '#4a5a3a') + '">' + cs.subtitle + '</div>'
    + (rec
        ? '<div style="margin-top:auto;display:flex;align-items:center;gap:8px"><span style="font:10px var(--font-mono);color:#9fe3c5">● REC</span>' + waves + '<span style="margin-left:auto;font:10px var(--font-mono);color:#9fe3c5">00:42</span></div>'
        : '<div style="margin-top:auto;font:10px var(--font-mono);color:#7e8aa0">静音放映</div>')
  + '</div>';
  }
  fill(); render('rec');
  c.querySelectorAll('[data-m]:not([data-m="xna"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xna"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="rec"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xna"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xna"])'); render(act ? act.dataset.m : 'rec'); };
},


  'transparency'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="trName">案例加载中…</span>
          <button class="demo-btn" data-m="tr">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="trStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="p100">100%</button><button class="demo-btn" data-m="p60">60%</button><button class="demo-btn" data-m="p30">30%</button></div>
      </div>`;
    const stage = c.querySelector('#trStage');
    const nameEl = c.querySelector('#trName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    const op = m==='p100'?1: m==='p60'?0.6:0.3;
    stage.innerHTML='<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:14px"><div style="width:60%;height:46%;border-radius:10px;opacity:'+op+';background:linear-gradient(135deg,#3a8a8a,#cb5521);display:flex;align-items:center;justify-content:center;color:#fff;font:700 16px var(--font-display)">'+cs.kicker+'</div><div style="font:11px Inter,sans-serif;color:#7e8aa0">不透明度 '+Math.round(op*100)+'% · '+cs.title+'</div></div>';

    }
    fill(); render('p100');
    c.querySelectorAll('[data-m]:not([data-m="tr"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="tr"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="p100"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="tr"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="tr"])'); render(act ? act.dataset.m : 'p100'); };
  },
  'slide-size'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="ssName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="ss">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="43">4:3 传统</button>
          <button class="demo-btn" data-m="169">16:9 宽屏</button>
          <button class="demo-btn" data-m="a4">A4 打印</button>
        </div>
        <div class="demo-row" style="justify-content:center">
          <div id="ssBox" style="background:linear-gradient(135deg,#2f6f3a,#1a3300;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#ffffff;font:600 14px var(--font-mono);box-shadow:0 10px 30px rgba(26,51,0,.4)"></div>
        </div>
        <div class="demo-label" id="ssTip"></div>
      </div>`;
    const box = c.querySelector('#ssBox'), tip = c.querySelector('#ssTip'), nameEl = c.querySelector('#ssName');
    const map = { '43': [176, 132, '4:3 · 偏方，信息容量大'], '169': [200, 112, '16:9 · 宽屏，贴合投影/屏幕'], 'a4': [150, 212, 'A4 · 竖向，适合打印讲义'] };
    function render(m) {
      const [w, h, t] = map[m];
      box.style.width = w + 'px'; box.style.height = h + 'px';
      box.textContent = CASES[ci].title;
      tip.textContent = t;
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('43');
    c.querySelectorAll('[data-m]:not([data-m="ss"])').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="ss"])').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.m); });
    c.querySelector('[data-m="ss"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="ss"])').dataset.m); };
  },

  'replace-font'(c) {
    const cs = CASES.find(x => x.id === 'replace-font') || CASES[0];
    let cur = 'yahei';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">字体选择：同一段内容，换字体会改变整页气质</div>
        <div class="mini-slide" data-rf-stage></div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="yahei">黑体 · 现代</button>
          <button class="demo-btn" data-m="song">宋体 · 典雅</button>
          <button class="demo-btn" data-m="kai">楷体 · 人文</button>
          <button class="demo-btn" data-m="mono">等宽 · 冷静</button>
        </div>
        <div class="demo-label" data-rf-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-rf-stage]'), hint = c.querySelector('[data-rf-hint]');
    const presets = {
      yahei: { titleF: SVG_SANS, bodyF: SVG_SANS, accent: '#2f6f3a', tag: '黑体 · 现代', desc: '黑体笔画简洁、识别度高，适合数据年报和现代商务场景。', decor: '' },
      song:  { titleF: SVG_SERIF, bodyF: SVG_SERIF, accent: '#2f6f3a', tag: '宋体 · 典雅', desc: '宋体横细竖粗，自带书卷气，适合文化、品牌故事和正式汇报。', decor: 'line' },
      kai:   { titleF: '"KaiTi","楷体","STKaiti",serif', bodyF: '"KaiTi","楷体","STKaiti",serif', accent: '#2f6f3a', tag: '楷体 · 人文', desc: '楷体接近手写，温度感强，适合教育、手作、非遗等人文主题。', decor: 'seal' },
      mono:  { titleF: SVG_MONO, bodyF: SVG_MONO, accent: '#2f6f3a', tag: '等宽 · 冷静', desc: '等宽字体机械感强，适合技术文档、代码展示和数据核对场景。', decor: 'code' }
    };
    function render(m) {
      const p = presets[m];
      let scene = svgTxt(480, 156, cs.title, 42, SVG_INK, 700, 'middle', p.titleF)
        + svgTxt(480, 208, cs.subtitle, 16, SVG_MUTED, 400, 'middle', p.bodyF)
        + '<line x1="360" y1="236" x2="600" y2="236" stroke="#2f6f3a" stroke-width="3"/>'
        + svgRect(170, 274, 180, 116, '#2f6f3a', 12)
        + svgTxt(260, 334, '12 座', 40, '#ffffff', 700, 'middle', p.titleF)
        + svgTxt(260, 370, '新建公园', 14, '#ffffff', 400, 'middle', p.bodyF)
        + svgRect(390, 274, 180, 116, '#2f6f3a', 12)
        + svgTxt(480, 334, '38 万', 40, '#ffffff', 700, 'middle', p.titleF)
        + svgTxt(480, 370, '年客流', 14, '#ffffff', 400, 'middle', p.bodyF)
        + svgRect(610, 274, 180, 116, '#2f6f3a', 12)
        + svgTxt(700, 334, '96%', 40, '#ffffff', 700, 'middle', p.titleF)
        + svgTxt(700, 370, '满意度', 14, '#ffffff', 400, 'middle', p.bodyF)
        + svgTxt(480, 444, '年度回顾与展望', 15, SVG_INK, 400, 'middle', p.bodyF);
      if (p.decor === 'line') {
        scene += '<line x1="340" y1="470" x2="620" y2="470" stroke="#2f6f3a" stroke-width="1" opacity=".4"/>';
      } else if (p.decor === 'seal') {
        scene += '<rect x="800" y="440" width="44" height="44" rx="4" fill="#cb5521" opacity=".85"/>'
          + svgTxt(822, 470, '楷', 18, '#ffffff', 700, 'middle', SVG_SANS);
      } else if (p.decor === 'code') {
        scene += svgTxt(340, 470, '// font-family: monospace', 13, SVG_MUTED, 400, 'start', SVG_MONO);
      }
      stage.innerHTML = demoPageCompact({ cs, mode: 'good', accent: '#2f6f3a', tag: p.tag, good: () => scene, bad: () => scene });
      hint.textContent = p.desc;
    }
    render('yahei');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); b.classList.add('active'); cur = b.dataset.m; render(cur); });
  },
  'gridlines'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="glName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="gl">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="on">显示网格线</button>
          <button class="demo-btn" data-m="off">隐藏</button>
        </div>
        <div class="mini-slide" id="glStage" style="position:relative;overflow:hidden"></div>
      </div>`;
    const s = c.querySelector('#glStage'), nameEl = c.querySelector('#glName');
    function render(m) {
      const on = m === 'on'; const cs = CASES[ci];
      s.style.background = on
        ? 'linear-gradient(rgba(26,51,0,.20) 1px,transparent 1px),linear-gradient(90deg,rgba(26,51,0,.20) 1px,transparent 1px),var(--surface-frosted-glass)'
        : 'var(--surface-frosted-glass)';
      s.style.backgroundSize = on ? '14px 14px' : 'auto';
      s.innerHTML = on
        ? `<div style="position:absolute;left:18%;top:26%;width:64%;color:#1a3300"><div style="font:700 16px var(--font-body)">${cs.title}</div><div style="font:12px var(--font-body);color:#4a5a3a;margin-top:3px">${cs.subtitle}</div></div>`
        : `<div style="position:absolute;left:18%;top:30%;width:64%;color:#1a3300"><div style="font:700 16px var(--font-body)">${cs.title}</div></div>`;
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('on');
    c.querySelectorAll('[data-m]:not([data-m="gl"])').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="gl"])').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.m); });
    c.querySelector('[data-m="gl"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render('on'); };
  },

  'recolor'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="rcName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="rc">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="orig">原色</button>
          <button class="demo-btn" data-m="gray">灰度</button>
          <button class="demo-btn" data-m="sepia">怀旧</button>
          <button class="demo-btn" data-m="hue">换色调</button>
        </div>
        <div class="demo-row" id="rcStage" style="justify-content:center;align-items:center;min-height:130px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="rcHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#rcName');
    const stage = c.querySelector('#rcStage');
    const hint = c.querySelector('#rcHint');
    let cur = 'orig';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function filt(m){
      if (m === 'gray') return 'grayscale(1)';
      if (m === 'sepia') return 'sepia(.85)';
      if (m === 'hue') return 'hue-rotate(170deg)';
      return 'none';
    }
    function render(){
      const cs = CASES[ci];
      const labels = { orig:'原色', gray:'去色统一', sepia:'怀旧胶片', hue:'整体换色调' };
      stage.innerHTML = '<div style="width:150px;height:100px;border-radius:10px;background:linear-gradient(135deg,#ffb36b,#ff6a88);filter:' + filt(cur) + ';box-shadow:0 6px 18px rgba(0,0,0,.3)"></div>';
      hint.textContent = '案例「' + cs.title + '」配图' + labels[cur] + '，一键统一风格。';
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="rc"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="rc"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="rc"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },

  'coauthor'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="caName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="ca">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="multi">2 人协作中</button>
          <button class="demo-btn" data-m="solo">单人编辑</button>
        </div>
        <div class="mini-slide" id="caStage" style="position:relative;overflow:hidden"></div>
      </div>`;
    const s = c.querySelector('#caStage'), nameEl = c.querySelector('#caName');
    const ppl = [{ x: 22, y: 26, c: '#2f6f3a', n: '优卡' }, { x: 56, y: 52, c: '#2f6f3a', n: '小林' }];
    function render(m) {
      const cs = CASES[ci];
      if (m === 'solo') {
        s.innerHTML = '<div style="position:absolute;left:22%;top:28%;width:46%;height:28%;background:rgba(47,111,58,.4);border-radius:6px"></div>' + `<div style="position:absolute;left:22%;top:32%;width:46%;text-align:center;color:#ffffff;font:12px var(--font-body)">${cs.title}</div>`;
        return;
      }
      s.innerHTML = ppl.map(p => `<div style="position:absolute;left:${p.x}%;top:${p.y}%;display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:50%;background:${p.c};display:inline-block"></span><span style="font:11px var(--font-body);color:#ffffff;background:${p.c};padding:1px 6px;border-radius:4px">${p.n}</span></div>`).join('') + '<div style="position:absolute;left:22%;top:28%;width:46%;height:28%;background:rgba(47,111,58,.22);border:1px dashed rgba(47,111,58,.6);border-radius:6px"></div>' + `<div style="position:absolute;left:22%;top:32%;width:46%;text-align:center;color:#ffffff;font:12px var(--font-body)">${cs.title}</div>`;
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('multi');
    c.querySelectorAll('[data-m]:not([data-m="ca"])').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="ca"])').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.m); });
    c.querySelector('[data-m="ca"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="ca"])').dataset.m); };
  },
  'text-margin'(c) {
    const cs = CASES.find(x => x.title === '跨境独立站增长') || CASES[28];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">文本框内部边距＝文字离框边留出呼吸，才像设计</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">贴边文字</button>
          <button class="demo-btn active" data-m="good">内边距舒适</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'内边距舒适', tagBad:'贴边文字',
        good: () => svgRect(60,120,520,260,'#ffffff',16,'rgba(26,51,0,.12)')
          + `<rect x="82" y="142" width="476" height="216" fill="none" stroke="#2f6f3a" stroke-width="1" stroke-dasharray="5 5" opacity=".35"/>`
          + svgTxt(104,178,'CASE · 文本框内部边距',14,'#2f6f3a',700)
          + demoSvgLines(104,212,demoWrap(cs.body,18,5),15,SVG_INK,500,24)
          + svgTxt(104,400,'内边距 16px',13,SVG_MUTED,'',SVG_MONO)
          + svgRect(620,120,280,260,'#3a6ea5',16) + svgTxt(760,260,'增长路径',18,'#fff',700,'middle'),
        bad: () => svgRect(60,120,520,260,'#fff8ed',16,'rgba(203,85,33,.35)')
          + svgTxt(70,140,'CASE · 贴边文字',14,'#cb5521',700)
          + demoSvgLines(70,174,demoWrap(cs.body,20,5),15,SVG_INK,500,24)
          + svgTxt(70,400,'文字紧贴框边，像没留呼吸',13,'#cb5521',700,'',SVG_MONO)
          + svgRect(620,120,280,260,'#3a6ea5',16) + svgTxt(760,260,'增长路径',18,'#fff',700,'middle')
      });
      hint.textContent = mode === 'good' ? '内边距舒适：文字与框线留出 12–16px，引用框/金句框立刻显精致。' : '贴边文字：文字贴着框边，像没排版过，阅读也显得局促。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },

  'visual-flow'(c) {
    const cs = CASES.find(x => x.id === 'flow-report') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="mini-slide" data-flow-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">视线无引导</button>
          <button class="demo-btn active" data-m="good">视线有路径</button>
        </div>
        <div class="demo-label" data-flow-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-flow-stage]'), hint = c.querySelector('[data-flow-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'视线有路径', tagBad:'视线无引导',
        good: () => svgTxt(60,176,'市场增速超预期 47%',38,'#2f6f3a',700)
          + `<circle cx="84" cy="252" r="18" fill="#2f6f3a"/><text x="84" y="258" text-anchor="middle" font-family="${SVG_MONO}" font-size="13" fill="#fff">1</text>` + svgTxt(116,258,'线上渠道增长 62%',18,SVG_INK)
          + `<line x1="84" y1="272" x2="84" y2="308" stroke="#2f6f3a" stroke-width="2.5"/>`
          + `<circle cx="84" cy="330" r="18" fill="#2f6f3a"/><text x="84" y="336" text-anchor="middle" font-family="${SVG_MONO}" font-size="13" fill="#fff">2</text>` + svgTxt(116,336,'复购率提升至 41%',18,SVG_INK)
          + `<line x1="84" y1="350" x2="84" y2="386" stroke="#2f6f3a" stroke-width="2.5"/>`
          + `<circle cx="84" cy="404" r="18" fill="#2f6f3a"/><text x="84" y="410" text-anchor="middle" font-family="${SVG_MONO}" font-size="13" fill="#fff">3</text>` + svgTxt(116,410,'NPS 达到 72 分',18,SVG_INK),
        bad: () => { const b=[[60,160],[300,260],[560,180],[760,360]], t=['渠道增长','复购率','NPS','增速'], v=['线上 62%','提升至 41%','达到 72','超预期 47%'];
          return b.map((d,i)=> svgRect(d[0],d[1],200,120,'rgba(26,51,0,.06)',10)+svgTxt(d[0]+20,d[1]+48,t[i],18,SVG_INK,700)+svgTxt(d[0]+20,d[1]+82,v[i],14,SVG_MUTED)).join(''); } });
      hint.textContent = mode === 'good'
        ? '视觉流：结论置顶，论据沿编号路径下沉，视线自然从核心到细节。'
        : '视线无引导：元素平均分散，观众不知道先看哪、后看哪。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => {
      btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); };
    });
  },
  'info-density'(c) {
    const cs = CASES.find(x => x.id === 'density-brief') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="mini-slide" data-density-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">过密无呼吸</button>
          <button class="demo-btn active" data-m="good">疏密有节奏</button>
        </div>
        <div class="demo-label" data-density-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-density-stage]'), hint = c.querySelector('[data-density-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'疏密有节奏', tagBad:'信息过载',
        good: () => { const items=[['12.4k','新增粉丝'],['6.8%','互动率'],['38.6w','阅读量'],['3.2%','转化率'],['¥4.1','涨粉成本'],['9','爆款数']];
          const xs=[70,360,650], ys=[150,330], cw=230, ch=150;
          return items.map((it,i)=>{ const x=xs[i%3], y=ys[i<3?0:1];
            return svgRect(x,y,cw,ch,'#fff',12,'rgba(26,51,0,.12)')+svgTxt(x+18,y+66,it[0],36,SVG_MONO,700)+svgTxt(x+18,y+104,it[1],14,SVG_MUTED); }).join(''); },
        bad: () => { const items=[['12.4k','新增粉丝','↑ 18%'],['6.8%','互动率','↑ 5%'],['38.6w','阅读量','↓ 3%'],['3.2%','转化率','↑ 12%'],['¥4.1','涨粉成本','↓ 8%'],['9','爆款数','↑ 2']];
          const xs=[60,330,600], ys=[145,300,455], cw=240, ch=120;
          let s='';
          for (let r=0;r<3;r++) for (let c=0;c<3;c++) if (r*3+c < items.length) { const it=items[r*3+c], x=xs[c], y=ys[r];
            s += svgRect(x,y,cw,ch,'#f7f7f2',2,'rgba(26,51,0,.22)')
              + svgTxt(x+14,y+46,it[0],22,SVG_MONO,700)
              + svgTxt(x+14,y+74,it[1],12,SVG_MUTED)
              + svgTxt(x+150,y+74,it[2],11,'#2f6f3a',700)
              + `<line x1="${x+10}" y1="${y+90}" x2="${x+cw-10}" y2="${y+90}" stroke="rgba(26,51,0,.12)" stroke-width="1"/>`
              + `<rect x="${x+10}" y="${y+98}" width="${(it[0].length%3+1)*40}" height="6" fill="rgba(26,51,0,.18)"/>`; }
          return s + svgTxt(480,134,'本月数据总览',14,SVG_INK,700,'middle')
            + svgTxt(840,486,'来源：运营后台 · 更新于 10:00',10,SVG_MUTED,400,'end'); } });
      hint.textContent = mode === 'good'
        ? '信息密度：高密度数据页也要分组留白，该密处密、该疏处疏。'
        : '信息过载：一页塞入 6 个指标+环比+进度条+注释，没有主次和留白，读者无法快速抓取重点。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => {
      btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); };
    });
  },
  'consistency'(c) {
    const cs = CASES.find(x => x.id === 'consistent-deck') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="mini-slide" data-same-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">风格混杂</button>
          <button class="demo-btn active" data-m="good">风格统一</button>
        </div>
        <div class="demo-label" data-same-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-same-stage]'), hint = c.querySelector('[data-same-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'风格统一', tagBad:'风格混杂',
        good: () => { const items=[['🎧','智能降噪'],['🔋','超长续航'],['📡','多设备连'],['💧','IPX7 防水']];
          const xs=[35,265,495,725], y=160, cw=200, ch=240;
          return items.map((it,i)=>{ const x=xs[i];
            return svgRect(x,y,cw,ch,'#fff',14,'rgba(26,51,0,.12)')
              + `<circle cx="${x+cw/2}" cy="${y+70}" r="28" fill="#2f6f3a" opacity="0.12"/>`
              + svgTxt(x+cw/2,y+82,it[0],26,'#2f6f3a',400,'middle')
              + svgTxt(x+cw/2,y+150,it[1],17,SVG_INK,700,'middle'); }).join(''); },
        bad: () => { const items=[['🎧','智能降噪'],['🔋','超长续航'],['📡','多设备连'],['💧','IPX7 防水']];
          const r=[0,20,8,16], bg=['#fff','#3a7bd5','#f3eadf','#fff'], sc=['#cb5521','#3a7bd5','#8a8a8a','#2f6f3a'], sw=[2,0,1,1], fs=[24,20,28,22], fy=[85,80,90,84];
          const xs=[35,265,495,725], y=160, cw=200, ch=240;
          return items.map((it,i)=>{ const x=xs[i];
            return svgRect(x,y,cw,ch,r[i],bg[i],sc[i],sw[i])
              + svgTxt(x+cw/2,y+fy[i],it[0],fs[i],sc[i],400,'middle')
              + svgTxt(x+cw/2,y+150,it[1],17,sc[i],700,'middle'); }).join(''); } });
      hint.textContent = mode === 'good'
        ? '视觉一致性：图标、色彩、圆角统一，页面立刻从拼凑变专业。'
        : '风格混杂：三种图标风格、多种主色混用，看起来像草稿。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => {
      btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); };
    });
  },
  'slide-sorter'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="ssName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="ss">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn active" data-m="single">普通视图</button><button class="demo-btn" data-m="sorter">浏览视图</button></div>
        <div id="ssStage" class="mini-slide" style="display:flex;justify-content:center;padding:16px"></div>
      </div>`;
    const s = c.querySelector('#ssStage'), nameEl = c.querySelector('#ssName');
    function render(m) {
      const cs = CASES[ci];
      if (m === 'single') {
        s.style.flexDirection = 'column'; s.style.flexWrap = 'nowrap'; s.style.alignItems = 'center'; s.style.gap = '10px';
        s.innerHTML = `<div style="width:80%;aspect-ratio:16/9;background:rgba(26,51,0,.08);border:1px solid var(--color-glass-edge);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--color-fog-veil);font:13px var(--font-body)">${cs.title}（一次只看一页）</div>`;
      } else {
        s.style.flexDirection = 'row'; s.style.flexWrap = 'wrap'; s.style.alignItems = 'flex-start'; s.style.gap = '10px';
        const pages = ['封面', cs.subtitle, '正文 1', '正文 2', '数据', '总结', 'Q&A', '封底'];
        let h = '';
        pages.forEach((p, i) => h += `<div style="width:30%;aspect-ratio:16/9;background:rgba(47,111,58,.12);border:1px solid rgba(47,111,58,.4);border-radius:6px;display:flex;align-items:center;justify-content:center;color:#1a3300;font:11px var(--font-mono)">${i + 1}.${p}</div>`);
        s.innerHTML = h;
      }
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('single');
    c.querySelectorAll('[data-m]:not([data-m="ss"])').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="ss"])').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.m); });
    c.querySelector('[data-m="ss"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="ss"])').dataset.m); };
  },
  'notes-page'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="npName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="np">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn active" data-m="slide">只有幻灯片</button><button class="demo-btn" data-m="notes">+备注区</button></div>
        <div id="npStage" class="mini-slide" style="display:flex;flex-direction:column;gap:8px;padding:16px"></div>
      </div>`;
    const s = c.querySelector('#npStage'), nameEl = c.querySelector('#npName');
    function render(m) {
      const cs = CASES[ci];
      const slide = `<div style="width:100%;aspect-ratio:16/9;background:rgba(26,51,0,.08);border:1px solid var(--color-glass-edge);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--color-fog-veil);font:13px var(--font-body)">${cs.title}（观众看到）</div>`;
      s.innerHTML = m === 'notes'
        ? slide + `<div style="width:100%;min-height:44px;background:rgba(47,111,58,.1);border:1px dashed rgba(47,111,58,.5);border-radius:8px;padding:8px 10px;color:#1a3300;font:12px var(--font-body)">备注区：${cs.subtitle} · ${cs.points[0]}（只有你看到）</div>`
        : slide;
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('slide');
    c.querySelectorAll('[data-m]:not([data-m="np"])').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="np"])').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.m); });
    c.querySelector('[data-m="np"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="np"])').dataset.m); };
  },
  'reading-view'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="rvName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="rv">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn active" data-m="normal">普通视图</button><button class="demo-btn" data-m="reading">阅读视图</button></div>
        <div id="rvStage" class="mini-slide" style="display:flex;align-items:center;justify-content:center;padding:16px"></div>
      </div>`;
    const s = c.querySelector('#rvStage'), nameEl = c.querySelector('#rvName');
    function render(m) {
      const cs = CASES[ci];
      if (m === 'normal') {
        s.style.background = 'transparent';
        s.innerHTML = `<div style="width:62%;aspect-ratio:16/9;background:rgba(26,51,0,.08);border:1px solid var(--color-glass-edge);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--color-fog-veil);font:13px var(--font-body)">${cs.title}（编辑态 · 有标尺/缩略图）</div>`;
      } else {
        s.style.background = 'rgba(26,51,0,.55)';
        s.innerHTML = `<div style="width:82%;aspect-ratio:16/9;background:#ffffff;border:1px solid var(--color-glass-edge);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--color-ice-highlight);font:18px var(--font-display);text-align:center;padding:0 10px;flex-direction:column;gap:4px"><div>${cs.title}</div><div style="font:12px var(--font-body);color:#4a5a3a">${cs.subtitle}</div></div>`;
      }
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('normal');
    c.querySelectorAll('[data-m]:not([data-m="rv"])').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="rv"])').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(b.dataset.m); });
    c.querySelector('[data-m="rv"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="rv"])').dataset.m); };
  },
  'fill-rate'(c) {
    const cs = CASES.find(x => x.id === 'fill-cover') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="mini-slide" data-fill-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">高版面率过满</button>
          <button class="demo-btn active" data-m="good">低版面率显高级</button>
        </div>
        <div class="demo-label" data-fill-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-fill-stage]'), hint = c.querySelector('[data-fill-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'低版面率显高级', tagBad:'高版面率过满',
        good: () => svgTxt(480,272,'让设计会呼吸',48,SVG_INK,700,'middle')
          + svgTxt(480,324,'优卡品牌发布会 · 2026',18,SVG_MUTED,400,'middle'),
        bad: () => svgRect(60,132,840,42,'#2f6f3a',0)+svgTxt(480,160,'2026 优卡品牌发布会 · 限时报名中',14,'#fff',700,'middle')
          + svgTxt(480,210,'让设计会呼吸',26,SVG_INK,700,'middle')
          + svgTxt(480,240,'杭州 · 09.18 · 14:00',13,SVG_MUTED,400,'middle')
          + svgRect(90,270,168,78,'rgba(26,51,0,.10)',8)+svgTxt(174,312,'嘉宾阵容',13,SVG_INK,700,'middle')+svgTxt(174,334,'12 位行业大咖',11,SVG_MUTED,400,'middle')
          + svgRect(282,270,168,78,'rgba(26,51,0,.10)',8)+svgTxt(366,312,'活动议程',13,SVG_INK,700,'middle')+svgTxt(366,334,'3 大主题论坛',11,SVG_MUTED,400,'middle')
          + svgRect(474,270,168,78,'rgba(26,51,0,.10)',8)+svgTxt(558,312,'活动地点',13,SVG_INK,700,'middle')+svgTxt(558,334,'杭州国际博览中心',11,SVG_MUTED,400,'middle')
          + svgRect(666,270,168,78,'rgba(26,51,0,.10)',8)+svgTxt(750,312,'线上直播',13,SVG_INK,700,'middle')+svgTxt(750,334,'预约观看',11,SVG_MUTED,400,'middle')
          + svgRect(220,372,140,44,'#2f6f3a',22)+svgTxt(290,400,'立即预约',14,'#fff',700,'middle')
          + svgRect(390,372,140,44,'rgba(26,51,0,.14)',12)+svgTxt(460,400,'了解议程',14,SVG_INK,700,'middle')
          + svgRect(560,372,140,44,'rgba(26,51,0,.14)',12)+svgTxt(630,400,'回看直播',14,SVG_INK,700,'middle')
          + svgRect(60,440,840,36,'rgba(26,51,0,.06)',0)+svgTxt(120,462,'主办方：优卡PPT',11,SVG_MUTED,400,'start')+svgTxt(840,462,'合作媒体：优设 / 人人都是产品经理 / 顶尖PPT',11,SVG_MUTED,400,'end') });
      hint.textContent = mode === 'good'
        ? '版面率：封面只放一句话和大量留白，低版面率显高级、有呼吸感。'
        : '高版面率过满：封面塞满横幅、信息块、按钮和底部栏，留白被挤光，高级感和气场全无。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => {
      btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); };
    });
  },
  'cmyk-rgb'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xcr">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="rgb">屏幕 RGB</button><button class="demo-btn" data-m="cmyk">印刷 CMYK</button></div>'
    + '<div class="demo-label" style="text-align:center">对比同一品牌色在屏幕与印刷上的差异</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  const cmyk = m === 'cmyk';
  const col = cmyk ? '#9aa6b0' : '#4f9bff';
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px">'
    + '<div style="width:100%;height:54px;border-radius:6px;background:' + col + '"></div>'
    + '<div style="font:700 13px var(--font-display);color:#1a3300">' + cs.title + '</div>'
    + '<div style="font:11px var(--font-body);color:' + (cmyk ? '#b04a3a' : '#2f6f3a') + '">' + (cmyk ? '同一品牌色印刷后偏暗偏灰（CMYK 色域窄）' : '屏幕上看到的鲜亮色，印刷会丢饱和') + '</div>'
  + '</div>';
  }
  fill(); render('cmyk');
  c.querySelectorAll('[data-m]:not([data-m="xcr"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xcr"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="cmyk"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xcr"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xcr"])'); render(act ? act.dataset.m : 'cmyk'); };
},

  'text-outline'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="toName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="toS">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn active" data-m="off">无描边</button><button class="demo-btn" data-m="on">加描边</button></div>
        <div id="toStage" class="mini-slide" style="display:flex;align-items:center;justify-content:center;padding:18px;background:linear-gradient(135deg,#ffffff,#2f6f3a"></div>
      </div>`;
    const s = c.querySelector('#toStage'), nameEl = c.querySelector('#toName');
    function render(m) {
      const fs = '40px var(--font-display)';
      const t = CASES[ci].title;
      s.innerHTML = m === 'off'
        ? `<div style="font:${fs};color:#1a3300">${t}</div>`
        : `<div style="font:${fs};color:#ffffff;-webkit-text-stroke:2px rgba(26,51,0,.85);text-shadow:0 2px 8px rgba(26,51,0,.4)">${t}</div>`;
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('off');
    c.querySelectorAll('[data-m]:not([data-m="toS"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="toS"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    c.querySelector('[data-m="toS"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="toS"])').dataset.m); };
  },
  'action-settings'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="asName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="as">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label" id="asTip">点「目录」按钮 → 跳转到对应章节</div>
        <div id="asStage" class="mini-slide" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px">
          <button class="demo-btn" data-m="toc" style="font-size:14px">目录 · 章节1</button>
          <div id="asCur" style="font:12px var(--font-body);color:var(--color-fog-veil);text-align:center"></div>
        </div>
      </div>`;
    const nameEl = c.querySelector('#asName'), tip = c.querySelector('#asTip'), cur = c.querySelector('#asCur');
    const secs = ['执行摘要', '市场分析', '方案详情', '数据附录'];
    let n = 0;
    function render() { cur.textContent = '当前：' + CASES[ci].title + ' › ' + secs[n]; }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="as"])').forEach(b => b.onclick = () => {
      if (b.dataset.m === 'toc') { n = (n + 1) % secs.length; b.textContent = '目录 · 章节' + (n + 1); render(); }
    });
    c.querySelector('[data-m="as"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(); };
  },
  'emphasis-fx'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="efName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="ef">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="efStage" style="display:flex;align-items:center;justify-content:center;overflow:hidden">' +
          '<style>@keyframes efShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-9px)}40%{transform:translateX(9px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}@keyframes efFlash{0%{background:rgba(47,111,58,.6)}50%{background:rgba(203,85,33,.9)}100%{background:rgba(47,111,58,.6)}}</style>' +
          '<div id="efObj" style="padding:16px 24px;background:rgba(47,111,58,.6);border-radius:12px;color:#fff;font:17px var(--font-body);text-align:center;max-width:78%"></div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="pulse">脉冲放大</button>' +
          '<button class="demo-btn" data-m="grow">放大强调</button>' +
          '<button class="demo-btn" data-m="shake">抖动</button>' +
          '<button class="demo-btn" data-m="color">变色闪烁</button>' +
        '</div>' +
      '</div>';
    const obj = c.querySelector('#efObj');
    const nameEl = c.querySelector('#efName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){ obj.textContent = CASES[ci].title; }
    function clear(){ obj.style.transition = 'none'; obj.style.animation = 'none'; obj.style.transform = 'none'; obj.style.background = 'rgba(47,111,58,.6)'; }
    function play(m){
      clear();
      if (m === 'pulse'){ obj.style.transform = 'scale(1.18)'; setTimeout(function(){ obj.style.transition = 'transform .3s ease'; obj.style.transform = 'scale(1)'; }, 300); }
      else if (m === 'grow'){ obj.style.transition = 'transform .4s cubic-bezier(.22,1,.36,1)'; obj.style.transform = 'scale(1.25)'; }
      else if (m === 'shake'){ obj.style.animation = 'efShake .5s ease'; }
      else { obj.style.animation = 'efFlash 1s ease'; }
    }
    fill(); scene(); play('pulse');
    c.querySelectorAll('[data-m]:not([data-m="ef"])').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="ef"])').forEach(x => x.classList.remove('active'));
      btn.classList.add('active'); play(btn.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="pulse"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="ef"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); const act = c.querySelector('[data-m].active:not([data-m="ef"])'); play(act ? act.dataset.m : 'pulse'); };
  },  'icons'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="icName">案例加载中…</span>
          <button class="demo-btn" data-m="ic">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="icStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="line">线性图标</button><button class="demo-btn" data-m="fill">填充图标</button></div>
      </div>`;
    const stage = c.querySelector('#icStage');
    const nameEl = c.querySelector('#icName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    function iconRow(style){
      const fillC = style==='fill' ? '#3a8a8a' : 'none';
      const strokeC = style==='fill' ? 'none' : '#3a8a8a';
      let svg='<svg viewBox="0 0 90 30" preserveAspectRatio="xMidYMid meet" style="width:100%;height:30px">';
      svg+='<circle cx="15" cy="15" r="9" fill="'+fillC+'" stroke="'+strokeC+'" stroke-width="2"/>';
      svg+='<polygon points="45,5 56,25 34,25" fill="'+fillC+'" stroke="'+strokeC+'" stroke-width="2"/>';
      svg+='<rect x="70" y="6" width="18" height="18" rx="3" fill="'+fillC+'" stroke="'+strokeC+'" stroke-width="2"/>';
      svg+='</svg>';
      return svg;
    }
    stage.innerHTML='<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;color:#c2cfe0"><div style="width:70%;background:rgba(186,214,247,.08);border-radius:8px;padding:10px 14px">'+iconRow(m)+'</div><div style="font:700 13px var(--font-display);color:#3a8a8a;text-align:center">'+cs.title+'</div><div style="font:11px Inter,sans-serif;color:#7e8aa0">'+(m==='fill'?'填充图标':'线性图标')+'</div></div>';

    }
    fill(); render('line');
    c.querySelectorAll('[data-m]:not([data-m="ic"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="ic"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="line"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="ic"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="ic"])'); render(act ? act.dataset.m : 'line'); };
  },
  autosave(c) {
    let ci = Math.floor(Math.random()*CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="asName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="as">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="asStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="save">已自动保存</button><button class="demo-btn" data-m="restore">模拟恢复</button></div>' +
    '</div>';
    const stage = c.querySelector('#asStage');
    const nameEl = c.querySelector('#asName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m){
      const cs = CASES[ci];
      const restoring = (m === 'restore');
      const status = restoring ? '已恢复至自动保存版本 · 刚刚' : '已自动保存 · 刚刚';
      const dot = restoring ? '#2f6f3a' : '#3a8a8a';
      stage.innerHTML = '<div style="height:100%;padding:16px;display:flex;flex-direction:column;gap:14px;justify-content:center">' +
        '<div style="font:700 14px var(--font-display);color:#2f6f3a">'+cs.title+'</div>' +
        '<div style="background:#fff;border:1px solid rgba(26,51,0,.12);border-radius:10px;padding:12px;font:12px var(--font-body);color:#1a3300;line-height:1.6">'+cs.body+'</div>' +
        '<div style="display:flex;align-items:center;gap:8px;font:12px var(--font-body);color:#4a5a3a"><span style="width:8px;height:8px;border-radius:50%;background:'+dot+'"></span>'+status+'</div>' +
      '</div>';
    }
    fill(); render('save');
    c.querySelectorAll('[data-m]:not([data-m="as"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="as"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="save"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="as"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="as"])'); render(act ? act.dataset.m : 'save'); };
  },
  'vertical-text'(c) {
    const csH = CASES.find(x => x.id === 'vertical-text') || CASES[0];
    const csV = { title:'供应链降本专项', subtitle:'从采购、物流到库存，全链路降本提效', part:'13', partName:'成本拆分',
      points:['年度目标降本 8.5%','集中采购覆盖 12 个品类','仓储周转天数压到 19 天'],
      body:'降本不能只压价格。采购合并、库存周转和运输报价三件事一起做，才不会把成本问题转成质量问题。',
      footer:'优卡说PPT · 竖排文字', kicker:'VERT', img:'case4-park.jpg' };
    let mode = 'h';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="mini-slide" data-vt-stage></div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="h">横排 · 现代</button>
          <button class="demo-btn" data-m="v">竖排 · 国风</button>
        </div>
        <div class="demo-label" data-vt-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-vt-stage]'), hint = c.querySelector('[data-vt-hint]');
    function render(m) {
      const isV = m === 'v';
      let svg;
      if (isV) {
        const chars = csV.title.split('');
        const y0 = 130, gap = 60;
        const content = '<rect x="0" y="0" width="960" height="540" fill="#f7f3ea"/>'
          + '<rect x="0" y="0" width="960" height="6" fill="#b5532a"/>'
          + svgTxt(80, 150, '专项启动', 18, '#b5532a', 700, 'start', SVG_SANS)
          + svgTxt(80, 186, '2026', 14, SVG_MUTED, 400, 'start', SVG_SANS)
          + '<line x1="80" y1="220" x2="80" y2="420" stroke="#b5532a" stroke-width="2"/>'
          + svgTxt(80, 456, '城市绿洲 · 运营中心', 13, SVG_MUTED, 400, 'start', SVG_SANS)
          + chars.map((ch, i) => svgTxt(780, y0 + i * gap, ch, 48, SVG_INK, 700, 'middle', SVG_SERIF)).join('')
          + svgTxt(860, y0 + (chars.length - 1) * gap + 30, '——', 16, '#b5532a', 400, 'start', SVG_SERIF)
          + '<rect x="700" y="480" width="44" height="44" rx="4" fill="#b5532a" opacity=".15"/>'
          + svgTxt(722, 510, '印', 18, '#b5532a', 700, 'middle', SVG_SANS)
          + svgTxt(48, 520, csV.footer, 13, 'rgba(26,51,0,.54)', 400, 'start', SVG_MONO)
          + svgTxt(912, 520, 'VERT · 竖排国风', 13, 'rgba(26,51,0,.54)', 400, 'end', SVG_MONO);
        svg = '<svg viewBox="0 0 960 540" width="100%" height="100%" role="img" aria-label="竖排文字国风页面案例" style="display:block">' + content + '</svg>';
      } else {
        const scene = svgTxt(120, 184, csH.title, 48, SVG_INK, 700, 'start', SVG_SANS)
          + svgTxt(120, 238, '2026 城市绿洲运营中心 · 专项启动', 16, SVG_MUTED, 400, 'start', SVG_SANS)
          + '<line x1="120" y1="274" x2="300" y2="274" stroke="#2f6f3a" stroke-width="3"/>'
          + svgTxt(120, 336, '从采购、物流到库存，全链路降本提效', 20, SVG_INK, 500, 'start', SVG_SANS)
          + svgRect(120, 400, 180, 48, '#2f6f3a', 24)
          + svgTxt(210, 430, '查看行动路径', 15, '#ffffff', 700, 'middle', SVG_SANS);
        svg = demoPageCompact({ cs: csH, mode: 'good', accent: '#2f6f3a', tag: '横排 · 现代', good: () => scene, bad: () => scene });
      }
      stage.innerHTML = svg;
      hint.textContent = isV
        ? '竖排：标题从右至左、从上至下，配左侧落款与印章，适合国风封面和专项启动页。'
        : '横排：标题左对齐、副标题跟随，阅读路径从左到右，适合现代商务汇报。';
    }
    render('h');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); b.classList.add('active'); mode = b.dataset.m; render(mode); });
  },
  'para-spacing'(c) {
    const cs = CASES.find(x => x.title === 'SaaS 产品路线图') || CASES[29];
    const p1 = '路线图页要避免堆功能名，应该解释每个版本解决什么协作问题。';
    const p2 = '评论、模板、权限，分别对应沟通、复用和治理。';
    const p3 = 'V2.4 上线评论与审批流；V2.5 支持跨项目模板；V2.6 增加权限审计日志。';
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">段前/段后间距＝段落之间留出节奏，读者才不会迷路</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">段落粘连</button>
          <button class="demo-btn active" data-m="good">段落分明</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'段落分明', tagBad:'段落粘连',
        good: () => svgRect(60,120,820,340,'#ffffff',16,'rgba(26,51,0,.12)')
          + demoSvgLines(82,162,demoWrap(p1,38,2),16,SVG_INK,500,28)
          + demoSvgLines(82,240,demoWrap(p2,38,2),16,SVG_INK,500,28)
          + demoSvgLines(82,318,demoWrap(p3,38,2),16,SVG_INK,500,28)
          + `<line x1="82" y1="225" x2="858" y2="225" stroke="#cb5521" stroke-width="1" stroke-dasharray="4 4" opacity=".4"/>`
          + `<line x1="82" y1="303" x2="858" y2="303" stroke="#cb5521" stroke-width="1" stroke-dasharray="4 4" opacity=".4"/>`
          + svgTxt(82,470,'段前 6pt / 段后 6pt',13,SVG_MUTED,'',SVG_MONO),
        bad: () => svgRect(60,120,820,340,'#ffffff',16,'rgba(26,51,0,.12)')
          + demoSvgLines(82,162,demoWrap(p1 + p2 + p3,42,8),16,SVG_INK,500,28)
          + svgTxt(82,470,'段落之间没有间距',13,'#cb5521',700,'',SVG_MONO)
      });
      hint.textContent = mode === 'good' ? '段落分明：段前段后留出固定间距，长文也有呼吸感，结构一眼可见。' : '段落粘连：所有文字贴在一起，没有节奏，读者容易迷失。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },
  'chart-edit'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="ceName">案例加载中…</span>
          <button class="demo-btn" data-m="ce">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="ceStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="bar">柱状图</button><button class="demo-btn" data-m="line">折线图</button></div>
      </div>`;
    const stage = c.querySelector('#ceStage');
    const nameEl = c.querySelector('#ceName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    const items=cs.points.slice(0,4).map(function(p,i){return {v:[0.7,0.45,0.9,0.6][i%4]};});
    if(m==='bar'){
      let s='<svg viewBox="0 0 220 100" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%"><line x1="15" y1="85" x2="210" y2="85" stroke="#56657f"/>';
      const n=items.length, slot=190/n;
      items.forEach(function(it,i){ const h=12+it.v*68; const x=20+i*slot+4; s+='<rect x="'+x+'" y="'+(85-h)+'" width="'+(slot-10)+'" height="'+h+'" rx="2" fill="#3a8a8a"/>'; });
      s+='</svg>';
      stage.innerHTML='<div style="height:100%;padding:12px;display:flex;flex-direction:column;gap:6px"><div style="flex:1">'+s+'</div><div style="font:11px Inter,sans-serif;color:#7e8aa0;text-align:center">柱状图 · '+cs.title+'</div></div>';
    } else {
      const n=items.length; let pts=[];
      items.forEach(function(it,i){ const x=20+i*(190/(n-1)); const y=85-(12+it.v*68); pts.push(x+','+y); });
      const s='<svg viewBox="0 0 220 100" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%"><line x1="15" y1="85" x2="210" y2="85" stroke="#56657f"/><polyline points="'+pts.join(' ')+'" fill="none" stroke="#e46d4c" stroke-width="2"/></svg>';
      stage.innerHTML='<div style="height:100%;padding:12px;display:flex;flex-direction:column;gap:6px"><div style="flex:1">'+s+'</div><div style="font:11px Inter,sans-serif;color:#7e8aa0;text-align:center">折线图 · '+cs.title+'</div></div>';
    }

    }
    fill(); render('bar');
    c.querySelectorAll('[data-m]:not([data-m="ce"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="ce"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="bar"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="ce"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="ce"])'); render(act ? act.dataset.m : 'bar'); };
  },
  'audio-insert'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="auName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="au">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="play">播放</button>
          <button class="demo-btn" data-m="pause">暂停</button>
        </div>
        <div class="demo-row" id="auStage" style="justify-content:center;align-items:center;min-height:120px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="auHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#auName');
    const stage = c.querySelector('#auStage');
    const hint = c.querySelector('#auHint');
    let cur = 'play';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function wave(active){
      let s = '';
      const hs = [10,18,26,14,30,20,12,24,16,28];
      for (let i = 0; i < hs.length; i++) s = s + '<div style="width:4px;height:' + hs[i] + 'px;border-radius:2px;background:' + (active ? '#2f6f3a' : '#56657f') + '"></div>';
      return s;
    }
    function render(){
      const cs = CASES[ci];
      const playing = cur === 'play';
      stage.innerHTML = '<div style="width:200px;padding:12px 14px;background:rgba(20,28,44,.9);border-radius:12px">'
        + '<div style="display:flex;align-items:center;gap:10px">'
        + '<div style="width:30px;height:30px;border-radius:50%;background:#2f6f3a;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px">' + (playing ? '⏸' : '▶') + '</div>'
        + '<div style="flex:1"><div style="font:12px sans-serif;color:#eef3e6">🎵 ' + cs.title + '</div>'
        + '<div style="display:flex;align-items:center;gap:3px;margin-top:8px;height:30px">' + wave(playing) + '</div>'
        + '<div style="height:4px;border-radius:2px;background:#56657f;margin-top:8px"><div style="height:4px;width:' + (playing ? '62%' : '30%') + ';border-radius:2px;background:#2f6f3a"></div></div></div></div></div>';
      hint.textContent = playing ? '嵌入音频，放映时点一下就能播。' : '点「播放」试试。';
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="au"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="au"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="au"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },
  'video-insert'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="viName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="vi">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="play">播放</button>
          <button class="demo-btn" data-m="pause">暂停</button>
        </div>
        <div class="demo-row" id="viStage" style="justify-content:center;align-items:center;min-height:140px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="viHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#viName');
    const stage = c.querySelector('#viStage');
    const hint = c.querySelector('#viHint');
    let cur = 'play';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(){
      const cs = CASES[ci];
      const playing = cur === 'play';
      stage.innerHTML = '<div style="position:relative;width:200px;height:112px;border-radius:10px;background:linear-gradient(135deg,#1f2b47,#3a4a6a);overflow:hidden">'
        + '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">'
        + '<div style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.85);display:flex;align-items:center;justify-content:center;font-size:16px;color:#1f2b47">' + (playing ? '⏸' : '▶') + '</div></div>'
        + '<div style="position:absolute;left:10px;top:8px;font:11px sans-serif;color:#c2cfe0">🎬 ' + cs.title + '</div>'
        + '<div style="position:absolute;left:10px;right:10px;bottom:8px;height:4px;border-radius:2px;background:rgba(255,255,255,.3)"><div style="height:4px;width:' + (playing ? '70%' : '25%') + ';border-radius:2px;background:#e8924a"></div></div></div>';
      hint.textContent = playing ? '插入视频，放映中可全屏播放。' : '点「播放」预览。';
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="vi"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="vi"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="vi"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },
  'a11y'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="axName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="ax">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn active" data-m="bad">问题多</button><button class="demo-btn" data-m="ok">检查通过</button></div>
        <div class="mini-slide" id="axStage" style="align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#axStage'), nameEl = c.querySelector('#axName');
    function render(m) {
      const ok = m === 'ok';
      const cs = CASES[ci];
      s.innerHTML = `<div style="display:flex;align-items:center;gap:14px">
        <div style="position:relative;width:96px;height:64px;border-radius:8px;background:linear-gradient(135deg,#2f6f3a,#2f6f3a)">
          <div style="position:absolute;top:6px;left:6px;right:6px;font:10px var(--font-mono);color:#e3ecd9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cs.title}</div>
          <div style="position:absolute;bottom:4px;left:4px;font:10px var(--font-mono);color:${ok ? '#e3ecd9' : '#cb5521'};background:rgba(26,51,0,.45);padding:1px 4px;border-radius:3px">alt ${ok ? '✓' : '✗'}</div>
        </div>
        <div style="font:13px var(--font-body);color:${ok ? '#e3ecd9' : '#cb5521'};text-align:left">${ok ? 'alt 齐全 · 对比度达标<br>阅读顺序正确' : '缺 alt · 对比度不足<br>顺序错乱'}</div>
      </div>`;
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('bad');
    c.querySelectorAll('[data-m]:not([data-m="ax"])').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="ax"])').forEach(x => x.classList.remove('active')); btn.classList.add('active'); render(btn.dataset.m); });
    c.querySelector('[data-m="ax"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="ax"])').dataset.m); };
  },
  'excel-table'(c) {
    const twCases = CASES.filter(x => x.tw && x.tw.aPts && x.tw.bPts);
    let ci = Math.floor(Math.random() * twCases.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="etName">案例加载中…</span>
          <button class="demo-btn" data-m="et">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="etStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="raw">原始文本</button><button class="demo-btn" data-m="sheet">粘贴为表格</button></div>
      </div>`;
    const stage = c.querySelector('#etStage');
    const nameEl = c.querySelector('#etName');
    function fill() { nameEl.textContent = '案例：' + twCases[ci].title; }
    function render(m) {
    const cs=twCases[ci];
    if(m==='raw'){
      let lines=[cs.tw.a+'   '+cs.tw.b];
      const n=Math.max(cs.tw.aPts.length,cs.tw.bPts.length);
      for(let i=0;i<n;i++){ lines.push((cs.tw.aPts[i]||'')+'   '+(cs.tw.bPts[i]||'')); }
      stage.innerHTML='<div style="height:100%;padding:14px"><div style="font:11px Inter,sans-serif;color:#7e8aa0;margin-bottom:6px">从 Excel 复制来的原始文本</div><div style="font:12px var(--font-mono);color:#c2cfe0;background:rgba(0,0,0,.2);padding:10px;border-radius:6px">'+(lines.map(function(l){return '<div style="white-space:pre">'+l+'</div>';}).join(''))+'</div></div>';
    } else {
      let rows='';
      const n=Math.max(cs.tw.aPts.length,cs.tw.bPts.length);
      for(let i=0;i<n;i++){ rows+='<tr><td style="padding:4px 8px;border:1px solid rgba(186,214,247,.25);color:#c2cfe0;font:11px Inter,sans-serif">'+cs.tw.aPts[i]+'</td><td style="padding:4px 8px;border:1px solid rgba(186,214,247,.25);color:#c2cfe0;font:11px Inter,sans-serif">'+cs.tw.bPts[i]+'</td></tr>'; }
      const tbl='<table style="border-collapse:collapse;width:100%"><thead><tr><th style="padding:5px 8px;background:#2f6f3a;color:#fff;font:11px Inter,sans-serif;text-align:left">'+cs.tw.a+'</th><th style="padding:5px 8px;background:#2f6f3a;color:#fff;font:11px Inter,sans-serif;text-align:left">'+cs.tw.b+'</th></tr></thead><tbody>'+rows+'</tbody></table>';
      stage.innerHTML='<div style="height:100%;padding:14px;overflow:auto"><div style="font:11px Inter,sans-serif;color:#7e8aa0;margin-bottom:6px">粘贴为 PowerPoint 表格</div>'+tbl+'</div>';
    }

    }
    fill(); render('sheet');
    c.querySelectorAll('[data-m]:not([data-m="et"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="et"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="sheet"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="et"]').onclick = function() { ci = Math.floor(Math.random()*twCases.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="et"])'); render(act ? act.dataset.m : 'sheet'); };
  },
  'section-view'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="svName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="sv">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn active" data-m="flat">长条展开</button><button class="demo-btn" data-m="fold">按节折叠</button></div>
        <div class="mini-slide" id="svStage" style="align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#svStage'), nameEl = c.querySelector('#svName');
    function render(m) {
      const cs = CASES[ci];
      const folded = m === 'fold';
      if (!folded) {
        s.innerHTML = `<div style="display:flex;flex-direction:column;gap:4px;width:240px">
          <div style="font:12px var(--font-body);color:#ffffff;margin-bottom:3px">▾ ${cs.title}（8 节 · 80 页）</div>` +
          Array.from({ length: 8 }, () => `<div style="height:16px;border-radius:4px;background:rgba(26,51,0,.12)"></div>`).join('') +
          `<div style="font:11px var(--font-body);color:var(--color-fog-veil);margin-top:4px">一整条，找页靠滚</div></div>`;
      } else {
        s.innerHTML = `<div style="display:flex;flex-direction:column;gap:8px;width:240px;text-align:left">
          <div style="font:12px var(--font-body);color:#ffffff">▾ ${cs.title}（8 页）</div>
          <div style="font:12px var(--font-body);color:#ffffff;opacity:.5">▸ 市场分析（20 页）</div>
          <div style="font:12px var(--font-body);color:#ffffff;opacity:.5">▸ 方案详情（40 页）</div>
          <div style="font:11px var(--font-body);color:var(--color-fog-veil)">按节折叠，只展开要讲的</div>
        </div>`;
      }
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('flat');
    c.querySelectorAll('[data-m]:not([data-m="sv"])').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="sv"])').forEach(x => x.classList.remove('active')); btn.classList.add('active'); render(btn.dataset.m); });
    c.querySelector('[data-m="sv"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="sv"])').dataset.m); };
  },
  'ai-gen'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="agName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="ag">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn active" data-m="blank">空白发呆</button><button class="demo-btn" data-m="gen">AI 出初稿</button></div>
        <div class="mini-slide" id="agStage" style="align-items:center;justify-content:center"></div>
      </div>`;
    const s = c.querySelector('#agStage'), nameEl = c.querySelector('#agName');
    function render(m) {
      const cs = CASES[ci];
      const gen = m === 'gen';
      if (!gen) {
        s.innerHTML = `<div style="width:220px;height:140px;border:2px dashed var(--color-glass-edge);border-radius:12px;display:flex;align-items:center;justify-content:center;text-align:center;font:14px var(--font-body);color:var(--color-fog-veil);padding:10px;line-height:1.5">${cs.title}…<br>从哪下手？</div>`;
      } else {
        s.innerHTML = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:200px">
          ${cs.points.slice(0, 6).map(p => `<div style="height:30px;border-radius:4px;background:rgba(47,111,58,.3);border:1px solid rgba(47,111,58,.5);display:flex;align-items:center;justify-content:center;font:9px var(--font-body);color:#fff;text-align:center;padding:0 3px;overflow:hidden">${p}</div>`).join('')}
          <div style="grid-column:1/4;font:11px var(--font-body);color:#2f6f3a">AI 出初稿 · 你改重点</div>
        </div>`;
      }
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('blank');
    c.querySelectorAll('[data-m]:not([data-m="ag"])').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="ag"])').forEach(x => x.classList.remove('active')); btn.classList.add('active'); render(btn.dataset.m); });
    c.querySelector('[data-m="ag"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="ag"])').dataset.m); };
  },
  'gestalt'(c) {
    const cs = CASES.find(x => x.id === 'gestalt-list') || CASES[0];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="mini-slide" data-gestalt-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">均匀散乱</button>
          <button class="demo-btn active" data-m="good">相近成组</button>
        </div>
        <div class="demo-label" data-gestalt-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-gestalt-stage]'), hint = c.querySelector('[data-gestalt-hint]');
    function render() {
      const items = [
        ['🔍','智能推荐','基于兴趣精准推送'], ['📰','内容发现','信息流自动聚合'], ['💬','社区互动','评论点赞与分享'],
        ['📊','数据分析','实时看板一目了然'], ['🔐','权限管理','角色与数据隔离'], ['✏️','协同编辑','多人同时在线改稿']
      ];
      const xs=[80,354,628];
      const card = (x,y,it) => svgRect(x,y,250,100,'#fff',10,'rgba(26,51,0,.12)')
        + svgTxt(x+22,y+46,it[0],22,'#2f6f3a',400)
        + svgTxt(x+54,y+46,it[1],16,SVG_INK,700)
        + svgTxt(x+22,y+78,it[2],13,SVG_MUTED);
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'相近成组', tagBad:'无分组',
        good: () => {
          const g1='rgba(47,111,58,.06)', g1b='rgba(47,111,58,.16)', g1t='#2f6f3a';
          const g2='rgba(74,90,120,.08)', g2b='rgba(74,90,120,.18)', g2t='#4a5a78';
          return svgRect(60,118,840,170,g1,14,g1b) + svgTxt(80,142,'用户端能力',16,g1t,700)
            + items.slice(0,3).map((it,i)=>card(xs[i],172,it)).join('')
            + svgRect(60,326,840,170,g2,14,g2b) + svgTxt(80,350,'管理端能力',16,g2t,700)
            + items.slice(3,6).map((it,i)=>card(xs[i],380,it)).join('');
        },
        bad: () => {
          const ys=[158,332]; let s='';
          const order=[2,4,0,5,1,3]; // 用户端/管理端能力混排，无分组
          for (let r=0;r<2;r++) for (let c=0;c<3;c++) s += card(xs[c],ys[r],items[order[r*3+c]]);
          return s;
        } });
      hint.textContent = mode === 'good'
        ? '相近成组：用户端/管理端两组等大、同排版规范，仅用绿/蓝灰区分阵营；组内紧凑、组间留白，一眼看清结构。'
        : '无分组：6 项能力打乱混排、无组标题和背景，大脑无法自动归类，像散装清单。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => {
      btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); };
    });
  },
  'embed-link'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="elName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="el">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="link">显示为链接</button>
          <button class="demo-btn" data-m="card">显示为预览卡</button>
        </div>
        <div class="demo-row" id="elStage" style="justify-content:center;align-items:center;min-height:120px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="elHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#elName');
    const stage = c.querySelector('#elStage');
    const hint = c.querySelector('#elHint');
    let cur = 'link';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(){
      const cs = CASES[ci];
      if (cur === 'link') {
        stage.innerHTML = '<a style="color:#7fd1ff;font:13px sans-serif;text-decoration:underline">🔗 点击打开：' + cs.title + '</a>';
        hint.textContent = '只放网址，观众要跳出去。';
      } else {
        stage.innerHTML = '<div style="width:200px;padding:12px;background:rgba(20,28,44,.9);border:1px solid rgba(186,214,247,.25);border-radius:12px">'
          + '<div style="font:13px sans-serif;color:#eef3e6;font-weight:600">📎 ' + cs.title + '</div>'
          + '<div style="font:11px sans-serif;color:#8a97ad;margin-top:6px">已嵌入的对象，放映中直接可点/可播放。</div></div>';
        hint.textContent = '嵌入为对象，站内就能用。';
      }
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="el"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="el"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="el"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },
  'theme-palette'(c) {
    const cs = CASES.find(x => x.id === 'theme-palette') || CASES[0];
    c.innerHTML = `
      <div class="demo-stack">
        <div class="mini-slide" data-tp-stage></div>
        <div class="demo-label" data-tp-hint style="text-align:center">只改主题色一格，标题、数据、按钮、强调线会批量联动</div>
      </div>`;
    const stage = c.querySelector('[data-tp-stage]');
    function miniSlide(main, light, x, label) {
      return svgRect(x, 110, 260, 380, light, 18)
        + svgTxt(x + 24, 160, cs.title, 19, main, 700, 'start', SVG_SANS)
        + svgTxt(x + 24, 190, cs.subtitle, 12, SVG_MUTED, 400, 'start', SVG_SANS)
        + '<line x1="' + (x + 24) + '" y1="210" x2="' + (x + 236) + '" y2="210" stroke="' + main + '" stroke-width="2"/>'
        + svgTxt(x + 24, 260, '核心指标', 12, SVG_MUTED, 700, 'start', SVG_SANS)
        + svgTxt(x + 24, 316, '87.3%', 42, main, 700, 'start', SVG_SANS)
        + svgTxt(x + 24, 350, '同比提升', 12, SVG_MUTED, 400, 'start', SVG_SANS)
        + '<rect x="' + (x + 24) + '" y="380" width="120" height="38" rx="19" fill="' + main + '"/>'
        + svgTxt(x + 84, 404, '下载白皮书', 13, '#ffffff', 700, 'middle', SVG_SANS)
        + svgTxt(x + 130, 478, label, 13, main, 700, 'middle', SVG_SANS);
    }
    const scene = miniSlide('#7a5abf', 'rgba(122,90,191,.10)', 60, '主题色：紫')
      + miniSlide('#2a8a8a', 'rgba(42,138,138,.10)', 350, '主题色：青')
      + miniSlide('#d4892a', 'rgba(212,137,42,.10)', 640, '主题色：橙');
    stage.innerHTML = demoPageCompact({ cs, mode: 'good', accent: '#2f6f3a', tag: '主题色联动', good: () => scene, bad: () => scene });
  },
  'doc-inspector'(c) {
    let ci = Math.floor(Math.random()*CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="diName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="di">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="diStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="open">检查文档</button><button class="demo-btn" data-m="close">收起</button></div>' +
    '</div>';
    const stage = c.querySelector('#diStage');
    const nameEl = c.querySelector('#diName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m){
      const cs = CASES[ci];
      const open = (m === 'open');
      const words = cs.body.length + cs.points.join('').length;
      const card = open ? ('<div style="background:#fff;border:1px solid rgba(26,51,0,.12);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px">' +
        '<div style="font:12px var(--font-body);color:#1a3300;display:flex;justify-content:space-between"><span>作者</span><span style="color:#6b7280">优卡</span></div>' +
        '<div style="font:12px var(--font-body);color:#1a3300;display:flex;justify-content:space-between"><span>正文字数</span><span style="color:#6b7280">'+words+' 字</span></div>' +
        '<div style="font:12px var(--font-body);color:#1a3300;display:flex;justify-content:space-between"><span>备注数</span><span style="color:#6b7280">'+cs.points.length+' 条</span></div>' +
        '<div style="font:12px var(--font-body);color:#1a3300;display:flex;justify-content:space-between"><span>页脚</span><span style="color:#6b7280">'+cs.footer+'</span></div>' +
      '</div>') : '<div style="font:11px var(--font-body);color:#9bb08a;text-align:center">点击「检查文档」展开信息</div>';
      stage.innerHTML = '<div style="height:100%;padding:16px;display:flex;flex-direction:column;gap:12px;justify-content:center">' +
        '<div style="font:700 14px var(--font-display);color:#2f6f3a">'+cs.title+' · 文档检查器</div>' + card +
      '</div>';
    }
    fill(); render('open');
    c.querySelectorAll('[data-m]:not([data-m="di"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="di"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="open"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="di"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="di"])'); render(act ? act.dataset.m : 'open'); };
  },
  'live-caption'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xlc">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="off">关闭字幕</button><button class="demo-btn" data-m="on">开启字幕</button></div>'
    + '<div class="demo-label" style="text-align:center">开启实时字幕，辅助观众理解</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  const on = m === 'on';
  stage.innerHTML = '<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;background:#16203a">'
    + '<div style="padding:12px">'
      + '<div style="font:700 13px var(--font-display);color:#eef3e6">' + cs.title + '</div>'
      + (on
          ? '<div style="margin-top:8px;display:inline-block;padding:6px 10px;background:rgba(0,0,0,.7);border-radius:6px;font:12px var(--font-body);color:#fff">' + cs.body + '</div>'
          : '<div style="margin-top:8px;font:10px var(--font-mono);color:#7e8aa0">（无字幕）</div>')
    + '</div>'
  + '</div>';
  }
  fill(); render('on');
  c.querySelectorAll('[data-m]:not([data-m="xlc"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xlc"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="on"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xlc"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xlc"])'); render(act ? act.dataset.m : 'on'); };
},

  'version-history'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="vhName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="vh">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row" id="vhList" style="gap:8px;flex-wrap:wrap;justify-content:center"></div>
        <div class="mini-slide" id="vhStage" style="align-items:center;justify-content:center;font:11px var(--font-body);color:rgba(26,51,0,.8);text-align:center;line-height:1.6"></div>
      </div>`;
    const list = c.querySelector('#vhList'), s = c.querySelector('#vhStage'), nameEl = c.querySelector('#vhName');
    const vers = [
      { t: 'v3 · 现在（改崩）', d: '结构乱、配色崩', col: '#cb5521' },
      { t: 'v2 · 30 分钟前', d: '微调中', col: 'rgba(26,51,0,.4)' },
      { t: 'v1 · 2 小时前', d: '结构清晰 ✓', col: '#2f6f3a' }
    ];
    list.innerHTML = vers.map((v, i) => `<button class="demo-btn ${i === 0 ? 'active' : ''}" data-m="v${i}" style="flex-direction:column;gap:3px;align-items:flex-start"><span style="font-size:13px">${v.t}</span><span style="font-size:11px;opacity:.6">${v.d}</span></button>`).join('');
    function render(i) {
      const v = vers[i];
      s.innerHTML = `还原《${CASES[ci].title}》到「${v.t}」<br><span style="color:${v.col}">${v.d}</span>`;
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render(0);
    list.querySelectorAll('[data-m]').forEach(b => b.onclick = () => {
      list.querySelectorAll('.demo-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      render(+b.dataset.m.slice(1));
    });
    c.querySelector('[data-m="vh"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(+c.querySelector('#vhList .demo-btn.active').dataset.m.slice(1)); };
  },
  'ink-draw'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="idName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="id">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn active" data-m="before">批注前</button><button class="demo-btn" data-m="after">批注后</button></div>
        <div class="mini-slide" id="idStage" style="position:relative;align-items:flex-start;justify-content:flex-start;padding:14px"></div>
      </div>`;
    const s = c.querySelector('#idStage'), nameEl = c.querySelector('#idName');
    function render(m) {
      const cs = CASES[ci];
      const head = `<div style="position:absolute;top:18%;left:8%;width:70%;font:600 14px var(--font-body);color:var(--color-ice-highlight)">${cs.title}</div>`;
      const base = `<div style="position:absolute;top:38%;left:8%;width:55%;height:7px;background:rgba(26,51,0,.18);border-radius:3px"></div>`;
      if (m === 'after') {
        s.innerHTML = head + base + `
          <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 200 120" preserveAspectRatio="none">
            <ellipse cx="72" cy="42" rx="60" ry="28" fill="none" stroke="#fbf3cf" stroke-width="3" opacity=".9"/>
            <path d="M152 96 L170 70" stroke="#cb5521" stroke-width="3" fill="none"/>
            <text x="150" y="66" font-size="11" fill="#cb5521" font-family="sans-serif">改这里</text>
          </svg>`;
      } else {
        s.innerHTML = head + base;
      }
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('before');
    c.querySelectorAll('[data-m]:not([data-m="id"])').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="id"])').forEach(x => x.classList.remove('active')); btn.classList.add('active'); render(btn.dataset.m); });
    c.querySelector('[data-m="id"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="id"])').dataset.m); };
  },
  'color-psychology'(c) {
    const cs = CASES.find(x => x.id === 'color-psychology') || CASES[0];
    let cur = 'red';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="mini-slide" data-cp-stage></div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="red">红 · 紧迫</button>
          <button class="demo-btn" data-m="blue">蓝 · 信任</button>
          <button class="demo-btn" data-m="green">绿 · 自然</button>
          <button class="demo-btn" data-m="yellow">黄 · 提醒</button>
        </div>
        <div class="demo-label" data-cp-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-cp-stage]'), hint = c.querySelector('[data-cp-hint]');
    function render(m) {
      let scene, desc, tag;
      if (m === 'red') {
        tag = '红 · 紧迫'; desc = '红色：促销、倒计时、警示场景，制造紧迫感和行动冲动。';
        scene = svgRect(180, 120, 600, 360, 'rgba(203,85,33,.08)', 18)
          + '<line x1="220" y1="170" x2="320" y2="170" stroke="#cb5521" stroke-width="3"/>'
          + svgTxt(260, 166, '限时特惠', 14, '#cb5521', 700, 'start', SVG_MONO)
          + svgTxt(480, 220, '年度会员早鸟价', 18, SVG_MUTED, 400, 'middle', SVG_SANS)
          + svgTxt(480, 290, '¥299', 86, '#cb5521', 700, 'middle', SVG_SANS)
          + svgTxt(480, 344, '原价 ¥599 · 仅剩 72 小时', 14, SVG_MUTED, 400, 'middle', SVG_SANS)
          + svgRect(360, 370, 240, 54, '#cb5521', 27)
          + svgTxt(480, 402, '立即抢购', 18, '#ffffff', 700, 'middle', SVG_SANS);
      } else if (m === 'blue') {
        tag = '蓝 · 信任'; desc = '蓝色：金融、医疗、科技场景，传递专业、冷静与可信赖。';
        scene = svgRect(60, 120, 420, 360, 'rgba(58,106,156,.08)', 18)
          + svgTxt(100, 170, '资产配置年报', 24, '#3a6a9c', 700, 'start', SVG_SANS)
          + svgTxt(100, 206, '稳健增长 · 风险可控', 14, SVG_MUTED, 400, 'start', SVG_SANS)
          + svgTxt(100, 280, '8.6%', 64, '#3a6a9c', 700, 'start', SVG_SANS)
          + svgTxt(100, 330, '三年复合收益率', 13, SVG_MUTED, 400, 'start', SVG_SANS)
          + '<line x1="100" y1="370" x2="440" y2="370" stroke="#3a6a9c" stroke-width="2"/>'
          + svgTxt(100, 404, '数据经第三方审计', 12, SVG_MUTED, 400, 'start', SVG_SANS)
          + svgRect(520, 120, 380, 360, '#ffffff', 18, 'rgba(26,51,0,.12)')
          + svgTxt(550, 170, '资产分布', 16, '#3a6a9c', 700, 'start', SVG_SANS)
          + svgRect(550, 200, 80, 180, '#3a6a9c', 4)
          + svgRect(650, 260, 80, 120, 'rgba(58,106,156,.5)', 4)
          + svgRect(750, 310, 80, 70, 'rgba(58,106,156,.22)', 4)
          + svgTxt(550, 420, '股票 · 债券 · 现金', 13, SVG_MUTED, 400, 'start', SVG_SANS);
      } else if (m === 'green') {
        tag = '绿 · 自然'; desc = '绿色：环保、健康、农业场景，暗示生长、自然与安全。';
        scene = '<rect x="60" y="120" width="840" height="360" rx="18" fill="rgba(47,111,58,.08)"/>'
          + svgTxt(480, 180, '零碳园区计划', 38, '#2f6f3a', 700, 'middle', SVG_SANS)
          + svgTxt(480, 224, '绿色运营 · 持续未来', 16, SVG_MUTED, 400, 'middle', SVG_SANS)
          + '<path d="M140 380 Q260 300 400 340 T660 320 T820 360" fill="none" stroke="#2f6f3a" stroke-width="4" stroke-linecap="round" opacity=".35"/>'
          + svgTxt(480, 300, '–32%', 86, '#2f6f3a', 700, 'middle', SVG_SANS)
          + svgTxt(480, 360, '年度碳排放减少', 14, SVG_MUTED, 400, 'middle', SVG_SANS)
          + svgRect(360, 390, 240, 52, '#2f6f3a', 26)
          + svgTxt(480, 420, '查看 ESG 报告', 17, '#ffffff', 700, 'middle', SVG_SANS);
      } else {
        tag = '黄 · 提醒'; desc = '黄色：提醒、乐观、活力场景，吸引注意但不至于过度紧张。';
        scene = svgRect(260, 130, 440, 340, 'rgba(201,162,39,.10)', 20)
          + '<circle cx="480" cy="190" r="26" fill="#c9a227" opacity=".18"/>'
          + svgTxt(480, 200, '!', 30, '#c9a227', 700, 'middle', SVG_SANS)
          + svgTxt(480, 260, '系统升级通知', 28, '#c9a227', 700, 'middle', SVG_SANS)
          + svgTxt(480, 300, '今晚 00:00 – 02:00', 15, SVG_MUTED, 400, 'middle', SVG_SANS)
          + svgTxt(480, 360, '2 小时', 64, '#c9a227', 700, 'middle', SVG_SANS)
          + svgTxt(480, 410, '服务将短暂不可用', 13, SVG_MUTED, 400, 'middle', SVG_SANS)
          + svgRect(360, 430, 240, 48, '#c9a227', 24)
          + svgTxt(480, 458, '我知道了', 16, '#ffffff', 700, 'middle', SVG_SANS);
      }
      stage.innerHTML = demoPageCompact({ cs, mode: 'good', accent: '#2f6f3a', tag: tag, good: () => scene, bad: () => scene });
      hint.textContent = desc;
    }
    render('red');
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); b.classList.add('active'); cur = b.dataset.m; render(cur); });
  },
  'warm-cool'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="wcName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="wcS">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row"><button class="demo-btn active" data-m="warm">暖色主导</button><button class="demo-btn" data-m="cool">冷色主导</button></div>
        <div class="mini-slide" id="wcStage" style="align-items:center;justify-content:center;gap:14px"></div>
        <div class="demo-label" id="wcCap"></div>
      </div>`;
    const s = c.querySelector('#wcStage'), nameEl = c.querySelector('#wcName'), cap = c.querySelector('#wcCap');
    function render(m) {
      const warm = '#cb5521', cool = '#2f6f3a';
      const main = m === 'warm' ? warm : cool;
      const sub = m === 'warm' ? cool : warm;
      s.innerHTML = `
        <div style="width:96px;height:96px;border-radius:16px;background:${main};box-shadow:0 0 22px ${main}66;display:flex;align-items:center;justify-content:center;font:16px var(--font-body);color:#ffffff">重点</div>
        <div style="width:72px;height:72px;border-radius:14px;background:${sub};opacity:.55"></div>`;
      cap.textContent = '《' + CASES[ci].title + '》' + (m === 'warm' ? '暖色拉近距离、显热情' : '冷色拉开距离、显专业');
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('warm');
    c.querySelectorAll('[data-m]:not([data-m="wcS"])').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="wcS"])').forEach(x => x.classList.remove('active'));
      btn.classList.add('active'); render(btn.dataset.m);
    });
    c.querySelector('[data-m="wcS"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="wcS"])').dataset.m); };
  },
  'stagger'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="sgName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="sg">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="sgStage" style="display:flex;flex-direction:column;justify-content:center;gap:8px;padding:14px;overflow:hidden">' +
          '<div class="sgItem" style="padding:8px 12px;background:rgba(47,111,58,.5);border-radius:8px;color:#fff;font:13px var(--font-body);opacity:0;transform:translateY(10px)"></div>' +
          '<div class="sgItem" style="padding:8px 12px;background:rgba(58,123,213,.5);border-radius:8px;color:#fff;font:13px var(--font-body);opacity:0;transform:translateY(10px)"></div>' +
          '<div class="sgItem" style="padding:8px 12px;background:rgba(203,85,33,.5);border-radius:8px;color:#fff;font:13px var(--font-body);opacity:0;transform:translateY(10px)"></div>' +
          '<div class="sgItem" style="padding:8px 12px;background:rgba(126,107,255,.5);border-radius:8px;color:#fff;font:13px var(--font-body);opacity:0;transform:translateY(10px)"></div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="play">▶ 错峰登场</button>' +
          '<button class="demo-btn" data-m="all">同时登场</button>' +
        '</div>' +
      '</div>';
    const items = [].slice.call(c.querySelectorAll('.sgItem'));
    const nameEl = c.querySelector('#sgName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){
      const cs = CASES[ci];
      const ps = cs.points.slice(0, 4);
      items.forEach(function(el, i){ el.textContent = ps[i] || ('要点 ' + (i+1)); });
    }
    function reset(){ items.forEach(function(el){ el.style.transition = 'none'; el.style.opacity = '0'; el.style.transform = 'translateY(10px)'; }); }
    function play(m){
      reset();
      requestAnimationFrame(function(){
        items.forEach(function(el, i){
          const d = (m === 'all') ? 0 : (i * 0.12);
          el.style.transition = 'opacity .45s ease ' + d + 's, transform .45s cubic-bezier(.22,1,.36,1) ' + d + 's';
          el.style.opacity = '1'; el.style.transform = 'none';
        });
      });
    }
    fill(); scene(); play('play');
    c.querySelectorAll('[data-m]:not([data-m="sg"])').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="sg"])').forEach(x => x.classList.remove('active'));
      btn.classList.add('active'); play(btn.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="play"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="sg"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); const act = c.querySelector('[data-m].active:not([data-m="sg"])'); play(act ? act.dataset.m : 'play'); };
  },  'package'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xpk">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="pptx">仅 PPTX</button><button class="demo-btn" data-m="full">完整打包</button></div>'
    + '<div class="demo-label" style="text-align:center">完整打包，字体媒体一并带走</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  const full = m === 'full';
  const files = full
    ? ['📄 ' + cs.kicker + '.pptx', '🔤 字体/', '🎞 媒体/', '▶ 播放器.exe', '📋 链接.txt']
    : ['📄 ' + cs.kicker + '.pptx'];
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:7px;background:#fbfcf7">'
    + '<div style="font:700 12px var(--font-display);color:#1a3300">打包文件夹 · ' + cs.title + '</div>'
    + '<div style="display:flex;flex-direction:column;gap:4px">' + files.map(function(f){ return '<div style="font:11px var(--font-body);color:#4a5a3a">' + f + '</div>'; }).join('') + '</div>'
    + '<div style="margin-top:auto;font:10px var(--font-body);color:' + (full ? '#2f6f3a' : '#b04a3a') + '">' + (full ? '字体/视频一并打包，换电脑也能播' : '缺字体和视频，换电脑可能打不开') + '</div>'
  + '</div>';
  }
  fill(); render('full');
  c.querySelectorAll('[data-m]:not([data-m="xpk"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xpk"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="full"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xpk"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xpk"])'); render(act ? act.dataset.m : 'full'); };
},

  'rotate-flip'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="rfName">案例加载中…</span>
          <button class="demo-btn" data-m="rf">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="rfStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="none">原样</button><button class="demo-btn" data-m="rot">旋转90°</button><button class="demo-btn" data-m="fh">水平翻转</button><button class="demo-btn" data-m="fv">垂直翻转</button></div>
      </div>`;
    const stage = c.querySelector('#rfStage');
    const nameEl = c.querySelector('#rfName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    let tf='none';
    if(m==='rot') tf='rotate(90deg)';
    else if(m==='fh') tf='scaleX(-1)';
    else if(m==='fv') tf='scaleY(-1)';
    stage.innerHTML='<div style="height:100%;display:flex;align-items:center;justify-content:center;padding:14px"><div style="width:60%;height:50%;padding:16px;background:linear-gradient(135deg,#3a8a8a,#2f6f3a);border-radius:10px;color:#fff;transform:'+tf+';transition:transform .3s;display:flex;flex-direction:column;justify-content:center"><div style="font:700 14px var(--font-display)">'+cs.title+'</div><div style="margin-top:6px;font:11px Inter,sans-serif;opacity:.9">'+cs.subtitle+'</div></div></div>';

    }
    fill(); render('none');
    c.querySelectorAll('[data-m]:not([data-m="rf"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="rf"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="none"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="rf"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="rf"])'); render(act ? act.dataset.m : 'none'); };
  },
  'print'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xpr">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="1">1 页</button><button class="demo-btn" data-m="2">2 页</button><button class="demo-btn" data-m="6">6 页</button></div>'
    + '<div class="demo-label" style="text-align:center">讲义版式：一页排多张，省纸</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  const n = parseInt(m, 10);
  let cells = '';
  for (var i = 0; i < n; i++) {
    cells += '<div style="flex:1;min-width:0;aspect-ratio:4/3;border:1px solid #2f6f3a;border-radius:4px;background:rgba(47,111,58,.06);display:flex;align-items:center;justify-content:center;font:10px var(--font-mono);color:#2f6f3a">P' + (i+1) + '</div>';
  }
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px">'
    + '<div style="font:700 13px var(--font-display);color:#1a3300">' + cs.title + ' · 讲义（每页 ' + n + ' 张）</div>'
    + '<div style="display:grid;grid-template-columns:repeat(' + (n === 1 ? 1 : (n === 2 ? 2 : 3)) + ',1fr);gap:6px">' + cells + '</div>'
  + '</div>';
  }
  fill(); render('6');
  c.querySelectorAll('[data-m]:not([data-m="xpr"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xpr"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="6"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xpr"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xpr"])'); render(act ? act.dataset.m : '6'); };
},

  'autoshape'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="asName">案例加载中…</span>
          <button class="demo-btn" data-m="as">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="asStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="rect">矩形</button><button class="demo-btn" data-m="rrect">圆角矩形</button><button class="demo-btn" data-m="oval">椭圆</button><button class="demo-btn" data-m="arrow">箭头</button></div>
      </div>`;
    const stage = c.querySelector('#asStage');
    const nameEl = c.querySelector('#asName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    let bg = m==='arrow' ? 'linear-gradient(135deg,#3a8a8a,#2f6f3a)' : 'rgba(186,214,247,.08)';
    let extra = m==='arrow' ? 'clip-path:polygon(0 25%,70% 25%,70% 0,100% 50%,70% 100%,70% 75%,0 75%)' : 'border:2px solid #3a8a8a;border-radius:'+(m==='rrect'?'16px':(m==='oval'?'50%':'0'));
    stage.innerHTML='<div style="height:100%;display:flex;align-items:center;justify-content:center;padding:14px"><div style="width:64%;height:54%;padding:16px;background:'+bg+';'+extra+';color:#eef3e6;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center"><div style="font:700 13px var(--font-display)">'+cs.title+'</div></div></div>';

    }
    fill(); render('rect');
    c.querySelectorAll('[data-m]:not([data-m="as"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="as"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="rect"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="as"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="as"])'); render(act ? act.dataset.m : 'rect'); };
  },
  'chart-elements'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="cheName">案例加载中…</span>
          <button class="demo-btn" data-m="che">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="cheStage"></div>
        <div class="demo-row"><button class="demo-btn active" data-m="t">标题</button><button class="demo-btn active" data-m="ax">坐标轴</button><button class="demo-btn active" data-m="lg">图例</button><button class="demo-btn active" data-m="dl">数据标签</button></div>
      </div>`;
    const stage = c.querySelector('#cheStage');
    const nameEl = c.querySelector('#cheName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    const vis = { t:true, ax:true, lg:true, dl:true };
    function render() {
      const cs = CASES[ci];
      const items = cs.points.slice(0,4).map(function(p,i){ return { l:p.slice(0,4), v:[0.7,0.45,0.9,0.6][i%4] }; });
      let s = '<svg viewBox="0 0 220 100" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">';
      if (vis.ax) { s += '<line x1="15" y1="20" x2="15" y2="85" stroke="#56657f"/><line x1="15" y1="85" x2="210" y2="85" stroke="#56657f"/>'; }
      const n = items.length, slot = 190/n;
      items.forEach(function(it,i){ const h=12+it.v*68; const x=20+i*slot+4; s+='<rect x="'+x+'" y="'+(85-h)+'" width="'+(slot-10)+'" height="'+h+'" rx="2" fill="#3a8a8a"/>'; if(vis.dl){ s+='<text x="'+(x+(slot-10)/2)+'" y="'+(85-h-3)+'" fill="#c2cfe0" font-size="8" text-anchor="middle">'+it.l+'</text>'; } });
      if (vis.t) { s += '<text x="110" y="12" fill="#3a8a8a" font-size="11" text-anchor="middle" font-weight="bold">'+cs.title+'</text>'; }
      s += '</svg>';
      let html = '<div style="position:relative;height:100%">'+s;
      if (vis.lg) { html += '<div style="position:absolute;right:6px;top:20px;font:9px Inter,sans-serif;color:#7e8aa0">▣ '+((cs.tw && cs.tw.a) || '系列')+'</div>'; }
      html += '</div>';
      stage.innerHTML = html;
    }
    fill(); render();
    ['t','ax','lg','dl'].forEach(function(k){
      const b = c.querySelector('[data-m="'+k+'"]');
      if (b) b.onclick = function(){ vis[k] = !vis[k]; b.classList.toggle('active', vis[k]); render(); };
    });
    c.querySelector('[data-m="che"]').onclick = function(){ ci = Math.floor(Math.random()*CASES.length); fill(); render(); };
  },
  'text-anim-level'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="taName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="ta">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="taStage" style="display:flex;align-items:center;justify-content:center;padding:16px;overflow:hidden">' +
          '<div id="taObj" style="color:#1a3300;font:700 18px var(--font-body);text-align:center;line-height:1.5"></div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="whole">整段</button>' +
          '<button class="demo-btn" data-m="word">按词</button>' +
          '<button class="demo-btn" data-m="char">按字</button>' +
        '</div>' +
      '</div>';
    const obj = c.querySelector('#taObj');
    const nameEl = c.querySelector('#taName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function play(m){
      const cs = CASES[ci];
      if (m === 'whole'){ obj.innerHTML = '<span class="taU" style="display:inline-block;opacity:0;transform:translateY(8px)">' + cs.title + '　' + cs.subtitle + '</span>'; }
      else if (m === 'word'){ obj.innerHTML = '<span class="taU" style="display:inline-block;opacity:0;transform:translateY(8px)">' + cs.title + '</span> <span class="taU" style="display:inline-block;opacity:0;transform:translateY(8px)">' + cs.subtitle + '</span>'; }
      else { obj.innerHTML = cs.title.split('').map(function(ch){ return '<span class="taU" style="display:inline-block;opacity:0;transform:translateY(8px)">' + ch + '</span>'; }).join('') + '<span class="taU" style="display:inline-block;opacity:0;transform:translateY(8px)">　</span>' + cs.subtitle.split('').map(function(ch){ return '<span class="taU" style="display:inline-block;opacity:0;transform:translateY(8px)">' + ch + '</span>'; }).join(''); }
      const us = [].slice.call(obj.querySelectorAll('.taU'));
      requestAnimationFrame(function(){ us.forEach(function(el, i){ const d = (m === 'whole') ? 0 : (i * (m === 'char' ? 0.04 : 0.18)); el.style.transition = 'opacity .4s ease ' + d + 's, transform .4s ease ' + d + 's'; el.style.opacity = '1'; el.style.transform = 'none'; }); });
    }
    fill(); play('whole');
    c.querySelectorAll('[data-m]:not([data-m="ta"])').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="ta"])').forEach(x => x.classList.remove('active'));
      btn.classList.add('active'); play(btn.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="whole"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="ta"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="ta"])'); play(act ? act.dataset.m : 'whole'); };
  },  'image-crop'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="icName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="ic">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="free">自由</button>
          <button class="demo-btn" data-m="sq">1:1</button>
          <button class="demo-btn" data-m="wide">16:9</button>
        </div>
        <div class="demo-row" id="icStage" style="justify-content:center;align-items:center;min-height:150px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="icHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#icName');
    const stage = c.querySelector('#icStage');
    const hint = c.querySelector('#icHint');
    let cur = 'free';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function frame(w, h){
      return '<div style="position:relative;width:140px;height:100px;border-radius:8px;background:linear-gradient(135deg,#6a8cff,#b06ab3);overflow:hidden">'
        + '<div style="position:absolute;left:' + ((140 - w) / 2) + 'px;top:' + ((100 - h) / 2) + 'px;width:' + w + 'px;height:' + h + 'px;border:2px solid #fff;box-shadow:0 0 0 9999px rgba(10,14,24,.45)"></div></div>';
    }
    function render(){
      const cs = CASES[ci];
      const f = { free:[120,84], sq:[92,92], wide:[140,79] };
      const d = f[cur];
      stage.innerHTML = frame(d[0], d[1]);
      hint.textContent = '案例「' + cs.title + '」配图：裁掉杂边，只留主体。';
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="ic"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="ic"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="ic"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },
  'connector'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="cnName">案例加载中…</span>
          <button class="demo-btn" data-m="cn">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="cnStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="mvA">移动 A</button><button class="demo-btn" data-m="mvB">移动 B</button></div>
      </div>`;
    const stage = c.querySelector('#cnStage');
    const nameEl = c.querySelector('#cnName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    let ax=30, ay=45, bx=175, by=92;
    if(m==='mvA'){ ax=150; ay=32; }
    if(m==='mvB'){ bx=45; by=100; }
    let s='<svg viewBox="0 0 220 130" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">';
    s+='<line x1="'+ax+'" y1="'+ay+'" x2="'+bx+'" y2="'+by+'" stroke="#e46d4c" stroke-width="2"/>';
    s+='<rect x="'+(ax-26)+'" y="'+(ay-14)+'" width="52" height="28" rx="5" fill="#3a8a8a"/>';
    s+='<text x="'+ax+'" y="'+(ay+4)+'" fill="#fff" font-size="11" text-anchor="middle">A</text>';
    s+='<rect x="'+(bx-26)+'" y="'+(by-14)+'" width="52" height="28" rx="5" fill="#2f6f3a"/>';
    s+='<text x="'+bx+'" y="'+(by+4)+'" fill="#fff" font-size="11" text-anchor="middle">B</text>';
    s+='<text x="110" y="14" fill="#c2cfe0" font-size="10" text-anchor="middle">'+cs.title+'</text>';
    s+='</svg>';
    stage.innerHTML=s;

    }
    fill(); render('mvA');
    c.querySelectorAll('[data-m]:not([data-m="cn"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="cn"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="mvA"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="cn"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="cn"])'); render(act ? act.dataset.m : 'mvA'); };
  },
  'macro-vba'(c) {
    let ci = Math.floor(Math.random()*CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="mvName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="mv">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="mvStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="run">运行宏</button><button class="demo-btn" data-m="reset">停</button></div>' +
    '</div>';
    const stage = c.querySelector('#mvStage');
    const nameEl = c.querySelector('#mvName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m){
      const cs = CASES[ci];
      const run = (m === 'run');
      const fmt = run ? 'animation:mvFormat 1.4s ease forwards' : '';
      let pts = '';
      const ps = cs.points.slice(0,3);
      for (let i=0;i<ps.length;i++){ pts += '<div style="font:11px var(--font-body);color:#1a3300;padding:3px 0">• '+ps[i]+'</div>'; }
      stage.innerHTML = '<style>@keyframes mvFormat{0%{opacity:.4;transform:translateY(8px)}100%{opacity:1;transform:translateY(0)}}</style>' +
        '<div style="height:100%;padding:16px;display:flex;flex-direction:column;gap:10px;justify-content:center">' +
        '<div style="font:700 14px var(--font-display);color:#2f6f3a">'+cs.title+' · 运行宏自动排版</div>' +
        '<div style="background:#fff;border:1px solid rgba(26,51,0,.12);border-radius:10px;padding:12px;'+fmt+'">' +
          '<div style="font:700 14px var(--font-body);color:#2f6f3a">'+cs.title+'</div>' +
          '<div style="height:2px;width:24px;background:#2f6f3a;margin:5px 0 8px"></div>' + pts +
        '</div>' +
        '<div style="font:11px var(--font-body);color:#6b7280">'+(run?'宏正在统一字体 / 间距…':'点「运行宏」自动格式化')+'</div>' +
        '</div>';
    }
    fill(); render('run');
    c.querySelectorAll('[data-m]:not([data-m="mv"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="mv"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="run"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="mv"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="mv"])'); render(act ? act.dataset.m : 'run'); };
  },
  'widescreen'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xws">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="43">4:3 传统</button><button class="demo-btn" data-m="169">16:9 宽屏</button></div>'
    + '<div class="demo-label" style="text-align:center">动手切换比例，看同一案例如何落位</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  const ratio = m === '43' ? '4 / 3' : '16 / 9';
  const tag = m === '43' ? '4:3（传统投影，上下留黑边）' : '16:9（宽屏，铺满现代屏幕）';
  stage.innerHTML =
    '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">'
      + '<div style="width:78%;aspect-ratio:' + ratio + ';background:#fff;border:1px solid rgba(26,51,0,.3);border-radius:6px;display:flex;flex-direction:column;justify-content:center;padding:10px;box-sizing:border-box">'
        + '<div style="font:700 15px var(--font-display);color:#1a3300">' + cs.title + '</div>'
        + '<div style="font:11px var(--font-body);color:#4a5a3a;margin-top:4px">' + cs.subtitle + '</div>'
      + '</div>'
    + '</div>'
    + '<div style="position:absolute;left:8px;top:6px;font:10px var(--font-mono);color:#2f6f3a">' + tag + '</div>';
  }
  fill(); render('169');
  c.querySelectorAll('[data-m]:not([data-m="xws"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xws"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="169"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xws"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xws"])'); render(act ? act.dataset.m : '169'); };
},


  'exit-anim'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="xaName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="xa">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="xaStage" style="display:flex;align-items:center;justify-content:center;overflow:hidden">' +
          '<div id="xaObj" style="padding:16px 24px;background:rgba(47,111,58,.6);border-radius:12px;color:#fff;font:17px var(--font-body);text-align:center;max-width:78%"></div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="fade">淡出</button>' +
          '<button class="demo-btn" data-m="shrink">缩小消失</button>' +
          '<button class="demo-btn" data-m="fly">飞出</button>' +
          '<button class="demo-btn" data-m="again">↺ 重新进入</button>' +
        '</div>' +
      '</div>';
    const obj = c.querySelector('#xaObj');
    const nameEl = c.querySelector('#xaName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){ obj.textContent = CASES[ci].title; }
    function enter(){ obj.style.transition = 'none'; obj.style.opacity = '1'; obj.style.transform = 'none'; }
    function play(m){
      if (m === 'again'){ enter(); return; }
      obj.style.transition = 'all .5s ease';
      if (m === 'fade'){ obj.style.opacity = '0'; }
      else if (m === 'shrink'){ obj.style.opacity = '0'; obj.style.transform = 'scale(.6)'; }
      else { obj.style.opacity = '0'; obj.style.transform = 'translateX(120%)'; }
    }
    fill(); scene();
    c.querySelectorAll('[data-m]:not([data-m="xa"])').forEach(btn => btn.onclick = () => {
      if (btn.dataset.m !== 'again'){ c.querySelectorAll('[data-m]:not([data-m="xa"])').forEach(x => x.classList.remove('active')); btn.classList.add('active'); }
      play(btn.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="fade"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="xa"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); enter(); c.querySelectorAll('[data-m]:not([data-m="xa"])').forEach(x => x.classList.remove('active')); const f = c.querySelector('[data-m="fade"]'); if (f) f.classList.add('active'); };
  },  'chart-anim'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="caName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="ca">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="caStage" style="display:flex;align-items:flex-end;justify-content:center;gap:10px;padding:16px;overflow:hidden">' +
          '<div id="caBars" style="display:flex;align-items:flex-end;gap:10px;height:80%;width:100%;justify-content:center"></div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="grow">▶ 增长动画</button>' +
        '</div>' +
      '</div>';
    const bars = c.querySelector('#caBars');
    const nameEl = c.querySelector('#caName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){
      const cs = CASES[ci];
      const vals = [40, 65, 52, 80].slice(0, 4);
      const labels = cs.points.slice(0, 4);
      bars.innerHTML = vals.map(function(v, i){
        return '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:18%">' +
          '<div class="caBar" data-v="' + v + '" style="width:100%;height:0;background:rgba(47,111,58,' + (0.4 + i*0.15) + ');border-radius:6px 6px 0 0;transition:height .8s cubic-bezier(.22,1,.36,1)"></div>' +
          '<div style="font:9px var(--font-body);color:#1a3300;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%">' + (labels[i] ? labels[i].slice(0,6) : '') + '</div>' +
          '</div>';
      }).join('');
    }
    function play(){ [].slice.call(bars.querySelectorAll('.caBar')).forEach(function(b){ b.style.height = b.dataset.v + '%'; }); }
    fill(); scene(); play();
    c.querySelectorAll('[data-m]:not([data-m="ca"])').forEach(btn => btn.onclick = () => { btn.classList.add('active'); play(); });
    c.querySelector('[data-m="ca"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); play(); };
  },  'smart-guides'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="sgName">案例加载中…</span>
          <button class="demo-btn" data-m="sg">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="sgStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="gOff">关闭参考线</button><button class="demo-btn" data-m="gOn">开启参考线</button></div>
      </div>`;
    const stage = c.querySelector('#sgStage');
    const nameEl = c.querySelector('#sgName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    const on = m==='gOn';
    const refX=110, refY=60;
    const movX = on ? 110 : 60;
    let s='<svg viewBox="0 0 220 130" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">';
    if(on){ s+='<line x1="'+refX+'" y1="10" x2="'+refX+'" y2="120" stroke="#cb5521" stroke-dasharray="4 3" opacity=".7"/>'; }
    s+='<rect x="'+(refX-24)+'" y="'+(refY-14)+'" width="48" height="28" rx="5" fill="#3a8a8a"/>';
    s+='<text x="'+refX+'" y="'+(refY+4)+'" fill="#fff" font-size="11" text-anchor="middle">参考</text>';
    s+='<rect x="'+(movX-24)+'" y="95" width="48" height="28" rx="5" fill="#e46d4c"/>';
    s+='<text x="'+movX+'" y="114" fill="#fff" font-size="11" text-anchor="middle">元素</text>';
    s+='<text x="110" y="14" fill="#c2cfe0" font-size="10" text-anchor="middle">'+cs.title+'</text>';
    s+='</svg>';
    stage.innerHTML=s;

    }
    fill(); render('gOn');
    c.querySelectorAll('[data-m]:not([data-m="sg"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="sg"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="gOn"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="sg"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="sg"])'); render(act ? act.dataset.m : 'gOn'); };
  },
  'screenshot'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="scName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="sc">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="sel">框选区域</button>
          <button class="demo-btn" data-m="done">完成截取</button>
        </div>
        <div class="demo-row" id="scStage" style="justify-content:center;align-items:center;min-height:140px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="scHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#scName');
    const stage = c.querySelector('#scStage');
    const hint = c.querySelector('#scHint');
    let cur = 'sel';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(){
      const cs = CASES[ci];
      if (cur === 'sel') {
        stage.innerHTML = '<div style="position:relative;width:180px;height:110px;border-radius:8px;background:linear-gradient(135deg,#2a3550,#3a4a6a);overflow:hidden">'
          + '<div style="position:absolute;left:10px;top:8px;font:11px sans-serif;color:#c2cfe0">源页面：' + cs.title + '</div>'
          + '<div style="position:absolute;left:24px;top:30px;width:120px;height:60px;border:2px dashed #e8924a"></div></div>';
        hint.textContent = '框选要截取的区域。';
      } else {
        stage.innerHTML = '<div style="position:relative;width:120px;height:60px;border-radius:6px;background:linear-gradient(135deg,#6a8cff,#b06ab3);box-shadow:0 6px 18px rgba(0,0,0,.35)"></div>';
        hint.textContent = '截取到的片段，可直接贴进「' + cs.title + '」页面。';
      }
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="sc"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="sc"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="sc"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },
  'autofit'(c) {
    const cs = CASES.find(x => x.title === '科研项目中期检查') || CASES[31];
    let mode = 'good';
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-label">文本自动适配＝要点塞太多时自动缩字号或换行，不溢出框外</div>
        <div class="mini-slide" data-stage></div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bad">文字溢出</button>
          <button class="demo-btn active" data-m="good">自动适配</button>
        </div>
        <div class="demo-label" data-hint style="text-align:center"></div>
      </div>`;
    const stage = c.querySelector('[data-stage]'), hint = c.querySelector('[data-hint]');
    function render() {
      stage.innerHTML = demoPageCompact({ cs, mode, accent:'#2f6f3a', bg:'#fbfcf7', tagGood:'自动适配', tagBad:'文字溢出',
        good: () => svgRect(60,120,480,280,'#ffffff',16,'rgba(26,51,0,.12)')
          + svgTxt(82,156,'CASE · 文本自动适配',14,'#2f6f3a',700)
          + demoSvgLines(82,190,demoWrap(cs.body,16,6),13,SVG_INK,500,21)
          + `<text x="82" y="420" font-size="13" fill="#2f6f3a" font-weight="700">✓ 自动缩小并换行，完整保留</text>`
          + svgRect(600,120,280,280,'#3a6ea5',16) + svgTxt(740,270,'中期汇报',18,'#fff',700,'middle')
          + svgRect(600,430,280,50,'#eef3e6',8) + svgTxt(740,460,'进度 / 风险 / 下一步',13,SVG_INK,700,'middle'),
        bad: () => svgRect(60,120,480,180,'#ffffff',16,'rgba(26,51,0,.12)')
          + svgTxt(82,156,'CASE · 文字溢出',14,'#cb5521',700)
          + demoSvgLines(82,190,demoWrap(cs.body,16,6),15,SVG_INK,500,24)
          + `<rect x="82" y="300" width="436" height="24" fill="none" stroke="#cb5521" stroke-width="2"/><text x="82" y="345" font-size="13" fill="#cb5521" font-weight="700">文字超出文本框边界</text>`
          + svgRect(600,120,280,220,'#3a6ea5',16) + svgTxt(740,240,'中期汇报',18,'#fff',700,'middle')
      });
      hint.textContent = mode === 'good' ? '自动适配：文本框自动缩小字号或换行，让最长文案也留在框内。' : '文字溢出：字号固定、内容太长，文字顶出框外，版面显乱。';
    }
    render();
    c.querySelectorAll('[data-m]').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.m; render(); });
  },
  'pptx-format'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="pfName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="pf">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="wrong">发给客户用 pptx</button>
          <button class="demo-btn" data-m="right">发给客户用 pdf</button>
        </div>
        <div class="mini-slide" id="pfStage" style="padding:14px"></div>
      </div>`;
    const s = c.querySelector('#pfStage'), nameEl = c.querySelector('#pfName');
    function render(m) {
      const cs = CASES[ci];
      if (m === 'wrong') {
        s.innerHTML = '<div style="font:11px var(--font-body);color:#cb5521;line-height:1.7">《' + cs.title + '》发 .pptx → 客户能改能乱版<br><span>⚠ 终稿被改花</span></div>';
      } else {
        s.innerHTML = '<div style="font:11px var(--font-body);color:#1a3300;line-height:1.7">《' + cs.title + '》发 .pdf → 防改防乱版<br><span>✓ 终稿稳了；要播用 .ppsx</span></div>';
      }
    }
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    fill(); render('wrong');
    c.querySelectorAll('[data-m]:not([data-m="pf"])').forEach(btn => btn.onclick = () => { c.querySelectorAll('[data-m]:not([data-m="pf"])').forEach(x => x.classList.remove('active')); btn.classList.add('active'); render(btn.dataset.m); });
    c.querySelector('[data-m="pf"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); render(c.querySelector('[data-m].active:not([data-m="pf"])').dataset.m); };
  },
  'word-to-ppt'(c) {
    let ci = Math.floor(Math.random()*CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="wpName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="wp">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="wpStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="convert">转换大纲</button><button class="demo-btn" data-m="reset">清空</button></div>' +
    '</div>';
    const stage = c.querySelector('#wpStage');
    const nameEl = c.querySelector('#wpName');
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m){
      const cs = CASES[ci];
      const conv = (m === 'convert');
      let slides = '';
      if (conv){
        const heads = [cs.title].concat(cs.points.slice(0,3));
        for (let i=0;i<heads.length;i++){
          slides += '<div style="flex:1;min-width:0;height:46px;border-radius:6px;background:'+(i===0?'rgba(26,51,0,.9)':'#fff')+';border:1px solid rgba(26,51,0,.15);display:flex;flex-direction:column;justify-content:center;padding:0 8px;overflow:hidden">' +
            '<div style="font:700 '+(i===0?'10px':'9px')+' var(--font-body);color:'+(i===0?'#eef3e6':'#1a3300')+';white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+heads[i]+'</div>' +
            (i===0?'<div style="font:7px var(--font-mono);color:rgba(238,243,230,.6)">封面</div>':'') +
          '</div>';
        }
      } else {
        slides = '<div style="width:100%;text-align:center;font:11px var(--font-body);color:#9bb08a">点「转换大纲」生成多页</div>';
      }
      stage.innerHTML = '<div style="height:100%;padding:16px;display:flex;flex-direction:column;gap:12px;justify-content:center">' +
        '<div style="font:700 13px var(--font-display);color:#2f6f3a">'+cs.title+' · Word 大纲转 PPT</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px">'+slides+'</div>' +
      '</div>';
    }
    fill(); render('convert');
    c.querySelectorAll('[data-m]:not([data-m="wp"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="wp"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="convert"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="wp"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="wp"])'); render(act ? act.dataset.m : 'convert'); };
  },
  'ink'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="ikName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="ik">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="ikStage"><canvas id="ikCanvas" style="width:100%;height:100%;border-radius:10px"></canvas></div>'
    + '<div class="demo-label" style="text-align:center">用鼠标在「' + '案例' + '」幻灯片上书写墨迹批注</div>'
    + '</div>';
  const nameEl = c.querySelector('#ikName');
  const stage = c.querySelector('#ikStage');
  const canvas = c.querySelector('#ikCanvas');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  fill();
  c.querySelector('[data-m="ik"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); if (window.__inkCtx) { window.__inkCtx.clearRect(0, 0, canvas.width, canvas.height); } };
  const isJsdom = window.navigator && /jsdom/i.test(window.navigator.userAgent || '');
  const ctx = isJsdom ? null : canvas.getContext('2d');
  if (!ctx) {
    stage.innerHTML = '<div style="position:absolute;inset:0;padding:14px;display:flex;flex-direction:column;gap:8px;justify-content:center;background:#fbfcf7">'
      + '<div style="font:700 15px var(--font-display);color:#1a3300">' + CASES[ci].title + '</div>'
      + '<div style="font:12px/1.4 var(--font-body);color:#4a5a3a">' + CASES[ci].subtitle + '</div>'
      + '<div style="margin-top:8px;height:34%;border:2px solid #2f6f3a;border-radius:50%;transform:rotate(-8deg);display:flex;align-items:center;justify-content:center;font:700 13px var(--font-body);color:#2f6f3a">墨迹批注</div>'
    + '</div>';
    return;
  }
  window.__inkCtx = ctx;
  let drawing = false;
  function pos(e){ const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
  canvas.addEventListener('mousedown', function(e){ drawing = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p[0], p[1]); });
  canvas.addEventListener('mousemove', function(e){ if (!drawing) return; const p = pos(e); ctx.lineTo(p[0], p[1]); ctx.strokeStyle = '#2f6f3a'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.stroke(); });
  window.addEventListener('mouseup', function(){ drawing = false; });
  ctx.fillStyle = '#2f6f3a';
},


  'data-label'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="dlName">案例加载中…</span>
          <button class="demo-btn" data-m="dl">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="dlStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="hide">隐藏标签</button><button class="demo-btn" data-m="show">显示标签</button></div>
      </div>`;
    const stage = c.querySelector('#dlStage');
    const nameEl = c.querySelector('#dlName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    const items=cs.points.slice(0,4).map(function(p,i){return {l:p.slice(0,4),v:[0.7,0.45,0.9,0.6][i%4]};});
    const show = m==='show';
    let s='<svg viewBox="0 0 220 100" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%"><line x1="15" y1="85" x2="210" y2="85" stroke="#56657f"/>';
    const n=items.length, slot=190/n;
    items.forEach(function(it,i){ const h=12+it.v*68; const x=20+i*slot+4; s+='<rect x="'+x+'" y="'+(85-h)+'" width="'+(slot-10)+'" height="'+h+'" rx="2" fill="#3a8a8a"/>'; if(show){ s+='<text x="'+(x+(slot-10)/2)+'" y="'+(85-h-3)+'" fill="#c2cfe0" font-size="8" text-anchor="middle">'+it.l+'</text>'; } });
    s+='</svg>';
    stage.innerHTML='<div style="height:100%;padding:12px;display:flex;flex-direction:column;gap:6px"><div style="flex:1">'+s+'</div><div style="font:11px Inter,sans-serif;color:#7e8aa0;text-align:center">'+(show?'显示数据标签':'隐藏数据标签')+' · '+cs.title+'</div></div>';

    }
    fill(); render('show');
    c.querySelectorAll('[data-m]:not([data-m="dl"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="dl"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="show"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="dl"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="dl"])'); render(act ? act.dataset.m : 'show'); };
  },
  'morph-force'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML =
      '<div class="demo-stack">' +
        '<div class="demo-row demo-top">' +
          '<span class="demo-label" id="mfName">案例加载中…</span>' +
          '<button class="demo-btn" data-m="mf">↻ 换一个真实案例</button>' +
        '</div>' +
        '<div class="mini-slide" id="mfStage" style="position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center">' +
          '<div id="mfBox" style="display:flex;align-items:center;justify-content:center;color:#fff;font:14px var(--font-body);text-align:center;padding:6px;box-sizing:border-box;background:linear-gradient(135deg,#2f6f3a,#1a4a24);width:34%;height:46%;border-radius:14px"></div>' +
        '</div>' +
        '<div class="demo-row">' +
          '<button class="demo-btn" data-m="morph">Morph 变形</button>' +
          '<button class="demo-btn" data-m="cut">直接跳</button>' +
        '</div>' +
      '</div>';
    const box = c.querySelector('#mfBox');
    const nameEl = c.querySelector('#mfName');
    let state = 0;
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function scene(){ box.textContent = CASES[ci].title; }
    function toA(){ box.style.transition = 'none'; box.style.width = '34%'; box.style.height = '46%'; box.style.borderRadius = '14px'; box.style.background = 'linear-gradient(135deg,#2f6f3a,#1a4a24)'; }
    function go(m){
      state = state === 0 ? 1 : 0;
      const big = state === 1;
      toA();
      requestAnimationFrame(function(){
        if (m === 'morph'){ box.style.transition = 'all .9s cubic-bezier(.22,1,.36,1)'; }
        else { box.style.transition = 'none'; }
        box.style.width = big ? '60%' : '34%';
        box.style.height = big ? '70%' : '46%';
        box.style.borderRadius = big ? '50%' : '14px';
        box.style.background = big ? 'linear-gradient(135deg,#3a7bd5,#1a4a24)' : 'linear-gradient(135deg,#2f6f3a,#1a4a24)';
      });
    }
    fill(); scene(); go('morph');
    c.querySelectorAll('[data-m]:not([data-m="mf"])').forEach(btn => btn.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="mf"])').forEach(x => x.classList.remove('active'));
      btn.classList.add('active'); go(btn.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="morph"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="mf"]').onclick = () => { ci = Math.floor(Math.random()*CASES.length); fill(); scene(); const act = c.querySelector('[data-m].active:not([data-m="mf"])'); go(act ? act.dataset.m : 'morph'); };
  },  'artistic-effect'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="aeName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="ae">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="none">原图</button>
          <button class="demo-btn" data-m="pencil">铅笔素描</button>
          <button class="demo-btn" data-m="blur">虚化</button>
          <button class="demo-btn" data-m="water">水彩</button>
        </div>
        <div class="demo-row" id="aeStage" style="justify-content:center;align-items:center;min-height:130px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="aeHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#aeName');
    const stage = c.querySelector('#aeStage');
    const hint = c.querySelector('#aeHint');
    let cur = 'none';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function filt(m){
      if (m === 'pencil') return 'grayscale(1) contrast(1.7)';
      if (m === 'blur') return 'blur(3px)';
      if (m === 'water') return 'saturate(1.7) blur(1px) hue-rotate(25deg)';
      return 'none';
    }
    function render(){
      const cs = CASES[ci];
      const labels = { none:'原图', pencil:'铅笔素描质感', blur:'虚化高级感', water:'水彩艺术感' };
      stage.innerHTML = '<div style="width:150px;height:100px;border-radius:10px;background:linear-gradient(135deg,#ffd36b,#ff6a88);filter:' + filt(cur) + ';box-shadow:0 6px 18px rgba(0,0,0,.3)"></div>';
      hint.textContent = '案例「' + cs.title + '」封面：' + labels[cur] + '。';
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="ae"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="ae"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="ae"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },

  'picture-correct'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="pcName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="pc">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn" data-m="bp">亮度 +</button>
          <button class="demo-btn" data-m="bm">亮度 −</button>
          <button class="demo-btn" data-m="cp">对比度 +</button>
          <button class="demo-btn" data-m="cm">对比度 −</button>
        </div>
        <div class="demo-row" id="pcStage" style="justify-content:center;align-items:center;min-height:130px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="pcHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#pcName');
    const stage = c.querySelector('#pcStage');
    const hint = c.querySelector('#pcHint');
    let brightness = 70, contrast = 80;
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(){
      const cs = CASES[ci];
      stage.innerHTML = '<div style="width:150px;height:100px;border-radius:10px;background:linear-gradient(135deg,#ffb36b,#7a4bff);filter:brightness(' + brightness + '%) contrast(' + contrast + '%);box-shadow:0 6px 18px rgba(0,0,0,.3)"></div>';
      hint.textContent = '案例「' + cs.title + '」暗图：亮度 ' + brightness + '% · 对比度 ' + contrast + '%，调亮更清楚。';
    }
    function applyMode(m){
      if (m === 'bp') brightness = Math.min(160, brightness + 15);
      else if (m === 'bm') brightness = Math.max(40, brightness - 15);
      else if (m === 'cp') contrast = Math.min(180, contrast + 15);
      else if (m === 'cm') contrast = Math.max(40, contrast - 15);
      render();
    }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="pc"])').forEach(function(b){ b.onclick = function(){ applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="pc"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },

  'picture-style'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="psName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="ps">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="none">无</button>
          <button class="demo-btn" data-m="border">边框</button>
          <button class="demo-btn" data-m="shadow">阴影</button>
          <button class="demo-btn" data-m="reflect">映像</button>
        </div>
        <div class="demo-row" id="psStage" style="justify-content:center;align-items:center;min-height:150px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="psHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#psName');
    const stage = c.querySelector('#psStage');
    const hint = c.querySelector('#psHint');
    let cur = 'none';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(){
      const cs = CASES[ci];
      const labels = { none:'原图无样式', border:'加白边框', shadow:'投影立体', reflect:'底部映像' };
      let photo = '<div style="width:120px;height:84px;border-radius:8px;background:linear-gradient(135deg,#6a8cff,#b06ab3)';
      if (cur === 'none') photo = photo + '"></div>';
      else if (cur === 'border') photo = photo + ';border:4px solid #fff"></div>';
      else if (cur === 'shadow') photo = photo + ';box-shadow:0 12px 26px rgba(0,0,0,.5)"></div>';
      else photo = photo + '"></div><div style="width:120px;height:30px;margin-top:4px;border-radius:8px;background:linear-gradient(135deg,#6a8cff,#b06ab3);transform:scaleY(-1);opacity:.22;filter:blur(1px)"></div>';
      stage.innerHTML = photo;
      hint.textContent = '案例「' + cs.title + '」配图：' + labels[cur] + '。';
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="ps"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="ps"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="ps"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },

  'change-picture'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="chName" style="font-size:13px;color:#c2cfe0">案例加载中…</span>
          <button class="demo-btn" data-m="ch">↻ 换一个真实案例</button>
        </div>
        <div class="demo-row">
          <button class="demo-btn active" data-m="p1">替换为图1</button>
          <button class="demo-btn" data-m="p2">替换为图2</button>
          <button class="demo-btn" data-m="p3">替换为图3</button>
        </div>
        <div class="demo-row" id="chStage" style="justify-content:center;align-items:center;min-height:140px;background:rgba(10,14,24,.32);border-radius:10px"></div>
        <div class="demo-label" id="chHint" style="text-align:center;color:#c2cfe0"></div>
      </div>`;
    const nameEl = c.querySelector('#chName');
    const stage = c.querySelector('#chStage');
    const hint = c.querySelector('#chHint');
    let cur = 'p1';
    function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
    function grad(m){
      if (m === 'p1') return 'linear-gradient(135deg,#ff9a6c,#ff6a88)';
      if (m === 'p2') return 'linear-gradient(135deg,#6a8cff,#b06ab3)';
      return 'linear-gradient(135deg,#43e97b,#38f9d7)';
    }
    function render(){
      const cs = CASES[ci];
      stage.innerHTML = '<div style="padding:8px;background:rgba(20,28,44,.9);border-radius:14px;box-shadow:0 8px 22px rgba(0,0,0,.4)">'
        + '<div style="width:130px;height:92px;border-radius:8px;background:' + grad(cur) + '"></div></div>';
      hint.textContent = '相框样式不变，只换图 —— 案例「' + cs.title + '」。';
    }
    function applyMode(m){ cur = m; render(); }
    fill(); render();
    c.querySelectorAll('[data-m]:not([data-m="ch"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="ch"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); applyMode(b.dataset.m); }; });
    c.querySelector('[data-m="ch"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); render(); };

  },

  'excel-link'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="elName">案例加载中…</span>
          <button class="demo-btn" data-m="el">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="elStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="linked">已链接</button><button class="demo-btn" data-m="broken">已断开</button></div>
      </div>`;
    const stage = c.querySelector('#elStage');
    const nameEl = c.querySelector('#elName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    const items=cs.points.slice(0,4).map(function(p,i){return {v:[0.7,0.45,0.9,0.6][i%4]};});
    let s='<svg viewBox="0 0 220 100" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%"><line x1="15" y1="85" x2="210" y2="85" stroke="#56657f"/>';
    const n=items.length, slot=190/n;
    items.forEach(function(it,i){ const h=12+it.v*68; const x=20+i*slot+4; s+='<rect x="'+x+'" y="'+(85-h)+'" width="'+(slot-10)+'" height="'+h+'" rx="2" fill="#3a8a8a"/>'; });
    s+='</svg>';
    const pill = m==='linked' ? '<span style="font:10px Inter,sans-serif;color:#9fe3c5;background:rgba(159,227,197,.15);padding:2px 8px;border-radius:10px">● 已链接 case.xlsx</span>' : '<span style="font:10px Inter,sans-serif;color:#f0a59a;background:rgba(240,165,154,.15);padding:2px 8px;border-radius:10px">● 链接已断开</span>';
    stage.innerHTML='<div style="height:100%;padding:12px;display:flex;flex-direction:column;gap:6px"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font:700 12px var(--font-display);color:#3a8a8a">'+cs.title+'</span>'+pill+'</div><div style="flex:1">'+s+'</div><div style="font:11px Inter,sans-serif;color:#7e8aa0;text-align:center">'+(m==='linked'?'数据随 Excel 自动更新':'需手动刷新数据')+'</div></div>';

    }
    fill(); render('linked');
    c.querySelectorAll('[data-m]:not([data-m="el"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="el"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="linked"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="el"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="el"])'); render(act ? act.dataset.m : 'linked'); };
  },
  'data-bars'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row demo-top">
          <span class="demo-label" id="dbName">案例加载中…</span>
          <button class="demo-btn" data-m="db">↻ 换一个真实案例</button>
        </div>
        <div class="mini-slide" id="dbStage"></div>
        <div class="demo-row"><button class="demo-btn" data-m="num">纯数字</button><button class="demo-btn" data-m="bars">数据条</button></div>
      </div>`;
    const stage = c.querySelector('#dbStage');
    const nameEl = c.querySelector('#dbName');
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; }
    function render(m) {
    const cs=CASES[ci];
    const rows=cs.points.slice(0,4).map(function(p,i){return {l:p, v:[70,45,90,60][i%4]};});
    let s='<div style="padding:12px;display:flex;flex-direction:column;gap:8px">';
    if(m==='num'){
      rows.forEach(function(r){ s+='<div style="display:flex;justify-content:space-between;font:12px Inter,sans-serif;color:#c2cfe0"><span>'+r.l+'</span><span style="font:11px var(--font-mono);color:#3a8a8a">'+r.v+'</span></div>'; });
    } else {
      rows.forEach(function(r){ s+='<div style="display:flex;align-items:center;gap:8px"><span style="width:40%;font:11px Inter,sans-serif;color:#c2cfe0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+r.l+'</span><div style="flex:1;height:16px;background:rgba(0,0,0,.2);border-radius:4px;position:relative;overflow:hidden"><div style="position:absolute;left:0;top:0;height:100%;width:'+r.v+'%;background:linear-gradient(90deg,#2f6f3a,#3a8a8a);border-radius:4px"></div></div><span style="width:28px;text-align:right;font:11px var(--font-mono);color:#3a8a8a">'+r.v+'</span></div>'; });
    }
    s+='<div style="font:11px Inter,sans-serif;color:#7e8aa0;text-align:center">'+(m==='bars'?'数据条：一眼比大小':'纯数字')+' · '+cs.title+'</div></div>';
    stage.innerHTML=s;

    }
    fill(); render('bars');
    c.querySelectorAll('[data-m]:not([data-m="db"])').forEach(function(b) { b.onclick = function() { c.querySelectorAll('[data-m]:not([data-m="db"])').forEach(function(x) { x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
    const initBtn = c.querySelector('[data-m="bars"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="db"]').onclick = function() { ci = Math.floor(Math.random()*CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="db"])'); render(act ? act.dataset.m : 'bars'); };
  },
  'video-trim'(c) {
  let ci = Math.floor(Math.random() * CASES.length);
  c.innerHTML =
    '<div class="demo-stack">'
    + '<div class="demo-row demo-top">'
      + '<span class="demo-label" id="xxName">案例加载中…</span>'
      + '<button class="demo-btn" data-m="xvt">↻ 换一个真实案例</button>'
    + '</div>'
    + '<div class="mini-slide" id="xxStage"></div>'
    + '<div class="demo-row"><button class="demo-btn" data-m="full">完整</button><button class="demo-btn" data-m="trim">裁剪 00:05–00:20</button></div>'
    + '<div class="demo-label" style="text-align:center">设置入/出点，只导出精华片段</div>'
    + '</div>';
  const stage = c.querySelector('#xxStage');
  const nameEl = c.querySelector('#xxName');
  function fill(){ nameEl.textContent = '案例：' + CASES[ci].title; }
  function render(m){
  const cs = CASES[ci];
  const trim = m === 'trim';
  const inP = 5 / 30 * 100;
  const outP = 20 / 30 * 100;
  stage.innerHTML = '<div style="position:absolute;inset:0;padding:12px;display:flex;flex-direction:column;gap:8px">'
    + '<div style="font:700 13px var(--font-display);color:#1a3300">' + cs.title + ' · 视频剪辑</div>'
    + '<div style="position:relative;height:14px;background:#eeeeee;border-radius:7px;overflow:hidden">'
      + (trim ? '<div style="position:absolute;left:' + inP + '%;right:' + (100 - outP) + '%;top:0;bottom:0;background:#2f6f3a;opacity:.6"></div>' : '')
    + '</div>'
    + '<div style="display:flex;justify-content:space-between;font:10px var(--font-mono);color:#4a5a3a">'
      + '<span>' + (trim ? '入点 00:05' : '00:00') + '</span>'
      + '<span>' + (trim ? '出点 00:20 · 截取 15s' : '完整 00:30') + '</span>'
    + '</div>'
    + '<div style="font:11px var(--font-body);color:' + (trim ? '#2f6f3a' : '#4a5a3a') + '">' + (trim ? '只导出精华片段，体积更小' : '导出整段视频') + '</div>'
  + '</div>';
  }
  fill(); render('trim');
  c.querySelectorAll('[data-m]:not([data-m="xvt"])').forEach(function(b){ b.onclick = function(){ c.querySelectorAll('[data-m]:not([data-m="xvt"])').forEach(function(x){ x.classList.remove('active'); }); b.classList.add('active'); render(b.dataset.m); }; });
  var initBtn = c.querySelector('[data-m="trim"]'); if (initBtn) initBtn.classList.add('active');
  c.querySelector('[data-m="xvt"]').onclick = function(){ ci = (ci + 1) % CASES.length; fill(); var act = c.querySelector('[data-m].active:not([data-m="xvt"])'); render(act ? act.dataset.m : 'trim'); };
},


  'ink-math'(c) {
    let ci = Math.floor(Math.random() * CASES.length);
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="imName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="im">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label" id="imCtx"></div>
        <div class="demo-row">
          <button class="demo-btn active" data-f="integral">∫ 积分</button>
          <button class="demo-btn" data-f="sigma">∑ 求和</button>
          <button class="demo-btn" data-f="fraction">分式</button>
        </div>
        <div class="mini-slide" id="imStage" style="display:flex;align-items:center;justify-content:center;padding:14px">
          <div id="imFormula" style="font:28px var(--font-serif);color:var(--color-ice-highlight);text-align:center"></div>
        </div>
      </div>`;
    const box = c.querySelector('#imFormula'), nameEl = c.querySelector('#imName'), ctx = c.querySelector('#imCtx');
    const formulas = {
      integral: '∫<sub>0</sub><sup>∞</sup> e<sup>-x²</sup> dx = √π / 2',
      sigma: '∑<sub>i=1</sub><sup>n</sup> x<sub>i</sub> = x₁ + x₂ + … + xₙ',
      fraction: '<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle"><span style="border-bottom:2px solid #ffffff;padding:0 8px 2px">-b ± √b² - 4ac</span><span style="padding-top:2px">2a</span></span>'
    };
    function fill() { nameEl.textContent = '案例：' + CASES[ci].title; ctx.textContent = '在《' + CASES[ci].title + '》里插入公式'; }
    fill();
    c.querySelectorAll('[data-f]').forEach(btn => btn.onclick = () => { box.innerHTML = formulas[btn.dataset.f] || formulas.integral; });
    box.innerHTML = formulas.integral;
    c.querySelector('[data-m="im"]').onclick = () => { ci = Math.floor(Math.random() * CASES.length); fill(); };
  },
  /* ---------- 母版与版式（真实案例系列 · 续） ---------- */

  'notes-master'(c) {
    // 真实案例：讲义母版决定"打印/导出讲义"版式：每页几张、是否带页眉页脚
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="nmName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="shuffle">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">讲义母版决定"打印/导出讲义"的版式：每页几张、是否带页眉页脚</div>
        <div class="demo-row">
          <button class="demo-btn" data-perpage="2">每页 2 张</button>
          <button class="demo-btn active" data-perpage="3">每页 3 张</button>
          <button class="demo-btn" data-perpage="6">每页 6 张</button>
          <button class="demo-btn active" data-hf="1">页眉页脚</button>
        </div>
        <div class="mini-slide" id="nmPage" style="flex-direction:column;padding:14px 16px;gap:8px;background:#fff"></div>
      </div>`;
    const page = c.querySelector('#nmPage');
    const nameEl = c.querySelector('#nmName');
    let ci = Math.floor(Math.random() * CASES.length);
    let per = 3, hf = true;
    function render() {
      const cs = CASES[ci];
      nameEl.textContent = '案例：' + cs.title;
      let inner = '';
      if (hf) inner += `<div style="font:11px var(--font-mono);color:#4a5a3a;display:flex;justify-content:space-between;width:100%"><span>${cs.footer}</span><span>讲义 · ${cs.title}</span></div>`;
      const titles = [cs.title, cs.partName, cs.subtitle, ...cs.points.slice(0,3)];
      const cols = per;
      let grid = `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:8px;width:100%;flex:1;align-content:start">`;
      for (let i = 0; i < per; i++) {
        const t = titles[i % titles.length];
        grid += `<div style="border:1px solid var(--color-glass-edge);border-radius:6px;background:#fbfcf7;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;padding:4px;text-align:center;font:10px var(--font-body);color:#1a3300">${t}</div>`;
      }
      grid += '</div>';
      inner += grid;
      if (hf) inner += `<div style="font:10px var(--font-mono);color:rgba(26,51,0,.5);width:100%;text-align:right">第 1 页 / 共 1 页</div>`;
      page.innerHTML = inner;
    }
    render();
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { ci = Math.floor(Math.random() * CASES.length); render(); });
    c.querySelectorAll('[data-perpage]').forEach(b => b.onclick = () => { per = +b.dataset.perpage; c.querySelectorAll('[data-perpage]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(); });
    c.querySelectorAll('[data-hf]').forEach(b => b.onclick = () => { hf = !hf; b.classList.toggle('active', hf); render(); });
  },

  'theme-variant'(c) {
    // 真实案例：同一色系换明暗（变体），再叠加"强调色"点缀
    const V = {
      std:   { bg:'#fbfcf7', text:'#1a3300', sub:'#4a5a3a' },
      light: { bg:'#eef3e6', text:'#2f6f3a', sub:'#4a6a3a' },
      dark:  { bg:'#1a3300', text:'#eef3e6', sub:'#bcd99b' },
    };
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="tvName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="shuffle">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">主题变体：同一色系换明暗，再叠加"强调色"点缀</div>
        <div class="demo-row">
          <button class="demo-btn active" data-v="std">标准</button>
          <button class="demo-btn" data-v="light">浅色</button>
          <button class="demo-btn" data-v="dark">深色</button>
          <button class="demo-btn active" data-emph="1">强调点缀</button>
        </div>
        <div class="demo-row" id="tvSlides" style="gap:12px;flex-wrap:nowrap"></div>
      </div>`;
    const slides = c.querySelector('#tvSlides');
    const nameEl = c.querySelector('#tvName');
    let ci = Math.floor(Math.random() * CASES.length);
    let v = 'std', emph = true;
    function render() {
      const cs = CASES[ci]; const t = V[v];
      nameEl.textContent = '案例：' + cs.title;
      const barCol = emph ? '#2f6f3a' : 'rgba(26,51,0,.25)';
      const chip = emph ? `<div style="margin-top:8px;align-self:flex-start;padding:4px 12px;background:#2f6f3a;color:#fff;border-radius:999px;font:11px var(--font-body)">强调</div>` : '';
      slides.innerHTML = `
        <div class="mini-slide" style="flex:1;min-width:0;background:${t.bg}">
          <div style="position:absolute;top:38%;left:10%;right:10%;text-align:center">
            <div style="font:700 19px var(--font-body);color:${t.text}">${cs.title}</div>
            <div style="height:3px;width:38px;background:${barCol};margin:9px auto;border-radius:2px"></div>
            <div style="font:13px var(--font-body);color:${t.sub}">${cs.subtitle}</div>
          </div>
        </div>
        <div class="mini-slide" style="flex:1;min-width:0;background:${t.bg}">
          <div style="position:absolute;top:12%;left:9%;right:9%;color:${t.text}">
            <div style="font:700 15px var(--font-body)">${cs.title}</div>
            <div style="display:flex;flex-direction:column;gap:5px;margin-top:9px">${cs.points.slice(0,3).map(p => `<div class="ly-li" style="color:${t.text}">${p}</div>`).join('')}</div>
            ${chip}
          </div>
        </div>`;
    }
    render();
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { ci = Math.floor(Math.random() * CASES.length); render(); });
    c.querySelectorAll('[data-v]').forEach(b => b.onclick = () => { v = b.dataset.v; c.querySelectorAll('[data-v]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(); });
    c.querySelectorAll('[data-emph]').forEach(b => b.onclick = () => { emph = !emph; b.classList.toggle('active', emph); render(); });
  },

  template(c) {
    // 真实案例：套用不同模板 → 同一份内容自动获得一套协调的页型
    const TPL = {
      corp:     { name:'商务简约', accent:'#2f6f3a', bar:'rgba(47,111,58,.9)', font:'var(--font-body)' },
      creative: { name:'创意活力', accent:'#cb5521', bar:'rgba(203,85,33,.9)', font:'var(--font-body)' },
      minimal:  { name:'极简黑白', accent:'#111111', bar:'rgba(0,0,0,.85)', font:'var(--font-mono)', dark:true },
    };
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="tpName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="shuffle">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">套用不同模板 → 同一份内容自动获得一套协调的页型（封面/章节/内容/封底）</div>
        <div class="demo-row">
          <button class="demo-btn active" data-tpl="corp">商务简约</button>
          <button class="demo-btn" data-tpl="creative">创意活力</button>
          <button class="demo-btn" data-tpl="minimal">极简黑白</button>
        </div>
        <div class="demo-row" id="tpKit" style="gap:10px;flex-wrap:wrap"></div>
      </div>`;
    const kit = c.querySelector('#tpKit');
    const nameEl = c.querySelector('#tpName');
    let ci = Math.floor(Math.random() * CASES.length);
    let tp = 'corp';
    function thumb(kind, t, cs) {
      const darkText = t.dark ? '#111111' : '#1a3300';
      const subText = t.dark ? '#555555' : '#4a5a3a';
      const cardBg = t.dark ? '#ffffff' : '#fbfcf7';
      const wrap = `<div style="width:calc(50% - 5px);min-width:0">`;
      if (kind === 'cover') return `${wrap}<div style="border:1px solid var(--color-glass-edge);border-radius:6px;aspect-ratio:16/9;background:${cardBg};position:relative;overflow:hidden"><div style="position:absolute;top:0;left:0;width:6px;height:100%;background:${t.bar}"></div><div style="position:absolute;top:40%;left:14%;right:10%;text-align:left"><div style="font:700 11px ${t.font};color:${darkText};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cs.title}</div><div style="font:8px ${t.font};color:${subText};margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cs.subtitle}</div></div></div><div style="font:9px var(--font-mono);color:#6b7280;text-align:center;margin-top:3px">封面</div></div>`;
      if (kind === 'section') return `${wrap}<div style="border:1px solid var(--color-glass-edge);border-radius:6px;aspect-ratio:16/9;background:${t.bar};position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-direction:column"><div style="font:700 20px ${t.font};color:#fff">PART ${cs.part}</div><div style="font:8px ${t.font};color:rgba(255,255,255,.85);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:80%">${cs.partName}</div></div><div style="font:9px var(--font-mono);color:#6b7280;text-align:center;margin-top:3px">章节</div></div>`;
      if (kind === 'content') return `${wrap}<div style="border:1px solid var(--color-glass-edge);border-radius:6px;aspect-ratio:16/9;background:${cardBg};position:relative;overflow:hidden;padding:10px"><div style="font:700 9px ${t.font};color:${darkText};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cs.title}</div><div style="height:2px;width:18px;background:${t.accent};margin:3px 0 5px"></div>${cs.points.slice(0,2).map(p => `<div style="color:${darkText};font:7px/1.4 var(--font-body);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p}</div>`).join('')}</div><div style="font:9px var(--font-mono);color:#6b7280;text-align:center;margin-top:3px">内容</div></div>`;
      return `${wrap}<div style="border:1px solid var(--color-glass-edge);border-radius:6px;aspect-ratio:16/9;background:${cardBg};position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center"><div style="font:700 10px ${t.font};color:${t.accent}">谢谢观看</div></div><div style="font:9px var(--font-mono);color:#6b7280;text-align:center;margin-top:3px">封底</div></div>`;
    }
    function render() {
      const cs = CASES[ci]; const t = TPL[tp];
      nameEl.textContent = '案例：' + cs.title + ' · 模板「' + t.name + '」';
      kit.innerHTML = [thumb('cover', t, cs), thumb('section', t, cs), thumb('content', t, cs), thumb('end', t, cs)].join('');
    }
    render();
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { ci = Math.floor(Math.random() * CASES.length); render(); });
    c.querySelectorAll('[data-tpl]').forEach(b => b.onclick = () => { tp = b.dataset.tpl; c.querySelectorAll('[data-tpl]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(); });
  },

  'textbox-placeholder'(c) {
    // 真实案例：同一份内容，用占位符自动对齐；用文本框得手动摆，加页还得出错
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="tbName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="shuffle">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">同一份内容：用「占位符」自动对齐；用「文本框」得手动摆，加页还得出错</div>
        <div class="demo-row">
          <button class="demo-btn active" data-mode="ph">用占位符（结构化）</button>
          <button class="demo-btn" data-mode="tb">用文本框（自由）</button>
        </div>
        <div class="demo-row" id="tbSlides" style="gap:12px;flex-wrap:nowrap"></div>
      </div>`;
    const slides = c.querySelector('#tbSlides');
    const nameEl = c.querySelector('#tbName');
    let ci = Math.floor(Math.random() * CASES.length);
    let mode = 'ph';
    function page(n) {
      const cs = CASES[ci];
      if (mode === 'ph') {
        return `<div class="mini-slide" style="flex:1;min-width:0;background:#fbfcf7">
          <div style="position:absolute;top:9%;left:9%;right:9%;font:700 15px var(--font-body);color:#1a3300">${cs.title}</div>
          <div style="position:absolute;top:9%;right:9%;font:10px var(--font-mono);color:rgba(26,51,0,.45)">第 ${n} 页</div>
          <div style="position:absolute;top:30%;left:9%;right:9%;display:flex;flex-direction:column;gap:5px">${cs.points.slice(0,3).map(p => `<div class="ly-li" style="color:#1a3300">${p}</div>`).join('')}</div>
        </div>`;
      }
      return `<div class="mini-slide" style="flex:1;min-width:0;background:#fbfcf7">
        <div style="position:absolute;top:33%;left:22%;width:60%;padding:4px 8px;background:rgba(203,85,33,.12);border:1px dashed rgba(203,85,33,.6);border-radius:4px;font:13px var(--font-body);color:#1a3300">${cs.title}</div>
        <div style="position:absolute;top:54%;left:14%;right:10%;font:9px var(--font-body);color:rgba(26,51,0,.55)">${cs.body}</div>
        <div style="position:absolute;bottom:9%;right:9%;font:10px var(--font-mono);color:rgba(26,51,0,.45)">第 ${n} 页</div>
      </div>`;
    }
    function render() {
      const cs = CASES[ci];
      nameEl.textContent = '案例：' + cs.title + (mode === 'ph' ? ' · 占位符自动对齐' : ' · 文本框需手动摆');
      slides.innerHTML = page(1) + page(2);
    }
    render();
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { ci = Math.floor(Math.random() * CASES.length); render(); });
    c.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { mode = b.dataset.mode; c.querySelectorAll('[data-mode]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(); });
  },

  'bg-format'(c) {
    // 真实案例：换背景格式（纯色/渐变/图片），同一份封面立刻换气质
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="bgName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="shuffle">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">换背景格式：纯色 / 渐变 / 图片，同一份封面立刻换气质</div>
        <div class="demo-row">
          <button class="demo-btn active" data-bg="solid">纯色</button>
          <button class="demo-btn" data-bg="gradient">渐变</button>
          <button class="demo-btn" data-bg="pic">图片</button>
        </div>
        <div class="mini-slide" id="bgSlide" style="align-items:stretch;justify-content:stretch;overflow:hidden"></div>
      </div>`;
    const slide = c.querySelector('#bgSlide');
    const nameEl = c.querySelector('#bgName');
    let ci = Math.floor(Math.random() * CASES.length);
    let bg = 'solid';
    function render() {
      const cs = CASES[ci];
      nameEl.textContent = '案例：' + cs.title;
      if (bg === 'solid') {
        slide.style.background = '#2f6f3a';
      } else if (bg === 'gradient') {
        slide.style.background = 'linear-gradient(135deg,#2f6f3a,#1a3300)';
      } else {
        // 图片模式：与当前案例文案呼应的真实图片（CC 免费可商用），全幅显示，不整屏压暗
        slide.style.background = `url("./images/${cs.img}") center/cover no-repeat`;
      }
      const isPic = bg === 'pic';
      const card = isPic
        ? 'position:absolute;bottom:8%;left:8%;right:8%;padding:12px 14px;border-radius:10px;background:rgba(0,0,0,.42);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);text-align:center'
        : 'position:absolute;top:40%;left:10%;right:10%;text-align:center';
      const titleColor = isPic ? '#ffffff' : '#eef3e6';
      const subColor = isPic ? 'rgba(255,255,255,.85)' : '#bcd99b';
      const barColor = isPic ? '#ffffff' : '#bcd99b';
      slide.innerHTML = `<div style="${card}">
        <div style="font:700 22px var(--font-body);color:${titleColor};text-shadow:${isPic?'none':'0 2px 8px rgba(0,0,0,.3)'}">${cs.title}</div>
        <div style="height:3px;width:42px;background:${barColor};margin:10px auto;border-radius:2px"></div>
        <div style="font:14px var(--font-body);color:${subColor}">${cs.subtitle}</div>
      </div>`;
    }
    render();
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { ci = Math.floor(Math.random() * CASES.length); render(); });
    c.querySelectorAll('[data-bg]').forEach(b => b.onclick = () => { bg = b.dataset.bg; c.querySelectorAll('[data-bg]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(); });
  },

  'header-footer'(c) {
    // 真实案例：页眉 / 页脚 / 编号 可独立开关，全篇统一生效
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="hfName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="shuffle">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">页眉 / 页脚 / 编号 可独立开关，全篇统一生效</div>
        <div class="demo-row">
          <button class="demo-btn active" data-toggle="header">页眉</button>
          <button class="demo-btn active" data-toggle="footer">页脚</button>
          <button class="demo-btn active" data-toggle="page">页码</button>
        </div>
        <div class="demo-row" id="hfSlides" style="gap:12px;flex-wrap:nowrap"></div>
      </div>`;
    const slides = c.querySelector('#hfSlides');
    const nameEl = c.querySelector('#hfName');
    let ci = Math.floor(Math.random() * CASES.length);
    let st = { header:true, footer:true, page:true };
    function page(kind, n) {
      const cs = CASES[ci];
      let inner = '';
      if (st.header) inner += `<div style="position:absolute;top:7px;left:10px;right:10px;display:flex;justify-content:space-between;font:9px var(--font-mono);color:rgba(26,51,0,.5)"><span>${cs.kicker} · ${cs.title}</span><span>机密</span></div>`;
      inner += `<div style="position:absolute;top:42%;left:10%;right:10%;text-align:center;color:#1a3300"><div style="font:700 16px var(--font-body)">${cs.title}</div><div style="font:12px var(--font-body);color:#4a5a3a;margin-top:5px">${kind === 'cover' ? cs.subtitle : cs.partName}</div></div>`;
      if (st.footer) inner += `<div style="position:absolute;bottom:7px;left:10px;font:9px var(--font-mono);color:rgba(26,51,0,.5)">${cs.footer}</div>`;
      if (st.page) inner += `<div style="position:absolute;bottom:7px;right:10px;font:9px var(--font-mono);color:rgba(26,51,0,.5)">${n}</div>`;
      return `<div class="mini-slide" style="flex:1;min-width:0;background:#fbfcf7">${inner}</div>`;
    }
    function render() {
      const cs = CASES[ci];
      nameEl.textContent = '案例：' + cs.title;
      slides.innerHTML = page('cover', 1) + page('section', 2);
    }
    render();
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { ci = Math.floor(Math.random() * CASES.length); render(); });
    c.querySelectorAll('[data-toggle]').forEach(b => b.onclick = () => { const k = b.dataset.toggle; st[k] = !st[k]; b.classList.toggle('active', st[k]); render(); });
  },

  watermark(c) {
    // 真实案例：加水印（品牌露出 / 标"机密"），在内容之上、文字之下
    c.innerHTML = `
      <div class="demo-stack">
        <div class="demo-row" style="justify-content:space-between;gap:8px">
          <span class="demo-label" id="wmName" style="font-size:13px;color:var(--color-moon-mist)">案例加载中…</span>
          <button class="demo-btn" data-m="shuffle">↻ 换一个真实案例</button>
        </div>
        <div class="demo-label">加水印：品牌露出 / 标"机密"，在内容之上、文字之下</div>
        <div class="demo-row">
          <button class="demo-btn active" data-wm="off">关闭</button>
          <button class="demo-btn" data-wm="text">文字水印</button>
          <button class="demo-btn" data-wm="pic">图片水印</button>
          <button class="demo-btn" data-wm="center">居中大标</button>
        </div>
        <div class="mini-slide" id="wmSlide" style="align-items:stretch;justify-content:stretch;background:#fbfcf7"></div>
      </div>`;
    const slide = c.querySelector('#wmSlide');
    const nameEl = c.querySelector('#wmName');
    let ci = Math.floor(Math.random() * CASES.length);
    let wm = 'off';
    function wmLayer() {
      const cs = CASES[ci];
      if (wm === 'off') return '';
      if (wm === 'text') {
        let s = '';
        for (let r = 0; r < 3; r++) for (let col = 0; col < 3; col++) s += `<div style="position:absolute;top:${15 + r * 28}%;left:${5 + col * 32}%;transform:rotate(-20deg);font:12px var(--font-mono);color:rgba(47,111,58,.13);white-space:nowrap">${cs.kicker}</div>`;
        return s;
      }
      if (wm === 'pic') return `<div style="position:absolute;top:8px;right:10px;width:18%;height:14%;border-radius:6px;background:rgba(47,111,58,.12);display:flex;align-items:center;justify-content:center;font:700 10px var(--font-mono);color:rgba(47,111,58,.4)">${cs.kicker}</div>`;
      return `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 40px var(--font-mono);color:rgba(47,111,58,.1)">${cs.kicker}</div>`;
    }
    function render() {
      const cs = CASES[ci];
      nameEl.textContent = '案例：' + cs.title;
      slide.innerHTML = wmLayer() + `<div style="position:absolute;top:12%;left:9%;right:9%;color:#1a3300;z-index:2">
        <div style="font:700 16px var(--font-body)">${cs.title}</div>
        <div style="height:3px;width:30px;background:#2f6f3a;margin:7px 0 10px;border-radius:2px"></div>
        <div style="display:flex;flex-direction:column;gap:6px">${cs.points.slice(0,3).map(p => `<div class="ly-li" style="color:#1a3300">${p}</div>`).join('')}</div>
      </div>`;
    }
    render();
    c.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { ci = Math.floor(Math.random() * CASES.length); render(); });
    c.querySelectorAll('[data-wm]').forEach(b => b.onclick = () => { wm = b.dataset.wm; c.querySelectorAll('[data-wm]').forEach(x => x.classList.remove('active')); b.classList.add('active'); render(); });
  },

  'combo-chart'(c) {
    const TW_CASES = CASES.filter(x => x.tw && Array.isArray(x.tw.aPts) && Array.isArray(x.tw.bPts));
    let ci = Math.floor(Math.random()*TW_CASES.length);
    c.innerHTML = '<div class="demo-stack">' +
      '<div class="demo-row demo-top">' +
        '<span class="demo-label" id="ccName">案例加载中…</span>' +
        '<button class="demo-btn" data-m="cc">↻ 换一个真实案例</button>' +
      '</div>' +
      '<div class="mini-slide" id="ccStage"></div>' +
      '<div class="demo-row"><button class="demo-btn" data-m="combo">组合</button><button class="demo-btn" data-m="bar">仅柱</button><button class="demo-btn" data-m="line">仅线</button></div>' +
    '</div>';
    const stage = c.querySelector('#ccStage');
    const nameEl = c.querySelector('#ccName');
    function fill(){ nameEl.textContent = '案例：' + TW_CASES[ci].title; }
    function render(m){
      const cs = TW_CASES[ci];
      function num(s,i){ const mm = s.match(/-?\d+(\.\d+)?/); return mm ? parseFloat(mm[0]) : (i+1)*10; }
      const bars = cs.tw.aPts.map(num);
      const line = cs.tw.bPts.map(num);
      const all = bars.concat(line);
      let max = 0; for (let i=0;i<all.length;i++){ if (all[i]>max) max=all[i]; }
      if (max<=0) max = 1;
      const x0 = 42, plotW = 250, baseY = 150, topY = 24;
      const slot = plotW / bars.length;
      let s = '<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">';
      s += '<line x1="'+x0+'" y1="'+baseY+'" x2="'+(x0+plotW)+'" y2="'+baseY+'" stroke="#9bb08a" stroke-width="1.5"/>';
      if (m !== 'line'){
        for (let i=0;i<bars.length;i++){
          const cx = x0 + slot*i + slot/2;
          const h = (bars[i]/max)*(baseY-topY);
          s += '<rect x="'+(cx-17)+'" y="'+(baseY-h)+'" width="34" height="'+h+'" rx="3" fill="#2f6f3a"/>';
        }
      }
      if (m !== 'bar'){
        let pts = [];
        for (let i=0;i<line.length;i++){
          const cx = x0 + slot*i + slot/2;
          const ly = baseY - (line[i]/max)*(baseY-topY);
          pts.push(cx+','+ly);
          s += '<circle cx="'+cx+'" cy="'+ly+'" r="3.5" fill="#cb5521"/>';
        }
        s += '<polyline points="'+pts.join(' ')+'" fill="none" stroke="#cb5521" stroke-width="2.5"/>';
      }
      for (let i=0;i<bars.length;i++){
        const cx = x0 + slot*i + slot/2;
        s += '<text x="'+cx+'" y="164" font-size="9" fill="#4a5a3a" text-anchor="middle" font-family="sans-serif">'+(i+1)+'</text>';
      }
      s += '<text x="'+x0+'" y="14" font-size="10" fill="#1a3300" font-family="sans-serif">'+cs.title+'</text>';
      s += '<text x="'+(x0+plotW)+'" y="14" font-size="9" fill="#2f6f3a" text-anchor="end" font-family="sans-serif">'+cs.tw.a+'</text>';
      s += '<text x="'+(x0+plotW)+'" y="26" font-size="9" fill="#cb5521" text-anchor="end" font-family="sans-serif">'+cs.tw.b+'</text>';
      s += '</svg>';
      stage.innerHTML = '<div style="height:100%;padding:8px;display:flex;flex-direction:column;gap:6px;justify-content:center">' +
        '<div style="font:700 12px var(--font-display);color:#2f6f3a;text-align:center">'+cs.title+' · 组合图（柱 + 线）</div>' +
        '<div style="flex:1;min-height:0">'+s+'</div>' +
      '</div>';
    }
    fill(); render('combo');
    c.querySelectorAll('[data-m]:not([data-m="cc"])').forEach(b => b.onclick = () => {
      c.querySelectorAll('[data-m]:not([data-m="cc"])').forEach(x => x.classList.remove('active'));
      b.classList.add('active'); render(b.dataset.m);
    });
    const initBtn = c.querySelector('[data-m="combo"]'); if (initBtn) initBtn.classList.add('active');
    c.querySelector('[data-m="cc"]').onclick = () => { ci = Math.floor(Math.random()*TW_CASES.length); fill(); const act = c.querySelector('[data-m].active:not([data-m="cc"])'); render(act ? act.dataset.m : 'combo'); };
  },
};

if (typeof window !== "undefined") window.DEMOS = DEMOS;
if (typeof module !== "undefined") module.exports = DEMOS;
