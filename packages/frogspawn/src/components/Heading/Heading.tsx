import clsx from "clsx"
import { type ElementRef, forwardRef } from "react"
import { type TypographyProps } from "../../definitions"
import type { PropsWithoutRefOrColor } from "../../definitions/types"
import { Text } from "../Text"

type HeadingElement = ElementRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">
type HeadingAsChildProps = {
  asChild?: boolean
  as?: never
} & PropsWithoutRefOrColor<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">

type HeadingElProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  asChild?: never
} & PropsWithoutRefOrColor<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">

export type HeadingProps = TypographyProps &
  (HeadingAsChildProps | HeadingElProps)

const Heading = forwardRef<HeadingElement, HeadingProps>((props, ref) => {
  const { children, asChild, as: Tag = "h3", className, ...rest } = props

  return (
    <Text
      {...rest}
      className={clsx("fs-Heading", className)}
      asChild
      ref={ref}
      role="heading"
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Text>
  )
})

Heading.displayName = "Heading"

export default Heading
