'use client';

import React from 'react';

import { Slot } from '@radix-ui/react-slot';

interface CopyLinkButtonProps {
  // Core props
  value: string | number | boolean | undefined | null | readonly string[];
  children: React.ReactNode;

  // Customization props
  asChild?: boolean;
  onCopySuccess?: (
    value: string | number | boolean | undefined | null | readonly string[],
  ) => void;
  onCopyError?: (error: unknown | Error) => void;

  // Additional props for the root element
  className?: string;
  disabled?: boolean;
}

const CopyLinkButton = ({
  value,
  children,
  asChild = true,
  onCopySuccess,
  onCopyError,
  className,
  disabled,
  ...props
}: CopyLinkButtonProps) => {
  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (disabled) return;

    try {
      await navigator.clipboard.writeText(String(value));

      onCopySuccess?.(value);
    } catch (error) {
      console.error('Copy to clipboard failed:', error);

      onCopyError?.(error);
    }
  };

  const Component = asChild ? Slot : 'button';

  return (
    <Component
      onClick={handleCopy}
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
};

export default CopyLinkButton;
