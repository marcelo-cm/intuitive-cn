'use client';

import { useCallback, useState } from 'react';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useGlobalLoading } from './use-global-loading';

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ServerActionResponse<T> {
  status: 'success' | 'error';
  data: T;
  error?: {
    code?: string;
    message: string;
    details?: Record<string, any>;
  };
}

/**
 * A successful server action response. This requires the server action to return a response with a status of 'success'.
 */
interface SuccessResponse<T> {
  status: 'success';
  data: T;
  router: AppRouterInstance;
}

/**
 * An error server action response. This requires the server action to return a response with a status of 'error'.
 */
interface ErrorResponse {
  status: 'error';
  error: {
    code?: string;
    message: string;
    details?: Record<string, any>;
  };
  router: AppRouterInstance;
}

interface ResponseConfig<T> {
  title?: string;
  message?: string;
  /**
   * The action to execute after the action is executed.
   */
  action?: (response: T) => any;
  /**
   * Whether to refresh the page after the action is executed.
   */
  refresh?: boolean;
  /**
   * The redirect URL after the action is executed.
   */
  redirect?: string;
}

export interface UseServerActionProps<TAction extends (...args: any[]) => any> {
  /**
   * The server action to execute.
   */
  action: TAction;
  /**
   * The response configuration for a successful server action.
   */
  onSuccess?: ResponseConfig<SuccessResponse<Awaited<ReturnType<TAction>>>>;
  /**
   * The response configuration for an error server action.
   */
  onError: ResponseConfig<ErrorResponse>;
  options?: undefined;
}

/**
 * @description A hook that allows you to execute a server action and handle the response.
 * @param action The server action to execute.
 * @param onSuccess The response configuration for a successful server action.
 * @param onError The response configuration for an error server action.
 * @returns A tuple containing the client server action and a boolean indicating if the action is executing.
 */
export default function useServerAction<
  TAction extends (...args: any[]) => Promise<any>,
>({ action, onSuccess, onError }: UseServerActionProps<TAction>) {
  const { setLoading } = useGlobalLoading();
  const router = useRouter();
  const [executing, setExecuting] = useState<boolean>(false);

  const clientServerAction = useCallback(
    async (
      ...args: Parameters<TAction>
    ): Promise<Awaited<ReturnType<TAction>>> => {
      setExecuting(true);
      setLoading(true);

      try {
        const response = await action(...args);

        if (response.status === 'error') {
          throw new Error(response.error.message);
        }

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

        if (onSuccess?.refresh || onSuccess?.redirect) {
          if (onSuccess?.redirect) {
            router.push(onSuccess.redirect);
          } else if (onSuccess?.refresh) {
            router.refresh();
          }
        }

        return response;
      } catch (error: any) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred';

        if (onError) {
          toast.error(onError.title ?? 'Error', {
            description: onError.message ?? errorMessage,
            closeButton: true,
          });

          await onError.action?.({
            status: 'error',
            error: { message: errorMessage },
            router,
          });
        }

        if (onError?.refresh) router.refresh();
        if (onError?.redirect) router.push(onError.redirect);

        throw error;
      } finally {
        setLoading(false);
        setExecuting(false);
      }
    },
    [action, onSuccess, router, onError, setLoading],
  );

  return [clientServerAction, executing] as const;
}
