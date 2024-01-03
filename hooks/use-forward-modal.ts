import { create } from 'zustand';

interface ForwardModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useForwardModal = create<ForwardModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
