import { colors } from "../constants/theme";

/** Reusable centered modal with backdrop + header. DRY base for all dialogs. */
export default function Modal({ title, onClose, children, maxHeight = "80vh" }) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{ background: colors.surface, borderRadius: 16, padding: 20, maxWidth: 480, width: "100%", maxHeight, overflowY: "auto", border: `1px solid ${colors.border}` }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ color: colors.text, margin: 0, fontSize: 16 }}>{title}</h3>
          <button onClick={onClose} aria-label="Sluiten" style={{ background: "none", border: "none", color: colors.textMuted, fontSize: 20, cursor: "pointer" }}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
