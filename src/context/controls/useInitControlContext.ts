import { useMemo } from "react";
import { ControlContextType } from "./ControlContext";
import { PopupControl } from "../../controls/PopupControl";

interface Props {
  popupControl: PopupControl;
}

export function useInitControlContext({ popupControl }: Props) {
  const context: ControlContextType = useMemo(() => ({
    popupControl,
  }), [popupControl]);

  return context;
}
