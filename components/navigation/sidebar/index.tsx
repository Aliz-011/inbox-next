'use client';

import {
  AlertCircle,
  Archive,
  Inbox,
  LayoutGrid,
  MessagesSquare,
  Send,
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
    title: 'Collab',
    label: '',
    href: '/collab',
    icon: Users2,
  },
  {
    title: 'Updates',
    label: '',
    href: '/updates',
    icon: AlertCircle,
  },
  {
    title: 'Forums',
    label: '',
    href: '/forums',
    icon: MessagesSquare,
  },
  {
    title: 'Setting',
    label: '',
    href: '/settings',
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
