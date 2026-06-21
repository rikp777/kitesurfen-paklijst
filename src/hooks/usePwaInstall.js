import { useState, useEffect, useCallback } from "react";

/**
 * Captures the browser's "Add to Home Screen" prompt so we can offer a
 * branded install button at the right moment. Returns `installable: false`
 * once installed or on browsers that don't support it (e.g. iOS Safari).
 */
export function usePwaInstall() {
  const [deferred, setDeferred] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferred) return;
    deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  }, [deferred]);

  return { installable: !!deferred && !installed, promptInstall };
}
