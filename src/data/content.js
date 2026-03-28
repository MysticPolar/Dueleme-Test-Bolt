// ═══════════════════════════════════════════════════════════════
// 读了么 (Dúle Me) · Content Data
// The Owlery Press — Est. 2025
// ═══════════════════════════════════════════════════════════════

export const QUESTIONS = [
  {
    id: 1,
    zh: "你身边有没有一个人，你可以告诉他你现在真实的状态？",
    en: "你有多久没有说过真心话了？",
    tag: "人际",
    color: "coral",
    votes: "15.3千",
    type: "人际",
  },
  {
    id: 2,
    zh: "如果五年后的你，回头看现在，会感到骄傲还是难过？",
    en: "五年后的你，会怎么看现在的选择？",
    tag: "职场",
    color: "cobalt",
    votes: "11.2千",
    type: "职场",
  },
  {
    id: 3,
    zh: "你的观点里，有多少是真正属于你的，而不是被灌输的？",
    en: "你上次真正改变主意，是因为什么？",
    tag: "思辨",
    color: "teal",
    votes: "7.8千",
    type: "思辨",
  },
  {
    id: 4,
    zh: "你上次真正八小时睡眠，是多久以前的事了？",
    en: "你把熬夜当成努力的证明吗？",
    tag: "健康",
    color: "green",
    votes: "9.4千",
    type: "健康",
  },
  {
    id: 5,
    zh: "存款不够撑过三个月，这件事让你感到恐慌吗？",
    en: "你真的知道自己的钱去哪了吗？",
    tag: "财富",
    color: "gold",
    votes: "12.1千",
    type: "财富",
  },
  {
    id: 6,
    zh: "你上次读完一整本书是什么时候？不算公众号文章。",
    en: "你还记得上一本真正读完的书吗？",
    tag: "文学",
    color: "purple",
    votes: "8.6千",
    type: "文学",
  },
];

export const READING_ARTICLES = [
  {
    id: 1,
    title: "毕业三年，那些说好一辈子的朋友去哪了？",
    en: "真正的友谊，扛得住距离吗？",
    author: "夜猫子专栏",
    date: "第42卷",
    tag: "人际",
    color: "coral",
    readTime: "7 分钟",
    preview:
      "研究显示，人的社交圈在二十五岁后开始系统性收缩。不是你们变坏了，是没有人教过你怎么主动维系一段没有课表支撑的关系……",
  },
  {
    id: 2,
    title: "你在工作，还是在扮演一个正在工作的人？",
    en: "职场表演，是一种进化来的生存机制。",
    author: "猫头鹰邮局编辑部",
    date: "第41卷",
    tag: "职场",
    color: "cobalt",
    readTime: "8 分钟",
    preview:
      "会议开完，PPT 做完，邮件回完。但你知道自己今天真正推进了什么吗？职场里最隐蔽的陷阱，是用忙碌来代替进展……",
  },
  {
    id: 3,
    title: "你的观点，到底有多少是你自己想出来的？",
    en: "独立思考为何让人不舒服？",
    author: "书卷编辑部",
    date: "第40卷",
    tag: "思辨",
    color: "teal",
    readTime: "6 分钟",
    preview:
      "我们以为自己在思考，但大多数时候，我们不过是在为已有的结论寻找支撑。真正令人不适的独立思考，几乎总是从自我质疑开始……",
  },
  {
    id: 4,
    title: "为什么你总是很累，却永远睡不够？",
    en: "慢性疲劳的真正来源，不是加班。",
    author: "匿名读者投稿",
    date: "第39卷",
    tag: "健康",
    color: "green",
    readTime: "5 分钟",
    preview:
      "你不是意志力不够，你是系统性过载。研究发现，二十五到三十五岁人群的慢性疲劳，七成来自『低强度持续焦虑』，而非实际工作量……",
  },
  {
    id: 5,
    title: "月入一万，为什么存款是零？",
    en: "收入不是财富，存量才是。",
    author: "猫头鹰邮局编辑部",
    date: "第38卷",
    tag: "财富",
    color: "gold",
    readTime: "9 分钟",
    preview:
      "大多数人败在『消费自我认同』上——我们买的不是商品，是对自己身份的临时确认。攒不下钱，往往是一个关于自尊心的问题，而不是数学问题……",
  },
  {
    id: 6,
    title: "为什么你开始读不进去书了？",
    en: "注意力不是被抢走的，是你一次次出卖的。",
    author: "夜猫子专栏",
    date: "第37卷",
    tag: "文学",
    color: "purple",
    readTime: "6 分钟",
    preview:
      "每次刷完短视频再去翻书，你的大脑其实在执行一套降维适应。阅读需要的那种慢速注意力，是可以重新训练的——但首先你得承认它已经损耗了……",
  },
];

export const RANKS = [
  { name: "实习编辑", zh: "实习编辑", ink: 0 },
  { name: "初级编辑", zh: "初级编辑", ink: 400 },
  { name: "中级编辑", zh: "中级编辑", ink: 1200 },
  { name: "资深编辑", zh: "资深编辑", ink: 3000 },
  { name: "实习研究员", zh: "实习研究员", ink: 7000 },
  { name: "中级研究员", zh: "中级研究员", ink: 16000 },
  { name: "资深研究员", zh: "资深研究员", ink: 36000 },
  { name: "实习局长", zh: "实习局长", ink: 80000 },
  { name: "中级局长", zh: "中级局长", ink: 165000 },
  { name: "资深局长", zh: "资深局长", ink: 320000 },
  { name: "邮局认证局长", zh: "邮局认证局长", ink: 620000 },
  { name: "传说局长", zh: "传说局长", ink: 1200000 },
];

