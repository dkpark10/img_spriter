import { type HexColor } from 'custom-type';
import { useRef } from 'react';
import { IoMdColorFill } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import { currentToolAtom, type CurrentToolAtom } from '@/store';

export default function ToolColor({ ...restProps }): JSX.Element {
  const [currentToolState, setCurrentToolState] = useRecoilState(currentToolAtom);

  const colorElementRef = useRef<HTMLInputElement>(null);

  const onClickColorTool = (): void => {
    if (colorElementRef.current === null) return;
    colorElementRef.current.click();
  };

  return (
    <button
      onClick={onClickColorTool}
      type="button"
      tabIndex={0}
      onKeyDown={onClickColorTool}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      <input
        ref={colorElementRef}
        className="w-0 h-0"
        type="color"
        name="color"
        value={currentToolState.color}
        onChange={(e) => {
          setCurrentToolState(
            (prev): CurrentToolAtom => ({
              ...prev,
              color: e.target.value as HexColor,
            }),
          );
        }}
      />
      <IoMdColorFill size={23} />
    </button>
  );
}
