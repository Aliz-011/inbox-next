'use client';

import { Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Mail, User } from '@prisma/client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { timeAgo } from '@/lib/utils';
import { Fragment } from 'react';

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
        {notifications.length > 0 ? (
          <DropdownMenuGroup>
            {notifications?.map((notification) => (
              <Fragment key={notification.id}>
                <DropdownMenuItem className="w-full">
                  <div className="w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="font-semibold text-xs truncate">
                        {notification.sender.name}
                      </div>
                      <span className="text-xs">
                        {timeAgo(notification.createdAt)}
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
