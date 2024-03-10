interface DrawImageArgs {
  w: number;
  h: number;
  ctx: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>;
  imageData: HTMLImageElement | null;
}

export const drawImage = ({ w, h, ctx, imageData }: DrawImageArgs): void => {
  if (ctx.current === null || ctx.current === undefined) return;
  if (imageData === null) return;
  ctx.current.clearRect(0, 0, w, h);
  ctx.current.drawImage(imageData, 0, 0, w, h);
};
