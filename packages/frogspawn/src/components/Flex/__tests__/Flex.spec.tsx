import "@testing-library/jest-dom/vitest";

import React from "react";

import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";

import Flex from "../Flex";

afterEach(() => {
  cleanup();
});

describe("Flex Component", () => {
  it("should render without crashing", () => {
    const { container } = render(<Flex />);
    expect(container).toBeInTheDocument();
  });

  it("should forward refs correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Flex ref={ref} />);
    expect(ref.current).toBeDefined();
  });

  it("should apply wrap and direction breakpoints classes", () => {
    const { container } = render(<Flex wrap="nowrap" direction="row" />);
    expect(container.firstChild).toHaveClass("fs-flex-wrap-nowrap");
    expect(container.firstChild).toHaveClass("fs-flex-row");
  });

  it("should extract and apply box properties", () => {
    const { container } = render(<Flex m={1} p={2} />);
    expect(container.firstChild).toHaveClass("fs-m-1");
    expect(container.firstChild).toHaveClass("fs-p-2");
  });

  it("should extract and apply responsive box properties", () => {
    const { container } = render(
      <Flex
        m={{
          initial: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
        }}
        p={2}
      />
    );
    expect(container.firstChild).toHaveClass("fs-m-1");
    expect(container.firstChild).toHaveClass("sm:fs-m-2");
    expect(container.firstChild).toHaveClass("md:fs-m-3");
    expect(container.firstChild).toHaveClass("lg:fs-m-4");
    expect(container.firstChild).toHaveClass("xl:fs-m-5");
    expect(container.firstChild).toHaveClass("fs-p-2");
  });

  it("should apply asChild prop correctly", () => {
    const { container } = render(
      <Flex asChild mb={1}>
        <a>Child</a>
      </Flex>
    );
    const element = container.querySelector("a");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("fs-mb-1");
  });
});
