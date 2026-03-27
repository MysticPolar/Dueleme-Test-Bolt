// ═══════════════════════════════════════════════════════════════
// 读了么 (Dúle Me) · Content Data
// The Owlery Press — Est. 2025
// ═══════════════════════════════════════════════════════════════

export const QUESTIONS = [
  {
    id: 1,
    zh: "如果你可以删除一种人类集体记忆，你会选什么？",
    en: "你会抹去哪段人类共同记忆？",
    tag: "思辨",
    color: "coral",
    votes: "4.7千",
    type: "思辨",
  },
  {
    id: 2,
    zh: "成功最需要的特质是什么？不许说努力。",
    en: "成功最需要的到底是什么？",
    tag: "职场",
    color: "cobalt",
    votes: "6.8千",
    type: "职场",
  },
  {
    id: 3,
    zh: "读到一半放弃的书，算不算读过了？",
    en: "一本读到一半放下的书，还算读过吗？",
    tag: "文学",
    color: "purple",
    votes: "5.2千",
    type: "文学",
  },
  {
    id: 4,
    zh: "你有多久没有真正无聊过了？",
    en: "你上一次真正无聊，是什么时候？",
    tag: "健康",
    color: "teal",
    votes: "3.1千",
    type: "健康",
  },
  {
    id: 5,
    zh: "你上一次为了别人的梦想让步，是什么时候？",
    en: "你上次为他人的梦想让步是什么时候？",
    tag: "人际",
    color: "gold",
    votes: "8.2千",
    type: "人际",
  },
  {
    id: 6,
    zh: "如果你的书架会说话，它会对你说什么？",
    en: "如果你的书架会开口，它会说什么？",
    tag: "财富",
    color: "green",
    votes: "2.9千",
    type: "财富",
  },
];

export const READING_ARTICLES = [
  {
    id: 1,
    title: "为什么我们总是高估明天的自己？",
    en: "为什么我们总会高估明天的自己？",
    author: "猫头鹰邮局编辑部",
    date: "第42卷",
    tag: "健康",
    color: "cobalt",
    readTime: "6 分钟",
    preview:
      "心理学家将这种现象称为“计划谬误”。我们相信未来的自己更理性、更有纪律……",
  },
  {
    id: 2,
    title: "一本书改变了我对孤独的理解",
    en: "一本改变我看待孤独方式的书",
    author: "匿名读者投稿",
    date: "第41卷",
    tag: "文学",
    color: "teal",
    readTime: "8 分钟",
    preview:
      "萨特说“他人即地狱”，但读完这本书，我才意识到真正的孤独，是与自己同处……",
  },
  {
    id: 3,
    title: "数字时代的深度阅读还有可能吗？",
    en: "数字时代还可能进行深度阅读吗？",
    author: "夜猫子专栏",
    date: "第40卷",
    tag: "思辨",
    color: "purple",
    readTime: "5 分钟",
    preview:
      "每隔九分钟，我们的大脑就会渴望一次刺激。这不是懒惰，而是神经科学的现实……",
  },
  {
    id: 4,
    title: "那些被遗忘的二十世纪经典",
    en: "那些被遗忘的二十世纪经典",
    author: "书卷编辑部",
    date: "第39卷",
    tag: "财富",
    color: "coral",
    readTime: "10 分钟",
    preview:
      "有一些书，曾经在某个年代引发轰动，却随着时间消失在书架最深处……",
  },
  {
    id: 5,
    title: "为什么我们总在对话里抢先下结论？",
    en: "为什么我们总在对话里抢先下结论？",
    author: "夜猫子专栏",
    date: "第38卷",
    tag: "人际",
    color: "gold",
    readTime: "7 分钟",
    preview:
      "倾听不是沉默的等待，而是给对方留出完整句子的时间。可我们太习惯用标签填满缝隙……",
  },
  {
    id: 6,
    title: "会议越多，为什么产出越少？",
    en: "会议越多，为什么产出越少？",
    author: "猫头鹰邮局编辑部",
    date: "第37卷",
    tag: "职场",
    color: "green",
    readTime: "6 分钟",
    preview:
      "当协作变成同步表演，深度工作就被切成碎片。好组织保护专注，而不是填满日历……",
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
