'use client';

import { useIsClient } from 'usehooks-ts';

import { ForwardModal } from '@/components/modals/forward-modal';
import { DocumentModal } from '@/components/modals/document-modal';

export const ModalProvider = () => {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <>
      <ForwardModal />
      <DocumentModal />
    </>
  );
};
