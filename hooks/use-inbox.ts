import { create } from 'zustand';
import { Mail, User } from '@prisma/client';

interface MailWithUser extends Mail {
  sender: User;
}

interface InboxStore {
  isSelected: boolean;
  data?: Mail & { sender: User };
  onSelect: (data: MailWithUser) => void;
  onUnSelect: () => void;
}

export const useInbox = create<InboxStore>((set) => ({
  isSelected: false,
  data: undefined,
  onSelect: (data: MailWithUser) => set({ data, isSelected: true }),
  onUnSelect: () => set({ isSelected: false }),
}));
