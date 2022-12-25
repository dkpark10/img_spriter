import React, { useState, useRef } from 'react';
import styled from 'styled-components';

interface ISizeDot {
  top: number;
  left: number;
}

const SizeDotStyle = styled.div<ISizeDot>`
  background-color: transparent;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  transform: translate(-50%, -50%);
  cursor: pointer;

  &:hover {
    background-color: #1e1d1d;
  }
`;

export default function SizeDot({ top, left }: ISizeDot) {
  const dotRef = useRef<HTMLDivElement>(null);

  // const [isMouseDown, setIsMouseDown] = useState(false);

  // const onMouseDown = () => {
  //   setIsMouseDown(true);
  // };

  // const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (isMouseDown === false || !dotRef.current) {
  //     return;
  //   }

  //   const { offsetLeft, offsetTop } = dotRef.current;
  //   console.log(offsetLeft, offsetTop);
  //   console.log(e.pageX, e.pageY);
  // };

  // const onMouseUp = () => {
  //   setIsMouseDown(false);
  // };

  return (
    <SizeDotStyle
      ref={dotRef}
      top={top}
      left={left}
      // onMouseDown={onMouseDown}
      // onMouseMove={onMouseMove}
      // onMouseUp={onMouseUp}
    />
  );
}
