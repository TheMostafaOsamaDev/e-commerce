import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">
          <Image
            src="/images/logo-light.png"
            width={100}
            height={100}
            alt="logo"
          />
        </Link>
      </nav>
    </header>
  );
}
