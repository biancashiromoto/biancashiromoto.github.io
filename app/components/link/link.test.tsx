import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomLink } from "./link";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("CustomLink", () => {
  it("renders its children", () => {
    render(<CustomLink path="/projects">Projects</CustomLink>);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders an anchor with the correct href", () => {
    render(<CustomLink path="/projects">Projects</CustomLink>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/projects");
  });

  it("falls back to path-based aria-label when none is provided", () => {
    render(<CustomLink path="/projects">Projects</CustomLink>);
    expect(screen.getByRole("link")).toHaveAttribute("aria-label", "Link to /projects");
  });

  it("uses custom aria-label when provided", () => {
    render(
      <CustomLink path="/projects" aria-label="Go to projects">
        Projects
      </CustomLink>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("aria-label", "Go to projects");
  });

  it("defaults target to _self", () => {
    render(<CustomLink path="/projects">Projects</CustomLink>);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_self");
  });

  it("accepts a custom target", () => {
    render(
      <CustomLink path="https://github.com" target="_blank">
        GitHub
      </CustomLink>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });
});
