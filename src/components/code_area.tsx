import { useRecoilValue } from 'recoil';
import { toast, ToastContainer } from 'react-strawberry-toast';
import { currentImageState } from '@/store/index';

import 'react-strawberry-toast/dist/style.css';

export default function CodeArea(): JSX.Element {
  const imageState = useRecoilValue(currentImageState);

  const copy = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    const text = e.currentTarget.textContent ?? '';
    window.navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('복사가 완료되었습니다.');
      })
      .catch((error) => {
        console.error(error);
        toast.error('복사가 실패했습니다.');
      });
  };

  return (
    <div className="flex items-center justify-center m-3 relative">
      <ToastContainer position="bottom-center" />
      <code
        data-testid="code-area"
        tabIndex={0}
        onClick={copy}
        onKeyDown={copy}
        role="button"
        className="bg-[#292c39] text-[#cacaca] rounded-md p-4"
      >
        <div>{'.sprite_img {'}</div>
        <div>
          &nbsp;&nbsp;&nbsp;background-image:&nbsp;
          <span className="text-[#44e149]">url</span>
          {`('${imageState.isLocal ? '이미지의 실제 경로를 입력하여 사용하세요.' : imageState.src}');`}
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;background-repeat:&nbsp;
          <span className="text-[#f08a15]">no-repeat</span>;
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;background-position:&nbsp;
          <span className="text-[#f08a15]">{`${-imageState.rectCoordX}px ${-imageState.rectCoordY}px`}</span>;
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;background-size:&nbsp;
          <span className="text-[#f08a15]">
            {`${Math.floor(imageState.imageSizeWidth)}px ${Math.floor(imageState.imageSizeHeight)}px`}
          </span>
          ;
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;width:&nbsp;
          <span data-testid="code-width" className="text-[#f08a15]">{`${imageState.rectWidth}px`}</span>;
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;height:&nbsp;
          <span data-testid="code-height" className="text-[#f08a15]">{`${imageState.rectHeight}px`}</span>;
        </div>
        <div>{'}'}</div>
      </code>
    </div>
  );
}
