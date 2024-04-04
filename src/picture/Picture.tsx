import { useEffect, useRef } from 'react';
import { Popup } from '..';
import { PictureModel } from './model/PictureModel';

export interface Props {
  picture: PictureModel;
  removed?: boolean;
}

export function Picture({ picture, removed }: Props): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <>
      <Popup
        layout={picture.layout ?? {}}
        style={picture.style}
        removed={removed}
      >
        <div style={{
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "hidden",
        }}>
          {picture.images.map((image, index) => <div key={index} style={{
            backgroundImage: `url("${image.src}")`,
            backgroundSize: "contain",
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            marginTop: `-${index * 100}%`,
          }} />)}
        </div>
      </Popup>
    </>
  );
}
