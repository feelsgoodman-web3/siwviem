import { type ElementRef, forwardRef } from "react";
import { type TypographyProps } from "../../definitions";
import type { PropsWithoutRefOrColor } from "../../definitions/types";
import { Text } from "../Text";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

type AnchorElement = ElementRef<"a">;

export interface AnchorProps
  extends TypographyProps,
    VariantProps<typeof anchorVariants>,
    PropsWithoutRefOrColor<"a"> {
  asChild?: boolean;
}

const anchorVariants = cva("", {
  variants: {
    underline: {
      none: "",
      hover: "hover:fs-underline",
      always: "fs-underline",
    },
  },
  defaultVariants: {
    underline: "hover",
  },
});

const Anchor = forwardRef<AnchorElement, AnchorProps>((props, ref) => {
  const { children, asChild, color = "accent", underline, ...rest } = props;

  return (
    <Text
      {...rest}
      asChild
      ref={ref}
      role="link"
      color={color}
      className={clsx(anchorVariants({ underline }))}
    >
      {asChild ? children : <a>{children}</a>}
    </Text>
  );
});

Anchor.displayName = "Anchor";

export default Anchor;
