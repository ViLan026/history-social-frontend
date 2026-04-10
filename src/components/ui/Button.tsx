import React, { forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "soft";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "px-6 py-3 rounded-full transition-all",
          "shadow-neu active:shadow-neuInset",
          variant === "primary" && "bg-primary text-white",
          variant === "soft" && "bg-soft text-black",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;