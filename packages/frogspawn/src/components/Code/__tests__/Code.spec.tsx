import React from "react"

import { cleanup, render } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import Code from "../Code"

afterEach(() => {
  cleanup()
})

describe("Code Component", () => {
  it("should render without crashing", () => {
    const { container } = render(<Code />)
    expect(container).toBeInTheDocument()
  })

  it("should forward refs correctly", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Code ref={ref} />)
    expect(ref.current).toBeDefined()
  })

  it("should extract and apply typography properties", () => {
    const { container } = render(<Code m={1} />)
    const element = container.querySelector("code")
    expect(element).toHaveClass("fs-m-1")
  })

  it("should extract and apply responsive typography properties", () => {
    const { container } = render(
      <Code
        m={{
          initial: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
        }}
        size={{ initial: "base", md: "xs" }}
        weight="bold"
        align="center"
      />,
    )
    const element = container.querySelector("code")
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass("fs-m-1")
    expect(element).toHaveClass("sm:fs-m-2")
    expect(element).toHaveClass("md:fs-m-3")
    expect(element).toHaveClass("lg:fs-m-4")
    expect(element).toHaveClass("xl:fs-m-5")
    expect(element).toHaveClass("fs-text-base")
    expect(element).toHaveClass("md:fs-text-xs")
    expect(element).toHaveClass("fs-font-bold")
    expect(element).toHaveClass("fs-text-center")
  })

  it("should apply asChild prop correctly", () => {
    const { container } = render(
      <Code asChild mb={1}>
        <a>Child</a>
      </Code>,
    )
    const element = container.querySelector("a")
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass("fs-mb-1")
  })
})
