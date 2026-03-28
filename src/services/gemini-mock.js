const MOCK_RESPONSES = {
  normal: {
    empathyLine1: "每个人都曾在深夜问过自己",
    empathyLine2: "这条路，值得",
    empathyRed: "坚持",
    empathyLine2After: "吗？",
    bookRec: {
      title: "《被讨厌的勇气》\u2014 岸见一郎 / 古贺史健",
      en: "A dialogue on Adlerian psychology that frees you from the need for approval.",
    },
    bookSpineShort: "勇气",
    chapterTag: "推荐章节 \u00B7 第三夜：让干涉你生活的人见鬼去",
    body: [
      "读者来函中的困惑，猫头鹰邮局读过太多遍了。不是你不够努力，是你把别人的期待当成了自己的地图。阿德勒心理学最锋利的一刀，是「课题分离」——你的人生课题，与他人的评价无关。岸见一郎借一位青年与哲人的对话，把这个道理说得温柔又彻底。你不需要被所有人喜欢，你需要的是被讨厌的勇气。",
      "这本书最妙的地方，在于它不贩卖焦虑，也不提供速效药方。哲人反复说：「改变，从此刻开始。」不是明天，不是准备好之后，就是现在。猫头鹰邮局见过太多读者把这本书放在床头，每次迷茫的时候翻开任意一页，总能找到一句话让自己安静下来。",
    ],
    bodyStrong1: "改变，从此刻开始",
    pullQuote: "决定我们自身的不是过去的经历，而是我们自己赋予经历的意义。",
    pullQuote2: "不是「世界」复杂，而是「你」把世界变复杂了。",
    reflectionQuestions: [
      "你现在最在意的那个人的看法，真的是你自己的课题吗？",
      "如果没有任何人评价你，你最想做的事是什么？",
      "你愿意用「被讨厌」换来「做自己」吗？",
    ],
    takeaways: [
      "课题分离：分清什么是你的事，什么是别人的事。",
      "自我接纳不等于自我肯定——接受不完美的自己。",
      "人际关系的终极目标是「共同体感觉」，而非竞争。",
      "幸福的勇气，就是甘于平凡的勇气。",
    ],
    recommendations: [
      {
        spine: "自由",
        title: "《逃避自由》",
        author: "埃里希\u00B7弗洛姆 \u00B7 ERICH FROMM",
        why: "如果你想更深地理解为什么我们一边渴望自由，一边又害怕自由。",
        color: "cobalt",
      },
      {
        spine: "活法",
        title: "《活出生命的意义》",
        author: "维克多\u00B7弗兰克尔 \u00B7 VIKTOR FRANKL",
        why: "在极端苦难中找到意义的真实故事，比任何鸡汤都有力量。",
        color: "teal",
      },
      {
        spine: "心流",
        title: "《心流》",
        author: "米哈里\u00B7契克森米哈赖 \u00B7 CSIKSZENTMIHALYI",
        why: "当你找到属于自己的课题，这本书教你如何全身心投入其中。",
        color: "coral",
      },
    ],
    inkReward: 40,
  },

  air: {
    empathyLine1: "五本书，此刻为你备下。",
    empathyLine2: "",
    empathyRed: "备下",
    empathyLine2After: "",
    bookRec: {
      title: "《小王子》\u2014 圣埃克苏佩里",
      en: "The little prince who taught the world to see with the heart.",
    },
    bookSpineShort: "星",
    chapterTag: "灵风快答 \u00B7 五本速递",
    body: ["以下五本书，是猫头鹰邮局为你此刻的心境备下的。无需多言，翻开即知。"],
    bodyStrong1: "为你备下的五本",
    pullQuote: "真正重要的东西，用眼睛是看不见的。",
    pullQuote2: "",
    reflectionQuestions: ["读完这五本，你最想先翻开哪一本？"],
    takeaways: [
      "书1：《小王子》\u2014 用童话的方式回答成年人的困惑。",
      "书2：《月亮与六便士》\u2014 理想与现实的永恒拉扯。",
      "书3：《人间失格》\u2014 极度的坦诚，是另一种勇气。",
      "书4：《窗边的小豆豆》\u2014 教育的本质是看见每个孩子。",
      "书5：《牧羊少年奇幻之旅》\u2014 当你真心渴望某样东西时，整个宇宙都会联合起来帮你。",
    ],
    recommendations: [
      { spine: "月", title: "《月亮与六便士》", author: "毛姆 \u00B7 MAUGHAM", why: "追问「值不值得」之前，先问自己有没有勇气。", color: "cobalt" },
      { spine: "失", title: "《人间失格》", author: "太宰治 \u00B7 DAZAI", why: "不必害怕黑暗，有些书就是要在黑暗中读的。", color: "teal" },
      { spine: "豆", title: "《窗边的小豆豆》", author: "黑柳彻子 \u00B7 KUROYANAGI", why: "温暖的书，适合在任何疲惫的夜晚翻开。", color: "coral" },
    ],
    inkReward: 20,
  },

  max: {
    empathyLine1: "关于孤独这件事",
    empathyLine2: "答案不在远方，在",
    empathyRed: "书页",
    empathyLine2After: "之间。",
    bookRec: {
      title: "《百年孤独》\u2014 加西亚\u00B7马尔克斯",
      en: "Seven generations of solitude — a mirror for every human who has ever felt alone.",
    },
    bookSpineShort: "孤独",
    chapterTag: "深潜特刊 \u00B7 全面调研",
    body: [
      "孤独不是一种病，是人类存在的基本处境。从存在主义哲学到精神分析，从东方禅宗到西方心理治疗，几乎所有严肃的思想传统都在回应同一个问题：人如何与自己的孤独共处？马尔克斯的《百年孤独》用七代人的故事告诉我们，孤独不是个人的缺陷，而是布恩迪亚家族——也就是整个人类——共同的命运。当你读到奥雷里亚诺上校在小金鱼前沉默的那一刻，你会发现：孤独，其实是创造力最忠实的同伴。",
      "但如果只从文学角度理解孤独，未免单薄。温尼科特在《独处的能力》中提出一个惊人的观点：一个人能够独处，恰恰说明他在早年获得了足够好的陪伴。独处的能力不是孤僻，而是内心充盈的证据。与此呼应的是蒋勋的《孤独六讲》——他从情欲孤独、语言孤独、革命孤独等六个维度，重新定义了孤独的美学价值。猫头鹰邮局的建议是：不要急着「治愈」孤独，先学会「品味」它。",
    ],
    bodyStrong1: "独处的能力，是内心充盈的证据",
    pullQuote: "生命中曾经有过的所有灿烂，原来终究都需要用寂寞来偿还。",
    pullQuote2: "孤独是一个人的狂欢，狂欢是一群人的孤独。",
    reflectionQuestions: [
      "你上一次享受独处（而非忍受孤独）是什么时候？",
      "如果孤独是一种能力而非缺陷，你会如何看待自己的独处时光？",
      "在你的生命中，哪些重要的想法是在独处时产生的？",
    ],
    takeaways: [
      "孤独是人类存在的基本处境，不是需要被修复的问题。",
      "独处的能力源于早年足够好的关系体验。",
      "文学中的孤独叙事帮助我们将私人感受转化为共同的人类经验。",
      "东方传统（禅宗、道家）比西方更善于将孤独转化为审美体验。",
      "最高级的社交能力，是能够自在地独处。",
    ],
    recommendations: [
      { spine: "独", title: "《孤独六讲》", author: "蒋勋 \u00B7 JIANG XUN", why: "从六个维度重新定义孤独。蒋勋的文字温润如玉，适合在安静的夜晚慢慢读。这不是一本治愈孤独的书，而是一本教你欣赏孤独的书。", color: "cobalt" },
      { spine: "处", title: "《独处的能力》", author: "温尼科特 \u00B7 WINNICOTT", why: "精神分析视角下的独处心理学。薄薄一册，却颠覆了「孤独=不健康」的偏见。", color: "teal" },
      { spine: "禅", title: "《禅与摩托车维修艺术》", author: "罗伯特\u00B7波西格 \u00B7 PIRSIG", why: "一个人的公路旅行中，关于品质、理性与浪漫的深度思考。独处者的圣经。", color: "coral" },
      { spine: "夜", title: "《挪威的森林》", author: "村上春树 \u00B7 MURAKAMI", why: "村上最温柔的孤独叙事。「死并非生的对立面，而作为生的一部分永存。」", color: "green" },
    ],
    inkReward: 60,
  },
};

