import { getServerSession } from 'next-auth';

import { prismadb } from '@/lib/database';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return redirect('/sign-in');
    }

    const currentUser = await prismadb.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return redirect('/sign-in');
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      dateOfBirth: currentUser.dateOfBirth?.toISOString(),
    };
  } catch (error) {
    return null;
  }
};
