import { defineConfig } from "tsup";

import { dependencies, peerDependencies } from "./package.json";

export default defineConfig({
  entry: [
    "./src/context/theme/index.ts",
    "./src/plugin/index.ts",
    "./src/components/index.ts",
  ],
  format: ["esm"],
  splitting: true,
  treeshake: true,
  target: "es2021",
  clean: true,
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
  dts: true,
  platform: "browser",
});
