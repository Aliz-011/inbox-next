'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ChevronDown, FileType2, Link2, Loader2 } from 'lucide-react';
import { CaretSortIcon, CheckIcon, TrashIcon } from '@radix-ui/react-icons';
import { Mail, User } from '@prisma/client';
import { toast } from 'sonner';
import Select from 'react-select';
import { useIsClient } from 'usehooks-ts';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Editor } from '@/components/editor';

import { createMail, softDelete, updateMail } from '@/actions/mail.action';
import { cn } from '@/lib/utils';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from '@/components/image-uploader/single-image-dropzone';
import { Label } from '@/components/ui/label';
import { AlertModal } from '@/components/modals/alert-modal';

const formSchema = z.object({
  title: z.string().min(5),
  content: z.string().optional(),
  mailCode: z.string(),
  recipientId: z.string(),
});

type MailFormValues = z.infer<typeof formSchema>;

interface Option {
  label: string;
  value: string;
}

export const MailForm = ({
  initialData,
  users,
  categories,
}: {
  initialData: Mail | null;
  users: User[];
  categories: Option[];
}) => {
  const router = useRouter();
  const params = useParams();
  const [formModified, setFormModified] = useState(false);
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState('');
  const [selectedLabels, setSelectedLabels] = useState<Option[]>([]);
  const { edgestore } = useEdgeStore();
  const [isPending, startTransition] = useTransition();
  const isClient = useIsClient();

  const usersCombobox = users.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  const action = initialData ? 'Save changes' : 'Create';
  const toastMessage = initialData ? 'Mail updated' : 'Mail created';

  const form = useForm<MailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          content: initialData.content!,
          mailCode: initialData.mailCode!,
        }
      : {
          title: '',
          content: '',
          mailCode: '',
        },
  });

  async function onSubmit(values: MailFormValues) {
    try {
      if (file) {
        const res = await edgestore.publicImages.upload({ file });
        setUrl(res.url);
      }

      if (!initialData) {
        startTransition(() => {
          createMail({ ...values, attachment: url }, selectedLabels)
            .then((data) => {
              if (data.status !== 201) {
                return toast.error('Something went error');
              }
              toast.success(toastMessage);
              router.refresh();
              router.push('/');
            })
            .catch((e: any) => {
              console.log(e);
            });
        });
      } else {
        startTransition(() => {
          updateMail({ ...values, id: `${params.mailId}` }, selectedLabels)
            .then((data) => {
              if (!data) {
                toast.error('Something went error');
                return;
              }
              toast.success(toastMessage);
              router.refresh();
              router.push('/');
            })
            .catch((e: any) => {
              console.log(e);
            });
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (formModified) {
        const confirmationMessage =
          'You have unsaved changes. Are you sure you want to leave?';
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [formModified]);

  const handleDelete = () => {
    try {
      startTransition(() => {
        softDelete(params.mailId as string).then((data) => {
          if (data.status !== 200) {
            toast.error('Something went error');
            return;
          }
          toast.success('Mail Deleted');
          router.refresh();
          router.push('/');
        });
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {initialData?.title || 'Untitled'}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <FileType2 className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              Inbox
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0 items-center">
          {initialData && (
            <AlertModal onConfirm={handleDelete} loading={isPending}>
              <span className="hidden sm:block">
                <Button type="button" variant="destructive">
                  <TrashIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Delete
                </Button>
              </span>
            </AlertModal>
          )}

          <span className="ml-3 hidden sm:block">
            <Button type="button" variant="outline">
              <Link2
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              View
            </Button>
          </span>

          <div className="relative ml-3 sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                More
                <ChevronDown className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Subject <sup className="text-red-500">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Subject..."
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mailCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Mail Code <sup className="text-red-500">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. SK0-xxx"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row md:items-center mdjustify-between gap-4">
            <div className="w-full md:w-2/3">
              <Label>
                Labels <sup className="text-red-500">*</sup>
              </Label>
              <Select
                isMulti
                isSearchable
                name="labels"
                options={categories}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selected, actionMeta) => {
                  const selectedValues = selected.map(
                    (item) =>
                      ({
                        value: item.value,
                        label: item.label,
                      } as Option)
                  );
                  setSelectedLabels(selectedValues);
                }}
              />
            </div>
            <FormField
              control={form.control}
              name="recipientId"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-0 md:mt-2 w-full md:w-1/3">
                  <FormLabel>
                    Mail to <sup className="text-red-500">*</sup>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? usersCombobox.find(
                                (user) => user.value === field.value
                              )?.label
                            : 'Select user'}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search user..."
                          className="h-9"
                        />
                        <CommandEmpty>No user found.</CommandEmpty>
                        <CommandGroup>
                          {usersCombobox.map((user) => (
                            <CommandItem
                              value={user.label}
                              key={user.value}
                              onSelect={() => {
                                form.setValue('recipientId', user.value);
                              }}
                            >
                              {user.label}
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  user.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    placeholder="The purpose of this mail"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations to
                  link to them.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <Editor
                  {...field}
                  content={field.value!}
                  onChange={field.onChange}
                />
                <FormDescription>
                  You can <span>@mention</span> other users and organizations to
                  link to them.
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="grid gap-2">
            <Label>Attachment</Label>
            <SingleImageDropzone
              width={400}
              height={350}
              value={file}
              onChange={(file) => {
                setFile(file);
              }}
              disabled={isPending}
            />
            <FormDescription>
              You do not have to provide an attachment, it is optional and you
              can just send your mail.
            </FormDescription>
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
