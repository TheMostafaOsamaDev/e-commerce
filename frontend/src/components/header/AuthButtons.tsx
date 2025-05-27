import React from "react";
import { Button } from "../ui/button";
import { Loader2, LogInIcon, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import useProfileQuery from "@/hooks/use-profile-query";
import ProfileDropdown from "./ProfileDropdown";
import { ApiResponse } from "@/common/interfaces/response.interface";
import { Skeleton } from "../ui/skeleton";

export default function AuthButtons() {
  const { data, isLoading } = useProfileQuery();
  const userData: ApiResponse<UserType> = data?.data;

  if (isLoading) {
    return (
      <Button variant={"secondary"} disabled>
        <Loader2 className="animate-spin text-primary" /> Loading...
      </Button>
    );
  }

  if (!userData) {
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
  } else {
    return <ProfileDropdown userData={userData.data} />;
  }
}
