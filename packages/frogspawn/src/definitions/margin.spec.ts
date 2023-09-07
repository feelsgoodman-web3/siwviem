import { describe, it, expect } from "vitest";
import { FlexProps } from "src/components/Flex";
import { withMarginProps } from "src/definitions/margin.utils";
describe("withMarginProps", () => {
  it("should return a string", () => {
    const mx: FlexProps["mx"] = {
      initial: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
      "2xl": 6,
    };

    const my: FlexProps["my"] = {
      initial: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
      "2xl": 6,
    };
    const items: FlexProps["items"] = "center";

    const props = {
      mx,
      ml: 1,
      items,
      randomProp: "randomValue",
      my,
    };

    expect(withMarginProps(props)).toBe(
      "fs-ml-1 fs-mx-1 sm:fs-mx-2 md:fs-mx-3 lg:fs-mx-4 xl:fs-mx-5 2xl:fs-mx-6 fs-my-1 sm:fs-my-2 md:fs-my-3 lg:fs-my-4 xl:fs-my-5 2xl:fs-my-6"
    );
  });
});
