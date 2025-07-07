import { useCallback, useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

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
  options: {
    timeout?: number;
    successMessage?: string;
    errorMessage?: string;
  } = {},
) => {
  const {
    timeout = 2000,
    successMessage = 'Copied to clipboard',
    errorMessage = 'Failed to copy to clipboard',
  } = options;
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
      toast.success(successMessage ?? 'Copied to clipboard');
      setIsCopied(true);

      // Set timeout to reset copied state
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, timeout);

      return true;
    } catch (err) {
      toast.error(errorMessage ?? 'Failed to copy to clipboard');
      const error =
        err instanceof Error ? err.message : 'Failed to copy to clipboard';
      setError(error);
      setIsCopied(false);
      return false;
    }
  }, [text, timeout, successMessage, errorMessage]);

  return {
    isCopied,
    error,
    handleCopy,
  };
};
