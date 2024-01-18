'use client';

import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Modal } from '@/components/modals/modal';

import { useForwardModal } from '@/hooks/use-forward-modal';
import { useInbox } from '@/hooks/use-inbox';
import { markAsRead, updateMail } from '@/actions/mail.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  mailCode: z.string().optional(),
  recipientId: z.string().optional(),
  status: z.string(),
});

type MailFormValues = z.infer<typeof formSchema>;

export const ForwardModal = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onClose } = useForwardModal((state) => state);
  const { data } = useInbox((state) => state);

  const form = useForm<MailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data && {
      title: data.title,
      content: data.content!,
      mailCode: data.mailCode!,
      recipientId: data.recipientId,
    },
  });

  const handleForwardMessage = async (values: MailFormValues) => {
    try {
      const { status } = values;
      startTransition(() => {
        updateMail({ ...values, id: data?.id }, [], status)
          .then((data) => {
            if (data.status !== 200) {
              return toast.error('Invalid');
            }
            toast.success(data.message);
            router.refresh();
            onClose();
          })
          .then(() => {
            markAsRead(data?.id!).then(() => {
              console.log('success');
            });
          })
          .catch((e: any) => {
            console.log(e);
            toast.error('Something went wrong');
          });
      });
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Modal title="Forward" isOpen={isOpen} onChange={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleForwardMessage)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="e.g. Mail received"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The status you set will be informed to the sender.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
