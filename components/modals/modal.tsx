'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogPortal,
  DialogHeader,
} from '@/components/ui/dialog';

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onChange,
  children,
}) => {
  return (
    <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <DialogPortal>
        <DialogContent
          className="
            fixed 
            drop-shadow-md 
            border 
            top-[50%] 
            left-[50%] 
            max-h-full 
            h-full 
            md:h-auto 
            md:max-h-[85vh] 
            w-full
            md:w-auto
            md:min-w-[30vw]
            md:max-w-[750px] 
            translate-x-[-50%] 
            translate-y-[-50%] 
            rounded-md 
            p-[25px] 
            focus:outline-none
          "
        >
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
            <DialogDescription
              className=" 
              text-sm 
              leading-normal 
              text-center
            "
            >
              {description}
            </DialogDescription>
          </DialogHeader>

          <div>{children}</div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