export async function askOwleryStreamMock(questionText, mode = "normal", onPartial) {
  const response = MOCK_RESPONSES[mode] || MOCK_RESPONSES.normal;
  const json = JSON.stringify(response);
  const totalChars = json.length;
  const chunkSize = Math.max(8, Math.floor(totalChars / 25));
  let delivered = 0;

  return new Promise((resolve) => {
    const tick = () => {
      delivered = Math.min(delivered + chunkSize + Math.floor(Math.random() * 12), totalChars);
      const partial = json.slice(0, delivered);

      let parsed = null;
      try {
        parsed = JSON.parse(partial);
      } catch {
        let text = partial;
        const unescapedQuotes = text.match(/(?<!\\)"/g) || [];
        if (unescapedQuotes.length % 2 !== 0) text += '"';
        const stack = [];
        let inString = false;
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === '"' && (i === 0 || text[i - 1] !== '\\')) { inString = !inString; continue; }
          if (inString) continue;
          if (ch === '{' || ch === '[') stack.push(ch);
          if (ch === '}' && stack.length && stack[stack.length - 1] === '{') stack.pop();
          if (ch === ']' && stack.length && stack[stack.length - 1] === '[') stack.pop();
        }
        while (stack.length) {
          const last = stack.pop();
          text += last === '{' ? '}' : ']';
        }
        try { parsed = JSON.parse(text); } catch { /* skip */ }
      }

      if (parsed) {
        onPartial(parsed);
      }

      if (delivered >= totalChars) {
        onPartial(response);
        resolve(response);
      } else {
        setTimeout(tick, 80 + Math.random() * 120);
      }
    };

    setTimeout(tick, 400);
  });
}
