'use client';

import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

import { SidebarItem, SidebarItemSkeleton } from './sidebar-item';

import { useSidebar } from '@/hooks/use-sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const SidebarMenu = ({
  routes,
}: {
  routes: {
    title: string;
    label: string;
    href: string;
    icon: LucideIcon;
  }[];
}) => {
  const pathname = usePathname();
  const { collapsed } = useSidebar((state) => state);

  return (
    <div data-collapsed={collapsed} className="group flex flex-col gap-2 py-2">
      <ul className="grid gap-1 px-2">
        {routes.map((route, index) => {
          const isActive = pathname === route.href;
          const variant = isActive ? 'default' : 'ghost';

          return collapsed ? (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  href={route.href}
                  className={cn(
                    buttonVariants({ variant: variant, size: 'icon' }),
                    variant === 'default' &&
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                    'h-9 w-9 ml-1'
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  <div className="sr-only">{route.title}</div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {route.title}
                <span className="ml-auto text-muted-foreground">
                  {route.label}
                </span>
              </TooltipContent>
            </Tooltip>
          ) : (
            <SidebarItem
              href={route.href}
              key={index}
              title={route.title}
              icon={route.icon}
              label={route.label}
              isActive={pathname === route.href}
            />
          );
        })}
      </ul>
    </div>
  );
};

export const SidebarMenuSkeleton = () => {
  return (
    <div className="group flex flex-col gap-4 py-2">
      <ul className="grid gap-1 px-2">
        {[...Array(6)].map((_, index) => (
          <SidebarItemSkeleton key={index} />
        ))}
      </ul>
    </div>
  );
};
