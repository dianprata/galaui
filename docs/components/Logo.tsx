import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/index";

interface LogoProps extends ComponentPropsWithoutRef<"div"> {
  size?: number;
  withText?: boolean;
}

export function Logo({ className, size = 24, withText = false, ...props }: LogoProps) {
  if (withText) {
    return (
      <div
        className={cn("relative inline-flex items-center shrink-0 select-none", className)}
        style={{ height: size }}
        {...props}
      >
        <img
          src="/logo-text.png"
          alt="GalaUI"
          style={{ height: size, width: "auto" }}
          className="h-full w-auto object-contain dark:hidden pointer-events-none"
        />
        <img
          src="/logo-text-white.png"
          alt="GalaUI"
          style={{ height: size, width: "auto" }}
          className="h-full w-auto object-contain hidden dark:block pointer-events-none"
        />
      </div>
    );
  }

  return (
    <div
      className={cn("relative inline-flex items-center justify-center shrink-0 select-none", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <img
        src="/logo.png"
        alt="GalaUI"
        width={size}
        height={size}
        className="w-full h-full object-contain dark:hidden pointer-events-none"
      />
      <img
        src="/logo-white.png"
        alt="GalaUI"
        width={size}
        height={size}
        className="w-full h-full object-contain hidden dark:block pointer-events-none"
      />
    </div>
  );
}
