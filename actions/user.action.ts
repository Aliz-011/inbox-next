'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { User } from '@prisma/client';

import { prismadb } from '@/lib/database';
import { getCurrentUser } from '@/lib/get-current-user';

export const updateUser = async (values: Partial<User>) => {
  const currentUser = await getCurrentUser();

  const { email, name, phone, password, address, dateOfBirth, photoUrl } =
    values;

  if (!currentUser) {
    return JSON.parse(JSON.stringify({ message: 'Not a valid user' }));
  }

  let user = {};

  if (!password) {
    user = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        email,
        dateOfBirth,
        address,
        phone,
      },
    });
  } else {
    // encrypt new password
    const hashedPassword = await bcrypt.hash(password, 12);
    user = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  revalidatePath('/settings/profile');
  revalidatePath('/settings/password');

  return user;
};

export const registerUser = async (values: Partial<User>) => {
  const existingUser = await prismadb.user.findUnique({
    where: {
      email: values.email!,
    },
  });

  if (existingUser) {
    return JSON.parse(
      JSON.stringify({
        message: 'User with this email already exist',
        status: 409,
      })
    );
  }

  const hashedPassword = await bcrypt.hash(values.password!, 12);

  const validData = {
    name: values.name!,
    email: values.email!,
    password: hashedPassword,
  };

  const newUser = await prismadb.user.create({
    data: {
      ...validData,
    },
  });

  return JSON.parse(JSON.stringify({ user: newUser }));
};
