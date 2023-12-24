import { TabName, ImageState } from 'custom-type';
import { atom, selector } from 'recoil';

export const PATH_IMG_SRC = 'pathImageSrc';
export const FILE_IMG_SRC = 'fileImageSrc';
export const CURRENT_TAB = 'currentTab';
export const CURRENT_IMAGE_STATE = 'currentImageState';

export const currentTabAtom = atom<TabName>({
  key: CURRENT_TAB,
  default: '이미지 경로 검색',
});

export const pathImageAtom = atom<ImageState>({
  key: PATH_IMG_SRC,
  default: {
    src: 'sample.png',
    isLocal: false,
    rectCoordX: 0,
    rectCoordY: 0,
    rectWidth: 0,
    rectHeight: 0,
    imageSizeWidth: 0,
    imageSizeHeight: 0,
    loadSuccess: false,
    imageOriginWidth: 0,
    imageOriginHeight: 0,
  },

  // default: 'https://s.pstatic.net/static/www/img/uit/sp_weather_time_b8ecd0.png',
  // default: 'https://cmnt.zum.com/plugin/zum-comment/images/spr_social_comment_m_20190902.png',
  // default: 'https://s.pstatic.net/static/www/img/uit/sp_main_947f65.png',
  // default: 'https://i.pinimg.com/564x/6a/ea/1c/6aea1c0bc96840a03644ed7b460fac9e.jpg',
});

export const fileImageAtom = atom<ImageState>({
  key: FILE_IMG_SRC,
  default: {
    src: '',
    isLocal: true,
    rectCoordX: 0,
    rectCoordY: 0,
    rectWidth: 0,
    rectHeight: 0,
    imageSizeWidth: 0,
    imageSizeHeight: 0,
    loadSuccess: false,
    imageOriginWidth: 0,
    imageOriginHeight: 0,
  },
});

export const currentImageState = selector<ImageState>({
  key: CURRENT_IMAGE_STATE,
  get: ({ get }) => {
    const currentTab = get(currentTabAtom);
    const pathImageSrc = get(pathImageAtom);
    const fileImageSrc = get(fileImageAtom);

    if (currentTab === '이미지 경로 검색') {
      return pathImageSrc;
    }

    return fileImageSrc;
  },

  set: ({ set, get }, newValue) => {
    const currentTab = get(currentTabAtom);

    if (currentTab === '이미지 경로 검색') {
      set(pathImageAtom, newValue);
      return;
    }

    set(fileImageAtom, newValue);
  },
});
