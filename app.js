const state = {
  name: "",
  location: "",
  language: "zh",
  goals: [],
  incomeTiming: "",
  interests: [],
  bodyNeeds: [],
  barriers: [],
  supportNeeds: [],
  skillChoice: "",
  financeFocus: "",
  safetyLevel: "",
  planBias: "balanced",
  extraNote: "",
};

let currentNodeId = "goal";
let historyStack = [];
let activeTab = "jobs";

const nodes = {
  goal: {
    step: "Step 2",
    title: "你现在最需要什么帮助？",
    text: "不用知道专业分类。先选你最接近的情况，我们会继续追问，把它变成清楚的下一步。",
    why: "很多人不是没有努力，而是不知道从哪里开始。先问生活场景，比让用户自己搜索更友好。",
    options: [
      {
        label: "我想尽快找工作",
        help: "需要收入，最好是低门槛、可培训上岗。",
        effects: { goals: ["job"] },
        next: "incomeTiming",
      },
      {
        label: "我想学一个能赚钱的技能",
        help: "比如基础电脑、汽修、木工、护理、客服。",
        effects: { goals: ["skill"] },
        next: "skillPreference",
      },
      {
        label: "我最近压力很大",
        help: "想找免费心理支持、热线或社区资源。",
        effects: { goals: ["mental"] },
        next: "safety",
      },
      {
        label: "我想学怎么管钱",
        help: "预算、储蓄、信用分、避免高利贷。",
        effects: { goals: ["finance"] },
        next: "financeFocus",
      },
      {
        label: "我不知道，帮我判断",
        help: "系统会用几个简单问题帮你分辨。",
        effects: { goals: ["unsure"] },
        next: "incomeTiming",
      },
    ],
  },
  incomeTiming: {
    step: "Step 3",
    title: "你多久内需要有收入？",
    text: "这个答案会影响推荐：需要马上赚钱的人，先看快速上岗岗位；不急的人，可以先学短期技能。",
    why: "弱势用户常常同时面对钱、交通、身体和情绪压力。先判断紧急度，能避免推荐太理想化。",
    options: [
      {
        label: "越快越好",
        help: "今天或这周就想申请工作。",
        effects: { incomeTiming: "now", goals: ["job"] },
        next: "workPreference",
      },
      {
        label: "一两个月内",
        help: "可以先学一点技能再找工作。",
        effects: { incomeTiming: "soon", goals: ["skill"] },
        next: "skillPreference",
      },
      {
        label: "不急，想长期变好",
        help: "更适合成长计划和稳定训练。",
        effects: { incomeTiming: "growth", goals: ["skill", "finance"] },
        next: "skillPreference",
      },
      {
        label: "我不确定",
        help: "先按稳妥路线推荐。",
        effects: { incomeTiming: "unsure" },
        next: "workPreference",
      },
    ],
  },
  skillPreference: {
    step: "Step 3",
    title: "你更想从哪种技能开始？",
    text: "这里不假设所有人都要学编程。动手技能、服务技能、电脑技能都可以是向上路径。",
    why: "低学历用户需要的是能转成收入的技能。把蓝领、服务和线上基础技能放在同一套路径里，会更贴近真实生活。",
    options: [
      {
        label: "动手做东西",
        help: "汽修、木工、维修、仓储、园艺。",
        effects: { skillChoice: "hands", interests: ["hands"] },
        next: "bodyFit",
      },
      {
        label: "照顾别人",
        help: "陪护、家政、托儿、护理助理。",
        effects: { skillChoice: "care", interests: ["care"] },
        next: "bodyFit",
      },
      {
        label: "用电脑或手机",
        help: "数据录入、客服、基础电脑、文档整理。",
        effects: { skillChoice: "computer", interests: ["computer"] },
        next: "bodyFit",
      },
      {
        label: "和人沟通",
        help: "收银、前台、客服、餐饮服务。",
        effects: { skillChoice: "service", interests: ["service"] },
        next: "bodyFit",
      },
      {
        label: "我不确定",
        help: "先根据身体情况和设备情况推荐。",
        effects: { skillChoice: "unsure" },
        next: "bodyFit",
      },
    ],
  },
  workPreference: {
    step: "Step 4",
    title: "什么样的工作更适合你？",
    text: "不用想职业名称。选你比较能接受的工作方式。",
    why: "很多低门槛岗位的区别不在学历，而在体力、交通、沟通和能不能培训上岗。",
    options: [
      {
        label: "动手现场工作",
        help: "清洁、仓储、汽修助手、木工助手。",
        effects: { interests: ["hands", "onsite"] },
        next: "bodyFit",
      },
      {
        label: "服务别人",
        help: "收银、端盘子、前台、陪护、餐饮。",
        effects: { interests: ["service"] },
        next: "bodyFit",
      },
      {
        label: "坐着或远程工作",
        help: "数据录入、在线客服、文档整理。",
        effects: { interests: ["computer", "remote"] },
        next: "bodyFit",
      },
      {
        label: "需要培训上岗",
        help: "没有经验也可以从助手或 trainee 开始。",
        effects: { barriers: ["no_experience"] },
        next: "bodyFit",
      },
      {
        label: "我不确定",
        help: "继续问身体和交通情况。",
        effects: {},
        next: "bodyFit",
      },
    ],
  },
  bodyFit: {
    step: "Step 5",
    title: "身体和环境需要什么照顾？",
    text: "这不是限制你，而是帮系统避开不合适的岗位，推荐更现实的机会。",
    why: "对残障人士来说，推荐是否可坐着、是否远程、是否不能搬重物，比岗位标题更重要。",
    options: [
      {
        label: "需要坐着或远程",
        help: "行动不便、慢性病、交通困难都可以选。",
        effects: { bodyNeeds: ["sit_or_remote", "low_physical"] },
        next: "barriers",
      },
      {
        label: "不能搬重物",
        help: "避开仓库重体力、建筑搬运等岗位。",
        effects: { bodyNeeds: ["no_heavy_lifting", "low_physical"] },
        next: "barriers",
      },
      {
        label: "可以站立和走动",
        help: "可考虑清洁、收银、餐饮、护理等。",
        effects: { bodyNeeds: ["can_stand"] },
        next: "barriers",
      },
      {
        label: "需要灵活时间",
        help: "照护家人、治疗、上课或交通不稳定。",
        effects: { bodyNeeds: ["flexible_time"] },
        next: "barriers",
      },
      {
        label: "我有残障适配需求",
        help: "优先推荐残障友好、可申请 accommodation 的机会。",
        effects: { bodyNeeds: ["disability_accommodation", "low_physical"] },
        next: "barriers",
      },
    ],
  },
  barriers: {
    step: "Step 6",
    title: "现在最大的阻碍是什么？",
    text: "选一个最影响你的问题。系统会把它放进推荐理由里。",
    why: "只推机会不够。用户还需要知道为什么这个机会适合自己，以及先补哪块短板。",
    options: [
      {
        label: "没有经验",
        help: "需要 training-provided 或助手岗位。",
        effects: { barriers: ["no_experience"] },
        next: "supportNeeds",
      },
      {
        label: "学历不高或阅读困难",
        help: "需要简单语言和短课程。",
        effects: { barriers: ["low_literacy"] },
        next: "supportNeeds",
      },
      {
        label: "英语不够好",
        help: "需要双语资源或低沟通岗位。",
        effects: { barriers: ["limited_english"] },
        next: "supportNeeds",
      },
      {
        label: "没有电脑或网络不稳定",
        help: "优先推荐手机可用、线下资源或图书馆资源。",
        effects: { barriers: ["no_computer"] },
        next: "supportNeeds",
      },
      {
        label: "交通不方便",
        help: "优先看远程、附近、公交可达机会。",
        effects: { barriers: ["transport"] },
        next: "supportNeeds",
      },
    ],
  },
  safety: {
    step: "Step 3",
    title: "你现在安全吗？",
    text: "如果你有自伤风险、正在崩溃或觉得自己可能伤害自己，请优先联系紧急支持。这个平台只能做资源导航。",
    why: "心理支持不能被普通推荐替代。高风险情况必须先给危机资源和本地紧急服务指引。",
    options: [
      {
        label: "我现在有危险或可能伤害自己",
        help: "优先显示 988 和紧急支持。",
        effects: { safetyLevel: "crisis", supportNeeds: ["mental_crisis"] },
        next: "supportNeeds",
      },
      {
        label: "我压力很大，但现在安全",
        help: "推荐免费热线、社区心理资源和压力管理课程。",
        effects: { safetyLevel: "stressed", supportNeeds: ["mental_support"] },
        next: "supportNeeds",
      },
      {
        label: "我想找长期支持",
        help: "推荐免费或低成本心理健康导航链接。",
        effects: { safetyLevel: "long_term", supportNeeds: ["mental_support"] },
        next: "supportNeeds",
      },
      {
        label: "我不确定",
        help: "先给安全提醒和低门槛资源。",
        effects: { safetyLevel: "unsure", supportNeeds: ["mental_support"] },
        next: "supportNeeds",
      },
    ],
  },
  financeFocus: {
    step: "Step 3",
    title: "你最想先学哪件钱的事？",
    text: "这里不做投资建议，只推荐基础、低风险的免费学习资源。",
    why: "对低收入用户，最先有用的不是复杂投资，而是预算、储蓄、信用、避坑。",
    options: [
      {
        label: "怎么做预算",
        help: "知道钱花到哪里，先稳住每周开销。",
        effects: { financeFocus: "budget", supportNeeds: ["finance"] },
        next: "bodyFit",
      },
      {
        label: "怎么开始储蓄",
        help: "从小额紧急备用金开始。",
        effects: { financeFocus: "saving", supportNeeds: ["finance"] },
        next: "bodyFit",
      },
      {
        label: "信用分和银行账户",
        help: "理解信用分、银行账户和费用。",
        effects: { financeFocus: "credit", supportNeeds: ["finance"] },
        next: "bodyFit",
      },
      {
        label: "避免债务和诈骗",
        help: "识别高利贷、收费陷阱、虚假招聘。",
        effects: { financeFocus: "avoid_debt", supportNeeds: ["finance"] },
        next: "bodyFit",
      },
      {
        label: "我不确定",
        help: "先给基础理财入门。",
        effects: { financeFocus: "basics", supportNeeds: ["finance"] },
        next: "bodyFit",
      },
    ],
  },
  supportNeeds: {
    step: "Step 7",
    title: "除了推荐机会，你还需要哪种帮助？",
    text: "可以选最重要的一项。最后计划会把这项放在今天任务里。",
    why: "机会导航不是只给链接。它要把工作、课程、支持和求职动作连成一个闭环。",
    options: [
      {
        label: "帮我做简历",
        help: "适合没有经验或不知道怎么写的人。",
        effects: { supportNeeds: ["resume"] },
        next: "finalCheck",
      },
      {
        label: "帮我练面试",
        help: "用简单问题练习自我介绍。",
        effects: { supportNeeds: ["interview"] },
        next: "finalCheck",
      },
      {
        label: "心理支持链接",
        help: "免费热线、社区资源、压力管理。",
        effects: { supportNeeds: ["mental_support"] },
        next: "finalCheck",
      },
      {
        label: "基础理财课程",
        help: "预算、储蓄、信用、避坑。",
        effects: { supportNeeds: ["finance"] },
        next: "finalCheck",
      },
      {
        label: "先给我最简单的计划",
        help: "系统自动平衡工作、课程和支持。",
        effects: {},
        next: "finalCheck",
      },
    ],
  },
  finalCheck: {
    step: "Step 8",
    title: "这份计划先偏向什么？",
    text: "最后一步。选择后，右侧会生成更清晰的行动路线。",
    why: "同一个人可能同时需要收入、技能和支持。最后让用户选择优先级，可以让计划更容易执行。",
    options: [
      {
        label: "先找工作",
        help: "推荐快速上岗岗位和申请动作。",
        effects: { planBias: "jobs", goals: ["job"] },
        next: "done",
      },
      {
        label: "先学技能",
        help: "推荐短课和对应岗位。",
        effects: { planBias: "skills", goals: ["skill"] },
        next: "done",
      },
      {
        label: "先稳住状态",
        help: "心理支持、低压力任务、简单课程。",
        effects: { planBias: "support", supportNeeds: ["mental_support"] },
        next: "done",
      },
      {
        label: "平衡安排",
        help: "今天工作、技能、支持各一步。",
        effects: { planBias: "balanced" },
        next: "done",
      },
    ],
  },
  done: {
    step: "Done",
    title: "你的机会路径已经生成",
    text: "右侧是根据你刚才的选择生成的工作、技能、支持和求职计划。你可以复制、打印，或者返回修改答案。",
    why: "这个原型证明了核心体验：用户不需要自己搜索，一步步选择后就能得到可执行路径。",
    options: [
      {
        label: "再优化工作推荐",
        help: "回到工作方式问题。",
        effects: {},
        next: "workPreference",
      },
      {
        label: "再优化技能推荐",
        help: "回到技能偏好问题。",
        effects: {},
        next: "skillPreference",
      },
      {
        label: "重新开始",
        help: "清空当前选择。",
        effects: { reset: true },
        next: "goal",
      },
    ],
  },
};

