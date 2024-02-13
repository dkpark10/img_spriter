import { HexColor } from 'custom-type';
import { PropsWithChildren, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IoMdColorFill } from 'react-icons/io';
import { TbBoxAlignBottomRightFilled, TbBoxAlignBottomRight } from 'react-icons/tb';
import { MdAutoFixHigh } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { currentRectColor } from '@/store';

interface IconContainerProps extends PropsWithChildren {
  onClick?: () => void;
}

function IconContainer({ children, onClick }: IconContainerProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={onClick}
      className="flex items-center p-2 justify-center"
    >
      {children}
    </div>
  );
}

IconContainer.defaultProps = {
  onClick: () => {},
};

export default function ToolBox() {
  const [colorRect, setColorRect] = useRecoilState(currentRectColor);

  const colorElementRef = useRef<HTMLInputElement>(null);

  const onClickColorTool = () => {
    if (!colorElementRef.current) return;
    colorElementRef.current.click();
  };

  return createPortal(
    <div className="absolute top-40 rounded left-11 border border-neutral-600">
      <IconContainer onClick={onClickColorTool}>
        <input
          ref={colorElementRef}
          className="w-0 h-0"
          type="color"
          name="color"
          value={colorRect}
          onChange={(e) => {
            setColorRect(e.target.value as HexColor);
          }}
        />
        <IoMdColorFill size={23} />
      </IconContainer>
      <IconContainer>
        <MdAutoFixHigh size={23} />
      </IconContainer>
      <IconContainer>
        <TbBoxAlignBottomRightFilled size={23} />
      </IconContainer>
      <IconContainer>
        <TbBoxAlignBottomRight size={23} />
      </IconContainer>
    </div>,
    document.getElementById('portal') as Element,
  );
}