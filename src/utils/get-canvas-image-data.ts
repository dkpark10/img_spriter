import type { ColorPixelData, ColorPixelDataList } from 'custom-type';

export const isNonColorPixel = (colorPixelData: ColorPixelData) => {
  const { r, g, b, a } = colorPixelData;
  return r === 0 || g === 0 || b === 0 || a === 0;
};

export const getCanvasImageData = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  const imageData = ctx.getImageData(x, y, width, height);
  const pixelData = imageData.data;
  const colorPixelData: ColorPixelDataList = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({ r: 0, g: 0, b: 0, a: 0 })),
  );

  const len = pixelData.length;
  for (let i = 0; i < len; i += 4) {
    const r = pixelData[i];
    const g = pixelData[i + 1];
    const b = pixelData[i + 2];
    const a = pixelData[i + 3];

    // eslint-disable-next-line no-continue
    if (isNonColorPixel({ r, g, b, a })) continue;
    const pixelY = Math.floor(i / 4 / width);
    const pixelX = (i / 4) % width;

    colorPixelData[pixelY][pixelX] = { r, g, b, a };
  }

  return colorPixelData;
};