const jobCatalog = [
  {
    title: "远程客服或在线聊天客服",
    source: "企业发布",
    description: "适合能用电脑或手机、需要坐着或远程工作的人。很多岗位提供话术培训。",
    tags: ["remote", "sitting", "computer", "training", "low_physical"],
    link: "https://www.careeronestop.org/JobSearch/job-search.aspx",
    linkLabel: "用 CareerOneStop 搜 entry-level customer support",
  },
  {
    title: "数据录入或文档整理",
    source: "企业发布",
    description: "适合行动受限、喜欢安静任务、基础电脑可用的人。需要注意识别虚假招聘。",
    tags: ["remote", "sitting", "computer", "low_physical", "entry"],
    link: "https://www.careeronestop.org/JobSearch/job-search.aspx",
    linkLabel: "搜索 data entry 入门岗位",
  },
  {
    title: "超市收银员或货架补货员",
    source: "现场找",
    description: "不要求高学历，很多店可培训。收银岗位可询问是否能坐着工作或调整班次。",
    tags: ["onsite", "service", "training", "can_stand", "entry"],
    link: "https://www.careeronestop.org/LocalHelp/local-help.aspx",
    linkLabel: "找附近就业中心",
  },
  {
    title: "清洁工或酒店客房清洁",
    source: "现场找",
    description: "通常入门快，但体力要求较高。适合能站立、走动、希望尽快有收入的人。",
    tags: ["onsite", "hands", "fast_income", "physical", "can_stand"],
    link: "https://www.goodwill.org/job-training-and-placement-services/",
    linkLabel: "查看 Goodwill 就业训练",
  },
  {
    title: "餐厅帮工、洗碗工或端盘助手",
    source: "现场找",
    description: "低门槛、培训快。适合能站立、愿意做服务类现场工作的人。",
    tags: ["onsite", "service", "fast_income", "can_stand", "entry"],
    link: "https://www.careeronestop.org/LocalHelp/local-help.aspx",
    linkLabel: "找本地就业帮助",
  },
  {
    title: "仓库拣货、包装或快递分拣",
    source: "企业发布",
    description: "入门机会多，但可能需要搬重物和长时间站立。适合体力允许、想快速上岗的人。",
    tags: ["onsite", "hands", "fast_income", "physical", "can_stand"],
    link: "https://www.careeronestop.org/JobSearch/job-search.aspx",
    linkLabel: "搜索 warehouse entry-level",
  },
  {
    title: "汽修店助手",
    source: "现场找",
    description: "适合喜欢动手、有交通条件、愿意从清洁工具、递工具、基础维护做起的人。",
    tags: ["onsite", "hands", "training", "can_stand", "growth"],
    link: "https://www.careeronestop.org/Toolkit/Careers/careers.aspx",
    linkLabel: "查看汽修相关职业路径",
  },
  {
    title: "木工或维修助手",
    source: "现场找",
    description: "适合想学手艺的人。通常从助手做起，体力要求中高，安全培训很重要。",
    tags: ["onsite", "hands", "training", "physical", "growth"],
    link: "https://www.careeronestop.org/Toolkit/Training/find-certifications.aspx",
    linkLabel: "查找证书和培训",
  },
  {
    title: "陪护、家政或托儿助理",
    source: "企业发布",
    description: "适合有照顾经验、喜欢帮助别人、能沟通的人。部分岗位需要背景检查或短培训。",
    tags: ["care", "service", "training", "can_stand", "entry"],
    link: "https://www.careeronestop.org/JobSearch/job-search.aspx",
    linkLabel: "搜索 caregiver entry-level",
  },
  {
    title: "残障友好就业项目",
    source: "现场找",
    description: "适合需要 accommodation、灵活安排或残障就业支持的人。",
    tags: ["disability_accommodation", "low_physical", "support", "training"],
    link: "https://choosework.ssa.gov/",
    linkLabel: "查看 Ticket to Work",
  },
];

