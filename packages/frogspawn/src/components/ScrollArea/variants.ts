import { cva } from "class-variance-authority"
import { PropDef } from "../../definitions/types"

const sizes = ["sm", "md", "lg"]

export const scrollbarPropDefs = {
  size: {
    type: "enum",
    values: sizes,
    default: "sm",
    responsive: true,
  },
} satisfies {
  size: PropDef<typeof sizes[number]>
}

export const scrollbarVariants = cva("fs-scrollBar", {
  variants: {
    radius: {
      none: "",
      default: "fs-rounded",
      md: "fs-rounded-md",
      lg: "fs-rounded-lg",
      full: "fs-rounded-full",
    },
  },
  defaultVariants: {
    radius: "default",
  },
})
