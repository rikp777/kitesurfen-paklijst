import { useEffect, useState } from "react";

const PIECES = 80;
const COLORS = ["#0EA5E9", "#34D399", "#F59E0B", "#EC4899", "#8B5CF6", "#7DD3FC"];

/**
 * Lightweight dependency-free confetti burst, shown once when the list hits
 * 100%. Renders nothing after the animation finishes.
 */
export default function Confetti({ fire }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!fire) return;
    setActive(true);
    const t = setTimeout(() => setActive(false), 3500);
    return () => clearTimeout(t);
  }, [fire]);

  if (!active) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 500, overflow: "hidden" }}>
      <style>{`@keyframes kite-fall{0%{transform:translateY(-10vh) rotate(0);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}`}</style>
      {Array.from({ length: PIECES }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const dur = 2.4 + Math.random() * 1.1;
        const size = 6 + Math.random() * 8;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: `${left}%`,
              width: size,
              height: size * 0.5,
              background: COLORS[i % COLORS.length],
              borderRadius: 2,
              animation: `kite-fall ${dur}s ${delay}s ease-in forwards`,
            }}
          />
        );
      })}
    </div>
  );
}
