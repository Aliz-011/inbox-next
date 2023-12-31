import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';

import { InboxClient } from './_components/client';
import { Container } from './_components/container';

const InboxPage = async () => {
  const currentUser = await getCurrentUser();

  const inboxes = await prismadb.mail.findMany({
    where: {
      recipientId: currentUser?.id,
    },
    include: {
      sender: true,
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
