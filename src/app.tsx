import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./reducer/counter";
import { RootState } from "./reducer/index";
import theme from "./styles/theme";
import useAxios from "./customhook/useaxios";
// import useAxios from './customhook/useaxios';

// export default function App(): JSX.Element {

//   const dispatch = useDispatch();
//   const data = useSelector((state: RootState) => state.count.data);
//   const [display, setDisplay] = useState<boolean>(false);

//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <h2>{data}</h2>
//         <button onClick={() => dispatch(increment())}>increase</button>
//         <button onClick={() => dispatch(decrement())}>decrease</button>
//         <main>
//           <label>{process.env.NODE_ENV}</label>
//         </main>
//         <button onClick={() => setDisplay(prev => !prev)}>show</button>
//         {display && <h1>Lulu</h1>}
//       </ThemeProvider>
//     </>
//   )
// }

const HeaderWrapper = styled.header`
  position: relative;
  width:100%;
  height:6vh;
  font-family: 'Roboto', sans-serif;
  border-top: 1px solid blue;
  border-bottom: 1px solid blue;
  background-color: white;
  
  ul{
    font-size:0.8rem;
  }

  input[type='checkbox']{
    cursor:pointer;
    opacity: 0;
    width:17px;
    height:18px;
    position: absolute;
    top:4px;
    left:5px;
  }
`;

const HeaderContentWrapper = styled.div`

  // 데스크탑
  @media screen and (min-width: 769px){
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    display:flex;
    justify-content: space-between;
    align-items: center;
    width: 724px;

    input[type='checkbox']{
      display:none;
    }

    .hamburger {
      display:none;
    }
  }

  // 모바일
  @media screen and (max-width: 768px){
    position: relative;
    top:50%;
    left:51%;
    transform: translate(-50%, -50%);
  }

  h2{
    display:inline;
    color:blue;
  }
`;

const MenuList = styled.ul`
  display:none;
  // 데탑
  @media screen and (min-width: 769px){
    width:527px;
    display:flex;
    list-style: none;
    justify-content: space-between;
    align-items: center;
  }
`;

const Hamburger = styled.span`
  margin: 0px 5px;
  display:inline-block;
  width:20px;
  height:20px;
  
  div{
    width:100%;
    height:2px;
    margin: 4px 0px;
    background-color: #373737;
  }
`;

const MobileMenu = styled.ul`
  @media screen and (min-width: 769px){
    display:none;
  }

  padding:20px;
  width:30vw;
  height:60vh;
  left: 0;
  top:6vh;
  position:absolute;
  list-style: none;
  background-color: white;
  z-index: 2;

  li{
    cursor:pointer;
    margin: 40px 0px;
  }

  li:hover{
    color:blue;
    margin: 40px 0px;
  }
`;

const Game = styled.div`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  min-width:794px;
  height:454px;
  background-color: pink;
`;

export default function App(): JSX.Element {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.count.data);
  const [display, setDisplay] = useState<boolean>(false);

  // const [response, loading] = useAxios({
  //   method: "POST",
  //   url: "/",
  //   data: {
  //     time: 1234,
  //   },
  // });

  return (
    <ThemeProvider theme={theme}>
      <h2>{data}</h2>
      <button type="button" onClick={() => dispatch(increment())}>increase</button>
      <button type="button" onClick={() => dispatch(decrement())}>decrease</button>
      <main>
        <label htmlFor="mode">{process.env.NODE_ENV}</label>
      </main>
      <button type="button" onClick={() => setDisplay((prev) => !prev)}>show</button>
      {display && <h1>Lulu</h1>}
    </ThemeProvider>
  );
}
