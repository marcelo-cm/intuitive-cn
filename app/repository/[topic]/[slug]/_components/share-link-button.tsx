'use client';

import { CheckIcon, LinkIcon, XIcon } from 'lucide-react';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';

import { ButtonProps } from '@/components/intuitive-ui/(native)/button';
import { Button } from '@/components/intuitive-ui/(native)/button';
import {
  Size,
  Variant,
} from '@/components/intuitive-ui/(native)/component-enums';

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

import { cn } from '@/lib/utils';

const createShareableBlogLink = (pathname: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`;
};

const animationVariants = {
  initial: { opacity: 0, scale: 0.5, transition: { duration: 0.1 } },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.1 } },
};

const ShareLinkButton = ({ className, ...props }: ButtonProps) => {
  const pathname = usePathname();
  const { isCopied, handleCopy, error } = useCopyToClipboard(
    createShareableBlogLink(pathname),
    {
      showToast: false,
    },
  );

  const isTriggered = isCopied || error;

  return (
    <Button
      className={cn(className)}
      variant={Variant.GHOST}
      size={Size.XXS}
      icon
      onClick={handleCopy}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isTriggered && error && (
          <motion.div
            key="error"
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-destructive-foreground"
          >
            <XIcon />
          </motion.div>
        )}
        {isTriggered && !error && (
          <motion.div
            key="copied"
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <CheckIcon />
          </motion.div>
        )}

        {!isTriggered && (
          <motion.div
            key="link"
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <LinkIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default ShareLinkButton;
