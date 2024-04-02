import { useMemo, useEffect, useRef } from 'react';

export function useIsMounted(): boolean {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useMemo(() => isMounted.current, []);
}
