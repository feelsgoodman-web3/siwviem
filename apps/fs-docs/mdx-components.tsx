import { MDXComponents } from "mdx/types";

import { H1 } from "@fs/common/components/H1";
import { H2 } from "@fs/common/components/H2";
import { H3 } from "@fs/common/components/H3";
import { P } from "@fs/common/components/P";
import { Description } from "@fs/common/components/Description";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: H1,
    h2: H2,
    h3: H3,
    p: P,
    Description,
  };
}
