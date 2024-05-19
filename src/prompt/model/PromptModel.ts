import { List } from "abstract-list";
import { Language } from "./LanguagesModel";
import { PopupModel } from "@dobuki/react-popup";

export interface PromptModel extends PopupModel {
  label?: string;
  defaultText?: string;
  randomText?: List<string> | string[];
  languages?: Language[];
  input?: (text: string) => void;
}
