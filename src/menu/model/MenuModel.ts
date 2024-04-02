import { List } from "abstract-list";
import { MenuItem } from "./MenuItemModel";
import { PopupModel } from "../../common/popup/PopupModel";
import { PictureModel } from "@/picture/model/PictureModel";

export interface MenuModel extends PopupModel {
  pictures?: PictureModel[];
  items?: List<MenuItem> | MenuItem[];
  builtIn?: boolean;
}
