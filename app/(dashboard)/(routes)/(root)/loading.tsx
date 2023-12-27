import { Skeleton } from '@/components/ui/skeleton';
import { CardListSkeleton } from './_components/card-list';

const RootLoading = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-12 h-10 rounded-md" />
        <Skeleton className="w-24 h-4 rounded-md" />
      </div>
      <CardListSkeleton />
    </div>
  );
};

export default RootLoading;
