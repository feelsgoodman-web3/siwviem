import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";

import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

import {
  withBoxProps,
  extractBoxProps,
  type BoxProps as LayoutProps,
} from "src/definitions";

type BoxElement = ElementRef<"div">;

export interface BoxProps extends ComponentPropsWithoutRef<"div">, LayoutProps {
  asChild?: boolean;
}

const Box = forwardRef<BoxElement, BoxProps>((props, ref) => {
  const { layoutProps, asChild, ...rest } = extractBoxProps(props);
  const Element = asChild ? Slot : "div";
  return (
    <Element
      {...rest}
      ref={ref}
      className={clsx(rest.className, withBoxProps(layoutProps))}
    />
  );
});

Box.displayName = "Box";

export default Box;
