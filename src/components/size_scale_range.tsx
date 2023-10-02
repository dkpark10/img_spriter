import { ImageState } from 'custom-type';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentImageState } from '@/store/index';
import { debounce } from '@/utils/debounce';

export default function ImageScaleRangeBar() {
  const [imageState, setImageState] = useRecoilState<ImageState>(currentImageState);
  const [currentScale, setCurrentScale] = useState(1);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentScale(Number(e.target.value));
    const debounceChange = debounce(() => {
      setImageState((prev) => ({
        ...prev,
        scale: currentScale,
        rectHeight: 0,
        rectWidth: 0,
        rectCoordX: 0,
        rectCoordY: 0,
      }));
    }, 450);

    debounceChange();
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <div>
        <div className="text-center">
          이미지 사이즈 조절:&nbsp;
          {imageState.scale}
        </div>
        <input
          data-testid="scale_bar"
          className="w-96"
          type="range"
          name="scale_bar"
          min={0.5}
          max={1.5}
          step={0.02}
          value={currentScale}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
