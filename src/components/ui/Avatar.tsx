"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: "sm" | "md" | "lg";
  fallback?: string;
  variant?: "default" | "neumorphic";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
};

const variantClasses = {
  default: "rounded-full bg-gray-200 text-gray-600",
  neumorphic: "rounded-full bg-[#4f6f91] text-[#a0cafa] neu",
};

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  (
    {
      className,
      size = "md",
      src,
      alt,
      fallback,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const [error, setError] = React.useState(false);

    const showFallback = !src || error;

    return showFallback ? (
      <div
        className={cn(
          "flex items-center justify-center font-medium",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
      >
        {fallback?.charAt(0)?.toUpperCase() || "U"}
      </div>
    ) : (
      <img
        ref={ref}
        src={src}
        alt={alt || "avatar"}
        onError={() => setError(true)}
        className={cn(
          "rounded-full object-cover",
          sizeClasses[size],
          variant === "neumorphic" && "neu",
          className
        )}
        {...props}
      />
    );
  }
);

Avatar.displayName = "Avatar";