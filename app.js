const state = {
  uiLanguage: "en",
  name: "",
  location: "",
  language: "en",
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
};

let currentNodeId = "goal";
let historyStack = [];
let activeTab = "jobs";

const text = {
  en: {
    title: "OpportunityGuide | Accessible opportunity navigation",
    appTitle: "OpportunityGuide",
    subtitle:
      "A guided, accessible path to jobs, skills, mental health support, and money basics.",
    uiLanguage: "Interface language",
    accessibility: "Accessibility tools",
    largeText: "Large text",
    highContrast: "High contrast",
    readQuestion: "Read question",
    profileTitle: "Basic Profile",
    nameLabel: "Name, optional",
    namePlaceholder: "Example: Alex",
    locationLabel: "City or ZIP code",
    locationPlaceholder: "Example: Chicago or 60616",
    preferredLanguage: "Preferred language",
    saveStart: "Save and start",
    guideTitle: "Opportunity Navigator",
    guideText:
      "One question at a time. You can choose an option or say you are not sure. The system turns your situation into tasks you can do today.",
    currentProfile: "Current Profile",
    goal: "Goal",
    workFit: "Work fit",
    supportNeed: "Support needs",
    locationLanguage: "Location and language",
    waiting: "Waiting for choice",
    notProvided: "Not provided",
    restart: "Restart",
    back: "Back",
    unsureButton: "I am not sure. Help me choose.",
    whyTitle: "Why ask this?",
    dashboardTitle: "Your Next Step",
    todayTitle: "Do These Three Things Today",
    tabs: { jobs: "Jobs", skills: "Skills", support: "Support", career: "Career" },
    copyPlan: "Copy action plan",
    printPlan: "Print or save PDF",
    notice:
      "This is a resource navigation prototype. It does not provide medical, legal, or investment advice. If you may hurt yourself or are in crisis, call or text 988, or contact local emergency services.",
    reasonPrefix: "Why it fits you:",
    urgent: "Urgent first",
    copied: "Action plan copied",
    copyFailed: "Copy failed. You can print instead.",
    saved: "Basic profile saved",
    restarted: "Restarted",
    noSpeech: "This browser does not support reading aloud.",
    joiner: ", ",
    planTitle: "OpportunityGuide Action Plan",
    today: "Today:",
    recommendedJobs: "Recommended jobs:",
    recommendedCourses: "Recommended courses:",
    supportResources: "Support resources:",
    printableTitle: "Printable Action Plan",
    topLinks: "Most relevant links:",
    reminder:
      "Reminder: this is resource navigation, not professional medical, legal, or investment advice.",
    languages: { en: "English", es: "Spanish", zh: "Chinese" },
  },
  es: {
    title: "OpportunityGuide | Navegación accesible de oportunidades",
    appTitle: "OpportunityGuide",
    subtitle:
      "Una ruta guiada y accesible hacia empleos, habilidades, apoyo emocional y bases de dinero.",
    uiLanguage: "Idioma de la interfaz",
    accessibility: "Herramientas de accesibilidad",
    largeText: "Texto grande",
    highContrast: "Alto contraste",
    readQuestion: "Leer pregunta",
    profileTitle: "Perfil básico",
    nameLabel: "Nombre, opcional",
    namePlaceholder: "Ejemplo: Alex",
    locationLabel: "Ciudad o código postal",
    locationPlaceholder: "Ejemplo: Chicago o 60616",
    preferredLanguage: "Idioma preferido",
    saveStart: "Guardar y empezar",
    guideTitle: "Navegador de oportunidades",
    guideText:
      "Una pregunta a la vez. Puedes elegir una opción o decir que no estás seguro. El sistema convierte tu situación en tareas para hoy.",
    currentProfile: "Perfil actual",
    goal: "Meta",
    workFit: "Trabajo adecuado",
    supportNeed: "Necesidades de apoyo",
    locationLanguage: "Ubicación e idioma",
    waiting: "Esperando selección",
    notProvided: "No indicado",
    restart: "Reiniciar",
    back: "Atrás",
    unsureButton: "No estoy seguro. Ayúdame a elegir.",
    whyTitle: "¿Por qué preguntar esto?",
    dashboardTitle: "Tu próximo paso",
    todayTitle: "Haz estas tres cosas hoy",
    tabs: { jobs: "Trabajos", skills: "Habilidades", support: "Apoyo", career: "Carrera" },
    copyPlan: "Copiar plan de acción",
    printPlan: "Imprimir o guardar PDF",
    notice:
      "Este es un prototipo de navegación de recursos. No ofrece consejos médicos, legales ni de inversión. Si podrías hacerte daño o estás en crisis, llama o manda texto al 988, o contacta servicios de emergencia locales.",
    reasonPrefix: "Por qué te sirve:",
    urgent: "Urgente primero",
    copied: "Plan de acción copiado",
    copyFailed: "No se pudo copiar. Puedes imprimirlo.",
    saved: "Perfil básico guardado",
    restarted: "Reiniciado",
    noSpeech: "Este navegador no puede leer en voz alta.",
    joiner: ", ",
    planTitle: "Plan de acción de OpportunityGuide",
    today: "Hoy:",
    recommendedJobs: "Trabajos recomendados:",
    recommendedCourses: "Cursos recomendados:",
    supportResources: "Recursos de apoyo:",
    printableTitle: "Plan de acción imprimible",
    topLinks: "Enlaces más relevantes:",
    reminder:
      "Recordatorio: esto es navegación de recursos, no consejo médico, legal ni de inversión.",
    languages: { en: "Inglés", es: "Español", zh: "Chino" },
  },
  zh: {
    title: "向上路 | 无障碍机会导航",
    appTitle: "向上路",
    subtitle: "用选择式引导，帮助用户找到工作、技能、心理支持和基础理财的下一步。",
    uiLanguage: "界面语言",
    accessibility: "无障碍工具",
    largeText: "大字体",
    highContrast: "高对比",
    readQuestion: "朗读当前问题",
    profileTitle: "基本情况",
    nameLabel: "称呼，可跳过",
    namePlaceholder: "例如：Alex",
    locationLabel: "城市或邮编",
    locationPlaceholder: "例如：Chicago 或 60616",
    preferredLanguage: "偏好语言",
    saveStart: "保存并开始",
    guideTitle: "机会导航员",
    guideText:
      "每次只问一个问题。你可以点选，也可以说“不确定”。系统会把你的情况转成今天能做的任务。",
    currentProfile: "当前画像",
    goal: "目标",
    workFit: "工作适配",
    supportNeed: "支持需求",
    locationLanguage: "位置和语言",
    waiting: "等待选择",
    notProvided: "未填写",
    restart: "重新开始",
    back: "上一步",
    unsureButton: "我不确定，帮我判断",
    whyTitle: "为什么这样问？",
    dashboardTitle: "你的下一步",
    todayTitle: "今天先做这三件事",
    tabs: { jobs: "工作", skills: "技能", support: "支持", career: "求职" },
    copyPlan: "复制行动计划",
    printPlan: "打印或保存 PDF",
    notice:
      "这是资源导航原型，不提供医疗、法律或投资建议。若有自伤风险或心理危机，请立即拨打或短信 988，或联系当地紧急服务。",
    reasonPrefix: "为什么适合你：",
    urgent: "紧急优先",
    copied: "行动计划已复制",
    copyFailed: "复制失败，可使用打印保存",
    saved: "已保存基本情况",
    restarted: "已重新开始",
    noSpeech: "当前浏览器不支持朗读",
    joiner: "、",
    planTitle: "向上路行动计划",
    today: "今天先做：",
    recommendedJobs: "推荐工作：",
    recommendedCourses: "推荐课程：",
    supportResources: "支持资源：",
    printableTitle: "简洁行动计划",
    topLinks: "最相关链接：",
    reminder: "提醒：这是资源导航，不替代专业医疗、法律或投资建议。",
    languages: { en: "英语", es: "西班牙语", zh: "中文" },
  },
};

const valueLabels = {
  goals: {
    job: { en: "Find work", es: "Encontrar trabajo", zh: "找工作" },
    skill: { en: "Learn skills", es: "Aprender habilidades", zh: "学技能" },
    mental: { en: "Mental health support", es: "Apoyo emocional", zh: "心理支持" },
    finance: { en: "Money basics", es: "Bases de dinero", zh: "理财基础" },
    unsure: { en: "Needs guidance", es: "Necesita orientación", zh: "需要系统判断" },
  },
  interests: {
    hands: { en: "Hands-on work", es: "Trabajo manual", zh: "动手技能" },
    onsite: { en: "On-site work", es: "Trabajo presencial", zh: "现场工作" },
    service: { en: "Service work", es: "Servicio al cliente", zh: "服务沟通" },
    computer: { en: "Computer or phone", es: "Computadora o teléfono", zh: "电脑/远程" },
    remote: { en: "Remote work", es: "Trabajo remoto", zh: "远程" },
    care: { en: "Care work", es: "Trabajo de cuidado", zh: "照护" },
  },
  bodyNeeds: {
    sit_or_remote: { en: "Sitting or remote", es: "Sentado o remoto", zh: "坐着或远程" },
    low_physical: { en: "Lower physical demand", es: "Menos esfuerzo físico", zh: "低体力" },
    no_heavy_lifting: { en: "No heavy lifting", es: "Sin cargar peso", zh: "不能搬重物" },
    can_stand: { en: "Can stand/walk", es: "Puede estar de pie/caminar", zh: "可站立" },
    flexible_time: { en: "Flexible time", es: "Horario flexible", zh: "灵活时间" },
    disability_accommodation: { en: "Disability accommodation", es: "Adaptación por discapacidad", zh: "残障适配" },
  },
  barriers: {
    no_experience: { en: "No experience", es: "Sin experiencia", zh: "没有经验" },
    low_literacy: { en: "Low education or reading difficulty", es: "Baja educación o dificultad de lectura", zh: "低学历或阅读困难" },
    limited_english: { en: "Limited English", es: "Inglés limitado", zh: "英语有限" },
    no_computer: { en: "No computer", es: "Sin computadora", zh: "缺少电脑" },
    transport: { en: "Transportation barrier", es: "Problema de transporte", zh: "交通困难" },
  },
  supportNeeds: {
    resume: { en: "Resume", es: "Currículum", zh: "简历" },
    interview: { en: "Interview", es: "Entrevista", zh: "面试" },
    mental_support: { en: "Mental health support", es: "Apoyo emocional", zh: "心理支持" },
    mental_crisis: { en: "Crisis support", es: "Apoyo de crisis", zh: "危机支持" },
    finance: { en: "Money basics", es: "Bases de dinero", zh: "理财基础" },
  },
};

