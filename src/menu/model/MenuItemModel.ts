import { DialogModel } from "../../dialog/model/DialogModel";
import { MenuModel } from "./MenuModel";
import { PromptModel } from "../../prompt/model/PromptModel";

export interface MenuItemModel {
  emoji?: string;
  label: string;
  submenu?: MenuModel;
  dialog?: DialogModel;
  prompt?: PromptModel;
  back?: boolean;
  hideOnSelect?: boolean;
  builtIn?: boolean;
  hidden?: boolean;
  action?: () => void;
  selected?: boolean;
  showTriangle?: boolean;
}

export type MenuItem = MenuItemModel | string;
