import React, { useEffect, useRef, useState } from 'react';
import { Coord, PrevRectangleCoord, Size } from 'custom-type';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);
  const imgSrc = 'https://s.pstatic.net/static/www/img/uit/sp_weather_time_b8ecd0.png';

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [initCoord, setInitCoord] = useState<Coord>({ y: 0, x: 0 });

  const [prevRectangleCoord, setPrevRectangleCoord] = useState<PrevRectangleCoord>({
    y: 0,
    x: 0,
    rightBottomY: 0,
    rightBottomX: 0,
  });

  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const image = new Image();
    image.src = imgSrc;
    ctx.current = canvasRef.current?.getContext('2d');

    image.onload = () => {
      if (!canvasRef.current) {
        return;
      }

      const { naturalWidth, naturalHeight } = image;
      setSize((prev) => ({
        ...prev,
        width: naturalWidth,
        height: naturalHeight,
      }));

      ctx.current?.drawImage(image, 0, 0, naturalWidth, naturalHeight);
    };
  }, []);

  // useEffect(() => {
  //   const image = new Image();
  //   image.src = imgSrc;
  //   ctx.current = canvasRef.current?.getContext('2d');

  //   image.onload = () => {
  //     if (!canvasRef.current) {
  //       return;
  //     }

  //     const { naturalWidth, naturalHeight } = image;
  //     setSize((prev) => ({
  //       ...prev,
  //       width: naturalWidth,
  //       height: naturalHeight,
  //     }));

  //     ctx.current?.drawImage(image, 0, 0, naturalWidth, naturalHeight);
  //   };
  // }, [prevRectangleCoord]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) {
      return;
    }

    setIsMouseDown(true);
    const { offsetLeft, offsetTop } = canvasRef.current;
    const y = e.pageY - offsetTop;
    const x = e.pageX - offsetLeft;

    setInitCoord((prev) => ({
      ...prev, y, x,
    }));
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !ctx.current || isMouseDown === false) {
      return;
    }

    const image = new Image();
    image.src = imgSrc;

    const { offsetLeft, offsetTop } = canvasRef.current;
    const mouseCoordY = e.pageY - offsetTop;
    const mouseCoordX = e.pageX - offsetLeft;

    const x = mouseCoordX - initCoord.x;
    const y = mouseCoordY - initCoord.y;
    const { rightBottomX, rightBottomY } = prevRectangleCoord;

    ctx.current.strokeStyle = 'red';
    ctx.current.lineWidth = 0.5;
    ctx.current.strokeRect(initCoord.x, initCoord.y, x, y);

    ctx.current.fillStyle = 'transparent';
    ctx.current.globalAlpha = 0.05;
    ctx.current.fillRect(prevRectangleCoord.x, prevRectangleCoord.y, rightBottomX, rightBottomY);

    setPrevRectangleCoord((prev) => ({
      ...prev,
      y: initCoord.y,
      x: initCoord.x,
      rightBottomY: y,
      rightBottomX: x,
    }));
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
    <div>
      <canvas
        style={{ zIndex: 1 }}
        ref={canvasRef}
        width={size.width}
        height={size.height}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
      <div>{initCoord.x}</div>
      <div>{initCoord.y}</div>
    </div>
  );
}
