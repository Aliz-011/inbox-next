import { Mail, User } from '@prisma/client';

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'dateOfBirth'> & {
  dateOfBirth?: string;
  createdAt: string;
  updatedAt: string;
};

export type SafeMail = Omit<Mail, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};
