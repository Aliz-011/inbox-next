'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const SidebarNav = () => {
  const params = useSearchParams();
  const pathname = usePathname();

  return (
    <ul className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1')}>
      <li
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          pathname === '/settings' &&
            params.get('tab') !== 'password' &&
            params.get('tab') !== 'notifications'
            ? 'bg-muted hover:bg-muted'
            : 'hover:bg-transparent hover:underline',
          'justify-start'
        )}
      >
        <Link href={`/settings`}>Profile</Link>
      </li>
      <li
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          params.get('tab') === 'password'
            ? 'bg-muted hover:bg-muted'
            : 'hover:bg-transparent hover:underline',
          'justify-start'
        )}
      >
        <Link href={`settings?tab=password`}>Password</Link>
      </li>
    </ul>
  );
};
