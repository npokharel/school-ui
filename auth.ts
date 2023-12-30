// "use server"
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthConfig } from "next-auth";
import { User } from "@/lib/store";
// import { z } from 'zod';

export const config =  {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },

      async authorize(credentials) {
        console.log("inside credentials ", credentials)
        const authResponse = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          /*body: JSON.stringify(credentials),*/
          body: JSON.stringify({ username: 'admin@nuptse.io', password: 'admin@1' }),
        })
        if (!authResponse.ok) {
          return null
        }
        const user = await authResponse.json()
        console.log("awaited user ", user)
        return user
      },
    })
  ],
  pages: {
    signIn: "/", //sigin page
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/dashboard") return !!auth
      return true
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