const skillCatalog = [
  {
    title: "基础电脑和手机办公",
    description: "学习键盘、邮箱、表格、文件管理。适合数据录入、客服、前台。",
    tags: ["computer", "low_literacy", "remote", "entry"],
    link: "https://edu.gcfglobal.org/en/basic-computer-skills/",
    linkLabel: "GCFGlobal 基础电脑课",
  },
  {
    title: "客服沟通入门",
    description: "练习礼貌表达、处理投诉、写简单回复。适合远程客服、收银、前台。",
    tags: ["service", "computer", "interview", "entry"],
    link: "https://edu.gcfglobal.org/en/workplacebasics/",
    linkLabel: "GCFGlobal 职场基础",
  },
  {
    title: "汽修基础认知",
    description: "了解工具、安全、基础维护，再去找汽修助手或社区培训。",
    tags: ["hands", "growth", "onsite"],
    link: "https://www.careeronestop.org/Toolkit/Careers/careers.aspx",
    linkLabel: "CareerOneStop 职业路径",
  },
  {
    title: "木工和维修安全基础",
    description: "先学工具安全、测量、材料认知，再找 helper 或 certificate。",
    tags: ["hands", "growth", "physical"],
    link: "https://www.careeronestop.org/Toolkit/Training/find-certifications.aspx",
    linkLabel: "查找本地证书培训",
  },
  {
    title: "护理和陪护入门",
    description: "了解基本照护、沟通和安全。适合家政、陪护、养老院服务。",
    tags: ["care", "service", "training"],
    link: "https://www.careeronestop.org/Toolkit/Careers/careers.aspx",
    linkLabel: "查看照护职业路径",
  },
  {
    title: "英语和简单职场表达",
    description: "适合英语不够好、需要准备面试和工作沟通的人。",
    tags: ["limited_english", "service", "interview"],
    link: "https://www.usa.gov/learn-english",
    linkLabel: "USA.gov 学英语资源",
  },
  {
    title: "基础预算和储蓄",
    description: "学习每周预算、小额储蓄、避开高费用账户。",
    tags: ["finance", "budget", "saving"],
    link: "https://www.fdic.gov/resources/consumers/money-smart/index.html",
    linkLabel: "FDIC Money Smart",
  },
  {
    title: "信用和防诈骗基础",
    description: "理解信用报告、债务催收、招聘诈骗和高利贷风险。",
    tags: ["finance", "credit", "avoid_debt"],
    link: "https://consumer.gov/",
    linkLabel: "Consumer.gov 简单理财信息",
  },
];

