// This file contains type definitions of data.

import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  } 
}

export type User = {
    id: string;
    username: string;
    roles: any;
    currentAuthority: string;
    type: string;
    status: string;
    success: string;
    access_token: string;
    refresh_token: string;
  };