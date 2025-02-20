import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <div>
      <Link href={"/"} className="block w-24 h-14 overflow-hidden ">
        <Image
          src={"/assets/images/logo.png"}
          width={500}
          height={500}
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </Link>
    </div>
  );
}
