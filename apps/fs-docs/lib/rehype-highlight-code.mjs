import { toString } from "hast-util-to-string"
import rangeParser from "parse-numeric-range"
import { refractor } from "refractor"
import jsx from "refractor/lang/jsx.js"
import tsx from "refractor/lang/tsx.js"
// Inspired by https://github.com/j0lv3r4/mdx-prism
import { visit } from "unist-util-visit"
import highlightLine from "./rehype-highlight-line.mjs"
import highlightWord from "./rehype-highlight-word.mjs"

refractor.register(tsx)
refractor.register(jsx)

export default function reHighLightCode() {
  function visitor(node, _index, parent) {
    if (
      !parent ||
      parent.tagName !== "pre" ||
      node.tagName !== "code" ||
      !node.properties.className
    ) {
      return
    }

    const [_, lang] = node.properties.className[0].split("-")
    const codeString = toString(node)

    let result = refractor.highlight(codeString, lang)
    const linesToHighlight = rangeParser(node.properties.line || "0")
    result = highlightLine(result, linesToHighlight)

    result = highlightWord(result)

    node.children = result
  }

  return (tree) => {
    visit(tree, "element", visitor)
  }
}
