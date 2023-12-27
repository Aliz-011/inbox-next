'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import qs from 'query-string';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import { SafeUser } from '@/types';

export const Actions = ({ currentUser }: { currentUser: SafeUser | null }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery) return;

    const url = qs.stringifyUrl(
      {
        url: '/search',
        query: {
          q: searchQuery,
        },
      },
      { skipEmptyString: true }
    );

    router.push(url);
    setSearchQuery('');
  };

  return (
    <div className="flex items-center gap-x-4">
      <form
        onSubmit={onSubmit}
        className="group rounded-md flex items-center gap-x-2 w-full bg-zinc-100 hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition"
      >
        <Input
          placeholder="Search...."
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-[100px] lg:w-[300px] border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        />
        <button type="submit" className="rounded-l-none rounded-sm pr-3">
          <SearchIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        </button>
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={currentUser?.photoUrl || '/placeholder.jpg'}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push('/settings/profile')}
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
