import { colors } from "../constants/theme";

/** Saved-outfits row shown under the clothing category. */
export default function OutfitsSection({ color, outfits, onNew, onView }) {
  return (
    <div style={{ marginTop: 14, borderTop: `1px solid ${colors.surfaceBorder}`, paddingTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: colors.textMuted, fontSize: 12, fontWeight: 600 }}>
          👗 OUTFITS {outfits.length > 0 && `(${outfits.length})`}
        </span>
        <button
          onClick={onNew}
          style={{ background: color + "20", border: "none", color, borderRadius: 8, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}
        >
          + Nieuwe outfit
        </button>
      </div>

      {outfits.length > 0 && (
        <div style={{ display: "flex", gap: 10, marginTop: 8, overflowX: "auto", paddingBottom: 4 }}>
          {outfits.map((o) => (
            <div key={o.id} onClick={() => onView(o)} style={{ cursor: "pointer", flexShrink: 0, width: 60 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {o.photos.slice(0, 3).map((p, i) => (
                  <img
                    key={i}
                    src={p.data}
                    alt=""
                    style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover", border: `2px solid ${color}`, marginTop: i > 0 ? -10 : 0, zIndex: 3 - i }}
                  />
                ))}
              </div>
              <div style={{ color: colors.textBody, fontSize: 11, marginTop: 4, textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {o.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
