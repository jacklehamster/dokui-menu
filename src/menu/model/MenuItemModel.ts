import { DialogModel } from "@/dialog/model/DialogModel";
import { MenuModel } from "./MenuModel";

export interface MenuItemModel {
  label: string;
  submenu?: MenuModel;
  dialog?: DialogModel;
  back?: boolean;
  hideOnSelect?: boolean;
}

export type MenuItem = MenuItemModel | string;
