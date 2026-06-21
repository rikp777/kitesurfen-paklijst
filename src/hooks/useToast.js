import { useState, useRef, useCallback, useEffect } from "react";

/** Ephemeral toast message with auto-dismiss. One job: transient feedback. */
export function useToast(duration = 2500) {
  const [toast, setToast] = useState("");
  const timer = useRef(null);

  const showToast = useCallback(
    (msg) => {
      setToast(msg);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(""), duration);
    },
    [duration]
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return { toast, showToast };
}
