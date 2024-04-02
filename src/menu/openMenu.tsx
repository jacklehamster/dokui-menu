import React from 'react';
import ReactDOM from 'react-dom/client';
import { PopupControl } from '../controls/PopupControl';
import { MenuModel } from './model/MenuModel';
import { MenuItem } from './model/MenuItemModel';
import { BasicPopup } from './BasicPopup';
import { DialogModel } from '../dialog/model/DialogModel';
import { PictureModel } from '../picture/model/PictureModel';
import { PromptModel } from '@/prompt/model/PromptModel';

interface Props<I extends MenuItem = MenuItem> {
  pictures?: PictureModel[];
  menu?: MenuModel,
  dialog?: DialogModel,
  prompt?: PromptModel,
  onSelect(item: I): void,
  root?: HTMLElement;
  popupControl?: PopupControl;
}

export function openMenu<I extends MenuItem = MenuItem>({
  pictures,
  menu,
  dialog,
  prompt,
  onSelect,
  root = document.body,
  popupControl = new PopupControl(),
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

  const html = <BasicPopup pictures={pictures} dialog={dialog} menu={menu} prompt={prompt} onSelect={onSelect} detach={detach} popupControl={popupControl}
    onClose={async () => setTimeout(() => detach(), 10)}
  />;
  reactRoot.render(html);
  root.appendChild(rootElem); 
  return { popupControl, detach };
}
