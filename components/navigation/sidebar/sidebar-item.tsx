'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { buttonVariants } from '@/components/ui/button';

import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';

export const SidebarItem = ({
  title,
  label,
  href,
  icon: Icon,
  isActive,
}: {
  title?: string;
  label: string;
  href: string;
  isActive: boolean;
  icon: LucideIcon;
}) => {
  const variant = isActive ? 'default' : 'ghost';
  const { collapsed } = useSidebar((state) => state);

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: variant, size: collapsed ? 'icon' : 'sm' }),
        variant === 'default' &&
          'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
        collapsed ? 'justify-center' : 'justify-start'
      )}
    >
      <Icon className={cn('h-4 w-4', collapsed ? 'mr-0' : 'mr-2')} />

      {!collapsed && (
        <span
          className={cn(
            variant === 'default' && 'text-background dark:text-white'
          )}
        >
          {label}
        </span>
      )}
    </Link>
  );
};

export const SidebarItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
