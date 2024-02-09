import { Title, Canvas, Header, Footer, CodeArea, SlicedImage, SizeScaleRangeBar, ToolBox } from '@/components';
// eslint-disable-next-line import/extensions
import packageInfo from '../package.json';

export default function App() {
  return (
    <>
      <span className="hidden" data-version={packageInfo.version || '1.5.1'} />
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
