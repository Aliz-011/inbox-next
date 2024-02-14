'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Mail } from '@prisma/client';

import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';

interface Option {
  label: string;
  value: string;
}

/**
 * This function is responsible for creating a new mail.
 * @param values
 * @param labels
 * @returns
 */
export const createMail = async (
  values: Partial<Mail>,
  labels: Option[],
  timelineStatus?: string
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  const validData = {
    title: values.title!,
    content: values.content,
    attachment: values.attachment,
    isDrafted: values.isDrafted,
    senderId: currentUser.id,
    recipientId: values.recipientId!,
    mailCode: values.mailCode,
  };

  const newMail = await prismadb.mail.create({
    data: {
      ...validData,
      timelines: {
        create: [
          {
            assignedBy: currentUser.name,
            timeline: {
              create: {
                status: timelineStatus ? timelineStatus : 'Mail sent',
              },
            },
          },
        ],
      },
      labels: {
        connect: labels.map((item) => ({ id: item.value })),
      },
    },
  });

  revalidatePath('/mails/new');

  return { data: newMail, status: 201 };
};

export const updateMail = async (
  values: Partial<Mail>,
  labels?: Option[],
  timelineStatus?: string
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  const mailId = values.id;

  if (!mailId) {
    return { message: 'Mail id required', status: 400 };
  }

  const validData = {
    title: values.title,
    content: values.content,
    mailCode: values.mailCode,
    isDrafted: values.isDrafted,
  };

  let updatedMail = {};

  // later, we should update the `WHERE` query parameters.
  if (labels?.length! > 0) {
    updatedMail = await prismadb.mail.update({
      where: {
        id: mailId,
        AND: [
          {
            OR: [
              {
                recipientId: currentUser.id,
              },
              {
                senderId: currentUser.id,
              },
            ],
          },
        ],
      },
      data: {
        ...validData,
        timelines: {
          create: [
            {
              assignedBy: currentUser.name,
              timeline: {
                create: {
                  status: timelineStatus ? timelineStatus : null,
                },
              },
            },
          ],
        },
        labels: { connect: labels?.map((item) => ({ id: item.value })) },
      },
    });
  } else {
    updatedMail = await prismadb.mail.update({
      where: {
        id: mailId,
        AND: [
          {
            OR: [
              {
                recipientId: currentUser.id,
              },
              {
                senderId: currentUser.id,
              },
            ],
          },
        ],
      },
      data: {
        ...validData,
        timelines: {
          create: [
            {
              assignedBy: currentUser.name,
              timeline: {
                create: {
                  status: timelineStatus ? timelineStatus : null,
                },
              },
            },
          ],
        },
      },
    });
  }

  revalidatePath(`/mails/${mailId}`);

  return {
    data: updatedMail,
    message: 'Success forwarding mail',
    status: 200,
  };
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
    return { message: 'Message already readed', status: 400 };
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

  revalidatePath('/inbox', 'page');

  return { data: updateReadMessage, status: 200 };
};

export const archiveMessage = async (mailId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  const mailAlreadyArchived = await prismadb.mail.findFirst({
    where: {
      id: mailId,
      AND: [
        {
          isArchived: true,
        },
      ],
    },
  });

  if (mailAlreadyArchived) {
    return { message: 'Mail already archived', status: 400 };
  }

  const archive = await prismadb.mail.update({
    where: {
      id: mailId,
      AND: [
        {
          senderId: currentUser.id,
        },
      ],
    },
    data: {
      isArchived: true,
    },
  });

  revalidatePath('/sent', 'page');

  return { data: archive, status: 200, message: 'Archived' };
};

export const softDelete = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  if (!id) {
    return { message: 'No id provided', status: 400 };
  }

  const softDeleteMail = await prismadb.mail.update({
    where: {
      id,
      AND: [
        {
          OR: [
            {
              recipientId: currentUser.id,
            },
            {
              senderId: currentUser.id,
            },
          ],
        },
      ],
    },
    data: {
      isDeleted: true,
    },
  });

  revalidatePath('/inbox');
  revalidatePath(`/inbox/${id}`);
  revalidatePath('/sent');

  return { data: softDeleteMail, status: 200, message: 'Deleted permanently' };
};

export const putBack = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  if (!id) {
    return { message: 'No id provided', status: 400 };
  }

  const softDeleteMail = await prismadb.mail.update({
    where: {
      id,
      AND: [
        {
          OR: [
            {
              recipientId: currentUser.id,
            },
            {
              senderId: currentUser.id,
            },
          ],
        },
      ],
    },
    data: {
      isDeleted: false,
    },
  });

  revalidatePath('/trash');
  revalidatePath(`/trash/${id}`);

  return { data: softDeleteMail, status: 200, message: 'Success' };
};

export const deletePermanently = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  if (!id) {
    return { message: 'No id provided', status: 400 };
  }

  await prismadb.mail.delete({
    where: {
      id,
      AND: [
        {
          OR: [
            {
              recipientId: currentUser.id,
            },
            {
              senderId: currentUser.id,
            },
          ],
        },
      ],
    },
  });

  revalidatePath('/sent');

  return { message: 'Mail deleted.', status: 200 };
};
