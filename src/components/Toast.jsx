import { colors } from "../constants/theme";

/** Floating status message. Purely presentational. */
export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        top: "calc(env(safe-area-inset-top, 0px) + 20px)",
        left: "50%",
        transform: "translateX(-50%)",
        background: colors.surface,
        color: colors.text,
        borderRadius: 12,
        padding: "10px 20px",
        fontSize: 14,
        fontWeight: 600,
        zIndex: 999,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {message}
    </div>
  );
}
