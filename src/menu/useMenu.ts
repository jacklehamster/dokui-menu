import { useCallback, useMemo } from "react";
import { useSelection } from "./selection/useSelection";
import { LockStatus, useControls } from "../controls/useControls";
import { PopupControlListener } from "../controls/PopupControlListener";
import { MenuItem } from "./model/MenuItemModel";
import { List } from "abstract-list";
import { useMouseHover } from "../controls/useMouseHover";

interface Props {
  items: List<MenuItem> | MenuItem[];
  maxRows?: number;
  onSelect(item: MenuItem): void;
  onBack(): void;
  active: boolean;
}

interface Result {
  selectedItem?: MenuItem;
  select(index: number | undefined): void;
  disabled: boolean;
  scroll: number;
  onUp(): void;
  onDown(): void;
  scrollUp(): void;
  scrollDown(): void;
  mouseHoverEnabled: boolean;
  enableMouseHover(): void;
  onMenuAction(index?: number): void;
}

export function useMenu({ items, maxRows, onSelect, onBack, active }: Props): Result {
  const { scroll, scrollUp, scrollDown, select, moveSelection, selectedItem } = useSelection({ items, maxRows });

  const onItemAction = useCallback((item?: MenuItem) => {
    if (!item) {
      return;
    }
    if (typeof (item) === "object" && item.action) {
      item.action().then(() => onSelect(item));
    } else {
      onSelect(item);
    }
  }, [onSelect]);

  const onMenuAction = useCallback((index: number) => {
    onItemAction(items.at(index));
  }, [items, onItemAction]);

  const onAction = useCallback(() => {
    onItemAction(selectedItem);
  }, [onItemAction, selectedItem]);

  const onUp = useCallback(() => {
    moveSelection(-1);
  }, [moveSelection]);

  const onDown = useCallback(() => {
    moveSelection(1);
  }, [moveSelection]);

  const onRight = useCallback(() => {
    if (typeof (selectedItem) === "object" && selectedItem.submenu) {
      onItemAction(selectedItem);
    }
  }, [onItemAction, selectedItem]);

  const { lockState } = useControls({
    active,
    listener: useMemo<PopupControlListener>(() => ({
      onAction,
      onStart: onAction,
      onUp,
      onDown,
      onBack,
      onRight,
    }), [moveSelection, onAction, onBack, onUp, onDown]),
  });

  const { enableMouseHover, mouseHoverEnabled } = useMouseHover({ active });

  return {
    selectedItem,
    select,
    scroll,
    scrollUp,
    scrollDown,
    disabled: lockState === LockStatus.LOCKED,
    enableMouseHover,
    mouseHoverEnabled,
    onMenuAction,
    onUp,
    onDown,
  };
}
