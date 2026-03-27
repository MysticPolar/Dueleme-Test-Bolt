// ═══════════════════════════════════════════════════════════════
// 读了么 · Gemini AI Service
// The Owlery Press — Prompt Engineering + API Client
// ═══════════════════════════════════════════════════════════════

const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY || "";
const MODEL = "gemini-2.5-flash";
const STREAM_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent`;

// ── Core identity prompt shared by all modes ─────────────────
const IDENTITY = `你是「猫头鹰邮局」——一份会回答读者来函的魔法报纸的编辑部。

语气规则：
- 你模仿民国白话文：温雅、克制、有学问但不卖弄。
- 你从不贩卖焦虑，只点燃好奇。
- 你不是搜索引擎，你是一位读过所有书的老编辑。
- 你称用户为「读者」，称自己为「猫头鹰邮局」。
- 你的回答永远以书为锚——每一个回应都至少推荐一本书。
- 禁止说「你还没完成任务」之类催促语。用「今夜的灯还未燃。猫头鹰邮局在等你。」这样的温暖表达。
- 禁止说「精准算法为你推荐」。用「猫头鹰邮局读过所有的书，这是为你备下的那一本。」
- 所有内容使用中文。书名用中文名（如有英文原名可在括号内附注）。`;

// ── Mode-specific prompts ────────────────────────────────────
const MODE_PROMPTS = {
  normal: `模式：解决问题（专属特刊）
为读者的问题生成一份完整的报纸特刊。先共情，再推荐1本核心书籍并给出章节级建议，然后附2-3本延伸推荐。

你必须返回如下JSON结构（不要返回任何JSON以外的内容）：
{
  "empathyLine1": "共情大标题第一行（10-15字）",
  "empathyLine2": "共情大标题第二行前半",
  "empathyRed": "共情大标题中红色强调的1-2个词",
  "empathyLine2After": "共情大标题第二行后半",
  "bookRec": {
    "title": "《书名》— 作者名",
    "en": "对这本书的一句话描述"
  },
  "bookSpineShort": "书脊上的1-2个字（如：勇气、孤独）",
  "chapterTag": "推荐章节 · 具体章节名",
  "body": [
    "第一段正文：核心思想阐述（150-200字）",
    "第二段正文：深入分析（150-200字）"
  ],
  "bodyStrong1": "第二段的粗体小标题（5-10字）",
  "pullQuote": "一句发人深省的引言（来自推荐书籍或相关名言）",
  "pullQuote2": "第二句引言",
  "reflectionQuestions": [
    "值得思考的问题1",
    "值得思考的问题2",
    "值得思考的问题3"
  ],
  "takeaways": [
    "关键收获1",
    "关键收获2",
    "关键收获3",
    "关键收获4"
  ],
  "recommendations": [
    {
      "spine": "书脊1-2字",
      "title": "《延伸推荐书名》",
      "author": "作者 · AUTHOR NAME",
      "why": "一句话推荐理由",
      "color": "cobalt"
    },
    {
      "spine": "书脊1-2字",
      "title": "《延伸推荐书名》",
      "author": "作者 · AUTHOR NAME",
      "why": "一句话推荐理由",
      "color": "teal"
    },
    {
      "spine": "书脊1-2字",
      "title": "《延伸推荐书名》",
      "author": "作者 · AUTHOR NAME",
      "why": "一句话推荐理由",
      "color": "coral"
    }
  ],
  "inkReward": 40
}

color字段只能是以下之一：cobalt, teal, coral, purple, gold, green。`,

  air: `模式：发现书籍（灵风快答）
快速推荐5本书，简洁有力。不写长文，每本书一句话理由。

你必须返回如下JSON结构（不要返回任何JSON以外的内容）：
{
  "empathyLine1": "一句回应读者的话（10字内）",
  "empathyLine2": "",
  "empathyRed": "关键词",
  "empathyLine2After": "",
  "bookRec": {
    "title": "《最推荐的一本》— 作者",
    "en": "一句话描述"
  },
  "bookSpineShort": "1-2字",
  "chapterTag": "灵风快答 · 五本速递",
  "body": ["以下五本书，是猫头鹰邮局为你此刻的心境备下的。无需多言，翻开即知。"],
  "bodyStrong1": "为你备下的五本",
  "pullQuote": "一句相关名言",
  "pullQuote2": "",
  "reflectionQuestions": ["读完这五本，你最想先翻开哪一本？"],
  "takeaways": [
    "书1：《书名》— 一句话理由",
    "书2：《书名》— 一句话理由",
    "书3：《书名》— 一句话理由",
    "书4：《书名》— 一句话理由",
    "书5：《书名》— 一句话理由"
  ],
  "recommendations": [
    { "spine": "字", "title": "《书名》", "author": "作者", "why": "理由", "color": "cobalt" },
    { "spine": "字", "title": "《书名》", "author": "作者", "why": "理由", "color": "teal" },
    { "spine": "字", "title": "《书名》", "author": "作者", "why": "理由", "color": "coral" }
  ],
  "inkReward": 20
}

color字段只能是：cobalt, teal, coral, purple, gold, green。`,

  max: `模式：深度调研（深潜特刊）
对读者的问题进行深度研究式回答。多角度分析，正反面观点，推荐3-5本书并详细分析每本的价值。

