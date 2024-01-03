import { Metadata } from 'next';

import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';

import { Container } from './_components/container';
import { TrashClient } from './_components/client';

export const metadata: Metadata = {
  title: 'Trash',
  description: 'Trash management',
};

const TrashPage = async () => {
  const currentUser = await getCurrentUser();

  const trashMails = await prismadb.mail.findMany({
    where: {
      senderId: currentUser?.id,
      AND: [
        {
          isDeleted: true,
        },
      ],
    },
    include: {
      labels: true,
      recipient: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return (
    <Container>
      <TrashClient mails={trashMails} currentUser={currentUser} />
    </Container>
  );
};

export default TrashPage;
