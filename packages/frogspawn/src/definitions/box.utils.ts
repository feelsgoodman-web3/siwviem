import { withBreakpoints } from "../utils";

import { boxDefs } from "./box.props";
import { type GetPropDefTypes } from "./types";
import { extractPaddingProps, withPaddingProps } from "./padding.utils";
import { extractMarginProps, withMarginProps } from "./margin.utils";
import { extractPositionProps, withPositionProps } from "./position.utils";

export type BoxProps = GetPropDefTypes<typeof boxDefs>;
export function extractBoxProps<T extends BoxProps>(props: T) {
  const { paddingProps, ...paddingRest } = extractPaddingProps(props);
  const { positionProps, ...positionRest } = extractPositionProps(paddingRest);
  const { marginProps, ...marginRest } = extractMarginProps(positionRest);
  const {
    alignSelf = boxDefs.alignSelf.default,
    content = boxDefs.content.default,
    display = boxDefs.display.default,
    gap = boxDefs.gap.default,
    gapX = boxDefs.gapX.default,
    gapY = boxDefs.gapY.default,
    items = boxDefs.items.default,
    justify = boxDefs.justify.default,
    justifyItems = boxDefs.justifyItems.default,
    justifySelf = boxDefs.justifySelf.default,
    placeContent = boxDefs.placeContent.default,
    spaceX = boxDefs.spaceX.default,
    spaceY = boxDefs.spaceY.default,
    ...rest
  } = marginRest;
  return {
    layoutProps: {
      ...paddingProps,
      ...positionProps,
      ...marginProps,
      alignSelf,
      content,
      display,
      gap,
      gapX,
      gapY,
      items,
      justify,
      justifyItems,
      justifySelf,
      placeContent,
      spaceX,
      spaceY,
    },
    ...rest,
  };
}
export function withBoxProps<T extends BoxProps>(props: T): string {
  return [
    withPaddingProps(props),
    withMarginProps(props),
    withPositionProps(props),
    withBreakpoints("self", props.alignSelf),
    withBreakpoints("content", props.content),
    withBreakpoints("", props.display),
    withBreakpoints("gap", props.gap),
    withBreakpoints("gap-x", props.gapX),
    withBreakpoints("gap-y", props.gapY),
    withBreakpoints("items", props.items),
    withBreakpoints("justify", props.justify),
    withBreakpoints("justify-items", props.justifyItems),
    withBreakpoints("justify-self", props.justifySelf),
    withBreakpoints("place-content", props.placeContent),
    withBreakpoints("space-x", props.spaceX),
    withBreakpoints("space-y", props.spaceY),
  ]
    .filter(Boolean)
    .join(" ");
}
