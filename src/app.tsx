import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./reducer/counter";
import { RootState } from "./reducer/index";
import theme from "./styles/theme";
import image from "../public/img0.jpg";

export default function App(): JSX.Element {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.count.data);
  const [display, setDisplay] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <h2>{data}</h2>
      <img src={image} alt="hwaboon" />
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
