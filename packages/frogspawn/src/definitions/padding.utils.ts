import { withBreakpoints } from "../utils"
import { paddingDefs } from "./padding.props"
import { GetPropDefTypes } from "./types"

export type PaddingProps = GetPropDefTypes<typeof paddingDefs>

export function extractPaddingProps<T extends PaddingProps>(props: T) {
  const {
    p = paddingDefs.p.default,
    pb = paddingDefs.pb.default,
    pe = paddingDefs.pe.default,
    pl = paddingDefs.pl.default,
    pr = paddingDefs.pr.default,
    ps = paddingDefs.ps.default,
    pt = paddingDefs.pt.default,
    px = paddingDefs.px.default,
    py = paddingDefs.py.default,
    ...rest
  } = props
  return {
    paddingProps: {
      p,
      pb,
      pe,
      pl,
      pr,
      ps,
      pt,
      px,
      py,
    },
    ...rest,
  }
}

export function withPaddingProps<T extends PaddingProps>(props: T) {
  return [
    withBreakpoints("p", props.p),
    withBreakpoints("pb", props.pb),
    withBreakpoints("pe", props.pe),
    withBreakpoints("pl", props.pl),
    withBreakpoints("pr", props.pr),
    withBreakpoints("ps", props.ps),
    withBreakpoints("pt", props.pt),
    withBreakpoints("px", props.px),
    withBreakpoints("py", props.py),
  ]
    .filter(Boolean)
    .join(" ")
}
