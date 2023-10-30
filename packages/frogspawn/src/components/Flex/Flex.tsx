import { type ElementRef, forwardRef } from "react"

import clsx from "clsx"

import type {
  GetPropDefTypes,
  PropsWithoutRefOrColor,
} from "../../definitions/types"
import { withBreakpoints } from "../../utils"
import { Box, type BoxProps } from "../Box"

import { flexPropDefs } from "./props"

type FlexElement = ElementRef<"div">
type FlexOwnProps = GetPropDefTypes<typeof flexPropDefs>

export interface FlexProps
  extends PropsWithoutRefOrColor<"div">,
    FlexOwnProps,
    BoxProps {
  asChild?: boolean
}

const Flex = forwardRef<FlexElement, FlexProps>((props, ref) => {
  const { wrap, direction, className, ...rest } = props
  return (
    <Box
      {...rest}
      ref={ref}
      display="flex"
      className={clsx(
        "fs-Flex",
        className,
        withBreakpoints("flex", wrap),
        withBreakpoints("flex", direction),
      )}
    />
  )
})

Flex.displayName = "Flex"

export default Flex
