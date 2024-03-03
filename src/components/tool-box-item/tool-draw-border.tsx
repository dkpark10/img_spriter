import { TbBoxAlignBottomRightFilled } from 'react-icons/tb';
import { useSetRecoilState } from 'recoil';
import { currentToolAtom, type CurrentToolAtom } from '@/store';

export default function ToolDrawBorder({ ...restProps }): JSX.Element {
  const setCurrentToolState = useSetRecoilState(currentToolAtom);

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
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      <TbBoxAlignBottomRightFilled size={23} />
    </button>
  );
}
