import { getCurrentUser } from '@/lib/get-current-user';
import { prismadb } from '@/lib/database';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, dob } = body;

    const self = await getCurrentUser();

    if (!self) {
      return NextResponse.json({ message: 'Not a valid user' });
    }

    if (!password) {
      return NextResponse.json({ message: 'No password provided' });
    }
    if (!dob) {
      return NextResponse.json({ message: 'No date of birth provided' });
    }

    // encrypt new password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.update({
      where: {
        id: self.id,
      },
      data: {
        name,
        email,
        password: hashedPassword,
        dateOfBirth: dob,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
