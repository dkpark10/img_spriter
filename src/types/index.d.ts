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

  interface RectState extends Coord, Size {}

  interface ImageSrcState {
    src: string;
    isLocal: boolean;
  }

  type TabName = '이미지 경로 검색' | '이미지 파일 업로드';

  interface GatherImageStatus extends ImageSrcState, RectState {}

  type ImageStatusByTab = Record<TabName, GatherImageStatus>;
}
