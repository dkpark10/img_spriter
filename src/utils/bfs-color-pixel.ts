/* eslint-disable no-continue */
import type { ColorPixelDataList, Coord } from 'custom-type';
import { Queue } from './queue';
import { isNonColorPixel } from './get-canvas-image-data';

const outOfRange = (x: number, y: number, width: number, height: number): boolean =>
  x < 0 || y < 0 || x >= width || y >= height;

/** @description canvas 에서 색이 있는 픽셀 클릭 시 dfs로 순회하여 최대 가로, 세로를 구하는 함수 */
export const getColorPixelMaxSize = (
  initY: number,
  initX: number,
  width: number,
  height: number,
  pixelColorList: ColorPixelDataList,
  thresHold: number,
): number[] => {
  const tempPixelColorList = pixelColorList;
  let left = initX;
  let top = initY;
  let right = initX;
  let bottom = initY;

  const dirY = [0, 0, 1, -1];
  const dirX = [1, -1, 0, 0];
  const visited = Array.from({ length: height }, () => Array.from({ length: width }, () => false));

  const q = new Queue<Coord>();
  q.push({ y: initY, x: initX });

  while (!q.isEmpty()) {
    const { y: currentY, x: currentX } = q.pop();
    visited[currentY][currentX] = true;
    left = Math.min(left, currentX);
    top = Math.min(top, currentY);
    right = Math.max(right, currentX);
    bottom = Math.max(bottom, currentY);

    for (let i = 0; i < 4; i += 1) {
      const nextY = currentY + dirY[i];
      const nextX = currentX + dirX[i];

      if (outOfRange(nextX, nextY, width, height)) continue;
      const { r, g, b, a } = tempPixelColorList[nextY][nextX];
      if (isNonColorPixel({ r, g, b, a })) continue;
      if (visited[nextY][nextX]) continue;
      visited[nextY][nextX] = true;
      q.push({ y: nextY, x: nextX });
    }
  }

  left -= thresHold;
  top -= thresHold;
  right = right - left + thresHold * 3;
  bottom = bottom - top + thresHold * 3;

  left = left <= 0 ? 0 : left;
  top = top <= 0 ? 0 : top;
  right = right >= width ? width : right;
  bottom = bottom >= height ? height : bottom;

  return [left, top, right, bottom];
};
