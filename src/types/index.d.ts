declare module 'custom-type' {
  interface Coord {
    y: number;
    x: number;
  }

  interface Size {
    width: number;
    height: number;
  }

  interface RectState extends Coord, Size {}

  interface ImageSrcState {
    src: string;
    isLocal: boolean;
  }

  interface MouseAction {
    isDown: boolean;
    isMove: boolean;
  }

  type TabName = '이미지 경로 검색' | '이미지 파일 업로드';

  interface ColorPixelData {
    r: string;
    g: string;
    b: string;
    a: string;
  }

  type ColorPixelDataList = ColorPixelData[][];

  interface ImageState {
    src: string;
    isLocal: boolean;
    rectCoordX: number;
    rectCoordY: number;
    rectWidth: number;
    rectHeight: number;
    imageSizeWidth: number;
    imageSizeHeight: number;
    loadSuccess: boolean;
    imageOriginWidth: number;
    imageOriginHeight: number;
    scale: number;
  }

  type HexColor = `#${string}`;

  interface OffsetPos {
    offsetLeft: number;
    offsetTop: number;
  }
}
