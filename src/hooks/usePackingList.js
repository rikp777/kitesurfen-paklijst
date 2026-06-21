import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants/theme";
import { allItems } from "../data/categories";
import { haptic } from "../utils/device";

/**
 * Owns the "what is packed" state and everything derived from it
 * (counts, percentage). Components read progress; they don't compute it.
 */
export function usePackingList(showIncluded) {
  const [checked, setChecked, resetChecked] = useLocalStorage(STORAGE_KEYS.checked, {});

  const toggle = useCallback(
    (id) => {
      haptic(10);
      setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    },
    [setChecked]
  );

  const isChecked = useCallback((id) => !!checked[id], [checked]);

  const progress = useMemo(() => {
    const relevant = allItems.filter((i) => showIncluded || !i.included);
    const total = relevant.length;
    const done = relevant.filter((i) => checked[i.id]).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, pct, complete: pct === 100 };
  }, [checked, showIncluded]);

  return { checked, isChecked, toggle, resetChecked, progress };
}
