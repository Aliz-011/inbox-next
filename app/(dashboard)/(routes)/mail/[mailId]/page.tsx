import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';

import { MailForm } from './_components/mail-form';

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

  const categories = await prismadb.label.findMany();
  const categoriesAsOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className="p-6">
      <MailForm
        initialData={initialData}
        users={users}
        categories={categoriesAsOptions}
      />
    </div>
  );
};

export default MailIdPage;
