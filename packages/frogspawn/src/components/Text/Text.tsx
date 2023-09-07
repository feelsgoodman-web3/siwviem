import { type ElementRef, forwardRef } from "react";
import {
  extractMarginProps,
  extractTypographyProps,
  TypographyProps,
  withMarginProps,
  withTypographyProps,
} from "src/definitions";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import type { PropsWithoutRefOrColor } from "src/definitions/types";

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
    ...rest
  } = extractTypographyProps(marginRest);

  return (
    <Slot
      {...rest}
      ref={ref}
      className={clsx(
        className,
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