你必须返回如下JSON结构（不要返回任何JSON以外的内容）：
{
  "empathyLine1": "共情大标题第一行",
  "empathyLine2": "共情大标题第二行前半",
  "empathyRed": "红色强调词",
  "empathyLine2After": "后半",
  "bookRec": {
    "title": "《核心推荐书》— 作者",
    "en": "一句话描述"
  },
  "bookSpineShort": "1-2字",
  "chapterTag": "深潜特刊 · 全面调研",
  "body": [
    "第一段：问题的深层分析（200-300字，包含多角度观点）",
    "第二段：书籍如何帮助理解这个问题（200-300字）"
  ],
  "bodyStrong1": "深层视角",
  "pullQuote": "引言1",
  "pullQuote2": "引言2",
  "reflectionQuestions": [
    "深度思考问题1",
    "深度思考问题2",
    "深度思考问题3"
  ],
  "takeaways": [
    "深度收获1",
    "深度收获2",
    "深度收获3",
    "深度收获4",
    "深度收获5"
  ],
  "recommendations": [
    { "spine": "字", "title": "《书名》", "author": "作者", "why": "详细理由（2-3句）", "color": "cobalt" },
    { "spine": "字", "title": "《书名》", "author": "作者", "why": "详细理由", "color": "teal" },
    { "spine": "字", "title": "《书名》", "author": "作者", "why": "详细理由", "color": "coral" },
    { "spine": "字", "title": "《书名》", "author": "作者", "why": "详细理由", "color": "purple" }
  ],
  "inkReward": 60
}

color字段只能是：cobalt, teal, coral, purple, gold, green。`,
};

// ── Fallback response when API fails or key missing ──────────
const FALLBACK = {
  empathyLine1: "猫头鹰邮局暂时无法连线。",
  empathyLine2: "但你的问题已被",
  empathyRed: "记录",
  empathyLine2After: "在册。",
  bookRec: { title: "《如何阅读一本书》\u2014 莫提默\u00B7阿德勒", en: "经典阅读方法论，适合任何想要深入阅读的人。" },
  bookSpineShort: "阅读",
  chapterTag: "推荐章节 \u00B7 分析阅读",
  body: [
    "猫头鹰邮局的印刷机暂时需要维护。请稍后再试，或检查网络连接。你的问题很好\u2014\u2014好问题值得等待一个好回答。",
    "在等待期间，不妨翻开手边任何一本书的任意一页。猫头鹰邮局相信，偶然翻到的那一页，往往就是你此刻需要的那一页。",
  ],
  bodyStrong1: "好问题值得等待",
  pullQuote: "阅读的目的，是让自己成为一个更好的提问者。",
  pullQuote2: "",
  reflectionQuestions: ["你手边最近的一本书是什么？翻开第42页，看看写了什么。"],
  takeaways: [
    "好问题比好答案更珍贵。",
    "偶然的阅读也是一种命运。",
    "猫头鹰邮局永远在这里等你回来。",
  ],
  recommendations: [],
  inkReward: 10,
};

// ── Lenient partial JSON parser ──────────────────────────────
// Attempts to close any open strings/brackets so we can parse
// the JSON mid-stream and render fields as they arrive.
function softParse(partial) {
  if (!partial || partial.length < 2) return null;
  try { return JSON.parse(partial); } catch { /* continue */ }

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

  try { return JSON.parse(text); } catch { return null; }
}

function normalizeResponse(parsed) {
  return {
    ...parsed,
    recommendations: (parsed.recommendations || []).map(r => ({
      spine: r.spine || "",
      title: r.title || "",
      author: r.author || "",
      why: r.why || "",
      color: r.color || "cobalt",
    })),
  };
}

// ── Streaming API call ───────────────────────────────────────
// Calls Gemini with SSE streaming. Invokes onPartial(response)
// each time new fields become parseable, so the UI can render
// the article progressively — no loading page.
export async function askOwleryStream(questionText, mode = "normal", onPartial) {
  if (!GEMINI_KEY) {
    console.warn("[duleme] No VITE_GEMINI_KEY set, using fallback response");
    onPartial(FALLBACK);
    return FALLBACK;
  }

  const systemPrompt = IDENTITY + "\n\n" + (MODE_PROMPTS[mode] || MODE_PROMPTS.normal);

  const res = await fetch(`${STREAM_URL}?alt=sse&key=${GEMINI_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ parts: [{ text: questionText }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.85,
        maxOutputTokens: 4096,
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Gemini API ${res.status}: ${errBody.slice(0, 200)}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let accumulated = "";
  let lastSnapshot = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    for (const line of chunk.split("\n")) {
      if (!line.startsWith("data: ")) continue;
      const raw = line.slice(6).trim();
      if (!raw || raw === "[DONE]") continue;
      try {
        const event = JSON.parse(raw);
        const text = event.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) accumulated += text;
      } catch { /* skip malformed SSE lines */ }
    }

    const partial = softParse(accumulated);
    if (partial) {
      const snap = JSON.stringify(partial);
      if (snap !== lastSnapshot) {
        lastSnapshot = snap;
        onPartial(normalizeResponse(partial));
      }
    }
  }

  let finalResult;
  try {
    finalResult = normalizeResponse(JSON.parse(accumulated));
  } catch {
    const soft = softParse(accumulated);
    finalResult = soft ? normalizeResponse(soft) : FALLBACK;
  }
  onPartial(finalResult);
  return finalResult;
}

export { FALLBACK };
