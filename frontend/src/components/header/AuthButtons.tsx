import React from "react";
import { Button } from "../ui/button";
import { LogInIcon, UserRoundPlus } from "lucide-react";
import Link from "next/link";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button asChild>
        <Link href="/sign-up">
          <UserRoundPlus /> Sign up
        </Link>
      </Button>

      <Button variant="outline" asChild>
        <Link href="/sign-in">
          <LogInIcon /> Sign in
        </Link>
      </Button>
    </div>
  );
}
