'use client';

import { toast } from 'sonner';
import { SWRConfig } from 'swr';

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        onError: (error) => {
          if (error.status !== 403 && error.status !== 404) {
            toast.error('An error occurred', {
              description: error.message,
            });
          }
        },
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        shouldRetryOnError: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}
