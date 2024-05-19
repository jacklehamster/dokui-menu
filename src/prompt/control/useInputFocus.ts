import { useCallback, useEffect, useRef, useState } from "react";
import { useControlContext } from "@dobuki/react-popup";

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

  const setEndOfContenteditable = useCallback((elem: HTMLDivElement) => {
    window.getSelection()?.selectAllChildren(elem);
    window.getSelection()?.collapseToEnd();

  }, [])


  const focus = useCallback((end?: boolean) => {
    if (inputRef.current) {
      inputRef.current.focus();
      if (end) {
        setEndOfContenteditable(inputRef.current);
      }
    }
  }, [inputRef.current, setEndOfContenteditable]);

  return { inputRef, inputFocus, focus };
}
