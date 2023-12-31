import { redirect } from 'next/navigation';
import { getCurrentUser } from './get-current-user';
import { prismadb } from './database';

export const getInboxes = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  const inboxes = await prismadb.mail.count({
    where: {
      recipientId: currentUser.id,
    },
  });

  return inboxes;
};

export const getMailsSent = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  const sents = await prismadb.mail.count({
    where: {
      senderId: currentUser?.id,
    },
  });

  return sents;
};
