import { useControlContext } from "../../context/controls/ControlContextProvider";
import { useEffect, useState } from "react";

interface Props {
  disabled?: boolean;
}

export function useActiveFocus({ disabled }: Props = {}) {
  const [active, setActive] = useState(!disabled);
  const { popupControl } = useControlContext();

  useEffect(() => {
    if (!disabled) {
      return popupControl.registerActive(setActive);
    }
  }, [popupControl, setActive, disabled]);

  return { active };
}
