import React, { createContext, useState, useMemo } from "react";

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
  setData: () => { console.log(".."); },
});

export default function ContextStore({ children }: Props) {
  const [data, setData] = useState<number>(0);
  const value = useMemo(() => ({
    data,
    constantData: 23,
    setData,
  }), [data]);

  return (
    <ArticleContext.Provider
      value={value}
    >
      {children}
    </ArticleContext.Provider>
  );
}
