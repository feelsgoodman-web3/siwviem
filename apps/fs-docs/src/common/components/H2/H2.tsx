import { HeadingLink } from "@fs/common/components/HeadingLink"
import { ComponentPropsWithRef } from "react"

interface H2Props extends ComponentPropsWithRef<"h2"> {
  children: string
}

export default function H2({ children, ...props }: H2Props) {
  return (
    <HeadingLink {...props} as="h2" size="2xl">
      {children}
    </HeadingLink>
  )
}
