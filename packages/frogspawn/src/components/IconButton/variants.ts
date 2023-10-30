import { cvaWithBreakpoints } from "../../utils/cvaWithBreakpoints"

const iconButtonVariants = cvaWithBreakpoints("fs-iconButton", {
  variants: {
    size: {
      default: "fs-h-8 fs-w-8 fs-text-base",
      small: "fs-h-6 fs-w-6 fs-text-base",
      large: "fs-h-10 fs-w-10 fs-text-lg",
      xLarge: "fs-h-12 fs-w-12 fs-text-xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export default iconButtonVariants