const supportCatalog = [
  {
    title: "988 心理危机热线",
    description: "如果你有自伤风险、强烈崩溃感或需要立即支持，可拨打或短信 988。",
    tags: ["mental_crisis", "mental_support", "urgent"],
    link: "https://988lifeline.org/",
    linkLabel: "打开 988 Lifeline",
  },
  {
    title: "SAMHSA 治疗和支持搜索",
    description: "查找附近心理健康或成瘾支持服务。",
    tags: ["mental_support"],
    link: "https://findtreatment.gov/",
    linkLabel: "打开 FindTreatment.gov",
  },
  {
    title: "NAMI 免费心理健康资源",
    description: "适合寻找教育材料、支持小组和家人支持资源。",
    tags: ["mental_support"],
    link: "https://www.nami.org/Support-Education",
    linkLabel: "查看 NAMI 支持资源",
  },
  {
    title: "Ticket to Work 残障就业支持",
    description: "适合领取残障福利、需要就业支持或担心工作影响福利的人。",
    tags: ["disability_accommodation", "support"],
    link: "https://choosework.ssa.gov/",
    linkLabel: "查看 Ticket to Work",
  },
  {
    title: "本地图书馆或就业中心",
    description: "如果没有电脑或网络，优先找可免费使用电脑、打印简历、上课的地点。",
    tags: ["no_computer", "transport", "support"],
    link: "https://www.careeronestop.org/LocalHelp/local-help.aspx",
    linkLabel: "查找本地就业中心",
  },
  {
    title: "Goodwill 就业训练和安置",
    description: "提供低门槛培训、简历帮助和工作安置服务，适合需要线下帮助的人。",
    tags: ["no_experience", "low_literacy", "support"],
    link: "https://www.goodwill.org/job-training-and-placement-services/",
    linkLabel: "查看 Goodwill 服务",
  },
];

