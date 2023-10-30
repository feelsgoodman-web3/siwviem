import { plugin } from "@feelsgoodman/fs-ui/plugin"
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@feelsgoodman/fs-ui/dist/**/*.js",
  ],
  plugins: [plugin],
}
export default config
