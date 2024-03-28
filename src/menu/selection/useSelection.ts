import { List } from "abstract-list";
import { useCallback, useMemo, useState } from "react";

interface Props<T> {
  items: List<T>;
  maxRows?: number;
}

export function useSelection<T>({ items, maxRows }: Props<T>) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scroll, setScroll] = useState(0);

  const scrollDown = useCallback((rows = 1) => {
    const len = items.length.valueOf();
    setScroll(scroll => Math.min(len - (maxRows ?? len), scroll + rows));
  }, [setScroll, items, maxRows]);
  const scrollUp = useCallback((rows = 1) => {
    setScroll(scroll => Math.max(0, scroll - rows));
  }, [setScroll]);

  const fixScroll = useCallback((index: number) => {
    if (maxRows && index - scroll >= maxRows) {
      scrollDown(Math.max(1, scroll - maxRows + index + 1));
    }
    if (index - scroll < 0) {
      scrollUp(Math.max(1, scroll - index));
    }
  }, [scroll, maxRows, scrollUp, scrollDown]);

  const select = useCallback((index: number) => {
    const len = items.length.valueOf();
    const newIndex = Math.max(0, Math.min(index, len - 1));
    setSelectedIndex(newIndex);
  }, [setSelectedIndex, items]);

  const moveSelection = useCallback((dy: number) => {
    if (dy) {
      const len = items.length.valueOf();
      setSelectedIndex((index) => {
        const newIndex = Math.max(0, Math.min(index + dy, len - 1));
        fixScroll(newIndex);
        return newIndex;
      });
    }
  }, [setSelectedIndex, fixScroll, items]);

  const selectedItem = useMemo(() => items.at(selectedIndex), [items, selectedIndex]);

  return {
    select,
    moveSelection,
    selectedItem,
    scroll,
    scrollUp,
    scrollDown,
    selectedIndex,
  }
}
