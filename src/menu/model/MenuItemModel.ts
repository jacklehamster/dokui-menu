import { DialogModel } from "../../dialog/model/DialogModel";
import { MenuModel } from "./MenuModel";
import { PromptModel } from "../../prompt/model/PromptModel";
import { PictureModel } from "@/picture/model/PictureModel";
import { Image } from "@/picture/model/ImageModel";

export interface MenuItemModel {
  icon?: Image | Image[];
  emoji?: string;
  label: string;
  submenu?: MenuModel;
  dialog?: DialogModel;
  prompt?: PromptModel;
  back?: boolean;
  hideOnSelect?: boolean;
  builtIn?: boolean;
  hidden?: boolean;
  action?: () => Promise<void>;
  selected?: boolean;
  showTriangle?: boolean;
  onHover?: {
    dialog?: DialogModel;
    pictures: PictureModel[];
  }
}

export type MenuItem = MenuItemModel | string;
