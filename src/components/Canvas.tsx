import type { Coord, ImageState, ColorPixelDataList } from 'custom-type';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentImageState } from '@/store/index';
import { getCanvasImageData, isNonColorPixel } from '@/utils/get-canvas-image-data';
import { getColorPixelMaxSize } from '@/utils/dfs-color-pixel';

const drawRect = (ctx: CanvasRenderingContext2D, l: number, t: number, w: number, h: number) => {
  ctx.strokeRect(l, t, w, h);
  ctx.strokeRect(l, t, w, h);
  ctx.strokeRect(l, t, w, h);
};

export default function Canvas() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);

  const [mouseAction, setMouseAction] = useState({
    isDown: false,
    isMove: false,
  });

  const [currentCoord, setCurrentCoord] = useState<Coord>({ y: 0, x: 0 });
  const [imageState, setImageState] = useRecoilState<ImageState>(currentImageState);
  const [colorPixelData, setColorPixelData] = useState<ColorPixelDataList>([]);

  useEffect(() => {
    const drawImage = () => {
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = imageState.src;
      image.alt = 'target_image';

      image.onload = () => {
        ctx.current = canvasRef.current?.getContext('2d');

        if (!ctx.current) return;
        ctx.current.drawImage(image, 0, 0);
        const extractedColorPixelData = getCanvasImageData(ctx.current, 0, 0, image.naturalWidth, image.naturalHeight);
        setColorPixelData(extractedColorPixelData);

        setImageState((prev: ImageState) => ({
          ...prev,
          loadError: false,
          imageSizeWidth: image.naturalWidth,
          imageSizeHeight: image.naturalHeight,
        }));
      };

      image.onerror = () => {
        setImageState((prev) => ({ ...prev, loadError: true }));
      };
    };

    drawImage();
    setCurrentCoord({ y: 0, x: 0 });
    setMouseAction({
      isDown: false,
      isMove: false,
    });
  }, [imageState.src, setImageState]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !canvasWrapperRef.current || !ctx.current) {
      return;
    }

    setMouseAction((prev) => ({
      ...prev,
      isDown: true,
    }));

    const { offsetTop, offsetLeft } = canvasWrapperRef.current;
    const y = e.pageY - offsetTop;
    const x = e.pageX - offsetLeft;

    setCurrentCoord((prev) => ({ ...prev, y, x }));
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !canvasWrapperRef.current || !ctx.current || mouseAction.isDown === false) return;

    ctx.current.strokeStyle = '#ff0077';
    ctx.current.lineWidth = 0.5;
    setMouseAction((prev) => ({
      ...prev,
      isMove: true,
    }));

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

    ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawRect(ctx.current, left, top, width, height);
  };

  const onMouseUp = () => {
    if (!canvasRef.current || !canvasWrapperRef.current || !ctx.current) return;

    const { y, x } = currentCoord;
    const { imageSizeWidth, imageSizeHeight } = imageState;

    /** @description 마우스를 이동하지 않고 클릭만 했다면 */
    if (!isNonColorPixel(colorPixelData[y][x]) && mouseAction.isMove === false) {
      const [left, top, drawWidth, drawHeight] = getColorPixelMaxSize(
        y,
        x,
        imageSizeWidth,
        imageSizeHeight,
        colorPixelData,
      );

      ctx.current?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawRect(ctx.current, left, top, drawWidth, drawHeight);
    }

    setMouseAction({
      isDown: false,
      isMove: false,
    });

    setCurrentCoord((prev) => ({
      ...prev,
      y: 0,
      x: 0,
    }));
  };

  if (imageState.loadError) {
    throw new Error('이미지 로드 에러');
  }

  return (
    <main className="flex justify-center items-center">
      <div className="relative border border-solid border-zinc-700" ref={canvasWrapperRef}>
        <canvas
          className="bg-cover"
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
