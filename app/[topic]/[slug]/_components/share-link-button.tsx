'use client';

import { CheckIcon, LinkIcon } from 'lucide-react';

import { usePathname } from 'next/navigation';

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

const ShareLinkButton = ({ className, ...props }: ButtonProps) => {
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
      onClick={handleCopy}
      {...props}
    >
      {isCopied ? <CheckIcon /> : <LinkIcon />}
    </Button>
  );
};

export default ShareLinkButton;
