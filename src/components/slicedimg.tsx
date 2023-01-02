import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  imageSrcState, spriteSizeState, imageScaleState, imageSizeState,
} from '../store/index';

export default function SlicedImage() {
  const imageSrc = useRecoilValue(imageSrcState);

  const {
    x, y, width, height,
  } = useRecoilValue(spriteSizeState);

  const imageScale = useRecoilValue(imageScaleState);

  const imageSize = useRecoilValue(imageSizeState);

  return (
    <div className='flex items-center justify-center m-3'>
      <div
        style={{
          width,
          height,
          backgroundImage: `url(${imageSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: `${-x}px`,
          backgroundPositionY: `${-y}px`,
          backgroundSize: `${imageSize.width * imageScale}px ${imageSize.height * imageScale}px`,
        }}
      />
    </div>
  );
}
