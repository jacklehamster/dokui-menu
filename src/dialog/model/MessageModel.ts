import { PictureModel } from "@/picture/model/PictureModel";
import { MenuModel } from "../../menu/model/MenuModel";

export interface MessageModel {
  text?: string;
  menu?: MenuModel;
  pictures?: PictureModel[];
}

export type Message = MessageModel | string;
