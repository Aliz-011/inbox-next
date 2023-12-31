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

export const useInbox = create<SentStore>((set) => ({
  isSelected: false,
  data: undefined,
  onSelect: (data: MailWithUser) => set({ data, isSelected: true }),
  onUnSelect: () => set({ isSelected: false }),
}));
