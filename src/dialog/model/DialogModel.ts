import { PopupModel } from "../../common/popup/PopupModel";
import { List } from "abstract-list";
import { Message } from "./MessageModel";
import { PictureModel } from "../../picture/model/PictureModel";
import { MenuItem } from "../../menu/model/MenuItemModel";

export interface DialogModel<I extends MenuItem = MenuItem> extends PopupModel {
  pictures?: List<PictureModel> | PictureModel[];
  messages: List<Message<I>> | Message<I>[];
}
