import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Coord, Size } from 'custom-type';

interface CanvasStyle {
  backgroundImage: string;
}

const CanvasComponent = styled.canvas<CanvasStyle>`
  background-image: url(${({ backgroundImage }) => backgroundImage});
`;

const imgSrc = 'https://s.pstatic.net/static/www/img/uit/sp_weather_time_b8ecd0.png';
export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [initCoord, setInitCoord] = useState<Coord>({ y: 0, x: 0 });

  const [canvasSize, setCanvasSize] = useState<Size>({ width: 0, height: 0 });

  const drawImage = () => {
    const image = new Image();
    image.src = imgSrc;
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

  useEffect(() => {
    drawImage();
  }, []);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !ctx.current) {
      return;
    }

    setIsMouseDown(true);
    const { offsetLeft, offsetTop } = canvasRef.current;
    const y = e.pageY - offsetTop;
    const x = e.pageX - offsetLeft;

    setInitCoord((prev) => ({
      ...prev,
      y,
      x,
    }));
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !ctx.current || isMouseDown === false) {
      return;
    }

    const { offsetLeft, offsetTop } = canvasRef.current;
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
    <CanvasComponent
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      backgroundImage={imgSrc}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
}
