"use client";
import Link from "next/link";
import { Lock } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { chechIfAdminQueryFn } from "@/lib/api/auth.api";

export default function AdminDashboardItem() {
  const { data } = useQuery({
    queryKey: ["is-admin"],
    queryFn: chechIfAdminQueryFn,
  });

  console.log(data);

  return (
    <DropdownMenuItem asChild>
      <Link href="/dashboard">
        <Lock /> Dashboard
      </Link>
    </DropdownMenuItem>
  );
}
