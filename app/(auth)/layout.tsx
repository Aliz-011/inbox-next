import { getCurrentUser } from '@/lib/get-current-user';
import { Framer } from 'lucide-react';
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (user) {
    return redirect('/');
  }

  return (
    <main className="h-full w-full px-4 md:px-0">
      <div className="flex items-center justify-center h-full max-w-screen-2xl mx-auto">
        <div className="hidden lg:flex lg:flex-col items-center justify-center lg:w-1/2 h-full bg-blue-600 text-white">
          <div className="flex items-center gap-x-2">
            <Framer size={30} />
            <span className="text-xl font-medium">Schubert</span>
          </div>
        </div>
        <div className="w-full sm:w-2/3 lg:w-1/2 flex items-center justify-center h-full">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
