export interface PopupControlListener {
  onUp?(): void;
  onDown?(): void;
  onLeft?(): void;
  onRight?(): void;
  onAction?(): void;
}
