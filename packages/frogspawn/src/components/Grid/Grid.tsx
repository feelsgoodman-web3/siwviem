import { type ElementRef, forwardRef } from "react";

import clsx from "clsx";

import { Box, type BoxProps } from "../Box";
import type {
  GetPropDefTypes,
  PropsWithoutRefOrColor,
} from "../../definitions/types";
import { withBreakpoints } from "../../utils";

import { gridPropDefs } from "./props";

type GridElement = ElementRef<"div">;
type GridOwnProps = GetPropDefTypes<typeof gridPropDefs>;

export interface GridProps
  extends PropsWithoutRefOrColor<"div">,
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
