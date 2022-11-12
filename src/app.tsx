import React from 'react';
import styled from 'styled-components';
import Canvas from './components/Canvas';
import Header from './components/Header';
import Title from './components/Title';

const CenterWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  return (
    <>
      <Title />
      <Header />
      <CenterWrapper>
        <Canvas />
      </CenterWrapper>
    </>
  );
}
