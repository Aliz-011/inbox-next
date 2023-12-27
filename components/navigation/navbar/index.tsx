import Link from 'next/link';

import { Actions } from './actions';
import { getCurrentUser } from '@/lib/get-current-user';
import { Framer } from 'lucide-react';

export const Navbar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <header>
      <nav className="fixed top-0 w-full h-16 z-[49] px-2 lg:p-4 flex justify-between items-center border-b">
        <Link href="/" className="flex items-center gap-x-2">
          <Framer size={25} />
          <span className="font-semibold hidden sm:inline">Schubert</span>
        </Link>

        <Actions currentUser={currentUser} />
      </nav>
    </header>
  );
};
