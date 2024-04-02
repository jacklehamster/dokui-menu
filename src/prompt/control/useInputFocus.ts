import { useControlContext } from "../../context/controls/ControlContextProvider";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  text?: string;
}

export function useInputFocus({ text }: Props) {

  const { popupControl } = useControlContext();

  const [inputFocus, setInputFocus] = useState(false);
  useEffect(() => {
    if (inputFocus) {
      popupControl.deactivate();
      return () => popupControl.activate();
    }
  }, [popupControl, inputFocus]);

  const inputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      const onFocus = () => {
        setInputFocus(true);
        window.getSelection()?.selectAllChildren(input);
      };
      const onBlur = () => {
        setInputFocus(false);
        window.getSelection()?.empty();
      };
      input.addEventListener("focus", onFocus);
      input.addEventListener("blur", onBlur);
    }
  }, [inputRef.current, setInputFocus]);

  useEffect(() => {
    const input = inputRef.current;
    if (input && input.textContent !== text) {
      input.textContent = text ?? null;
    }
  }, [text, inputRef.current]);

  const focus = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

  return { inputRef, inputFocus, focus };
}
