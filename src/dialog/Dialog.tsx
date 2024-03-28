import './text/ProgressiveText';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDialogState } from './useDialogState';
import { DialogModel } from './model/DialogModel';
import { MessageModel } from './model/MessageModel';
import { LockStatus, MenuModel, Popup, useControlsLock } from '..';
import { useRemove } from './useRemove';
import { MenuItem } from '@/menu/model/MenuItemModel';
import { Container } from '@/container/Container';

export interface Props {
  dialog: DialogModel;
  onSelect(item: MenuItem): void
  onClose(): void;
}

export function Dialog({ dialog, onSelect, onClose }: Props): JSX.Element {
  const { next, index } = useDialogState();
  const [menu, setMenu] = useState<MenuModel>();

  const { lockState, popupControl } = useControlsLock({
    listener: useMemo(() => ({
      onAction: next,
      onBack: next,
    }), [next]),
  });

  const message = useMemo<MessageModel | undefined>(() => {
    const message = dialog.messages.at(index);
    return typeof(message) == "string" ? { text: message} : message;
  }, [index]);

  useEffect(() => {
    if (message?.menu) {
      setMenu(message?.menu);
    }
  }, [message, setMenu]);

  const { removed, remove } = useRemove();

  useEffect(() => {
    if (index >= dialog.messages.length.valueOf()) {
      remove(onClose);
    }
  }, [dialog, index, remove, onClose])

  const onCloseMenu = useCallback(async () => {
    setMenu(undefined);
    next();
  }, [setMenu, next]);

  return (
    <>
      <Popup
        layout={dialog.layout ?? {}}
        style={dialog.style}
        disabled={lockState === LockStatus.LOCKED}
        removed={removed}
        onBack={dialog.disableBack ? undefined : next}
      >
        <div style={{
          padding: 10,
          width: "100%",
          height: "100%",
        }}
        onClick={() => popupControl.onAction()}>
          <progressive-text period="30">{message?.text}</progressive-text>
        </div>
      </Popup>
      <Container menu={menu} onSelect={onSelect} onClose={onCloseMenu} ></Container>
    </>
  );
}
