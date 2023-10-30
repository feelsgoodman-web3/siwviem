import type * as CLSX from "clsx"
import { clsx } from "clsx"

export type ClassValue = CLSX.ClassValue

export type ClassProp =
  | {
      class: ClassValue
      className?: never
    }
  | { class?: never; className: ClassValue }
  | { class?: never; className?: never }

export type OmitUndefined<T> = T extends undefined ? never : T
export type StringToBoolean<T> = T extends "true" | "false" ? boolean : T

export type VariantProps<Component extends (...args: any) => any> = Omit<
  OmitUndefined<Parameters<Component>[0]>,
  "class" | "className"
>

type Breakpoints = "sm" | "md" | "lg" | "xl" | "2xl"

const falsyToString = <T>(value: T) =>
  typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value

/* cx
  ============================================ */

export const cx = clsx

/* cva
  ============================================ */

type ConfigSchema = Record<string, Record<string, ClassValue>>

type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?:
    | StringToBoolean<keyof T[Variant]>
    | null
    | undefined
    | ({
        [K in Breakpoints]?:
          | StringToBoolean<keyof T[Variant]>
          | null
          | undefined
      } & {
        initial: StringToBoolean<keyof T[Variant]>
      })
}
type ConfigVariantsMulti<T extends ConfigSchema> = {
  [Variant in keyof T]?:
    | StringToBoolean<keyof T[Variant]>
    | StringToBoolean<keyof T[Variant]>[]
    | undefined
}

type Config<T> = T extends ConfigSchema
  ? {
      variants?: T
      defaultVariants?: ConfigVariants<T>
      compoundVariants?: (T extends ConfigSchema
        ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & ClassProp
        : ClassProp)[]
    }
  : never

type Props<T> = T extends ConfigSchema
  ? ConfigVariants<T> & ClassProp
  : ClassProp

type InputValue = {
  [key in Breakpoints | "initial"]?: any
}

type InputFormat = {
  [key: string]: InputValue
}

type OutputFormat = {
  [key in Breakpoints | "initial"]?: {
    [key: string]: any
  }
}

function transform(input?: InputFormat): OutputFormat {
  if (!input) return {}

  return Object.keys(input).reduce((acc: OutputFormat, key: string) => {
    const innerObj = input[key]
    for (const breakpoint in innerObj) {
      const bp = breakpoint as Breakpoints | "initial"
      if (innerObj.hasOwnProperty(breakpoint)) {
        if (!acc[bp]) {
          acc[bp] = { [key]: innerObj[bp] }
        } else {
          acc[bp] = {
            ...acc[bp],
            [key]: innerObj[bp],
          }
        }
      }
    }
    return acc
  }, {})
}

function hasBreakpointKey<T extends ConfigSchema>(
  obj?: ConfigVariants<T>,
): boolean {
  if (!obj) return false
  const breakpointKeys: (Breakpoints | "initial")[] = [
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "initial",
  ]
  return breakpointKeys.some((key) => key in obj)
}

function hasKey<O extends object>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj
}
export const cvaWithBreakpoints =
  <T>(base?: ClassValue, config?: Config<T>) =>
  (props?: Props<T>) => {
    if (config?.variants == null)
      return cx(base, props?.class, props?.className)

    const { variants, defaultVariants } = config

    const processBreakpointVariant = (
      variantProp: Props<T>[keyof Props<T>] & object,
      variant: keyof T,
    ): ClassValue[] | null => {
      return Object.keys(variantProp).map((v) => {
        if (props && hasKey(props, variant)) {
          if (
            typeof props[variant] === "object" &&
            hasKey(props[variant] as object, v)
          ) {
            const bpVariantProp = props[variant][v]
            const variantKey = falsyToString(bpVariantProp)

            if (variants && variant in variants) {
              if (v === "initial") {
                return variants?.[variant]?.[variantKey] || null
              }

              return variants?.[variant]?.[variantKey]
                ? cx(variants?.[variant]?.[variantKey]).replace(
                    /([^\s]+)/g,
                    `${v}:$1`,
                  )
                : null
            }
          }
        }

        return null
      })
    }

    const getVariantClassName = (
      variant: keyof typeof variants,
      variantProp?: Props<T>[keyof Props<T>],
    ): ClassValue => {
      const defaultVariantProp = defaultVariants?.[variant]

      if (
        typeof variantProp === "undefined" &&
        typeof defaultVariantProp === "undefined"
      )
        return null

      const variantKey = (falsyToString(variantProp) ||
        falsyToString(
          defaultVariantProp,
        )) as keyof typeof variants[typeof variant]
      return variants[variant]?.[variantKey] || null
    }

    const getVariantClassNames = Object.keys(variants).map(
      (variant: keyof typeof variants) => {
        const variantProp: Props<T>[keyof Props<T>] | undefined =
          props?.[variant as keyof typeof props]

        if (variantProp === null) return null

        if (typeof variantProp === "object" && hasBreakpointKey(variantProp)) {
          return processBreakpointVariant(variantProp, variant)
        }

        return getVariantClassName(variant, variantProp)
      },
    )

    const propsWithoutUndefined: undefined | Record<string, unknown> =
      props &&
      Object.entries(props).reduce((acc, [key, value]) => {
        if (value === undefined) {
          return acc
        }

        acc[key] = value
        return acc
      }, {} as Record<string, unknown>)

    const getCompoundVariantClassNames = config?.compoundVariants?.reduce(
      (
        acc,
        { class: cvClass, className: cvClassName, ...compoundVariantOptions },
      ) =>
        Object.entries(compoundVariantOptions).every(([key, value]) =>
          Array.isArray(value)
            ? value.includes(
                {
                  ...defaultVariants,
                  ...propsWithoutUndefined,
                }[key],
              )
            : {
                ...defaultVariants,
                ...propsWithoutUndefined,
              }[key] === value,
        )
          ? [...acc, cvClass, cvClassName]
          : acc,
      [] as ClassValue[],
    )

    const getBreakpointCompoundVariantClassNames = (
      config?.compoundVariants || []
    ).reduce<ClassValue[]>((acc, compoundVariant) => {
      const {
        class: cvClass,
        className: cvClassName,
        ...options
      } = compoundVariant
      if (!propsWithoutUndefined) return acc
      const breakPointsProps = transform(propsWithoutUndefined as InputValue)

      for (const [bpKey, bpValue] of Object.entries(breakPointsProps)) {
        const matches = Object.entries(options).every(([key, value]) => {
          if (typeof bpValue === "object" && bpValue && hasKey(bpValue, key)) {
            const propValue = bpValue[key]
            return Array.isArray(value)
              ? value.includes(propValue)
              : propValue === value
          }

          return null
        })

        if (matches) {
          if (bpKey === "initial") {
            acc.push(cvClass, cvClassName)
          } else {
            acc.push(
              cx(cvClass).replace(/([^\s]+)/g, `${bpKey}:$1`),
              cx(cvClassName).replace(/([^\s]+)/g, `${bpKey}:$1`),
            )
          }
        }
      }

      return acc
    }, [])

    return cx(
      base,
      getVariantClassNames,
      getCompoundVariantClassNames,
      getBreakpointCompoundVariantClassNames,
      props?.class,
      props?.className,
    )
  }
