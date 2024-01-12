'use client';

import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { Bell } from 'lucide-react';
import { Mail, User } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Notification = ({
  notifications,
}: {
  notifications: (Mail & { sender: User })[];
}) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <div className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {notifications?.length > 0 && (
            <div className="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium leading-none">
              {notifications.length > 0
                ? `New messages (${notifications.length})`
                : 'Messages'}
            </p>
            <button className="text-xs leading-none text-muted-foreground">
              Clear all
            </button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          <DropdownMenuGroup>
            {notifications?.map((notification) => (
              <Fragment key={notification.id}>
                <DropdownMenuItem
                  className="w-full cursor-pointer"
                  onClick={() => router.push(`/inbox/${notification.id}`)}
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="font-semibold text-xs truncate">
                        {notification.sender.name}
                      </div>
                      <span className="text-xs">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <div className="w-full">
                      <span className="text-xs truncate">
                        {notification.title}
                      </span>
                    </div>
                  </div>
                </DropdownMenuItem>
              </Fragment>
            ))}
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuItem>Nothings here</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
