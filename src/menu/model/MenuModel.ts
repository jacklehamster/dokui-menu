import { List } from "abstract-list";
import { MenuItem } from "./MenuItemModel";
import { PictureModel } from "../../picture/model/PictureModel";
import { PopupModel } from "@dobuki/react-popup";

export interface MenuModel<I extends MenuItem = MenuItem> extends PopupModel {
  pictures?: PictureModel[];
  items?: List<I> | I[];
}
