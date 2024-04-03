import React, {  } from 'react';
import { ControlContextProvider } from '../context/controls/ControlContextProvider';
import { LayoutContextProvider } from '../context/layout/LayoutContextProvider';
import { Container, Props as ContainerProps } from '../container/Container';
import { PopupControl } from '../controls/PopupControl';
import { EditContextProvider } from '../context/edit/EditContextProvider';

export interface Props extends Partial<ContainerProps> {
  detach: () => Promise<void>;
  popupControl: PopupControl;
  editor?: boolean;
}

export function BasicPopup(props: Props) {
  return <LayoutContextProvider>
          <ControlContextProvider popupControl={props.popupControl}>
            <EditContextProvider editor={props.editor}>
              <Container {...props} />
            </EditContextProvider>
          </ControlContextProvider>
        </LayoutContextProvider>;
}
