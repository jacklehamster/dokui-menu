import React from 'react';
import ReactDOM from 'react-dom/client';
import { Props as MenuProps, Menu } from './Menu';
import { PopupControl } from '../controls/PopupControl';
import { ControlContextProvider } from '../context/controls/ControlContextProvider';
import { LayoutContextProvider } from '@/context/layout/LayoutContextProvider';
import { useInitLayoutContext } from '@/context/layout/useInitLayoutContext';
import { MenuModel } from './model/MenuModel';
import { MenuItem } from './model/MenuItemModel';

interface BasicMenuProps extends Partial<MenuProps> {
  detach: () => Promise<void>;
  popupControl: PopupControl;
}

export function BasicMenu(props: BasicMenuProps) {
  const {context} = useInitLayoutContext();
  const onClose = props.onClose ?? props.detach;
  const onSelect = props.onSelect ?? ((item) => console.log(item));
  return <LayoutContextProvider context={context}>
    <ControlContextProvider popupControl={props.popupControl}>
      <Menu menu={{...props.menu }} onClose={onClose} onSelect={onSelect} />
    </ControlContextProvider>
  </LayoutContextProvider>
}

interface Props {
  menu: MenuModel,
  onSelect(item: MenuItem): void,
  root?: HTMLElement;
}

export function openMenu({
  menu,
  onSelect,
  root = document.body,
}: Props) {
  const rootElem = document.createElement('div');
  const reactRoot = ReactDOM.createRoot(rootElem);
  const detach = async () => reactRoot.unmount();
  const popupControl = new PopupControl();

  const html = <BasicMenu menu={menu} onSelect={onSelect} onClose={detach} detach={detach} popupControl={popupControl} />;
  reactRoot.render(html);
  root.appendChild(rootElem); 
  return { popupControl, detach };
}
