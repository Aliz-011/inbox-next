'use client';

import { ResizablePanelGroup } from '@/components/ui/resizable';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResizablePanelGroup direction="horizontal">{children}</ResizablePanelGroup>
  );
};
