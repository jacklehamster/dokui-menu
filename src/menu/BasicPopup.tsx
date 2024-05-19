import React, {  } from 'react';
import { Container, Props as ContainerProps } from '../container/Container';
import { EditContextProvider } from '../context/edit/EditContextProvider';
import { ControlContextProvider } from '@dobuki/react-popup';
import { LayoutContextProvider } from "@dobuki/react-popup"
import { PopupControl } from '@dobuki/react-popup';

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
