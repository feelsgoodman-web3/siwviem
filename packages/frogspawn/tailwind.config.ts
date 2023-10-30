import type { Config } from "tailwindcss"

import { plugin } from "./src/plugin"

export default {
  content: ["./dist/classes/*.js"],
  plugins: [plugin],
} satisfies Config
