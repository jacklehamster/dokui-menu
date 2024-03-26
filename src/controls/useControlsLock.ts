import { useEffect, useState } from "react";
import { PopupControlListener } from "./PopupControlListener";
import { useControlContext } from "../context/controls/ControlContextProvider";

export enum LockStatus {
  UNLOCKED,
  LOCKED,
}

interface Props {
  listener: PopupControlListener;
}

export function useControlsLock({ listener }: Props) {
  const { popupControl } = useControlContext();
  const [active, setActive] = useState(true);

  useEffect(() => {
    return popupControl.registerActive(setActive);
  }, [popupControl, setActive]);

  useEffect((): (() => void) | void => {
    if (active) {
      popupControl.addListener(listener);
      return () => {
        popupControl.removeListener(listener);
      };
    }
  }, [listener, popupControl, active]);

  return { lockState: active ? LockStatus.UNLOCKED : LockStatus.LOCKED, popupControl };
}
