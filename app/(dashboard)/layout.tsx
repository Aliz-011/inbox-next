import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { Navbar } from '@/components/navigation/navbar';
import { Sidebar, SidebarSkeleton } from '@/components/navigation/sidebar';
import { Container } from './_components/container';

import { getCurrentUser } from '@/lib/get-current-user';
import { ThemeProvider } from '@/components/providers/theme-provider';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        <div className="h-full flex pt-16">
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar />
          </Suspense>
          <Container>{children}</Container>
        </div>
      </ThemeProvider>
    </>
  );
};

export default DashboardLayout;
