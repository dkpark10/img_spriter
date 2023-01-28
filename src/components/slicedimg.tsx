import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ImageState } from 'custom-type';
import {
  currentImageState,
} from '../store/index';

export default function SlicedImage() {
  const [imageState, setImageState] = useRecoilState(currentImageState);

  useEffect(() => {
    setImageState((prev):ImageState => ({
      ...prev,
      rectCoordX: 0,
      rectCoordY: 0,
      rectWidth: 0,
      rectHeight: 0,
    }));
  }, [setImageState]);

  if ((imageState.rectWidth <= 3 && imageState.rectHeight <= 3)
    || imageState.loadError) return <div />;

  return (
    <div className='flex items-center justify-center m-3'>
      <div
        className='border border-solid border-zinc-700'
        style={{
          width: imageState.rectWidth,
          height: imageState.rectHeight,
          backgroundImage: `url(${imageState.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: `${-imageState.rectCoordX}px`,
          backgroundPositionY: `${-imageState.rectCoordY}px`,
          backgroundSize: `${Math.floor(imageState.imageSizeWidth * imageState.scale)}px ${Math.floor(imageState.imageSizeHeight * imageState.scale)}px`,
        }}
      />
    </div>
  );
}
