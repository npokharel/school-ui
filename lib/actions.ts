'use server';
import { auth } from "@/auth";
import { unstable_noStore as noStore } from 'next/cache';
export async function genericGet(uri: string) {
  const session = await auth();
  return await fetch(
    `${process.env.API_URL}/${uri}`, {
      // @ts-ignore
      headers: { Authorization: `Bearer ${session?.user.access_token}` },
    }
  );
}

export async function getById(uri: string, id: number) {
  noStore();
  const session = await auth();
  return await fetch(
    `${process.env.API_URL}/${uri}/${id}`, {
      // @ts-ignore
      headers: { Authorization: `Bearer ${session?.user.access_token}` },
    }
  );
}