import { atom } from 'recoil';
import { Size, Coord } from 'custom-type';

export const REPEAT_COORD = 'repeatCoord';
export const RECT_SIZE = 'rectSize';
export const IMG_SRC = 'imageSrc';
export const IMG_SIZE = 'imageSize';
export const SCALE_SIZE = 'scaleSize';
export const IMAGE_LOAD = 'imageLoad';

interface SizeState extends Coord, Size {}

interface ImageSrcState {
  src: string;
  isLocal: boolean;
}

export const rectSizeeState = atom<SizeState>({
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

export const imageSrcState = atom<ImageSrcState>({
  key: REPEAT_COORD,
  default: {
    src: 'https://s.pstatic.net/static/www/img/uit/sp_weather_time_b8ecd0.png',
    isLocal: false,
  },
  // default: 'https://s.pstatic.net/static/www/img/uit/sp_weather_time_b8ecd0.png',
  // default: 'https://cmnt.zum.com/plugin/zum-comment/images/spr_social_comment_m_20190902.png',
  // default: 'https://s.pstatic.net/static/www/img/uit/sp_main_947f65.png',
  // default: 'https://i.pinimg.com/564x/6a/ea/1c/6aea1c0bc96840a03644ed7b460fac9e.jpg',
});

export const imageScaleState = atom<number>({
  key: SCALE_SIZE,
  default: 1,
});

export const imageLoadStatusState = atom<boolean>({
  key: IMAGE_LOAD,
  default: false,
});
