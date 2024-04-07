import { Layout } from "../layout/Layout";
import { Style } from "../Style";

export interface PopupModel {
  layout?: Layout;
  style?: Style;
  backEnabled?: boolean;
  builtIn?: boolean;
}
