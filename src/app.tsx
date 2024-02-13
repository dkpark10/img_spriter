import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { Transition, TransitionGroup, type TransitionStatus } from 'react-transition-group';
import type { TabName } from 'custom-type';
import { currentTabAtom } from '@/store';
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
    opacity: 0,
  },
};

export default function App(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const currentTab = useRecoilValue<TabName>(currentTabAtom);

  return (
    <>
      <span className="hidden" data-version={packageInfo.version ?? '1.6.0'} />
      <ToolBox />
      <Title />
      <Header />
      <TransitionGroup>
        <Transition timeout={TIMEOUT} key={currentTab}>
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
      </TransitionGroup>
      {/* <SlicedImage /> */}
      <Footer />
    </>
  );
}
