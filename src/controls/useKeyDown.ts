import { useEffect } from "react";

export interface Props {
  enabled?: boolean;
  key: string | string[];
  callback(): void;
}

export function useKeyDown({ enabled, key, callback }: Props) {
  useEffect(() => {
    if (enabled) {
      const listener = (e: KeyboardEvent) => {
        if (key.indexOf(e.code) >= 0) {
          callback();
        }
      };
      document.addEventListener("keydown", listener);
      return () => document.removeEventListener("keydown", listener);
    }
  }, [enabled, key, callback]);

}
