// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/Header";
import Providers from "@/components/providers";
import { Toaster } from "sonner";

// ../font/montserrat/(All Fonts here)

const montserrat = localFont({
  src: [
    {
      path: "../font/montserrat/Montserrat-Medium.ttf",
      weight: "500",
    },
    {
      path: "../font/montserrat/Montserrat-SemiBold.ttf",
      weight: "600",
    },
  ],
});

export const metadata: Metadata = {
  title: "Shoop!",
  description: "Start shopping with Shoop!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <Providers>
          <Header />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
