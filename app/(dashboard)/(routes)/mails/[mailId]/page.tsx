import { prismadb } from '@/lib/database';
import { MailForm } from './_components/mail-form';
import { getCurrentUser } from '@/lib/get-current-user';

const MailIdPage = async ({ params }: { params: { mailId: string } }) => {
  const currentUser = await getCurrentUser();
  const initialData = await prismadb.mail.findUnique({
    where: {
      id: params.mailId,
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
    <div className="p-6">
      <MailForm initialData={initialData} users={users} />
    </div>
  );
};

export default MailIdPage;
