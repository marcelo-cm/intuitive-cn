import React from 'react';

import { DialogProps } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ConfirmActionDialogProps extends DialogProps {
  children: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  destructive?: boolean;
}

const ConfirmActionDialog = ({
  children,
  title,
  description,
  onConfirm,
  onCancel,
  destructive = false,
  ...props
}: ConfirmActionDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="max-w-[400px]"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter className="flex w-full !flex-col gap-2">
          <DialogClose onClick={onConfirm} asChild>
            <Button
              variant={destructive ? 'destructive' : 'default'}
              size={'sm'}
            >
              Confirm
            </Button>
          </DialogClose>
          <DialogClose onClick={onCancel} asChild>
            <Button variant={'ghost'} size={'sm'}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmActionDialog;
