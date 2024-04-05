import { openMenu, PopupControl } from "..";
import { Language } from "./model/LanguagesModel";

interface Props {
  label?: string;
  defaultText?: string;
  languages?: Language[];
  popupControl?: PopupControl;
}

export async function promptText({
  label, defaultText, languages = ["english", "korean"], popupControl = new PopupControl(),
}: Props): Promise<string | undefined> {
  return new Promise((resolve) => {
    openMenu({
      prompt: {
        label,
        defaultText,
        languages,
      },
      onPrompt(text) {
        resolve(text);
      },
      onClose() {
        resolve(undefined);
      },
      popupControl,
    });
  });
}
