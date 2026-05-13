import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-[background-color,border-color,color] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-ghost)] focus-visible:border-[var(--accent)]",
  {
    variants: {
      variant: {
        // Primary — pink CTA
        default:
          "bg-[#FF00BD] text-white hover:bg-[#e600aa] shadow-[0_1px_6px_rgba(255,0,189,0.35)]",
        // Dark — black workhorse
        dark: "bg-[#111827] text-white hover:bg-[#1f2937]",
        // Danger
        destructive: "bg-[#e11d48] text-white hover:bg-[#be123c]",
        // Outlined
        outline:
          "bg-white text-[#374151] border border-[#e5e7eb] hover:bg-[#f3f4f6]",
        // Ghost
        ghost: "bg-transparent text-[#374151] hover:bg-[#f3f4f6]",
        // Link
        link: "text-[#FF00BD] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 text-[13px]",
        sm: "h-8 px-3 text-[13px]",
        lg: "h-10 px-5 text-[13px]",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
