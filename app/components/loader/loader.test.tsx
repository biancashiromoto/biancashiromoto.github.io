import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loader from "./loader";

describe("Loader", () => {
  it("renders without crashing", () => {
    render(<Loader />);
  });

  it("renders three dot elements", () => {
    const { container } = render(<Loader />);
    const dots = container.querySelectorAll("[class*='dot']");
    expect(dots).toHaveLength(3);
  });
});
