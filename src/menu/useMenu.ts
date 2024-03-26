import { useCallback, useMemo, useState } from "react";
import { useSelection } from "./selection/useSelection";
import { LockStatus, useControlsLock } from "../controls/useControlsLock";
import { PopupControlListener } from "../controls/PopupControlListener";
import { MenuItem } from "./model/MenuItemModel";
import { List } from "abstract-list";

interface Props {
  items: List<MenuItem> | MenuItem[];
  maxRows?: number;
  onSelect(item: MenuItem): void;
  onClose(): Promise<void>;
}

interface Result {
  selectedItem?: MenuItem;
  select(index: number | undefined): void;
  disabled: boolean;
  scroll: number;
  scrollUp(): void;
  scrollDown(): void;
  menuHoverEnabled: boolean;
  enableMenuHover(): void;
  onMenuAction(index?: number): void;
}

export function useMenu({ items, maxRows, onSelect, onClose }: Props): Result {
  const { scroll, scrollUp, scrollDown, select, moveSelection, selectedItem } = useSelection({ items, maxRows });
  const [menuHoverEnabled, setMenuHoverEnabled] = useState(false);


  const onAction = useCallback((index?: number) => {
    const item = index !== undefined ? items.at(index) : selectedItem;
    if (!item) {
      return;
    }
    onSelect(item);
    if (typeof (item) === "object" && item.back) {
      onClose();
    }
  }, [items, moveSelection, selectedItem, setMenuHoverEnabled, onClose]);

  const { lockState } = useControlsLock({
    listener: useMemo<PopupControlListener>(() => ({
      onAction,
      onUp() {
        setMenuHoverEnabled(false);
        moveSelection(-1);
      },
      onDown() {
        setMenuHoverEnabled(false);
        moveSelection(1);
      },
    }), [moveSelection, setMenuHoverEnabled, onAction]),
  });

  return {
    selectedItem,
    select,
    scroll,
    scrollUp,
    scrollDown,
    disabled: lockState === LockStatus.LOCKED,
    menuHoverEnabled,
    enableMenuHover: useCallback(!menuHoverEnabled
      ? () => setMenuHoverEnabled(true)
      : () => { },
      [menuHoverEnabled]),
    onMenuAction: onAction,
  };
}
