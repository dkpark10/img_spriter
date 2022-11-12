export type Timer = ReturnType<typeof setTimeout>;

export const debounce = (callback: (args: unknown) => void, delay: number) => {
  let timer: Timer;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, delay);
  };
};
