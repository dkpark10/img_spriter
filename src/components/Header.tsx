import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  width:100%;
  display:flex;
  justify-content: center;
  align-items: center;
  height: 59px;

  & input[type='text'] {
    width: 400px;
    border:none;
    height:29px;
    border-radius: 6px;
    background-color: #e0e0e0;
    padding:0 5px;

    &:focus {
      outline: 1px solid #204de0;
    }
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <input
        type="text"
        name="imgsrc"
        placeholder="이미지 주소"
      />
    </HeaderWrapper>
  );
}
