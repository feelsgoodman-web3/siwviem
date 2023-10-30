import { Text } from "@feelsgoodman/fs-ui/components"
import { ReactElement } from "react"

interface DescriptionProps {
  children: ReactElement | string
}

export default function Description({ children }: DescriptionProps) {
  const childText =
    typeof children === "string" ? children : children.props.children

  return (
    <Text size="lg" mt={2} mb={10} color="gray" as="p">
      {childText}
    </Text>
  )
}
