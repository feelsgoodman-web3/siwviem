import { type ButtonHTMLAttributes, forwardRef } from "react"

import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"
import clsx from "clsx"

import {
  MarginProps,
  extractMarginProps,
  withMarginProps,
} from "../../definitions"
import buttonVariants, { buttonBaseVariants } from "./variants"

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants>,
    VariantProps<typeof buttonBaseVariants>,
    MarginProps {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      color,
      asChild = false,
      fullWidth,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"
    const { marginProps, ...rest } = extractMarginProps(props)

    return (
      <Comp
        {...rest}
        className={clsx(
          "fs-Button",
          className,
          withMarginProps(marginProps),
          buttonVariants({ size }),
          buttonBaseVariants({ variant, color, radius, fullWidth }),
        )}
        ref={ref}
      />
    )
  },
)

Button.displayName = "Button"

export default Button
