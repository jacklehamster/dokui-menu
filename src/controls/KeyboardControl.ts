import { Keyboard } from "@etsoo/shared";
import { PopupControl } from "./PopupControl";
import { Active } from "dok-types";

type KeyMapping = {
  [key in Keyboard.Codes | string]?: (control: PopupControl) => void;
};

export class KeyboardControl implements Active {
  private onKeyUp: () => void;
  private onKeyDown: (e: KeyboardEvent) => void;

  constructor(popupControl: PopupControl, private keyMapping: KeyMapping = {
    KeyS: PopupControl.DOWN,
    ArrowDown: PopupControl.DOWN,
    KeyW: PopupControl.UP,
    ArrowUp: PopupControl.UP,
    KeyA: PopupControl.LEFT,
    ArrowLeft: PopupControl.LEFT,
    KeyD: PopupControl.RIGHT,
    ArrowRight: PopupControl.RIGHT,
    Space: PopupControl.ACTION,
    Escape: PopupControl.BACK,
    Enter: PopupControl.START,
  }) {
    let isKeyDown = false;
    this.onKeyUp = () => {
      isKeyDown = false;
    };
    this.onKeyDown = (e: KeyboardEvent) => {
      if (isKeyDown) {
        return;
      }
      isKeyDown = true;
      const action = keyMapping[e.code];
      if (action) {
        action(popupControl);
        e.preventDefault();
      }
    };
    this.activate();
    popupControl.addActivateListener(this);
  }

  activate(): void {
    document.removeEventListener("keyup", this.onKeyUp);
    document.removeEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
    document.addEventListener("keydown", this.onKeyDown);
  }

  deactivate(): void {
    document.removeEventListener("keyup", this.onKeyUp);
    document.removeEventListener("keydown", this.onKeyDown);
  }
}
