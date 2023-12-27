'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Euro } from 'lucide-react';

export const CardItem = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Inbox</CardTitle>
        <Euro className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">45</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
};

export const CardItemSkeleton = () => {
  return (
    <div>
      <div className="flex items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-6 rounded" />
        <Skeleton className="rounded-full w-6 h-6" />
      </div>
      <div>
        <Skeleton className="h-8 w-4 rounded-md" />
        <Skeleton className="h-4 w-14 rounded-md" />
      </div>
    </div>
  );
};
