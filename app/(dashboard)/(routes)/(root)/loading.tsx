import { Skeleton } from '@/components/ui/skeleton';
import { SentListSkeleton } from './_components/sent-list';
import { CardItemSkeleton } from './_components/card-item';

const RootLoading = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-20 h-8 rounded-md" />
        <Skeleton className="w-36 h-4 rounded-md" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(3)].map((_, i) => (
          <CardItemSkeleton key={i} />
        ))}
      </div>
      <SentListSkeleton />
    </div>
  );
};

export default RootLoading;
