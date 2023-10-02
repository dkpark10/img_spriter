/* eslint-disable no-continue */
import type { ColorPixelDataList } from 'custom-type';
import { isNonColorPixel } from './get-canvas-image-data';

const outOfRange = (x: number, y: number, width: number, height: number) => x < 0 || y < 0 || x >= width || y >= height;

/** @description canvas 에서 색이 있는 픽셀 클릭 시 dfs로 순회하여 최대 가로, 세로를 구하는 함수 */
export const getColorPixelMaxSize = (
  initY: number,
  initX: number,
  width: number,
  height: number,
  pixelColorList: ColorPixelDataList,
) => {
  const tempPixelColorList = pixelColorList;
  let left = initX;
  let top = initY;
  let right = initX;
  let bottom = initY;

  const dirY = [0, 0, 1, -1];
  const dirX = [1, -1, 0, 0];
  const visited = Array.from({ length: height }, () => Array.from({ length: width }, () => false));

  const dfs = (y: number, x: number) => {
    visited[y][x] = true;
    left = Math.min(left, x);
    top = Math.min(top, y);
    right = Math.max(right, x);
    bottom = Math.max(bottom, y);

    for (let i = 0; i < 4; i += 1) {
      const nextY = y + dirY[i];
      const nextX = x + dirX[i];

      const { r, g, b, a } = tempPixelColorList[nextY][nextX];
      if (isNonColorPixel({ r, g, b, a })) continue;
      if (outOfRange(nextX, nextY, width, height)) continue;
      if (visited[nextY][nextX]) continue;
      dfs(nextY, nextX);
    }
  };

  dfs(initY, initX);
  return [left, top, right, bottom];
};
