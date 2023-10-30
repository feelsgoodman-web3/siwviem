import { withBreakpoints } from "../utils"

import { positionDefs } from "./position.props"
import { GetPropDefTypes } from "./types"

export type PositionProps = GetPropDefTypes<typeof positionDefs>

export function extractPositionProps<T extends PositionProps>(props: T) {
  const {
    position = positionDefs.position.default,
    top = positionDefs.top.default,
    bottom = positionDefs.bottom.default,
    left = positionDefs.left.default,
    right = positionDefs.right.default,
    insetX = positionDefs.insetX.default,
    insetY = positionDefs.insetY.default,
    inset = positionDefs.inset.default,
    start = positionDefs.start.default,
    end = positionDefs.end.default,
    ...rest
  } = props
  return {
    positionProps: {
      position,
      top,
      bottom,
      left,
      right,
      insetX,
      insetY,
      inset,
      start,
      end,
    },
    ...rest,
  }
}

export function withPositionProps<T extends PositionProps>(props: T): string {
  return [
    withBreakpoints("", props.position),
    withBreakpoints("top", props.top),
    withBreakpoints("bottom", props.bottom),
    withBreakpoints("left", props.left),
    withBreakpoints("right", props.right),
    withBreakpoints("inset-x", props.insetX),
    withBreakpoints("inset-y", props.insetY),
    withBreakpoints("inset", props.inset),
    withBreakpoints("start", props.start),
    withBreakpoints("end", props.end),
  ]
    .filter(Boolean)
    .join(" ")
}
