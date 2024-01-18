'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import bcrypt from 'bcryptjs';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';

import { User } from '@prisma/client';

const formSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  confirmPassword: z.string().min(8),
});

type PasswordFormValues = z.infer<typeof formSchema>;

export const NewPasswordForm = ({
  currentUser,
}: {
  currentUser: User | null;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: PasswordFormValues) => {
    try {
      setIsLoading(true);

      const { newPassword, confirmPassword, currentPassword } = values;
      if (newPassword !== confirmPassword) {
        form.setError('confirmPassword', { message: 'Password do not match' });
        return;
      }

      // decrypt
      const originalPassword = await bcrypt.compare(
        currentPassword,
        currentUser?.password!
      );

      if (!originalPassword) {
        form.setError('currentPassword', {
          message: 'Your current password do not match your saved password',
        });
        return;
      }

      const res = await axios.patch('/api/profiles', {
        password: newPassword,
      });
      if (res.status === 200) {
        form.reset();
        toast.success('Password updated');
        router.refresh();
        return;
      }
    } catch (error: any) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading title="Password" description="Here to update your password." />
      <Separator className="my-6" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="grid grid-cols-1 gap-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>
                    Enter your current password so we know you&apos;re the legit
                    owner of this account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>
                    Make sure this matches with your new password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};
