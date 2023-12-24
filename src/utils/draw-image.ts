interface DrawImageArgs {
  w: number;
  h: number;
  ctx: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>;
  imageRef: React.MutableRefObject<HTMLImageElement>;
}

export const drawImage = ({ w, h, ctx, imageRef }: DrawImageArgs) => {
  if (!ctx.current) return;
  ctx.current.clearRect(0, 0, w, h);
  ctx.current.drawImage(imageRef.current, 0, 0, w, h);
};
