import React from 'react';

import {
  Title,
  Canvas,
  Header,
  Footer,
  CodeArea,
  SizeScaleRangeBar,
} from './components/index';

export default function App() {
  return (
    <>
      <Title />
      <Header />
      <CodeArea />
      <SizeScaleRangeBar />
      <Canvas />
      <Footer />
    </>
  );
}
