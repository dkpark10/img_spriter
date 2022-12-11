import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { spriteSizeState, imageSrcState } from '../store/index';

const CodeAreaWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 88px 0px;
`;

const CodeAreaContent = styled.div`
  background-color: #292c39;
  color: #cacaca;
  border-radius: 5px;
  padding: 20px;

  .number {
    color: #e2862a;
  }

  .img_src {
    color: #44e149;
  }
`;

export default function CodeArea() {
  const {
    x, y, width, height,
  } = useRecoilValue(spriteSizeState);

  const imgSrc = useRecoilValue(imageSrcState);

  return (
    <CodeAreaWrapper>
      <CodeAreaContent>
        <div>{'.class {'}</div>
        <div>
          &nbsp;&nbsp;&nbsp;background:&nbsp;
          <span className='img_src'>url</span>
          {`('${imgSrc}')`}
          {` no-repeat -${y}px; -${x}px;`}
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;width:&nbsp;
          <span className='number'>
            {`${width}px`}
          </span>
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;height:&nbsp;
          <span className='number'>
            {`${height}px`}
          </span>
        </div>
        <div>{'}'}</div>
      </CodeAreaContent>
    </CodeAreaWrapper>
  );
}
