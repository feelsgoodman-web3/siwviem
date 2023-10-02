import { ReactElement } from "react";
import { Text } from "@feelsgoodman/frogspawn/components";

interface DescriptionProps {
  children: ReactElement | string;
}

export default function Description({ children }: DescriptionProps) {
  const childText =
    typeof children === "string" ? children : children.props.children;

  return (
    <Text size="lg" mt={2} mb={10} color="gray" as="p">
      {childText}
    </Text>
  );
}
