import { TbBoxAlignBottomRightFilled } from 'react-icons/tb';
import { useRecoilState } from 'recoil';
import { Tooltip } from 'react-tooltip';
import clsx from 'clsx';
import { currentToolAtom, type CurrentToolAtom } from '@/store';

export default function ToolDrawBorder(): JSX.Element {
  const [currentToolState, setCurrentToolState] = useRecoilState(currentToolAtom);

  return (
    <button
      onClick={() => {
        setCurrentToolState(
          (prev): CurrentToolAtom => ({
            ...prev,
            drawBorder: !prev.drawBorder,
          }),
        );
      }}
      data-tooltip-id="tooltip-draw-border"
      data-tooltip-content="그려지는 영역의 색상을 채웁니다."
      type="button"
      className={clsx([
        !currentToolState.drawBorder && 'bg-[#e0e0e0] hover:bg-[#e0e0e0]',
        'border border-solid border-[#292c39] flex items-center p-2 justify-center hover:bg-[#e0e0e0]',
      ])}
    >
      <TbBoxAlignBottomRightFilled size={23} />
      <Tooltip
        id="tooltip-draw-border"
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
