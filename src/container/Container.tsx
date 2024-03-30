import { Menu } from "../menu/Menu";
import { Dialog, MenuModel } from "..";
import { DialogModel } from "../dialog/model/DialogModel";
import { MenuItem } from "../menu/model/MenuItemModel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PictureModel } from "../picture/model/PictureModel";
import { Picture } from "../picture/Picture";

export interface Props {
  pictures?: PictureModel[];
  dialog?: DialogModel;
  menu?: MenuModel;
  onSelect?(item: MenuItem): void;
  onClose?(): void;
  removed?: boolean;
}

export function Container({
  pictures,
  dialog,
  menu,
  onSelect = async() => {},
  onClose = async () => {},
  removed,
}: Props) {
  const [index, setIndex] = useState(0);
  const onNext = useCallback(async () => {
    setIndex(index => index + 1);
  }, [setIndex]);

  const elems = useMemo(() => {
    return [
      dialog ? <Dialog dialog={dialog} onSelect={onSelect} onClose={onNext} /> : undefined,
      menu ? <Menu menu={menu} onSelect={onSelect} onClose={onNext} /> : undefined,
    ].filter((e): e is JSX.Element => !!e);
  }, [menu, dialog, onSelect, onNext]);

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
