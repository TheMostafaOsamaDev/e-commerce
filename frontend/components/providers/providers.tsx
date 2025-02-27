"use client";
import React from "react";
import TanstackQueryProvider from "./TanstackQueryProvider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackQueryProvider>
      {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
      {children}
      <Toaster />
      {/* </ThemeProvider> */}
    </TanstackQueryProvider>
  );
}
