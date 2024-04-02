import { useCallback, useMemo, useState } from "react";
import { useControls } from "./useControls";
import { PopupControlListener } from "./PopupControlListener";

interface Props {
  active: boolean;
}

export function useMouseHover({ active }: Props) {
  const [mouseHoverEnabled, setMouseHoverEnabled] = useState(false);

  const enableMouseHover = useCallback(!mouseHoverEnabled
    ? () => setMouseHoverEnabled(true)
    : () => { },
    [mouseHoverEnabled]);

  const disableMouseHover = useCallback(!mouseHoverEnabled
    ? () => { }
    : () => setMouseHoverEnabled(false),
    [mouseHoverEnabled]);


  const onUp = useCallback(() => {
    setMouseHoverEnabled(false);
  }, [setMouseHoverEnabled]);

  const onDown = useCallback(() => {
    setMouseHoverEnabled(false);
  }, [setMouseHoverEnabled]);

  useControls({
    active,
    listener: useMemo<PopupControlListener>(() => ({
      onUp,
      onDown,
    }), [setMouseHoverEnabled, onUp, onDown]),
  });

  return { mouseHoverEnabled, enableMouseHover, disableMouseHover };
}
