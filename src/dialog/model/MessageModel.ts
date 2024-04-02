import { PictureModel } from "@/picture/model/PictureModel";
import { MenuModel } from "../../menu/model/MenuModel";
import { PromptModel } from "@/prompt/model/PromptModel";

export interface MessageModel {
  text?: string;
  menu?: MenuModel;
  prompt?: PromptModel;
  pictures?: PictureModel[];
}

export type Message = MessageModel | string;
