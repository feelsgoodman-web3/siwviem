"use client"

import { AppBar, IconButton } from "@feelsgoodman/fs-ui/components"
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon"
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useMemo } from "react"
import { useIsMounted } from "usehooks-ts"

export default function Header() {
  const isMounted = useIsMounted()()
  const { theme, setTheme, systemTheme } = useTheme()
  const themeMode = useMemo(
    () => (theme === "system" && systemTheme === "dark" ? "dark" : theme),
    [theme, systemTheme],
  )
  const toggleTheme = useCallback(
    () => setTheme(themeMode === "light" ? "dark" : "light"),
    [setTheme, theme],
  )

  return (
    <AppBar>
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={40.6} height={30} />
      </Link>

      {isMounted && (
        <IconButton onClick={toggleTheme} color="gray" variant="soft">
          <FontAwesomeIcon icon={themeMode === "light" ? faSun : faMoon} />
        </IconButton>
      )}
    </AppBar>
  )
}
