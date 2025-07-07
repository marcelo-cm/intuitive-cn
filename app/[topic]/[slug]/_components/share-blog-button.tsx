'use client';

import { LinkIcon } from 'lucide-react';

import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

import { Button, ButtonProps } from '@/components/intuitive-ui/(native)/button';
import {
  Size,
  Variant,
} from '@/components/intuitive-ui/(native)/component-enums';

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

import { cn } from '@/lib/utils';

const createShareableBlogLink = (pathname: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`;
};

const ShareBlogButton = ({ className, ...props }: ButtonProps) => {
  const pathname = usePathname();
  const { isCopied, handleCopy } = useCopyToClipboard(
    createShareableBlogLink(pathname),
  );
  return (
    <Button
      className={cn(className)}
      variant={Variant.GHOST}
      size={Size.XXS}
      icon
      onClick={() => {
        try {
          handleCopy();
          toast.success('Link copied to clipboard');
        } catch {
          toast.error('Failed to copy link');
        }
      }}
      disabled={isCopied}
      {...props}
    >
      <LinkIcon className="stroke-muted-foreground group-hover:stroke-accent-foreground" />
    </Button>
  );
};

export default ShareBlogButton;
