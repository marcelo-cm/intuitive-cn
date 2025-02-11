'use client';

import { useCallback, useState } from 'react';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface SuccessServerActionResponse<T> {
  status: 'success';
  data: T;
  router: AppRouterInstance;
}

interface ErrorServerActionResponse {
  status: 'error';
  error: {
    message: string;
  };
  router: AppRouterInstance;
}

interface SuccessConfig {
  title?: string;
  message?: string;
  action?: (response: SuccessServerActionResponse<any>) => any;
  refresh?: boolean;
  redirect?: string;
}

interface ErrorConfig {
  title?: string;
  message?: string;
  action?: (response: ErrorServerActionResponse) => any;
  refresh?: boolean;
  redirect?: string;
}

export interface UseClientServerActionProps<
  TAction extends (...args: any[]) => any,
> {
  action: TAction;
  onSuccess?: SuccessConfig;
  onError: ErrorConfig;
}

export default function useServerAction<
  TAction extends (...args: any[]) => Promise<any>,
>({ action, onSuccess, onError }: UseClientServerActionProps<TAction>) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const clientServerAction = useCallback(
    async (
      ...args: Parameters<TAction>
    ): Promise<Awaited<ReturnType<TAction>>> => {
      setLoading(true);
      try {
        console.info('action', action);
        const response = await action(...args);
        console.info('response', response);

        if (onSuccess?.message || onSuccess?.title) {
          toast.success(onSuccess.title ?? 'Success', {
            description: onSuccess?.message || 'Action completed successfully',
            closeButton: true,
          });
        }

        if (onSuccess?.action) {
          await onSuccess.action({
            status: 'success',
            data: response,
            router,
          });
        }

        if (onSuccess?.refresh) {
          router.refresh();
        }

        if (onSuccess?.redirect) {
          router.push(onSuccess.redirect);
        }

        return response;
      } catch (error: any) {
        if (error instanceof Error) {
          const errorMessage =
            error?.message ?? 'There was an error with the action';

          toast.error(onError.title ?? 'Error', {
            description: onError?.message ?? errorMessage,
            closeButton: true,
          });

          if (onError?.action) {
            await onError.action({
              status: 'error',
              error: {
                message: errorMessage,
              },
              router,
            });
          }

          if (onError?.refresh) {
            router.refresh();
          }

          if (onError?.redirect) {
            router.push(onError.redirect);
          }
        }

        throw error;
      } finally {
        setLoading(false);
      }
    },
    [action, onSuccess, router, onError],
  );

  return [clientServerAction, loading] as const;
}
