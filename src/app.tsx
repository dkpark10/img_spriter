import React from 'react';
import Canvas from './components/canvas';
import Header from './components/header';
import Title from './components/title';
import CodeArea from './components/code_area';

export default function App() {
  return (
    <>
      <Title />
      <Header />
      <div className='flex justify-center items-center'>
        <Canvas />
      </div>
      <CodeArea />
    </>
  );
}
