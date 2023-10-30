import { Text } from "@feelsgoodman/fs-ui/components"
import { ComponentPropsWithRef, ReactNode } from "react"

interface PProps extends Omit<ComponentPropsWithRef<"p">, "color"> {
  children: ReactNode
}

export default function P({ children, ...props }: PProps) {
  return (
    <Text {...props} mb={3} as="p">
      {children}
    </Text>
  )
}
