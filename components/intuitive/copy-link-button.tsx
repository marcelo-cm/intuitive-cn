'use client';

import React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { toast } from 'sonner';

interface CopyLinkButtonProps {
  link: string;
  children: string | React.ReactNode;
}

const CopyLinkButton = ({ link, children }: CopyLinkButtonProps) => {
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(link);
      toast.success('Link copied to clipboard');
    } catch (error) {
      console.error(error);
      toast.error('Failed to copy to clipboard');
    }
  };
  return <Slot onClick={handleCopy}>{children}</Slot>;
};

export default CopyLinkButton;
