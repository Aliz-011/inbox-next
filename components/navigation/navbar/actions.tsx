'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search } from './search';
import { Notification } from './notification';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

import { Mail, User } from '@prisma/client';

export const Actions = ({
  currentUser,
  data,
}: {
  currentUser: User | null;
  data: (Mail & { sender: User })[];
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-x-4">
      <Search />
      <ModeToggle />

      <Notification notifications={data} />

      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full relative">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={currentUser?.photoUrl || '/placeholder.jpg'}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {currentUser?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {currentUser?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push('/settings')}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
