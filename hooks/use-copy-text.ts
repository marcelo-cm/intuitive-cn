import { useState } from 'react';

export const useCopyText = (text: string, timeout = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, timeout);
  };

  return {
    isCopied,
    handleCopy,
  };
};
