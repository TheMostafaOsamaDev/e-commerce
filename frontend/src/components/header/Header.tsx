"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Input } from "../ui/input";
import AuthButtons from "./AuthButtons";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }

  return (
    <header className="container">
      <nav className="py-3 border-b w-full flex items-center gap-5">
        <Link href="/">
          <div className="relative h-10 w-20">
            <Image
              src="/images/logo-light.png"
              alt="logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 80px, 120px"
            />
          </div>
        </Link>

        <Input className="!text-lg py-2 font-medium" />

        <AuthButtons />
      </nav>
    </header>
  );
}
