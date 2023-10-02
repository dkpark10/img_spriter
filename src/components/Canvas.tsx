import type { Coord, ImageState, ColorPixelDataList } from 'custom-type';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentImageState } from '@/store/index';
import { getCanvasImageData } from '@/utils/get-canvas-image-data';
import { getColorPixelMaxSize } from '@/utils/dfs-color-pixel';

export default function Canvas() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(null);

  const [mouseAction, setMouseAction] = useState({
    isDown: false,
    isMove: false,
  });

  const [initCoord, setInitCoord] = useState<Coord>({ y: 0, x: 0 });
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
        ctx.current.strokeStyle = '#ff0077';
        ctx.current.lineWidth = 0.5;

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
    setInitCoord({ y: 0, x: 0 });
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

    setInitCoord((prev) => ({ ...prev, y, x }));
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !canvasWrapperRef.current || !ctx.current || mouseAction.isDown === false) {
      return;
    }

    setMouseAction((prev) => ({
      ...prev,
      isMove: true,
    }));

    const { offsetLeft, offsetTop } = canvasWrapperRef.current;
    const mouseCoordY = e.pageY - offsetTop;
    const mouseCoordX = e.pageX - offsetLeft;

    const left = Math.min(mouseCoordX, initCoord.x);
    const top = Math.min(mouseCoordY, initCoord.y);
    const width = Math.abs(mouseCoordX - initCoord.x);
    const height = Math.abs(mouseCoordY - initCoord.y);

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
    ctx.current.strokeRect(left, top, width, height);
    ctx.current.strokeRect(left, top, width, height);
    ctx.current.strokeRect(left, top, width, height);
  };

  const onMouseUp = () => {
    setMouseAction({
      isDown: false,
      isMove: false,
    });

    setInitCoord((prev) => ({
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