const nodes = {
  goal: {
    step: "Step 2",
    title: {
      en: "What help do you need most right now?",
      es: "¿Qué ayuda necesitas más ahora?",
      zh: "你现在最需要什么帮助？",
    },
    text: {
      en: "You do not need to know the category. Choose the closest situation, and we will turn it into a clear next step.",
      es: "No necesitas saber la categoría. Elige la situación más cercana y la convertiremos en un próximo paso claro.",
      zh: "不用知道专业分类。先选你最接近的情况，我们会把它变成清楚的下一步。",
    },
    why: {
      en: "Many people are not lacking effort; they are missing a starting point.",
      es: "A muchas personas no les falta esfuerzo; les falta un punto de partida.",
      zh: "很多人不是没有努力，而是不知道从哪里开始。",
    },
    options: [
      opt("findJob", "incomeTiming", { goals: ["job"] }, {
        en: ["I need a job soon", "Income first, ideally with training provided."],
        es: ["Necesito trabajo pronto", "Primero ingresos, idealmente con capacitación."],
        zh: ["我想尽快找工作", "需要收入，最好是低门槛、可培训上岗。"],
      }),
      opt("learnSkill", "skillPreference", { goals: ["skill"] }, {
        en: ["I want to learn a skill", "Computer basics, auto repair, carpentry, care, or customer service."],
        es: ["Quiero aprender una habilidad", "Computación básica, mecánica, carpintería, cuidado o atención al cliente."],
        zh: ["我想学一个能赚钱的技能", "比如基础电脑、汽修、木工、护理、客服。"],
      }),
      opt("mentalHelp", "safety", { goals: ["mental"] }, {
        en: ["I feel stressed or overwhelmed", "Find free hotlines or community support."],
        es: ["Me siento estresado o abrumado", "Buscar líneas gratuitas o apoyo comunitario."],
        zh: ["我最近压力很大", "想找免费心理支持、热线或社区资源。"],
      }),
      opt("moneyHelp", "financeFocus", { goals: ["finance"] }, {
        en: ["I want help with money basics", "Budgeting, saving, credit, and avoiding debt traps."],
        es: ["Quiero ayuda con dinero básico", "Presupuesto, ahorro, crédito y evitar deudas dañinas."],
        zh: ["我想学怎么管钱", "预算、储蓄、信用分、避免高利贷。"],
      }),
      opt("unsure", "incomeTiming", { goals: ["unsure"] }, {
        en: ["I am not sure", "Ask me simple questions and help me decide."],
        es: ["No estoy seguro", "Hazme preguntas simples y ayúdame a decidir."],
        zh: ["我不知道，帮我判断", "系统会用几个简单问题帮你分辨。"],
      }, true),
    ],
  },
  incomeTiming: {
    step: "Step 3",
    title: { en: "How soon do you need income?", es: "¿Qué tan pronto necesitas ingresos?", zh: "你多久内需要有收入？" },
    text: {
      en: "This decides whether we should focus on quick-start jobs or short training first.",
      es: "Esto decide si enfocarnos en trabajos rápidos o en capacitación corta primero.",
      zh: "这个答案会影响推荐：先看快速上岗岗位，还是先学短期技能。",
    },
    why: {
      en: "Urgency matters. A realistic plan should respect money, transportation, body needs, and stress.",
      es: "La urgencia importa. Un plan realista debe considerar dinero, transporte, cuerpo y estrés.",
      zh: "先判断紧急度，能避免推荐太理想化。",
    },
    options: [
      opt("now", "workPreference", { incomeTiming: "now", goals: ["job"] }, {
        en: ["As soon as possible", "I want to apply today or this week."],
        es: ["Lo antes posible", "Quiero postular hoy o esta semana."],
        zh: ["越快越好", "今天或这周就想申请工作。"],
      }),
      opt("soon", "skillPreference", { incomeTiming: "soon", goals: ["skill"] }, {
        en: ["Within one or two months", "I can learn a little before applying."],
        es: ["En uno o dos meses", "Puedo aprender un poco antes de postular."],
        zh: ["一两个月内", "可以先学一点技能再找工作。"],
      }),
      opt("growth", "skillPreference", { incomeTiming: "growth", goals: ["skill", "finance"] }, {
        en: ["Not urgent. I want long-term growth", "Build a steadier path."],
        es: ["No es urgente. Quiero crecer a largo plazo", "Construir una ruta más estable."],
        zh: ["不急，想长期变好", "更适合成长计划和稳定训练。"],
      }),
      opt("incomeUnsure", "workPreference", { incomeTiming: "unsure" }, {
        en: ["I am not sure", "Use a balanced route for now."],
        es: ["No estoy seguro", "Usa una ruta equilibrada por ahora."],
        zh: ["我不确定", "先按稳妥路线推荐。"],
      }, true),
    ],
  },
  skillPreference: {
    step: "Step 3",
    title: { en: "What kind of skill feels most realistic?", es: "¿Qué tipo de habilidad parece más realista?", zh: "你更想从哪种技能开始？" },
    text: {
      en: "Upward mobility does not only mean learning to code. Hands-on, service, care, and computer skills all count.",
      es: "Mejorar no significa solo aprender programación. También cuentan habilidades manuales, de servicio, cuidado y computación.",
      zh: "这里不假设所有人都要学编程。动手、服务、照护和电脑技能都可以是向上路径。",
    },
    why: {
      en: "The best skill is one that can realistically connect to income.",
      es: "La mejor habilidad es la que puede conectarse de forma realista con ingresos.",
      zh: "低学历用户需要的是能转成收入的技能。",
    },
    options: [
      opt("hands", "bodyFit", { skillChoice: "hands", interests: ["hands"] }, {
        en: ["Working with my hands", "Auto repair, carpentry, maintenance, warehouse, landscaping."],
        es: ["Trabajar con las manos", "Mecánica, carpintería, mantenimiento, almacén, jardinería."],
        zh: ["动手做东西", "汽修、木工、维修、仓储、园艺。"],
      }),
      opt("care", "bodyFit", { skillChoice: "care", interests: ["care"] }, {
        en: ["Taking care of people", "Caregiver, home care, childcare, nursing assistant."],
        es: ["Cuidar personas", "Cuidador, cuidado en casa, niñez, asistente de enfermería."],
        zh: ["照顾别人", "陪护、家政、托儿、护理助理。"],
      }),
      opt("computer", "bodyFit", { skillChoice: "computer", interests: ["computer"] }, {
        en: ["Using a computer or phone", "Data entry, customer support, document processing."],
        es: ["Usar computadora o teléfono", "Entrada de datos, atención al cliente, documentos."],
        zh: ["用电脑或手机", "数据录入、客服、基础电脑、文档整理。"],
      }),
      opt("service", "bodyFit", { skillChoice: "service", interests: ["service"] }, {
        en: ["Talking with people", "Cashier, front desk, customer service, food service."],
        es: ["Hablar con personas", "Cajero, recepción, atención al cliente, comida."],
        zh: ["和人沟通", "收银、前台、客服、餐饮服务。"],
      }),
      opt("skillUnsure", "bodyFit", { skillChoice: "unsure" }, {
        en: ["I am not sure", "Recommend based on body needs and equipment."],
        es: ["No estoy seguro", "Recomienda según cuerpo y equipo disponible."],
        zh: ["我不确定", "先根据身体情况和设备情况推荐。"],
      }, true),
    ],
  },
  workPreference: {
    step: "Step 4",
    title: { en: "What kind of work fits you best?", es: "¿Qué tipo de trabajo te queda mejor?", zh: "什么样的工作更适合你？" },
    text: {
      en: "You do not need a job title yet. Choose the work style you can accept.",
      es: "Aún no necesitas un título de trabajo. Elige el estilo que puedes aceptar.",
      zh: "不用想职业名称。选你比较能接受的工作方式。",
    },
    why: {
      en: "Entry-level jobs differ by physical demand, transportation, communication, and training.",
      es: "Los trabajos de entrada varían por esfuerzo físico, transporte, comunicación y capacitación.",
      zh: "很多低门槛岗位的区别在体力、交通、沟通和能不能培训上岗。",
    },
    options: [
      opt("onsiteHands", "bodyFit", { interests: ["hands", "onsite"] }, {
        en: ["Hands-on on-site work", "Cleaning, warehouse, auto shop helper, carpenter helper."],
        es: ["Trabajo manual presencial", "Limpieza, almacén, ayudante de mecánica o carpintería."],
        zh: ["动手现场工作", "清洁、仓储、汽修助手、木工助手。"],
      }),
      opt("serviceWork", "bodyFit", { interests: ["service"] }, {
        en: ["Serving or helping people", "Cashier, busser, front desk, caregiver, food service."],
        es: ["Servir o ayudar a personas", "Cajero, mesero auxiliar, recepción, cuidador, comida."],
        zh: ["服务别人", "收银、端盘子、前台、陪护、餐饮。"],
      }),
      opt("remoteWork", "barriers", { interests: ["computer", "remote"], bodyNeeds: ["sit_or_remote", "low_physical"] }, {
        en: ["Sitting or remote work", "Data entry, online support, document processing."],
        es: ["Trabajo sentado o remoto", "Entrada de datos, soporte en línea, documentos."],
        zh: ["坐着或远程工作", "数据录入、在线客服、文档整理。"],
      }),
      opt("trainingNeeded", "bodyFit", { barriers: ["no_experience"] }, {
        en: ["I need training provided", "Start as a helper, trainee, or entry-level worker."],
        es: ["Necesito capacitación", "Empezar como ayudante, aprendiz o nivel inicial."],
        zh: ["需要培训上岗", "没有经验也可以从助手或 trainee 开始。"],
      }),
      opt("workUnsure", "bodyFit", {}, {
        en: ["I am not sure", "Ask about body and transportation next."],
        es: ["No estoy seguro", "Pregunta sobre cuerpo y transporte después."],
        zh: ["我不确定", "继续问身体和交通情况。"],
      }, true),
    ],
  },
  bodyFit: {
    step: "Step 5",
    title: { en: "What body or access needs matter?", es: "¿Qué necesidades físicas o de acceso importan?", zh: "身体和环境需要什么照顾？" },
    text: {
      en: "This is not a limit. It helps avoid bad matches and find realistic opportunities.",
      es: "Esto no es una limitación. Ayuda a evitar malas opciones y encontrar oportunidades realistas.",
      zh: "这不是限制你，而是帮系统避开不合适的岗位，推荐更现实的机会。",
    },
    why: {
      en: "For disabled users, sitting, remote work, lifting, and schedule flexibility matter more than job titles.",
      es: "Para usuarios con discapacidad, sentarse, trabajar remoto, cargar peso y horarios importan más que títulos.",
      zh: "对残障人士来说，是否可坐着、远程、不能搬重物，比岗位标题更重要。",
    },
    options: [
      opt("sitRemote", "barriers", { bodyNeeds: ["sit_or_remote", "low_physical"] }, {
        en: ["I need sitting or remote work", "Good for mobility limits, chronic illness, or transportation barriers."],
        es: ["Necesito trabajo sentado o remoto", "Útil para movilidad limitada, enfermedad crónica o transporte."],
        zh: ["需要坐着或远程", "行动不便、慢性病、交通困难都可以选。"],
      }),
      opt("noHeavy", "barriers", { bodyNeeds: ["no_heavy_lifting", "low_physical"] }, {
        en: ["I cannot lift heavy things", "Avoid heavy warehouse or construction tasks."],
        es: ["No puedo cargar cosas pesadas", "Evitar almacén pesado o construcción."],
        zh: ["不能搬重物", "避开仓库重体力、建筑搬运等岗位。"],
      }),
      opt("canStand", "barriers", { bodyNeeds: ["can_stand"] }, {
        en: ["I can stand and walk", "Cleaning, cashier, food service, and care work may fit."],
        es: ["Puedo estar de pie y caminar", "Limpieza, caja, comida y cuidado pueden servir."],
        zh: ["可以站立和走动", "可考虑清洁、收银、餐饮、护理等。"],
      }),
      opt("flexible", "barriers", { bodyNeeds: ["flexible_time"] }, {
        en: ["I need flexible time", "For care duties, treatment, school, or unstable transportation."],
        es: ["Necesito horario flexible", "Por cuidados, tratamiento, escuela o transporte inestable."],
        zh: ["需要灵活时间", "照护家人、治疗、上课或交通不稳定。"],
      }),
      opt("accommodation", "barriers", { bodyNeeds: ["disability_accommodation", "low_physical"] }, {
        en: ["I need disability accommodation", "Prioritize disability-friendly and accommodation-aware options."],
        es: ["Necesito adaptación por discapacidad", "Priorizar opciones amigables con adaptaciones."],
        zh: ["我有残障适配需求", "优先推荐残障友好、可申请 accommodation 的机会。"],
      }),
    ],
  },
  barriers: {
    step: "Step 6",
    title: { en: "What is the biggest barrier right now?", es: "¿Cuál es la barrera más grande ahora?", zh: "现在最大的阻碍是什么？" },
    text: {
      en: "Pick the one that affects you most. We will use it in the recommendation reasons.",
      es: "Elige la que más te afecta. La usaremos para explicar recomendaciones.",
      zh: "选一个最影响你的问题。系统会把它放进推荐理由里。",
    },
    why: {
      en: "People need to know why an option fits and what gap to fix first.",
      es: "La persona necesita saber por qué una opción sirve y qué falta resolver primero.",
      zh: "用户需要知道为什么这个机会适合自己，以及先补哪块短板。",
    },
    options: [
      opt("noExperience", "supportNeeds", { barriers: ["no_experience"] }, {
        en: ["I do not have experience", "Look for training-provided or helper roles."],
        es: ["No tengo experiencia", "Buscar trabajos con capacitación o de ayudante."],
        zh: ["没有经验", "需要 training-provided 或助手岗位。"],
      }),
      opt("lowLiteracy", "supportNeeds", { barriers: ["low_literacy"] }, {
        en: ["Low education or reading is hard", "Use plain language and short courses."],
        es: ["Baja educación o leer es difícil", "Usar lenguaje simple y cursos cortos."],
        zh: ["学历不高或阅读困难", "需要简单语言和短课程。"],
      }),
      opt("limitedEnglish", "supportNeeds", { barriers: ["limited_english"] }, {
        en: ["My English is limited", "Use bilingual resources or lower-communication roles."],
        es: ["Mi inglés es limitado", "Usar recursos bilingües o trabajos con menos comunicación."],
        zh: ["英语不够好", "需要双语资源或低沟通岗位。"],
      }),
      opt("noComputer", "supportNeeds", { barriers: ["no_computer"] }, {
        en: ["No computer or unstable internet", "Prioritize phone-friendly or local resources."],
        es: ["Sin computadora o internet inestable", "Priorizar recursos por teléfono o locales."],
        zh: ["没有电脑或网络不稳定", "优先推荐手机可用、线下资源或图书馆资源。"],
      }),
      opt("transport", "supportNeeds", { barriers: ["transport"] }, {
        en: ["Transportation is hard", "Prioritize remote, nearby, or transit-accessible options."],
        es: ["El transporte es difícil", "Priorizar remoto, cercano o con transporte público."],
        zh: ["交通不方便", "优先看远程、附近、公交可达机会。"],
      }),
    ],
  },
  safety: {
    step: "Step 3",
    title: { en: "Are you safe right now?", es: "¿Estás seguro ahora?", zh: "你现在安全吗？" },
    text: {
      en: "If you may hurt yourself or feel in immediate danger, contact emergency support first.",
      es: "Si podrías hacerte daño o estás en peligro inmediato, contacta apoyo de emergencia primero.",
      zh: "如果你有自伤风险或觉得自己可能伤害自己，请优先联系紧急支持。",
    },
    why: {
      en: "A resource platform cannot replace crisis support.",
      es: "Una plataforma de recursos no reemplaza apoyo de crisis.",
      zh: "心理支持不能被普通推荐替代。高风险情况必须先给危机资源。",
    },
    options: [
      opt("crisis", "supportNeeds", { safetyLevel: "crisis", supportNeeds: ["mental_crisis"] }, {
        en: ["I may be in danger or hurt myself", "Show 988 and emergency support first."],
        es: ["Podría estar en peligro o hacerme daño", "Mostrar 988 y apoyo urgente primero."],
        zh: ["我现在有危险或可能伤害自己", "优先显示 988 和紧急支持。"],
      }),
      opt("stressed", "supportNeeds", { safetyLevel: "stressed", supportNeeds: ["mental_support"] }, {
        en: ["I am stressed, but safe right now", "Recommend hotlines, community support, and stress resources."],
        es: ["Estoy estresado, pero seguro ahora", "Recomendar líneas, apoyo comunitario y recursos de estrés."],
        zh: ["我压力很大，但现在安全", "推荐免费热线、社区心理资源和压力管理课程。"],
      }),
      opt("longTerm", "supportNeeds", { safetyLevel: "long_term", supportNeeds: ["mental_support"] }, {
        en: ["I want longer-term support", "Find free or low-cost mental health resources."],
        es: ["Quiero apoyo a largo plazo", "Buscar recursos gratuitos o de bajo costo."],
        zh: ["我想找长期支持", "推荐免费或低成本心理健康导航链接。"],
      }),
      opt("safetyUnsure", "supportNeeds", { safetyLevel: "unsure", supportNeeds: ["mental_support"] }, {
        en: ["I am not sure", "Show safety reminders and low-barrier support."],
        es: ["No estoy seguro", "Mostrar recordatorios de seguridad y apoyo fácil."],
        zh: ["我不确定", "先给安全提醒和低门槛资源。"],
      }, true),
    ],
  },
  financeFocus: {
    step: "Step 3",
    title: { en: "What money topic should come first?", es: "¿Qué tema de dinero va primero?", zh: "你最想先学哪件钱的事？" },
    text: {
      en: "This is not investment advice. We focus on basic, lower-risk learning.",
      es: "Esto no es consejo de inversión. Nos enfocamos en aprendizaje básico y de bajo riesgo.",
      zh: "这里不做投资建议，只推荐基础、低风险的免费学习资源。",
    },
    why: {
      en: "For low-income users, budgeting, saving, credit, and avoiding scams usually come first.",
      es: "Para usuarios de bajos ingresos, presupuesto, ahorro, crédito y evitar estafas van primero.",
      zh: "对低收入用户，最先有用的是预算、储蓄、信用、避坑。",
    },
    options: [
      opt("budget", "bodyFit", { financeFocus: "budget", supportNeeds: ["finance"] }, {
        en: ["How to budget", "See where money goes and stabilize weekly costs."],
        es: ["Cómo hacer presupuesto", "Ver dónde va el dinero y estabilizar gastos."],
        zh: ["怎么做预算", "知道钱花到哪里，先稳住每周开销。"],
      }),
      opt("saving", "bodyFit", { financeFocus: "saving", supportNeeds: ["finance"] }, {
        en: ["How to start saving", "Begin with a small emergency fund."],
        es: ["Cómo empezar a ahorrar", "Empezar con un fondo pequeño de emergencia."],
        zh: ["怎么开始储蓄", "从小额紧急备用金开始。"],
      }),
      opt("credit", "bodyFit", { financeFocus: "credit", supportNeeds: ["finance"] }, {
        en: ["Credit and bank accounts", "Understand credit scores, accounts, and fees."],
        es: ["Crédito y cuentas bancarias", "Entender puntaje, cuentas y cargos."],
        zh: ["信用分和银行账户", "理解信用分、银行账户和费用。"],
      }),
      opt("avoidDebt", "bodyFit", { financeFocus: "avoid_debt", supportNeeds: ["finance"] }, {
        en: ["Avoid debt and scams", "Recognize payday loans, fees, and fake jobs."],
        es: ["Evitar deudas y estafas", "Reconocer préstamos caros, cargos y trabajos falsos."],
        zh: ["避免债务和诈骗", "识别高利贷、收费陷阱、虚假招聘。"],
      }),
      opt("financeUnsure", "bodyFit", { financeFocus: "basics", supportNeeds: ["finance"] }, {
        en: ["I am not sure", "Start with money basics."],
        es: ["No estoy seguro", "Empezar con bases de dinero."],
        zh: ["我不确定", "先给基础理财入门。"],
      }, true),
    ],
  },
  supportNeeds: {
    step: "Step 7",
    title: { en: "What other help would be useful?", es: "¿Qué otra ayuda sería útil?", zh: "除了推荐机会，你还需要哪种帮助？" },
    text: {
      en: "Pick the most important one. The final plan will include it in today's tasks.",
      es: "Elige la más importante. El plan final la incluirá en las tareas de hoy.",
      zh: "可以选最重要的一项。最后计划会把这项放在今天任务里。",
    },
    why: {
      en: "A useful path connects jobs, learning, support, and career actions.",
      es: "Una ruta útil conecta trabajos, aprendizaje, apoyo y acciones laborales.",
      zh: "机会导航要把工作、课程、支持和求职动作连成一个闭环。",
    },
    options: [
      opt("resume", "finalCheck", { supportNeeds: ["resume"] }, {
        en: ["Help me make a resume", "For people without experience or who do not know what to write."],
        es: ["Ayúdame con un currículum", "Para personas sin experiencia o que no saben qué escribir."],
        zh: ["帮我做简历", "适合没有经验或不知道怎么写的人。"],
      }),
      opt("interview", "finalCheck", { supportNeeds: ["interview"] }, {
        en: ["Help me practice interviews", "Practice a simple introduction."],
        es: ["Ayúdame a practicar entrevistas", "Practicar una presentación simple."],
        zh: ["帮我练面试", "用简单问题练习自我介绍。"],
      }),
      opt("mentalLink", "finalCheck", { supportNeeds: ["mental_support"] }, {
        en: ["Mental health support links", "Free hotlines, community resources, stress support."],
        es: ["Enlaces de apoyo emocional", "Líneas gratis, comunidad, apoyo para estrés."],
        zh: ["心理支持链接", "免费热线、社区资源、压力管理。"],
      }),
      opt("financeCourse", "finalCheck", { supportNeeds: ["finance"] }, {
        en: ["Money basics course", "Budgeting, saving, credit, and avoiding scams."],
        es: ["Curso básico de dinero", "Presupuesto, ahorro, crédito y evitar estafas."],
        zh: ["基础理财课程", "预算、储蓄、信用、避坑。"],
      }),
      opt("simplePlan", "finalCheck", {}, {
        en: ["Give me the simplest plan", "Balance jobs, skills, and support."],
        es: ["Dame el plan más simple", "Equilibrar trabajos, habilidades y apoyo."],
        zh: ["先给我最简单的计划", "系统自动平衡工作、课程和支持。"],
      }),
    ],
  },
  finalCheck: {
    step: "Step 8",
    title: { en: "What should this plan prioritize?", es: "¿Qué debe priorizar este plan?", zh: "这份计划先偏向什么？" },
    text: {
      en: "Last step. Your dashboard will become a clearer action path.",
      es: "Último paso. Tu panel se convertirá en una ruta clara.",
      zh: "最后一步。选择后，右侧会生成更清晰的行动路线。",
    },
    why: {
      en: "One person may need income, skills, and support at the same time. Priority makes it doable.",
      es: "Una persona puede necesitar ingresos, habilidades y apoyo a la vez. Priorizar lo hace posible.",
      zh: "同一个人可能同时需要收入、技能和支持。优先级能让计划更容易执行。",
    },
    options: [
      opt("jobsFirst", "done", { planBias: "jobs", goals: ["job"] }, {
        en: ["Jobs first", "Recommend quick-start jobs and application steps."],
        es: ["Trabajos primero", "Recomendar trabajos rápidos y pasos para postular."],
        zh: ["先找工作", "推荐快速上岗岗位和申请动作。"],
      }),
      opt("skillsFirst", "done", { planBias: "skills", goals: ["skill"] }, {
        en: ["Skills first", "Recommend short courses and connected jobs."],
        es: ["Habilidades primero", "Recomendar cursos cortos y trabajos conectados."],
        zh: ["先学技能", "推荐短课和对应岗位。"],
      }),
      opt("supportFirst", "done", { planBias: "support", supportNeeds: ["mental_support"] }, {
        en: ["Stability first", "Support resources and lower-pressure tasks."],
        es: ["Estabilidad primero", "Recursos de apoyo y tareas con menos presión."],
        zh: ["先稳住状态", "心理支持、低压力任务、简单课程。"],
      }),
      opt("balanced", "done", { planBias: "balanced" }, {
        en: ["Balanced plan", "One job step, one skill step, one support step."],
        es: ["Plan equilibrado", "Un paso de trabajo, habilidad y apoyo."],
        zh: ["平衡安排", "今天工作、技能、支持各一步。"],
      }),
    ],
  },
  done: {
    step: "Done",
    title: { en: "Your opportunity path is ready", es: "Tu ruta de oportunidades está lista", zh: "你的机会路径已经生成" },
    text: {
      en: "Your dashboard now shows jobs, skills, support, and career actions based on your choices.",
      es: "Tu panel muestra trabajos, habilidades, apoyo y acciones laborales según tus respuestas.",
      zh: "右侧是根据你刚才的选择生成的工作、技能、支持和求职计划。",
    },
    why: {
      en: "This prototype proves the core experience: users choose simple options and receive a usable path.",
      es: "Este prototipo demuestra la experiencia clave: opciones simples que llevan a una ruta útil.",
      zh: "这个原型证明了核心体验：用户不需要自己搜索，一步步选择后就能得到可执行路径。",
    },
    options: [
      opt("reviseJobs", "workPreference", {}, {
        en: ["Improve job recommendations", "Go back to work style."],
        es: ["Mejorar trabajos recomendados", "Volver al estilo de trabajo."],
        zh: ["再优化工作推荐", "回到工作方式问题。"],
      }),
      opt("reviseSkills", "skillPreference", {}, {
        en: ["Improve skill recommendations", "Go back to skill choice."],
        es: ["Mejorar habilidades recomendadas", "Volver a habilidades."],
        zh: ["再优化技能推荐", "回到技能偏好问题。"],
      }),
      opt("reset", "goal", { reset: true }, {
        en: ["Start over", "Clear current choices."],
        es: ["Empezar de nuevo", "Borrar respuestas actuales."],
        zh: ["重新开始", "清空当前选择。"],
      }),
    ],
  },
};

