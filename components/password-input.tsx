"use client";

import * as React from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input, type InputProps } from "~/components/ui/input";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative flex items-center">
      <Input type={showPassword ? "text" : "password"} className={cn("pr-10", className)} ref={ref} {...props} />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute w-8 h-8 right-3"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={props.value === "" || props.disabled}
      >
        {showPassword ? (
          <IconEyeOff className="w-4 h-4" aria-hidden="true" />
        ) : (
          <IconEye className="w-4 h-4" aria-hidden="true" />
        )}
        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
      </Button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
