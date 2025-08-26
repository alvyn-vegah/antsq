'use client';

import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';

type CustomDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
};

export default function CustomDialog({
  open,
  onOpenChange,
  trigger,
  children,
}: CustomDialogProps) {
  // Lock scroll without adding layout shift
  React.useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {children}
    </Dialog>
  );
}
