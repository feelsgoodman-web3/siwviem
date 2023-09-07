import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";

import clsx from "clsx";

import { Box, type BoxProps } from "src/components/Box";
import type { GetPropDefTypes } from "src/definitions/types";
import { withBreakpoints } from "src/utils";

import { gridPropDefs } from "./props";

type GridElement = ElementRef<"div">;
type GridOwnProps = GetPropDefTypes<typeof gridPropDefs>;

export interface GridProps
  extends ComponentPropsWithoutRef<"div">,
    GridOwnProps,
    BoxProps {
  asChild?: boolean;
}

const Grid = forwardRef<GridElement, GridProps>((props, ref) => {
  const { cols, rows, autoCols, autoRows, flow, ...rest } = props;
  return (
    <Box
      {...rest}
      ref={ref}
      display="grid"
      className={clsx(
        rest.className,
        withBreakpoints("grid-cols", cols),
        withBreakpoints("grid-rows", rows),
        withBreakpoints("auto-cols", autoCols),
        withBreakpoints("auto-rows", autoRows),
        withBreakpoints("grid-flow", flow)
      )}
    />
  );
});

Grid.displayName = "Grid";

export default Grid;
