import Modal from "../Modal";
import { colors } from "../../constants/theme";

/** Read-only view of a saved outfit with a delete action. */
export default function OutfitViewModal({ outfit, onClose, onDelete }) {
  if (!outfit) return null;
  return (
    <Modal title={`👗 ${outfit.name}`} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginBottom: 16, background: colors.bg, borderRadius: 12, padding: 16 }}>
        {outfit.photos.map((p, i) => (
          <img key={i} src={p.data} alt={p.itemText} style={{ width: 140, maxWidth: "60%", aspectRatio: "1", borderRadius: 10, objectFit: "cover", border: `1px solid ${colors.border}` }} />
        ))}
      </div>
      <p style={{ color: colors.textMuted, fontSize: 12, marginBottom: 12 }}>{outfit.createdAt}</p>
      <button
        onClick={() => onDelete(outfit.id)}
        style={{ width: "100%", background: "#EF444420", border: "1px solid #EF444460", color: colors.danger, borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
      >
        Verwijder outfit
      </button>
    </Modal>
  );
}
