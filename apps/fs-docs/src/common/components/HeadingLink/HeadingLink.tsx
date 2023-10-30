import {
  Anchor,
  Flex,
  Heading,
  type HeadingProps,
} from "@feelsgoodman/fs-ui/components"
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

import { ComponentPropsWithRef } from "react"
import styles from "./styles.module.css"

interface HeadingLink
  extends Pick<HeadingProps, "as" | "size">,
    Omit<ComponentPropsWithRef<"h3" | "h2">, "color"> {
  children: string
}

export default function HeadingLink({
  children,
  size,
  as,
  ...props
}: HeadingLink) {
  const id = children.toLowerCase().replace(/\s/g, "-")

  return (
    <Heading
      {...props}
      as={as}
      mb={2}
      mt={10}
      id={id}
      className={styles.headingLink}
    >
      <Anchor asChild color="default" size={size} weight="bold">
        <Link href={`#${id}`}>
          <Flex gap={2} items="center" asChild>
            <span>
              {children}
              <FontAwesomeIcon icon={faLink} fontSize={14} />
            </span>
          </Flex>
        </Link>
      </Anchor>
    </Heading>
  )
}
