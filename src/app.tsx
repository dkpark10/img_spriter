import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './reducer/counter';
import { RootState } from './reducer/index';

export default function App(): JSX.Element {

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.count.data);

  return (
    <>
      <h2>{data}</h2>
      <button onClick={() => dispatch(increment())}>increase</button>
      <button onClick={() => dispatch(decrement())}>decrease</button>
    </>
  )
}

// export default function App(): JSX.Element {

//   const [data, setData] = useState<number>(0);
//   const inc = () => {
//     setData(data + 1);
//   }

//   const dec = () => {
//     setData(data - 1);
//   }

//   return (
//     <>
//       <h2>{data}</h2>
//       <button onClick={inc}>increase</button>
//       <button onClick={dec}>decrease</button>
//     </>
//   )
// }