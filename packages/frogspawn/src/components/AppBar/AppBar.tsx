import type { ReactNode } from "react";

import { Flex, FlexProps } from "../Flex";

interface AppBarProps {
  children?: ReactNode;
  position?: FlexProps["position"];
}
export default function AppBar({ children, position }: AppBarProps) {
  return (
    <Flex
      position={position}
      px={4}
      gap={6}
      items="center"
      className="fs-bg-panel-solid fs-h-14 md:fs-h-16 fs-shadow-[0_1px_var(--tw-shadow-color)]"
      asChild
    >
      <header>{children}</header>
    </Flex>
  );
}
