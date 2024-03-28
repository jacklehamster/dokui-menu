import { MenuModel } from "@/menu/model/MenuModel";

export interface MessageModel {
  text?: string;
  menu?: MenuModel;
}

export type Message = MessageModel | string;
