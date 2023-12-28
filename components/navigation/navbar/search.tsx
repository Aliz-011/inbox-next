'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';
import qs from 'query-string';

import { Input } from '@/components/ui/input';

export const Search = () => {
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
    <form onSubmit={onSubmit}>
      <div className="relative">
        <button type="submit" className="absolute left-2 top-2.5 h-4 w-4">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
        </button>
        <Input
          placeholder="Search...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
    </form>
  );
};
