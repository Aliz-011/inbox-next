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
  return;
  <div className="flex flex-col gap-y-2"></div>;
};
