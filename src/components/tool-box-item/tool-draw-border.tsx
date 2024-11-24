/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { TbBoxAlignBottomRightFilled } from 'react-icons/tb';
import { useRecoilState } from 'recoil';
import { useOverlay } from '@toss/use-overlay';
import clsx from 'clsx';
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
    <div className="absolute top-[213px] left-[90px]">
      <span className="p-1 bg-white rounded text-sm border border-solid border-[#292c39]">
        그려지는 영역의 색상을 채웁니다.
      </span>
    </div>,
    document.getElementById('portal') as Element,
  );
}

export default function ToolDrawBorder(): JSX.Element {
  const [currentToolState, setCurrentToolState] = useRecoilState(currentToolAtom);

  const [hover, setHover] = useState(false);
  const overlay = useOverlay();

  useEffect(() => {
    overlay.open(({ close }) => <DescriptionModal isOpen={hover} close={close} />);
  }, [hover, overlay]);

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
      type="button"
      onMouseOver={() => setHover(true)}
      onFocus={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onBlur={() => setHover(false)}
      className={clsx([
        !currentToolState.drawBorder && 'bg-[#e0e0e0] hover:bg-[#e0e0e0]',
        'border border-solid border-[#292c39] flex items-center p-2 justify-center hover:bg-[#e0e0e0]',
      ])}
    >
      <TbBoxAlignBottomRightFilled size={23} />
    </button>
  );
}
