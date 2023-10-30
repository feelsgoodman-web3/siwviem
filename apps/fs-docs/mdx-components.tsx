import { Component, MDXComponents } from "mdx/types"

import { Code } from "@feelsgoodman/fs-ui/components/Code"
import { A } from "@fs/common/components/A"
import { Description } from "@fs/common/components/Description"
import { H1 } from "@fs/common/components/H1"
import { H2 } from "@fs/common/components/H2"
import { H3 } from "@fs/common/components/H3"
import { P } from "@fs/common/components/P"
import { Pre } from "@fs/common/components/Pre"
import { DetailedHTMLProps, HTMLAttributes } from "react"

// @ts-ignore
interface MDXComponentsExtended extends MDXComponents {
  code: Component<
    Omit<
      DetailedHTMLProps<
        Omit<HTMLAttributes<HTMLElement>, "style" | "color"> & {
          line: string | number
        },
        HTMLElement
      >,
      "ref"
    >
  >
}

export function useMDXComponents(
  components: MDXComponentsExtended,
): MDXComponentsExtended {
  // @ts-ignore
  return {
    ...components,
    a: A as MDXComponentsExtended["a"],
    code: ({ className, line, children, ...props }) => {
      // if it's a codeblock (``` block in markdown), it'll have a className from prism
      const isInlineCode = !className
      return isInlineCode ? (
        <Code className={className} {...props}>
          {children}
        </Code>
      ) : (
        <code
          className={className}
          {...props}
          data-invert-line-highlight={line !== undefined}
        >
          {children}
        </code>
      )
    },
    Description,
    h1: H1 as MDXComponentsExtended["h1"],
    h2: H2 as MDXComponentsExtended["h2"],
    h3: H3 as MDXComponentsExtended["h3"],
    p: P as MDXComponentsExtended["p"],
    pre: Pre as MDXComponentsExtended["pre"],
  }
}
