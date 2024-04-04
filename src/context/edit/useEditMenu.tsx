import { useCallback, useMemo, useState } from "react";
import { MenuModel } from "../../menu/model/MenuModel";
import { useEditContext } from "./EditContextProvider";
import { forEach, map } from "abstract-list";
import { MenuItem, MenuItemModel } from "@/menu/model/MenuItemModel";

interface Props {
  menu: MenuModel;
  active: boolean;
}

interface Result extends MenuModel {
  editable: boolean;
  onAddSubmenu(index: number): void
  onRemoveSubmenu(index: number): void;
  onAddDialog(index: number): void
  onRemoveDialog(index: number): void;
  onToggleBack(index: number): void;
  onToggleHideOnSelect(index: number): void;
  onEditLabel(index: number, text: string): void;
  deleteMenuItem(index: number): void;
}

export function useEditMenu({ menu, active }: Props): Result {
  const { editing } = useEditContext();
  const [editCount, setEditCount] = useState(0);
  const addItem = useCallback(() => {
    const items = [];
    forEach(menu.items, item => {
      items.push(item);
    });
    items.push({
      label: `untitled ${editCount + 1}`,
    });
    menu.items = items;
    setEditCount(count => count + 1);
  }, [menu, setEditCount, editCount]);

  const onAddSubmenu = useCallback((index: number) => {
    const items: (MenuItem|undefined)[] = [];
    forEach(menu.items, item => items.push(item));
    const item = items[index];
    const itemModel: MenuItemModel = !item ? {label: "untitled"} : (typeof(item) === "string" ? { label: item } : item);
    itemModel.submenu = itemModel.submenu ?? { items: [] };
    items[index] = itemModel;
    menu.items = items;
    setEditCount(count => count + 1);
  }, [menu, setEditCount, editCount]);

  const onRemoveSubmenu = useCallback((index: number) => {
    const items: (MenuItem|undefined)[] = [];
    forEach(menu.items, item => items.push(item));
    const item = items[index];
    const itemModel: MenuItemModel = !item ? {label: "untitled"} : (typeof(item) === "string" ? { label: item } : item);
    delete itemModel.submenu;
    items[index] = itemModel;
    menu.items = items;
    setEditCount(count => count + 1);
  }, [menu, setEditCount, editCount]);

  const onAddDialog = useCallback((index: number) => {
    const items: (MenuItem|undefined)[] = [];
    forEach(menu.items, item => items.push(item));
    const item = items[index];
    const itemModel: MenuItemModel = !item ? {label: "untitled"} : (typeof(item) === "string" ? { label: item } : item);
    itemModel.dialog = itemModel.dialog ?? {
      messages: [],
    };
    items[index] = itemModel;
    menu.items = items;
    setEditCount(count => count + 1);
  }, [menu, setEditCount, editCount]);

  const onRemoveDialog = useCallback((index: number) => {
    const items: (MenuItem|undefined)[] = [];
    forEach(menu.items, item => items.push(item));
    const item = items[index];
    const itemModel: MenuItemModel = !item ? {label: "untitled"} : (typeof(item) === "string" ? { label: item } : item);
    delete itemModel.dialog;
    items[index] = itemModel;
    menu.items = items;
    setEditCount(count => count + 1);
  }, [menu, setEditCount, editCount]);

  const onToggleBack = useCallback((index: number) => {
    const items: (MenuItem|undefined)[] = [];
    forEach(menu.items, item => items.push(item));
    const item = items[index];
    const itemModel: MenuItemModel = !item ? {label: "untitled"} : (typeof(item) === "string" ? { label: item } : item);
    if (itemModel.back) {
      delete itemModel.back;
    } else {
      itemModel.back = true;
    }
    items[index] = itemModel;
    menu.items = items;
    setEditCount(count => count + 1);
  }, [menu, setEditCount, editCount]);

  const onToggleHideOnSelect = useCallback((index: number) => {
    const items: (MenuItem|undefined)[] = [];
    forEach(menu.items, item => items.push(item));
    const item = items[index];
    const itemModel: MenuItemModel = !item ? {label: "untitled"} : (typeof(item) === "string" ? { label: item } : item);
    if (itemModel.hideOnSelect) {
      delete itemModel.hideOnSelect;
    } else {
      itemModel.hideOnSelect = true;
    }
    items[index] = itemModel;
    menu.items = items;
    setEditCount(count => count + 1);
  }, [menu, setEditCount, editCount]);

  const onEditLabel = useCallback((index: number, text: string) => {
    const items: (MenuItem|undefined)[] = [];
    forEach(menu.items, item => items.push(item));
    const item = items[index];
    const itemModel: MenuItemModel = !item ? {label: "untitled"} : (typeof(item) === "string" ? { label: item } : item);
    itemModel.label = text;
    items[index] = itemModel;
    menu.items = items;
    setEditCount(count => count + 1);
  }, []);

  const deleteMenuItem = useCallback((index: number) => {
    const items: (MenuItem|undefined)[] = [];
    forEach(menu.items, (item, idx) => {
      if (index !== idx) {
        items.push(item);
      }
    });
    menu.items = items;
    setEditCount(count => count + 1);
  }, []);

  const items = useMemo(() => {
    if (!editing || !active) {
      return menu.items;
    }
    const items = map(menu.items ?? [], item => item);
    const editMenu: (MenuItem|undefined)[] = menu.builtIn ? [] : [
      { label: "edit menu", builtIn: true, submenu: {
        layout: {
          position: [300,300],
          size: [300,300],
        },
        builtIn: true,
        items: [
          {
            label: "new item", builtIn: true,
            action: addItem,
          },  
          { label: "edit pictures", builtIn: true },
          { label: "exit", builtIn: true, back: true },
        ],
      }},
    ];
    return items.concat(editMenu);
  }, [menu, editing, active, editCount, addItem]);  

  const visibleItems = useMemo(() => {
    const visibleItems: MenuItem[] = [];
    forEach(items, item => {
      const itemModel: MenuItemModel = !item ? {label: "untitled"} : (typeof(item) === "string" ? { label: item } : item);
      if (item && !itemModel.hidden) {
        visibleItems.push(item);
      }
    });
    return visibleItems;
  }, [items]);

  return {
    ...menu,
    items: visibleItems,
    editable: editing,
    onAddSubmenu,
    onRemoveSubmenu,
    onAddDialog,
    onRemoveDialog,
    onToggleBack,
    onToggleHideOnSelect,
    onEditLabel,
    deleteMenuItem,
  };
}
