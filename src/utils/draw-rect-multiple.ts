export const drawRectMultiple = (
  ctx: CanvasRenderingContext2D,
  l: number,
  t: number,
  w: number,
  h: number,
  isBorder: boolean,
  count = 2,
): void => {
  for (let i = 0; i < count; i += 1) {
    if (isBorder) {
      ctx.strokeRect(l, t, w, h);
    } else {
      ctx.globalAlpha = 0.2;
      ctx.fillRect(l, t, w, h);
      ctx.globalAlpha = 1;
    }
  }
};
