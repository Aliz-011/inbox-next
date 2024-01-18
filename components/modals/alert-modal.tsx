'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const AlertModal = ({
  children,
  loading,
  onConfirm,
}: {
  children: React.ReactNode;
  onConfirm: () => void;
  loading: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = (open: boolean) => {
    if (!loading) {
      setShowModal(open);
    }
  };

  return (
    <AlertDialog onOpenChange={handleClose}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You can still restore this mail inside the trash folder.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button onClick={onConfirm} disabled={loading}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
