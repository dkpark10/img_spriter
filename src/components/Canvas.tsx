import type { MouseAction, Coord, ImageState } from 'custom-type';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentImageState, currentToolAtom } from '@/store';
import { drawImage } from '@/utils/draw-image';
import { RectDrawHandlerBuilder } from '@/utils/rect-draw-handler';
import { useDrawImage } from '@/hooks/use-draw-image';
// import { useGetPixelData } from '@/hooks/use-pixel-data';

export default function Canvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);

  const [mouseAction, setMouseAction] = useState<MouseAction>({
    isDown: false,
    isMove: false,
  });

  const [currentCoord, setCurrentCoord] = useState<Coord>({ y: 0, x: 0 });
  const [{ src, imageSizeHeight, imageSizeWidth }, setImageState] = useRecoilState<ImageState>(currentImageState);

  const toolState = useRecoilValue(currentToolAtom);
  const drawRectHandler = new RectDrawHandlerBuilder().setCtx(ctx.current).setTool(toolState).build();

  // const [colorPixelLeft, colorPixelTop, drawWidth, drawHeight] = useGetPixelData(ctx, imageState, currentCoord);

  const imageData = useDrawImage({
    imgSrc: src,
    onLoad: (img) => {
      ctx.current = canvasRef.current?.getContext('2d', { willReadFrequently: true });
      if (img === null || canvasRef.current === null) return;
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
    },
    onError: () => {
      setImageState((prev): ImageState => ({ ...prev, loadSuccess: false }));
    },
    onFinal: () => {
      setCurrentCoord({ y: 0, x: 0 });
      setMouseAction({ isDown: false, isMove: false });
    },
  });

  /** @description 이전 이미지에서 또 다른 이미지에서 로드 성공 후 캔버스에 안나타나는 문제를 수정하기 위한 로직 */
  useEffect(() => {
    drawImage({ w: imageSizeWidth, h: imageSizeHeight, ctx, imageData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSizeWidth, imageSizeHeight]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (canvasRef.current === null) return;
    drawImage({ w: imageSizeWidth, h: imageSizeHeight, ctx, imageData });
    setMouseAction((prev): MouseAction => ({ ...prev, isDown: true }));

    const { offsetTop, offsetLeft } = canvasRef.current;
    const y = e.pageY - offsetTop;
    const x = e.pageX - offsetLeft;
    setCurrentCoord((prev): Coord => ({ ...prev, y, x }));
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!mouseAction.isDown || canvasRef.current === null) return;

    setMouseAction((prev): MouseAction => ({ ...prev, isMove: true }));

    const { offsetTop, offsetLeft } = canvasRef.current;
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

    drawImage({ w: imageSizeWidth, h: imageSizeHeight, ctx, imageData });
    drawRectHandler.draw({ x: rectCoordX, y: rectCoordY, width: rectWidth, height: rectHeight });
  };

  const onMouseUp = (): void => {
    // if (!mouseAction.isMove) {
    //   setImageState(
    //     (prev): ImageState => ({
    //       ...prev,
    //       rectCoordX: colorPixelLeft,
    //       rectCoordY: colorPixelTop,
    //       rectWidth: drawWidth,
    //       rectHeight: drawHeight,
    //     }),
    //   );

    //   drawImage({ w: imageSizeWidth, h: imageSizeHeight, ctx, imageData });
    //   drawRectHandler.draw({ x: colorPixelLeft, y: colorPixelTop, width: drawWidth, height: drawHeight });
    // }

    setMouseAction({ isDown: false, isMove: false });
    setCurrentCoord((prev): Coord => ({ ...prev, y: 0, x: 0 }));
  };

  return (
    <canvas
      className="bg-cover relative border border-solid border-zinc-700"
      ref={canvasRef}
      width={`${Math.floor(imageSizeWidth)}`}
      height={`${Math.floor(imageSizeHeight)}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
}
