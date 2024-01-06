'use server';

import { signIn } from '@/auth';
import { signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { auth } from "auth";
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log("trying... ")
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logOut() {
  await signOut();
}

export async function getStudents() {
  const session = await auth()
  return await fetch(
    `${process.env.API_URL}/student`, {
      headers: {Authorization: `Bearer ${session?.user.access_token}`}
    }
  );
}