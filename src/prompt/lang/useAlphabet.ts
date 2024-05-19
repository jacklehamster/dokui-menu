import { useEffect, useMemo, useState } from "react";
import { LanguageModel } from "../model/LanguagesModel";
import Hangul from 'hangul-js';

interface Props {
  languageModel: LanguageModel;
}

export function useAlphabet({ languageModel }: Props) {

  const [capitalize, setCapitalize] = useState(false);
  useEffect(() => {
    if (!languageModel.capitalize) {
      setCapitalize(false);
    }
  }, [languageModel, setCapitalize]);

  const alphabet = useMemo(() => {
    const letters = Hangul.disassemble(languageModel.alphabet);
    return (capitalize ? letters.map(l => l.toUpperCase()) : letters);
  }, [capitalize, Hangul, languageModel]);

  return { alphabet, setCapitalize };
}
