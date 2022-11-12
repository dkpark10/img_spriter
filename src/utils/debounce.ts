const debounce = (callback: (args: any) => void, delay: number) => {
  let timer: any = null;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, delay);
  };
};

export default debounce;
