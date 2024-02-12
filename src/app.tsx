import { Title, Canvas, Header, Footer, CodeArea, SizeScaleRangeBar, ToolBox } from '@/components';
// eslint-disable-next-line import/extensions
import packageInfo from '../package.json';

export default function App(): JSX.Element {
  return (
    <>
      <span className="hidden" data-version={packageInfo.version ?? '1.5.1'} />
      <ToolBox />
      <Title />
      <Header />
      <CodeArea />
      <SizeScaleRangeBar />
      <Canvas />
      {/* <SlicedImage /> */}
      <Footer />
    </>
  );
}
