import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { ImageState } from 'custom-type';
import { pathImageState } from '../store';
import { debounce } from '../utils';
import { useInput } from '../hooks';

export default function Header() {
  const [imgSrc, setImageSrc] = useRecoilState(pathImageState);

  const debounceChangeSrc = useMemo(() => debounce((src: string) => {
    setImageSrc((prev): ImageState => ({
      ...prev,
      src,
      isLocal: false,
    }));
  }, 250), [setImageSrc]);

  const [printValue, setPrintValue] = useInput(imgSrc.src, debounceChangeSrc);

  return (
    <div className='w-full flex justify-center items-center h-[60px]'>
      <input
        className='w-[408px] border-none h-[38px] rounded-md bg-[#e0e0e0] px-2'
        type='text'
        name='imgsrc'
        placeholder='이미지 주소를 입력하세요.'
        onChange={setPrintValue}
        value={printValue}
      />
    </div>
  );
}
