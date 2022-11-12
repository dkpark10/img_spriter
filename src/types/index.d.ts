declare module 'custom-type' {
  interface Coord {
    y: number;
    x: number;
  }

  interface PrevRectangleCoord extends Coord {
    rightBottomY: number;
    rightBottomX: number;
  }

  interface Size {
    width: number;
    height: number;
  }

  interface Test {
    name: string;
  }
}
