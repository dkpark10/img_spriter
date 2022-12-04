declare module 'custom-type' {
  interface Coord {
    y: number;
    x: number;
  }

  interface Rectangle {
    left: number;
    top: number;
    right: number;
    bottom: number;
  }

  interface Size {
    width: number;
    height: number;
  }
}
