import { type HexColor } from 'custom-type';
import { useRef } from 'react';
import { IoMdColorFill } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import { Tooltip } from 'react-tooltip';
import { currentToolAtom, type CurrentToolAtom } from '@/store';

export default function ToolColor(): JSX.Element {
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
      data-tooltip-id="tooltip-draw-color"
      data-tooltip-content="그려지는 영역의 색상을 조정합니다."
      onKeyDown={onClickColorTool}
      className="border border-solid border-[#292c39] flex items-center p-2 justify-center hover:bg-[#e0e0e0]"
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
      <Tooltip
        id="tooltip-draw-color"
        place="right-start"
        style={{
          padding: '0.25rem',
          backgroundColor: 'white',
          borderRadius: '0.125rem',
          fontSize: '0.875rem',
          color: '#292c39',
        }}
        border="1px solid #292c39"
      />
    </button>
  );
}
