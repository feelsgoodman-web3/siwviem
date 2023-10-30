import type { ReactNode } from "react"

import clsx from "clsx"
import { PropsWithoutRefOrColor } from "../../definitions/types"
import { Flex, FlexProps } from "../Flex"

interface AppBarProps extends PropsWithoutRefOrColor<"div"> {
  children?: ReactNode
  position?: FlexProps["position"]
}
export default function AppBar({
  children,
  position,
  className,
  ...props
}: AppBarProps) {
  return (
    <Flex
      {...props}
      position={position}
      px={4}
      gap={6}
      items="center"
      className={clsx(
        "fs-AppBar",
        className,
        "fs-bg-panel-solid fs-h-14 md:fs-h-16 fs-shadow-[0_1px_var(--tw-shadow-color)] fs-justify-between",
      )}
      asChild
    >
      <header>{children}</header>
    </Flex>
  )
}
