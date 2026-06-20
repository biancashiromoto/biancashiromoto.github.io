import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { useLanguage } from "@/app/context/LanguageProvider";
import { features } from "@/app/config/features";
import { LinksContainer } from "./links-container";

vi.mock("@/app/context/LanguageProvider", () => ({
  useLanguage: vi.fn(),
}));

vi.mock("@/app/config/features", () => ({
  features: { projects: true },
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockUseLanguage = vi.mocked(useLanguage);

const defaultLanguageContext = {
  isLanguagePortuguese: false,
  toggleLanguage: vi.fn(),
  isLoading: false,
  information: {
    _projects: "Projects",
    _gitHubTooltip: "GitHub",
    _linkedinTooltip: "LinkedIn",
    _downloadMyCV: "Download my CV",
    _githubLink: "https://github.com/biancashiromoto",
    _linkedinLink: "https://www.linkedin.com/in/bshiromoto/",
    _resumeLink: "https://drive.google.com/drive/folders/resume",
  } as any,
};

describe("LinksContainer", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockUseLanguage.mockReturnValue(defaultLanguageContext);
    (features as { projects: boolean }).projects = true;
  });

  it("renders 4 links when projects flag is enabled", () => {
    render(<LinksContainer />);
    expect(screen.getAllByRole("link")).toHaveLength(4);
  });

  it("renders the projects link pointing to /projects", () => {
    render(<LinksContainer />);
    expect(screen.getByTitle("Projects").closest("a")).toHaveAttribute("href", "/projects");
  });

  describe("when projects flag is disabled", () => {
    beforeEach(() => {
      (features as { projects: boolean }).projects = false;
    });

    it("renders 3 links", () => {
      render(<LinksContainer />);
      expect(screen.getAllByRole("link")).toHaveLength(3);
    });

    it("does not render the projects link", () => {
      render(<LinksContainer />);
      expect(screen.queryByTitle("Projects")).not.toBeInTheDocument();
    });
  });

  it("renders the GitHub link with the correct href", () => {
    render(<LinksContainer />);
    expect(screen.getByTitle("GitHub").closest("a")).toHaveAttribute(
      "href",
      "https://github.com/biancashiromoto",
    );
  });

  it("renders the LinkedIn link with the correct href", () => {
    render(<LinksContainer />);
    expect(screen.getByTitle("LinkedIn").closest("a")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/bshiromoto/",
    );
  });

  it("renders the resume link with the correct href", () => {
    render(<LinksContainer />);
    expect(screen.getByTitle("Download my CV").closest("a")).toHaveAttribute(
      "href",
      "https://drive.google.com/drive/folders/resume",
    );
  });

  describe("accessibility", () => {
    it("has no violations", async () => {
      const { container } = render(<LinksContainer />);
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    });
  });
});
