import React, { useState, useRef, RefObject } from 'react';
import { Size, Coord } from 'custom-type';

interface Props {
  size: Size;
  target: RefObject<HTMLElement>;
}

export default function SizeDot({ size, target }: Props) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [initCoord, setInitCoord] = useState<Coord>({ y: 0, x: 0 });

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!target.current) {
      return;
    }

    setIsMouseDown(true);

    const { offsetTop, offsetLeft } = target.current;
    const y = e.pageY - offsetTop;
    const x = e.pageX - offsetLeft;

    setInitCoord((prev) => ({
      ...prev,
      y,
      x,
    }));
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMouseDown || !target.current) {
      return;
    }

    const { offsetLeft, offsetTop } = target.current;
  };

  return (
    <>
      <div
        className={`absolute w-[12px] h-[12px] rounded-full bg-teal-400 
        cursor-pointer translate-x-[-50%] translate-y-[-50%]`}
        style={{ top: 0, left: 0 }}
        role='button'
        onMouseDown={onMouseDown}
        tabIndex={0}
      />
      <div
        className={`absolute w-[12px] h-[12px] rounded-full bg-teal-400 
        cursor-pointer translate-x-[-50%] translate-y-[-50%]`}
        style={{ top: size.height, left: 0 }}
        role='button'
        onMouseDown={onMouseDown}
        tabIndex={0}
      />
      <div
        className={`absolute w-[12px] h-[12px] rounded-full bg-teal-400 
        cursor-pointer translate-x-[-50%] translate-y-[-50%]`}
        style={{ top: 0, left: size.width }}
        role='button'
        onMouseDown={onMouseDown}
        tabIndex={0}
      />
      <div
        className={`absolute w-[12px] h-[12px] rounded-full bg-teal-400 
        cursor-pointer translate-x-[-50%] translate-y-[-50%]`}
        style={{ top: size.height, left: size.width }}
        role='button'
        onMouseDown={onMouseDown}
        tabIndex={0}
      />
    </>
  );
}
