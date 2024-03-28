import React from 'react';
import ReactDOM from 'react-dom/client';
import { PopupControl } from '../controls/PopupControl';
import { MenuModel } from './model/MenuModel';
import { MenuItem } from './model/MenuItemModel';
import { BasicPopup } from './BasicPopup';
import { DialogModel } from '../dialog/model/DialogModel';

interface Props {
  menu?: MenuModel,
  dialog?: DialogModel,
  onSelect(item: MenuItem): void,
  root?: HTMLElement;
  popupControl?: PopupControl;
}

export function openMenu({
  menu,
  dialog,
  onSelect,
  root = document.body,
  popupControl = new PopupControl(),
}: Props) {
  const rootElem = document.createElement('div');
  const reactRoot = ReactDOM.createRoot(rootElem);
  const detach = async () => reactRoot.unmount();

  const html = <BasicPopup dialog={dialog} menu={menu} onSelect={onSelect} detach={detach} popupControl={popupControl} />;
  reactRoot.render(html);
  root.appendChild(rootElem); 
  return { popupControl, detach };
}
