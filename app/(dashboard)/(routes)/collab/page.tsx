import { Heading } from '@/components/heading';
import { CollabClient } from './_components/client';

import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';

const CollabPage = async () => {
  const currentUser = await getCurrentUser();
  const documents = await prismadb.document.findMany({
    where: {
      ownerId: currentUser?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className="p-6 space-y-6">
      <Heading
        title="Collaboration"
        description="Make a document and work with co-workers!"
      />

      <CollabClient data={documents} />
    </main>
  );
};

export default CollabPage;
