"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [isShown, setIsShown] = React.useState(false);
    let inputType;

    if (type === "password") {
      inputType = isShown ? "text" : "password";
    } else {
      inputType = type;
    }

    const handleOnClick = () => {
      setIsShown((prev) => !prev);
    };

    return (
      <div className="relative">
        <input
          type={inputType}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
            type === "password" ? "pr-10" : ""
          )}
          ref={ref}
          {...props}
        />

        {type === "password" && (
          <Button
            variant={"ghost"}
            className={
              "absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointer size-7"
            }
            type="button"
            onClick={handleOnClick}
            size={"icon"}
          >
            {!isShown ? <Eye size={20} /> : <EyeOff size={20} />}
          </Button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
