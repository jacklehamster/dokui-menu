import { Container } from "../container/Container";
import { MenuItem } from "./model/MenuItemModel";
import { MenuModel } from "./model/MenuModel";
import { useCallback, useMemo, useState } from "react";
import { useKeyDown } from "../controls/useKeyDown";
import { openMenu } from "./openMenu";
import { useControlContext } from "@/context/controls/ControlContextProvider";

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
  onEditLabel?(index: number, text: string): void;
  builtIn?: boolean;
}

export function MenuRow({ item, index, selectedItem, onMouseMove, onMouseOver, onClick, disabled, editable, active, onAddSubmenu, onRemoveSubmenu, onToggleBack, onToggleHideOnSelect, onEditLabel, builtIn }: Props) {
  const itemModel = typeof(item) === "string" ? {label: item} : item;
  const rowSelected = selectedItem === item;
  const [editMenuOn, setEditMenuOn] = useState(false);
  const { popupControl } = useControlContext();
  const builtInItem = useMemo(() => builtIn ?? itemModel?.builtIn, [itemModel, builtIn]);

  const editMenu = useMemo<MenuModel>(() => ({
    builtIn: true,
    layout: {
      position: [50, 200],
      size: [400, 250],
    },
    items: [
      {
        label: "edit label",
        action: () => {
          openMenu({ 
            prompt: {
              label: "Enter a new label",
              defaultText: itemModel?.label,
              languages: ["english", "korean"],
            }, onPrompt(text) {
              onEditLabel?.(index, text);
            },
            popupControl,
          });
        },
      },
      {
        label: "create submenu",
        action: () => onAddSubmenu?.(index),
        back: true,
        hidden: !!itemModel?.submenu,
      },
      {
        label: "remove submenu",
        action: () => onRemoveSubmenu?.(index),
        back: true,
        hidden: !itemModel?.submenu,
      },
      {
        label: "create dialog",
        action: () => onAddSubmenu?.(index),
        back: true,
        hidden: !!itemModel?.dialog,
      },
      {
        label: "remove dialog",
        action: () => onRemoveSubmenu?.(index),
        back: true,
        hidden: !itemModel?.dialog,
      },
      {
        label: "back (" + (itemModel?.back ? "ON" : "OFF") + ")",
        action: () => onToggleBack?.(index),
      },
      {
        label: "hide on select (" + (itemModel?.hideOnSelect ? "ON" : "OFF") + ")",
        action: () => onToggleHideOnSelect?.(index),
      },
      {
        label: "exit",
        back: true,
      },
    ],
  }), [itemModel, onAddSubmenu, onRemoveSubmenu, onToggleBack, onToggleHideOnSelect, onEditLabel, index, popupControl]);

  useKeyDown({
    enabled: useMemo(() => editable && active && rowSelected && !builtInItem, [editable, active, rowSelected, itemModel, builtInItem]),
    key: "KeyE",
    callback: useCallback(() => {
      setEditMenuOn(value => !value);
    }, [setEditMenuOn]),
  });
  
  return (<>
    <div style={{
        color: rowSelected ? (builtInItem ? "#0000ee" : 'black') : disabled ? 'silver' : 'white',
        backgroundColor: !rowSelected ? (builtInItem ? "#0000ee" : 'black') : disabled ? 'silver' : 'white',
        transition: 'color .05s, background-color .05s',
        display: "flex",
      }}
      onMouseMove={onMouseMove}
      onMouseOver={onMouseOver}
      onClick={editable && !builtInItem ? () => setEditMenuOn(true) :  onClick}>
        <div style={{ flex: 1 }}>
          {itemModel?.emoji && <span>{itemModel?.emoji}&nbsp;</span>}
          <span>{itemModel?.label}</span>
          {(itemModel?.showTriangle || (itemModel?.showTriangle === undefined && itemModel?.submenu)) && <span> ⏵</span>}
        </div>
        {editable && active && rowSelected && !builtInItem && <div style={{
          ...ICON_STYLE,
          backgroundColor: "blue",
        }}>
          E
        </div>}
        {editable && !builtInItem && itemModel?.submenu && <div style={{
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
        {editable && !builtInItem && itemModel?.dialog && <div style={{
          ...ICON_STYLE,
          backgroundColor: "orange",
        }}>
          D
        </div>}
        {editable && !builtInItem && itemModel?.back && <div style={{
          ...ICON_STYLE,
          backgroundColor: "red",
        }}>
          B
        </div>}
        <Container menu={editMenuOn ? editMenu : undefined} onClose={() => setEditMenuOn(false)} />
    </div>
  </>);
}
