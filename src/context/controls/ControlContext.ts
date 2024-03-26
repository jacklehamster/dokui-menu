import { PopupControl } from "../../controls/PopupControl";

export interface ControlContextType {
  popupControl: PopupControl;
}

export const DEFAULT_CONTROL_CONTEXT: ControlContextType = {
  popupControl: new PopupControl(),
};
