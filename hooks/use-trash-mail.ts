import { create } from 'zustand';
import { Mail, User } from '@prisma/client';

interface MailWithUser extends Mail {
  recipient: User;
}

interface SentStore {
  isSelected: boolean;
  data?: Mail & { recipient: User };
  onSelect: (data: MailWithUser) => void;
  onUnSelect: () => void;
}

export const useTrashMail = create<SentStore>((set) => ({
  isSelected: false,
  data: undefined,
  onSelect: (data: MailWithUser) => set({ data, isSelected: true }),
  onUnSelect: () => set({ data: undefined }),
}));
