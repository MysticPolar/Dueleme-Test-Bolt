import { useState, useEffect } from "react";
import { COLORS, FONTS as F, TEXTURES } from "../styles/tokens.js";

export default function SplashScreen({ onEnter }) {
  const [visible, setVisible] = useState(false);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      ...TEXTURES.paper,
      position: "relative", overflow: "hidden",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 50%, rgba(26,18,8,0.18) 100%)",
      }} />

      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 4, background: COLORS.ink,
      }} />
      <div style={{
        position: "absolute", top: 4, left: 0, right: 0,
        height: 1, background: COLORS.gold, opacity: 0.6,
      }} />

      <div style={{ position: "relative", zIndex: 2, width: "100%", padding: "0 32px", textAlign: "center" }}>
        <div style={{
          fontFamily: F.ui, fontSize: 9, letterSpacing: 5,
          color: COLORS.muted, marginBottom: 24,
          opacity: 0.7,
        }}>
          猫头鹰邮局 · THE OWLERY PRESS
        </div>

        <div style={{
          fontFamily: F.chinese, fontWeight: 900,
          fontSize: 72, lineHeight: 1,
          letterSpacing: 8, color: COLORS.ink,
          marginBottom: 6,
        }}>
          读了么
        </div>

        <div style={{
          fontFamily: F.body, fontStyle: "italic",
          fontSize: 13, color: COLORS.muted,
          letterSpacing: 2, marginBottom: 4,
        }}>
          Dú Le Me
        </div>

        <div style={{
          fontFamily: F.ui, fontSize: 9, letterSpacing: 4,
          color: COLORS.red, marginBottom: 40,
        }}>
          READ DANGEROUSLY
        </div>

        <div style={{
          width: "100%", borderTop: `1px solid ${COLORS.rule}`,
          opacity: 0.15, marginBottom: 40,
        }} />

        <div style={{
          fontFamily: F.chinese, fontSize: 13, lineHeight: 2,
          color: COLORS.muted, marginBottom: 48,
          letterSpacing: 0.5,
        }}>
          每一个好问题，<br />都值得一本书的回答。
        </div>

        <button
          onMouseDown={() => setPressing(true)}
          onMouseUp={() => setPressing(false)}
          onMouseLeave={() => setPressing(false)}
          onTouchStart={() => setPressing(true)}
          onTouchEnd={() => { setPressing(false); onEnter(); }}
          onClick={onEnter}
          style={{
            fontFamily: F.ui, fontWeight: 700,
            fontSize: 11, letterSpacing: 4,
            padding: "16px 40px",
            background: pressing ? COLORS.muted : COLORS.ink,
            color: COLORS.goldLight,
            border: "none", cursor: "pointer",
            transition: "background 0.15s ease, transform 0.15s ease",
            transform: pressing ? "scale(0.97)" : "scale(1)",
            display: "inline-block",
          }}
        >
          测试入口 →
        </button>

        <div style={{
          marginTop: 48,
          fontFamily: F.ui, fontSize: 8, letterSpacing: 2,
          color: COLORS.muted, opacity: 0.4, lineHeight: 1.8,
        }}>
          仅供内部测试 · INTERNAL BUILD
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 1, background: COLORS.rule, opacity: 0.15,
      }} />
    </div>
  );
}
