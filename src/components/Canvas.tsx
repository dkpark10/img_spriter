import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Coord, ImageState } from 'custom-type';
import { currentImageState } from '../store/index';

export default function Canvas() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [initCoord, setInitCoord] = useState<Coord>({ y: 0, x: 0 });

  const [imageState, setImageState] = useRecoilState<ImageState>(currentImageState);

  useEffect(() => {
    const drawImage = () => {
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = imageState.src;
      image.alt = 'target_image';

      image.onload = () => {
        setImageState(
          (prev) => ({
            ...prev,
            loadError: false,
            imageSizeWidth: image.naturalWidth,
            imageSizeHeight: image.naturalHeight,
          }),
        );
      };

      image.onerror = () => (setImageState((prev) => ({ ...prev, loadError: true })));
    };

    drawImage();
    setInitCoord({ y: 0, x: 0 });
    setIsMouseDown(false);
  }, [imageState.src, setImageState]);

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
      rectCoordX,
      rectCoordY,
      rectWidth,
      rectHeight,
    } = imageState;

    setStrokeStyle();

    ctx.current?.strokeRect(rectCoordX, rectCoordY, rectWidth, rectHeight);
  }, [imageState]);

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
    ctx.current = canvasRef.current?.getContext('2d');

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

    setImageState(
      (prev): ImageState => ({
        ...prev,
        rectCoordX: left,
        rectCoordY: top,
        rectWidth: width,
        rectHeight: height,
      }),
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

  if (imageState.loadError) {
    return <div className='absolute-center text-4xl'>이미지가 없습니다.</div>;
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
          width={`${Math.floor(imageState.imageSizeWidth * imageState.scale)}`}
          height={`${Math.floor(imageState.imageSizeHeight * imageState.scale)}`}
          style={{ backgroundImage: `url(${imageState.src})` }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      </div>
    </main>
  );
}
