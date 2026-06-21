import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants/theme";

/** Saved outfits (ordered sets of clothing photos) + persistence. */
export function useOutfits() {
  const [outfits, setOutfits] = useLocalStorage(STORAGE_KEYS.outfits, []);

  const saveOutfit = useCallback(
    (name, pieces) => {
      const trimmed = name.trim();
      if (!trimmed || pieces.length === 0) return false;
      setOutfits((prev) => [
        ...prev,
        { id: Date.now(), name: trimmed, photos: pieces, createdAt: new Date().toLocaleString("nl-NL") },
      ]);
      return true;
    },
    [setOutfits]
  );

  const deleteOutfit = useCallback(
    (id) => setOutfits((prev) => prev.filter((o) => o.id !== id)),
    [setOutfits]
  );

  return { outfits, saveOutfit, deleteOutfit };
}
