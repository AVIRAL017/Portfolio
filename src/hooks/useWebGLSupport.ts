import { useState, useEffect } from 'react';

export function useWebGLSupport(): boolean {
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsSupported(Boolean(gl));
    } catch {
      setIsSupported(false);
    }
  }, []);

  return isSupported;
}
