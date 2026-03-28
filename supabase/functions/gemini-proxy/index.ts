import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const MODEL = "gemini-2.5-flash";
const STREAM_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent`;

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

const MODE_PROMPTS: Record<string, string> = {
  normal: `模式：解决问题（专属特刊）

## 角色
你是猫头鹰邮局的荐书编辑。读者带着人生的困惑或好奇走进来，你的职责是：选出最能解答其问题的一本书，并输出结构化精读内容。

**选书规则（内部使用，不输出）：**
先在脑内对5本候选书打分，取总分最高者：

| 维度 | 分值 | 规则 |
|------|------|------|
| 契合度 | 0–5 | 精准解决=5 / 解决上游问题=3 / 仅相关=1 |
| 销量 | 0 or 3 | 5本中销量最高者得3，其余得0 |
| 评分 | 0 or 2 | 5本中评分最高者得2，其余得0 |

同分时：契合度优先 → 销量次之 → 出版年份最新。

## 内容要求

**共情标题**：一句话点破读者的处境与情绪，作为文章大标题。

**核心思想（body[0]，150-200字）**：本章主干逻辑——作者试图传达什么，而非要点罗列。

**重要观点与案例（bodyStrong1 + body[1]，合计150-200字）**：
- bodyStrong1：关键观点标题（5-10字）
- body[1]：用作者的表达逻辑说明，配以作者使用的案例、故事、实验或类比，关键原文酌情引用；无案例处也需清晰解释

**引言（pullQuote, pullQuote2）**：来自书籍或相关名言，发人深省。

**值得思考的问题（reflectionQuestions）**：3个挑战固有认知、促发深层反思的问题与洞见。

**关键收获（takeaways）**：必须记住的内容——实用、有记忆点、易回忆。4条。

字数要求：核心思想 + 重要观点合计不少于300字。

**延伸推荐（recommendations，必须3本）**：每本附差异化说明（"如果你更关注X而非Y，这本更适合"形式）。❌ 禁止"这本也不错"等无效描述。

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
    "核心思想（150-200字）",
    "重要观点与案例（150-200字）"
  ],
  "bodyStrong1": "重要观点标题（5-10字）",
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
      "why": "差异化推荐理由（如果你更关注X，这本更适合）",
      "color": "cobalt"
    },
    {
      "spine": "书脊1-2字",
      "title": "《延伸推荐书名》",
      "author": "作者 · AUTHOR NAME",
      "why": "差异化推荐理由",
      "color": "teal"
    },
    {
      "spine": "书脊1-2字",
      "title": "《延伸推荐书名》",
      "author": "作者 · AUTHOR NAME",
      "why": "差异化推荐理由",
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

function getSupabase() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

let cachedGeminiKey: string | null = null;

async function getGeminiKey(): Promise<string> {
  if (cachedGeminiKey) return cachedGeminiKey;

  const { data, error } = await getSupabase()
    .from("app_config")
    .select("value")
    .eq("key", "GEMINI_API_KEY")
    .maybeSingle();

  if (error || !data?.value) {
    throw new Error("Gemini API key not configured");
  }

  cachedGeminiKey = data.value;
  return cachedGeminiKey!;
}

async function hashQuestion(question: string, mode: string): Promise<string> {
  const normalized = `${mode}:${question.trim().toLowerCase()}`;
  const encoded = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function getCachedResponse(
  questionHash: string
): Promise<Record<string, unknown> | null> {
  const { data, error } = await getSupabase()
    .from("cached_responses")
    .select("response_json, created_at, ttl_hours")
    .eq("question_hash", questionHash)
    .maybeSingle();

  if (error || !data) return null;

  const createdAt = new Date(data.created_at).getTime();
  const ttlMs = (data.ttl_hours as number) * 60 * 60 * 1000;
  if (Date.now() - createdAt > ttlMs) return null;

  return data.response_json as Record<string, unknown>;
}

function writeCacheInBackground(
  questionHash: string,
  mode: string,
  questionText: string,
  responseJson: Record<string, unknown>
) {
  const promise = getSupabase()
    .from("cached_responses")
    .upsert(
      {
        question_hash: questionHash,
        mode,
        question_text: questionText,
        response_json: responseJson,
        created_at: new Date().toISOString(),
        ttl_hours: 72,
      },
      { onConflict: "question_hash" }
    )
    .then(({ error }) => {
      if (error) console.error("[cache-write]", error.message);
    });

  EdgeRuntime.waitUntil(promise);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { question, mode = "normal" } = await req.json();

    if (
      !question ||
      typeof question !== "string" ||
      question.trim().length === 0
    ) {
      return new Response(
        JSON.stringify({ error: "question is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const questionHash = await hashQuestion(question, mode);

    const cached = await getCachedResponse(questionHash);
    if (cached) {
      const ssePayload = `data: ${JSON.stringify({
        candidates: [
          { content: { parts: [{ text: JSON.stringify(cached) }] } },
        ],
      })}\n\ndata: [DONE]\n\n`;

      return new Response(ssePayload, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "X-Cache": "HIT",
        },
      });
    }

    const geminiKey = await getGeminiKey();
    const systemPrompt =
      IDENTITY + "\n\n" + (MODE_PROMPTS[mode] || MODE_PROMPTS.normal);

    const geminiRes = await fetch(`${STREAM_URL}?alt=sse&key=${geminiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: question.trim() }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.85,
          maxOutputTokens: 4096,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return new Response(
        JSON.stringify({
          error: `Gemini API ${geminiRes.status}: ${errText.slice(0, 300)}`,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const [streamForClient, streamForCache] =
      geminiRes.body!.tee();

    const cachePromise = (async () => {
      const reader = streamForCache.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

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
          } catch {
            /* skip */
          }
        }
      }

      try {
        const parsed = JSON.parse(accumulated);
        writeCacheInBackground(questionHash, mode, question.trim(), parsed);
      } catch {
        /* response wasn't valid JSON, don't cache */
      }
    })();

    EdgeRuntime.waitUntil(cachePromise);

    return new Response(streamForClient, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Cache": "MISS",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Internal error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
