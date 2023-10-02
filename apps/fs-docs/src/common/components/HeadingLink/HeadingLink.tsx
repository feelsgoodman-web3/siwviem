import {
  type HeadingProps,
  Heading,
  Flex,
  Anchor,
} from "@feelsgoodman/frogspawn/components";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import Link from "next/link";

import styles from "./styles.module.css";
import { ComponentPropsWithRef } from "react";

interface HeadingLink
  extends Pick<HeadingProps, "as" | "size">,
    Omit<ComponentPropsWithRef<"h3" | "h2">, "color"> {
  children: string;
}

export default function HeadingLink({
  children,
  size,
  as,
  ...props
}: HeadingLink) {
  const id = children.toLowerCase().replace(/\s/g, "-");

  return (
    <Heading {...props} as={as} mb={2} mt={10} id={id}>
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
  );
}
