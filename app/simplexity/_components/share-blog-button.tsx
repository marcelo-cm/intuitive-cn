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

const ShareBlogButton = ({ className, ...props }: ButtonProps) => {
  const pathname = usePathname();
  const { handleCopy } = useCopyToClipboard(
    `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`,
  );
  return (
    <Button
      className={cn(className)}
      variant={Variant.GHOST}
      size={Size.SM}
      icon
      onClick={() => {
        try {
          handleCopy();
          toast.success('Link copied to clipboard');
        } catch {
          toast.error('Failed to copy link');
        }
      }}
      {...props}
    >
      <LinkIcon className="stroke-muted-foreground group-hover:stroke-accent-foreground" />
    </Button>
  );
};

export default ShareBlogButton;
