import { User } from '@prisma/client';

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'dateOfBirth'> & {
  dateOfBirth?: string;
  createdAt: string;
  updatedAt: string;
};
