import { useCallback, useMemo, useState } from "react";
import { useSelection } from "./selection/useSelection";
import { LockStatus, useControls } from "../controls/useControls";
import { PopupControlListener } from "../controls/PopupControlListener";
import { MenuItem } from "./model/MenuItemModel";
import { List } from "abstract-list";
import { useMouseHover } from "@/controls/useMouseHover";

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

  const onAction = useCallback((index?: number) => {
    const item = index !== undefined ? items.at(index) : selectedItem;
    if (!item) {
      return;
    }
    if (typeof (item) === "object" && item.action) {
      item.action();
    }
    onSelect(item);
  }, [items, moveSelection, selectedItem]);

  const onUp = useCallback(() => {
    moveSelection(-1);
  }, [moveSelection]);

  const onDown = useCallback(() => {
    moveSelection(1);
  }, [moveSelection]);

  const { lockState } = useControls({
    active,
    listener: useMemo<PopupControlListener>(() => ({
      onAction,
      onUp,
      onDown,
      onBack,
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
    onMenuAction: onAction,
    onUp,
    onDown,
  };
}
