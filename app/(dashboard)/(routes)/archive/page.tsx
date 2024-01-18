import { Heading } from '@/components/heading';
import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';

const ArchivePage = async () => {
  const currentUser = await getCurrentUser();
  const archive = await prismadb.mail.findMany({
    where: {
      senderId: currentUser?.id,
      AND: [
        {
          isArchived: true,
        },
      ],
    },
    include: {
      recipient: true,
      labels: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className="p-6">
      <Heading
        title="Archived mail"
        description="Where your archived mails are saved"
      />
    </main>
  );
};

export default ArchivePage;
