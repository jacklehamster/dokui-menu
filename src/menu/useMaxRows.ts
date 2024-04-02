import { useEffect, useRef, useState } from "react";

interface Props {
  size: number;
}

export function useMaxRows({ size }: Props) {
  const [maxRows, setMaxRows] = useState(size);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;
      const rows = Math.floor(height / 30);
      if (rows) {
        setMaxRows(rows);
      }
    });
    resizeObserver.observe(menuRef.current);
    return () => resizeObserver.disconnect();
  }, [setMaxRows, menuRef.current]);
  return { maxRows, menuRef };
}
