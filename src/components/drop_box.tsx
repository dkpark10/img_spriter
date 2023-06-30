import React, { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ImageState } from 'custom-type';
import { fileImageState } from '../store';

export default function DropDropBox() {
  const setImageSrc = useSetRecoilState<ImageState>(fileImageState);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [isDarg, setIsDrag] = useState(false);

  const onClick = () => {
    inputFileRef.current?.click();
  };

  const readFile = (file: File) => {
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

    reader.readAsDataURL(file);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    readFile(e.target.files[0]);
  };

  const onDragEnter = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(false);
  };

  const onDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDarg === false) {
      return;
    }

    readFile(e.dataTransfer?.files[0]);
  };

  return (
    <section className='flex items-center justify-center m-6'>
      <input
        ref={inputFileRef}
        className='hidden'
        type='file'
        accept='image/*'
        onChange={onChange}
      />
      <button
        className='relative bg-[#a5a6a9] w-[354px] h-[186px] hover:bg-[#352772]
        hover:text-[white] text-[#252525] rounded-md cursor-pointer'
        type='button'
        data-test-id='file_button'
        onClick={onClick}
        onDragEnter={onDragEnter}
        onDragOver={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <span
          className='inline-flex items-center justify-center
          border-dashed border-2 border-indigo-600 w-[334px] h-[166px]'
        >
          이미지 파일을 업로드하세요.
        </span>
      </button>
    </section>
  );
}
