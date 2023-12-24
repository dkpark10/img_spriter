import type { Coord, ImageState, ColorPixelDataList } from 'custom-type';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentImageState, currentRectColor } from '@/store';
import { getCanvasImageData, isNonColorPixel } from '@/utils/get-canvas-image-data';
import { getColorPixelMaxSize } from '@/utils/bfs-color-pixel';
import { drawRectMultiple } from '@/utils//draw-rect-multiple';
import { drawImage } from '@/utils/draw-image';
import ImageError from './img_load_err';

export default function Canvas() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);
  const [colorPixelData, setColorPixelData] = useState<ColorPixelDataList>([]);

  const [mouseAction, setMouseAction] = useState({
    isDown: false,
    isMove: false,
  });

  const [currentCoord, setCurrentCoord] = useState<Coord>({ y: 0, x: 0 });
  const [imageState, setImageState] = useRecoilState<ImageState>(currentImageState);
  const rectColor = useRecoilValue(currentRectColor);

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageState.src;
    image.alt = 'target_image';
    imageRef.current = image;
    ctx.current = canvasRef.current?.getContext('2d', { willReadFrequently: true });

    image.onload = () => {
      const w = imageRef.current.naturalWidth;
      const h = imageRef.current.naturalHeight;

      drawImage({ w, h, ctx, imageRef });
      setImageState(
        (prev): ImageState => ({
          ...prev,
          loadSuccess: true,
          imageSizeWidth: w,
          imageSizeHeight: h,
          imageOriginWidth: w,
          imageOriginHeight: h,
        }),
      );

      if (!ctx.current) return;
      ctx.current.strokeStyle = rectColor;
      drawRectMultiple(
        ctx.current,
        imageState.rectCoordX,
        imageState.rectCoordY,
        imageState.rectWidth,
        imageState.rectHeight,
      );
    };

    image.onerror = () => {
      setImageState((prev): ImageState => ({ ...prev, loadSuccess: false }));
    };

    setCurrentCoord({ y: 0, x: 0 });
    setMouseAction({ isDown: false, isMove: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageState.src]);

  useEffect(() => {
    if (!ctx.current || !imageState.loadSuccess || !imageState.imageSizeWidth || !imageState.imageSizeHeight) return;

    drawImage({ w: imageState.imageSizeWidth, h: imageState.imageSizeHeight, ctx, imageRef });
    const colorPixData = getCanvasImageData(ctx.current, 0, 0, imageState.imageSizeWidth, imageState.imageSizeHeight);
    setColorPixelData(colorPixData);
  }, [imageState.loadSuccess, setImageState, imageState.imageSizeHeight, imageState.imageSizeWidth]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !canvasWrapperRef.current || !ctx.current) {
      return;
    }

    drawImage({ w: imageState.imageSizeWidth, h: imageState.imageSizeHeight, ctx, imageRef });
    ctx.current.strokeStyle = rectColor;
    ctx.current.lineWidth = 1;
    setMouseAction((prev) => ({ ...prev, isDown: true }));

    const { offsetTop, offsetLeft } = canvasWrapperRef.current;
    const y = e.pageY - offsetTop;
    const x = e.pageX - offsetLeft;

    setCurrentCoord((prev) => ({ ...prev, y, x }));
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !canvasWrapperRef.current || !ctx.current || mouseAction.isDown === false) return;

    setMouseAction((prev) => ({ ...prev, isMove: true }));

    const { offsetLeft, offsetTop } = canvasWrapperRef.current;
    const mouseCoordY = e.pageY - offsetTop;
    const mouseCoordX = e.pageX - offsetLeft;

    const left = Math.min(mouseCoordX, currentCoord.x);
    const top = Math.min(mouseCoordY, currentCoord.y);
    const width = Math.abs(mouseCoordX - currentCoord.x);
    const height = Math.abs(mouseCoordY - currentCoord.y);

    setImageState(
      (prev): ImageState => ({
        ...prev,
        rectCoordX: left,
        rectCoordY: top,
        rectWidth: width,
        rectHeight: height,
      }),
    );

    drawImage({ w: imageState.imageSizeWidth, h: imageState.imageSizeHeight, ctx, imageRef });
    drawRectMultiple(ctx.current, left, top, width, height);
  };

  const onMouseUp = () => {
    if (!canvasRef.current || !canvasWrapperRef.current || !ctx.current) return;

    const { y, x } = currentCoord;
    const { imageSizeWidth, imageSizeHeight } = imageState;

    /** @description 마우스를 이동하지 않고 클릭만 했다면 */
    if (colorPixelData.length >= 1 && !isNonColorPixel(colorPixelData[y][x]) && mouseAction.isMove === false) {
      const [left, top, drawWidth, drawHeight] = getColorPixelMaxSize(
        y,
        x,
        imageSizeWidth,
        imageSizeHeight,
        colorPixelData,
        2,
      );

      drawImage({ w: imageState.imageSizeWidth, h: imageState.imageSizeHeight, ctx, imageRef });
      drawRectMultiple(ctx.current, left, top, drawWidth, drawHeight);
      setImageState(
        (prev): ImageState => ({
          ...prev,
          rectCoordX: left,
          rectCoordY: top,
          rectWidth: drawWidth,
          rectHeight: drawHeight,
        }),
      );
    }

    setMouseAction({ isDown: false, isMove: false });
    setCurrentCoord((prev) => ({ ...prev, y: 0, x: 0 }));
  };

  if (!imageState.loadSuccess) return <ImageError />;

  return (
    <main className="flex justify-center items-center">
      <div className="relative border border-solid border-zinc-700" ref={canvasWrapperRef}>
        <canvas
          className="bg-cover"
          ref={canvasRef}
          width={`${Math.floor(imageState.imageSizeWidth)}`}
          height={`${Math.floor(imageState.imageSizeHeight)}`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      </div>
    </main>
  );
}
