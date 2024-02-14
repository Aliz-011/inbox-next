'use client';

import { useRouter } from 'next/navigation';
import { FilePlus2 } from 'lucide-react';

import { SentItem, SentItemSkeleton } from './sent-item';
import { Skeleton } from '@/components/ui/skeleton';

import { Mail, User } from '@prisma/client';

export const SentList = ({
  data,
  users,
}: {
  data: (Mail & { recipient: User })[];
  users: User[];
}) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      <div className="col-span-full md:col-span-1">
        <div
          onClick={() => router.push('/mail/new')}
          className="flex flex-col p-6 items-center justify-center shadow border-[1px] border-dashed rounded hover:bg-gray-100 transition cursor-pointer"
        >
          <FilePlus2 size={35} className="text-muted-foreground" />
          <span className="font-semibold text-lg text-muted-foreground">
            Create new mail
          </span>
        </div>
      </div>

      <div className="col-span-full md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.length > 0
          ? data.map((item) => {
              return <SentItem key={item.id} mail={item} />;
            })
          : null}
      </div>
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
