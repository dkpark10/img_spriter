import type { ImageState } from 'custom-type';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentImageState } from '@/store';

export default function ImageScaleRangeBar(): JSX.Element {
  const setImageState = useSetRecoilState<ImageState>(currentImageState);

  const [scale, setScale] = useState(1);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const sc = Number(e.target.value);
    setScale(sc);
    setImageState(
      (prev): ImageState => ({
        ...prev,
        imageSizeWidth: Math.floor(prev.imageOriginWidth * sc),
        imageSizeHeight: Math.floor(prev.imageOriginHeight * sc),
        rectHeight: 0,
        rectWidth: 0,
        rectCoordX: 0,
        rectCoordY: 0,
      }),
    );
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <div>
        <div className="text-center">
          이미지 사이즈 조절:&nbsp;
          {scale}
        </div>
        <input
          data-testid="scale_bar"
          className="w-96"
          type="range"
          name="scale_bar"
          min={0.5}
          max={1.5}
          step={0.02}
          value={scale}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
