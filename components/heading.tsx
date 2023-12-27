import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

export const Heading = ({
  title,
  description,
  center,
}: {
  title: string;
  description?: string;
  center?: boolean;
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-y-2',
        center && 'items-center justify-center'
      )}
    >
      <h1 className="font-semibold text-2xl">{title}</h1>
      <span className="text-muted-foreground text-sm">{description}</span>
    </div>
  );
};

export const HeadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <Skeleton className="h-6 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
};
