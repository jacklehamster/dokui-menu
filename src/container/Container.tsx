import { Menu } from "../menu/Menu";
import { Dialog, MenuModel } from "..";
import { DialogModel } from "@/dialog/model/DialogModel";
import { MenuItem } from "@/menu/model/MenuItemModel";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface Props {
  menu?: MenuModel;
  dialog?: DialogModel;
  onSelect(item: MenuItem): void;
  onClose?(): void;
}

export function Container({
  menu,
  dialog,
  onSelect,
  onClose = async () => {},
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

  return elems[index];
}
