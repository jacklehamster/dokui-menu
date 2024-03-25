import { MenuModel } from "./MenuModel";

export interface MenuItemModel {
  label: string;
  submenu?: MenuModel;
  back?: boolean;
}

export type MenuItem = MenuItemModel | string;
