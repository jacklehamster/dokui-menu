import React from 'react';
import { map } from 'abstract-list';
import { useMenu } from './useMenu';
import { MenuItem } from './model/MenuItemModel';
import { MenuModel } from './model/MenuModel';
import { useCallback, useState } from 'react';
import { Popup } from '../common/popup/Popup';
import { useRemove } from '@/dialog/useRemove';
import { DialogModel } from '@/dialog/model/DialogModel';
import { Container } from '@/container/Container';

export interface Props {
  menu: MenuModel;
  onSelect(item: MenuItem): void;
  onClose(): Promise<void>;
}

export function Menu({
    menu,
    onSelect,
    onClose,
  }: Props): JSX.Element {

  const { items = [], maxRows, style, layout} = menu;
  const { removed, remove } = useRemove();

  const [sub, setSub] = useState<{ menu?: MenuModel; dialog?: DialogModel }>({});
  const [postClose, setPostClose] = useState<MenuItem>();
  const [hidden, setHidden] = useState(false);
 
  const onBack = useCallback(() => {
    remove(onClose);
  }, [remove, onClose]);

  const executeMenuItem = useCallback((item: MenuItem) => {
    if (typeof(item) === "object") {
      if (item.hideOnSelect) {
        setHidden(true);
      }
      if (item.dialog || item.submenu) {
        const { dialog, submenu, ...rest } = item;
        setSub({ dialog, menu: submenu });
        setPostClose(rest);
      } else {
        setPostClose(undefined);
        setSub({});
        onSelect(item);
        if (item.back) {
          onBack();
        }  
      }
    } else {
      onSelect(item);
    }
  }, [onSelect, setSub, onBack, setPostClose, setHidden]);

  const { scroll, scrollUp, scrollDown, selectedItem, select, disabled, menuHoverEnabled, enableMenuHover, onMenuAction } = useMenu({ items, maxRows, onSelect: executeMenuItem, onBack });

  const onCloseSub = useCallback(async () => {
    setSub({});
    if (postClose) {
      executeMenuItem(postClose);
    }
    setHidden(false);
  }, [setSub, executeMenuItem, setHidden, postClose]);

  return (
    <>
      <Popup
        layout={layout ?? {}}
        style={style}
        disabled={disabled}
        removed={removed || hidden}
        onBack={menu.disableBack ? undefined : onBack}
      >
        <svg xmlns="http://www.w3.org/2000/svg" style={{
            position: "absolute",
            height: 20,
            marginTop: -15,
            width: 200,
            display: scroll > 0 ? "" : "none",
            left: `calc(50% - 100px)`,
          }} onClick={() => scrollUp()}>
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
          }} onClick={() => scrollDown()}>
          <polygon points="100,20 110,10 90,10" style={{ fill: "white" }}/>
        </svg>
      </Popup>
      <Container menu={sub.menu} dialog={sub.dialog} onSelect={onSelect}
        onClose={onCloseSub}
      />
    </>);
}
