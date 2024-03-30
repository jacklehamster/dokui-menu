import { PopupModel } from "@/common/PopupModel";
import { List } from "abstract-list";
import { Message } from "./MessageModel";
import { PictureModel } from "@/picture/model/PictureModel";

export interface DialogModel extends PopupModel {
  pictures?: PictureModel[];
  messages: List<Message> | Message[];
}
