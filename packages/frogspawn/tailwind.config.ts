import type { Config } from "tailwindcss";

import plugin from "./src/plugin";
export default {
  content: [
    "./src/components/*/*!(spec).ts?(x)",
    "./src/definitions/*/*!(spec).ts?(x)",
  ],
  plugins: [plugin],
} satisfies Config;
