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

  type TabName = '이미지 경로 검색' | '이미지 파일 업로드';

  interface ImageState {
    src: string;
    isLocal: boolean;
    recyCoordX: number;
    rectCoordY: number;
    rectWidth: number;
    rectHeight: number;
    imageSizeWidth: number;
    imageSizeHeight: number;
    scale: number;
    loadError: boolean;
  }
}
