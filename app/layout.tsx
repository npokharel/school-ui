import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { fontSans } from "@/lib/fonts"
import "./globals.css";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "School INC",
  description: "Next application for school management.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.className} overflow-hidden`}>
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
