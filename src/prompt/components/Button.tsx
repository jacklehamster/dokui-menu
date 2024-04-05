interface Props {
  selected: boolean;
  hideOutline?: boolean;
  emoji?: string;
  text?: string;
  padding?: string | number;
  margin?: string | number;
  disabled?: boolean;
  onMouseOver?(): void;
  onMouseDown?(): void;
  onClick?(): void;
  stretch?: boolean;
}

export function Button({ stretch, selected, hideOutline, emoji, text, padding, margin, disabled, onMouseOver, onMouseDown, onClick }: Props) {
  return <div style={{
    padding,
    margin,
    outline: !hideOutline ? "1px solid #333333" : undefined,
    backgroundColor: selected ? "white" : "black",
    opacity: disabled ? .3 : 1,
    transition: "opacity .3s",
    textAlign: "center",
    flexGrow: stretch ? 1 : undefined,
  }} onMouseOver={onMouseOver} onMouseDown={onMouseDown} onClick={onClick}>
    <span style={{
      color: selected ? "transparent" : "white",
      textShadow: selected ? "0 0 0 black" : undefined,
    }}>{emoji}</span>
    <span style={{
      color: selected ? "black" : "white",
    }}>{text}</span>
  </div>;  
}
