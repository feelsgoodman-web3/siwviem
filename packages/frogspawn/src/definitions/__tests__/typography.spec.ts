import { describe, it, expect } from "vitest";
import { TypographyProps, withTypographyProps } from "../typography.utils";
describe("withTypographyProps", () => {
  it("should return a string", () => {
    const props: TypographyProps & Record<string, any> = {
      size: {
        md: "xs",
        initial: "sm",
      },
      m: 1,
      weight: "bold",
      align: "center",
      randomProp: "randomValue",
    };

    expect(withTypographyProps(props)).toBe(
      "fs-m-1 md:fs-text-xs fs-text-sm fs-font-bold fs-text-center"
    );
  });
});
