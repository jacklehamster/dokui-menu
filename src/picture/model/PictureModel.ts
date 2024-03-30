import { PopupModel } from "../../common/PopupModel";
import { ImageModel } from "./ImageModel";

export interface PictureModel extends PopupModel {
  images: ImageModel[];
}
