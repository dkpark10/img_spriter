import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ToolBox() {
  const portalRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    portalRef.current = document.getElementById('portal');
  }, []);

  if (portalRef.current) {
    return createPortal(
      <div className="absolute top-40 left-11 border border-neutral-600">
        <div className="w-10 h-10">color</div>
        <div className="w-10 h-10">color</div>
      </div>,
      portalRef.current,
    );
  }

  return null;
}
