import { MdAutoFixHigh } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';
import { currentToolAtom, type CurrentToolAtom } from '@/store';

export default function ToolAutoDrawing({ ...restProps }): JSX.Element {
  const setCurrentToolState = useSetRecoilState(currentToolAtom);

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
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      <MdAutoFixHigh size={23} />
    </button>
  );
}
