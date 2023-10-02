"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@feelsgoodman/frogspawn/context";
import { H1 } from "@fs/common/components/H1";
import { MDXProvider } from "@mdx-js/react";

interface ProvidersProps {
  children: ReactNode;
}

const components = {
  h1: H1,
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <MDXProvider components={components}>{children}</MDXProvider>
    </ThemeProvider>
  );
}
