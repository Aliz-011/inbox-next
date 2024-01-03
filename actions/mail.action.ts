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

  return JSON.parse(JSON.stringify({ data: newMail, status: 201 }));
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
    return JSON.parse(
      JSON.stringify({ message: 'Mail id required', status: 400 })
    );
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

  return JSON.parse(
    JSON.stringify({
      data: updatedMail,
      message: 'Success forwarding mail',
      status: 200,
    })
  );
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

export const softDelete = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  if (!id) {
    return JSON.parse(
      JSON.stringify({ message: 'No id provided', status: 400 })
    );
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

  return JSON.parse(JSON.stringify({ data: softDeleteMail, status: 200 }));
};

export const deletePermanently = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect('/sign-in');
  }

  if (!id) {
    return JSON.parse(
      JSON.stringify({ message: 'No id provided', status: 400 })
    );
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

  return JSON.parse(JSON.stringify({ message: 'Mail deleted.', status: 200 }));
};
