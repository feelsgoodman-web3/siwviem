import "@testing-library/jest-dom/vitest";

import React from "react";

import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";

import Grid from "../Grid";

afterEach(() => {
  cleanup();
});

describe("Grid Component", () => {
  it("should render without crashing", () => {
    const { container } = render(<Grid />);
    expect(container).toBeInTheDocument();
  });

  it("should forward refs correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Grid ref={ref} />);
    expect(ref.current).toBeDefined();
  });

  it("should apply wrap and direction breakpoints classes", () => {
    const { container } = render(
      <Grid cols={1} rows={1} autoCols="min" autoRows="max" flow="row-dense" />
    );
    expect(container.firstChild).toHaveClass("fs-grid-cols-1");
    expect(container.firstChild).toHaveClass("fs-grid-rows-1");
    expect(container.firstChild).toHaveClass("fs-auto-cols-min");
    expect(container.firstChild).toHaveClass("fs-auto-cols-min");
    expect(container.firstChild).toHaveClass("fs-grid-flow-row-dense");
  });

  it("should extract and apply box properties", () => {
    const { container } = render(<Grid m={1} p={2} />);
    expect(container.firstChild).toHaveClass("fs-m-1");
    expect(container.firstChild).toHaveClass("fs-p-2");
  });

  it("should extract and apply responsive box properties", () => {
    const { container } = render(
      <Grid
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
      <Grid asChild mb={1}>
        <a>Child</a>
      </Grid>
    );
    const element = container.querySelector("a");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("fs-mb-1");
  });
});
