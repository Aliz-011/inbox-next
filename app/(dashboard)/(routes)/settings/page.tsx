import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './_components/profile-form';
import { getCurrentUser } from '@/lib/get-current-user';

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="space-y-6">
      <Heading
        title="Profile"
        description="This is how others will see you on the site."
      />
      <Separator className="my-6" />
      <ProfileForm currentUser={currentUser} />
    </div>
  );
};

export default ProfilePage;
