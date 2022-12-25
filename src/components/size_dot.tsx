import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Size } from 'custom-type';

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

export default function SizeDot({ width, height }: Size) {
  const coords = [
    [0, 0],
    [width, 0],
    [0, height],
    [width, height],
  ];

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
    <>
      {coords.map((coord, idx) => (
        <div
          className={`w-[19px] h-[19px] rounded-full absolute bg-teal-400 cursor-pointer
          top-[${coord[0]}px] left-[${coord[1]}px]`}
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
        />
      ))}
    </>
  );
}