const careerCatalog = [
  {
    title: "一页简历生成",
    description: "把照顾家人、志愿经历、兼职、家务管理都转成可写进简历的能力。",
    tags: ["resume", "no_experience", "low_literacy"],
    link: "https://www.careeronestop.org/JobSearch/Resumes/resumes.aspx",
    linkLabel: "查看简历指导",
  },
  {
    title: "3 句话自我介绍",
    description: "适合低学历或紧张用户：我是谁、我能做什么、我什么时候可以开始。",
    tags: ["interview", "service", "limited_english"],
    link: "https://www.careeronestop.org/JobSearch/Interview/interview-and-negotiate.aspx",
    linkLabel: "查看面试指导",
  },
  {
    title: "残障 accommodation 询问模板",
    description: "用礼貌、清楚的方式询问是否可坐着工作、调整班次或远程。",
    tags: ["disability_accommodation", "sit_or_remote", "flexible_time"],
    link: "https://www.dol.gov/general/topic/disability/jobaccommodations",
    linkLabel: "查看 DOL 残障工作适配信息",
  },
  {
    title: "防虚假招聘检查清单",
    description: "任何要求先交钱、购买设备、提供敏感信息的工作都要谨慎。",
    tags: ["avoid_debt", "no_experience", "remote"],
    link: "https://consumer.gov/scams",
    linkLabel: "查看 Consumer.gov 防诈骗",
  },
  {
    title: "每日求职小任务",
    description: "每天只做三件事：申请 2 个岗位、练 1 个回答、记录 1 个反馈。",
    tags: ["job", "fast_income", "balanced"],
    link: "https://www.careeronestop.org/JobSearch/job-search.aspx",
    linkLabel: "开始找工作",
  },
];

