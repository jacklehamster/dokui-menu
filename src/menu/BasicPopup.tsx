import React from 'react';
import { ControlContextProvider } from '../context/controls/ControlContextProvider';
import { LayoutContextProvider } from '@/context/layout/LayoutContextProvider';
import { Container, Props as ContainerProps } from '@/container/Container';
import { PopupControl } from '..';

export interface Props extends Partial<ContainerProps> {
  detach: () => Promise<void>;
  popupControl: PopupControl;
}

export function BasicPopup(props: Props) {
  const onSelect = props.onSelect ?? ((item) => console.log(item));
  return <LayoutContextProvider>
          <ControlContextProvider popupControl={props.popupControl}>
            <Container {...props} onSelect={onSelect} />
          </ControlContextProvider>
        </LayoutContextProvider>;
}
