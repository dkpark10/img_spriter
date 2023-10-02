interface ColorPixelData {
  [key: number]: {
    r: number;
    b: number;
    g: number;
    a: number;
  };
}

export const getCanvasImageData = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  const imageData = ctx.getImageData(x, y, width, height);
  const pixelData = imageData.data;
  const colorPixelData: ColorPixelData = {};

  const len = pixelData.length;
  for (let i = 0; i < len; i += 4) {
    const r = pixelData[i];
    const g = pixelData[i + 1];
    const b = pixelData[i + 2];
    const a = pixelData[i + 3];

    // eslint-disable-next-line no-continue
    if (r === 0 || g === 0 || b === 0 || a === 0) continue;
    colorPixelData[i] = { r, g, b, a };
  }

  return colorPixelData;
};
