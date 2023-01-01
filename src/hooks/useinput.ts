import React, { useState } from 'react';

export type Return = [string, (e:React.ChangeEvent<HTMLInputElement>) => void];

export function useInput(init: string, callback?: (arg: string) => void): Return {
  const [value, setValue] = useState(init);

  const ohChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (callback) {
      callback(e.target.value);
    }
  };

  return [value, ohChange];
}
