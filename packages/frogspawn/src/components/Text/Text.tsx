import { type ElementRef, forwardRef } from "react";

import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";

import {
  extractMarginProps,
  extractTypographyProps,
  TypographyProps,
  withMarginProps,
  withTypographyProps,
  textColorVariants,
} from "../../definitions";
import type { PropsWithoutRefOrColor } from "../../definitions/types";

type TextElement = ElementRef<"span">;
type TextAsChildProps = {
  asChild?: boolean;
  as?: never;
} & PropsWithoutRefOrColor<"span">;

type TextSpanProps = {
  as?: "span";
  asChild?: never;
} & PropsWithoutRefOrColor<"span">;
type TextDivProps = {
  as?: "div";
  asChild?: never;
} & PropsWithoutRefOrColor<"div">;

type TextPProps = { as?: "p"; asChild?: never } & PropsWithoutRefOrColor<"p">;

export type TextProps = TypographyProps &
  (TextAsChildProps | TextSpanProps | TextDivProps | TextPProps);

const Text = forwardRef<TextElement, TextProps>((props, ref) => {
  const { marginProps, ...marginRest } = extractMarginProps(props);
  const {
    typographyProps,
    children,
    className,
    asChild,
    as: Tag = "span",
    color,
    ...rest
  } = extractTypographyProps(marginRest);

  return (
    <Slot
      {...rest}
      ref={ref}
      className={clsx(
        className,
        textColorVariants({ color }),
        withMarginProps(marginProps),
        withTypographyProps(typographyProps)
      )}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  );
});

Text.displayName = "Text";

export default Text;
