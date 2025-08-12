import { useCallback, useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

interface IUseCopyToClipboardOptions {
  timeout?: number;
  successMessage?: string;
  errorMessage?: string;
  persistError?: boolean;
  showToast?: boolean;
}

/**
 * A hook to copy text to the clipboard. When the text is copied, the state is set to true for the timeout period.
 * If the text is copied again before the timeout, the timeout is reset.
 *
 * @param text - The text to copy to the clipboard.
 * @param timeout - The timeout in milliseconds to reset the copied state.
 * @param successMessage - The message to display when the text is copied.
 * @param errorMessage - The message to display when the text fails to copy.
 */
export const useCopyToClipboard = (
  text: string,
  options: IUseCopyToClipboardOptions = {},
) => {
  const {
    timeout = 2000,
    successMessage = 'Copied to clipboard',
    errorMessage = 'Failed to copy to clipboard',
    persistError = false,
    showToast = true,
  } = options;

  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setError(null);

    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not supported');
      }

      await navigator.clipboard.writeText(text);
      if (showToast) {
        toast.success(successMessage ?? 'Copied to clipboard');
      }
      setIsCopied(true);

      /**
       * Set timeout to reset copied state
       */
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, timeout);

      return true;
    } catch (err) {
      if (showToast) {
        toast.error(errorMessage ?? 'Failed to copy to clipboard');
      }
      const error =
        err instanceof Error ? err.message : 'Failed to copy to clipboard';
      setError(error);
      setIsCopied(false);

      if (!persistError) {
        timeoutRef.current = setTimeout(() => {
          setError(null);
        }, timeout);
      }

      return false;
    }
  }, [text, timeout, successMessage, errorMessage, persistError, showToast]);

  const reset = useCallback(() => {
    setIsCopied(false);
    setError(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  /**
   * useEffects should be at the top of the file, but given that we use const notation
   * for our functions, the functions must be defined before the useEffect consumes it.
   */
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return {
    isCopied,
    error,
    handleCopy,
    reset,
  };
};
