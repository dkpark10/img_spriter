import React from 'react';
import styled from 'styled-components';
import Canvas from './components/canvas';
import Header from './components/header';
import Title from './components/title';
import CodeArea from './components/code_area';

const CenterWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default function App() {
  return (
    <>
      <Title />
      <Header />
      <CenterWrapper>
        <Canvas />
      </CenterWrapper>
      <CodeArea />
    </>
  );
}