const jobCatalog = [
  item(["remote", "sitting", "computer", "training", "low_physical", "entry"], "company", "https://www.indeed.com/jobs", {
    en: ["Remote customer support or chat support", "Good for users who can use a phone or computer and need seated or remote work. Many roles provide scripts and training.", "Open matched customer support jobs"],
    es: ["Soporte al cliente remoto o por chat", "Útil si puedes usar teléfono o computadora y necesitas trabajo sentado o remoto. Muchos puestos dan guiones y capacitación.", "Abrir trabajos de soporte relacionados"],
    zh: ["远程客服或在线聊天客服", "适合能用电脑或手机、需要坐着或远程工作的人。很多岗位提供话术培训。", "打开匹配的客服岗位"],
  }, { provider: "indeed", query: "entry level remote customer support OR chat support" }),
  item(["remote", "sitting", "computer", "low_physical", "entry"], "company", "https://www.indeed.com/jobs", {
    en: ["Data entry or document processing", "Good for quiet work, mobility limits, and basic computer users. Watch out for fake job scams.", "Open matched data entry jobs"],
    es: ["Entrada de datos o procesamiento de documentos", "Bueno para trabajo tranquilo, movilidad limitada y computación básica. Cuidado con empleos falsos.", "Abrir trabajos de entrada de datos"],
    zh: ["数据录入或文档整理", "适合行动受限、喜欢安静任务、基础电脑可用的人。需要注意识别虚假招聘。", "打开匹配的数据录入岗位"],
  }, { provider: "indeed", query: "entry level data entry document processing" }),
  item(["onsite", "service", "training", "can_stand", "entry"], "local", "https://www.indeed.com/jobs", {
    en: ["Cashier or stock clerk", "Often does not require a degree. Ask whether seated work or schedule adjustments are possible.", "Open matched cashier and stock jobs"],
    es: ["Cajero o repositor", "Normalmente no requiere título. Pregunta si se puede trabajar sentado o ajustar horario.", "Abrir trabajos de caja y reposición"],
    zh: ["超市收银员或货架补货员", "不要求高学历，很多店可培训。收银岗位可询问是否能坐着工作或调整班次。", "打开匹配的收银/补货岗位"],
  }, { provider: "indeed", query: "entry level cashier stock clerk" }),
  item(["onsite", "hands", "fast_income", "physical", "can_stand"], "local", "https://www.goodwill.org/job-training-and-placement-services/", {
    en: ["Cleaner or hotel housekeeper", "Fast to start, but usually physically demanding. Best if standing and walking are okay.", "View Goodwill job training"],
    es: ["Limpieza u hotel housekeeping", "Rápido para empezar, pero suele requerir esfuerzo físico. Mejor si puedes estar de pie.", "Ver capacitación de Goodwill"],
    zh: ["清洁工或酒店客房清洁", "通常入门快，但体力要求较高。适合能站立、走动、希望尽快有收入的人。", "查看 Goodwill 就业训练"],
  }),
  item(["onsite", "service", "fast_income", "can_stand", "entry"], "local", "https://www.indeed.com/jobs", {
    en: ["Restaurant helper, dishwasher, or busser", "Low barrier and quick training. Good for service work and fast income.", "Open matched restaurant helper jobs"],
    es: ["Ayudante de restaurante, lavaplatos o auxiliar", "Barrera baja y capacitación rápida. Bueno para servicio e ingresos rápidos.", "Abrir trabajos de restaurante relacionados"],
    zh: ["餐厅帮工、洗碗工或端盘助手", "低门槛、培训快。适合能站立、愿意做服务类现场工作的人。", "打开匹配的餐饮岗位"],
  }, { provider: "indeed", query: "entry level restaurant helper dishwasher busser" }),
  item(["onsite", "hands", "fast_income", "physical", "can_stand"], "company", "https://www.indeed.com/jobs", {
    en: ["Warehouse picker, packer, or package handler", "Many openings, but may require lifting and standing. Best if physical work is okay.", "Open matched warehouse jobs"],
    es: ["Almacén: picking, empaque o paquetes", "Hay muchas vacantes, pero puede requerir cargar y estar de pie.", "Abrir trabajos de almacén relacionados"],
    zh: ["仓库拣货、包装或快递分拣", "入门机会多，但可能需要搬重物和长时间站立。适合体力允许、想快速上岗的人。", "打开匹配的仓库岗位"],
  }, { provider: "indeed", query: "entry level warehouse picker packer package handler" }),
  item(["onsite", "hands", "training", "can_stand", "growth"], "local", "https://www.indeed.com/jobs", {
    en: ["Auto shop helper", "Good for hands-on learners who can start with tools, cleaning, and basic maintenance tasks.", "Open matched auto shop helper jobs"],
    es: ["Ayudante en taller mecánico", "Bueno para aprender con las manos empezando con herramientas, limpieza y mantenimiento básico.", "Abrir trabajos de ayudante mecánico"],
    zh: ["汽修店助手", "适合喜欢动手、有交通条件、愿意从清洁工具、递工具、基础维护做起的人。", "打开匹配的汽修助手岗位"],
  }, { provider: "indeed", query: "entry level auto shop helper automotive assistant" }),
  item(["onsite", "hands", "training", "physical", "growth"], "local", "https://www.indeed.com/jobs", {
    en: ["Carpentry or maintenance helper", "A path toward a trade. Start with safety, measuring, and helper roles.", "Open matched carpentry or maintenance jobs"],
    es: ["Ayudante de carpintería o mantenimiento", "Ruta hacia un oficio. Empieza con seguridad, medición y ayudante.", "Abrir trabajos de carpintería o mantenimiento"],
    zh: ["木工或维修助手", "适合想学手艺的人。通常从助手做起，体力要求中高，安全培训很重要。", "打开匹配的木工/维修岗位"],
  }, { provider: "indeed", query: "entry level carpenter helper maintenance helper" }),
  item(["care", "service", "training", "can_stand", "entry"], "company", "https://www.indeed.com/jobs", {
    en: ["Caregiver, home care, or childcare assistant", "Good for people with care experience. Some roles need background checks or short training.", "Open matched care jobs"],
    es: ["Cuidador, cuidado en casa o asistente infantil", "Bueno si tienes experiencia cuidando. Algunos requieren verificación o capacitación corta.", "Abrir trabajos de cuidado relacionados"],
    zh: ["陪护、家政或托儿助理", "适合有照顾经验、喜欢帮助别人、能沟通的人。部分岗位需要背景检查或短培训。", "打开匹配的照护岗位"],
  }, { provider: "indeed", query: "entry level caregiver home care childcare assistant" }),
  item(["disability_accommodation", "low_physical", "support", "training"], "local", "https://choosework.ssa.gov/", {
    en: ["Disability-friendly employment support", "For users who need accommodations, flexible work, or support around disability benefits.", "View Ticket to Work"],
    es: ["Apoyo laboral para discapacidad", "Para quienes necesitan adaptaciones, flexibilidad o apoyo con beneficios.", "Ver Ticket to Work"],
    zh: ["残障友好就业项目", "适合需要 accommodation、灵活安排或残障就业支持的人。", "查看 Ticket to Work"],
  }),
];

