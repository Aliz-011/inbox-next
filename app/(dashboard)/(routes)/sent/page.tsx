import { Metadata } from 'next';

import { Container } from './_components/container';
import { SentClient } from './_components/client';

import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';

export const metadata: Metadata = {
  title: 'Sent mailbox',
  description:
    'Sent mailbox. This is a sent mailbox that contains information about your sent mail',
};

const SentPage = async () => {
  const currentUser = await getCurrentUser();

  const mailsSent = await prismadb.mail.findMany({
    where: {
      senderId: currentUser?.id,
      AND: [
        {
          isDeleted: false,
        },
      ],
    },
    include: {
      recipient: true,
      labels: true,
      timelines: {
        include: {
          timeline: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <Container>
      <SentClient currentUser={currentUser} mails={mailsSent} />
    </Container>
  );
};

export default SentPage;
