import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { imageSrcState } from '../store/index';

const HeaderWrapper = styled.header`
  width:100%;
  display:flex;
  justify-content: center;
  align-items: center;
  height: 59px;

  & input[type='text'] {
    width: 380px;
    border:none;
    height:32px;
    border-radius: 6px;
    background-color: #e0e0e0;
    padding:0 6px;

    &:focus {
      outline: 1px solid #204de0;
    }
  }
`;

export default function Header() {
  const [imgSrc, setImageSrc] = useRecoilState(imageSrcState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageSrc(e.target.value);
  };

  return (
    <HeaderWrapper>
      <input
        type='text'
        name='imgsrc'
        placeholder='이미지 주소'
        onChange={onChange}
        value={imgSrc}
      />
    </HeaderWrapper>
  );
}
