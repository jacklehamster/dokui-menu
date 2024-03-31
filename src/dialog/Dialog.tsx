import './text/ProgressiveText';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDialogState } from './useDialogState';
import { DialogModel } from './model/DialogModel';
import { MessageModel } from './model/MessageModel';
import { useRemove } from './useRemove';
import { MenuItem } from '../menu/model/MenuItemModel';
import { Container } from '../container/Container';
import { MenuModel } from '../menu/model/MenuModel';
import { LockStatus, useControls } from '../controls/useControls';
import { Popup } from '../common/popup/Popup';
import { useActiveFocus } from '@/common/popup/useActiveFocus';
import { useEditContext } from '@/context/edit/EditContextProvider';

export interface Props {
  dialog: DialogModel;
  onSelect(item: MenuItem): void
  onClose(): void;
}

export function Dialog({ dialog, onSelect, onClose }: Props): JSX.Element {
  const { next, index } = useDialogState();
  const [menu, setMenu] = useState<MenuModel>();
  const { active } = useActiveFocus();
  const { editing } = useEditContext();

  const { lockState, popupControl } = useControls({
    active,
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
          width: "100%",
          height: "100%",
          display: "flex",
        }}
        onClick={() => popupControl.onAction()}>
          <div style={{ flex: 1 }}>
            <progressive-text period="30">{message?.text}</progressive-text>
          </div>
          {editing && active && <div style={{
              textAlign: "center",
              backgroundColor: "blue",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              color: 'white',
            }}>
              E
            </div>}
        </div>
      </Popup>
      <Container pictures={dialog.pictures} menu={menu}
        onSelect={onSelect}
        onClose={onCloseMenu}
        removed={removed}></Container>
      <Container pictures={message?.pictures} />
    </>
  );
}
