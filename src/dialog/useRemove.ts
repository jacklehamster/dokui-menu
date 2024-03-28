import { useCallback, useState } from "react";

export function useRemove() {
  const [removed, setRemoved] = useState(false);
  const remove = useCallback((onClose: () => void) => {
    setRemoved(true);
    const timeout = setTimeout(() => {
      setRemoved(false);
      onClose();
    }, 150);
    return () => clearTimeout(timeout);
  }, [setRemoved]);
  return { removed, remove };
}
