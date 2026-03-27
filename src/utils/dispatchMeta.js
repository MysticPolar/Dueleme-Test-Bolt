const STORAGE_KEY = "duleme-tag-seen-articles";

export function tagKeyForDispatch(q) {
  if (!q) return "特刊";
  if (q.type && q.type !== "你的提问") return q.type;
  return String(q.tag || "特刊");
}

export function articleTagLabel(q) {
  if (!q) return "特刊";
  if (q.type && q.type !== "你的提问") return q.type;
  return q.tag || "特刊";
}

/** Stable id for deduping「同一篇」：卡片用 id，输入框用正文。 */
export function articleInstanceKey(q) {
  if (!q) return "unknown";
  if (q.id != null && q.id !== "") return `id:${q.id}`;
  const zh = (q.zh || "").trim();
  if (zh) return `zh:${zh}`;
  return `t:${Date.now()}`;
}

/** @returns {Record<string, string[]>} tag -> 已计入卷数的篇目 key */
export function loadTagSeenArticles() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {};
}

export function persistTagSeenArticles(v) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  } catch (e) {}
}
