'use client';

import { File, FilePlus2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useDocumentModal } from '@/hooks/use-document-modal';
import { Document } from '@prisma/client';

export const CollabClient = ({ data }: { data: Document[] }) => {
  const router = useRouter();
  const { onOpen } = useDocumentModal((state) => state);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      <div
        className="flex flex-col p-6 items-center justify-center shadow border-[1px] border-dashed rounded hover:bg-gray-100 transition cursor-pointer"
        onClick={onOpen}
      >
        <FilePlus2 size={35} className="text-muted-foreground" />
        <span className="font-semibold text-lg text-muted-foreground">
          New file
        </span>
      </div>
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col p-6 items-center justify-center shadow border-[1px] rounded hover:bg-gray-100 transition cursor-pointer"
          onClick={() => router.push(`/collab/${item.id}`)}
        >
          <File size={35} className="text-muted-foreground" />
          <span className="font-semibold text-lg text-muted-foreground line-clamp-1">
            {item.title}
          </span>
        </div>
      ))}
    </div>
  );
};
