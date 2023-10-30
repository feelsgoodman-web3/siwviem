import { defineConfig } from "tsup"

import { dependencies, peerDependencies } from "./package.json"
import { getConfig } from "./tsup.utils"

export default defineConfig(
  getConfig({
    banner: {
      // eslint-disable-next-line @typescript-eslint/quotes
      js: '"use client";',
    },
    dev: process.env.DEV === "true",
    drilledEntry: ["src/components"],
    entry: ["src/plugin/index.ts", "src/components/index.ts"],
    external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
    extraExports: { "./styles": "./dist/styles/index.css" },
    platform: "browser",
  }),
)
