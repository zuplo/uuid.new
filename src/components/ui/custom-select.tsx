"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, CaretDown } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

const CustomSelect = SelectPrimitive.Root;

const CustomSelectGroup = SelectPrimitive.Group;

const CustomSelectValue = SelectPrimitive.Value;

const CustomSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between rounded-lg border border-[#e5e7eb] bg-white px-3 text-[13px] font-medium text-[#111827] transition-[border-color,box-shadow] focus:outline-none focus:border-[#FF00BD] focus:ring-[3px] focus:ring-[var(--accent-ghost)] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <CaretDown size={14} weight="regular" className="text-[#6b7280]" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
CustomSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const CustomSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-lg border border-[#e5e7eb] bg-white text-[#111827] shadow-[0_6px_24px_rgba(0,0,0,0.10)] animate-in fade-in-80",
        position === "popper" && "translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1.5",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
CustomSelectContent.displayName = SelectPrimitive.Content.displayName;

const CustomSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#9ca3af]",
      className
    )}
    {...props}
  />
));
CustomSelectLabel.displayName = SelectPrimitive.Label.displayName;

const CustomSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full select-none items-center gap-2 rounded-md py-2 pl-8 pr-3 text-[13px] text-[#374151] outline-none transition-colors data-[highlighted]:bg-[#f3f4f6] data-[highlighted]:text-[#111827] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer",
      className
    )}
    {...props}
  >
    <span className="absolute left-2.5 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check size={14} weight="regular" className="text-[#FF00BD]" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
CustomSelectItem.displayName = SelectPrimitive.Item.displayName;

const CustomSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-[#e5e7eb]", className)}
    {...props}
  />
));
CustomSelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  CustomSelect,
  CustomSelectGroup,
  CustomSelectValue,
  CustomSelectTrigger,
  CustomSelectContent,
  CustomSelectLabel,
  CustomSelectItem,
  CustomSelectSeparator,
};
