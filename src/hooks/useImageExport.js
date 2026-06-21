import { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { colors } from "../constants/theme";

/** Exports a DOM node to a downloadable PNG. Isolates the html2canvas dep. */
export function useImageExport(nodeRef, onDone, onError) {
  const [loading, setLoading] = useState(false);

  const exportImage = useCallback(async () => {
    if (!nodeRef.current) return;
    setLoading(true);
    try {
      const canvas = await html2canvas(nodeRef.current, { backgroundColor: colors.bg, scale: 2, useCORS: true });
      const link = document.createElement("a");
      link.download = `paklijst-kiten-denemarken-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      onDone?.();
    } catch {
      onError?.();
    } finally {
      setLoading(false);
    }
  }, [nodeRef, onDone, onError]);

  return { loading, exportImage };
}
