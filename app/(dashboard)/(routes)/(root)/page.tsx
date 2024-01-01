import { Heading } from '@/components/heading';
import { SentList } from './_components/sent-list';

import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';
import { CardItem } from './_components/card-item';
import { Inbox, Send } from 'lucide-react';
import { getInboxes, getMailsSent } from '@/lib/get-overview';

export default async function Home() {
  const currentUser = await getCurrentUser();

  const sents = await prismadb.mail.findMany({
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
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
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

  const totalInbox = await getInboxes();
  const totalSents = await getMailsSent();

  return (
    <main className="p-6 space-y-8">
      <Heading
        title="Dashboard"
        description="All the activity will shown here."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardItem icon={Inbox} title="Total Inbox" total={totalInbox} />
        <CardItem icon={Send} title="Mails Sent" total={totalSents} />
      </div>
      <SentList data={sents} users={users} />
    </main>
  );
}
