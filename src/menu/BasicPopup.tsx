import React, { useEffect, useState } from 'react';
import { ControlContextProvider } from '../context/controls/ControlContextProvider';
import { LayoutContextProvider } from '../context/layout/LayoutContextProvider';
import { Container, Props as ContainerProps } from '../container/Container';
import { PopupControl } from '../controls/PopupControl';
import { EditContextProvider, useEditContext } from '../context/edit/EditContextProvider';

export interface Props extends Partial<ContainerProps> {
  detach: () => Promise<void>;
  popupControl: PopupControl;
}

export function BasicPopup(props: Props) {
  const onSelect = props.onSelect ?? ((item) => console.log(item));

  return <LayoutContextProvider>
          <ControlContextProvider popupControl={props.popupControl}>
            <EditContextProvider>
              <Container {...props} onSelect={onSelect} onClose={props.onClose} />
            </EditContextProvider>
          </ControlContextProvider>
        </LayoutContextProvider>;
}
