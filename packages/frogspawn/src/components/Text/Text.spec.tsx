import React from "react";

import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";

import Text from "./Text";

afterEach(() => {
  cleanup();
});

describe("Text Component", () => {
  it("should render without crashing", () => {
    const { container } = render(<Text />);
    expect(container).toBeInTheDocument();
  });

  it("should forward refs correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Text ref={ref} />);
    expect(ref.current).toBeDefined();
  });

  it("should extract and apply typography properties", () => {
    const { container } = render(<Text as="p" m={1} />);
    expect(container.firstChild).toHaveClass("fs-m-1");
  });

  it("should extract and apply responsive typography properties", () => {
    const { container } = render(
      <Text
        as="p"
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
      />
    );
    expect(container.firstChild).toHaveClass("fs-m-1");
    expect(container.firstChild).toHaveClass("sm:fs-m-2");
    expect(container.firstChild).toHaveClass("md:fs-m-3");
    expect(container.firstChild).toHaveClass("lg:fs-m-4");
    expect(container.firstChild).toHaveClass("xl:fs-m-5");
    expect(container.firstChild).toHaveClass("fs-text-base");
    expect(container.firstChild).toHaveClass("md:fs-text-xs");
    expect(container.firstChild).toHaveClass("fs-font-bold");
    expect(container.firstChild).toHaveClass("fs-text-center");
  });

  it("should apply asChild prop correctly", () => {
    const { container } = render(
      <Text asChild mb={1}>
        <a>Child</a>
      </Text>
    );
    const element = container.querySelector("a");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("fs-mb-1");
  });
});
