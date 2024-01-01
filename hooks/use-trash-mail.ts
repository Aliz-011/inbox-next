import { create } from 'zustand';
import { Mail, User } from '@prisma/client';

interface TrashMailWithUser extends Mail {
  recipient: User;
}

interface SentStore {
  isSelected: boolean;
  data?: Mail & { recipient: User };
  onSelect: (data: TrashMailWithUser) => void;
  onUnSelect: () => void;
}

export const useTrashMail = create<SentStore>((set) => ({
  isSelected: false,
  data: undefined,
  onSelect: (data: TrashMailWithUser) => set({ data, isSelected: true }),
  onUnSelect: () => set({ isSelected: false }),
}));
