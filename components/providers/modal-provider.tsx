'use client';

import { useIsClient } from 'usehooks-ts';
import { SearchModal } from '../modals/search-modal';

export const ModalProvider = () => {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <>
      <SearchModal />
    </>
  );
};
