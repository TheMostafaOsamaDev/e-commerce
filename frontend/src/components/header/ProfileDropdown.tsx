import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { defaulltProfileSrc } from "@/common/config";
import { Skeleton } from "../ui/skeleton";
import { LogOut } from "lucide-react";
import useSignOutMutation from "@/hooks/use-sign-out-mutation";
import { Button } from "../ui/button";

export default function ProfileDropdown({ userData }: { userData: UserType }) {
  const signOutMutation = useSignOutMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative" asChild>
        <Avatar className="ring ring-primary cursor-pointer size-9">
          <AvatarImage src={userData.image || defaulltProfileSrc} />
          <Skeleton className="w-full h-full rounded-full" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem> */}
        <DropdownMenuItem variant="destructive" asChild>
          <Button
            variant={"ghost"}
            disabled={signOutMutation.isPending}
            onClick={() => signOutMutation.mutate()}
          >
            <LogOut /> Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
