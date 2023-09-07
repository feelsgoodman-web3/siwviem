import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";

import clsx from "clsx";

import { Box, type BoxProps } from "src/components/Box";
import type { GetPropDefTypes } from "src/definitions/types";
import { withBreakpoints } from "src/utils";

import { flexPropDefs } from "./props";

type FlexElement = ElementRef<"div">;
type FlexOwnProps = GetPropDefTypes<typeof flexPropDefs>;

export interface FlexProps
  extends ComponentPropsWithoutRef<"div">,
    FlexOwnProps,
    BoxProps {
  asChild?: boolean;
}

const Flex = forwardRef<FlexElement, FlexProps>((props, ref) => {
  const { wrap, direction, ...rest } = props;
  return (
    <Box
      {...rest}
      ref={ref}
      display="flex"
      className={clsx(
        rest.className,
        withBreakpoints("flex-wrap", wrap),
        withBreakpoints("flex", direction)
      )}
    />
  );
});

Flex.displayName = "Flex";

export default Flex;
