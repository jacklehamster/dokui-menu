import { Popup } from '..';
import { PictureModel } from './model/PictureModel';

export interface Props {
  picture: PictureModel;
  removed?: boolean;
}

export function Picture({ picture, removed }: Props): JSX.Element {
  return (
    <>
      <Popup
        layout={picture.layout ?? {}}
        style={picture.style}
        removed={removed}
      >
        <div style={{
          padding: 10,
          width: "100%",
          height: "100%",
        }}>
          {picture.images.map((image, index) => <div key={index} style={{
            backgroundImage: `url("${image.src}")`,
            backgroundSize: "contain",
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",        

          }} />)}
        </div>
      </Popup>
    </>
  );
}