export const AVATARS = [
  { name: "学者", enName: "学者", level: "神谕 7级", badge: "🔮", bg: "#e8dfc8", owned: true },
  { name: "夜猫子", enName: "夜猫子", level: "徽章 3级", badge: "🦉", bg: "#1d3a6b", owned: true },
  { name: "抄写员", enName: "抄写员", level: "墨水 5级", badge: "📜", bg: "#2d6a4f", owned: true },
  { name: "炼金术士", enName: "炼金术士", level: "稀有 · 10级", badge: "⚗️", bg: "#5c2d7a", owned: true },
  { name: "未解锁", enName: "未解锁", level: "12级", badge: "?", bg: "#d4c9a8", owned: false },
  { name: "未解锁", enName: "未解锁", level: "15级", badge: "?", bg: "#d4c9a8", owned: false },
];

export const ORACLE_RESPONSES = {
  default: {
    pullQuote: "每一段被遗忘的记忆，都是一种选择性的自由。",
    pullQuote2: "专家和新手的差距，不是努力程度，是大脑里存储的模式数量。",
    body: [
      "这个问题触及了人类记忆的本质：我们记住的不仅仅是事实，更是定义我们身份的叙事。如果集体遗忘是可能的，那么“我们是谁”的定义也将随之改变。",
      "想象一下：如果所有人都忘记了战争的创伤，我们是会更加和平，还是注定重蹈覆辙？记忆不仅是过去的印记，它还是未来的导航。猫头鹰邮局认为，真正的问题不在于“删除什么”，而在于“我们为什么想要遗忘”。",
    ],
    bodyStrong1: "集体记忆从何而来？",
    bookRec: { title: "《记忆的政治》— 保罗·利科", en: "探讨记忆如何塑造群体身份与政治叙事的哲学作品。" },
    bookSpineShort: "记忆",
    chapterTag: "推荐章节 · 集体记忆与叙事",
    empathyLine1: "每一段被遗忘的记忆，",
    empathyLine2: "都是一种",
    empathyRed: "选择性",
    empathyLine2After: "的自由。",
    takeaways: [
      "记忆不是仓库，而是不断重写的叙事——你记住的“事实”，早已被当下重新解释。",
      "集体遗忘与集体记忆同样危险：前者抹去教训，后者可能固化偏见。",
      "追问“我们为什么想遗忘”，比争论“该删什么”更接近诚实。",
      "阅读是把他人经验接入你心理表征的方式——多一页，多一种面对世界的模板。",
    ],
    recommendations: [
      {
        spine: "遗忘",
        title: "《遗忘的技艺》",
        author: "保罗·利科 · PAUL RICOEUR",
        why: "若你想从哲学层面理解记忆如何被政治与话语塑造，可与本篇对照阅读。",
        color: "cobalt",
      },
      {
        spine: "创伤",
        title: "《创伤与复原》",
        author: "朱迪斯·赫尔曼 · JUDITH HERMAN",
        why: "若你关心战争、暴力与代际记忆，这本书讨论的是“能否遗忘”的另一条路径。",
        color: "teal",
      },
      {
        spine: "叙事",
        title: "《叙事的本质》",
        author: "保罗·利科 · PAUL RICOEUR",
        why: "若你想理解“故事如何定义我们是谁”，叙事理论是记忆议题的自然延伸。",
        color: "coral",
      },
    ],
    inkReward: 40,
  },
};

export const TAG_VOLUMES = {
  健康: 8,
  思辨: 12,
  文学: 15,
  职场: 6,
  人际: 10,
  财富: 4,
};

export const USER_STATS = {
  accountCreatedAt: "2025-01-01",
  loginDays: 14,
  softwareCreatedAt: "2025-01-01",
  questionsAsked: 47,
  articlesRead: 128,
  streakDays: 14,
  inkBalance: 500,
  xpCurrent: 0,
  xpTotal: 3500,
  rank: "中级编辑",
  level: 3,
  nextRank: "资深编辑",
  avatar: "学者",
};

export function getRankProgress(xpCurrent) {
  const safeXp = Math.max(0, xpCurrent ?? 0);
  let currentIndex = 0;

  for (let i = 0; i < RANKS.length; i += 1) {
    if (safeXp >= RANKS[i].ink) currentIndex = i;
    else break;
  }

  const currentRank = RANKS[currentIndex];
  const nextRank = RANKS[currentIndex + 1] || null;

  if (!nextRank) {
    return {
      currentRank: currentRank.name,
      nextRank: null,
      level: currentIndex + 1,
      xpTotal: currentRank.ink,
      remainingToNext: 0,
      pctToNext: 100,
    };
  }

  const currentFloor = currentRank.ink;
  const nextCeiling = nextRank.ink;
  const span = Math.max(1, nextCeiling - currentFloor);
  const progressed = Math.min(span, Math.max(0, safeXp - currentFloor));
  const pctToNext = Math.round((progressed / span) * 100);

  return {
    currentRank: currentRank.name,
    nextRank: nextRank.name,
    level: currentIndex + 1,
    xpTotal: nextCeiling,
    remainingToNext: Math.max(0, nextCeiling - safeXp),
    pctToNext,
  };
}
