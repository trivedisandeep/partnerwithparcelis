import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border-2 border-white/80 bg-transparent text-white hover:bg-white hover:text-primary",
        secondary:
          "bg-white text-primary shadow-sm hover:bg-white/90",
        ghost: "hover:bg-white/10 hover:text-foreground",
        link: "text-white underline-offset-4 hover:underline",
        hero: "bg-white text-primary shadow-lg hover:shadow-xl hover:bg-white/95 active:scale-[0.98] cursor-pointer font-semibold",
        success: "bg-accent text-accent-foreground shadow-lg hover:shadow-xl hover:bg-accent/90 active:scale-[0.98] cursor-pointer font-semibold",
        glass: "bg-primary/80 backdrop-blur-xl border border-white/20 text-white hover:bg-primary hover:border-white/40 cursor-pointer",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-5",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
