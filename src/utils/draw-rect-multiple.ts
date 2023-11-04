export const drawRectMultiple = (
  ctx: CanvasRenderingContext2D,
  l: number,
  t: number,
  w: number,
  h: number,
  count = 2,
) => {
  for (let i = 0; i < count; i += 1) {
    ctx.strokeRect(l, t, w, h);
  }
};
