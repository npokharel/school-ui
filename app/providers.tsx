"use client";
import "./globals.css";
import type { AppProps } from "next/app";
import {NextUIProvider} from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Layout from "@/app/layout";
/*export function Providers({ Component, pageProps }: AppProps) {
    return (
      <NextThemesProvider defaultTheme="dark" attribute="class">
        <NextUIProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
        </NextUIProvider>
      </NextThemesProvider>
    )
}*/
export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
