'use client';

import { X, Tally2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useSidebar } from '@/hooks/use-sidebar';
import { Skeleton } from '@/components/ui/skeleton';

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
  const label = collapsed ? 'Expand' : 'Collapse';

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full justify-center items-center pt-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
                <Tally2 className="h-4 w-4 rotate-90" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-semibold">{label}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
      {!collapsed && (
        <div className="pt-3 pr-3 flex items-center w-full">
          <p className="font-semibold text-primary pl-3">For you</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onCollapse}
                className="h-auto p-2 ml-auto"
                variant="ghost"
              >
                <X className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-semibold">{label}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex justify-between w-full items-center">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};
