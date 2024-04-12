import { useEffect, useRef } from 'react';

interface UseDrawImageParams {
  imgSrc: string;
  onLoad?: (img: HTMLImageElement | null) => void;
  onError?: () => void;
  onFinal?: () => void;
}

export const useDrawImage = ({ imgSrc, onLoad, onError, onFinal }: UseDrawImageParams): HTMLImageElement | null => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imgSrc;
    image.alt = 'target_image';
    imageRef.current = image;

    image.onload = () => {
      onLoad?.(imageRef.current);
      onFinal?.();
    };

    image.onerror = (error) => {
      console.error(error);
      onError?.();
      onFinal?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSrc]);

  return imageRef.current;
};
