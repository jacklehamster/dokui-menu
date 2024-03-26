import { UniqueLayoutWithCallback } from "unique-layout";
import { PopupControlListener } from "./PopupControlListener";

const CONTROL_TAG = "control";

export class PopupControl implements PopupControlListener {
  #listeners = new Set<PopupControlListener>();
  #uniqueControls = new UniqueLayoutWithCallback();

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

  addListener(listener: PopupControlListener): void {
    this.#listeners.add(listener);
  }

  removeListener(listener: PopupControlListener): void {
    this.#listeners.delete(listener);
  }
}
