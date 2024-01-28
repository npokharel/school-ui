import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthConfig } from "next-auth";

export const config =  {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      /*credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },*/

      async authorize(credentials) {
        console.log("inside credentials ", credentials)
        const authResponse = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(credentials),
          body: JSON.stringify({ username: credentials.email, password: credentials.password }),
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
    signIn: "/", //sign in page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    async session({ session, token }) {
      /*console.log("session callback")
      console.log("session: "+JSON.stringify(session))
      console.log("token: "+JSON.stringify(token))*/

      // session.access_token = token.accessToken
      //@ts-ignore
      session.user = token.user

      // console.log("session", session)
      // Send properties to the client, like an access_token from a provider.
      // session.user.access_token = token.accessToken
      return { ...session }
    },
    // The arguments user, account, profile and isNewUser are only passed the first time this callback is called on a
    // new session, after the user signs in. In subsequent calls, only token will be available.
    async jwt({ token, user, account, isNewUser }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        /*console.log("jwt callback")
        console.log("token: "+JSON.stringify(token))
        console.log("user: "+JSON.stringify(user))
        console.log("account: "+JSON.stringify(account))
        console.log("isNewUser: "+JSON.stringify(isNewUser))*/

        token.accessToken = account.access_token
        token.user = user
      }
      return token
    }
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
