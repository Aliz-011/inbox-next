import { create } from 'zustand';

interface DocumentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDocumentModal = create<DocumentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
