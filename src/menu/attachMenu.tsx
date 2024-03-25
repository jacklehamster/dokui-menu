import ReactDOM from 'react-dom/client';
import { Props, Menu } from './Menu';
import { PopupControl } from '../controls/PopupControl';
import { ControlContextProvider } from '../context/controls/ControlContextProvider';
import { LayoutContextProvider } from '@/context/layout/LayoutContextProvider';
import { useInitLayoutContext } from '@/context/layout/useInitLayoutContext';

interface BasicMenuProps extends Partial<Props> {
  detach: () => Promise<void>;
  popupControl: PopupControl;
}

export function BasicMenu(props: BasicMenuProps) {
  const {context} = useInitLayoutContext();
  const onClose = props.onClose ?? props.detach;
  const onSelect = props.onSelect ?? ((item) => console.log(item));
  return <LayoutContextProvider context={context}>
    <ControlContextProvider popupControl={props.popupControl}>
      <Menu menu={{...props.menu }} onClose={onClose} onSelect={onSelect}  />
    </ControlContextProvider>;
  </LayoutContextProvider>
}

export function attachMenu(
    root: HTMLElement,
    props: Partial<Props>) {
  const rootElem = document.createElement('div');
  const reactRoot = ReactDOM.createRoot(rootElem);
  const detach = async () => reactRoot.unmount();
  const popupControl = new PopupControl();

  const dom = <BasicMenu {...props} detach={detach} popupControl={popupControl} />;
  reactRoot.render(dom);
  root.appendChild(rootElem); 
  return { popupControl, detach };
}
