export interface ImageModel {
  src: string;
  transform?: string;
  size?: string;
}

export type Image = ImageModel | string;
