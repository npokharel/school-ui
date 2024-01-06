import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { fontSans } from "@/lib/fonts"
import "./globals.css";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";

// const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "School MS",
  description: "Dashboard for school administration.",
};
export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {
  const session = await auth()
  return (
    <html lang="en" suppressHydrationWarning>
    {/*<body className={`${inter.className} overflow-hidden`}>*/}
    <body
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.className
      )}
    >
    <Providers session={session}>
      <Toaster />
      {children}
    </Providers>
    </body>
    </html>
  );
}
