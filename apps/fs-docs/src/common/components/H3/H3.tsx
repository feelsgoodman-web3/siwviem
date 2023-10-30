import { HeadingLink } from "@fs/common/components/HeadingLink"
import { ComponentPropsWithRef } from "react"

interface H3Props extends Omit<ComponentPropsWithRef<"h3">, "color"> {
  children: string
}

export default function H3({ children, ...props }: H3Props) {
  return (
    <HeadingLink {...props} as="h3" size="xl">
      {children}
    </HeadingLink>
  )
}
