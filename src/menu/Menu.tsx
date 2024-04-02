import React, { useMemo } from 'react';
import { map } from 'abstract-list';
import { useMenu } from './useMenu';
import { MenuItem } from './model/MenuItemModel';
import { MenuModel } from './model/MenuModel';
import { useCallback, useState } from 'react';
import { Popup } from '../common/popup/Popup';
import { useRemove } from '../dialog/useRemove';
import { DialogModel } from '../dialog/model/DialogModel';
import { Container } from '../container/Container';
import { useEditMenu } from '../context/edit/useEditMenu';
import { useActiveFocus } from '../common/popup/useActiveFocus';
import { MenuRow } from './MenuRow';
import { useMaxRows } from './useMaxRows';
import { PromptModel } from '@/prompt/model/PromptModel';

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

  const { removed, remove } = useRemove();

  const [sub, setSub] = useState<{ menu?: MenuModel; dialog?: DialogModel; prompt?: PromptModel }>({});
  const [postClose, setPostClose] = useState<MenuItem>();
  const [hidden, setHidden] = useState(false);
 
  const onBack = useCallback(() => remove(onClose), [remove, onClose]);

  const { active } = useActiveFocus();
  const { items = [], style, layout, editable, onAddSubmenu, onRemoveSubmenu, onAddDialog, onRemoveDialog, onToggleBack, onToggleHideOnSelect } = useEditMenu({menu, active});

  const { maxRows, menuRef } = useMaxRows({ size: items.length.valueOf() });

  const executeMenuItem = useCallback((item: MenuItem) => {
    if (typeof(item) === "object") {
      if (item.hideOnSelect) {
        setHidden(true);
      }
      if (item.dialog || item.submenu || item.prompt) {
        const { dialog, submenu, prompt, ...rest } = item;
        setSub({ dialog, menu: submenu, prompt });
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

  const { scroll, scrollUp, scrollDown, selectedItem, select, disabled, mouseHoverEnabled, enableMouseHover, onMenuAction } = useMenu({ items, maxRows, onSelect: executeMenuItem, onBack, active });

  const onCloseSub = useCallback(async () => {
    setSub({});
    if (postClose) {
      executeMenuItem(postClose);
    }
    setHidden(false);
  }, [setSub, executeMenuItem, setHidden, postClose]);

  const clickable = useMemo(() => !disabled && mouseHoverEnabled, [disabled, mouseHoverEnabled]);

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
          cursor: clickable ? "inherit" : "auto",
        }}>
          <div ref={menuRef} style={{ height: `calc(100% - 27px)`, overflow: "hidden" }}>
            <div style={{ marginTop: scroll * -31, transition: "margin-top .2s" }}>
              {map(items, (item, index) => <MenuRow key={index} index={index} item={item} selectedItem={selectedItem}
                  onAddSubmenu={onAddSubmenu}
                  onRemoveSubmenu={onRemoveSubmenu}
                  onAddDialog={onAddDialog}
                  onRemoveDialog={onRemoveDialog}
                  onToggleBack={onToggleBack}
                  onToggleHideOnSelect={onToggleHideOnSelect}
                  disabled={disabled}
                  onMouseMove={() => {
                    if (!disabled) {
                      enableMouseHover();
                      select(index);  
                    }
                  }}
                  active={active}
                  editable={editable}
                  onMouseOver={clickable ? () => select(index) : undefined}
                  onClick={clickable ? () => onMenuAction(index) : undefined}
                ></MenuRow>
              )}
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
      <Container menu={sub.menu} dialog={sub.dialog} prompt={sub.prompt} pictures={menu.pictures}
        onSelect={onSelect}
        onClose={onCloseSub}
        removed={removed}
      />
    </>);
}
