import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { Navbar } from '@/components/navigation/navbar';
import { Sidebar, SidebarSkeleton } from '@/components/navigation/sidebar';
import { Container } from './_components/container';

import { getCurrentUser } from '@/lib/get-current-user';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  return (
    <>
      <Navbar />
      <div className="h-full flex pt-16">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default DashboardLayout;
