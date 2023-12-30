/*
import   NextAuthOptions   from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { User } from "@/lib/store";
import { z } from "zod";

async function getUser(email: string, password: string): Promise<User | undefined> {
  try {
    console.log("get user ???");
    const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username: email, password }),
    });

    if (!response.ok) {
      throw new Error(`Failed to authenticate user. Status: ${response.status}`);
    }else {
      console.log("response from server ok")
    }

    const data = await response.json();

    // Check if the response is empty or not valid JSON
    if (Object.keys(data).length === 0) {
      throw new Error('Empty or invalid JSON response');
    }

    console.log(data);
    return data; // Assuming data is the user object.
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialProvider({
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
      },
      /!*async authorize(credentials, req) {
        const user = { id: "1", name: "John", email: credentials?.email };
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },*!/
      async authorize(credentials) {
        /!*const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);*!/

        // if (parsedCredentials.success) {
          // const { email, password } = parsedCredentials.data;
          const user = await getUser("admin@nuptse.io", "admin@1");
          console.log("awaited user ", user)
          // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
          console.log("user parsed success ...")
          if (!user) return null;
          return user;
        // }
        // return null;
      },
    }),
  ],
  pages: {
    signIn: "/", //sigin page
  },
};
*/
