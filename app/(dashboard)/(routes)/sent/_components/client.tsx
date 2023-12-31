'use client';

import { usePathname } from 'next/navigation';
import { formatDistanceToNow, format } from 'date-fns';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/heading';

import { useInbox } from '@/hooks/use-sent';
import { cn } from '@/lib/utils';
import { Mail, User } from '@prisma/client';

export const SentClient = ({
  mails,
  currentUser,
}: {
  mails: (Mail & { recipient: User })[];
  currentUser: User | null;
}) => {
  const { data, onSelect } = useInbox((state) => state);

  return (
    <>
      <ResizablePanel defaultSize={75} minSize={35} className="p-6 space-y-4">
        <Heading
          title="Sent"
          description="The mails you sent to someone you may know."
        />
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
              </button>
            ))}
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize={30} className="pb-6">
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
          </div>
        )}
      </ResizablePanel>
    </>
  );
};
