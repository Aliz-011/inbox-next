'use client';

import Image from 'next/image';
import { formatDistanceToNow, format } from 'date-fns';
import { ComponentProps, useTransition } from 'react';
import { Forward, MoreVertical, Reply, ReplyAll } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/heading';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useTrashMail } from '@/hooks/use-trash-mail';
import { cn } from '@/lib/utils';
import { Label, Mail, User } from '@prisma/client';
import { deletePermanently } from '@/actions/mail.action';

export const TrashClient = ({
  mails,
  currentUser,
}: {
  mails: (Mail & { labels: Label[]; recipient: User })[];
  currentUser: User | null;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data, onSelect, onUnSelect } = useTrashMail((state) => state);

  const handleDelete = (id: string) => {
    try {
      startTransition(() => {
        deletePermanently(id).then((data) => {
          if (data.status !== 200) {
            toast.error(data.message);
            return;
          }
          toast.success(data.message);
          router.refresh();
          onUnSelect();
        });
      });
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <ResizablePanel defaultSize={75} minSize={35} className="p-6 space-y-4">
        <Heading title="Trash" description="Your deleted mails" />
        {mails.length > 0 ? (
          <ScrollArea className="h-[80vh]">
            <div className="flex flex-col gap-2">
              {mails.map((sent) => (
                <button
                  key={sent.id}
                  className={cn(
                    'flex flex-col w-full items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
                    data?.id === sent.id && 'bg-muted'
                  )}
                  onClick={() => {
                    onSelect(sent);
                  }}
                >
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">{currentUser?.name}</div>
                        {!sent.isRead && (
                          <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <div
                        className={cn(
                          'ml-auto text-xs',
                          data?.id === sent.id
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        )}
                      >
                        {formatDistanceToNow(new Date(sent.createdAt), {
                          addSuffix: true,
                          includeSeconds: true,
                        })}
                      </div>
                    </div>
                    <div className="text-xs font-medium">{sent.title}</div>
                  </div>

                  <div className="line-clamp-2 text-xs text-muted-foreground">
                    {sent.content}
                  </div>
                  {sent.labels.length > 0 ? (
                    <div className="flex items-center gap-2">
                      {sent.labels.map((item) => (
                        <Badge
                          key={item.id}
                          variant={getBadgeVariantFromLabel(item.name)}
                        >
                          {item.name}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </button>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="relative w-full flex items-center justify-center h-full">
            <Image src="/null.svg" alt="empty" height={500} width={250} />
          </div>
        )}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize={30} className="pb-6">
        <div className="flex h-full flex-col">
          {data && (
            <>
              <div className="flex items-center p-2">
                <div className="ml-auto flex items-center gap-2">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!data}>
                          <Reply className="h-4 w-4" />
                          <span className="sr-only">Reply</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Reply</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!data}>
                          <ReplyAll className="h-4 w-4" />
                          <span className="sr-only">Reply all</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Reply all</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!data}>
                          <Forward className="h-4 w-4" />
                          <span className="sr-only">Forward</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Forward</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Separator orientation="vertical" className="mx-2 h-6" />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={!data}>
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      disabled={data?.isRead}
                      onClick={() => handleDelete(data?.id!)}
                    >
                      Delete permanently
                    </DropdownMenuItem>
                    <DropdownMenuItem>Star thread</DropdownMenuItem>
                    <DropdownMenuItem>Add label</DropdownMenuItem>
                    <DropdownMenuItem>Mute thread</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Separator />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start p-4">
                  <div className="flex items-start gap-4 text-sm">
                    <Avatar>
                      <AvatarImage alt="/placeholder.jpg" />
                      <AvatarFallback className="uppercase">
                        {currentUser?.name
                          .split(' ')
                          .map((chunk) => chunk[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="font-semibold">{currentUser?.name}</div>
                      <div className="line-clamp-1 text-xs">{data.title}</div>
                      <div className="line-clamp-1 text-xs">
                        <span className="font-medium">Sent-To:</span>{' '}
                        {data?.recipient.name}
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto text-xs text-muted-foreground">
                    {format(new Date(data.createdAt), 'PPpp')}
                  </div>
                </div>

                <Separator />
                <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
                  {data.content}
                </div>
              </div>
            </>
          )}
        </div>
      </ResizablePanel>
    </>
  );
};

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>['variant'] {
  if (['work'].includes(label.toLowerCase())) {
    return 'default';
  }

  if (['personal', 'chill'].includes(label.toLowerCase())) {
    return 'outline';
  }

  return 'secondary';
}