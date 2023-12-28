"use client"

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { SidebarContext } from "@/app/lib/context/layout-context";
import { useLockedBody } from "@/app/lib/hooks/useBodyLock";
import { NavbarWrapper } from "../ui/navbar/navbar";
import { SidebarWrapper } from "../ui/sidebar/sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <NextThemesProvider defaultTheme="system" attribute="class">
      <NextUIProvider>
        {/*<Layout>*/}
        {/*{children}*/}
        {/*</Layout>*/}

        <SidebarContext.Provider
          value={{
            collapsed: sidebarOpen,
            setCollapsed: handleToggleSidebar,
          }}
        >
          <section className="flex">
            <SidebarWrapper />
            <NavbarWrapper>{children}</NavbarWrapper>
          </section>
        </SidebarContext.Provider>

      </NextUIProvider>
    </NextThemesProvider>
  );
}