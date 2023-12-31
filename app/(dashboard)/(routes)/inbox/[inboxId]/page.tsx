import { Heading } from '@/components/heading';
import { Preview } from '@/components/preview';
import { Separator } from '@/components/ui/separator';

import { prismadb } from '@/lib/database';
import { format } from 'date-fns';

const InboxIdPage = async ({ params }: { params: { inboxId: string } }) => {
  const inbox = await prismadb.mail.findUnique({
    where: {
      id: params.inboxId,
    },
    include: {
      sender: true,
    },
  });

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between">
        <Heading
          title={`Inbox from ${inbox?.sender.name}`}
          description={`${inbox?.title}`}
        />
        <span className="font-light text-sm">
          {format(new Date(inbox?.createdAt!), 'PPpp')}
        </span>
      </div>
      <Separator />
      <div className="flex-1 whitespace-pre-wrap text-sm">{inbox?.content}</div>
    </main>
  );
};

export default InboxIdPage;
