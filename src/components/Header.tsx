import React, { useState, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { imageSrcState } from '../store/index';
import { debounce } from '../utils/index';

export default function Header() {
  const [imgSrc, setImageSrc] = useRecoilState(imageSrcState);

  const [printValue, setPrintValue] = useState(imgSrc);

  const debounceChangeSrc = useMemo(() => debounce((src: string) => {
    setImageSrc(src);
  }, 250), [setImageSrc]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrintValue(e.target.value);
    debounceChangeSrc(e.target.value);
  };

  return (
    <header className='w-full flex justify-center items-center h-[60px]'>
      <input
        className='w-[408px] border-none h-[32px] rounded-md bg-[#e0e0e0] px-2'
        type='text'
        name='imgsrc'
        placeholder='이미지 주소'
        onChange={onChange}
        value={printValue}
      />
    </header>
  );
}
