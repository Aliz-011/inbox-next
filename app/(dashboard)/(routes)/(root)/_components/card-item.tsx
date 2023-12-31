import { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const CardItem = ({
  title,
  description,
  total,
  icon: Icon,
}: {
  title: string;
  description?: string;
  total: string | number;
  icon: LucideIcon;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export const CardItemSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between space-y-0">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="rounded-md w-6 h-6" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2 mt-2">
        <Skeleton className="h-6 w-12 rounded-md" />
        <Skeleton className="h-4 w-20 rounded-md" />
      </CardContent>
    </Card>
  );
};
