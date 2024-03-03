/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { createPortal } from 'react-dom';
import { type HexColor } from 'custom-type';
import { useEffect, useRef, useState } from 'react';
import { IoMdColorFill } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import { useOverlay } from '@toss/use-overlay';
import { currentToolAtom, type CurrentToolAtom } from '@/store';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
}

function DescriptionModal({ isOpen, close }: ModalProps): JSX.Element {
  useEffect(() => {
    close();
  }, [isOpen, close]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!isOpen) return <></>;

  return createPortal(
    <div className="absolute top-[167px] left-[90px]">
      <span className="p-1 bg-white rounded text-sm border border-solid border-[#292c39]">
        사각형의 색상을 조정합니다.
      </span>
    </div>,
    document.getElementById('portal') as Element,
  );
}

export default function ToolColor({ ...restProps }): JSX.Element {
  const [currentToolState, setCurrentToolState] = useRecoilState(currentToolAtom);

  const colorElementRef = useRef<HTMLInputElement>(null);

  const [hover, setHover] = useState(false);
  const overlay = useOverlay();

  const onClickColorTool = (): void => {
    if (colorElementRef.current === null) return;
    colorElementRef.current.click();
  };

  useEffect(() => {
    overlay.open(({ close }) => <DescriptionModal isOpen={hover} close={close} />);
  }, [hover, overlay]);

  return (
    <button
      onClick={onClickColorTool}
      type="button"
      tabIndex={0}
      onKeyDown={onClickColorTool}
      onMouseOver={() => setHover(true)}
      onFocus={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onBlur={() => setHover(false)}
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
