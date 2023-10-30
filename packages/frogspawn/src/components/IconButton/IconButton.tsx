import { ButtonHTMLAttributes, forwardRef } from "react"

import { Slot } from "@radix-ui/react-slot"
import { VariantProps } from "class-variance-authority"
import clsx from "clsx"

import { buttonBaseVariants } from "../Button/variants"
import iconButtonVariants from "./variants"

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof iconButtonVariants>,
    VariantProps<typeof buttonBaseVariants> {
  asChild?: boolean
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, variant, size, radius, color, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={clsx(
          "fs-IconButton",
          className,
          iconButtonVariants({ size }),
          buttonBaseVariants({ variant, color, radius }),
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

IconButton.displayName = "IconButton"

export default IconButton
