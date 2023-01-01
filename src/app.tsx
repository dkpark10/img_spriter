import React from 'react';
import Canvas from './components/canvas';
import Header from './components/header';
import Title from './components/title';
import CodeArea from './components/code_area';
import SizeScaleRangeBar from './components/size_scale_range';
import Footer from './components/footer';

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
