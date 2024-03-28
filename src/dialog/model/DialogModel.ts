import { PopupModel } from "@/common/PopupModel";
import { List } from "abstract-list";
import { Message } from "./MessageModel";

export interface DialogModel extends PopupModel {
  messages: List<Message> | Message[];
  disableBack?: boolean;
}
