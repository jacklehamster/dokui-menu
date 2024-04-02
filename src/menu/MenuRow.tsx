import { Container } from "@/container/Container";
import { MenuItem } from "./model/MenuItemModel";
import { MenuModel } from "./model/MenuModel";
import { useEffect, useMemo, useState } from "react";

const ICON_STYLE: React.CSSProperties = {
  textAlign: "center",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  color: 'white',
  fontSize: "10pt",
  alignItems: "center",
  display: "grid",
};

interface Props {
  item?: MenuItem;
  index: number;
  selectedItem?: MenuItem;
  onMouseMove?(): void;
  onMouseOver?(): void;
  onClick?(): void;
  disabled?: boolean;
  editable?: boolean;
  active?: boolean;
  onAddSubmenu?(index: number): void;
  onRemoveSubmenu?(index: number): void;
  onAddDialog?(index: number): void;
  onRemoveDialog?(index: number): void;
  onToggleBack?(index: number): void;
  onToggleHideOnSelect?(index: number): void;
}

export function MenuRow({ item, index, selectedItem, onMouseMove, onMouseOver, onClick, disabled, editable, active, onAddSubmenu, onRemoveSubmenu, onToggleBack, onToggleHideOnSelect }: Props) {
  const itemModel = typeof(item) === "string" ? {label: item} : item;
  const rowSelected = selectedItem === item;
  const [editMenuOn, setEditMenuOn] = useState(false);

  const editMenu = useMemo<MenuModel>(() => ({
    builtIn: true,
    layout: {
      position: [50, 200],
      size: [400, 250],
    },
    items: [
      {
        builtIn: true,
        label: "edit text",
      },
      {
        builtIn: true,
        label: "create submenu",
        action: () => onAddSubmenu?.(index),
        back: true,
        hidden: !!itemModel?.submenu,
      },
      {
        builtIn: true,
        label: "remove submenu",
        action: () => onRemoveSubmenu?.(index),
        back: true,
        hidden: !itemModel?.submenu,
      },
      {
        builtIn: true,
        label: "create dialog",
        action: () => onAddSubmenu?.(index),
        back: true,
        hidden: !!itemModel?.dialog,
      },
      {
        builtIn: true,
        label: "remove dialog",
        action: () => onRemoveSubmenu?.(index),
        back: true,
        hidden: !itemModel?.dialog,
      },
      {
        builtIn: true,
        label: "back (" + (itemModel?.back ? "ON" : "OFF") + ")",
        action: () => onToggleBack?.(index),
      },
      {
        builtIn: true,
        label: "hide on select (" + (itemModel?.hideOnSelect ? "ON" : "OFF") + ")",
        action: () => onToggleHideOnSelect?.(index),
      },
      {
        builtIn: true,
        label: "exit",
        back: true,
      },
    ],
  }), [itemModel, onAddSubmenu, onRemoveSubmenu, onToggleBack, onToggleHideOnSelect, index]);

  useEffect(() => {
    if (editable && active && rowSelected && !itemModel?.builtIn) {
      const listener = (e: KeyboardEvent) => {
        if (e.code === "KeyE") {
          setEditMenuOn(value => !value);
        }
      };
      document.addEventListener("keydown", listener);
      return () => document.removeEventListener("keydown", listener);  
    }
  }, [setEditMenuOn, editable, active, rowSelected, itemModel]);
  
  return (<>
    <div style={{
        color: rowSelected ? (itemModel?.builtIn ? "#0000ee" : 'black') : disabled ? 'silver' : 'white',
        backgroundColor: !rowSelected ? (itemModel?.builtIn ? "#0000ee" : 'black') : disabled ? 'silver' : 'white',
        transition: 'color .05s, background-color .05s',
        display: "flex",
      }}
      onMouseMove={onMouseMove}
      onMouseOver={onMouseOver}
      onClick={editable && !itemModel?.builtIn ? () => setEditMenuOn(true) :  onClick}>
        <div style={{ flex: 1 }}>
          {itemModel?.label}
        </div>
        {editable && active && rowSelected && !itemModel?.builtIn && <div style={{
          ...ICON_STYLE,
          backgroundColor: "blue",
        }}>
          E
        </div>}
        {editable && !itemModel?.builtIn && itemModel?.hideOnSelect && <div style={{
          ...ICON_STYLE,
          backgroundColor: "silver",
        }}>
          H
        </div>}
        {editable && !itemModel?.builtIn && itemModel?.submenu && <div style={{
          ...ICON_STYLE,
          backgroundColor: "green",
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" style={{
              height: 30,
              width: 30,
            }}>
            <line x1="10" y1="10" x2="20" y2="10" stroke="white" strokeWidth="2" />
            <line x1="10" y1="14" x2="20" y2="14" stroke="white" strokeWidth="2"  />
            <line x1="10" y1="18" x2="20" y2="18" stroke="white" strokeWidth="2" />
          </svg>
        </div>}
        {editable && !itemModel?.builtIn && itemModel?.dialog && <div style={{
          ...ICON_STYLE,
          backgroundColor: "orange",
        }}>
          D
        </div>}
        {editable && !itemModel?.builtIn && itemModel?.back && <div style={{
          ...ICON_STYLE,
          backgroundColor: "red",
        }}>
          B
        </div>}
        <Container menu={editMenuOn ? editMenu : undefined} onClose={() => setEditMenuOn(false)} />
    </div>
  </>);
}
