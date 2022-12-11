import { atom } from 'recoil';
import { Size, Coord } from 'custom-type';

export const REPEAT_COORD = 'repeatCoord';
export const SPRITE_SIZE = 'spriteSize';
export const IMG_SRC = 'imageSrc';

interface SizeState extends Coord, Size {}

export const spriteSizeState = atom<SizeState>({
  key: SPRITE_SIZE,
  default: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
});

export const imageSrcState = atom<string>({
  key: REPEAT_COORD,
  default: 'https://s.pstatic.net/static/www/img/uit/sp_weather_time_b8ecd0.png',
});
