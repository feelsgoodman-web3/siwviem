import type { Config } from 'tailwindcss'

import plugin from './src/plugin'
export default {
  content: ["./src/components/**/*.{tsx}"],
  plugins: [plugin],
} satisfies Config;
