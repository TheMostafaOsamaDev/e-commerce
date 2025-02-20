import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn, User } from "lucide-react";

export default function UserButtons() {
  return (
    <div className="flex items-center gap-4">
      <Button>
        <User /> <Link href="/sign-up">Sign up</Link>
      </Button>

      <Button variant={"outline"}>
        <LogIn /> <Link href="/sign-in">Sign in</Link>
      </Button>
    </div>
  );
}
