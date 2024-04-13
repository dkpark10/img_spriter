import { type RefObject, useMemo } from 'react';
import type { Coord, ImageState } from 'custom-type';
import { getCanvasImageData } from '@/utils/get-canvas-image-data';
import { getColorPixelMaxSize } from '@/utils/bfs-color-pixel';

export const useGetPixelData = (
  ctx: RefObject<CanvasRenderingContext2D | null | undefined>,
  imageState: ImageState,
  currentCoord: Coord,
): number[] => {
  return useMemo(() => {
    if (
      ctx.current === undefined ||
      ctx.current === null ||
      imageState.imageSizeWidth === 0 ||
      imageState.imageSizeHeight === 0 ||
      currentCoord.y === 0 ||
      currentCoord.x === 0
    )
      return [0, 0, 0, 0];

    const colorPixData = getCanvasImageData(ctx.current, imageState.imageSizeWidth, imageState.imageSizeHeight);

    return getColorPixelMaxSize(
      currentCoord.y,
      currentCoord.x,
      imageState.imageSizeWidth,
      imageState.imageSizeHeight,
      colorPixData,
      2,
    );
  }, [ctx, currentCoord.y, currentCoord.x, imageState.imageSizeWidth, imageState.imageSizeHeight]);
};
