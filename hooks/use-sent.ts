import { create } from 'zustand';
import { Mail, MailTimeline, Timeline, User } from '@prisma/client';

interface MailWithUser extends Mail {
  recipient: User;
  timelines: (MailTimeline & { timeline: Timeline })[];
}

interface SentStore {
  isSelected: boolean;
  data?: MailWithUser;
  onSelect: (data: MailWithUser) => void;
  onUnSelect: () => void;
}

export const useSent = create<SentStore>((set) => ({
  isSelected: false,
  data: undefined,
  onSelect: (data: MailWithUser) => set({ data, isSelected: true }),
  onUnSelect: () => set({ data: undefined }),
}));
