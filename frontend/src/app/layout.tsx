// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const oswald = localFont({
  src: [
    {
      path: "../font/Oswald/Oswald-Regular.ttf",
      weight: "400",
    },
    {
      path: "../font/Oswald/Oswald-Medium.ttf",
      weight: "500",
    },
    {
      path: "../font/Oswald/Oswald-DemiBold.ttf",
      weight: "600",
    },
    {
      path: "../font/Oswald/Oswald-Bold.ttf",
      weight: "700",
    },
  ],
  display: "swap",
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
    <html lang="en">
      <body className={`${oswald.className} antialiased`}>{children}</body>
    </html>
  );
}
