import { Code as FGCode } from "@feelsgoodman/fs-ui/components"
import { ComponentPropsWithRef, ReactNode } from "react"

interface CodeProps extends Omit<ComponentPropsWithRef<"code">, "color"> {
  children: ReactNode
}

export default function Code({ children, ...props }: CodeProps) {
  return <FGCode {...props}>{children}</FGCode>
}
