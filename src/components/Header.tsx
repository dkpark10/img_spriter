import React, { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { imageSrcState } from '../store';
import { debounce } from '../utils';
import { useInput } from '../hooks';

export default function Header() {
  const [imgSrc, setImageSrc] = useRecoilState(imageSrcState);

  const debounceChangeSrc = useMemo(() => debounce((src: string) => {
    setImageSrc(src);
  }, 250), [setImageSrc]);

  const [printValue, setPrintValue] = useInput(imgSrc, debounceChangeSrc);

  return (
    <header className='w-full flex justify-center items-center h-[60px]'>
      <input
        className='w-[408px] border-none h-[32px] rounded-md bg-[#e0e0e0] px-2'
        type='text'
        name='imgsrc'
        placeholder='이미지 주소'
        onChange={setPrintValue}
        value={printValue}
      />
    </header>
  );
}
