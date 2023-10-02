import type { ReactNode } from "react";
import { Heading } from "@feelsgoodman/frogspawn/components";
import { ComponentPropsWithRef } from "react";

interface H1Props extends Omit<ComponentPropsWithRef<"h1">, "color"> {
  children: ReactNode;
}

export default function H1({ children, ...props }: H1Props) {
  return (
    <Heading {...props} as="h1" mb={3} size="4xl" weight="bold">
      {children}
    </Heading>
  );
}
