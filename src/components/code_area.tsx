/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  currentImageState,
} from '../store/index';

export default function CodeArea() {
  const imageState = useRecoilValue(currentImageState);

  if (imageState.loadError) {
    return <div />;
  }

  return (
    <code className='flex items-center justify-center m-3'>
      <div className='bg-[#292c39] text-[#cacaca] rounded-md p-4'>
        <div>{'.sprite_img {'}</div>
        <div>
          &nbsp;&nbsp;&nbsp;background-image:&nbsp;
          <span className='text-[#44e149]'>url</span>
          {`('${imageState.isLocal ? '이미지의 실제 경로를 입력하여 사용하세요.' : imageState.src}');`}
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;background-repeat:&nbsp;
          <span className='text-[#f08a15]'>
            no-repeat
          </span>;
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;background-position:&nbsp;
          <span className='text-[#f08a15]'>
            {`${-imageState.rectCoordX}px ${-imageState.rectCoordY}px`}
          </span>;
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;background-size:&nbsp;
          <span className='text-[#f08a15]'>
            {`${Math.floor(imageState.imageSizeWidth * imageState.scale)}px ${Math.floor(imageState.imageSizeHeight * imageState.scale)}px`}
          </span>;
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;width:&nbsp;
          <span className='text-[#f08a15]'>
            {`${imageState.rectWidth}px`}
          </span>;
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;height:&nbsp;
          <span className='text-[#f08a15]'>
            {`${imageState.rectHeight}px`}
          </span>;
        </div>
        <div>{'}'}</div>
      </div>
    </code>
  );
}
