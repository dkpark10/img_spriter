import React from 'react';

import {
  Title,
  Canvas,
  Header,
  Footer,
  CodeArea,
  SlicedImage,
  SizeScaleRangeBar,
  DragBox,
} from './components/index';

export default function App() {
  return (
    <>
      <Title />
      <DragBox />
      <Header />
      <CodeArea />
      <SizeScaleRangeBar />
      <Canvas />
      <SlicedImage />
      <Footer />
    </>
  );
}
