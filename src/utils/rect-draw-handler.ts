/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
import type { HexColor, RectState } from 'custom-type';

class RectDrawHandler {
  private readonly ctx: CanvasRenderingContext2D | null | undefined = null;

  private readonly color: HexColor = '#ffffff';

  private readonly onlyBorderDraw: boolean = true;

  private readonly DRAW_COUNT = 2;

  constructor(builder: RectDrawHandlerBuilder) {
    this.color = builder.getColor();
    this.onlyBorderDraw = builder.getOnlyBorderDraw();
    this.ctx = builder.getCtx();
  }

  public draw({ x, y, width, height }: RectState, drawSquare = false): void {
    if (this.ctx === null || this.ctx === undefined) return;
    this.ctx.lineWidth = 1;

    if (drawSquare) {
      width = width < height ? width : height;
      height = width > height ? height : width;
    }

    for (let i = 0; i < this.DRAW_COUNT; i += 1) {
      if (this.onlyBorderDraw) {
        this.ctx.strokeStyle = this.color;
        this.ctx.strokeRect(x, y, width, height);
      } else {
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = 0.2;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.globalAlpha = 1;
      }
    }
  }
}

export class RectDrawHandlerBuilder {
  private ctx: CanvasRenderingContext2D | null | undefined = null;

  private color: HexColor = '#ffffff';

  private onlyBorderDraw = true;

  public setCtx(ctx: CanvasRenderingContext2D | null | undefined): this {
    this.ctx = ctx;
    return this;
  }

  public getCtx(): CanvasRenderingContext2D | null | undefined {
    return this.ctx;
  }

  public setColor(color: HexColor): this {
    this.color = color;
    return this;
  }

  public getColor(): HexColor {
    return this.color;
  }

  public setOnlyBorderDraw(onlyBorderDraw: boolean): this {
    this.onlyBorderDraw = onlyBorderDraw;
    return this;
  }

  public getOnlyBorderDraw(): boolean {
    return this.onlyBorderDraw;
  }

  public build(): RectDrawHandler {
    return new RectDrawHandler(this);
  }
}
