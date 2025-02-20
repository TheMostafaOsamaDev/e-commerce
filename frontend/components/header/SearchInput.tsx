import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Search } from "lucide-react";

export default function SearchInput({ classname }: { classname?: string }) {
  return (
    <div className={clsx("grid w-full items-center", classname)}>
      <div className="relative">
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">
          <Search className="h-4 w-4" />
        </div>
        <Input
          id="search"
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 h-10"
        />
      </div>
    </div>
  );
}
