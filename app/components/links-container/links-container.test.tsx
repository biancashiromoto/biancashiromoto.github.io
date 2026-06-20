import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { useLanguage } from "@/app/context/LanguageProvider";
import { LinksContainer } from "./links-container";

vi.mock("@/app/context/LanguageProvider", () => ({
  useLanguage: vi.fn(),
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
  });

  it("renders 4 links", () => {
    render(<LinksContainer />);
    expect(screen.getAllByRole("link")).toHaveLength(4);
  });

  it("renders the projects link pointing to /projects", () => {
    render(<LinksContainer />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/projects");
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
