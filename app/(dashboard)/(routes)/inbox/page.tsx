import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';

import { InboxClient } from './_components/client';
import { Container } from './_components/container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inbox',
  description: 'Inbox page. inbox.',
};

const InboxPage = async () => {
  const currentUser = await getCurrentUser();

  const inboxes = await prismadb.mail.findMany({
    where: {
      recipientId: currentUser?.id,
      AND: [
        {
          isDeleted: false,
        },
      ],
    },
    include: {
      sender: true,
      labels: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <Container>
      <InboxClient inboxes={inboxes} currentUser={currentUser} />
    </Container>
  );
};

export default InboxPage;
