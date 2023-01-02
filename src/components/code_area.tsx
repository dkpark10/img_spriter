/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  spriteSizeState,
  imageSrcState,
  imageScaleState,
  imageSizeState,
} from '../store/index';

export default function CodeArea() {
  const {
    x, y, width, height,
  } = useRecoilValue(spriteSizeState);

  const imgSrc = useRecoilValue(imageSrcState);

  const imageScale = useRecoilValue(imageScaleState);

  const imageSize = useRecoilValue(imageSizeState);

  return (
    <div className='flex items-center justify-center m-3'>
      <div className='bg-[#292c39] text-[#cacaca] rounded-md p-4'>
        <div>{'.class {'}</div>
        <div>
          &nbsp;&nbsp;&nbsp;background:&nbsp;
          <span className='text-[#44e149]'>url</span>
          {`('${imgSrc}') no-repeat;`}
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;background-position:&nbsp;
          <span className='text-[#f08a15]'>
            {`${-x}px ${-y}px`}
          </span>;
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;background-size:&nbsp;
          <span className='text-[#f08a15]'>
            {`${Math.floor(imageSize.width * imageScale)}px ${Math.floor(imageSize.height * imageScale)}px`}
          </span>;
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;width:&nbsp;
          <span className='text-[#f08a15]'>
            {`${width}px`}
          </span>;
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;height:&nbsp;
          <span className='text-[#f08a15]'>
            {`${height}px`}
          </span>;
        </div>
        <div>{'}'}</div>
      </div>
    </div>
  );
}
