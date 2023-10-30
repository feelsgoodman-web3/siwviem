import { describe, expect, it } from "vitest"
import { FlexProps } from "../../components"

import { withBoxProps } from "../box.utils"
describe("withLayoutDefs", () => {
  it("should return a string", () => {
    const px: FlexProps["px"] = {
      initial: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
      "2xl": 6,
    }
    const items: FlexProps["items"] = "center"

    const wrap: FlexProps["wrap"] = "wrap"

    const alignSelf: FlexProps["alignSelf"] = "center"

    const props = {
      px,
      my: px,
      items,
      alignSelf,
      randomProp: "randomValue",
      wrap,
    }

    expect(withBoxProps(props)).toBe(
      "fs-px-1 sm:fs-px-2 md:fs-px-3 lg:fs-px-4 xl:fs-px-5 2xl:fs-px-6 fs-my-1 sm:fs-my-2 md:fs-my-3 lg:fs-my-4 xl:fs-my-5 2xl:fs-my-6 fs-self-center fs-items-center",
    )
  })
})
