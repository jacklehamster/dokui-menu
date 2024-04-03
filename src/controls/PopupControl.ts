import { UniqueLayoutWithCallback } from "unique-layout";
import { PopupControlListener } from "./PopupControlListener";
import { Active } from "dok-types";

const CONTROL_TAG = "control";

export class PopupControl implements PopupControlListener, Active {
  #listeners = new Set<PopupControlListener>();
  #uniqueControls = new UniqueLayoutWithCallback();
  #activateListeners = new Set<Active>();

  activate(): void {
    this.#activateListeners.forEach(listener => listener.activate?.());
  }

  deactivate(): void {
    this.#activateListeners.forEach(listener => listener.deactivate?.());
  }

  addActivateListener(listener: Active): void {
    this.#activateListeners.add(listener);
  }

  removeActivateListener(listener: Active): void {
    this.#activateListeners.delete(listener);
  }

  registerActive(setActive: (active: boolean) => void): () => void {
    return this.#uniqueControls.registerLayout(CONTROL_TAG, setActive);
  }

  onUp(): void {
    for (const listener of this.#listeners) {
      listener.onUp?.();
    }
  }

  onDown(): void {
    for (const listener of this.#listeners) {
      listener.onDown?.();
    }
  }

  onLeft(): void {
    for (const listener of this.#listeners) {
      listener.onLeft?.();
    }
  }

  onRight(): void {
    for (const listener of this.#listeners) {
      listener.onRight?.();
    }
  }

  onAction(): void {
    for (const listener of this.#listeners) {
      listener.onAction?.();
    }
  }

  onBack(): void {
    for (const listener of this.#listeners) {
      listener.onBack?.();
    }
  }

  onStart(): void {
    for (const listener of this.#listeners) {
      listener.onStart?.();
    }
  }

  addListener(listener: PopupControlListener): void {
    this.#listeners.add(listener);
  }

  removeListener(listener: PopupControlListener): void {
    this.#listeners.delete(listener);
  }

  static DOWN = (control: PopupControl) => control.onDown();
  static UP = (control: PopupControl) => control.onUp();
  static LEFT = (control: PopupControl) => control.onLeft();
  static RIGHT = (control: PopupControl) => control.onRight();
  static ACTION = (control: PopupControl) => control.onAction();
  static BACK = (control: PopupControl) => control.onBack();
  static START = (control: PopupControl) => control.onStart();
}
