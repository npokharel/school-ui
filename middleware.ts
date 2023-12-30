// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

// export { default } from "next-auth/middleware";
export { auth as middleware } from "@/auth"
export const config = {
  matcher: ["/dashboard/:path*"]
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
