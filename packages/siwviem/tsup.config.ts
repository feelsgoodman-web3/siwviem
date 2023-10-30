import { defineConfig } from "tsup"

import { dependencies, peerDependencies } from "./package.json"

export default defineConfig({
  bundle: true,
  clean: true,
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
  dts: true,
  minify: true,
})
