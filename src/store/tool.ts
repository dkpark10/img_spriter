import { type HexColor } from 'custom-type';
import { atom } from 'recoil';

export interface CurrentToolAtom {
  color: HexColor;
  autoDrawing: boolean;
  drawBorder: boolean;
  drawSquare: boolean;
}

export const TOOL_STATE = 'TOOL_STATE';

export const currentToolAtom = atom<CurrentToolAtom>({
  key: TOOL_STATE,
  default: {
    color: '#ff0077',
    autoDrawing: false,
    drawBorder: true,
    drawSquare: false,
  },
});
