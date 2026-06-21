import { useState, useEffect, useCallback } from "react";

/**
 * Persisted state hook. The single place that knows how to talk to
 * localStorage, so no component has to. Same API shape as useState.
 *
 * @param {string} key   localStorage key
 * @param {*} initial    default value when nothing is stored
 */
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable (private mode) — fail silently.
    }
  }, [key, value]);

  const reset = useCallback(() => setValue(initial), [initial]);

  return [value, setValue, reset];
}
