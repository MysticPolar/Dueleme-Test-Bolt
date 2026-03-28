import { askOwleryStreamMock } from "./gemini-mock.js";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const PROXY_URL = `${SUPABASE_URL}/functions/v1/gemini-proxy`;

const FALLBACK = {
  empathyLine1: "\u732B\u5934\u9E70\u90AE\u5C40\u6682\u65F6\u65E0\u6CD5\u8FDE\u7EBF\u3002",
  empathyLine2: "\u4F46\u4F60\u7684\u95EE\u9898\u5DF2\u88AB",
  empathyRed: "\u8BB0\u5F55",
  empathyLine2After: "\u5728\u518C\u3002",
  bookRec: { title: "\u300A\u5982\u4F55\u9605\u8BFB\u4E00\u672C\u4E66\u300B\u2014 \u83AB\u63D0\u9ED8\u00B7\u963F\u5FB7\u52D2", en: "\u7ECF\u5178\u9605\u8BFB\u65B9\u6CD5\u8BBA\uFF0C\u9002\u5408\u4EFB\u4F55\u60F3\u8981\u6DF1\u5165\u9605\u8BFB\u7684\u4EBA\u3002" },
  bookSpineShort: "\u9605\u8BFB",
  chapterTag: "\u63A8\u8350\u7AE0\u8282 \u00B7 \u5206\u6790\u9605\u8BFB",
  body: [
    "\u732B\u5934\u9E70\u90AE\u5C40\u7684\u5370\u5237\u673A\u6682\u65F6\u9700\u8981\u7EF4\u62A4\u3002\u8BF7\u7A0D\u540E\u518D\u8BD5\uFF0C\u6216\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u3002\u4F60\u7684\u95EE\u9898\u5F88\u597D\u2014\u2014\u597D\u95EE\u9898\u503C\u5F97\u7B49\u5F85\u4E00\u4E2A\u597D\u56DE\u7B54\u3002",
    "\u5728\u7B49\u5F85\u671F\u95F4\uFF0C\u4E0D\u59A8\u7FFB\u5F00\u624B\u8FB9\u4EFB\u4F55\u4E00\u672C\u4E66\u7684\u4EFB\u610F\u4E00\u9875\u3002\u732B\u5934\u9E70\u90AE\u5C40\u76F8\u4FE1\uFF0C\u5076\u7136\u7FFB\u5230\u7684\u90A3\u4E00\u9875\uFF0C\u5F80\u5F80\u5C31\u662F\u4F60\u6B64\u523B\u9700\u8981\u7684\u90A3\u4E00\u9875\u3002",
  ],
  bodyStrong1: "\u597D\u95EE\u9898\u503C\u5F97\u7B49\u5F85",
  pullQuote: "\u9605\u8BFB\u7684\u76EE\u7684\uFF0C\u662F\u8BA9\u81EA\u5DF1\u6210\u4E3A\u4E00\u4E2A\u66F4\u597D\u7684\u63D0\u95EE\u8005\u3002",
  pullQuote2: "",
  reflectionQuestions: ["\u4F60\u624B\u8FB9\u6700\u8FD1\u7684\u4E00\u672C\u4E66\u662F\u4EC0\u4E48\uFF1F\u7FFB\u5F00\u7B2C42\u9875\uFF0C\u770B\u770B\u5199\u4E86\u4EC0\u4E48\u3002"],
  takeaways: [
    "\u597D\u95EE\u9898\u6BD4\u597D\u7B54\u6848\u66F4\u73CD\u8D35\u3002",
    "\u5076\u7136\u7684\u9605\u8BFB\u4E5F\u662F\u4E00\u79CD\u547D\u8FD0\u3002",
    "\u732B\u5934\u9E70\u90AE\u5C40\u6C38\u8FDC\u5728\u8FD9\u91CC\u7B49\u4F60\u56DE\u6765\u3002",
  ],
  recommendations: [],
  inkReward: 10,
};

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

export async function askOwleryStream(questionText, mode = "normal", onPartial) {
  if (USE_MOCK) {
    return askOwleryStreamMock(questionText, mode, onPartial);
  }

  if (!SUPABASE_URL) {
    console.warn("[duleme] No VITE_SUPABASE_URL set, using fallback response");
    onPartial(FALLBACK);
    return FALLBACK;
  }

  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "apikey": SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ question: questionText, mode }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Gemini proxy ${res.status}: ${errBody.slice(0, 200)}`);
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
