'use client';

import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  LayoutGrid,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
  Settings,
} from 'lucide-react';
import { useIsClient } from 'usehooks-ts';

import { Toggle, ToggleSkeleton } from './toggle';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarMenu, SidebarMenuSkeleton } from './sidebar-menu';

import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';

const mainRoutes = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutGrid,
  },
  {
    label: 'Drafts',
    href: '/drafts',
    icon: File,
  },
  {
    label: 'Inbox',
    href: '/inbox',
    icon: Inbox,
  },
  {
    label: 'Sent',
    href: '/sent',
    icon: Send,
  },
  {
    label: 'Junk',
    href: '/junk',
    icon: ArchiveX,
  },
  {
    label: 'Trash',
    href: '/trash',
    icon: Trash2,
  },
  {
    label: 'Archive',
    href: '/archive',
    icon: Archive,
  },
];

const secondaryRoutes = [
  {
    label: 'Social',
    href: '/social',
    icon: Users2,
  },
  {
    label: 'Updates',
    href: '/updates',
    icon: AlertCircle,
  },
  {
    label: 'Forums',
    href: '/forums',
    icon: MessagesSquare,
  },
  {
    label: 'Shopping',
    href: '/shopping',
    icon: ShoppingCart,
  },
  {
    label: 'Setting',
    href: '/settings/profile',
    icon: Settings,
  },
];

export const Sidebar = () => {
  const { collapsed } = useSidebar((state) => state);
  const isClient = useIsClient();

  if (!isClient) {
    return <SidebarSkeleton />;
  }

  return (
    <TooltipProvider delayDuration={50}>
      <aside
        className={cn(
          'fixed left-0 flex flex-col w-60 h-full bg-background border-r z-20',
          collapsed && 'w-[60px]'
        )}
      >
        <Toggle />
        <div className="space-y-4">
          <SidebarMenu routes={mainRoutes} />
        </div>

        <div className="space-y-4">
          <SidebarMenu routes={secondaryRoutes} />
        </div>
      </aside>
    </TooltipProvider>
  );
};

export const SidebarSkeleton = () => {
  return (
    <div className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r z-20">
      <ToggleSkeleton />
      <SidebarMenuSkeleton />
    </div>
  );
};
