import { BorderRadius } from "../types";

export default function getBorderRadius(borderRadius: BorderRadius) {
  return {
    "--rounded": borderRadius.base,
    "--rounded-none": borderRadius.none,
    "--rounded-sm": borderRadius.sm,
    "--rounded-md": borderRadius.md,
    "--rounded-lg": borderRadius.lg,
    "--rounded-xl": borderRadius.xl,
    "--rounded-2xl": borderRadius["2xl"],
    "--rounded-3xl": borderRadius["3xl"],
    "--rounded-full": borderRadius.full,
  };
}
