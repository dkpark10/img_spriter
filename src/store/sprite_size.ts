import { atom, selector } from 'recoil';
import {
  Size, RectState, ImageSrcState, TabName,
} from 'custom-type';

export const RECT_SIZE = 'rectSize';
export const PATH_IMG_SRC = 'pathImageSrc';
export const FILE_IMG_SRC = 'fileImageSrc';
export const IMG_SIZE = 'imageSize';
export const SCALE_SIZE = 'scaleSize';
export const IMAGE_LOAD = 'imageLoad';
export const CURRENT_TAB = 'currentTab';
export const CURRENT_TAB_IMAGE = 'currentTabImage';

export const currentTabState = atom<TabName>({
  key: CURRENT_TAB,
  default: '이미지 경로 검색',
});

export const rectSizeeState = atom<RectState>({
  key: RECT_SIZE,
  default: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
});

export const imageSizeState = atom<Size>({
  key: IMG_SIZE,
  default: {
    width: 0,
    height: 0,
  },
});

export const pathImageSrcState = atom<ImageSrcState>({
  key: PATH_IMG_SRC,
  default: {
    src: 'https://s.pstatic.net/static/www/img/uit/sp_weather_time_b8ecd0.png',
    isLocal: false,
  },
  // default: 'https://s.pstatic.net/static/www/img/uit/sp_weather_time_b8ecd0.png',
  // default: 'https://cmnt.zum.com/plugin/zum-comment/images/spr_social_comment_m_20190902.png',
  // default: 'https://s.pstatic.net/static/www/img/uit/sp_main_947f65.png',
  // default: 'https://i.pinimg.com/564x/6a/ea/1c/6aea1c0bc96840a03644ed7b460fac9e.jpg',
});

export const fileImageSrcState = atom<ImageSrcState>({
  key: FILE_IMG_SRC,
  default: {
    src: '',
    isLocal: true,
  },
});

export const imageSrcState = selector({
  key: CURRENT_TAB_IMAGE,
  get: ({ get }) => {
    const currentTab = get(currentTabState);
    const pathImageSrc = get(pathImageSrcState);
    const fileImageSrc = get(fileImageSrcState);

    if (currentTab === '이미지 경로 검색') {
      return pathImageSrc;
    }

    return fileImageSrc;
  },
});

export const imageScaleState = atom<number>({
  key: SCALE_SIZE,
  default: 1,
});

export const imageLoadStatusState = atom<boolean>({
  key: IMAGE_LOAD,
  default: false,
});
