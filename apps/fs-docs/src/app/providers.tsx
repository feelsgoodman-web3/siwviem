"use client"

import { H1 } from "@fs/common/components/H1"
import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"

interface ProvidersProps {
  children: ReactNode
}

const _components = {
  h1: H1,
}

export default function Providers({ children }: ProvidersProps) {
  return <ThemeProvider>{children}</ThemeProvider>
}
