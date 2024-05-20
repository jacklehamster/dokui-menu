import { Image } from "@dobuki/react-picture";
import { DialogModel } from "../../dialog/model/DialogModel";
import { PopupModel } from "@dobuki/react-popup";

export interface PictureModel extends PopupModel {
  images: Image[];
  dialog?: DialogModel;
}
