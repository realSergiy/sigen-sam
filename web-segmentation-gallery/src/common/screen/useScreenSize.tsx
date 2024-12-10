import { useLayoutEffect, useState } from 'react';

export default function useScreenSize(): {
  screenSize: number;
  isMobile: boolean;
} {
  const [screenSize, setScreenSize] = useState<number>(0);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  const isMobile = screenSize < 768;
  return { isMobile, screenSize };
}
