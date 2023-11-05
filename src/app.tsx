import { useRecoilValue } from 'recoil';
import {
  Title,
  Canvas,
  Header,
  Footer,
  CodeArea,
  SlicedImage,
  SizeScaleRangeBar,
  ImageLoadError,
  ToolBox,
} from '@/components';
import { currentImageState } from '@/store';
// eslint-disable-next-line import/extensions
import packageInfo from '../package.json';

export default function App() {
  const imageState = useRecoilValue(currentImageState);
  return (
    <>
      <span className="hidden" data-version={packageInfo.version || '1.5.0'} />
      <ToolBox />
      <Title />
      <Header />
      {imageState.src ? (
        <>
          <CodeArea />
          <SizeScaleRangeBar />
          <Canvas />
          <SlicedImage />
        </>
      ) : (
        <ImageLoadError />
      )}
      <Footer />
    </>
  );
}
