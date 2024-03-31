import { useControlContext } from "@/context/controls/ControlContextProvider";
import { useEffect, useState } from "react";

export function useActiveFocus() {
  const [active, setActive] = useState(true);
  const { popupControl } = useControlContext();

  useEffect(() => {
    return popupControl.registerActive(setActive);
  }, [popupControl, setActive]);

  return { active };
}
