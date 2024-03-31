import { PopupModel } from "../../common/popup/PopupModel";
import { ImageModel } from "./ImageModel";

export interface PictureModel extends PopupModel {
  images: ImageModel[];
}
