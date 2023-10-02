import { ComponentPropsWithRef, ReactNode } from "react";
import { Text } from "@feelsgoodman/frogspawn/components";

interface PProps extends Omit<ComponentPropsWithRef<"p">, "color"> {
  children: ReactNode;
}

export default function P({ children, ...props }: PProps) {
  return (
    <Text {...props} mb={3} as="p">
      {children}
    </Text>
  );
}
