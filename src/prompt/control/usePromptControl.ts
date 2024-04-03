import { useActiveFocus } from "../../common/popup/useActiveFocus";
import { LockStatus, useControls } from "../../controls/useControls";
import { useKeyDown } from "../../controls/useKeyDown";
import { useMouseHover } from "../../controls/useMouseHover";
import { useRemove } from "../../dialog/useRemove";
import { List } from "abstract-list";
import { useCallback, useMemo, useState } from "react";

interface Props {
  alphabet: string[];
  onClose(): void;
  addLetter(letter: string): void;
  deleteLetter(): void;
  randomizeText(): void;
  chooseLanguage?(): void;
  toggleCapitalize(): void;
  onConfirm(text: string): void;
  text?: string;
  randomList?: List<string>;
  inputFocus: boolean;
  canCapitalize?: boolean;
  focus(end?: boolean): void;
}

const COLUMNS = 10;

export enum ActionButton {
  LANG,
  CAP,
  SPACE,
  DEL,
  OK,
  RANDOM,
}

export function usePromptControl({
  alphabet,
  onClose, addLetter, deleteLetter, randomizeText, chooseLanguage, toggleCapitalize,
  onConfirm, text,
  randomList,
  inputFocus,
  canCapitalize,
  focus,
}: Props) {
  const { active } = useActiveFocus();
  const { removed, remove } = useRemove();
  const [position, setPosition] = useState<number[]>([0, 0]);

  const actionBar = useMemo(() => {
    const leftSide = [];
    if (chooseLanguage) {
      leftSide.push(ActionButton.LANG);
    }
    if (canCapitalize) {
      leftSide.push(ActionButton.CAP);
    }
    const rightSize = [ActionButton.DEL, ActionButton.OK];
    const mid = new Array(COLUMNS - leftSide.length - rightSize.length).fill(ActionButton.SPACE);

    return leftSide.concat(mid).concat(rightSize);
  }, [canCapitalize, chooseLanguage]);

  const closePrompt = useCallback(() => {
    remove(onClose);
  }, [remove, onClose]);

  const onSpace = useCallback((pos: number[]) => {
    return actionBar[pos[0]] === ActionButton.SPACE && pos[1] === 4;
  }, [actionBar]);
  const onLetter = useCallback((pos: number[]) => {
    return pos[1] >= 0 && pos[1] <= 3;
  }, []);

  const confirmText = useCallback(() => {
    if (text) {
      onConfirm(text);
      closePrompt();
    }
  }, [text, onConfirm, closePrompt]);

  const onAction = useCallback(() => {
    if (onLetter(position)) {
      addLetter(alphabet[position[1] * COLUMNS + position[0]]);
      return;
    }
    if (onSpace(position)) {
      addLetter(' ');
      return;
    }
    if (position[1] === -1) {
      randomizeText();
      return;
    }
    if (position[1] === 4) {
      switch (actionBar[position[0]]) {
        case ActionButton.LANG:
          chooseLanguage?.();
          break;
        case ActionButton.CAP:
          toggleCapitalize();
          break;
        case ActionButton.DEL:
          deleteLetter();
          break;
        case ActionButton.OK:
          confirmText();
          break;
      }
    }
  }, [chooseLanguage, position, toggleCapitalize, onLetter, alphabet, randomizeText, confirmText, addLetter, deleteLetter, actionBar]);

  const onLeft = useCallback(() => {
    setPosition(pos => {
      if (onSpace(pos)) {
        let i;
        for (i = 0; i < actionBar.length; i++) {
          if (actionBar[i] === ActionButton.SPACE) {
            break;
          }
        }
        return [Math.max(0, i - 1), pos[1]];
      }
      return [Math.max(pos[0] - 1, 0), pos[1]];
    });
  }, [setPosition, onSpace, actionBar]);

  const onRight = useCallback(() => {
    setPosition(pos => {
      if (onSpace(pos)) {
        let i;
        for (i = actionBar.length - 1; i >= 0; i--) {
          if (actionBar[i] === ActionButton.SPACE) {
            break;
          }
        }
        return [Math.min(actionBar.length - 1, i + 1), pos[1]];
      }
      return [Math.min(pos[0] + 1, COLUMNS - 1), pos[1]];
    });
  }, [setPosition, onSpace, actionBar]);

  const onUp = useCallback(() => {
    setPosition(pos => [pos[0], Math.max(randomList ? -1 : 0, pos[1] - 1)]);
  }, [setPosition, randomList]);

  const onDown = useCallback(() => {
    setPosition(pos => [pos[0], Math.min(4, pos[1] + 1)]);
  }, [setPosition]);

  const { lockState, popupControl } = useControls({
    active,
    listener: useMemo(() => ({
      onLeft,
      onRight,
      onUp,
      onDown,
      onBack: closePrompt,
      onAction,
      onStart: confirmText,
    }), [onLeft, onRight, onUp, onDown, closePrompt, onAction]),
  });

  useKeyDown({
    enabled: useMemo(() => canCapitalize && !inputFocus, [canCapitalize, inputFocus]),
    key: ["ShiftLeft", "ShiftRight"],
    callback: toggleCapitalize,
  });

  useKeyDown({
    enabled: !inputFocus,
    key: ["Enter"],
    callback: useCallback(() => popupControl.onAction(), [popupControl]),
  });

  useKeyDown({
    enabled: !inputFocus,
    key: ["Backspace", "Tab"],
    callback: () => focus(true),
  });

  const { enableMouseHover, mouseHoverEnabled } = useMouseHover({ active });

  return {
    disabled: lockState === LockStatus.LOCKED,
    removed,
    enableMouseHover,
    mouseHoverEnabled,
    position,
    setPosition,
    actionButtonSelected: position[1] < 0 ? ActionButton.RANDOM : position[1] !== 4 ? undefined : actionBar[position[0]],
  }
}
