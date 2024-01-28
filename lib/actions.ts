'use server';

import { signIn } from '@/auth';
import { signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { auth } from "auth";
import { unstable_noStore as noStore } from 'next/cache';
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
export async function getClassrooms() {
  const session = await auth()
  return await fetch(
    `${process.env.API_URL}/classroom`, {
      headers: {Authorization: `Bearer ${session?.user.access_token}`}
    }
  );
}

export async function getStudents() {
  const session = await auth()
  return await fetch(
    `${process.env.API_URL}/student`, {
      headers: {Authorization: `Bearer ${session?.user.access_token}`}
    }
  );
}
export async function getTeachers() {
  const session = await auth()
  return await fetch(
    `${process.env.API_URL}/teacher`, {
      headers: {Authorization: `Bearer ${session?.user.access_token}`}
    }
  );
}

export async function getStaffs() {
  const session = await auth()
  return await fetch(
    `${process.env.API_URL}/staff`, {
      headers: {Authorization: `Bearer ${session?.user.access_token}`}
    }
  );
}

export async function addStudent(data : FormData) {
  console.log("data", data)
  const session = await auth()
  /*return await fetch(
    `${process.env.API_URL}/student`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
        "Content-Type": "application/json",
      },
      body: data
    }
  );*/
  return await fetch(`${process.env.API_URL}/student`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${session?.user.access_token}`,
    }
  })
}
export async function addTeacher(data : FormData) {
  console.log("data", data)
  const session = await auth()
  /*return await fetch(
    `${process.env.API_URL}/teacher`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
        "Content-Type": "application/json",
      },
      body: data
    }
  );*/
  return await fetch(`${process.env.API_URL}/teacher`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${session?.user.access_token}`,
    }
  })
}

export async function addStaff(data : FormData) {
  console.log("data", data)
  const session = await auth()
  /*return await fetch(
    `${process.env.API_URL}/staff`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
        "Content-Type": "application/json",
      },
      body: data
    }
  );*/
  return await fetch(`${process.env.API_URL}/staff`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${session?.user.access_token}`,
    }
  })
}

export async function fetchStudentById(id: number) {
  noStore();
  const session = await auth()
  try {
    return await fetch (`${process.env.API_URL}/student/${id}`,{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${session?.user.access_token}`,
      }
    })
  } catch (error){
    console.log("API fetch error", error)
  }
}
export async function fetchTeacherById(id: number) {
  noStore();
  const session = await auth()
  try {
    return await fetch (`${process.env.API_URL}/teacher/${id}`,{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${session?.user.access_token}`,
      }
    })
  } catch (error){
    console.log("API fetch error", error)
  }
}


export async function fetchStaffById(id: number) {
  noStore();
  const session = await auth()
  try {
    return await fetch (`${process.env.API_URL}/staff/${id}`,{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${session?.user.access_token}`,
      }
    })
  } catch (error){
    console.log("API fetch error", error)
  }
}

export async function fetchClassroomById(id: number) {
  noStore();
  const session = await auth()
  try {
    return await fetch (`${process.env.API_URL}/classroom/${id}`,{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${session?.user.access_token}`,
      }
    })
  } catch (error){
    console.log("API fetch error", error)
  }
}