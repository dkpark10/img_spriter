/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { TbBoxAlignBottomRightFilled } from 'react-icons/tb';
import { useSetRecoilState } from 'recoil';
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
    <div className="absolute top-[258px] left-[90px]">
      <span className="p-1 bg-white rounded text-sm border border-solid border-[#292c39]">
        사각형 색상을 채우는 모드입니다.
      </span>
    </div>,
    document.getElementById('portal') as Element,
  );
}

export default function ToolDrawBorder({ ...restProps }): JSX.Element {
  const setCurrentToolState = useSetRecoilState(currentToolAtom);

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
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      <TbBoxAlignBottomRightFilled size={23} />
    </button>
  );
}
