'use client';

import React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { toast } from 'sonner';

interface CopyLinkButtonProps {
  // Core props
  value: string;
  children: React.ReactNode;

  // Customization props
  asChild?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onCopySuccess?: (value: string) => void;
  onCopyError?: (error: unknown) => void;

  // Toast customization
  showToast?: boolean;

  // Additional props for the root element
  className?: string;
  disabled?: boolean;
}

const CopyLinkButton = ({
  value,
  children,
  asChild = true,
  successMessage = 'Copied to clipboard',
  errorMessage = 'Failed to copy to clipboard',
  onCopySuccess,
  onCopyError,
  showToast = true,
  className,
  disabled,
  ...props
}: CopyLinkButtonProps) => {
  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (disabled) return;

    try {
      await navigator.clipboard.writeText(value);

      if (showToast) {
        toast.success(successMessage);
      }

      onCopySuccess?.(value);
    } catch (error) {
      console.error('Copy to clipboard failed:', error);

      if (showToast) {
        toast.error(errorMessage);
      }

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
