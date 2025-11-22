import { useEffect, useState } from 'react';

export const useAppReady = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return isReady;
};
