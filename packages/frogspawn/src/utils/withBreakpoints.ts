export type Breakpoints = "sm" | "md" | "lg" | "xl" | "2xl" | "initial"
export type Responsive<T> = T | Partial<Record<Breakpoints, T>>

/**
 * A helper to generate CSS classes that include breakpoints.
 *
 * Examples:
 * ```
 * const marginTop = '1'
 * withBreakpoints(marginTop, 'mt') // returns 'mt-1'
 *
 * const padding = { initial: '1', xs: '2', md: '3' }
 * withBreakpoints(padding, 'p') // returns 'p-1 xs:p-1 md:p-3'
 *
 * ```
 */
export default function withBreakpoints<T>(
  initialPrefix: string,
  value?: Responsive<T>,
) {
  if (typeof value === "undefined") return
  const prefix = initialPrefix ? `fs-${initialPrefix}` : "fs"
  if (typeof value === "string" || typeof value === "number") {
    return `${prefix}-${value}`
  }

  if (value && typeof value === "object") {
    return Object.entries(value)
      .map(([breakpoint, val]) => {
        const bpPrefix = breakpoint === "initial" ? "" : `${breakpoint}:`
        return `${bpPrefix}${prefix}-${val}`
      })
      .join(" ")
  }

  return
}