const labels = {
  goals: {
    job: "找工作",
    skill: "学技能",
    mental: "心理支持",
    finance: "理财基础",
    unsure: "需要系统判断",
  },
  interests: {
    hands: "动手技能",
    onsite: "现场工作",
    service: "服务沟通",
    computer: "电脑/远程",
    remote: "远程",
    care: "照护",
  },
  bodyNeeds: {
    sit_or_remote: "坐着或远程",
    low_physical: "低体力",
    no_heavy_lifting: "不能搬重物",
    can_stand: "可站立",
    flexible_time: "灵活时间",
    disability_accommodation: "残障适配",
  },
  barriers: {
    no_experience: "没有经验",
    low_literacy: "低学历或阅读困难",
    limited_english: "英语有限",
    no_computer: "缺少电脑",
    transport: "交通困难",
  },
  supportNeeds: {
    resume: "简历",
    interview: "面试",
    mental_support: "心理支持",
    mental_crisis: "危机支持",
    finance: "理财基础",
  },
};

const elements = {
  profileForm: document.getElementById("profileForm"),
  userName: document.getElementById("userName"),
  userLocation: document.getElementById("userLocation"),
  userLanguage: document.getElementById("userLanguage"),
  questionTitle: document.getElementById("questionTitle"),
  questionText: document.getElementById("questionText"),
  storyStep: document.getElementById("storyStep"),
  optionGrid: document.getElementById("optionGrid"),
  whyText: document.getElementById("whyText"),
  stateList: document.getElementById("stateList"),
  todayTasks: document.getElementById("todayTasks"),
  recommendations: document.getElementById("recommendations"),
  backBtn: document.getElementById("backBtn"),
  skipBtn: document.getElementById("skipBtn"),
  restartBtn: document.getElementById("restartBtn"),
  copyPlanBtn: document.getElementById("copyPlanBtn"),
  printBtn: document.getElementById("printBtn"),
  largeTextBtn: document.getElementById("largeTextBtn"),
  contrastBtn: document.getElementById("contrastBtn"),
  simpleBtn: document.getElementById("simpleBtn"),
  readBtn: document.getElementById("readBtn"),
};

function cloneState() {
  return JSON.parse(JSON.stringify(state));
}

function restoreState(snapshot) {
  Object.keys(state).forEach((key) => {
    delete state[key];
  });
  Object.assign(state, snapshot);
}

function addUnique(target, values) {
  values.forEach((value) => {
    if (!target.includes(value)) target.push(value);
  });
}

function applyEffects(effects = {}) {
  if (effects.reset) {
    resetState();
    return;
  }

  Object.entries(effects).forEach(([key, value]) => {
    if (Array.isArray(state[key])) {
      addUnique(state[key], Array.isArray(value) ? value : [value]);
    } else {
      state[key] = value;
    }
  });
}

function resetState() {
  const preserved = {
    name: state.name,
    location: state.location,
    language: state.language,
  };

  Object.assign(state, {
    name: preserved.name,
    location: preserved.location,
    language: preserved.language,
    goals: [],
    incomeTiming: "",
    interests: [],
    bodyNeeds: [],
    barriers: [],
    supportNeeds: [],
    skillChoice: "",
    financeFocus: "",
    safetyLevel: "",
    planBias: "balanced",
    extraNote: "",
  });
  historyStack = [];
}

function chooseOption(option) {
  historyStack.push({ nodeId: currentNodeId, snapshot: cloneState() });
  applyEffects(option.effects);
  currentNodeId = option.next;
  if (option.effects?.reset) currentNodeId = "goal";
  render();
}

function render() {
  renderNode();
  renderState();
  renderTodayTasks();
  renderRecommendations();
}

function renderNode() {
  const node = nodes[currentNodeId];
  elements.storyStep.textContent = node.step;
  elements.questionTitle.textContent = node.title;
  elements.questionText.textContent = node.text;
  elements.whyText.textContent = node.why;
  elements.optionGrid.innerHTML = "";

  node.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.dataset.testid = `option-${currentNodeId}-${index}`;
    button.innerHTML = `
      <span class="option-title">${option.label}</span>
      <span class="option-help">${option.help}</span>
    `;
    button.addEventListener("click", () => chooseOption(option));
    elements.optionGrid.appendChild(button);
  });

  elements.backBtn.disabled = historyStack.length === 0;
}

function humanList(values, dictionary, fallback = "等待选择") {
  if (!values || values.length === 0) return fallback;
  return values.map((value) => dictionary[value] || value).join("、");
}

