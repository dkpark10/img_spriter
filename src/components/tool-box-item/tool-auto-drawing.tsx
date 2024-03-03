/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { MdAutoFixHigh } from 'react-icons/md';
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
    <div className="absolute top-[213px] left-[90px]">
      <span className="p-1 bg-white rounded text-sm border border-solid border-[#292c39]">
        자동 그리기 모드를 활성화 합니다.
      </span>
    </div>,
    document.getElementById('portal') as Element,
  );
}

export default function ToolAutoDrawing({ ...restProps }): JSX.Element {
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
            autoDrawing: !prev.autoDrawing,
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
      <MdAutoFixHigh size={23} />
    </button>
  );
}
