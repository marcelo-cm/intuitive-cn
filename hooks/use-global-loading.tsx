import { useEffect, useState } from 'react';

import globalLoadingService from '@/services/global-loading-service';

export function useGlobalLoading() {
  const [isLoading, setIsLoading] = useState(globalLoadingService.getState());

  useEffect(() => {
    const unsubscribe = globalLoadingService.subscribe(setIsLoading);
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isLoading,
    setLoading: globalLoadingService.setLoading.bind(globalLoadingService),
  };
}
