import { useCallback, useState } from "react";

export function useDialogState() {
  const [index, setIndex] = useState(0);

  return {
    index,
    setIndex,
    next: useCallback(() => setIndex(index => index + 1), [setIndex]),
  };
}
