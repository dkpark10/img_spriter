import React, { useEffect, useRef, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Coord, Size } from 'custom-type';
import { spriteSizeState, imageSrcState, imageScaleState } from '../store/index';

export default function Canvas() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [initCoord, setInitCoord] = useState<Coord>({ y: 0, x: 0 });

  const [canvasSize, setCanvasSize] = useState<Size>({ width: 0, height: 0 });

  const setSpriteSize = useSetRecoilState(spriteSizeState);

  const imageSrc = useRecoilValue(imageSrcState);

  const imageScale = useRecoilValue(imageScaleState);

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

        // ctx.current?.drawImage(image, 0, 0, naturalWidth, naturalHeight);
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
    if (
      !canvasRef.current
      || !canvasWrapperRef.current
      || !ctx.current
      || isMouseDown === false
    ) {
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
    <div className='flex justify-center items-center'>
      <div
        className='relative border-2 border-solid border-zinc-700'
        ref={canvasWrapperRef}
      >
        <canvas
          className='bg-cover'
          ref={canvasRef}
          width={`${canvasSize.width * imageScale}`}
          height={`${canvasSize.height * imageScale}`}
          style={{ backgroundImage: `url(${imageSrc})` }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      </div>
    </div>
  );
}
