import { VariantProps, cva } from "class-variance-authority"
import clsx from "clsx"
import { type ElementRef, forwardRef } from "react"
import { type TypographyProps } from "../../definitions"
import type { PropsWithoutRefOrColor } from "../../definitions/types"
import { Text } from "../Text"

type CodeElement = ElementRef<"code">
export interface CodeProps
  extends Omit<TypographyProps, "color">,
    PropsWithoutRefOrColor<"code">,
    VariantProps<typeof codeVariants> {
  asChild?: boolean
}

const codeVariants = cva("fs-code fs-py-[0.1em] fs-px-[0.25em] fs-rounded", {
  variants: {
    color: {
      accent: "fs-bg-accent-a-3 fs-text-accent-a-11",
      blue: "fs-bg-blue-a-3 fs-text-blue-a-11",
      gray: "fs-bg-gray-a-3 fs-text-gray-a-11",
      green: "fs-bg-green-a-3 fs-text-green-a-11",
      orange: "fs-bg-orange-a-3 fs-text-orange-a-11",
      purple: "fs-bg-purple-a-3 fs-text-purple-a-11",
      red: "fs-bg-red-a-3 fs-text-red-a-11",
      yellow: "fs-bg-yellow-a-3 fs-text-yellow-a-11",
    },
  },
  defaultVariants: {
    color: "accent",
  },
})

const Code = forwardRef<CodeElement, CodeProps>((props, ref) => {
  const { children, asChild, className, color, ...rest } = props

  return (
    <Text
      {...rest}
      asChild
      ref={ref}
      className={clsx("fs-Code", codeVariants({ className, color }))}
    >
      {asChild ? children : <code>{children}</code>}
    </Text>
  )
})

Code.displayName = "Code"

export default Code
