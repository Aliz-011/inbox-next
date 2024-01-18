import { getCurrentUser } from '@/lib/get-current-user';
import { SettingsClient } from './_components/client';

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="space-y-6">
      <SettingsClient currentUser={currentUser} />
    </div>
  );
};

export default ProfilePage;
