import { Anchor } from "@feelsgoodman/fs-ui/components"
import { ComponentPropsWithRef, ReactNode } from "react"

interface AProps extends Omit<ComponentPropsWithRef<"a">, "color"> {
  children: ReactNode
}

export default function A({ children, ...props }: AProps) {
  return <Anchor {...props}>{children}</Anchor>
}
