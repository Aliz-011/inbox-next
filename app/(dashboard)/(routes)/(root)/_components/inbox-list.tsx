'use client';

import { FilePlus2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { InboxItem } from './inbox-item';

export const InboxList = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      <div className="col-span-full">
        <h2 className="font-semibold text-xl">Inbox</h2>
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
      <InboxItem />
    </div>
  );
};
