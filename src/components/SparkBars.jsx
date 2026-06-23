import { colors } from "../constants/theme";

// ── Bar data builders ─────────────────────────────────────────────

/** Rain bars — blue shades, relative to maxP. dayView adds 1px baseline for dry hours. */
export function buildRainBars(values, maxP, { dayView = false } = {}) {
  return values.map((p) => ({
    height: p >= 0.1 ? Math.max(25, (p / maxP) * 100) : 0,
    minHeight: dayView && p < 0.1 ? 1 : 0,
    color: p >= 0.1
      ? (p >= 2 ? "#3B82F6" : p >= 0.5 ? "#60A5FA" : "#93C5FD")
      : `${colors.surfaceBorder}20`,
  }));
}

/** Wind bars — teal/orange by speed thresholds, relative to maxP. */
export function buildWindBars(values, maxP) {
  return values.map((w) => ({
    height: w > 0 ? Math.max(15, (w / maxP) * 100) : 0,
    minHeight: 0,
    color: w >= 25 ? "#F97316" : w >= 15 ? "#34D399" : w >= 8 ? "#6EE7B7" : "#4B5563",
  }));
}

/** Temp bars — colour-coded by value.
 *  Pass range = { min, max } for relative (day overview) scale;
 *  omit for absolute 0-35 °C scale (per-slot). */
export function buildTempBars(values, range) {
  const color = (t) =>
    t >= 30 ? "#EF4444" : t >= 22 ? "#F97316" : t >= 16 ? "#FCD34D" : t >= 8 ? "#6EE7B7" : "#93C5FD";

  if (range) {
    const span = Math.max(range.max - range.min, 1);
    return values.map((t) => ({
      height: t != null ? Math.max(15, ((t - range.min) / span) * 100) : 0,
      minHeight: 0,
      color: t != null ? color(t) : "transparent",
    }));
  }

  return values.map((t) => ({
    height: t != null ? Math.max(15, (Math.max(0, t) / 35) * 100) : 0,
    minHeight: 0,
    color: t != null ? color(t) : "transparent",
  }));
}

// ── Component ─────────────────────────────────────────────────────

/**
 * Tiny sparkline bar chart.
 *
 * bars: Array of { height: 0-100, minHeight?: px, color: string }
 *   — produced by buildRainBars / buildWindBars / buildTempBars
 *
 * showLabels + startH: renders hour numbers below the bars (one per 2 bars).
 */
export default function SparkBars({
  bars,
  height = 8,
  barWidth = 3,
  showLabels = false,
  startH,
}) {
  const numLabels = Math.floor(bars.length / 2);
  return (
    <div>
      <div style={{ display: "flex", gap: 1, height, alignItems: "flex-end" }}>
        {bars.map((bar, i) => (
          <div
            key={i}
            style={{
              width: barWidth,
              flexShrink: 0,
              height: bar.height > 0 ? `${bar.height}%` : 0,
              minHeight: bar.minHeight > 0 ? bar.minHeight : undefined,
              background: bar.color,
              borderRadius: "1px 1px 0 0",
            }}
          />
        ))}
      </div>
      {showLabels && startH != null && (
        <div style={{ display: "flex", gap: 1, marginTop: 1 }}>
          {Array.from({ length: numLabels }, (_, i) => (
            <div
              key={i}
              style={{
                width: 7,
                flexShrink: 0,
                textAlign: "center",
                fontSize: 6,
                lineHeight: 1,
                color: colors.textMuted,
                opacity: 0.55,
              }}
            >
              {startH + i}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
