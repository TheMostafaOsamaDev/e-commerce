"use client";

import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { signOutMutateFn } from "@/lib/api/auth.api";
import { signal } from "@/lib/api";
import { clearAuthCookies } from "@/actions/auth.actions";
import { tanstackGlobalErrorHandler } from "@/helpers";

export default function SignOutButton() {
  const signOutMutate = useMutation({
    mutationKey: ["signout"],
    mutationFn: signOutMutateFn,
    onError: tanstackGlobalErrorHandler,
    onSuccess: async () => {
      await clearAuthCookies();

      window.location.reload();
    },
  });

  const handleSignOut = () => {
    signOutMutate.mutate({ signal });
  };

  return (
    <DropdownMenuItem
      className="text-red-500 hover:!text-red-600"
      disabled={signOutMutate.isPending}
      onClick={handleSignOut}
    >
      <LogOutIcon /> Logout
    </DropdownMenuItem>
  );
}
