import React, {
  useState,
  useRef,
  RefObject,
  useEffect,
} from 'react';
import { Size, Coord } from 'custom-type';

interface Props {
  size: Size;
  target: RefObject<HTMLElement>;
}

export default function SizeDot({ size, target }: Props) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [currentDotCoord, setCurrentDotCoord] = useState<Coord[]>([]);

  useEffect(() => {
    setCurrentDotCoord([
      { y: 0, x: 0 },
      { y: size.height, x: 0 },
      { y: 0, x: size.width },
      { y: size.height, x: size.width },
    ]);
  }, [size.width, size.height]);

  const dotRef = useRef<HTMLButtonElement[]>([]);

  const setDotButtonElement = (element: HTMLButtonElement | null, idx: number) => {
    if (element === null) {
      return;
    }

    dotRef.current[idx] = element;
  };

  const onMouseDown = () => {
    if (!target.current) {
      return;
    }

    setIsMouseDown(true);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    if (isMouseDown === false) {
      return;
    }

    setCurrentDotCoord((prev) => {
      const { movementX, movementY } = e;
      const newCurrentCoord = [...prev];
      newCurrentCoord[idx].x += movementX;
      newCurrentCoord[idx].y += movementY;

      return newCurrentCoord;
    });
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <>
      {currentDotCoord.map((item, idx) => (
        <button
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className={`absolute w-[12px] h-[12px] rounded-full bg-teal-400 
              cursor-pointer translate-x-[-50%] translate-y-[-50%]`}
          style={{ top: item.y, left: item.x }}
          onMouseDown={onMouseDown}
          onMouseMove={(e) => onMouseMove(e, idx)}
          onMouseUp={onMouseUp}
          aria-label='size-controller'
          type='button'
          ref={(el) => setDotButtonElement(el, idx)}
        />
      ))}
    </>
  );

  // return (
  //   <>
  //     <button
  //       className={`absolute w-[12px] h-[12px] rounded-full bg-teal-400
  //       cursor-pointer translate-x-[-50%] translate-y-[-50%]`}
  //       style={{ top: currentDotCoord[0].y, left: currentDotCoord[0].x }}
  //       onMouseDown={(e) => onMouseDown(e, 0)}
  //       onMouseMove={onMouseMove}
  //       onMouseUp={onMouseUp}
  //       aria-label='size-controller1'
  //       type='button'
  //       ref={(el) => (
  //         setDotButtonElement(el, 0)
  //       )}
  //     />
  //     <button
  //       className={`absolute w-[12px] h-[12px] rounded-full bg-teal-400
  //       cursor-pointer translate-x-[-50%] translate-y-[-50%]`}
  //       style={{ top: currentDotCoord[1].y, left: currentDotCoord[1].x }}
  //       onMouseDown={(e) => onMouseDown(e, 1)}
  //       onMouseMove={onMouseMove}
  //       onMouseUp={onMouseUp}
  //       aria-label='size-controller2'
  //       type='button'
  //       ref={(el) => (
  //         setDotButtonElement(el, 1)
  //       )}
  //     />
  //     <button
  //       className={`absolute w-[12px] h-[12px] rounded-full bg-teal-400
  //       cursor-pointer translate-x-[-50%] translate-y-[-50%]`}
  //       style={{ top: currentDotCoord[2].y, left: currentDotCoord[2].x }}
  //       onMouseDown={(e) => onMouseDown(e, 2)}
  //       onMouseMove={onMouseMove}
  //       onMouseUp={onMouseUp}
  //       aria-label='size-controller3'
  //       type='button'
  //       ref={(el) => (
  //         setDotButtonElement(el, 2)
  //       )}
  //     />
  //     <button
  //       className={`absolute w-[12px] h-[12px] rounded-full bg-teal-400
  //       cursor-pointer translate-x-[-50%] translate-y-[-50%]`}
  //       style={{ top: currentDotCoord[3].y, left: currentDotCoord[3].x }}
  //       onMouseDown={(e) => onMouseDown(e, 3)}
  //       onMouseMove={onMouseMove}
  //       onMouseUp={onMouseUp}
  //       aria-label='size-controller4'
  //       type='button'
  //       ref={(el) => (
  //         setDotButtonElement(el, 3)
  //       )}
  //     />
  //   </>
  // );
}
