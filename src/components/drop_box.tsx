import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { imageSrcState } from '../store';

export default function DropDropBox() {
  const setImageSrc = useSetRecoilState(imageSrcState);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    inputFileRef.current?.click();
  };

  const onChagne = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (typeof event.target?.result !== 'string') {
        return;
      }

      const imageSrc = event.target?.result;
      setImageSrc((prev) => ({
        ...prev,
        src: imageSrc,
        isLocal: true,
      }));
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <section className='flex items-center justify-center m-6'>
      <input
        ref={inputFileRef}
        className='hidden'
        type='file'
        accept='image/*'
        onChange={onChagne}
      />
      <button
        className='relative bg-[#a5a6a9] w-[354px] h-[186px] hover:bg-[#352772]
        hover:text-[white] text-[#252525] rounded-md cursor-pointer'
        onClick={onClick}
        type='button'
      >
        <span className='inline-flex items-center justify-center
          border-dashed border-2 border-indigo-600 w-[334px] h-[166px]'
        >
          이미지 파일을 업로드하세요.
        </span>
      </button>
    </section>
  );
}
