'use client';

import { useRouter } from 'next/navigation';
import { Mail, User } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

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

export const SentItem = ({ mail }: { mail: Mail & { recipient: User } }) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-semibold">
            {mail.recipient.name}
          </CardTitle>
          <CardDescription className="text-xs font-medium">
            {mail.title}
          </CardDescription>
        </div>
        <span className="text-xs font-light p-0">
          {formatDistanceToNow(new Date(mail.createdAt), {
            includeSeconds: true,
            addSuffix: true,
          })}
        </span>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-xs text-muted-foreground truncate">{mail.content}</p>
        <Button
          className="w-full"
          onClick={() => router.push(`/mail/${mail.id}`)}
        >
          View details
        </Button>
      </CardContent>
    </Card>
  );
};

export const SentItemSkeleton = () => {
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
