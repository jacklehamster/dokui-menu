import { useCallback, useMemo, useState } from "react";
import { useEditContext } from "./EditContextProvider";
import { DialogModel } from "../../dialog/model/DialogModel";
import { MessageModel } from "../../dialog/model/MessageModel";
import { map } from "abstract-list";

interface Props {
  dialog: DialogModel;
  active: boolean;
}

interface Result extends DialogModel {
  editable: boolean;
  editMessage(index: number, text: string): void;
  insertMessage(index: number, text: string): void;
  deleteMessage(index: number): void;
}

export function useEditDialog({ dialog, active }: Props): Result {
  const { editing } = useEditContext();
  const [editCount, setEditCount] = useState(0);

  const insertMessage = useCallback((index: number, text: string) => {
    const messages: MessageModel[] = map(dialog.messages, m => m).filter((m):m is MessageModel => !!m);
    messages.splice(index, 0, {
      text,
    });
    dialog.messages = messages;
    setEditCount(count => count + 1);
  }, [dialog]);

  const deleteMessage = useCallback((index: number) => {
    const messages: MessageModel[] = map(dialog.messages, m => m).filter((m):m is MessageModel => !!m);
    messages.splice(index, 1);
    dialog.messages = messages;
    setEditCount(count => count + 1);
  }, [dialog]);

  const editMessage = useCallback((index: number, text: string) => {
    const messages: MessageModel[] = map(dialog.messages, m => m).filter((m):m is MessageModel => !!m);
    const message = messages[index];
    const messageModel = !message ? {} : typeof(message) === "string" ? { text: message} : message;
    messageModel.text = text;
    messages[index] = messageModel;
    dialog.messages = messages;
    setEditCount(count => count + 1);
  }, [dialog]);

  const messages = useMemo(() => !active ? dialog.messages : map(dialog.messages, m => m), [dialog, editCount, active]);

  return {
    ...dialog,
    messages,
    editable: editing,
    editMessage,
    insertMessage,
    deleteMessage,
  };
}
