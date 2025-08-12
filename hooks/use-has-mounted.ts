import { useEffect, useRef } from 'react';

export const useHasMounted = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  return mountedRef.current;
};
