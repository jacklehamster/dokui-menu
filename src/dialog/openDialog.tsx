import React from 'react';
import ReactDOM from 'react-dom/client';
import { PopupControl } from '../controls/PopupControl';
import { DialogModel } from './model/DialogModel';
import { MenuItem } from '@/menu/model/MenuItemModel';
import { BasicPopup } from '@/menu/BasicPopup';

interface Props {
  dialog: DialogModel,
  onSelect?(item: MenuItem): void,
  root?: HTMLElement;
  popupControl?: PopupControl;
}

export function openDialog({
  dialog,
  onSelect,
  root = document.body,
  popupControl = new PopupControl,
}: Props) {
  const rootElem = document.createElement('div');
  const reactRoot = ReactDOM.createRoot(rootElem);
  const detach = async () => reactRoot.unmount();

  const html = <BasicPopup dialog={dialog} onSelect={onSelect} detach={detach} popupControl={popupControl} />;
  reactRoot.render(html);
  root.appendChild(rootElem);
  return { popupControl, detach };
}
