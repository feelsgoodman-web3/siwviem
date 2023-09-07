import { describe, it, expect } from "vitest";
import withBreakpoints from "../withBreakpoints";
import { FlexProps } from "src/components/Flex";
describe("withBreakpoints", () => {
  it("should return a string", () => {
    const px: FlexProps["px"] = {
      initial: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
      "2xl": 6,
    };
    expect(withBreakpoints("p", px)).toBe(
      "fs-p-1 sm:fs-p-2 md:fs-p-3 lg:fs-p-4 xl:fs-p-5 2xl:fs-p-6"
    );
  });
});
