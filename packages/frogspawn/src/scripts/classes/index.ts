import { buttonClasses } from "./button"
import {
  boxClassList,
  flexClassList,
  marginClassList,
  paddingClassList,
  positionClassList,
  typographyClassList,
} from "./classLists"
import { utilityClasses } from "./utilitiy"

const run = async () => {
  await buttonClasses()
  console.log("Button classes generated")
  await utilityClasses(boxClassList, "box")
  console.log("Box classes generated")
  await utilityClasses(flexClassList, "flex")
  console.log("Flex classes generated")
  await utilityClasses(marginClassList, "margin")
  console.log("Margin classes generated")
  await utilityClasses(paddingClassList, "padding")
  console.log("Padding classes generated")
  await utilityClasses(typographyClassList, "typography")
  console.log("Text classes generated")
  await utilityClasses(positionClassList, "position")
  console.log("Position classes generated")
}

run()
