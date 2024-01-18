'use client';

import { User } from '@prisma/client';
import { useSearchParams, usePathname } from 'next/navigation';

import { ProfileForm } from './profile-form';
import { NewPasswordForm } from './new-password-form';

export const SettingsClient = ({
  currentUser,
}: {
  currentUser: User | null;
}) => {
  const params = useSearchParams();
  const pathname = usePathname();

  return (
    <>
      {pathname === '/settings' &&
        params.get('tab') !== 'password' &&
        params.get('tab') !== 'notifications' && (
          <ProfileForm currentUser={currentUser} />
        )}
      {params.get('tab') == 'password' && (
        <NewPasswordForm currentUser={currentUser} />
      )}
    </>
  );
};
