'use client';

import { FilePlus2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SentItem, SentItemSkeleton } from './sent-item';
import { Skeleton } from '@/components/ui/skeleton';
import { Mail, User } from '@prisma/client';

export const SentList = ({
  mails,
}: {
  mails: (Mail & { recipient: User })[];
}) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      <div className="col-span-full">
        <h2 className="font-semibold text-xl">Sent</h2>
      </div>
      <div
        onClick={() => router.push('/mails/new')}
        className="flex flex-col p-6 items-center justify-center shadow border-[1px] border-dashed rounded hover:bg-gray-100 transition cursor-pointer"
      >
        <FilePlus2 size={35} className="text-muted-foreground" />
        <span className="font-semibold text-lg text-muted-foreground">
          Create new mail
        </span>
      </div>
      {mails.length > 0
        ? mails.map((mail) => <SentItem key={mail.id} mail={mail} />)
        : null}
    </div>
  );
};

export const SentListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      <div className="col-span-full">
        <Skeleton className="h-8 w-20" />
      </div>
      {[...Array(3)].map((_, i) => (
        <SentItemSkeleton key={i} />
      ))}
    </div>
  );
};
