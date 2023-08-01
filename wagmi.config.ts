import { defineConfig } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";
import * as chains from "viem/chains";
export default defineConfig({
  out: "test/generated.ts",
  plugins: [
    foundry({
      project: "./test/contracts",
      deployments: {
        ERC1271: {
          [chains.foundry.id]: "0x9e7F7d0E8b8F38e3CF2b3F7dd362ba2e9E82baa4",
        },
      },
    }),
  ],
});
