import type { Coord, ImageState } from 'custom-type';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentImageState } from '@/store/index';
import { getCanvasImageData, isNonColorPixel } from '@/utils/get-canvas-image-data';
import { getColorPixelMaxSize } from '@/utils/bfs-color-pixel';

const drawRect = (ctx: CanvasRenderingContext2D, l: number, t: number, w: number, h: number) => {
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

  useEffect(() => {
    const drawImage = () => {
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = imageState.src;
      image.alt = 'target_image';

      image.onload = () => {
        ctx.current = canvasRef.current?.getContext('2d', { willReadFrequently: true });

        if (!ctx.current) return;
        const imageWidth = image.naturalWidth * imageState.scale;
        const imageHeight = image.naturalHeight * imageState.scale;
        ctx.current.scale(imageState.scale, imageState.scale);
        ctx.current.drawImage(image, 0, 0, imageWidth, imageHeight);

        const extractedColorPixelData = getCanvasImageData(
          ctx.current,
          0,
          0,
          Math.floor(imageWidth),
          Math.floor(imageHeight),
        );

        setImageState((prev: ImageState) => ({
          ...prev,
          loadError: false,
          imageSizeWidth: imageWidth,
          imageSizeHeight: imageHeight,
          colorPixelData: extractedColorPixelData,
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
  }, [imageState.src, setImageState, imageState.scale]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !canvasWrapperRef.current || !ctx.current) {
      return;
    }

    ctx.current.strokeStyle = '#ff0077';
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

    ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawRect(ctx.current, left, top, width, height);
  };

  const onMouseUp = () => {
    if (!canvasRef.current || !canvasWrapperRef.current || !ctx.current) return;

    const { y, x } = currentCoord;
    const { imageSizeWidth, imageSizeHeight, colorPixelData } = imageState;

    /** @description 마우스를 이동하지 않고 클릭만 했다면 */
    if (!isNonColorPixel(colorPixelData[y][x]) && mouseAction.isMove === false) {
      const [left, top, drawWidth, drawHeight] = getColorPixelMaxSize(
        y,
        x,
        imageSizeWidth,
        imageSizeHeight,
        colorPixelData,
        2,
      );

      ctx.current?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawRect(ctx.current, left, top, drawWidth, drawHeight);
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
