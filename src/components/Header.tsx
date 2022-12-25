import React from 'react';
import { useRecoilState } from 'recoil';
import { imageSrcState } from '../store/index';

export default function Header() {
  const [imgSrc, setImageSrc] = useRecoilState(imageSrcState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageSrc(e.target.value);
  };

  return (
    <header className='w-full flex justify-center items-center h-[60px]'>
      <input
        className='w-[408px] border-none h-[32px] rounded-md bg-[#e0e0e0] px-2'
        type='text'
        name='imgsrc'
        placeholder='이미지 주소'
        onChange={onChange}
        value={imgSrc}
      />
    </header>
  );
}