const skillCatalog = [
  item(["computer", "low_literacy", "remote", "entry"], "", "https://edu.gcfglobal.org/en/basic-computer-skills/", {
    en: ["Basic computer and phone skills", "Keyboard, email, documents, files, and simple workplace tools.", "GCFGlobal basic computer skills"],
    es: ["Computadora y teléfono básico", "Teclado, correo, documentos, archivos y herramientas simples.", "Computación básica de GCFGlobal"],
    zh: ["基础电脑和手机办公", "学习键盘、邮箱、表格、文件管理。适合数据录入、客服、前台。", "GCFGlobal 基础电脑课"],
  }),
  item(["service", "computer", "interview", "entry"], "", "https://edu.gcfglobal.org/en/workplacebasics/", {
    en: ["Customer service basics", "Practice polite replies, handling complaints, and simple workplace communication.", "GCFGlobal workplace basics"],
    es: ["Bases de atención al cliente", "Practicar respuestas amables, quejas y comunicación laboral simple.", "Bases laborales de GCFGlobal"],
    zh: ["客服沟通入门", "练习礼貌表达、处理投诉、写简单回复。适合远程客服、收银、前台。", "GCFGlobal 职场基础"],
  }),
  item(["hands", "growth", "onsite"], "", "https://www.careeronestop.org/Toolkit/Careers/careers.aspx", {
    en: ["Auto repair basics", "Learn tools, safety, and basic maintenance before looking for helper roles.", "Explore auto repair career paths"],
    es: ["Bases de mecánica automotriz", "Aprende herramientas, seguridad y mantenimiento básico antes de buscar ayudante.", "Explorar carreras de mecánica"],
    zh: ["汽修基础认知", "了解工具、安全、基础维护，再去找汽修助手或社区培训。", "CareerOneStop 职业路径"],
  }),
  item(["hands", "growth", "physical"], "", "https://www.careeronestop.org/Toolkit/Training/find-certifications.aspx", {
    en: ["Carpentry and repair safety", "Start with tool safety, measuring, and materials before helper roles.", "Find local certificate training"],
    es: ["Seguridad de carpintería y reparación", "Empieza con seguridad, medición y materiales antes de ser ayudante.", "Buscar certificados locales"],
    zh: ["木工和维修安全基础", "先学工具安全、测量、材料认知，再找 helper 或 certificate。", "查找本地证书培训"],
  }),
  item(["care", "service", "training"], "", "https://www.careeronestop.org/Toolkit/Careers/careers.aspx", {
    en: ["Caregiving basics", "Learn basic care, safety, and communication for home care or assistant roles.", "Explore care career paths"],
    es: ["Bases de cuidado", "Aprende cuidado básico, seguridad y comunicación para roles de cuidado.", "Explorar carreras de cuidado"],
    zh: ["护理和陪护入门", "了解基本照护、沟通和安全。适合家政、陪护、养老院服务。", "查看照护职业路径"],
  }),
  item(["limited_english", "service", "interview"], "", "https://www.usa.gov/learn-english", {
    en: ["English and simple workplace phrases", "Good for interviews, cashier work, service work, and customer support.", "USA.gov English learning resources"],
    es: ["Inglés y frases laborales simples", "Útil para entrevistas, caja, servicio y atención al cliente.", "Recursos de inglés de USA.gov"],
    zh: ["英语和简单职场表达", "适合英语不够好、需要准备面试和工作沟通的人。", "USA.gov 学英语资源"],
  }),
  item(["finance", "budget", "saving"], "", "https://www.fdic.gov/resources/consumers/money-smart/index.html", {
    en: ["Budgeting and saving basics", "Learn weekly budgeting, small savings, and safer bank habits.", "FDIC Money Smart"],
    es: ["Bases de presupuesto y ahorro", "Aprende presupuesto semanal, pequeños ahorros y hábitos bancarios seguros.", "FDIC Money Smart"],
    zh: ["基础预算和储蓄", "学习每周预算、小额储蓄、避开高费用账户。", "FDIC Money Smart"],
  }),
  item(["finance", "credit", "avoid_debt"], "", "https://consumer.gov/", {
    en: ["Credit and scam prevention basics", "Understand credit reports, debt collection, job scams, and high-cost loans.", "Consumer.gov money basics"],
    es: ["Bases de crédito y prevención de estafas", "Entiende reportes, cobranzas, empleos falsos y préstamos caros.", "Consumer.gov dinero básico"],
    zh: ["信用和防诈骗基础", "理解信用报告、债务催收、招聘诈骗和高利贷风险。", "Consumer.gov 简单理财信息"],
  }),
];

