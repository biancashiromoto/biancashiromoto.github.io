import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectCard from "./project-card";
import { Repository } from "@/app/helpers/classes/fetchRepos";

vi.mock("next/image", () => ({
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/public/assets/img/placeholder.webp", () => ({
  default: "placeholder.webp",
}));

const defaultRepo: Repository = {
  id: 1,
  name: "my-project",
  description: "A cool project",
  html_url: "https://github.com/biancashiromoto/my-project",
  homepage: "https://my-project.vercel.app",
  language: "TypeScript",
  topics: ["display", "react"],
};

describe("ProjectCard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the formatted project title", () => {
    render(<ProjectCard repo={defaultRepo} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("My Project");
  });

  it("renders the GitHub link", () => {
    render(<ProjectCard repo={defaultRepo} />);
    expect(screen.getByRole("link", { name: "View on GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/biancashiromoto/my-project",
    );
  });

  it("renders the deploy link when homepage is set", () => {
    render(<ProjectCard repo={defaultRepo} />);
    expect(screen.getByRole("link", { name: "View deploy" })).toHaveAttribute(
      "href",
      "https://my-project.vercel.app",
    );
  });

  it("does not render the deploy link when homepage is empty", () => {
    render(<ProjectCard repo={{ ...defaultRepo, homepage: "" }} />);
    expect(screen.queryByRole("link", { name: "View deploy" })).not.toBeInTheDocument();
  });

  it("renders the screenshot image with the correct alt text", () => {
    render(<ProjectCard repo={defaultRepo} />);
    expect(screen.getByAltText("Screenshot of my-project")).toBeInTheDocument();
  });

  it("renders the screenshot with the correct src URL", () => {
    render(<ProjectCard repo={defaultRepo} />);
    const img = screen.getByAltText("Screenshot of my-project") as HTMLImageElement;
    expect(img.src).toContain("my-project");
    expect(img.src).toContain("screenshot-01.png");
  });
});
