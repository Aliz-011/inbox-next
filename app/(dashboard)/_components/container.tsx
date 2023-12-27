'use client';

import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';

export const Container = ({ children }: { children: React.ReactNode }) => {
  const matches = useMediaQuery('(max-width: 1024px)');
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand;
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn(
        'flex-1 max-w-screen-2xl',
        collapsed ? 'ml-[60px]' : 'ml-[60px] lg:ml-60'
      )}
    >
      {children}
    </div>
  );
};
