import { colors } from "../constants/theme";

/** Controlled search input to filter items by text. */
export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: "relative", marginBottom: 12 }}>
      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>
        🔍
      </span>
      <input
        type="search"
        inputMode="search"
        placeholder="Zoek een item… (bv. zonnebrand)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          background: colors.surface,
          border: `1px solid ${colors.surfaceBorder}`,
          borderRadius: 12,
          padding: "11px 14px 11px 36px",
          color: colors.text,
          fontSize: 14,
          boxSizing: "border-box",
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Zoekopdracht wissen"
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: colors.textMuted,
            fontSize: 16,
            cursor: "pointer",
            padding: 4,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
