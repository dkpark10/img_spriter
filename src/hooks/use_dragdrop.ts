import React, { useState } from 'react';
import { Coord, Rectangle } from 'custom-type';

interface Props {
  target: HTMLElement;
}

export default function useDragAndDrop({ target }: Props) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [initCoord, setInitCoord] = useState<Coord>({ y: 0, x: 0 });
  const [movingCoord, setMovingCoord] = useState<Rectangle>({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsMouseDown(true);

    if (!target) {
      return;
    }

    const { offsetTop, offsetLeft } = target;
    const y = e.pageY - offsetTop;
    const x = e.pageX - offsetLeft;

    setInitCoord((prev) => ({
      ...prev,
      y,
      x,
    }));
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!target || !isMouseDown) {
      return;
    }

    const { offsetLeft, offsetTop } = target;
    const mouseCoordY = e.pageY - offsetTop;
    const mouseCoordX = e.pageX - offsetLeft;

    const left = Math.min(mouseCoordX, initCoord.x);
    const top = Math.min(mouseCoordY, initCoord.y);
    const width = Math.abs(mouseCoordX - initCoord.x);
    const height = Math.abs(mouseCoordY - initCoord.y);

    setMovingCoord((prev) => ({
      ...prev,
      left,
      top,
      right: width,
      bottom: height,
    }));
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
    setInitCoord((prev) => ({
      ...prev,
      y: 0,
      x: 0,
    }));
  };

  return {
    initCoord,
    movingCoord,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
}
