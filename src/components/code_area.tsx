import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { spriteSizeState } from '../store/index';

const CodeAreaWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const CodeAreaContent = styled.div`
  width: 360px;
  background-color: #292c39;
  color: white;
  border-radius: 5px;
  padding: 20px;
`;

export default function CodeArea() {
  const {
    x, y, width, height,
  } = useRecoilValue(spriteSizeState);

  return (
    <CodeAreaWrapper>
      <CodeAreaContent>
        <div>{ `background-position: ${y}px; ${x}px;` }</div>
        <div>{ `width: ${width}px;` }</div>
        <div>{ `height: ${height}px;` }</div>
      </CodeAreaContent>
    </CodeAreaWrapper>
  );
}
