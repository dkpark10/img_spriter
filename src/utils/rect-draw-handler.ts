/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
import type { RectState } from 'custom-type';
import { type CurrentToolAtom, currentToolDefault } from '@/store';

const DRAW_COUNT = 2;

class RectDrawHandler {
  private readonly ctx: CanvasRenderingContext2D | null | undefined = null;

  private readonly tool: CurrentToolAtom = currentToolDefault;

  constructor(builder: RectDrawHandlerBuilder) {
    this.tool = builder.getTool();
    this.ctx = builder.getCtx();
  }

  public draw({ x, y, width, height }: RectState): void {
    if (this.ctx === null || this.ctx === undefined) return;
    this.ctx.lineWidth = 1;

    if (this.tool.drawSquare) {
      width = width < height ? width : height;
      height = width > height ? height : width;
    }

    for (let i = 0; i < DRAW_COUNT; i += 1) {
      if (this.tool.drawBorder) {
        this.ctx.strokeStyle = this.tool.color;
        this.ctx.strokeRect(x, y, width, height);
      } else {
        this.ctx.fillStyle = this.tool.color;
        this.ctx.globalAlpha = 0.2;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.globalAlpha = 1;
      }
    }
  }
}

export class RectDrawHandlerBuilder {
  private ctx: CanvasRenderingContext2D | null | undefined = null;

  private tool: CurrentToolAtom = currentToolDefault;

  public setCtx(ctx: CanvasRenderingContext2D | null | undefined): this {
    this.ctx = ctx;
    return this;
  }

  public getCtx(): CanvasRenderingContext2D | null | undefined {
    return this.ctx;
  }

  public setTool(tool: CurrentToolAtom): this {
    this.tool = tool;
    return this;
  }

  public getTool(): CurrentToolAtom {
    return this.tool;
  }

  public build(): RectDrawHandler {
    return new RectDrawHandler(this);
  }
}
