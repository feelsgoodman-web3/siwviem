import { direction, wrap } from "../../components/Flex/props"
import {
  alignSelf,
  alignValues,
  bottom,
  content,
  display,
  end,
  gap,
  gapX,
  gapY,
  insert,
  insetX,
  insetY,
  items,
  justify,
  justifyItems,
  justifySelf,
  left,
  m,
  mb,
  me,
  ml,
  mr,
  ms,
  mt,
  mx,
  my,
  p,
  pb,
  pe,
  pl,
  placeContent,
  position,
  pr,
  ps,
  pt,
  px,
  py,
  right,
  size,
  spaceX,
  spaceY,
  start,
  top,
  weight,
} from "../../definitions"

const breakpoints = ["sm", "md", "lg", "xl", "2xl"]

export default function makeClassList(
  prefix: string,
  values: readonly (string | number)[],
) {
  return values.flatMap((value) => {
    const className = `fs-${prefix}-${value}`
    return [className, ...breakpoints.map((bp) => `${bp}:${className}`)]
  })
}

export const boxClassList = [
  makeClassList("self", alignSelf),
  makeClassList("content", content),
  makeClassList("", display),
  makeClassList("gap", gap),
  makeClassList("gap-x", gapX),
  makeClassList("gap-y", gapY),
  makeClassList("items", items),
  makeClassList("justify", justify),
  makeClassList("justify-items", justifyItems),
  makeClassList("justify-self", justifySelf),
  makeClassList("place-content", placeContent),
  makeClassList("space-x", spaceX),
  makeClassList("space-y", spaceY),
].flat()

export const flexClassList = [
  makeClassList("flex", wrap),
  makeClassList("flex", direction),
].flat()

export const marginClassList = [
  makeClassList("m", m),
  makeClassList("mb", mb),
  makeClassList("me", me),
  makeClassList("ml", ml),
  makeClassList("mr", mr),
  makeClassList("ms", ms),
  makeClassList("mt", mt),
  makeClassList("mx", mx),
  makeClassList("my", my),
].flat()

export const paddingClassList = [
  makeClassList("p", p),
  makeClassList("pb", pb),
  makeClassList("pe", pe),
  makeClassList("pl", pl),
  makeClassList("pr", pr),
  makeClassList("ps", ps),
  makeClassList("pt", pt),
  makeClassList("px", px),
  makeClassList("py", py),
].flat()

export const typographyClassList = [
  makeClassList("text", size),
  makeClassList("font", weight),
  makeClassList("text", alignValues),
].flat()

export const positionClassList = [
  makeClassList("", position),
  makeClassList("top", top),
  makeClassList("bottom", bottom),
  makeClassList("left", left),
  makeClassList("right", right),
  makeClassList("inset-x", insetX),
  makeClassList("inset-y", insetY),
  makeClassList("inset", insert),
  makeClassList("start", start),
  makeClassList("end", end),
].flat()
