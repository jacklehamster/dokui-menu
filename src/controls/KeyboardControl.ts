import { PopupControl } from "./PopupControl";

export class KeyboardControl {
  constructor(popupControl: PopupControl) {
    let isKeyDown = false;
    document.addEventListener("keyup", e => {
      isKeyDown = false;
    });
    document.addEventListener("keydown", e => {
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
        case "Space":
          popupControl.onAction();
          break;
      }
      e.preventDefault();
    });
  }
}
