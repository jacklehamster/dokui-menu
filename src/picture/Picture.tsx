import { Popup } from '..';
import { PictureModel } from './model/PictureModel';
import { Images } from './Images';
import { Container } from '../container/Container';
import { useState } from 'react';

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
        clickThrough
      >
        <div style={{
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "hidden",
        }}>
          <Images images={picture.images} />
        </div>
      </Popup>
      {picture.dialog && <Container dialog={picture.dialog} focusLess removed={removed} />}
    </>
  );
}
