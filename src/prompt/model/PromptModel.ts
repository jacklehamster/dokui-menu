import { List } from "abstract-list";
import { PopupModel } from "../../common/popup/PopupModel";
import { Language } from "./LanguagesModel";

export interface PromptModel extends PopupModel {
  label?: string;
  defaultText?: string;
  randomText?: List<string> | string[];
  languages?: Language[];
  input?: (text: string) => void;
}
