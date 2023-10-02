export default function makeSafeList(
  prefix: string,
  values: readonly (string | number)[]
) {
  return {
    pattern: new RegExp(`${prefix}-(${values.join("|")})`),
    variants: ["sm", "md", "lg", "xl", "2xl"],
  };
}
