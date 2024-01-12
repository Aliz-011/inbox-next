'use server';

import * as z from 'zod';

import { DocumentSchema } from '@/lib/schemas';
import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';
import { revalidatePath } from 'next/cache';

export const createDocument = async (
  values: z.infer<typeof DocumentSchema>
) => {
  const currentUser = await getCurrentUser();
  const validation = DocumentSchema.safeParse(values);

  if (!validation.success) {
    return { error: 'Please enter a title' };
  }

  const document = await prismadb.document.create({
    data: {
      ...values,
      userId: currentUser?.id!,
    },
  });

  if (!document.id) {
    return { error: 'Failed to create document' };
  }

  revalidatePath('/collab');

  return { success: 'Document created', data: document };
};
