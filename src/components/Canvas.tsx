import type { MouseAction, Coord, ImageState, OffsetPos } from 'custom-type';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentImageState, currentToolAtom } from '@/store';
import { drawImage } from '@/utils/draw-image';
import { RectDrawHandlerBuilder } from '@/utils/rect-draw-handler';
import { useDrawImage } from '@/hooks/use-draw-image';
import { useGetPixelData } from '@/hooks/use-pixel-data';
import ImageError from './img_load_err';

export default function Canvas(): JSX.Element {
  const pageOffSet = useRef<OffsetPos | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);

  const [mouseAction, setMouseAction] = useState<MouseAction>({
    isDown: false,
    isMove: false,
  });

  const [currentCoord, setCurrentCoord] = useState<Coord>({ y: 0, x: 0 });
  const [imageState, setImageState] = useRecoilState<ImageState>(currentImageState);

  const toolState = useRecoilValue(currentToolAtom);
  const drawRectHandler = new RectDrawHandlerBuilder()
    .setCtx(ctx.current)
    .setColor(toolState.color)
    .setOnlyBorderDraw(toolState.drawBorder)
    .build();

  const [colorPixelLeft, colorPixelTop, drawWidth, drawHeight] = useGetPixelData(ctx, imageState, currentCoord);

  const imageData = useDrawImage({
    imgSrc: imageState.src,
    onLoad: (img) => {
      ctx.current = canvasRef.current?.getContext('2d', { willReadFrequently: true });
      if (img === null || ctx.current === null) return;
      const w = img.naturalWidth;
      const h = img.naturalHeight;

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

      drawImage({ w, h, ctx, imageData: img });
      drawRectHandler.draw({
        x: imageState.rectCoordX,
        y: imageState.rectCoordY,
        width: imageState.rectWidth,
        height: imageState.rectHeight,
      });
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
      !imageState.loadSuccess ||
      imageState.imageSizeWidth === null ||
      imageState.imageSizeHeight === null
    )
      return;

    drawImage({ w: imageState.imageSizeWidth, h: imageState.imageSizeHeight, ctx, imageData });
  }, [imageState.loadSuccess, imageState.imageSizeHeight, imageState.imageSizeWidth, imageData]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (pageOffSet.current === null) return;
    drawImage({ w: imageState.imageSizeWidth, h: imageState.imageSizeHeight, ctx, imageData });
    setMouseAction((prev): MouseAction => ({ ...prev, isDown: true }));

    const { offsetTop, offsetLeft } = pageOffSet.current;
    const y = e.pageY - offsetTop;
    const x = e.pageX - offsetLeft;
    setCurrentCoord((prev): Coord => ({ ...prev, y, x }));
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!mouseAction.isDown || pageOffSet.current === null) return;

    setMouseAction((prev): MouseAction => ({ ...prev, isMove: true }));

    const { offsetTop, offsetLeft } = pageOffSet.current;
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

    drawImage({ w: imageState.imageSizeWidth, h: imageState.imageSizeHeight, ctx, imageData });
    drawRectHandler.draw({ x: rectCoordX, y: rectCoordY, width: rectWidth, height: rectHeight }, toolState.drawSquare);
  };

  const onMouseUp = (): void => {
    /** @description 마우스를 이동하지 않고 클릭만 했다면 */
    if (!mouseAction.isMove) {
      setImageState(
        (prev): ImageState => ({
          ...prev,
          rectCoordX: colorPixelLeft,
          rectCoordY: colorPixelTop,
          rectWidth: drawWidth,
          rectHeight: drawHeight,
        }),
      );

      drawImage({ w: imageState.imageSizeWidth, h: imageState.imageSizeHeight, ctx, imageData });
      drawRectHandler.draw(
        { x: colorPixelLeft, y: colorPixelTop, width: drawWidth, height: drawHeight },
        toolState.drawSquare,
      );
    }

    setMouseAction({ isDown: false, isMove: false });
    setCurrentCoord((prev): Coord => ({ ...prev, y: 0, x: 0 }));
  };

  if (!imageState.loadSuccess) return <ImageError />;

  return (
    <main className="flex justify-center items-center">
      <canvas
        className="bg-cover relative border border-solid border-zinc-700"
        ref={(el) => {
          if (el === null) return;
          // @ts-expect-error: 린트 규칙 ...
          canvasRef.current = el;
          pageOffSet.current = {
            offsetLeft: el.offsetLeft,
            offsetTop: el.offsetTop,
          };
        }}
        width={`${Math.floor(imageState.imageSizeWidth)}`}
        height={`${Math.floor(imageState.imageSizeHeight)}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
    </main>
  );
}
