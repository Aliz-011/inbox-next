'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const InboxItem = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-semibold">Dini Abshari</CardTitle>
          <CardDescription>Meeting tomorrow</CardDescription>
        </div>
        <span className="text-xs font-light">2 months ago</span>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-xs text-muted-foreground truncate">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab excepturi
          ea quaerat id quam, harum quidem accusantium. Illum, fuga doloribus?
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View details</Button>
      </CardFooter>
    </Card>
  );
};

export const InboxItemSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
        <div className="space-y-2">
          <Skeleton className="w-12 h-5" />
          <Skeleton className="w-20 h-4" />
        </div>
        <Skeleton className="w-16 h-4" />
      </CardHeader>
      <CardContent className="space-y-1 mt-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </CardContent>
      <CardFooter>
        <Skeleton className="w-full h-6" />
      </CardFooter>
    </Card>
  );
};
