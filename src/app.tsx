import { useRecoilValue } from 'recoil';
import { Title, Canvas, Header, Footer, CodeArea, SlicedImage, SizeScaleRangeBar, ImageLoadError } from './components';
import { currentImageState } from '@/store/index';

export default function App() {
  const imageState = useRecoilValue(currentImageState);
  return (
    <>
      <Title />
      <Header />
      {!imageState.loadError ? (
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
