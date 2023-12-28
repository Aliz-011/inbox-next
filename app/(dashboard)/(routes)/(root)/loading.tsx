import { Skeleton } from '@/components/ui/skeleton';
import { CardListSkeleton } from './_components/card-list';
import { InboxListSkeleton } from './_components/inbox-list';

const RootLoading = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-20 h-8 rounded-md" />
        <Skeleton className="w-36 h-4 rounded-md" />
      </div>
      <CardListSkeleton />
      <InboxListSkeleton />
    </div>
  );
};

export default RootLoading;
