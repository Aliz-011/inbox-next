import { prismadb } from '@/lib/database';
import { Container } from './_components/container';
import { getCurrentUser } from '@/lib/get-current-user';
import { SentClient } from './_components/client';

const SentPage = async () => {
  const currentUser = await getCurrentUser();

  const mailsSent = await prismadb.mail.findMany({
    where: {
      senderId: currentUser?.id,
    },
    include: {
      recipient: true,
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
