import type { Coord, ImageState } from 'custom-type';
import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentImageState, currentRectColor } from '@/store';
import { getCanvasImageData } from '@/utils/get-canvas-image-data';
import { getColorPixelMaxSize } from '@/utils/bfs-color-pixel';
import { drawRectMultiple } from '@/utils//draw-rect-multiple';
import { drawImage } from '@/utils/draw-image';
import { useDrawImage } from '@/hooks/use-draw-image';
import ImageError from './img_load_err';

export default function Canvas(): JSX.Element {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);

  const [mouseAction, setMouseAction] = useState({
    isDown: false,
    isMove: false,
  });

  const [currentCoord, setCurrentCoord] = useState<Coord>({ y: 0, x: 0 });
  const [imageState, setImageState] = useRecoilState<ImageState>(currentImageState);

  const rectColor = useRecoilValue(currentRectColor);

  const [left, top, drawWidth, drawHeight] = useMemo(() => {
    if (
      ctx.current === undefined ||
      ctx.current === null ||
      imageState.imageSizeWidth === 0 ||
      imageState.imageSizeHeight === 0 ||
      currentCoord.y === 0 ||
      currentCoord.x === 0
    )
      return [0, 0, 0, 0];

    const colorPixData = getCanvasImageData(ctx.current, 0, 0, imageState.imageSizeWidth, imageState.imageSizeHeight);

    return getColorPixelMaxSize(
      currentCoord.y,
      currentCoord.x,
      imageState.imageSizeWidth,
      imageState.imageSizeHeight,
      colorPixData,
      2,
    );
  }, [currentCoord.y, currentCoord.x, imageState.imageSizeWidth, imageState.imageSizeHeight]);

  const imageRef = useDrawImage({
    imgSrc: imageState.src,
    onLoad: () => {
      ctx.current = canvasRef.current?.getContext('2d', { willReadFrequently: true });

      if (imageRef.current === null || ctx.current === null) return;
      if (ctx.current === null || ctx.current === undefined) return;

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

      ctx.current.strokeStyle = rectColor;
      drawRectMultiple(
        ctx.current,
        imageState.rectCoordX,
        imageState.rectCoordY,
        imageState.rectWidth,
        imageState.rectHeight,
      );
    },
    onError: () => {
      setImageState((prev): ImageState => ({ ...prev, loadSuccess: false }));
    },
    onFinal: () => {
      setCurrentCoord({ y: 0, x: 0 });
      setMouseAction({ isDown: false, isMove: false });
    },
  });

  useEffect(() => {
    if (
      ctx.current === undefined ||
      ctx.current === null ||
      !imageState.loadSuccess ||
      imageState.imageSizeWidth === null ||
      imageState.imageSizeHeight === null
    ) {
      return;
    }

    drawImage({ w: imageState.imageSizeWidth, h: imageState.imageSizeHeight, ctx, imageRef });
  }, [imageState.loadSuccess, imageState.imageSizeHeight, imageState.imageSizeWidth, imageRef]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (ctx.current === null || ctx.current === undefined) return;
    if (canvasWrapperRef.current === null || canvasWrapperRef.current === undefined) return;

    drawImage({ w: imageState.imageSizeWidth, h: imageState.imageSizeHeight, ctx, imageRef });
    ctx.current.strokeStyle = rectColor;
    ctx.current.lineWidth = 1;
    setMouseAction((prev) => ({ ...prev, isDown: true }));

    const { offsetTop, offsetLeft } = canvasWrapperRef.current;
    const y = e.pageY - offsetTop;
    const x = e.pageX - offsetLeft;

    setCurrentCoord((prev) => ({ ...prev, y, x }));
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (ctx.current === null || ctx.current === undefined) return;
    if (canvasWrapperRef.current === null || canvasWrapperRef.current === undefined) return;
    if (!mouseAction.isDown) return;

    setMouseAction((prev) => ({ ...prev, isMove: true }));

    const { offsetLeft, offsetTop } = canvasWrapperRef.current;
    const mouseCoordY = e.pageY - offsetTop;
    const mouseCoordX = e.pageX - offsetLeft;

    const rectCoordX = Math.min(mouseCoordX, currentCoord.x);
    const rectCoordY = Math.min(mouseCoordY, currentCoord.y);
    const rectWidth = Math.abs(mouseCoordX - currentCoord.x);
    const rectHeight = Math.abs(mouseCoordY - currentCoord.y);

    setImageState(
      (prev): ImageState => ({
        ...prev,
        rectCoordX,
        rectCoordY,
        rectWidth,
        rectHeight,
      }),
    );

    drawImage({ w: imageState.imageSizeWidth, h: imageState.imageSizeHeight, ctx, imageRef });
    drawRectMultiple(ctx.current, left, top, rectWidth, rectHeight);
  };

  const onMouseUp = (): void => {
    if (ctx.current === null || ctx.current === undefined) return;
    if (canvasWrapperRef.current === null || canvasWrapperRef.current === undefined) return;
    if (!mouseAction.isDown) return;

    /** @description 마우스를 이동하지 않고 클릭만 했다면 */
    if (!mouseAction.isMove) {
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
