import { useCallback, useMemo, useState } from "react";
import { Language, LanguageModel } from "../model/LanguagesModel";
import { openMenu } from "../../menu/openMenu";
import { MenuItem } from "../../menu/model/MenuItemModel";
import { useControlContext } from "@/context/controls/ControlContextProvider";

interface Props {
  languages?: Language[];
}

const DEFAULT_LANGUAGES: Record<string, LanguageModel> = {
  english: {
    emoji: "🇬🇧",
    name: "english",
    alphabet: "abcdefghijklmnopqrstuvwxyz.-!?0123456789",
    capitalize: true,
  },
  korean: {
    emoji: "🇰🇷",
    name: "한국인",
    alphabet: "ㅂㅈㄷㄱ쇼ㅕㅑㅐㅔㅁㄴㅇㄹ호ㅓㅏㅣㅋㅌㅊ퓨ㅜㅡ.-!?0123456789",
    capitalize: false,
  },
};

const DEFAULT_LANGUAGE = DEFAULT_LANGUAGES["english"];

export function useLanguageModel({ languages }: Props) {
  const [lang, setLang] = useState(0);

  const currentLanguageModel = useMemo(() => {
    const language = languages?.[lang ?? 0] ?? DEFAULT_LANGUAGE;
    return typeof (language) === "string" ? DEFAULT_LANGUAGES[language] : language;
  }, [prompt, languages, lang]);

  const getLanguageModel = useCallback((language: Language) => {
    return typeof (language) === "string" ? DEFAULT_LANGUAGES[language] : language;
  }, []);

  const { popupControl } = useControlContext();
  const chooseLanguage = useCallback(() => {
    openMenu<MenuItem & { index: number }>({
      menu: {
        builtIn: true,
        layout: {
          position: [150, 50],
          size: [200, 200],
        },
        items: languages?.map((language, index) => {
          const languageModel = getLanguageModel(language);
          return {
            emoji: languageModel.emoji,
            label: languageModel.name,
            index,
            back: true,
            selected: lang === index,
          };
        }) ?? [],
      },
      popupControl,
      onSelect(item) {
        setLang(item.index);
      }
    });
  }, [languages, getLanguageModel, setLang, lang, popupControl]);

  return { currentLanguageModel, getLanguageModel, chooseLanguage: languages ? chooseLanguage : undefined };
}
