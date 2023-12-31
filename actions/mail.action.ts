'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Mail } from '@prisma/client';

import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';

export const createMail = async (values: Partial<Mail>) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  const validData = {
    title: values.title!,
    content: values.content!,
    mailCode: values.mailCode!,
    isDrafted: values.isDrafted!,
    senderId: currentUser.id,
    attachment: values.attachment!,
    recipientId: values.recipientId!,
  };

  const newMail = await prismadb.mail.create({
    data: {
      ...validData,
    },
  });

  revalidatePath('/mails/new');

  return JSON.parse(JSON.stringify({ data: newMail, status: 201 }));
};

export const updateMail = async (mailId: string, values: Partial<Mail>) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  if (!mailId) {
    return JSON.parse(
      JSON.stringify({ message: 'Mail id required', status: 400 })
    );
  }

  const validData = {
    title: values.title,
    content: values.content,
    mailCode: values.mailCode,
    isDrafted: values.isDrafted,
    senderId: currentUser.id,
    attachment: values.attachment,
  };

  const updatedMail = await prismadb.mail.update({
    where: {
      id: mailId,
    },
    data: {
      ...validData,
    },
  });

  revalidatePath(`/mails/${mailId}`);

  return JSON.parse(JSON.stringify({ data: updatedMail, status: 200 }));
};

export const markAsRead = async (mailId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  const mailAlreadyReaded = await prismadb.mail.findFirst({
    where: {
      id: mailId,
      AND: [
        {
          isRead: true,
        },
      ],
    },
  });

  if (mailAlreadyReaded) {
    return JSON.parse(
      JSON.stringify({ message: 'Message already readed', status: 400 })
    );
  }

  const updateReadMessage = await prismadb.mail.update({
    where: {
      id: mailId,
      AND: [
        {
          recipientId: currentUser.id,
        },
      ],
    },
    data: {
      isRead: true,
    },
  });

  revalidatePath('/inbox');

  return JSON.parse(JSON.stringify({ data: updateReadMessage, status: 200 }));
};
