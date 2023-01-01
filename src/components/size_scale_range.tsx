import React from 'react';
import { useRecoilState } from 'recoil';
import { imageScaleState } from '../store/index';

export default function ImageScaleRangeBar() {
  const [scale, setImageScale] = useRecoilState(imageScaleState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageScale(Number(e.target.value));
  };

  return (
    <div className='flex items-center justify-center mt-5'>
      <div>
        <div className='text-center'>
          이미지 사이즈 조절:
          &nbsp;
          {scale}
        </div>
        <input
          className='w-96'
          type='range'
          name='size_scale_bar'
          min={0.5}
          max={1.5}
          step={0.1}
          value={scale}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
