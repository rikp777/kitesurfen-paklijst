import { colors } from "../constants/theme";

/** Horizontal thumbnail strip of all proof photos in a category. */
export default function PhotoStrip({ color, count, thumbs, onOpenAll }) {
  return (
    <div style={{ marginTop: 14, borderTop: `1px solid ${colors.surfaceBorder}`, paddingTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: colors.textMuted, fontSize: 12, fontWeight: 600 }}>
          📸 ALLE BEWIJS FOTO'S ({count})
        </span>
        <button
          onClick={onOpenAll}
          style={{ background: color + "20", border: "none", color, borderRadius: 8, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}
        >
          Bekijk alle
        </button>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8, overflowX: "auto", paddingBottom: 4 }}>
        {thumbs.map(({ photo, key }) => (
          <img
            key={key}
            src={photo.data}
            alt="bewijs"
            onClick={onOpenAll}
            style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover", flexShrink: 0, border: `2px solid ${color}40`, cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
}
