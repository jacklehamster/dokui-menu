import { useMemo } from "react";
import { Image, ImageModel } from "./model/ImageModel"

interface Props {
  images: Image[] | Image;
}

export function Images({ images }: Props) {
  const imgs = useMemo(() => Array.isArray(images) ? images : [images], [images]);
  return <>{imgs.map((image, index) => {
    const imgModel: ImageModel = typeof(image) === "string" ? { src: image } : image;
    return <div key={index} style={{
      backgroundImage: `url("${imgModel.src}")`,
      backgroundSize: imgModel.size ?? "contain",
      width: "100%",
      height: "100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      marginTop: `-${index * 100}%`,
      transform: imgModel.transform,
  }} />; })}</>;
}
