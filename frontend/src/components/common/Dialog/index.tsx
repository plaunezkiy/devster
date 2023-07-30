"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";

export const DialogRoot = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogPortal = DialogPrimitive.Portal;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className="overflow-hidden bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0"
    {...props}
  />
));

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Content
    ref={ref}
    className="z-10 data-[state=open]:animate-contentShow fixed top-[25%] left-[50%] translate-x-[-50%] translate-y-[-25%] max-h-[85vh] max-w-[90vw] rounded-lg bg-gray-200 dark:bg-zinc-800 border pp-[25px] shadow focus:outline-none overflow-y-scroll no-scrollbar md:overflow-hidden"
    {...props}
  />
));

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className="text-xl font-medium" {...props} />
));

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className="mt-[10px] mb-5 text-lg leading-normal"
    {...props}
  />
));

export const DialogClose = DialogPrimitive.Close;
