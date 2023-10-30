import buttonVariants, {
  buttonBaseVariants,
} from "../../components/Button/variants"

import { dirname } from "path"
import { default as fs } from "fs-extra"

const variantFuncs = [
  {
    func: buttonVariants,
    props: {
      size: ["default", "small", "large", "xLarge"],
    },
  },
  {
    func: buttonBaseVariants,
    compoundVariants: [
      { variant: "solid", color: "accent" },
      { variant: "solid", color: "blue" },
      { variant: "solid", color: "gray" },
      { variant: "solid", color: "green" },
      { variant: "solid", color: "orange" },
      { variant: "solid", color: "purple" },
      { variant: "solid", color: "red" },
      { variant: "solid", color: "yellow" },
      { variant: "soft", color: "accent" },
      { variant: "soft", color: "blue" },
      { variant: "soft", color: "gray" },
      { variant: "soft", color: "green" },
      { variant: "soft", color: "orange" },
      { variant: "soft", color: "purple" },
      { variant: "soft", color: "red" },
      { variant: "soft", color: "yellow" },
      { variant: "outline", color: "accent" },
      { variant: "outline", color: "blue" },
      { variant: "outline", color: "gray" },
      { variant: "outline", color: "green" },
      { variant: "outline", color: "orange" },
      { variant: "outline", color: "purple" },
      { variant: "outline", color: "red" },
      { variant: "outline", color: "yellow" },
      { variant: "surface", color: "accent" },
      { variant: "surface", color: "blue" },
      { variant: "surface", color: "gray" },
      { variant: "surface", color: "green" },
      { variant: "surface", color: "orange" },
      { variant: "surface", color: "purple" },
      { variant: "surface", color: "red" },
      { variant: "surface", color: "yellow" },
      { variant: "surface", color: "accent" },
      { variant: "surface", color: "blue" },
      { variant: "surface", color: "gray" },
      { variant: "surface", color: "green" },
      { variant: "surface", color: "orange" },
      { variant: "surface", color: "purple" },
      { variant: "surface", color: "red" },
      { variant: "surface", color: "yellow" },
    ],
    props: {
      radius: ["none", "default", "md", "lg", "full"],
      fullWidth: [true, false],
    },
  },
]
function removeDuplicateWords(str: string) {
  const words = str.split(/\s+/) // Split string on spaces.
  const uniqueWords = new Set(words) // Track unique words using a Set.
  return [...uniqueWords].join(" ") // Convert back to a string.
}
export const buttonClasses = async () => {
  const variants = variantFuncs.reduce<string[]>(
    (acc, { func, props, compoundVariants }) => {
      const defaults = func({})
      acc.push(defaults)

      Object.entries(props).forEach(([prop, values]) => {
        values.forEach((value: any) => {
          acc.push(
            func({
              [prop]: {
                initial: value,
                sm: value,
                md: value,
                lg: value,
                xl: value,
                ["2xl"]: value,
              },
            }),
          )
        })
      })

      compoundVariants?.forEach((compoundVariant: any) => {
        acc.push(
          func({
            variant: {
              initial: compoundVariant.variant,
              sm: compoundVariant.variant,
              md: compoundVariant.variant,
              lg: compoundVariant.variant,
              xl: compoundVariant.variant,
              ["2xl"]: compoundVariant.variant,
            },
            color: {
              initial: compoundVariant.color,
              sm: compoundVariant.color,
              md: compoundVariant.color,
              lg: compoundVariant.color,
              xl: compoundVariant.color,
              ["2xl"]: compoundVariant.color,
            },
          }),
        )
      })

      return acc
    },
    [],
  )

  const content = `/// ${removeDuplicateWords(variants.join(" "))};`

  await fs.ensureDir(dirname("./dist/classes/buttonClasses.js"))

  fs.writeFileSync("./dist/classes/buttonClasses.js", content, "utf8")
}
