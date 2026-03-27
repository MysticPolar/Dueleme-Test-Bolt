// ═══════════════════════════════════════════════════════════════
// 读了么 · Oracle Dispatch — AI-powered article layout
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { COLORS, FONTS as F, TEXTURES, CARD_COLORS, SPACE, LAYOUT } from "../styles/tokens.js";
import { CoinIcon } from "./Primitives.jsx";
import { articleTagLabel } from "../utils/dispatchMeta.js";

function RuleOrnate() {
  return (
    <div style={{
      border: "none", borderTop: `1px solid ${COLORS.rule}`,
      position: "relative", margin: "16px 0",
    }}>
      <span style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        background: COLORS.paper, padding: "0 10px",
        fontSize: 10, color: COLORS.muted,
      }}>{"\u25C6"}</span>
    </div>
  );
}

// ── Fade-in wrapper for streaming sections ───────────────────
function StreamIn({ children, visible }) {
  if (!visible) return null;
  return (
    <div style={{ animation: "duleme-fade-up 0.4s ease both" }}>
      {children}
    </div>
  );
}

export default function OracleDispatch({ question, onClose, onRetry, issueKan = 1, issueJuan = 0 }) {
  const [visible, setVisible] = useState(false);
  const [stamped, setStamped] = useState(false);
  const [followUp, setFollowUp] = useState("");

  const isStreaming = question?.streaming;
  const hasError = question?.error && !question?.response?.empathyLine1;
  const R = question?.response || null;
  const isDone = R && !isStreaming;

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (!isDone) return;
    const t = setTimeout(() => setStamped(true), 600);
    return () => clearTimeout(t);
  }, [isDone]);

  const handleSendFollowUp = () => {
    const text = followUp.trim();
    onClose();
    if (text) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("duleme-prefill-send", { detail: { text, mode: "normal" } }));
      }, 120);
    }
  };

  const accentColor = CARD_COLORS[question?.color] || COLORS.coral;
  const tagLabel = articleTagLabel(question);
  const inkAmt = R?.inkReward ?? 40;

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 200,
      ...TEXTURES.paper,
      overflow: "auto",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.45s ease, transform 0.45s ease",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 60%, rgba(26,18,8,0.10) 100%)",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Masthead */}
        <div style={{
          borderBottom: `3px double ${COLORS.rule}`,
          padding: "12px 16px 10px", textAlign: "center",
        }}>
          <div style={{
            fontFamily: F.ui, fontSize: 10, letterSpacing: 4,
            color: COLORS.muted, marginBottom: SPACE[2],
          }}>
            {"\u4EE5\u4E66\u89E3\u60D1 \u00B7 \u4E3A\u4F60\u5370\u5237 \u00B7 \u5373\u65F6\u51FA\u7248"}
          </div>
          <div style={{
            fontFamily: F.chinese, fontWeight: 900, fontSize: 36, color: COLORS.ink,
            lineHeight: 1, letterSpacing: 8,
            display: "flex", justifyContent: "center", alignItems: "baseline",
          }}>
            <span>{"\u8BFB\u4E86"}</span>
            <span style={{
              color: COLORS.red, display: "inline-block", overflow: "hidden",
              maxWidth: stamped ? "0px" : "2.5em",
              transition: "max-width 0s ease 0.58s",
              animation: stamped ? "duleme-erase 0.55s ease forwards" : "none",
            }}>{"\u4E48"}</span>
          </div>
        </div>

        {/* AI card */}
        <div style={{
          margin: "16px 0 0", overflow: "hidden",
          animation: "duleme-fade-up 0.6s ease both",
        }}>
          {/* Header bar */}
          <div style={{
            background: COLORS.ink, color: COLORS.paperAged,
            padding: "9px 18px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            borderBottom: "2px solid rgba(201,162,39,0.35)",
          }}>
            <span style={{ fontFamily: F.chinese, fontWeight: 700, fontSize: 12, letterSpacing: 3 }}>
              {"\u732B\u5934\u9E70\u90AE\u5C40 \u00B7 \u72EC\u5BB6\u4E13\u520A"}
            </span>
            <span style={{ fontFamily: F.ui, fontSize: 10, letterSpacing: 2, opacity: 0.5, whiteSpace: "nowrap" }}>
              {"\u7B2C"}{issueKan}{"\u520A"} {tagLabel} {"\u7B2C"}{issueJuan}{"\u5377"}
            </span>
          </div>

          {/* User question */}
          <div style={{
            background: COLORS.paperDark, padding: "10px 18px",
            borderBottom: "1px solid rgba(42,31,14,0.18)",
            display: "flex", alignItems: "baseline", gap: 10, position: "relative",
          }}>
            <span style={{
              fontFamily: F.ui, fontSize: 10, letterSpacing: 3,
              color: COLORS.muted, flexShrink: 0, opacity: 0.7,
            }}>
              {"\u8BFB\u8005\u6765\u51FD"}
            </span>
            <span style={{
              fontFamily: F.chinese, fontSize: 12, lineHeight: 1.8,
              color: COLORS.ink, letterSpacing: 0.5, flex: 1,
            }}>
              {question?.zh || "\u4F60\u7684\u95EE\u9898"}
            </span>
            {stamped && R && (
              <div style={{
                flexShrink: 0, border: `2px solid ${COLORS.red}`,
                padding: "3px 8px", transform: "rotate(-3deg)",
                animation: "duleme-stamp 0.4s ease both", alignSelf: "center",
              }}>
                <div style={{ fontFamily: F.ui, fontSize: 10, fontWeight: 700, letterSpacing: 3, color: COLORS.red, lineHeight: 1.3 }}>{"\u5DF2\u7B7E\u53D1"}</div>
                <div style={{ fontFamily: F.ui, fontSize: 10, color: COLORS.red, opacity: 0.7, letterSpacing: 1, lineHeight: 1.3 }}>{"\u732B\u5934\u9E70\u90AE\u5C40"}</div>
              </div>
            )}
          </div>

          {/* Waiting indicator — subtle, inline, not a full loading page */}
          {!R && !hasError && (
            <div style={{
              padding: "18px 20px", fontFamily: F.chinese, fontSize: 13,
              color: COLORS.muted, letterSpacing: 1, lineHeight: 2,
              animation: "duleme-shimmer 2s ease-in-out infinite",
            }}>
              {"\u732B\u5934\u9E70\u90AE\u5C40\u6B63\u5728\u6392\u7248\u2026"}
            </div>
          )}

          {/* Error state without fallback */}
          {hasError && (
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <div style={{ fontFamily: F.chinese, fontWeight: 900, fontSize: 18, color: COLORS.ink, marginBottom: 12 }}>
                {"\u5370\u5237\u673A\u6682\u65F6\u6545\u969C"}
              </div>
              <div style={{ fontFamily: F.chinese, fontSize: 12, color: COLORS.muted, marginBottom: 20, lineHeight: 2 }}>
                {question.error}
              </div>
              <button onClick={onRetry} style={{
                fontFamily: F.ui, fontSize: 10, fontWeight: 700, letterSpacing: 2,
                padding: `${SPACE[3]}px ${SPACE[5]}px`,
                minHeight: LAYOUT.minTouchTarget,
                background: COLORS.ink, color: COLORS.goldLight,
                border: "none", cursor: "pointer",
              }}>
                {"\u91CD\u65B0\u53D1\u62A5 \u2192"}
              </button>
            </div>
          )}

          {/* Article body — sections stream in as data arrives */}
          {R && (
            <div style={{ padding: "18px 20px 16px" }}>
              {/* Empathy headline */}
              <StreamIn visible={R.empathyLine1}>
                <div style={{
                  fontFamily: F.chinese, fontWeight: 900, fontSize: 20, lineHeight: 1.5,
                  letterSpacing: 3, color: COLORS.ink,
                  borderBottom: "1px solid rgba(42,31,14,0.12)",
                  paddingBottom: 10, marginBottom: 14,
                }}>
                  {R.empathyLine1}
                  {R.empathyLine2 && <><br />{R.empathyLine2}</>}
                  {R.empathyRed && <span style={{ color: COLORS.red }}>{R.empathyRed}</span>}
                  {R.empathyLine2After}
                </div>
              </StreamIn>

              {/* Book block */}
              <StreamIn visible={R.bookRec?.title}>
                <div style={{
                  display: "flex", gap: 14, marginBottom: 14, paddingBottom: 14,
                  borderBottom: `1.5px double ${COLORS.rule}`, alignItems: "flex-start",
                }}>
                  <div style={{
                    width: 36, height: 52, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: F.chinese, fontSize: 10, fontWeight: 700,
                    color: COLORS.paper, writingMode: "vertical-rl", letterSpacing: 3,
                    background: accentColor,
                  }}>
                    {R.bookSpineShort}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: F.chinese, fontWeight: 700, fontSize: 14, letterSpacing: 2, color: COLORS.ink }}>
                      {(R.bookRec?.title || "").split("\u2014")[0]?.trim()}
                    </div>
                    <div style={{ fontFamily: F.ui, fontSize: 10, letterSpacing: 2, color: COLORS.muted, marginTop: SPACE[1], opacity: 0.8 }}>
                      {(R.bookRec?.title || "").includes("\u2014") ? `${(R.bookRec?.title || "").split("\u2014")[1]?.trim()} \u00B7 ` : ""}
                      {R.bookRec?.en}
                    </div>
                    {R.chapterTag && <div style={{
                      display: "inline-block", marginTop: SPACE[2],
                      fontFamily: F.ui, fontSize: 10, letterSpacing: 3, color: COLORS.paper,
                      background: COLORS.ink, padding: `${SPACE[1]}px ${SPACE[3]}px`,
                    }}>{R.chapterTag}</div>}
                  </div>
                </div>
              </StreamIn>

              {/* Section 1 */}
              <StreamIn visible={R.body?.[0]}>
                <div style={{
                  fontFamily: F.ui, fontWeight: 700, fontSize: 10, letterSpacing: 4,
                  color: COLORS.paper, background: COLORS.muted,
                  display: "inline-block", padding: `${SPACE[1]}px ${SPACE[3]}px`, marginBottom: SPACE[3],
                }}>{"\u58F9 \u00B7 \u6838\u5FC3\u601D\u60F3"}</div>
                <div style={{
                  fontFamily: F.chinese, fontSize: 12, lineHeight: 2.2,
                  color: COLORS.ink, letterSpacing: 0.4, marginBottom: 14,
                }}>{R.body?.[0]}</div>
              </StreamIn>

              {/* Section 2 */}
              <StreamIn visible={R.body?.[1]}>
                <div style={{
                  fontFamily: F.ui, fontWeight: 700, fontSize: 10, letterSpacing: 4,
                  color: COLORS.paper, background: COLORS.muted,
                  display: "inline-block", padding: `${SPACE[1]}px ${SPACE[3]}px`, marginBottom: SPACE[3],
                }}>{"\u8D30 \u00B7 \u91CD\u8981\u89C2\u70B9"}</div>
                <div style={{
                  fontFamily: F.chinese, fontSize: 12, lineHeight: 2.2,
                  color: COLORS.ink, letterSpacing: 0.4, marginBottom: 14,
                }}>
                  {R.bodyStrong1 && <><strong style={{ fontWeight: 700 }}>{R.bodyStrong1}</strong><br /><br /></>}
                  {R.body?.[1]}
                </div>
              </StreamIn>

              {/* Pull quotes */}
              <StreamIn visible={R.pullQuote}>
                <div style={{
                  borderLeft: `3px solid ${COLORS.rule}`, padding: "10px 16px", margin: "12px 0",
                  background: COLORS.paperDark, fontFamily: F.chinese, fontSize: 12,
                  lineHeight: 2, color: COLORS.muted, fontStyle: "italic", letterSpacing: 0.5,
                }}>{R.pullQuote}</div>
              </StreamIn>
              <StreamIn visible={R.pullQuote2}>
                <div style={{
                  borderLeft: `3px solid ${COLORS.rule}`, padding: "10px 16px", margin: "12px 0",
                  background: COLORS.paperDark, fontFamily: F.chinese, fontSize: 12,
                  lineHeight: 2, color: COLORS.muted, fontStyle: "italic", letterSpacing: 0.5,
                }}>{R.pullQuote2}</div>
              </StreamIn>

              <StreamIn visible={R.reflectionQuestions?.length}>
                <RuleOrnate />
                <div style={{
                  fontFamily: F.ui, fontWeight: 700, fontSize: 10, letterSpacing: 4,
                  color: COLORS.paper, background: COLORS.muted,
                  display: "inline-block", padding: `${SPACE[1]}px ${SPACE[3]}px`, marginBottom: SPACE[3],
                }}>{"\u53C1 \u00B7 \u503C\u5F97\u601D\u8003\u7684\u95EE\u9898"}</div>
                <div style={{
                  fontFamily: F.chinese, fontSize: 12, lineHeight: 2.2,
                  color: COLORS.ink, letterSpacing: 0.4, marginBottom: 14,
                }}>
                  {(R.reflectionQuestions || []).map((q, i) => (
                    <span key={i}>{q}<br /></span>
                  ))}
                </div>
              </StreamIn>

              {/* Takeaways */}
              <StreamIn visible={R.takeaways?.length}>
                <div style={{
                  fontFamily: F.ui, fontWeight: 700, fontSize: 10, letterSpacing: 4,
                  color: COLORS.paper, background: COLORS.muted,
                  display: "inline-block", padding: `${SPACE[1]}px ${SPACE[3]}px`, marginBottom: SPACE[3],
                }}>{"\u8086 \u00B7 \u5173\u952E\u6536\u83B7"}</div>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: 14 }}>
                  {(R.takeaways || []).map((line, i) => (
                    <li key={i} style={{
                      fontFamily: F.chinese, fontSize: 12, lineHeight: 2, color: COLORS.ink,
                      padding: "6px 0 6px 18px", position: "relative",
                      borderBottom: i < (R.takeaways?.length || 0) - 1 ? "1px solid rgba(42,31,14,0.08)" : "none",
                      letterSpacing: 0.4,
                      animation: "duleme-fade-up 0.3s ease both",
                    }}>
                      <span style={{ position: "absolute", left: 0, top: 10, color: COLORS.gold, fontSize: 8 }}>{"\u25C6"}</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </StreamIn>

              {/* Recommendations */}
              <StreamIn visible={R.recommendations?.length > 0}>
                <RuleOrnate />
                <div style={{
                  fontFamily: F.ui, fontWeight: 700, fontSize: 10, letterSpacing: 4,
                  color: COLORS.paper, background: COLORS.ink,
                  display: "inline-block", padding: `${SPACE[1]}px ${SPACE[3]}px`, marginBottom: SPACE[3],
                }}>{"\u5EF6\u4F38\u63A8\u8350 \u00B7 \u5907\u9009\u4E66\u76EE"}</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {(R.recommendations || []).map((rec, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: 12,
                      padding: "12px 0",
                      borderBottom: i < R.recommendations.length - 1 ? "1px solid rgba(42,31,14,0.12)" : "none",
                      animation: `duleme-fade-up 0.4s ease ${i * 0.1}s both`,
                    }}>
                      <div style={{
                        width: 28, height: 40, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: F.chinese, fontSize: 10, fontWeight: 700,
                        color: COLORS.paper, writingMode: "vertical-rl", letterSpacing: 2,
                        background: CARD_COLORS[rec.color] || COLORS.cobalt,
                      }}>{rec.spine}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: F.chinese, fontWeight: 700, fontSize: 13, color: COLORS.ink, letterSpacing: 1 }}>{rec.title}</div>
                        <div style={{ fontFamily: F.ui, fontSize: 10, color: COLORS.muted, letterSpacing: 2, marginTop: 2 }}>{rec.author}</div>
                        <div style={{
                          fontFamily: F.chinese, fontSize: 11, lineHeight: 1.9, color: COLORS.muted,
                          marginTop: 5, letterSpacing: 0.4, fontStyle: "italic",
                        }}>{rec.why}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </StreamIn>
            </div>
          )}

          {/* Action strip — only after stream completes */}
          {isDone && (
            <div style={{
              background: COLORS.ink, color: COLORS.paper,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 18px", gap: 14, flexWrap: "wrap",
              borderTop: "2px solid rgba(201,162,39,0.3)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flex: "1 1 180px", minWidth: 0 }}>
                <CoinIcon size={26} />
                <div>
                  <div style={{ fontFamily: F.display, fontWeight: 900, fontSize: 15, color: COLORS.gold, letterSpacing: 1 }}>
                    +{inkAmt} {"\u58A8\u6C34\u5DF2\u5230\u8D26"}
                  </div>
                  <div style={{
                    fontFamily: F.body, fontStyle: "italic", fontSize: 10, color: COLORS.paperAged,
                    opacity: 0.75, marginTop: 2, lineHeight: 1.45,
                  }}>
                    {"\u300C\u5DF2\u9605\u8BFB\u4E13\u5C5E\u7279\u520A\uFF0C\u58A8\u6C34\u5956\u52B1\u5DF2\u53D1\u653E\u3002\u300D"}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: SPACE[3], flexShrink: 0 }}>
                <button type="button" style={{
                  fontFamily: F.ui, fontSize: 10, letterSpacing: 2,
                  padding: `${SPACE[3]}px ${SPACE[4]}px`, minHeight: LAYOUT.minTouchTarget,
                  cursor: "pointer", background: "transparent", color: COLORS.paperAged,
                  border: "1px solid rgba(232,197,71,0.35)",
                }}>
                  {"\u6536\u85CF\u91D1\u53E5"}
                </button>
                <button type="button" onClick={onClose} style={{
                  fontFamily: F.ui, fontSize: 10, fontWeight: 700, letterSpacing: 2,
                  padding: `${SPACE[3]}px ${SPACE[4]}px`, minHeight: LAYOUT.minTouchTarget,
                  cursor: "pointer", border: "none",
                  background: COLORS.goldLight, color: COLORS.ink,
                }}>
                  {"\u8FD4\u56DE\u9996\u9875 \u2192"}
                </button>
              </div>
            </div>
          )}

          {isDone && (
            <div style={{ borderTop: `1px solid ${COLORS.rule}`, padding: "10px 20px 12px", textAlign: "center" }}>
              <span style={{ fontSize: 11, color: COLORS.muted, letterSpacing: 14 }}>{"\u2726 \u25C6 \u2726"}</span>
            </div>
          )}
        </div>

        {/* Follow-up input — only after stream completes */}
        {isDone && (
          <div style={{ margin: "12px 14px 16px", border: `1.5px solid ${COLORS.rule}`, overflow: "hidden" }}>
            <div style={{
              background: COLORS.paperDark, padding: `${SPACE[2]}px ${SPACE[4]}px`,
              borderBottom: "1px solid rgba(42,31,14,0.18)",
              fontFamily: F.ui, fontSize: 10, letterSpacing: 3, color: COLORS.muted,
            }}>
              {"\u5927\u80C6\u53D1\u95EE \u00B7 \u4F60\u7684\u95EE\u9898\u5C06\u6210\u4E3A\u4ECA\u65E5\u5934\u7248"}
            </div>
            <div style={{ display: "flex", alignItems: "stretch" }}>
              <textarea
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                placeholder={"\u4F60\u6B64\u523B\u6700\u56F0\u6270\u7684\u95EE\u9898\u662F\u4EC0\u4E48\u2026\u2026"}
                rows={3}
                style={{
                  flex: 1, border: "none", background: COLORS.paper,
                  fontFamily: F.chinese, fontSize: 13, color: COLORS.ink,
                  letterSpacing: 0.5, padding: "14px 16px",
                  outline: "none", resize: "none", minHeight: 60,
                }}
              />
              <button type="button" onClick={handleSendFollowUp} style={{
                background: COLORS.ink, color: COLORS.goldLight,
                border: "none", padding: "0 18px", cursor: "pointer",
                fontFamily: F.ui, fontSize: 10, letterSpacing: 2,
                borderLeft: "1px solid rgba(42,31,14,0.3)",
              }}>
                {"\u53D1\u62A5 \u2192"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
