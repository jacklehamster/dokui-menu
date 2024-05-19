import { DialogModel } from "../../dialog/model/DialogModel";
import { PopupModel } from "@dobuki/react-popup";
import { Image } from "./ImageModel";

export interface PictureModel extends PopupModel {
  images: Image[];
  dialog?: DialogModel;
}
