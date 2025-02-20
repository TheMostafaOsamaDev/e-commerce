import React from "react";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import UserButtons from "./UserButtons";

export default function Header() {
  return (
    <header className="container py-2">
      <div className="flex items-center justify-between border-b gap-4">
        <Logo />

        <SearchInput classname="flex-1 w-full" />

        <UserButtons />
      </div>
    </header>
  );
}
