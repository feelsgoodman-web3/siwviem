import type { ReactNode } from "react"

import type { SiwViemMessage } from "@feelsgoodman/siwviem"

export type MessageOptions = Partial<
  Omit<SiwViemMessage, "address" | "chainId">
>
export interface SiwViemAuthProps {
  children: ReactNode
  signOnConnect?: boolean
  getMessageOptions?(): MessageOptions
  initialMessage?: string
  initialSignature?: `0x${string}`
  onAuthenticated?(sig: `0x${string}`, msg: string): void
  onSignOut?(): void
  onSigning?(message: SiwViemMessage): void
}

export type Status =
  | "loading"
  | "unauthenticated"
  | "authenticated"
  | "disabled"
export interface SiwViemAuthState {
  message?: string
  signature?: `0x${string}`
  status: Status
  signMessage: () => void
  verify: () => void
  signOut: () => void
}
