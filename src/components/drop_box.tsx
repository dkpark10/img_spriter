import React from 'react';

export default function DropDropBox() {
  return (
    <section className='flex items-center justify-center m-6'>
      <div className='relative bg-[#a5a6a9] w-[354px] h-[221px] text-[#252525] rounded-md cursor-pointer'>
        <div className='absolute-center border-dashed border-2 border-indigo-600 w-[334px] h-[201px]' />
        <div className='flex items-center justify-center w-full h-full'>
          이미지 파일을 올려놓으세요.
        </div>
      </div>
    </section>
  );
}
