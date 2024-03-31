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
  onToggleBack?(index: number): void;
}

export function MenuRow({ item, index, selectedItem, onMouseMove, onMouseOver, onClick, disabled, editable, active, onAddSubmenu, onRemoveSubmenu, onToggleBack }: Props) {
  const itemModel = typeof(item) === "string" ? {label: item} : item;
  const rowSelected = selectedItem === item;
  const [editMenuOn, setEditMenuOn] = useState(false);

  const editMenu = useMemo<MenuModel>(() => ({
    builtIn: true,
    layout: {
      position: [50, 200],
      size: [300, 200],
    },
    items: [
      {
        builtIn: true,
        label: "rename",
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
        label: "toggle back (" + (itemModel?.back ? "ON" : "OFF") + ")",
        action: () => onToggleBack?.(index),
      },
      {
        builtIn: true,
        label: "exit",
        back: true,
      },
    ],
  }), [itemModel, onAddSubmenu, onRemoveSubmenu, onToggleBack, index]);

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
      onClick={onClick}>
        <div style={{
          flex: 1,
        }}>
          {itemModel?.label}
        </div>
        {editable && active && rowSelected && !itemModel?.builtIn && <div style={{
          ...ICON_STYLE,
          backgroundColor: "blue",
        }}>
          E
        </div>}
        {editable && !itemModel?.builtIn && itemModel?.submenu && <div style={{
          ...ICON_STYLE,
          backgroundColor: "green",
        }}>
          S
        </div>}
        {editable && !itemModel?.builtIn && itemModel?.back && <div style={{
          ...ICON_STYLE,
          backgroundColor: "orange",
        }}>
          B
        </div>}
        <Container menu={editMenuOn ? editMenu : undefined} onClose={() => setEditMenuOn(false)} />
    </div>
  </>);
}
