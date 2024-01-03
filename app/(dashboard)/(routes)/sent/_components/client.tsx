'use client';

import { ComponentProps, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow, format } from 'date-fns';
import { Forward, MoreVertical, Reply, ReplyAll } from 'lucide-react';
import { toast } from 'sonner';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Label, Mail, MailTimeline, Timeline, User } from '@prisma/client';
import { useSent } from '@/hooks/use-sent';
import { cn } from '@/lib/utils';
import { softDelete } from '@/actions/mail.action';

export const SentClient = ({
  mails,
  currentUser,
}: {
  mails: (Mail & {
    recipient: User;
    labels: Label[];
    timelines: (MailTimeline & { timeline: Timeline })[];
  })[];
  currentUser: User | null;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data, onSelect, onUnSelect } = useSent((state) => state);

  const handleDelete = (id: string) => {
    try {
      startTransition(() => {
        softDelete(id).then((data) => {
          if (data.status !== 200) {
            toast.error('Something went error');
            return;
          }
          toast.success('Mail Deleted');
          router.refresh();
          onUnSelect();
        });
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <ResizablePanel defaultSize={75} minSize={35} className="p-6 space-y-4">
        <Heading
          title="Sent"
          description="The mails you sent to someone you may know."
        />

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
        <Tabs defaultValue="mail">
          <div className="h-full flex flex-col">
            {/* Tabs list */}
            <div className="flex items-center p-2">
              <TabsList className="flex items-center gap-2">
                <TabsTrigger
                  value="mail"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Mail
                </TabsTrigger>
                <TabsTrigger
                  value="timeline"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Timeline
                </TabsTrigger>
              </TabsList>

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
                    Delete Mail
                  </DropdownMenuItem>
                  <DropdownMenuItem>Star thread</DropdownMenuItem>
                  <DropdownMenuItem>Add label</DropdownMenuItem>
                  <DropdownMenuItem>Mute thread</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Separator />

            {/* Tabs Content */}
            <TabsContent value="mail" className="m-0">
              {data && (
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
                  <div className="p-4 w-full">
                    {data?.attachment && (
                      <>
                        <Link
                          href={data.attachment}
                          target="_blank"
                          className="text-blue-500 hover:underline hover:text-gray-900 transition text-sm"
                        >
                          Attachment
                        </Link>
                        <Image
                          src={data.attachment}
                          alt={data.title}
                          width={400}
                          height={400}
                          className="aspect-video object-cover"
                        />
                      </>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="timeline" className="m-0">
              <div className="flex-1 bg-white rounded-lg p-6">
                <h4 className="text-xl text-gray-900 font-bold">Timeline</h4>

                <div className="relative px-4">
                  <div className="absolute h-full border border-dashed border-opacity-20 border-secondary" />
                  {data?.timelines.map((timeline) => (
                    <div
                      className="flex items-center w-full my-6 -ml-1.5"
                      key={`${timeline.mailId}${timeline.timelineId}`}
                    >
                      <div className="w-1/12 z-10">
                        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full" />
                      </div>
                      <div className="w-11/12">
                        <p className="text-sm">{timeline.timeline.status}.</p>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(timeline.createdAt), {
                            addSuffix: true,
                            includeSeconds: true,
                          })}{' '}
                          by {timeline.assignedBy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
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
