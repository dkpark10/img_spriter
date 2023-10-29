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
} from './components';
import { currentImageState } from '@/store';

export default function App() {
  const imageState = useRecoilValue(currentImageState);
  return (
    <>
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
