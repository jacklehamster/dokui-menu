import { List } from "abstract-list";
import { MenuItem } from "./MenuItemModel";
import { Style } from "../../common/Style";
import { Layout } from "../../common/layout/Layout";

export interface MenuModel {
  items?: List<MenuItem> | MenuItem[];
  maxRows?: number;
  style?: Style;
  layout?: Layout;
}
