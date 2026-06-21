import { colors } from "../constants/theme";
import ChecklistItem from "./ChecklistItem";
import PhotoStrip from "./PhotoStrip";
import OutfitsSection from "./OutfitsSection";

/**
 * One collapsible category. Composes the item rows plus the optional
 * photo strip and (for clothing) the outfits section. Stateless: open
 * state, checked state and photos all arrive as props.
 */
export default function CategoryCard({
  category,
  items,
  isOpen,
  onToggleOpen,
  isChecked,
  onToggleItem,
  photoCountFor,
  photoThumbs,
  photoTotal,
  onOpenItemPhotos,
  onOpenCategoryPhotos,
  outfitsSlot,
}) {
  const { color } = category;
  const doneCount = items.filter((i) => isChecked(i.id)).length;
  const allDone = doneCount === items.length;

  return (
    <div style={{ background: colors.surface, borderRadius: 16, marginBottom: 12, border: `1px solid ${allDone ? "#34D39940" : colors.surfaceBorder}`, overflow: "hidden" }}>
      <button
        onClick={onToggleOpen}
        aria-expanded={isOpen}
        style={{ width: "100%", background: "none", border: "none", padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}
      >
        <span style={{ width: 40, height: 40, borderRadius: 10, background: color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
          {category.emoji}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: colors.text, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>
            {category.title} {allDone && "✅"}
          </div>
          <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 1 }}>
            {category.subtitle}
            {photoTotal > 0 && <span style={{ marginLeft: 8, color }}>📸 {photoTotal} foto{photoTotal > 1 ? "'s" : ""}</span>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ background: allDone ? colors.success : color, color: "#fff", borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>
            {doneCount}/{items.length}
          </div>
          <span style={{ color: colors.textMuted, fontSize: 16 }}>{isOpen ? "▲" : "▼"}</span>
        </div>
      </button>

      {isOpen && (
        <div style={{ padding: "0 18px 16px" }}>
          <div style={{ height: 1, background: colors.surfaceBorder, marginBottom: 12 }} />
          {items.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              color={color}
              checked={isChecked(item.id)}
              photoCount={photoCountFor(item.id)}
              onToggle={() => onToggleItem(item.id)}
              onOpenPhotos={() => onOpenItemPhotos(item)}
            />
          ))}

          {photoTotal > 0 && (
            <PhotoStrip color={color} count={photoTotal} thumbs={photoThumbs} onOpenAll={onOpenCategoryPhotos} />
          )}

          {outfitsSlot}
        </div>
      )}
    </div>
  );
}
