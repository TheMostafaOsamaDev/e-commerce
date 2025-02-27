import React from "react";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import UserButtons from "./UserButtons";
import { getUserData } from "@/actions/auth.actions";
import UserAuthedButtons from "./UserAuthedButtons";

export default async function Header() {
  const userData = await getUserData();

  return (
    <header className="container py-2">
      <div className="flex items-center justify-between border-b gap-4">
        <Logo />

        <SearchInput classname="flex-1 w-full" />

        {!userData ? (
          <UserButtons />
        ) : (
          <UserAuthedButtons userData={userData} />
        )}
      </div>
    </header>
  );
}
