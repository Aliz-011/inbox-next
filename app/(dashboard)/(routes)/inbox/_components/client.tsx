'use client';

import { usePathname, useRouter } from 'next/navigation';
import { formatDistanceToNow, format } from 'date-fns';
import { Forward, MoreVertical, Reply, ReplyAll } from 'lucide-react';
import { toast } from 'sonner';
import { useTransition } from 'react';

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

import { useInbox } from '@/hooks/use-inbox';
import { cn } from '@/lib/utils';
import { Mail, User } from '@prisma/client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { markAsRead } from '@/actions/mail.action';

export const InboxClient = ({
  inboxes,
  currentUser,
}: {
  inboxes: (Mail & { sender: User })[];
  currentUser: User | null;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data, onSelect } = useInbox((state) => state);

  const onClickMarkAsRead = (id: string) => {
    try {
      startTransition(() => {
        markAsRead(id)
          .then((data) => {
            if (data.status !== 200) {
              return;
            }
            toast.success('Message is readed');
            router.refresh();
          })
          .catch((err: any) => {
            throw new Error(err.message);
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
        <Heading
          title="Inbox"
          description="All the mails from someone you may know."
        />
        <ScrollArea className="h-[80vh]">
          <div className="flex flex-col gap-2">
            {inboxes.map((inbox) => (
              <button
                key={inbox.id}
                className={cn(
                  'flex flex-col w-full items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
                  data?.id === inbox.id && 'bg-muted'
                )}
                onClick={() => {
                  onSelect(inbox);
                }}
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{inbox.sender.name}</div>
                      {!inbox.isRead && (
                        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <div
                      className={cn(
                        'ml-auto text-xs',
                        data?.id === inbox.id
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {formatDistanceToNow(new Date(inbox.createdAt), {
                        addSuffix: true,
                        includeSeconds: true,
                      })}
                    </div>
                  </div>
                  <div className="text-xs font-medium">{inbox.title}</div>
                </div>

                <div className="line-clamp-2 text-xs text-muted-foreground">
                  {inbox.content}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize={30} className="pb-6">
        <div className="flex h-full flex-col">
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
                  onClick={() => onClickMarkAsRead(data?.id!)}
                >
                  Mark as unread
                </DropdownMenuItem>
                <DropdownMenuItem>Star thread</DropdownMenuItem>
                <DropdownMenuItem>Add label</DropdownMenuItem>
                <DropdownMenuItem>Mute thread</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Separator />

          {data && (
            <div className="flex flex-1 flex-col">
              <div className="flex items-start p-4">
                <div className="flex items-start gap-4 text-sm">
                  <Avatar>
                    <AvatarImage alt="/placeholder.jpg" />
                    <AvatarFallback className="uppercase">
                      {data.sender.name
                        .split(' ')
                        .map((chunk) => chunk[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-semibold">{data?.sender.name}</div>
                    <div className="line-clamp-1 text-xs">{data.title}</div>
                    <div className="line-clamp-1 text-xs">
                      <span className="font-medium">Reply-To:</span>{' '}
                      {currentUser?.email}
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
          )}
        </div>
      </ResizablePanel>
    </>
  );
};
