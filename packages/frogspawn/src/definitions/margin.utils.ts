import { withBreakpoints } from "../utils"

import { marginDefs } from "./margin.props"
import { GetPropDefTypes } from "./types"

export type MarginProps = GetPropDefTypes<typeof marginDefs>

export function extractMarginProps<T extends MarginProps>(props: T) {
  const {
    m = marginDefs.m.default,
    mb = marginDefs.mb.default,
    me = marginDefs.me.default,
    ml = marginDefs.ml.default,
    mr = marginDefs.mr.default,
    ms = marginDefs.ms.default,
    mt = marginDefs.mt.default,
    mx = marginDefs.mx.default,
    my = marginDefs.my.default,
    ...rest
  } = props
  return {
    marginProps: {
      m,
      mb,
      me,
      ml,
      mr,
      ms,
      mt,
      mx,
      my,
    },
    ...rest,
  }
}

export function withMarginProps<T extends MarginProps>(props: T) {
  return [
    withBreakpoints("m", props.m),
    withBreakpoints("mb", props.mb),
    withBreakpoints("me", props.me),
    withBreakpoints("ml", props.ml),
    withBreakpoints("mr", props.mr),
    withBreakpoints("ms", props.ms),
    withBreakpoints("mt", props.mt),
    withBreakpoints("mx", props.mx),
    withBreakpoints("my", props.my),
  ]
    .filter(Boolean)
    .join(" ")
}
