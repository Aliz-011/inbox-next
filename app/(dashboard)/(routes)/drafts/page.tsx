import { Metadata } from 'next';

import { Heading } from '@/components/heading';

import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';

export const metadata: Metadata = {
  title: 'Drafts',
  description: 'Drafts page',
};

const DraftsPage = async () => {
  const currentUser = await getCurrentUser();

  const drafts = await prismadb.mail.findMany({
    where: {
      senderId: currentUser?.id,
      AND: [
        {
          isDrafted: true,
        },
      ],
    },
    include: {
      recipient: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return (
    <main className="p-6">
      <Heading
        title="Drafted mails"
        description="Your drafted mails saved here."
      />
    </main>
  );
};

export default DraftsPage;
