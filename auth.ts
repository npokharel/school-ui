import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { User } from './app/lib/definitions';
import { z } from 'zod';

/*async function getUser(email: string, password: string): Promise<User | undefined> {
    try {
        // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        // return user.rows[0];
        console.log("get user ???")
        let user;
        fetch('http://nuptse.local:8080/api/v1/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username: `${email}`, password: `${password}` }),
        }).then((response) => response.json())
            .then((data: any) => {
                console.log(data);
                // return data;
                user = data;
                return data;
            })
            .catch((error) => {
                console.log('XXX :( :( :(')
                console.error(error);
            });
            return user;

    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}*/

async function getUser(email: string, password: string): Promise<User | undefined> {
    try {
        console.log("get user ???");
        const response = await fetch('http://nuptse.local:8080/api/v1/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username: email, password }),
        });

        if (!response.ok) {
            throw new Error(`Failed to authenticate user. Status: ${response.status}`);
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

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
      Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
   
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email, password);
            if (!user) return null;
            return user;
          }
          return null;
        },
      }),
    ],
  });
