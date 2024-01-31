// auth.ts
import { type  DefaultSession } from "next-auth"

//declare module "../node_modules/.pnpm/@auth+core@0.18.4/node_modules/@auth/core/types" {
declare module "@auth/core/types" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token: string
    user: {
      /** The user's postal address. */
      // By default, TypeScript merges new interface properties and overwrite existing ones.
      // In this case, the default session user properties will be overwritten, with the new one defined above.
      // To keep the default session user properties, you need to add them back into the newly declared interface
    } & DefaultSession["user"] // To keep the default types
  }

  interface User {
    username: string,
    access_token: string
  }
}