const supportCatalog = [
  item(["mental_crisis", "mental_support", "urgent"], "", "https://988lifeline.org/", {
    en: ["988 Suicide & Crisis Lifeline", "Call or text 988 if you may hurt yourself, feel in crisis, or need immediate emotional support.", "Open 988 Lifeline"],
    es: ["Línea 988 de crisis y suicidio", "Llama o manda texto al 988 si podrías hacerte daño o necesitas apoyo inmediato.", "Abrir 988 Lifeline"],
    zh: ["988 心理危机热线", "如果你有自伤风险、强烈崩溃感或需要立即支持，可拨打或短信 988。", "打开 988 Lifeline"],
  }),
  item(["mental_support"], "", "https://findtreatment.gov/", {
    en: ["SAMHSA treatment and support search", "Find nearby mental health or substance use support.", "Open FindTreatment.gov"],
    es: ["Búsqueda de tratamiento de SAMHSA", "Encuentra apoyo cercano de salud mental o uso de sustancias.", "Abrir FindTreatment.gov"],
    zh: ["SAMHSA 治疗和支持搜索", "查找附近心理健康或成瘾支持服务。", "打开 FindTreatment.gov"],
  }),
  item(["mental_support"], "", "https://www.nami.org/Support-Education", {
    en: ["NAMI support and education", "Education, support groups, and family resources.", "View NAMI support"],
    es: ["Apoyo y educación de NAMI", "Educación, grupos de apoyo y recursos familiares.", "Ver apoyo de NAMI"],
    zh: ["NAMI 免费心理健康资源", "适合寻找教育材料、支持小组和家人支持资源。", "查看 NAMI 支持资源"],
  }),
  item(["disability_accommodation", "support"], "", "https://choosework.ssa.gov/", {
    en: ["Ticket to Work disability employment support", "For disability benefits, employment support, and questions about work and benefits.", "View Ticket to Work"],
    es: ["Ticket to Work para empleo y discapacidad", "Para beneficios, apoyo laboral y preguntas sobre trabajo y beneficios.", "Ver Ticket to Work"],
    zh: ["Ticket to Work 残障就业支持", "适合领取残障福利、需要就业支持或担心工作影响福利的人。", "查看 Ticket to Work"],
  }),
  item(["no_computer", "transport", "support"], "", "https://www.careeronestop.org/LocalHelp/local-help.aspx", {
    en: ["Local library or job center", "Use free computers, print resumes, take classes, or get local employment help.", "Find local employment help"],
    es: ["Biblioteca o centro de empleo local", "Usa computadoras gratis, imprime currículums, toma clases o recibe ayuda laboral.", "Buscar ayuda laboral local"],
    zh: ["本地图书馆或就业中心", "如果没有电脑或网络，优先找可免费使用电脑、打印简历、上课的地点。", "查找本地就业中心"],
  }),
  item(["no_experience", "low_literacy", "support"], "", "https://www.goodwill.org/job-training-and-placement-services/", {
    en: ["Goodwill job training and placement", "Low-barrier training, resume help, and job placement support.", "View Goodwill services"],
    es: ["Capacitación y colocación de Goodwill", "Capacitación accesible, ayuda con currículum y colocación laboral.", "Ver servicios de Goodwill"],
    zh: ["Goodwill 就业训练和安置", "提供低门槛培训、简历帮助和工作安置服务，适合需要线下帮助的人。", "查看 Goodwill 服务"],
  }),
];

