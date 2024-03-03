import { createPortal } from 'react-dom';
import { ToolItems } from '@/components/tool-box-item';

export default function ToolBox(): JSX.Element {
  const className = 'border border-solid border-[#292c39] flex items-center p-2 justify-center hover:bg-[#e0e0e0]';

  return createPortal(
    <div className="absolute top-40 rounded left-11 grid gap-1">
      <ToolItems.Color className={className} />
      <ToolItems.AutoDrawing className={className} />
      <ToolItems.DrawBorder className={className} />
    </div>,
    document.getElementById('portal') as Element,
  );
}
