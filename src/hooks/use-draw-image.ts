import { useEffect, useRef } from 'react';

interface UseDrawImageParams {
  imgSrc: string;
  onLoad?: () => void;
  onError?: () => void;
  onFinal?: () => void;
}

export const useDrawImage = ({ imgSrc, onLoad, onError, onFinal }: UseDrawImageParams) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imgSrc;
    image.alt = 'target_image';
    imageRef.current = image;

    image.onload = () => {
      onLoad?.();
    };

    image.onerror = () => {
      onError?.();
    };

    onFinal?.();
  }, [imgSrc]);

  return imageRef;
};
