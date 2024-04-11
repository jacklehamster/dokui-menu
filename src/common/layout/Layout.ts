export interface LayoutModel {
  name?: string;
  position?: [number | undefined | null, number | undefined | null];
  size?: [number | undefined | null, number | undefined | null];
  positionFromRight?: boolean;
  positionFromBottom?: boolean;
}

export type Layout = LayoutModel | string;
