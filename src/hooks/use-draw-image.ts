import { useEffect, useRef } from 'react';

interface UseDrawImageParams {
  imgSrc: string;
  onLoad?: (img: HTMLImageElement | null) => void;
  onError?: () => void;
  onFinal?: () => void;
}

export const useDrawImage = ({ imgSrc, onLoad, onError, onFinal }: UseDrawImageParams): HTMLImageElement | null => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const onLoadRef = useRef(onLoad);
  const onErrorRef = useRef(onError);
  const onFinalRef = useRef(onFinal);

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imgSrc;
    image.alt = 'target_image';
    imageRef.current = image;

    image.onload = () => {
      onLoadRef.current?.(imageRef.current);
      onFinalRef.current?.();
    };

    image.onerror = () => {
      onErrorRef.current?.();
      onFinalRef.current?.();
    };
  }, [imgSrc]);

  return imageRef.current;
};
