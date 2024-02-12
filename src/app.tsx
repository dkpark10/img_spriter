import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { Transition, type TransitionStatus } from 'react-transition-group';
import type { ImageState } from 'custom-type';
import { currentImageState } from '@/store';
import { Title, Canvas, Header, Footer, CodeArea, SizeScaleRangeBar, ToolBox } from '@/components';
// eslint-disable-next-line import/extensions
import packageInfo from '../package.json';

const TIMEOUT = 100;
const getTransitionStyles: {
  [key in TransitionStatus]?: React.CSSProperties;
} = {
  entering: {
    opacity: 0,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
  },
};

export default function App(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const imageState = useRecoilValue<ImageState>(currentImageState);

  return (
    <>
      <span className="hidden" data-version={packageInfo.version ?? '1.6.0'} />
      <ToolBox />
      <Title />
      <Header />
      <Transition nodeRef={ref} timeout={TIMEOUT} in={imageState.loadSuccess} appear>
        {(status) => (
          <div
            ref={ref}
            style={{
              ...getTransitionStyles[status],
            }}
          >
            <CodeArea />
            <SizeScaleRangeBar />
            <Canvas />
          </div>
        )}
      </Transition>
      {/* <SlicedImage /> */}
      <Footer />
    </>
  );
}
