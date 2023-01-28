import React from 'react';
import { useRecoilState } from 'recoil';
import { currentImageState } from '../store/index';

export default function ImageScaleRangeBar() {
  const [imageState, setImageState] = useRecoilState(currentImageState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageState((prev) => ({
      ...prev,
      scale: Number(e.target.value),
    }));
  };

  if (imageState.loadError) return <div />;

  return (
    <div className='flex items-center justify-center mt-5'>
      <div>
        <div className='text-center'>
          이미지 사이즈 조절:
          &nbsp;
          {imageState.scale}
        </div>
        <input
          className='w-96'
          type='range'
          name='size_scale_bar'
          min={0.5}
          max={1.5}
          step={0.02}
          value={imageState.scale}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
