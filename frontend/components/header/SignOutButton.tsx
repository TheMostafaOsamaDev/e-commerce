"use client";

import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { signOutMutateFn } from "@/lib/api/auth.api";
import { signal } from "@/lib/api";

export default function SignOutButton() {
  const signOutMutate = useMutation({
    mutationKey: ["signout"],
    mutationFn: signOutMutateFn,
    onSuccess: () => window.location.reload(),
  });

  return (
    <DropdownMenuItem
      className="text-red-500 hover:bg-red-600"
      disabled={signOutMutate.isPending}
      onClick={() => {
        signOutMutate.mutate({ signal });
      }}
    >
      <LogOutIcon /> Logout
    </DropdownMenuItem>
  );
}
