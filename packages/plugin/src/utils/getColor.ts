export default function getColor(
  color: string,
  scale: number,
  alpha?: boolean,
) {
  const colors = Array.from(Array(scale).keys()).reduce((acc, _, i) => {
    acc[i + 1] = `var(--${color}-${alpha ? "a" : ""}${i + 1})`
    return acc
  }, {} as Record<number | string, string>) as Record<string | number, string>
  if (!alpha) {
    colors["9-contrast"] = `var(--${color}-9-contrast)`
    colors["surface"] = `var(--${color}-surface)`
  }

  return colors
}
