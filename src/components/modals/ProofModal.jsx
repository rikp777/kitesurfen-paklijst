import Modal from "../Modal";
import { colors } from "../../constants/theme";

/**
 * Shows proof photos for a single item or a whole category, and (for items)
 * lets you snap/add a new one. Photo data comes from props; this component
 * just renders and delegates add/delete.
 */
export default function ProofModal({ target, photos, onClose, onAddPhoto, onDeletePhoto }) {
  if (!target) return null;

  const entries =
    target.scope === "category"
      ? target.items.flatMap((it) =>
          (photos[it.id] || []).map((photo, idx) => ({ photo, idx, itemId: it.id, itemText: it.text }))
        )
      : (photos[target.id] || []).map((photo, idx) => ({ photo, idx, itemId: target.id, itemText: null }));

  return (
    <Modal title={`📸 Bewijs foto's — ${target.title}`} onClose={onClose}>
      {entries.length === 0 ? (
        <p style={{ color: colors.textMuted, fontSize: 14, textAlign: "center", padding: "20px 0" }}>
          Nog geen foto's {target.scope === "category" ? "voor deze categorie" : "voor dit item"}
        </p>
      ) : (
        entries.map(({ photo, idx, itemId, itemText }) => (
          <div key={`${itemId}-${idx}`} style={{ marginBottom: 12, borderRadius: 10, overflow: "hidden", border: `1px solid ${colors.border}` }}>
            <img src={photo.data} alt={photo.name} style={{ width: "100%", display: "block", maxHeight: 240, objectFit: "cover" }} />
            <div style={{ background: colors.bg, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: colors.textMuted, fontSize: 11 }}>{itemText ? `${itemText} · ${photo.date}` : photo.date}</span>
              <button
                onClick={() => onDeletePhoto(itemId, idx)}
                style={{ background: "#EF444420", border: "none", color: colors.danger, borderRadius: 6, padding: "3px 10px", fontSize: 12, cursor: "pointer" }}
              >
                Verwijder
              </button>
            </div>
          </div>
        ))
      )}

      {target.scope === "item" && (
        <label
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: target.color + "20",
            border: `1px dashed ${target.color}60`,
            borderRadius: 10,
            padding: "14px",
            cursor: "pointer",
            color: target.color,
            fontWeight: 600,
            fontSize: 14,
            marginTop: 8,
          }}
        >
          📷 Foto toevoegen
          <input
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: "none" }}
            onChange={(e) => onAddPhoto(target.id, e.target.files[0])}
          />
        </label>
      )}
    </Modal>
  );
}
