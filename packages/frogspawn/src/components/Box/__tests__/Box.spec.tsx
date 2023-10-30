import React from "react"

import { cleanup, render } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import Box from "../Box"

afterEach(() => {
  cleanup()
})

describe("Box Component", () => {
  it("should render without crashing", () => {
    const { container } = render(<Box />)
    expect(container).toBeInTheDocument()
  })

  it("should forward refs correctly", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Box ref={ref} />)
    expect(ref.current).toBeDefined()
  })

  it("should extract and apply box properties", () => {
    const { container } = render(<Box m={1} p={2} />)
    expect(container.firstChild).toHaveClass("fs-m-1")
    expect(container.firstChild).toHaveClass("fs-p-2")
  })

  it("should extract and apply responsive box properties", () => {
    const { container } = render(
      <Box
        m={{
          initial: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
        }}
        p={2}
      />,
    )
    expect(container.firstChild).toHaveClass("fs-m-1")
    expect(container.firstChild).toHaveClass("sm:fs-m-2")
    expect(container.firstChild).toHaveClass("md:fs-m-3")
    expect(container.firstChild).toHaveClass("lg:fs-m-4")
    expect(container.firstChild).toHaveClass("xl:fs-m-5")
    expect(container.firstChild).toHaveClass("fs-p-2")
  })

  it("should apply asChild prop correctly", () => {
    const { container } = render(
      <Box asChild mb={1}>
        <a>Child</a>
      </Box>,
    )
    const element = container.querySelector("a")
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass("fs-mb-1")
  })
})