function renderState() {
  const goalText = humanList(state.goals, labels.goals);
  const workParts = [
    humanList(state.interests, labels.interests, ""),
    humanList(state.bodyNeeds, labels.bodyNeeds, ""),
  ].filter(Boolean);
  const supportParts = [
    humanList(state.barriers, labels.barriers, ""),
    humanList(state.supportNeeds, labels.supportNeeds, ""),
  ].filter(Boolean);

  elements.stateList.innerHTML = `
    <div>
      <dt>目标</dt>
      <dd>${goalText}</dd>
    </div>
    <div>
      <dt>工作适配</dt>
      <dd>${workParts.join("、") || "等待选择"}</dd>
    </div>
    <div>
      <dt>支持需求</dt>
      <dd>${supportParts.join("、") || "等待选择"}</dd>
    </div>
    <div>
      <dt>位置和语言</dt>
      <dd>${state.location || "未填写"} · ${languageLabel(state.language)}</dd>
    </div>
  `;
}

function languageLabel(value) {
  const map = {
    zh: "中文",
    en: "English",
    bilingual: "中文 + English",
    other: "其他语言",
  };
  return map[value] || "中文";
}

function scoreItem(item) {
  let score = 0;
  const allPrefs = [
    ...state.goals,
    ...state.interests,
    ...state.bodyNeeds,
    ...state.barriers,
    ...state.supportNeeds,
    state.incomeTiming === "now" ? "fast_income" : "",
    state.financeFocus,
    state.skillChoice,
    state.planBias,
  ].filter(Boolean);

  item.tags.forEach((tag) => {
    if (allPrefs.includes(tag)) score += 4;
  });

  if (state.bodyNeeds.includes("sit_or_remote") && item.tags.includes("remote")) score += 5;
  if (state.bodyNeeds.includes("low_physical") && item.tags.includes("low_physical")) score += 4;
  if (state.bodyNeeds.includes("no_heavy_lifting") && item.tags.includes("physical")) score -= 7;
  if (state.barriers.includes("no_computer") && item.tags.includes("remote")) score -= 3;
  if (state.barriers.includes("no_experience") && item.tags.includes("training")) score += 4;
  if (state.barriers.includes("limited_english") && item.tags.includes("service")) score -= 1;
  if (state.goals.includes("job") && item.tags.includes("entry")) score += 2;
  if (state.goals.includes("finance") && item.tags.includes("finance")) score += 5;
  if (state.supportNeeds.includes("mental_crisis") && item.tags.includes("urgent")) score += 20;

  return score;
}

