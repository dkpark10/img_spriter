import React from 'react';

import ImageErrorBoundary from './components/common/image-error-boundary';
import {
  Title,
  Canvas,
  Header,
  DragBox,
  Footer,
  CodeArea,
  SlicedImage,
  SizeScaleRangeBar,
  ImageLoadError,
} from './components';

export default function App() {
  return (
    <>
      <Title />
      <Header />
      <ImageErrorBoundary fallback={<ImageLoadError />}>
        <CodeArea />
        <SizeScaleRangeBar />
        <Canvas />
        <SlicedImage />
      </ImageErrorBoundary>
      <Footer />
    </>
  );
}
