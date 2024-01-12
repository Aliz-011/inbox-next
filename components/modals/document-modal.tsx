'use client';

import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/modals/modal';
import { toast } from 'sonner';

import { createDocument } from '@/actions/document.action';
import { useDocumentModal } from '@/hooks/use-document-modal';
import { DocumentSchema } from '@/lib/schemas';

export const DocumentModal = () => {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState('');
  const [isPending, startTransition] = useTransition();
  const { onClose, isOpen } = useDocumentModal((state) => state);

  const form = useForm<z.infer<typeof DocumentSchema>>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof DocumentSchema>) => {
    try {
      startTransition(() => {
        createDocument(values).then((data) => {
          if (data.error) {
            setErrMsg(data.error);
            setTimeout(() => {
              setErrMsg('');
            }, 5000);
            return;
          }
          onClose();
          toast.success(data.success);
          router.push(`/collab/${data.data?.id}`);
          router.refresh();
        });
      });
    } catch (error) {
      toast.error(errMsg);
    }
  };

  return (
    <Modal
      title="New file"
      description="What is your name called?"
      isOpen={isOpen}
      onChange={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Document title..."
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  Set the title of the document. This is required
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Create
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
