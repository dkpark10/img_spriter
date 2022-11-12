import React from 'react';
import styled from 'styled-components';

const TitleStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #19191c;
  font-size: 2.8rem;
  margin-top: 15px;
  font-family: 'Noto Sans KR', sans-serif;
`;

export default function Title() {
  return <TitleStyle>이미지 스프라이터</TitleStyle>;
}
