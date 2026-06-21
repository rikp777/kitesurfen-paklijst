import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants/theme";

/** Proof photos keyed by item id. Encapsulates upload/delete + persistence. */
export function usePhotos(onUploaded) {
  const [photos, setPhotos] = useLocalStorage(STORAGE_KEYS.photos, {});

  const addPhoto = useCallback(
    (itemId, file) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotos((prev) => {
          const existing = prev[itemId] || [];
          return {
            ...prev,
            [itemId]: [
              ...existing,
              { data: ev.target.result, name: file.name, date: new Date().toLocaleString("nl-NL") },
            ],
          };
        });
        onUploaded?.();
      };
      reader.readAsDataURL(file);
    },
    [setPhotos, onUploaded]
  );

  const deletePhoto = useCallback(
    (itemId, idx) => {
      setPhotos((prev) => {
        const updated = [...(prev[itemId] || [])];
        updated.splice(idx, 1);
        return { ...prev, [itemId]: updated };
      });
    },
    [setPhotos]
  );

  const countFor = useCallback((itemId) => (photos[itemId] || []).length, [photos]);

  return { photos, addPhoto, deletePhoto, countFor };
}
