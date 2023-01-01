import { atom } from 'recoil';

export const SCALE_SIZE = 'scaleSize';

export const imageScaleState = atom<number>({
  key: SCALE_SIZE,
  default: 1,
});
