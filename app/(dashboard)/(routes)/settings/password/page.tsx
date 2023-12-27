import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { NewPasswordForm } from './_components/new-password-form';

import { getCurrentUser } from '@/lib/get-current-user';

const PasswordPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="space-y-6">
      <Heading title="Password" description="Here to update your password." />
      <Separator className="my-6" />
      <NewPasswordForm currentUser={currentUser} />
    </div>
  );
};

export default PasswordPage;
