import { Blink } from "./Blink";


interface Props {
  spaceCount?: number;
}

export function BlinkUnderline({ spaceCount = 2 }: Props) {
  return <Blink>{new Array(spaceCount).fill("&nbsp;")}</Blink>;
}
