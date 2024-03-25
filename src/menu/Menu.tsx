import { map } from 'abstract-list';
import { useMenu } from './useMenu';
import { MenuItem } from './model/MenuItemModel';
import { MenuModel } from './model/MenuModel';
import { useCallback, useId, useState } from 'react';
import { v4 as uuid } from "uuid";
import { Popup } from '../common/popup/Popup';

export interface Props {
  menu: MenuModel;
  onSelect(item: MenuItem): void;
  onClose(): Promise<void>;
  removed?: boolean;
}

export function Menu({
    menu,
    onSelect,
    onClose,
    removed,
  }: Props): JSX.Element {

  const { items = [], maxRows, style, layout} = menu;
  const uid = useId();

  const [submenu, setSubmenu] = useState<MenuModel>();
  
  const onMenuSelect = useCallback((item: MenuItem) => {
    if (typeof(item) === "object") {
      if (item.submenu) {
        setSubmenu(item.submenu);
      } {
        onSelect(item);
      }
      if (item.back) {
        onClose();
      }
    } else {
      onSelect(item);
    }
  }, [onSelect, setSubmenu, onClose, uuid]);
  const [submenuRemoved, setSubmenuRemoved] = useState(false);
  const submenuClose = useCallback(async () => {
    setSubmenuRemoved(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setSubmenu(undefined);
        setSubmenuRemoved(false);
        resolve();
      }, 200);
    });
  }, [setSubmenu, setSubmenuRemoved]);

  const { scroll, scrollUp, scrollDown, selectedItem, select, disabled, menuHoverEnabled, enableMenuHover, onMenuAction } = useMenu({ uid, items, maxRows, onSelect: onMenuSelect, onClose });

  return (
    <>
      <Popup
        layout={layout ?? {}}
        style={style}
        disabled={disabled}
        removed={removed}
      >
        <svg xmlns="http://www.w3.org/2000/svg" style={{
            position: "absolute",
            height: 20,
            marginTop: -15,
            width: 200,
            display: scroll > 0 ? "" : "none",
            left: `calc(50% - 100px)`,
          }} onMouseDown={() => scrollUp()}>
          <polygon points="100,10 110,20 90,20" style={{ fill: "white" }}/>
        </svg>
        <div style={{ 
          paddingTop: 10,
          cursor: menuHoverEnabled ? "inherit" : "auto",
        }}>
          <div style={{ height: `calc(100% - 27px)`, overflow: "hidden" }}>
            <div style={{ marginTop: scroll * -31, transition: "margin-top .2s" }}>
              {map(items, (item, index) => {
                return (
                  <div key={index} style={{
                      color: selectedItem === item ? 'black' : disabled ? 'silver' : 'white',
                      backgroundColor: selectedItem !== item ? 'black' : disabled ? 'silver' : 'white',
                      transition: 'color .05s, background-color .05s',
                    }}
                    onMouseMove={() => {
                      enableMenuHover();
                      select(index);
                    }}
                    onMouseOver={menuHoverEnabled ? () => select(index) : undefined}
                    onClick={menuHoverEnabled ? () => onMenuAction(index) : undefined}>
                    {typeof(item) === "string" ? item : item?.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" style={{
            position: "absolute",
            height: 20,
            width: 200,
            marginTop: -5,
            display: scroll + (maxRows ?? items.length.valueOf()) < items.length.valueOf() ? "" : "none",
            left: `calc(50% - 100px)`,
          }} onMouseDown={() => scrollDown()}>
          <polygon points="100,20 110,10 90,10" style={{ fill: "white" }}/>
        </svg>
      </Popup>
      {submenu && <Menu menu={submenu} onSelect={onSelect} onClose={submenuClose} removed={submenuRemoved}></Menu>}
    </>);
}
