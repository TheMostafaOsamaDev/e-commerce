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

export default function ProfileDropdown({ userData }: { userData: UserType }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative" asChild>
        <Avatar className="ring ring-primary cursor-pointer size-9">
          <AvatarImage src={userData.image || defaulltProfileSrc} />
          <Skeleton className="w-full h-full rounded-full" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
