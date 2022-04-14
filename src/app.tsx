import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './reducer/counter';
import { RootState } from './reducer/index';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

export default function App(): JSX.Element {

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.count.data);
  const [display, setDisplay] = useState<boolean>(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        <h2>{data}</h2>
        <button onClick={() => dispatch(increment())}>increase</button>
        <button onClick={() => dispatch(decrement())}>decrease</button>
        <main>
          <label>{process.env.NODE_ENV}</label>
        </main>
        <button onClick={() => setDisplay(prev => !prev)}>show</button>
        {display && <h1>Lulu</h1>}       
      </ThemeProvider>
    </>
  )
}