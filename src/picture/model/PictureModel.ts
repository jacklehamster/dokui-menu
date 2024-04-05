import { PopupModel } from "../../common/popup/PopupModel";
import { Image } from "./ImageModel";

export interface PictureModel extends PopupModel {
  images: Image[];
}
