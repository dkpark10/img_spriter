import type { ImageState } from 'custom-type';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import clsx from 'clsx';
import { pathImageAtom } from '@/store';
import { debounce } from '@/utils';
import { useInput } from '@/hooks';

export default function Header(): JSX.Element {
  const [imageState, setImageState] = useRecoilState<ImageState>(pathImageAtom);

  const debounceChangeSrc = useMemo(
    () =>
      debounce((src: string[]) => {
        setImageState(
          (prev): ImageState => ({
            ...prev,
            src: src[0],
            isLocal: false,
          }),
        );
      }, 250),
    [setImageState],
  );

  const [printValue, setPrintValue] = useInput(imageState.src, debounceChangeSrc);

  return (
    <div className="w-full flex justify-center items-center h-[60px]">
      <input
        className={`w-[408px] border-none h-[38px] rounded-md bg-[#e0e0e0] px-2 ${clsx(!imageState.loadSuccess && 'text-rose-600')}`}
        type="text"
        name="imgsrc"
        placeholder="이미지 주소를 입력하세요."
        onChange={setPrintValue}
        value={printValue}
      />
    </div>
  );
}
