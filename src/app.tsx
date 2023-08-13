import React from 'react';

import ErrorBoundary from './components/common/image-error-boundary';
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
      <CodeArea />
      <SizeScaleRangeBar />
      <ErrorBoundary fallback={<ImageLoadError />}>
        <Canvas />
      </ErrorBoundary>
      <SlicedImage />
      <Footer />
    </>
  );
}
