import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import Header from "@/components/header/Header";

const notoSansArabic = localFont({
  src: "./../fonts/Montserrat/Montserrat-Medium.ttf",
});

export const metadata: Metadata = {
  title: "Shoop!",
  description: "Want to shop? Shoop! it!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
      </head> */}
      <body className={`${notoSansArabic.className} antialiased`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
