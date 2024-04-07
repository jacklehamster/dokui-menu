import { PictureModel } from "../../picture/model/PictureModel";
import { MenuModel } from "../../menu/model/MenuModel";
import { PromptModel } from "../../prompt/model/PromptModel";
import { MenuItem } from "../../menu/model/MenuItemModel";

export interface MessageModel<I extends MenuItem = MenuItem> {
  text?: string;
  menu?: MenuModel<I>;
  prompt?: PromptModel;
  pictures?: PictureModel[];
}

export type Message<I extends MenuItem = MenuItem> = MessageModel<I> | string;
