import { useCallback, useState } from "react";
import Hangul from 'hangul-js';
import { List } from "abstract-list";

interface Props {
  defaultText?: string;
  randomList?: List<string>;
}

export function useTextInput({ defaultText, randomList }: Props) {
  const [text, setText] = useState(defaultText);

  const addLetter = useCallback((letter: string) => {
    setText(text => {
      const letters = Hangul.disassemble(text ?? "");
      letters.push(letter);
      return Hangul.assemble(letters);
    });
  }, [Hangul, setText]);

  const deleteLetter = useCallback(() => {
    setText(text => {
      const letters = Hangul.disassemble(text ?? "");
      letters.pop();
      return Hangul.assemble(letters);
    });
  }, [Hangul, setText]);

  const randomizeText = useCallback(() => {
    if (randomList) {
      const len = randomList.length.valueOf();
      setText(text => {
        const list = [];
        for (let i = 0; i < len; i++) {
          const str = randomList.at(i);
          if (randomList.at(i) !== text) {
            list.push(str);
          }
        }
        return list.at(Math.floor(Math.random() * list.length));
      });
    }
  }, [randomList, setText]);

  return { text, setText, addLetter, deleteLetter, randomizeText };
}
