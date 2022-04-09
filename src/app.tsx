import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './reducer/counter';
import { RootState } from './reducer/index';
import image from './assets/img0.jpg';

export default function App(): JSX.Element {

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.count.data);
  console.log(image);

  return (
    <>
      <h2>{data}</h2>
      <button onClick={() => dispatch(increment())}>increase</button>
      <button onClick={() => dispatch(decrement())}>decrease</button>
      <main>
        <img src={image}/>
        <label>{process.env.NODE_ENV}</label>
      </main>
    </>
  )
}