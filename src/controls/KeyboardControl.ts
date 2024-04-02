import { PopupControl } from "./PopupControl";
import { Active } from "dok-types";

export class KeyboardControl implements Active {
  private onKeyUp: () => void;
  private onKeyDown: (e: KeyboardEvent) => void;

  constructor(popupControl: PopupControl) {
    let isKeyDown = false;
    this.onKeyUp = () => {
      isKeyDown = false;
    };
    this.onKeyDown = (e: KeyboardEvent) => {
      if (isKeyDown) {
        return;
      }
      isKeyDown = true;
      switch (e.code) {
        case "KeyS":
        case "ArrowDown":
          popupControl.onDown();
          break;
        case "KeyW":
        case "ArrowUp":
          popupControl.onUp();
          break;
        case "KeyA":
        case "ArrowLeft":
          popupControl.onLeft();
          break;
        case "KeyD":
        case "ArrowRight":
          popupControl.onRight();
          break;
        case "Space":
          popupControl.onAction();
          break;
        case "Escape":
          popupControl.onBack();
          break;
      }
      e.preventDefault();
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
