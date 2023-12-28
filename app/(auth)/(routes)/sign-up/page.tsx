'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerUser } from '@/actions/user.action';

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(5, {
    message: 'Name must be at least 5 characters.',
  }),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const SignUp = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { confirmPassword, ...rest } = values;
    if (values.password !== confirmPassword) {
      form.setError('confirmPassword', { message: 'Password do not match' });
      return;
    }

    startTransition(() => {
      registerUser({ ...rest })
        .then((data) => {
          if (data.status === 409) {
            throw new Error(data.message);
          }
          toast.success('Account created!');
          router.push('/sign-in');
        })
        .catch((error: any) => {
          toast.error(error.message);
        });
    });
  }
  return (
    <div className="w-2/3">
      <div className="flex flex-col items-center justify-center gap-y-3 mb-8">
        <h1 className="font-semibold text-2xl">Create your account</h1>
        <span className="text-muted-foreground text-sm">
          Enter your credentials below to create your account.
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="grid grid-cols-1 gap-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn@gmail.com"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*******"
                      type="password"
                      {...field}
                      disabled={isPending}
                    />
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
                    <Input
                      placeholder="*******"
                      type="password"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full flex gap-x-2"
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin h-4 w-4" />}
            Create account
          </Button>
        </form>
      </Form>
      <div className="mt-6 text-center">
        <div className="text-muted-foreground text-sm">
          Already have an account?{' '}
          <Link href="/sign-in" className="hover:underline">
            Sign in here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
