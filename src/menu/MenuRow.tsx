import { Container } from "../container/Container";
import { MenuItem, MenuItemModel } from "./model/MenuItemModel";
import { MenuModel } from "./model/MenuModel";
import { useCallback, useMemo, useState } from "react";
import { useKeyDown } from "../controls/useKeyDown";
import { openMenu } from "./openMenu";
import { useControlContext } from "../context/controls/ControlContextProvider";
import { promptText } from "../prompt/promptText";
import { Images } from "../picture/Images";

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
  deleteMenuItem?(index: number): void;
  onEditLabel?(index: number, text: string): void;
  builtIn?: boolean;
}

export function MenuRow({ item, index, selectedItem, onMouseMove, onMouseOver, onClick, disabled, editable, active, onAddSubmenu, onRemoveSubmenu, onToggleBack, onToggleHideOnSelect, onEditLabel, builtIn, deleteMenuItem, onAddDialog, onRemoveDialog }: Props) {
  const itemModel = typeof(item) === "string" ? {label: item} : item;
  const rowSelected = selectedItem === item;
  const [editMenuOn, setEditMenuOn] = useState(false);
  const { popupControl } = useControlContext();
  const builtInItem = useMemo(() => builtIn ?? itemModel?.builtIn, [itemModel, builtIn]);

  const promptDeleteItem = useCallback(async () => {
    const label = itemModel?.label;
    openMenu<MenuItemModel>({
      dialog: {
        layout: {
          position: [150, 50],
          size: [400, 200],
        },
        messages: [
          {
            text: `Do you really want ot delete "${label}"?`,
            menu: {
              builtIn: true,
              layout: {
                position: [150, 270],
                size: [200, 200],
              },
              items: [
                { label: `Yes`, back: true },
                { label: "Cancel", back: true, selected: true }
              ],
            },      
          }],
      },
      popupControl,
      onSelect(item) {
        if (item.label === "Yes") {
          deleteMenuItem?.(index);
        }
      }
    });      
  }, [itemModel, popupControl, deleteMenuItem]);

  const editMenu = useMemo<MenuModel>(() => ({
    builtIn: true,
    layout: {
      position: [450, 200],
      size: [400, 300],
      positionFromRight: true,
    },
    items: [
      {
        label: "edit label",
        action: async () => {
          const newLabel = await promptText({
            label: "Enter a new label",
            defaultText: itemModel?.label,
            popupControl,
          });
          if (newLabel) {
            onEditLabel?.(index, newLabel);
          }
        },
      },
      {
        label: "create submenu",
        action: async () => onAddSubmenu?.(index),
        back: true,
        hidden: !!itemModel?.submenu,
      },
      {
        label: "remove submenu",
        action: async () => onRemoveSubmenu?.(index),
        back: true,
        hidden: !itemModel?.submenu,
      },
      {
        label: "create dialog",
        action: async () => onAddDialog?.(index),
        back: true,
        hidden: !!itemModel?.dialog,
      },
      {
        label: "remove dialog",
        action: async () => onRemoveDialog?.(index),
        back: true,
        hidden: !itemModel?.dialog,
      },
      {
        label: "back (" + (itemModel?.back ? "ON" : "OFF") + ")",
        action: async () => onToggleBack?.(index),
      },
      {
        label: "hide on select (" + (itemModel?.hideOnSelect ? "ON" : "OFF") + ")",
        action: async () => onToggleHideOnSelect?.(index),
      },
      {
        label: "delete menu item",
        back: true,
        action: promptDeleteItem,
      },
      {
        label: "exit",
        back: true,
      },
    ],
  }), [itemModel, onAddSubmenu, onRemoveSubmenu, onToggleBack, onToggleHideOnSelect, onEditLabel, promptDeleteItem, index, popupControl]);

  useKeyDown({
    enabled: useMemo(() => editable && active && rowSelected && !builtInItem, [editable, active, rowSelected, itemModel, builtInItem]),
    key: "KeyE",
    callback: useCallback(() => {
      openMenu({
        menu: editMenu,
        popupControl,
      });
    }, [editMenu, popupControl]),
  });

  useKeyDown({
    enabled: useMemo(() => editable && active && rowSelected && !builtInItem, [editable, active, rowSelected, itemModel, builtInItem]),
    key: "Backspace",
    callback: promptDeleteItem,
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
        <div style={{ flex: 1, display: "flex", padding: "0 10px" }}>
          {itemModel?.icon && <div style={{ width: 30 }}><Images images={itemModel.icon} /></div>}
          {itemModel?.emoji && <span style={{ height: 30 }}>{itemModel?.emoji}&nbsp;</span>}
          <span>{itemModel?.label}</span>
          {(itemModel?.showTriangle || (itemModel?.showTriangle === undefined && itemModel?.submenu)) && <span style={{ height: 30 }}>&nbsp;⏵</span>}
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
        {editMenuOn && <Container menu={editMenu} onClose={() => setEditMenuOn(false)} />}
        { rowSelected && itemModel?.onHover && <Container dialog={itemModel.onHover.dialog} pictures={itemModel.onHover.pictures} focusLess />}
    </div>
  </>);
}
