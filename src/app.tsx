import React from 'react';
import styled from 'styled-components';
import Canvas from './components/Canvas';
import Header from './components/Header';

const CenterWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  border:1px solid yellow;
`;

export default function App() {
  return (
    <>
      <Header />
      <CenterWrapper>
        <Canvas />
      </CenterWrapper>
    </>
  );
}
