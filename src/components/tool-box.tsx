import { PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IoMdColorFill } from 'react-icons/io';
import { PiRectangleDuotone } from 'react-icons/pi';
import { TbBoxAlignBottomRightFilled, TbBoxAlignBottomRight } from 'react-icons/tb';

function IconContainer({ children }: PropsWithChildren) {
  return <div className="flex items-center p-2 justify-center">{children}</div>;
}

export default function ToolBox() {
  const portalRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    portalRef.current = document.getElementById('portal');
  }, []);

  if (portalRef.current) {
    return createPortal(
      <div className="absolute top-40 rounded left-11 border border-neutral-600">
        <IconContainer>
          <IoMdColorFill size={23} />
        </IconContainer>
        <IconContainer>
          <PiRectangleDuotone size={23} />
        </IconContainer>
        <IconContainer>
          <TbBoxAlignBottomRightFilled size={23} />
        </IconContainer>
        <IconContainer>
          <TbBoxAlignBottomRight size={23} />
        </IconContainer>
      </div>,
      portalRef.current,
    );
  }

  return null;
}
