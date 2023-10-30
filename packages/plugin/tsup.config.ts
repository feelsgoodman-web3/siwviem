import { defineConfig } from "tsup"

import { peerDependencies } from "./package.json"

export default defineConfig({
  entry: ["src/index.ts"],
  external: Object.keys(peerDependencies),
  platform: "node",
  bundle: true,
  clean: true,
  dts: true,
  format: ["esm"],
  minify: true,
  splitting: true,
  target: "es2021",
})
