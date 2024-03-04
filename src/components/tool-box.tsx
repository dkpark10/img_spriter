import { createPortal } from 'react-dom';
import { ToolItems } from '@/components/tool-box-item';

export default function ToolBox(): JSX.Element {
  return createPortal(
    <div className="absolute top-40 left-11 grid gap-1">
      <ToolItems.Color />
      <ToolItems.AutoDrawing />
      <ToolItems.DrawBorder />
    </div>,
    document.getElementById('portal') as Element,
  );
}
