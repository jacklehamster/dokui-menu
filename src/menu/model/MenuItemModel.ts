import { DialogModel } from "@/dialog/model/DialogModel";
import { MenuModel } from "./MenuModel";
import { PromptModel } from "@/prompt/model/PromptModel";

export interface MenuItemModel {
  label: string;
  submenu?: MenuModel;
  dialog?: DialogModel;
  prompt?: PromptModel;
  back?: boolean;
  hideOnSelect?: boolean;
  builtIn?: boolean;
  hidden?: boolean;
  action?: () => void;
}

export type MenuItem = MenuItemModel | string;
