import { describe, it, expect } from "vitest";
import { PositionProps, withPositionProps } from "../position.utils";
describe("withTypographyProps", () => {
  it("should return a string", () => {
    const props: PositionProps & Record<string, any> = {
      top: {
        md: 0,
        initial: "auto",
        sm: "1/2",
      },
      left: 1,
      bottom: 2,
      right: 3,
      insetX: 4,
      insetY: 5,
      inset: 6,
      start: 7,
      end: 8,
      position: "relative",
      align: "center",
      randomProp: "randomValue",
    };

    expect(withPositionProps(props)).toBe(
      "fs-relative md:fs-top-0 fs-top-auto sm:fs-top-1/2 fs-bottom-2 fs-left-1 fs-right-3 fs-inset-x-4 fs-inset-y-5 fs-inset-6 fs-start-7 fs-end-8"
    );
  });
});
