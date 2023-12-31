import { Heading } from '@/components/heading';
import { CardList } from './_components/card-list';
import { SentList } from './_components/sent-list';

import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';

export default async function Home() {
  const currentUser = await getCurrentUser();
  const sents = await prismadb.mail.findMany({
    where: {
      senderId: currentUser?.id,
    },
    include: {
      recipient: true,
    },
  });

  const users = await prismadb.user.findMany({
    where: {
      NOT: [
        {
          id: currentUser?.id,
        },
      ],
    },
  });

  return (
    <main className="p-6 space-y-8">
      <Heading
        title="Dashboard"
        description="All the activity will shown here."
      />

      <CardList />
      <SentList data={sents} users={users} />
    </main>
  );
}
