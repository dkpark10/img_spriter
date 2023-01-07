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

  if (width <= 3 && height <= 3) return <div />;

  return (
    <div className='flex items-center justify-center m-3'>
      <div
        className='border border-solid border-zinc-700'
        style={{
          width,
          height,
          backgroundImage: `url(${imageSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: `${-x}px`,
          backgroundPositionY: `${-y}px`,
          backgroundSize: `${Math.floor(imageSize.width * imageScale)}px ${Math.floor(imageSize.height * imageScale)}px`,
        }}
      />
    </div>
  );
}