const careerCatalog = [
  item(["resume", "no_experience", "low_literacy"], "", "https://www.careeronestop.org/JobSearch/Resumes/resumes.aspx", {
    en: ["One-page resume builder", "Turn caregiving, volunteering, part-time work, and home responsibilities into skills.", "View resume guidance"],
    es: ["Currículum de una página", "Convierte cuidado, voluntariado, trabajos parciales y hogar en habilidades.", "Ver guía de currículum"],
    zh: ["一页简历生成", "把照顾家人、志愿经历、兼职、家务管理都转成可写进简历的能力。", "查看简历指导"],
  }),
  item(["interview", "service", "limited_english"], "", "https://www.careeronestop.org/JobSearch/Interview/interview-and-negotiate.aspx", {
    en: ["Three-sentence introduction", "Practice who you are, what you can do, and when you can start.", "View interview guidance"],
    es: ["Presentación de tres frases", "Practica quién eres, qué puedes hacer y cuándo puedes empezar.", "Ver guía de entrevistas"],
    zh: ["3 句话自我介绍", "适合低学历或紧张用户：我是谁、我能做什么、我什么时候可以开始。", "查看面试指导"],
  }),
  item(["disability_accommodation", "sit_or_remote", "flexible_time"], "", "https://www.dol.gov/general/topic/disability/jobaccommodations", {
    en: ["Disability accommodation request template", "Ask clearly about seated work, schedule changes, or remote work.", "View DOL accommodation information"],
    es: ["Plantilla para pedir adaptación", "Pregunta claramente por trabajo sentado, cambios de horario o remoto.", "Ver información del DOL"],
    zh: ["残障 accommodation 询问模板", "用礼貌、清楚的方式询问是否可坐着工作、调整班次或远程。", "查看 DOL 残障工作适配信息"],
  }),
  item(["avoid_debt", "no_experience", "remote"], "", "https://consumer.gov/scams", {
    en: ["Fake job scam checklist", "Be careful if a job asks you to pay first, buy equipment, or share sensitive information.", "View Consumer.gov scam guidance"],
    es: ["Lista contra trabajos falsos", "Ten cuidado si piden pagar, comprar equipo o dar información sensible.", "Ver guía de estafas"],
    zh: ["防虚假招聘检查清单", "任何要求先交钱、购买设备、提供敏感信息的工作都要谨慎。", "查看 Consumer.gov 防诈骗"],
  }),
  item(["job", "fast_income", "balanced"], "", "https://www.indeed.com/jobs", {
    en: ["Daily job search task", "Apply to 2 jobs, practice 1 answer, and record 1 follow-up each day.", "Start searching jobs"],
    es: ["Tarea diaria de búsqueda", "Postula a 2 trabajos, practica 1 respuesta y registra 1 seguimiento.", "Empezar búsqueda de trabajo"],
    zh: ["每日求职小任务", "每天只做三件事：申请 2 个岗位、练 1 个回答、记录 1 个反馈。", "开始找工作"],
  }, { provider: "indeed", query: "entry level jobs" }),
];

const sourceLabels = {
  company: { en: "Employer-posted", es: "Publicado por empresa", zh: "企业发布" },
  local: { en: "Find locally", es: "Buscar localmente", zh: "现场找" },
};

const reasonLabels = {
  lowPhysical: {
    en: "lower physical demand",
    es: "menos esfuerzo físico",
    zh: "体力要求较低",
  },
  remote: {
    en: "can be seated or remote",
    es: "puede ser sentado o remoto",
    zh: "可坐着或远程",
  },
  training: {
    en: "entry-level or training-friendly",
    es: "nivel inicial o con capacitación",
    zh: "适合入门或培训上岗",
  },
  hands: { en: "matches hands-on interest", es: "coincide con trabajo manual", zh: "符合动手偏好" },
  service: { en: "matches service interest", es: "coincide con servicio", zh: "符合服务沟通偏好" },
  computer: { en: "matches computer or remote interest", es: "coincide con computadora o remoto", zh: "符合电脑或远程偏好" },
  finance: { en: "builds money basics", es: "fortalece bases de dinero", zh: "补基础理财" },
  mental: { en: "offers mental health support", es: "ofrece apoyo emocional", zh: "提供心理支持资源" },
  disability: { en: "considers disability accommodation", es: "considera adaptación por discapacidad", zh: "考虑残障适配" },
  fallback: {
    en: "matched to your answers and useful as a next step",
    es: "coincide con tus respuestas y sirve como próximo paso",
    zh: "与你的选择匹配，适合作为下一步参考",
  },
};

function opt(id, next, effects, copy, isUnsure = false) {
  return { id, next, effects, copy, isUnsure };
}

