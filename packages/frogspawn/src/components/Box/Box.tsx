import { type ElementRef, forwardRef } from "react"

import { Slot } from "@radix-ui/react-slot"
import clsx from "clsx"

import {
  type BoxProps as LayoutProps,
  extractBoxProps,
  withBoxProps,
} from "../../definitions"
import type { PropsWithoutRefOrColor } from "../../definitions/types"

type BoxElement = ElementRef<"div">

export interface BoxProps extends PropsWithoutRefOrColor<"div">, LayoutProps {
  asChild?: boolean
}

const Box = forwardRef<BoxElement, BoxProps>((props, ref) => {
  const { layoutProps, asChild, className, ...rest } = extractBoxProps(props)
  const Element = asChild ? Slot : "div"
  return (
    <Element
      {...rest}
      ref={ref}
      className={clsx("fs-Box", className, withBoxProps(layoutProps))}
    />
  )
})

Box.displayName = "Box"

export default Box
