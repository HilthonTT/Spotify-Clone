"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          `flex w-full rounded-md bg-neutral-700 border border-transparent 
            px-3 py-3 text-sm 
            file:border-0 file:bg-transparent file:text-sm file:font-medium file:cursor-pointer
            placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none`,
          className
        )}
        type={type}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
