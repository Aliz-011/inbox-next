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

export const SidebarMenu = ({
  routes,
}: {
  routes: {
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
        {routes.map((route, index) =>
          collapsed ? (
            <Tooltip key={index}>
              <TooltipTrigger>
                <SidebarItem
                  key={route.label}
                  href={route.href}
                  icon={route.icon}
                  label={route.label}
                  isActive={pathname === route.href}
                />
              </TooltipTrigger>
              <TooltipContent side="right">
                <span className="ml-auto">{route.label}</span>
              </TooltipContent>
            </Tooltip>
          ) : (
            <SidebarItem
              href={route.href}
              key={route.label}
              icon={route.icon}
              label={route.label}
              isActive={pathname === route.href}
            />
          )
        )}
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
