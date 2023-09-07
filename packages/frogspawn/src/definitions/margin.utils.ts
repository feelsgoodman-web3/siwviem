import { marginDefs } from "./margin.props";
import { GetPropDefTypes } from "./types";
import withBreakpoints from "../utils/withBreakpoints";

export type MarginProps = GetPropDefTypes<typeof marginDefs>;

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
  } = props;
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
  };
}

export function withMarginProps<T extends MarginProps>(props: T) {
  const { marginProps } = extractMarginProps(props);
  return Object.entries(marginProps)
    .reduce<string[]>((acc, [key, value]) => {
      if (typeof value === "undefined") return acc;
      const classes = withBreakpoints(key, value);

      if (classes) acc.push(classes);

      return acc;
    }, [])
    .filter(Boolean)
    .join(" ");
}
