import { cvaWithBreakpoints } from "../../utils/cvaWithBreakpoints"

export const buttonBaseVariants = cvaWithBreakpoints(
  "fs-inline-flex fs-gap-2 fs-items-center fs-font-medium fs-justify-center fs-transition-colors focus-visible:fs-outline-none disabled:fs-pointer-events-none active:fs-brightness-110",
  {
    variants: {
      variant: {
        solid: "",
        soft: "",
        outline: "",
        surface: "",
        ghost: "",
      },
      color: {
        accent: "",
        blue: "",
        gray: "",
        green: "",
        orange: "",
        purple: "",
        red: "",
        yellow: "",
      },
      radius: {
        none: "",
        default: "fs-rounded",
        md: "fs-rounded-md",
        lg: "fs-rounded-lg",
        full: "fs-rounded-full",
      },
      fullWidth: {
        true: "fs-w-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        color: "accent",
        class:
          "fs-bg-accent-9 fs-text-accent-9-contrast hover:fs-bg-accent-10 focus-visible:fs-shadow-[0_0_0_2px_var(--accent-3)_,_0_0_0_4px_var(--accent-a8)]",
      },
      {
        variant: "solid",
        color: "blue",
        class:
          "fs-bg-blue-9 fs-text-blue-9-contrast hover:fs-bg-blue-10 focus-visible:fs-shadow-[0_0_0_2px_var(--blue-3)_,_0_0_0_4px_var(--blue-a8)]",
      },
      {
        variant: "solid",
        color: "gray",
        class:
          "fs-bg-gray-9 fs-text-gray-9-contrast hover:fs-bg-gray-10 focus-visible:fs-shadow-[0_0_0_2px_var(--gray-3)_,_0_0_0_4px_var(--gray-a8)]",
      },
      {
        variant: "solid",
        color: "green",
        class:
          "fs-bg-green-9 fs-text-green-9-contrast hover:fs-bg-green-10 focus-visible:fs-shadow-[0_0_0_2px_var(--green-3)_,_0_0_0_4px_var(--green-a8)]",
      },
      {
        variant: "solid",
        color: "orange",
        class:
          "fs-bg-orange-9 fs-text-orange-9-contrast hover:fs-bg-orange-10 focus-visible:fs-shadow-[0_0_0_2px_var(--orange-3)_,_0_0_0_4px_var(--orange-a8)]",
      },
      {
        variant: "solid",
        color: "purple",
        class:
          "fs-bg-purple-9 fs-text-purple-9-contrast hover:fs-bg-purple-10 focus-visible:fs-shadow-[0_0_0_2px_var(--purple-3)_,_0_0_0_4px_var(--purple-a8)]",
      },
      {
        variant: "solid",
        color: "red",
        class:
          "fs-bg-red-9 fs-text-red-9-contrast hover:fs-bg-red-10 focus-visible:fs-shadow-[0_0_0_2px_var(--red-3)_,_0_0_0_4px_var(--red-a8)]",
      },
      {
        variant: "solid",
        color: "yellow",
        class:
          "fs-bg-yellow-9 fs-text-yellow-9-contrast hover:fs-bg-yellow-10 focus-visible:fs-shadow-[0_0_0_2px_var(--yellow-3)_,_0_0_0_4px_var(--yellow-a8)]",
      },
      {
        variant: "soft",
        color: "accent",
        class:
          "fs-bg-accent-a-3 fs-text-accent-a-11 hover:fs-bg-accent-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--accent-8)_,_0_0_0_1px_var(--accent-a8)]",
      },
      {
        variant: "soft",
        color: "blue",
        class:
          "fs-bg-blue-a-3 fs-text-blue-a-11 hover:fs-bg-blue-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--blue-8)_,_0_0_0_1px_var(--blue-a8)]",
      },
      {
        variant: "soft",
        color: "gray",
        class:
          "fs-bg-gray-a-3 fs-text-gray-a-11 hover:fs-bg-gray-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--gray-8)_,_0_0_0_1px_var(--gray-a8)]",
      },
      {
        variant: "soft",
        color: "green",
        class:
          "fs-bg-green-a-3 fs-text-green-a-11 hover:fs-bg-green-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--green-8)_,_0_0_0_1px_var(--green-a8)]",
      },
      {
        variant: "soft",
        color: "orange",
        class:
          "fs-bg-orange-a-3 fs-text-orange-a-11 hover:fs-bg-orange-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--orange-8)_,_0_0_0_1px_var(--orange-a8)]",
      },
      {
        variant: "soft",
        color: "purple",
        class:
          "fs-bg-purple-a-3 fs-text-purple-a-11 hover:fs-bg-purple-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--purple-8)_,_0_0_0_1px_var(--purple-a8)]",
      },
      {
        variant: "soft",
        color: "red",
        class:
          "fs-bg-red-a-3 fs-text-red-a-11 hover:fs-bg-red-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--red-8)_,_0_0_0_1px_var(--red-a8)]",
      },
      {
        variant: "soft",
        color: "yellow",
        class:
          "fs-bg-yellow-a-3 fs-text-yellow-a-11 hover:fs-bg-yellow-a-4 focus-visible:fs-shadow-[0_0_0_1px_var(--yellow-8)_,_0_0_0_1px_var(--yellow-a8)]",
      },
      {
        variant: "outline",
        color: "accent",
        class:
          "fs-shadow-[inset_0_0_0_1px_var(--accent-a8)] fs-text-accent-a-11 hover:fs-bg-accent-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--accent-8)_,_0_0_0_1px_var(--accent-a8)]",
      },
      {
        variant: "outline",
        color: "blue",
        class:
          "fs-shadow-[inset_0_0_0_1px_var(--blue-a8)] fs-text-blue-a-11 hover:fs-bg-blue-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--blue-8)_,_0_0_0_1px_var(--blue-a8)]",
      },
      {
        variant: "outline",
        color: "gray",
        class:
          "fs-shadow-[inset_0_0_0_1px_var(--gray-a8)] fs-text-gray-a-11 hover:fs-bg-gray-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--gray-8)_,_0_0_0_1px_var(--gray-a8)]",
      },
      {
        variant: "outline",
        color: "green",
        class:
          "fs-shadow-[inset_0_0_0_1px_var(--green-a8)] fs-text-green-a-11 hover:fs-bg-green-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--green-8)_,_0_0_0_1px_var(--green-a8)]",
      },
      {
        variant: "outline",
        color: "orange",
        class:
          "fs-shadow-[inset_0_0_0_1px_var(--orange-a8)] fs-text-orange-a-11 hover:fs-bg-orange-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--orange-8)_,_0_0_0_1px_var(--orange-a8)]",
      },
      {
        variant: "outline",
        color: "purple",
        class:
          "fs-shadow-[inset_0_0_0_1px_var(--purple-a8)] fs-text-purple-a-11 hover:fs-bg-purple-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--purple-8)_,_0_0_0_1px_var(--purple-a8)]",
      },
      {
        variant: "outline",
        color: "red",
        class:
          "fs-shadow-[inset_0_0_0_1px_var(--red-a8)] fs-text-red-a-11 hover:fs-bg-red-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--red-8)_,_0_0_0_1px_var(--red-a8)]",
      },
      {
        variant: "outline",
        color: "yellow",
        class:
          "fs-shadow-[inset_0_0_0_1px_var(--yellow-a8)] fs-text-yellow-a-11 hover:fs-bg-yellow-a-2 focus-visible:fs-shadow-[0_0_0_1px_var(--yellow-8)_,_0_0_0_1px_var(--yellow-a8)]",
      },
      {
        variant: "surface",
        color: "accent",
        class:
          "fs-bg-accent-surface fs-shadow-[inset_0_0_0_1px_var(--accent-a7)] fs-text-accent-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--accent-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--accent-8)_,_0_0_0_1px_var(--accent-a8)]",
      },
      {
        variant: "surface",
        color: "blue",
        class:
          "fs-bg-blue-surface fs-shadow-[inset_0_0_0_1px_var(--blue-a7)] fs-text-blue-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--blue-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--blue-8)_,_0_0_0_1px_var(--blue-a8)]",
      },
      {
        variant: "surface",
        color: "gray",
        class:
          "fs-bg-gray-surface fs-shadow-[inset_0_0_0_1px_var(--gray-a7)] fs-text-gray-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--gray-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--gray-8)_,_0_0_0_1px_var(--gray-a8)]",
      },
      {
        variant: "surface",
        color: "green",
        class:
          "fs-bg-green-surface fs-shadow-[inset_0_0_0_1px_var(--green-a7)] fs-text-green-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--green-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--green-8)_,_0_0_0_1px_var(--green-a8)]",
      },
      {
        variant: "surface",
        color: "orange",
        class:
          "fs-bg-orange-surface fs-shadow-[inset_0_0_0_1px_var(--orange-a7)] fs-text-orange-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--orange-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--orange-8)_,_0_0_0_1px_var(--orange-a8)]",
      },
      {
        variant: "surface",
        color: "purple",
        class:
          "fs-bg-purple-surface fs-shadow-[inset_0_0_0_1px_var(--purple-a7)] fs-text-purple-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--purple-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--purple-8)_,_0_0_0_1px_var(--purple-a8)]",
      },
      {
        variant: "surface",
        color: "red",
        class:
          "fs-bg-red-surface fs-shadow-[inset_0_0_0_1px_var(--red-a7)] fs-text-red-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--red-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--red-8)_,_0_0_0_1px_var(--red-a8)]",
      },
      {
        variant: "surface",
        color: "yellow",
        class:
          "fs-bg-yellow-surface fs-shadow-[inset_0_0_0_1px_var(--yellow-a7)] fs-text-yellow-a-11 hover:fs-shadow-[inset_0_0_0_1px_var(--yellow-a7)] focus-visible:fs-shadow-[0_0_0_1px_var(--yellow-8)_,_0_0_0_1px_var(--yellow-a8)]",
      },
      {
        variant: "surface",
        color: "accent",
        class:
          "fs-text-accent-a-11 hover:fs-bg-accent-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--accent-8)_,_0_0_0_1px_var(--accent-a8)]",
      },
      {
        variant: "surface",
        color: "blue",
        class:
          "fs-text-blue-a-11 hover:fs-bg-blue-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--blue-8)_,_0_0_0_1px_var(--blue-a8)]",
      },
      {
        variant: "surface",
        color: "gray",
        class:
          "fs-text-gray-a-11 hover:fs-bg-gray-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--gray-8)_,_0_0_0_1px_var(--gray-a8)]",
      },
      {
        variant: "surface",
        color: "green",
        class:
          "fs-text-green-a-11 hover:fs-bg-green-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--green-8)_,_0_0_0_1px_var(--green-a8)]",
      },
      {
        variant: "surface",
        color: "orange",
        class:
          "fs-text-orange-a-11 hover:fs-bg-orange-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--orange-8)_,_0_0_0_1px_var(--orange-a8)]",
      },
      {
        variant: "surface",
        color: "purple",
        class:
          "fs-text-purple-a-11 hover:fs-bg-purple-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--purple-8)_,_0_0_0_1px_var(--purple-a8)]",
      },
      {
        variant: "surface",
        color: "red",
        class:
          "fs-text-red-a-11 hover:fs-bg-red-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--red-8)_,_0_0_0_1px_var(--red-a8)]",
      },
      {
        variant: "surface",
        color: "yellow",
        class:
          "fs-text-yellow-a-11 hover:fs-bg-yellow-a-3 focus-visible:fs-shadow-[0_0_0_1px_var(--yellow-8)_,_0_0_0_1px_var(--yellow-a8)]",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "accent",
      radius: "default",
      fullWidth: false,
    },
  },
)

const buttonVariants = cvaWithBreakpoints("fs-button", {
  variants: {
    size: {
      default: "fs-px-3 fs-py-2 fs-text-sm",
      small: "fs-px-3 fs-py-2 fs-text-xs fs-text-sm",
      large: "fs-px-4 fs-py-3 fs-text-md",
      xLarge: "fs-px-6 fs-py-3 fs-text-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export default buttonVariants
