import { useCallback, useRef, useState } from "react";

type Fn = (...args: any[]) => any | Promise<any>;

export function useOneTap<T extends Fn>(fn: T, lockMs = 800) {
  const [locked, setLocked] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wrapped = useCallback(async (...args: Parameters<T>) => {
    if (locked) return;
    setLocked(true);
    try {
      await fn(...args);
    } finally {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setLocked(false), lockMs);
    }
  }, [fn, locked, lockMs]);

  return { onPress: wrapped, locked };
}
