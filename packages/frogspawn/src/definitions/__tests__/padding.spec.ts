import { describe, expect, it } from "vitest"
import { FlexProps } from "../../components"
import { withPaddingProps } from "../padding.utils"
describe("withPaddingProps", () => {
  it("should return a string", () => {
    const px: FlexProps["px"] = {
      initial: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
      "2xl": 6,
    }

    const py: FlexProps["py"] = {
      initial: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
      "2xl": 6,
    }
    const items: FlexProps["items"] = "center"

    const props = {
      px,
      pl: 1,
      items,
      randomProp: "randomValue",
      py,
    }

    expect(withPaddingProps(props)).toBe(
      "fs-pl-1 fs-px-1 sm:fs-px-2 md:fs-px-3 lg:fs-px-4 xl:fs-px-5 2xl:fs-px-6 fs-py-1 sm:fs-py-2 md:fs-py-3 lg:fs-py-4 xl:fs-py-5 2xl:fs-py-6",
    )
  })
})
