import { HexColor } from 'custom-type';
import { atom } from 'recoil';

export const RECT_COLOR_KEY = 'RECT_COLOR_KEY';

export const currentRectColor = atom<HexColor>({
  key: RECT_COLOR_KEY,
  default: '#ff0077',
});
