import { find, List } from "abstract-list";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Props<T> {
  items: List<T>;
  maxRows?: number;
}

export function useSelection<T extends ({ selected?: boolean } | string)>({ items, maxRows = items.length.valueOf() }: Props<T>) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scroll, setScroll] = useState(0);
  const numItems = useMemo(() => items.length.valueOf(), [items]);

  useEffect(() => {
    const defaultSelected = find(items, (item) => {
      return typeof (item) === "object" && !!item?.selected;
    });
    if (defaultSelected >= 0) {
      setSelectedIndex(defaultSelected);
    }
  }, [items, setSelectedIndex]);

  const scrollDown = useCallback((rows = 1) => {
    setScroll(scroll => Math.min(numItems - maxRows, scroll + rows));
  }, [setScroll, numItems, maxRows]);

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
    const newIndex = Math.max(0, Math.min(index, numItems - 1));
    setSelectedIndex(newIndex);
  }, [setSelectedIndex, numItems]);

  const moveSelection = useCallback((dy: number) => {
    if (dy) {
      setSelectedIndex((index) => {
        const newIndex = Math.max(0, Math.min(index + dy, numItems - 1));
        fixScroll(newIndex);
        return newIndex;
      });
    }
  }, [setSelectedIndex, fixScroll, numItems]);

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
