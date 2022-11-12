import React, { useRef } from 'react';
import styled from 'styled-components';

const CanvasStyle = styled.canvas`
  border:1px solid red;
  width: 500px;
  height: 500px;
`;

export default function Canvas() {
  const canvasRef = useRef(null);

  return (
    <div>
      <CanvasStyle ref={canvasRef} />
    </div>
  );
}
