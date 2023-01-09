import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Coord } from 'custom-type';
import {
  spriteSizeState,
  imageSizeState,
  imageSrcState,
  imageScaleState,
  imageLoadStatusState,
} from '../store/index';

export default function Canvas() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [initCoord, setInitCoord] = useState<Coord>({ y: 0, x: 0 });

  const [error, setError] = useRecoilState(imageLoadStatusState);

  const [canvasSize, setCanvasSize] = useRecoilState(imageSizeState);

  const [spriteSize, setSpriteSize] = useRecoilState(spriteSizeState);

  const imageSrc = useRecoilValue(imageSrcState);

  const imageScale = useRecoilValue(imageScaleState);

  useEffect(() => {
    const drawImage = () => {
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = imageSrc;
      image.alt = 'target_image';
      ctx.current = canvasRef.current?.getContext('2d');

      image.onload = () => {
        setError(false);
        setCanvasSize({
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
      };

      image.onerror = () => (setError(true));
    };

    drawImage();
  }, [imageSrc, setCanvasSize, setError, error]);

  const setStrokeStyle = () => {
    if (!ctx.current) return;

    ctx.current.strokeStyle = '#ff0077';
    ctx.current.lineWidth = 0.5;
  };

  /**
   * @description scale이 바꿀 때 마다 스트로크를 그린다.
   */
  useEffect(() => {
    const {
      x, y, width, height,
    } = spriteSize;

    setStrokeStyle();

    ctx.current?.strokeRect(x, y, width, height);
  }, [spriteSize, imageScale, error]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !canvasWrapperRef.current || !ctx.current) {
      return;
    }

    setIsMouseDown(true);

    const { offsetTop, offsetLeft } = canvasWrapperRef.current;
    const y = e.pageY - offsetTop;
    const x = e.pageX - offsetLeft;

    setInitCoord((prev) => ({ ...prev, y, x }));
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

    ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

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

  if (error) {
    return <div className='text-center text-4xl'>이미지가 없습니다.</div>;
  }

  return (
    <main className='flex justify-center items-center'>
      <div
        className='relative border border-solid border-zinc-700'
        ref={canvasWrapperRef}
      >
        <canvas
          className='bg-cover'
          ref={canvasRef}
          width={`${Math.floor(canvasSize.width * imageScale)}`}
          height={`${Math.floor(canvasSize.height * imageScale)}`}
          style={{ backgroundImage: `url(${imageSrc})` }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      </div>
    </main>
  );
}