function item(tags, source, link, copy, precise = {}) {
  return { tags, source, link, copy, precise };
}

function currentText() {
  return text[state.uiLanguage];
}

function localize(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[state.uiLanguage] || value.en || "";
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

const elements = {
  uiLanguageSelect: document.getElementById("uiLanguageSelect"),
  userLanguage: document.getElementById("userLanguage"),
  profileForm: document.getElementById("profileForm"),
  userName: document.getElementById("userName"),
  userLocation: document.getElementById("userLocation"),
  questionTitle: document.getElementById("questionTitle"),
  questionText: document.getElementById("questionText"),
  storyStep: document.getElementById("storyStep"),
  optionGrid: document.getElementById("optionGrid"),
  whyText: document.getElementById("whyText"),
  stateList: document.getElementById("stateList"),
  todayTasks: document.getElementById("todayTasks"),
  recommendations: document.getElementById("recommendations"),
  printSummary: document.getElementById("printSummary"),
  backBtn: document.getElementById("backBtn"),
  skipBtn: document.getElementById("skipBtn"),
  restartBtn: document.getElementById("restartBtn"),
  copyPlanBtn: document.getElementById("copyPlanBtn"),
  printBtn: document.getElementById("printBtn"),
  largeTextBtn: document.getElementById("largeTextBtn"),
  contrastBtn: document.getElementById("contrastBtn"),
  readBtn: document.getElementById("readBtn"),
};

function cloneState() {
  return JSON.parse(JSON.stringify(state));
}

function restoreState(snapshot) {
  Object.keys(state).forEach((key) => delete state[key]);
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
    uiLanguage: state.uiLanguage,
    name: state.name,
    location: state.location,
    language: state.language,
  };

  Object.assign(state, {
    uiLanguage: preserved.uiLanguage,
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
  });
  historyStack = [];
}

function chooseOption(option) {
  historyStack.push({ nodeId: currentNodeId, snapshot: cloneState() });
  applyEffects(option.effects);
  currentNodeId = option.effects?.reset ? "goal" : option.next;
  setActiveTab(recommendedTab());
  render();
}

function render() {
  renderStaticText();
  renderNode();
  renderState();
  renderTodayTasks();
  renderRecommendations();
  renderPrintSummary();
}

function renderStaticText() {
  const t = currentText();
  document.documentElement.lang = state.uiLanguage === "zh" ? "zh-CN" : state.uiLanguage;
  document.title = t.title;
  setText("appTitle", t.appTitle);
  setText("appSubtitle", t.subtitle);
  setText("uiLanguageLabelText", t.uiLanguage);
  document.getElementById("accessibilityPanel")?.setAttribute("aria-label", t.accessibility);
  setText("largeTextBtn", t.largeText);
  setText("contrastBtn", t.highContrast);
  setText("readBtn", t.readQuestion);
  setText("profileTitle", t.profileTitle);
  setText("nameLabelText", t.nameLabel);
  elements.userName.placeholder = t.namePlaceholder;
  setText("locationLabelText", t.locationLabel);
  elements.userLocation.placeholder = t.locationPlaceholder;
  setText("preferredLanguageLabelText", t.preferredLanguage);
  setText("saveProfileBtn", t.saveStart);
  setText("guideTitle", t.guideTitle);
  setText("guideText", t.guideText);
  setText("stateTitle", t.currentProfile);
  setText("restartBtn", t.restart);
  setText("backBtn", t.back);
  setText("skipBtn", t.unsureButton);
  setText("whyTitle", t.whyTitle);
  setText("dashboardTitle", t.dashboardTitle);
  setText("todayTitle", t.todayTitle);
  setText("copyPlanBtn", t.copyPlan);
  setText("printBtn", t.printPlan);
  setText("noticeText", t.notice);

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.textContent = t.tabs[tab.dataset.tab];
  });
  renderTabState();
}

function setActiveTab(tabName) {
  activeTab = tabName;
  renderTabState();
}

