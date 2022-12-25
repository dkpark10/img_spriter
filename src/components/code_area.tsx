import React from 'react';
import { useRecoilValue } from 'recoil';
import { spriteSizeState, imageSrcState } from '../store/index';

export default function CodeArea() {
  const {
    x, y, width, height,
  } = useRecoilValue(spriteSizeState);

  const imgSrc = useRecoilValue(imageSrcState);

  return (
    <div className='flex items-center justify-center py-20'>
      <div className='bg-[#292c39] text-[#cacaca] rounded-md p-4'>
        <div>{'.class {'}</div>
        <div>
          &nbsp;&nbsp;&nbsp;background:&nbsp;
          <span className='text-[#44e149]'>url</span>
          {`('${imgSrc}')`}
          {` no-repeat -${y}px; -${x}px;`}
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;width:&nbsp;
          <span className='text-[#f08a15]'>
            {`${width}px`}
          </span>
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;height:&nbsp;
          <span className='text-[#f08a15]'>
            {`${height}px`}
          </span>
        </div>
        <div>{'}'}</div>
      </div>
    </div>
  );
}
