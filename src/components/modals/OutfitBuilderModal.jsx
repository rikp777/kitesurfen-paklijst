import { useState } from "react";
import Modal from "../Modal";
import { colors } from "../../constants/theme";

/**
 * Compose an outfit from uploaded clothing photos. Owns its own draft state
 * (selected pieces + name) and only calls back with the finished outfit,
 * keeping the parent free of transient builder bookkeeping.
 */
export default function OutfitBuilderModal({ category, photos, onClose, onSave }) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);

  const color = category.color;
  const pieces = category.items.flatMap((it) =>
    (photos[it.id] || []).map((photo, idx) => ({ itemId: it.id, idx, itemText: it.text, data: photo.data }))
  );

  const isSelected = (itemId, idx) => selected.some((p) => p.itemId === itemId && p.idx === idx);

  const togglePiece = (piece) =>
    setSelected((prev) =>
      isSelected(piece.itemId, piece.idx)
        ? prev.filter((p) => !(p.itemId === piece.itemId && p.idx === piece.idx))
        : [...prev, piece]
    );

  const move = (index, dir) =>
    setSelected((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const canSave = name.trim() && selected.length > 0;

  return (
    <Modal title="👗 Nieuwe outfit" onClose={onClose} maxHeight="85vh">
      {pieces.length === 0 ? (
        <p style={{ color: colors.textMuted, fontSize: 14, textAlign: "center", padding: "20px 0" }}>
          Upload eerst foto's bij kledingitems om outfits samen te stellen.
        </p>
      ) : (
        <>
          {selected.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ color: colors.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 8 }}>OUTFIT (BOVEN → ONDER)</div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: colors.bg, borderRadius: 12, padding: 12 }}>
                {selected.map((p, i) => (
                  <div key={`${p.itemId}-${p.idx}`} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
                    <img src={p.data} alt="" style={{ width: 72, height: 72, borderRadius: 10, objectFit: "cover", border: `2px solid ${color}`, margin: "0 auto" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <button onClick={() => move(i, -1)} disabled={i === 0} style={arrowBtn(i === 0)}>▲</button>
                      <button onClick={() => move(i, 1)} disabled={i === selected.length - 1} style={arrowBtn(i === selected.length - 1)}>▼</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ color: colors.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 8 }}>KIES KLEDINGSTUKKEN</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
            {pieces.map((p) => (
              <div key={`${p.itemId}-${p.idx}`} onClick={() => togglePiece(p)} style={{ position: "relative", cursor: "pointer" }}>
                <img
                  src={p.data}
                  alt={p.itemText}
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: 10,
                    objectFit: "cover",
                    border: `2px solid ${isSelected(p.itemId, p.idx) ? color : colors.border}`,
                    opacity: isSelected(p.itemId, p.idx) ? 1 : 0.6,
                  }}
                />
                {isSelected(p.itemId, p.idx) && (
                  <div style={{ position: "absolute", top: 4, right: 4, background: color, color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>

          <input
            type="text"
            placeholder="Naam van deze outfit (bv. Avond uit eten)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: 10, padding: "10px 12px", color: colors.text, fontSize: 14, marginBottom: 12, boxSizing: "border-box" }}
          />

          <button
            onClick={() => onSave(name, selected)}
            disabled={!canSave}
            style={{ width: "100%", background: color, border: "none", borderRadius: 10, padding: "12px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: canSave ? 1 : 0.5 }}
          >
            💾 Outfit opslaan
          </button>
        </>
      )}
    </Modal>
  );
}

const arrowBtn = (disabled) => ({
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  color: disabled ? colors.border : colors.textBody,
  borderRadius: 6,
  width: 22,
  height: 18,
  fontSize: 10,
  cursor: disabled ? "default" : "pointer",
});
