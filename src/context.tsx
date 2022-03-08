import React, { createContext, useState } from "react";

interface IContext {
  data: number;
  constantData: number;
  setData: React.Dispatch<React.SetStateAction<number>>;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ArticleContext = createContext<IContext>({
  data: 0,
  constantData: -1,
  setData: () => { }
});

export default function ContextStore({ children }: Props) {
  const [data, setData] = useState<number>(0);

  return (
    <>
      <ArticleContext.Provider
        value={{
          data,
          constantData: 23,
          setData
        }}
      >
        {children}
      </ArticleContext.Provider>
    </>
  )
}