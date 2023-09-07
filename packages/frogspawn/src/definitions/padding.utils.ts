import { paddingDefs } from "./padding.props";
import { GetPropDefTypes } from "./types";
import withBreakpoints from "../utils/withBreakpoints";

export type PaddingProps = GetPropDefTypes<typeof paddingDefs>;

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
  } = props;
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
  };
}

export function withPaddingProps<T extends PaddingProps>(props: T) {
  const { paddingProps } = extractPaddingProps(props);
  return Object.entries(paddingProps)
    .reduce<string[]>((acc, [key, value]) => {
      if (typeof value === "undefined") return acc;
      const classes = withBreakpoints(key, value);

      if (classes) acc.push(classes);

      return acc;
    }, [])
    .filter(Boolean)
    .join(" ");
}
