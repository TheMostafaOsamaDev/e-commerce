import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  ShoppingBasket,
  Settings,
  User,
  User2,
  LogOutIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "./SignOutButton";

export default function UserAuthedButtons({
  userData,
}: {
  userData: UserType;
}) {
  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <User2 /> My Account
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{`${userData.firstName} ${userData.lastName}`}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User /> Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings /> Settings
          </DropdownMenuItem>

          <SignOutButton />
        </DropdownMenuContent>
      </DropdownMenu>

      <Button>
        <ShoppingBasket /> <Link href="/cart">Cart</Link>
      </Button>
    </div>
  );
}
