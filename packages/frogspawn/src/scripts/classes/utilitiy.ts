import { dirname } from "path"
import { default as fs } from "fs-extra"

function removeDuplicateWords(str: string) {
  const words = str.split(/\s+/) // Split string on spaces.
  const uniqueWords = new Set(words) // Track unique words using a Set.
  return [...uniqueWords].join(" ") // Convert back to a string.
}
export const utilityClasses = async (safeList: string[], comp: string) => {
  const content = `/// ${removeDuplicateWords(safeList.join(" "))};`
  const fileName = `./dist/classes/${comp.toLowerCase()}Classes.js`
  await fs.ensureDir(dirname(fileName))
  fs.writeFileSync(fileName, content, "utf8")
}
