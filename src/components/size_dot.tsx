import React from 'react';
import styled from 'styled-components';

interface ISizeDot {
  top: number;
  left: number;
}

const SizeDot = styled.div<ISizeDot>`
  background-color: red;
  width:8px;
  height:8px;
  border-radius: 50%;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  cursor: pointer;

  &:hover {
    display: none;
  }
`;

export default SizeDot;
