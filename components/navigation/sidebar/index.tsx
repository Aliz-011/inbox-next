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
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: LayoutGrid,
  },
  {
    title: 'Drafts',
    label: '',
    href: '/drafts',
    icon: File,
  },
  {
    title: 'Inbox',
    label: '2',
    href: '/inbox',
    icon: Inbox,
  },
  {
    title: 'Sent',
    label: '',
    href: '/sent',
    icon: Send,
  },
  {
    title: 'Junk',
    label: '',
    href: '/junk',
    icon: ArchiveX,
  },
  {
    title: 'Trash',
    label: '',
    href: '/trash',
    icon: Trash2,
  },
  {
    title: 'Archive',
    label: '',
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

        {/* <div className="space-y-4">
          <SidebarMenu routes={secondaryRoutes} />
        </div> */}
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
