import { Menu } from "../menu/Menu";
import { Dialog, MenuModel } from "..";
import { DialogModel } from "../dialog/model/DialogModel";
import { MenuItem } from "../menu/model/MenuItemModel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PictureModel } from "../picture/model/PictureModel";
import { Picture } from "../picture/Picture";
import { PromptModel } from "../prompt/model/PromptModel";
import { Prompt } from "../prompt/Prompt";

export interface Props {
  pictures?: PictureModel[];
  dialog?: DialogModel;
  menu?: MenuModel;
  prompt?: PromptModel;
  onSelect?(item: MenuItem): void;
  onClose?(): void;
  onPrompt?(text: string): void;
  removed?: boolean;
  focusLess?: boolean;
}

export function Container({
  pictures,
  dialog,
  menu,
  prompt,
  onSelect = async() => {},
  onClose = async () => {},
  onPrompt = async() => {},
  removed,
  focusLess,
}: Props) {
  const [index, setIndex] = useState(0);
  const onNext = useCallback(async () => {
    setIndex(index => index + 1);
  }, [setIndex]);

  const elems = useMemo(() => {
    return [
      dialog ? <Dialog dialog={dialog} onSelect={onSelect} onPrompt={onPrompt}  onClose={onNext} focusLess={focusLess} /> : undefined,
      menu ? <Menu menu={menu} onSelect={onSelect} onPrompt={onPrompt} onClose={onNext} /> : undefined,
      prompt ? <Prompt prompt={prompt} onConfirm={onPrompt} onClose={onNext} /> : undefined,
    ].filter((e): e is JSX.Element => !!e);
  }, [menu, dialog, prompt, onSelect, onNext]);

  useEffect(() => {
    if (elems.length && index >= elems.length) {
      setIndex(0);
      onClose();
    }
  }, [index, setIndex, elems, onClose]);

  return <>
    {elems[index]}
    {pictures?.map((picture, index) => <Picture removed={removed} key={index} picture={picture} />)}
  </>;
}
