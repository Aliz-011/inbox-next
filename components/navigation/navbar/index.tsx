import Link from 'next/link';
import { Framer } from 'lucide-react';

import { Actions } from './actions';

import { getCurrentUser } from '@/lib/get-current-user';
import { prismadb } from '@/lib/database';

export const Navbar = async () => {
  const currentUser = await getCurrentUser();
  const notifications = await prismadb.mail.findMany({
    where: {
      recipientId: currentUser?.id,
      AND: [
        {
          isRead: false,
        },
      ],
    },
    include: {
      sender: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <nav className="fixed top-0 w-full h-16 z-[49] px-2 lg:p-4 flex justify-between items-center border-b bg-white">
      <Link href="/" className="flex items-center gap-x-2">
        <Framer size={25} />
        <span className="font-semibold hidden sm:inline">Schubert</span>
      </Link>

      <Actions currentUser={currentUser} data={notifications} />
    </nav>
  );
};
