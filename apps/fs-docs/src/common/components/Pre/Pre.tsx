"use client"

import { Box, IconButton } from "@feelsgoodman/fs-ui/components"
import { faCopy } from "@fortawesome/free-regular-svg-icons/faCopy"
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { ComponentPropsWithoutRef, useEffect, useState } from "react"
import { useCopyToClipboard } from "usehooks-ts"
import "./styles.css"

type PreProps = ComponentPropsWithoutRef<typeof Box> &
  ComponentPropsWithoutRef<"pre">

export default function Pre({ className, children, ...props }: PreProps) {
  const [hasCopied, setHasCopied] = useState(false)
  const [code, setCode] = useState("")

  useEffect(() => {
    if (hasCopied) setTimeout(() => setHasCopied(false), 1500)
  }, [hasCopied])

  const [, copyFn] = useCopyToClipboard()

  const copyCode = () => copyFn(code).then(() => setHasCopied(true))

  return (
    <Box asChild {...props} py={4} px={6} my={6}>
      <pre
        className={clsx("fs-pre", className)}
        ref={(node) => {
          if (node) {
            // remove double line breaks
            const codeElement = node.querySelector("code")
            const code = codeElement?.innerText.replace(/\n{2}/g, "\n")
            if (code) setCode(code)
          }
        }}
      >
        {children}

        <IconButton variant="soft" color="gray" onClick={copyCode}>
          <FontAwesomeIcon icon={hasCopied ? faCheck : faCopy} />
        </IconButton>
      </pre>
    </Box>
  )
}
