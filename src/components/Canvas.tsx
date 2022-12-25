import React, { useEffect, useRef, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Coord, Size } from 'custom-type';
import { spriteSizeState, imageSrcState } from '../store/index';
import SizeDot from './size_dot';

interface CanvasStyle {
  backgroundImage: string;
}

const CanvasWrapper = styled.div`
  position: relative;
`;

const CanvasComponent = styled.canvas<CanvasStyle>`
  background-image: url(${({ backgroundImage }) => backgroundImage});
  border: 1px solid red;
`;

export default function Canvas() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [initCoord, setInitCoord] = useState<Coord>({ y: 0, x: 0 });

  const [canvasSize, setCanvasSize] = useState<Size>({ width: 0, height: 0 });

  const setSpriteSize = useSetRecoilState(spriteSizeState);

  const imageSrc = useRecoilValue(imageSrcState);

  useEffect(() => {
    const drawImage = () => {
      const image = new Image();
      image.src = imageSrc;
      image.crossOrigin = 'Anonymous';
      ctx.current = canvasRef.current?.getContext('2d');

      image.onload = () => {
        const { naturalWidth, naturalHeight } = image;

        setCanvasSize((prev) => ({
          ...prev,
          width: naturalWidth,
          height: naturalHeight,
        }));

        ctx.current?.drawImage(image, 0, 0);
      };
    };

    drawImage();
  }, [imageSrc]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !canvasWrapperRef.current || !ctx.current) {
      return;
    }

    setIsMouseDown(true);

    const { offsetTop, offsetLeft } = canvasWrapperRef.current;
    const y = e.pageY - offsetTop;
    const x = e.pageX - offsetLeft;

    setInitCoord((prev) => ({
      ...prev,
      y,
      x,
    }));
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !canvasWrapperRef.current || !ctx.current || isMouseDown === false) {
      return;
    }

    const { offsetLeft, offsetTop } = canvasWrapperRef.current;
    const mouseCoordY = e.pageY - offsetTop;
    const mouseCoordX = e.pageX - offsetLeft;

    const left = Math.min(mouseCoordX, initCoord.x);
    const top = Math.min(mouseCoordY, initCoord.y);
    const width = Math.abs(mouseCoordX - initCoord.x);
    const height = Math.abs(mouseCoordY - initCoord.y);

    ctx.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    );

    setSpriteSize({
      x: left,
      y: top,
      width,
      height,
    });

    ctx.current.strokeRect(left, top, width, height);
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
    setInitCoord((prev) => ({
      ...prev,
      y: 0,
      x: 0,
    }));
  };

  return (
    <CanvasWrapper
      ref={canvasWrapperRef}
    >
      <SizeDot
        top={0}
        left={0}
      />
      <SizeDot
        top={0}
        left={canvasSize.width}
      />
      <CanvasComponent
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        backgroundImage={imageSrc}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
      <SizeDot
        top={canvasSize.height}
        left={0}
      />
      <SizeDot
        top={canvasSize.height}
        left={canvasSize.width}
      />
      <h1>{initCoord.y}</h1>
      <h1>{initCoord.x}</h1>
    </CanvasWrapper>
  );
}
