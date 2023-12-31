'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

export const Modal = ({
  actionLabel,
  onClose,
  onSubmit,
  body,
  disabled,
  footer,
  isOpen,
  secondaryAction,
  secondaryActionLabel,
  title,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full my-6 mx-auto h-full lg:h-auto md:h-auto md:w-4/6 lg:w-3/6 xl:w-2/5">
          <div
            className={cn(
              'translate duration-300 h-full',
              showModal
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0'
            )}
          >
            <div className="translate h-full md:h-auto lg:h-auto shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-center justify-center p-6 rounded-t relative border-b-[1px]">
                <button
                  className="p-1 border-0 hover:opacity-70 absolute left-9"
                  onClick={handleClose}
                >
                  <X size={18} />
                </button>
                <span className="text-lg font-semibold">{title}</span>
              </div>

              <div className="relative p-6 flex-auto">{body}</div>

              <div className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      variant="outline"
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                      className="w-full"
                    >
                      {secondaryActionLabel}
                    </Button>
                  )}
                  <Button
                    disabled={disabled}
                    onClick={handleSubmit}
                    className="w-full"
                  >
                    {actionLabel}
                  </Button>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