function pickTop(catalog, count = 3) {
  return catalog
    .map((item) => ({ ...item, score: scoreItem(item) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

function reasonFor(item) {
  const reasons = [];
  if (item.tags.includes("low_physical") && state.bodyNeeds.includes("low_physical")) {
    reasons.push("体力要求较低");
  }
  if (item.tags.includes("remote") && state.bodyNeeds.includes("sit_or_remote")) {
    reasons.push("可坐着或远程");
  }
  if (item.tags.includes("training") || item.tags.includes("entry")) {
    reasons.push("适合入门或培训上岗");
  }
  if (item.tags.includes("hands") && state.interests.includes("hands")) {
    reasons.push("符合动手偏好");
  }
  if (item.tags.includes("service") && state.interests.includes("service")) {
    reasons.push("符合服务沟通偏好");
  }
  if (item.tags.includes("computer") && state.interests.includes("computer")) {
    reasons.push("符合电脑或远程偏好");
  }
  if (item.tags.includes("finance") && state.supportNeeds.includes("finance")) {
    reasons.push("补基础理财");
  }
  if (item.tags.includes("mental_support") && state.supportNeeds.includes("mental_support")) {
    reasons.push("提供心理支持资源");
  }
  if (item.tags.includes("disability_accommodation") && state.bodyNeeds.includes("disability_accommodation")) {
    reasons.push("考虑残障适配");
  }

  return reasons.length ? reasons.slice(0, 3).join("、") : "与你的选择匹配，适合作为下一步参考";
}

function renderTodayTasks() {
  const recJobs = pickTop(jobCatalog, 1);
  const recSkills = pickTop(skillCatalog, 1);
  const tasks = [];

  if (state.supportNeeds.includes("mental_crisis")) {
    tasks.push("先联系 988 或当地紧急服务，确保自己安全。");
  }

  if (state.planBias === "jobs" || state.goals.includes("job") || state.incomeTiming === "now") {
    tasks.push(`申请或记录 2 个岗位：优先看「${recJobs[0]?.title || "快速上岗岗位"}」。`);
  } else {
    tasks.push(`完成 15 分钟短课：先看「${recSkills[0]?.title || "基础技能课"}」。`);
  }

  if (state.supportNeeds.includes("resume") || state.barriers.includes("no_experience")) {
    tasks.push("用一页简历模板写下 3 个可转移能力，比如准时、照顾、沟通、整理。");
  } else {
    tasks.push("保存 3 个推荐链接，并选一个今天真的能打开的。");
  }

  if (state.supportNeeds.includes("finance") || state.goals.includes("finance")) {
    tasks.push("完成一个预算小任务：写下本周必须支出的 3 项费用。");
  } else if (state.supportNeeds.includes("mental_support") || state.goals.includes("mental")) {
    tasks.push("保存一个免费心理支持链接，必要时联系热线或社区机构。");
  } else {
    tasks.push("练习 3 句话自我介绍：我能做什么、我愿意学什么、我什么时候能开始。");
  }

  elements.todayTasks.innerHTML = tasks.map((task) => `<li>${task}</li>`).join("");
}

function renderRecommendations() {
  const catalogMap = {
    jobs: pickTop(jobCatalog, 4),
    skills: pickTop(skillCatalog, 4),
    support: pickTop(supportCatalog, 4),
    career: pickTop(careerCatalog, 4),
  };
  const items = catalogMap[activeTab];

  elements.recommendations.innerHTML = items.map(renderCard).join("");
}

function renderCard(item) {
  const sourceTag = item.source ? `<span class="tag">${item.source}</span>` : "";
  const urgentTag = item.tags.includes("urgent") ? `<span class="tag urgent">紧急优先</span>` : "";
  const reason = reasonFor(item);

  return `
    <article class="recommendation-card">
      <div class="meta-row">
        ${sourceTag}
        ${urgentTag}
        <span class="tag warn">为什么适合你：${reason}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a class="resource-link" href="${item.link}" target="_blank" rel="noreferrer">${item.linkLabel}</a>
    </article>
  `;
}

function planText() {
  const tasks = Array.from(elements.todayTasks.querySelectorAll("li")).map((item) => item.textContent.trim());
  const jobs = pickTop(jobCatalog, 3).map((item) => `- ${item.title}: ${reasonFor(item)}`);
  const skills = pickTop(skillCatalog, 2).map((item) => `- ${item.title}: ${item.link}`);
  const support = pickTop(supportCatalog, 2).map((item) => `- ${item.title}: ${item.link}`);

  return [
    "向上路行动计划",
    `称呼：${state.name || "未填写"}`,
    `位置：${state.location || "未填写"}`,
    `目标：${humanList(state.goals, labels.goals)}`,
    "",
    "今天先做：",
    ...tasks.map((task, index) => `${index + 1}. ${task}`),
    "",
    "推荐工作：",
    ...jobs,
    "",
    "推荐课程：",
    ...skills,
    "",
    "支持资源：",
    ...support,
    "",
    "提醒：这是资源导航，不替代专业医疗、法律或投资建议。",
  ].join("\n");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

elements.profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.name = elements.userName.value.trim();
  state.location = elements.userLocation.value.trim();
  state.language = elements.userLanguage.value;
  render();
  showToast("已保存基本情况");
});

elements.backBtn.addEventListener("click", () => {
  const previous = historyStack.pop();
  if (!previous) return;
  currentNodeId = previous.nodeId;
  restoreState(previous.snapshot);
  render();
});

elements.skipBtn.addEventListener("click", () => {
  const node = nodes[currentNodeId];
  const unsure = node.options.find((option) => option.label.includes("不确定"));
  chooseOption(unsure || node.options[node.options.length - 1]);
});

elements.restartBtn.addEventListener("click", () => {
  resetState();
  currentNodeId = "goal";
  render();
  showToast("已重新开始");
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    activeTab = tab.dataset.tab;
    renderRecommendations();
  });
});

elements.copyPlanBtn.addEventListener("click", async () => {
  const text = planText();
  try {
    await navigator.clipboard.writeText(text);
    showToast("行动计划已复制");
  } catch {
    showToast("复制失败，可使用打印保存");
  }
});

elements.printBtn.addEventListener("click", () => {
  window.print();
});

elements.largeTextBtn.addEventListener("click", () => {
  const enabled = document.body.classList.toggle("large-text");
  elements.largeTextBtn.setAttribute("aria-pressed", String(enabled));
});

elements.contrastBtn.addEventListener("click", () => {
  const enabled = document.body.classList.toggle("high-contrast");
  elements.contrastBtn.setAttribute("aria-pressed", String(enabled));
});

elements.simpleBtn.addEventListener("click", () => {
  const enabled = elements.simpleBtn.getAttribute("aria-pressed") !== "true";
  elements.simpleBtn.setAttribute("aria-pressed", String(enabled));
  showToast(enabled ? "已使用简单语言" : "已关闭简单语言提示");
});

elements.readBtn.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) {
    showToast("当前浏览器不支持朗读");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(
    `${elements.questionTitle.textContent}。${elements.questionText.textContent}`,
  );
  utterance.lang = state.language === "en" ? "en-US" : "zh-CN";
  window.speechSynthesis.speak(utterance);
});

render();
