import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  imageSrcState, rectSizeeState, imageScaleState, imageSizeState, imageLoadStatusState,
} from '../store/index';

export default function SlicedImage() {
  const { src } = useRecoilValue(imageSrcState);

  const [{
    x, y, width, height,
  }, setImageSize] = useRecoilState(rectSizeeState);

  const imageScale = useRecoilValue(imageScaleState);

  const imageSize = useRecoilValue(imageSizeState);

  const imageLoadError = useRecoilValue(imageLoadStatusState);

  useEffect(() => {
    setImageSize({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
  }, [src, setImageSize]);

  if ((width <= 3 && height <= 3)
    || imageLoadError) return <div />;

  return (
    <div className='flex items-center justify-center m-3'>
      <div
        className='border border-solid border-zinc-700'
        style={{
          width,
          height,
          backgroundImage: `url(${src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: `${-x}px`,
          backgroundPositionY: `${-y}px`,
          backgroundSize: `${Math.floor(imageSize.width * imageScale)}px ${Math.floor(imageSize.height * imageScale)}px`,
        }}
      />
    </div>
  );
}
