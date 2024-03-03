import { useEffect, useRef } from 'react';

interface UseDrawImageParams {
  imgSrc: string;
  onLoad?: () => void;
  onError?: () => void;
  onFinal?: () => void;
}

export const useDrawImage = ({
  imgSrc,
  onLoad,
  onError,
  onFinal,
}: UseDrawImageParams): React.MutableRefObject<HTMLImageElement | null> => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSrc]);

  return imageRef;
};
