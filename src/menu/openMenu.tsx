import React from 'react';
import ReactDOM from 'react-dom/client';
import { PopupControl } from '../controls/PopupControl';
import { MenuModel } from './model/MenuModel';
import { MenuItem } from './model/MenuItemModel';
import { BasicPopup } from './BasicPopup';
import { DialogModel } from '../dialog/model/DialogModel';
import { PictureModel } from '../picture/model/PictureModel';
import { PromptModel } from '../prompt/model/PromptModel';
import { LayoutModel } from '..';
import { List } from 'abstract-list';

interface Props<I extends MenuItem = MenuItem> {
  layouts?: List<LayoutModel> | LayoutModel[];
  pictures?: PictureModel[];
  menu?: MenuModel<I>,
  dialog?: DialogModel<I>,
  prompt?: PromptModel,
  onSelect?(item: I): void,
  onPrompt?(text: string): void;
  onClose?(): void;
  root?: HTMLElement;
  popupControl?: PopupControl;
  editor?: boolean;
}

export function openMenu<I extends MenuItem = MenuItem>({
  layouts,
  pictures,
  menu,
  dialog,
  prompt,
  onSelect = item => console.log("SELECT", item),
  onPrompt = text => console.log("PROMPT", text),
  onClose = () => console.log("CLOSE"),
  root = document.body,
  popupControl = new PopupControl(),
  editor,
}: Props<I>) {
  const rootElem = document.createElement('div');
  rootElem.style.position = "absolute";
  rootElem.style.left = "0px";
  rootElem.style.top = "0px";
  rootElem.style.width = "100%";
  rootElem.style.height = "100%";
  rootElem.style.overflow = "hidden";
  const reactRoot = ReactDOM.createRoot(rootElem);
  const detach = async () => reactRoot.unmount();

  const html = <BasicPopup layouts={layouts} pictures={pictures} dialog={dialog} menu={menu} prompt={prompt}
    onSelect={onSelect}
    onPrompt={onPrompt}
    detach={detach}
    popupControl={popupControl}
    onClose={async () => setTimeout(() => {
      detach();
      onClose();
    }, 10)}
    editor={editor}
  />;
  reactRoot.render(html);
  root.appendChild(rootElem); 
  return { popupControl, detach };
}