function renderTabState() {
  document.querySelectorAll(".tab").forEach((tab) => {
    const isActive = tab.dataset.tab === activeTab;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

function recommendedTab() {
  if (state.planBias === "jobs") return "jobs";
  if (state.planBias === "skills") return "skills";
  if (state.planBias === "support") return "support";
  if (state.supportNeeds.includes("resume") || state.supportNeeds.includes("interview")) return "career";
  if (
    state.goals.includes("mental") ||
    state.supportNeeds.includes("mental_support") ||
    state.supportNeeds.includes("mental_crisis")
  ) {
    return "support";
  }
  if (state.goals.includes("skill") || state.goals.includes("finance") || state.supportNeeds.includes("finance")) {
    return "skills";
  }
  return "jobs";
}

function renderNode() {
  const node = nodes[currentNodeId];
  const visibleOptions = node.options.filter(shouldShowOption);
  elements.storyStep.textContent = node.step;
  elements.questionTitle.textContent = localize(node.title);
  elements.questionText.textContent = localize(node.text);
  elements.whyText.textContent = localize(node.why);
  elements.optionGrid.innerHTML = "";

  visibleOptions.forEach((option) => {
    const [label, help] = option.copy[state.uiLanguage] || option.copy.en;
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.dataset.optionId = option.id;
    button.innerHTML = `
      <span class="option-title">${label}</span>
      <span class="option-help">${help}</span>
    `;
    button.addEventListener("click", () => chooseOption(option));
    elements.optionGrid.appendChild(button);
  });

  elements.backBtn.disabled = historyStack.length === 0;
}

function shouldShowOption(option) {
  const effects = option.effects || {};
  if (effects.reset) return true;
  const entries = Object.entries(effects).filter(([key]) => key !== "reset");
  if (entries.length === 0) return true;

  return entries.some(([key, value]) => {
    if (Array.isArray(state[key])) {
      const values = Array.isArray(value) ? value : [value];
      return values.some((entry) => !state[key].includes(entry));
    }
    return state[key] !== value;
  });
}

function humanList(values, dictionary, fallback = currentText().waiting) {
  if (!values || values.length === 0) return fallback;
  return values.map((value) => localize(dictionary[value]) || value).join(currentText().joiner);
}

function renderState() {
  const t = currentText();
  const workParts = [
    humanList(state.interests, valueLabels.interests, ""),
    humanList(state.bodyNeeds, valueLabels.bodyNeeds, ""),
  ].filter(Boolean);
  const supportParts = [
    humanList(state.barriers, valueLabels.barriers, ""),
    humanList(state.supportNeeds, valueLabels.supportNeeds, ""),
  ].filter(Boolean);

  elements.stateList.innerHTML = `
    <div>
      <dt>${t.goal}</dt>
      <dd>${humanList(state.goals, valueLabels.goals)}</dd>
    </div>
    <div>
      <dt>${t.workFit}</dt>
      <dd>${workParts.join(t.joiner) || t.waiting}</dd>
    </div>
    <div>
      <dt>${t.supportNeed}</dt>
      <dd>${supportParts.join(t.joiner) || t.waiting}</dd>
    </div>
    <div>
      <dt>${t.locationLanguage}</dt>
      <dd>${state.location || t.notProvided} · ${languageLabel(state.language)}</dd>
    </div>
  `;
}

function languageLabel(value) {
  return currentText().languages[value] || currentText().languages.en;
}

function scoreItem(entry) {
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

  entry.tags.forEach((tag) => {
    if (allPrefs.includes(tag)) score += 4;
  });

  if (state.bodyNeeds.includes("sit_or_remote") && entry.tags.includes("remote")) score += 5;
  if (state.bodyNeeds.includes("low_physical") && entry.tags.includes("low_physical")) score += 4;
  if (state.bodyNeeds.includes("no_heavy_lifting") && entry.tags.includes("physical")) score -= 7;
  if (state.barriers.includes("no_computer") && entry.tags.includes("remote")) score -= 3;
  if (state.barriers.includes("no_experience") && entry.tags.includes("training")) score += 4;
  if (state.barriers.includes("limited_english") && entry.tags.includes("service")) score -= 1;
  if (state.goals.includes("job") && entry.tags.includes("entry")) score += 2;
  if (state.goals.includes("finance") && entry.tags.includes("finance")) score += 5;
  if (state.supportNeeds.includes("mental_crisis") && entry.tags.includes("urgent")) score += 20;

  return score;
}

function pickTop(catalog, count = 3) {
  return catalog
    .map((entry) => ({ ...entry, score: scoreItem(entry) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

function entryTitle(entry) {
  return localize({ en: entry.copy.en[0], es: entry.copy.es[0], zh: entry.copy.zh[0] });
}

function entryDescription(entry) {
  return localize({ en: entry.copy.en[1], es: entry.copy.es[1], zh: entry.copy.zh[1] });
}

function entryLinkLabel(entry) {
  return localize({ en: entry.copy.en[2], es: entry.copy.es[2], zh: entry.copy.zh[2] });
}

function entryLink(entry) {
  if (entry.precise?.provider === "indeed") {
    const location = state.location.trim() || "United States";
    const query = entry.precise.query;
    return `https://www.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(location)}`;
  }

  return entry.link;
}

function reasonFor(entry) {
  const reasons = [];
  if (entry.tags.includes("low_physical") && state.bodyNeeds.includes("low_physical")) {
    reasons.push(localize(reasonLabels.lowPhysical));
  }
  if (entry.tags.includes("remote") && state.bodyNeeds.includes("sit_or_remote")) {
    reasons.push(localize(reasonLabels.remote));
  }
  if (entry.tags.includes("training") || entry.tags.includes("entry")) {
    reasons.push(localize(reasonLabels.training));
  }
  if (entry.tags.includes("hands") && state.interests.includes("hands")) {
    reasons.push(localize(reasonLabels.hands));
  }
  if (entry.tags.includes("service") && state.interests.includes("service")) {
    reasons.push(localize(reasonLabels.service));
  }
  if (entry.tags.includes("computer") && state.interests.includes("computer")) {
    reasons.push(localize(reasonLabels.computer));
  }
  if (entry.tags.includes("finance") && state.supportNeeds.includes("finance")) {
    reasons.push(localize(reasonLabels.finance));
  }
  if (entry.tags.includes("mental_support") && state.supportNeeds.includes("mental_support")) {
    reasons.push(localize(reasonLabels.mental));
  }
  if (entry.tags.includes("disability_accommodation") && state.bodyNeeds.includes("disability_accommodation")) {
    reasons.push(localize(reasonLabels.disability));
  }

  return reasons.length ? reasons.slice(0, 3).join(currentText().joiner) : localize(reasonLabels.fallback);
}

function renderTodayTasks() {
  const t = currentText();
  const recJobs = pickTop(jobCatalog, 1);
  const recSkills = pickTop(skillCatalog, 1);
  const tasks = [];

  if (state.supportNeeds.includes("mental_crisis")) {
    tasks.push({
      en: "Contact 988 or local emergency services first so you are safe.",
      es: "Contacta primero al 988 o servicios de emergencia locales para estar seguro.",
      zh: "先联系 988 或当地紧急服务，确保自己安全。",
    });
  }

  if (state.planBias === "jobs" || state.goals.includes("job") || state.incomeTiming === "now") {
    tasks.push({
      en: `Apply to or save 2 jobs. Start with "${entryTitle(recJobs[0])}".`,
      es: `Postula o guarda 2 trabajos. Empieza con "${entryTitle(recJobs[0])}".`,
      zh: `申请或记录 2 个岗位：优先看“${entryTitle(recJobs[0])}”。`,
    });
  } else {
    tasks.push({
      en: `Complete a 15-minute lesson. Start with "${entryTitle(recSkills[0])}".`,
      es: `Completa una lección de 15 minutos. Empieza con "${entryTitle(recSkills[0])}".`,
      zh: `完成 15 分钟短课：先看“${entryTitle(recSkills[0])}”。`,
    });
  }

  if (state.supportNeeds.includes("resume") || state.barriers.includes("no_experience")) {
    tasks.push({
      en: "Write 3 transferable skills for a one-page resume: reliability, caregiving, communication, organizing.",
      es: "Escribe 3 habilidades transferibles para un currículum: puntualidad, cuidado, comunicación, organización.",
      zh: "用一页简历模板写下 3 个可转移能力，比如准时、照顾、沟通、整理。",
    });
  } else {
    tasks.push({
      en: "Save 3 recommended links and open one you can actually use today.",
      es: "Guarda 3 enlaces recomendados y abre uno que puedas usar hoy.",
      zh: "保存 3 个推荐链接，并选一个今天真的能打开的。",
    });
  }

  if (state.supportNeeds.includes("finance") || state.goals.includes("finance")) {
    tasks.push({
      en: "Do one budget task: write down 3 required expenses for this week.",
      es: "Haz una tarea de presupuesto: escribe 3 gastos obligatorios de esta semana.",
      zh: "完成一个预算小任务：写下本周必须支出的 3 项费用。",
    });
  } else if (state.supportNeeds.includes("mental_support") || state.goals.includes("mental")) {
    tasks.push({
      en: "Save one free mental health support link and contact it if you need help.",
      es: "Guarda un enlace gratuito de apoyo emocional y úsalo si necesitas ayuda.",
      zh: "保存一个免费心理支持链接，必要时联系热线或社区机构。",
    });
  } else {
    tasks.push({
      en: "Practice a 3-sentence introduction: what you can do, what you are willing to learn, and when you can start.",
      es: "Practica una presentación de 3 frases: qué puedes hacer, qué quieres aprender y cuándo puedes empezar.",
      zh: "练习 3 句话自我介绍：我能做什么、我愿意学什么、我什么时候能开始。",
    });
  }

  elements.todayTasks.innerHTML = tasks.map((task) => `<li>${localize(task)}</li>`).join("");
}

function renderRecommendations() {
  const catalogMap = {
    jobs: pickTop(jobCatalog, 4),
    skills: pickTop(skillCatalog, 4),
    support: pickTop(supportCatalog, 4),
    career: pickTop(careerCatalog, 4),
  };
  elements.recommendations.innerHTML = catalogMap[activeTab].map(renderCard).join("");
}

function renderCard(entry) {
  const t = currentText();
  const sourceTag = entry.source ? `<span class="tag">${localize(sourceLabels[entry.source])}</span>` : "";
  const urgentTag = entry.tags.includes("urgent") ? `<span class="tag urgent">${t.urgent}</span>` : "";

  return `
    <article class="recommendation-card">
      <div class="meta-row">
        ${sourceTag}
        ${urgentTag}
        <span class="tag warn">${t.reasonPrefix} ${reasonFor(entry)}</span>
      </div>
      <h3>${entryTitle(entry)}</h3>
      <p>${entryDescription(entry)}</p>
      <a class="resource-link" href="${entryLink(entry)}" target="_blank" rel="noreferrer">${entryLinkLabel(entry)}</a>
    </article>
  `;
}

function planText() {
  const t = currentText();
  const tasks = Array.from(elements.todayTasks.querySelectorAll("li")).map((entry) => entry.textContent.trim());
  const jobs = pickTop(jobCatalog, 3).map((entry) => `- ${entryTitle(entry)}: ${reasonFor(entry)}\n  ${entryLink(entry)}`);
  const skills = pickTop(skillCatalog, 2).map((entry) => `- ${entryTitle(entry)}: ${entry.link}`);
  const support = pickTop(supportCatalog, 2).map((entry) => `- ${entryTitle(entry)}: ${entry.link}`);

  return [
    t.planTitle,
    `${t.nameLabel}: ${state.name || t.notProvided}`,
    `${t.locationLabel}: ${state.location || t.notProvided}`,
    `${t.goal}: ${humanList(state.goals, valueLabels.goals)}`,
    "",
    t.today,
    ...tasks.map((task, index) => `${index + 1}. ${task}`),
    "",
    t.recommendedJobs,
    ...jobs,
    "",
    t.recommendedCourses,
    ...skills,
    "",
    t.supportResources,
    ...support,
    "",
    t.reminder,
  ].join("\n");
}

function renderPrintSummary() {
  const t = currentText();
  const tasks = Array.from(elements.todayTasks.querySelectorAll("li")).map((entry) => entry.textContent.trim());
  const topLinks = [
    ...pickTop(jobCatalog, 2),
    ...pickTop(skillCatalog, 1),
    ...pickTop(supportCatalog, 1),
  ];

  elements.printSummary.innerHTML = `
    <div class="print-page">
      <h1>${t.printableTitle}</h1>
      <div class="print-meta">
        <p><strong>${t.nameLabel}:</strong> ${state.name || t.notProvided}</p>
        <p><strong>${t.locationLabel}:</strong> ${state.location || t.notProvided}</p>
        <p><strong>${t.goal}:</strong> ${humanList(state.goals, valueLabels.goals)}</p>
      </div>
      <h2>${t.today}</h2>
      <ol>${tasks.map((task) => `<li>${task}</li>`).join("")}</ol>
      <h2>${t.topLinks}</h2>
      <ul>
        ${topLinks
          .map(
            (entry) => `
              <li>
                <strong>${entryTitle(entry)}</strong><br />
                ${reasonFor(entry)}<br />
                <span>${entryLink(entry)}</span>
              </li>
            `,
          )
          .join("")}
      </ul>
      <p class="print-note">${t.reminder}</p>
    </div>
  `;
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function setInterfaceLanguage(language) {
  state.uiLanguage = language;
  elements.uiLanguageSelect.value = language;
  render();
}

elements.profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.name = elements.userName.value.trim();
  state.location = elements.userLocation.value.trim();
  state.language = elements.userLanguage.value;
  render();
  showToast(currentText().saved);
});

elements.uiLanguageSelect.addEventListener("change", (event) => {
  setInterfaceLanguage(event.target.value);
});

elements.userLanguage.addEventListener("change", (event) => {
  state.language = event.target.value;
  renderState();
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
  const visibleOptions = node.options.filter(shouldShowOption);
  const unsure = visibleOptions.find((option) => option.isUnsure);
  chooseOption(unsure || visibleOptions[visibleOptions.length - 1]);
});

elements.restartBtn.addEventListener("click", () => {
  resetState();
  currentNodeId = "goal";
  setActiveTab("jobs");
  render();
  showToast(currentText().restarted);
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((entry) => {
      entry.classList.remove("active");
      entry.setAttribute("aria-selected", "false");
    });
    setActiveTab(tab.dataset.tab);
    renderRecommendations();
  });
});

elements.copyPlanBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(planText());
    showToast(currentText().copied);
  } catch {
    showToast(currentText().copyFailed);
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

elements.readBtn.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) {
    showToast(currentText().noSpeech);
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(
    `${elements.questionTitle.textContent}. ${elements.questionText.textContent}`,
  );
  utterance.lang = state.uiLanguage === "zh" ? "zh-CN" : state.uiLanguage === "es" ? "es-US" : "en-US";
  window.speechSynthesis.speak(utterance);
});

render();
