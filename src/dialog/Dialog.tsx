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
import { useActiveFocus } from '../common/popup/useActiveFocus';
import { useEditContext } from '../context/edit/EditContextProvider';
import { PromptModel } from '../prompt/model/PromptModel';
import { useKeyDown } from '../controls/useKeyDown';
import { useEditDialog } from '../context/edit/useEditDialog';
import { openMenu } from '..';
import { map } from 'abstract-list';
import { PictureModel } from '@/picture/model/PictureModel';

export interface Props {
  dialog: DialogModel;
  onSelect(item: MenuItem): void
  onClose(): void;
}

export function Dialog({ dialog, onSelect, onClose }: Props): JSX.Element {
  const { next, index } = useDialogState();
  const [menu, setMenu] = useState<MenuModel>();
  const [prompt, setPrompt] = useState<PromptModel>();
  const { active } = useActiveFocus();
  const { editing } = useEditContext();

  const { lockState, popupControl } = useControls({
    active,
    listener: useMemo(() => ({
      onAction: next,
      onBack: next,
    }), [next]),
  });

  const { editable, editMessage, messages } = useEditDialog({ dialog, active });

  const message = useMemo<MessageModel | undefined>(() => {
    const message = messages.at(index);
    return typeof(message) == "string" ? { text: message} : message;
  }, [index, messages]);

  useEffect(() => {
    if (message?.menu || message?.prompt) {
      setMenu(message?.menu);
      setPrompt(message?.prompt);
    }
  }, [message, setMenu, setPrompt]);

  const { removed, remove } = useRemove();

  useEffect(() => {
    if (index >= messages.length.valueOf()) {
      remove(onClose);
    }
  }, [messages, index, remove, onClose])

  const onCloseMenu = useCallback(async () => {
    setMenu(undefined);
    next();
  }, [setMenu, next]);

  const [editDialogOn, setEditDialogOn] = useState(false);
  useKeyDown({
    enabled: useMemo(() => editable && active && !dialog.builtIn, [active, dialog]),
    key: "KeyE",
    callback: useCallback(() => {
      setEditDialogOn(value => !value);
    }, [setEditDialogOn]),
  });

  const editMenu = useMemo<MenuModel>(() => ({
    builtIn: true,
    layout: {
      position: [50, 200],
      size: [400, 300],
    },
    items: [
      {
        label: "edit text",
        back: true,
        action: () => {
          openMenu({ 
            prompt: {
              label: "Enter a new text",
              defaultText: message?.text,
              languages: ["english", "korean"],
            }, onPrompt(text) {
              editMessage?.(index, text);
            },
            popupControl,
          });
        },
      },
    ],
  }), [message, index, popupControl, editMessage]);

  const pictures = useMemo(() => [...map(dialog.pictures ?? [], p => p), ...map(message?.pictures ?? [], p => p)].filter((p): p is PictureModel => !!p), [dialog, message]);

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
      <Container pictures={pictures} menu={menu} prompt={prompt}
        onSelect={onSelect}
        onClose={onCloseMenu}
        removed={removed}></Container>
      {editDialogOn && <Container menu={editMenu} onClose={() => setEditDialogOn(false)} />}
    </>
  );
}
