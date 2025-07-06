import React from 'react';

import { Button, ButtonProps } from '@/components/ui/button';
import {
  DialogContent,
  Dialog as DialogPrimitive,
  DialogTrigger,
} from '@/components/ui/dialog';

export interface DialogProps extends ButtonProps {
  trigger: React.ReactNode | string;
  children: React.ReactNode;
  dialogProps?: React.ComponentProps<typeof DialogPrimitive>;
  dialogClassName?: string;
}

const Dialog = ({
  trigger,
  children,
  dialogClassName,
  dialogProps,
  ...buttonProps
}: DialogProps) => {
  return (
    <DialogPrimitive {...dialogProps}>
      <DialogTrigger asChild>
        {typeof trigger === 'string' ? (
          <Button {...buttonProps}>{trigger}</Button>
        ) : (
          trigger
        )}
      </DialogTrigger>
      <DialogContent className={dialogClassName}>{children}</DialogContent>
    </DialogPrimitive>
  );
};

export default Dialog;
