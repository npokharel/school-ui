<div align="center"><strong>SchoolMS Admin Dashboard </strong></div>
<div align="center">Built with the Next.js App Router</div>
<br />

## Overview

This app is using the following stack:

- Framework - [Next.js 14](https://nextjs.org/13)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- State Management - [Zustand](https://zustand-demo.pmnd.rs)
- Auth - [Nextauth](https://next-auth.js.org)
- File Uploading - [Uploadthing](https://uploadthing.com)
- Tables - [Tanstack Tables](https://ui.shadcn.com/docs/components/data-table)
- Forms - [React Hook Form](https://ui.shadcn.com/docs/components/form)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

## Pages

| Pages                                                                             | Specifications                                                                                        |
| :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| [Signup](https://next-shadcn-dashboard-starter.vercel.app/)                       | Authentication with **NextAuth** supports Social logins and email logins(Enter dummy email for demo). |
| [Dashboard](https://next-shadcn-dashboard-starter.vercel.app/dashboard)           | Cards with recharts graphs for analytics.                                                             |
| [Users](https://next-shadcn-dashboard-starter.vercel.app/dashboard/user)          | Tanstack tables with user details client side searching, pagination etc                               |
| [Users/new](https://next-shadcn-dashboard-starter.vercel.app/dashboard/user/new)  | A User Form with Uploadthing to support file uploading with dropzone.                                 |
| [Employee](https://next-shadcn-dashboard-starter.vercel.app/dashboard/employee)   | Tanstack tables with server side searching, pagination etc).                                          |
| [Profile](https://next-shadcn-dashboard-starter.vercel.app/dashboard/profile)     | Mutistep dynamic forms using react-hook-form and zod for form validation.                             |
| [Not Found](https://next-shadcn-dashboard-starter.vercel.app/dashboard/notfound)  | Not Found Page Added in the root level                                                                |
| -                                                                                 | -                                                                                                     |

## Getting Started

Clone this repo

```
git clone git@github.com:nuptse-tech/school-ui.git .
```

Copy the env.example.txt file to .env.local on the same directory level

```
cp env.example.txt .env.local
```

If you don't already have a uploadthing secret key, sign up and create one from the dashboard!
https://uploadthing.com/

Add env variables to `.env.local` file
```
UPLOADTHING_APP_ID=...
UPLOADTHING_SECRET=... # A secret key for your app (starts with sk_live_)
```

Run the following commands to start the development server (npm):

```
npm install
npm run dev
```

Run the following commands to start the development server (pnpm):

```
pnpm install
pnpm dev
```

You should now be able to access the application at http://localhost:3000.
