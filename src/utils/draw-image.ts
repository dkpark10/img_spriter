interface DrawImageArgs {
  w: number;
  h: number;
  ctx: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>;
  imageRef: React.MutableRefObject<HTMLImageElement | null>;
}

export const drawImage = ({ w, h, ctx, imageRef }: DrawImageArgs): void => {
  if (ctx.current === null || ctx.current === undefined) return;
  if (imageRef.current === null) return;
  ctx.current.clearRect(0, 0, w, h);
  ctx.current.drawImage(imageRef.current, 0, 0, w, h);
};
