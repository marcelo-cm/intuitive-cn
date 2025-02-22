'use client';

import { useCallback, useState } from 'react';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useGlobalLoading } from '@/hooks/use-global-loading';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Represents the possible status values for a server action response
 */
export type ServerActionStatus = 'success' | 'error';

/**
 * Represents an error that occurred during a server action
 */
interface ServerActionError {
  code?: string;
  message: string;
  details?: Record<string, any>;
}

/**
 * Response type for a failed server action
 */
interface ServerActionErrorResponse {
  status: 'error';
  error: ServerActionError;
  data: null;
}

/**
 * Response type for a successful server action
 */
interface ServerActionSuccessResponse<T> {
  status: 'success';
  data: T;
  error: null;
}

/**
 * Union type for all possible server action responses
 */
export type ServerActionResponse<T> =
  | ServerActionSuccessResponse<T>
  | ServerActionErrorResponse;

/**
 * Response type when the server action is successful.
 */
type SuccessResponse<T> = {
  router: AppRouterInstance;
  response: T;
  error: null;
};

/**
 * Response type when the server action fails.
 */
type ErrorResponse = {
  router: AppRouterInstance;
  error: ServerActionError;
  data: null;
};

/**
 * Configuration for the response of a server action.
 */
interface ResponseConfig<T> {
  title: string;
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

export interface UseServerActionProps<
  TAction extends (...args: any[]) => Promise<ServerActionResponse<any>>,
> {
  /**
   * The server action to execute.
   */
  action: TAction;
  /**
   * The response configuration for a successful server action.
   */
  onSuccess?: ResponseConfig<
    SuccessResponse<Awaited<ReturnType<TAction>>['data']>
  >;
  /**
   * The response configuration for an error server action.
   */
  onError: ResponseConfig<ErrorResponse>;
  options?: {
    showToasts?: boolean;
    useGlobalLoader?: boolean;
  };
}

/**
 * @description A hook that allows you to execute a server action and handle the response.
 * @param action The server action to execute.
 * @param onSuccess The response configuration for a successful server action.
 * @param onError The response configuration for an error server action.
 * @returns A tuple containing the client server action and a boolean indicating if the action is executing.
 */
export default function useServerAction<
  TAction extends (...args: any[]) => Promise<ServerActionResponse<any>>,
>({
  action,
  onSuccess,
  onError,
  options = {
    showToasts: true,
    useGlobalLoader: true,
  },
}: UseServerActionProps<TAction>) {
  const { setLoading } = useGlobalLoading();
  const router = useRouter();
  const [executing, setExecuting] = useState<boolean>(false);

  const handleSuccessfulResponse = useCallback(
    async (response: ServerActionSuccessResponse<any>) => {
      if (options.showToasts && onSuccess) {
        toast.success(onSuccess.title ?? 'Success', {
          description: onSuccess?.message || 'Action completed successfully',
          closeButton: true,
        });
      }

      if (onSuccess?.action) {
        onSuccess.action({
          response: response.data,
          router,
          error: null,
        });
      }

      if (onSuccess?.refresh || onSuccess?.redirect) {
        if (onSuccess?.redirect) {
          router.push(onSuccess.redirect);
        } else if (onSuccess?.refresh) {
          router.refresh();
        }
      }

      return response.data;
    },
    [options.showToasts, onSuccess, router],
  );

  const handleErrorResponse = useCallback(
    async (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';

      if (options.showToasts && onError) {
        toast.error(onError.title ?? 'Error', {
          description: onError.message ?? errorMessage,
          closeButton: true,
        });
      }

      if (onError?.action) {
        await onError.action({
          error: { message: errorMessage },
          data: null,
          router,
        });
      }

      if (onError?.refresh) router.refresh();
      if (onError?.redirect) router.push(onError.redirect);
    },
    [options.showToasts, onError, router],
  );

  const clientServerAction = useCallback(
    async (
      ...args: Parameters<TAction>
    ): Promise<Awaited<ReturnType<TAction>>['data']> => {
      if (options.useGlobalLoader) {
        setLoading(true);
      }

      setExecuting(true);

      try {
        const response = await action(...args);

        if (response.status === 'error') {
          throw new Error(response.error.message);
        }

        return handleSuccessfulResponse(response);
      } catch (error: any) {
        return handleErrorResponse(error);
      } finally {
        if (options.useGlobalLoader) {
          setLoading(false);
        }
        setExecuting(false);
      }
    },
    [
      options.useGlobalLoader,
      setLoading,
      action,
      handleSuccessfulResponse,
      handleErrorResponse,
    ],
  );

  return [clientServerAction, executing] as const;
}
