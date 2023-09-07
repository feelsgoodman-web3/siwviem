import { defineConfig } from "tsup";

import { dependencies, peerDependencies } from "./package.json";

export default defineConfig({
  banner: {
    js: '"use client";',
  },
  entry: [
    "./src/Theme.tsx",
    "./src/plugin/index.ts",
    "./src/components/index.ts",
  ],
  format: ["esm"],
  splitting: true,
  target: "es2021",
  bundle: true,
  clean: true,
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
  dts: true,
  platform: "browser",
});
